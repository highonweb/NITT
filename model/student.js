var mongoose = require('mongoose');
var studentSchema = new mongoose.Schema({

    name: {
      type: String,      
    },
    rollno: {
        type: String
    },
    department: {
        type: String
    }

  });

 
  var Student = mongoose.model('student', studentSchema);
  module.exports = Student;