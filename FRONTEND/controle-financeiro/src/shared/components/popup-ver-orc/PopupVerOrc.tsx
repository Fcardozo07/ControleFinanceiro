import { Box, Button, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import api from "../../services/axios";
import CheckIcon from '@mui/icons-material/Check';


import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Dentro do seu componente


interface IEntrada {
    id: number;
    id_conta: number;
    id_descricaoEntrada: number;
    valorItem: number;
    pago: boolean;
    descricaoEntrada: {
    id: number;
    descricaoEntrada: string;
  }
}

interface ISaida {
    id: number;
    id_conta: number;
    id_descricaoSaida: number;
    valorItem: number;
    pago: boolean;
    descricaoSaida: {
    id: number;
    descricaoSaida: string;
  }
}

interface IPopupVerOrc {
    open: boolean;
    onClose: () => void;
    entradas: IEntrada[];        
    saidas: ISaida[];
    descricoes: { id: number; descricaoEntrada: string }[];
    descricoesSaida: { id: number; descricaoSaida: string }[];
}
interface EntradaItem {
    id_conta: number;
    id_descricaoEntrada: number;
    valorItem: number;
    pago: boolean;
}
interface SaidaItem {
    id_conta: number;
    id_descricaoSaida: number;
    valorItem: number;
    pago: boolean;
}

export const PopupVerOrc: React.FC<IPopupVerOrc> = ({ open, onClose, entradas, descricoes, saidas, descricoesSaida }) => {
    const [listaSaidas, setListaSaidas] = useState<ISaida[]>(saidas);
    const [listaEntradas, setListaEntradas] = useState<IEntrada[]>(entradas);
    const [itensEntrada, setItensEntrada] = useState<EntradaItem[]>([]);    
    const [itensSaida, setItensSaida] = useState<SaidaItem[]>([]);
    const totalValor = entradas.reduce((acc, item) => acc + Number(item.valorItem || 0), 0);
    const totalValorSaida = saidas.reduce((acc, item) => acc + Number(item.valorItem || 0), 0);
    const saldo = totalValor - totalValorSaida;
    const reportRef = useRef(null);
    
    const handleUpdateSaida = async (idSaida: number) => {
    try {
        await api.put(`/saida/${idSaida}`, { pago: true });

        // Atualizar localmente a lista de saídas
        setListaSaidas(prev =>
            prev.map(saida =>
                saida.id === idSaida ? { ...saida, pago: true } : saida
            )
        );
    } catch (error) {
        console.error('Erro ao atualizar saída como paga:', error);
    }
};
    const handleUpdateEntrada = async (idEntrada: number) => {
        try {
            await api.put(`/entrada/${idEntrada}`, { pago: true });

            // Atualizar localmente a lista de entradas
            setListaEntradas(prev =>
                prev.map(entrada =>
                    entrada.id === idEntrada ? { ...entrada, pago: true } : entrada
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar entrada como paga:', error);
        }
    };

const handleGeneratePdf = async () => {
    if (!reportRef.current) return;

    const element = reportRef.current as HTMLElement;

    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.maxHeight = "none";
    clonedElement.style.height = element.scrollHeight + "px";
    clonedElement.style.overflow = "visible";
    clonedElement.style.position = "absolute";
    clonedElement.style.top = "-9999px";
    clonedElement.style.left = "-9999px";
    clonedElement.style.width = element.offsetWidth + "px";

    document.body.appendChild(clonedElement);

    const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff", // previne fundo transparente
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const pageHeight = pdf.internal.pageSize.getHeight();
    let position = 0;

    while (position < pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, -position, pdfWidth, pdfHeight);
        position += pageHeight;
        if (position < pdfHeight) {
            pdf.addPage();
        }
    }

    document.body.removeChild(clonedElement);
    pdf.save("relatorio-mensal.pdf");
};


    useEffect(() => {
    if (open) {
        setListaSaidas(saidas);
        setListaEntradas(entradas);
    }
    }, [open, saidas, entradas]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
        
              
            <DialogTitle
                sx={{ backgroundColor: "gray" }}
                color="white"
                textAlign={"center"}
            >
                Relatório do Mês
            </DialogTitle>
            <DialogContent
                sx={{
                    maxHeight: "80vh",
                    overflowY: "auto",
                    scrollbarWidth: "none", // Firefox
                    '&::-webkit-scrollbar': {
                    display: 'none' // Chrome, Safari e Edge
                    }
                }}
                >

                <div
                    ref={reportRef}
                    style={{
                    padding: "20px",
                    }}
                >

                <Box display={"flex"} justifyContent={"center"} margin={2}>
                    <Typography variant="h6" color="black">
                        Entradas
                    </Typography>
                </Box>

                <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow  sx={{ backgroundColor: '#e0e0e0',  fontWeight: 'bold' }}>
                                <TableCell sx={{color: 'black'}}>ID Entrada</TableCell>
                                <TableCell sx={{color: 'black'}}>Descrição</TableCell>
                                <TableCell sx={{color: 'black'}}>Valor</TableCell>
                                <TableCell sx={{color: 'black'}}>Recebido</TableCell>
                                <TableCell sx={{color: 'black'}}>Marcar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaEntradas.map((Entrada) => (
                                <TableRow key={Entrada.id}>
                                    <TableCell>{Entrada.id}</TableCell>
                                    <TableCell>
                                    {
                                        descricoes.find(desc => desc.id === Entrada.id_descricaoEntrada)?.descricaoEntrada || "Descrição não encontrada"
                                    }
                                    </TableCell>

                                    <TableCell>R$ {Entrada.valorItem.toFixed(2)}</TableCell>
                                    <TableCell>{Entrada.pago ? "Sim" : "Não"}</TableCell>
                                    <TableCell>
                                        {Entrada.pago ? (
                                            <Typography variant="body2" color="textSecondary">Recebido</Typography>
                                        ) : (
                                            <Button
                                                startIcon={<CheckIcon/>}
                                                size="small"
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleUpdateEntrada(Entrada.id)}
                                            >
                                                {Entrada.pago ? "Recebido" : "Receber"}
                                            </Button>
                                        )}
                                   

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                            <TableCell
                            sx={{
                             fontWeight: "Bold",
                             fontSize: 20   
                            }}
                            ><strong>Total</strong></TableCell>
                            <TableCell
                                sx={{
                             fontWeight: "Bold",
                             fontSize: 20   
                            }}
                            ><strong>R$ {totalValor.toFixed(2)}</strong></TableCell>
                        </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <Box display={"flex"} justifyContent={"center"} margin={2}>
                    <Typography variant="h6" color="black">
                        Saidas
                    </Typography>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow  sx={{ backgroundColor: '#e0e0e0',  fontWeight: 'bold' }}>
                                <TableCell sx={{color: 'black'}}>ID Saida</TableCell>
                                <TableCell sx={{color: 'black'}}>Descrição</TableCell>
                                <TableCell sx={{color: 'black'}}>Valor</TableCell>
                                <TableCell sx={{color: 'black'}}>Pago</TableCell>
                                <TableCell sx={{color: 'black'}}>Pagar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaSaidas.map((saida) => (
                                <TableRow key={saida.id}>
                                    <TableCell>{saida.id}</TableCell>
                                    <TableCell>
                                    {
                                        descricoesSaida.find(desc => desc.id === saida.id_descricaoSaida)?.descricaoSaida || "Descrição não encontrada"
                                    }
                                    </TableCell>

                                    <TableCell>R$ {saida.valorItem.toFixed(2)}</TableCell>
                                    <TableCell>{saida.pago ? "Sim" : "Não"}</TableCell>
                                    <TableCell>
                                        {saida.pago ? (
                                            <Typography variant="body2" color="textSecondary">Já pago</Typography>
                                        ) : (
                                            <Button
                                                startIcon={<CheckIcon/>}
                                                size="small"
                                                variant="contained"
                                                color="success"
                                                onClick={() => handleUpdateSaida(saida.id)}
                                            >
                                                {saida.pago ? "Pago" : "Pagar"}
                                            </Button>
                                        )}
                                   

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                            <TableCell
                            sx={{
                             fontWeight: "Bold",
                             fontSize: 20   
                            }}
                            ><strong>Total</strong></TableCell>
                            <TableCell
                                sx={{
                             fontWeight: "Bold",
                             fontSize: 20   
                            }}
                            ><strong>R$ {totalValorSaida.toFixed(2)}</strong></TableCell>
                        </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <Box display={"flex"} justifyContent={"center"} margin={2}>
                    <Typography variant="h4"
                    sx={saldo < 0 ? { color: "red" } : { color: "#6bed96" }}
                    >
                        Total Geral: R$ {saldo.toFixed(2)}
                    </Typography>
                </Box>
                      </div>
            </DialogContent>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={2}
                mt={2}
                margin={2}
            >                
                <Button onClick={handleGeneratePdf} variant="contained" color="primary">
                    Gerar PDF
                </Button>
                <Button onClick={onClose} variant="contained" color="error">Fechar</Button>

            </Box>
        </Dialog>
    );
}
