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

export default {
    TaskOptionsContainer,
    tableContainer
}