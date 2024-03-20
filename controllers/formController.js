const Form = require(`../models/formModel`);

const submitForm = async (req, res) => {
  try {
    const formObj = await Form.create(req.body);
    res.status(201).json({
      status: "success",
      data: formObj,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

module.exports = { submitForm };
