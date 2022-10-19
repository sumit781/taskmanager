import React, { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
} from "native-base";
import { useDispatch } from "react-redux";
import { EMAIL_REGX } from "../../constants";
import * as authApi from '../../apis/auth'
import { userLogin } from "../../reducers/auth";
const LoginForm = (props) => {
    const dispatch=useDispatch()
    let [email,setEmail]=useState('')
    let [password,setPassword]=useState('')
    let [error,setError]=useState({})
    let login=(email,password)=>{ 
        console.log(email==''||password=='')
            if(email==''||password==''){
                setError({
                    ...error,
                    fieldError:"please fill email and password"
                })
                console.log(error)
                return
            } 
            if(!new RegExp(EMAIL_REGX).test(email)){
                setError({
                        ...error,
                        emailError:"Invalid email id"
                })
                return
            }
            if(error.emailError!==undefined || error.fieldError!==undefined){
                let errorObj={...error}
                delete errorObj.emailError
                setError({
                    ...errorObj
                })
            }
            authApi.login(email,password).then(res=>{
                const {user,accessToken}=res.data
                localStorage.setItem('accessToken',accessToken)
                dispatch(userLogin({user,accessToken}))
            }).catch(err=>{
                console.log(err)
                if(err.response.status==401){
                    setError({
                        fieldError:err.response.data.message
                    })
                }
            })


         }   
  return ( 
    <Box
      safeArea
      p="2"
      py="8"
      w="60%"
      maxW={"292"}
      borderRadius={"10"}
      bgColor={"white"}
    >
      <Heading
        size="lg"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Welcome
      </Heading>
      <Heading
        mt="1"
        _dark={{
          color: "warmGray.200",
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="xs"
      >
        Sign in to continue!
      </Heading>
      <VStack space={3} mt="5">
        <FormControl isInvalid={'emailError' in error}>
          <FormControl.Label>Email ID</FormControl.Label>
          <Input type={"text"} _important onChangeText={(text)=>{
            setEmail(text)
          }}/>
          {'emailError' in error ? <FormControl.ErrorMessage>
                "Invalid Email"
          </FormControl.ErrorMessage>: null}
        </FormControl>
        <FormControl isInvalid={'fieldError' in error}>
          <FormControl.Label>Password</FormControl.Label>
          <Input type="password" onChangeText={(text)=>{
            setPassword(text)
          }} />
          
        {'fieldError' in error ? <FormControl.ErrorMessage>
            {error['fieldError']} 
        </FormControl.ErrorMessage>:null }
        </FormControl>
        <Button mt="2" colorScheme="indigo" onPress={()=>{
            login(email,password)
        }}>
          Sign in
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;
