import os.path

import dotenv
from supabase import Client, create_client

from config import *

dotenv.load_dotenv()
url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(url, key)

# uploading images: browser

for name in legendary:
    title = titles.get(name)
    res = supabase.table('card').insert(
        {'img_link': f"{url}/storage/v1/object/public/card_images/{name}_1.png", 'title': title, 'name': name, 'rarity': 2}).execute()
    print(res, res)

for name in rare:
    title = titles.get(name)
    res = supabase.table('card').insert(
        {'img_link': f"{url}/storage/v1/object/public/card_images/{name}_1.png", 'title': title, 'name': name, 'rarity': 1}).execute()
    print(res, res)

for name in common:
    title = titles.get(name)
    res = supabase.table('card').insert(
        {'img_link': f"{url}/storage/v1/object/public/card_images/{name}_1.png", 'title': title, 'name': name, 'rarity': 0}).execute()
    print(res, res)
