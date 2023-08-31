import requests
from bs4 import BeautifulSoup
import re
import json
import shutil
import time


def scrapePlayBackresponse(url: str):
    res = requests.get(url)
    pattern = re.compile('var ytInitialPlayerResponse = (.*?)};', re.MULTILINE | re.DOTALL)
    soup = BeautifulSoup(res.content.decode(), "html.parser")
    scripts = soup.find_all('script')
    for script in scripts:
        if pattern.match(str(script.string)):
            data = pattern.match(script.string)
            return json.loads(data.groups()[0] + '}')


def adaptiveFormatsParser(data: dict):
    finalFormats = []
    adaptiveFormats = list(data['streamingData']['adaptiveFormats'])
    adaptiveFormatsVideo = list(filter(lambda i: str(i['mimeType']).startswith('video'), adaptiveFormats))
    adaptiveFormatsAudio = list(filter(lambda i: str(i['mimeType']).startswith('audio'), adaptiveFormats))
    for video in adaptiveFormatsVideo:
        for audio in adaptiveFormatsAudio:
            if getMime(video['mimeType'])['ext'] == getMime(audio['mimeType'])['ext']:
                finalFormats.append({'video': video, 'audio': audio, 'mimeType': getMime(video['mimeType'])})
    if finalFormats:
        return finalFormats
    else:
        return False


def normalFormatsParser(data: dict):
    normalFormats = list(data['streamingData']['formats'])
    if normalFormats:
        for format_ in normalFormats:
            format_['mimeType'] = getMime(format_['mimeType'])

        return normalFormats
    else:
        return False


def getMime(mime: str):
    mimeType = mime.split(';')[0]
    return {'mime': mimeType, 'type': mimeType.split('/')[0], 'ext': mimeType.split('/')[1]}


def scrapePlayBackFormats(url: str):
    data = scrapePlayBackresponse(url)
    formats = normalFormatsParser(data)
    #maps = {'y': adaptiveFormatsParser, 'n': normalFormatsParser}
    #formats = adaptiveFormatsParser(data)
    # for i, form in enumerate(formats, start=1):
    #     mime = form['mimeType']['ext']
    #     #print(f"{i}. {mime} - {form['video']['qualityLabel']} - {form['video']['fps']} FPS | {form['audio']['audioQuality']} - {form['audio']['bitrate']} Bitrate")
    # #inp = int(input("choose one: "))

    return formats


