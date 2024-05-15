const express = require("express")
const personService = require("./services/personService");
const uri = 'mongodb+srv://carlosflores:mongodbcf@cluster0.rzotvjb.mongodb.net'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { ventaModel } = require('./models');
app.get('/', (req, res) => { res.send("Te vendemos!!"); })

app.get('/venta', async(req, res)=>{
  const venta = await ventaModel.find({});
  res.json( venta );
});
app.get('/venta/:username', async(req, res)=>{
  const venta = await ventaModel.find({username:req.params.username});
  try {
    res.json( venta[0] );
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/venta', async(req, res)=>{
  try {
    const {idVenta, idProducto, username, cantidad, precio, status} = req.body;

    let userVenta=null;
    userVenta = await personService.get(username);
    if(! userVenta )  throw ("USERNAME NO REGISTRADO");

    const venta = new ventaModel({ idVenta, idProducto, username, cantidad, precio, status});
    const data = await venta.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

