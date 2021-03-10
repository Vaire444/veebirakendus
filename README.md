# veebirakendus

## serveri seadistamiseks installime

`npm init -y`

## Sõltuvused(Dependencies)

- express - võimaldab määratleda oma rakenduse marsruudid HTTP-meetodite ja URL-ide põhjal
- mongoose - kasutatakse ühenduse loomiseks meie MongoDB andmebaasiga.

`npm i express mongoose ejs`

## Dev sõltuvused(dependencies)

- nodemon - automaatselt taaskäivitab node rakenduse, kui mingid on tehtud mingeid muudatusi

`npm i --save-dev nodemon`

## Raamatukogu(Libraries) marked, slugify

artikklite id-d aadressiribal ilusaks

`npm i marked slugify`

## Moodul(Module) method-override

- method-override - Võimaldab kasutada HTTP-verbe nagu PUT või DELETE kohtades, kus klient seda ei toeta.(kustutamise nupp)

`npm i method-override`

## Raamatukogu(Libraries) DOMPurify jsdom

- DOMPurify desinfitseerib HTML-i ja hoiab ära XSS-rünnakud
- jsdom on paljude veebistandardite, eriti WHATWG DOM- ja HTML-standardite puhas JavaScripti rakendus, mis on mõeldud kasutamiseks Node.js-iga.

`npm i domburify jsdom`

## Kasutaja lisamiseks, autentimiseks lisame veel mõned sõltuvused (dependencies)

- body-parser - kasutatakse HTTP post taotluste käsitlemiseks ja sissetuleva päringu voo kogu keha ekstraheerimiseks ning selle kuvamiseks req.body-le.
- cookie-prser - kasutatakse küpsiste sõelumiseks
- bcrypt - kasutatakse paroolide räsimiseks ja võrdlemiseks
- jsonwebtoken - JSON-i Web Tokens (JWT) on avatud standard, mis määratleb kompaktse ja iseseisva viisi, kuidas osapoolte vahel JSON-objektina turvaliselt teavet edastada

`npm install body-parser cookie-parser bcrypt jsonwebtoken`

# Server

localhost:5000/api/profile

# POSTMAN

Postmanis tehtavad päringud

## kasutaja registreerimine

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

## Kasutaja sisselogimine

POST `localhost:5000/api/login`

```
{
    "email":"lepp123@vikk.ee",
    "password": "87654321"
    }

```

## Sisselogitud kasutajate leidmine

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

## Väljalogimine

localhost:5000/api/logout

## Page rights

Roles: admin, basic

```
{

    "role": "admin",
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

# Kasutatud peamine materjal:

https://www.youtube.com/watch?v=1NrHkjlWVhM

https://medium.com/@sarthakmittal1461/to-build-login-sign-up-and-logout-restful-apis-with-node-js-using-jwt-authentication-f3d7287acca2
