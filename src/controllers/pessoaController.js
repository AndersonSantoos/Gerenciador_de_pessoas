const Pessoa = require('../models/pessoaModel');

exports.getAll = async (req, res) => {
  try {
    const pessoas = await Pessoa.getAll();
    res.json(pessoas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter as pessoas.' });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const pessoa = await Pessoa.getById(id);

    if (pessoa) {
      res.json(pessoa);
    } else {
      res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a pessoa.' });
  }
};

exports.create = async (req, res) => {
  const { nome, idade, profissao, email, senha } = req.body;

  try {
    const result = await Pessoa.create(nome, idade, profissao, email, senha);
    if (result.success) {
      res.status(201).json({ message: result.message });
    } else {
      res.status(500).json({ error: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao realizar a criação." });
  }
  
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, profissao } = req.body;

  try {
    await Pessoa.update(id, nome, idade, profissao);
    res.json({ message: 'Pessoa atualizada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a pessoa.' });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await Pessoa.delete(id);
    res.json({ message: 'Pessoa deletada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar a pessoa.' });
  }
};
