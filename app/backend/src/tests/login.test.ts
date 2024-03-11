import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app';
import ValidationsLogin from '../middlewares/validateLogin';
import { tokenMock } from './mocks/user.mock';
import jwtUtils from '../utils/jwt.utils';
import { Request, Response } from 'express';

const expect = chai.expect

chai.use(chaiHttp);

describe('Testando a rota de times', () => {
  beforeEach(function () { sinon.restore(); }); 

  it('Fazendo login com sucesso e recebendo um token de resposta.', async function() {
    // Arrange    
    // Act 
    const httpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    });
    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.haveOwnProperty('token');
  }) 

  it('Fazendo login, sem passar o email e recebendo um erro de resposta.', async function() {
    // Arrange    
    // Act 
    const httpResponse = await chai.request(app).post('/login').send({      
      password: "secret_admin"
    });

    // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body.message).to.equal('All fields must be filled');
  }) 

  it('Fazendo login, passando uma senha menor que 7 caracteres e recebendo um erro de resposta.', async function() {
    // Arrange    
    // Act 
    const httpResponse = await chai.request(app).post('/login').send({      
      email: "admin@admin.com",
      password: "1234"
    });
    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body.message).to.equal('Invalid email or password');
  }) 

  it('Fazendo login, passando uma senha errada e recebendo um erro de resposta.', async function() {
    // Arrange    
    // Act 
    const httpResponse = await chai.request(app).post('/login').send({      
      email: "admin@admin.com",
      password: "secret_admin213213"
    });
    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body.message).to.equal('Invalid email or password');
  }) 
  
  it('Testando se a rota role, e se retorna a role com sucesso.', async function() {
    // Arrange
    sinon.stub(jwtUtils, 'verify').resolves({
      email: "admin@admin.com"
    })

    const bearer = `Bearer ${tokenMock}`
    // Act 
    const httpResponse = await chai.request(app).get('/login/role').set('Authorization', bearer);

    // Assert   
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.haveOwnProperty('role');
  })

  it('Testando se a rota rola, não consegue achar um usuário válido.', async function() {
    // Arrange
    sinon.stub(jwtUtils, 'verify').resolves({
      email: "admin@admin123.com"
    })

    const bearer = `Bearer ${tokenMock}`
    // Act 
    const httpResponse = await chai.request(app).get('/login/role').set('Authorization', bearer);

    // Assert   
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body.message).to.equal('User not found');
  })

  it('Testando se a rota role, com um token invalido, não retorna um locals.email.', async function() {
    // Arrange
    sinon.stub(jwtUtils, 'verify').resolves('jabuticaba')

    const bearer = `Bearer ${tokenMock}`

    const req = { headers: { authorization: bearer } } as Request;
    const res = { locals: {} } as any;
    const next = sinon.stub().resolves()

    // Act 
    await ValidationsLogin.validateToken(req, res, next)

    // Assert   
    expect(res.locals).not.to.haveOwnProperty('email');
  })

  it('Testando se a rota role, retorna um erro quando não se passa um token.', async function() {
    // Arrange  
    // Act 
    const httpResponse = await chai.request(app).get('/login/role');

    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body.message).to.equal('Token not found');
  })

  it('Testando se a rota role, retorna um erro quando se passa um token inválido.', async function() {
    // Arrange  
    sinon.stub(jwtUtils, 'verify').resolves('Token must be a valid token')

    const bearer = 'Bearer invalid_token'
    // Act 
    const httpResponse = await chai.request(app).get('/login/role').set('Authorization', bearer);

    // Assert
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body.message).to.equal('Token must be a valid token');
  })
}) 