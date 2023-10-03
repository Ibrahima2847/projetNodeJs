const Jwt = require('jsonwebtoken');

function genereateToken(payload,secretKey, options){
    return Jwt.sign(payload,secretKey,options);
}

function decodedToken(token, secretKey){
    const decodedToken = Jwt.verify(token,secretKey);
    if(decodedToken)
        return decodedToken;
    else
        return null;
}

function verifyToken (req, res , next){
    if(req.url === '/login' ){
        console.log(req.headers.authorization);
        next();
    }
    else
    if(req.headers.authorization != null && req.headers.authorization.indexOf('Bearer ') != -1){
        const token = req.headers.authorization.split(' ')[1];
        const tokenData = decodedToken(token, process.env.SECRET_KEY);
        if(tokenData){
            console.log(tokenData);
            next();
        }else{
            res.status(401).json({message: 'Invalid Token'});
        }
    }else{
        res.status(401).json({message: 'Missing Token'});
    }
}

const authService = {
    genereateToken,
    decodedToken,
    verifyToken
}

module.exports = authService;