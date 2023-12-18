import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import useEmailValidate from './Hooks/useEmailValidate';

function App() {
  const [ to, setTo ] = useState("");
  const [ subject, setSubject ] = useState("");
  const [ html, setHtml ] = useState("");
  const [ toError, setToError ] = useState(null);
  const [ subjectError, setSubjectError ] = useState(null);
  const [ htmlError, setHtmlError ] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!subject) {
      return setSubjectError("Please enter a subject before sending email");
    }
    if (!to) {
      return setToError("Please enter the recipient email");
    }

    if (!html) {
      return setHtmlError("Please fill out the message you wish to send")
    }

    if (!validateEmail(to)) {
      return setToError("Please enter a valid email address");
    }
    

    setSubjectError(null);
    setToError(null);
    setHtmlError(null);

    const emailData = {
      to,
      subject,
      html
    }
    try {

      const response = await fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
      } else {
        const data = await response.json();
        console.log('Data:', data);
      }
      
    } catch (error) {
      console.error('Fetch Error:', error);
    }
    
  
  }


  return (
    <section className="app">
      <div className="container">
        <h1>Email App <span className='primary'>.</span></h1>
        <p>Send an email to anyone</p>

        <form>
          <label htmlFor="name">Subject*</label>
          <span className='err'>{subjectError}</span>
          <input type="text" name='name' id='name' placeholder='enter the email subject...'
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />

          <label htmlFor="email">Email*</label>
          <span className='err'>{toError}</span>
          <input type="text" name='email' id='email' placeholder='enter the recipient email...'
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
            }}
          />
          
          <label htmlFor="message">Message*</label>
          <span className='err'>{htmlError}</span>
          <textarea name="message" id="message" placeholder='Type your message here'
            value={html}
            onChange={(e) => {
              setHtml(e.target.value);
            }}
          ></textarea>

          <button onClick={(e) => {handleSubmit(e)}}>Send email</button>
          
        </form>
      </div>
    </section>
  );
}

export default App;
