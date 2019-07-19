const User = require("./model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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
  console.log('toto');
  const {
    username,
    password
  } = req.body;

  try {
    if (!username || !password) {
      throw 'all fields are required'
    }

    const hash = await bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
    // je créer un objet qui va me permettre de recuperer ce que l'utilisateur rentre suivant le model
    const newUser = {
      username: username,
      password: hash
    };

    // ici j'envoie notre objet en BDD via une methode mongoose
    User.create(newUser, (err, res_create) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('user register with success');
      }
    });
  } catch (error) {
    res.status(200).send(error);
  }
};

const login = async (req, res) => {

  const { username, password } = req.body;
  let isSamePassword;
  let user;

  try {
    user = await User.findOne({ username });
    if (!user) {
      throw "Ce user n'existe pas"
    }

    isSamePassword = await bcrypt.compareSync(password, user.password);

    if (!isSamePassword) {
      throw new Error('Wrong password')
    }

    const token = jwt.sign({
      sub: user.id,
      username: user.username
    }, "mykey", {expiresIn: "3 hours"});
    res.status(200).send({access_token: token});

    jwt.verify(token, username, function(err, decoded) {
      console.log(username)
    });

  } catch (error) {
    console.log("Error authenticating user");
    console.log(error);
    res.status(403).send({});
  }
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

module.exports = {
  create,
  login,
  getAll,
  updateById,
  remove
};