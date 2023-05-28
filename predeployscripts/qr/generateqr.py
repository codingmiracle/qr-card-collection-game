# 4*9 super rare, 8*5 rare, 24* 2 common

import qrcode
import os
import random

from supabase_py import create_client, Client 

#url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
#key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
#supabase: Client = create_client(url, key)

#response = supabase.table('qr').select("*").execute()
#print(response)

#data, count = supabase.table('qr').insert({"code": "153","rarity": 1}).execute()
#print(data, count)



foldername = "C:/Schule/mdm/qr-card-collection-game/predeployscripts/qr/folder1/"

data = random.randint(111111,999999)
imagenames = [data]
#image = qrcode.make(data)
#image.save(foldername + "folder" + "1/" + "test.png")

i = 1
while i < (4*9)+(5*8)+(24*2):
   data = random.randint(111111,999999)
   if imagenames.count(data) == 0:
       imagenames.append(data)
       i += 1
a = 0
for i in imagenames:
   image = qrcode.make(i)
   if a < (4*9):
      image.save(foldername + "3" + "t" + str(i) + ".png")
   elif a < (8*5)+(4*9):
      image.save(foldername + "2" + "t" + str(i) + ".png")
   else:
      image.save(foldername + "1" + "t" + str(i) + ".png")
   a += 1

   #image.save(foldername + i + ".png")

#imagenames = ["t1","t2","t3","t4"]

#for i in imagenames:
 #   image.save(foldername + i + ".png")