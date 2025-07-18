// import WebSocket from 'ws';
import express from 'express';


const port: number = 3000;

const app = express()


app.listen(port, () => {
    console.log(`Listening from http://localhost:${port}`)
})