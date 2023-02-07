const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'SEI_69_SECRET_KEY';

module.exports = jwtOptions;