const JWT = require('jsonwebtoken');

console.log(process.env.ACCESS_TOKEN_SECRET_KEY);
const generateAccessToken = (user) => {
    return JWT.sign({result: user}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '7200000'});           // 900000 - 15 min
}

const generateAccessTokenAdmin = (user) => {
    return JWT.sign({result: user}, process.env.ACCESS_TOKEN_ADMIN_SECRET_KEY, {expiresIn: '72000000'});           // 900000 - 15 min
}

const generateAccessTokenUser = (user) => {
    return JWT.sign({result: user}, process.env.ACCESS_TOKEN_USER_SECRET_KEY, {expiresIn: '72000000'});           // 900000 - 15 min
}
module.exports = {
    generateAccessToken,
    generateAccessTokenAdmin,
    generateAccessTokenUser
}