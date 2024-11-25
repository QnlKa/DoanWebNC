import { Box } from "@mui/material";
import Header from "../../../components/Header/Header";
import BarChart from "../../../components/Chart/BarChart";

const Bar = () =>{
    return(
        <Box m="20px">
            <Header title="Bar Chart" subtitle=""/>
            <Box height="100vh">
                <BarChart/>
            </Box>
        </Box>
    )
}

export default Bar;