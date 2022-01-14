Digital Envision Test

Add User

POST localhost:3000/user
send this for the body JSON
```
{
  "first_name": "John",
  "last_name": "Doe",
  "birthday_date": "14-Jan-2000",
  "location": "Asia/Jakarta"
}
```

List format location
```
Asia/Jakarta
Asia/Singapore
Asia/Taipei
Asia/Shanghai
America/New_York
America/Chicago
Australia/Sydney
Australia/Melbourne
```

Delete User

DELETE localhost:3000/user/:id
```
localhost:3000/user/61e0f32b1259ba90ff6a1e36
```

POSTMAN Collection
https://www.getpostman.com/collections/de642d416c97ec11adf1
