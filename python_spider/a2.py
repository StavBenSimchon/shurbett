from bs4 import BeautifulSoup
from requests_html import HTMLSession
from pprint import pprint
# create an HTML Session object
session = HTMLSession()
# Use the object above to connect to needed webpage
resp = session.get("https://finance.yahoo.com/quote/NFLX/options?p=NFLX")
# Run JavaScript code on webpage
import os.path 
if os.path.isfile('/root/.local/share/pyppeteer/local-chromium/588429/chrome-linux/chrome'):
    print("exists")
else:
    print("not exists")
s = resp.html.render()
soup = BeautifulSoup(resp.html.html, "lxml")
breakpoint()
pprint(s)
pprint(soup)