import {  Box, Typography, useTheme } from "@mui/material";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts/LayoutBaseDepaginas";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "../../shared/hooks/Dashboard/useDashboardData";
import { BalancoGrids } from "../../shared/components/Dashboard/BalancoGrids";
import { EmAbertoGrids } from "../../shared/components/Dashboard/EmAbertoGrids";
import { Graficos } from "../../shared/components/Dashboard/Graficos";

export const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  const hook = useDashboardData();
    
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

        <BalancoGrids
        contaMaisAlta={hook.contaMaisAlta}
        contaMaisBaixa={hook.contaMaisBaixa}
        mediaContas={hook.mediaContas}
        dataConta={hook.dataConta}
        />
        
        <EmAbertoGrids
        entradasSemReceber={hook.entradasSemReceber}
        saidasSemPagar={hook.saidasSemPagar}
        obterDescricaoEntrada={hook.obterDescricaoEntrada}
        obterDescricaoSaida={hook.obterDescricaoSaida}
        />

        <Graficos
        chartDataFinal={hook.chartDataFinal}
        dadosGraficoPizza={hook.dadosGraficoPizza}
        />

        </Box>

        </LayoutBaseDePaginas>
    );
}
