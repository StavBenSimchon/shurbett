from bs4 import BeautifulSoup
import requests
import json
import yaml
import os.path
from pprint import pprint

def parse_yaml(fp):
    if not os.path.isfile(fp):
        raise Exception("not a file") 
    with open(fp) as file:
        return yaml.load(file,Loader=yaml.FullLoader)

def parse_pages(in_arr,base_url):
    ou_ar = []
    for i in in_arr:
        try:
            ou_ar.append(f"{base_url}{i.a['href']}")
        except:
            pass
    return ou_ar
headers = {'Content-Type': 'application/json'}

config={
    "splash_url": "splash",
    "splash_port": 8050,
    "req_headers": headers
}
new_conf = parse_yaml('./config.yaml')
config = config | new_conf
req_param = {
    'url': f"{config['base_url']}{config['uri']}",
    'wait': 5
}

r = requests.get(f"http://{config['splash_url']}:{config['splash_port']}/render.html", params=req_param)
soup = BeautifulSoup(r.text, "lxml")

print(len(soup.select('market_count')))
# print(len(soup.find_all('span',class_='market_count')))
# print(soup.find_all('span',class_='market_count')[0].a['href'])
urls = parse_pages(soup.find_all('span',class_='market_count'), config['base_url'])
for url in urls:
    req_param = {
    'url': url,
    'wait': 5
    }
    r = requests.post(f"http://{config['splash_url']}:{config['splash_port']}/render.html", params=req_param)
    soup = BeautifulSoup(r.text, "lxml")
    breakpoint()
    # print(soup.select('.columns_2'))
    def has_class_but_no_id(tag):
        return tag.has_attr('class') and 'columns_2' in tag['class'] and tag.name == 'td'
    breakpoint()
    a = soup.find_all(has_class_but_no_id)
    print(a.find_all('div'))
    # soup.select('.stylelistrow, .otherclassname')
    pass
# Find tags directly beneath other tags:

soup.select("head > title")
# [<title>The Dormouse's story</title>]
soup.select("p > #link1")
# [<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>]
# https://www.crummy.com/software/BeautifulSoup/bs4/doc/#css-selectors