var jwt = require('jsonwebtoken');

const Auth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const isCustomAuth = token.length < 500;
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        }
        else {
            console.log('huehue ee ta googalwa ba');
        }
        next();
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = Auth;