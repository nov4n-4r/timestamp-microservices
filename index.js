const express = require("express")

const app = express()

app.set("view engine", "ejs")

app.get(`/`, (req,res) => {
    res.send(`
    <div>
        <p>Example : <a href="/api/2022-07-12"> /api/timestamp-microservices/2022-07-12 </a></p>
        <p>Example : <a href="/api/1657584000000"> /api/timestamp-microservices/1657584000000 </a></p>
        <p> It'll be the same </p>
    </div>
    `)
})
app.get(`/api/:date`, (req, res) => {
    let query = req.params.date
    const type1 = new Date(query) 
    const type2 = new Date(parseInt(query))

    if(type1.toString() !== "Invalid Date"){
        console.log(type1);
        const date = type1
        return res.json({
            unix : date.getTime(),
            utc : date.toUTCString()
        })
    }else if(type2.toString() !== "Invalid Date"){
        const pattern = /\D/g
        if(pattern.test(query)) return res.json({error : "Invalid Date"})
        const date = type2
        return res.json({
            unix : date.getTime(),
            utc : date.toUTCString()
        })
    }else{
        return res.json({
            error : "Invalid Date"
        })
    }
})

app.listen(4000)