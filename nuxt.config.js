const {
  join
} = require('path')
module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'starter',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [

      {
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
        rel: "stylesheet"
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.css', {
    src: '~/assets/css/app.styl',
    lang: 'styl'
  }],

  /*
   ** Add axios globally
   */
  
  plugins: ['~plugins/vuetify.js'],
  build: {
  }
}