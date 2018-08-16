
from scrapy import cmdline
# cmdline.execute("rm -r items.json".split())
cmdline.execute("scrapy crawl dmoz -o items.json".split())

