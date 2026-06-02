---
title: "Rapporter i stickmönster"
description: "Förstå hur rapporter fungerar i stickmönster. Tydliga exempel på asterisker, hakparenteser och nästlade rapporter, plus rester och flervarvsrapporter."
publishDate: 2026-05-01
category: techniques
categoryOrder: 6
tags:
  [
    "rapporter i stickmönster",
    "asterisk stickmönster",
    "hakparentes rapport stickning",
    "läsa rapporter i stickmönster",
  ]
draft: false
lang: sv
translationKey: "knitting-pattern-repeats"
---

Rapporter gör att ett stickmönster slipper skriva ut varje maska på ett 200-maskorsvarv. I stället för "2 rm, 2 am, 2 rm, 2 am, 2 rm, 2 am..." tjugofem gånger skriver mönstret `*2 rm, 2 am; upprepa från * varvet ut`. Samma resultat, mycket mindre plats.

I stickmönster används asterisker (\*), hakparenteser [] eller parenteser () för att markera en grupp maskor som ska upprepas flera gånger över varvet. Notationen är effektiv när du vant dig. Men de första gångerna du möter nästlade rapporter eller asterisker med rester kan det kännas som att läsa ett språk du nästan kan.

## Asteriskrapporter

Det vanligaste formatet. En asterisk markerar början på delen som ska upprepas.

**Enkel rapport:** `*3 rm, 1 am; upprepa från * varvet ut.`

Sticka 3 räta, 1 avig, gå tillbaka till asterisken, sticka 3 räta, 1 avig, fortsätt tills varvet är klart. Ditt totala maskantal behöver vara en multipel av 4 (rapporten: 3 rm + 1 am).

**Med rester:** `1 rm, *2 rm, 2 am; upprepa från * till de sista 3 m, 3 rm.`

Sticka 1 rät innan rapporten börjar, upprepa sedan 2 rm, 2 am över varvet, och när 3 maskor återstår (inte nog för en hel rapport), sticka de 3 räta. Maskorna utanför asteriskdelen kallas balansmaskor eller kantmaskor. De gör att mönstret börjar och slutar symmetriskt.

**Med antal:** `*Omslag, 2 rm tillsammans; upprepa från * 5 gånger till.`

"5 gånger till" betyder att du arbetar delen en gång först och sedan upprepar den 5 ytterligare gånger, alltså 6 gånger totalt. Det här lurar många. "Upprepa 5 gånger till" = 6 totalt. Om ett mönster säger "upprepa 5 gånger" utan "till", använd maskantalet för att bekräfta om den första genomgången ingår.

## Hakparenteser och parenteser

Mer visuellt än asterisker.

**Hakparenteser:** `[1 rm, 1 am] 4 gånger.`

Sticka 1 rät, 1 avig, fyra gånger totalt. Åtta maskor (4 rapporter om 2). Hakparenteser är tydliga: siffran är alltid totalt antal gånger.

**Parenteser:** `(2 rm tillsammans, omslag) varvet ut.`

Samma idé. Delen i parentes upprepas över hela varvet.

**Blandad notation:** `2 rm, [1 rm, 1 am] 3 gånger, *4 rm, 2 am; upprepa från * till de sista 2 m, 2 rm.`

Både hakparenteser och asterisker i samma varv. Läs från vänster till höger: sticka 2 räta, arbeta 1 rm/1 am tre gånger (6 maskor), upprepa sedan 4 rm/2 am till slutet och avsluta med 2 rm. Hakparentesrapporten händer en gång på en fast plats. Asteriskrapporten fyller resten av bredden.

## Nästlade rapporter

Ibland ligger en rapport inuti en annan. Oftast i mer komplex spets eller flerfärgsstickning.

`*[1 rm, 1 am] 3 gånger, 2 rm tillsammans, omslag; upprepa från * varvet ut.`

Den inre rapporten [1 rm, 1 am] 3 gånger ger 6 maskor resår. Sedan använder 2 rm tillsammans 2 maskor och ger 1, och omslaget lägger till 1. Hela rapporten använder 8 maskor från vänster sticka och lägger 8 tillbaka på höger. Hela delen upprepas över varvet.

Läs nästlade rapporter inifrån och ut. Lös hakparentesen först, och behandla sedan hela asteriskdelen som din rapport.

## Uppläggningsvarv och etablerade mönster

Vissa mönster har ett uppläggningsvarv, ofta kallat `set-up row` eller `set-up round`, innan huvudrapporten börjar. Det varvet ordnar maskorna i den rytm som rapporten senare behöver. Ett mönster kan säga:

```text
Set-up row: 2 rm, *2 am, 2 rm; upprepa från * varvet ut.
Beginning with Row 1, work in pattern as follows...
```

Uppläggningsvarvet är inte en del av rapporten. Det görs en gång. Efter det börjar varv 1 i huvudmönstret från en redan bestämd startpunkt.

Uttryck som `as established` eller `as set` senare i mönstret hänvisar tillbaka till den rytm som har skapats. Om ett tröjmönster säger att du ska fortsätta forma ärmhålet och arbeta maskorna `as established`, betyder det att du behåller samma kolumner av räta och aviga maskor, flätor eller spets som redan är i gång. Börja inte om mönsterrapporten från början.

## Flervarvsrapporter

Vissa mönster samlar flera varv i ett block.

```text
Varv 1-4: *2 rm, 2 am; upprepa från * varvet ut.
Varv 5: räta maskor.
Varv 6: aviga maskor.
Upprepa varv 1-6 tills arbetet mäter 25 cm.
```

Arbeta 6-varvssekvensen som en enhet och upprepa hela blocket till mål-längden. Varv 1 till 4 är resår, varv 5 och 6 är kontrasten, och allt loopar.

Se upp för instruktioner som `upprepa de sista 2 varven` eller `upprepa endast varv 3 och 4`. De betyder en mindre del av det föregående blocket, inte hela 6-varvssekvensen. Här tappar många räkningen eftersom hjärnan gärna nollställer varvnumren när upprepningen börjar. En varvräknare eller streck på papper tar bort den belastningen.

Det här syns ofta i strukturmönster, ränder och spets. En varvräknare hjälper här. KnitTools [varvräknare](/sv/verktyg/#join) kan hjälpa dig hålla platsen i en upprepande varvcykel, så du slipper minnas om du är på varv 3 eller varv 4 i det aktuella blocket.

## Markörer mellan rapporter

Markörer mellan rapportenheterna gör varje rapport till en egen kontrollpunkt. När du kommer till nästa markör och maskantalet i den delen är fel vet du exakt var felet ligger. Du behöver inte repa upp ett helt varv för att leta.

I spets sparar det verklig tid. En rapport med omslag och minskningar ska ofta använda och lämna tillbaka samma antal maskor, om inte mönstret uttryckligen ökar eller minskar. Om du kommer till markören med en maska för mycket eller en maska för lite finns felet i den senaste rapporten. Repa bara den delen.

I nästlade mönster hjälper två färger markörer. En färg markerar de yttre rapporterna, en annan de inre. Första gången kan det kännas petigt. I en komplex sjal eller stola börjar det snabbt kännas som normal arbetsordning.

## Diagram med rapportrutor

I diagram visas rapporter ofta med en avgränsad ruta, en tydlig kontur eller en färgad markering. Den avgränsade delen är maskorna som upprepas. Allt utanför rutan stickas en gång per varv som kant eller balansmaskor.

Ett vanligt spetsdiagram är uppbyggt så här: kantmaskor till höger, rapportruta i mitten, kantmaskor till vänster. Rapportrutan kan vara 8 eller 12 maskor bred. Du stickar högerkanten, sedan rutan en gång, en gång till och en gång till, tills du når vänsterkanten.

Vissa diagram har två rapportrutor: en lodrät rapport för varv som upprepas uppåt och en vågrät rapport för maskor som upprepas över bredden. Den lodräta rutan visar mönstrets varvcykel. Den vågräta rutan visar maskenheten.

Läs alltid teckenförklaringen innan du börjar. Designers markerar rutor på olika sätt, och en felaktigt läst gräns kan flytta hela mönstret.

## Livlinor i komplexa rapporter

En livlina är en slät kontrasttråd, ofta tandtråd eller tunt bomullsgarn, som dras genom ett helt varv levande maskor vid en punkt där arbetet är rätt. Om de kommande tjugo varven går fel kan du repa tillbaka till livlinan utan att tappa maskor. Alla maskor hålls säkert på kontrasttråden och kan sättas tillbaka på stickan.

I spets och komplexa flätor är livlinor värda att använda innan arbetet börjar kännas riskabelt. Lägg in en ny livlina var 10-20:e varv eller vid en naturlig paus, till exempel slutet på en diagramrapport eller varvet före en svår sektion.

Sätt helst livlinan på ett uppläggningsvarv, ett slätt varv eller ett annat tydligt varv, inte på ett varv fullt av omslag. Omslagen gör det krångligare att plocka upp maskorna igen eftersom några av hålen fortfarande är öppna.

## Halvförskjutna och andra flyttade rapporter

Alla rapporter börjar inte på samma maska varje varv. I vissa spets- och flerfärgsmönster flyttas rapporten i sidled efter några varv, så att diagonaler eller diamantformer uppstår. En halvförskjuten rapport flyttar mönstret med en halv rapportbredd för varje lodrät rapport. Diagrammet kan se ut som en tegelvägg: varje rad av "stenar" är förskjuten jämfört med raden under.

I skriftliga instruktioner syns det ofta som två alternerande varv:

```text
Varv 1: *mönster A; upprepa från *.
Varv 3: 3 rm, *mönster A; upprepa från * till de sista 5 m, arbeta kantmaskor.
```

Förskjutningen byggs in i det andra varvet genom att rapporten börjar på ett annat ställe.

Det blir lättare när du ser förskjutningen i den färdiga ytan. Om du är mitt i en halvförskjuten rapport och nästa varv inte verkar ligga rakt ovanpå det förra, kan det vara avsiktligt. Jämför med tidigare färdigstickade rader innan du antar att det är fel.

## När matematiken inte går ihop

Om du följer rapporten och får maskor över (eller tar slut för tidigt) är något fel.

1. Kontrollera maskantalet. Räkna maskorna på stickan. Stämmer det med mönstret för din storlek?

2. Kontrollera rapporten. Om rapporten är \*3 rm, 2 am (5 maskor), ska totalen minus eventuella balansmaskor vara delbar med 5.

3. Kontrollera storleksnoteringen. I ett fler-storleksmönster är det lätt att ta fel siffra ur en parentesrad.

4. Kontrollera rättelser. Om matematiken verkligen inte fungerar med rätt maskantal kan mönstret ha ett fel. Titta på designerns erratasida eller Ravelry-anteckningar.

För större sammanhang om [att läsa stickmönster](/sv/artiklar/lasa-stickmonster-nyborjarguide/), inklusive storlekar, förkortningar och diagram, finns en separat guide.

## FAQ

**Vad betyder "upprepa från \* till de sista X m"?**
Fortsätt upprepa tills du har X maskor kvar på vänster sticka. De återstående maskorna stickas enligt det som följer (oftast räta eller aviga, eller en delrapport för balans).

**Räknar jag första gången?**
Ja. "Upprepa från \* 3 gånger till" = 4 totalt (1 första gång + 3 till). "Upprepa 3 gånger" utan "till" betyder oftast 3 totalt. Maskmatten berättar vilken läsning som är rätt när formuleringen är otydlig.

**Hur håller jag reda på var jag är i en lång rapport?**
Sätt markörer mellan rapporterna. När du kommer till en markör börjar du om. För flervarvsrapporter fungerar varvräknare eller bockar på papper.

**Varför asterisker i stället för hakparenteser?**
Designerns preferens. Hakparenteser är tydligare (siffran är alltid totalen). Asterisker är traditionella och kompakta. Vissa designers använder båda: asterisker för huvudrapporten, hakparenteser för delrapporter.

**Kan jag sätta in en livlina mitt i ett varv?**
Inte på ett smidigt sätt. Livlinor fungerar bäst genom ett helt färdigt varv av levande maskor på stickan. Om du plötsligt vill ha en mitt i ett långt varv, sticka klart varvet först och trä sedan livlinan genom alla maskor innan du fortsätter.

**Vad gör jag om rapporten plötsligt flyttar sig?**
Kontrollera om mönstret använder en flyttad eller halvförskjuten rapport. Det kan vara avsiktligt. Jämför det senaste varvet med en färdig del av samma mönster. Om förskjutningen matchar tidigare rader är du på rätt väg. Om inte, repa tillbaka till senaste bekräftade maskantal och sticka om.
