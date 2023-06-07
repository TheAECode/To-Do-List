const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
// the reason behind line 6 is due that item in the function res.render have not uet been read by the computer as it only works after the user input something
const WorkItems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    let day = date();

    res.render("list", { ListTitle: day, newListItems: items });
});




app.post("/", function (req, res) {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        WorkItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }


});

app.get("/work", function (req, res) {
    res.render("list", { ListTitle: "Work List", newListItems: WorkItems });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
