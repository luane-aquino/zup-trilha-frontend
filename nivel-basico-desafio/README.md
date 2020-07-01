# Desafio frontend
Objetivo:
Implementar uma aplicação para gerenciar pessoas. Essa aplicação necessita ser executada nos navegadores mais recentes do mercado.

Layout: https://marvelapp.com/39776de

Especificações
* O sistema deve seguir o layout proposto
* A aplicação deve ser responsiva (mobile, tablet, desktop);
* Armazenar o código fonte no Github;

## Desafio parte 1/2
Requisitos
* Eu como usuário, desejo visualizar a listagem de candidatos;
* Eu como usuário, desejo visualizar as informações de cada candidato (Nome, email, telefone, cidade e estado);
* Eu como usuário, desejo visualizar o menu lateral (Todos, Atendidos, Lixeira)
* Eu como usuário, desejo visualizar a barra de pesquisa no header.

## Desafio parte 2/2
Pré-Requisitos
* Ter concluído o Desafio 1 com o objetivo de ter continuidade neste desafio.

Requisitos
* Eu como usuário, desejo pesquisar um determinado usuário conforme seu nome ou email;
* Eu como usuário, desejo enviar para a listagem "TODOS" um usuário que esteja na listagem "ATENDIDOS" ou "LIXEIRA";
* Eu como usuário, desejo enviar para a "LIXEIRA" um usuário que esteja na listagem "TODOS" ou "ATENDIDOS";
* Eu como usuário, desejo marcar como "ATENDIDO" um usuário que esteja na listagem "TODOS" ou "LIXEIRA";
* Eu como usuário, desejo navegar nos filtros laterais conforme a interação executada;
* Eu como usuário, desejo que ao clicar em um item da listagem seja apresentado as informações do usuário em uma nova tela;
* Eu como usuário, desejo que ao visualizar a informação de um usuário seja possível voltar a tela anterior;

## Running the project locally
Requirement: nodejs installed

* Install dependencies: `npm install`
* Open index.html in the browser and start json-server: `npm start`

Example endpoints:
* http://localhost:3000/users
* http://localhost:3000/users/1
