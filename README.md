## Descrição

**Projeto Futebol Clube** é uma aplicação Full Stack que permite ao usuário ter acesso a um informativo sobre partidas e classificações de futebol. 
O sistema possibilita listar clubes cadastrados, listar partidas em andamento e finalizadas, criar novas partidas, atualizar o placar de partidas em andamento, 
finalizar partidas e gerar um leaderboard com informações sobre o desempenho dos times..

## Sumário
- [Diagrama de Entidade e Relacionamento](#Diagrama-de-Entidade-e-Relacionamento)
- [Sobre o projeto](#Sobre-o-projeto)
- [Instalação](#Instalação)
- [Instruções de utilização do projeto](#Instruções-de-utilização-do-projeto)
- [Dependências](#Dependências)
- [Licença](#Licença)

## Diagrama de Entidade e Relacionamento

Para orientar a construção das tabelas através do ORM, utilize o DER a seguir:
<p align="center"><img src="./futebol_clube_database.png"></p>

## Sobre o projeto

O projeto é um site informativo sobre partidas e classificações de futebol!

### O que foi desenvolvido:

- Foi desenvolvido uma API (utilizando o método TDD) e integrada com docker-compose, permitindo que as aplicações funcionem consumindo um banco de dados MySQL.

- O backend foi desenvolvido utilizando modelagem de dados através do Sequelize, respeitando as regras de negócio definidas no projeto. A API foi construída para ser consumida por um front-end já provido neste repositório.

- Implementação de regras de negócio para popular a tabela de classificação e os dados de partidas.

### Habilidades Desenvolvidas:

- Dockerização das aplicações com redes, volumes e Compose;
- Modelagem de dados com MySQL utilizando Sequelize;
- Criação e associação de tabelas com os models do Sequelize;
- Construção de uma API RESTful com endpoints para consumir os models criados;
- Implementação de um CRUD utilizando TypeScript e ORM.

## Instalação

### Pré-requisitos
- **Docker** e **Docker-Compose**.
- **Node.js** e **npm**.

1. Clone o repositório:
```bash
  git clone git@github.com:FabioRodriguesT/Projeto_Futebol_Clube.git
```
2. Navegue para o diretório do projeto:
```bash
  cd Projeto-futebol-clube
```
3. Suba os containers com o comando:
```bash
  npm run compose:up ou docker-compose up -d --build
```
4. Após o comando, o terminal mostrará a seguinte mensagem:
```bash
  Creating db ... done
  Creating app_backend_1 ... done
  Creating app_frontend_1 ... done
```
5. Para acessar as aplicações, utilize os seguintes links:
```bash
  front-end: localhost:3000
  back-end: localhost:3001
```
6. Para realizar o login no front-end, use as credenciais:
```bash
  login: admin@admin.com
  senha: secret_admin
```
7. Para rodar os testes de integração, execute o seguinte comando, caso esteja na raiz do projeto:
```bash
  cd app && docker-compose exec backend npm test
```
8. Para remover a API, execute:
```bash
  docker-compose down --rmi local --volumes --remove-orphans
```

## Instruções de utilização do projeto:

Utilize algum aplicativo ou extensão do VSCode para realizar as requisições.

Exemplo: ThunderClient, Insomnia.

### Rotas disponíveis

<table>
  <thead>
    <tr>
      <th>Rota</th>
      <th>Funcionalidade</th>
      <th>Tipo de Requisição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>POST</td>
      <td>/login</td>
      <td>Realiza login na aplicação.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/login/role</td>
      <td>Verifica a validação do token de login.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/teams</td>
      <td>Lista todos os times cadastrados.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/teams/:id</td>
      <td>Lista um time especifico.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/matches</td>
      <td>Lista todas as partidas.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>matches?inProgress=true</td>
      <td>Lista todas as partidas em andamento.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>matches?inProgress=false</td>
      <td>Lista todas as partidas já finalizadas.</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td>/matches/:id/finish</td>
      <td>Finaliza uma partida pelo seu id especifico.</td>
    </tr>
    <tr>
      <td>PATCH</td>
      <td>/matches/:id</td>
      <td>Atualiza uma partida pelo seu id especifico.</td>
    </tr>
    <tr>
      <td>POST</td>
      <td>/matches</td>
      <td>Cadastra uma nova partida.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/leaderboard/home</td>
      <td>Lista informações do desempenho dos times de casa.</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/leaderboard/away</td>
      <td>Lista informações do desempenho dos times visitantes.</td>
    </tr>
  </tbody>
</table>

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

