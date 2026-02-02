import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- COMPONENTE VISTA 1: HOME ---
const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Nuestra Tienda</h1>
      <img 
        src="https://via.placeholder.com/300" 
        alt="Producto" 
        style={{ borderRadius: '10px', marginBottom: '20px' }} 
      />
      <br />
      <button 
        onClick={() => navigate('/checkout')}
        style={{ padding: '10px 20px', fontSize: '1.2rem', cursor: 'pointer' }}
      >
        Comprar Ahora
      </button>
    </div>
  );
};

// --- COMPONENTE VISTA 2: FORMULARIO ---
const Checkout = () => {
  const [formData, setFormData] = useState({ nombre: '', apellido: '', email: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');
    
    try {
      const response = await axios.post('http://localhost:3001/api/confirmar', formData);
      setStatus('¡Éxito! Revisa tu correo.');
    } catch (error) {
      setStatus('Error al enviar. ¿Corriste el backend?');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Finalizar Compra</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" placeholder="Nombre" required 
          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
        />
        <input 
          type="text" placeholder="Apellido" required 
          onChange={(e) => setFormData({...formData, apellido: e.target.value})}
        />
        <input 
          type="email" placeholder="Tu Email" required 
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none' }}>
          Confirmar y Enviar Mail
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL (RUTAS) ---
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;