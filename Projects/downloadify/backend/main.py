from scrapeURL import scrapePlayBackFormats, scrapePlayBackresponse
from downloader import downloadFileFromPlayBackURL
from flask_cors import CORS
import requests
import json

URL = "https://www.youtube.com/watch?v=vMc8v36mpQA"
# THREADS = int(input('Enter Threads: '))
#data1 = scrapePlayBackData(URL)
#downloadFileFromPlayBackURL(data1['url'], "out.mp4", THREADS)
# with requests.Session() as session:
#     data = scrapePlayBackresponse(session, URL)
#     print(data['videoDetails'])

from flask import Flask, request

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "Hello, World!"


@app.get("/video/details/")
def getVideoDetails():
    code = request.args.get('code')
    dataRaw = scrapePlayBackresponse(f"https://www.youtube.com/watch?v={code}")

    return dataRaw['videoDetails']


@app.get("/video/formats/")
def getVideoFormats():
    code = request.args.get('code')
    dataRaw = scrapePlayBackFormats(f"https://www.youtube.com/watch?v={code}")

    return dataRaw


if __name__ == '__main__':
    app.run()

