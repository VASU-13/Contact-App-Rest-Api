require('dotenv').config();

const apiAccess = process.env.authorization


module.exports = (req, res, next) => {


  const apiAccessValue = req.headers.authorization

  if (!apiAccessValue) {
    return res.status(403).json({
      status: 403,
      message: 'FORBIDDEN'
    })
  }
  else if (apiAccessValue != apiAccess) {

    return res.status(403).json({
      status: 403,
      message: 'not valid token'
    })

  }

 
  next();


}