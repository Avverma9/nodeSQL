import express from 'express';
import sequelize  from './database.mjs'; // Assuming your db file exports sequelize
import route from './routes/route.mjs'; // Assuming your route file is named route.mjs
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const app = express();
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync()
  .then(() => {
    console.log('Database and tables synced');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

app.use('/', upload.none(), route);


