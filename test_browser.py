from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

options = Options()
options.add_argument('--headless')
driver = webdriver.Chrome(options=options)
driver.get('file:///c:/Users/zain/Desktop/purity-test-website/index.html')
time.sleep(2)
for entry in driver.get_log('browser'):
    print(entry)
driver.quit()
