import React from 'react'
import {AppBar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme, useMediaQuery } from "@material-ui/core";
import "@fontsource/arimo";
import { Navigate, useNavigate } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Iniciar Sesión', 'Crear Cuenta'];

export const HeaderApp = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    const texto = event.nativeEvent.target.outerText;

    if(texto === 'Iniciar Sesión'){
      navigate("/", {
        replace:true
      });
    }else{
      navigate("/registro-cuenta", {
        replace:true
      });
    }
  };

  const theme = useTheme();
  const esPantallaPequena = useMediaQuery(theme.breakpoints.down("xs"));


  return (

    <AppBar sx={{ width: {xs: '100%'}, 
                  bgcolor: "#4d0c1c" }}
                  position='sticky' 
                  disablegutters='true'>
      <Container maxWidth={false} 
                 sx={{ width: { xs: '100%'}}}>
        <Toolbar sx={{ width: { xs: '100%'}}} 
                 disableGutters>
        
        {
          !esPantallaPequena &&
            <Box component="img" 
                 sx={{align: { md: 'left' },
                      maxHeight:{ xs: 133,   md: 67 },
                      maxWidth: { xs: 250,    md: 200 },
                      display:  { xs: 'none', md: 'flex' }
                  }}
                  src={`../../src/imagen/logo_centro_awn.png?w=100&fit=crop&auto=format`}
            />
        }
            <Box sx={{display: { xs: 'flex', md: 'none' },
                      width:   { xs: '10%'}}}>

              <IconButton size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleOpenNavMenu}
                          color="inherit">

                <MenuIcon />

              </IconButton>

              <Menu id = "menu-appbar"
                    anchorEl = {anchorElNav}
                    anchorOrigin = {{ vertical: 'bottom',
                                    horizontal: 'left'}}
                    keepMounted
                    transformOrigin={{ vertical: 'top',
                                       horizontal: 'left'}}
                    open = {Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' },
                    }}>

                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
              </Menu>
          </Box>

          <Box sx={{justifyContent:  { xs: 'center'},
                    mt:2 ,
                    mb:2 ,
                    width: { xs: '70%'} ,
                    alignItems:{ xs: 'center'},
                    display: { xs: 'flex', md: 'none'}}}>

          <Box component="img" 
               sx={{width: 150,
                    height: 70}}
               src={`../../src/imagen/logo_centro_awn.png?w=100&fit=crop&auto=format`}/>
          </Box>
         

          { !esPantallaPequena &&
              <Grid container justifyContent="flex-end">
              
                  <Tooltip title="">
                    <Button onClick={handleOpenUserMenu} 
                            color="inherit" 
                            sx={{fontFamily: "Arimo"}}>
                    Mi Cuenta</Button>
                  
                  </Tooltip>

                  <Menu sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin = {{vertical: 'top',
                                         horizontal: 'right'}}
                        keepMounted
                        transformOrigin = {{vertical: 'top',
                                            horizontal: 'right'}}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}>

                        {settings.map((setting) => (
                          <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <Typography textAlign="center" sx={{fontFamily: "Arimo"}}>{setting}</Typography>
                          </MenuItem>
                        ))}

                  </Menu>
              
              </Grid>  

          }


          { esPantallaPequena &&
                  <Box sx={{width: { xs: '25%'}}}>
                    <Tooltip title="" 
                             sx={{width: { xs: '100%'}}}>
                      <Button onClick={handleOpenUserMenu} 
                              color="inherit" 
                              sx={{fontFamily: "Arimo"}}>Mi Cuenta</Button>                      
                    </Tooltip>

                    <Menu sx = {{ mt: '45px' }}
                          id = "menu-appbar"
                          anchorEl = {anchorElUser}
                          anchorOrigin = {{vertical: 'top',
                                         horizontal: 'right'}}
                          keepMounted
                          transformOrigin = {{vertical: 'top',
                                            horizontal: 'right'}}
                          open = {Boolean(anchorElUser)}
                          onClose = {handleCloseUserMenu}>

                          {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                              <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                          ))}
                    </Menu>
                  </Box>
            }
        </Toolbar>
      </Container>
    </AppBar>
  )
};