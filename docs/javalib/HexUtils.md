# 进制转换工具类

com.fengwenyi.javalib.convert.HexUtils

## 二进制转十六进制

```java
byte[] data = new byte[1024];
String result = HexUtils._2_16(data);
System.out.println(result);
```

## 十六进制转二进制

```java
String data = "";
byte[] result = HexUtils._16_2(data);
System.out.println(result);
```