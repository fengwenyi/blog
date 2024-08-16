# JSON工具类

com.fengwenyi.javalib.convert.JsonUtils

JSON 在我们接口开发中，用得非常多，首先要保证的就是正确。<br>
所以，底层使用 jackson 进行 JSON 转换操作。

## 对象转JSON

```java
User user = new User();
user.setName("张三");
user.setAge(16)
String result = JsonUtils.convertString(user);
System.out.println(result);
```

::: tip
使用此方法，我们可以将`对象`、`数组`、`集合`转换成JSON字符串。
:::


## JSON转对象

```java
String jsonStr = "{\"name\":\"张三\",\"age\":16}";
String result = JsonUtils.convertObject(jsonStr, User.class);
System.out.println(result);
```

## JSON转多层级对象

待转换的JSON字符串如下：

```json
{
    "code":"success",
    "message":"Success",
    "data":{
        "name":"张三",
        "age":16
    }
}
```

ResultTemplate如下：

```java
public class ResultTemplate<T> {
    String code;
    String message;
    T data;
}
```

User类如下：

```java
public class User {
    String name;
    int age;
}
```

我们就可以这样进行转换：

```java
String jsonStr = "{\"code\":\"success\",\"message\":\"Success\",\"data\":{\"name\":\"张三\",\"age\":16}}";
ResultTemplate<User> result = JsonUtils.convertObject(
    jsonStr,
    new TypeReference(ResultTemplate<User>(){})
);
```

## JSON转集合

```java
String jsonStr = "[{\"name\":\"张三\",\"age\":16}]";
List<User> result = JsonUtils.convertCollection(jsonStr, List.class, User.class);
```

## JSON转集合, TypeReference

```java
String jsonStr = "[{\"name\":\"张三\",\"age\":16}]";
List<User> result = JsonUtils.convertCollection(
    jsonStr,
    new TypeReference(List<User>(){})
);
```

## JSON转换成Map

```java
String jsonStr = "{\"name\":\"张三\"}";
Map<String, String> result = JsonUtils.convertMap(jsonStr, String.class, String.class);
```

::: tip
第二个参数是Map的key的类型。<br>
第三个参数是Map的value的类型。
:::


## 获取JSON的key列表

```java
String json = "{\"name\":\"张三\"}";
List<String> result = JsonUtils.getKeys(json);
```

::: tip
只返回第一层的key
:::