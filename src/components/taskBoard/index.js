import React from "react";
import styled from "styled-components";

const TaskOptionsContainer=styled.div`
width: 90vw;
height:auto;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
margin-left: 5vw;
`

const tableContainer=styled.table`
display: flex;
width: 98vw;
padding-top: 10px;
flex-direction: column;
`
const OverLay=styled.div`
    position: absolute;
    width: 100vw;
    height: 90vh;
    background-color: rgba(0,0,0,0.5);
`
const TaskDetailContainer=styled.div`
    display:flex;
    width: 100vw;
    height: 90vh;
    position: fixed;
`
export default {
    TaskOptionsContainer,
    tableContainer,
    OverLay,
    TaskDetailContainer
}