import React from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'

function LandingPage(props) {
    
    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.logout_Success){
                console.log(response.data)
                props.history.push('/login')
            } else{
                alert('로그아웃에 실패했습니다');
                console.log(response.data)
            }
        })
    }
    
    
    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
            LandingPage

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
