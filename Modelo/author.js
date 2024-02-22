import AuthorDAO from "../Persistencia/authorDAO.js";
//não esqueça do .js no final da importação

export default class Autor {
    //definição dos atributos privados
    #codigo;
    #nome;

    constructor(codigo=0, nome=''){
        this.#codigo=codigo;
        this.#nome=nome;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            nome:this.#nome
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const autDAO = new AuthorDAO();
        await autDAO.gravar(this);
    }

    async excluir(){
        const autDAO = new AuthorDAO();
        await autDAO.excluir(this);
    }

    async atualizar(){
        const autDAO = new AuthorDAO();
        await autDAO.atualizar(this);

    }

    async consultar(parametro){
        const autDAO = new AuthorDAO();
        return await autDAO.consultar(parametro);
    }
}