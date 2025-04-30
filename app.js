
// similar to when you use default tags in html
const express = require("express")
var cors = require('cors')
// tells app variable to be an express server 
const router = express.Router()
const bodyParser = require("body-parser")
const Song = require("./models/songs")
const app = express()
app.use(cors())

app.use(bodyParser.json())

// get all songs in the database
router.get("/songs", async (req, res) => {
    try {
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch (err) {
        console.log(err)
    }
})

//adding songs to db
router.post("/songs", async (req, res) => {
    try {
        const song = new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(err)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//start web server, format -> app.listen(portnumber,function)

//making api using routes
// routes are used to handle browser requests, appear like URLs.

// GET or regular request when someone goes to http://localhost:3000/hello
// when using function in route, almost always have parameter or handle a response or request

// router.get("/songs", function (req, res) {
//     const songs = [
//         {
//             title: "We Found Love",
//             artist: "Rihanna",
//             popularity: 10,
//             releaseDate: new Date(2011, 9, 22),
//             genre: ["electro house"]
//         },
//         {
//             title: "Happy",
//             artist: "Pharrell Williams",
//             popularity: 10,
//             releaseDate: new Date(2013, 11, 21),
//             genre: ["soul", "new soul"]
//         }
//      ];

//     res.json(songs)
// })

// all requests that usually use an api start w /api.. so url would be localhost:3000/api/songs
app.use("/api", router)
app.listen(3000)