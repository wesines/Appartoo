require('./config/config');
require('./models/db');
require('./config/passportConfig');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const rtsIndex = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors())
app.get('/', (req, res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(    'Access-Control-Allow-Headers',  
      'Origin, X-Requested-With, Content-Type, Accept'
    );      res.send('success') ;
  })
  const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
   app.use(expressCspHeader({
      directives: {
          'default-src': [INLINE],
          'script-src': [SELF, INLINE, 'somehost.com'],
          'style-src': [SELF, 'mystyles.net'],
          'img-src': ['data:', 'images.com'],
          'worker-src': [NONE],
          'block-all-mixed-content': true
      }  }));

console.log("pagolin.email in apps"+passport)
app.use(passport.initialize());


app.use('/api', rtsIndex);

// error handler
app.use((err, req, res, next) => {
    console.log("NODE APP.JS : "+err)
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        console.log("err",valErrors)
        res.status(422).send(valErrors)
     } else{
            console.log(err);
        }
    });
// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
