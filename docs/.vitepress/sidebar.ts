export default {
    '/javalib/': [
      {
        text: '转换',
        items: [
          { text: '日期时间工具类', link: '/javalib/DateTimeUtils' },
          { text: '进制转换工具类', link: '/javalib/HexUtils' },
          { text: 'JSON工具类', link: '/javalib/JsonUtils' },
          { text: 'XML工具类', link: '/javalib/XmlUtils' },
        ]
      },
      {
        text: '加解密',
        items: [
          { text: 'MD5工具类', link: '/javalib/Md5Utils' },
          { text: 'BASE64工具类', link: '/javalib/Base64Utils' },
          { text: 'RSA工具类', link: '/javalib/RsaUtils' },
          { text: 'SHA工具类', link: '/javalib/ShaUtils' },
        ]
      },
      {
        text: '网络',
        items: [
          { text: 'HTTP工具类', link: '/javalib/HttpUtils' },
        ]
      },
      {
        text: '其他',
        items: [
          { text: 'Bean工具类', link: '/javalib/BeanUtils' },
        ]
      },
    ],
    'blog': [
      {text: 'OffsetDateTime', link: '/blog/OffsetDateTime.md'},
      {text: '20230909 微信小程序支付 V3', link: '/blog/20230909_wechatAppletPayV3.md'},
      {text: '我的 Spring Boot 启动器', link: '/blog/my_spring-boot-starter.md'},
      {text: 'Spring Boot RabbitMQ 延迟队列', link: '/blog/springboot_rabbitmq_delay_queue.md'},
      {text: 'RabbitMQ 多消费者', link: '/blog/rabbitmq_multiple_consumer.md'},
      {text: 'Spring Boot 事件', link: '/blog/springboot_event.md'},
      {text: 'Spring Data Redis POJO 序列化问题', link: '/blog/spring-data/spring-data-redis-pojo-serializer-problem/index.md'},
      {text: 'Spring Boot AOP 顺序', link: '/blog/spring-boot-aop-order.md'},
      {text: 'SpEL', link: '/blog/spel.md'},
      {text: 'Spring Boot 部署', link: '/blog/springboot-deployment.md'},
      {
        text: 'Electron',
        items: [
            { text: 'Electron App 自动更新', link: '/blog/electron/auto-update/electron-app-auto-update' },
        ]
      },
    ]
  }