import { Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { VideoPreview, VideoPreviewSkeleton } from "./videoPreview";
import "./videoPage.css"
import axios from "axios";

function FromURL(props) {
    const [value, setValue] = useState({ downloadType: '', downloadQuality: '' })
    const [videoDetails, setVideoDetails] = useState(<VideoPreviewSkeleton />);
    const [videoTitle, setVideoTitle] = useState('');
    const [mediaSelectors, setMediaSelectors] = useState([]);
    const [params] = useSearchParams();
    const navigate = useNavigate();


    useEffect(() => {
        axios.get("/video/details/", { params: { code: params.get('code') } })
            .then(res => {
                if (res.status == 200) {
                    setVideoDetails(<VideoPreview data={res.data} />);
                    setVideoTitle(res.data.title);
                }
            })
    }, [])

    useEffect(() => {
        var label;
        axios.get("/video/formats/", { params: { code: params.get('code') } })
            .then(res => res.data)
            .then(res => {
                res = res.map((format, i) => {
                    label = `${format.mimeType.ext} - ${format.qualityLabel} - ${format.fps} FPS | ${format.audioQuality} - ${format.bitrate} Bitrate`
                    return <div key={i}><FormControlLabel value={format.url} control={<Radio />} label={label} /><Divider /></div>
                });
                setMediaSelectors(res);
            })
    }, [])

    function handleRadioChange(event) {
        setValue((prev) => ({
            ...prev, [event.target.name]: event.target.value
        }));
    }

    function handleDownloadButton() {
        console.log("down");
        console.log();
        navigate("/download", { state: { url: value.downloadQuality, videoTitle: videoTitle} })

    }

    return (
        <div className="videoDetailsContainer">
            <div className="middleContainer">
                {videoDetails}
                <div className="qualitySelectorContainer">
                    <div className="qualitySelectorContentPane">
                        {/* <h2>Download Type:</h2>
                        <FormControl>
                            <RadioGroup
                                name="downloadType"
                                value={value.downloadType}
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value={0} control={<Radio />} label="Audio + Video" />
                                <Divider />
                                <FormControlLabel value={1} control={<Radio />} label="Video Only" />
                                <Divider />
                                <FormControlLabel value={2} control={<Radio />} label="Audio Only" />
                                <Divider />
                            </RadioGroup>
                        </FormControl> */}

                        <h2>Download Quality:</h2>
                        <FormControl>
                            <RadioGroup
                                name="downloadQuality"
                                value={value.downloadQuality}
                                onChange={handleRadioChange}
                            >
                                {mediaSelectors}
                            </RadioGroup>
                        </FormControl>
                        &nbsp;
                        <Button variant="contained" onClick={handleDownloadButton}>Download</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FromURL;