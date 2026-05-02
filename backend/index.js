import express from 'express';
import cors from 'cors'
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import borrowRoutes from "./routes/borrow.routes.js";

const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/borrow", borrowRoutes);
app.get('/',(req,res)=>{
    res.send('modern express backend ******')
});
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes)

app.listen(3000,()=>{
      console.log('Server running at http://localhost:3000');

})