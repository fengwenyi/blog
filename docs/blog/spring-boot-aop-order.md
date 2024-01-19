# Spring Boot Aop 执行顺序



## 1. 概述

在 spring boot 项目中，使用 aop 增强，不仅可以很优雅地扩展功能，还可以让一写多用，避免写重复代码，例如：记录接口耗时，记录接口日志，接口权限，等等。所以，在项目中学习并使用 aop ，是十分必要的。然而，当我们在一个接口中使用多个 aop，时，就需要注意他们的执行顺序了。那么，它们的执行顺序是怎样的呢？如果不把这个问题搞明白，那我们的程序就不可控，这是不允许的，这就是我们今天要讨论的问题。



## 2. 实现 AOP

### 2.1 通过注解实现 AOP

MyAop:

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAop {
}
```

MyAspect:

```java
@Aspect
@Component
public class MyAspect {

    @Around("@annotation(aop)")
    public Object around(ProceedingJoinPoint joinPoint, 
                         MyAop aop) throws Throwable {
        return joinPoint.proceed();
    }

}
```

SampleController#myApi:

```java
@RestController
@RequestMapping("/sample")
public class SampleController {

    @MyAop
    @RequestMapping("/my-api")
    public String myApi() {
        return "success";
    }

}
```

这样，我们就通过使用注解的方式实现了 AOP 。




### 2.2 通过扫描包

比如，我们有这样一个接口 SampleController#myApi2:

```java
@RestController
@RequestMapping("/sample")
public class SampleController {

    @RequestMapping("/my-api2")
    public String myApi2() {
        return "success";
    }

}
```

我们可以使用包扫描的方式进行拦截：

```java
@Aspect
@Component
public class My2Aspect {

    @Around("execution(* com.fengwenyi.demo.springboot.aop.controller.SampleController.myApi2(..))")
    public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
        return joinPoint.proceed();
    }

}
```

这样，我们也就通过使用包扫描的方式实现了 AOP 。



## 3. 多个 AOP

### 3.1 分析

先提一个疑问：多个AOP注解，执行顺序是怎么样的呢？如何设置执行顺序呢？



比如，APP 请求我们的 API 接口，在请求到达 API 接口之前，可以先执行 AOP1，在执行 AOP2，并且顺序不能变，如下图：

![](https://images.fengwenyi.com/blog/spring-boot-aop-order/Xnip2024-01-16_10-52-00.jpg)

我们再拆解一下实际内部执行逻辑。

请求：请求先进入到 AOP1，再进入到 AOP2，最后到达 API。

返回：执行完 API，再回到 AOP2，最后回到 AOP1。

如下图：

![](https://images.fengwenyi.com/blog/spring-boot-aop-order/iShot_2024-01-16_11.17.19.png)

因为我们用的是 Around，先进入Aop1，再进入到aop2，然后执行api，执行完以后，再返回到 aop2，最后返回aop1。



### 3.2 代码实现

MyFirstAop：

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyFirstAop {
}
```

MyFirstAspect:

```java
@Slf4j
@Aspect
@Component
@Order(100002)
public class MyFirstAspect {

    @Around("@annotation(aop)")
    public Object around(ProceedingJoinPoint joinPoint, 
                         MyFirstAop aop) throws Throwable {

        log.info("MyFirstAspect#around execute start");

        try {
            return joinPoint.proceed();
        } finally {
            log.info("MyFirstAspect#around execute end");
        }

    }

}
```



MySecondAop:

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MySecondAop {
}
```

MySecondAspect:

```java
@Slf4j
@Aspect
@Component
@Order(100003)
public class MySecondAspect {

    @Around("@annotation(aop)")
    public Object around(ProceedingJoinPoint joinPoint, 
                         MySecondAop aop) throws Throwable {

        log.info("MySecondAspect#around execute start");

        try {
            return joinPoint.proceed();
        } finally {
            log.info("MySecondAspect#around execute end");
        }

    }

}
```



SampleController#aopOrder:

```java
@RestController
@RequestMapping("/sample")
public class SampleController {

    @MySecondAop
    @MyFirstAop
    @RequestMapping("/aop-order")
    public String aopOrder() {
        return "aopOrder";
    }

}
```



![image-20240119075507098](https://images.fengwenyi.com/blog/spring-boot-aop-order/image-20240119075507098.png)

通过设定 Order 值，指定 AOP 执行顺序，与我们的期望一致。



好了，今天的分享就到这里了，源码：[demo-spring-boot-aop](https://github.com/fengwenyi/spring-boot-demo/tree/2.7.x/demo-spring-boot-aop)。