**IMPORTANT**
This will run locally on PORT 3000

Download Postman or Curl it on CMD
import the Amaysim.postman_collection.json to Postman

endpoints:
GET - localhost:3000/
POST - localhost:3000/api/cart/:promoCode

item names:
Unlimited 1GB
Unlimited 2GB
Unlimited 5GB
1 GB Data-pack

*required parameters on body:
{
    "item1": {"item": "Unlimited 1GB", qty: 1}
    "item2": {"item": "Unlimited 2GB", qty: 1}
}

optional:
promoCode

**for code reviewing
> Go to "amaysim-demo/src" folder

========================================================
========================================================
**INSTRUCTIONS**

> Go to the amaysim-demo Folder
> open CMD run npm install
> run npm start
> go to postman or curl on CMD the endpoint of
POST - localhost:3000/api/cart/:promoCode
> Read carefully the IMPORTANT notice above

