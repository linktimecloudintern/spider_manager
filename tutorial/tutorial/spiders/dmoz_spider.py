
'''
This file is to crawl articles in www.csdn.net/nav/cloud.
'''
import scrapy
from scrapy.spiders import Rule
from scrapy.linkextractors import LinkExtractor
import json
class DmozSpider(scrapy.Spider):
    name = "dmoz"
    COUNT_MAX = 300
    count = 0

    cookies_1 = {
        'uuid_tt_dd': '10_21630626100 - 1516760914556 - 300086',
        'UM_distinctid': '163d3358cec2a9 - 0e791f1fd3690e - 336e7707 - 13c680 - 163d3358d044e0',
        '__utma': '17226283.595916398.1528365425.1528365425.1528365425.1',
        '__utmz': '17226283.1528365425.1.1.utmcsr = (direct) | utmccn = (direct) | utmcmd = (none)',
        'dc_session_id': '10_1529980817719.629219',
        'csdn_cart_user_id': '-1047718386',
        'cache_cart_num': '0',
        'Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac': '1533028678, 1533181224, 1533196325, 1533535441',
        'Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac': '1533869843',
        'dc_tos': 'pd85jn',
        'ADHOC_MEMBERSHIP_CLIENT_ID1.0': '48de874c-ffc6-dd77-e583-7d226ede40c6'
    }


    def start_requests(self):
        url = "https://www.csdn.net/nav/cloud"

        yield scrapy.Request(url, self.parse)

    def parse(self, response):
        # follow links to author pages

        for href in response.css('ul div div h2 a::attr(href)').extract():
            yield response.follow(href, callback=self.parse_article)

        # follow pagination links
        shown_offset = str(response.css('[id = feedlist_id] ::attr(shown-offset)').extract_first())
        # print(shown_offset)

        yield scrapy.Request('https://www.csdn.net/api/articles?type=more&category=cloud&shown_offset={0}'.format(shown_offset),
                             method='GET',
                             callback=self.parse_next_page, cookies=self.cookies_1)
    def parse_next_page(self, response):
        body = json.loads(response.body_as_unicode())
        for content in body['articles']:
            # print(content['url'])
            yield response.follow(content['url'], callback=self.parse_article)

        # print(body['shown_offset'])
        if (self.count < self.COUNT_MAX):
            yield scrapy.Request(
            'https://www.csdn.net/api/articles?type=more&category=cloud&shown_offset={0}'.format(str(body['shown_offset'])),
            # method='GET',
            callback=self.parse_next_page, cookies=self.cookies_1)

    def parse_article(self, response):

        def extract_with_css(query):
            return response.css(query).extract_first()


        yield {

            'title' : extract_with_css('title::text'),
            # 'head' : ' '.join(article_content)
            'url' : extract_with_css('head link::attr(href)')
        }
