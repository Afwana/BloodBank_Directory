const testController = (req, res) => {
  res.status(200).send({
    message: "Welcom user",
    success: true,
  });
};

module.exports = { testController };
