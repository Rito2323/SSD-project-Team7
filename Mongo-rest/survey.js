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

const Option = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    
    levels: {
      type: [String]
      
    },
});

const Question = new mongoose.Schema({
    QuestionType: {
      type: Number,
      required: true,
    },

    QuestionNo: {
        type: Number,
        required: true,
      },

    QuestionText: {
        type: String,
        required: true,
      },
    
      Options: {
      type: [Option],
      default: 0,
    },
});

const Surveys = new mongoose.Schema({
    SurveyNo: {
      type: Number,
      required: true,
    },

    SurveyTitle: {
        type: String,
        required: true,
      },

      CreatedBy: {
        type: String,
        required: true,
      },

      CreationDate: {
        type: Date,
        
      },
    
      Questions: {
      type: [Question],
      default: 0,
    },
});

const Answer = new mongoose.Schema({
    QuestionNo: {
        type: Number,
        required: true,
      },
    
      QuestionText: {
        type: String,
        required: true,
      },

      answer: {
        type: [String],
        default: 0,
      },
});

const Responses = new mongoose.Schema({
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

      Answers: {
        type: [Answer],
        default: 0,
      },
});

//const UserSchema = new mongoose.Schema({ any: {} });

//const User = mongoose.model("User", UserSchema);
const Survey = mongoose.model("Survey", Surveys);

module.exports = Survey;