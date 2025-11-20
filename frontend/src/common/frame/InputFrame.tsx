import styled from "@emotion/styled";
import { useState } from "react";
import CustomNumberInput from "../components/NumberInput";
import CustomInput from "../components/CustomInput";
import CustomDropdown from "../components/CustomDropdown";
import CustomDateInput from "../components/CustomDateInput";

const RowWarapper = styled.div`
    display: flex; 
    flex-direction: row;
    gap: 0px;
    width: 100%;
`;

const ColumnWrapper = styled.div`
    display: flex; 
    flex-direction: column;
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

export default function InputFrame() {
    const [unitIdentifier, setUnitIdentifier] = useState<string>('');
    const [caseMode, setCaseMode] = useState<string>('');
    const [serviceType, setServiceType] = useState<string>('');
    const [caseInput, setCaseInput] = useState<string>('');
    const [problem, setProblem] = useState<string>('');
    const [customer, setCustomer] = useState<string>('');
    const [jobNo, setJobNo] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [refNo, setRefNo] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [proposalNo, setProposalNo] = useState<string>('');
    const [serviceUnit, setServiceUnit] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [rev, setRev] = useState<string>('');
    const [type1, setType1] = useState<string>('');
    const [type2, setType2] = useState<string>('');
    const [type3, setType3] = useState<string>('');
    const [orientation, setOrientation] = useState<string>('');
    const [hotFluid, setHotFluid] = useState<string>('');
    const [unitAngle, setUnitAngle] = useState<string>('');
    const [connectParallel, setConnectParallel] = useState<string>('');
    const [connectSeries, setConnectSeries] = useState<string>('');

    const [fluidNameShell, setFluidNameShell] = useState<string>('');
    const [fluidNameTube, setFluidNameTube] = useState<string>('');
    const [fluidQuantityTotalShell, setFluidQuantityTotalShell] = useState<string>('');
    const [fluidQuantityTotalTube, setFluidQuantityTotalTube] = useState<string>('');
    const [vaporWeightFractionInShell, setVaporWeightFractionInShell] = useState<string>('');
    const [vaporWeightFractionOutShell, setVaporWeightFractionOutShell] = useState<string>('');
    const [vaporWeightFractionInTube, setVaporWeightFractionInTube] = useState<string>('');
    const [vaporWeightFractionOutTube, setVaporWeightFractionOutTube] = useState<string>('');
    const [inletPressureShell, setInletPressureShell] = useState<string>('');
    const [inletPressureTube, setInletPressureTube] = useState<string>('');
    const [pressureDropShell, setPressureDropShell] = useState<string>('');
    const [pressureDropTube, setPressureDropTube] = useState<string>('');
    const [exchangerDuty, setExchangerDuty] = useState<string>('');
    const [temperatureInShell, setTemperatureInShell] = useState<string>('');
    const [temperatureOutShell, setTemperatureOutShell] = useState<string>('');
    const [temperatureInTube, setTemperatureInTube] = useState<string>('');
    const [temperatureOutTube, setTemperatureOutTube] = useState<string>('');
    const [foulingResistanceShell, setFoulingResistanceShell] = useState<string>('');
    const [foulingResistanceTube, setFoulingResistanceTube] = useState<string>('');

    const [designPressureShell, setDesignPressureShell] = useState<string>('');
    const [testPressureShell, setTestPressureShell] = useState<string>('');
    const [designPressureTube, setDesignPressureTube] = useState<string>('');
    const [testPressureTube, setTestPressureTube] = useState<string>('');

    const [designTemperatureShell, setDesignTemperatureShell] = useState<string>('');
    const [designTemperatureTube, setDesignTemperatureTube] = useState<string>('');
    const [numberPassesShell, setNumberPassesShell] = useState<string>('');
    const [numberPassesTube, setNumberPassesTube] = useState<string>('');
    const [corrosionAllowanceShell, setCorrosionAllowanceShell] = useState<string>('');
    const [corrosionAllowanceTube, setCorrosionAllowanceTube] = useState<string>('');

    const [connectionSizeTubeIn1, setConnectionSizeTubeIn1] = useState<string>('');
    const [connectionSizeTubeIn2, setConnectionSizeTubeIn2] = useState<string>('');
    const [connectionSizeTubeOut1, setConnectionSizeTubeOut1] = useState<string>('');
    const [connectionSizeTubeOut2, setConnectionSizeTubeOut2] = useState<string>('');
    const [connectionSizeTubeIntermediate1, setConnectionSizeTubeIntermediate1] = useState<string>('');
    const [connectionSizeTubeIntermediate2, setConnectionSizeTubeIntermediate2] = useState<string>('');
    const [connectionSizeShellIn1, setConnectionSizeShellIn1] = useState<string>('');
    const [connectionSizeShellIn2, setConnectionSizeShellIn2] = useState<string>('');
    const [connectionSizeShellOut1, setConnectionSizeShellOut1] = useState<string>('');
    const [connectionSizeShellOut2, setConnectionSizeShellOut2] = useState<string>('');
    const [connectionSizeShellIntermediate1, setConnectionSizeShellIntermediate1] = useState<string>('');
    const [connectionSizeShellIntermediate2, setConnectionSizeShellIntermediate2] = useState<string>('');

    const [tubeNo, setTubeNo] = useState<string>('');
    const [OD, setOD] = useState<string>('');
    const [Thk, setThk] = useState<string>('');
    const [length, setLength] = useState<string>('');
    const [pitch, setPitch] = useState<string>('');


    const errorFunction = (v: string) => {
        if (v == '잘못된 입력') {
            return true;
        }
        return false;
    }

    const handleOnCalculate = () => {
        console.log('calculate');
    }
    
    return (
        <FrameWrapper>
            <RowWarapper>
                <ContentsWrapper style={{fontWeight: 'bold', fontSize: 40, justifyContent: 'space-between'}}>
                    LOGO HERE
                    <button style={{fontSize: 20}} onClick={handleOnCalculate}>calculate</button>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper style={{border: 'none'}}>
                    <div style={{width: 110, textAlign: 'left'}}>
                        Unit identifier
                    </div>
                    <CustomInput value={unitIdentifier} onChange={setUnitIdentifier} />
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <div style={{width: 150, textAlign: 'left'}}>
                        Case mode
                    </div>
                    <CustomDropdown
                        value={caseMode}
                        onChange={setCaseMode}
                        options={[
                            "Rating",
                            "Simulation",
                            "Design",
                        ]}
                        placeholder="Select Case mode"
                    />
                </ContentsWrapper>
                <ContentsWrapper>
                    <div style={{width: 150, textAlign: 'left'}}>
                        Service type
                    </div>
                    <CustomDropdown
                        value={serviceType}
                        onChange={setServiceType}
                        options={[
                            "Generic Shell & Tube",
                            "Standard Shell & Tube",
                        ]}
                        placeholder="Select service type"
                    />
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <div style={{width: 100, textAlign: 'left'}}>
                        Case
                    </div>
                        <CustomInput value={caseInput} onChange={setCaseInput} />
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <div style={{width: 100, textAlign: 'left'}}>
                        Problem
                    </div>
                        <CustomInput value={problem} onChange={setProblem} />
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <div style={{width: 100, textAlign: 'left'}}>
                        Customer
                    </div>
                    <CustomInput value={customer} onChange={setCustomer} />
                </ContentsWrapper>
                <ContentsWrapper>
                    <div style={{width: 100, textAlign: 'left'}}>
                        Job No.
                    </div>
                    <CustomInput value={jobNo} onChange={setJobNo} />
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <div style={{width: 100, textAlign: 'left'}}>
                        Address
                    </div>
                    <CustomInput value={address} onChange={setAddress} />
                </ContentsWrapper>
                <ContentsWrapper>
                    <div style={{width: 120, textAlign: 'left'}}>
                        Reference No.
                    </div>
                    <CustomInput value={refNo} onChange={setRefNo} />
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <div style={{width: 100, textAlign: 'left'}}>
                        Location
                    </div>
                    <CustomInput value={location} onChange={setLocation} />
                </ContentsWrapper>
                <ContentsWrapper>
                    <div style={{width: 120, textAlign: 'left'}}>
                        Proposal No.
                    </div>
                    <CustomInput value={proposalNo} onChange={setProposalNo} />
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper style={{border: 'none'}}>
                    <div style={{width: 140, textAlign: 'left'}}>
                        Service of Unit
                    </div>
                    <CustomInput value={serviceUnit} onChange={setServiceUnit} />
                </ContentsWrapper>
                <ContentsWrapper style={{border: 'none'}}>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 120, textAlign: 'left'}}>
                        Date
                        </div>
                        <CustomDateInput value={date} onChange={setDate}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 70, textAlign: 'left'}}>
                        Rev
                        </div>
                        <CustomInput value={rev} onChange={setRev}/>
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 140, textAlign: 'left'}}>
                            Type
                        </div>
                        <div style={{width: 100}}>
                            <CustomDropdown
                                value={type1}
                                onChange={setType1}
                                options={[
                                    "A",
                                    "B",
                                ]}
                                placeholder=""
                            />
                        </div>
                        <div style={{width: 100}}>
                            <CustomDropdown
                                value={type2}
                                onChange={setType2}
                                options={[
                                    "E",
                                    "F",
                                ]}
                                placeholder=""
                            />
                        </div>
                        <div style={{width: 100}}>
                            <CustomDropdown
                                value={type3}
                                onChange={setType3}
                                options={[
                                    "M",
                                    "L",
                                ]}
                                placeholder=""
                            />
                        </div>
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 150}}>
                            Orientation
                        </div>
                        <CustomDropdown
                            value={orientation}
                            onChange={setOrientation}
                            options={[
                                "vertical",
                                "horizontal",
                            ]}
                            placeholder=""
                        />
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <div style={{width: 120, textAlign: 'left'}}>
                        Item No.
                    </div>
                    <CustomDateInput value={date} onChange={setDate}/>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 140, textAlign: 'left'}}>
                            Hot fluid
                        </div>
                        <CustomDropdown
                            value={hotFluid}
                            onChange={setHotFluid}
                            options={[
                                "shell side",
                                "tube side",
                            ]}
                            placeholder=""
                        />
                    </ContentsWrapper>
                    <ContentsWrapper style={{border: 'none'}}>
                        <div style={{width: 140, textAlign: 'left'}}>
                            Unit angle
                        </div>
                        <CustomInput value={unitAngle} onChange={setUnitAngle} />
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper style={{border: 'none', gap: 10}}>
                    Connected In
                    <div style={{width: 200}}>
                        <CustomInput value={connectParallel} onChange={setConnectParallel} />
                    </div>
                    parallel
                    <div style={{width: 200}}>
                        <CustomInput value={connectSeries} onChange={setConnectSeries} />
                    </div>
                    series
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
                <ContentsWrapper style={{justifyContent: 'center'}}><CustomInput value={fluidNameShell} onChange={setFluidNameShell} errorfunction={errorFunction} errormessage="unable fluid name"/></ContentsWrapper>
                <ContentsWrapper style={{justifyContent: 'center'}}><CustomInput value={fluidNameTube} onChange={setFluidNameTube}/></ContentsWrapper>
            </RowWarapper>

            <RowWarapper>
                <ContentsWrapper>Fluid Qunatity, Total<div style={{width: 60}} />kg/hr</ContentsWrapper>
                <ContentsWrapper style={{justifyContent: 'center'}}><CustomNumberInput value={fluidQuantityTotalShell} onChange={setFluidQuantityTotalShell}/></ContentsWrapper>
                <ContentsWrapper style={{justifyContent: 'center'}}><CustomNumberInput value={fluidQuantityTotalTube} onChange={setFluidQuantityTotalTube}/></ContentsWrapper>
            </RowWarapper>
            {/* Temperature */}
            <RowWarapper>
                <ContentsWrapper>Temperature (In/Out)<div style={{width: 60}} />°C</ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper style={{gap: 10}}>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={temperatureInShell} onChange={setTemperatureInShell}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={temperatureOutShell} onChange={setTemperatureOutShell}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper style={{gap: 10}}>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={temperatureInTube} onChange={setTemperatureInTube}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={temperatureOutTube} onChange={setTemperatureOutTube}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
            </RowWarapper>
            {/* Vapor weight fraction */}
            <RowWarapper>
                <ContentsWrapper>Vapor weight fraction (In/Out)</ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper style={{gap: 10}}>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={vaporWeightFractionInShell} onChange={setVaporWeightFractionInShell}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={vaporWeightFractionOutShell} onChange={setVaporWeightFractionOutShell}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper style={{gap: 10}}>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={vaporWeightFractionInTube} onChange={setVaporWeightFractionInTube}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={vaporWeightFractionOutTube} onChange={setVaporWeightFractionOutTube}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
            </RowWarapper>

            <RowWarapper>
                <ContentsWrapper>Inlet pressure<div style={{width: 110}} />barG</ContentsWrapper>
                <ContentsWrapper>
                    <CustomNumberInput value={inletPressureShell} onChange={setInletPressureShell}/>
                </ContentsWrapper>
                <ContentsWrapper>
                    <CustomNumberInput value={inletPressureTube} onChange={setInletPressureTube}/>
                </ContentsWrapper>
            </RowWarapper>

            <RowWarapper>
                <ContentsWrapper>Pressure drop, allow.<div style={{width: 60}} />kPa</ContentsWrapper>
                <ContentsWrapper>
                    <CustomNumberInput value={pressureDropShell} onChange={setPressureDropShell}/>
                </ContentsWrapper>
                <ContentsWrapper>
                    <CustomNumberInput value={pressureDropTube} onChange={setPressureDropTube}/>
                </ContentsWrapper>
            </RowWarapper>

            {/* Fouling Resistance */}
            <RowWarapper>
                <ContentsWrapper>Fouling Resistance (mm)<div style={{width: 30}} />m2-KW</ContentsWrapper>
                <ContentsWrapper>
                    <CustomNumberInput value={foulingResistanceShell} onChange={setFoulingResistanceShell}/>
                </ContentsWrapper>
                <ContentsWrapper>
                    <CustomNumberInput value={foulingResistanceTube} onChange={setFoulingResistanceTube}/>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>Exchanger duty<div style={{width: 100}} />KW</ContentsWrapper>
                <ContentsWrapper style={{border: 'none'}}>
                    <CustomNumberInput value={exchangerDuty} onChange={setExchangerDuty}/>
                </ContentsWrapper>
                <ContentsWrapper style={{border: 'none'}}/>
            </RowWarapper>

            {/* GEOMETRY Header */}
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
                    <CustomNumberInput value={designPressureShell} onChange={setDesignPressureShell}/>
                    /
                    <CustomNumberInput value={testPressureShell} onChange={setTestPressureShell}/>
                </ContentsWrapper>
               <ContentsWrapper style={{justifyContent: 'center', gap: 10}}>
                    <CustomNumberInput value={designPressureTube} onChange={setDesignPressureTube}/>
                    /
                    <CustomNumberInput value={testPressureTube} onChange={setTestPressureTube}/>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>Design Temperature<div style={{width: 60}} />°C</ContentsWrapper>
                <ContentsWrapper style={{justifyContent: 'center'}}>
                    <CustomNumberInput value={designTemperatureShell} onChange={setDesignTemperatureShell}/>
                </ContentsWrapper>
                <ContentsWrapper style={{justifyContent: 'center'}}><CustomNumberInput value={designTemperatureTube} onChange={setDesignTemperatureTube}/></ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>Number passes per shell</ContentsWrapper>
                <ContentsWrapper style={{justifyContent: 'center'}}>
                    <CustomNumberInput value={numberPassesShell} onChange={setNumberPassesShell}/>
                </ContentsWrapper>
                <ContentsWrapper style={{justifyContent: 'center'}}><CustomNumberInput value={numberPassesTube} onChange={setNumberPassesTube}/></ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>Corrosion allowance<div style={{width: 60}} />mm</ContentsWrapper>
                <ContentsWrapper style={{justifyContent: 'center'}}>
                    <CustomNumberInput value={corrosionAllowanceShell} onChange={setCorrosionAllowanceShell}/>
                </ContentsWrapper>
                <ContentsWrapper style={{justifyContent: 'center'}}><CustomNumberInput value={corrosionAllowanceTube} onChange={setCorrosionAllowanceTube}/></ContentsWrapper>
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
                                <CustomNumberInput value={connectionSizeShellIn1} onChange={setConnectionSizeShellIn1}/>
                                @
                                <CustomNumberInput value={connectionSizeShellIn2} onChange={setConnectionSizeShellIn2}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10}}>
                                <CustomNumberInput value={connectionSizeShellOut1} onChange={setConnectionSizeShellOut1}/>
                                @
                                <CustomNumberInput value={connectionSizeShellOut2} onChange={setConnectionSizeShellOut2}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10}}>
                                <CustomNumberInput value={connectionSizeShellIntermediate1} onChange={setConnectionSizeShellIntermediate1}/>
                                @
                                <CustomNumberInput value={connectionSizeShellIntermediate2} onChange={setConnectionSizeShellIntermediate2}/>
                        </ContentsWrapper>
                    </ColumnWrapper>
                </RowWarapper>
                <RowWarapper>
                    <ColumnWrapper>
                        <ContentsWrapper style={{gap: 10}}>
                                <CustomNumberInput value={connectionSizeTubeIn1} onChange={setConnectionSizeTubeIn1}/>
                                @
                                <CustomNumberInput value={connectionSizeTubeIn2} onChange={setConnectionSizeTubeIn2}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10}}>
                                <CustomNumberInput value={connectionSizeTubeOut1} onChange={setConnectionSizeTubeOut1}/>
                                @
                                <CustomNumberInput value={connectionSizeTubeOut2} onChange={setConnectionSizeTubeOut2}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10}}>
                                <CustomNumberInput value={connectionSizeTubeIntermediate1} onChange={setConnectionSizeTubeIntermediate1}/>
                                @
                                <CustomNumberInput value={connectionSizeTubeIntermediate2} onChange={setConnectionSizeTubeIntermediate2}/>
                        </ContentsWrapper>
                    </ColumnWrapper>
                </RowWarapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper style={{gap: 10}}>
                    <div style={{width: 80, flexShrink: 0}}>
                        Tube No.
                    </div>
                    <CustomNumberInput value={tubeNo} onChange={setTubeNo}/>
                </ContentsWrapper>
                <ContentsWrapper style={{gap: 10}}>
                    OD
                    <CustomNumberInput value={OD} onChange={setOD}/>
                    mm
                </ContentsWrapper>
                <ContentsWrapper style={{gap: 10}}>
                    Thk(avg)
                    <CustomNumberInput value={Thk} onChange={setThk}/>
                    mm
                </ContentsWrapper>
                <ContentsWrapper style={{gap: 10}}>
                    Length
                    <CustomNumberInput value={length} onChange={setLength}/>
                    m
                </ContentsWrapper>
                <ContentsWrapper style={{gap: 10}}>
                    Pitch
                    <CustomNumberInput value={pitch} onChange={setPitch}/>
                    mm
                </ContentsWrapper>
            </RowWarapper>
            
        </FrameWrapper>
    );
}