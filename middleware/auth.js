import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; //To check if it is a token from server not Google

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

// middleware to check JWT token and log out if it's expired
export const checkToken = (req, res, next) => {
  // get token from cookie or header
  const token = req.session.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // token has expired, log user out and redirect to login page
        req.session.destroy(() => {
          return res.redirect('/login')
        });
      } else {
        // token is valid, continue to next middleware
        next();
      }
    });
  } else {
    // no token found, redirect to login page
    return res.redirect('/login')
  }
};