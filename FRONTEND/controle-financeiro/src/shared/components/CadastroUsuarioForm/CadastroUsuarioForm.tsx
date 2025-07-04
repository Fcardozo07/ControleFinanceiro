import { Box, Button, FormControl, Icon, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICadastroUsuarioFormProps } from "../../types/usuario";



export const CadastroUsuarioForm: React.FC<ICadastroUsuarioFormProps> = ({
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
  onSubmit,
  imagem,      
  setImagem   

}) => {
  const navigate = useNavigate();

  return (
      <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(); // <-- isso aqui estava faltando!
    }}>
      <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Nome</InputLabel>
      <TextField
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        fullWidth
        margin="normal"
      />

      <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Email</InputLabel>
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />

      <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Senha</InputLabel>
      <TextField
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        fullWidth
        margin="normal"
        type="password"
      />

      <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>Repetir Senha</InputLabel>
      <TextField
        value={senhaRepetida}
        onChange={(e) => setSenhaRepetida(e.target.value)}
        fullWidth
        margin="normal"
        type="password"
      />

      {erro && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {erro}
        </Typography>
      )}

          <FormControl fullWidth margin="normal">
          <Typography variant="subtitle1">Adicionar imagem do usuário:</Typography>
          <input
            accept="image/*"
            id="upload-imagem"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImagem(e.target.files[0]);
              }
            }}
          />
          <label htmlFor="upload-imagem">
            <Button
              variant="contained"
              component="span"
              startIcon={<Icon>upload</Icon>}
              fullWidth
            >
              Escolher Imagem
            </Button>
          </label>
        </FormControl>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 3 }}>
        <Button
          type="button"
          onClick={() => navigate("/tela-login")}
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#8c0f0f", '&:hover': { backgroundColor: "#e03131" } }}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ backgroundColor: "#115669", '&:hover': { backgroundColor: "#1683a1" } }}
        >
          Salvar
        </Button>
      </Box>
    </form>
  );
};
