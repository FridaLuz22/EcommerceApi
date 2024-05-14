const express = require("express")
const personService = require("./services/personService");
const uri = 'mongodb+srv://silvaiberson3:iberson123@cluster0.j8pegzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { loanModel } = require('./models');
app.get('/', (req, res) => { res.send("I am alive Loan"); })

app.get('/loan', async(req, res)=>{
  const loan = await loanModel.find({});
  res.json( loan );
});
app.get('/loan/:code', async(req, res)=>{
  const loan = await loanModel.find({code:req.params.code});
  try {
    res.json( loan[0] );
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
app.put('/loan/:code', async(req, res)=>{
  let loan = await loanModel
      .findOneAndUpdate({code:req.params.code}, {status:'PAID'});
  //loan.status=req.body.status;
  //loan.save();
  return res.status(200).json(loan);
});
app.post('/loan', async(req, res)=>{
  try {
    const {code, persontype, identitynumber, money, expire, status} = req.body;
    let personToLoan=null;
    switch(persontype){
      case 'PERSON': personToLoan = await personService.get(identitynumber); break;
      case 'COMPANY': personToLoan = await companyService.get(identitynumber); break;
      default: throw ("PERSONTYPE ERROR");
    }
    if(! personToLoan )  throw ("PERSON NOT FOUND");
    const loan = new loanModel({code, persontype, identitynumber, debtor:personToLoan.name , money, money, expire, status });
    const data = await loan.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

