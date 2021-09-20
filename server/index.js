const express = require("express")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const apiRoutes = require("./router/api")
const PORT = process.env.PORT || 5000

const app = express()

const productionPath = path.resolve(__dirname, "public", "dist")


app.use(express.static(productionPath))
app.use(express.static(productionPath))

app.use(cors())
app.use(express.json())


apiRoutes(app)

app.get((req, res) => {
    res.status("404")
    .send("Page not found")
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})


