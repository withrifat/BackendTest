import express from 'express';
import studentRoutes from './src/routes/student.routes.js';


const app = express();
app.use(express.json());


app.use('/api', studentRoutes);

app.get('/', (req, res) => {
    console.log('Hello from express');
})


export default app;