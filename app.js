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
const walletRouter = require('./routes/walletRoutes')

//Criando a rota de padrão de um diretório
app.use('/accounts', accountsRouter)
app.use('/wallets', walletRouter)

//Definindo o local os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
    console.log(`Listening to port ${port}.`)
})
