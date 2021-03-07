# veebirakendus

installed dependencies:
express body-parser cookie-parser bcrypt mongoose jsonwebtoken nodemon

## POSTMAN

### kasutaja registreerimine

POST `localhost:5000/API/register`

```
{
    "firstname": "Lepa",
    "lastname":"Puravik",
    "email":"lepp@vikk.ee",
    "password": "87654321",
     "password2": "87654321"
    }

```

### Kasutaja sisselogimine

POST `localhost:5000/api/login`

```
{
    "email":"lepp123@vikk.ee",
    "password": "87654321"
    }

```

### Sisselogitud kasutajate leidmine

GET `localhost:5000/api/profile`

Kui on sisselogitud kasutajaid, kuvab tulemust nagu all näha

```
{
    "isAuth": true,
    "id": "6044def612256a0d34811bcd",
    "email": "lepp123@vikk.ee",
    "name": "LepaPuravik"
}

```

### Väljalogimine

localhost:5000/api/logout

## Page rights

ADMIN user

```
{

    "accessType": "ADMIN",
    "firstname": "Suvi",
    "lastname":"Päike",
    "email":"suvi123@vikk.ee",
    "password": "87654321",
     "password2": "87654321"
    }
```

NOT_ADMIN(default) user

```
   {
    "firstname": "Lepa",
    "lastname":"Puravik",
    "email":"lepp@vikk.ee",
    "password": "87654321",
    "password2": "87654321"
    }
```

https://medium.com/@sarthakmittal1461/to-build-login-sign-up-and-logout-restful-apis-with-node-js-using-jwt-authentication-f3d7287acca2

localhost:5000/api/profile
