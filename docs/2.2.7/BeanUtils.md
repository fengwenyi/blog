# Bean工具类

com.fengwenyi.javalib.bean.BeanUtils

## 根据 getter 获取属性名

```java
String result = BeanUtils.getFieldNameByGet(User::getUserName);
System.out.println(result);
```

## 根据 setter 获取属性名

```java
String result = BeanUtils.getFieldNameBySet(User::setUserName);
System.out.println(result);
```