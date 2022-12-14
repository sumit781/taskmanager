import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {NativeBaseProvider} from 'native-base'
import store from './store'
import { Provider } from 'react-redux';
import axios from 'axios';


axios.interceptors.request.use((req)=>{
  console.log(req,req.url)
  if(req.url.includes('/auth')){
    return req
  }
 const accessToken=localStorage.getItem('accessToken')
 if(accessToken){
   req.headers={
      accessToken
   }
   return req
 }
})

axios.interceptors.response.use(resp=>{
  console.log(resp,'.....///resp')
    return resp
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NativeBaseProvider>
    <Provider store={store}>
    <App />
    </Provider>
    </NativeBaseProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
