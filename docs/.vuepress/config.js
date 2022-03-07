module.exports = {
  base: '/fe-mindmap/',
  dest: './dist',
  title: 'fe-mindmap',
  // description: '前端学习，查漏补缺，思维导图',
  head: [
    ['link', { rel: 'icon', href: '/images/icon.png' }]
  ],
  plugins: ['@vuepress/medium-zoom'],
  themeConfig: {
    displayAllHeaders: true,
    lastUpdated: '上次更新',
    sidebarDepth: 0,
    sidebar: [
      { title: '总览', path: '/parts/map/' },
      {
        title: 'HTML',
        collapsable: false,
        children: ['/parts/html/']
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
          '/parts/css/bestPractice'
        ]
      },
      {
        title: 'JavaScript',
        collapsable: false,
        children: [
          '/parts/javascript/01-inBox',
          '/parts/javascript/02-overView',
          '/parts/javascript/03-keyConcepts',
          '/parts/javascript/11-executionContext',
          '/parts/javascript/20-handWritten'
        ]
      },
      {
        title: 'ECMA Script',
        collapsable: false,
        children: ['/parts/ECMA/']
      },
      {
        title: 'Web APIs',
        collapsable: false,
        children: ['/parts/webApis/', '/parts/webApis/DOM']
      },
      {
        title: '浏览器',
        collapsable: false,
        children: ['/parts/browser/', '/parts/browser/render']
      },
      {
        title: 'HTTP',
        collapsable: false,
        children: ['/parts/http/']
      },
      {
        title: '前端工程化',
        collapsable: false,
        children: ['/parts/engineering/']
      },
      {
        title: '数据结构与算法',
        collapsable: false,
        children: [
          '/parts/algorithms/',
          '/parts/algorithms/learningJavascriptAlgorithmsBook'
        ]
      },
      {
        title: '框架',
        collapsable: false,
        children: ['/parts/frame/']
      },
      {
        title: '网站安全',
        collapsable: false,
        children: ['/parts/safe/']
      }
    ]
  }
}