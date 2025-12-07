export interface InputType {
  hot_fluid_string: string;
  cold_fluid_string: string;

  cold_fluid_quanitity: number;  
  hot_fluid_quantity: number;

  tube_no: number;
  tube_length: number;

  hot_in_temp: number;
  cold_in_temp: number;
  cold_out_temp_input: number;
  hot_out_temp_input: number;

  averageThickness: number;
  foulingFactor: number;
  pitch: number;

  inletPressureCold: number;
  inletPressureHot: number;
  pressureDropAllowCold: number;
  pressureDropAllowHot: number;

  baffle_spacing: number;
  baffle_cut: number;
  shell_inner_diameter: number;
  no_passes_per_shell_shell_side: number;
}