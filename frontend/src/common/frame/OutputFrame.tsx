import styled from "@emotion/styled";
import { useRef } from "react";
import type { OutputType } from "../type/Output";
import SketchFrame from "./SketchFrame";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const RowWarapper = styled.div`
    display: flex; 
    flex-direction: row;
    gap: 0px;
    width: 100%;
`;

const FrameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0px;
    border: 1px solid #ccc;
    width: 100%;
    height: fit-content;
    margin-top: 50px;
`;


const ColumnWrapper = styled.div`
    display: flex; 
    flex-direction: column;
    gap: 0px;
    width: 100%;
`;

const ContentsWrapper = styled.div`
    display: flex;
    flex : 1;
    padding: 4px;
    border: 1px solid #ccc;
    flex-direction: row;
    align-items: center;
    gap: 0px;
    box-sizing: border-box;
`;

const Inner = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: row;
    gap: 20px;
    justify-content: flex-end;
`

interface OutputFrameProps {
    output: OutputType;
    setIsInput: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OutputFrame({ output, setIsInput, setLoading}: OutputFrameProps) {
    const sketchRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        console.log('called PDF!');
        if (!sketchRef.current) return;

        const element = sketchRef.current;

        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const imgWidth = pageWidth;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        const pdfBlob = pdf.output("blob");
        console.log(pdfBlob);

        function arrayBufferToBase64(buffer: ArrayBuffer) {
            let binary = "";
            const bytes = new Uint8Array(buffer);
            const chunkSize = 0x8000; // 32kb
            for (let i = 0; i < bytes.length; i += chunkSize) {
                const chunk = bytes.subarray(i, i + chunkSize);
                binary += String.fromCharCode(...chunk);
            }
            return btoa(binary);
        }

        const buffer = await pdfBlob.arrayBuffer();
        const base64Str = arrayBufferToBase64(buffer);
        console.log(base64Str);
        await window.pywebview.api.save_file(base64Str, 'sketch.pdf');
    };
    
    console.log(output);

    const handleExportExcel = async () => {
        console.log('called excel!');
        try {
            const inputs = output;
            setLoading(true);

            // 1) Flask에서 base64 엑셀 생성 요청
            const response = await fetch('http://127.0.0.1:5000/api/excel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // base64 Excel 데이터 받기
            const { data } = await response.json();

            // 2) Python에 저장 요청
            //    save_file(base64_string, filename)
            await window.pywebview.api.save_file(data, 'result.xlsx');
            setLoading(false);

        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };


    const handleExportPDF = async () => {
        await handleExportExcel();
        console.log('done');
        setLoading(true);
        await handleDownloadPDF();
        setLoading(false);
    }

    const handletoInput = () => {
        setIsInput(true);
    }
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 20, width: '100%'}}>
            <FrameWrapper>
                <RowWarapper style={{border: '1px solid #ccc'}}>
                    <div style={{fontSize: 70, fontWeight: 'bold', border: 'none'}}>MY LOGO</div>
                    <ContentsWrapper style={{fontWeight: 'bold', fontSize: 24, justifyContent: 'center', border: 'none'}}>
                        <ColumnWrapper style={{alignItems: 'space-between'}}>
                            HEAT EXCHANGER SPECIFICATION SHEET
                            <ContentsWrapper style={{border: 'none', justifyContent: 'flex-end', fontSize: 20, fontWeight: 'normal'}}>
                                Job No.
                                <div style={{width: 100, textAlign: 'center'}}>{output.jobNo}</div>
                            </ContentsWrapper>
                        </ColumnWrapper>
                    </ContentsWrapper>
                </RowWarapper>
                <RowWarapper style={{border: '1px solid #ccc'}}>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Customer
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>{output.customer}</Inner>
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Reference No.
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>{output.referenceNo}</Inner>
                    </ContentsWrapper>
                </RowWarapper>
                <RowWarapper style={{border: '1px solid #ccc'}}>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Address
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>{output.address}</Inner>
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Proposal No.
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>{output.proposalNo}</Inner>
                    </ContentsWrapper>
                </RowWarapper>
                <RowWarapper style={{border: '1px solid #ccc'}}>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Plant Location
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>{output.plantLocation}</Inner>
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <ContentsWrapper style={{border: 'none', padding: 0}}>
                            <div style={{width: 150, textAlign: 'left'}}>
                                Date
                            </div>
                            <Inner style={{justifyContent: 'flex-start'}}>{output.date}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{border: 'none', padding: 0}}>
                            <div style={{width: 150, textAlign: 'left'}}>
                                Rev
                            </div>
                            <Inner style={{justifyContent: 'flex-start'}}>{output.rev}</Inner>
                        </ContentsWrapper>
                    </ContentsWrapper>
                </RowWarapper>
                <RowWarapper style={{border: '1px solid #ccc'}}>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Service of Unit
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>{output.serviceOfUnit}</Inner>
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Item No.
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>{output.itemNo}</Inner>
                    </ContentsWrapper>
                </RowWarapper>
                <RowWarapper style={{border: '1px solid #ccc'}}>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Size
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>{`${output.sizeHorizontal} x ${output.sizeVertical} mm`}</Inner>
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Type
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>
                            <div style={{width: 100, textAlign: 'left'}}>
                                {`${output.type}`}
                            </div>
                            {`${output.orientation}`}
                        </Inner>
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Connected In
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>
                            {`${output.connectParallel} Parallel ${output.connectSeries} Series`}
                        </Inner>
                    </ContentsWrapper>
                </RowWarapper>
                <RowWarapper style={{border: '1px solid #ccc'}}>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Surf/Unit (Gross/Eff)
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>{`${output.surfUnitGross} / ${output.surfUnitEff} m2`}</Inner>
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Shell/Unit
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>
                            {output.shellUnit}
                        </Inner>
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 200, textAlign: 'left'}}>
                            Surf/Shell (Gross/Eff)
                        </div>
                        <Inner style={{justifyContent: 'flex-start'}}>{`${output.surfShellGross} / ${output.surfShellEff} m2`}</Inner>
                    </ContentsWrapper>
                </RowWarapper>

                <RowWarapper>
                    <ContentsWrapper style={{fontWeight: 'bold', fontSize: 24, justifyContent: 'center'}}>PERFORMANCE OF ONE UNIT</ContentsWrapper>
                </RowWarapper>
                <RowWarapper>
                    <ContentsWrapper>Fluid Allocation</ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center'}}>Shell Side</ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center'}}>Tube Side</ContentsWrapper>
                </RowWarapper>

                <RowWarapper>
                    <ContentsWrapper>Fluid Name</ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center'}}><Inner>{output.fluidNameShell}</Inner></ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center'}}><Inner>{output.fluidNameTube}</Inner></ContentsWrapper>
                </RowWarapper>

                <RowWarapper>
                    <ContentsWrapper>Fluid Qunatity, Total<div style={{width: 60}} />kg/hr</ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center'}}> <Inner>{output.fluidQuantityTotalShell}</Inner></ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center'}}><Inner>{output.fluidQuantityTotalTube}</Inner></ContentsWrapper>
                </RowWarapper>
                {/* Vapor */}
                <RowWarapper>
                    <ContentsWrapper><div style={{width: 30}} />Vapor (In/Out)</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityVaporInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityVaporOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityVaporInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityVaporOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Liquid */}
                <RowWarapper>
                    <ContentsWrapper><div style={{width: 30}} />Liquid</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityLiquidInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityLiquidOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityLiquidInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityLiquidOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Steam */}
                <RowWarapper>
                    <ContentsWrapper><div style={{width: 30}} />Steam</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantitySteamInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantitySteamOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantitySteamInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantitySteamOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Water */}
                <RowWarapper>
                    <ContentsWrapper><div style={{width: 30}} />Water</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper>
                            <ContentsWrapper style={{justifyContent: 'center', 'border': 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityWaterInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', 'border': 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityWaterOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper>
                            <ContentsWrapper style={{justifyContent: 'center', 'border': 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityWaterInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', 'border': 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityWaterOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Noncondensables */}
                <RowWarapper>
                    <ContentsWrapper><div style={{width: 30}} />Noncondensables</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityNoncondensablesInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityNoncondensablesOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityNoncondensablesInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.fluidQuantityNoncondensablesOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Temperature */}
                <RowWarapper>
                    <ContentsWrapper>Temperature (In/Out)<div style={{width: 60}} />°C</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.temperatureInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.temperatureOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.temperatureInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.temperatureOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>
                {/* Specific Gravity */}
                <RowWarapper>
                    <ContentsWrapper>Specific Gravity</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.specificGravityInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.specificGravityOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.specificGravityInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.specificGravityOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>
                {/* Specific Gravity */}
                <RowWarapper>
                    <ContentsWrapper>Viscosity<div style={{width: 150}} />cP</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.viscosityInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.viscosityOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.viscosityInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.viscosityOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Molecular Weight */}
                <RowWarapper>
                    <ContentsWrapper>Molecular Weight</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.molecularWeightInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.molecularWeightOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.molecularWeightInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.molecularWeightOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Molecular Weight, Noncondensables */}
                <RowWarapper>
                    <ContentsWrapper>Molecular Weight, Noncondensables</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.molecularWeightNoncondensableInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.molecularWeightNoncondensableOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.molecularWeightNoncondensableInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.molecularWeightNoncondensableOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Sepcific Heat */}
                <RowWarapper>
                    <ContentsWrapper>Sepcific Heat<div style={{width: 120}}/>J/kg-C</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.specificHeatInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.specificHeatOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.specificHeatInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.specificHeatOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>
                {/* Sepcific Heat */}
                <RowWarapper>
                    <ContentsWrapper>Thermal Conductivity<div style={{width: 60}}/>W/m-C</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.thermalConductivityInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.thermalConductivityOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.thermalConductivityInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.thermalConductivityOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>
                {/* Latent Heat */}
                <RowWarapper>
                    <ContentsWrapper>Latent Heat<div style={{width: 132}}/>kJ/kg</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.latentHeatInShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.latentHeatOutShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.latentHeatInTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.latentHeatOutTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>
                {/* Inlet pressure */}
                <RowWarapper>
                    <ContentsWrapper>Inlet pressure<div style={{width: 120}} />barG</ContentsWrapper>
                    <ContentsWrapper>
                        <Inner>
                            {output.inletPressureShell}
                        </Inner>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <Inner>
                            {output.inletPressureTube}
                        </Inner>
                    </ContentsWrapper>
                </RowWarapper>
                {/* Velocity */}
                <RowWarapper>
                    <ContentsWrapper>Velocity<div style={{width: 160}} />m/s</ContentsWrapper>
                    <ContentsWrapper>
                        <Inner>
                            {output.velocityShell}
                        </Inner>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <Inner>
                            {output.velocityTybe}
                        </Inner>
                    </ContentsWrapper>
                </RowWarapper>
                {/* Pressure Drop, Allow/Calc */}
                <RowWarapper>
                    <ContentsWrapper>Pressure Drop, Allow/Calc<div style={{width: 35}}/>kPa</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.pressureDropAllowShell}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.pressureDroCalcShell}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.pressureDropAllowTube}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <Inner>{output.pressureDroCalcTube}</Inner>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>
                {/* Fouling Resistance */}
                <RowWarapper>
                    <ContentsWrapper>Fouling Resistance (min)<div style={{width: 42}} />m2-K/W</ContentsWrapper>
                    <ContentsWrapper>
                        <Inner>
                            {output.foulingResistanceShell}
                        </Inner>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <Inner>
                            {output.foulingResistanceTube}
                        </Inner>
                    </ContentsWrapper>
                </RowWarapper>

                <RowWarapper style={{border: '1px solid #ccc'}}>
                    <RowWarapper style={{gap: 10}}>
                        <ContentsWrapper style={{border: 'none'}}>
                            <div style={{width: 400, textAlign: 'left'}}>
                            Heat Exchanged
                            </div>
                            {`${output.heatExchanged} KW`}
                        </ContentsWrapper>
                    </RowWarapper>
                    <RowWarapper>
                        <ContentsWrapper style={{border: 'none'}}>
                            <div style={{width: 400, textAlign: 'left'}}>
                            MTD (Corrected)
                            </div>
                            {`${output.MTD} C`}
                        </ContentsWrapper>
                    </RowWarapper>
                </RowWarapper>

                <RowWarapper style={{border: '1px solid #ccc'}}>
                    <RowWarapper style={{gap: 10}}>
                        <ContentsWrapper style={{border: 'none', justifyContent: 'space-between', paddingRight: 20}}>
                            <div style={{textAlign: 'left'}}>
                            Transfer Rate, Service
                            </div>
                            {`${output.transferRateService} W/m2-K`}
                        </ContentsWrapper>
                    </RowWarapper>
                    <RowWarapper>
                        <ContentsWrapper style={{border: 'none', justifyContent: 'space-between', paddingRight: 20}}>
                            <div style={{textAlign: 'left'}}>
                            Clean
                            </div>
                            {`${output.transferRateClean} W/m2-K`}
                        </ContentsWrapper>
                    </RowWarapper>
                    <RowWarapper>
                        <ContentsWrapper style={{border: 'none', justifyContent: 'space-between', paddingRight: 20}}>
                            <div style={{textAlign: 'left'}}>
                            Actual
                            </div>
                            {`${output.transferRateActual} W/m2-K`}
                        </ContentsWrapper>
                    </RowWarapper>
                </RowWarapper>
                <RowWarapper>
                <div style={{width: '60%'}}>
                    <RowWarapper>
                        <ContentsWrapper style={{fontWeight: 'bold', fontSize: 24, justifyContent: 'center'}}>CONSTRUCTION OF ONE SHELL</ContentsWrapper>
                    </RowWarapper>
                    <RowWarapper>
                        <ContentsWrapper />
                        <ContentsWrapper style={{justifyContent: 'center'}}>Shell Side</ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center'}}>Tube Side</ContentsWrapper>
                    </RowWarapper>

                    <RowWarapper>
                        <ContentsWrapper>Design/Test pressure<div style={{width: 60}} />barG</ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', gap: 10}}>
                            <Inner>{output.designPressureShell}</Inner>
                            /
                            <Inner>{output.testPressureShell}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', gap: 10}}>
                            <Inner>{output.designPressureTube}</Inner>
                            /
                            <Inner>{output.testPressureTube}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                    <RowWarapper>
                        <ContentsWrapper>Design Temperature<div style={{width: 60}} />°C</ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center'}}>
                            <Inner>{output.designTemperatureShell}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center'}}>
                            <Inner>{output.designTemperatureTube}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                    <RowWarapper>
                        <ContentsWrapper>Number passes per shell</ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center'}}>
                            <Inner>{output.numberPassesShell}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center'}}>
                            <Inner>{output.numberPassesTube}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                    <RowWarapper>
                        <ContentsWrapper>Corrosion allowance<div style={{width: 60}} />mm</ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center'}}>
                            <Inner>{output.corrosionAllowanceShell}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center'}}>
                            <Inner>{output.corrosionAllowanceTube}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>

                    <RowWarapper>
                        <RowWarapper>
                            <RowWarapper>
                                <ContentsWrapper>
                                    Connection Size & Rating
                                </ContentsWrapper>
                            </RowWarapper>
                            <ColumnWrapper>
                                <ContentsWrapper>
                                    In<div style={{width: 100}}/>mm
                                </ContentsWrapper>
                                <ContentsWrapper>
                                    Out<div style={{width: 85}}/>mm
                                </ContentsWrapper>
                                <ContentsWrapper>
                                    Inermediate<div style={{width: 25}}/>mm
                                </ContentsWrapper>
                            </ColumnWrapper>
                        </RowWarapper>
                        <RowWarapper>
                            <ColumnWrapper>
                                <ContentsWrapper style={{gap: 10}}>
                                    <Inner>{output.connectionSizeShellIn1}</Inner>
                                    @
                                    <Inner>{output.connectionSizeShellIn2}</Inner>
                                </ContentsWrapper>
                                <ContentsWrapper style={{gap: 10}}>
                                    <Inner>{output.connectionSizeShellOut1}</Inner>
                                    @
                                    <Inner>{output.connectionSizeShellOut2}</Inner>
                                </ContentsWrapper>
                                <ContentsWrapper style={{gap: 10}}>
                                    <Inner>{output.connectionSizeShellIntermediate1}</Inner>
                                    @
                                    <Inner>{output.connectionSizeShellIntermediate2}</Inner>
                                </ContentsWrapper>
                            </ColumnWrapper>
                        </RowWarapper>
                        <RowWarapper>
                            <ColumnWrapper>
                                <ContentsWrapper style={{gap: 10}}>
                                    <Inner>{output.connectionSizeTubeIn1}</Inner>
                                    @
                                    <Inner>{output.connectionSizeTubeIn2}</Inner>
                                </ContentsWrapper>
                                <ContentsWrapper style={{gap: 10}}>
                                    <Inner>{output.connectionSizeTubeOut1}</Inner>
                                    @
                                    <Inner>{output.connectionSizeTubeOut2}</Inner>
                                </ContentsWrapper>
                                <ContentsWrapper style={{gap: 10}}>
                                    <Inner>{output.connectionSizeTubeIntermediate1}</Inner>
                                    @
                                    <Inner>{output.connectionSizeTubeIntermediate2}</Inner>
                                </ContentsWrapper>
                            </ColumnWrapper>
                        </RowWarapper>
                    </RowWarapper>
                </div>
                <div style={{width: '40%'}}>
                    <RowWarapper>
                        <ColumnWrapper>
                        <ContentsWrapper style={{fontWeight: 'bold', fontSize: 24, justifyContent: 'center'}}>Sketch (Bundle/Nozzle Orientation)</ContentsWrapper>
                        <div style={{display: 'flex', flex: 1, paddingTop: 50}}>
                            <img src={'FigSketch.svg'} alt="Plot"  style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>      
                        </div>                  
                        </ColumnWrapper>
                    </RowWarapper>
                </div>
                </RowWarapper>
                <RowWarapper style={{border: '1px solid #ccc'}}>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 120, flexShrink: 0, textAlign: 'left'}}>
                            Tube No.
                        </div>
                        {output.tubeNo}
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 120, flexShrink: 0, textAlign: 'left'}}>
                            OD
                        </div>
                        {`${output.OD} mm`}
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 120, flexShrink: 0, textAlign: 'left'}}>
                            Thk (Avg)
                        </div>
                        {`${output.Thk} mm`}
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 120, flexShrink: 0, textAlign: 'left'}}>
                            Length
                        </div>
                        {`${output.length} m`}
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 120, flexShrink: 0, textAlign: 'left'}}>
                            Pitch
                        </div>
                        {`${output.pitch} mm`}
                    </ContentsWrapper>
                </RowWarapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 80, flexShrink: 0}}>
                                Tube Type
                            </div>
                            <Inner>{output.tubeType}</Inner>
                        </ContentsWrapper>
                        
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            Material
                            <Inner>{output.tubeMaterial}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            Tube pattern
                            <Inner>{output.tubePattern}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 80, flexShrink: 0}}>
                                Shell
                            </div>
                            <Inner>{output.shellMaterial}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none', borderRight: '2px solid #ccc', padding: 0}}>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                ID
                                <Inner>{output.shellID}</Inner>
                                mm
                            </ContentsWrapper>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                OD
                                <Inner>{output.shellOD}</Inner>
                                mm
                            </ContentsWrapper>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            Shell Cover
                            <Inner>{output.shellCover}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 145, flexShrink: 0}}>
                                Channel or Bonnet
                            </div>
                            <Inner>{output.channelOrBonnet}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            Channel Cover
                            <Inner>{output.channelCover}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 155, flexShrink: 0}}>
                                Tubesheet-Stationary
                            </div>
                            <Inner>{output.tubeSheetStationary}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            Tubesheet-Floating
                            <Inner>{output.tubeSheetFloating}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 150, flexShrink: 0}}>
                                Floating Head Cover
                            </div>
                            <Inner>{output.floatingHeadCover}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            Impigement Plate
                            <Inner>{output.impingementPlate}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper>
                        <ContentsWrapper style={{gap: 10, border: 'none', padding: 0}}>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 100, flexShrink: 0}}>
                                    Baffles-Cross
                                </div>
                                <Inner>{output.bafflesCross}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 50, flexShrink: 0}}>
                                    Type
                                </div>
                                <Inner>{output.bafflesCrossType}</Inner>
                            </ContentsWrapper>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none', padding: 0}}>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 100, flexShrink: 0}}>
                                    %Cut (Diam)
                                </div>
                                <Inner>{output.cutDiam}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 100, flexShrink: 0}}>
                                    Spacing (c/c)
                                </div>
                                <Inner>{output.spacing}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 50, flexShrink: 0}}>
                                    Inlet
                                </div>
                                <Inner>{output.bafflesCrossInlet}</Inner>
                                mm
                            </ContentsWrapper>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 100, flexShrink: 0}}>
                                Baffles-Long
                            </div>
                            <Inner>{output.bafflesLong}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 100, flexShrink: 0}}>
                                Seal Type
                            </div>
                            <Inner>{output.sealType}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 115, flexShrink: 0}}>
                                Supports-Tube
                            </div>
                            <Inner>{output.supportsTube}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none', padding: 0}}>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 70, flexShrink: 0}}>
                                    U-Bend
                                </div>
                                <Inner>{output.UBend}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 50, flexShrink: 0}}>
                                    Type
                                </div>
                                <Inner>{output.UBendType}</Inner>
                            </ContentsWrapper>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper style={{alignItems: 'center'}}>
                        <div style={{width: 250, textAlign: 'left', paddingLeft: 10}}>
                            Distance, support to tubesheet
                        </div>
                        <ContentsWrapper style={{gap: 10, border: 'none', padding: 0, paddingRight: 5}}>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 70, flexShrink: 0}}>
                                    Inlet
                                </div>
                                <Inner>{output.supportToTubesheetInlet}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 50, flexShrink: 0}}>
                                    Outlet
                                </div>
                                <Inner>{output.supportToTubesheetOutlet}</Inner>
                            </ContentsWrapper>
                            mm
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper style={{alignItems: 'center'}}>
                        <div style={{width: 250, textAlign: 'left', paddingLeft: 10}}>
                            Number of rows supported
                        </div>
                        <ContentsWrapper style={{gap: 10, border: 'none', padding: 0}}>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 70, flexShrink: 0}}>
                                    Inlet
                                </div>
                                <Inner>{output.rowsSupportedInlet}</Inner>
                            </ContentsWrapper>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 50, flexShrink: 0}}>
                                    Outlet
                                </div>
                                <Inner>{output.rowsSupportedOutlet}</Inner>
                            </ContentsWrapper>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper style={{alignItems: 'center'}}>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 200, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                    Bypass Seal Arrangement
                                </div>
                                <Inner>{output.bypassSealArrangement}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 160, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                    Tube-Tubesheet Joint
                                </div>
                                <Inner>{output.tubeTubesheetJoint}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper style={{alignItems: 'center'}}>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 120, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                    Expansion Joint
                                </div>
                                <Inner>{output.expansionJoint}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 50, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                    Type
                                </div>
                                <Inner>{output.expansionJointType}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper style={{alignItems: 'center'}}>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 150, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                    Rho-V2-Inlet Nozzle
                                </div>
                                <Inner>{output.RhoV2InletNozzle}</Inner>
                                kg/m-s2
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none', padding: 0, paddingRight: 5}}>
                            <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 120, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                    Bundle Entrance
                                </div>
                                <Inner>{output.bundleEnterance}</Inner>
                            </ContentsWrapper>
                                                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                                <div style={{width: 100, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                    Bundle Exit
                                </div>
                                <Inner>{output.bundleExit}</Inner>
                            </ContentsWrapper>
                            kg/m-s2
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper style={{alignItems: 'center'}}>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 150, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Gaskets-Shell Side
                            </div>
                            <Inner>{output.gasketsShellSide}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 80, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Tube Side
                            </div>
                            <Inner>{output.gasketTubeSide}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper style={{alignItems: 'center'}}>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 150, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                - Floating Head
                            </div>
                            <Inner>{output.floatingHead}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper style={{alignItems: 'center'}}>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 150, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Code Requirements
                            </div>
                            <Inner>{output.codeRequirements}</Inner>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 100, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                TEMA Class
                            </div>
                            <Inner>{output.TEMAClass}</Inner>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper style={{padding: 0}}>
                    <RowWarapper style={{alignItems: 'center'}}>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 100, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Weight/Shell
                            </div>
                            <Inner>{output.weightShell}</Inner>
                            kg
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 140, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Filled with Water
                            </div>
                            <Inner>{output.filledWithWater}</Inner>
                            kg
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 50, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Bundle
                            </div>
                            <Inner>{output.bundle}</Inner>
                            kg
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
            </FrameWrapper>
            <ButtonWrapper>
                <button onClick={handleExportPDF}>export to PDF</button>
                <button onClick={handletoInput}>back to input page</button>
            </ButtonWrapper>
            <div style={{ width: '100%', display: 'block', textAlign: 'right'}}>© 2025 MyTech. All Rights Reserved.</div>
            <div style={{ opacity: 0, pointerEvents: 'none', position: 'absolute', left: -9999 }}>
                <SketchFrame ref={sketchRef} length={parseFloat(output.length)} diam={parseFloat(output.shellID)} />
            </div>
        </div>
    );
}