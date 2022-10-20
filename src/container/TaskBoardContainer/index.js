
import { Button, CheckIcon, Input, Select } from "native-base";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Router } from "react-router-dom";
import TaskBoard from "../../components/taskBoard";
import TaskButton from "../../components/taskButton";
import TaskDetailForm from "../../components/taskDetailForm";
import { FILTER_TYPE, ROLES, STATUS_OPTIONS } from "../../constants";
import { fetchTasks, removeTasks, updateSelectedTask, updateTask } from "../../reducers/task";

const tableHeadiings = ["No.", "Title", "Status", "Assigned To","Role"];

class TaskBoardContainer extends Component {

  state={
    showDetails:false,
    selectedTask:null,
    filter:{
      value:'',
      type:FILTER_TYPE.user
    }
  }
  componentDidMount(){
    // console.log(this.props)
    this.props.getAllTasks()
  }

  componentWillUnmount(){
    this.props.removeTasks()
  }
  onSelectTask=(index)=>{
    const {tasksDetails}=this.props
      this.setState({
        selectedTask:tasksDetails[index],
        showDetails:true
      })
  }

  hideDetails=()=>{
    this.setState({
      selectedTask:null,
      showDetails:false
    })
  }

  updateFilterType=(event)=>{
    this.setState({
        filter:{
          ...this.state.filter,
          type:event.target.value
        }
    })
  }

  updateTask=(index,value)=>{
    console.log(index,value)
    const {tasksDetails}=this.props
    console.log(tasksDetails,' ..///////////')
    this.props.updateTask(tasksDetails[index]._id,value)
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
                value={this.state.filter.type}
                onChange={this.updateFilterType}
              >
                {Object.keys(FILTER_TYPE).map((item, index) => (
                  <option
                    label={FILTER_TYPE[item]}
                    value={FILTER_TYPE[item]}
                    key={item+index}
                  />
                ))}
              </select>
            </div>
            {/* <div style={{display:'flex',justifyContent:'flex-end',flex:1}}> */}
            {this.props.user!==undefined && this.props.user.user?.role===ROLES.admin?<TaskButton />:null}
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
                  key={item+Math.random()}
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
            <tbody style={{overflowY: 'scroll',
                height: '80%',
              }}>
              {tasks.map((items, index) => {
                return (
                  <tr
                    style={{
                      display: "flex",
                      flex: 1,
                      backgroundColor: "aliceblue",
                      marginBottom: 5,
                    }}
                    onClick={()=>this.onSelectTask(index)}
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
                      console.log(task,i)
                      return i === 1 ? (
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
                            onClick={(event)=>{
                              event.stopPropagation()
                            }}
                            onChange={(event)=>{
                              this.updateTask(index,event.target.value)
                            }}
                          >
                            {Object.keys(STATUS_OPTIONS).map((item) => {
                              return (
                                <option key={item+Math.random()} value={STATUS_OPTIONS[item]}>
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
         {
          this.state.showDetails ?
          <TaskBoard.OverLay>
            <TaskBoard.TaskDetailContainer>
              <TaskDetailForm isEditable={false} heading={'Details'} taskDetails={this.state.selectedTask} hideDetails={this.hideDetails} />
            </TaskBoard.TaskDetailContainer>
          </TaskBoard.OverLay> : null
         }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { tasks,tasksDetails } = state.TaskReducer;
  console.log(tasks,tasksDetails)
  const {user} = state.UserReducer;
  return {
    tasks,tasksDetails,user
  };
};

const mapDisptachToProp=(dispatch)=>{
  return {
      getAllTasks:()=>dispatch(fetchTasks()),
      updateTask:(id,value)=>dispatch(updateSelectedTask({id,value})),
      removeTasks:()=>dispatch(removeTasks())
  }
  }
export default connect(mapStateToProps,mapDisptachToProp)(TaskBoardContainer);
