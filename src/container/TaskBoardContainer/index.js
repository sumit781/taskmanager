import { Action, redirect } from "@remix-run/router";
import { Button, CheckIcon, Input, Select } from "native-base";
import React, { Component } from "react";
import { Navigate, Route, Router } from "react-router-dom";
import TaskBoard from "../../components/taskBoard";
import TaskButton from "../../components/taskButton";
import { FILTER_TYPE, STATUS_OPTIONS } from "../../constants";

const tableHeadiings = ["No.", "Title", "Status", "Assigned To"];
const tableData=[{id:'21312312',title:'update the front page',status:'in-progress',assignedTo:'Sumit singh'}
,{id:'21312312',title:'update the details',status:'Ready for QA',assignedTo:'Raj'},
{id:'21312312',title:'update work',status:'in-progress',assignedTo:'Riya'},
{id:'21312312',title:'update things',status:'in-progress',assignedTo:'Deepak'},
{id:'21312312',title:'update the asdasd asd asdasd asd as asd asd as',status:'Done',assignedTo:'Charles'},
{id:'21312312',title:'update the front page',status:'Done',assignedTo:'Ted'}]
export default class TaskBoardContainer extends Component {
    render() {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginLeft: "5vw", fontSize: "1rem" }}>TASKBOARD</h4>
          <TaskBoard.TaskOptionsContainer>
            <div style={{ width: "auto", display: "flex" }}>
              <span style={{ fontSize: ".7rem", alignSelf: "center" }}>
                {"FILTER :  "}
              </span>
              <Input variant={"underlined"} ml={2}/>
              <select
                style={{ border: 'none',
                        fontSize: '0.7rem'
                    }}
                value={FILTER_TYPE.user}
              >
                {Object.keys(FILTER_TYPE).map((item, index) => (
                  <option
                    label={FILTER_TYPE[item]}
                    value={FILTER_TYPE[item]}
                    key={index}
                  />
                ))}
              </select>
            </div>
            {/* <div style={{display:'flex',justifyContent:'flex-end',flex:1}}> */}
            <TaskButton/>
            {/* </div> */}
          </TaskBoard.TaskOptionsContainer>
        </div>
        <div
          style={{
            flex: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TaskBoard.tableContainer>
            <thead style={{ display: "flex", width: "100%", height: "2rem",borderBottom:'1rem' }}>
              <tr style={{ display: "flex", flex: 1 }}>
                {tableHeadiings.map((item,i) => (
                  <th
                    style={{
                      flex: i === 1 ? 3 :  i == 0? 1:2,
                      height: "2rem",
                      backgroundColor: "#0567a0",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      color:'white',
                      fontSize:'.8rem'
                    }}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
                {tableData.map((item,index)=>{          
                      return (<tr style={{ display: "flex", flex: 1,backgroundColor:'aliceblue',marginBottom:5}}>
                                    {
                                        Object.keys(item).map((task,i)=>{
                                            return (
                                            i===2?
                                            // dropdown for progress
                                            <th key={task.id*i} style={{flex: i == 1 ? 3 : i == 0? 1:2,
                                                height: "2rem",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                display: "flex",
                                                fontSize:'.8rem'}} >
                                                  <select style={{ border: 'none',
                                                    width: '100%',
                                                    textAlign: 'center',
                                                    borderRadius: 5 ,
                                                    maxWidth:170    }} value={item[task]}>
                                                        {
                                                            Object.keys(STATUS_OPTIONS).map(item=>{
                                                               return <option value={STATUS_OPTIONS[item]}>{item.toUpperCase()}</option>
                                                            })
                                                        }
                                                  </select>
                                                     </th>:
                                                // for showing the serial number
                                                i==0?<th key={task.id*i} style={{flex: i == 1 ? 3 : i == 0? 1:2,
                                                height: "2rem",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                display: "flex",
                                                fontSize:'.8rem'}} >
                                                  {index+1}
                                                     </th>:
                                                // for other cells
                                                <th key={task.id*i} style={{flex: i == 1 ? 3 : i == 0? 1:2,
                                                height: "2rem",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                display: "flex",
                                                fontSize:'.8rem'}} >
                                                  {item[task]}
                                                     </th>)
                                        })
                                    }
                       </tr> 
                        )  
                })}
            </tbody>
          </TaskBoard.tableContainer>
        </div>
      </div>
    );
  }
}
