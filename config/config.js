const appName = 'nextjs-express-mongoose-crudify-boilerplate'
const databaseName = 'nextjs-express-boilerplate'
const serverPort = process.env.PORT || 3122
const pdf_server_url = "http://127.0.0.1:5000";
const completeConfig = {

  default: {
    appName,
    serverPort,
    databaseUrl:'mongodb+srv://root:A260196r.@routeplan-d416l.gcp.mongodb.net/keshev?retryWrites=true&w=majority',
    jsonOptions: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  },

  development: {
    appUrl: `http://localhost:${serverPort}/`
  },

  production: {
    appUrl: `https://nextjs-express-mongoose.herokuapp.com/`
  }

}

// Public API
module.exports = {
  config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
  completeConfig,
  pdf_server_url
}