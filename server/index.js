require('dotenv').config();//счтывание файла
const express = require('express'); 
const sequelize = require('./db')//экспорт файла db
const models = require('./models/models')//экспорт "таблиц"
const cors = require('cors');//для отправления запроса с браузера устн в начале
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleWare')
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));//Для работы с файлами, в данном случаи фото товара
app.use('/api', router); // "api/ПУТЬ из routes"

//обработка ошибок, последний MiddleWare
app.use(errorHandler);

const start = async () => {
    try{
        await sequelize.authenticate();//подключение к базе данных
        await sequelize.sync(); //сверять состояние БД со схемой данных
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch(e){
  console.log(e);
    }
}


start();
