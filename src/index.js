import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = 4444

app.use(express.json())

function start() {
   try{
      app.listen(PORT, ()=>console.log('Server start'))
      mongoose
      .connect('mongodb+srv://admin:vanusha12@cluster0.ppmiq1w.mongodb.net/blog?retryWrites=true&w=majority')
      .then(()=>console.log('DB Start'))
      
   }
   catch(e) {
      console.log(e)
   }
}
start()