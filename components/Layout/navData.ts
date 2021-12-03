import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FormatLineSpacingIcon from '@material-ui/icons/FormatLineSpacing';
import { CgUserList } from 'react-icons/cg';


export const navCategories = [
        {
            label: "Dashboard",
            path: '/dashboard',
            icon: DashboardIcon
        },
        {
            label: "Marks",
            path: '/marks_entry',
            icon: FormatListNumberedIcon
        },
        {
            label: "Students",
            path: '/students',
            icon: GroupAddIcon
        },
        {
            label: "Teacher",
            path: '/teachers',
            icon: PersonAddIcon
        }
]