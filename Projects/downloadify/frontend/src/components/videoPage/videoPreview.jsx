import { Skeleton } from "@mui/material";
import React from "react";
import "./video.css"


function VideoPreview(props) {
    return (
        <div id="VideoContainer">
            <div className="thumbnail">
                <img src={props.data.thumbnail.thumbnails[3].url} className="imgs" />
                <div className="time">
                    {formatTime(props.data.lengthSeconds)}
                </div>
            </div>
            <div className="dataContainer">
                <div className="title">{props.data.title}</div>
                <div className="views"><span>{formatViews(props.data.viewCount)} Views</span></div>
                &nbsp;
                <div className="author">{props.data.author}</div>
                &nbsp;
                <div className="description">{props.data.shortDescription.slice(0, 120)} ...</div>
            </div>
        </div>
    )
}

function VideoPreviewSkeleton() {

    return (
        <div style={{ display: "flex", flexDirection: "row", marginTop: "2rem"}}>
            <Skeleton variant="rounded" width={336} height={188} />
            &nbsp;
            &nbsp;
            <div>
                <Skeleton variant="text" width={620} height={40} />
                <Skeleton variant="text" width={90} height={25}/>
                &nbsp;
                <Skeleton variant="text" width={120} height={25}/>
                &nbsp;
                <Skeleton variant="text" width={620} height={25}/>
            </div>
        </div>

    )
}

export { VideoPreview, VideoPreviewSkeleton };

function formatViews(n) {
    const units = {
        1e3: 'K',
        1e6: 'M',
        1e9: 'B'
    }
    n = parseInt(n);

    let ans = String(n);
    for (var key in units) {
        if ((n / key | 0) < 1000 && (n / key | 0) > 0) {
            ans = `${String(Math.floor(n / key * 10) / 10)}${units[key]}`;
            break;
        }
    }
    return ans;
}

function formatTime(timeDelta) {
    const timeUnits = [60 * 60, 60, 1];
    var ans = '';
    for (var i of timeUnits) {
        if (timeDelta >= i) {
            ans = ans.concat(String(timeDelta / i | 0) + ':');
        } else {
            ans = ans.concat("0:");
        }
        timeDelta = timeDelta % i;
    }
    if (ans.charAt(0) == 0) {
        return ans.slice(2, -1);
    } else {
        return ans.slice(0, -1);
    }
}


const data = {
    videoId: "Zv11L-ZfrSg",
    title: "Ultimate Wild Animals Collection in 8K ULTRA HD / 8K TV",
    lengthSeconds: "987",
    channelId: "UC8D_NXFBh8A9KSwo7x-wFdQ",
    isOwnerViewing: false,
    shortDescription: "Ultimate Wild Animals Collection in 8K ULTRA HD / 8K TV\nHigh Quality Animals from the World Video In Exceptional 8K HDR 60FPS Quality For Your 8K resolution device.\nYou can watch this collection of Ultimate Wild Animals Collection in 8K ULTRA HD / 8K TV in your TV For The Living Room, Office 365, Lounge, Waiting Room Business, Spa at home, Spa music, Showroom , Restaurant Music and much more. Play It In Your Samsung Oled TV, Smart TV Samsung, Sony TV Device, Samsung Technology, Roku , Apple TV , Chromecast , Xbox , Playstation 5 PS5 , Wii, Smart TV AOC, 8K TV REVIEW, 8K TV 2020, 8K TV LG.\n\nCreate a unique atmosphere at your place and watch this nature relax video as a wonderful TV Screensaver! For a fully immersive experience, watch this wildlife video on your Oled TV, Samsung 8 HDR TV, Sony 8K TV, LG 8K TV. Create a unique atmosphere wherever you want. You can watch this amazing 8K nature relax video as a great 8K screensaver in any waiting room, lobby, relax room, spa center, public transport, gym, hotel, lounge, office, hospital, dental clinic, picture gallery, library, and other special places in the world.\n\nFollow me:\n►YouTube: https://www.youtube.com/channel/UC8D_NXFBh8A9KSwo7x-wFdQ/\n►Facebook: https://www.facebook.com/bruno.saraviavega\n►Instagram: https://www.instagram.com/brunosaraviaphotography\n\nCanon - Sony - Nikon - Adobe Premiere Pro CC - Photoshop - Lightroom CC\nYoutube Business - Youtube Profit - Bank Credit - Loans - Educational - Education - Insurance\n\nUltimate Wild Animals Collection in 8K ULTRA HD / 8K TV (FUHD) Demo 8K ULTRA HD\n\n#8K #ANIMALS #WILDLIFE",
    isCrawlable: true,
    allowRatings: true,
    viewCount: "73021984",
    author: "8K VIDEOS ULTRA HD",
    isPrivate: false,
    isUnpluggedCorpus: false,
    isLiveContent: false,

    keywords: [
        "animals",
        "8k animals",
        "8k animal video ultra hd",
        "8k wildlife video",
        "8k wild animals",
        "wildlife documentary",
        "wildlife photography",
        "8k video ultra hd 240 fps",
        "nature sounds relaxing music",
        "nature sounds",
        "8k",
        "8k video",
        "8k video ultra hd",
        "8k slide",
        "8k tv",
        "8k tv samsung",
        "8k tv ps5",
        "wild animals short film",
        "birds",
        "birds chirping",
        "4k ultra hd",
        "animals 8k",
        "jungle sounds",
        "jungle sounds for sleeping",
        "8k ultra hd 2160p 60fps",
        "forest",
        "forest sounds",
        "ps5",
        "most beautiful animals in the world",
    ],
    thumbnail: {
        thumbnails: [
            {
                url: "https://i.ytimg.com/vi/Zv11L-ZfrSg/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLBSlv05aa6jkA6Ag_Ahi_wDGvVY4Q",
                width: 168,
                height: 94,
            },
            {
                url: "https://i.ytimg.com/vi/Zv11L-ZfrSg/hqdefault.jpg?sqp=-oaymwEiCMQBEG5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLAhSyQNy4y_1-0LUz2AVUG6cTR6Wg",
                width: 196,
                height: 110,
            },
            {
                url: "https://i.ytimg.com/vi/Zv11L-ZfrSg/hqdefault.jpg?sqp=-oaymwEjCPYBEIoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBoxIgqlEf49nt-SYuVamHOjFMHrg",
                width: 246,
                height: 138,
            },
            {
                url: "https://i.ytimg.com/vi/Zv11L-ZfrSg/hqdefault.jpg?sqp=-oaymwEjCNACELwBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLAnelXtWkjPB0NKLskUBqbTXIRZ2g",
                width: 336,
                height: 188,
            },
            {
                url: "https://i.ytimg.com/vi/Zv11L-ZfrSg/maxresdefault.jpg",
                width: 1920,
                height: 1080,
            },
        ]
    },
}
