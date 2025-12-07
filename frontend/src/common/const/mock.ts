import type { InputType } from "../type/Input";

export const exampleInput: InputType = {
  hot_fluid_string: 'INCOMP::MEG-50%',
  cold_fluid_string: 'HEOS::Methane[0.90]&Ethane[0.05]&Propane[0.03]&Nitrogen[0.02]',

  cold_fluid_quanitity: 127777,     // kg/s (LNG)
  hot_fluid_quantity: 432920,       // kg/s (cooling water or hot glycol)

  tube_no: 1200,
  tube_length: 5.5,               // meters

  hot_in_temp: 12,               // °C
  cold_in_temp: -30,             // °C (LNG vaporizer case)
  cold_out_temp_input: 5.5,      // target outlet (°C)
  hot_out_temp_input: -1.04,         // predicted/desired outlet (°C)

  averageThickness: 0.0007,       // m (0.7 mm)
  foulingFactor: 0.0002,          // (m²·K)/W typical
  pitch: 0.012,                   // 12 mm pitch

  inletPressureCold: 1.2,        // Pa (25 bar)
  inletPressureHot: 102.00,          // Pa (5 bar)
  pressureDropAllowCold: 50,   // Pa
  pressureDropAllowHot: 50,    // Pa

  baffle_spacing: 826.98,           // m
  baffle_cut: 27.14,                 // % (typical 20~40)
  shell_inner_diameter: 1000,      // m
  no_passes_per_shell_shell_side: 1
};
