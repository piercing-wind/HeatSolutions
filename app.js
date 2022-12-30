const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();
app.set('view engine', 'ejs');
//app.set('view engine', 'ejs');
mongoose.set('strictQuery', true)

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/heatsolutionDB", { useNewUrlParser: true });
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
const storeIncharge = new Schema({ sName: String, sph_no: Number, sEmail : String });
const accountant = new Schema({ name: String, a_ph_no: Number, a_Email: String });
const cylinder = new Schema({ type : String, qnty: Number });
const dealerSchema = new Schema({
  name: String,
  ph_no: Number,
  email : String,
  storeIncharge : [storeIncharge],
  accountant : [accountant],
  cylinder : [cylinder]
});


const Dealer = mongoose.model("Dealer", dealerSchema);

// const dealer1 = new Dealer({
//   name: "A N R Amritsar",
//
//   ph_no: 154545,
//   email:"anr@gmail.com",
//   storeIncharge:[{ sName: "Sumit",sph_no: 646465465, sEmail:"sumit@gmail.com"}],
//   accountant:[{ name: "Shani", a_ph_no:5566464, a_Email: "shani@gamil.com"}],
//   cylinder:[{ type : "R 134a", qnty: 10  }]
// });

app.get("/", (req, res)=>{

    //res.send('Hello i am up')
    res.render('home',{});
});
app.get("/accounts", function(req, res){
  res.render("accounts");
});

app.get("/dealer", function(req, res){
  //const requestedId = req.params.postId;
  Dealer.find({},(err,dealer)=>{
    //const storedTitle = _.lowerCase(post.title);
    //console.log(dealer);
     // dealer.forEach((dealer)=>{
     //   console.log(dealer.name);
     //   res.render("home", {
     //     title: dealer.name,
     //     content: dealer.ph_no
     //   });
     //
     // });
    // console.log(dealer.cylinder);

    res.render("home", {
    dealer :dealer,
    //cylinder:dealer.cylinder
    });
  });

});


app.post("/accounts", (req, res)=>{
  const name = req.body.dealerName;
  const phone = req.body.dealerPhNo;
  const email = req.body.dealerEmail;
  const si_name = req.body.si_name;
  const si_phone = req.body.si_phone;
  const si_Email = req.body.si_Email;
  const a_name = req.body.a_name;
  const a_ph_no = req.body.a_phone;
  const a_Email = req.body.a_Email;
  const cylinder_type = req.body.cylinder_type;
  const cylinder_Qnty = req.body.cylinder_Qnty

  const dealer = new Dealer({
    name: name,

    ph_no: phone,
    email: email,
    storeIncharge:[{ sName: si_name,sph_no:si_phone , sEmail:si_Email}],
    accountant:[{ name: a_name, a_ph_no: a_ph_no, a_Email: a_Email}],
    cylinder:[{ type : cylinder_type, qnty: cylinder_Qnty }]
  });

  dealer.save((err)=>{
    if(!err){
      console.log('Success');
    }
  });

  res.redirect("/dealer");

});

//const person = [dealer1]
// Dealer.insertMany(person,(err)=>{
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Sucess");
//   }
// });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
