import { Box, Button, TextField, Typography } from "@mui/material";
import { IFormCalculadorCDI } from "../../types/CalculadorCDI/types";


export const FormCalculadorCDI: React.FC<IFormCalculadorCDI> = ({
    valorInicial,
    setValorInicial,
    percentualCDI,
    setPercentualCDI,
    meses,
    setMeses,
    valorFinal,   
    calcular,
    cdiAnual,
    setCdiAnual,
    

}) =>{
    return(
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Calculadora CDI
      </Typography>

      <TextField
        label="CDI Anual"
        type="number"
        value={cdiAnual}
        onChange={(e) => setCdiAnual(Number(e.target.value))}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Valor Inicial (R$)"
        type="number"
        value={valorInicial}
        onChange={(e) => setValorInicial(Number(e.target.value))}
        fullWidth
        margin="normal"
      />

      <TextField
        label="% do CDI"
        type="number"
        value={percentualCDI}
        onChange={(e) => setPercentualCDI(Number(e.target.value))}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Meses"
        type="number"
        value={meses}
        onChange={(e) => setMeses(Number(e.target.value))}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={calcular}
        fullWidth
        sx={{ mt: 2 }}
      >
        Calcular
      </Button>

      {valorFinal !== null && (
        <Typography align="center" sx={{ mt: 2 }}>
          Valor final aproximado: <strong>R$ {valorFinal.toFixed(2)}</strong>
        </Typography>
      )}
    </Box>
    );
}
