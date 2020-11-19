
'use strict'

// const mongooseCrudify = require('mongoose-crudify')

// const helpers = require('../services/helpers')
const Kitten = require('../models/example')

module.exports = function (server) {
  // Docs: https://github.com/ryo718/mongoose-crudify
  server.use(
    '/api/kittens',
    (req,res)=>{
      res.send("true")
    }
    // mongooseCrudify({
    //   Model: Kitten,
    //   selectFields: '-__v', // Hide '__v' property
    //   endResponseInAction: false,

    //   // beforeActions: [],
    //   // actions: {}, // list (GET), create (POST), read (GET), update (PUT), delete (DELETE)
    //   afterActions: [
    //     { middlewares: [helpers.formatResponse] }
    //   ]
    // })
  )
}