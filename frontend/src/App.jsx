/* eslint-disable react/prop-types */
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import bglogo from './assets/bglogo.png';
import navlogo from './assets/navlogo.png';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import aboutlogo from './assets/aboutlogo.png';

// About Component
const About = () => {
  return (
    <div
      id="about"
      style={{
        backgroundColor: 'white',
        padding: '100px 50px',
        textAlign: 'center',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '30px',
        color: 'blue',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif'
      }}>
        About Us
      </h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '50px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <h2 style={{
            fontSize: '2rem',
            marginBottom: '20px',
            color: 'orange',
            fontWeight: 'bold',
            fontFamily: 'Arial, sans-serif'
          }}>
            Our Mission
          </h2>
          <p style={{
            fontSize: '1.5rem',
            lineHeight: '1.6',
            fontFamily: 'Arial, sans-serif'
          }}>
            Budget Buddy is designed to empower individuals to take control of their financial journey.
            We believe that smart financial management is the key to achieving your dreams and securing
            your future. Our platform provides intuitive tools to track expenses, set budgets,
            and make informed financial decisions.
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <img
            src={aboutlogo}
            alt="About Budget Buddy"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    alert('Thank you for your message!');
  };

  return (
    <div
      id="contact"
      style={{
        backgroundColor: 'blue',
        color: 'white',
        padding: '100px 50px',
        textAlign: 'center',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        position: 'relative'
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
        Contact Us
      </h1>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: '40px',
        borderRadius: '10px'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', textAlign: 'left' }}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid white',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontFamily: 'Arial, sans-serif'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', textAlign: 'left' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid white',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontFamily: 'Arial, sans-serif'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', textAlign: 'left' }}>
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid white',
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                minHeight: '150px',
                fontFamily: 'Arial, sans-serif'
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: 'orange',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold'
            }}
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Copyright Strip */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '0.8rem'
      }}>
        © {new Date().getFullYear()} Budget Buddy. All Rights Reserved.
      </div>
    </div>
  );
};

const BackgroundColor = ({ children }) => {
  const backgroundColorStyle = {
    backgroundColor: 'blue',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  };

  return <div style={backgroundColorStyle}>{children}</div>;
};

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') return;
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <BackgroundColor>
        <nav style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          padding: '10px',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 10,
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={navlogo} alt="Nav Logo" style={{ height: '60px', marginRight: '10px' }} />
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>Budget Buddy</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <button
              onClick={() => scrollToSection('home')}
              style={{ color: 'white', margin: '0 20px', textDecoration: 'none', fontWeight: 'bold', fontSize: '2rem', fontFamily: 'Arial, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              style={{ color: 'white', margin: '0 20px', textDecoration: 'none', fontWeight: 'bold', fontSize: '2rem', fontFamily: 'Arial, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              style={{ color: 'white', margin: '0 20px', textDecoration: 'none', fontWeight: 'bold', fontSize: '2rem', fontFamily: 'Arial, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Contact
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={handleLogin}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid white',
                padding: '5px 15px',
                marginLeft: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
              }}>
              <span style={{ marginRight: '5px', fontSize: '1.2rem' }}>👤</span> Log In
            </button>
            <button
              onClick={handleSignup}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid white',
                padding: '5px 15px',
                marginLeft: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'Arial, sans-serif'
              }}>
              <span style={{ marginRight: '5px', fontSize: '1.2rem' }}>📝</span> Sign Up
            </button>
          </div>
        </nav>
        <div id="home" style={{ display: 'flex', width: '100%', height: '80vh', alignItems: 'center', justifyContent: 'space-between', padding: '0 50px', fontFamily: 'Arial, sans-serif' }}>
          <div style={{ textAlign: 'left', color: 'white', maxWidth: '50%', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Take Control of Your Finances</h1>
            <p style={{ fontSize: '1.5rem', margin: '20px 0', fontFamily: 'Arial, sans-serif' }}>
              Track your income and expenses effortlessly. Manage your budget, set financial goals, and make smarter decisions for a more secure future.
            </p>
            <button
              onClick={handleSignup}
              style={{
                backgroundColor: 'orange',
                color: 'white',
                padding: '15px 30px',
                fontSize: '1.2rem',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold'
              }}>
              Sign Up Now
            </button>
          </div>
          <div style={{ maxWidth: '50%', textAlign: 'center' }}>
            <img src={bglogo} alt="Background Logo" style={{ width: '100%', height: 'auto' }} />
          </div>
        </div>
      </BackgroundColor>
      <About />
      <Contact />
    </>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;