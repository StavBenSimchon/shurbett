from bs4 import BeautifulSoup
import requests
import json
import yaml
import os.path
from pprint import pprint
import json

def parse_yaml(fp):
    if not os.path.isfile(fp):
        raise Exception("not a file") 
    with open(fp) as file:
        return yaml.load(file,Loader=yaml.FullLoader)
config={
    "splash_url": "splash",
    "splash_port": 8050
}
new_conf = parse_yaml('./config.yaml')
config = config | new_conf
req_param = {
    'url': f"https://www.10bet.com/sports/",
    'wait': 30,
    'html': 1
}

r = requests.get(f"http://{config['splash_url']}:{config['splash_port']}/render.json", params=req_param)
jr = json.loads(r.text)
breakpoint()
soup = BeautifulSoup(jr['html'], "lxml")
breakpoint()