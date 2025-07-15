import { Box, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ITableConsultaPorMesProps } from "../../types/ConsultaPosMes/types";


export const TableConsultaPorMes: React.FC<ITableConsultaPorMesProps> = (
    {contas,    
     handleVerEntradas
    }
) => {

    return(
        <Container maxWidth="lg" sx={{mt:2}}>
            <Box display={"flex"} justifyContent={"center"} marginBottom={2}>
                <Typography variant="h4">Consultar por mês</Typography>
            </Box>

            <Box sx={{maxWidth:600, margin:"auto"}}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Data</TableCell>                            
                                <TableCell>Valor Total</TableCell>                            
                                <TableCell>Ver</TableCell>                            
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contas
                            .filter(conta => conta.valorTotal !== 0 && conta.valorTotal !== null)
                            .map((conta, index) => (
                                <TableRow key={index}>
                                    <TableCell>{conta.id}</TableCell>
                                    <TableCell>{new Date(conta.data).toLocaleDateString('pt-BR')}</TableCell>
                                    <TableCell>
                                    R$ {conta.valorTotal != null ? conta.valorTotal.toFixed(2) : "0,00"}
                                    </TableCell>

                                    <TableCell>
                                        <IconButton onClick={() => handleVerEntradas(conta.id)} color="primary">
                                        <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                        
                                </TableRow>
                            ))}
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
       

          </Container>
    )
}