const express = require("express")

const app = express()

const isNan = target => !(parseInt(target) === parseInt(target))
const isNumber = target => (/^[0-9]+$/).test(target)

app.get("/api/:date", (req, res) => {
  console.log(req.params)
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
