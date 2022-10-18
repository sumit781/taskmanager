import styled from "styled-components";
import { MAX_WIDTH } from "../../constants";

const AuthContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  margin: 0px;
  padding: 0px;
  @media (max-width: ${MAX_WIDTH}px) {
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  }
`;

const BannerContainer = styled.div`
  justify-content: center;
  width: 50vw;
  display: flex;
  height: 100vh;
  color: #00578a;
  position: relative;
  align-items: center;
  @media (max-width: ${MAX_WIDTH}px) {
    width: 100vw;
    align-items: center;
    justify-content: center;
    display: flex;
    min-height: 300px;
  }
`;
const LoginFormContainer = styled.div`
  width: 40vw;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${MAX_WIDTH}px) {
    width: 100vw;
    align-item: center;
    justify-content: center;
  }
`;

const Overlay = styled.div`
width: 28vw;
height: 28vw;
border-radius: 28vw;
position:absolute;
background-color:aliceblue;
@media (max-width: ${MAX_WIDTH}px) {
    width: 225px;
    height: 225px;
    border-radius:112.5px;
  }
`
const Title = styled.p`
font-size: 3vw;
position: relative;
color: #091e42;
@media (max-width: ${MAX_WIDTH}px) {
    font-size:25px
  }
`


export default {
  AuthContainer,
  BannerContainer,
  LoginFormContainer,
  Overlay,
  Title
};
