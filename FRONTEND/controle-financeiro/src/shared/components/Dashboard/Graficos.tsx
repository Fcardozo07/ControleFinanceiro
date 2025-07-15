import { Box, useMediaQuery, useTheme } from "@mui/material"
import Chart from "react-google-charts"
import { IGraficosProps } from "../../types/Dashboard/type";


export const Graficos: React.FC<IGraficosProps> = ({
    chartDataFinal, dadosGraficoPizza
}) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

    return(
<>
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
</>
    )
}