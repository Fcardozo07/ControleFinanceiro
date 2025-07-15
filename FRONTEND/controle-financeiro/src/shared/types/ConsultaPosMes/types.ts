    export interface IContas{
        id: number
        data: string
        valorTotal: number
    }
   export interface IEntrada {
        id: number;
        id_conta: number;
        id_descricaoEntrada: number;
        valorItem: number;
        pago: boolean;
        descricaoEntrada: {
        id: number;
        descricaoEntrada: string;
    }
    }
    
    export interface ISaida {
        id: number;
        id_conta: number;
        id_descricaoSaida: number;
        valorItem: number;
        pago: boolean;
        descricaoSaida: {
        id: number;
        descricaoSaida: string;
    }
    }

   export interface IDescricaoEntrada {
        id: number;
        descricaoEntrada: string;
    }

    export interface IDescricaoSaida {
        id: number;
        descricaoSaida: string;
    }

    export interface ITableConsultaPorMesProps  {
        contas: IContas[]
        handleVerEntradas: (contaId: number) => void

}