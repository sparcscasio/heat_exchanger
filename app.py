#
import math
import matplotlib
matplotlib.use("Agg")  # 화면 표시 없이 이미지 생성 (macOS 안전)
import matplotlib.pyplot as plt
import matplotlib.pyplot as plt
import numpy as np
import time
import pandas as pd
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, redirect
import threading
from flask_cors import CORS
import io, base64
import os
import webview
import CoolProp.CoolProp as CP
# from numba import jit
print("🔥🔥🔥 THIS IS THE REAL APP.PY 🔥🔥🔥")

app = Flask(__name__, static_folder="frontend/dist")
CORS(app)

IS_DEV = os.environ.get("FLASK_ENV") == "development"

NONCONDENSABLES = [
    'Air', 'Nitrogen', 'Oxygen', 'Helium', 'Argon', 'Neon',
    'Hydrogen', 'CO2', 'Methane'
]

def get_phase(fluid, T, P):
    fname = fluid.lower()

    # Noncondensables 우선 처리
    if fluid in NONCONDENSABLES:
        return "Noncondensables"

    # Q(품질) 계산
    try:
        Q = CP.PropsSI('Q', 'T', T, 'P', P, fluid)
    except:
        Q = None

    if fname in ["water", "h2o"]:
        if Q is None:
            try:
                Tsat = CP.PropsSI('T', 'P', P, 'Q', 0, fluid)
                if T < Tsat:
                    return "Water"
                else:
                    return "Vapor"
            except:
                return "Water"

        if Q <= 0:
            return "Water"
        elif 0 < Q < 1:
            return "Steam"
        else:
            return "Vapor"

    if Q is None:
        try:
            Tsat = CP.PropsSI('T', 'P', P, 'Q', 0, fluid)
            if T < Tsat:
                return "Liquid"
            else:
                return "Vapor"
        except:
            return "Vapor"

    if Q <= 0:
        return "Liquid"
    elif 0 < Q < 1:
        return "Steam"
    else:
        return "Vapor"


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    # ✔ 개발 환경: React Vite dev server로 redirect
    if IS_DEV:
        return redirect(f"http://localhost:5173/{path}")

    # ✔ 프로덕션 환경: dist 빌드된 파일을 serve
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)

    # ✔ SPA: 모든 URL은 index.html
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/test", methods=["POST"])
def test():
   data = request.get_json()

   temperature_c = data.get('temperature_c')
   pressure_bar = data.get('pressure_bar')
   composition = data.get('composition')

   T_kelvin = temperature_c + 273.15  # K
   P_pascal = pressure_bar * 1e5      

   fluid_string = f"HEOS::{composition}"

   try:
      # 밀도 (Density, kg/m^3)
      rho = CP.PropsSI('D', 'T', T_kelvin, 'P', P_pascal, fluid_string)
        
      # 정압 비열 (Specific Heat at Constant Pressure, J/kg·K)
      cp = CP.PropsSI('Cpmass', 'T', T_kelvin, 'P', P_pascal, fluid_string)
        
      # 열전도도 (Thermal Conductivity, W/m·K)
      k = CP.PropsSI('CONDUCTIVITY', 'T', T_kelvin, 'P', P_pascal, fluid_string)
      
      # 동점성계수 (Dynamic Viscosity, Pa·s)
      mu = CP.PropsSI('VISCOSITY', 'T', T_kelvin, 'P', P_pascal, fluid_string)
      
      # 플란틀 수 (Prandtl Number)
      pr = CP.PropsSI('Prandtl', 'T', T_kelvin, 'P', P_pascal, fluid_string)

      # 4. 파생 물성치 계산
      # 비체적 (Specific Volume, m^3/kg) = 1 / 밀도
      v = 1.0 / rho
      
      # 동점성계수 (Kinematic Viscosity, m^2/s or cSt) = Dynamic Viscosity / Density
      nu = mu / rho
      nu_cst = nu * 1e6  # centistokes (cSt) 변환

      return {
         "Temperature (K)": T_kelvin,
         "Pressure (Pa)": P_pascal,
         "Specific Heat (Cp) [kJ/kg·K]": cp / 1000,
         "Specific Volume (v) [m^3/kg]": v,
         "Kinematic Viscosity (ν) [cSt]": nu_cst,
         "Prandtl Number (Pr)": pr,
         "Thermal Conductivity (k) [W/m·K]": k,
         "Density (ρ) [kg/m^3]": rho
      }

   except Exception as e:
      return f"Error occurred: {e}\n(Tip: REFPROP 설치 경로 확인 또는 성분비 합이 1.0인지 확인하세요.)"
      
@app.route("/api/calc", methods=["POST"])
def calc():
    data = request.get_json()
    arr = np.array([1, 2, 3])
    squared = np.square(arr)
    df = pd.DataFrame({"x": arr, "y": squared})
    df.to_excel("out.xlsx", index=False)
    return jsonify({"result": squared.tolist()})

@app.route("/api/simulate", methods=["POST"])
def simulate():
   inputs = request.get_json()
   print("input type:", type(inputs))
   print("inputs:", inputs)
   res = {}
   
   hot_fluid_string = inputs.get('hot_fluid_string')
   cold_fluid_string = inputs.get('cold_fluid_string')
   # 입력값을 변수에 할당한다.
   cold_fluid_quantity = inputs.get('cold_fluid_quanitity') # LNG 유량 cold
   hot_fluid_quantity = inputs.get('hot_fluid_quantity') # GW 유량 ho
   tube_no = inputs.get('tube_no') # 튜브 개수
   tube_length = inputs.get('tube_length')

   # WARNING: 입력이 아니라 값으로. 어떤 값이 d인지 모르겠음
   d = .004   # 판 간격 .004 m 4mm
   M = 2
   L = 2

   hot_in_temp = inputs.get('hot_in_temp')
   cold_out_temp_input = inputs.get('cold_out_temp_input') # LNG 출구 spec.COLD
   cold_in_temp = inputs.get('cold_in_temp')
   avgerage_thickness = inputs.get('averageThickness') # 튜브 두께
   fouling_factor = inputs.get('foulingFactor')
   pitch = inputs.get('pitch') # plate pitch
   # M = inputs.get('M')
   # Hot_T = inputs.get('Hot_T')
   hot_out_temp_input = inputs.get('hot_out_temp_input')
   inlet_pressure_cold = inputs.get('inletPressureCold')
   inlet_pressure_hot = inputs.get('inletPressureHot')
   pressure_drop_allow_cold = inputs.get('pressureDropAllowCold')
   pressure_drop_allow_hot = inputs.get('pressureDropAllowHot')

   baffle_spacing = inputs.get('baffle_spacing')
   baffle_cut = inputs.get('baffle_cut')
   shell_inner_diameter = inputs.get('shell_inner_diameter')
   no_passes_per_shell_shell_side = inputs.get('no_passes_per_shell_shell_side')

   # barG => Pa로 변환
   inlet_pressure_cold = (inlet_pressure_cold + 1.01325) * 100000
   inlet_pressure_hot = (inlet_pressure_hot + 1.01325) * 100000
   
   # bar => Pa로 변횐
   pressure_drop_allow_cold = pressure_drop_allow_cold * 100000
   pressure_drop_allow_hot = pressure_drop_allow_hot * 100000

   # shell 관련 변수 mm => m로 단위 변환
   baffle_spacing = baffle_spacing / 1000
   shell_inner_diameter = shell_inner_diameter / 1000

   # 잠열 계산
   # WARNING : inlet pressure 기준으로 계산
   inlet_latent_heat_cold = CP.PropsSI("H", "P", inlet_pressure_cold, "Q", 1, cold_fluid_string) - CP.PropsSI("H", "P", inlet_pressure_cold, "Q", 0, cold_fluid_string)
   # inlet_latent_heat_hot =  CP.PropsSI("H", "P", inlet_pressure_hot, "Q", 1, hot_fluid_string) - CP.PropsSI("H", "P", inlet_pressure_hot, "Q", 0, hot_fluid_string)

   # 계산
   Req = cold_fluid_quantity * inlet_latent_heat_cold
   Q = Req
   Tu_t = avgerage_thickness * 2   #튜브 두께 

   DET = .0002  # 수렴

   cold_in_temp_kelvin = cold_in_temp + 273.15
   C_rho = CP.PropsSI('D', 'T', cold_in_temp_kelvin, 'P', inlet_pressure_cold, cold_fluid_string)
   C_VO = 1 / C_rho
   C_CP = CP.PropsSI('CPMASS', 'T', cold_in_temp_kelvin, 'P', inlet_pressure_cold, cold_fluid_string)
   C_TC = CP.PropsSI('L', 'T', cold_in_temp_kelvin, 'P', inlet_pressure_cold, cold_fluid_string)
   C_PR = CP.PropsSI('PRANDTL', 'T', cold_in_temp_kelvin, 'P', inlet_pressure_cold, cold_fluid_string)     
   C_VI = CP.PropsSI('V', 'T', cold_in_temp_kelvin, 'P', inlet_pressure_cold, cold_fluid_string)

   # Glycol Water / 5 barG / 20~80
   hot_in_temp_kelvin = hot_in_temp + 273.15
   H_rho = CP.PropsSI('D', 'T', hot_in_temp_kelvin, 'P', inlet_pressure_hot, hot_fluid_string)
   H_VO = 1 / H_rho
   H_CP = CP.PropsSI('CPMASS', 'T', hot_in_temp_kelvin, 'P', inlet_pressure_hot, hot_fluid_string)
   H_TC = CP.PropsSI('L', 'T', hot_in_temp_kelvin, 'P', inlet_pressure_hot, hot_fluid_string)
   H_PR = CP.PropsSI('PRANDTL', 'T', hot_in_temp_kelvin, 'P', inlet_pressure_hot, hot_fluid_string)      
   H_VI = CP.PropsSI('V', 'T', hot_in_temp_kelvin, 'P', inlet_pressure_hot, hot_fluid_string)

   Hd = pitch

   cold_velocity = cold_fluid_quantity * C_VO / 3600 / (tube_no * np.pi * (d - Tu_t)**2/ 4)
   cold_Re = cold_velocity * d / C_VI
   Nu = 0.023 * cold_Re**.8 * C_PR**0.4
   Cold_h = Nu * C_TC / d   

   hot_velocity = hot_fluid_quantity * H_VO / 3600 / no_passes_per_shell_shell_side / (baffle_cut * shell_inner_diameter * baffle_spacing)
   hot_Re = hot_velocity * d / 0.0000016
   Hot_Nu = 0.664 * hot_Re**.5 * H_PR**.3333
   Hot_h = Hot_Nu * H_TC / pitch 

   Total_convec = 1 / (1 / Hot_h + 1 / Cold_h + fouling_factor) # 열전달 계수

   surface_a = Q / (Total_convec*(hot_in_temp-cold_in_temp)) # 필요 열교환 면적

   hot_out_temp_local =  hot_in_temp - Q/(hot_fluid_quantity*H_CP) 

   # res['Boiling surface Area m^2'] = round(surface_a,2)
   # res['Heat Capa.(Kcal/h)'] = round(Q/1000,2)
   # res['Cold Inlet Temp'] = cold_in_temp
   # res['Cold Outlet Temp'] = cold_in_temp
   # res['GW Inlet Temp'] = hot_in_temp
   # res['GW Outlet Temp'] = round(hot_out_temp_local,2)

   total_surface = 0
   TOQ = Q
   hot_in_temp_local = hot_out_temp_local

   drop_pressure_hot = 0
   drop_pressure_cold = 0

   Hd = pitch

   # prevent unassociated error
   ToL_Spec = 0
   surface_result = 1

   for k in range (20) :   # GW 출구 Temp  예상
      hot_in_temp_local =  hot_in_temp
      cold_in_temp_local = cold_in_temp
      total_surface = 0 # 누적 표면적 합
      Total_convec = 650 # 전체 열전달 계수
      drop_pressure_hot = 0
      drop_pressure_cold = 0
      TOQ = 0
      TOC = 0
      TCP = 0

      # surface_a = 2*tube_ea* math.sin(math.radians(ii))*tube_L/2 * (math.cos(math.radians(ii))*tube_L/2- math.cos(math.radians(ii+1/2))*tube_L/2)   # 이게 무슨 코드야,,,
      # WARNING!! : 여기 수정 필요
      surface_a = tube_length * tube_no *  (avgerage_thickness / 2)
      total_surface =  total_surface + surface_a

      # drop pressure allow를 고려해서
      local_pressure_cold = max(inlet_pressure_cold - drop_pressure_cold, inlet_pressure_cold - pressure_drop_allow_cold)
      local_pressure_hot = max(inlet_pressure_hot - drop_pressure_hot, inlet_pressure_hot - pressure_drop_allow_hot)  

      # 국소 부위에서의 cold 물성치 계산
      cold_in_temp_local_kelvin = cold_in_temp_local + 273.15
      C_rho = CP.PropsSI('D', 'T', cold_in_temp_local_kelvin, 'P', local_pressure_cold, cold_fluid_string)
      C_VO = 1 / C_rho
      C_CP = CP.PropsSI('CPMASS', 'T', cold_in_temp_local_kelvin, 'P', local_pressure_cold, cold_fluid_string)
      C_TC = CP.PropsSI('L', 'T', cold_in_temp_local_kelvin, 'P', local_pressure_cold, cold_fluid_string)
      C_PR = CP.PropsSI('PRANDTL', 'T', cold_in_temp_local_kelvin, 'P', local_pressure_cold, cold_fluid_string)     
      C_VI = CP.PropsSI('V', 'T', cold_in_temp_local_kelvin, 'P', local_pressure_cold, cold_fluid_string)

      # 국소 부위에서의 hot 물성치 계산
      hot_in_temp_local_kelvin = hot_in_temp_local + 273.15
      H_rho = CP.PropsSI('D', 'T', hot_in_temp_local_kelvin, 'P', local_pressure_hot, hot_fluid_string)
      H_VO = 1 / H_rho
      H_CP = CP.PropsSI('CPMASS', 'T', hot_in_temp_local_kelvin, 'P', local_pressure_hot, hot_fluid_string)
      H_TC = CP.PropsSI('L', 'T', hot_in_temp_local_kelvin, 'P', local_pressure_hot, hot_fluid_string)
      H_PR = CP.PropsSI('PRANDTL', 'T', hot_in_temp_local_kelvin, 'P', local_pressure_hot, hot_fluid_string)      
      H_VI = CP.PropsSI('V', 'T', hot_in_temp_local_kelvin, 'P', local_pressure_hot, hot_fluid_string)

      fluid_quantity_cold_per_sec = cold_fluid_quantity / 3600
      Hd = pitch
      Area = tube_no / 2 / L * Hd * math.sin(math.radians(1)) * tube_length 

      # cold 흐름
      cold_velocity = fluid_quantity_cold_per_sec / (Area * 1/C_VO)
      cold_Re = cold_velocity * Hd / C_VI  # 레이놀즈 수

      Nu = 0.023 * math.pow(cold_Re,.8) * math.pow(C_PR,0.333)
      if cold_Re <  50000  :                                       
         Nu = 0.664 * math.pow(cold_Re,.5) * math.pow(C_PR,0.333)  
      
      Cold_h = Nu * C_TC / Hd        

      # hot 흐름
      fluid_quantity_hot_per_sec = hot_fluid_quantity  / 3600                                                      # 메탄
      Area = tube_no / 2 / M * Hd * tube_length       # GW 유로면적

      hot_velocity = fluid_quantity_hot_per_sec / (Area * 1/H_VO)  
      hot_Re = hot_velocity * Hd / H_VI 

      Hot_Nu = 0.023 * math.pow(hot_Re,.79) * math.pow(H_PR,.33)
      if  hot_Re <  50000 : 
         Hot_Nu = 0.664 * math.pow(hot_Re,.5) * math.pow(H_PR,.33)
      Hot_h = Hot_Nu * H_TC / Hd 

      Total_convec = 1 / (1 / Cold_h + 1 / Hot_h + fouling_factor + avgerage_thickness / 14.4)        # 평행 평판 

      for j in range(10) :
         print(j)
         delta_temp_local = hot_in_temp_local - cold_in_temp_local
         print(Total_convec, surface_a, delta_temp_local)
         TQ = (Total_convec) * surface_a * delta_temp_local # 국소 열전달량
         print('========', k, j, TQ, '========')

         hot_out_temp_local =  hot_in_temp_local - TQ / (hot_fluid_quantity * H_CP)   # Counter Flow
         cold_out_temp_local = cold_in_temp_local + TQ / (cold_fluid_quantity * C_CP) 
         print('========', hot_out_temp_local, cold_out_temp_local, '========')
         
         hdt = hot_in_temp_local - cold_out_temp_local           
         cdt = hot_out_temp_local - cold_in_temp_local 

         # counter flow에서 LMTD
         LMTD = (hdt-cdt)/math.log(hdt/cdt)     
         TTQ = Total_convec * surface_a * LMTD
         DT = math.pow((TTQ - TQ), 2) /1000
         print('DT', DT)

         #if DT <= DET :
         if True:
            TOQ = TOQ + TQ
            ToL_Q = TOQ
            ToL_W1 = ToL_Q  
            # warning: 여기 N은 임의로 결정함. 
            drop_pressure_cold_local = (64 / cold_Re * (tube_length + 100 * Hd) / 100) * (1 / C_VO) * (cold_velocity * L) ** 2 / (2 * Hd) # 국소 압력 강하, Cold
            drop_pressure_hot_local = (64 / hot_Re * (tube_length + 100 * Hd) / 100) * (1 / H_VO) * (hot_velocity * L) ** 2 / (2 * Hd) # 국소 압력 강하, Hot
            drop_pressure_hot = drop_pressure_hot + drop_pressure_hot_local # 누적 압력 강하, Hot
            drop_pressure_cold = drop_pressure_cold + drop_pressure_cold_local # 누적 압력 강하, Cold
            TOC = TOC + Total_convec
            TCP = TCP + C_CP   

            cold_in_temp_local = cold_out_temp_local
            hot_in_temp_local = hot_out_temp_local                  

            if math.pow ((hot_out_temp_input - hot_out_temp_local),2) < .0005 :
               surface_result = total_surface 

            if math.pow((cold_out_temp_input - cold_in_temp),2) < .0001 :
               surface_result = total_surface
               ToL_W1 = ToL_Q / 859.8
               ToL_Spec = ToL_W1  
               break  
      if (hot_out_temp_local > hot_in_temp ) : break

   surface_pe = round(surface_result*100/total_surface, 1)
   cold_outlet_temp = cold_out_temp_local
   hot_outlet_temp = hot_out_temp_local
   cold_outlet_pressure = inlet_pressure_cold - drop_pressure_cold
   hot_outlet_pressure = inlet_pressure_hot - drop_pressure_hot

   ## ==== 여기는 결과 출력 ==== ##
   ToTal_K = TOC  # Average Heat Transfer Coef.
   ToL_Q = TOQ
   ToL_W = ToL_Q*1.163
   ToTal_K_W = ToTal_K * 1.163 

   margine = (100 - surface_pe) / surface_pe * 100
   mardumi = 1/(1 + margine / 100)
   service = ToTal_K_W * mardumi
   LMTD = ToL_W / service / (total_surface * .99)

   # 열교환기 성능 관련 결과값들
   res['Heat Exchanged'] = round(ToL_Spec, 2)
   res['MTD (Corrected)'] = round(LMTD, 1)
   res['Transfer Rate, Service'] = round(service, 2)
   res['Transfer Rate, Clean'] = round(ToTal_K_W, 2)
   res['Transfer Rate, Actual'] = round(service * 0.99, 2)

   # 물성치 계산
   res['Tube Temperature (Out)'] = round(cold_outlet_temp, 2)
   res['Shell Temperature (Out)'] = round(hot_outlet_temp, 2)

   res['Cold Out Vapor'] = ''
   res['Cold Out Liquid'] = ''
   res['Cold Out Steam'] = ''
   res['Cold Out Water'] = ''
   res['Cold Out Noncondensables'] = ''
   res['Hot Out Vapor'] = ''
   res['Hot Out Liquid'] = ''
   res['Hot Out Steam'] = ''
   res['Hot Out Water'] = ''
   res['Hot Out Noncondensables'] = ''

   cold_out_phase = get_phase(cold_fluid_string, cold_outlet_temp, cold_outlet_pressure)
   hot_out_phase = get_phase(hot_fluid_string, hot_outlet_temp, hot_outlet_pressure)

   if cold_out_phase == 'Vapor':
      res['Cold Out Vapor'] = cold_fluid_quantity
   elif cold_out_phase == 'Liquid':
      res['Cold Out Liquid'] = cold_fluid_quantity
   elif cold_out_phase == 'Steam':
      res['Cold Out Steam'] = cold_fluid_quantity
   elif cold_out_phase == 'Water':
      res['Cold Out Water'] = cold_fluid_quantity
   else:
      res['Cold Out Noncondensables'] = cold_fluid_quantity

   if hot_out_phase == 'Vapor':
    res['Hot Out Vapor'] = hot_fluid_quantity
   elif hot_out_phase == 'Liquid':
      res['Hot Out Liquid'] = hot_fluid_quantity
   elif hot_out_phase == 'Steam':
      res['Hot Out Steam'] = hot_fluid_quantity
   elif hot_out_phase == 'Water':
      res['Hot Out Water'] = hot_fluid_quantity
   else:
      res['Hot Out Noncondensables'] = hot_fluid_quantity

   # Specific gravity
   rho_water_4C = CP.PropsSI("D", "T", 273.15 + 4, "P", 101325, "Water")
   rho_cold_in = CP.PropsSI("D", "T", cold_in_temp + 273.15, "P", inlet_pressure_cold, cold_fluid_string)
   rho_cold_out = CP.PropsSI("D", "T", cold_outlet_temp + 273.15, "P", cold_outlet_pressure, cold_fluid_string)
   rho_hot_in = CP.PropsSI("D", "T", hot_in_temp + 273.15, "P", inlet_pressure_hot, hot_fluid_string)
   rho_hot_out = CP.PropsSI("D", "T", hot_outlet_temp + 273.15, "P", hot_outlet_pressure, hot_fluid_string)

   res['Tube Specific Gravity In'] = round(rho_cold_in / rho_water_4C, 1)
   res['Tube Specific Gravity Out'] = round(rho_cold_out / rho_water_4C, 1)
   res['Shell Specific Gravity In'] = round(rho_hot_in / rho_water_4C, 1)
   res['Shell Specific Gravity Out'] = round(rho_hot_out / rho_water_4C, 1)

   # Viscosity
   viscosity_cold_in = CP.PropsSI("V", "T", cold_in_temp + 273.15, "P", inlet_pressure_cold, cold_fluid_string)
   viscosity_cold_out = CP.PropsSI("V", "T", cold_outlet_temp + 273.15, "P", cold_outlet_pressure, cold_fluid_string)
   viscosity_hot_in = CP.PropsSI("V", "T", hot_in_temp + 273.15, "P", inlet_pressure_hot, hot_fluid_string)
   viscosity_hot_out = CP.PropsSI("V", "T", hot_outlet_temp + 273.15, "P", hot_outlet_pressure, hot_fluid_string)

   res['Tube Viscosity In'] = round(viscosity_cold_in, 4)
   res['Tube Viscosity Out'] = round(viscosity_cold_out, 4)
   res['Shell Viscosity In'] = round(viscosity_hot_in, 4)
   res['Shell Viscosity Out'] = round(viscosity_hot_out, 4)

   # Specific Heat
   specific_heat_cold_in = CP.PropsSI("CPMASS", "T", cold_in_temp + 273.15, "P", inlet_pressure_cold, cold_fluid_string)
   specific_heat_cold_out = CP.PropsSI("CPMASS", "T", cold_outlet_temp + 273.15, "P", cold_outlet_pressure, cold_fluid_string)
   specific_heat_hot_in = CP.PropsSI("CPMASS", "T", hot_in_temp + 273.15, "P", inlet_pressure_hot, hot_fluid_string)
   specific_heat_hot_out = CP.PropsSI("CPMASS", "T", hot_outlet_temp + 273.15, "P", hot_outlet_pressure, hot_fluid_string)

   res['Tube Specific Heat In'] = round(specific_heat_cold_in, 1)
   res['Tube Specific Heat Out'] = round(specific_heat_cold_out, 1)
   res['Shell Specific Heat In'] = round(specific_heat_hot_in, 1)
   res['Shell Specific Heat Out'] = round(specific_heat_hot_out, 1)

   # Thermal Conductivity
   thermal_conductivity_cold_in = CP.PropsSI("L", "T", cold_in_temp + 273.15, "P", inlet_pressure_cold, cold_fluid_string)
   thermal_conductivity_cold_out = CP.PropsSI("L", "T", cold_outlet_temp + 273.15, "P", cold_outlet_pressure, cold_fluid_string)
   thermal_conductivity_hot_in = CP.PropsSI("L", "T", hot_in_temp + 273.15, "P", inlet_pressure_hot, hot_fluid_string)
   thermal_conductivity_hot_out = CP.PropsSI("L", "T", hot_outlet_temp + 273.15, "P", hot_outlet_pressure, hot_fluid_string)

   res['Tube Thermal Conductivity In'] = round(thermal_conductivity_cold_in, 4)
   res['Tube Thermal Conductivity Out'] = round(thermal_conductivity_cold_out, 4)
   res['Shell Thermal Conductivity In'] = round(thermal_conductivity_hot_in, 4)
   res['Shell Thermal Conductivity Out'] = round(thermal_conductivity_hot_out, 4)

   #outlet_latent_heat_cold = CP.PropsSI("H", "P", cold_outlet_pressure, "Q", 1, cold_fluid_string) - CP.PropsSI("H", "P", cold_outlet_pressure, "Q", 0, cold_fluid_string)
   #outlet_latent_heat_hot =  CP.PropsSI("H", "P", hot_outlet_pressure, "Q", 1, hot_fluid_string) - CP.PropsSI("H", "P", hot_outlet_pressure, "Q", 0, hot_fluid_string)

   res['Tube Latent Heat In'] = round(inlet_latent_heat_cold, 4)
   #res['Tube Latent Heat Out'] = round(outlet_latent_heat_cold, 4)
   # res['Shell Latent Heat In'] = round(inlet_latent_heat_hot, 4)
   #res['Shell Latent Heat Out'] = round(outlet_latent_heat_hot, 4)

   res['Tube Pressure Drop Calc'] = round(drop_pressure_cold / 1000, 3)
   res['Shell Pressure Drop Calc'] = round(drop_pressure_hot / 1000, 3)
   res['Shell Velocity'] = round(hot_velocity, 2)
   res['Tube Velocity'] = round(cold_velocity, 2)

   print(res)
   return jsonify({"printData" : res})

@app.route("/api/plot")
def plot():
    # 예시 그래프 데이터
    x = [1, 2, 3, 4]
    y = [10, 20, 25, 30]

    # 이미지 생성
    fig, ax = plt.subplots()
    ax.plot(x, y)
    ax.set_title("Sample Plot")
    ax.set_xlabel("X-axis")
    ax.set_ylabel("Y-axis")

    # 버퍼에 PNG 저장
    buf = io.BytesIO()
    fig.savefig(buf, format="png")
    buf.seek(0)
    plt.close(fig)

    # Base64 인코딩
    img_base64 = base64.b64encode(buf.read()).decode("utf-8")
    return jsonify({"image": img_base64})

def start_flask():
    app.run(debug=True)

if __name__ == "__main__":
    app.run(debug=True)
    #t = threading.Thread(target=start_flask, daemon=True)
    #t.start()
    #webview.create_window("React + Python", "http://127.0.0.1:5000")
    #webview.start()