const expressJwt = require("express-jwt");

const authJwt = () => {
  const secret = process.env.MY_SECRET;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    // revoking token under some specific condition
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/images(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/product(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/category(.*)/, methods: ["GET", "OPTIONS"] },
      "/api/v1/user/login",
      "/api/v1/user/register",
      "/"
    ],
  });
};

const isRevoked = async (req, payload, done) => {
  if (!payload.isAdmin) {
    // cb revoke all
    done(null, true);
  }
  done();
};

module.exports = authJwt;
