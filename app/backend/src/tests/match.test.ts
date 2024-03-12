import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import { bearerMock } from './mocks/user.mock';
import { createdMatchMock } from './mocks/match.mock';
import SequelizeMatches from '../database/models/SequelizeMatches';
import jwtUtils from '../utils/jwt.utils';
const expect = chai.expect

const matchesModel = new SequelizeMatches();

chai.use(chaiHttp);

describe('Testando a rota de matches', () => {
  beforeEach(function () { sinon.restore(); }); 
  // matchs é composto por 4 subrotas: get, patch-Finish, patch-Id e post.
  it('Testando a rota de receber todos os matches com sucesso.', async function() {
    // Arrange
    // Act 
    const httpResponse = await chai.request(app).get('/matches').set('authorization', bearerMock);
    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.an('array');
  })

  it('Testando a rota de receber todos os matches em andamentos com sucesso.', async function() {
    // Arrange
    // Act 
    const httpResponse = await chai.request(app).get('/matches?inProgress=true').set('authorization', bearerMock);
    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body[0].inProgress).to.be.true;
    expect(httpResponse.body[1].inProgress).to.be.true;
    expect(httpResponse.body[2].inProgress).to.be.true;
  })

  it('Testando a rota de receber todos os matches finalizados com sucesso.', async function() {
    // Arrange
    // Act 
    const httpResponse = await chai.request(app).get('/matches?inProgress=false').set('authorization', bearerMock);
    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body[0].inProgress).to.be.false;
    expect(httpResponse.body[1].inProgress).to.be.false;
    expect(httpResponse.body[2].inProgress).to.be.false;
  })

  it('Testando a rota de finalizar uma partida no banco de dados com sucesso.', async function() {
    // Arrange
    sinon.stub(jwtUtils, 'verify').resolves({
      email: "admin@admin123.com"
    })

    await SequelizeMatches.update({ inProgress: true }, { where: { id: 41 } });
    const firstFind = await SequelizeMatches.findByPk(41)

    // Act     
    const httpResponse = await chai.request(app).patch('/matches/41/finish').set('authorization', bearerMock);
    const secondFind = await SequelizeMatches.findByPk(41)
    
    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body.message).to.equal('Finish');  
    expect(firstFind?.dataValues.inProgress).to.be.true;
    expect(secondFind?.dataValues.inProgress).to.be.false;  
  })

  it('Testando a rota de atualizar uma partida em andamento com sucesso.', async function() {
    // Arrange
    sinon.stub(jwtUtils, 'verify').resolves({
      email: "admin@admin123.com"
    })
    await SequelizeMatches.update({ homeTeamGoals: 15, awayTeamGoals: 8 }, { where: { id: 32 } });
    
    const firstFind = await SequelizeMatches.findByPk(32)
    // Act     
    const httpResponse = await chai.request(app).patch('/matches/32').set('authorization', bearerMock).send({
      homeTeamGoals: 5,
      awayTeamGoals: 1
    });
    const secondFind = await SequelizeMatches.findByPk(32)
    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body.message).to.equal('Updated results');
    expect(firstFind?.dataValues.homeTeamGoals).to.equal(15);
    expect(firstFind?.dataValues.awayTeamGoals).to.equal(8);
    expect(secondFind?.dataValues.homeTeamGoals).to.equal(5);
    expect(secondFind?.dataValues.awayTeamGoals).to.equal(1);
  })

  it('Testando a rota de criar uma partida com sucesso.', async function() {
    // Arrange
    sinon.stub(jwtUtils, 'verify').resolves({
      email: "admin@admin123.com"
    })    

    // Act     
    const httpResponse = await chai.request(app).post('/matches').set('authorization', bearerMock).send({
      homeTeamId: 7, 
      awayTeamId: 15,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    });
    const bodyMock = {
      id: httpResponse.body.id,
      ...createdMatchMock
    }
   
    // Assert
    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.deep.equal(bodyMock);  
  })

  it('Testando a rota de criar uma partida passando dois times iguais e recebendo um erro.', async function() {
    // Arrange
    sinon.stub(jwtUtils, 'verify').resolves({
      email: "admin@admin123.com"
    })    

    // Act     
    const httpResponse = await chai.request(app).post('/matches').set('authorization', bearerMock).send({
      homeTeamId: 15, 
      awayTeamId: 15,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    });
 
    // Assert
    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body.message).to.equal('It is not possible to create a match with two equal teams');  
  })

  it('Testando a rota de criar uma partida passando times inexistentes e recebendo um erro.', async function() {
    // Arrange
    sinon.stub(jwtUtils, 'verify').resolves({
      email: "admin@admin123.com"
    })    

    // Act     
    const httpResponse = await chai.request(app).post('/matches').set('authorization', bearerMock).send({
      homeTeamId: 9997, 
      awayTeamId: 9996,
      homeTeamGoals: 2,
      awayTeamGoals: 2
    });
 
    // Assert
    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body.message).to.equal('There is no team with such id!');  
  })
})