import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import { Route, Router, Routes,Rid, Navigate } from "react-router-dom";
import { ROLES } from "../../constants";
import AddTask from "../AddTask";
import Taskboard from "../TaskBoardContainer/index";

const Navigation = () => {
    const {user}=useSelector(store=>store.UserReducer.user)
  return (
    <Routes>
      <Route index path="/" element={<Taskboard />} />
      {
        console.log(user)
      }
      {user?.role==ROLES.admin?<Route path="/addTask"  element={<AddTask />} />:null}
      <Route path="*" action={(props)=>{

        }} element={<Taskboard/>}  />
    </Routes>
  );
};

export default Navigation;
