---
title: "Lisäysten ja kavennusten jakaminen tasaisesti"
description: "Näin jaat lisäykset ja kavennukset tasaisesti kerrokselle. Kaava, esimerkit ja käytännön vinkit siistiin lopputulokseen."
publishDate: 2026-05-01
category: gauge-calculations
categoryOrder: 6
tags:
  [
    "lisää tasaisesti neuleessa",
    "kavenna tasaisesti",
    "lisäysten jakaminen",
    "kavennusten jakaminen",
  ]
lang: fi
translationKey: "increase-decrease-evenly"
---

"Lisää seuraavalla kerroksella 8 silmukkaa tasaisesti." Ohje jatkaa eteenpäin. Sinä jäät katsomaan puikolla olevia silmukoita ja tekemään päässälaskua.

Jaa muotoiluun käytettävissä olevien silmukoiden määrä lisäys- tai kavennuskertojen määrällä. Lasku antaa jaon lähtökohdan, mutta tekniikka määrää kirjoitetun toiston. Reunat, jakojäännökset ja mallineule on huomioitava erikseen.

## Kaava yhdessä rivissä

Muotoiluun käytettävät alkuperäiset silmukat / lisäys- tai kavennuskerrat = alkuperäisten silmukoiden keskimäärä kerrallaan. Tulos kuvaa koko toiston kokoa, ei välttämättä tavallisten silmukoiden määrää muotoilukohtien välissä.

Väli kertoo, kuinka monta nykyistä silmukkaa kuuluu kuhunkin muutokseen, mutta kirjoitettu toisto riippuu menetelmästä. Alla olevissa M1-esimerkeissä lisäys tehdään nykyisten silmukoiden väliin, joten väli 10 voidaan kirjoittaa `10 o, M1`. KFB tehdään olemassa olevaan silmukkaan, joka kuuluu väliin: kirjoita `9 o, KFB`, ei `10 o, KFB`, sillä jälkimmäinen kuluttaa 11 alkuperäistä silmukkaa. Kavennuksissa väli sisältää kavennuksen kuluttamat silmukat; `2 o yhteen` kuluttaa kaksi alkuperäistä silmukkaa.

Jos jotkin reunasilmukat on tarkoitus jättää muotoilun ulkopuolelle, vähennä niiden kokonaismäärä ennen välin laskemista: `(nykyinen silmukkamäärä - varatut reunasilmukat) / muutosten määrä`. Jaa muutokset vain jäljelle jääville työstettäville silmukoille ja neulo varatut reunasilmukat ohjeen mukaan; ne pysyvät silti osana kerroksen kokonaismäärää. Jos reunasilmukat osallistuvat muotoilun jakoon, käytä koko nykyistä silmukkamäärää. Tämä ei ole sama asia kuin ensimmäisen ja viimeisen välin jakaminen, jossa reunimmaiset silmukat osallistuvat edelleen jakoon.

Sama lasku, kaksi hieman eri tapaa ajatella sitä.

Laske tekokerrat erikseen silmukkamäärän muutoksesta: M1 ja KFB lisäävät 1 silmukan, 2 o yhteen ja ssk vähentävät 1 silmukan, 3 o yhteen vähentää 2. Tekokertojen määrän on oltava positiivinen kokonaisluku. Jos käytettäviä silmukoita on U ja tekokertoja E, 2 o yhteen vaatii U ≥ 2 × E ja 3 o yhteen U ≥ 3 × E. KFB tarvitsee yhden alkuperäisen silmukan jokaista lisäystä varten. Tässä M1 tarkoittaa yhtä kiertäen neulottua välilankalisäystä kutakin käytettävää väliä kohti: U silmukan tasokerroksella on U − 1 sisäväliä ja jo yhdistetyssä suljetussa neuleessa U väliä. Varatut reunukset voivat rajoittaa lisäyskohtia lisää. Esimerkeissä neulotaan oikein eikä reunoja varata erikseen, ellei niin sanota.

## Esimerkki: siisti lisäys

Puikolla on 80 silmukkaa. Ohje pyytää 8 lisäystä.

80 / 8 = 10.

Neulo tasona "5 o, M1, (10 o, M1) 7 kertaa, 5 o". Tämä kuluttaa 5 + 7 × 10 + 5 = 80 alkuperäistä silmukkaa ja tekee 1 + 7 = 8 lisäystä: tuloksena on 88 silmukkaa. Lisäykset tulevat alkuperäisten silmukoiden 5, 15, 25, 35, 45, 55, 65 ja 75 jälkeen. Väli on 10 silmukkaa ja kumpaankin päähän jää 5, joten sijoittelu on symmetrinen.

"10 o, M1" 8 kertaa kuluttaa myös 80 silmukkaa, mutta tämä versio sopii jo yhdistettyyn suljettuun neuleeseen: viimeinen M1 tehdään kerrosrajan välilangasta. Tasokerroksen viimeisen silmukan jälkeen ei ole kahden silmukan välistä lankaa. Viimeinen M1 ei siis ole pelkkä ulkonäköongelma.

## Esimerkki: jakojäännös, joka pitää hoitaa

Otetaan 75 silmukkaa ja 8 lisäystä.

75 / 8 = 9, jakojäännös 3.

Jo yhdistetyssä suljetussa neuleessa käytä viittä 9 silmukan ja kolmea 10 silmukan jaksoa. Tee jokaisen jälkeen M1. Yksi järjestys on 9, 9, 10, 9, 9, 10, 9, 10: neulo luvun verran oikein ja tee M1. Alkuperäisiä silmukoita kuluu 5 × 9 + 3 × 10 = 75, lisäyksiä tulee 8 ja lopputulos on 83 silmukkaa. Kaikki välit, myös kerrosmerkin yli, ovat 9 tai 10 alkuperäistä silmukkaa.

Tasona voit käyttää tätä symmetristä jakoa:

1. Neulo 5 o, M1.
2. Neulo 9 o, M1; 9 o, M1; 10 o, M1; 9 o, M1; 10 o, M1; 9 o, M1; 9 o, M1.
3. Neulo loput 5 silmukkaa oikein.

Päihin kuluu 5 + 5 silmukkaa ja seitsemään sisäväliin 5 × 9 + 2 × 10. Yhteensä kuluu 75 alkuperäistä silmukkaa, tehdään 8 M1-lisäystä ja saadaan 83 silmukkaa. Lisäykset ovat silmukoiden 5, 14, 23, 33, 42, 52, 61 ja 70 jälkeen. Peilikuvaparien summat ovat 75. Nämä ovat kaksi mahdollista jakoa, eivät ainoat ratkaisut.

## Sama kaava kavennuksiin

Kavennuksissa on huomioitava toiston koko, koska 2 o yhteen kuluttaa kaksi silmukkaa ja tuottaa yhden. Väli on koko toisto, ei pelkkien tavallisten silmukoiden määrä ennen kavennusta.

Otetaan 90 silmukkaa ja 10 kavennusta.

90 / 10 = 9.

Jokainen toisto kattaa 9 silmukkaa: ensimmäiset 7 neulotaan tavallisesti ja kaksi viimeistä neulotaan yhteen. Kerros luetaan siis "neulo 7, 2 o yhteen" kymmenen kertaa. Se kuluttaa kaikki 90 silmukkaa ja poistaa 10, joten jäljelle jää 80 silmukkaa. Ylijääviä silmukoita ei ole. Tässä esimerkissä reunasilmukoita ei ole varattu erikseen.

Kun silmukoita on 95 ja yhden silmukan kavennuksia tarvitaan 10, 95 / 10 = 9 ja jakojäännös 5. Neulo "7 o, 2 o yhteen, 8 o, 2 o yhteen" yhteensä 5 kertaa. Kukin pari kuluttaa 9 + 10 = 19 alkuperäistä silmukkaa ja tuottaa 8 + 9 = 17: kaikki 95 silmukkaa käytetään, kavennuksia tulee 10 ja jäljelle jää 85 silmukkaa. Lyhyet ja pitkät toistot vuorottelevat. Tässä ei varata reunasilmukoita.

## Miksi ohje pyytää tasaista jakamista

Tasainen jako levittää silmukkamäärän muutoksen valitulle alueelle. Muutosten keskittäminen tiettyihin kohtiin muotoilee neuletta eri tavalla.

Joustimesta vartalo-osaan siirryttäessä noudata ohjeen tavoitemäärää ja kummankin neulepinnan tiheyttä; lisäyksiä ei tarvita automaattisesti. Tasainen jako ei yksin takaa huomaamatonta siirtymää.

[Pipon neulomisen opas](/fi/artikkelit/pipon-neulominen/) käsittelee päälaen muotoilua. Siihen vaikuttavat myös kavennusten paikat, suunnat ja välikerrokset. Raglanlinjat ja hihanpyöriöt tarvitsevat omat sijoitteluohjeensa, joita ei korvata yleisellä tasaisella jaolla.

## Mitä lisäystapaa kannattaa käyttää

Jos ohje määrittää lisäyksen, käytä sitä. Suunnittelija valitsee lisäyksen syistä, jotka eivät aina näy heti, ja vaihtaminen voi muuttaa lopputulosta.

Jos ohje sanoo vain "lisää", valinta on sinun. Menetelmät käyttäytyvät vähän eri tavoin.

**M1L ja M1R** tehdään silmukoiden välisestä langasta kuluttamatta puikolla olevaa silmukkaa. Pidä työlanka takana. M1L: nosta välilanka vasemmalle puikolle edestä taakse ja neulo takareunasta oikein. M1R: nosta takaa eteen ja neulo etureunasta oikein. Näin välilanka kiertyy. Katso [Purl Sohon M1-ohje](https://www.purlsoho.com/create/make-one-right-m1r-make-one-left-m1l/). Suunnat tarkoittavat oikealta puolelta näkyvää kallistusta, kun neulotaan vasemmalta puikolta oikealle. Noudata paritetussa muotoilussa neuleohjetta.

**KFB** eli silmukan neulominen etu- ja takareunasta kuluttaa yhden silmukan ja tuottaa kaksi. Neulo ensin etureunasta oikein, jätä silmukka vasemmalle puikolle ja neulo sama silmukka takareunasta oikein ennen pudottamista. Lisäys jättää pienen vaakapalkin. Toisin kuin M1, KFB:n silmukka lasketaan toiston alkuperäisiin silmukoihin.

**Langankierto** tekee tarkoituksellisen reiän. Sitä käytetään pitsissä, reikäriveissä ja pareittain kavennuksen kanssa, kun silmukkamäärä halutaan pitää samana. Se ei yleensä ole se, mitä ohje tarkoittaa "lisää tasaisesti" -kohdassa, ellei ohje nimenomaan sano niin.

## Mitä kavennustapaa kannattaa käyttää

**2 o yhteen** neuloo kaksi silmukkaa yhdeksi ja kallistuu neuleen oikealta puolelta katsottuna oikealle. Käytä ohjeen määräämää kavennusta.

**Ssk** on vasemmalle kallistuva yhden silmukan kavennus: nosta kaksi silmukkaa yksitellen oikein neulomatta ja neulo ne takareunoistaan oikein yhteen. **Skp** eli ylivetokavennus tehdään nostamalla yksi silmukka oikein neulomatta, neulomalla seuraava oikein ja vetämällä nostettu silmukka neulotun yli. Molemmat kuluttavat 2 silmukkaa ja tuottavat 1, mutta työvaiheet eroavat. Noudata ohjeen tekotapaa.

**3 o yhteen** poistaa kaksi silmukkaa yhdellä kertaa ja kallistuu vahvasti oikealle. Sitä käytetään, kun ohje haluaa jyrkemmän kavennuksen tai kun pitsikaavio pinoaa kavennuksia.

**Keskitetty kaksoiskavennus (CDD)** vähentää 2 silmukkaa keskitetysti. Yksi tekotapa on **S2KP2**: nosta 2 silmukkaa yhdessä kuin neuloisit ne oikein yhteen, neulo 1 oikein ja vedä molemmat nostetut silmukat sen yli. Kolmesta silmukasta jää yksi. Tarkista CDD:n tekotapa ohjeesta; lyhenteet eivät aina tarkoita samaa menetelmää.

## Reunasilmukat ja saumavara

Jätä ohjeessa varatut reunus- tai saumasilmukat muotoilun ulkopuolelle. Neulo ensin alkureunus, tee muotoilu käytettäville silmukoille ja neulo loppureunus. Yllä olevan symmetrisen 80 silmukan esimerkin 5 silmukan päät kuuluvat 80 silmukan jakoon; erillistä reunusta ei ole varattu.

Jos kerroksella on 76 silmukkaa ja kummassakin päässä varataan 2, käytettäviä silmukoita on 76 − 4 = 72. Kahdeksalle M1-lisäykselle 72 / 8 = 9. Neulo `2 o, *M1, 9 o; tee tähdestä alkava jakso yhteensä 8 kertaa, 2 o`. Toisto kuluttaa 9 silmukkaa ja tuottaa 10. Yhteensä kuluu 2 + 8 × 9 + 2 = 76 ja syntyy 2 + 8 × 10 + 2 = 84 silmukkaa. Viimeisen M1:n jälkeen on vielä 11 alkuperäistä silmukkaa. Varatut reunasilmukat säilyvät, mutta päätyvälit eivät ole symmetriset.

## Kun muotoilukohta osuu nurjaan silmukkaan

Myös nurin tehty lisäys tai kavennus muuttaa silmukkamäärää. Esimerkiksi pfb kuluttaa yhden silmukan ja tuottaa kaksi; 2 n yhteen kuluttaa kaksi ja tuottaa yhden. Valitse tekniikka ja kallistussuunta ohjeen tarkoittaman neulepuolen mukaan.

Oikean tekniikan vaihtaminen nurjaan ei automaattisesti säilytä joustinta, palmikkoa tai pitsiä. Tarkista, mitkä silmukat kukin toimi kuluttaa, mihin uudet silmukat kuuluvat ja miten seuraava kerros jatkuu. Jos ohje siirtää muotoilukohtaa kuvion vuoksi, säilytä sijoittelu ja laske koko kerros uudelleen.

## Pyörönä neulominen

Jo yhdistetyssä suljetussa neuleessa ei ole sivureunoja, mutta myös viimeisen ja ensimmäisen muotoilukohdan väli lasketaan. Kun silmukoita on 80, "10 o, M1" 8 kertaa tuottaa 88. Viimeinen M1 tehdään kerrosrajan välilangasta ja seuraava väli on 10 alkuperäistä silmukkaa. Siirrä merkkiä tarvittaessa välilangan nostamista varten ja palauta se kerroksen oikeaan aloituskohtaan. Älä siirrä yhtä muotoilukohtaa tarkistamatta molempia viereisiä välejä.

Päälaen laskuesimerkki alkaa 80 silmukasta: "8 o, 2 o yhteen" 8 kertaa kuluttaa 80 silmukkaa ja tekee 8 kavennusta, joten jäljelle jää 72. Neulo yksi välikerros näillä 72 silmukalla. Sitten "7 o, 2 o yhteen" 8 kertaa kuluttaa 72 ja jättää 64 silmukkaa. Välikerros ei muuta määrää. Tämä tarkistaa kyseisten kerrosten laskun; koko päälaen muoto ja kavennustahti tulevat neuleohjeesta.

## Symmetrinen ja paritettu muotoilu

Tasainen jakaminen kerroksen poikki on yksi tilanne. Paritettu muotoilu on toinen, ja ne kannattaa erottaa.

Kun ohje sanoo "lisää 1 silmukka kummassakin reunassa joka 6. kerros", kyse on hihan tai hameen paritetusta muotoilusta. Lisäykset pysyvät kiinteissä kohdissa lähellä reunoja, eikä yllä oleva jakokaava päde. Sama koskee kädentien muotoiluja, joissa ohje sanoo "kavenna 1 silmukka kummassakin reunassa seuraavalla kerroksella ja sen jälkeen joka 4. kerros".

"Lisää tasaisesti" tai "kavenna tasaisesti" tarkoittaa nimenomaan kerrokselle säännöllisin välein hajautettuja muutoksia. Jos ohje pyytää paritettua reunamuotoilua, seuraa kerroskohtaisia ohjeita äläkä tee siitä jakolaskua.

## Muutama yleinen väli kannattaa tunnistaa

Seuraavat kolme lisäysesimerkkiä on tarkoitettu jo yhdistettyyn suljettuun neuleeseen: viimeinen M1 tehdään kerrosrajan välilangasta. Kavennusesimerkit sopivat tasona tai suljettuna neulomiseen ilman erikseen varattuja reunasilmukoita. Tavalliset silmukat neulotaan oikein.

- 80 silmukkaa, lisää 8 -> "10 o, M1" kahdeksan kertaa -> 88 silmukkaa
- 60 silmukkaa, lisää 6 -> "10 o, M1" kuusi kertaa -> 66 silmukkaa
- 72 silmukkaa, lisää 8 -> "9 o, M1" kahdeksan kertaa -> 80 silmukkaa
- 90 silmukkaa, kavenna 10 -> "7 o, 2 o yhteen" kymmenen kertaa -> 80 silmukkaa
- 100 silmukkaa, kavenna 10 -> "8 o, 2 o yhteen" kymmenen kertaa -> 90 silmukkaa
- 84 silmukkaa, kavenna 14 -> "4 o, 2 o yhteen" neljätoista kertaa -> 70 silmukkaa

Numerot eivät aina asetu näin nätisti. Kun ne eivät asetu, jakojäännös levitetään kerrokselle pidempien osioiden mallilla.

## Kun lasku alkaa ärsyttää

Kirjoita monimutkaisen muotoilukerroksen koko työjärjestys ennen neulomista. Oikea lopullinen silmukkamäärä ei todista pitsin tai palmikon jatkuvan oikein: tarkista myös kaavio ja seuraava kerros.

Tämä on käsinlaskentaohje. Sivustolla ei ole interaktiivista lisäys- ja kavennuslaskuria.

## Tavallisia tilanteita

Jos ohje sanoo "lisää tasaisesti" mutta ei kerro määrää, katso seuraavaa silmukkamäärää, jota ohje odottaa. Vähennä siitä nykyinen silmukkamäärä. Erotus on lisäysten määrä. Tämä on harvinaista, mutta sitä näkee vanhemmissa ohjeissa ja omissa muokkauksissa.

Jos muotoilukohta siirtyy, tarkista silmukkamäärä, viereiset välit ja mallineule ennen purkupäätöstä. Näkyvyys riippuu neulepinnasta; oikea kokonaismäärä ei yksin todista sijoittelua oikeaksi.

Nurjalla kerroksella lisääminen tai kaventaminen toimii samalla tavalla. Käytä valitsemasi menetelmän nurjan puolen versiota. Jakokaava ei muutu.

Itse luotavien silmukoiden määrää käsittelee [silmukoiden luomisen opas](/fi/artikkelit/montako-silmukkaa-luodaan/). Jos koko laskun pohjalla oleva neuletiheys kaipaa kertausta, katso [neuletiheyden mittausohje](/fi/artikkelit/neuletiheyden-mittaaminen/).

## FAQ

**Voinko arvioida välin silmämääräisesti ilman laskua?**
Suunnittele ja laske lisäys- tai kavennuskerrat myös pienessä muutoksessa. Tarkista paikat suhteessa mallineuleeseen ja tavoiteltuun muotoon.

**Mitä jos ohje ei kerro, mitä lisäystä käytetään?**
Näissä oikein neulottavissa esimerkeissä voit käyttää yllä kuvattua välilankalisäystä, jos ohje jättää valinnan sinulle. KFB näyttää erilaiselta ja kuluttaa alkuperäisen silmukan, joten kirjoita toisto uudelleen, jos vaihdat tekniikkaa.

**Miksi lasku antaa joskus yhden muutoksen liikaa tai liian vähän?**
Yleensä jakojäännös jäi huomioimatta tai tuli yhden silmukan virhe siinä, alkaako ensimmäinen osio täydellä vai puolikkaalla välillä. Käy kerros mielessä läpi ennen neulomista ja varmista lasku laskemalla suunnitellut muotoilukohdat.

**Muuttuuko kaava, jos kavennan 3 o yhteen -kavennuksella kaksi silmukkaa kerralla?**
Kyllä: jaa poistettavien silmukoiden määrä kahdella saadaksesi 3 o yhteen -kavennusten määrän. Kun 90 silmukasta halutaan 80, poistetaan 10 silmukkaa viidellä kavennuksella. 90 / 5 = 18 alkuperäistä silmukkaa toistoa kohti: "15 o, 3 o yhteen" 5 kertaa kuluttaa 90 ja tuottaa 5 × 16 = 80 silmukkaa. Paritonta vähennystä ei voi tehdä pelkillä kahden silmukan kavennuksilla.

**Voinko lisätä tai kaventaa samalla kerroksella kuin mallikerran toisto?**
Vain jos muotoiluohje huomioi kuvion ja sen jatkumisen. Oikea kokonaismäärä tai jaollisuus mallikerran koolla ei yksin säilytä joustinta, palmikoita tai pitsiä.

**Ohje sanoo "lisää tasaisesti", eikä silmukkamäärä jakaudu tasan. Teenkö jotain väärin?**
Et. Se on normaalia. Jakojäännös hoidetaan tekemällä osasta välejä yhden silmukan pidempiä. Levitä pidemmät välit kerrokselle äläkä kasaa niitä yhteen, niin valmis neule näyttää tasaiselta.
