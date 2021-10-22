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
import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatLineSpacingIcon from '@material-ui/icons/FormatLineSpacing';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CloseIcon from '@material-ui/icons/Close';

import { stringAvatar } from 'utils'

interface LayoutProps {
    children: React.ReactNode;
}

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  contentArea: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    minWidth: `calc(100% - ${drawerWidth}px)`
  },
  content: {
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
  active: {
      backgroundColor: theme.palette.secondary.light
  },
  profile: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer"
  },
  username: {
      marginRight: "5px"
  },
  footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "auto",
      backgroundColor: theme.palette.secondary.light,
      height: theme.spacing(10),
  },
  
}), { name: 'MuiLayoutComponent' });


const Layout = ({children}: LayoutProps) => {

    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const router = useRouter()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const navCategories = [
        {
            text: "Dashboard",
            path: '/',
            icon: <DashboardIcon />
        },
        {
            text: "Marks",
            path: '/marks',
            icon: <FormatListNumberedIcon />
        },
        {
            text: "Student Registration",
            path: '/student_registration',
            icon: <GroupAddIcon />
        },
        {
            text: "Teacher Registration",
            path: '/teacher_registration',
            icon: <PersonAddIcon />
        },
        {
            text: "Class List",
            path: '/class_list',
            icon: <FormatLineSpacingIcon />
        },
    ]
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
                        key={item.text} 
                        onClick={() => pushAndCloseDrawer(item.path)}
                        className={router.pathname === item.path ? classes.active : undefined}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
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
                        <Typography className={classes.username}>username</Typography>
                        <Avatar {...stringAvatar('User Name')} />
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
            <div className={classes.contentArea}>
                <div className={classes.toolbar} />
                <div className={classes.content}>
                    {children}
                </div>
                <footer className={classes.footer}>
                    <Typography>
                        Copyright &copy; 2021
                    </Typography>
                </footer>
            </div>
      </div>
        
    )
}

export default Layout;