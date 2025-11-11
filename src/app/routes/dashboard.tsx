import {Box, Tab, Tabs} from "@mui/material";
import * as React from "react";
import {TabsEnum} from "../../types/tabs.enum.ts";
import Planets from "./planets.tsx";
import styles from "./dashboard.module.css";

function Dashboard() {
    const [activeTab, setActiveTab] = React.useState(TabsEnum.CHARACTERS);
    const handleChange = (_event: React.SyntheticEvent, newValue: TabsEnum) => {
        setActiveTab(newValue);
    };

    function handleTabs() {
        switch (activeTab) {
            case TabsEnum.CHARACTERS:
                return <p>CHARACTERS</p>
            case TabsEnum.PLANETS:
                return <Planets/>
            default:
                return <p>CHARACTERS</p>
        }
    }

    return (
        <Box>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    centered
                    textColor="primary"
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#fbbf24',
                        },
                    }}
                >
                    <Tab value={TabsEnum.CHARACTERS} label="Characters" />
                    <Tab value={TabsEnum.PLANETS} label="Planets" />
                </Tabs>
            </Box>
            <div className={styles.cardsContainer}>
                {handleTabs()}
            </div>
        </Box>

    )
}

export default Dashboard;
