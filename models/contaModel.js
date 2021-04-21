import mongoose from 'mongoose'

const contaSchema = mongoose.Schema({
  agencia: {
    type: Number,
    require: true,
  },
  conta:{
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  balance:{
    type: Number,
    require: true,
    validate(balance){
      if(balance < 0)
      throw new Error('Não pode ser inserido um valor negativo');
    }
  },
});


const contaModel = mongoose.model('contas', contaSchema, 'contas');

export {contaModel};