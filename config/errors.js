const emptyFields = new Error('Campos vazios. Preencha-os corretamente.')
const invalidLogin = new Error('Credenciais Incorretas.')
const needsAuth = new Error('Você precisa estar logado.')

module.exports = { emptyFields, invalidLogin, needsAuth }


