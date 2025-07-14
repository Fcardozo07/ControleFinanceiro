
export interface IFormCalculadorCDI{
    valorInicial: number;
    setValorInicial: React.Dispatch<React.SetStateAction<number>>;
    percentualCDI: number;
    setPercentualCDI: React.Dispatch<React.SetStateAction<number>>;    
    meses: number;
    setMeses: React.Dispatch<React.SetStateAction<number>>;
    calcular: () => void;    
    valorFinal: number | null;
    
}


