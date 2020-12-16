const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;      // use passed val or 3000

// define paths for Express config  TODO UPDATE
const publicDirectoryPath = path.join(__dirname, "../public");
const htmlPath = path.join(__dirname, "../public/html");

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.sendFile(path.join(htmlPath + "/index.html"));
})
    
// app.get("*", (req, res) => { 
//     res.sendFile(path.join(htmlPath +'/404.html'));
// })

app.listen(port, () => {
    console.log("Server started on port " + port + ".");
})