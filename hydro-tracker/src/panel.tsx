import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Panel() {
  const location = useLocation();
  const [consumedWater, setConsumedWater] = useState<number>(0);
  const dailyGoal = Number(location.state?.dailyGoal || 2000);

  const addWater = (amount: number) => {
    setConsumedWater((prev) => prev + amount);
  };

  useEffect(() => {
    const progressPercentage = dailyGoal > 0 ? (consumedWater / dailyGoal) * 100 : 0;

    if (progressPercentage >= 100) {
      alert('¡Felicidades! Has cumplido tu meta diaria de consumo de agua.');
    }
  }, [consumedWater, dailyGoal]); // Ejecutar efecto cuando cambie el consumo de agua

  const progressPercentage = dailyGoal > 0 ? (consumedWater / dailyGoal) * 100 : 0;

  return (
    <div className="panel">
      <h1>Seguimiento de Consumo de Agua al Día</h1>
      <p>Meta diaria: <strong>{(dailyGoal / 1000).toFixed(1)} litros</strong></p>
      <p>Agua consumida: <strong>{(consumedWater / 1000).toFixed(2)} litros</strong></p>

      {/* Barra de Progreso */}
      <div className="progress-container" style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', height: '20px', margin: '10px 0' }}>
        <div
          className="progress-bar"
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

export default Panel;
