from bs4 import BeautifulSoup
import os
import json

list_html_file_path = 'D:\github\wed201c'

list_html = [i for i in os.listdir(list_html_file_path) if i.endswith('.html')]


list = []

for i in list_html:
    with open(os.path.join(list_html_file_path, i), 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
        # find all section
        list_section = soup.find_all('section')

        for section in list_section:
            # title is the fisrt h- tag in section
            title = section.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
            if title:
                title = title[0].text.strip().replace('\n', ' ').replace('\r', '')
            else:
                title = 'No title'
            # content is text after title and before next title
            content = section.text.strip()
            list.append({
                'title': title,
                'content': content.strip().replace('\n', ' ').replace('\r', '')
            })

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(list, f, ensure_ascii=False, indent=4)

