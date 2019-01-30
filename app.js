const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.port || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Rotas exportadas
const accountsRouter = require('./routes/userRoutes')

//Criando a rota de padrão de um diretório
app.use('/accounts', accountsRouter)

app.listen(3000, () => {
    console.log(`Listening to port ${port}.`)
})
