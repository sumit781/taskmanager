
import { connect } from "react-redux";
import { Button, Input } from "native-base";
import React, { Component } from "react";
import { createTask } from "../../apis/task";
import Header from "../../components/header";
import Link from "../../components/navButton";
import { ROLES, STATUS_OPTIONS } from "../../constants";
import { fetchTasks } from "../../reducers/task";
import TaskDetailForm from "../../components/taskDetailForm";
import { fetchUsers } from "../../reducers/auth";
import {Toast} from 'native-base'
import {Navigate} from 'react-router'
class AddTaskContainer extends Component{

    componentDidMount(){
        const {user,users}=this.props
     if(user.user?.role==ROLES.admin){
        this.props.getAllUsers()
     }
    }
   
   submitTask=async ({title,description,assignedTo})=>{ 
        const data={
            title,
            description,
            assignedTo,
            date:new Date().toISOString()
        }
        try{
            const task=await createTask(data)
           alert("task added successfully")
           
        }catch(err){
            alert("task added unsuccessfully :"+err.message)
            console.log('task unsuccessfull',err,err.message)
        }
   }
    render(){
        return (
          <TaskDetailForm heading="CREATE" isEditable={true} users={this.props.users} submitTask={this.submitTask} />
        )   
    }
}

const mapStateToProps=(store)=>{
    const {user,users}=store.UserReducer
    return {
        user,users
    }
}
const mapDisptachToProp=(dispatch)=>{
return {
    getAllUsers:()=>dispatch(fetchUsers())
}
}
export default connect(mapStateToProps,mapDisptachToProp)(AddTaskContainer);