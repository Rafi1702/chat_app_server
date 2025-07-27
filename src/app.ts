// import WebSocket from 'ws';
import express from 'express';
import userRoute from './router/user.router'

const port: number = 3000;

const app = express()

app.use('', userRoute)

app.listen(port, () => {
    console.log(`Listening from http://localhost:${port}`)
})

