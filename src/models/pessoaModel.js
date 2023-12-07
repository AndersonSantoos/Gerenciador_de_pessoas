const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");

class Pessoa {
  static async getAll() {
    try {
      const [rows] = await db.query("SELECT * FROM pessoas");
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query("SELECT * FROM pessoas WHERE id = ?", [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(nome, idade, profissao, email, senha) {
    try {
      const hashedSenha = await bcrypt.hash(senha, 10);
      const [result] = await db.query(
        "INSERT INTO pessoas (nome, idade, profissao, email, senha) VALUES (?, ?, ?, ?, ?)",
        [nome, idade, profissao, email, hashedSenha]
      );

      // Verificar se a inserção foi bem-sucedida usando insertId
      if (
        result &&
        typeof result === "object" &&
        result.affectedRows === 1 &&
        result.insertId
      ) {
        return {
          success: true,
          message: "Registro criado com sucesso.",
          insertedId: result.insertId,
        };
      } else {
        console.error(result);
        return {
          success: false,
          message: "Falha ao criar o registro. Nenhum registro inserido.",
          insertedId: null,
        };
      }
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao criar o registro no banco de dados.");
    }
  }

  static async delete(id) {
    try {
      await db.query("DELETE FROM pessoas WHERE id = ?", [id]);
    } catch (error) {
      throw error;
    }
  }

  static async getByEmail(email) {
    try {
      const [rows] = await db.query("SELECT * FROM pessoas WHERE email = ?", [
        email,
      ]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, nome, idade, profissao, email, senha) {
    try {
      if (senha) {
        const hashedSenha = await bcrypt.hash(senha, 10);
        await db.query(
          "UPDATE pessoas SET nome = ?, idade = ?, profissao = ?, email = ?, senha = ? WHERE id = ?",
          [nome, idade, profissao, email, hashedSenha, id]
        );
      } else {
        await db.query(
          "UPDATE pessoas SET nome = ?, idade = ?, profissao = ?, email = ? WHERE id = ?",
          [nome, idade, profissao, email, id]
        );
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Pessoa;
