
import { connect } from "react-redux";
import { Button, Input } from "native-base";
import React, { Component } from "react";
import { createTask } from "../../apis/task";
import Header from "../../components/header";
import Link from "../../components/navButton";


class AddTaskContainer extends Component{
    state = {
        title:'',
        description:'',
        assignedTo:null,
   }
   submitTask=async ()=>{
        const {title,description,assignedTo}=this.state  
        const data={
            title,
            description,
            assignedTo:assignedTo.id,
            date:new Date().toISOString()
        }
       const task=await createTask(data)

   }
    render(){
        return (
           <div style={{display:"flex",flex:1,justifyContent:'center',alignItems:'center'}}>
                <div style={{width:'85%',height:'85%',display:'flex',flexDirection:'column',borderRadius:10,overflow:'hidden',borderColor:'GrayText',boxShadow:'0px 0px 8px 0px',backgroundColor:'aliceblue'}}>
                        <div style={{width:'100%',height:"2rem",backgroundColor:'rgb(77 68 231)',alignItems:'center',display:'flex'}}>
                        <p style={{marginLeft:10,color:'white'}}>CREATE TASK</p>
                        </div>
                        <div style={{display:'flex',flexWrap:'wrap',marginLeft:10}} >
                        {/* <div style={{display:'flex',flexDirection:'row',height:'40px',flex:1,justifyContent:'center'}}> */}
                        <p style={{fontSize:'.8rem',fontWeight:'bold'}}>TITLE</p><Input width={"45vw"} h="5" backgroundColor={'white'} marginLeft={'5'} alignSelf="center" variant={'filled'} marginRight={10} />
                            {/* </div> */}
                        <div style={{display:'flex',flexDirection:'row',height:'40px',alignSelf:'center',flex:1,justifyContent:'flex-start',}}>
                        <p style={{alignSelf:'center',fontSize:'.8rem',fontWeight:'bold'}}>Assigned to :</p>
                        <select style={{border:'none',marginLeft:10,width:'145px',height:"25px",borderRadius:5,alignSelf:'center'}}>
                            <option  value={'sumit'}>SUmit</option>
                            <option>SUmit</option>
                            <option>SUmit</option>
                        </select>
                        </div>
                        </div>
                        <div style={{display:'flex',flex:4,flexDirection:'column',marginLeft:10}}>
                        <p style={{fontSize:'.8rem',fontWeight:'bold'}}>Description</p>
                        <textarea style={{width:'80%',height:'80%',borderRadius:5,border:'none',resize:'none',fontFamily:'sans-serif',paddingTop:'4px'}}/>
                        <Button right={5} w={20} height={19} alignSelf="center" mt={2} fontSize={'sm'}  variant={'solid'}> Submit </Button>
                        </div>
                    
                </div>
           </div>
        )   
    }
}

const mapDispatchToProp=(dispatch)=>{
    return {
        }
}

export default connect(null,mapDispatchToProp)(AddTaskContainer);