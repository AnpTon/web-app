const userModel = require('../model/LMmodel');

exports.getAllUsers = (req, res) => {
  userModel.getAllUsers((err, Landmarks) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(Landmarks);
  });
};

exports.addUser = (req, res) => {
  const { Landmark, Details } = req.body;
  userModel.addUser(Landmark, Details, (err, Landmarks) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).json(Landmarks);
  });
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    userModel.deleteUser(id, (err) => {
    if (err) {
    return res.status(500).send(err.message);
    }
    res.send('Landmark deleted successfully.');
    });
};
  