const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  
  if(!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  //verify token -> jwt.verify(token, secret, callback)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
     
    req.user = decoded;
    next();
  })
}

module.exports = verifyUser;
