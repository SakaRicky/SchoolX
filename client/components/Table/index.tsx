import { DataGrid, GridRowParams } from "@material-ui/data-grid";
import styles from "./table.module.scss";
import { StudentOnClassList } from "types";
import { columns } from "./TableHead";
import { useStyles } from "./TableStyles";
import { useRouter } from "next/router";

interface TableProps {
	tableData: StudentOnClassList[];
	setSelectedRows: (selectedStudents: StudentOnClassList[]) => void;
}

export const Table = ({ tableData, setSelectedRows }: TableProps) => {
	const router = useRouter();

	const classes = useStyles();

	const rows = tableData;

	const handleStudentClick = (student: GridRowParams) => {
		router.push(`/students/${student.id}`);
	};

	return (
		<>
			<div className={styles.root}>
				<div className={styles.table}>
					<DataGrid
						className={classes.grid}
						rows={rows}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[25, 50, 10]}
						checkboxSelection
						disableSelectionOnClick
						onSelectionModelChange={ids => {
							const selectedIDs = new Set(ids);
							const selectedStudents: StudentOnClassList[] = rows.filter(row =>
								selectedIDs.has(row.id)
							);

							setSelectedRows(selectedStudents);
						}}
						onRowClick={handleStudentClick}
					/>
				</div>
			</div>
		</>
	);
};
