import { useEffect, useState } from "react";
import { DescricaoItem, DescricaoSaidaItem, EntradaItem, IItemConta, SaidaItem } from "../../types/NovoOrcamento/types";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../../services/axios";

export const useNovoOrcamentoData = () => {

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


return{
    descricaoEntrada,
    descricaoSaida,
    idDescricaoEntrada,
    setIdDescricaoEntrada,
    idDescricaoSaida,
    setIdDescricaoSaida,
    id,
    setId,
    data,
    setData,
    valorEntrada,
    setValorEntrada,
    valorSaida,
    setValorSaida,
    isContaCriada,
    setIsContaCriada,
    idConta,
    setIdConta,
    itensEntrada,
    setItensEntrada,
    itensSaida,
    setItensSaida,
    handleCriarConta,
    handleAdicionarItemEntrada,
    handleAdicionarItemSaida,
    handleUpdateConta,
    handleDeleteEntrada,
    handleDeleteSaida,
    handleOpenPopup,
    handleClosePopup,
    handleOpenPopupSaida,
    handleClosePopupSaida,
    totalValor,
    totalValorSaida,
    saldoTotal,
    descricaoEntradas,
    descricaoSaidas,
    popupOpenEntrada,
    popupOpenSaida,
    atualizarDescricoesEntrada,
    atualizarDescricoesSaida,
    fetchDescricoes  
    

}

}