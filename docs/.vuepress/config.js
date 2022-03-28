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
          ['/parts/css/', '收集箱'],
          ['/parts/css/overView', '概览'],
          ['/parts/css/keyConcepts', '关键概念'],
          ['/parts/css/atRules', 'atRules'],
          ['/parts/css/inlineFormatting', '视觉排版模型细节'],
          ['/parts/css/stackingContext', '层叠上下文'],
          ['/parts/css/processor', 'CSS 处理器'],
          ['/parts/css/mixin', '常用 mixin'],
          ['/parts/css/h5', '移动端'],
          ['/parts/css/bestPractice', '最佳实践'],
          ['/parts/css/interview', '面试题']
        ]
      },
      {
        title: 'JavaScript',
        collapsable: false,
        children: [
          ['/parts/javascript/inBox', '收集箱'],
          ['/parts/javascript/overView', '概念'],
          ['/parts/javascript/execution', 'JS 执行过程'],
          ['/parts/javascript/closure', '闭包'],
          ['/parts/javascript/function', '函数'],
          ['/parts/javascript/prototype', '原型与继承'],
          ['/parts/javascript/async', '异步编程'],
          ['/parts/javascript/promise', 'Promise'],
          ['/parts/javascript/module', '模块化'],
          ['/parts/javascript/handWritten', '手写系列']
        ]
      },
      {
        title: 'Web APIs',
        collapsable: false,
        children: [
          ['/parts/webApis/', '收集箱'],
          ['/parts/webApis/DOM', 'DOM'],
          ['/parts/webApis/event', '事件'],
          ['/parts/webApis/BOM', 'BOM'],
          ['/parts/webApis/ajax', 'Ajax'],
          ['/parts/webApis/storage', '本地存储']
        ]
      },
      {
        title: '浏览器',
        collapsable: false,
        children: [
          ['/parts/browser/', '收集箱'],
          ['/parts/browser/render', '内部原理'],
          ['/parts/browser/cache', '缓存'],
          ['/parts/browser/client', '客户端能力'],
          ['/parts/browser/performance', '性能优化'],
          ['/parts/browser/interview', '面试题']
        ]
      },
      {
        title: '网络通信',
        collapsable: false,
        children: [
          ['/parts/network/', '收集箱'],
          ['/parts/network/protocol', '网络协议'],
          ['/parts/network/http', 'HTTP'],
          ['/parts/network/security', '网络安全'],
        ]
      },
      {
        title: 'Vue',
        collapsable: false,
        children: [
          ['/parts/vue/', '收集箱'],
          ['/parts/vue/base', '基础'],
          ['/parts/vue/component', '组件'],
          ['/parts/vue/principle', '原理'],
          ['/parts/vue/ecosystem', '生态'],
          ['/parts/vue/source', '源码'],
          ['/parts/vue/berwin', '深入浅出 Vue.js'],
          ['/parts/vue/interview', '面试题']
        ]
      },
      {
        title: '前端工程化',
        collapsable: false,
        children: [
          ['/parts/engineering/', '收集箱'],
          ['/parts/engineering/script', '脚本'],
          ['/parts/engineering/standard', '规范'],
          ['/parts/engineering/test', '测试、监控'],
          ['/parts/engineering/design', '工程设计'],
          ['/parts/engineering/build', '构建'],
          ['/parts/engineering/devops', '持续集成'],
          ['/parts/engineering/git', 'Git']
        ]
      },
      {
        title: '数据结构与算法',
        collapsable: false,
        children: [
          ['/parts/algorithms/dataStructure', '数据结构'],
          ['/parts/algorithms/algorithm', '算法'],
          ['/parts/algorithms/sort', '排序'],
          ['/parts/algorithms/topic', '题目'],
          ['/parts/algorithms/bookNote', '学习JavaScript数据结构与算法']
        ]
      }
    ]
  }
}