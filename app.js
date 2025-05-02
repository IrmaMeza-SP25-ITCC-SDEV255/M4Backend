
// similar to when you use default tags in html
const express = require("express")
var cors = require('cors')
// tells app variable to be an express server 
const router = express.Router()
const bodyParser = require("body-parser")
const Song = require("./models/song")
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

// grab single song in db 
router.get("/songs/:id", async (req, res) => {
    try {
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch(err) {
        res.status(400).send(err)
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

// update is to update existing record/resource/database entry.. uses a put request
router.put("/songs/:id", async (req, res) => {
    //first need to find & update the song front end wants us to updates
    // to do this, need to request id of song from req, find in db, update it
    try {
        const song = req.body
        await Song.updateOne({ _id: req.params.id }, song)
        console.log(song)
        res.sendStatus(204)
    }
    catch (err) {
        if (err) {
            res.status(400).send(err)
        }
    }
})


app.use("/api", router)
app.listen(3000)