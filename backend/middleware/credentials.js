const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Credentials', true);
      // res.header('Access-Control-Expose-Headers','Set-Cookie');
      // res.header('Access-Control-Allow-Headers','Cookie,Set-Cookie');
  }
  next();
}

module.exports = credentials


