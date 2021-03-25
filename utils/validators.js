module.exports.validateRegisterInput = (
    userName,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(userName.trim() === ''){
        errors.userName = 'User Name must not be empty';
    }
    if(email.trim() === ''){
        errors.email = 'please include a valid email id';
    }else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx))
        errors.email = 'email must a valid email email address';
    }
    if(password.trim() === ''){
        errors.password = 'Input a password atleast 8 characters'
    }else if(password !== confirmPassword){
        errors.confirmPassword = 'Password must match';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};

module.exports.validateLoginInput = (userName, password) => {
    const errors = {};
    if(userName.trim() === ''){
        errors.userName = 'User Name must not be empty';
    }
    if(password.trim() === ''){
        errors.password = 'Password must bot be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}