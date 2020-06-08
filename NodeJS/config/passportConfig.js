const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var Pagolin = mongoose.model('Pagolin');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            console.log("pagolin username passport",Pagolin.username)
            Pagolin.findOne({ email: username },
                (err, pagolin) => {
                    if (err)
                        return done(err);
                    // unknown pagolin
                    else if (!pagolin)
                    {console.log("email non existant dans la base")
                        return done(null, false, { message: 'Email non enregistré' });
                    }// wrong password
                    else if (!pagolin.verifyPassword(password)) 
                    {
                        console.log("password ghalet")
                        return done(null, false, { message: 'Mot de passe erroné.' });
                    }
                    // authentication succeeded
                    else
                        return done(null, pagolin);
                });
        })
);