import react from 'react';
import React from 'react'
//import React, { Component } from "react";
// import {  Table } from "semantic-ui-react";
import './response.css';
import {useState, useEffect} from 'react';

const backendUri = "http://localhost:3000/";


const sample =[ 
    {   
      "SurveyNo": 1,
      "CreatedBy" : "Gargi@students.iiit.ac.in",
      "Participant" : "Visha;@students.iiit.ac.in",
      "Answers" : {
        "Q1":"A1, A2, A3",
        "Q2":"A2",
        "Q3":"A3",
        "Q4":"A4",
        "Q5":"A10"
        }
      },
      {
      "SurveyNo": 1,
      "CreatedBy" : "Gargi@students.iiit.ac.in",
      "Participant" : "Yash@students.iiit.ac.in",
      "Answers" : {
        "Q1":"A5",
        "Q2":"A6",
        "Q3":"A7",
        "Q4":"A8",
        "Q5":"A11"
      }  
    }
  ]

  const getResponsesFromBackend = async () => {
    const dev_mail = localStorage.getItem("currentUser"); 
    const uri = backendUri + "responses" ;
    var response = await fetch(uri)
    var responses = await response.json();
    console.log(responses);
    responses = responses.filter((res)=>res["CreatedBy"] == dev_mail);
    // console.log(surveys);
    // var surveysForUser = surveys.filter((survey) => survey.CreatedBy == userEmail);
    // console.log("SURVEYS FETCHED For User : ");
    // console.log(surveysForUser);
    // console.log(surveyNo)
    return responses;
  }
  
function JsonDataDisplay(){
  const [Questions, setQuestions] = useState([])
  const [responses, setResponses] = useState([])
  const initial_Ques = []
  if(responses.length > 0) {
    const sample_count = Object.keys(responses[0].Answers).length
    for( var i=0;i<sample_count;i++){
      initial_Ques.push(<th>Question{i+1}</th>)
    }
  }
 

  useEffect(() => {
    getDataFromBackEnd();
  }, []);

  const getDataFromBackEnd = async () => {
      var responses = await getResponsesFromBackend();
      console.log(responses);
      setResponses(responses);
  }

  const DisplayData=responses.map(
      (info)=>{
      const initial_res = [] 
        
        for(const [key,val] of Object.entries(info.Answers)){
            initial_res.push(<td className="td1">{val}</td>)
          }
      
          return(
              <tr>
                  <td className="td1">{info.SurveyNo}</td>
                  <td className="td1">{info.Participant}</td>
                   {initial_res}               
              </tr>
          )
      }
  )

  return(
      <div className="responseui">
          <table className="table1 table-striped">
              
              <thead>
                  <tr>
                  <th>SurveyNo</th>
                  <th>Participant</th>
                  {initial_Ques}
                  </tr>
              </thead>
              <tbody>
                  
                  {DisplayData}
                  
              </tbody>
          </table>
           
      </div>
  )
}
export default JsonDataDisplay;


//export default Responses;