import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Icon, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import React, { useState } from "react";
import api from "../../services/axios";



interface IPopupSaidasProps{
    open: boolean;
    onClose: () => void;
    onUpdate: () => void;
    onSalvoComSucesso: () => void;
}

type DescricoesSaida = {
    id: number;
    descricaoSaida: string;
}

export const PopupSaidas: React.FC<IPopupSaidasProps> = ({open, onClose, onUpdate, onSalvoComSucesso}) => {
   
const [descricaoSaida, setDescricaoSaida] = useState('');
const [descricoesSaida, setDescricoesSaida] = useState<DescricoesSaida[]>([]); 
const [descricaoIdSelecionada, setDescricaoIdSelecionada] = useState<number | null>(null); // novo estado
const usuarioId = Number(sessionStorage.getItem("id"));


async function getData() {
    try {
        const response = await api.get('descricaoSaida', {
            params: { id_usuario: usuarioId }
        });
        setDescricoesSaida(response.data);
        console.log(response.data);
    } catch (error) {
            console.log("Erro ao buscar dados"+ error);
            alert("Erro ao buscar dados")
    }
}

React.useEffect(() => {
    getData();
}, []);


    const handleSalvarOuAtualizar = async () => {
        if (!descricaoSaida.trim()) {
            alert("Preencha a descrição.");
            return;
        }
        if (descricaoIdSelecionada) {
            // Atualizar
            try {
                await api.put(`/descricaoSaida/${descricaoIdSelecionada}`, { descricaoSaida },);
                onUpdate();
                onSalvoComSucesso?.();
                setDescricaoSaida('');
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
                await api.post('/descricaoSaida', { descricaoSaida, id_usuario: usuarioId  });
                onUpdate();
                onSalvoComSucesso?.();
                setDescricaoSaida('');
                getData();
                alert("Descrição cadastrada com sucesso!");
            } catch (error) {
                console.error("Erro ao cadastrar:", error);
                alert("Erro ao cadastrar descrição.");
            }
        }
    }


    const handledeletarDescricaoSaida = async (id: number) => {
        const confirmDelete = window.confirm("Ao apagar, certifique de que esta descrição não foi usada, pois poderá comprometer lançamentos anteriores. Deseja continuar?");
        if (confirmDelete) {
            try {
                await api.delete(`descricaoSaida/${id}`);
                onUpdate();
                getData();
                alert("Descrição de Saida excluída com sucesso");
            } catch (error) {
                console.log("Erro ao excluir descrição de Saida", error);
                alert("Erro ao excluir descrição de Saida");
            }
        }   

    }
   
    return(
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth> 
        <DialogTitle
            sx={{backgroundColor: "gray" }}
            color="white"
            textAlign={'center'}
        >
            Cadastrar Saida
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
                        <InputLabel sx={{minWidth: 200}}>Descriçao da Saida</InputLabel>
                        <TextField
                         variant="outlined" 
                         size="small" 
                         fullWidth
                         value={descricaoSaida}
                         onChange={(e) => setDescricaoSaida(e.target.value)}
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
                            {descricoesSaida.map((descSaida, index) => (
                            <TableRow key={index}>
                            <TableCell>{descSaida.descricaoSaida}</TableCell>
                            <TableCell>
                                <Box display="flex" gap={4}>
                                <Icon color="error" sx={{ cursor: 'pointer' }} onClick={() => handledeletarDescricaoSaida(descSaida.id)}>delete</Icon>
                                </Box>
                            </TableCell>
                             <TableCell>
                                <Box display="flex" gap={4}>
                                <Icon
                                    color="success"
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        setDescricaoSaida(descSaida.descricaoSaida);
                                        setDescricaoIdSelecionada(descSaida.id);
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
                                setDescricaoSaida('');
                                setDescricaoIdSelecionada(null )
                                onClose()
                            }}
                        variant="outlined"
                        color="error">
                        Fechar
                    </Button>
                    <Button
                    onClick={handleSalvarOuAtualizar}
                    variant="contained" color="success">
                        {descricaoIdSelecionada ? "Atualizar" : "Salvar"}
                    </Button>
            </Box>

        </DialogContent>

    </Dialog>

   )
}
