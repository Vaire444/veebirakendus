# veebirakendus

## serveri seadistamiseks installime

`npm init -y`

## Dependencies

- express - võimaldab määratleda oma rakenduse marsruudid HTTP-meetodite ja URL-ide põhjal
- mongoose - kasutatakse ühenduse loomiseks meie MongoDB andmebaasiga.
- EJS on lihtne templiidikeel, mis võimaldab luua HTML-i märgistuse lihtsa JavaScripti abil.

`npm i express mongoose ejs`

## Dev dependencies

- nodemon - automaatselt taaskäivitab node rakenduse, kui mingid on tehtud mingeid muudatusi

`npm i --save-dev nodemon`

## Libraries marked, slugify

artikklite id-d aadressiribal ilusaks

`npm i marked slugify`

## Module method-override

- method-override - Võimaldab kasutada HTTP-verbe nagu PUT või DELETE kohtades, kus klient seda ei toeta.(kustutamise nupp)

`npm i method-override`

## Libraries DOMPurify jsdom

- DOMPurify desinfitseerib HTML-i ja hoiab ära XSS-rünnakud
- jsdom on paljude veebistandardite, eriti WHATWG DOM- ja HTML-standardite puhas JavaScripti rakendus, mis on mõeldud kasutamiseks Node.js-iga.

`npm i domburify jsdom`

## Kasutaja lisamiseks, autentimiseks dependencies

- body-parser - kasutatakse HTTP post taotluste käsitlemiseks ja sissetuleva päringu voo kogu keha ekstraheerimiseks ning selle kuvamiseks req.body-le.
- cookie-prser - kasutatakse küpsiste sõelumiseks
- bcrypt - kasutatakse paroolide räsimiseks ja võrdlemiseks
- jsonwebtoken - JSON-i Web Tokens (JWT) on avatud standard, mis määratleb kompaktse ja iseseisva viisi, kuidas osapoolte vahel JSON-objektina turvaliselt teavet edastada

`npm i body-parser cookie-parser bcrypt jsonwebtoken`
`npm install express-sessions`
`npm i --save connect-flash`

# Server

Ühnduse loomine
`npm run devStart`

Ühendus pordil:
`localhost:5000`


# GitHub

`git add .`

`git commit -m <"kommentaar">`

`git push`

# Kasutatud peamine materjal:

https://www.youtube.com/watch?v=1NrHkjlWVhM

https://medium.com/@sarthakmittal1461/to-build-login-sign-up-and-logout-restful-apis-with-node-js-using-jwt-authentication-f3d7287acca2
