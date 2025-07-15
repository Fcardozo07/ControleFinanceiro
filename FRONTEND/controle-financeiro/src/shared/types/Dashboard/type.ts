 export type DescricoesEntrada = {
    id: number;
    descricaoEntrada: string;
  }
 export type DescricoesSaida = {
    id: number;
    descricaoSaida: string;
  }
 export type Entrada = {
    id: number;
    id_conta: number;
    id_descricaoEntrada: number;
    valorItem: number;
    pago: boolean;
  }
 export type Saida = {
    id: number;
    id_conta: number;
    id_descricaoSaida: number;
    valorItem: number;
    pago: boolean;
  }
   export type Conta = {
    id: number;
    data: string;
    valorTotal: number;
  }


  export interface IBalancoGridProps{
    contaMaisAlta: number;
    contaMaisBaixa: number;
    dataConta: string;
    mediaContas: number;    
  }

  export interface IEmAbertoGridProps{
    entradasSemReceber: Entrada[];
    saidasSemPagar: Saida[];
    obterDescricaoEntrada: (id: number) => string;
    obterDescricaoSaida: (id: number) => string;
    
  }

  export interface IGraficosProps{    
    dadosGraficoPizza: (string | number)[][];
    chartDataFinal: (string | number)[][];
  }  


  