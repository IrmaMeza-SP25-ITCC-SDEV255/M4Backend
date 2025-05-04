
// similar to when you use default tags in html
const express = require("express")
var cors = require('cors')
// tells app variable to be an express server 
const router = express.Router();
const secret = "supersecret"
const bodyParser = require("body-parser")
const jwt = require("jwt-simple")
const User = require("./models/users")
const Song = require("./models/song")
const app = express()
app.use(cors())


app.use(bodyParser.json())


// creating new user
router.post("/user", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ error: "Missing username or password" })
    }

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })
    try {
        await newUser.save()
        console.log(newUser)
        res.sendStatus(201) //created
    }
    catch(err) {
        res.status(400).send(err)
    }
})

// authenticate or login
// post request bc when you login you are creating a new 'session'
router.post("/auth", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ error: "Missing username or password" })
        return 
    }
    //try to find username in the db then see if it matches w a username & password
    //await finding a user
    let user = await User.findOne({ username: req.body.username })

        // if cannot find the user
    if (!user) {
            res.status(401).json({error: "Bad Username"})
        }
        //check if users password matches requests password
        else {
            if (user.password != req.body.password) {
                res.status(401).json({error: "Bad Password"})
            }
            //successful login
            else {
                // create token that's encoded w the jwt library & send back the username
                //we also will send back as part of the token that you are currently authorized. can do this w a boolean or number value ie. if auth = 0 you arent authorized, if auth = 1 you are authorized.
                username2 = user.username
                const token = jwt.encode({ username: user.username }, secret)
                const auth = 1

                //respond with token 
                res.json({
                    username2,
                    token: token,
                    auth: auth
                })
            }
        }
})
    
//check status of user with a valid token, see if matches front end token
router.get("/status", async (req, res) => {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth"})
    }
    const token = req.headers["x-auth"]
    try {
        const decoded = jwt.decode(token, secret)

        //send back all username and status fields to user on front end
        let users = User.find({}, "username status")
        res.json(users)
    }
    catch (ex) {
        res.status(401).json({error: "Invalid jwt"})
    }
})


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
        res.status(400).send(err)
    }
})

router.delete("/songs/:id", async(req, res) => {
    // method or function in mongoose/mongo to delete single instance of a song or object
    try {
        const song = await Song.findById(req.params.id)
        console.log(song)
        await Song.deleteOne({ _id: song._id })
        res.sendStatus(204)
    }
    catch(err) {
        res.status(400).send(err)
    }
    
})


app.use("/api", router)
app.listen(3000)