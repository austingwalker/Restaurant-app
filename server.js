//Dependencies
//----------------------------------------

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Setup express app
//----------------------------------------

var app = express();
var PORT = process.env.PORT || 3000;

//Set up express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Table (DATA)
//----------------------------------------

var table = [
    { 
        customerName: "Austin",
        phoneNumber: "1234567890",
        customerEmail: "email@email.com",
        customerID: "1234"
    },
    { 
        customerName: "John",
        phoneNumber: "4444",
        customerEmail: "john@email.com",
        customerID: "4444"
    },
];

var waitingList = [{
    customerName: "Lauren",
    phoneNumber: "0987654321",
    customerEmail: "email@email.org",
    customerID: "4321"
}]

//Routes
//----------------------------------------

//---
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "home.html"))
});
//---
app.get("/tables", function(req, res){
    res.sendFile(path.join(__dirname, "tables.html"))

});
//---
app.get("/reserve", function(req, res){
    res.sendFile(path.join(__dirname, "reserve.html"))
});

//---
app.get("/api/tables", function(req, res){
    return res.json(table);
});
//---
app.get("/api/waitlist", function(req, res){
    return res.json(waitingList);
});
//---
app.post("/api/tables", function(req, res){
    
   if(table.length < 5){
       table.push(req.body);
       res.json(true);
   }
   else{
       waitingList.push(req.body);
       res.json(false)
   }

});

app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    table.length = [];
    waitingList.length = [];

    res.json({ ok: true });
  });

// Starts the server to begin listening
//----------------------------------------
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });