const UserModel = require('../Model/User');
const router = require('express').Router();
const { hash, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

const CreateUser = router.post('/signup', async(req, res) => {
    try {
        const userData = req.body;
        if(!(/(.*[0-9]+[!@#$%\^&*(){}[\]<>?/|\-]+|.*[!@#$%\^&*(){}[\]<>?/|\-]+[0-9]+)/.test(userData.password))){
            return res.status(400).json({error: "Atleast 1 number and 1 Special character is required for password"})
        }
        const emailExists = await UserModel.countDocuments({email: req.body.email});
        if(emailExists){
           return res.status(409).json({error: 'email already used'})
        }
        /* Create Password Hash */
        const hashedPassword = await hash(req.body.password, 10);
        userData.password = hashedPassword;
        const newUser = new UserModel(userData);
        const docs = await newUser.save();
        res.send({
            message: "Account created"
        })
        
    } catch (error) {
        console.log(error);
        if(error.code == 11000){
            return res.status(403).json({error: "Email already used"})
        }
        res.status(400).send({ error: 'Error' })
    }
});

const UserLogin = router.post('/signin', async (req, res) => {
    try {
        const docs = await UserModel.findOne({ email: req.body.email });

        if (docs) {
            /* Validate password */
            const isMatched = await compare(req.body.password, docs.password);
            if (isMatched) {
                /* Create JWT */
                const token = await jwt.sign({ id: docs._id, email: docs.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
                res.cookie('jwt',token, { httpOnly: true, secure: false, maxAge: 3600000 })
                res.send({
                    email: docs.email,
                    token: token
                })
            }
            else {
                res.status(401).send({ error: 'Incorrect password' });
            }
        }

        else {
            res.status(404).send({ error: 'Invalid login details' });
        }
    }

    catch (err) {
        console.log(err);
        res.status(400).send({ error: 'Error in authorizing' })
    }
});

module.exports = {
    CreateUser,
    UserLogin
}