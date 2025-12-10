export interface InputType {
  tube_fluid_quantity_total: number;
  shell_fluid_quantity_total: number;

  La_Heat: number;
  fouling_resistance: number;

  shell_temp_in: number;
  shell_spec_temp: number;
  shell_temp_out_expected: number;
  tube_temp_in: number;
  tube_temp_out_expected: number;
  inlet_pressure_shell: number;
  inlet_pressure_tube: number;

  tube_no: number;
  tube_OD: number;
  tube_pitch: number;
  Thk: number;
  title: string;
  no_passes_per_shell_tube: number;
  no_passes_per_shell_shell: number;
  shell_per_unit: number;
}