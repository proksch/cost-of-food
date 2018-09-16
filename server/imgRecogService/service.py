# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""



#!flask/bin/python
from flask import Flask
from flask import request
from InstagramAPI import InstagramAPI
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw 
import requests
import ssl

import uuid 



import subprocess
import urllib.request




context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
context.load_cert_chain('MyCertificate.crt', 'MyKey.key')

app = Flask(__name__)


InstagramAPI = InstagramAPI("know_your_foodprint", "ThisIsFoodprint")
InstagramAPI.login()

def make_square(im, text = "(text string missing)", min_size=256, fill_color=(255, 255, 255, 255)):
    
    padding = 20;
    
    x, y = im.size
    size = max(min_size, x, y)
    new_im = Image.new('RGBA', (size, size), fill_color)
    new_im.paste(im, (int((size - x) / 2), int((size - y) / 2)))
    x, y = new_im.size
    
    draw = ImageDraw.Draw(new_im)
    # font = ImageFont.truetype(<font-file>, <font-size>)
    font = ImageFont.truetype("/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf", 50)
    

    w, h = font.getsize(text)
    
    x = x/2 - w/2
    
    y = y-h 
    
    draw.rectangle((x-padding, y-padding, x + w + padding, y + h + padding), fill=(255,255,255,70))
    draw.text((x, y-padding/2), text, fill=(40, 40, 40), font=font)

    
    return new_im.convert("RGB")

def get_media_id(url):
    req = requests.get('https://api.instagram.com/oembed/?url={}'.format(url))
    media_id = req.json()['media_id']
    return media_id





@app.route('/label')
def label():
    imageUrl = request.args.get('imageUrl')
    
    fileName= uuid.uuid4().hex[:32]
    
    
    urllib.request.urlretrieve(imageUrl, fileName + ".jpg")

    p = subprocess.check_output(["python3", "label_image.py", "--graph=output_graph_medium.pb", "--labels=output_labels_medium.txt", "--input_layer=Placeholder","--output_layer=final_result", "--image=" + fileName + ".jpg"])


    print (p)
    
    q = p.decode('utf-8').split('\n')[0]
    
    value = float(q.strip().split(" ")[-1])
    
    if (value > 0.5):
        identifier = q.rsplit(' ', 1)[0]
        return identifier
    else:
        return "unknown"
    
    # return "this is a burger"


@app.route('/postImage')
def postImage():
        
    imageUrl = request.args.get('imageUrl')
    text = request.args.get('text')
    caption = request.args.get('caption')
    
    fileName= uuid.uuid4().hex[:32]
    
    
    urllib.request.urlretrieve(imageUrl, fileName + ".jpg")
    
    
    test_image = Image.open( fileName + ".jpg")
    new_image = make_square(test_image, text)
    new_image.save( fileName + "-sq.jpg")
    
    
    
    photo_path = fileName + "-sq.jpg"
    # caption = "Water usage: 100m² 🌱"
    InstagramAPI.uploadPhoto(photo_path, caption=caption)
    
    
    return "ok with: " + fileName + "-sq.jpg -- " + caption + " -- " +  text 



@app.route('/postComment')
def postComment():
    comment = request.args.get('comment')
    url = request.args.get('url')
       
    mediaId = get_media_id(url)
    
    
    
    InstagramAPI.comment(mediaId=mediaId, commentText=comment)
    
    
    return "ok with: " + comment + " -- " + mediaId



if __name__ == '__main__':
    app.run(host="0.0.0.0", ssl_context=context)
    # app.run(host="0.0.0.0")
