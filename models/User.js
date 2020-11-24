var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');   // bcryptjs package를 변수에 담음

// schema
var userSchema = mongoose.Schema({
    username : {type : String, required : [true, 'Username is required!'], unique : true},  // 두번째는 에러메세지
    password : {type : String, required : [true, 'Password is required!'], select : false}, // DB에서 모델을 읽어 올때 password값은 읽어오지 않음
    name : {type : String, required : [true, 'Name is required!']},
    email : {type : String}
}, {
    toObject : {virtuals : true}
});

// virtuals
// DB에 저장되는 값 이외의 항목
userSchema.virtual('passwordConfirmation')
    .get(function(){ return this._passwordConfirmation; })
    .set(function(value){ this._passwordConfirmation = value });

userSchema.virtual('originalPassword')
    .get(function(){ return this._originalPassword; })
    .set(function(value){ this._originalPassword = value; });

userSchema.virtual('currentPassword')
    .get(function(){ return this._currentPassword; })
    .set(function(value){ this._currentPassword = value });

userSchema.virtual('newPassword')
    .get(function(){ return this._newPassword; })
    .set(function(value){ this._newPassword = value; });

// password validation
// DB에 생성, 수정하기 전에 값이 유효한지 확인
userSchema.path('password').validate(function(v){
    var user = this;

    // create user
    if(user.isNew){         // 회원가입
        if(!user.passwordConfirmation){
            user.invalidate('passwordConfirmation', 'Password Confirmation is required');
        }

        if(user.password !== user.passwordConfirmation){
            user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
        }
    }

    if(!user.isNew){        // 회원수정
        if(!user.currentPassword){
            user.invalidate('currentPassword', 'Current Password is required!');
        }
        // 저장된 hash와 입력받은 password의 hash가 일치하는지 확인
        else if(!bcrypt.compareSync(user.currentPassword, user.originalPassword)){
            user.invalidate('currentPassword', 'Current Password is inavalid!');
        }

        if(user.newPassword !== user.passwordConfirmation){
            user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
        }
    }
});

// hash password
userSchema.pre('save', function(next){
    var user = this;
    
    if(!user.isModified('password')){
        return next();
    }
    else {
        user.password = bcrypt.hashSync(user.password);
        return next();
    }
});

// model methods
userSchema.methods.authenticate = function(passwrod) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

// model & export
var User = mongoose.model('user', userSchema);
module.exports = User;