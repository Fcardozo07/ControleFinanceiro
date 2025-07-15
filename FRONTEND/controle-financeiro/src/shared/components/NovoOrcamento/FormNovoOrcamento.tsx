import React from "react";
import { IFormsNovoOrcamento } from "../../types/NovoOrcamento/types";
import { Box, Button, Container, Divider, FormControl, Icon, InputLabel, 
MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableFooter, 
TableHead, TableRow, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

export const FormNovoOrcamento: React.FC<IFormsNovoOrcamento> = ({
    descricaoEntrada,    
    descricaoSaida,
    idDescricaoEntrada,
    setIdDescricaoEntrada,
    idDescricaoSaida,
    setIdDescricaoSaida,
    valorEntrada,
    setValorEntrada,
    valorSaida,
    setValorSaida,
    isContaCriada,
    idConta,
    itensEntrada,
    itensSaida,
    handleCriarConta,
    handleAdicionarItemEntrada,
    handleAdicionarItemSaida,
    handleUpdateConta,
    handleDeleteEntrada,
    handleDeleteSaida,
    handleOpenPopup,   
    handleOpenPopupSaida,   
    totalValor,
    totalValorSaida,
    saldoTotal,

       
}) => {

    const navigate = useNavigate();

    return(
        <Container maxWidth="lg" sx={{ mt: 2 }}>
                <Box display={"flex"} justifyContent={"center"}>
                    <Typography variant="h4" marginBottom={2}>Cadastrar Orçamento Mensal</Typography>
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
                    <Button variant="contained" color="primary" onClick={handleCriarConta}>
                    Gerar novo orçamento
                    </Button>
                </Box>

                {!isContaCriada && (
                    <Box mt={3} textAlign="center">
                    <Typography variant="h6" color="textSecondary">
                        Clique acima para gerar um novo orçamento mensal.
                    </Typography>
                    </Box>
                )}

                {isContaCriada && (
                    <>
                    {/* ENTRADAS */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="descricao-entrada-label">Descrição de Entrada</InputLabel>
                        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                        <Select
                            labelId="descricao-entrada-label"
                            id="select-descricao-entrada"
                            value={idDescricaoEntrada}
                            onChange={(e) => setIdDescricaoEntrada(Number(e.target.value))}
                            label="Descrição de Entrada"
                            fullWidth
                            sx={{ width: "60%", minWidth: "20%", maxWidth: "100%" }}
                        >
                            <MenuItem value=""><em>Selecione...</em></MenuItem>
                            {descricaoEntrada.map((item) => (
                            <MenuItem key={item.id} value={item.id}>{item.descricaoEntrada}</MenuItem>
                            ))}
                        </Select>

                        <Box display="flex" flexDirection="row" gap={1}>
                            <TextField
                            id="valor"
                            label="Valor"
                            type="number"
                            value={valorEntrada}
                            onChange={(e) => setValorEntrada(e.target.value)}
                            fullWidth
                            sx={{ minWidth: 100 }}
                            />
                            <Button variant="contained" color="primary" onClick={handleOpenPopup}>Add</Button>
                            <Button variant="contained" color="primary" onClick={handleAdicionarItemEntrada}>OK</Button>
                        </Box>
                        </Box>
                    </FormControl>

                    {/* TABELA DE ENTRADAS */}
                    <TableContainer>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell><strong>Descrição de Entradas</strong></TableCell>
                            <TableCell><strong>Valor</strong></TableCell>
                            <TableCell><strong>Apagar</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {itensEntrada.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{descricaoEntrada.find(desc => desc.id === item.id_descricaoEntrada)?.descricaoEntrada || "N/A"}</TableCell>
                                <TableCell>R$ {Number(item.valorItem).toFixed(2)}</TableCell>
                                <TableCell>
                                <Icon onClick={() => handleDeleteEntrada(item.id)} color="error">delete</Icon>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                            <TableCell sx={{ fontWeight: "Bold", fontSize: 20 }}><strong>Total</strong></TableCell>
                            <TableCell sx={{ fontWeight: "Bold", fontSize: 20 }}><strong>R$ {(totalValor ?? 0).toFixed(2)}</strong></TableCell>
                            </TableRow>
                        </TableFooter>
                        </Table>
                    </TableContainer>

                    {/* SAÍDAS */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="descricao-saida-label">Descrição de Saída</InputLabel>
                        <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                        <Select
                            labelId="descricao-saida-label"
                            id="select-descricao-saida"
                            value={idDescricaoSaida}
                            onChange={(e) => setIdDescricaoSaida(Number(e.target.value))}
                            label="Descrição de Saída"
                            fullWidth
                            sx={{ width: "60%", minWidth: "20%", maxWidth: "100%" }}
                        >
                            <MenuItem value=""><em>Selecione...</em></MenuItem>
                            {descricaoSaida.map((item) => (
                            <MenuItem key={item.id} value={item.id}>{item.descricaoSaida}</MenuItem>
                            ))}
                        </Select>

                        <Box display="flex" flexDirection="row" gap={1}>
                            <TextField
                            id="valor"
                            label="Valor"
                            type="number"
                            value={valorSaida}
                            onChange={(e) => setValorSaida(e.target.value)}
                            fullWidth
                            />
                            <Button variant="contained" color="primary" onClick={handleOpenPopupSaida}>Add</Button>
                            <Button variant="contained" color="primary" onClick={handleAdicionarItemSaida}>OK</Button>
                        </Box>
                        </Box>
                    </FormControl>

                    {/* TABELA DE SAÍDAS */}
                    <TableContainer>
                        <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell><strong>Descrição de Saídas</strong></TableCell>
                            <TableCell><strong>Valor</strong></TableCell>
                            <TableCell><strong>Apagar</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {itensSaida.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{descricaoSaida.find(desc => desc.id === item.id_descricaoSaida)?.descricaoSaida || "N/A"}</TableCell>
                                <TableCell>R$ {Number(item.valorItem).toFixed(2)}</TableCell>
                                <TableCell>
                                <Icon onClick={() => handleDeleteSaida(item.id)} color="error">delete</Icon>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                            <TableCell sx={{ fontWeight: "Bold", fontSize: 20 }}><strong>Total</strong></TableCell>
                            <TableCell sx={{ fontWeight: "Bold", fontSize: 20 }}><strong>R$ R$ {(totalValorSaida ?? 0).toFixed(2)}</strong></TableCell>
                            </TableRow>
                        </TableFooter>
                        </Table>
                    </TableContainer>

                    <Divider />

                    {/* SALDO FINAL E BOTÕES */}
                    <Box display="flex" justifyContent="center" mt={5}>
                        <Typography variant="h6" color={saldoTotal >= 0 ? "green" : "red"}>
                        Saldo Total: R$ {(saldoTotal ?? 0).toFixed(2)}
                        </Typography>
                    </Box>

                    <Box display="flex" justifyContent="center" mt={5} gap={2}>
                                <Button
                                sx={{ width: 200 }}
                                color="error"
                                variant="contained"
                                onClick={async () => {
                                    if (idConta) {
                                    try {
                                        await api.delete(`/contas/${idConta}`);
                                        enqueueSnackbar("Orçamento cancelado com sucesso!", { variant: "success" });
                                    } catch (error) {
                                        enqueueSnackbar("Erro ao cancelar orçamento.", { variant: "error" });
                                    }
                                    }
                                    navigate("/pagina-inicial");
                                }}
                                >
                                Cancelar
                                </Button>
                        <Button sx={{ width: 200 }} color="primary" variant="contained" onClick={handleUpdateConta}>
                        Salvar
                        </Button>
                    </Box>
                    </>
                )}
        </Container>
    )
}
    