import { Avatar, Box, Card, Grid, Typography, useTheme } from "@mui/material"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import BarChartIcon from '@mui/icons-material/BarChart';
import { IBalancoGridProps } from "../../types/Dashboard/type";

export const BalancoGrids: React.FC<IBalancoGridProps> = ({
   contaMaisAlta, contaMaisBaixa, mediaContas, dataConta
   }) => {
  const theme = useTheme();

    return(
        <>
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
        </>

        
        
    )
}