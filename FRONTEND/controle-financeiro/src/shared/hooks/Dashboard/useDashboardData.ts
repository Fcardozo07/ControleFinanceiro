import { useEffect, useState } from "react";
import { Conta, DescricoesEntrada, DescricoesSaida, Entrada, Saida } from "../../types/Dashboard/type";
import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";



export const useDashboardData = () =>{

  const usuarioId = Number(sessionStorage.getItem("id"));
  const [contas, setContas] = useState([]);
  const [contaMaisAlta, setContaMaisAlta] = useState(0);
  const [contaMaisBaixa, setContaMaisBaixa] = useState(0);
  const [dataConta, setDataConta] = useState("");
  const [mediaContas, setMediaContas] = useState(0);
  const [descricaoEntrada, setDescricaoEntrada] = useState('');
  const [descricoesEntrada, setDescricoesEntrada] = useState<DescricoesEntrada[]>([]);
  const [descricoesSaida, setDescricoesSaida] = useState<DescricoesSaida[]>([]);
  const [descricaoSaida, setDescricaoSaida] = useState('');
  const [entrada, setEntrada] = useState<Entrada[] >([]);
  const [saida, setSaida] = useState<Saida[]>([]);
  const [entradasSemReceber, setEntradasSemReceber] = useState<Entrada[]>([]);
  const [saidasSemPagar, setSaidasSemPagar] = useState<Saida[]>([]);  
  const [dadosGrafico, setDadosGrafico] = useState<[Date, number][]>([]);
  const [dadosGraficoPizza, setDadosGraficoPizza] = useState<(string | number)[][]>([
    ['Categoria', 'Valor'],
  ]);



function obterDescricaoEntrada(id: number): string {
  const descricao = descricoesEntrada.find((desc) => desc.id === id);
  return descricao ? descricao.descricaoEntrada : '—';
}

function obterDescricaoSaida(id: number): string {
  const descricao = descricoesSaida.find((desc) => desc.id === id);
  return descricao ? descricao.descricaoSaida : '—';
}

// Função para formatar a data no formato MM/AAAA
function formatarDataParaMesAno(dataISO: string): string {
  const data = new Date(dataISO);
  const mes = String(data.getMonth() + 1).padStart(2, '0'); // +1 porque janeiro é 0
  const ano = data.getFullYear();
  return `${mes}/${ano}`;
}


useEffect(() => {
  async function getData() {
    try {
      const response = await api.get('/contas', {
        params: { id_usuario: usuarioId }
      });
      const contasFiltradas = response.data.filter((conta: Conta) => conta.valorTotal !== null && conta.valorTotal > 0);
      setContas(contasFiltradas);


      const maisAlta = response.data.reduce(
        (prev: any, current: any) => (current.valorTotal > (prev?.valorTotal || 0) ? current : prev),
        null
      );
      setContaMaisAlta(maisAlta ? maisAlta.valorTotal : 0);
      setDataConta(maisAlta ? formatarDataParaMesAno(maisAlta.data) : '');


      const maisBaixa = response.data.reduce((prev: any, current: any) => {
        if (!prev || current.valorTotal < prev.valorTotal) {
          return current;
        }
        return prev;
      }, null);

      setContaMaisBaixa(maisBaixa ? maisBaixa.valorTotal : 0);

      const totalValores = response.data.reduce(
        (soma: number, item: any) => soma + (item.valorTotal || 0),
        0
      );

      const media = response.data.length > 0 ? totalValores / response.data.length : 0;
      setMediaContas(media);


    } catch (error) {
      console.log("Erro ao buscar dados", error);
      
    }
  }

  getData();
}, []);

useEffect(() => {
  async function getData() {
    try {
      // Requisições principais
      const responseEntradas = await api.get('/entrada', {
        params: { id_usuario: usuarioId }
      });
      const responseSaidas = await api.get('/saida', {
        params: { id_usuario: usuarioId }
      });
      const responseDescricoesEntrada = await api.get('/descricaoEntrada', {
        params: { id_usuario: usuarioId }
      });
      const responseDescricoesSaida = await api.get('/descricaoSaida', {
        params: { id_usuario: usuarioId }
      });

       console.log("Entradas:", responseEntradas.data);
       console.log("Saídas:", responseSaidas.data);


      // Setando todas
      setEntrada(responseEntradas.data);
      setSaida(responseSaidas.data);
      setDescricoesEntrada(responseDescricoesEntrada.data);
      setDescricoesSaida(responseDescricoesSaida.data);

      // Filtrando onde pago é false
      const entradasNaoPagas = responseEntradas.data.filter((item: any) => !item.pago);
      const saidasNaoPagas = responseSaidas.data.filter((item: any) => !item.pago);

      setEntradasSemReceber(entradasNaoPagas);
      setSaidasSemPagar(saidasNaoPagas);

    } catch (error) {
      console.log("Erro ao buscar dados", error);
      
    }
  }

  getData();
}, []);

useEffect(() => {
  async function fetchData() {
    try {
      const response = await api.get<Conta[]>('/contas', {
        params: { id_usuario: usuarioId }
      });
      const contas = response.data;

      // Agrupando os valores por data ignorando hora
      const dadosAgrupados: Record<string, number> = {};

      contas.forEach((item) => {
        const data = new Date(item.data);
        const dataFormatada = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
        dadosAgrupados[dataFormatada] = (dadosAgrupados[dataFormatada] || 0) + item.valorTotal;
      });

      // Criando manualmente o array de [Date, number]
      const dados: [Date, number][] = [];

      for (const [dataStr, valor] of Object.entries(dadosAgrupados)) {
        const dateObj = new Date(dataStr);
        if (!isNaN(dateObj.getTime()) && typeof valor === 'number') {
          dados.push([dateObj, valor]);
        }
      }

      console.table(dados); // Só pra visualizar no console
      setDadosGrafico(dados);
    } catch (error) {
      console.error('Erro ao buscar contas:', error);
    }
  }

  fetchData();
}, []);

const chartDataFinal: (string | number)[][] = [
  ['Data', 'Valor Total'],
  ...dadosGrafico.map(([data, valor]) => [
    `${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`,
    valor,
  ]),
];


  useEffect(() => {
    async function fetchData() {
      try {
        const [resSaida, resDescricao] = await Promise.all([
          api.get<Saida[]>('/saida', {
            params: { id_usuario: usuarioId }
          }),
          api.get<DescricoesSaida[]>('/descricaoSaida', {
            params: { id_usuario: usuarioId }
          }),
        ]);

        const saidas = resSaida.data;
        const descricoes = resDescricao.data;

        // Agrupar os valores por descrição
        const agrupado: Record<string, number> = {};

        saidas.forEach((item) => {
          const descricao = descricoes.find(
            (d) => d.id === item.id_descricaoSaida
          )?.descricaoSaida || 'Sem descrição';

          agrupado[descricao] = (agrupado[descricao] || 0) + item.valorItem;
        });

        // Montar array pro gráfico
        const dados = [
          ['Categoria', 'Valor'], // ✅ Header correto
          ...Object.entries(agrupado)
        ];


        console.log('Dados do gráfico:', dados);

        setDadosGraficoPizza(dados);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    }

    fetchData();
  }, []);

    return{
        usuarioId,
        contas,
        contaMaisAlta,
        contaMaisBaixa,
        dataConta,
        mediaContas,
        descricaoEntrada,
        descricoesEntrada,
        descricoesSaida,
        descricaoSaida,
        entrada,
        saida,
        entradasSemReceber,
        saidasSemPagar,
        dadosGrafico,
        dadosGraficoPizza,
        obterDescricaoEntrada,
        obterDescricaoSaida,
        formatarDataParaMesAno,
        chartDataFinal,
        setDescricaoEntrada,
        setDescricaoSaida,
        setEntrada,
        setSaida,
        setEntradasSemReceber,
        setSaidasSemPagar,
        setDadosGrafico,
        setDadosGraficoPizza,
        setContaMaisAlta,
        setContaMaisBaixa,
        setDataConta,
        setMediaContas,
        setDescricoesEntrada,
        setDescricoesSaida,
        setContas,
    
    }
}