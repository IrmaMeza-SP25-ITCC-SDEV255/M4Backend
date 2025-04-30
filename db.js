const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://imeza2:Password@songdb.ewiipfy.mongodb.net/?retryWrites=true&w=majority&appName=SongDB", { useNewUrlParser: true })

module.exports = mongoose

