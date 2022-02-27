const { Product } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "product not found",
      });
    }

    await Product.destroy({
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
