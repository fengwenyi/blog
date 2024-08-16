# Spel 表达式

模板占位替换，在项目开发中，还是很常用的。比如在代码中获取参数，消息推送可以使用变量占位，我比较推荐使用 SPEL 表达式。

1. 在注解中，获取方法的参数

```java
public class SpElParser {

    private static final ExpressionParser parser = new SpelExpressionParser();

    public static String getKey(String key, String [] parameterNames, Object [] args) {
        Expression expression = parser.parseExpression(key);
        EvaluationContext context = new StandardEvaluationContext();
        if (args.length == 0) {
            return null;
        }
        for (int i = 0; i < args.length; i++) {
            context.setVariable(parameterNames[i], args[i]);
        }
        return expression.getValue(context, String.class);
    }

}
```

用法：

@LogRecord(logBizId = "#dto.id")

@LogRecord(logBizId = "#dto.id + '_' + #dto.name")


2. 模板占位替换

```java
    public static String convert(String content, Map<String, String> paramMap) {
        if (!StringUtils.hasText(content) || CollectionUtils.isEmpty(paramMap)) {
            return content;
        }
        ExpressionParser parser = new SpelExpressionParser();
        TemplateParserContext parserContext = new TemplateParserContext();
        return parser
                .parseExpression(content, parserContext)
                .getValue(paramMap, String.class);
    }

    public static String convert(String content, String json) {
        if (!StringUtils.hasText(content) || !StringUtils.hasText(json)) {
            return content;
        }
        Map<String, String> paramMap = JacksonUtils.jsonObject(
                json,
                new TypeReference<Map<String, String>>() {
                }
        );
        return convert(content, paramMap);
    }
```

```json
{
    "name":"张三"
}
```

用法1，变量占位替换

```java
String content = "#{[name]}";
```

用法2，变量占位替换 + 字符串拼接

```java
String content = "#{'Hello, ' + [name] + '!'}"; 
```

用法3，判断变量是否为空

```java
String content = "#{[name1] != null ? 'Hello, ' + [name1] + '!' : ''}"; 
```
