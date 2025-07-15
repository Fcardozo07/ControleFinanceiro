
import { GlobalStyles }
from "@mui/material";
import { useTelaLoginData } from "../../shared/hooks/TelaLogin/useTelaLoginData";
import { AppBarTelaLogin } from "../../shared/components/TelaLogin/AppBarTelaLogin";
import { FormTelaLogin } from "../../shared/components/TelaLogin/FormTelaLogin";

export const TelaLogin = () =>{

  const hook = useTelaLoginData();
  
    return(
        <>
      <GlobalStyles
        styles={{
          html: { width: "100%", overflowX: "hidden" },
          body: { margin: 0, padding: 0, width: "100%", overflowX: "hidden" },
          "#root": { width: "100%" },
        }}
      />

      <AppBarTelaLogin
      drawerOpen={hook.drawerOpen}
      toggleDrawer={hook.toggleDrawer}
      menuItems={hook.menuItems}
      imagem={hook.imagem}
      setImagem={hook.setImagem}
      />

      <FormTelaLogin{...hook}/>


    </>
    );
};