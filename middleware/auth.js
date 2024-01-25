const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
    let token = req.body.token ||
    req.query.token ||
    req.headers["x-access-token"]

    if (!token && req.headers.authorization) {
        token = req.headers.authorization.toString().split(' ')[1]
    }

    // check for provided token
    if (!token) {
        return res.status(403).send("An autheciation token is required");
    }


    // verify token
    try {
        const decodedToken = await jwt.verify(token, TOKEN_KEY);
        req.currentUser = decodedToken;
    } catch (error) {
        return res.status(401).send("Invalid token provided");
    }

    // proceed with request
    return next();
}

module.exports = verifyToken;