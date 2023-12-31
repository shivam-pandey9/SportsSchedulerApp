print("Python Script Triggered")

import requests
from bs4 import BeautifulSoup
import csv
from datetime import datetime
import pytz



def convert_to_gmt530(date_string):
    # instead just cleaned date , didn't convert
    date1 = date_string.split('/')[0].strip()
    date_c = date1.split(',')
    date = date_c[1]
    date = date.split(' ')
    day = date_c[0]
    date_no = date[2]
    date_month=date[1]  
    time1 = date_string.split('/')[1].strip().split(' ')
    time = time1[0]
    tp = time1[1]
    gm = time1[2]+" (-5:00)";
    ans = date_no+' '+date_month+' '+time+' '+tp+' '+gm + ' '+day
    return ans



def update_ufc_schedule():
    url = "https://www.ufc.com/events"
    response = requests.get(url)
    if response.status_code == 200:
        with open("../Design/data.csv", mode='a') as file:
            print("file opened successfully")
            
            soup = BeautifulSoup(response.text, 'html.parser')
            fight_cards = soup.find(id = 'events-list-upcoming')
            cards = fight_cards.find_all(class_='c-card-event--result')
            
            for card in cards:
                event = card.find_all(class_='c-card-event--result__headline')[0].find('a').text.strip()
                date = card.find_all(class_='c-card-event--result__date')[0].text.strip()
                local_date = convert_to_gmt530(date)
                location = card.find_all(class_='address')[0].find(class_='country').text.strip()
                date_end = "1-day"
                watch = "SonyLiv/Jiotv"
                comment = ""
                dataTowrite = event+','+local_date+','+date_end+','+location+','+watch+','+comment+"\n"
                file.write(dataTowrite)
            print("Updated Ufc Schedule to file Successfully")
    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")

update_ufc_schedule()
