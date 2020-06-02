const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
const { User } = require('./models/User.js')
const bodyParser = require('body-parser')
const config = require('./config/key')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const { auth } = require('./middleware/auth')
//require 영역
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
//use 영역
mongoose.connect(config.mongoURI, {
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}, function(err){
        if(err){
            console.log(err)
            return
        }
        console.log('DB connected!')
    })
// MongoDB Connect

app.post('/api/users/register', (req, res)=>{
    const user = new User(req.body)
    user.save((err, userInfo)=>{
        if(err) return res.status(400).json({success:false, err})
        return res.status(200).json({success:true, userInfo})
    })
})
app.post('/api/users/login', (req, res)=>{
    User.findOne({ email: req.body.email}, function(err, user){
        //user안에는 찾은 정보의 값이 들어간다.
        // email이 있는지 없는지 확인 이메일이 있다면 아래 콜백실행 비밀번호가 서로 맞는지
        if(!user) return res.json({loginsuccess:false, message:"이메일이 없습니다"})
        user.comparePassword(req.body.password, function(err, isMatch){
            if(!isMatch) return res.json({loginsuccess:false, message:"비밀번호가 틀렸습니다"})
            //비밀번호가 맞다면 토큰을 생성하기
            user.generateToken((err, kal) => {
                if(err) return res.status(400).send(err)
                //쿠키에 넣어 값을
                //kal에는 findOne의 user정보에 토큰값이 추가가 됨 ,
                res.cookie("x_auth", kal.token)
                .status(200)
                .json({loginsuccess:true, userID:kal._id})
            })
        })
    })
})

app.get('/api/users/auth', auth ,(req, res) =>{
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        role:req.user.role,
        image:req.user.image
        
    })
})

app.get('/api/users/logout', auth, (req, res) =>{
    User.findOneAndUpdate({_id: req.user._id},
        {token:""}
        , (err, user)=> {
        if(err) return res.json({logout_Success: false, err})
        res.status(200).send({logout_Success: true})
    })
})

app.get('/api/hello', (req, res)=>{
    res.send('Hello World!!')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))