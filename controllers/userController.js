const bcrypt = require("bcrypt");
const ManagerUser = require("../model/manageUser");
const User = require("../model/user");
const { createToken, getTokenInfo } = require("../utils/token");

module.exports = {

  async signUp(req, res) {
    const data = new User(req.body);
    data
      .save()
      .then((responseUser) => {
        res
          .status(201)
          .send({ output: "Novo usuário foi criado", payload: responseUser });
      })
      .catch((error) => {
        console.log("Erro ao criar usuário " + error);
        res.status(500).send({ output: "Ocorreu um erro o cadastro do usuário não foi realizado" });
      });
  },

  async login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }, (error, data) => {
      if (error) {
        return res
          .status(500)
          .send({ output: "Ocorreu um erro ao localizar o usuário" });
      }

      if (!data) {
        return res
          .status(403)
          .send({ output: "O usuário não foi encontrado no banco" });
      }

      bcrypt.compare(password, data.password, (error, same) => {
        if (error) {
          return res.status(500).send({ output: "Erro ao validar a senha" });
        }

        if (!same) {
          return res.status(403).send({ output: "A senha é inválida" });
        }

        const token = createToken(data._id, data.username, data.name);

        const info = new ManagerUser({
          userid: data._id,
          username: data.username,
          information: req.headers,
        });

        info.save();

        res
          .status(200)
          .send({ output: "O usuário está autenticado", payload: data, token });
      });
    });
  },

  async resetPassword(req, res) {
    const { currentPassword, newPassword } = req.body;

    const token = req.headers.authorization.split(" ")[1];

    const tokenData = getTokenInfo(token);

    User.findOne({ username: tokenData.user }, (error, user) => {
      if (error) {
        return res
          .status(500)
          .send({ output: "Ocorreu um erro ao localizar o usuário" });
      }
      if (!user) {
        return res.status(401).send({ output: "O usuário não foi encontrado no banco" });
      }

      bcrypt.compare(currentPassword, user.password, (error, data) => {
        if (error) {
          return res
            .status(500)
            .send({ output: "Ocorreu um erro na validação da senha" });
        }
        if (!data) {
          return res.status(403).send({ output: "A senha atual que foi informada não é válida" });
        } else {
          user.password = newPassword;
          User(user)
            .save()
            .then((success) => {
              res.status(201).send({ output: "A senha foi atualizada com sucesso" });
            })
            .catch((error) => {
              console.log(error);
              res.status(500).send({ output: "Ocorreu um erro ao atualizar a senha" });
            });
        }
      });
    });
  },

};
