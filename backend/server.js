import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//For heroku app
// const __dirname = path.resolve();
// //app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );

//Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/eStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err))

//User router for user api endpoints 
app.use('/api/users', userRouter);
//Product router for product api endpoints 
app.use('/api/products', productRouter);


//Get Server health status
app.get('/', (req, res) => {
    res.send('Server is ready');
});

//Server Error middleware
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serve is listening at http://localhost:${port}`);
});