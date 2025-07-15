import { Avatar, Box, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import DownloadIcon from '@mui/icons-material/Download';
import { IEmAbertoGridProps } from "../../types/Dashboard/type";


export const EmAbertoGrids: React.FC<IEmAbertoGridProps> = ({
   entradasSemReceber, saidasSemPagar, obterDescricaoEntrada, obterDescricaoSaida 
}) => {
 const theme = useTheme();

    return(
        <>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Typography variant="h5" sx={{ marginRight: 2, color: theme.palette.text.primary }}>
            Em aberto
          </Typography>
        </Box>
      <Box width="100%" display="flex" flexWrap={"wrap"} justifyContent="center">
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid>
              <Card sx={{ display: "flex", flexDirection: "column", height: "200px", width :"300px", borderRadius: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center',marginTop:2  }}>                
                  <Avatar sx={{ bgcolor: '#29b6f6', width: 32, height: 32, marginRight: 1 }}>
                    <DownloadIcon />
                  </Avatar>
                  <Typography variant="h5">Receitas não recebidas</Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 200 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id Conta</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Valor</TableCell>                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {entradasSemReceber.map((entrada) => {
                          console.log("Renderizando entrada:", entrada);
                          return (
                            <TableRow key={entrada.id}>
                              <TableCell>{entrada.id_conta}</TableCell>
                              <TableCell>{obterDescricaoEntrada(entrada.id_descricaoEntrada)}</TableCell>
                              <TableCell>
                                R$ {entrada.valorItem !== undefined ? entrada.valorItem.toFixed(2): '0.00'}
                              </TableCell>
                            </TableRow>
                          );
                        })}
  
                    </TableBody>
                  </Table>
                </TableContainer>

                </Card>
            </Grid>
            
          </Grid>
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid>
              <Card sx={{ display: "flex", flexDirection: "column", height: "200px", width :"300px", borderRadius: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center',marginTop:2  }}>
                  <Avatar sx={{ bgcolor: '#ef5350', width: 32, height: 32, marginRight: 1 }}>
                    <MoneyOffIcon />
                  </Avatar>                  
                  <Typography variant="h5">Despesas não pagas</Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 200 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id Conta</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Valor</TableCell>                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {saidasSemPagar.map((saida) => (
                        <TableRow key={saida.id}>
                          <TableCell>{saida.id_conta}</TableCell>
                          <TableCell>{obterDescricaoSaida(saida.id_descricaoSaida)}</TableCell>
                          <TableCell>
                            R$ {saida.valorItem !== undefined ? saida.valorItem.toFixed(2) : '0.00'}
                          </TableCell>
                        </TableRow>
                      ))}   
                     
                    </TableBody>
                  </Table>
                </TableContainer>

                </Card>
            </Grid>
            
          </Grid>
          </Box>
        </>
    )
}