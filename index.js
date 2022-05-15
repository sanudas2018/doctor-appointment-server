
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// mongodb connection
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mongodb connection uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yeikx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// ............. 
// https://www.mongodb.com/docs/drivers/node/v4.5/usage-examples/find/
async function run(){
   try{
      await client.connect();
      // console.log('Database Connection')
      const servicesCollection = client.db('doctors_portal').collection('services');

      // find all services API 
      app.get('/service', async(req, res) => {
         const query = {};
         const cursor = servicesCollection.find(query);
         const services = await cursor.toArray();
         res.send(services);
      })
   }
   finally{

   }

}
run().catch(console.dir)

// ............. 

app.get('/', (req, res) => {
  res.send('Hello From Doctor UNCLE')
})

app.listen(port, () => {
  console.log(`Doctors App listening on prot ${port}`)
})