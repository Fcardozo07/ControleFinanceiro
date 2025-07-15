import { FerramentasDeDetalhe, PopupEntradas, PopupSaidas } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts/LayoutBaseDepaginas";
import { useNavigate } from "react-router-dom";
import { FormNovoOrcamento } from "../../shared/components/NovoOrcamento/FormNovoOrcamento";
import { useNovoOrcamentoData } from "../../shared/hooks/NovoOrcamento/useNovoOrcamentoData";

export const NovoOrcamento = () => {
 
    const navigate = useNavigate();
    const hook = useNovoOrcamentoData();
    
    return (
        <LayoutBaseDePaginas
            titulo="Novo Orçamento"
            barraDeFerramentas={<FerramentasDeDetalhe
                mostrarBotaoNovo={false}
                mostrarBotaoOrcMensal={false}
                mostarBotaoSalvar={false}
                mostarBotaoSalvarVoltar={false}
                mostarBotaoVoltar={true}
                textoBotaoNovo="Novo Orçamento mensal"
                aoClicarEmVoltar={() => navigate("/pagina-inicial")}
            />}
        >
        
        <FormNovoOrcamento{...hook}/>
            <PopupEntradas
            open={hook.popupOpenEntrada}
            onClose={hook.handleClosePopup}
            onUpdate={hook.fetchDescricoes}
            onSalvoComSucesso={hook.atualizarDescricoesEntrada}
            />

            <PopupSaidas
            open={hook.popupOpenSaida}
            onClose={hook.handleClosePopupSaida}
            onUpdate={hook.fetchDescricoes}
            onSalvoComSucesso={hook.atualizarDescricoesSaida}
            />
        </LayoutBaseDePaginas>
    );
}
