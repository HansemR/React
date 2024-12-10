import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

function Home() {
  const [dailyGoal, setDailyGoal] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setDailyGoal(value); // Permite valores vacíos y solo números
    }
  };

  const handleAccept = () => {
    if (Number(dailyGoal) >= 1) {
      navigate('/panel', { state: { dailyGoal: Number(dailyGoal) * 1000 } }); // Convierte litros a ml
    } else {
      alert('Por favor, ingresa un valor válido mayor o igual a 1.');
    }
  };

  return (
    <div className="home">
      <h1>Establecer Meta de Agua</h1>
      <input
        type="number"
        placeholder="Ingresa tu meta de agua en litros"
        value={dailyGoal}
        onChange={handleInputChange}
        min="1" // Solo permite ingresar valores mayores o iguales a 1
      />
      <button onClick={handleAccept}>Aceptar</button>
    </div>
  );
}

function Panel() {
  const location = useLocation();
  const [consumedWater, setConsumedWater] = useState<number>(0);
  const dailyGoal = Number(location.state?.dailyGoal || 2000); // Valor predeterminado en caso de error

  const addWater = (amount: number) => {
    setConsumedWater((prev) => prev + amount);
  };

  const progressPercentage = dailyGoal > 0 ? (consumedWater / dailyGoal) * 100 : 0;

  return (
    <div className="panel">
      <h1>Seguimiento de Consumo de Agua al Día</h1>
      <p>Meta diaria: <strong>{(dailyGoal / 1000).toFixed(1)} litros</strong></p>
      <p>Agua consumida: <strong>{(consumedWater / 1000).toFixed(2)} litros</strong></p>

      {/* Barra de progreso */}
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', height: '20px', margin: '10px 0' }}>
        <div
          style={{
            width: `${Math.min(progressPercentage, 100)}%`,
            backgroundColor: '#4caf50',
            height: '100%',
            borderRadius: '5px',
            transition: 'width 0.5s ease-in-out',
          }}
        />
      </div>

      <p>{progressPercentage.toFixed(1)}% de la meta alcanzada</p>

      <button onClick={() => addWater(250)}>+250 ml</button>
      <button onClick={() => addWater(500)}>+500 ml</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/panel" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
