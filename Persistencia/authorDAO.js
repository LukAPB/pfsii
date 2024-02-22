import Author from "../Modelo/author.js";
import conectar from "./conexao.js";

export default class AuthorDAO {
    async gravar(author) {
        if (author instanceof Author) {
            const sql = "INSERT INTO author(author_name) VALUES(?)";
            const parametros = [author.nome];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            author.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(author) {
        if (author instanceof Author) {
            const sql = "UPDATE author SET author_name = ? WHERE author_id = ?";
            const parametros = [author.nome, author.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(author) {
        if (author instanceof Author) {
            const sql = "DELETE FROM author WHERE author_id = ?";
            const parametros = [author.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM author WHERE author_id = ? ORDER BY author_name';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = "SELECT * FROM author WHERE author_name LIKE ?";
            parametros = ['%' + parametroConsulta + '%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaAuthors = [];
        for (const registro of registros) {
            const author = new Author(registro.author_id, registro.author_name);
            listaAuthors.push(author);
        }
        return listaAuthors;
    }
}