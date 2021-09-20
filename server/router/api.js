const path = require("path")

const jsonMaker = require("./step2")

module.exports = function (app) {
    app.get("/", (req, res) => {
        let reqPath = path.join(__dirname, "../public/dist/index.html")
        res.sendFile(reqPath)
    })

    app.get("/api", (req, res) => {
        let jsonFile = jsonMaker()
        res.json(jsonFile)
    })
}
