import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Icon, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../services/axios";



interface IPopupEntradasProps{
    open: boolean;
    onClose: () => void;
    onUpdate: () => void;
    onSalvoComSucesso: () => void;
}

type DescricoesEntrada = {
    id: number;
    descricaoEntrada: string;
}


export const PopupEntradas: React.FC<IPopupEntradasProps> = ({open, onClose, onUpdate, onSalvoComSucesso}) => {
const [descricaoEntrada, setDescricaoEntrada] = useState('');
const [descricoesEntrada, setDescricoesEntrada] = useState<DescricoesEntrada[]>([]);
const [descricaoIdSelecionada, setDescricaoIdSelecionada] = useState<number | null>(null); // novo estado
const usuarioId = Number(sessionStorage.getItem("id"));



    async function getData(){
        try {
            const response = await api.get('descricaoEntrada', {
                params: { id_usuario: usuarioId }
            });
            setDescricoesEntrada(response.data);
            console.log(response.data)
        } catch (error) {
            console.log("Erro ao buscar dados"+ error);
            
        }

        }
    
    useEffect(() => {
        getData();
    }, []);

        const HandleSalvarOuAtualizar = async () => {
            if (!descricaoEntrada.trim()) {
                alert("Preencha a descrição.");
                return;
            }

            if (descricaoIdSelecionada) {
                // Atualizar
                try {
                    await api.put(`/descricaoEntrada/${descricaoIdSelecionada}`, { descricaoEntrada });
                    onUpdate();
                    onSalvoComSucesso?.();
                    setDescricaoEntrada('');
                    setDescricaoIdSelecionada(null);
                    getData();
                    alert('Descrição atualizada com sucesso!');
                } catch (error) {
                    console.error('Erro ao atualizar descrição:', error);
                    alert('Erro ao atualizar descrição.');
                }
            } else {
                // Cadastrar novo
                try {
                    await api.post('/descricaoEntrada', { descricaoEntrada, id_usuario: usuarioId });
                    onUpdate();
                    onSalvoComSucesso?.();
                    setDescricaoEntrada('');
                    getData();
                    alert("Descrição cadastrada com sucesso!");
                } catch (error) {
                    console.error("Erro ao cadastrar:", error);
                    alert("Erro ao cadastrar descrição.");
                }
            }
        };


    const handleDeletar = async (id: number) => {
        const confirmDelete = window.confirm('Ao apagar, certifique de que esta descrição não foi usada, pois poderá comprometer lançamentos anteriores. Deseja continuar?');
        if (confirmDelete) {
            try {
                await api.delete(`/descricaoEntrada/${id}`);
                onUpdate();
                getData()
                alert('Descrição de entrada excluída com sucesso');
            } catch (error) {
                console.error('Erro ao excluir descrição de entrada:', error);
                alert('Erro ao excluir descrição de entrada');
            }
        }   
    };



   return(
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth> 
        <DialogTitle
            sx={{backgroundColor: "gray" }}
            color="white"
            textAlign={'center'}
        >
            Cadastrar Entrada
        </DialogTitle>
            <DialogContent>
                <Divider></Divider>

              <Box
              display={'flex'}
              flexDirection={'row'}
              mt={2}
              flexWrap={'wrap'}
              justifyContent={'flex-start'}
              >
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                    <Box display={'flex'} alignItems={'center'} gap={1}>
                        <InputLabel sx={{minWidth: 200}}                         
                        >Descriçao da Entrada</InputLabel>
                        <TextField
                         variant="outlined" 
                         size="small"
                        fullWidth
                        value={descricaoEntrada}
                        onChange={(e) => setDescricaoEntrada(e.target.value)}
                        >                            
                        </TextField>
                    </Box>
                </Box>
                                
              </Box>  

                <Divider sx={{ mt: 2 }} ></Divider>
               <Box mt={2} sx={{ maxHeight: 300, overflowY: 'auto' }}>
                    <TableContainer component={Paper}>
                        <Table size="small"> {/* Tabela menor para caber melhor */}
                        <TableHead>
                            <TableRow>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Apagar</TableCell>
                            <TableCell>Editar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {descricoesEntrada.map((descEntrada, index) => (
                            <TableRow key={index}>
                            <TableCell>{descEntrada.descricaoEntrada}</TableCell>
                            <TableCell>
                                <Box display="flex" gap={4}>
                                <Icon color="error" sx={{ cursor: 'pointer' }} onClick={() => handleDeletar(descEntrada.id)}>delete</Icon>
                                </Box>
                            </TableCell>
                             <TableCell>
                                <Box display="flex" gap={4}>
                                <Icon
                                    color="success"
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setDescricaoEntrada(descEntrada.descricaoEntrada);
                                        setDescricaoIdSelecionada(descEntrada.id);
                                    }}
                                    >
                                    edit
                                    </Icon>

                                </Box>
                            </TableCell>
                            </TableRow>

                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Divider sx={{ mt: 2 }} ></Divider>
            <Box
             display="flex"
             justifyContent="flex-end"
             gap={2}
             mt={2}
       
             >
                    <Button
                    onClick={() => {
                        onClose();
                        setDescricaoEntrada('');
                        setDescricaoIdSelecionada(null);
                    }}
                    variant="outlined"
                    color="error"
                    >
                    Fechar
                    </Button>
                    <Button
                        onClick={HandleSalvarOuAtualizar}
                        variant="contained"
                        color="success"
                    >
                    {descricaoIdSelecionada ? "Atualizar" : "Salvar"}
                    </Button>

            </Box>

        </DialogContent>

    </Dialog>

   )
}
    