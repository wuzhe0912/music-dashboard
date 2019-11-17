// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Vue Couture',
  siteDescription: 'Gridsome Blog',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'blogPost',
        path: './content/posts/**/*.md',
      }
    }
  ],
  templates: {
    blogPost: '/posts/:year/:month/:day/:slug'
  },
  chainWebpack: config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
  }
}
