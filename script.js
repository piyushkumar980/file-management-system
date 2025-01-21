const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    res.render("index", { files: files }); //basically is route pe files folder check hoga or agr usme koi file h toh wo screen pe aaega else no task yet aaega which is written in that index.ejs files(likhne ka tareeka yaad rakhna h)
  });
});

app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("show", { filename: req.params.filename, filedata: filedata });
    }
  );
});

app.get("/edit/:filename", function (req, res) {
  res.render("edit", { filename: req.params.filename });
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/"); //yha pr hamne likha h body.title or fir likha h body.details iska mtlv ye h ki phle wale se hmlog input me jo liye yani ki heading portion wo dikhega or dusre wale se textarea ka mtlb user jo v info usme daala. naam title or details hi isliye likha gya kyunki ejs file me line 13,14 me hamne name yhi diya h dono tags ko.
    }
  ); //Basically aise likhne se hmlog wha jo heading denge usi naam se ek nya file bn jaega jisme ki data store hoga jitne baar naam likh ke data doge utna file bnte rahega.
});

app.post("/edit", function (req, res) {
  fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
    res.redirect("/");
  })
});

app.listen(3000, function () {
  console.log("Its Running");
});
