import { Divider, Tab, Tabs } from "@mui/material";
import React from "react";
import FromSearch from "./fromSearch";
import FromURL from "./fromURL";

function MainBox() {

    const [value, setValue] = React.useState('url');

    function handleChange(event, newValue) {
        setValue(newValue);
    };

    return (
        <div className="MainBoxContainer">
            <div className="tabsContainer">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    textColor="inherit"
                    indicatorColor="secondary">

                    <Tab value="url" label="From URL" disableRipple={true} />
                    <Tab value="search" label="From Search" disableRipple={true} />
                </Tabs>
            </div>
            <div className="tabPaneContainer">
                <FromURL value={value} />
                <FromSearch value={value} />
            </div>
        </div>
    )
}

export default MainBox;