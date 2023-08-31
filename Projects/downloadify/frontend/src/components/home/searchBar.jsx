import { Button, InputBase, TextField } from "@mui/material";
import { width } from "@mui/system";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function SearchBar() {

    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    function onSearchClick(event) {
        let data = {
            value: String(inputValue)
        }

        navigate(`/video?code=${inputValue}`);
        
    }

    return (
        <div className="searchBarContainer">
            <div className="searchBar">
                <TextField
                    placeholder="Enter Video Link"
                    fullWidth
                    size="small"
                    value={inputValue}
                    onChange={event => setInputValue(event.target.value)}
                    focused={false}
                />
                &nbsp;
                &nbsp;
                <Button
                    variant="outlined"
                    size="large"
                    endIcon={<SearchOutlinedIcon fontSize="large" />}
                    onClick={onSearchClick}
                ><b>Go</b></Button>
            </div>
        </div>
    )
}

export default SearchBar;