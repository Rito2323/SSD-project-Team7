const mongoose = require("mongoose");

//const UserSchema = new mongoose.Schema({
 // name: {
  //  type: String,
  //  required: true,
 // },
 // age: {
  //  type: Number,
  //  default: 0,
 // },
  //marks: {
   // type: [Number],
  //  default: 0,
  //},
  

//});

const Answer = new mongoose.Schema({
    QuesionNo: {
      type: Number,
      required: true,
    },
    
    QuestionText: {
      type: String
      
    },
    Ans: {
        type: [String]
        
      }
    
});



const SurveyResponses = new mongoose.Schema({
    
    SurveyNo: {
        type: Number,
        required: true,
      },
  
      CreatedBy: {
          type: String,
          required: true,
        },
  
        Participant: {
          type: String,
          required: true,
        },
    
    Response: {
      type: [Answer],
     
    },
});



//const UserSchema = new mongoose.Schema({ any: {} });

//const User = mongoose.model("User", UserSchema);
const SurveyResponse = mongoose.model("SurveyResponse", SurveyResponses);

module.exports = SurveyResponse;