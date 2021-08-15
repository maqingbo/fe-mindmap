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
    // displayAllHeaders: true,
    lastUpdated: '上次更新',
    sidebarDepth: 2,
    sidebar: {
      '/parts/': [
        'OTC',
        'html',
        'css',
        'overView',
        'ECMA',
        'jsCore',
        'DOM',
        'browser',
        'http',
        'engineering',
        'algorithms',
        'frame',
        'safe'
      ]
    }
  }
}