const express = require("express")
const uri = 'mongodb+srv://carlosflores:mongodbcf@cluster0.rzotvjb.mongodb.net'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { loginModel } = require('./models');
app.get('/', (req, res) => { res.send("I'm loged!!"); })

app.get('/login', async(req, res)=>{
  const login = await loginModel.find({});
  res.json( login );
});
app.get('/login/:username', async(req, res)=>{
  const person = await loginModel.find({username:req.params.username});
  res.json( person );
});
app.post('/login', async(req, res)=>{
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    const person = new loginModel({ username,email,password});

    const data = await person.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

