import { Box, Button, Container, InputLabel, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { IFormLoginProps } from "../../types/TelaLogin/types";
import { useNavigate } from "react-router-dom";



export const FormTelaLogin: React.FC<IFormLoginProps> = ({
    email,
    setEmail,
    senha,
    setSenha,
    erro,
    setErro,
    handleLogin
    }) => {

        const navigate = useNavigate();
        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down("md"));

            return(
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
            )
    }