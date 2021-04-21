import express from 'express';
import {contaModel} from '../models/contaModel.js'

const app = express();

app.get('/contas', async (req, res) => {
  try {

    const conta = await contaModel.find({});
    res.send(conta);
    
  } catch (error) {
    res.status(500).send(error);
  }

})

app.patch('/contas/deposito/:agencia/:conta/:valor', async(req, res) => {
  try {
    const agencia= req.params.agencia;
    const conta= req.params.conta;
    const valor= req.params.valor;

    console.log("Agencia: ",agencia);
    console.log("Conta: ",conta);
    console.log("Valor: ",valor);

    const result = await contaModel.findOneAndUpdate({agencia: agencia, conta: conta}, {$inc: {balance: valor}},  {new:true});
    if(!result){
      res.send("Conta não encontrada!!!");
    }else{
      res.send(result);
    }
    
  } catch (error) {
    res.status(500).send("Conta não encontrada"+error);
  }

});

app.patch('/contas/saque/:agencia/:conta/:valor', async(req, res) => {
  try {
    const agencia= req.params.agencia;
    const conta= req.params.conta;
    const valor= req.params.valor;

    console.log("Agencia: ",agencia);
    console.log("Conta: ",conta);
    console.log("Valor: ",valor);

    const result = await contaModel.findOneAndUpdate({agencia: agencia, conta: conta, balance:{$gte:valor}}, {$inc: {balance: -valor}},  {new:true});
    if(!result){
      res.send("Conta não encontrada ou saldo insuficiente!!!");
    }else{
      res.send(result);
    }
    
  } catch (error) {
    res.status(500).send("Conta não encontrada"+error);
  }

});


app.get('/contas/consulta/:agencia/:conta', async (req, res) => {
  try {
    const agencia= req.params.agencia;
    const conta= req.params.conta;

    console.log("Agencia: ",agencia);
    console.log("Conta: ",conta);

    const result = await contaModel.findOne({agencia: agencia, conta: conta});
    if(!result){
      res.send("Conta não encontrada!!!");
    }else{
      res.send(result);
    }
    
  } catch (error) {
    res.status(500).send(error);
  }

})

app.delete('/contas/exclusao/:agencia/:conta', async(req, res) => {
  try {
    const agencia= req.params.agencia;
    const conta= req.params.conta;
    
    console.log("Agencia: ",agencia);
    console.log("Conta: ",conta);

    const result = await contaModel.findOneAndDelete({agencia: agencia, conta: conta});
  
    
    if(!result){
      res.send("Conta não encontrada!!");
    }else{
      const contasAtivas = await contaModel.find({agencia: agencia}).count();
      res.send(contasAtivas);
    }
    
  } catch (error) {
    res.status(500).send(error);
  }

});


app.patch('/contas/transferencia/:agenciaO/:contaO/:agenciaD/:contaD/:valor', async(req, res) => {
  try {
    const agenciaO= req.params.agenciaO;
    const contaO= req.params.contaO;
    const agenciaD= req.params.agenciaD;
    const contaD= req.params.contaD;
    const valor= req.params.valor;

     const result = await contaModel.findOneAndUpdate({agencia: agenciaO, conta: contaO, balance:{$gte:valor}}, {$inc: {balance: -valor}},  {new:true});
    
    if(!result){
      res.send("Conta não encontrada ou saldo insuficiente!!!");
    }else{
      await contaModel.findOneAndUpdate({agencia: agenciaD, conta: contaD}, {$inc: {balance: valor}},  {new:true});
      res.send(result);
    }
    
  } catch (error) {
    res.status(500).send("Conta não encontrada"+error);
  }

});


export {app as contaRouter};