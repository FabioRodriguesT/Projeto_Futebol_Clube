import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';

const expect = chai.expect

chai.use(chaiHttp);

describe('Testando a rota de times', () => {
  beforeEach(function () { sinon.restore(); });

  it('testando se retorna uma lista de times', async function() {
    // Arrange
    // sem Arranjo, fica a minha dúvida.
    
    // Act 
    const httpResponse = await chai.request(app).get('/teams');

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.an('array');
  })  
}) 