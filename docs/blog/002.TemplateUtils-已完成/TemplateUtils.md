# TemplateUtils

## 填充参数类型是map

```java
@Test
public void testConvertMap() {
    String content = "姓名：#{'name'}，年龄：#{[age]}，爱好：#{[likes]}";
    Map<String, String> paramMap = new HashMap<>();
    paramMap.put("name", "张三");
    paramMap.put("age", "20");
    paramMap.put("likes", "看电影，听音乐");
    String result = TemplateUtils.convert(content, paramMap);
    log.info("result: {}", result);
}
```



运行结果：

```
result: 姓名：name，年龄：20，爱好：看电影，听音乐
```





说明：

1、`Map<String, String>` 。

2、取值方式有两种：`#{'name'}` 或者 `#{[age]}`。



## 填充参数类型是 json

```java
@Test
public void testConvertJson() {
    String content = "姓名：#{'name'}，年龄：#{[age]}，爱好：#{[likes]}";
    Map<String, String> paramMap = new HashMap<>();
    paramMap.put("name", "张三");
    paramMap.put("age", "20");
    paramMap.put("likes", "看电影，听音乐");
    String jsonParam = JacksonUtils.json(paramMap);
    String result = TemplateUtils.convert(content, jsonParam);
    log.info("result: {}", result);
}
```



## 填充参数类型是对象

```java
@Test
public void testConvertObject() {
    String content = "姓名：#{[name]}，年龄：#{age}，爱好：#{likes}";
    User user = new User();
    user.setName("张三");
    user.setAge(18);
    user.setLikes(List.of("看电影", "玩游戏"));
    String result = TemplateUtils.convertObject(content, user);
    log.info("result: {}", result);
}

@Data
public static class User {
    private String name;
    private Integer age;
    private List<String> likes;
}
```



## 获取日期时间

```java
当前时间戳：#{T(System).currentTimeMillis()}
当前日期：#{T(java.time.LocalDate).now().toString}
当前时间：#{T(java.time.LocalTime).now().toString}
当前日期时间：#{T(java.time.LocalDateTime).now().toString}
当前日期时间格式化：#{T(java.time.LocalDateTime).now().format(T(java.time.format.DateTimeFormatter).ofPattern('yyyy-MM-dd HH:mm:ss'))}
```

