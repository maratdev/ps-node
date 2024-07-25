import express from 'express';
import {router} from "./routes/index.js";

const port = 3000;
const app = express() || express.Router;

app.use(express.json());
// Добавление данных / роутинги
app.use(router);

app.use((err, req, res)=> {
    console.log(err.message)
    res.status(500).send( err.message)
})

app.listen(port, () => console.log(`Listening on port ${port}`));