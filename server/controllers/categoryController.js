const User = require("../models/user.js");

const remove = async (req, res) => {
  const categories = req.user.categories;
  const newCategories = categories.filter(
    (category) => category._id != req.params.id
  );
  const result = await User.updateOne(
    { _id: req.user.id },
    {
      $set: {
        categories: newCategories,
      },
    }
  );
  console.log(result);
  res.send({ message: "Successfully deleted category" });
};

module.exports = { remove };
