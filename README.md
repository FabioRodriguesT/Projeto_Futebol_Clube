## Descrição

**Projeto Futebol Clube** é uma aplicação Full Stack que permite ao usuário ter acesso a um informativo sobre partidas e classificações de futebol. Podendo listar clubes cadastrados, listar partidas em andamento e finalizadas, criação de novas partidas, atualizar placar de partidas em andamento, finalizar partidas em andamento e gerar um leaderboard de time de fora e time de casa.

## Sumário
- [Diagrama de Entidade e Relacionamento](#Diagrama-de-Entidade-e-Relacionamento)
- [Sobre o projeto](#Sobre-o-projeto)
- [Instalação](#Instalação)
- [Dependências](#Dependências)
- [Licença](#Licença)

## Diagrama de Entidade e Relacionamento

Para orientar a construção das tabelas através do ORM, utilize o DER a seguir:
<p align="center"><img src="./futebol_clube_database.png"></p>

## Sobre o projeto

O projeto é um site informativo sobre partidas e classificações de futebol!

### O que foi desenvolvido:

- Foi desenvolvido uma API (utilizando o método TDD) e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

- Também construimos um back-end dockerizado utilizando modelagem de dados através do Sequelize. Seu desenvolvimento deve respeitar regras de negócio providas no projeto e sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto.

- O back-end implementou regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

### Habilidades Desenvolvidas:

- Realização da dockerização dos apps, network, volume e compose;
- Modelagem de dados com MySQL através do Sequelize;
- Criação e associação de tabelas usando models do sequelize;
- Construção de uma API REST com endpoints para consumir os models criados;
- Construção de um CRUD com TypeScript, utilizando ORM;

## Instalação

### Pré-requisitos
- **Docker** e **Docker-Compose**.
- **Node.js** e **npm**.

1. Clone o repositório
```bash
  git clone git@github.com:FabioRodriguesT/Projeto_Futebol_Clube.git
```
2. Entre no arquivo
```bash
  cd Projeto-futebol-clube
```
3. Suba os containêrs
```bash
  npm run compose:up ou docker-compose up -d --build
```
4. No momento que subir os container retornara essa messagem no terminal
```bash
  Creating db ... done
  Creating app_backend_1 ... done
  Creating app_frontend_1 ... done
```
5. Para acessar as aplicação
```bash
  front-end: localhost:3000
  back-end: localhost:3001
```
  Para a realização do login no front-end:
```bash
  login: admin@admin.com
  senha: secret_admin
```
6. Para rodar os testes de integração, caso estiver na raiz do projeto
```bash
  cd app && docker-compose exec backend npm test
```
7. Para remover a API
```bash
  docker-compose down --rmi local --volumes --remove-orphans
```

## Dependências

### Dependencias: ###
<ul>
    <li>camelcase</li>
    <li>http-status-codes</li>
    <li>jsonwebtoken</li>
    <li>puppeteer</li>
    <li>uuid</li>
</ul>


### Depêndencias de Desenvolvimento: ### 

<ul>
    <li>jest-dom</li>
    <li>react</li>
    <li>user-event</li>
    <li>axios</li>
    <li>jest</li>
    <li>mocha</li>
    <li>mysql2</li>
    <li>nyc</li>
    <li>sequelize</li>
    <li>sequelize-cli</li>
</ul>


## Licença

Este projeto é licenciado sob a Licença MIT. Boa codificação!

