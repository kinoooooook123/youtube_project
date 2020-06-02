import React, {useState} from 'react'
import { useDispatch } from 'react-redux'; 
import { registerUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {
    
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    
    const EmailHandler = (event) => {
            setEmail(event.currentTarget.value)
        }
    
    const PasswordHandler = (event) => {
            setPassword(event.currentTarget.value)
        }    
    
    const NameHandler = (event) => {
            setName(event.currentTarget.value)
        }    

    const ConfirmPasswordHandler = (event) => {
            setConfirmPassword(event.currentTarget.value)
        }    
         
    const onSubmitHandler = (event) =>{
        event.preventDefault();
        // page refresh를 막기위해서.. 원래 해야할 일들을 안하고 refresh 되어버린다.. 그래서 해줘야한다
        if(Password !==ConfirmPassword){
           return alert('비밀번호가 일치하지 않습니다')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success){
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
                
                <label>Name</label>
                <input type="text" value={Name} onChange={NameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={PasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={ConfirmPasswordHandler} />

                <br />
                <button>
                    회원가입 
                </button>
            </form>
            
        </div>
    )
}

export default withRouter(RegisterPage)
