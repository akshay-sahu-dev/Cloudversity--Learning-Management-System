const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = function (req, res, next) {
    const token = req.cookies.token;
    console.log("TOKEN from AUTH.js ==> ", token);
    if (!token) return res.status(401).json({ message: 'Please login!!', error:"Auth token not found" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        console.error("Error during authentication ==> ",e);
        res.status(403).json({ message: 'Authentication failed', error: "Invalid Token" })
    }
}

module.exports = auth;