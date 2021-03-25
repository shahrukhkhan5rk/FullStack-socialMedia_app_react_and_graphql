const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { SECRET_KEY }  = require('../../config')
const User = require('../../models/User');
const { validateRegisterInput,validateLoginInput } = require('../../utils/validators');

function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        userName: user.userName
    }, SECRET_KEY, {expiresIn: '1h'});
}

module.exports = {
    Mutation: {
        async login(_,{ userName, password }){
            const {errors, valid} = validateLoginInput(userName,password);

            if(!valid){
                throw new UserInputError('Errors',{errors});
            }
            const user = await User.findOne({userName});

            if(!user){
                errors.general = 'User Name not registerd';
                throw new UserInputError('user not registered',{ errors })
            }
            const matchPassword = await bcrypt.compare(password, user.password);
            if(!matchPassword){
                errors.general = 'Invalid Credentials';
                throw new UserInputError('Invalid credentials',{ errors });
            }
            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        async register(_,{
            registerInput: {
                userName,
                email,
                password,
                confirmPassword
            }
        },context,info){
            // validate user data
            const { valid, errors}  = validateRegisterInput(userName,email,password,confirmPassword);
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }
            // make sure user doesnt already exist
            const user = await User.findOne({ userName});
            if(user){
                throw new UserInputError('userName is taken',{
                    errors: {
                        userName: "username is already taken"
                    }
                })
            }
            //hash password and create an auth token 
            password = await bcrypt.hash(password,10);

            const newUser = new User({
                email,
                userName,
                password,
                confirmPassword,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }
            
        }
    }
}