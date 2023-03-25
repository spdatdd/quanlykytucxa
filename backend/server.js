const app = require("./app");
const config = require("./config")
const MongoDB = require("./utils/mongodb.util")

async function startServer(){
  await MongoDB.connect(config.db.uri)
  console.log("connected to the database!")

  const PORT = config.app.port
  app.listen(PORT)
}

startServer()