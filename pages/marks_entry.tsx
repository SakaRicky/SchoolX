import { useState, useEffect, ChangeEvent } from "react";
import { 
    Grid,
    MenuItem,
    TextField,
    Typography,
    makeStyles
 } from "@material-ui/core";
 import { getMarkEntryList, getAllClasses, saveMarks } from "services";
import { ClassType, MarksEntryListType } from "types";
import { MarksEntryTable, FlashNotification } from "components";
import { Notify } from 'types';
import styles from 'styles/marksEntryPage.module.scss';


const useStyles = makeStyles(theme => {
    return {
        root: {
            marginTop: '5rem',
        },
        heading: {
            display: "flex",
            justifyContent: "center",
            fontSize: '2.5rem'
        },
        inputs: {
            backgroundColor: "#fff",
            padding: theme.spacing(2),
            borderRadius: '10px'
        },
        selectClass: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            
        },
        menuItem: {
            color: theme.palette.myGrey[800]
        },
        table: {
            marginTop: theme.spacing(2),
            padding: theme.spacing(2),
            backgroundColor: "#fff",

        }
    }
});

const SEQUENCES = [
    {code: 'seq1', label: <span>1<sup>st</sup> Sequence</span>},
    {code: 'seq2', label: <span>2<sup>nd</sup> Sequence</span>},
    {code: 'seq3', label: <span>3<sup>rd</sup> Sequence</span>},
    {code: 'seq4', label: <span>4<sup>th</sup> Sequence</span>},
    {code: 'seq5', label: <span>5<sup>th</sup> Sequence</span>},
    {code: 'seq6', label: <span>6<sup>th</sup> Sequence</span>}
]

const MarksEntry = () => {

    const classes = useStyles();

    const [sequence, setSequence] = useState<string>('');
    // state to all the class list so that we can select the desired class list from
    const [allClasses, setAllClasses] = useState<ClassType[]>([]); //
    const [classToFetch, setClassToFetch] = useState<string>('');
    // state to hold the current classlist to display
    const [marksEntryList, setMarksEntryList] = useState<MarksEntryListType | null>(null); //
    const [notify, setNotify] = useState<Notify>({isOpen: false, message: '', type: undefined});
    
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const allClasses = await getAllClasses(); //: ClassType[]                
                setAllClasses(allClasses);
            } catch (error: any) {
                console.log(error);
            }
        }
        sequence && fetchClasses(); // Only fetch for classes when there is a sequence
    }, [sequence])

    useEffect(() => {
        const fetchClassList = async () => {            
            try {
                const fetchedClassList: MarksEntryListType = await getMarkEntryList(sequence, classToFetch);                
                setMarksEntryList(fetchedClassList);
            } catch (error: any) {
                console.log(error);
            }
        }
        sequence && fetchClassList(); // Only fetch for classes when there is a sequence
    }, [classToFetch])

    const setChoosedSequence = (event: ChangeEvent<HTMLInputElement>) => {        
        setSequence(event.target.value);
    }

    const setChoosedClass = (event: ChangeEvent<HTMLInputElement>) => {        
        setClassToFetch(event.target.value);
    }

    const handleSubmitMarks = async (marks: MarksEntryListType) => {
        try {
            const savedMarks = await saveMarks(marks);
            setNotify({
                isOpen: true,
                message: "Marks saved successfully",
                type: "success"
            })
        } catch (error) {
            setNotify({
                isOpen: true,
                message: "Huston, we got a problem",
                type: "error"
            })
        } 
    }

    return (
        <div className={styles.root}>
            <FlashNotification notify={notify} setNotify={setNotify} />
            <h1 className={styles.heading}>Mark Entry</h1>

            <div className={styles.inputs}>
                <Grid container spacing={2} className={styles.selectClass}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField variant="outlined" defaultValue="" fullWidth select label="Select a Sequence" onChange={setChoosedSequence}>
                            {SEQUENCES.map(sequence => {
                                return (
                                    <MenuItem className={styles.menuItem} key={sequence.code} value={sequence.code}>
                                        {sequence.label}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                    </Grid>
                </Grid>

                <Grid container spacing={2} className={styles.selectClass}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField variant="outlined" defaultValue="" fullWidth select label="Select a Class" onChange={setChoosedClass}>
                            {allClasses.map(currentClass => {                
                                return (
                                    <MenuItem className={styles.menuItem} key={currentClass.id} value={currentClass.id}>
                                        {currentClass.name}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
                    </Grid>
                </Grid>
            </div>

            <div className={styles.table}>
                {marksEntryList && <MarksEntryTable submitMarks={handleSubmitMarks} seqClass={marksEntryList}/>}
            </div>
        </div>
    );
}

export default MarksEntry;