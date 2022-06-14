const jwt = require('jsonwebtoken')

const tokenValidator = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    // Remove Bearer from string
    if (token) {
        token = token.replace(/^Bearer\s+/, "");
    }
    if (token) {
        token = token.replace('"', '')
        token = token.replace('"', '')
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(403).json({
                    success: false,
                    message: 'Authorization failed. Please login'
                })
            }
            req.decodedToken = decoded;
            next();
        });
    } else {
        return res.json({
            success: false,
            message: 'Authorization failed. Auth token not found. Try logging in'
        });
    }
}

module.exports = tokenValidator