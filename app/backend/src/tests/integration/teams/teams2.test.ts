import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../../../app';
import { botafogo } from '../../mocks/teams.mock';

const expect = chai.expect

chai.use(chaiHttp);

describe('Testando a rota de times', () => {
  beforeEach(function () { sinon.restore(); }); 

  it('testando se retorna uma lista de times.', async function() {
    // Arrange
    
    // Act 
    const httpResponse = await chai.request(app).get('/teams');

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.an('array');
  })  

  it('testando se retorna um time pelo id.', async function() {
    // Arrange
    
    // Act 
    const id = 3
    const httpResponse = await chai.request(app).get(`/teams/${id}`);

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(botafogo);
  })  


  it('testando se retorna um erro de time inexistente pelo id.', async function() {
    // Arrange
    
    // Act 
    const id = 99999
    const httpResponse = await chai.request(app).get(`/teams/${id}`);

    // Assert
    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.deep.equal({ message: 'Team not found' });
  })  
}) 