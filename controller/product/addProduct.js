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

    const product = await Product.findOne({
      where: { name_product: req.body.name_product },
    });

    if (product) {
      return res.status(409).json({
        status: "error",
        message: "product name already exist",
      });
    }

    const company = await Company.findByPk(req.body.id_company);

    if (!company) {
      return res.status(404).json({
        status: "error",
        message: "company not found",
      });
    }

    const data = {
      id_company: req.body.id_company,
      name_product: req.body.name_product,
      model: req.body.model,
      production_year: req.body.production_year,
      cc: req.body.cc,
      fuel: req.body.fuel,
      type: req.body.type,
      description: req.body.description,
    };

    const createdProduct = await Product.create(data);

    return res.json({
      status: "success",
      data: {
        id: createdProduct.id,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
};
