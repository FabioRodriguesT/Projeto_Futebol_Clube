const loginMock = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcxMDE4MDEyOX0.2NCoTj4JoSRRekbaa-cfxDWByxmA_RWOt5cwxJTPJWo"

const bearerMock = `Bearer ${tokenMock}`;

const authorizationMock = {
  Authorization: bearerMock
}

export {
  loginMock,
  tokenMock,
  authorizationMock,
  bearerMock
}
