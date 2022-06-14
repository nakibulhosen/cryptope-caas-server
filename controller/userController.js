// internal imports 
const pool = require('../utilities/dbConnection')
const { encrypt, decrypt } = require('../utilities/encryptDecrypt')

// external imports 
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

// User Login
async function userLogin(req, res, next) {
    const { walletAddress } = req.body
    const encryptedWalletAddress = encrypt(walletAddress)
    try {
        pool.query('SELECT * FROM peoples WHERE walletAddress = $1', [encryptedWalletAddress], (error, user) => {
            if (error) {
                console.log(error)
                res.status(500).json({
                    errors: {
                        common: {
                            message: "There was a server side error",
                            error: error,
                        },
                    },
                });
            } else {
                if (user.rows.length > 0) {
                    // make user object
                    let userData = {
                        id: user.rows[0].id,
                        firstName: decrypt(user.rows[0].firstname),
                        lastName: decrypt(user.rows[0].lastname),
                        email: decrypt(user.rows[0].email),
                        role: user.rows[0].role,
                        ability: user.rows[0].ability
                    };
                    let encryptedUserData = {
                        firstName: user.rows[0].firstname,
                        lastName: user.rows[0].lastname,
                        email: user.rows[0].email,
                        ability: user.rows[0].ability,
                        role: user.rows[0].role
                    }
                    // generate jwt token
                    const accessToken = jwt.sign(encryptedUserData, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRE,
                    });

                    // send response 
                    res.status(200).json({
                        message: "Loggedin successfully",
                        status: 200,
                        userData,
                        accessToken
                    });
                } else {
                    res.status(201).json({
                        message: "You are not registered. Please register first",
                        status: 201
                    });
                }

            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: {
                common: {
                    message: "There was a server side error",
                    error: error,
                },
            },
        });
    }
}

// User registraion 
async function userRegistraiton(req, res, next) {
    const { name, address, business_name, logo, email, password } = req.body
    const role = req.body.role || 'user'
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    pool.query('INSERT INTO peoples (firstname, lastname, email, walletAddress, ability, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [encryptedFirstName, encryptedLastName, encryptedEmail, encryptedWalletAddress, ability, role], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500).json({
                errors: {
                    common: {
                        message: "There was a server side error",
                        error: error,
                    },
                },
            });
        } else {
            console.log('id', results.rows)
            let decryptedUserData = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                walletAddress: walletAddress,
                ability: req.body.ability || JSON.parse(defaultAbility),
                role: req.body.role || 'user',
                id: results.rows[0].id
            }
            // generate jwt token
            const token = jwt.sign(decryptedUserData, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            res.status(200).json({
                message: "User was added successfully",
                userData: decryptedUserData,
                accessToken: token
            });
        }
    })
}

module.exports = {
    userLogin,
    userRegistraiton
}