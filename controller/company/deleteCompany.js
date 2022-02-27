const { Company } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findOne({
      where: { id },
    });

    if (!company) {
      return res.status(404).json({
        status: "error",
        message: "company not found",
      });
    }

    await Company.destroy({
      where: { id },
    });

    return res.json({
      status: "success",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
