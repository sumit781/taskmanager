import React, { useEffect, useState } from "react";
// import { Button } from "react-native-web";
import "../Authentication/style.css";
import LoginForm from "../../components/loginForm";
import AuthItems from "../../components/Auth";

const Auth = (props) => {

  
  return !props.signedIn ? (
    <AuthItems.AuthContainer>
      <AuthItems.BannerContainer>
        <AuthItems.Overlay />
        <AuthItems.Title>
            DEV <span style={{ color: "#0567a0" }}>MANAGER </span>
        </AuthItems.Title>
        </AuthItems.BannerContainer>
        <AuthItems.LoginFormContainer>
            <LoginForm {...props} />
        </AuthItems.LoginFormContainer>
    </AuthItems.AuthContainer>
  ) : (
    props.children
  );
};

export default Auth;
