const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Rotas exportadas
const accountsRouter = require('./accounts/routes')
//Criando a rota de padrão de um diretório
app.use('/accounts', accountsRouter)


app.listen(3000, () => {
    console.log('Funfou')
})
