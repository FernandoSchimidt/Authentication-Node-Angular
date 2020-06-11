const PersonModel = require("../models/PersonModel");

module.exports = {
  all: (req, res) => {
    PersonModel.find({})
      .lean()
      .exec((err, people) => {
        if (err) return res.json([]);
        return res.json(people);
      });
  },
};
