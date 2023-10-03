const express= require('express');
const bodyParser=require('body-parser');

const Paysroutes=require('./controllers/pays.controller');
const Regionroutes=require('./controllers/region.controller');
const Roleroutes = require('./controllers/Role.controller');
const Userroutes = require('./controllers/User.controller');

const cors=require('cors');
const db = require('./models');
const corsOptions={origin:'http://localhost:4200'}
const PORT=3000;
const app=express();

const basicAuth = require('./middleware/basicAuth');
const { verifyToken } = require('./middleware/jwtAuth');

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//creation des tables au niveau de la base de donnees
db.sequelize.sync({ alter: true })
    .then(function () {
        console.log("la creation  des tables a reussie avec succés");

    }).catch(function () {
        console.log("erreur lors de la creation des tables")
    });

    
//pour utiliser le controlleur  pays
app.use('/api/pays',[basicAuth],Paysroutes);

//pour utiliser le controlleur  region
app.use('/api/regions',[basicAuth],Regionroutes);

//pour utiliser le controlleur  role
app.use('/api/roles',Roleroutes);

//pour utiliser le controlleur user
app.use('/api/users',[verifyToken], Userroutes);

app.listen(PORT,function(){
    console.log("Serveur demarré avec succés sur le port"  +" "+PORT)
})
