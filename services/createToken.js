const jwt = require("jsonwebtoken");
require("dotenv").config();

const { TOKEN_KEY, TOKEN_EXPIRY } = process.env;

const createToken = async (
    tokenData,
    tokenKey = TOKEN_KEY,
    expiresIn = TOKEN_EXPIRY
) => {
    try {
        console.log(tokenData);
        console.log(tokenKey);
        console.log(expiresIn);
        const token = await jwt.sign(tokenData, tokenKey, {
            expiresIn,
        })
        return token;
    } catch (error) {
        throw error;
    }
}

module.exports = createToken;