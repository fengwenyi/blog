# XML工具类

com.fengwenyi.javalib.convert.XmlUtils

## 对象转XML

```java
User user = new User();
user.setName("张三");
user.setAge(16)
String result = XmlUtils.string(user);
System.out.println(result);
```

## XML转对象

```java
String xml = "";
User result = XmlUtils.object(xml, User.class);
System.out.println(result);
```

## XML转多层级对象

```java
String xml = "";
ResultTemplate<User> result = XmlUtils.object(
    xml, 
    new TypeReference(ResultTemplate<User>() {})
);
System.out.println(result);
```