import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { searchPlugin } from '@vuepress/plugin-search'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '冯文议博客',
  description: '冯文议技术博客, 技术总结与分享',
  head: [['link', { rel: 'icon', href: '/images/logo/favicon.ico' }]],
  theme: defaultTheme({
    logo: '/images/logo/logo-512x512.png',
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '博客',
        link: '/blog/',
      },
    ],
    sidebar: {
      '/blog/': [
        {
          text: '指南',
          children: [
            '/blog/',
            '/blog/getting-started.md',
            '/blog/OffsetDateTime.md',
            '/blog/20230909_wechatAppletPayV3.md',
            '/blog/my_spring-boot-starter.md',
            '/blog/springboot_rabbitmq_delay_queue.md',
            '/blog/rabbitmq_multiple_consumer.md'
          ],
        },
      ],
    },
    contributorsText: '贡献者',
    lastUpdatedText: '最后更新时间',
    tip: '提示',
    warning: '注意',
    danger: '警告',
    repo: 'https://github.com/fengwenyi/blog',
    editLinkText: '编辑',
    docsDir: 'docs'
  }),
  plugins: [
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
      },
    }),
  ],
})