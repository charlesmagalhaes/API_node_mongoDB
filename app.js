import express from "express";
import mongoose from "mongoose";
import {contaRouter} from './routes/contaRouter.js';

(async () => {
  try {
    await mongoose.connect(
      
      'colocar aqui a url de conexão do MongoDB',
         { 
           useNewUrlParser: true, 
           useUnifiedTopology: true 
         }
           );
           console.log("Conectado com sucesso!!!")
  } catch (error) {
    console.log('Erro ao conectar no MongoDB'+error);
  }
})();

const app = express();

app.use(express.json());
app.use(contaRouter);

app.listen(3000, () => console.log('API Iniciada'));
