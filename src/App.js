import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <section className="app">
      <div className="container">
        <h1>Email App</h1>
        <p>Send an email to anyone</p>

        <form>
          <label htmlFor="name">Name</label>
          <input type="text" name='name' id='name' placeholder='enter your name...' />

          <label htmlFor="email">Email</label>
          <input type="text" name='email' id='email' placeholder='enter the recipient email...' />
          
          <label htmlFor="message">Message</label>
          <textarea name="message" id="message" placeholder='Type your message here'></textarea>

          <button>Send email</button>
          
        </form>
      </div>
    </section>
  );
}

export default App;
