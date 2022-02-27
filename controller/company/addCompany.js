const { Company } = require("../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    company_name: "string|empty:false",
    merk: "string|empty:false",
    country: "string|empty:false",
    owner: "string|empty:false",
    since: "string|empty:false",
    description_company: "string|empty:false",
    address: "string|empty:false",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const company = await Company.findOne({
    where: { company_name: req.body.company_name },
  });

  if (company) {
    return res.status(409).json({
      status: "error",
      message: "company name already exist",
    });
  }

  const data = {
    company_name: req.body.company_name,
    merk: req.body.merk,
    country: req.body.country,
    owner: req.body.owner,
    since: req.body.since,
    description_company: req.body.description_company,
    address: req.body.address,
  };

  const createdCompany = await Company.create(data);

  return res.json({
    status: "success",
    data: {
      id: createdCompany.id,
    },
  });
};
