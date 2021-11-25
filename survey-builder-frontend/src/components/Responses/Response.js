import React from 'react'
//import React, { Component } from "react";
import {  Table } from "semantic-ui-react";
import '../App.css';


const sample =[ 
    {
    
      "Survey_No": 1,
      "Created_By" : "Gargi@students.iiit.ac.in",
      "Participants" : "Visha;@students.iiit.ac.in",
      "Answers" : {
        "Q1":"A1",
        "Q2":"A2",
        "Q3":"A3",
        "Q4":"A4"
        }
      },
      {
      "Survey_No": 1,
      "Created_By" : "Gargi@students.iiit.ac.in",
      "Participants" : "Yash@students.iiit.ac.in",
      "Answers" : {
        "Q1":"A5",
        "Q2":"A6",
        "Q3":"A7",
        "Q4":"A8"
      }  
    }
  ]
  

function Responses(props) {
  return (
    <div >
        <Table singleLine>
        <Table.Header>
          <Table.Row className="Q">
            <Table.HeaderCell >Survey_No.</Table.HeaderCell>
            <Table.HeaderCell>Created_by</Table.HeaderCell>
            <Table.HeaderCell>Participant</Table.HeaderCell>
            <Table.HeaderCell>Question1</Table.HeaderCell>
            <Table.HeaderCell>Question2</Table.HeaderCell>
            <Table.HeaderCell>Question3</Table.HeaderCell>
            <Table.HeaderCell>Question4</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body className="Q2">
          {sample.map(el => {
            return (
              <Table.Row key={el.Survey_No}>
                <Table.Cell>{el.Survey_No}</Table.Cell>
                <Table.Cell>
                  {el.Created_By}
                  </Table.Cell>
                  <Table.Cell>
                   {el.Participants}
                </Table.Cell>
                <Table.Cell>{el.Answers.Q1}</Table.Cell>
                <Table.Cell>{el.Answers.Q2}</Table.Cell>
                <Table.Cell>{el.Answers.Q3}</Table.Cell>
                <Table.Cell>{el.Answers.Q4}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Responses;