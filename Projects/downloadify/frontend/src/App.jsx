import './App.css'
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from './components/home/index'
import FromURL from './components/videoPage/fromURL';
import axios from 'axios';
import Downloader from './components/download/Downloader';

function App() {
    const [count, setCount] = useState(0)

    const darkTheme = createTheme({
        palette: {
            mode: 'light'
        },
    });

    axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<IndexPage />} />
                    <Route path="/video" element={<FromURL />} />
                    <Route path="/download" element={<Downloader />} render={(props) => <Downloader {...props}/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
