const { Company } = require("../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const company = await Company.findByPk(id, {
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
  });

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
