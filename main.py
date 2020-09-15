import os
import time
import io
import requests
import selenium
from selenium import webdriver 
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait 
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import TimeoutException#Install Driver
option = webdriver.ChromeOptions()
option.add_argument(“ — incognito”)
browser = webdriver.Chrome( chrome_options=option)
browser.get("https://www.winner.co.il/mainbook/sport-%D7%9B%D7%93%D7%95%D7%A8%D7%92%D7%9C/ep-%D7%9E%D7%95%D7%A2%D7%93%D7%95%D7%A0%D7%99%D7%9D-%D7%91%D7%99%D7%A0%D7%9C%D7%90%D7%95%D7%9E%D7%99%D7%99%D7%9D/ep-%D7%9E%D7%95%D7%A7%D7%93%D7%9E%D7%95%D7%AA-%D7%9C%D7%99%D7%92%D7%AA-%D7%94%D7%90%D7%9C%D7%95%D7%A4%D7%95%D7%AA/event-%D7%93%D7%99%D7%A0%D7%9E%D7%95-%D7%A7%D7%99%D7%99%D7%91---%D7%90%D7%9C%D7%A7%D7%9E%D7%90%D7%A8")