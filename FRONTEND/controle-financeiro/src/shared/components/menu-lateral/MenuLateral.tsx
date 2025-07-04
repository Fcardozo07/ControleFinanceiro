
import {  Box, Collapse, Divider, Drawer, Icon, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useState } from "react"; 
import { PopupEntradas } from "../popup-entradas/PopupEntradas";
import { PopupSaidas } from "../popup-saidas/PopupSaidas";
import api from "../../services/axios";
import { AlternarTema } from "../AlternarTema/AlternarTema";
import { FotoUsuario } from "../FotoUsuario/FotoUsuario";
import useFotoUsuario from "../../hooks/FotoUsuario/useFotoUsuario"; // importa


interface IMenuLateralProps {
    children?: React.ReactNode;
};

interface IMenuLateralItemProps {
to: string;
icon: string;
label: string;
onClick: (() => void) | undefined;
}
interface DescricaoItem {
  id: number;
  descricaoEntrada: string;
}

interface DescricaoSaidaItem {
  id: number;
  descricaoSaida: string;
}
const ListItemLink: React.FC<IMenuLateralItemProps> = ({to, icon, label, onClick}) =>{

const navigate = useNavigate();   

const resolvedPath = useResolvedPath(to);
const match = useMatch({path: resolvedPath.pathname, end: false});


const handelClick = () => {
    navigate(to);
    onClick?.();
};

return(
    <ListItemButton selected={!!match} onClick={handelClick}>
    <ListItemIcon>
    <Icon>{icon}</Icon>
    </ListItemIcon>
    <ListItemText primary={label} />
    </ListItemButton>
);

};

export const MenuLateral: React.FC<IMenuLateralProps> = ({children}) => {
    const [popupOpenEntrada, setPopupOpenEntrada] = useState(false);
const [popupOpenSaida, setPopupOpenSaida] = useState(false);
const navigate = useNavigate();   

    const [descricaoEntrada, setDescricaoEntrada] = useState<DescricaoItem[]>([]);
    const [descricaoSaida, setDescricaoSaida] = useState<DescricaoSaidaItem[]>([]);
    const [descricaoEntradas, setDescricaoEntradas] = useState([]);
    const [descricaoSaidas, setDescricaoSaidas] = useState([]);
    const { fotoUrl } = useFotoUsuario();

  
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
            const response = await api.get("/descricaoEntrada");
            setDescricaoEntrada(response.data);
            console.log("Descrições atualizadas:", response.data);
        } catch (error) {
            console.error("Erro ao atualizar descrições:", error);
        }
        };
    
        const atualizarDescricoesSaida = async () => {
        try {
            const response = await api.get("/descricaoSaida");
            setDescricaoSaida(response.data);
            console.log("Descrições atualizadas:", response.data);
        } catch (error) {
            console.error("Erro ao atualizar descrições:", error);
        }
        };

            const fetchDescricoes = async () => {
            try {
                const response = await api.get("/descricaoEntrada");
                const response2 = await api.get("/descricaoSaida");
                setDescricaoEntradas(response.data);
                setDescricaoSaidas(response2.data);
                console.log("Descrições:", response.data);
            } catch (error) {
                console.error("Erro ao buscar descrições:", error);
            }
            };

    const theme = useTheme();
    const smdown = useMediaQuery(theme.breakpoints.down('sm'));

    const {isDrawerOpen, toggleDrawerOpen, drawerOptions} = useDrawerContext();
    const {toggleTheme} = useAppThemeContext();
    
    const [isAreaAdmOpen, setIsAreaAdemOpen] = useState(false);

    const handleToggleAreaAdm = () => {
        setIsAreaAdemOpen(!isAreaAdmOpen);
       
};

    return(
        
        <>
        <Drawer  open={isDrawerOpen} variant={smdown ? 'temporary' : 'permanent'}  onClose={toggleDrawerOpen}>
            <Box width={theme.spacing(28)} height='100% ' display='flex' flexDirection='column'> 
                <FotoUsuario             
                />
                <Box>                    
                        <Typography variant="h6" align="center" marginBottom={2}>
                            {sessionStorage.getItem('nome')}
                        </Typography>                       
                </Box> 
                <Box display="flex" justifyContent="center">
                    <IconButton  
                        onClick={() => {
                            navigate('/editar-user');
                            if (smdown) {
                                toggleDrawerOpen();
                            }
                        }}                                       
                        sx={{marginBottom: theme.spacing(2)}}
                        color="primary"
                        aria-label="Alterar Perfil"
                    >
                        <Icon>edit</Icon>
                        <Typography>
                            Alterar Perfil
                        </Typography>
                    </IconButton>

                </Box>

                <Divider/>          
                
               <Box flex={1}>
                <List component="nav"               
                >
                {drawerOptions.map(drawerOption =>(
                <ListItemLink
                to={drawerOption.path}
                key={drawerOption.path}
                icon={drawerOption.icon}
                label={drawerOption.label}               
                onClick={smdown ? toggleDrawerOpen: undefined}
                />            
                ))}

                </List>
                <ListItemLink
                    to="/novo-orcamento"
                    icon="label" // ícone que você quiser
                    label="Novo orçamento mensal"
                    onClick={smdown ? toggleDrawerOpen : undefined}
                    />
                <ListItemButton onClick={handleToggleAreaAdm}>
                <ListItemIcon>
                    <Icon>admin_panel_settings</Icon>
                </ListItemIcon>
               
                <ListItemText  primary="Área Cadastro de Itens"/>
            
                {isAreaAdmOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={isAreaAdmOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                <ListItemButton onClick={handleOpenPopup}>
                    <ListItemIcon>
                        <Icon>label</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Cadastro de descrição Entradas" />
                </ListItemButton>


                <ListItemButton onClick={handleOpenPopupSaida}>
                    <ListItemIcon>
                        <Icon>label</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Cadastro de descrição Saídas" />
                </ListItemButton>

                </List>
                </Collapse>
               </Box>

               <Box>
                {/* <List component="nav">
                <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                    <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar Tema" />
                </ListItemButton>
                </List> */}
                <AlternarTema
                sx={{marginLeft: theme.spacing(1)}}
                onChange={toggleTheme} />
               </Box>
             </Box>
            <ListItemLink
                to="/tela-login"
                icon="label" // ícone que você quiser
                label="Sair"
                onClick={() => sessionStorage.clear()}
                />
           
             <Box display="flex" justifyContent="center" alignItems="center">
                <Typography>
                    Versão 2.0.0
                </Typography>
             </Box>
            
        </Drawer>
        <Box height="100vh" marginLeft={smdown ? 0 : theme.spacing(28)}>
        {children}
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
        </Box>

        </>
     
    )
};