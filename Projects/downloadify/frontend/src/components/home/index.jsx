import React, { useState } from "react";
import SearchBar from "./searchBar";
import Header from "../header/Header";
import "./index.css";
import { useNavigate } from "react-router-dom";
import url from "url";

function IndexPage() {

    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    function onSearchClick(event) {
        let code = inputValue;

        if (inputValue.startsWith("https://www.youtube.com/watch?v=")) {
            var parsedURL = new URLSearchParams(inputValue.substring(inputValue.indexOf('?')))
            code = parsedURL.get('v');
        } else if (inputValue.startsWith("https://youtu.be/")) {
            var parsedURL = new URL(inputValue);
            code = parsedURL.pathname.substring(1)
        }

        navigate(`/video?code=${code}`);

    }

    return (
        <div>
            <div>
                <div className="header">
                    <nav id="navBar">
                        <img src="/homePage/logo.png" className="logo" />

                        <div className="header-content">
                            <h1>YouTube Downloder</h1>
                            <h3>Fast Way To Download HD Videos MP4 Online at One Stop</h3>
                            <p>Search YouTube Video or Paste Video URL Here.</p>
                            <form className="email-signup" onSubmit={onSearchClick}>
                                <input
                                    placeholder="Paste Video URL Here..."
                                    required
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)} />
                                <button type="submit">Download</button>
                            </form>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="box">
            </div>

            <div className="features">
                <div className="row">
                    <div className="text-col">
                        <h2>STEP1.</h2>
                        <p className="steps-parra">Find your target YouTube video.</p>
                    </div>
                    <div className="img-col">
                        <img src="/homePage/step1.jpg" alt="" />
                    </div>
                </div>
                <div className="row">
                    <div className="img-col">
                        <img src="/homePage/step2.jpg" alt="" />
                    </div>
                    <div className="text-col">
                        <h2>STEP2.</h2>
                        <p className="steps-parra">Copy YouTube video link and paste it to Downlodify YouTube Videos Downloader.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="text-col">
                        <h2>STEP3.</h2>
                        <p className="steps-parra">Download YouTube HD video to MP4 with simple click.</p>
                    </div>
                    <div className="img-col">
                        <img src="/homePage/step3.jpg" alt="" />
                    </div>
                </div>
            </div>

            <footer className="text-center text-lg-start" style={{ backgroundColor: '#fff' }}>
                <div className="text-center text-white p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2023 Copyright:
                    <a className="text-white" style={{ textDecoration: 'none' }} href="#">Downlodify</a>
                </div>
            </footer>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
        </div>
    )
}

export default IndexPage;