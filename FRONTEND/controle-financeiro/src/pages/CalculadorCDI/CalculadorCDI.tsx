import { useNavigate } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { FormCalculadorCDI } from "../../shared/components/CalculadorCDI/FormCalculadorCDI";
import { useCalcularorCDIUtil } from "../../shared/hooks/CalculadorCDI/useCalcularorCDIUtil";
import { LayoutBaseDePaginas } from "../../shared/layouts/LayoutBaseDepaginas";


export const CalculadorCDI = () => {

    const navigate = useNavigate();

    const hook = useCalcularorCDIUtil();
 
    return(
        <LayoutBaseDePaginas
        titulo="Calculador de CDI"
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
        <FormCalculadorCDI {...hook}/>
        </LayoutBaseDePaginas>
       
    );
}