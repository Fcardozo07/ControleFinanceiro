/* eslint-disable react/jsx-no-undef */

import {
  Box,
  CssBaseline,
  GlobalStyles,
  Icon,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useDrawerContext } from "../contexts";
import { useAppThemeContext } from "../contexts/ThemeContext";

type layoutBaseDepaginasProps = {
  children: React.ReactNode;
  titulo: string;
  barraDeFerramentas?: React.ReactNode;
};


export const LayoutBaseDePaginas: React.FC<layoutBaseDepaginasProps> = ({

  
  children,
  titulo,
  barraDeFerramentas,
}) => {
  const theme = useTheme();
  const smdown = useMediaQuery(theme.breakpoints.down("sm"));
  const mddown = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleDrawerOpen } = useDrawerContext();
  const { themeName } = useAppThemeContext();
  const backgroundSrc = themeName === "dark"
    ? "/assets/images/contabilidadeBlack.jpg"
    : "/assets/images/fundoClaro.png";
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "html, body, #root": {
            margin: 0,
            padding: 0,
            overflowX: "hidden",
            boxSizing: "border-box",
          },
          "*": {
            boxSizing: "inherit",
          },
        }}
      />

        {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        gap={1}
        sx={{
          backgroundImage: `url(${backgroundSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          padding={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height={theme.spacing(smdown ? 6 : mddown ? 8 : 12)}
        >
          {/* Lado esquerdo: ícone e logo */}
          <Box display="flex" alignItems="center" gap={1}>
            {smdown && (
              <IconButton onClick={toggleDrawerOpen}>
                <Icon>menu</Icon>
              </IconButton>
            )}


          </Box>

          {/* Título à direita */}
          <Typography
            variant={smdown ? "h6" : mddown ? "h5" : "h4"}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            fontStyle="italic"
            fontWeight="bold"
          >
            {/* {titulo} */}
          </Typography>
        </Box>

        {/* Barra de ferramentas */}
      

        {/* Conteúdo principal */}
        <Box flex={1} overflow="auto">
          {children}
        </Box>
      </Box>
    </>
  );
};
