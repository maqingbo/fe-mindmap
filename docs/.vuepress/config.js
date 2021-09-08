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
      { title: 'CSS', children: ['/parts/css/mindMap', '/parts/css/', '/parts/css/zjsj', '/parts/css/z-index', '/parts/css/sass-mixin'] },
      { title: 'JS 概览', children: ['/parts/overView/'] },
      { title: 'ECMA Script', children: ['/parts/ECMA/'] },
      { title: 'JS 核心及原理', children: ['/parts/jsCore/'] },
      { title: 'DOM', children: ['/parts/DOM/'] },
      { title: '浏览器', children: ['/parts/browser/', '/parts/browser/render'] },
      { title: 'HTTP', children: ['/parts/http/'] },
      { title: '前端工程化', children: ['/parts/engineering/'] },
      { title: '数据结构与算法', children: ['/parts/algorithms/'] },
      { title: '框架', children: ['/parts/frame/'] },
      { title: '网站安全', children: ['/parts/safe/'] }
    ]
  }
}