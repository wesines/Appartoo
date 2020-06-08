const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const Pagolin = mongoose.model('Pagolin');
var ObjectId=require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');


module.exports.register = (req, res, next) => {
    console.log("req"+req);

    var p = new Pagolin(); 
    console.log("reqbody"+req.body);
    p.age = req.body.age;
    p.famille = req.body.famille;
    p.race = req.body.race;
    p.nourriture = req.body.nourriture;
    p.email = req.body.email;
    p.password = req.body.password;
    
    p.save((err, doc) => {
        if (!err)
           {
               console.log("Enregistrement du doc en cours : donnees valides"+doc);
                res.send(doc);
           }
        else {
            if (err.code == 11000)
                res.status(422).send(['Email déjà utilisé. Veuillez le changer!']);
            else{
                return next(err);
            }
        }

    });
}
    module.exports.authenticate = (req, res, next) => {
      console.log("req"+req.email);
        // call for passport authentication
  
       passport.authenticate('local', (err, pagolin, info) => {   
        console.log("pagolin auth"+pagolin.email);   
            // error from passport middleware
            if (err) return res.status(400).json(err);
            // registered pagolin
            else if (pagolin) 
            {console.log("resultat authentifiate YES email="+res.email)
                return res.status(200).json({ "token": pagolin.generateJwt() });

        }
            // unknown pagolin or wrong password
            else
            { console.log("resultat authentifiate NON email="+res.email)
                return res.status(404).json(info);
            }
        })(req, res);
    }

    module.exports.pagolinProfile = (req, res, next) =>{
        console.log("getPAGOLINprofile in nodeCONTROLLER req;email= "+ req);

        Pagolin.findOne({ _id: req._id },
            (err, pagolin) => {
                if (!pagolin)
                {
                    console.log("resultatCONTROLLER de findone non "+res);     
                    return res.status(404).json({ status: false, message: 'pagolin record not found.' });
                }
                else
                {
                    console.log("resultatCONTROLLER de findone yes email= "+res.email); 
                    return res.status(200).json({ status: true, pagolin:_.pick(pagolin,['famille','race','age','nourriture','email']) });
                }
            }
        );
    }


module.exports.editPangolin = (req, res, next) =>{
    console.log("edit node")
            if(!ObjectId.isValid(req.params.id))
  return res.status(400).send(`No record with given id : ${req.params.id}`);
  var pag={
    famille:req.body.famille,
    age:req.body.age,
    nourriture:req.body.nourriture,
    race:req.body.race,
    email:req.body.email,
    password:req.body.password,

  };
  console.log("edit pagolin node"+pag)
Pagolin.findByIdAndUpdate(req.params.id,{$set:pag},{new:true},(err,doc)=>{
  if(!err){res.send(doc);}
  else {console.log('Error in Pangolin update:'+JSON.stringify(err,undefined,2));}
});

    
        }
        module.exports.listPagolin = (req, res, next) =>{
            console.log("listPagolin in NODE");
            Pagolin.find({},
                (err, pagolin) => {
                    if (!pagolin)
                    {
                        console.log("liste des pangolin resultat vide ");     
                        return res.status(404).json({ status: false, message: 'pagolin record not found.' });
                    }
                    else
                    {
                        console.log("liste des pangolin resultat node"+ pagolin ); 
                        res.send(pagolin);
                       // return res.status(200).json({ status: true, pagolin:_.pick(pagolin,['famille','race','age','nourriture','email']) });
                    }
                }
            );
        }

        module.exports.deletepagolin = (req, res, next) =>{
          //  console.log("id==="+ObjectId.isValid(req.params.id));
            if(!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id : ${req.params.id}`); 
            Pagolin.findByIdAndRemove({_id: req.params.id},(err,doc)=>{
                    if(!err){
                        console.log("suppp"+doc); 
                        res.send(doc);
                    }
   else {console.log('Error in Pangolin delte:'+JSON.stringify(err,undefined,2));}
  })
}



            
