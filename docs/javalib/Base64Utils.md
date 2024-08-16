# BASE64加密工具类

com.fengwenyi.javalib.encryption.Base64Utils

## 编码

```java
byte[] plaintext = new byte[1024];
String result = Base64Utils.encrypt(plaintext);
System.out.println(result);
```

## 解码

```java
String ciphertext = "";
byte[] result = Base64Utils.decode(ciphertext);
System.out.println(result);
```