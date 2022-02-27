const { Company } = require("../../models");

module.exports = async (req, res) => {
  const sqlOPtions = {
    attributes: [
      "id",
      "company_name",
      "merk",
      "country",
      "owner",
      "since",
      "description_company",
      "address",
    ],
  };

  const company = await Company.findAll(sqlOPtions);

  if (!company) {
    return res.status(404).json({
      status: "error",
      message: "company not found",
    });
  }

  return res.json({
    status: "success",
    data: company,
  });
};
