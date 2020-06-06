module.exports = (req, res, next) => {
  req.session && req.session.user ? next()
    : res.status(401).json({message:'You cannot LogIn with those Credentials'})
}