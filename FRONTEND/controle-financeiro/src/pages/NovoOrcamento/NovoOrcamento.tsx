import { Box, Button, Container, Divider, FormControl, Icon, InputLabel, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { FerramentasDeDetalhe, PopupEntradas, PopupSaidas } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts/LayoutBaseDepaginas";
import { useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
import api from "../../shared/services/axios";

import { Select, MenuItem } from "@mui/material";

import { useNavigate } from "react-router-dom";


interface DescricaoItem {
  id: number;
  descricaoEntrada: string;
}

interface DescricaoSaidaItem {
  id: number;
  descricaoSaida: string;
}

interface IItemConta{
    id: number;
    data: string;
}

interface EntradaItem {
    id: number;
    id_conta: number;
    id_descricaoEntrada: number;
    valorItem: number;
    pago: boolean;
    id_usuario: number;


}
interface SaidaItem {
    id: number;
    id_conta: number;
    id_descricaoSaida: number;
    valorItem: number;
    pago: boolean;
    id_usuario: number;

}


export const NovoOrcamento = () => {

    const [descricaoEntrada, setDescricaoEntrada] = useState<DescricaoItem[]>([]);
    const [descricaoSaida, setDescricaoSaida] = useState<DescricaoSaidaItem[]>([]);
    const [idDescricaoEntrada, setIdDescricaoEntrada] = useState<string | number>("");
    const [idDescricaoSaida, setIdDescricaoSaida] = useState<string | number>("");
    const [id, setId] = useState<IItemConta[]>([]);
    const [data, setData] = useState<IItemConta[]>([]);
    const [valorEntrada, setValorEntrada] = useState<string | number>("");
    const [valorSaida, setValorSaida] = useState<string | number>("");
    const [isContaCriada, setIsContaCriada] = useState(false);
    const [idConta, setIdConta] = useState<number | null>(null);
    const [itensEntrada, setItensEntrada] = useState<EntradaItem[]>([]);
    const [itensSaida, setItensSaida] = useState<SaidaItem[]>([]);
    const [popupOpenEntrada, setPopupOpenEntrada] = useState(false);
    const [popupOpenSaida, setPopupOpenSaida] = useState(false);

    const totalValor = itensEntrada.reduce((acc, item) => acc + Number(item.valorItem || 0), 0);
    const totalValorSaida = itensSaida.reduce((acc, item) => acc + Number(item.valorItem || 0), 0);
    const [descricaoEntradas, setDescricaoEntradas] = useState([]);
    const [descricaoSaidas, setDescricaoSaidas] = useState([]);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const usuarioId = sessionStorage.getItem("id");

    const saldoTotal = totalValor - totalValorSaida;

    //Popup Cadastrar Entrada
    const handleOpenPopup = () => {
    
        setPopupOpenEntrada(true);
    };
    
    const handleClosePopup = () => {
        setPopupOpenEntrada(false);
    };

    //Popup Cadastrar Saida
    const handleOpenPopupSaida = () => {
    
        setPopupOpenSaida(true);
    };
    
    const handleClosePopupSaida = () => {
        setPopupOpenSaida(false);
    };






    const atualizarDescricoesEntrada = async () => {
    try {
        const response = await api.get("/descricaoEntrada", {
            params: { id_usuario: usuarioId }
        });
        setDescricaoEntrada(response.data);
        console.log("Descrições atualizadas:", response.data);
    } catch (error) {
        console.error("Erro ao atualizar descrições:", error);
    }
    };

    const atualizarDescricoesSaida = async () => {
    try {
        const response = await api.get("/descricaoSaida", {
            params: { id_usuario: usuarioId }
        });
        setDescricaoSaida(response.data);
        console.log("Descrições atualizadas:", response.data);
    } catch (error) {
        console.error("Erro ao atualizar descrições:", error);
    }
    };

    // Função para buscar as descrições
    const fetchDescricoes = async () => {
    try {
        const response = await api.get("/descricaoEntrada", {
            params: { id_usuario: usuarioId }
        });
        const response2 = await api.get("/descricaoSaida", {
            params: { id_usuario: usuarioId }
        });
        setDescricaoEntradas(response.data);
        setDescricaoSaidas(response2.data);
        console.log("Descrições:", response.data);
    } catch (error) {
        console.error("Erro ao buscar descrições:", error);
    }
    };



    useEffect(() => {
    fetchDescricoes();
    }, []);


const handleCriarConta = async () => {
  const id_usuario = sessionStorage.getItem("id"); // pega o id do usuário logado

  const newConta = {
    data: new Date().toISOString(),
    id_usuario: Number(id_usuario), // importante: transformar em número se o backend espera integer
  };

  try {
    const response = await api.post("/contas", newConta);
    console.log("Conta criada com sucesso:", response.data);
    setIdConta(response.data.id);
    setIsContaCriada(true); // 🔓 Libera o Select
    await carregarItensDaConta(response.data.id);
  } catch (error) {
    console.error("Erro ao criar conta:", error);
  }
};


            const handleAdicionarItemEntrada = async () => {
            if (!idConta) {
                console.error("Conta não criada ainda.");
                return;
            }

            const novoItem: EntradaItem = {
                id: 0,
                id_conta: idConta,
                id_descricaoEntrada: Number(idDescricaoEntrada),
                valorItem: Number(valorEntrada),
                pago: false,
                id_usuario: Number(usuarioId)
            };

            console.log("Tentando enviar item de entrada:", novoItem);

            if (isNaN(novoItem.id_descricaoEntrada) || isNaN(novoItem.valorItem)) {
                console.error("Dados inválidos:", novoItem);
                return;
            }

            try {
                const response = await api.post("/entrada", novoItem);
                 setValorEntrada('')
                console.log("Item de entrada adicionado com sucesso:", response.data);
                await carregarItensDaConta(idConta);
            } catch (error) {
                console.error("Erro ao adicionar item de entrada:", error);
            }
            };
  
        
        const handleAdicionarItemSaida = async () => {

        if (!idConta) {
            console.error("Conta não criada ainda.");
            return;
            }

        if (idDescricaoSaida) {
            const novoItem: SaidaItem = {
                id: 0,
                id_conta: idConta as number, // ou verifique se é null antes
                id_descricaoSaida: Number(idDescricaoSaida),
                valorItem: Number(valorSaida),
                pago: false,
                id_usuario: Number(usuarioId)
            };
            try {
                const response = await api.post("/saida", novoItem);
                setValorSaida('')
                console.log("Item de Saida adicionado com sucesso:", response.data);
                await carregarItensDaConta(idConta);

            } catch (error) {
                console.error("Erro ao adicionar item de saida:", error);
            }
        }   
        }

    useEffect(() => {
        async function fetchData() {
            try {
                const descEntrada = await api.get("/descricaoEntrada", {
                    params: { id_usuario: usuarioId }
                });
                const descSaida = await api.get("/descricaoSaida", {
                    params: { id_usuario: usuarioId }
                });

                console.log("Descrição de Entrada:", descEntrada.data);
                console.log("Descrição de Saída:", descSaida.data);

                setDescricaoEntrada(descEntrada.data);
                setDescricaoSaida(descSaida.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

        const carregarItensDaConta = async (idConta: number) => {
            try {
                const [resEntradas , resSaidas] = await Promise.all([
                    api.get(`/entrada/${idConta}`), // Exemplo de endpoint
                    api.get(`/saida/${idConta}`),                    
                ]);
                setItensEntrada(resEntradas.data);
                setItensSaida(resSaidas.data);
            } catch (error) {
                console.error("Erro ao carregar itens da conta:", error);
            }
        };

        const handleUpdateConta = async () => {
        if (itensEntrada.length === 0 && itensSaida.length === 0) {
            enqueueSnackbar("Adicione pelo menos uma entrada ou saída antes de salvar.", { variant: "warning" });
            return;
        }

        try {
            const response = await api.put(`/contas/${idConta}`, {
            valorTotal: saldoTotal,
            });
            enqueueSnackbar("Orçamento mensal cadastrado com sucesso!", { variant: "success" });
            navigate("/pagina-inicial");
            console.log("Conta atualizada com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao atualizar conta:", error);
            enqueueSnackbar("Erro ao salvar o orçamento.", { variant: "error" });
        }
        };


    const handleDeleteEntrada = async (id: number) => {
           const confirmDelete = window.confirm("Tem certeza que deseja apagar esta entrada?");
        if (!confirmDelete) {
            return;
        }
        try {
            await api.delete(`/entrada/${id}`);
                   if (idConta !== null) {
            await carregarItensDaConta(idConta); // Agora é seguro
        }
            alert("Entrada deletada com sucesso!");
            console.log("Entrada deletada com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar entrada:", error);
        }
    };

    const handleDeleteSaida = async (id: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja apagar esta saida?");
        if (!confirmDelete) {
            return;
        }
        try {
            await api.delete(`/saida/${id}`);
            if (idConta !== null) {
            await carregarItensDaConta(idConta); // Agora é seguro
        }
            alert("Saida deletada com sucesso!");
            console.log("Saida deletada com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar saida:", error);
        }
    };





    return (
        <LayoutBaseDePaginas
            titulo="Novo Orçamento"
            barraDeFerramentas={<FerramentasDeDetalhe
                mostrarBotaoNovo={false}
                mostrarBotaoOrcMensal={false}
                mostarBotaoSalvar={false}
                mostarBotaoSalvarVoltar={false}
                mostarBotaoVoltar={true}
                textoBotaoNovo="Novo Orçamento mensal"
                aoClicarEmVoltar={() => navigate("/pagina-inicial")}
            />}
        >
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

            <PopupEntradas
            open={popupOpenEntrada}
            onClose={handleClosePopup}
            onUpdate={fetchDescricoes}
            onSalvoComSucesso={atualizarDescricoesEntrada}
            />

            <PopupSaidas
            open={popupOpenSaida}
            onClose={handleClosePopupSaida}
            onUpdate={fetchDescricoes}
            onSalvoComSucesso={atualizarDescricoesSaida}
            />
        </LayoutBaseDePaginas>
    );
}
