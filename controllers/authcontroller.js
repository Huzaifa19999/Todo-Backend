const AuthModel = require("../models/authmodel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
require('dotenv').config()

const AuthController = {
    signup: async (req, res) => {
        try {
            let body = req.body;
            let obj = {
                username: body.username,
                email: body.email,
                password: body.password,
            }

            let existingUser = await AuthModel.findOne({
                email: obj.email
            })

            if (existingUser) {
                res.status(409).send({
                    isSuccessfull: false,
                    data: null,
                    message: "User with this Email is already exists"
                })
                return;
            } else {
                obj.password = await bcrypt.hash(obj.password, 10)

                let UserObj = new AuthModel(obj)
                UserObj.save()
                    .then((result) => {
                        res.status(201).send({
                            isSuccessfull: true,
                            data: result,
                            message: "User Created Successfully"
                        })
                    })
                    .catch(err => {
                        throw err
                    });
            }

        } catch (error) {
            res.status(500).send({
                isSuccessfull: false,
                data: null,
                message: "Internal Server Error"
            });
        }
    },
    login: async (req, res) => {
        try {
            let body = req.body;

            let existingUser = await AuthModel.findOne({ email: body.email })

            if (!existingUser) {
                res.status(401).send({
                    isSuccessfull: false,
                    data: null,
                    message: "Invalid Credentials"
                })
                return;
            } else {
                let isCorrectPassword = await bcrypt.compare(body.password, existingUser.password)

                if (isCorrectPassword) {
                    res.status(200).send({
                        isSuccessfull: true,
                        data: existingUser,
                        token: await jwt.sign({ ...existingUser }, process.env.SECURITY_KEY),
                        message: "User Login Successfully"
                    })
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({
                isSuccessfull: false,
                data: null,
                message: "Internal Server Error"
            });
        }


    },
    checkauth: () => { },
}

module.exports = AuthController;