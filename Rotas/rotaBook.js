import { Router } from "express";
import BookCtrl from "../Controle/bookCtrl.js";


const livroCtrl = new BookCtrl();
const rotaLivro = new Router();

rotaLivro
.get('/', livroCtrl.consultar)
.get('/:termo', livroCtrl.consultar)
.post('/', livroCtrl.gravar)
.patch('/', livroCtrl.atualizar)
.put('/', livroCtrl.atualizar)
.delete('/', livroCtrl.excluir);

export default rotaLivro;