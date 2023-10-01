import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function FromSearch(props) {
    const [URL, setURL] = useState('');
    console.log(params);

    return (
        <div className="FromSearch" hidden={props.value !== "search"}>
             <div className="inputSearchContainer">
                <span className="enterPrompt">Search here: </span>
                <TextField
                    variant="filled"
                    size="small"
                    sx={{ color: "whitesmoke" }}
                    hiddenLabel
                    fullWidth

                    value={URL}
                    onChange={e => setURL(e.target.value)}
                />
            </div>
        </div>
    )
}

export default FromSearch;