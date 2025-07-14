import { useState } from "react";


export const useCalcularorCDIUtil = () => {
    const [valorInicial, setValorInicial] = useState<number>(0);
    const [percentualCDI, setPercentualCDI] = useState<number>(100);
    const [meses, setMeses] = useState<number>(12);
    const [valorFinal, setValorFinal] = useState<number | null>(null);

    const CDI_ANUAL = 13.15;

    const calcular = () => {
        const rentabilidadeMensal = ((CDI_ANUAL /100)*(percentualCDI/100))/12;
        const resultado = valorInicial * Math.pow(1 + rentabilidadeMensal, meses);
        setValorFinal(resultado);
    
    }

    return{
        valorInicial,
        setValorInicial,
        percentualCDI,
        setPercentualCDI,
        meses,
        setMeses,
        valorFinal,      
        calcular    
    }
    
}