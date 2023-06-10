# 4*9 super rare, 8*5 rare, 24* 2 common

import os
import random

import dotenv
import qrcode
from supabase import create_client, Client

num_legendary = 4
num_rare = 8
num_common = 24
qrs_per_legendary = 9
qrs_per_rare = 5
qrs_per_common = 3
foldername = "assets/"

dotenv.load_dotenv()
url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)
os.mkdir(foldername)

data = random.randint(111111, 999999)
imagenames = [data]

for i in range((num_rare * qrs_per_rare) + (num_legendary * qrs_per_legendary) + (num_common * qrs_per_common)):
    data = random.randint(111111, 999999)
    if imagenames.count(data) == 0:
        imagenames.append(data)

numcards = 0
for code in imagenames:
    image = qrcode.make(f"https://htlel-dev.codingmiracle.at/draw/{code}")
    if numcards < (num_legendary * qrs_per_legendary):
        rarity = 2
    elif numcards < (num_rare * qrs_per_rare) + (num_legendary * qrs_per_legendary):
        rarity = 1
    else:
        rarity = 0

    image.save(foldername + str(rarity) + "r" + str(code) + ".png")
    print(supabase.table('qr').insert({"code": code, "rarity": rarity}).execute())
    numcards += 1
