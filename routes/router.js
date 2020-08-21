const express = require('express');
var router = express.Router();
var Student = require('../model/student')
//async await routes
router.post("/search", async (req, res, next) => {
  let sterm = String(req.body.sterm)
    try {
      if(isNaN(sterm)){
        let stud = await Student.find({name:{ $regex: sterm, $options: 'i'}});
        stud.slice(0,7)
        res.json(stud)
      }
      if(!isNaN(req.body.sterm)){
        console.log(sterm);
        let stud = await Student.find({rollno:{ $regex: sterm, $options: 'i'}});
        stud.slice(0,7)
        res.json(stud)
      }
    } catch (err) {
      next(err);
    }
  });
  router.post("/", async (req, res, next) => {
    try {
      console.log(req.body);
        let stud = await Student.create(
          {name:req.body.name,
            rollno:req.body.rollno,
            department:req.body.department,
          });
     
        res.send('stud')
    } catch (err) {
      next(err);
    }
  });
  router.post("/kill", async (req, res, next) => {
    try {
      console.log(req.body);
        let stud = await Student.findOneAndDelete(
          {rollno:req.body.rollno}
          );
          console.log(stud);
        res.send('stud')
      
      
    } catch (err) {
      next(err);
    }
  });
  module.exports = router;