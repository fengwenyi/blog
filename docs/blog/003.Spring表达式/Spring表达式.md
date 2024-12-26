# Spring 表达式 （SPEL）

### 1. **`#{}`** — 用于计算表达式的值

`#{}` 是SpEL的常规语法，用于在Spring中解析表达式并计算其结果。它通常用来执行动态的计算或方法调用，或者从Spring上下文中访问某些bean。

```java
@Value("#{2 + 2}")
private int sum;  // 将注入 4

@Value("#{T(java.lang.Math).random()}")
private double randomValue;  // 将注入一个随机值

@Value("#{beanName.someMethod()}")
private String result;  // 调用beanName的someMethod()方法
```



### 2. **`#{[]}`** — 用于计算集合或数组

`#{[]}` 是SpEL的一种特殊用法，它用于在表达式中创建和操作集合，如列表、数组或集合（Set）。这个语法经常用于创建集合对象或进行集合的计算。

```java
@Value("#{[1, 2, 3, 4]}")
private List<Integer> numberList;  // 将注入一个包含整数1, 2, 3, 4的List

@Value("#{['apple', 'banana', 'cherry']}")
private Set<String> fruitSet;  // 将注入一个包含字符串的Set

@Value("#{T(java.util.Arrays).asList('a', 'b', 'c')}")
private List<String> lettersList;  // 使用Java的Arrays.asList创建一个List
```



### 总结

- `#{}` 用于计算表达式的值（例如数学运算、调用方法、访问bean）。
- `#{[]}` 用于创建和操作集合或数组。

所以，`#{[]}` 是`#{}`的一种扩展，它允许你直接在表达式中处理集合类型的数据结构。