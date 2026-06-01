---
title: "Neuleohjeen toistot: tähdet ja hakasulkeet"
description: "Näin toistot toimivat neuleohjeissa. Esimerkit tähdistä, hakasulkeista, sisäkkäisistä toistoista ja ylijäävistä silmukoista."
publishDate: 2026-05-01
category: techniques
categoryOrder: 6
tags:
  [
    "neuleohjeen toistot",
    "tähti neuleohjeessa",
    "hakasulkeet neuleohjeessa",
    "miten neuleohjeen toistot luetaan",
  ]
lang: fi
translationKey: "knitting-pattern-repeats"
---

Toistojen avulla ohjeen ei tarvitse kirjoittaa jokaista silmukkaa auki 200 silmukan kerroksella. Sen sijaan että ohje sanoisi "2 o, 2 n, 2 o, 2 n, 2 o, 2 n..." kaksikymmentäviisi kertaa, se kirjoittaa `*2 o, 2 n; toista * kerroksen loppuun`. Sama lopputulos, paljon vähemmän tilaa.

Neuleohjeissa toistot merkitään tähdillä (\*), hakasulkeilla [] tai sulkeilla (). Ne rajaavat silmukkajakson, joka tehdään useita kertoja saman kerroksen aikana. Merkintä on tehokas, kun siihen tottuu. Ensimmäiset sisäkkäiset toistot tai tähdet ylijäävien silmukoiden kanssa voivat silti tuntua kieleltä, jota melkein ymmärtää.

## Tähtitoistot

Yleisin muoto. Tähti merkitsee toistettavan jakson alun.

**Yksinkertainen:** `*3 o, 1 n; toista * kerroksen loppuun.`

Neulo 3 oikein, 1 nurin, palaa tähteen, neulo 3 oikein, 1 nurin ja jatka, kunnes kerros on valmis. Kokonaismäärän pitää olla neljällä jaollinen, koska toistoyksikkö on 3 o + 1 n.

**Ylijäävillä silmukoilla:** `1 o, *2 o, 2 n; toista * viimeisiin 3 s asti, 3 o.`

Neulo 1 oikein ennen toiston alkua. Toista sitten 2 o, 2 n kerroksen poikki, ja kun jäljellä on 3 silmukkaa, ei enää kokonaista toistoa, neulo ne 3 oikein. Tähtijakson ulkopuolisia silmukoita kutsutaan tasapainottaviksi silmukoiksi tai reunasilmukoiksi. Niiden avulla kuvio alkaa ja päättyy symmetrisesti.

**Lukumäärällä:** `*lk, 2 o yhteen; toista * vielä 5 kertaa.`

"Vielä 5 kertaa" tarkoittaa, että teet jakson ensin kerran ja toistat sen sen jälkeen 5 kertaa lisää, yhteensä 6 kertaa. Tämä kompastuttaa monia. "Toista vielä 5 kertaa" = 6 yhteensä. Jos ohje sanoo "toista 5 kertaa" ilman sanaa "vielä", käytä silmukkamäärää varmistamaan, lasketaanko ensimmäinen kerta mukaan.

## Hakasulkeet ja sulkeet

Ne ovat visuaalisempia kuin tähdet.

**Hakasulkeet:** `[1 o, 1 n] 4 kertaa.`

Neulo 1 oikein ja 1 nurin neljä kertaa yhteensä. Kahdeksan silmukkaa, eli 4 kahden silmukan toistoa. Hakasulkeet ovat yksiselitteiset: numero on aina kokonaismäärä.

**Sulkeet:** `(2 o yhteen, lk) kerroksen loppuun.`

Sama ajatus. Sulkeiden sisällä oleva jakso toistuu koko kerroksen poikki.

**Sekamerkintä:** `2 o, [1 o, 1 n] 3 kertaa, *4 o, 2 n; toista * viimeisiin 2 s asti, 2 o.`

Sekä hakasulkeet että tähti samalla kerroksella. Lue vasemmalta oikealle: neulo 2 oikein, tee 1 o / 1 n kolme kertaa, eli 6 silmukkaa, ja toista sen jälkeen 4 o / 2 n loppua kohti, viimeistellen 2 oikein. Hakasuljetoisto tapahtuu kerran tietyssä kohdassa. Tähtitoisto täyttää jäljellä olevan leveyden.

## Sisäkkäiset toistot

Joskus toisto on toisen toiston sisällä. Useimmiten monimutkaisessa pitsissä tai kirjoneuleessa.

`*[1 o, 1 n] 3 kertaa, 2 o yhteen, lk; toista * kerroksen loppuun.`

Sisäinen toisto [1 o, 1 n] 3 kertaa tekee 6 silmukkaa joustinta. Sitten 2 o yhteen käyttää 2 silmukkaa ja tuottaa 1 silmukan, ja lk lisää uuden silmukan. Koko toistoyksikkö kuluttaa vasemmalta puikolta 8 silmukkaa ja palauttaa oikealle puikolle 8 silmukkaa. Sama yksikkö toistuu kerroksen poikki.

Lue sisäkkäiset toistot sisältä ulospäin. Ratkaise ensin hakasulje, ja käsittele sitten koko tähtijakso yhtenä toistoyksikkönä.

## Aloituskerrokset ja vakiintunut mallineule

Joissakin ohjeissa on set-up row tai set-up round ennen varsinaista toistoa. Aloituskerros järjestää silmukat siihen rytmiin, jota varsinainen mallineule tarvitsee. Ohje voi sanoa: `Set-up row: 2 o, *2 n, 2 o; toista * kerroksen loppuun. Beginning with Row 1, work in pattern as follows...`

Aloituskerros ei ole osa toistoa. Se tehdään kerran. Sen jälkeen mallineuleen ensimmäinen kerros jatkaa valmiista lähtötilanteesta.

"As established" tai "as set" myöhemmin ohjeessa viittaa tähän jo luotuun rytmiin. Jos villapaidan ohje sanoo "continue armhole shaping, working stitches as established", jatkat samoja oikeiden ja nurjien sarakkeita, palmikoita tai pitsiä, joita olet tehnyt siihen asti. Älä aloita mallineuletta alusta.

## Monen kerroksen toistot

Jotkut ohjeet kokoavat useita kerroksia yhdeksi jaksoksi.

```text
Kerrokset 1-4: *2 o, 2 n; toista * kerroksen loppuun.
Kerros 5: Neulo oikein.
Kerros 6: Neulo nurin.
Toista kerroksia 1-6, kunnes kappaleen pituus on 25 cm.
```

Tee 6 kerroksen jakso yhtenä kokonaisuutena ja toista koko jaksoa tavoitepituuteen asti. Kerrokset 1-4 ovat joustinta, kerrokset 5 ja 6 kontrastiosuus, ja koko paketti kiertää uudelleen.

Varo ohjeita kuten "toista viimeisiä 2 kerrosta" tai "toista vain kerrokset 3 ja 4". Ne tarkoittavat pienempää osaa edellisestä jaksosta, eivät koko 6 kerroksen sarjaa. Tässä kohtaa lasku menee helposti sekaisin, koska mieli nollaa kerrosnumerot. Kerroslaskuri tai paperille tehty viivalista ohittaa ongelman.

Tätä näkee tekstuuripinnoissa, raitajaksoissa ja pitsissä. Kerroslaskuri tai paperille tehty merkintä auttaa tässä, jolloin päässä ei tarvitse pitää, oletko nykyisen jakson kerroksella 3 vai 4.

## Silmukkamerkit toistojen väliin

Silmukkamerkit toistoyksiköiden välissä tekevät jokaisesta toistosta oman tarkistuspisteensä. Kun saavut seuraavalle merkille ja osion silmukkamäärä on väärä, tiedät täsmälleen missä väli meni pieleen. Koko kerrosta ei tarvitse purkaa virhettä etsiessä.

Pitsissä tämä säästää oikeasti aikaa. Toisto, jossa on langankiertoja ja kavennuksia, kuluttaa ja tuottaa yleensä saman määrän silmukoita, ellei ohje nimenomaan lisää tai vähennä. Jos merkille tullessa on yksi silmukka liikaa tai puuttuu yksi, virhe on edellisessä toistossa. Pura vain se väli.

Sisäkkäisissä kuvioissa kaksi eri merkkiväriä auttaa. Yksi väri rajaa ulommat toistot, toinen sisäiset toistot. Ensimmäisellä monimutkaisella huivilla se voi tuntua pikkutarkalta. Sitten se alkaa tuntua välttämättömältä.

## Kaaviot ja toistoruudut

Kaaviossa toisto merkitään usein rajatulla alueella, paksulla reunuksella tai värillisellä korostuksella. Rajattu alue on se silmukkajakso, joka toistetaan. Reunuksen ulkopuoliset silmukat tehdään kerran kerroksen alussa tai lopussa, usein reunuksena tai tasapainottavina silmukoina.

Tavallinen pitsikaavion rakenne: reunasilmukat oikealla, toistoruutu keskellä, reunasilmukat vasemmalla. Toistoruutu voi olla 8 tai 12 silmukkaa leveä. Neulot oikean reunan, sitten toistoruudun kerran, uudelleen ja uudelleen, kunnes jäljellä ovat vasemman reunan silmukat.

Joissakin kaavioissa on kaksi toistoaluetta: pystysuora toisto, joka kertoo toistuvat kerrokset, ja vaakasuora toisto, joka kertoo toistuvat silmukat. Pystylaatikko kertoo mallineuleen kerroskierron. Vaakasuora laatikko kertoo silmukkayksikön.

Lue merkkiselite ennen aloitusta. Suunnittelijat merkitsevät laatikot eri tavoin, ja väärin luettu raja sekoittaa koko mallineuleen.

## Apulanka monimutkaisiin toistoihin

Apulanka eli lifeline on sileä erivärinen lanka, usein hammaslankaa tai ohutta puuvillalankaa, joka pujotetaan valmiin kerroksen elävien silmukoiden läpi. Jos seuraavat 20 kerrosta menevät pieleen, voit purkaa apulankaan asti luottavaisin mielin. Jokainen silmukka pysyy tallessa apulangalla ja on valmis nostettavaksi takaisin puikolle.

Pitsissä ja monimutkaisissa palmikoissa apulanka kannattaa laittaa ennen kuin työ alkaa tuntua riskiltä. Pujota uusi apulanka 10-20 kerroksen välein tai luonnolliseen taukokohtaan, kuten kaaviotoiston loppuun tai ennen hankalaa osiota.

Paras kohta on aloituskerros, sileä kerros tai muu selkeä kerros, ei kerros jossa on langankiertoja. Langankierrot tekevät silmukoiden takaisin poimimisesta hankalampaa, koska osa niistä on avoimia aukkoja.

## Siirtyvät toistot

Kaikki toistot eivät ala joka kerroksella samasta silmukasta. Joissakin pitsi- ja kirjoneulekuvioissa toisto siirtyy sivusuunnassa muutaman kerroksen välein, jolloin syntyy vinokuvioita tai timantteja. Half-drop-toisto siirtää kuviota puolen toistoyksikön verran jokaisessa pystysuorassa mallikerrassa. Kaavio näyttää tiiliseinältä: jokainen tiilirivi on puolen tiilen verran edellistä sivussa.

Tekstiohjeessa tämä näkyy usein kahtena vuorottelevana kerroksena: `Row 1: *pattern A; rep from *.` ja `Row 3: K3, *pattern A; rep from * to last 5 sts, work edge stitches.` Siirtymä rakennetaan toiseen kerrokseen muuttamalla kohtaa, josta toisto alkaa.

Näiden lukeminen helpottuu, kun näet siirtymän valmiissa neulepinnassa. Jos olet half-drop-kuvion keskellä ja seuraavan kerroksen toisto ei tunnu osuvan edelliseen, se voi olla tarkoitus eikä virhe.

## Kun lasku ei täsmää

Jos seuraat toistoa ja silmukoita jää yli tai ne loppuvat liian aikaisin, jokin on pielessä.

1. Tarkista silmukkamäärä. Laske puikolla olevat silmukat. Täsmääkö määrä ohjeen omaan kokoon?

2. Tarkista toistoyksikkö. Jos toisto on \*3 o, 2 n eli 5 silmukkaa, kokonaismäärästä pitää vähentää mahdolliset tasapainottavat silmukat, ja loppuosan pitää olla jaollinen viidellä.

3. Tarkista kokomerkinnät. Monikokoisessa ohjeessa on helppo napata väärä numero sulkumerkkijonosta.

4. Tarkista errata eli ohjeen korjaukset. Jos lasku ei oikealla silmukkamäärällä aidosti toimi, ohjeessa voi olla virhe. Katso suunnittelijan korjaussivu tai Ravelryn muistiinpanot.

Laajempi [neuleohjeen lukemisen opas](/fi/artikkelit/neuleohjeen-lukeminen/) käsittelee myös kokoja, lyhenteitä ja kaavioita.

## FAQ

**Mitä "toista \* viimeisiin X s asti" tarkoittaa?**
Toista, kunnes vasemmalla puikolla on X silmukkaa jäljellä. Ne jäljelle jäävät silmukat tehdään sen mukaan, mitä ohjeessa seuraavaksi sanotaan, yleensä oikein, nurin tai tasapainottava osatoisto.

**Lasketaanko ensimmäinen kerta mukaan?**
Kyllä. "Toista \* vielä 3 kertaa" = 4 kertaa yhteensä, eli 1 ensimmäinen + 3 lisää. "Toista 3 kertaa" ilman sanaa "vielä" tarkoittaa yleensä 3 kertaa yhteensä. Silmukkamäärän lasku kertoo, kumpi tulkinta on oikea, jos sanamuoto on epäselvä.

**Miten pysyn mukana pitkässä toistossa?**
Laita silmukkamerkit toistoyksiköiden väliin. Kun tulet merkille, aloitat puhtaalta pöydältä. Monen kerroksen toistoissa auttaa kerroslaskuri tai paperille tehdyt viivat.

**Miksi tähtiä eikä hakasulkeita?**
Suunnittelijan mieltymys. Hakasulkeet ovat täsmällisempiä, koska numero on aina kokonaismäärä. Tähdet ovat perinteisiä ja tiiviitä. Osa suunnittelijoista käyttää molempia: tähteä päätoistolle ja hakasulkeita alitoistoille.

**Voiko apulangan lisätä kesken kerroksen?**
Ei helposti. Apulanka toimii parhaiten kokonaisella valmiilla kerroksella, puikolla olevien elävien silmukoiden läpi. Jos haluat apulangan kesken pitkän rivin, neulo kerros ensin loppuun ja pujota apulanka sitten joka silmukan läpi ennen jatkamista.

**Mitä jos toisto siirtyy yllättäen?**
Tarkista, käyttääkö ohje siirtyvää tai half-drop-toistoa. Se voi olla tarkoituksellista. Vertaa uutta kerrosta valmiiseen kohtaan samasta kuviosta. Jos siirtymä vastaa aiempia kerroksia, olet oikeilla jäljillä. Jos ei, pura viimeiseen varmistettuun silmukkamäärään ja tee kohta uudelleen.
