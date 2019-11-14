const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_NAME,
        pass: process.env.MAIL_PASS,
    }
});
const mailOptions = {
    from: `JEDI <${process.env.MAIL_NAME}@${process.env.MAIL_HOST}>`,
    to: 'test@dotschool.bizml.ru',
    subject: "Please, don't reply to this letter",
    html: `Hello, Эд<br> Если ты видишь это письмо, то всё работает`
};
//Без async/await тоже работает
app.get('/', async (res, req) => {
    await transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            req.status(200).send(error);
        }
        if (response) {
            req.status(200).send('Усё в ажуре, шеф :-), проверь почту')
        }
    });
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
    console.log(`Server has been started ${PORT}`);
});