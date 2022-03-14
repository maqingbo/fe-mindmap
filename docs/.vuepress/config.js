module.exports = {
  base: '/fe-mindmap/',
  dest: './dist',
  title: 'fe-mindmap',
  // description: '前端学习，查漏补缺，思维导图',
  head: [
    ['link', { rel: 'icon', href: '/images/icon.png' }]
  ],
  markdown: {
    lineNumbers: true
  },
  plugins: ['@vuepress/medium-zoom'],
  themeConfig: {
    displayAllHeaders: false,
    lastUpdated: '上次更新',
    sidebarDepth: 2,
    sidebar: [
      { title: '总览', path: '/parts/map/' },
      {
        title: 'HTML',
        collapsable: false,
        children: [
          ['/parts/html/', '收集箱'],
          ['/parts/html/interview', '面试题']
        ]
      },
      {
        title: 'CSS',
        collapsable: false,
        children: [
          '/parts/css/',
          '/parts/css/overView',
          '/parts/css/keyConcepts',
          '/parts/css/atRules',
          '/parts/css/inlineFormatting',
          '/parts/css/stackingContext',
          '/parts/css/preprocessor',
          '/parts/css/sass-mixin',
          '/parts/css/bestPractice',
          ['/parts/css/interview', '面试题']
        ]
      },
      {
        title: 'JavaScript',
        collapsable: false,
        children: [
          '/parts/javascript/inBox',
          '/parts/javascript/overView',
          ['/parts/javascript/execution', 'JS 执行过程'],
          ['/parts/javascript/closure', '闭包'],
          ['/parts/javascript/function', '函数'],
          ['/parts/javascript/prototype', '原型与继承'],
          ['/parts/javascript/async', '异步编程'],
          '/parts/javascript/handWritten'
        ]
      },
      {
        title: 'Web APIs',
        collapsable: false,
        children: ['/parts/webApis/', '/parts/webApis/DOM']
      },
      {
        title: '浏览器',
        collapsable: false,
        children: [
          ['/parts/browser/', '收集箱'],
          ['/parts/browser/render', '内部原理'],
          ['/parts/browser/storage', '本地存储'],
          ['/parts/browser/cache', '缓存'],
          ['/parts/browser/client', '客户端能力'],
          ['/parts/browser/interview', '面试题']
        ]
      },
      {
        title: '网络通信',
        collapsable: false,
        children: [
          ['/parts/network/', '收集箱'],
          ['/parts/network/protocol', '网络协议'],
          ['/parts/network/security', '网络安全']
        ]
      },
      {
        title: '前端工程化',
        collapsable: false,
        children: [
          ['/parts/engineering/', '收集箱']
        ]
      },
      {
        title: '数据结构与算法',
        collapsable: false,
        children: [
          '/parts/algorithms/',
          '/parts/algorithms/learningJavascriptAlgorithmsBook'
        ]
      },
      // {
      //   title: 'Vue',
      //   collapsable: false,
      //   children: [
      //     ['/parts/vue/', '收集箱'],
      //     ['/parts/vue/base', '基础'],
      //     ['/parts/vue/component', '组件'],
      //     ['/parts/vue/principle', '原理'],
      //     ['/parts/vue/source', '源码']
      //   ]
      // }
    ]
  }
}