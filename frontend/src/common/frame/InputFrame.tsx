import styled from "@emotion/styled";
import { useState } from "react";
import CustomNumberInput from "../components/NumberInput";
import CustomInput from "../components/CustomInput";
import CustomDropdown from "../components/CustomDropdown";

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
    const [fluidNameShell, setFluidNameShell] = useState<string>('');
    const [fluidNameTube, setFluidNameTube] = useState<string>('');
    const [fluidQuantityTotalShell, setFluidQuantityTotalShell] = useState<string>('');
    const [fluidQuantityTotalTube, setFluidQuantityTotalTube] = useState<string>('');

    // const [fluidQuantityVaporInTube, setFluidQuantityVaporInTube] = useState<string>('');
    // const [fluidQuantityVaporOutTube, setFluidQuantityVaporOutTube] = useState<string>('');
    // const [fluidQuantityLiquidInTube, setFluidQuantityLiquidInTube] = useState<string>('');
    // const [fluidQuantityLiquidOutTube, setFluidQuantityLiquidOutTube] = useState<string>('');
    // const [fluidQuantitySteamInTube, setFluidQuantitySteamInTube] = useState<string>('');
    // const [fluidQuantitySteamOutTube, setFluidQuantitySteamOutTube] = useState<string>('');
    // const [fluidQuantityWaterInTube, setFluidQuantityWaterInTube] = useState<string>('');
    // const [fluidQuantityWaterOutTube, setFluidQuantityWaterOutTube] = useState<string>('');
    // const [fluidQuantityNoncondensablesInTube, setFluidQuantityNoncondensablesInTube] = useState<string>('');
    // const [fluidQuantityNoncondensablesOutTube, setFluidQuantityNoncondensablesOutTube] = useState<string>('');

    // const [fluidQuantityVaporInShell, setFluidQuantityVaporInShell] = useState<string>('');
    // const [fluidQuantityVaporOutShell, setFluidQuantityVaporOutShell] = useState<string>('');
    // const [fluidQuantityLiquidInShell, setFluidQuantityLiquidInShell] = useState<string>('');
    // const [fluidQuantityLiquidOutShell, setFluidQuantityLiquidOutShell] = useState<string>('');
    // const [fluidQuantitySteamInShell, setFluidQuantitySteamInShell] = useState<string>('');
    // const [fluidQuantitySteamOutShell, setFluidQuantitySteamOutShell] = useState<string>('');
    // const [fluidQuantityWaterInShell, setFluidQuantityWaterInShell] = useState<string>('');
    // const [fluidQuantityWaterOutShell, setFluidQuantityWaterOutShell] = useState<string>('');
    // const [fluidQuantityNoncondensablesInShell, setFluidQuantityNoncondensablesInShell] = useState<string>('');
    // const [fluidQuantityNoncondensablesOutShell, setFluidQuantityNoncondensablesOutShell] = useState<string>('');

    const [temperatureInShell, setTemperatureInShell] = useState<string>('');
    const [temperatureOutShell, setTemperatureOutShell] = useState<string>('');
    const [temperatureInTube, setTemperatureInTube] = useState<string>('');
    const [temperatureOutTube, setTemperatureOutTube] = useState<string>('');

    const [foulingResistanceShell, setFoulingResistanceShell] = useState<string>('');
    const [foulingResistanceTube, setFoulingResistanceTube] = useState<string>('');

    const [baffleType, setBaffleType] = useState<string>('');
    const [temaType, setTEMAType] = useState<string>('');

    const [shellID, setShellID] = useState<string>('');
    const [baffleCut, setBaffleCut] = useState<string>('');

    const [series, setSeries] = useState<string>('');
    const [baffleOrientation, setBaffleOrientation] = useState<string>('');
    const [parallel, setParallel] = useState<string>('');
    const [centralSpacing, setCentralSpacing] = useState<string>('');
    const [orientation, setOrientation] = useState<string>('');
    const [crosspasses, setCrosspasses] = useState<string>('');

    const [tubeType, setTubeType] = useState<string>('');
    const [tubeOD, setTubeOD] = useState<string>('');
    const [length, setLength] = useState<string>('');
    const [pitchRatio, setPitchRatio] = useState<string>('');
    const [layout, setLayout] = useState<string>('');
    const [tubeCount, setTubeCount] = useState<string>('');
    const [tubePass, setTubePass] = useState<string>('');

    const [shellInlet, setShellInlet] = useState<string>('');
    const [shellOutlet, setShellOutlet] = useState<string>('');
    const [inletHight, setInletHight] = useState<string>('');
    const [outletHight, setOutletHight] = useState<string>('');
    const [tubeInlet, setTubeInlet] = useState<string>('');
    const [tubeOutlet, setTubeOutlet] = useState<string>('');

    const errorFunction = (v: string) => {
        if (v == '잘못된 입력') {
            return true;
        }
        return false;
    }
    
    return (
        <FrameWrapper>
            <RowWarapper>
                <ContentsWrapper style={{fontWeight: 'bold', fontSize: 20, justifyContent: 'center'}}>HEAT EXCHANGER SPECIFICATION SHEET</ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper style={{fontWeight: 'bold', fontSize: 16, justifyContent: 'center'}}>PERFORMANCE OF ONE UNIT</ContentsWrapper>
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
            {/* Vapor */}
            {/* <RowWarapper>
                <ContentsWrapper><div style={{width: 30}} />Vapor (In/Out)</ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityVaporInShell} onChange={setFluidQuantityVaporInShell}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityVaporOutShell} onChange={setFluidQuantityVaporOutShell}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityVaporInTube} onChange={setFluidQuantityVaporInTube}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityVaporOutTube} onChange={setFluidQuantityVaporOutTube}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
            </RowWarapper> */}

            {/* Liquid */}
            {/* <RowWarapper>
                <ContentsWrapper><div style={{width: 30}} />Liquid</ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityLiquidInShell} onChange={setFluidQuantityLiquidInShell}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityLiquidOutShell} onChange={setFluidQuantityLiquidOutShell}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityLiquidInTube} onChange={setFluidQuantityLiquidInTube}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityLiquidOutTube} onChange={setFluidQuantityLiquidOutTube}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
            </RowWarapper> */}

            {/* Steam */}
            {/* <RowWarapper>
                <ContentsWrapper><div style={{width: 30}} />Steam</ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantitySteamInShell} onChange={setFluidQuantitySteamInShell}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantitySteamOutShell} onChange={setFluidQuantitySteamOutShell}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantitySteamInTube} onChange={setFluidQuantitySteamInTube}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantitySteamOutTube} onChange={setFluidQuantitySteamOutTube}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
            </RowWarapper> */}

            {/* Water */}
            {/* <RowWarapper>
                <ContentsWrapper><div style={{width: 30}} />Water</ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper>
                        <ContentsWrapper style={{justifyContent: 'center', 'border': 'none'}}>
                            <CustomNumberInput value={fluidQuantityWaterInShell} onChange={setFluidQuantityWaterInShell}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', 'border': 'none'}}>
                            <CustomNumberInput value={fluidQuantityWaterOutShell} onChange={setFluidQuantityWaterOutShell}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper>
                        <ContentsWrapper style={{justifyContent: 'center', 'border': 'none'}}>
                            <CustomNumberInput value={fluidQuantityWaterInTube} onChange={setFluidQuantityWaterInTube}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', 'border': 'none'}}>
                            <CustomNumberInput value={fluidQuantityWaterOutTube} onChange={setFluidQuantityWaterOutTube}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
            </RowWarapper> */}

            {/* Noncondensables */}
            {/* <RowWarapper>
                <ContentsWrapper><div style={{width: 30}} />Noncondensables</ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityNoncondensablesInShell} onChange={setFluidQuantityNoncondensablesInShell}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityNoncondensablesOutShell} onChange={setFluidQuantityNoncondensablesOutShell}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityNoncondensablesInTube} onChange={setFluidQuantityNoncondensablesInTube}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none'}}>
                            <CustomNumberInput value={fluidQuantityNoncondensablesOutTube} onChange={setFluidQuantityNoncondensablesOutTube}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
            </RowWarapper> */}

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

            {/* GEOMETRY Header */}
            <RowWarapper>
                <ContentsWrapper style={{fontWeight: 'bold', fontSize: 16, justifyContent: 'center'}}>GEOMETRY</ContentsWrapper>
            </RowWarapper>
            {/* Shell & Baffle */}
            <RowWarapper>
                <ContentsWrapper style={{justifyContent: 'center'}}>Shell Geometry</ContentsWrapper>
                <ContentsWrapper style={{justifyContent: 'center'}}>Baffle Geometry</ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                            TEMA type
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomDropdown
                            value={temaType}
                            onChange={setTEMAType}
                            options={[
                                "Single Segmental",
                                "Double Segmental",
                                "Triple Segmental",
                                "No Baffle",
                                "Helical"
                            ]}
                            placeholder="Select TEMA"
                        />
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                            Baffle type
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomDropdown
                            value={baffleType}
                            onChange={setBaffleType}
                            options={[
                                "Single Segmental",
                                "Double Segmental",
                                "Triple Segmental",
                                "No Baffle",
                                "Helical"
                            ]}
                            placeholder="Select baffle"
                        />
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                            Shell ID (mm)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={shellID} onChange={setShellID}/>
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                            Baffle cut (Pct Dia.)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={baffleCut} onChange={setBaffleCut}/>
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Series
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={series} onChange={setSeries}/>
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Baffle orientation
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomDropdown
                            value={baffleOrientation}
                            onChange={setBaffleOrientation}
                            options={[
                                "Single Segmental",
                                "Double Segmental",
                                "Triple Segmental",
                                "No Baffle",
                                "Helical"
                            ]}
                            placeholder="Select baffle orientation"
                        />
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Parallel
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={parallel} onChange={setParallel}/>
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Central Spacing (mm)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={centralSpacing} onChange={setCentralSpacing}/>
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Orientation (deg)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={orientation} onChange={setOrientation}/>
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Crosspasses
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={crosspasses} onChange={setCrosspasses}/>
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>

            {/* Tube & Nozzles */}
            <RowWarapper>
                <ContentsWrapper style={{justifyContent: 'center'}}>Tube Geometry</ContentsWrapper>
                <ContentsWrapper style={{justifyContent: 'center'}}>Nozzles</ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                            Tube type
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomDropdown
                            value={tubeType}
                            onChange={setTubeType}
                            options={[
                                "Single Segmental",
                                "Double Segmental",
                                "Triple Segmental",
                                "No Baffle",
                                "Helical"
                            ]}
                            placeholder="Select tube"
                        />
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                           Shell inlet (mm)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={shellInlet} onChange={setShellInlet}/>
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                            Tube OD (mm)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={tubeOD} onChange={setTubeOD}/>
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                            Shell outlet (mm)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={shellOutlet} onChange={setShellOutlet}/>
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Length (m)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={length} onChange={setLength}/>
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Inlet Hight (mm)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={inletHight} onChange={setInletHight}/>
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Pitch Ratio
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={pitchRatio} onChange={setPitchRatio}/>
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Outlet Hight (mm)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={outletHight} onChange={setOutletHight}/>
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Layout (deg)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={layout} onChange={setLayout}/>
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Tube inlet (mm)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={tubeInlet} onChange={setTubeInlet}/>
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Tubecount
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={tubeCount} onChange={setTubeCount}/>
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Tube outlet (mm)
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={tubeOutlet} onChange={setTubeOutlet}/>
                    </ContentsWrapper>
                </ContentsWrapper>
            </RowWarapper>
            <RowWarapper>
                <ContentsWrapper>
                    <ContentsWrapper style={{border: 'none', padding: 0}}>
                        Tube Pass
                    </ContentsWrapper>
                    <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                        <CustomNumberInput value={tubePass} onChange={setTubePass}/>
                    </ContentsWrapper>
                </ContentsWrapper>
                <ContentsWrapper />
            </RowWarapper>
        </FrameWrapper>
    );
}