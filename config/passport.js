const OAuth2Strategy = require('passport-oauth2')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/user.model')

module.exports = function(passport) {
    passport.use(
        new OAuth2Strategy({ usernameField: 'email'}, (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    
                })
        })
    )
}