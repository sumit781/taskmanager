import { Action, redirect } from "@remix-run/router";
import { Button, CheckIcon, Input, Select } from "native-base";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Router } from "react-router-dom";
import TaskBoard from "../../components/taskBoard";
import TaskButton from "../../components/taskListButton";
import { FILTER_TYPE, STATUS_OPTIONS } from "../../constants";
import { fetchTasks } from "../../reducers/task";

const tableHeadiings = ["No.", "Title", "Status", "Assigned To"];

class TaskBoardContainer extends Component {
  componentDidMount(){

    console.log(this.props)
    this.props.getAllTasks()
  }
  render() {
    const { tasks } = this.props;
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginLeft: "5vw", fontSize: "1rem" }}>TASKBOARD</h4>
          <TaskBoard.TaskOptionsContainer>
            <div style={{ width: "auto", display: "flex" }}>
              <span style={{ fontSize: ".7rem", alignSelf: "center" }}>
                {"FILTER :  "}
              </span>
              <Input variant={"underlined"} ml={2} />
              <select
                style={{ border: "none", fontSize: "0.7rem" }}
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
            <TaskButton />
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
            <thead
              style={{
                display: "flex",
                width: "100%",
                height: "2rem",
                borderBottom: "1rem",
              }}
            >
              <tr style={{ display: "flex", flex: 1 }}>
                {tableHeadiings.map((item, i) => (
                  <th
                    style={{
                      flex:i==1?3:i==0?1:2,
                      height: "2rem",
                      backgroundColor: "#0567a0",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      color: "white",
                      fontSize: ".8rem",
                    }}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map((items, index) => {
                return (
                  <tr
                    style={{
                      display: "flex",
                      flex: 1,
                      backgroundColor: "aliceblue",
                      marginBottom: 5,
                    }}
                  >
                    <th
                          key={index*Math.random()}
                          style={{
                            flex: 1,
                            height: "2rem",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            fontSize: ".8rem",
                          }}
                        >
                          {index + 1}
                        </th>
                    {
                      console.log(Object.keys(items))
                    }
                    {
                    Object.keys(items).map((task, i) => {
                      return i === 2 ? (
                        // dropdown for progress
                        <th
                          key={task.id * i}
                          style={{
                            flex: i == 0 ? 3 : 2,
                            height: "2rem",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            fontSize: ".8rem",
                          }}
                        >
                          <select
                            style={{
                              border: "none",
                              width: "100%",
                              textAlign: "center",
                              borderRadius: 5,
                              maxWidth: 170,
                            }}
                            value={items[task]}
                          >
                            {Object.keys(STATUS_OPTIONS).map((item) => {
                              return (
                                <option key={item} value={STATUS_OPTIONS[item]}>
                                  {STATUS_OPTIONS[item]}
                                </option>
                              );
                            })}
                          </select>
                        </th>
                      ) : 
                       (
                        // for other cells
                        <th
                          key={task.id * i}
                          style={{
                            flex:i == 0 ? 3 : 2,
                            height: "2rem",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            fontSize: ".8rem",
                          }}
                        >
                          {items[task]}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </TaskBoard.tableContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { tasks } = state.TaskReducer;
  return {
    tasks,
  };
};

const mapDisptachToProp=(dispatch)=>{
  return {
      getAllTasks:()=>dispatch(fetchTasks())
  }
  }
export default connect(mapStateToProps,mapDisptachToProp)(TaskBoardContainer);
