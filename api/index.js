import express from 'express';
const { Resend } =  require('resend');
const { config } = require('dotenv');

config();

const app = express();
const PORT = 8000;

app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);


app.post('/send-email', (req, res) => {

    const { to, subject, html } = req.body;

    resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html
      }).then(() => {
        res.status(200).json({ message: "Email was sent successfully."});
      }).catch((err) => {
        res.status(500).json({ message: "Something went wrong while sending the email"});
      });
});

app.listen(PORT, () => {
    console.log("PORT running");
})
