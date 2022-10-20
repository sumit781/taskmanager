import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './container/Authentication'
import Navigation from './container/Navigation'
import Header from './components/header';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from './reducers/auth';

function App() {
  const user = useSelector(store=>store.UserReducer.user)
  const dispatch=useDispatch()
  useEffect(()=>{
    const user=localStorage.getItem('user')
    console.log(user)
    const accessToken=localStorage.getItem('accessToken')
    if(user && accessToken){
      dispatch(userLogin(JSON.parse(user),accessToken))
    }
  },[])
  return (
    <Auth signedIn={user!==null?true:false}  >
      <div style={{width:'100vw',height:'100vh',display:'flex',flexDirection:'column'}}>
      <BrowserRouter>
        <Header user={user} />
        <Navigation/>
      </BrowserRouter>
      </div>
    </Auth>
  );
}

export default App;
