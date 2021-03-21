const User = require("../models/User")
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const saveUser = async (req, res) => {
    console.log(req.body);
    let user = new User(req.body);
    try {
        let token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.SECRET)
        let newUser = await user.save();
        console.log(newUser)
        res.status(200).json({ user:newUser, token:token })
    }
    catch (err) {
        res.status(500).json({ err: err })
    }
}

const getUserByEmailAndPassword = async (req, res) => {
  try {
      let token = jwt.sign({email: req.params.email, password: req.params.password }, process.env.SECRET)
      let user = await User.find({ email:req.params.email ,password:req.params.password } )
      if (user) {
          res.status(200).json({ user:user[0], token:token }) 
      }
      else{
          res.status(404)
      } 
  }
  catch (err) {
      res.status(500).json({ err: err })
  }
}
const updateUserById = async (req, res) => {
       
        try {
            let user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true})
          // user= await User.update({name:req.params.userName}, { $set: { password: req.body.myPassword } });
          res.status(200).json({user:user})
        } catch (err) {
          res.status(500).json({ err: err.message })
        }

    }
const getAllUsers = async (req, res) => {
  try {
      let user = await User.find();
      res.status(200).json({ user: user })
  }
  catch (err) {
      res.status(500).json({ err: err })
  }

}

const forgetPassword=async(req,res)=>{
    console.log("jij");
let user;
console.log(user);
  await User.findOne({email: req.body.email}, function(err,obj) {
       user=obj;});

if (user===null){
    console.log("vhj");
    res.status(400).send("Incorrect mail")
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'michalhadasavr@gmail.com',
      pass: 'vr46406319'
    }
  });

  var mailOptions = {
    from: 'michalhadasavr@gmail.com',
    to: req.body.email,
    subject: 'recover the password',
    text: 'We have received a request to recover your password \n'+
' If you did not request a password reset \n'+
     'your password:' +user.password
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.status(400).json(error);
      console.log(error);
    } 
    else {
    res.status(200).send("good");
    }
   
  });}
module.exports = { getAllUsers, saveUser, getUserByEmailAndPassword,updateUserById,forgetPassword}