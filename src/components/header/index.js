import styled from "styled-components";
import { NavLink} from "react-router-dom";
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
const headerOptions=[{name:"Taskboard",route:'/'},{name:"Add TASK",route:'/addTask'},{name:"Logout",route:'/logout'}]
const Header= ()=>{
    let onLogout=() =>{

    }
    return (
        <HeaderContainer>
                <Heading>Dev Manager</Heading>
                <div style={{height:'100%',width:'20rem',display:"flex",justifyContent:'space-between',alignItems:'center'}}>
                        {
                            headerOptions.map(item=>{
                                return (
                                    <Link  key={item.name} to={item.route} onClick={item.name==="Logout"?onLogout:null}>{item.name.toUpperCase()}</Link>
                                )
                            })
                        }
                </div>
           </HeaderContainer>
    )
}

export default Header;