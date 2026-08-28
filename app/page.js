'use client';

import React, { useState } from 'react';

// 데이터 포인트 정의
const dataPoints = {
  2: -16, 5: -3, 10: 0, 20: 1, 30: 1, 40: 2, 50: 3, 60: 9, 65: 14, 70: 23,
  72: 26, 75: 34, 77: 42, 80: 65, 81: 70, 82: 76, 83: 81, 84: 92, 85: 111,
  86: 122, 87: 142, 88: 172, 89: 216, 90: 275, 91: 300, 92: 340, 93: 360,
  94: 380, 95: 427, 96: 480, 97: 650, 98: 900, 99: 1400
};

// 정렬된 온도(키 값) 배열 생성
const sortedTemps = Object.keys(dataPoints).map(Number).sort((a, b) => a - b);

// 입력받은 숫자를 바탕으로 온도를 선형 보간 계산하는 함수
const calculateTemperature = (myNumber) => {
  // 1도 범위 처리: -16 미만인 경우 1도로 반환
  if (myNumber < -16) return 1;
  // 99도 범위 처리: 1400 이상인 경우 99도로 반환
  if (myNumber >= 1400) return 99;

  // 데이터 사이값 보간
  for (let i = 0; i < sortedTemps.length - 1; i++) {
    const t1 = sortedTemps[i];
    const t2 = sortedTemps[i + 1];
    const n1 = dataPoints[t1];
    const n2 = dataPoints[t2];

    if (myNumber >= n1 && myNumber <= n2) {
      const ratio = (myNumber - n1) / (n2 - n1);
      return Math.round(t1 + ratio * (t2 - t1));
    }
  }
  return 99;
};

export default function Page() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const num = Number(input);
    if (!isNaN(num)) {
      setResult(calculateTemperature(num));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>온도 계산기 (1°C ~ 99°C)</h1>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="나의 숫자를 입력하세요"
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <button onClick={handleCalculate} style={{ padding: '8px 16px' }}>
        계산하기
      </button>
      {result !== null && (
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '20px' }}>
          현재 온도: {result}°C
        </p>
      )}
    </div>
  );
}
