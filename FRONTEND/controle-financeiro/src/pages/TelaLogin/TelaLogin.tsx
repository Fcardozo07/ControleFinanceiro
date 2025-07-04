
import { Icon, ListItemIcon, useTheme } from "@mui/material";
import {toast} from "react-toastify";
import { AppBar, Box, Button, Container, Drawer, GlobalStyles, IconButton,
InputLabel, List, ListItem, ListItemButton, ListItemText, 
TextField, Toolbar, Typography, useMediaQuery }
from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAppThemeContext } from "../../shared/contexts";
import api from "../../shared/services/axios";




export const TelaLogin = () =>{
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  const menuItems = ["Início", "Sobre", "Contato"];

  const [email, setEmail] = useState(""); 
  const [usuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const {toggleTheme} = useAppThemeContext();

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    
   
    try {
      const response = await api.post('/auth/login',{email, senha});
      const data = response.data;
      console.log(data)
        if (data.message === "Login realizado com sucesso") {
          toast.success("Login realizado com sucesso!")
          sessionStorage.setItem("id", data.id);
          sessionStorage.setItem("nome", data.nome);
          sessionStorage.setItem("email", data.email);
          navigate('/pagina-inicial');
        }else{
          setErro("Email ou senha incorretos")
        }
      
    } catch (error: any) {
      setErro("Email ou senha incorretos")
       toast.error("erro ao fazer login", error.message )

    }
    
  }

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
          Controle Financeiro
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

        <form onSubmit={handleLogin}>
          <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Login</InputLabel>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="username"
          />

          <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Senha</InputLabel>
          <TextField
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="current-password"
            type="password"
          />

          {erro && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {erro}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button                
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#115669",
                '&:hover': { backgroundColor: "#1683a1" },
                boxShadow: 3,
              }}
            >
             ENTRAR
            </Button>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 2, flexWrap: "wrap" }}>
            <Typography
                  component="a"
                  onClick={() => navigate("/esqueci_senha")}
                  sx={{
                    color: theme.palette.text.primary, // <-- agora respeita o tema
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Esqueci minha senha
          </Typography>

          <Typography
                  component="a"
                  onClick={() => navigate("/cadastro-user")}
                  sx={{
                    color: theme.palette.text.primary, // <-- aqui também
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
            Criar conta
          </Typography>

          </Box>
        </form>
      </Container>
    </>
    );
};