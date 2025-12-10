import styled from "@emotion/styled";
import { forwardRef } from "react";

const FrameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0px;
    border: 1px solid #ccc;
    width: 100%;
    height: fit-content;
    margin-top: 50px;
    width: 1754px;
    height: 1240px;
`;

const ContentsWrapper = styled.div`
    display: flex;
    flex : 1;
    padding: 4px;
    border: 1px solid #ccc;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0px;
    box-sizing: border-box;
    position: relative;
`;

const TitleWrapper = styled.div`
    display: flex;
    height: 100px;
    padding: 4px;
    border: 1px solid #ccc;
    flex-direction: row;
    align-items: center;
    gap: 0px;
    box-sizing: border-box;
`;

const RowWarapper = styled.div`
    display: flex; 
    flex-direction: row;
    gap: 0px;
    width: 100%;
`;

const Line = styled.div<{ width: number; left: number; top: number }>`
  position: absolute;
  width: ${(props) => props.width}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  height: 1px;
  background-color: #ccc; /* 필요시 색 지정 */
`;

const LineH = styled.div<{ height: number; left: number; top: number }>`
  position: absolute;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  width: 1px;
  background-color: #ccc; /* 필요시 색 지정 */
`;

const TextBox = styled.div<{left: number; top: number; width: number}>`
    position: absolute;
    background-color: white;
    left: ${(props) => props.left}px;
    top: ${(props) => props.top}px;
    font-size: 30px;
    width: ${(props) => props.width}px;
`

type SketchFrameProps = {
  length: number;
  diam: number;
};

const SketchFrame = forwardRef<HTMLDivElement, SketchFrameProps>(
  ({ length, diam }, ref) => (
    <FrameWrapper ref={ref}>
      <TitleWrapper>
        <RowWarapper>
          <div style={{ fontSize: 70, fontWeight: "bold" }}>MY LOGO</div>
          <ContentsWrapper style={{ fontWeight: "bold", fontSize: 20, justifyContent: "center", border: "none" }}>
            DRAWINGS
          </ContentsWrapper>
        </RowWarapper>
      </TitleWrapper>
      <ContentsWrapper>
        <img src={"FigResult.svg"} width={1500} />
        <Line width={1312} left={264} top={800} />
        <LineH height={40} left={263} top={780} />
        <LineH height={40} left={1576} top={780} />
        <LineH height={220} left={1655} top={458} />
        <Line width={40} left={1635} top={678} />
        <Line width={40} left={1635} top={455} />
        <TextBox left={815} top={775} width={200}>{`${length}m`}</TextBox>
        <TextBox left={1630} top={523} width={50}>{`${diam}\nmm`}</TextBox>
      </ContentsWrapper>
    </FrameWrapper>
  )
);

export default SketchFrame as React.ForwardRefExoticComponent<
  SketchFrameProps & React.RefAttributes<HTMLDivElement>
>;

