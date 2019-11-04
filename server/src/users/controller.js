const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./model');
const sql = require('../services/sql');

const BCRYPT_SALT_ROUNDS = 10;
const JWT_SECRET = 'Os7èsSAàDOijqdspoUk';

const getAll = async (req, res) => {
  const knex = sql.get();
  try {
    const users = await knex('users').select(['id', 'username']);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send();
  }

  const hash = await bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
  // je créé un objet qui va me permettre de recuperer ce que l'utilisateur rentre suivant le model
  const newUser = {
    username,
    password: hash,
  };

  const knex = sql.get();

  try {
    const [user] = await knex('users').insert(newUser, ['id', 'username']);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  let isSamePassword;
  let user;

  const knex = sql.get();

  try {
    const res = await knex('users').where({ username }, '*');
    user = res[0];
    console.log(user);
    if (!user) {
      return res.status(401).send();
    }
    console.log(password, user.password);
    isSamePassword = await bcrypt.compareSync(password, user.password);

    if (!isSamePassword) {
      return res.status(401).send();
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: '3 hours' },
    );
    res.status(200).send({ token });
  } catch (error) {
    res.status(403).send({});
  }
};

const updateById = (req, res) => {
  User.findOneAndUpdate(
    req.params.id,
    {
      $set: req.body, // $set est une agregation mongodb qui en faisant une boucle va recuperer ton objet et le remplir via l'id
    },
    err => {
      if (err) {
        throw new Error(err);
      }
      res.status(200).send('user update with success');
    },
  );
};

const remove = (req, res) => {
  User.deleteOne(req.params._id, err => {
    if (err) {
      throw new Error(err);
    }
    res.status(200).send('user delete with success');
  });
};

module.exports = {
  create,
  login,
  getAll,
  updateById,
  remove,
  JWT_SECRET,
};
