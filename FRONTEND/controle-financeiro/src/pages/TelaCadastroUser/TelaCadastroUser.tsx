
import { Container, GlobalStyles}from "@mui/material";
import { CadastroUsuarioForm } from "../../shared/components/CadastroUsuarioForm/CadastroUsuarioForm";
import { useCadastroUsuarioData } from "../../shared/hooks/CadastroUsuario/useCadastroUsuarioData";
import { CadastroUsuarioAppbar } from "../../shared/components/CadastroUsuarioForm/CadastroUsuarioAppbar";

export const TelaCadastroUser = () =>{

const hook =  useCadastroUsuarioData(0); 

    return(
        <>
      <GlobalStyles
        styles={{
          html: { width: "100%", overflowX: "hidden" },
          body: { margin: 0, padding: 0, width: "100%", overflowX: "hidden" },
          "#root": { width: "100%" },
        }}
      />
      <CadastroUsuarioAppbar{...hook}/>

      <Container maxWidth="sm" sx={{ mt: 4, px: 2 }}>
        
        <CadastroUsuarioForm
        nome={hook.nome}
        setNome={hook.setNome}
        email={hook.email}
        setEmail={hook.setEmail}
        senha={hook.senha}
        setSenha={hook.setSenha}
        senhaRepetida={hook.senhaRepetida}
        setSenhaRepetida={hook.setSenhaRepetida}
        erro={hook.erro}
        setErro={hook.setErro}
        onSubmit={hook.handleSubmit}
        imagem={hook.imagem}          // 👈 adiciona aqui
        setImagem={hook.setImagem}  
        />
        
      </Container>
    </>
    );
};