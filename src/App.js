import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Auth from './container/Authentication'
import Navigation from './container/Navigation'
import Header from './components/header';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector(store=>store.UserReducer.user)
 
  return (
    <Auth signedIn={user!==null?true:false}  >
      <div style={{width:'100vw',height:'100vh',display:'flex',flexDirection:'column'}}>
      <BrowserRouter>
        <Header />
         <Navigation/>
      </BrowserRouter>
      </div>
    </Auth>
  );
}

export default App;
