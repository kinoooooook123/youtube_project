const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlenth: 50
    },
    email:{
        type: String,
        maxlength:70,
        unique: 1,
        trim:true
    },
    password:{
        type: String
    },
    role:{
        type: Number,
        default: 0
    },
    image:String ,
    token:{
        type:String
    },
    tokenExp:{
        type: Number
    }
})

// this password...?
userSchema.methods.comparePassword = function(plainpassword, cb){
    bcrypt.compare(plainpassword, this.password, function(err, isMatch){
        if(err) return cb(err)
        cb(null, isMatch)
        //cb 함수에 Match는 참 혹은 거짓값이 담긴다.
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save((err, user) => {
        if(err) return cb(err)
        cb(null, user)
        //user save 함으로써 user의 정보가 담기게 된다
    })
}

userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            });
        });
    } else{
        next()
    }
})

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    jwt.verify(token, 'secretToken', function(err, decoded){
        user.findOne({ "_id": decoded, "token": token}, function(err, user){
            //decoded와 token 두가지를 비교하기 위해서 methods 를 만들었는데 나는 안만들고 콜백으로 박아버렸다..!
            if (err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }