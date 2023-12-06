const db = require("../config/dbConfig");

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
        }   catch (error) {
            throw error;
        }
    }

    static async create(nome, idade, profissao) {
        try {
            await db.query("INSERT INTO pessoas (nome, idade, profissao) VALUES (?, ?, ?)", [nome, idade, profissao]);
        }  catch (error) {
            throw error;
        }
    }
 
    static async delete(id) {
        try {
            await db.query("DELETE FROM pessoas WHERE id = ?", [id]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Pessoa;