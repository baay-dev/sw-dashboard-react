import {Box, Tab, Tabs, TextField} from "@mui/material";
import * as React from "react";
import {TabsEnum} from "../../types/tabs.enum.ts";
import Planets from "./planets.tsx";
import {useState} from "react";
import Characters from "./characters.tsx";

function Dashboard() {
    const [activeTab, setActiveTab] = useState(TabsEnum.CHARACTERS);
    const [searchValue, setSearchValue] = useState('');
    const characterPlaceholder = 'Annakin, Luke...';
    const handleChange = (_event: React.SyntheticEvent, newValue: TabsEnum) => {
        setActiveTab(newValue);
        switch (newValue) {
            case TabsEnum.PLANETS:
                setSearchPlaceholder('Tattooine, Hoth...')
                break;
            case TabsEnum.CHARACTERS:
                setSearchPlaceholder(characterPlaceholder)
                break;
            default:
                setSearchPlaceholder(characterPlaceholder)
        }
    };
    const [searchPlaceholder, setSearchPlaceholder] = useState(characterPlaceholder);

    function handleTabs() {
        switch (activeTab) {
            case TabsEnum.CHARACTERS:
                return <Characters searchValue={searchValue}/>
            case TabsEnum.PLANETS:
                return <Planets searchValue={searchValue}/>
            default:
                return <Characters searchValue={searchValue}/>
        }
    }

    return (
        <Box>
            <Box sx={{ width: '100%' }}>
                <div>
                    <TextField
                        id="outlined-basic"
                        placeholder={searchPlaceholder}
                        variant="outlined"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>

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
                {handleTabs()}
        </Box>

    )
}

export default Dashboard;
