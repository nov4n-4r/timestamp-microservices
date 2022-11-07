const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())

const isNumber = target => (/^[0-9]+$/).test(target)

app.get("/api", (req, res) => {
  const date = new Date()
  return res.json({
    unix : date.getTime(),
    utc : date.toUTCString()
  })
})
  
app.get("/api/:date", (req, res) => {
  const arg = !isNumber(req.params.date) ? 
      req.params.date : parseInt(req.params.date)

  const date = new Date(arg)

  if(date.toString() === "Invalid Date") return res.json({error : date.toString()})

  return res.json({
    unix : date.getTime(),
    utc : date.toUTCString()
  })
})

app.listen(80, () => console.log("Server running at port 80..."))
