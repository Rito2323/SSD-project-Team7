const express = require("express");
const SurveyModel = require("./survey");
const app = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.post("/add_survey", async (request, response) => {
    const survey = new SurveyModel(request.body);
  
    try {
      await survey.save();
      response.send(survey);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/surveys", async (request, response) => {
    const surveys = await SurveyModel.find({});
  try {
      response.send(surveys);
    } catch (error) {
      response.status(500).send(error);
    }
  });


 
  app.get("/surveys/:devmail/:SurveyNo", async (request, response) => {
    const surveys = await SurveyModel.find({CreatedBy: request.params.devmail,SurveyNo : request.params.SurveyNo});
  try {
      response.send(surveys);
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.get("/surveys/:devmail", async (request, response) => {
    const surveys = await SurveyModel.find({CreatedBy: request.params.devmail});
  try {
      response.send(surveys);
    } catch (error) {
      response.status(500).send(error);
    }
  });



app.delete("/delete/survey/:SurveyNo", async (request, response) => {
  const surveys = await SurveyModel.findOneAndDelete({SurveyNo: request.params.SurveyNo})
try {
    response.send(surveys);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/update/survey/:SurveyNo", async (request, response) => {
  const surveys = await SurveyModel.findOneAndUpdate({SurveyNo: request.params.SurveyNo},request.body)
try {
    console.log(request.body)
    response.send(surveys);
  } catch (error) {
    response.status(500).send(error);
  }
});



const ResponseModel = require("./response");
app.post("/add_response", async (request, response) => {
    const surveyresponse = new ResponseModel(request.body);
  
    try {
      await surveyresponse.save();
      response.send(surveyresponse);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/responses", async (request, response) => {
    const responses = await ResponseModel.find({});
  try {
      response.send(responses);
    } catch (error) {
      response.status(500).send(error);
    }
  });


  app.get("/responses/:devmail", async (request, response) => {
    const responses = await ResponseModel.find({CreatedBy: request.params.devmail});
  try {
      response.send(responses);
    } catch (error) {
      response.status(500).send(error);
    }
  });

module.exports = app;

