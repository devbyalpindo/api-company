const { Product, Company } = require("../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const schema = {
      id_company: "number|empty:false",
      name_product: "string|empty:false",
      model: "string|empty:false",
      production_year: "string|empty:false",
      cc: "number|empty:false",
      fuel: "string|empty:false",
      type: "string|empty:false",
      description: "string|empty:false",
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json({
        status: "error",
        message: validate,
      });
    }

    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "product not found",
      });
    }

    const company = await Company.findByPk(req.body.id_company);

    if (!company) {
      return res.status(404).json({
        status: "error",
        message: "company not found",
      });
    }

    const productName = req.body.product_name;
    if (productName) {
      const checkproductName = await Product.findOne({
        where: { product_name: productName },
      });

      if (checkproductName && productName !== product.product_name) {
        return res.status(409).json({
          status: "error",
          message: "product name already exist",
        });
      }
    }
    const {
      id_company,
      name_product,
      model,
      production_year,
      cc,
      fuel,
      type,
      description,
    } = req.body;

    await product.update({
      id_company,
      name_product,
      model,
      production_year,
      cc,
      fuel,
      type,
      description,
    });

    return res.json({
      status: "success",
      data: {
        id: product.id,
        id_company,
        name_product,
        model,
        production_year,
        cc,
        fuel,
        type,
        description,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
