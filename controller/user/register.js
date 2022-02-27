const { Users, Keys } = require("../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const crypto = require("crypto");

module.exports = async (req, res) => {
  const schema = {
    fullname: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const validatePhone = /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{7,9}$/.test(
    req.body.phone_number
  );

  if (!validatePhone) {
    return res.status(400).json({
      status: "error",
      message: "Phone number not valid",
    });
  }

  const user = await Users.findOne({
    where: { email: req.body.email },
  });

  if (user) {
    return res.status(409).json({
      status: "error",
      message: "email already exist",
    });
  }

  const data = {
    password: req.body.password,
    fullname: req.body.fullname,
    email: req.body.email,
    phone_number: req.body.phone_number,
  };
  const keys = crypto.randomBytes(20).toString("hex");

  const createdUser = await Users.create(data);
  await Keys.create({
    keys,
    id_user: createdUser.id,
    uses: 0,
    limit: 10000,
  });

  return res.json({
    status: "success",
    data: {
      id: createdUser.id,
    },
  });
};
