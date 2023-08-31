import axios from "axios";
import fs from 'fs';
const threads = 32;


async function getHead(url) {
    return await axios.head(url)
        .then(res => parseInt(res.headers["content-length"]));
}

async function downloadRange(url, range, index, resolve) {
    console.log(`starting download for range: ${range}`);
    const response = await axios.get(url, {
        headers: { range: range},
        responseType: "stream",

    })
    
    let totalContentSize = 0;
    const oneChunkSize = response.headers["content-length"]
    const list = []
    const stream = response.data;
    stream.on('data', data => {
        list.push(data);
        totalContentSize += data.length;
        console.log(`${totalContentSize}/${oneChunkSize} | ${totalContentSize/oneChunkSize*100}`);
    });

    stream.on('end', () => {
        console.log("stream done");
        resolve({stream: Buffer.concat(list), index: index});
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

const url = "https://rr4---sn-qxaelnes.googlevideo.com/videoplayback?expire=1680300009&ei=iQMnZIKPC93y3LUPzO-2uAs&ip=103.170.81.51&id=o-ALOfWz9spaPROFfBnfgONselfOWsDDB5spXH5ClI7JbL&itag=398&aitags=133,134,135,136,137,160,242,243,244,247,248,278,394,395,396,397,398,399&source=youtube&requiressl=yes&spc=99c5Cagw1eFfXGP-YKCCZfGfki3YKyDM7CfmE0iZdw6cPnfZSCh2_-uD9jFwDe4&vprv=1&mime=video/mp4&ns=gxlL395rMtMrhgkMqUjT7mMM&gir=yes&clen=487085735&dur=3599.965&lmt=1632217667408160&keepalive=yes&fexp=24007246,24424483&c=WEB&txp=5531432&n=Le-WadTsdmuh8Q&sparams=expire,ei,ip,id,aitags,source,requiressl,spc,vprv,mime,ns,gir,clen,dur,lmt&sig=AOq0QJ8wRAIgH-yBG4Y0TqHvqxkjIcvkvm0cDUcRX_hVWK09m73QpBECIH07LgS0yDalmxGSCI3l1Nit7p1QMbGqtlsUwnO33us6&alr=yes&cpn=wr-Rt58prlCHCPRh&cver=2.20230327.07.00&redirect_counter=1&cm2rm=sn-xmjpuxa-qxar7l&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=us&mm=29&mn=sn-qxaelnes&ms=rdu&mt=1680278027&mv=m&mvi=4&pl=24&lsparams=ipbypass,mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgAa5LKIlC8avm8PouX7P5BDfxubYPvePITJNeePjoYYoCIHoha9RTFRaTDpPv9XDJuJ33ibp2TC0j896PxZEdNFka&rn=48&rbuf=0&pot=MlsqWJVLxtzIPSpgtoQ363LoZIA-VboWYc7jaVIme8gtIm5wvueJ65SuWON50Vlo7uykGS54GaGHqN3_s1zzLmSJeLRlMnEFePbHvIcRp9XyjNnQCVdskEBvOEvy";

async function main() {
    const result = await download(url, threads)
    console.log(result);
    const finalData = concatBuffer(result);
    console.log(finalData);
    fs.writeFile(`lol/message.mp4`, Buffer.from(finalData), "binary",  (err) => {
        if (err) throw err;
        console.log("done");
    })
}
await main()