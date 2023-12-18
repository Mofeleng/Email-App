const { Resend } = require('resend');
const express= require('express');
const { Request, Response } = require('express');
const { config } = require('dotenv');
const cors = require('cors');


config();
const resend = new Resend(process.env.RESEND_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/', async (req, res) => {
  const { to, subject, html } = req.body;

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: to,
    subject: subject,
    html: `
    <h1>Hello </h1>
    <div>
      <h2>Message</h2>
      <p>${html}</p>
    </div>
    `,
  });

  if (error) {
    return res.status(400).json(error);
  }

  return res.status(200).json(data)
});

app.listen(4000, ()=>{
  console.log("Server running");
})

