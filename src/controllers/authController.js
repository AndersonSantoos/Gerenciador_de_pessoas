const Pessoa = require("../models/pessoaModel");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const pessoa = await Pessoa.getByEmail(email);

    if (pessoa) {
      const senhaCorreta = await bcrypt.compare(senha, pessoa.senha);

      if (senhaCorreta) {
        res.json({ message: "Login bem-sucedido!" });
      } else {
        res.status(401).json({ error: "Credenciais inválidas." });
      }
    } else {
      res.status(401).json({ error: "Credenciais inválidas." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar o login." });
  }
};
