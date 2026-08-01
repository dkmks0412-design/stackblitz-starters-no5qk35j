'use client';

import React, { useState } from 'react';

// 데이터 포인트는 컴포넌트 외부로 분리하여 불필요한 재렌더링 방지
const dataPoints: { [key: number]: number } = {
  2: -16, 5: -3, 10: 0, 20: 1, 30: 1, 40: 2, 50: 3, 60: 9, 65: 14, 70: 23,
  72: 26, 75: 34, 77: 42, 80: 65, 81: 70, 82: 76, 83: 81, 84: 92, 85: 111,
  86: 122, 87: 142, 88: 172, 89: 216, 90: 275, 91: 300, 92: 340, 93: 360,
  94: 380, 95: 427, 96: 480, 97: 650, 98: 900, 99: 1400
};

const sortedTemps = Object.keys(dataPoints).map(Number).sort((a, b) => a - b);

const calculateTemperature = (myNumber: number): number => {
  if (myNumber < -16) return 1;
  if (myNumber >= 1400) return 99;

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
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const num = Number(input);
    if (!isNaN(num)) {
      setResult(calculateTemperature(num));
    }
  };

  return (
    // 다크 모드 대응을 위해 배경색과 텍스트 색상을 설정합니다.
    <div className="min-h-screen p-6 transition-colors duration-300 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">온도 계산기 (1°C ~ 99°C)</h1>
        
        <div className="flex gap-2">
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="숫자를 입력하세요"
            className="flex-1 p-3 border rounded-lg bg-gray-50 text-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleCalculate} 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            계산하기
          </button>
        </div>

        {result !== null && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-lg">결과값:</p>
            <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              {result}°C
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
