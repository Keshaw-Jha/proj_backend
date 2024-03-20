const submitOtp = (req, res) => {
  try {
    console.log(req.body);
    res.send("form submitted");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = { submitOtp };
