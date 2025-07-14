export interface IFormCalculadorCDI {
  valorInicial: number | "";
  setValorInicial: React.Dispatch<React.SetStateAction<number | "">>;
  percentualCDI: number; // <<< somente number aqui
  setPercentualCDI: React.Dispatch<React.SetStateAction<number>>; // <<< somente number aqui
  meses: number | "";
  setMeses: React.Dispatch<React.SetStateAction<number | "">>;
  calcular: () => void;
  valorFinal: number | null;
  cdiAnual: number | "";
  setCdiAnual: React.Dispatch<React.SetStateAction<number | "">>;
}
