# HTTP请求工具类

com.fengwenyi.javalib.http.HttpUtils

## GET请求

```java
String url = "";
String result = HttpUtils.get(url);
System.out.println(result);
```

## GET+参数请求

```java
String url = "";
String param = "";
String result = HttpUtils.get(url, param);
System.out.println(result);
```


## GET+Map格式参数请求

```java
String url = "";
Map<String, Param> param = new HashMap<>;
String result = HttpUtils.get(url, param);
System.out.println(result);
```

## POST+JSON格式参数请求

```java
String url = "";
String param = "";
String result = HttpUtils.postJson(url, param);
System.out.println(result);
```

## POST+JSON+Map格式参数请求

```java
String url = "";
Map<String, Param> param = new HashMap<>;
String result = HttpUtils.postJson(url, param);
System.out.println(result);
```

## POST+FORM+Map格式参数请求

```java
String url = "";
Map<String, Param> param = new HashMap<>;
String result = HttpUtils.postForm(url, param);
System.out.println(result);
```


## 完整请求

如果上面提供的快捷方法不满足您的需求，你可以使用此方法。

你需要提供 `Request` 和 `Request.Option`，然后调 `execute` 方法即可。

完整类名：<br>
com.fengwenyi.javalib.http.Request<br>
com.fengwenyi.javalib.http.Request.Option<br>

Request属性如下：

| 参数名  | 变量         | 类型                    | 描述 |
| ---    | ---         | ---                     | --- |
| 地址    | url         | String                 |      |
| 方法    | method      | Method                 | 枚举 |
| 参数    | param       | `Map<String, Object>`  |      |
| 参数格式 | paramFormat | ParamFormat            | 枚举 |
| 工具    | util         | Util                  | 枚举 |

说明：

1、请求方法枚举如下：`GET`, `POST`, `PUT`, `PATCH`, `DELETE`。

2、目前实现的请求工具如下：

<ul>
    <li>OkHttp</li>
</ul>

3、参数格式有：

- `STRING` - 默认。
- `FORM` - 参数为 form 表单。
- `JSON` - 参数为 json 字符串。


Request.Option属性如下：

| 参数名   | 变量                    | 类型                     | 描述               |
| ---     | ---                     | ---                     | ---               |
| 连接超时 |  connectTimeoutSecond   | Integer                 | 单位秒，默认5秒     |
| 读取超时 |  readTimeoutSecond      | Integer                 | 单位秒，默认45秒    |
| 请求头   |  headers                | `Map<String, String>`   |                   |


示例：

```java
Map<String, Object> paramMap = new HashMap<>();
paramMap.put("currentPage", 1);
paramMap.put("pageSize", 10);

Map<String, String> headerMap = new HashMap<>();
headerMap.put("Accept", "application/json");

Request request = new Request();
request.setUrl("https://erwin-api.fengwenyi.com/erwin/bookmark/page");
request.setParam(paramMap);
request.setMethod(Request.Method.GET);
request.setUtil(Request.Util.OkHttp);

Request.Option option = new Request.Option();
option.setHeaders(headerMap);
option.setConnectTimeoutSecond(3);
option.setReadTimeoutSecond(5);
option.setLogLevel(Request.LogLevel.DEBUG);

try {
    String result = HttpUtils.execute(request, option);
    System.out.println(result);
} catch (IOException e) {
    throw new RuntimeException(e);
}
```