import { defineConfig } from 'vitepress'

import nav from './nav'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh',
  title: "JavaLib",
  description: "A Java Library",
  lastUpdated: true,

  themeConfig: {
    logo: '/logo-512x512.png',
    logoLink: '/3.0.0/index',
    lastUpdatedText: '更新时间',
    docFooter: {
      prev: '前一篇',
      next: '后一篇',
    },
    outline: {
      label: '页面导航',
    },
    i18nRouting: true,
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fengwenyi/JavaLib' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2017-2024 Erwin Feng'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    }
  }
})
