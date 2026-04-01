  'use client';

  import { useState } from 'react';

  const CAPACITANCE: Record<string, Record<number, number>> = {
    CV: {
      14: 0.19, 22: 0.23, 38: 0.28, 60: 0.33,
      100: 0.40, 150: 0.47, 200: 0.53, 250: 0.59,
      325: 0.67, 400: 0.74, 500: 0.83,
    },
    CVT: {
      14: 0.18, 22: 0.22, 38: 0.27, 60: 0.31,
      100: 0.38, 150: 0.44, 200: 0.50, 250: 0.56,
      325: 0.63, 400: 0.70, 500: 0.79,
    },
  };

  const SIZES = [14, 22, 38, 60, 100, 150, 200, 250, 325, 400, 500];
  const TEST_VOLTAGE = 10350;

  export default function Home() {
    const [cableType, setCableType] = useState('CV');
    const [freq, setFreq] = useState(50);
    const [size, setSize] = useState(60);
    const [length, setLength] = useState('');

    const cap = CAPACITANCE[cableType][size];
    const len = parseFloat(length);
    const ic = (!isNaN(len) && len > 0)
      ? 2 * Math.PI * freq * (cap * 1e-9) * TEST_VOLTAGE * len
      : null;

    const btn = (active: boolean) =>
      `px-5 py-2 rounded-lg border-2 font-medium transition-colors cursor-pointer ${
        active
          ? 'border-blue-500 bg-blue-50 text-blue-700'
          : 'border-gray-200 text-gray-500 hover:border-gray-300'
      }`;

    return (
      <main className="min-h-screen bg-gray-50 flex items-start justify-center p-8">
        <div className="w-full max-w-xl space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">高圧ケーブル 充電電流計算</h1>
            <p className="text-sm text-gray-400 mt-1">
              6.6kV系統 竣工検査耐圧試験　試験電圧：10,350 V（AC）
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">ケーブル種類</p>
              <div className="flex gap-3">
                {['CV', 'CVT'].map(t => (
                  <button key={t} onClick={() => setCableType(t)} className={btn(cableType === t)}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">周波数</p>
              <div className="flex gap-3">
                {[50, 60].map(f => (
                  <button key={f} onClick={() => setFreq(f)} className={btn(freq === f)}>
                    {f} Hz
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">導体断面積</p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition-colors cursor-pointer ${
                      size === s
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}>
                    {s} mm²
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">静電容量：{cap} μF/km</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">ケーブル長さ</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={length}
                  onChange={e => setLength(e.target.value)}
                  placeholder="例：150"
                  className="w-36 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 focus:outline-none text-lg"
                />
                <span className="text-gray-500">m</span>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl p-8 text-center transition-all ${
            ic !== null ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-400'
          }`}>
            <p className="text-sm mb-2 opacity-70">充電電流</p>
            {ic !== null ? (
              <>
                <p className="text-6xl font-bold tracking-tight">{(ic * 1000).toFixed(1)}</p>
                <p className="text-xl mt-1 opacity-80">mA</p>
                <p className="text-sm mt-3 opacity-60">{ic.toFixed(4)} A</p>
              </>
            ) : (
              <p>ケーブル長さを入力してください</p>
            )}
          </div>

          {ic !== null && (
            <div className="bg-white rounded-2xl shadow p-5 text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-gray-700 mb-2">計算内訳</p>
              <p className="font-mono">Ic = 2π × f × C × V × L</p>
              <p className="font-mono text-gray-400">
                　= 2π × {freq} × {cap}×10⁻⁶/1000 × {TEST_VOLTAGE.toLocaleString()} × {length}
              </p>
              <p className="font-mono font-semibold text-gray-800">
                　= {(ic * 1000).toFixed(1)} mA
              </p>
            </div>
          )}
        </div>
      </main>
    );
  }