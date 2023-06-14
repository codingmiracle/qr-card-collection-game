# 4*9 super rare, 8*5 rare, 24* 2 common

import os
import random

import dotenv
import qrcode

from PIL import Image, ImageDraw, ImageFont, ImageOps
from supabase import create_client, Client

num_legendary = 4
num_rare = 10
num_common = 21
qrs_per_legendary = 9
qrs_per_rare = 5
qrs_per_common = 3
foldername = "generated/"

dotenv.load_dotenv()
url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)
ms = ImageFont.FreeTypeFont('assets/Montserrat-Bold.ttf', size=32, )
os.mkdir(foldername)


data = random.randint(111111, 999999)
imagenames = [data]

for i in range((num_rare * qrs_per_rare) + (num_legendary * qrs_per_legendary) + (num_common * qrs_per_common)):
    data = random.randint(111111, 999999)
    if imagenames.count(data) == 0:
        imagenames.append(data)

numcards = 0
for code in imagenames:
    qr_image = qrcode.make(f"https://htlel-dev.codingmiracle.at/draw/{code}").convert("RGBA")
    img_draw = ImageDraw.Draw(qr_image)
    img_draw.text((200, 395), f"{code}", fill='black', font=ms, anchor='mm')
    if numcards < (num_legendary * qrs_per_legendary):
        rarity = 2
        blend_img = Image.open("assets/legendary4.png").resize((410, 410))
    elif numcards < (num_rare * qrs_per_rare) + (num_legendary * qrs_per_legendary):
        rarity = 1
        blend_img = Image.open("assets/rare4.png").resize((410, 410))
    else:
        rarity = 0
        blend_img = Image.open("assets/common4.png").resize((410, 410))
    qr_image.paste(blend_img, (0, 0), blend_img)
    ImageOps.expand(qr_image, border=10, fill='white').save(foldername + str(rarity) + "r" + str(code) + ".png")
    
    print(supabase.table('qr').insert({"code": code, "rarity": rarity}).execute())
    numcards += 1
