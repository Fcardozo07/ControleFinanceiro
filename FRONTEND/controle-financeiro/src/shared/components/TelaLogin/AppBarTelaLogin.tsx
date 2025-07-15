import { AppBar, Box, Button, Drawer, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { ITelaLoginAppbarProps } from "../../types/TelaLogin/types";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppThemeContext } from "../../contexts";


export const AppBarTelaLogin: React.FC<ITelaLoginAppbarProps> = ({
  drawerOpen,
  toggleDrawer,
  menuItems,
}) => {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const {toggleTheme} = useAppThemeContext();


    return(
         <AppBar
        position="static"
        sx={{
          backgroundColor: "#115669",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          {/* <Box sx={{ flexGrow: 1 }}>
            <img src="assets/images/Coopercitrus.png" alt="Logo" style={{ height: "60px" }} />
          </Box> */}
            <Box>
                <List component="nav">
                <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                    <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="" />
                </ListItemButton>
                </List>
            </Box>
          {isMobile ? (
            <>
              <IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                  <List>
                    {menuItems.map((text) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box>
              {menuItems.map((item) => (
                <Button key={item} color="inherit">
                  {item}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    )
}
