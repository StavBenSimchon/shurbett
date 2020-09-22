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

config={
    "splash_url": "splash",
    "splash_port": 8050
}
new_conf = parse_yaml('./config.yaml')
config = config | new_conf
req_param = {
    'url': f"{config['base_url']}{config['uri']}",
    'wait': 5
}

r = requests.get(f"http://{config['splash_url']}:{config['splash_port']}/render.html", params=req_param)
soup = BeautifulSoup(r.text, "lxml")
urls = parse_pages(soup.select('.market_count'), config['base_url'])
for url in urls:
    req_param = {
    'url': url,
    'wait': 5
    }
    r = requests.get(f"http://{config['splash_url']}:{config['splash_port']}/render.html", params=req_param)
    soup = BeautifulSoup(r.text, "lxml")
    breakpoint()
    # print(soup.select('.columns_2'))
    # def has_class_but_no_id(tag):
    #     return tag.has_attr('class') and 'columns_2' in tag['class'] and tag.name == 'td'
    breakpoint()
    a = soup.select('.columns_2')
    print(len(a))
    # soup.select('.stylelistrow, .otherclassname')
    pass
# Find tags directly beneath other tags:

soup.select("head > title")
# [<title>The Dormouse's story</title>]
soup.select("p > #link1")
# [<a class="sister" href="http://example.com/elsie" id="link1">Elsie</a>]
# https://www.crummy.com/software/BeautifulSoup/bs4/doc/#css-selectors