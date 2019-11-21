const jwt = require("jsonwebtoken");
const redis = require("redis");

// Setup Redis
const redisClient = redis.createClient(process.env.REDIS_URI);

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      res.status(400).json("Unauthorized");
    }
    return res.json({ id: reply });
  });
};

const signToken = email => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, "JWT_SECRET", { expiresIn: "2 days" });
};

const setToken = (token, id) => Promise.resolve(redisClient.set(token, id));

const createSessions = user => {
  const { id, email } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      return { success: true, id, token };
    })
    .catch(console.log);
};

module.exports = {
  redisClient,
  getAuthTokenId,
  createSessions
};
