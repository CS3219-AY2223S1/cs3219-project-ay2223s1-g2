import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Card,
    CardActions,
    CardContent
} from "@mui/material";
import './ToggleButtonCard.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { toggleButtonCardTheme } from "./Themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegStar } from "@fortawesome/free-regular-svg-icons";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import io from 'socket.io-client';

const socket = io('http://localhost:8001');

const ToggleButtonCardSX = {
    "&:hover": {
        backgroundColor: 'hsla(213, 100%, 50%, 0.3)' //color of normal button when hovered
    },
    "&.Mui-selected": {
        backgroundColor: 'hsla(213, 90%, 50%, 0.4)' //color of selected button
    },
    "&.Mui-selected:hover": {
        // color of selected button when hovered
        backgroundColor: 'hsla(213, 100%, 50%, 0.4)' 
    },
    backgroundColor: 'hsla(213, 80%, 50%, 0.2)' //default color
}


const ToggleButtonCardGroupSX = {
    "&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px'
    },
    "&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    },
    minHeight: 275
}

const FindMatchButtonSX = {
    "&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
        borderTopRightRadius: '4px',
        borderBottomRightRadius: '4px'
    },
    "&.MuiToggleButtonGroup-root .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px',
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    },
    "&:hover": {
        //color of button when hovered
        backgroundColor: 'hsla(213, 100%, 50%, 0.3)',
        color: '#1976d2'
    },
    //default color
    backgroundColor: 'hsla(213, 80%, 50%, 0.2)', 
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: 50,
    minWidth: 855,
    minHeight: 200,
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    border: "1px solid rgba(0, 0, 0, 0.12)",
}

function DifficultyPage() {
    
    const [difficulty, setDifficulty] = useState(['Easy'])
    const navigate = useNavigate()

    const handleDifficulty = (
        event,
        newDifficulty
    ) => {
        setDifficulty([newDifficulty]) 
        console.log(newDifficulty)
        //setDifficulty(newDifficulty) //uncomment for single selection difficulty
        
    }

    const handleFindMatch = () => {
        if (difficulty.length === 0) {
            console.log('Error! At least 1 difficulty level must be selected')
            return
        }
        console.log(difficulty[0])
        let randomUsername = (Math.random() + 1).toString(36).substring(7)//stub username
        navigate(`/findmatch`, {
            state: {
                username: randomUsername, 
                difficulty: difficulty, 
            }
        })
    }

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} >
            <Typography variant={"h3"} marginBottom={"2rem"}
                sx={{color: "rgba(0, 0, 0, 0.65)",}}
            >
                Choose your difficulty!
            </Typography>
            <ToggleButtonGroup
                value={difficulty}
                exclusive //uncomment for single selection difficulty
                onChange={handleDifficulty}
                aria-label="Difficulty"
                sx={ToggleButtonCardGroupSX}
            >
                <ToggleButton className={'toggleButtonCard'}
                    value='Easy'
                    color='primary'
                    sx={{
                        fontSize: {
                            lg: 40,
                            md: 40,
                            sm: 40,
                            xs: 40
                          },
                        ...ToggleButtonCardSX
                    }}
                >
                    <div>
                        <div>Easy</div>
                        <div>
                            <FontAwesomeIcon icon={faSolidStar} size="1x"/>
                            <FontAwesomeIcon icon={faRegStar} size="1x"/>
                            <FontAwesomeIcon icon={faRegStar} size="1x"/>
                        </div>
                    </div>
                </ToggleButton>            
                <ToggleButton className={'toggleButtonCard'}
                    value='Medium'
                    color='primary'
                    sx={{
                        fontSize: {
                            lg: 40,
                            md: 40,
                            sm: 40,
                            xs: 40
                          },
                        ...ToggleButtonCardSX
                    }}
                >
                    <div>
                        <div>Medium</div>
                        <div>
                            <FontAwesomeIcon icon={faSolidStar} size="1x"/>
                            <FontAwesomeIcon icon={faSolidStar} size="1x"/>
                            <FontAwesomeIcon icon={faRegStar} size="1x"/>
                        </div>
                    </div>
                </ToggleButton>
                <ToggleButton className={'toggleButtonCard'}
                    value='Hard'
                    color='primary'
                    sx={{
                        fontSize: {
                            lg: 40,
                            md: 40,
                            sm: 40,
                            xs: 40
                          },
                        ...ToggleButtonCardSX
                    }}
                >
                    <div>
                        <div>Hard</div>
                        <div>
                            <FontAwesomeIcon icon={faSolidStar} size="1x" />
                            <FontAwesomeIcon icon={faSolidStar} size="1x"/>
                            <FontAwesomeIcon icon={faSolidStar} size="1x"/>
                        </div>
                    </div>
                </ToggleButton>
            </ToggleButtonGroup>
            
            <Box mt={5} display={"flex"} flexDirection={"column"} >
                <Button size={"large"} 
                    variant={"normal"} 
                    onClick={handleFindMatch}
                    color='primary'
                    sx={FindMatchButtonSX}
                >
                    Start Coding!
                </Button>
            </Box>
        </Box>
    )
}

export default DifficultyPage;
