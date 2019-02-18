const express = require('express')
const expressSession = require('express-session')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.port || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(expressSession({
    name: 'user',
    secret: 'ds4o76d132i1j#b$BM%TGKFdSdmdMFd8989NmFDBCxWffdTG*',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
    },
    rolling: true,
}))

// Rotas exportadas
const accountsRouter = require('./routes/userRoutes')
const walletRouter = require('./routes/walletRoutes')


// Redirecionando usuário logado para a dashboard
app.use('*', (req, res, next) => {
    if (req.session.username && req.originalUrl != '/wallets/profile' && req.originalUrl != '/wallets/create' && req.originalUrl != '/wallets/success-create' && req.originalUrl != '/wallets/logout') {
        return res.redirect('/wallets/profile')
    }
    next()
})

// Criando a rota de padrão de um diretório
app.use('/accounts', accountsRouter)
app.use('/wallets', walletRouter)

// Definindo o local os arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Middleware para tratar erros 400
app.use(function (req, res, next) {
    res.status(400)
    res.render('error', { erro: err._message, mensagem: err.message })
})

// Middleware para tratar outros erros
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', { erro: err._message, mensagem: err.message })
})

app.listen(port, () => {
    console.log(`Listening to port ${port}.`)
})