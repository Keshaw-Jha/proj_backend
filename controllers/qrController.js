const Form = require("../models/formModel");

const getQr = async (req, res) => {
  try {
    const tempObj = await Form.findOne({
      ticketId: req.body.data,
    });
    res.status(200).send({ status: "success", data: tempObj });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = { getQr };
