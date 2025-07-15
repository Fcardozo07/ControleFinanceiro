import { FerramentasDeDetalhe, PopupVerOrc } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts/LayoutBaseDepaginas";
import { useNavigate } from "react-router-dom";
import { TableConsultaPorMes } from "../../shared/components/ConsultaPorMes/TableConsultaPorMes";
import { useConsultaPorMesData } from "../../shared/hooks/ConsultaPorMes/useConsultaPorMesData";

export const ConsultaPorMes = () =>{
    const hook = useConsultaPorMesData();
    const navigate = useNavigate();    

    return(
        <LayoutBaseDePaginas
             titulo="Consultar por mês"
                    barraDeFerramentas={<FerramentasDeDetalhe
                        mostrarBotaoNovo={false}
                        mostrarBotaoOrcMensal={false}
                        mostarBotaoSalvar={false}
                        mostarBotaoSalvarVoltar={false}
                        mostarBotaoVoltar={true}
                        aoClicarEmVoltar={() => {navigate("/pagina-inicial")}}                        
                        textoBotaoNovo="Novo Orçamento mensal"
                        aoClicarEmOrcMensal={() => {}}
                    />}
        >
            <TableConsultaPorMes 
            contas={hook.contas}
            handleVerEntradas={hook.handleVerEntradas}
            />

          <PopupVerOrc
          open={hook.popupVerOrc}
          onClose={hook.handleClosePopup}
          entradas={hook.entradas}
          saidas={hook.saidas}
          descricoes={hook.descricoes}
          descricoesSaida={hook.descricoesSaida}

          />
        </LayoutBaseDePaginas>
    )
}