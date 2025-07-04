import { Box, Container, Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import { FerramentasDeDetalhe, PopupVerOrc } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts/LayoutBaseDepaginas";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../shared/services/axios";



export const ConsultaPorMes = () =>{
    const usuarioId = Number(sessionStorage.getItem("id"));

    interface IContas{
        id: number
        data: string
        valorTotal: number
    }
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

    interface IDescricaoEntrada {
        id: number;
        descricaoEntrada: string;
    }
     interface IDescricaoSaida {
        id: number;
        descricaoSaida: string;
    }

    const [descricoes, setDescricoes] = useState<IDescricaoEntrada[]>([]);
    const [descricoesSaida, setDescricoesSaida] = useState<IDescricaoSaida[]>([]);

    useEffect(() => {
    async function fetchDescricoes() {
        try {
        const response = await api.get('/descricaoEntrada');
        setDescricoes(response.data);
        } catch (error) {
        console.error('Erro ao buscar descrições de entrada:', error);
        }
    }

    fetchDescricoes();
    }, []);

        useEffect(() => {
    async function fetchDescricoesSaida() {
        try {
        const response = await api.get('/descricaoSaida');
        setDescricoesSaida(response.data);
        } catch (error) {
        console.error('Erro ao buscar descrições de Saida:', error);
        }
    }

    fetchDescricoesSaida();
    }, []);

    const navigate = useNavigate();
    const [contas, setContas] = useState<IContas[]>([]);
    const [popupVerOrc, setPopupVerOrc] = useState(false);
    const [entradas, setEntradas] = useState<IEntrada[]>([]);
    const [saidas, setSaidas] = useState<ISaida[]>([]);
    



const handleVerEntradas = async (contaId: number) => {
    try {
        const [resEntradas, resSaidas] = await Promise.all([
            api.get(`/entrada/${contaId}`),
            api.get(`/saida/${contaId}`)
        ]);

        setEntradas(resEntradas.data);
        setSaidas(resSaidas.data);
        setPopupVerOrc(true);
    } catch (error) {
        console.error('Erro ao buscar entradas e saídas:', error);
    }
};


    const handleOpenPopup = () => {
        setPopupVerOrc(true)
    }

    const handleClosePopup = () => {
        setPopupVerOrc(false)
    }


   
        useEffect(() => {
        async function fetchData() {
            try {
            const response = await api.get(`/contas`, {
                params: { id_usuario: usuarioId } // <-- aqui o filtro
            });
            setContas(response.data);
            } catch (error) {
            console.log("Erro ao buscar contas:", error);
            }
        }

        if (usuarioId) fetchData(); // só busca se tiver usuário
        }, [usuarioId]);


    return(
        <LayoutBaseDePaginas
             titulo="Consultar por mês"
                    barraDeFerramentas={<FerramentasDeDetalhe
                        mostrarBotaoNovo={false}
                        mostrarBotaoOrcMensal={false}
                        mostarBotaoSalvar={false}
                        mostarBotaoSalvarVoltar={false}
                        mostarBotaoVoltar={true}
                        aoClicarEmVoltar={() => {navigate("/pagina-inicial")}}                        
                        textoBotaoNovo="Novo Orçamento mensal"
                        aoClicarEmOrcMensal={() => {}}
                    />}
        >
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
          <PopupVerOrc
          open={popupVerOrc}
          onClose={handleClosePopup}
          entradas={entradas}
          saidas={saidas}
          descricoes={descricoes}
          descricoesSaida={descricoesSaida}

          />
        </LayoutBaseDePaginas>
    )
}