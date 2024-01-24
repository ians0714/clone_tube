export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Clone_tube";
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUer = req.session.user;
  next();
};
