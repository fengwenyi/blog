
# 日期时间工具类

com.fengwenyi.javalib.convert.DateTimeUtils

日期时间，在日常开发中，用的比较多，比如：格式化输出，不同类型转换等操作。

推荐使用 `LocalDateTime`。



## 常量

- DateTimeUtils.DATE_TIME ：`yyyy-MM-dd HH:mm:ss`
- DateTimeUtils.DATE ：`yyyy-MM-dd`
- DateTimeUtils.TIME ：`HH:mm:ss`

## LocalDateTime格式化

```java
LocalDateTime localDateTime = LocalDateTime.now();
String result = DateTimeUtils.format(localDateTime, DateTimeUtils.DateTime);
System.out.println(result);
```

## LocalDate格式化

```java
LocalDate localDate = LocalDate.now();
String result = DateTimeUtils.format(localDate, DateTimeUtils.Date);
System.out.println(result);
```

## Date格式化

```java
Date date = new Date();
String result = DateTimeUtils.format(date, DateTimeUtils.DateTime);
System.out.println(result);
```

## 时间戳格式化

```java
long timestamp = System.currentTimeMillis();
String result = DateTimeUtils.format(timestamp, DateTimeUtils.DateTime);
System.out.println(result);
```

::: warning 注意
时间戳格式是毫秒！
:::



## OffsetDateTime格式化

```java
OffsetDateTime offsetDateTime = OffsetDateTime.now();
String result = DateTimeUtils.format(offsetDateTime, "uuuu-MM-dd'T'HH:mm:ssXXX");
System.out.println(result);
```



## 字符串解析为LocalDateTime

```java
String dateTimeStr = "2023-04-27 18:00:00";
LocalDateTime result = DateTimeUtils.parseLocalDateTime(dateTimeStr, DateTimeUtils.DateTime);
System.out.println(result);
```

## 字符串解析为LocalDate

```java
String dateTimeStr = "2023-04-27 18:00:00";
LocalDate result = DateTimeUtils.parseLocalDate(dateTimeStr, DateTimeUtils.DateTime);
System.out.println(result);
```

## 字符串解析为Date

```java
String dateTimeStr = "2023-04-27 18:00:00";
Date result = DateTimeUtils.parseDate(dateTimeStr, DateTimeUtils.DateTime);
System.out.println(result);
```

## Date转换成毫秒

```java
Date date = new Date();
long result = DateTimeUtils.toMillisecond(date);
System.out.println(result);
```

## LocalDateTime转换成毫秒

```java
LocalDateTime localDateTime = LocalDateTime.now();
long result = DateTimeUtils.toMillisecond(localDateTime);
System.out.println(result);
```

## LocalDate转换成毫秒

```java
LocalDate localDate = LocalDate.now();
long result = DateTimeUtils.toMillisecond(localDate);
System.out.println(result);
```

## Date转换成LocalDateTime

```java
Date date = new Date();
LocalDateTime result = DateTimeUtils.toLocalDateTime(date);
System.out.println(result);
```

## LocalDateTime转换成Date

```java
LocalDateTime localDateTime = LocalDateTime.now();
Date result = DateTimeUtils.toLocalDateTime(localDateTime);
System.out.println(result);
```



## LocalDateTime转换成OffsetDateTime

```java
LocalDateTime localDateTime = LocalDateTime.now();
OffsetDateTime offsetDateTime = DateTimeUtils.toOffsetDateTime(localDateTime);
```



提供时区偏移

```java
LocalDateTime localDateTime = LocalDateTime.now();
ZoneOffset zoneOffset = ZoneOffset.of("+8");
OffsetDateTime offsetDateTime = DateTimeUtils.toOffsetDateTime(localDateTime, zoneOffset);
```



提供偏移小时

```java
LocalDateTime localDateTime = LocalDateTime.now();
String offsetId = "+8"
OffsetDateTime offsetDateTime = DateTimeUtils.toOffsetDateTime(localDateTime, offsetId);
```



## 时间戳转换成LocalDateTime

```java
long timestamp = System.currentTimeMillis();
LocalDateTime result = DateTimeUtils.toLocalDateTime(timestamp);
System.out.println(result);
```

::: warning 注意
时间戳格式是毫秒！
:::

## 字符串合法性校验

```java
String dateTimeStr = "2023-04-27 18:00:00";
boolean result = DateTimeUtils.isValid(dateTimeStr, DateTimeUtils.DateTime);
System.out.println(result);
```

## 获取年份

```java
LocalDate localDate = LocalDate.now();
int result = DateTimeUtils.getYear(localDate);
System.out.println(result);
```

## 获取当前年份

```java
int result = DateTimeUtils.getYear();
System.out.println(result);
```

## 获取自然周的开始时间

```java
LocalDate localDate = LocalDate.now();
LocalDateTime result = DateTimeUtils.getStartOfNaturalWeek(localDate);
System.out.println(result);
```

::: tip 提示
自然周就是周一到周日。<br>
因此，返回的是，指定时间所在周的周一的时间。
:::

## 获取月份的开始时间

```java
LocalDate localDate = LocalDate.now();
LocalDateTime result = DateTimeUtils.getStartOfMonth(localDate);
System.out.println(result);
```

## 判断时间是否在区间内

```java
LocalTime localTime = LocalTime.of(10, 0, 0);
LocalTime startTime = LocalTime.of(8, 0, 0);
LocalTime endTime = LocalTime.of(12, 0, 0);
boolean result = DateTimeUtils.judgeInTimeDuration(localTime, startTime, endTime);
System.out.println(result);
```

::: tip 提示
1、返回true，表示在区间内；返回false，表示不再区间内。<br>
2、区间内，分为两种，跨天和不跨天。<br>
3、该方法不包含边界。
:::

## 判断时间是否在区间内，含边界

```java
LocalTime localTime = LocalTime.of(8, 0, 0);
LocalTime startTime = LocalTime.of(8, 0, 0);
LocalTime endTime = LocalTime.of(12, 0, 0);
boolean result = DateTimeUtils.judgeInTimeDurationWithBoundary(localTime, startTime, endTime);
System.out.println(result);
```

::: tip 提示
1、返回true，表示在区间内；返回false，表示不再区间内。<br>
2、区间内，分为两种，跨天和不跨天。<br>
3、该方法包含边界。
:::

## 时间戳转当天最小时间

```java
long timestamp = System.currentTimeMillis();
LocalDateTime result = DateTimeUtils.toLocalDateTimeMin(timestamp);
System.out.println(result);
```

::: warning 注意
时间戳格式是毫秒！
:::


## 获取当天最小时间

```java
LocalDateTime result = DateTimeUtils.toLocalDateTimeMin();
System.out.println(result);
```

## 日期转当天最小时间

```java
LocalDate localDate = LocalDate.now();
LocalDateTime result = DateTimeUtils.toLocalDateTimeMin(localDate);
System.out.println(result);
```

## 时间转当天最小时间

```java
LocalDateTime localDateTime = LocalDateTime.now();
LocalDateTime result = DateTimeUtils.toLocalDateTimeMin(localDateTime);
System.out.println(result);
```


## 时间戳转当天最大时间

```java
long timestamp = System.currentTimeMillis();
LocalDateTime result = DateTimeUtils.toLocalDateTimeMax(timestamp);
System.out.println(result);
```

::: warning 注意
时间戳格式是毫秒！
:::

## 获取当天最大时间

```java
LocalDateTime result = DateTimeUtils.toLocalDateTimeMax();
System.out.println(result);
```

## 日期转当天最大时间

```java
LocalDate localDate = LocalDate.now();
LocalDateTime result = DateTimeUtils.toLocalDateTimeMax(localDate);
System.out.println(result);
```

## 时间转当天最大时间

```java
LocalDateTime localDateTime = LocalDateTime.now();
LocalDateTime result = DateTimeUtils.toLocalDateTimeMax(localDateTime);
System.out.println(result);
```