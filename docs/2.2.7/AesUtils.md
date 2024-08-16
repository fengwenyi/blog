# AES加密工具类

com.fengwenyi.javalib.encryption.AESUtils

## 加密

```java
String plaintext = "";
String password = "";
String result = AESUtils.encrypt(plaintext, password);
System.out.println(result);
```

## 解密

```java
String ciphertext = "";
String password = "";
String result = AESUtils.decrypt(ciphertext, password);
System.out.println(result);
```