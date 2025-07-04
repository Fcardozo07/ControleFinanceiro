import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material"
import React from "react";


interface IFerramentasDeDetalheProps {
textoBotaoNovo?: string;
desabilitarBotaoSalvar?: boolean;

mostrarBotaoNovo?: boolean;
mostarBotaoVoltar?: boolean;
mostarBotaoSalvar?: boolean;
mostarBotaoSalvarVoltar?: boolean;
mostrarBotaoOrcMensal?: boolean;

mostrarBotaoNovoCarregando?: boolean;
mostarBotaoVoltarCarregando?: boolean;
mostarBotaoSalvarCarregando?: boolean;
mostarBotaoSalvarVoltarCarregando?: boolean;
mostrarBotaoOrcMensalCarregando?: boolean;

aoClicarEmNovo?: () => void;
aoClicarEmVoltar?: () => void;
aoClicarEmSalvar?: () => void;
aoClicarEmSalvarVoltar?: () => void;
aoClicarEmOrcMensal?: () => void;

}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = "Novo",

    mostrarBotaoNovo = true,
    mostarBotaoVoltar = true,
    mostarBotaoSalvar = true,
    mostarBotaoSalvarVoltar = false,
    mostrarBotaoOrcMensal = true,
    desabilitarBotaoSalvar =  false,

    mostrarBotaoNovoCarregando = false,
    mostarBotaoVoltarCarregando = false,
    mostarBotaoSalvarCarregando = false,
    mostarBotaoSalvarVoltarCarregando = false,
    mostrarBotaoOrcMensalCarregando = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmSalvar,
    aoClicarEmSalvarVoltar,
    aoClicarEmOrcMensal,

}) => {
    const theme = useTheme();
    const smdown = useMediaQuery(theme.breakpoints.down('sm'));
    const mddown = useMediaQuery(theme.breakpoints.down('md'));
   
    return(
        <Box
        height={theme.spacing(5)}
        marginX={1}
        padding={1}
        paddingX={2}
        display="flex"
        gap={1}
        component={Paper}
        alignItems="center"
        >
        

        {(mostarBotaoSalvar && !mostarBotaoSalvarCarregando) && (
            <Button
            color="primary"
            variant="contained"
            disableElevation
            startIcon={<Icon>save</Icon>}
            onClick={aoClicarEmSalvar} 
            disabled={desabilitarBotaoSalvar} 
            >
            <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                Salvar
            </Typography>
            </Button> 
        )}

        {mostarBotaoSalvarCarregando && (
            <Skeleton width={110} height={60} />
        )}

        {(mostarBotaoSalvarVoltar && !mostarBotaoSalvarVoltarCarregando && !smdown && !mddown)  && (
            <Button
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<Icon>save</Icon>} 
            onClick={aoClicarEmSalvarVoltar} 
            >
            <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                Salvar e Voltar
            </Typography>
         
            </Button>
            
        )}

        {(mostarBotaoSalvarVoltarCarregando && !smdown && !mddown) && (
            <Skeleton width={110} height={60} />
        )}


        {(mostrarBotaoOrcMensal && !mostrarBotaoOrcMensalCarregando) && (
            <Button
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<Icon>calendar_month</Icon>} 
            onClick={aoClicarEmOrcMensal} 
            >
            <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"  }>
                Consultar orçamentos por mês
            </Typography>
          
            </Button>
        )}

        {mostrarBotaoOrcMensalCarregando && (
            <Skeleton width={110} height={60} />
        )}



        {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando  && !smdown  ) && (
            <Button
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<Icon>add</Icon>}  
            onClick={aoClicarEmNovo}
            >
            <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                {textoBotaoNovo}
            </Typography>
            </Button>
        )}

        {(mostrarBotaoNovoCarregando && !smdown) && (
            <Skeleton width={110} height={60} />
        )}


        {(
            mostarBotaoVoltar &&
            (mostrarBotaoNovo || mostarBotaoSalvar || mostarBotaoSalvarVoltar || mostrarBotaoOrcMensal)
        ) &&(
            <Divider variant="middle" orientation="vertical" />
        )}

        {(mostarBotaoVoltar && !mostarBotaoVoltarCarregando) && (
            <Button
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<Icon>arrow_back</Icon>}  
            onClick={aoClicarEmVoltar}
            >
            <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                Voltar
            </Typography>
            </Button>
        )}

        {mostarBotaoVoltarCarregando && (
            <Skeleton width={110} height={60} />
        )}

            
        </Box>
    )
}