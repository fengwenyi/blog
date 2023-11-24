# SpringBoot RabbitMQ 多消费者

先简单描述一下，首先，要设定交换机的模式为广播模式，然后将队列和交换机进行绑定，就能实现多个消费者消费统一消息

声明交换机

```java
@Bean
public FanoutExchange demoFanoutExchange() {
    return ExchangeBuilder
            .fanoutExchange(FANOUT_EXCHANGE_DEMO)
            .build();
}
```

声明消费者1的队列

```java
@Bean
public Queue consumer01Queue() {
    return QueueBuilder.durable("queue_consumer01").build();
}
```

将消费者1队列和交换机绑定

```java
@Bean
public Binding consumer01QueueDemoFanoutExchangeBinding() {
    return BindingBuilder
            .bind(consumer01Queue())
            .to(demoFanoutExchange())
            ;
}
```

声明消费者2的队列

```java
@Bean
public Queue consumer02Queue() {
    return QueueBuilder.durable("queue_consumer02").build();
}
```

将消费者2队列和交换机绑定

```java
@Bean
public Binding consumer02QueueDemoFanoutExchangeBinding() {
    return BindingBuilder
            .bind(consumer02Queue())
            .to(demoFanoutExchange())
            ;
}
```

测试发送数据

```java
@Autowired
private RabbitTemplate rabbitTemplate;

@Test
public void testSendMultipleConsumerMsg() {
    rabbitTemplate.convertAndSend(RabbitMQConfig.FANOUT_EXCHANGE_DEMO, "", "这是一条可以被多端消费的消息");
}
```

示例项目：https://github.com/fengwenyi/spring-boot-demo/tree/2.7.x/demo-spring-boot-rabbitmq