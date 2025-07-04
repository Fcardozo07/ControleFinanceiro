
import { Icon, ListItemIcon, useTheme } from "@mui/material";
import { AppBar, Box, Button, Container, Drawer, GlobalStyles, IconButton,
 List, ListItem, ListItemButton, ListItemText, 
 Toolbar, Typography, useMediaQuery }
from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAppThemeContext } from "../../shared/contexts";
import { CadastroUsuarioForm } from "../../shared/components/CadastroUsuarioForm/CadastroUsuarioForm";
import { useCadastroUsuarioData } from "../../shared/hooks/CadastroUsuario/useCadastroUsuarioData";
import { useFotoUsuarioUpload } from "../../shared/hooks/FotoUsuario/useFotoUsuarioUpload";



export const TelaCadastroUser = () =>{

  const {
  nome,
  setNome,
  email,
  setEmail,
  senha,
  setSenha,
  senhaRepetida,
  setSenhaRepetida,
  erro,
  setErro,
  handleCadastrar
} = useCadastroUsuarioData(0); // `0` ou `null`, pois é cadastro novo


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  const menuItems = ["Início", "Sobre", "Contato"];
  const [imagem, setImagem] = useState<File | null>(null);  
  const { uploadFoto } = useFotoUsuarioUpload();

  const handleSubmit = async () => {
  // Primeiro, cadastra o usuário
  const usuarioId = await handleCadastrar();

  // Depois, se tiver imagem, envia
  if (usuarioId && imagem) {
    await uploadFoto(usuarioId, imagem);
  }
};

 

  const {toggleTheme} = useAppThemeContext();

    return(
        <>
      <GlobalStyles
        styles={{
          html: { width: "100%", overflowX: "hidden" },
          body: { margin: 0, padding: 0, width: "100%", overflowX: "hidden" },
          "#root": { width: "100%" },
        }}
      />

      <AppBar
        position="static"
        sx={{
          backgroundColor: "#115669",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          {/* <Box sx={{ flexGrow: 1 }}>
            <img src="assets/images/Coopercitrus.png" alt="Logo" style={{ height: "60px" }} />
          </Box> */}
            <Box>
                <List component="nav">
                <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                    <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="" />
                </ListItemButton>
                </List>
            </Box>
          {isMobile ? (
            <>
              <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                  <List>
                    {menuItems.map((text) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box>
              {menuItems.map((item) => (
                <Button key={item} color="inherit">
                  {item}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4, px: 2 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 600,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            mt: 4,
            mb: 3,
          }}
        >
          Cadastro de Usuário
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 4,
          }}
        >

          {/* <img
            src="assets/images/logo.png"
            alt="Logo"
            style={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: 150,
            }}
          /> */}
        </Box>

        <CadastroUsuarioForm
        nome={nome}
        setNome={setNome}
        email={email}
        setEmail={setEmail}
        senha={senha}
        setSenha={setSenha}
        senhaRepetida={senhaRepetida}
        setSenhaRepetida={setSenhaRepetida}
        erro={erro}
        setErro={setErro}
        onSubmit={handleSubmit}
        imagem={imagem}          // 👈 adiciona aqui
        setImagem={setImagem}  
        />
        
      </Container>
    </>
    );
};