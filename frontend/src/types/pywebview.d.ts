export {};

declare global {
  interface Window {
    pywebview: {
      saveFile(options: {
        filename: string;
        data: string;  // base64
        type: string;
      }): Promise<void>;

      api: {
        save_file(
          base64_str: string,
          default_filename: string
        ): Promise<string>;  // Python은 문자열 반환
      };
    };
  }
}
