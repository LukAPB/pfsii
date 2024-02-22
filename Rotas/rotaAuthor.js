import { Router } from "express";
import authorCtrl from "../Controle/authorCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const autCtrl = new authorCtrl();
const rotaAutor = new Router();

rotaAutor
.get('/',autCtrl.consultar)
.get('/:termo', autCtrl.consultar)
.post('/',autCtrl.gravar)
.patch('/',autCtrl.atualizar)
.put('/',autCtrl.atualizar)
.delete('/',autCtrl.excluir);

export default rotaAutor;