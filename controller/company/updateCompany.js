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

  const id = req.params.id;
  const company = await Company.findByPk(id);
  if (!company) {
    return res.status(404).json({
      status: "error",
      message: "company not found",
    });
  }

  const companyName = req.body.company_name;
  if (companyName) {
    const checkCompanyName = await Company.findOne({
      where: { company_name: companyName },
    });

    if (checkCompanyName && companyName !== company.company_name) {
      return res.status(409).json({
        status: "error",
        message: "company name already exist",
      });
    }
  }
  const {
    company_name,
    merk,
    country,
    owner,
    since,
    description_company,
    address,
  } = req.body;

  await company.update({
    company_name,
    merk,
    country,
    owner,
    since,
    description_company,
    address,
  });

  return res.json({
    status: "success",
    data: {
      id: company.id,
      company_name,
      merk,
      country,
      owner,
      since,
      description_company,
      address,
    },
  });
};
