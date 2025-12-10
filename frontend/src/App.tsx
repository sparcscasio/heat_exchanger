import { useEffect, useState } from 'react';
import './App.css';
import InputFrame from './common/frame/InputFrame';
import OutputFrame from './common/frame/OutputFrame';
import type { OutputType } from './common/type/Output';
import { initalOutput } from './common/const/mock';
import styled from "@emotion/styled";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  /* 뒤 클릭/스크롤 방지 */
  pointer-events: all;
`;

export const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 6px solid #eee;
  border-top-color: #3f51b5;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export interface Result {
  imgData: string;
  resData: OutputType;
}

function App() {
  const [result, setResult] = useState<Result>({ imgData: '', resData: initalOutput });
  const [loading, setLoading] = useState<boolean>(false);
  const [output, setOutput] = useState<OutputType>(initalOutput);
  const [isInput, setIsInput] = useState<boolean>(true);

  useEffect(() => {
    setOutput(result?.resData ?? initalOutput);
  }, [result]);

  return (
    <>
      {isInput ? (
        <InputFrame
          setResult={setResult}
          setLoading={setLoading}
          setIsInput={setIsInput}
        />
      ) : (
        <OutputFrame
          output={output}
          setIsInput={setIsInput}
          setLoading={setLoading}
        />
      )}

      {loading && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
    </>
  );
}

export default App;
