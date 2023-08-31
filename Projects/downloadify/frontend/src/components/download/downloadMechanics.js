import axios from "axios";
import fs from 'fs';
const threads = 2;


async function getHead(url) {
    return await axios.head(url)
        .then(res => parseInt(res.headers["content-length"]));
}

async function downloadRange(url, range, index, resolve) {
    console.log(`starting download for range: ${range}`);
    const response = await axios.get(url, {
        mode: 'no-cors',
        responseType: "stream",

    })

    let totalContentSize = 0;
    const oneChunkSize = response.headers["content-length"]
    const list = []
    const stream = response.data;
    stream.on('data', data => {
        list.push(data);
        totalContentSize += data.length;
        console.log(`${totalContentSize}/${oneChunkSize} | ${totalContentSize / oneChunkSize * 100}`);
    });

    stream.on('end', () => {
        console.log("stream done");
        resolve({ stream: Buffer.concat(list), index: index });
    });
}


async function download(url, threads) {
    const size = await getHead(url);
    console.log("size: " + String(size));
    const chunk = Math.ceil(size / threads);
    console.log("chunk size: " + String(chunk));

    const ret = []
    const executing = new Set();
    let index = 0;

    for (var i = 0; i < threads; i++) {
        var range = `bytes=${i * chunk}-${i + 1 == threads ? size - 1 : (i + 1) * chunk - 1}`
        console.log(range);

        const p = new Promise(resolve => downloadRange(url, range, index, resolve));
        ret.push(p);
        executing.add(p);
        index++;

        const clean = () => executing.delete(p);
        p.then(clean).catch(clean);
        if (executing.size >= threads) {
            await Promise.race(executing);
        }
    }
    return Promise.all(ret);
}

function concatBuffer(arrays) {
    // if (!arrays.length) return null;
    // let totalLength = arrays.reduce((acc, value) => acc + value.stream.length, 0);
    // let result = new Uint8Array(totalLength);
    // let length = 0;
    // for (let array of arrays) {
    //   result.set(array.stream, length);
    //   length += array.length;
    // }
    return Buffer.concat(arrays.map(i => i.stream));
}

function saveAs({ name, buffers, mime = "application/octet-stream" }) {
    const blob = new Blob([buffers], { type: mime });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.download = name || Math.random();
    a.href = blobUrl;
    a.click();
    URL.revokeObjectURL(blob);
}


async function downloadComplete(url) {
    const result = await download(url, threads)
    console.log(result);
    const finalData = concatBuffer(result);
    console.log(finalData);
    // fs.writeFile(`lol/message.mp4`, Buffer.from(finalData), "binary", (err) => {
    //     if (err) throw err;
    //     console.log("done");
    // })
    saveAs("gagga", finalData, "video/mp4");
}

function downloadComplete3(url) {
    const a = document.createElement("a");
    a.download = "test" || Math.random();
    a.href = url;
    a.click();

}

export default downloadComplete;