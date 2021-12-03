import { makeStyles } from "@material-ui/core";


export const useStyles = makeStyles(theme => {
    return {
        grid: {

            '& .MuiDataGrid-columnHeaderWrapper': {
                backgroundColor: theme.palette.secondary[300],
                fontSize: "1rem",
                fontWeight: '700',

            },
            '& .MuiDataGrid-dataContainer': {
                color: theme.palette.myGrey[900]
            },

            '& .MuiDataGrid-footerContainer': {
                

                '& .MuiSvgIcon-root': {
                    backgroundColor: theme.palette.secondary[100],
                    borderRadius: '50%',
                    transition: theme.transitions.create(['background-color', 'transform'], {
                        duration: theme.transitions.duration.standard,
                    }),

                    '&:hover': {
                        backgroundColor: theme.palette.secondary[300],
                        transform: 'scale(1.1)'
                    }
                }
            },
            '& .MuiDataGrid-row': {
                
                '&:hover': {
                    backgroundColor: theme.palette.secondary[100],
                    cursor: "pointer"
                }
            }
        },
        textField: {
            border: '2px solid theme.palette.secondary[300]'
        },
    }
})