const { Product, Company } = require("../../models");

module.exports = async (req, res) => {
  Product.belongsTo(Company, { foreignKey: "id_company" });
  Company.hasMany(Product, { foreignKey: "id" });
  const product = await Product.findAll({ include: [Company] });

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "product not found",
    });
  }

  return res.json({
    status: "success",
    data: product,
  });
};
