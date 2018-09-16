#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Sep 15 09:42:33 2018

@author: michael
"""


from InstagramAPI import InstagramAPI
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw 
import requests

#InstagramAPI = InstagramAPI("know_your_foodprint", "ThisIsFoodprint")
#InstagramAPI.login()  # login

def get_media_id(url):
    req = requests.get('https://api.instagram.com/oembed/?url={}'.format(url))
    media_id = req.json()['media_id']
    return media_id

InstagramAPI = InstagramAPI("know_your_foodprint", "ThisIsFoodprint")
InstagramAPI.login()

InstagramAPI.comment(mediaId="1868849409401728190_8586045462", commentText="test")

