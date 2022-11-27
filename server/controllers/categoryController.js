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
  res.send({ message: "Successfully deleted category" });
};

const create = async (req, res) => {
  const { label, icon } = req.body;
  const result = await User.updateOne(
    { _id: req.user.id },
    {
      $set: {
        categories: [...req.user.categories, { label, icon }],
      },
    }
  );
  console.log(result);
  res.send({ message: "Successfully added category" });
};

const update = async (req, res) => {
  const { label, icon } = req.body;

  const result = await User.updateOne(
    { _id: req.user.id },
    {
      $set: {
        categories: req.user.categories.map((category) => {
          if (category._id == req.params.id) {
            return { label, icon };
          }
          return category;
        }),
      },
    }
  );
  res.send({ message: "Successfully updated category" });
};

module.exports = { remove, create, update };
