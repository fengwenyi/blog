# XML工具类

com.fengwenyi.javalib.convert.XmlUtils

## 对象转XML

```java
User user = new User();
user.setName("张三");
user.setAge(16)
String result = XmlUtils.convertString(user);
System.out.println(result);
```

## XML转对象

```java
String xml = "";
User result = XmlUtils.convertObject(xml, User.class);
System.out.println(result);
```

## XML转多层级对象

```java
String xml = "";
ResultTemplate<User> result = XmlUtils.convertObject(
    xml, 
    new TypeReference(ResultTemplate<User>() {})
);
System.out.println(result);
```