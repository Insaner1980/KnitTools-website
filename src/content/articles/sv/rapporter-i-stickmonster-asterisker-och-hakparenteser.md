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
updatedDate: 2026-10-18
---

Ett varv med 200 maskor rymmer 50 grupper av `2 rm, 2 am`. Med `*2 rm, 2 am; upprepa från * varvet ut` slipper du skriva gruppen 50 gånger. Varje rät och avig maska använder en gammal maska och ger en maska: efter varvet finns fortfarande 200.

Exemplen följer de upprepningssätt som [Craft Yarn Council beskriver](https://www.craftyarncouncil.com/standards/how-to-read-knitting-pattern). Tecknen har inte en enda universell betydelse: läs mönstrets egna förklaringar. En rapport är en grupp maskor och ibland flera varv; att upprepa en handling är inte alltid att upprepa hela rapporten. Exemplen är fristående och har inga extra kantmaskor utöver dem som anges.

## Asteriskrapporter

Här markerar asterisken början och upprepningsinstruktionen slutet. Två stjärnor `* ... *` kan avgränsa gruppen. En dubbel asterisk `**` kan vara en annan hänvisningspunkt: följ instruktionen som hänvisar dit, inte en antagen regel om ”två gånger”.

**Enkel rapport:** `*3 rm, 1 am; upprepa från * varvet ut.`

Börja med 12 maskor och sticka `3 rm, 1 am` tre gånger. Varje grupp använder och ger 4 maskor; 8, 4 och sedan 0 maskor återstår att sticka. Slutantal: 12. Formeln är 4n, där n är det totala antalet grupper.

**Med rester:** `1 rm, *2 rm, 2 am; upprepa från * till de sista 3 m, 3 rm.`

Börja med 20 maskor: sticka 1 rät, `2 rm, 2 am` fyra gånger och de sista 3 räta. Kvar att sticka: 19, 15, 11, 7, 3 och 0. Slutantalet är 20. Formeln är 1 + 4n + 3 = 4n + 4. De fyra maskorna utanför rapporten ingår redan; lägg inte till dem igen som kant. De är avsiktligt reserverade, inte oavsiktliga rester. Sådana maskor garanterar inte alltid symmetri.

**Med antal:** `*Omslag, 2 rm tillsammans; upprepa från * 5 gånger till.`

”5 gånger till” betyder en första genomgång och fem ytterligare: sex totalt. Börja med 12 maskor. Ett omslag använder 0 gamla maskor och ger 1; 2 rm tillsammans använder 2 och ger 1. Gör `omslag, 2 rm tillsammans` sex gånger. Kvar att sticka: 10, 8, 6, 4, 2 och 0; slutantalet är 12. ”Upprepa 5 gånger” utan ”till” måste läsas enligt mönstrets konvention och sammanhang. Maskantalet är en kontroll, inte ett skäl att gissa.

## Hakparenteser och parenteser

Mer visuellt än asterisker.

**Hakparenteser:** `[1 rm, 1 am] 4 gånger.`

Här görs gruppen fyra gånger totalt: `1 rm, 1 am, 1 rm, 1 am, 1 rm, 1 am, 1 rm, 1 am`. Börja och sluta med 8 maskor; varje par använder och ger 2. Tolkningen hör till formuleringen i exemplet, inte till hakparenteserna ensamma.

**Parenteser:** `(2 rm tillsammans, omslag) varvet ut.`

Här grupperar parenteserna separata moment över varvet. På 8 maskor gör du `2 rm tillsammans, omslag` fyra gånger: 2→1 följt av 0→1, alltså 8→8 utan rester. Däremot betyder ”(1 rm, 1 am, 1 rm) i nästa maska” tre moment i samma gamla maska. Låt den vara kvar på vänster sticka till sista momentet: 1→3. Parenteser kan också innehålla storleksalternativ; välj din storleks tal, upprepa inte hela listan.

**Blandad notation:** `2 rm, [1 rm, 1 am] 3 gånger, *4 rm, 2 am; upprepa från * till de sista 2 m, 2 rm.`

Börja med 22 maskor: `2 rm`, sedan `1 rm, 1 am` tre gånger (6 maskor), därefter `4 rm, 2 am` två gånger (12 maskor) och sist `2 rm`. Kvar att sticka: 20, 14, 8, 2 och 0. Hakparentesgruppen görs på en enda plats före stjärnrapporten och följer inte med i dess upprepningar. Formel: 2 + 6 + 6n + 2 = 6n + 10; slutantal 22.

## Nästlade rapporter

Ibland ligger en rapport inuti en annan. Oftast i mer komplex spets eller flerfärgsstickning.

`*[1 rm, 1 am] 3 gånger, 2 rm tillsammans, omslag; upprepa från * varvet ut.`

På 16 maskor blir den yttre gruppen `1 rm, 1 am, 1 rm, 1 am, 1 rm, 1 am, 2 rm tillsammans, omslag`. Gör hela följden två gånger. Det inre paret använder och ger 2 maskor, minskningen är 2→1 och omslaget 0→1: varje yttre rapport är 8→8. Totalt sex inre par, två minskningar och två omslag; 16 maskor efteråt, inga rester. ”3 gånger” gäller bara paret inom hakparenteserna.

Läs nästlade rapporter inifrån och ut. Lös hakparentesen först, och behandla sedan hela asteriskdelen som din rapport.

<h2 id="uppläggningsvarv-och-etablerade-mönster">Förberedande varv och etablerade mönster</h2>

Ett förberedande varv, set-up row, ordnar maskorna inför rapporten. Det är inte själva uppläggningen. I detta fristående exempel med 18 maskor stickar du `2 rm, *2 am, 2 rm; upprepa från * varvet ut`: 2 räta och sedan `2 am, 2 rm` fyra gånger. Du använder och får 2 + 4 × 4 = 18 maskor.

Här görs förberedelsevarvet en gång och ingår inte i den efterföljande numrerade cykeln. Följ mönstret om det anger fler förberedande varv.

”As established” innebär att behålla mönstrets placering och varvföljd samtidigt som du gör den angivna formningen. Det betyder inte att börja om rapporten eller sticka alla varv likadant.

## Flervarvsrapporter

Ett separat exempel för stickning fram och tillbaka: 16 maskor utan extra kanter, med första varvet från rätsidan som varv 1.

```text
Varv 1–4: *2 rm, 2 am; upprepa från * varvet ut.
Varv 5: sticka alla maskor räta.
Varv 6: sticka alla maskor aviga.
Upprepa varv 1–6 enligt angivet antal.
```

Varje varv 1–4 innehåller fyra grupper av `2 rm, 2 am`. Varv 5 är 16 räta och varv 6 är 16 aviga. Varje varv är 16→16. Vänd efter varje varv. Här ger varv 1–4 resår och varv 5–6 ett slätstickat band. Instruktionen gäller fram och tillbaka och kan inte direkt överföras till rundstickning.

Varv 1–6 omfattar sex varv. Tre hela genomgångar ger 18 varv och slutar på cykelns varv 6. Efter de första sex varven ger tre genomgångar **till** totalt 24 varv. ”Upprepa de sista 2 varven” efter varv 6 syftar på 5–6; ”upprepa varv 3–4” syftar på ett annat par. Båda innehåller två varv. En mållängd som 25 cm bestämmer inte varvantalet utan varvfasthet och angivet avslutningsvarv.

KnitTools [varvräknare](/sv/verktyg/#join) kan visa läget i ett upprepningsavsnitt som du själv ställer in. Du anger varvintervall och antal upprepningar och stegar räknaren själv; den tolkar eller rättar inte mönstertexten automatiskt. Streck på papper fungerar också.

## Markörer mellan rapporter

Markörer mellan rapporterna hjälper dig kontrollera det förväntade maskantalet. De bevisar inte var ett fel uppstod: gränsen kan ha flyttats eller felet ligga på ett tidigare varv. Kontrollera både antal och maskornas ordning innan du repar upp.

En spetsrapport behöver inte behålla samma antal på varje varv. Kontrollera just det varvets förbrukning och resultat och följ instruktioner om att flytta markörer eller arbeta över gränsen. Ett missat omslag och en missad minskning kan ta ut varandra i antalet men ändå ge fel mönster.

I nästlade mönster hjälper två färger markörer. En färg markerar de yttre rapporterna, en annan de inre. Första gången kan det kännas petigt. I en komplex sjal eller stola börjar det snabbt kännas som normal arbetsordning.

## Diagram med rapportrutor

Rapportrutan avgränsar en grupp enligt diagrammets anvisningar. Maskor utanför kan stickas en gång före och efter, men kan också höra till olika mönsterpartier eller storleksspecifika startpunkter. De är inte automatiskt kantmaskor.

En vanlig läsordning är nerifrån och upp: rätsidesvarv från höger till vänster, avigsidesvarv från vänster till höger. Vid rundstickning med rätsidan utåt läses varje varv från höger till vänster. Följ numreringen och teckenförklaringens betydelser på respektive sida. Utelämnade varv stickas enligt texten, inte hoppas över.

Upprepning på bredden ligger på samma diagramrad. På höjden återgår du till det angivna varvintervallets början först när sista varvet är klart, inklusive eventuella mellanliggande varv som inte ritats ut. Följ nästa varvs startpunkt och eventuella flyttningar av markörer.

Diagrammets bredd är inte alltid antalet levande maskor: en minskning använder flera, ett omslag ingen, och en ruta uttryckligen märkt ”ingen maska” är 0→0. Hoppa över rutan i diagrammet, inte en maska på stickan. [Tin Can Knits diagramguide](https://blog.tincanknits.com/2014/06/06/how-to-read-a-knitting-chart/) förklarar läsordning och rapportgränser.

## Livlinor i komplexa rapporter

En livlina är en slät kontrasttråd som träs genom alla levande maskor vid en kontrollerad punkt. Låt maskorna vara kvar på stickan, ta med omslagsöglorna, trä inte genom markörer och säkra ändarna så att tråden inte glider ur.

Välj ett identifierbart, kontrollerat varv, exempelvis rapportens slut, och anteckna numret. Det finns inget allmänt intervall på 10–20 varv eller förbud mot varv med omslag. Om du repar tillbaka till livlinan, sätt tillbaka alla öglor på stickan och kontrollera maskornas riktning och antal innan du fortsätter.

## Halvförskjutna och andra flyttade rapporter

I vissa mönster flyttas rapportens början mellan varven. En halvförskjutning i sidled motsvarar halva rapportbredden; mönstret anger när den sker. Alla förskjutningar är inte halva rapporter.

Ett komplett exempel fram och tillbaka på 16 maskor: A betyder `3 rm, 5 am` (8→8).

```text
Varv 1 (rätsidan): arbeta A två gånger.
Varv 2 (avigsidan): sticka alla 16 aviga.
Varv 3 (rätsidan): 3 rm, arbeta A en gång, 5 rm.
Varv 4 (avigsidan): sticka alla 16 aviga.
Upprepa varv 1–4.
```

Varv 1 är `3 rm, 5 am, 3 rm, 5 am`; varv 3 är `3 rm, 3 rm, 5 am, 5 rm`. Båda använder och ger 16 maskor utan rester. A:s början flyttas 3 maskor, inte halva bredden (4). Varv 2 och 4 ingår; efter varv 4 återgår du till varv 1. Jämför en oväntad förskjutning med rätt instruktion, inte bara med ett liknande tidigare parti.

## När matematiken inte går ihop

Om du följer rapporten och får maskor över (eller tar slut för tidigt) är något fel.

1. Kontrollera maskantalet. Räkna maskorna på stickan. Stämmer det med mönstret för din storlek?

2. Kontrollera rapportens förbrukning. `3 rm, 2 am` använder och ger 5 maskor. Utan kanter ger 15 maskor tre grupper och slutar på 15. Grundformel: startantal = maskor före + n × rapportens förbrukning + maskor efter. Lägg bara till en separat kant om den inte redan ingår. Vid formning räknas resultatet för varje varv separat.

3. Kontrollera storleksnoteringen. I ett mönster med flera storlekar är det lätt att ta fel siffra ur en parentesrad.

4. Kontrollera mönsterversionen och utgivarens officiella rättelser. Andra stickares projektanteckningar kan ge ledtrådar men ersätter inte utgivarens rättelse. Fråga utgivaren om formuleringen fortfarande är tvetydig i stället för att tvinga fram en beräkning som passar.

För större sammanhang om [att läsa stickmönster](/sv/artiklar/lasa-stickmonster-nyborjarguide/), inklusive storlekar, förkortningar och diagram, finns en separat guide.

## FAQ

**Vad betyder "upprepa från \* till de sista X m"?**
Arbeta hela grupper tills X ursprungliga maskor återstår och följ sedan avslutningen. Börja inte en grupp som skulle använda de reserverade maskorna. Kontrollera instruktionen om antalet inte passar; hitta inte på en delrapport.

**Räknar jag första gången?**
En första genomgång och 3 till ger 4 totalt; med tvåmaskorsgruppen `omslag, 2 rm tillsammans` blir det 8→8. Tre genomgångar totalt ger 6→6. Utan ”till” måste du kontrollera mönstrets konvention och sammanhang; maskantalet löser inte alltid tvetydigheten.

**Hur håller jag reda på var jag är i en lång rapport?**
Använd markörer där rapportgränserna tillåter det och anteckna både totalt varvnummer och varv inom cykeln. En markör är en kontrollpunkt, inte en instruktion att börja om hela mönstret.

**Varför asterisker i stället för hakparenteser?**
Utgivaren väljer grupperingssystem. Här betyder `[1 rm, 1 am] 4 gånger` fyra genomgångar totalt. Hakparenteser upphäver inte ordet ”till”, och parenteser kan även ange storlekar eller flera moment i samma maska.

**Kan jag sätta in en livlina mitt i ett varv?**
För metoden här väljer du ett helt, kontrollerat varv. Om du hittar ett fel mitt i varvet, lös det innan du väljer livlinans placering; sticka inte klart ett felaktigt varv bara för livlinans skull. Anteckna varvet och ta med alla levande öglor.

**Vad gör jag om rapporten plötsligt flyttar sig?**
Kontrollera varvnummer, rapportgränser, formning och eventuell förskjutning eller flyttning av markörer. Rätt maskantal eller likhet med ett tidigare varv bevisar inte att mönstret stämmer. Lokalisera felet innan du bestämmer hur långt du ska repa upp.
