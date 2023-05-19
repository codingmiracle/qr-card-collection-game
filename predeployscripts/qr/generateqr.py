# 4*9 super rare, 8*5 rare, 24* 2 common

import qrcode
import os
from supabase_py import create_client, Client 

url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

response = supabase.table('qr').select("*").execute()
print(response)

data = "hello world"
image = qrcode.make(data)
foldername = "C:/Schule/mdm/qr-card-collection-game/predeployscripts/qr/"


#image.save(foldername + "test.png")
#imagenames = ["t1","t2","t3","t4"]

#for i in imagenames:
 #   image.save(foldername + i + ".png")