
import asyncio
import concurrent.futures
import functools
import requests
import os
import shutil

def get_size(url):
    response = requests.head(url, allow_redirects=True)
    size = int(response.headers['Content-Length'])
    return size


def download_range(url, start, end, output):
    print(f"starting for {output}")
    headers = {
        'Range': f'bytes={start}-{end}',
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    }
    resp = requests.get(url, headers=headers, stream=True, allow_redirects=True)

    with open(output, 'wb') as f:
        shutil.copyfileobj(resp.raw, f)
        print(f"ended for {output}")


def downloadFileFromPlayBackURL(url: str, outputFile: str, threads: int = 4):
    file_size = get_size(url)
    chunk_size = int(file_size / threads) + 1
    chunks = range(0, file_size, chunk_size)

    with concurrent.futures.ThreadPoolExecutor(max_workers=threads) as executor:
        tasks = [
            executor.submit(download_range, url, start, start + chunk_size - 1, f'{outputFile}.part{i}')
            for i, start in enumerate(chunks)
        ]
        concurrent.futures.wait(tasks)


    with open(outputFile, 'wb') as out:
        for i in range(len(chunks)):
            chunk_path = f'{outputFile}.part{i}'
            with open(chunk_path, 'rb') as s:
                out.write(s.read())
            os.remove(chunk_path)
