import React, { useEffect, useState } from "react";
import { Button,Input } from "native-base";
import { ROLES } from "../../constants";
import styled from "styled-components";
import { useSelector } from "react-redux";


const FormContainer=styled.div`
    width: 85%;
    height: 85%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    border-color:lightgray;
    box-shadow: 0px 0px 8px 0px;
    background-color: aliceblue;
`
const Container=styled.div`
    display: flex;
    flex: 1 1 0%;
    justify-content: center;
    align-items: center;
`
const FormHeading=styled.div`
    width: 100%;
    height: 2rem;
    background-color: rgb(77, 68, 231);
    align-items: center;
    display: flex;
    justify-content: space-between;
`
const FormTitleBody=styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 10px;
`
const FormDescriptionBody=styled.div`
    display: flex;
    flex: 4 1 0%;
    flex-direction: column;
    margin-left: 10px;

`

const TextArea=styled.textarea`
    width: 80%;
    height: 80%;
    border-radius: 5px;
    border: none;
    resize: none;
    font-family: sans-serif;
    padding-top: 4px;
    &:disabled{
        background-color:white;
    }
`

const Title=styled.p`
    font-size: 0.8rem;
    font-weight: bold;
    align-self: center;
`
const RoleContainer=styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
    align-self: center;
    flex: 1 1 0%;
    justify-content: flex-start;
`
const Select=styled.select`
    border: none;
    margin-left: 10px;
    width: 145px;
    height: 25px;
    border-radius: 5px;
    align-self: center;
    &:disabled{
        color: black
    }
`
const TaskDetailForm=({heading,isEditable=true,taskDetails,users=[],...props}) =>{
      const {user} = useSelector(store=>store.UserReducer.user)

    useEffect(()=>{
        if(!isEditable && taskDetails){
            setTitle(taskDetails.title)
            setDescription(taskDetails.description)
            setAssignedTo(taskDetails.assignedTo)
        }
        
    },[])

    useEffect(()=>{
        if(assignedTo==''&& user?.role==ROLES.admin && users.length>0){
            setAssignedTo(users[0]._id)
        }
    },[users])

    let [title,setTitle]=useState('')
    let [description,setDescription]=useState('')
    let [assignedTo,setAssignedTo]=useState('')
    
    let setAssignedToValue=(event)=>{
      console.log(users.find(item=>item._id==event.target.value),"// found value")
        setAssignedTo(event.target.value)
    }

    let setDescriptionValue=(event)=>{
        setDescription(event.target.value)
    }

    let setTitleValue=(event)=>{
        setTitle(event.target.value)
    }

    const submit=()=>{
        if(title==''||description==""){
            alert('Kindly fill the Title and Description')
            return
        }
        props.submitTask({
            title,
            description,
            assignedTo
        })
    }

    const hideDetails=()=>{
        props.hideDetails()
    }
    return (
        <Container>
            <FormContainer>
                <FormHeading>
                    <p style={{marginLeft:10,color:'white',fontSize:'.8rem'}}>{heading}</p>
                    {!isEditable?<p onClick={hideDetails} style={{color:'white',fontSize:'.6rem',textAlign:'center',marginRight:10}}>CLOSE</p>:null}
                </FormHeading>
               <FormTitleBody>
                    <Title>TITLE</Title>
                    <Input width={"45vw"} maxLength={20} onChange={setTitleValue} editable={isEditable} h="5" backgroundColor={'white'} value={title} marginLeft={'2'} alignSelf="center" variant={'filled'} marginRight={10} />
                    <RoleContainer>
                        <>
                        <p style={{alignSelf:'center',fontSize:'.8rem',fontWeight:'bold'}}>Assigned to :</p>
                        {isEditable?
                        <Select onChange={setAssignedToValue} disabled={!isEditable} value={assignedTo}>
                            {users.map((user,index)=><option value={user._id}>{user.name}</option>)}
                        </Select>:<p style={{alignSelf:'center',fontSize:'.7rem',fontWeight:'bold',marginLeft:'2px'}}>{assignedTo.name}</p>}
                        </>
                    </RoleContainer>
                </FormTitleBody>
                <FormDescriptionBody>
                        <p style={{fontSize:'.8rem',fontWeight:'bold'}}>Description</p>
                        <TextArea value={description} onChange={setDescriptionValue} disabled={!isEditable} />
                   {isEditable ? <Button right={5} w={20} height={19} mb={5} backgroundColor={"#0567a0"} alignSelf="center" onPress={submit} mt={2} fontSize={'sm'}  variant={'solid'}> Submit </Button>:null}
                </FormDescriptionBody>
            </FormContainer>
        </Container>
    )
}

export default TaskDetailForm;