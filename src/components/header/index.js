import styled from "styled-components";
import { NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../../constants";
import { userLogout } from "../../reducers/auth";
import {removeTasks} from '../../reducers/task'
// import { NavLink } from "react-router-dom";

const Link=styled(NavLink)`
display:inline-block;
width:5rem;
font-size:.7rem;
font-weight:bold;
color:white;
border: none;
text-align: center;
/* background-color: aliceblue; */
text-decoration: none;
`

const HeaderContainer = styled.div`
width: 100vw;
position: relative;
background-color: rgb(77 68 231);
height: 10vh;
display: flex;
justify-content: space-between;
`
const Heading = styled.p`
font-size: medium;
vertical-align: middle;
font-weight: 900;
margin-left: 2vw;
color: white;
`
const adminHeaderOptions=[{name:"Taskboard",route:'/'},{name:"Add TASK",route:'/addTask'},,{name:"Logout"}]
const userHeaderOptions=[{name:"Taskboard",route:'/'},{name:"Logout"}]
const Header= (props)=>{
    console.log(props,'///props')
    const dispatch=useDispatch()
    const{user}=useSelector(store=>store.UserReducer)
    let onLogout=() =>{ 
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        dispatch(removeTasks())
        dispatch(userLogout())
    }
    return (
        <HeaderContainer>
                <Heading>Dev Manager</Heading>
                <div style={{height:'100%',width:'20rem',display:"flex",justifyContent:'space-evenly',alignItems:'center'}}>
                    {
                        console.log(user.user,'/// indose html')
                    }
                        { user.user!==undefined?( user.user.role===ROLES.admin?adminHeaderOptions.map((item,index)=>{
                                return (
                                    <Link  key={item.name} to={item.route} onClick={item.name==="Logout"?onLogout:null}>{item.name.toUpperCase()}</Link>
                                )
                            }):userHeaderOptions.map((item,index)=>{
                                return (
                                    <Link  key={item.name} to={item.route} onClick={item.name==="Logout"?onLogout:null}>{item.name.toUpperCase()}</Link>
                                )
                            })):null
                        }
                </div>
           </HeaderContainer>
    )
}

export default Header;