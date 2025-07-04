import { Avatar, Box,  Card,  Grid,  Table,  TableBody,  TableCell,  TableContainer,  TableHead,  TableRow,  Typography, useMediaQuery, useTheme } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import BarChartIcon from '@mui/icons-material/BarChart';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import DownloadIcon from '@mui/icons-material/Download';

import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts/LayoutBaseDepaginas";
import { useNavigate } from "react-router-dom";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import api from "../../shared/services/axios";


  
  type DescricoesEntrada = {
    id: number;
    descricaoEntrada: string;
  }
  type DescricoesSaida = {
    id: number;
    descricaoSaida: string;
  }
  type Entrada = {
    id: number;
    id_conta: number;
    id_descricaoEntrada: number;
    valorItem: number;
    pago: boolean;
  }
  type Saida = {
    id: number;
    id_conta: number;
    id_descricaoSaida: number;
    valorItem: number;
    pago: boolean;
  }
type Conta = {
  id: number;
  data: string;
  valorTotal: number;
}



export const Dashboard = () => {
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // detecta celular




const navigate = useNavigate();
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
    return (
        <LayoutBaseDePaginas
        titulo="Dashboard"
        barraDeFerramentas={<FerramentasDeDetalhe
          mostrarBotaoNovo={true}
          mostrarBotaoOrcMensal={true}
          mostarBotaoSalvar={false}
          mostarBotaoSalvarVoltar={false}
          mostarBotaoVoltar={false}
          textoBotaoNovo="Novo Orçamento mensal"
          aoClicarEmNovo={() => navigate("/novo-orcamento")}
          aoClicarEmOrcMensal={() => navigate("/consulta-mes")}

        />}
      >
    <Box
      sx={{ display: "flex", 
      justifyContent: "center",
      marginBottom: 2,
      flexDirection: "column",
     }}>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2, color: theme.palette.text.primary }}>
          <Typography variant="h4"  sx={{ marginBottom: 2, marginLeft: 2 }}>
            Visão geral dos itens
          </Typography>
      </Box>

        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
          <Typography variant="h5" sx={{ marginRight: 2, color: theme.palette.text.primary}}>
           Balanços
          </Typography>
        </Box>
        
        <Box width="100%" display="flex" flexWrap={"wrap"} justifyContent="center">

          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid>
              <Card sx={{ display: "flex", flexDirection: "column", height: "200px", width :"300px", borderRadius: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop:2 }}>
                  <Avatar sx={{ bgcolor: 'green', width: 32, height: 32, marginRight: 1 }}>
                    <AttachMoneyIcon />
                  </Avatar>
                  <Typography variant="h5">Balanço mais alto</Typography>
                </Box>
                <Typography variant="h6" sx={{ margin: 2 }} color={contaMaisAlta > 0 ? "green" : "red"}>
                 {(contaMaisAlta ?? 0).toFixed(2)}
                </Typography>
                <Typography variant="h6" sx={{ margin: 2 }}>
                 Mes/Ano: {dataConta}
                </Typography>
                </Card>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid>
              <Card sx={{ display: "flex", flexDirection: "column", height: "200px", width :"300px", borderRadius: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center',marginTop:2  }}>
                  <Avatar sx={{ bgcolor: 'red', width: 32, height: 32, marginRight: 1 }}>
                    <TrendingDownIcon  />
                  </Avatar>                 
                  <Typography variant="h5">Balanço mais Baixo</Typography>
                </Box>
                <Typography variant="h6" sx={{ margin: 2 }} color={contaMaisBaixa > 0 ? "green" : "red"}>
                 R$ {(contaMaisBaixa ?? 0).toFixed(2)}
                </Typography>
                <Typography variant="h6" sx={{ margin: 2 }}>
                 Mes/Ano: {dataConta}
                </Typography>
                </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid>
              <Card sx={{ display: "flex", flexDirection: "column", height: "200px", width :"300px", borderRadius: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center',marginTop:2  }}>
                  <Avatar sx={{ bgcolor: 'orange', width: 32, height: 32, marginRight: 1 }}>
                    <BarChartIcon  />
                  </Avatar>               
                  <Typography variant="h5">Balanço médio</Typography>
                </Box>
                <Typography variant="h6" sx={{ margin: 2 }} color={mediaContas > 0 ? "green" : "red"}>
                  R$ {(mediaContas ?? 0).toFixed(2)}
                </Typography>

                </Card>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Typography variant="h5" sx={{ marginRight: 2, color: theme.palette.text.primary }}>
            Em aberto
          </Typography>
        </Box>
      <Box width="100%" display="flex" flexWrap={"wrap"} justifyContent="center">
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid>
              <Card sx={{ display: "flex", flexDirection: "column", height: "200px", width :"300px", borderRadius: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center',marginTop:2  }}>                
                  <Avatar sx={{ bgcolor: '#29b6f6', width: 32, height: 32, marginRight: 1 }}>
                    <DownloadIcon />
                  </Avatar>
                  <Typography variant="h5">Receitas não recebidas</Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 200 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id Conta</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Valor</TableCell>                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {entradasSemReceber.map((entrada) => {
                          console.log("Renderizando entrada:", entrada);
                          return (
                            <TableRow key={entrada.id}>
                              <TableCell>{entrada.id_conta}</TableCell>
                              <TableCell>{obterDescricaoEntrada(entrada.id_descricaoEntrada)}</TableCell>
                              <TableCell>
                                R$ {entrada.valorItem !== undefined ? entrada.valorItem.toFixed(2): '0.00'}
                              </TableCell>
                            </TableRow>
                          );
                        })}
  
                    </TableBody>
                  </Table>
                </TableContainer>

                </Card>
            </Grid>
            
          </Grid>
          <Grid container spacing={2} sx={{ padding: 2 }}>
            <Grid>
              <Card sx={{ display: "flex", flexDirection: "column", height: "200px", width :"300px", borderRadius: 5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center',marginTop:2  }}>
                  <Avatar sx={{ bgcolor: '#ef5350', width: 32, height: 32, marginRight: 1 }}>
                    <MoneyOffIcon />
                  </Avatar>                  
                  <Typography variant="h5">Despesas não pagas</Typography>
                </Box>
                <TableContainer sx={{ maxHeight: 200 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id Conta</TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Valor</TableCell>                        
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {saidasSemPagar.map((saida) => (
                        <TableRow key={saida.id}>
                          <TableCell>{saida.id_conta}</TableCell>
                          <TableCell>{obterDescricaoSaida(saida.id_descricaoSaida)}</TableCell>
                          <TableCell>
                            R$ {saida.valorItem !== undefined ? saida.valorItem.toFixed(2) : '0.00'}
                          </TableCell>
                        </TableRow>
                      ))}   
                     
                    </TableBody>
                  </Table>
                </TableContainer>

                </Card>
            </Grid>
            
          </Grid>
          </Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
          >
  <Box width={isMobile ? '100%' : '80%'}>
    <Chart
      chartType="ColumnChart"
      width="100%"
      height={isMobile ? '300px' : '400px'}
      data={chartDataFinal}
      options={{
        backgroundColor: 'transparent',
        title: 'Valores Totais por Data',
        titleTextStyle: {
          color:  theme.palette.text.primary,
          fontSize: isMobile ? 14 : 18,
          bold: true,
        },
        hAxis: {
          title: 'Data',
          textStyle: { color: theme.palette.text.primary, fontSize: isMobile ? 10 : 12 },
          titleTextStyle: { color: theme.palette.text.primary, fontSize: isMobile ? 12 : 14 },
          gridlines: { color: '#444' },
        },
        vAxis: {
          title: 'Valor Total',
          textStyle: { color: theme.palette.text.primary, fontSize: isMobile ? 10 : 12 },
          titleTextStyle: { color: theme.palette.text.primary, fontSize: isMobile ? 12 : 14 },
          gridlines: { color: '#444' },
        },
        legend: 'none',
        colors: ['#00e676'],
        animation: {
          startup: true,
          duration: 1000,
          easing: 'out',
        },
        chartArea: {
          width: isMobile ? '95%' : '85%',
          height: '70%',
        },
      }}
    />
  </Box>
</Box>
<Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop={2}
    >
      <Box width={isMobile ? '100%' : '50%'}>
        <Chart
          chartType="PieChart"
          data={dadosGraficoPizza}
          width="100%"
          height={isMobile ? '300px' : '400px'}
          options={{
            backgroundColor: 'transparent',
            title: 'Despesas por Categoria',
            titleTextStyle: {
             color: theme.palette.text.primary,
              fontSize: isMobile ? 14 : 18,
              bold: true,
            },
            legend: {
              textStyle: { color: theme.palette.text.primary, fontSize: isMobile ? 10 : 12 },
              position: 'right',
              alignment: 'center',
            },
            pieHole: 0.4, // Torna pizza em donut (opcional)
            slices: {
              0: { color: '#00e676' },
              1: { color: '#29b6f6' },
              2: { color: '#ff9800' },
              3: { color: '#ab47bc' },
              4: { color: '#ef5350' },
            },
            chartArea: {
              width: '100%',
              height: '80%',
            },
          }}
        />
      </Box>
    </Box>

        </Box>

        </LayoutBaseDePaginas>
    );
}
