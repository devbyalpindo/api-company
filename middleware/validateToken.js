const { Keys } = require("../models");

module.exports = async (req, res, next) => {
  const authHeader = req.headers[`x-token-api`];

  if (!authHeader) return res.status(401).json({ status: "unauthorized" });

  const user = await Keys.findOne({
    where: { keys: authHeader },
  });

  if (!user) {
    return res.status(401).json({ status: "unauthorized" });
  }

  if (user.uses >= user.limit) {
    return res.status(429).json({ status: "error", message: "Limit Quota" });
  }

  await user.update({
    uses: user.uses + 1,
  });

  next();
};
