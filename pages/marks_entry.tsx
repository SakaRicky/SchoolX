import React, { useState, useEffect } from "react";
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


const useStyles = makeStyles(theme => {
    return {
        root: {
            marginTop: theme.spacing(2)
        },
        selectClass: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(1)
        },
        heading: {
            display: "flex",
            justifyContent: "center",
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

    const setChoosedSequence = (event: React.ChangeEvent<HTMLInputElement>) => {        
        setSequence(event.target.value);
    }

    const setChoosedClass = (event: React.ChangeEvent<HTMLInputElement>) => {        
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
        <div>
            <FlashNotification notify={notify} setNotify={setNotify} />
            <Typography variant="h6">
                Marks Entry
            </Typography>

            <Grid container spacing={2} className={classes.selectClass}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField variant="outlined" defaultValue="" fullWidth select label="Select a Sequence" onChange={setChoosedSequence}>
                        {SEQUENCES.map(sequence => {
                            return (
                                <MenuItem key={sequence.code} value={sequence.code}>
                                    {sequence.label}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.selectClass}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField variant="outlined" defaultValue="" fullWidth select label="Select a Class" onChange={setChoosedClass}>
                        {allClasses.map(currentClass => {                
                            return (
                                <MenuItem key={currentClass.id} value={currentClass.id}>
                                    {currentClass.name}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </Grid>
            </Grid>

            <div>
                {marksEntryList && <MarksEntryTable submitMarks={handleSubmitMarks} seqClass={marksEntryList}/>}
            </div>
        </div>
    );
}

export default MarksEntry;