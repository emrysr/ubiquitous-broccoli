'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API: '"http://localhost:80/emoncms/"',
  API_KEY: '"cb9579be83678b89a5eb0faea08ad839"'
})
