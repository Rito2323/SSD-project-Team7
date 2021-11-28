const express = require("express");
const SurveyModel = require("./survey");
const app = express();
const fs = require('fs');
const { spawn } = require('child_process');

const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

// For receiving files from the front-end (Transcript)
const fileUpload = require('express-fileupload');
app.use(fileUpload());

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
  const surveys = await SurveyModel.find({ CreatedBy: request.params.devmail, SurveyNo: request.params.SurveyNo });
  try {
    response.send(surveys);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/surveys/:devmail", async (request, response) => {
  const surveys = await SurveyModel.find({ CreatedBy: request.params.devmail });
  try {
    response.send(surveys);
  } catch (error) {
    response.status(500).send(error);
  }
});



app.delete("/delete/survey/:SurveyNo", async (request, response) => {
  const surveys = await SurveyModel.findOneAndDelete({ SurveyNo: request.params.SurveyNo });
  // need to delete the responses too.
  await ResponseModel.deleteMany({ SurveyNo: request.params.SurveyNo });
  try {
    response.send(surveys);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/update/survey/:SurveyNo", async (request, response) => {
  const surveys = await SurveyModel.findOneAndUpdate({ SurveyNo: request.params.SurveyNo }, request.body)
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
  const responses = await ResponseModel.find({ CreatedBy: request.params.devmail });
  try {
    response.send(responses);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/transcript', async (req, res) => {
  // console.log(req.files);
  // Getting the file data
  var buff = Buffer.from(req.files.myFile.data);
  var type = req.files.myFile.mimetype;
  let ind = type.lastIndexOf("/");
  type = type.substr(0, ind);

  console.log("Generating transcript for", type, "file");

  if (type === "audio") {
    fs.writeFileSync('file.wav', buff);
  }
  else if (type === "video") {
    fs.writeFileSync('file.mp4', buff);
  }

  const pyChild = spawn('python3', ['./transcript.py', String(type)]);
  pyChild.stdout.on('data', (data) => {
    message = `${data}`;
    // Delete the files at the end
    fs.access('file.mp4', fs.constants.F_OK, (err) => {
      if (err) {
        console.error("Trying to delete video file. But it's not video file");
      }
      else
        fs.unlink('file.mp4', (err) => {
          if (err) {
            console.error("Error in deleting file.wav");
          }
        });
    });
    fs.access('file.wav', fs.constants.F_OK, (err) => {
      if (err) {
        console.log("Error in deleting file.wav");
      }
      else
        fs.unlink('file.wav', (err) => {
          if (err) {
            console.error("Error in deleting file.wav");
          }
        });
    });
    fs.access('out.wav', fs.constants.F_OK, (err) => {
      if (err) {
        console.log("Error in deleting out.wav");
      }
      else
        fs.unlink('out.wav', (err) => {
          if (err) {
            console.error("Error in deleting file.wav");
          }
        });
    });

    res.send({ response: message });
  });
});

module.exports = app;

