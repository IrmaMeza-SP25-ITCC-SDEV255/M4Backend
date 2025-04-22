
// similar to when you use default tags in html
const express = require("express")
// tells app variable to be an express server
const app = express() 

//start web server, format -> app.listen(portnumber,function)
app.listen(3000, function () {
    console.log("Listening on port 3000")
})

//making api using routes
// routes are used to handle browser requests, appear like URLs.

// GET or regular request when someone goes to http://localhost:3000/hello
// when using function in route, almost always have parameter or handle a response or request
app.get("/hello", function (req, res) {
    res.send("<h1>Hello Express</h1>")
})

app.get("/goodbye", function (req, res) {
    res.send("<h1>Goodbye, Express!</h1>")
})

