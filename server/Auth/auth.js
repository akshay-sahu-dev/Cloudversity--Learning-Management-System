const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) =>  {

    // const token = req.cookies.token;
    // console.log("TOKEN from AUTH.js ==> ", token);
    // if (!token) return res.status(401).json({ message: 'Please login!!', error:"Auth token not found" });
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded;
    //     next();
    // } catch (e) {
    //     console.error("Error during authentication ==> ",e);
    //     res.status(403).json({ message: 'Authentication failed', error: "Invalid Token" })
    // }
try {
    if (!req.headers.authorization){
        return res.send({message: "Send Auth token in headers", error: "Auth Token not found"});
    };
    const token = req.headers.authorization.split(" ")[1];
    if (!token){
        return res.send({message: "Auth token not found"});
    } 
    const decoded = jwt.decode(token);
    if (!decoded){
        return res.send({ message: "Invalid Auth token", error: "Unauthorised entry"})
    }
    req.user = decoded;
    console.log("Authenticated!")
    next();
} catch (error) {
    console.log("Auth token not found",error);
    res.status(500).send({message: "Unauthorised entry", error: error.message});
}

}

module.exports = auth;