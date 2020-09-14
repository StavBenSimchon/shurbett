import os
import selenium
from selenium import webdriver
import time
import io
import requests
#Install Driver
driver = webdriver.Chrome(ChromeDriverManager().install())
#Specify Search URL 
search_url='https://www.winner.co.il/mainbook/sport-%D7%9B%D7%93%D7%95%D7%A8%D7%92%D7%9C/ep-%D7%90%D7%A7%D7%95%D7%95%D7%93%D7%95%D7%A8/ep-%D7%90%D7%A7%D7%95%D7%95%D7%93%D7%95%D7%A8%D7%99%D7%AA-%D7%A8%D7%90%D7%A9%D7%95%D7%A0%D7%94/event-%D7%90%D7%95%D7%A8%D7%A0%D7%A1%D7%94---%D7%9E%D7%A7%D7%A8%D7%94'
# driver.get()