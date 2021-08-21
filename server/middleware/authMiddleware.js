const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header.authorization.split(" ")[1]
    const isCustomAuth = token.length < 500
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test')
      req.userId = decodedData?.userId
    } else {
      decodedData = jwt.decode(token)

      req.userId = decodedData?.sub
    }
    next()
  } catch (error) {
    console.log(error);
  }
}

module.exports = authMiddleware