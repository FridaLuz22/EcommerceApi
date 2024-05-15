const express = require("express")
const personService = require("./services/personService");
const uri = 'mongodb+srv://carlosflores:mongodbcf@cluster0.rzotvjb.mongodb.net'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { seguimientoModel } = require('./models');
app.get('/', (req, res) => { res.send("Visualiza tu seguimiento"); })

app.get('/seguimiento', async(req, res)=>{
  const seguimiento = await seguimientoModel.find({});
  res.json( seguimiento );
});
app.get('/seguimiento/:username', async(req, res)=>{
  const seguimiento = await seguimientoModel.find({username:req.params.username});
  try {
    res.json( seguimiento[0] );
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/seguimiento/:username', async(req, res)=>{
  let seguimiento = await seguimientoModel
      .findOneAndUpdate({username:req.params.username}, {status:'ENTREGADO'});
  return res.status(200).json(seguimiento);
});

app.post('/seguimiento', async(req, res)=>{
  try {
    const {idVenta}=req.body;

    let ventaok=null;
    ventaok = await personService.get(username);
    if(! ventaok )  throw ("VENTA NO REALIZADA");

    const seguimiento = new seguimientoModel({idVenta});
    const data = await seguimiento.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

