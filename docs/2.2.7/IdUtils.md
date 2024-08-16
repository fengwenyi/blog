# ID工具类

com.fengwenyi.javalib.generate.IdUtils

## 获取UUID

```java
String result = IdUtils.getUUID();
System.out.println(result);
```

## 生成ID

```java
String result = IdUtils.genId();
System.out.println(result);
```

::: tip 提示
根据UUID生成ID，不含“-”。
:::