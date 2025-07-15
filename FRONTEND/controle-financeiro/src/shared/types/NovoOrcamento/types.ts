export interface DescricaoItem {
  id: number;
  descricaoEntrada: string;
}

export interface DescricaoSaidaItem {
  id: number;
  descricaoSaida: string;
}

export interface IItemConta{
    id: number;
    data: string;
}

export interface EntradaItem {
    id: number;
    id_conta: number;
    id_descricaoEntrada: number;
    valorItem: number;
    pago: boolean;
    id_usuario: number;


}
export interface SaidaItem {
    id: number;
    id_conta: number;
    id_descricaoSaida: number;
    valorItem: number;
    pago: boolean;
    id_usuario: number;

}

export interface IFormsNovoOrcamento{
    descricaoEntrada: DescricaoItem[];
    descricaoSaida: DescricaoSaidaItem[];
    idDescricaoEntrada: string | number;
    setIdDescricaoEntrada: React.Dispatch<React.SetStateAction<string | number>>;
    idDescricaoSaida: string | number;
    setIdDescricaoSaida: React.Dispatch<React.SetStateAction<string | number>>;    
    id: IItemConta[];
    data: IItemConta[];
    valorEntrada: string | number;
    setValorEntrada: React.Dispatch<React.SetStateAction<string | number>>;
    valorSaida: string | number;
    setValorSaida: React.Dispatch<React.SetStateAction<string | number>>;
    isContaCriada: boolean;
    idConta: number | null;
    itensEntrada: EntradaItem[];
    itensSaida: SaidaItem[];
    handleCriarConta: () => Promise<void>;
    handleAdicionarItemEntrada: () => Promise<void>;
    handleAdicionarItemSaida: () => Promise<void>;
    handleUpdateConta: () => Promise<void>;
    handleDeleteEntrada: (id: number) => Promise<void>;
    handleDeleteSaida: (id: number) => Promise<void>;
    handleOpenPopup: () => void;
    handleClosePopup: () => void;
    handleOpenPopupSaida: () => void;
    handleClosePopupSaida: () => void;
    totalValor: number;
    totalValorSaida: number;
    saldoTotal: number;
    descricaoEntradas: DescricaoItem[];
    descricaoSaidas: DescricaoSaidaItem[];    
}


