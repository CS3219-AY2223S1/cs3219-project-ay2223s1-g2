import {
    Box,
    Typography
} from "@mui/material";

function HomePage() {
    
    return (
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
            <Typography variant={"h3"} marginBottom={"2rem"}>Welcome to PeerPrep</Typography>
        </Box>
    )
}

export default HomePage;
