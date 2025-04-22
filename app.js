
// similar to when you use default tags in html
const express = require("express")
var cors = require('cors')
// tells app variable to be an express server
const app = express() 
app.use(cors())
const router = express.Router()


//start web server, format -> app.listen(portnumber,function)

//making api using routes
// routes are used to handle browser requests, appear like URLs.

// GET or regular request when someone goes to http://localhost:3000/hello
// when using function in route, almost always have parameter or handle a response or request

router.get("/songs", function (req, res) {
    const songs = [
        {
            title: "We Found Love",
            artist: "Rihanna",
            popularity: 10,
            releaseDate: new Date(2011, 9, 22),
            genre: ["electro house"]
        },
        {
            title: "Happy",
            artist: "Pharrell Williams",
            popularity: 10,
            releaseDate: new Date(2013, 11, 21),
            genre: ["soul", "new soul"]
        }
     ];

    res.json(songs)
})

// all requests that usually use an api start w /api.. so url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)