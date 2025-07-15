
import { GlobalStyles} from "@mui/material";
import { useNavigate } from "react-router-dom";


import { LayoutBaseDePaginas } from "../../shared/layouts/LayoutBaseDepaginas";
import { FerramentasDeDetalhe } from "../../shared/components";
import { EditUsuarioForm } from "../../shared/components/EditUsuarioForm/EditUsuarioForm";
import useEditUsuarioData from "../../shared/hooks/EditarUsuario/useEditUsuarioData";

export const TelaEditarUser = () => {

const hook = useEditUsuarioData();
const navigate = useNavigate();

  return (
    <LayoutBaseDePaginas
      titulo="Dashboard"
      barraDeFerramentas={
        <FerramentasDeDetalhe
                mostrarBotaoNovo={false}
                mostrarBotaoOrcMensal={false}
                mostarBotaoSalvar={false}
                mostarBotaoSalvarVoltar={false}
                mostarBotaoVoltar={true}               
                aoClicarEmVoltar={() => navigate("/pagina-inicial")}
        />
      }
    >
      {/* Global styles para garantir largura total */}
      <GlobalStyles
        styles={{
          html: { width: "100%", overflowX: "hidden" },
          body: { margin: 0, padding: 0, width: "100%", overflowX: "hidden" },
          "#root": { width: "100%" },
        }}
      />

        {/* ✅ Formulário com todos os dados controlados */}
        <EditUsuarioForm{...hook}/>
    
    </LayoutBaseDePaginas>
  );
};
