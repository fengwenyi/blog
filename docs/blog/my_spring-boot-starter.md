# 如何构建自己的 spring-boot-starter



微服务架构，避免不了的是，多个服务都需要一些相同的业务功能，例如业务消息推送。因此，学会构建自己的 spring-boot-starter 会给我们的开发带来事半功倍的效果。



之所以写这篇文章呢，其实是踩坑。自己也写过一些 starter，所以也算有一些经验。在工作中呢，原本是写好了，可以直接使用，但是感觉有点繁琐，先呢是通过注解的方式，就想改成自动配置，就生效。于是踩坑开始了。下面就一起回忆一下吧。



之前的写法是：



先写一个自动配置类

```java
@Configuration
@EnableAutoConfiguration
@ComponentScan(basePackageClasses = EnableApiStarter.class)
public class ApiAutoConfiguration {
}
```



再写一个启用的注解

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Import({ApiAutoConfiguration.class})
public @interface EnableApiStarter {

}
```



其他要使用，先引入依赖，再使用注解，`@EnableApiStarter`。



想改成，不使用注解启动，于是就编写一个文件：

src/main/resources/META-INF/spring.factories

```
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
  com.fengwenyi.apistarter.config.ApiAutoConfiguration
```



这样就可以不使用注解 `EnableApiStarter` 了，但是启动的时候，报错：

> BeanDefinitionParsingException: Configuration problem: A circular @Import has been detected



网上网上搜索一番：



自动配置类加了一个@Configuration注解，
在META-INF/spring.factories文件当中也加了一个配置。



解决方案是，自动配置类上的注解@Configuration移除



https://blog.csdn.net/qq_42685053/article/details/123926505



经过多次测试，也参加其他项目，实际上，不需要这个注解 `@EnableAutoConfiguration`。



于是，自动配置类，改成：

```
@Configuration
@ComponentScan(basePackageClasses = EnableApiStarter.class)
public class ApiAutoConfiguration {
}
```



启动以后呢，还是报错，错误原因是没找到 xxxRepository 对应的bean，开始我以为是没有包扫描有问题，又是一番多次尝试，还是不行，于是不得不怀疑是 JPA 的原因，结果果然是 JPA 包扫描问题，Repository 接口 和 entity实体类扫描不到。



之前为啥一直没怀疑这个问题呢，因为啊，我在每个 xxxRepository 接口上，都加了 `@Repository `，自以为这样就可以扫描到，没有问题了。


::: tip 提示
在实际项目中，xxxRepository  通过继承 JpaRepository，也就不需要  `@Repository `。
:::



既然知道原因，那就好办了：

```java
@Configuration
@ComponentScan(basePackageClasses = StarterJpaAutoConfig.class)
@EnableJpaRepositories("com.fengwenyi.demo.springboot.starter_jpa.repository")
@EntityScan("com.fengwenyi.demo.springboot.starter_jpa.entity")
public class StarterJpaAutoConfig {
}
```



好了，到这里就差不多了，完整示例代码，请参见这里：



自定义 starter 示例：https://github.com/fengwenyi/spring-boot-demo/tree/2.7.x/demo-spring-boot-starter

自定义 starter 使用注解示例：https://github.com/fengwenyi/spring-boot-demo/tree/2.7.x/demo-spring-boot-starter-enabled

自定义 starter  JPA 示例：https://github.com/fengwenyi/spring-boot-demo/tree/2.7.x/demo-spring-boot-starter-jpa