import * as React from 'react';
import { useRouter } from 'next/router';
import {
    AppBar,
    CssBaseline,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    Typography,
    Avatar,
    ListItemIcon,
    makeStyles

} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useStateValue } from 'state';

import { stringAvatar } from 'utils';
import styles from 'styles/layout.module.scss';
import { navCategories } from './navData';

interface LayoutProps {
    children: React.ReactNode;
}

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    
  drawer: {
      color: '#fff',

    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.primary[600],
    color: '#fff',

  },
  appToolbar: {
    display: "flex",
    justifyContent: "space-between"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },


  contentArea: {
        display: "flex",
        flexDirection: "column",
        minWidth: `calc(100% - drawerWidth)`,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: "transparent",
    padding: "4rem",
    maxWidth: "1400px",
    margin: "auto",
  },
  footer: {
    flexShrink: 0,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: auto;
    // background-color: map-get(map-get($map: colors.$colors, $key: myGrey), 300);
    height: "5rem"
  },




  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary[600]
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  active: {
      backgroundColor: theme.palette.primary[700],

      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      }
  },
  navItem : {
    marginTop: theme.spacing(3),
    color: '#fff',

    [theme.breakpoints.down('sm')]: {
        marginTop: theme.spacing(1),
    }
  },
  profile: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer"
  },
  username: {
      marginRight: "5px"
  },
  
}), { name: 'MuiLayoutComponent' });

export const Layout = ({children}: LayoutProps) => {
    const [state] = useStateValue();    

    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const router = useRouter()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const pushAndCloseDrawer = (path: string) => {
        router.push(path);
        setMobileOpen(false)
    }
    
    const drawer = (
        <div>
            <List>
                {navCategories.map((item) => (
                    <ListItem
                        button 
                        key={item.label} 
                        onClick={() => pushAndCloseDrawer(item.path)}
                        className={`${classes.navItem} ${router.pathname === item.path ? classes.active : undefined}`}
                    >
                        <ListItemIcon style={{fontSize:"25px", color:"#fff"}}>{<item.icon />}</ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={styles.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.appToolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        SchoolX
                    </Typography>
                    <div className={classes.profile}>
                        <Typography className={classes.username}>{state.user && state.user.name}</Typography>
                        <Avatar {...stringAvatar(state.user?.name)} />
                    </div>
                </Toolbar>
            </AppBar>
            
            <nav className={classes.drawer}>
                {/* At sm screens and greater don't show this */}
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor='left'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                    <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                        <CloseIcon/>
                    </IconButton>
                    {drawer}
                    </Drawer>
                </Hidden>

                {/* At sm screens hide this */}
                <Hidden smDown implementation="css">
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.toolbar} />
                        {drawer}
                    </Drawer>  
                </Hidden>
            </nav>
            <div className={styles.contentArea}>
                <div className={`${classes.toolbar} ${styles.toolbar}`} />
                <div className={styles.content}>
                    {children}
                </div>
                <footer className={styles.footer}>
                    <Typography>
                        Copyright &copy; 2021
                    </Typography>
                </footer>
            </div>
            
      </div>

    )
}