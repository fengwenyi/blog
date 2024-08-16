# RSA加密工具类

com.fengwenyi.javalib.encryption.RSAUtils

## 生成密钥对

```java
String[] result = RSAUtils.getKey();
System.out.println(result);
```

::: tip 提示
1、返回的是数组，第一个是私钥，第二个是公钥。如下：<br>
私钥：`result[0]`<br>
公钥：`result[1]`<br>

2、默认长度：512。
:::


## 私钥加密

```java
String key = "";
String plaintext = "";
String result = RSAUtils.privateKeyEncrypt(key, plaintext);
System.out.println(result);
```

## 公钥解密

```java
String key = "";
String ciphertext = "";
String result = RSAUtils.publicKeyDecrypt(key, ciphertext);
System.out.println(result);
```


## 公钥加密

```java
String key = "";
String plaintext = "";
String result = RSAUtils.publicKeyEncrypt(key, plaintext);
System.out.println(result);
```

## 私钥解密

```java
String key = "";
String ciphertext = "";
String result = RSAUtils.privateKeyDecrypt(key, ciphertext);
System.out.println(result);
```
