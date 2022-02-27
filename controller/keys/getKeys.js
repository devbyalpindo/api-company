const { Keys } = require("../../models");

module.exports = async (req, res) => {
  const token = req.headers[`x-token-api`];

  const keys = await Keys.findOne({ where: { keys: token } });

  if (!keys) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  return res.json({
    status: "success",
    data: keys,
  });
};
