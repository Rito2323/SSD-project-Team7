const express = require("express");
const SurveyModel = require("./survey");
const app = express();

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

module.exports = app;

