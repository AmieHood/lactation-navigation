import React from "react";
import { Component } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Container, Row, Col } from 'reactstrap'



type Props = {
    updateToken (newToken: string): void
}

class Portal extends Component <Props, any> {
    constructor(props: Props){
        super(props)
    }
    render(){
        return(
            <>
                <Container>
                    <Row>
                    <Col md='6' className='auth-container'>
                        <Signup updateToken={this.props.updateToken}/>
                    </Col>
                    <Col md='6' className='login-col'>
                        <Login updateToken={this.props.updateToken} />
                    </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Portal;
// const Portal = (props) => {
    //     const [showLogin, setShowLogin] = useState(true);
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();
//     const [displayName, setDisplayName] = useState();

//     //Login/Signup toggle
//     const toggleLoginSignup = () => {
//         setShowLogin(!showLogin);
//     };
//     const submitForm = () =>
//         console.log(
//         `Form is sent!\nemail: ${email}\ndisplayName: ${displayName}\npassword: ${password}`
//         );
    

//     return (
//         <>
//         {showLogin ? (
//             <Login
//             email={email}
//             setPassword={setPassword}
//             setEmail={setEmail}
//             toggle={toggleLoginSignup}
//             submitForm={submitForm}
//             displayName={displayName}
//             setDisplayName={setDisplayName}
//             token={props.token}
//             newToken={props.newToken}        
//             />
//         ) : (
//             <Signup
//             email={email}
//             password={password}
//             setPassword={setPassword}
//             setEmail={setEmail}
//             toggle={toggleLoginSignup}
//             submitForm={submitForm}
//             displayName={displayName}
//             setDisplayName={setDisplayName}
//             />
//         )}
//         </>
//     );
// }

