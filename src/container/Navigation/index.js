import React from "react";
import { Route, Router, Routes,Rid } from "react-router-dom";
import Home from "../AddTask";
import Taskboard from "../TaskBoardContainer/index";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Taskboard />} />
      <Route path="/addTask"  element={<Home />} />
      {/* <Route path="contact" element={<Contact />} /> */}
        <Route path="*" action={(props)=>{

        }} element={<Taskboard/>}  />
    </Routes>
  );
};

export default Navigation;
