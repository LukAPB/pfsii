import LivroDAO from "../Persistencia/bookDAO.js";

export default class Livro{
    #codigo;
    #titulo;
    #preco;
    #dataPublicacao;
    #autorId;
    #autor; 

    constructor(codigo=0,titulo="", preco=0, 
                dataPublicacao='', autorId=0,
                autor={}
                ){
        this.#codigo=codigo;
        this.#titulo=titulo;
        this.#preco=preco;
        this.#dataPublicacao=dataPublicacao;
        this.#autorId=autorId;
        this.#autor=autor;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get titulo(){
        return this.#titulo;
    }

    set titulo(novoTitulo){
        this.#titulo=novoTitulo;
    }

    get preco(){
        return this.#preco;
    }

    set preco(novoPreco){
        this.#preco = novoPreco
    }

    get dataPublicacao(){
        return this.#dataPublicacao;
    }

    set dataPublicacao(novaData){
        this.#dataPublicacao = novaData;
    }

    get autorId(){
        return this.#autorId;
    }

    set autorId(novoAutorId){
        this.#autorId = novoAutorId;
    }

    get autor(){
        return this.#autor;
    }

    set autor(novoAut){
        this.#autor = novoAut;
    }

    //override do método toJSON
    toJSON(){
        return {
            titulo:this.#titulo,
            preco:this.#preco,
            dataPublicacao:this.#dataPublicacao,
            autorId:this.#autorId,
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const livroDAO = new LivroDAO();
        await livroDAO.gravar(this);
     }
 
     async excluir(){
        const livroDAO = new LivroDAO();
        await livroDAO.excluir(this);
     }
 
     async alterar(){
        const livroDAO = new LivroDAO();
        await livroDAO.atualizar(this);
     }
 
     async consultar(termo){
        const livroDAO = new LivroDAO();
        return await livroDAO.consultar(termo);
     }

}