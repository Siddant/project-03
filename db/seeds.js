require('dotenv').config()

const mongoose = require('mongoose')
const Promise = require('bluebird')

const rp = require('request-promise')

mongoose.Promise = Promise

const Package = require('../models/package')
const Project = require('../models/project')
const User = require('../models/user')



//Connect to database
mongoose.connect(process.env.MONGODB_URI, (err, db) => {
  //Delete all database data
  db.dropDatabase()
    //Create a user
    .then( ()=>{
      return Promise.props({
        james: User.create({
          username: 'James',
          password: 'pass',
          passwordConfirmation: 'pass',
          email: 'james@email.com',
          image: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/13592585_820157962567_7587254174743103700_n.jpg?_nc_cat=107&_nc_ht=scontent-lhr3-1.xx&oh=aeb90d73de4bda5f560059b37658a67f&oe=5CE8FD2F',
          bio: 'I love packages!'
        }),

        siddant: User.create({
          username: 'Siddant',
          password: 'pass',
          passwordConfirmation: 'pass',
          email: 'siddant@email.com',
          image: 'https://i.pinimg.com/originals/39/6f/14/396f14bd9c68652906500047d677356c.jpg',
          bio: 'I love puppies!!'
        }),

        begona: User.create({
          username: 'Begona',
          password: 'pass',
          passwordConfirmation: 'pass',
          email: 'begona@email.com',
          image: 'https://i.pinimg.com/236x/1c/36/98/1c36985c307ab381e3f73340e197f008--white-puppies-white-dogs.jpg?b=t',
          bio: 'I love cute puppies!!'
        })
      })
    })
    //Create users projects
    .then((users)=>{

      Project.create({
        name: 'Beautiful Project',
        description: 'The most beautiful',
        user: users.begona,
        visible: true

      })
      Project.create({
        name: 'Beautiful Project two',
        description: 'The second most beautiful',
        user: users.begona,
        visible: true

      })
      Project.create({
        name: 'Beautiful Project three',
        description: 'The third most beautiful',
        user: users.begona,
        visible: true
      })

      Project.create({
        name: 'Excellent Project',
        description: 'The most excellent',
        user: users.siddant,
        public: true
      })
      Project.create({
        name: 'Excellent Project two',
        description: 'The second most excellent',
        user: users.siddant,
        public: true
      })
      Project.create({
        name: 'Excellent Project three',
        description: 'The third most excellent',
        user: users.siddant,
        public: true
      })

      Project.create({
        name: 'Superb Project',
        description: 'The most superb',
        user: users.james,
        public: true
      })
      Project.create({
        name: 'Superb Project two',
        description: 'The second most superb',
        user: users.james,
        public: true
      })
      Project.create({
        name: 'Superb Project three',
        description: 'The third most superb',
        user: users.james,
        public: true
      })


      return (users)
    })
    // })
    // .then( (users)=> Package.create([
    //   {
    //   name: 'webpack',
    //   description: 'Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: ['webpack'],
    //   downloadsCount: 22629569,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   },{
    //     text: 'Most beautiful package ever!',
    //     user: users.begona
    //   }]
    // },{
    //   name: 'webpack-dev-server',
    //   description: 'Serves a webpack app. Updates the browser on changes.',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: ['webpack', 'server', 'development'],
    //   downloadsCount: 13643230,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   }]
    // },{
    //   name: 'webpack-dev-middleware',
    //   description: 'A development middleware for webpack',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: ['webpack'],
    //   downloadsCount: 17615165,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   }]
    // },{
    //   name: 'file-loader',
    //   description: 'A file loader module for webpack',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: ['webpack', 'file-loader' ],
    //   downloadsCount: 16021065,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   }]
    // },{
    //   name: 'postcss-loader',
    //   description: 'PostCSS loader for webpack',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: ['css', 'postcss','postcss-runner','webpack','webpack-loader'],
    //   downloadsCount: 16021065,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   }]
    // },{
    //   name: 'html-webpack-plugin',
    //   description: 'Simplifies creation of HTML files to serve your webpack bundles',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: ['webpack','plugin','html','html-webpack-plugin'],
    //   downloadsCount: 10753297,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   }]
    // },{
    //   name: 'url-loader',
    //   description: 'A loader for webpack which transforms files into base64 URIs',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: ['webpack', 'url', 'url-loader'],
    //   downloadsCount: 11671284,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   }]
    // },{
    //   name: 'webpack-bundle-analyzer',
    //   description: 'Webpack plugin and CLI utility that represents bundle content as convenient interactive zoomable treemap',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: ['webpack', 'bundle', 'analyzer', 'modules', 'size', 'interactive', 'chart', 'treemap', 'zoomable', 'zoom'],
    //   downloadsCount: 3862578,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   }]
    // },{
    //   name: 'sass-loader',
    //   description: 'Sass loader for webpack',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: [ 'sass', 'libsass', 'webpack', 'loader'],
    //   downloadsCount: 9913408,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   }]
    // },{
    //   name: 'webpack-cli',
    //   description: 'CLI for webpack & friends',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: [ 'webpack', 'cli', 'scaffolding', 'module', 'bundler'],
    //   downloadsCount: 4891405,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   }]
    // },{
    //   name: 'terser-webpack-plugin',
    //   description: 'Terser plugin for webpack',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: [ 'uglify', 'uglify-js', 'uglify-es', 'terser', 'webpack', 'webpack-plugin', 'minification', 'compress', 'compressor', 'min', 'minification', 'minifier', 'minify', 'optimize', 'optimizer'],
    //   downloadsCount: 5988334,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   }]
    // },{
    //   name: 'case-sensitive-paths-webpack-plugin',
    //   description: 'Enforces module path case sensitivity in Webpack',
    //   icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
    //   version: '3.1.14',
    //   keywords: ['webpack', 'plugin', 'case sensitive', 'import', 'require'],
    //   downloadsCount: 6755529,
    //   comments: [{
    //     text: 'This is great!',
    //     user: users.james
    //   },{
    //     text: 'Best package ever!',
    //     user: users.siddant
    //   }]
    // }])
    // )
    .then( (users)=> Package.create([
      {
        name: 'zqxzqxqzxqzxqzx',
        description: 'Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.',
        icon: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png',
        version: '3.1.14',
        keywords: ['webpack'],
        downloadsCount: 22629569,
        comments: [{
          text: 'This is great!',
          user: users.james
        },{
          text: 'Best package ever!',
          user: users.siddant
        },{
          text: 'Most beautiful package ever!',
          user: users.begona
        }]
      }])
    )


    .then(() => console.log('Database successfully seeded'))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
