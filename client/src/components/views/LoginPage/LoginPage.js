import React, {useState} from 'react'
import { useDispatch } from 'react-redux'; 
import { loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'

function LoginPage(props) {
    const dispatch = useDispatch();
    // action 보내기위해 dispatch 사용

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const EmailHandler = (event) => {
            setEmail(event.currentTarget.value)
        }
    
    const PasswordHandler = (event) => {
            setPassword(event.currentTarget.value)
        }    
    
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        // page refresh를 막기위해서.. 원래 해야할 일들을 안하고 refresh 되어버린다.. 그래서 해줘야한다
        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginsuccess){
                props.history.push('/')
            } else{
                alert('Error')
            }
        }) //loginUser는 action이다
    }
    
    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>

            <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input  type="email" value={Email} onChange={EmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={PasswordHandler} />
                <br />
                <button>
                    Login
                </button>
            </form>
            
        </div>
    )
}

export default withRouter(LoginPage)
