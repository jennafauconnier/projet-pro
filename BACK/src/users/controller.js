const User = require('./model');

const getAll = async (req, res) => {
  try {
    const users = await User.find().exec();
    res.status(200).send(users);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error while fetching all');
  }
};

const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save()
      res.status(200).send(newUser);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error while creating');
  }
};

const updateById = async (req, res) => {
  // req.body.username  console.log(req.body)
  const { _id, username } = req.body
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
      })
      console.log(updateUser)
      res.status(200).send(updateUser);
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error while fetching all: ');
  }
};

const remove = async (req, res) => {
  try {
    const removeUser = await User.remove({ _id: req.params.id}, (req, res) => {
    res.status(200).send(removeUser);
    });
  } catch (error) {
    console.error('Error', error);
    res.status(500).send('Error while fetching all');
  }
};

// récupérer utilisateur par email
// créer un utilisateur
// mettre à jour les données d'un utilisateur
// supprimer un utilisateur

module.exports = { 
  create,
  getAll,
  updateById,
  remove
};