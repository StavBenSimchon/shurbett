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

def parse_pages(in_arr):
    for i in in_arr:
        pass

headers = {'Content-Type': 'application/json'}

config={
    "splash_url": "splash",
    "splash_port": 8050,
    "req_headers": headers
}
new_conf = parse_yaml('./config.yaml')
config = config | new_conf
req_param = {
    'url': f"{config['base_url']}{config['uri']}"
}

r = requests.post(f"http://{config['splash_url']}:{config['splash_port']}/render.html", headers=config['req_headers'], data = json.dumps(req_param))
soup = BeautifulSoup(r.text, "lxml")
breakpoint()
print(len(soup.select('market_count')))
# print(len(soup.find_all('span',class_='market_count')))
# print(soup.find_all('span',class_='market_count')[0].a['href'])