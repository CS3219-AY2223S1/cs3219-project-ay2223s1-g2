import React from "react";
import {makeStyles} from "@mui/material";;

const useStyles = makeStyles({
    formWrapper : {
        width: "98%"
    },
    messageField: {
        width: "90%"
    }
});
/*
export const messageBar = () => {
    const classes = useStyles();
    return ( 
        <>
            <form className={classes.formWrapper} onSubmit={postMessage}>
                <TextField className={classes.messageField} value={chat} onInput= { e=>setChat(e.target.value) }/>
                <Button type="submit">Send</Button>
            </form>
        </>
    )

}
*/