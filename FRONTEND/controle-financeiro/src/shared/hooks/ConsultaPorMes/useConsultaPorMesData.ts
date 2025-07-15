import { useEffect, useState } from "react";
import api from "../../services/axios";
import { IContas, IDescricaoEntrada, IDescricaoSaida, IEntrada, ISaida } from "../../types/ConsultaPosMes/types";


export const useConsultaPorMesData = () => {
    
    const usuarioId = Number(sessionStorage.getItem("id"));
    const [descricoes, setDescricoes] = useState<IDescricaoEntrada[]>([]);
    const [descricoesSaida, setDescricoesSaida] = useState<IDescricaoSaida[]>([]);
    const [contas, setContas] = useState<IContas[]>([]);
    const [popupVerOrc, setPopupVerOrc] = useState(false);
    const [entradas, setEntradas] = useState<IEntrada[]>([]);
    const [saidas, setSaidas] = useState<ISaida[]>([]);
    

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

    
    return{
        descricoes,
        descricoesSaida,
        contas,
        popupVerOrc,
        entradas,
        saidas,
        handleVerEntradas,
        handleClosePopup
    }
}