authentification = function (req, res, next) {

    const USERNAME = 'admin';
    const PASSWORD = 'passer123';
    if (req.headers.authorization != null) {

        if (req.headers.authorization.indexOf('Basic ') === -1) {
            console.log(req.headers.authorization);
            res.status(500).json({ "error": "Authorisation non reussi !" })
        } else {

            const credials = req.headers.authorization.split(' ')[1];
            const decodedCredentials = Buffer.from(credials, 'base64').toString('ascii');

            const username = decodedCredentials.split(':')[0];
            const password = decodedCredentials.split(':')[1];

            if (username == USERNAME && password == PASSWORD)
                next();
            else
                res.status(401).json({ "error": "Missing authorization !" })

        }
    } else
        res.status(401).json({ "error": "Authorisation non accordé !" })
}

module.exports = authentification;