const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de transporte (Usa Mailtrap para pruebas)
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/confirmar', (req, res) => {
  const { nombre, apellido, email } = req.body;

  const mailOptions = {
    from: 'tienda@ejemplo.com',
    to: email,
    subject: 'Confirmación de Compra',
    text: `Hola ${nombre} ${apellido}, ¡tu compra ha sido confirmada!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());
    res.status(200).json({ message: 'Correo enviado con éxito' });
  });
});

app.listen(3001, () => console.log('Servidor corriendo en el puerto 3001'));