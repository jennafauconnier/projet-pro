const User = require("./model");
const bcrypt = require('bcrypt');
const userSchema = require('./model');

const BCRYPT_SALT_ROUNDS = 10;

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Error while fetching all");
  }
};


const create = async (req, res) => {
  const { username, password, email, role } = req.body;
  if (username && password && email && role) {

    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    // je créer un objet qui va me permettre de recuperer ce que l'utilisateur rentre suivant le model
    const newUser = {
      username: username,
      password: hash,
      email: email,
      role: role
    };

    // ici j'envoie notre objet en BDD via une methode mongoose
    User.create(newUser, (err, res) => {
      if (err) console.log(err);
    });
    res.status(200).send("user register with success");
  } else {
    res.status(412).send("all fields are required");
  }
};

const login = async (req, res) => {

  const { username, password } = req.body;

  let isSamePassword;
  let user;

  try {
    user = await User.find({username});
    isSamePassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    console.log("Error authenticating user");
    console.log(error);
    res.status(502).send();
    return;
  }

  if(!isSamePassword) {
    res.status(403).send();
  }

  res.send();
  
  next();
}

const updateById = (req, res) => {
  User.findOneAndUpdate(
    req.params.id, {
      $set: req.body // $set est une agregation mongodb qui en faisant une boucle va recuperer ton objet et le remplir via l'id
    },
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("modification " + result);
      res.status(200).send("user update with success");
    }
  );
};

const remove = (req, res) => {
  User.deleteOne(req.params._id, err => {
    if (err) {
      console.log(err);
    }
    res.status(200).send("user delete with success");
  });
};

// récupérer utilisateur par email
// créer un utilisateur
// mettre à jour les données d'un utilisateur
// supprimer un utilisateur

module.exports = {
  create,
  login,
  getAll,
  updateById,
  remove
};