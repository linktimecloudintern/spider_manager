# Introduction to Spider
The starter project is to crawl articles and find the association rules between phrases in the articles.

##0 How to run
Run begin.py file and spider will work.

##1 Crawl Articles
Only crawled around 550 articles, may due to anti-spider and store in items_1.json.

- The scrapy project is named tutorial.
- This spider is named "dmoz".
- The start url is https://www.csdn.net/nav/cloud.
- The main python files are items.py, pipelines.py, spiders/dmoz_spider.py, begin.py.

###1. spiders/dmoz_spider.py
- Name spider
- Define start url
- Parse function: one to parse the start page, one to parse pagination link, one to parse article page

###2. items.py
- Define item

###3. pipelines.py
- Store item to json file and make sure words are stored as Chinese.

###4. begin.py
- To run the spider
