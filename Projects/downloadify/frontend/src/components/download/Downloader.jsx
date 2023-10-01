import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import downloadComplete from "./downloadMechanics";

function Downloader(props) {
    const location = useLocation();
    const [link, setLink] = useState();

    useEffect(()=> {
        console.log(location.state);
        const a = document.createElement('a');
        a.href = location.state.url + `&title=${location.state.videoTitle}`
        a.click();

    }, [])

    return (
        <div>
        </div>
    )
}

export default Downloader;