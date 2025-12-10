import styled from "@emotion/styled";
import { useState } from "react";
import CustomNumberInput from "../components/NumberInput";
import CustomInput from "../components/CustomInput";
import CustomDropdown from "../components/CustomDropdown";
import CustomDateInput from "../components/CustomDateInput";
import { exampleInput, initalOutput } from "../const/mock";
import type { Result } from "../../App";

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


interface InputFrameProps {
  setResult: React.Dispatch<React.SetStateAction<Result>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputFrame({setResult, setLoading, setIsInput} : InputFrameProps) {
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
    const [type, setType] = useState<string>('');
    const [orientation, setOrientation] = useState<string>('');
    const [hotFluid, setHotFluid] = useState<string>('');
    const [unitAngle, setUnitAngle] = useState<string>('');
    const [connectParallel, setConnectParallel] = useState<string>('');
    const [connectSeries, setConnectSeries] = useState<string>('');

    const [fluidNameShell, setFluidNameShell] = useState<string>('');
    const [fluidNameTube, setFluidNameTube] = useState<string>('');
    const [fluidQuantityTotalShell, setFluidQuantityTotalShell] = useState<string>('');
    const [fluidQuantityTotalTube, setFluidQuantityTotalTube] = useState<string>('');
    const [inletPressureShell, setInletPressureShell] = useState<string>('');
    const [inletPressureTube, setInletPressureTube] = useState<string>('');
    const [pressureDropAllowShell, setPressureDropAllowShell] = useState<string>('');
    const [pressureDropAllowTube, setPressureDropAllowTube] = useState<string>('');
    const [temperatureInShell, setTemperatureInShell] = useState<string>('');
    const [temperatureOutShell, setTemperatureOutShell] = useState<string>('');
    const [temperatureInTube, setTemperatureInTube] = useState<string>('');
    const [temperatureOutTube, setTemperatureOutTube] = useState<string>('');
    const [foulingResistanceShell, setFoulingResistanceShell] = useState<string>('');

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

    const [fluidQuantitySteamInTube, setFluidQuantitySteamInTube] = useState('');
    const [fluidQuantitySteamInShell, setFluidQuantitySteamInShell] = useState('');
    const [fluidQuantitySteamOutTube, setFluidQuantitySteamOutTube] = useState('');
    const [fluidQuantitySteamOutShell, setFluidQuantitySteamOutShell] = useState('');
    const [fluidQuantityVaporInTube, setFluidQuantityVaporInTube] = useState('');
    const [fluidQuantityVaporInShell, setFluidQuantityVaporInShell] = useState('');
    const [fluidQuantityVaporOutTube, setFluidQuantityVaporOutTube] = useState('');
    const [fluidQuantityVaporOutShell, setFluidQuantityVaporOutShell] = useState('');
    const [fluidQuantityLiquidInTube, setFluidQuantityLiquidInTube] = useState('');
    const [fluidQuantityLiquidInShell, setFluidQuantityLiquidInShell] = useState('');
    const [fluidQuantityLiquidOutTube, setFluidQuantityLiquidOutTube] = useState('');
    const [fluidQuantityLiquidOutShell, setFluidQuantityLiquidOutShell] = useState('');
    const [fluidQuantityWaterInTube, setFluidQuantityWaterInTube] = useState('');
    const [fluidQuantityWaterInShell, setFluidQuantityWaterInShell] = useState('');
    const [fluidQuantityWaterOutTube, setFluidQuantityWaterOutTube] = useState('');
    const [fluidQuantityWaterOutShell, setFluidQuantityWaterOutShell] = useState('');
    const [fluidQuantityNoncondensablesInTube, setFluidQuantityNoncondensablesInTube] = useState('');
    const [fluidQuantityNoncondensablesInShell, setFluidQuantityNoncondensablesInShell] = useState('');
    const [fluidQuantityNoncondensablesOutTube, setFluidQuantityNoncondensablesOutTube] = useState('');
    const [fluidQuantityNoncondensablesOutShell, setFluidQuantityNoncondensablesOutShell] = useState('');

    const [latentHeatInShell, setLatentHeatInShell] = useState('');
    const [latentHeatOutShell, setLatentHeatOutShell] = useState('');
    const [latentHeatInTube, setLatentHeatInTube] = useState('');
    const [latentHeatOutTube, setLatentHeatOutTube] = useState('');

    const [tubeNo, setTubeNo] = useState<string>('');
    const [OD, setOD] = useState<string>('');
    const [Thk, setThk] = useState<string>('');
    const [length, setLength] = useState<string>('');
    const [pitch, setPitch] = useState<string>('');
    const [itemNo, setItemNo] = useState<string>('');

    const [tubeType, setTubeType] = useState<string>('');
    const [tubeMaterial, setTubeMaterial] = useState<string>('');
    const [tubePattern, setTubePattern] = useState<string>('');
    const [shellMaterial, setShellMaterial] = useState<string>('');
    const [shellID, setShellID] = useState<string>('');
    const [shellOD, setShellOD] = useState<string>('');
    const [shellCover, setShellCover] = useState<string>('');
    const [channelOrBonnet, setChannelOrBonnet] = useState<string>('');
    const [channelCover, setChannelCover] = useState<string>('');
    const [tubeSheetStationary, setTubeSheetStationary] = useState<string>('');
    const [tubeSheetFloating, setTubeSheetFloating] = useState<string>('');
    const [floatingHeadCover, setFloatingHeadCover] = useState<string>('');
    const [impingementPlate, setImpingementPlate] = useState<string>('');

    const [bafflesCross, setBaffleCross] = useState<string>('');
    const [bafflesCrossType, setBafflesCrossType] = useState<string>('');
    const [cutDiam, setCutDiam] = useState<string>('');
    const [spacing, setSpacing] = useState<string>('');
    const [bafflesCrossInlet, setBaffleCrossInlet] = useState<string>('');
    const [bafflesLong, setBafflesLong] = useState<string>('');
    const [sealType, setSealType] = useState<string>('');
    const [supportsTube, setSupportsTube] = useState<string>('');
    const [UBend, setUBend] = useState<string>('');
    const [UBendType, setUBendType] = useState<string>('');
    const [supportToTubesheetInlet, setSupportToTubesheetInlet] = useState<string>('');
    const [supportToTubesheetOutlet, setSupportToTubesheetOutlet] = useState<string>('');
    const [bypassSealArrangement, setBypassSealArrangement] = useState<string>('');
    const [tubeTubesheetJoint, setTubeTubesheetJoint] = useState<string>('');
    const [expansionJoint, setExpansionJoint] = useState<string>('');
    const [expansionJointType, setExpansionJointType] = useState<string>('');
    const [RhoV2InletNozzle, setRhoV2InletNozzle] = useState<string>('');
    const [bundleEnterance, setBundleEnterance] = useState<string>('');
    const [bundleExit, setBundleExit] = useState<string>('');

    const [gasketsShellSide, setGasketsShellSide] = useState<string>('');
    const [gasketTubeSide, setGasketTubeSide] = useState<string>('');
    const [floatingHead, setFloatingHead] = useState<string>('');
    const [codeRequirements, setCodeRequirements] = useState<string>('');
    const [TEMAClass, setTEMAClass] = useState<string>('');
    const [weightShell, setWeightShell] = useState<string>('');
    const [filledWithWater, setFilledWithWater] = useState<string>('');
    const [bundle, setBundle] = useState<string>('');

    const [rowsSupportedInlet, setRowsSupportedInlet] = useState<string>('');
    const [rowsSupportedOutlet, setRowsSupportedOutlet] = useState<string>('');

    const errorFunction = (v: string) => {
        if (v == '잘못된 입력') {
            return true;
        }
        return false;
    }

    const handleCalculate = async () => {
        try {
        const inputs = {...exampleInput, 'init_data': initalOutput};
        console.log('inputs', JSON.stringify(inputs));

        const response = await fetch('http://127.0.0.1:5000/api/calc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inputs),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        setResult(data);
        } catch (error: any) {
        console.error('Error:', error);
        }
    };

    const handleOnCalculate = async () => {
        setLoading(true);
        await handleCalculate();
        setResult(prev => ({
            imgData: prev.imgData,
            resData :{
                ...prev.resData,
                customer: customer,
                jobNo: jobNo,
                referenceNo: refNo,
                address: address,
                proposalNo: proposalNo,
                plantLocation: location,
                date: date,
                rev: rev,
                serviceOfUnit: serviceUnit,
                itemNo: itemNo,
                type: type,
                orientation: orientation,
                connectParallel: connectParallel,
                connectSeries: connectSeries,
                fluidNameShell: fluidNameShell,
                fluidNameTube: fluidNameTube,
                fluidQuantityTotalShell: fluidQuantityTotalShell,
                fluidQuantityTotalTube: fluidQuantityTotalTube,
                fluidQuantityVaporInTube: fluidQuantityVaporInTube,
                fluidQuantityVaporOutTube: fluidQuantityVaporOutTube,
                fluidQuantityLiquidInTube: fluidQuantityLiquidInTube,
                fluidQuantityLiquidOutTube: fluidQuantityLiquidOutTube,
                fluidQuantitySteamInTube: fluidQuantitySteamInTube,
                fluidQuantitySteamOutTube: fluidQuantitySteamOutTube,
                fluidQuantityWaterInTube: fluidQuantityWaterInTube,
                fluidQuantityWaterOutTube: fluidQuantityWaterOutTube,
                fluidQuantityNoncondensablesInTube: fluidQuantityNoncondensablesInTube,
                fluidQuantityNoncondensablesOutTube: fluidQuantityNoncondensablesOutTube,
                fluidQuantityVaporInShell: fluidQuantityVaporInShell,
                fluidQuantityVaporOutShell: fluidQuantityVaporOutShell,
                fluidQuantityLiquidInShell: fluidQuantityLiquidInShell,
                fluidQuantityLiquidOutShell: fluidQuantityLiquidOutShell,
                fluidQuantitySteamInShell: fluidQuantitySteamInShell,
                fluidQuantitySteamOutShell: fluidQuantitySteamOutShell,
                fluidQuantityWaterInShell: fluidQuantityWaterInShell,
                fluidQuantityWaterOutShell: fluidQuantityWaterOutShell,
                fluidQuantityNoncondensablesInShell: fluidQuantityNoncondensablesInShell,
                fluidQuantityNoncondensablesOutShell: fluidQuantityNoncondensablesOutShell,
                temperatureInShell: temperatureInShell,
                temperatureOutShell: temperatureOutShell,
                temperatureInTube: temperatureInTube,
                temperatureOutTube: temperatureOutTube,
                inletPressureShell: inletPressureShell,
                inletPressureTube: inletPressureTube,
                pressureDropAllowShell: pressureDropAllowShell,
                pressureDropAllowTube: pressureDropAllowTube,
                foulingResistanceShell: foulingResistanceShell,
                designPressureShell: designPressureShell,
                testPressureShell: testPressureShell,
                designPressureTube: designPressureTube,
                testPressureTube: testPressureTube,
                designTemperatureShell: designTemperatureShell,
                designTemperatureTube: designTemperatureTube,
                numberPassesShell: numberPassesShell,
                numberPassesTube: numberPassesTube,
                corrosionAllowanceShell: corrosionAllowanceShell,
                corrosionAllowanceTube: corrosionAllowanceTube,
                connectionSizeShellIn1: connectionSizeShellIn1,
                connectionSizeShellIn2: connectionSizeShellIn2,
                connectionSizeShellOut1: connectionSizeShellOut1,
                connectionSizeShellOut2: connectionSizeShellOut2,
                connectionSizeShellIntermediate1: connectionSizeShellIntermediate1,
                connectionSizeShellIntermediate2: connectionSizeShellIntermediate2,
                connectionSizeTubeIn1: connectionSizeTubeIn1,
                connectionSizeTubeIn2: connectionSizeTubeIn2,
                connectionSizeTubeOut1: connectionSizeTubeOut1,
                connectionSizeTubeOut2: connectionSizeTubeOut2,
                connectionSizeTubeIntermediate1: connectionSizeTubeIntermediate1,
                connectionSizeTubeIntermediate2: connectionSizeTubeIntermediate2,
                tubeNo: tubeNo,
                OD: OD,
                Thk: Thk,
                length: length,
                pitch: pitch,

                tubeType: tubeType,
                tubeMaterial: tubeMaterial,
                tubePattern: tubePattern,
                shellMaterial: shellMaterial,
                shellID: shellID,
                shellOD: shellOD,
                shellCover: shellCover,
                channelOrBonnet: channelOrBonnet,
                channelCover: channelCover,
                tubeSheetStationary: tubeSheetStationary,
                tubeSheetFloating: tubeSheetFloating,
                floatingHeadCover: floatingHeadCover,
                impingementPlate: impingementPlate,

                bafflesCross: bafflesCross,
                bafflesCrossType: bafflesCrossType,
                cutDiam: cutDiam,
                spacing: spacing,
                bafflesCrossInlet: bafflesCrossInlet,
                bafflesLong: bafflesLong,
                sealType: sealType,
                supportsTube: supportsTube,
                UBend: UBend,
                UBendType: UBendType,
                supportToTubesheetInlet: supportToTubesheetInlet,
                supportToTubesheetOutlet: supportToTubesheetOutlet,
                bypassSealArrangement: bypassSealArrangement,
                tubeTubesheetJoint: tubeTubesheetJoint,
                expansionJoint: expansionJoint,
                expansionJointType: expansionJointType,
                RhoV2InletNozzle: RhoV2InletNozzle,
                bundleEnterance: bundleEnterance,
                bundleExit: bundleExit,

                gasketsShellSide: gasketsShellSide,
                gasketTubeSide: gasketTubeSide,
                floatingHead: floatingHead,
                codeRequirements: codeRequirements,
                TEMAClass: TEMAClass,
                weightShell: weightShell,
                filledWithWater: filledWithWater,
                bundle: bundle,
                rowsSupportedInlet: rowsSupportedInlet,
                rowsSupportedOutlet: rowsSupportedOutlet
            }
        }));
        setIsInput(false);
        setLoading(false);
    }
    
    return (
         <div style={{display: 'flex', flexDirection: 'column', gap: 20, width: '100%'}}>
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
                        <CustomInput value={type} onChange={setType}/>
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
                    <CustomNumberInput value={itemNo} onChange={setItemNo}/>
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
            <RowWarapper>
                    <ContentsWrapper><div style={{width: 30}} />Vapor (In/Out)</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityVaporInShell} onChange={setFluidQuantityVaporInShell}/>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityVaporOutShell} onChange={setFluidQuantityVaporOutShell}/>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityVaporInTube} onChange={setFluidQuantityVaporInTube}/>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityVaporOutTube} onChange={setFluidQuantityVaporOutTube}/>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Liquid */}
                <RowWarapper>
                    <ContentsWrapper><div style={{width: 30}} />Liquid</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityLiquidInShell} onChange={setFluidQuantityLiquidInShell}/>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityLiquidOutShell} onChange={setFluidQuantityLiquidOutShell}/>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityLiquidInTube} onChange={setFluidQuantityLiquidInTube}/>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityLiquidOutTube} onChange={setFluidQuantityLiquidOutTube}/>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Steam */}
                <RowWarapper>
                    <ContentsWrapper><div style={{width: 30}} />Steam</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantitySteamInShell} onChange={setFluidQuantitySteamInShell}/>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantitySteamOutShell} onChange={setFluidQuantitySteamOutShell}/>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantitySteamInTube} onChange={setFluidQuantitySteamInTube}/>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantitySteamOutTube} onChange={setFluidQuantitySteamOutTube}/>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Water */}
                <RowWarapper>
                    <ContentsWrapper><div style={{width: 30}} />Water</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', 'border': 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityWaterInShell} onChange={setFluidQuantityWaterInShell}/>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', 'border': 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityWaterOutShell} onChange={setFluidQuantityWaterOutShell}/>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', 'border': 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityWaterInTube} onChange={setFluidQuantityWaterInTube}/>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', 'border': 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityWaterOutTube} onChange={setFluidQuantityWaterOutTube}/>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                </RowWarapper>

                {/* Noncondensables */}
                <RowWarapper>
                    <ContentsWrapper><div style={{width: 30}} />Noncondensables</ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityNoncondensablesInShell} onChange={setFluidQuantityNoncondensablesInShell}/>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityNoncondensablesOutShell} onChange={setFluidQuantityNoncondensablesOutShell}/>
                            </ContentsWrapper>
                        </RowWarapper>
                    </ContentsWrapper>
                    <ContentsWrapper>
                        <RowWarapper style={{gap: 10}}>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityNoncondensablesInTube} onChange={setFluidQuantityNoncondensablesInTube}/>
                            </ContentsWrapper>
                            <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                                <CustomInput value={fluidQuantityNoncondensablesOutTube} onChange={setFluidQuantityNoncondensablesOutTube}/>
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

            <RowWarapper>
                <ContentsWrapper>Latent Heat (In/Out)<div style={{width: 60}} />kJ/kg</ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper style={{gap: 10}}>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={latentHeatInShell} onChange={setLatentHeatInShell}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={latentHeatOutShell} onChange={setLatentHeatOutShell}/>
                        </ContentsWrapper>
                    </RowWarapper>
                </ContentsWrapper>
                <ContentsWrapper>
                    <RowWarapper style={{gap: 10}}>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={latentHeatInTube} onChange={setLatentHeatInTube}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{justifyContent: 'center', border: 'none', padding: 0}}>
                            <CustomNumberInput value={latentHeatOutTube} onChange={setLatentHeatOutTube}/>
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
                    <CustomNumberInput value={pressureDropAllowShell} onChange={setPressureDropAllowShell}/>
                </ContentsWrapper>
                <ContentsWrapper>
                    <CustomNumberInput value={pressureDropAllowTube} onChange={setPressureDropAllowTube}/>
                </ContentsWrapper>
            </RowWarapper>

            {/* Fouling Resistance */}
            <RowWarapper>
                <ContentsWrapper>Fouling Resistance (mm)<div style={{width: 30}} />m2-KW</ContentsWrapper>
                <ContentsWrapper>
                    <CustomNumberInput value={foulingResistanceShell} onChange={setFoulingResistanceShell}/>
                </ContentsWrapper>
                <ContentsWrapper></ContentsWrapper>
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
            <ContentsWrapper style={{padding: 0}}>
                <RowWarapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 80, flexShrink: 0}}>
                            Tube No.
                        </div>
                        <CustomNumberInput value={tubeNo} onChange={setTubeNo}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        OD
                        <CustomNumberInput value={OD} onChange={setOD}/>
                        mm
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        Thk(avg)
                        <CustomNumberInput value={Thk} onChange={setThk}/>
                        mm
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        Length
                        <CustomNumberInput value={length} onChange={setLength}/>
                        m
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        Pitch
                        <CustomNumberInput value={pitch} onChange={setPitch}/>
                        mm
                    </ContentsWrapper>
                </RowWarapper>
            </ContentsWrapper>
            <ContentsWrapper style={{padding: 0}}>
                <RowWarapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 80, flexShrink: 0}}>
                            Tube Type
                        </div>
                        <CustomInput value={tubeType} onChange={setTubeType}/>
                    </ContentsWrapper>
                    
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        Material
                        <CustomInput value={tubeMaterial} onChange={setTubeMaterial}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        Tube pattern
                        <CustomInput value={tubePattern} onChange={setTubePattern}/>
                    </ContentsWrapper>
                </RowWarapper>
            </ContentsWrapper>
            <ContentsWrapper style={{padding: 0}}>
                <RowWarapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 80, flexShrink: 0}}>
                            Shell
                        </div>
                        <CustomInput value={shellMaterial} onChange={setShellMaterial}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none', borderRight: '2px solid #ccc', padding: 0}}>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            ID
                            <CustomNumberInput value={shellID} onChange={setShellID}/>
                            mm
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            OD
                            <CustomNumberInput value={shellOD} onChange={setShellOD}/>
                            mm
                        </ContentsWrapper>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        Shell Cover
                        <CustomInput value={shellCover} onChange={setShellCover}/>
                    </ContentsWrapper>
                </RowWarapper>
            </ContentsWrapper>
            <ContentsWrapper style={{padding: 0}}>
                <RowWarapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 145, flexShrink: 0}}>
                            Channel or Bonnet
                        </div>
                        <CustomInput value={channelOrBonnet} onChange={setChannelOrBonnet}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        Channel Cover
                        <CustomInput value={channelCover} onChange={setChannelCover}/>
                    </ContentsWrapper>
                </RowWarapper>
            </ContentsWrapper>
            <ContentsWrapper style={{padding: 0}}>
                <RowWarapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 155, flexShrink: 0}}>
                            Tubesheet-Stationary
                        </div>
                        <CustomInput value={tubeSheetStationary} onChange={setTubeSheetStationary}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        Tubesheet-Floating
                        <CustomInput value={tubeSheetFloating} onChange={setTubeSheetFloating}/>
                    </ContentsWrapper>
                </RowWarapper>
            </ContentsWrapper>
            <ContentsWrapper style={{padding: 0}}>
                <RowWarapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 150, flexShrink: 0}}>
                            Floating Head Cover
                        </div>
                        <CustomInput value={floatingHeadCover} onChange={setFloatingHeadCover}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        Impigement Plate
                        <CustomInput value={impingementPlate} onChange={setImpingementPlate}/>
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
                            <CustomInput value={bafflesCross} onChange={setBaffleCross}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 50, flexShrink: 0}}>
                                Type
                            </div>
                            <CustomInput value={bafflesCrossType} onChange={setBafflesCrossType}/>
                        </ContentsWrapper>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none', padding: 0}}>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 100, flexShrink: 0}}>
                                %Cut (Diam)
                            </div>
                            <CustomNumberInput value={cutDiam} onChange={setCutDiam}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 100, flexShrink: 0}}>
                                Spacing (c/c)
                            </div>
                            <CustomNumberInput value={spacing} onChange={setSpacing}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 50, flexShrink: 0}}>
                                Inlet
                            </div>
                            <CustomNumberInput value={bafflesCrossInlet} onChange={setBaffleCrossInlet}/>
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
                        <CustomInput value={bafflesLong} onChange={setBafflesLong}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 100, flexShrink: 0}}>
                            Seal Type
                        </div>
                        <CustomInput value={sealType} onChange={setSealType}/>
                    </ContentsWrapper>
                </RowWarapper>
            </ContentsWrapper>
            <ContentsWrapper style={{padding: 0}}>
                <RowWarapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 115, flexShrink: 0}}>
                            Supports-Tube
                        </div>
                        <CustomInput value={supportsTube} onChange={setSupportsTube}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none', padding: 0}}>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 70, flexShrink: 0}}>
                                U-Bend
                            </div>
                            <CustomInput value={UBend} onChange={setUBend}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 50, flexShrink: 0}}>
                                Type
                            </div>
                            <CustomInput value={UBendType} onChange={setUBendType}/>
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
                            <CustomNumberInput value={supportToTubesheetInlet} onChange={setSupportToTubesheetInlet}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 50, flexShrink: 0}}>
                                Outlet
                            </div>
                            <CustomNumberInput value={supportToTubesheetOutlet} onChange={setSupportToTubesheetOutlet}/>
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
                            <CustomNumberInput value={rowsSupportedInlet} onChange={setRowsSupportedInlet}/>
                        </ContentsWrapper>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 50, flexShrink: 0}}>
                                Outlet
                            </div>
                            <CustomNumberInput value={rowsSupportedOutlet} onChange={setRowsSupportedOutlet}/>
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
                            <CustomInput value={bypassSealArrangement} onChange={setBypassSealArrangement}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 160, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Tube-Tubesheet Joint
                            </div>
                            <CustomInput value={tubeTubesheetJoint} onChange={setTubeTubesheetJoint}/>
                    </ContentsWrapper>
                </RowWarapper>
            </ContentsWrapper>
            <ContentsWrapper style={{padding: 0}}>
                <RowWarapper style={{alignItems: 'center'}}>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 120, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Expansion Joint
                            </div>
                            <CustomInput value={expansionJoint} onChange={setExpansionJoint}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 50, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Type
                            </div>
                            <CustomInput value={expansionJointType} onChange={setExpansionJointType}/>
                    </ContentsWrapper>
                </RowWarapper>
            </ContentsWrapper>
            <ContentsWrapper style={{padding: 0}}>
                <RowWarapper style={{alignItems: 'center'}}>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 150, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Rho-V2-Inlet Nozzle
                            </div>
                            <CustomInput value={RhoV2InletNozzle} onChange={setRhoV2InletNozzle}/>
                            kg/m-s2
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none', padding: 0, paddingRight: 5}}>
                        <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 120, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Bundle Entrance
                            </div>
                            <CustomInput value={bundleEnterance} onChange={setBundleEnterance}/>
                        </ContentsWrapper>
                                                <ContentsWrapper style={{gap: 10, border: 'none'}}>
                            <div style={{width: 100, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                                Bundle Exit
                            </div>
                            <CustomInput value={bundleExit} onChange={setBundleExit}/>
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
                        <CustomInput value={gasketsShellSide} onChange={setGasketsShellSide}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 80, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                            Tube Side
                        </div>
                        <CustomInput value={gasketTubeSide} onChange={setGasketTubeSide}/>
                    </ContentsWrapper>
                </RowWarapper>
            </ContentsWrapper>
            <ContentsWrapper style={{padding: 0}}>
                <RowWarapper style={{alignItems: 'center'}}>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 150, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                            - Floating Head
                        </div>
                        <CustomInput value={floatingHead} onChange={setFloatingHead}/>
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
                        <CustomInput value={codeRequirements} onChange={setCodeRequirements}/>
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 100, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                            TEMA Class
                        </div>
                        <CustomInput value={TEMAClass} onChange={setTEMAClass}/>
                    </ContentsWrapper>
                </RowWarapper>
            </ContentsWrapper>
            <ContentsWrapper style={{padding: 0}}>
                <RowWarapper style={{alignItems: 'center'}}>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 100, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                            Weight/Shell
                        </div>
                        <CustomInput value={weightShell} onChange={setWeightShell}/>
                        kg
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 140, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                            Filled with Water
                        </div>
                        <CustomInput value={filledWithWater} onChange={setFilledWithWater}/>
                        kg
                    </ContentsWrapper>
                    <ContentsWrapper style={{gap: 10, border: 'none'}}>
                        <div style={{width: 50, flexShrink: 0, textAlign: 'left', paddingLeft: 10}}>
                            Bundle
                        </div>
                        <CustomInput value={bundle} onChange={setBundle}/>
                        kg
                    </ContentsWrapper>
                </RowWarapper>
            </ContentsWrapper>
        </FrameWrapper>
        <div style={{height: 10, width: '100%', display: 'block', textAlign: 'right'}}>© 2025 MyTech. All Rights Reserved.</div>
        </div>
    );
}