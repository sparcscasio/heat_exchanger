import { useState } from 'react';
import './App.css';

interface OutPutExcel {
  Tube_ea: number;
  Tube_L: number;
  Tube_Dai: number;
  Tube_Thickness: number;
  Gw_In_Temp: number;
  Gw_out_Temp: number;
  Cold_In_Temp: number;
  Cold_Out_Temp: number;
  Cold_Out_Spec: number;
  Div_N: number;
  Fouling_Factor: number;
  La_Heat_KJ: number;
  Heat_Capa_KW: number;
  Surf_Area_m2: number;
  LMTD: number;
  Pressure_Loss: number;
  Cold_Kg_h: number;
  Gw_Kg_h: number;
  Cold_in_V_m_s: number;
  Cold_Out_V_m_s: number;
  TC1_열전도도: number;
  TC: number;
  CP1_비열: number;
  CP: number;
  Heat_Trasnfer_kcal_m2_hr: number;
  SG1: number;
  SG: number;
  Spec_Capa_KW: number;
  VI1_Kinetic_Viscosity: number;
  VI_Kinetic_Viscosity: number;
  Volum_rate1_m3_sec: number;
  Volum_rate_m3_sec: number;
  project: string;
  Date: string; // YYYY.mm.dd
  Custom: string;
  DpgT: number;
  GW_V: number;
  ToL_Spec: number;
  Plate_Pitch: number;
  dash: number; // '-' 키는 변수명으로 dash로 변경
  L: number;
  Type_ShellAndTube_PlateAndShell: string;
  LNG: string;
  GW: string;
  H_CP1: number;
  H_CP: number;
  H_TC1: number;
  H_TC: number;
  H_VO1: number;
  H_VO: number;
  Cold_VC: number;
  Cold_VCT: number;
  Hot_VC: number;
  Hot_VCT: number;
  C_cPC: number;
  H_cPC: number;
  H_cPT: number;
  TT2: number;
}


interface Inputs {
  Cold_Q: number;
  La_Heat: number;
  tube_ea: number;
  tube_L: number;
  Hot_Q: number;
  d: number;
  Hot_intemp1: number;
  Cold_Spec: number;
  Temp_in: number;
  N: number;
  Tk: number;
  Fouling_F: number;
  A: string;
  B: string;
  t_pitch: number;
  C: string;
  D: string;
  E: string;
  L: number;
  M: number;
  Hot_T: number;
  Temp_low: number;
  Hot_spec: number;
  H_1: number;
  H_2: number;
  H_3: number;
  H_4: number;
  H_5: number;
  H_6: number;
  H_7: number;
  V01: number;
  V02: number;
  V03: number;
  V04: number;
  V05: number;
  V06: number;
  V07: number;
  C_CP1: number;
  CP2: number;
  CP3: number;
  CP4: number;
  CP5: number;
  CP6: number;
  CP7: number;
  C_TC1: number;
  TC2: number;
  TC3: number;
  TC4: number;
  TC5: number;
  TC6: number;
  TC7: number;
  C_PR1: number;
  PR2: number;
  PR3: number;
  PR4: number;
  PR5: number;
  PR6: number;
  PR7: number;
  C_VI1: number;
  VI2: number;
  VI3: number;
  VI4: number;
  VI5: number;
  VI6: number;
  VI7: number;
}

interface Result {
  image: string;
  excelData?: OutPutExcel;
}

function App() {
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initialInputs: Inputs = {
    Cold_Q: 12400,
    La_Heat: 0,
    tube_ea: 200,
    tube_L: 0.35,
    Hot_Q: 3349,
    d: 0.004,
    Hot_intemp1: 23.2,
    Cold_Spec: 30,
    Temp_in: 21.2,
    N: 19,
    Tk: 0.00035,
    Fouling_F: 0.0001,
    A: 'P&S, After-Cooler (Nitrogen, 1.4bar)',
    B: 'HD HYUNDAI',
    t_pitch: 0.004,
    C: 'Brazed Plate & Shell',
    D: 'HOT GAS',
    E: 'COLD GAS',
    L: 2,
    M: 2,
    Hot_T: 162,
    Temp_low: -10.0,
    Hot_spec: 46,
    H_1: 0,
    H_2: 30,
    H_3: 60,
    H_4: 90,
    H_5: 120,
    H_6: 150,
    H_7: 180,
    V01: 1.85150,
    V02: 1.66750,
    V03: 1.51690,
    V04: 1.39130,
    V05: 1.28500,
    V06: 1.19380,
    V07: 1.11470,
    C_CP1: 0.24914,
    CP2: 0.249080,
    CP3: 0.249140,
    CP4: 0.249360,
    CP5: 0.249740,
    CP6: 0.250290,
    CP7: 0.251030,
    C_TC1: 0.024019,
    TC2: 0.025489,
    TC3: 0.028329,
    TC4: 0.030381,
    TC5: 0.032372,
    TC6: 0.034308,
    TC7: 0.036195,
    C_PR1: 0.721990,
    PR2: 0.718770,
    PR3: 0.713440,
    PR4: 0.710330,
    PR5: 0.707980,
    PR6: 0.706350,
    PR7: 0.705430,
    C_VI1: 0.089853,
    VI2: 0.10193,
    VI3: 0.127820,
    VI4: 0.14867,
    VI5: 0.17069,
    VI6: 0.19385,
    VI7: 0.218090,
  };

  const [inputs, setInputs] = useState<Inputs>(initialInputs);

  const handleChange = (key : keyof Inputs, value : string) => {
    const current = initialInputs[key];
    // 숫자인 경우 float로 변환, 문자열은 그대로
    const parsed =
      typeof current === "number" ? parseFloat(value) || 0 : value;
    setInputs((prev) => ({
      ...prev,
      [key]: parsed,
    }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Result = await response.json();
      console.log(data);
      setResult(data);
    } catch (error: any) {
      console.error('Error:', error);
      setResult({ image: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React ↔ Flask 연결 테스트</h1>
        <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {Object.entries(inputs).map(([key, value]) => (
          <div key={key} style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontWeight: "bold" }}>{key}</label>
            <input
              type={typeof initialInputs[key as keyof Inputs] === "number" ? "number" : "text"}
              step="any"
              value={value}
              onChange={(e) => handleChange(key as keyof Inputs, e.target.value)}
            />
          </div>
        ))}
      </div>
        <button onClick={handleCalculate} disabled={loading}>
          {loading ? '계산 중...' : 'Flask 계산 실행'}
        </button>

        {result && (
          <div style={{ marginTop: 20 }}>
            {result.image && (
              <img src={result.image} alt="Plot" style={{ width: '400px', height: 'auto' }} />
            )}
            <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "10px",
            }}
            >
              {Object.entries(result.excelData!).map(([key, value]) => (
                <div key={key} style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontWeight: "bold" }}>{key}</label>
                  <input
                    step="any"
                    value={value}
                    onChange={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>
          
        )}
      </header>
    </div>
  );
}

export default App;
