import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';

const expect = chai.expect

chai.use(chaiHttp);

describe('Testando a rota de login', () => {
  beforeEach(function () { sinon.restore(); }); 
  // leadeboard/ 

  it('Testando a rota de leaderboard com sucesso.', async function() {
    // Arrange    
    // Act 
    const httpResponse = await chai.request(app).get('/leaderboard')

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.a('array');
  }) 

  it('Testando a rota de leaderboard home com sucesso.', async function() {
    // Arrange    
    // Act 
    const httpResponse = await chai.request(app).get('/leaderboard/home')

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.a('array');
  }) 


  it('Testando a rota de leaderboard away com sucesso.', async function() {
    // Arrange    
    // Act 
    const httpResponse = await chai.request(app).get('/leaderboard/away')

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.a('array');
  }) 
  
}) 