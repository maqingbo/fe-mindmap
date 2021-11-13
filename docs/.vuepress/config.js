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
      { title: 'HTML', children: ['/parts/html/'] },
      {
        title: 'CSS',
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
        children: [
          '/parts/javascript/01-inBox',
          '/parts/javascript/02-overView',
          '/parts/javascript/03-keyConcepts',
          '/parts/javascript/11-executionContext',
          '/parts/javascript/20-handWritten'
        ]
      },
      { title: 'ECMA Script', children: ['/parts/ECMA/'] },
      { title: 'Web APIs', children: ['/parts/webApis/', '/parts/webApis/DOM'] },
      { title: '浏览器', children: ['/parts/browser/', '/parts/browser/render'] },
      { title: 'HTTP', children: ['/parts/http/'] },
      { title: '前端工程化', children: ['/parts/engineering/'] },
      {
        title: '数据结构与算法', children: [
          '/parts/algorithms/',
          '/parts/algorithms/learningJavascriptAlgorithmsBook'
        ]
      },
      { title: '框架', children: ['/parts/frame/'] },
      { title: '网站安全', children: ['/parts/safe/'] }
    ]
  }
}