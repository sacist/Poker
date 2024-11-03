const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./routers/index.js')


const app = express()

const port = 5000

let corsOptions = {
    origin: ['http://localhost:3000']
}
app.use(cors(corsOptions))
app.use(express.json())
app.use('/', router)


const server = async () => {
    try {
        await mongoose.connect(`mongodb+srv://krokidil345:dunked1488@nftcasinopoker.gcgy6.mongodb.net/?retryWrites=true&w=majority&appName=NFTCASINOPoker`)
    } catch (e) {
        console.log(e);

    }
}
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
server()





