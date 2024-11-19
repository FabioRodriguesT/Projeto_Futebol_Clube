# Descrição

**Projeto Futebol Clube** é uma aplicação Full Stack que permite ao usuário ter acesso a um informativo sobre partidas e classificações de futebol. Podendo listar clubes cadastrados, listar partidas em andamento e finalizadas, criação de novas partidas, atualizar placar de partidas em andamento, finalizar partidas em andamento e gerar um leaderboard de time de fora e time de casa.

# Diagrama de Entidade e Relacionamento

Para orientar a construção das tabelas através do ORM, utilize o DER a seguir:
<p align="center"><img src="./futebol_clube_database.png"></p>

# Instalação

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

<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
