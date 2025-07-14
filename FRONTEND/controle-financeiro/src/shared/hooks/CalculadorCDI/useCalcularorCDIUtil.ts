import { useState } from "react";


export const useCalcularorCDIUtil = () => {
    const [valorInicial, setValorInicial] = useState<number | "">("");    
    const [meses, setMeses] = useState<number | "">("");
    const [valorFinal, setValorFinal] = useState<number | null>(null);
    const [cdiAnual, setCdiAnual] = useState<number | "">("");
    const [percentualCDI, setPercentualCDI] = useState<number>(100);

 

const calcular = () => {
  const cdiNum = typeof cdiAnual === "number" ? cdiAnual : 0;
  const valorNum = typeof valorInicial === "number" ? valorInicial : 0;
  const percNum = typeof percentualCDI === "number" ? percentualCDI : 0;
  const mesesNum = typeof meses === "number" ? meses : 0;

  const rentabilidadeMensal = ((cdiNum / 100) * (percNum / 100)) / 12;
  const resultado = valorNum * Math.pow(1 + rentabilidadeMensal, mesesNum);
  setValorFinal(resultado);
};


    return{
        valorInicial,
        setValorInicial,
        percentualCDI,
        setPercentualCDI,
        meses,
        setMeses,
        valorFinal,       
        cdiAnual,
        setCdiAnual,        
        calcular    
    }
    
}