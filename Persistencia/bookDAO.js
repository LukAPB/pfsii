import Book from '../Modelo/book.js';
import Author from '../Modelo/author.js';
import conectar from './conexao.js';

export default class BookDAO {

    async gravar(book) {
        if (book instanceof Book) {
            const sql = `INSERT INTO book(book_title, book_price,
                book_published, author_id)
                VALUES(?,?,?,?)`;
            const parametros = [book.titulo, book.preco, book.dataPublicacao, book.autor.codigo];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            book.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(book) {
        if (book instanceof Book) {
            const sql = `UPDATE book SET book_title = ?, book_price = ?,
            book_published = ?, author_id = ?
            WHERE book_id = ?`;
            const parametros = [book.titulo, book.preco, book.dataPublicacao, book.autor.codigo, book.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(book) {
        if (book instanceof Book) {
            const sql = `DELETE FROM book WHERE book_id = ?`;
            const parametros = [book.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaBooks = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do book
            const sql = `SELECT b.book_id, b.book_title,
              b.book_price, b.book_published, a.author_id, a.author_name
              FROM book b 
              INNER JOIN author a ON b.author_id = a.author_id
              WHERE b.book_id = ?
              ORDER BY b.book_title               
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const author = new Author(registro.author_id, registro.author_name);
                const book = new Book(registro.book_id,registro.book_title,
                                            registro.book_price,registro.book_published,
                                            author
                                            );
                listaBooks.push(book);
            }
        }
        else
        {
            //consulta pelo título do book
            const sql = `SELECT b.book_id, b.book_title,
              b.book_price, b.book_published, a.author_id, a.author_name
              FROM book b 
              INNER JOIN author a ON b.author_id = a.author_id
              WHERE b.book_title like ?
              ORDER BY b.book_title               
            `;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const author = new Author(registro.author_id, registro.author_name);
                const book = new Book(registro.book_id,registro.book_title,
                                            registro.book_price,registro.book_published,
                                            author
                                            );
                listaBooks.push(book);
            }
        }

        return listaBooks;
    }
}