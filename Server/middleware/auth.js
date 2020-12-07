const { tokenHashKey, jwtSecret, requiresAuth } = require('../app-setting')
const jwt = require('jsonwebtoken');
const AES = require('crypto-js/aes');
const { SendResponse } = require('../util/utility')
const CryptoJs = require('crypto-js');
const Users = require('../models/users.model');


module.exports = async (req, res, next) => {
    if (!requiresAuth) return next();
    const encryptedToken = req.headers['x-auth-token'];
    //console.log('from server:' ,encryptedToken);
    if (!encryptedToken) return SendResponse(req, res, "Access denied, corrupted data", false, 403);
    try {
        let token = AES.decrypt(encryptedToken, tokenHashKey).toString(CryptoJs.enc.Utf8)

        jwt.verify(token, jwtSecret, async (error, decoded) => {
            if (error) {
                console.log('from Auth middleWare', error)
                if (error.name == 'TokenExpiredError')
                    return SendResponse(req, res, "Your credential is expired, Please login again", false, 403);
                else
                    return SendResponse(req, res, "Access to the part has been forbidden", false, 403);
            }
            else {
                console.log('auth decode', decoded);
                let userInfo = await Users.findOne({ _id: decoded._id });
                if (!userInfo.isActive)
                    return SendResponse(req, res, "The user account is inactive", false, 200);
                req.user = userInfo;
                next();
            }
        })
    }
    catch (ex) {
        return SendResponse(req, res, "Access denied, corrupted data", false, 403)
    }
}