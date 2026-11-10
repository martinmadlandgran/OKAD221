# Bølgelogg og overlevering

Arbeidet gjøres i bølger. Etter hver bølge rapporterer Claude i dette formatet:

1. Hva jeg (Claude) har gjort
2. Hva du må teste (bare det Claude ikke kan teste selv)
3. Vedlegg/filer du trenger
4. Spørsmål du må svare på (med svaralternativer og anbefalt svar)
5. Hva neste bølge bør være
6. Forslag til melding for neste bølge, klar til å kopiere inn i en ny chat

## Føringer fra eier

- Språk: norsk bokmål.
- Utforming: se «Utforming» i `README.md`. Ingen kort, skygger, gradienter eller pynt. Størrelse følger viktighet. Siden skal fungere som et verktøy, også når noe går galt (tomt søk, ugyldig felt, sperret lagring, mobil, tastatur, kontrast).
- Kontrollspørsmål for alt nytt: Hva skal brukeren gjøre her, og hvor godt fungerer det når noe går galt?
- Eksamen varer 4 timer. Siden publiseres med GitHub Pages fra `main`.

## Status

| Bølge | Innhold | Status |
|---|---|---|
| 1 | Uttrekk fra Drive (10 eksamener med LF, forelesninger kap. 1–11 og 13, kapittel-LF kap. 2–13) og eksamensanalyse | Ferdig |
| 2 | Regnemotor, 27 generatorer, prøveeksamen, eksamensdata, teori, quiz, formler, kalkulatorer | Ferdig |
| 3 | Ny utforming, feiltilstander, mobil, tilgjengelighet, nettlesertest (213 kontroller) | Ferdig |
| 4 | Faglig kvalitetssikring: teori, 148 quizspørsmål, 27 generatorer og 10 eksamenssett etterregnet mot `kilder/` | Ferdig |
| 5 | Fire generatorpunkter ryddet, tre nye generatorer, prøveeksamen på papir med fasit bakerst, flytting av fremdrift mellom enheter | Ferdig |
| 6 | Fire nye generatorer fra kapittel-LF (6.5, 6.9, 8.8, 8.12), repetisjonsliste, durasjonspunktet sjekket mot forlagets lysbilder | Ferdig |
| 7 | Tre nye generatorer fra kapittel-LF (6.1, 8.10, 8.9 med 8.1d), quiz med repetisjon | Ferdig |
| 8 | Fire nye generatorer fra kapittel-LF: kapittel 12 (12.1–12.2, 12.3, 12.5) og salg av driftsmiddel (8.3) | Ferdig |
| 9 | Factoring (7.7b, 7.8) og nøkkeltall for likviditet (12.3), dager i året gjort konsekvent | Ferdig |
| 10 | 14 nye quizspørsmål (factoring og nøkkeltall for likviditet), åpne punkter gjennomgått, installasjonskostnad lukket | Ferdig |

## Bølge 4: faglig kvalitetssikring (ferdig)

Alt innhold er lest linje for linje og etterregnet uavhengig av `js/fin.js`, mot `kilder/`.
Læreboka og originalfilene i Drive er ikke lest på nytt; kontrollen er mot uttrekkene.

Dekning:

- Teori kap. 1–13: alle formler, eksempler, tabeller og «typiske feil». Ingen gale formler eller eksempeltall. ARR-variantene samsvarer med kapittel-LF. Altman Z bruker 1968-koeffisientene (1,2 / 1,4 / 3,3 / 0,6 / 0,999) som kapittel-LF 12.5.
- Quiz: alle 148 spørsmål. Ingen gal `correct`. Én tvetydig formulering og to forklaringer rettet.
- Generatorer: alle 27, fasit etterregnet for 200–500 frø hver uten avvik. Feilene lå i løsningstekst, oppgavedata og kanttilfeller.
- Eksamener: alle 40 oppgaver, tekst og tabeller sammenlignet maskinelt med kilden, alle fasittall etterregnet.

Rettet:

- Eksamen mars 2017 oppg. 4d/4e: LF oppgir internrente 9,17 % på differanseinvesteringen. Etterregning gir 8,68 %. Siden viser begge.
- Eksamen 2023 4c og 2024 4c: fortegn på «NV av økt skatt» i løsningsmetoden. 2021 4b: formelen viste avrundet WACC som ikke ga LF-tallet. 2023 2f: tallfestet at serielån gir høyere effektiv rente (8,11 % mot 8,04 %), mot LFs første setning.
- Teori: nominell rente i «rentefri» avbetaling (0 %, ikke 14,55 %), skattesats 27 % i 2016 og mars 2017, eksamensfrekvens for renteregning og ekvivalent annuitet, enhet i payback-tabellen.
- Generatorer: løsning når vekst = rente (delte på null i teksten), mellomregning med avrundet månedsrente, «de første 1 året», giringskommentar som ikke passet tallene, begge prosjekter med negativ nåverdi, vedlikehold som kunne bli 0, oppgitt avkastning som ikke ga fasiten for alfa, aksjer med forventet avkastning under risikofri rente, deloppgave k merket «undefined», toleranse for minimum-varians-vekt, tusenskille i Excel-formler.

Åpne punkter fra bølge 4: de fire generatorpunktene er rettet i bølge 5. Resten står under «Åpne punkter» nederst.

Test etter bølgen: `node tools/check.js 300` OK, `tools/e2e.js` 213 bestått.

## Bølge 5: rydding, nye oppgavetyper, papir og flytting (ferdig)

Generatorpunktene fra bølge 4 (alle kontrollert over 3000 frø med uavhengig regning fra oppgaveteksten, 0 avvik):

- `k10-to-aksjer-tilstander`: trekker tilstandene på nytt til minimum-varians-vekten ligger mellom −50 % og 150 % (før: 5 % av frøene over 300 % eller under −200 %). Shortsalg-tilfellet finnes fortsatt.
- `k11-wacc-kvm`: markedsverdiene velges fra en totalverdi, så E/V er nøyaktig den oppgitte andelen.
- `k8-nv-etter-skatt-komplett`: |NNV| er alltid over 0,6 % av investeringen, så et svar med motsatt fortegn faller aldri innenfor toleransen (±0,4 %). Siden sier da «fortegnet er feil».
- `k5-payback-kapitalrasjonering`: beste udelelige kombinasjon er alltid entydig. Løsningen viser også nest beste kombinasjon og hva NVI-rangering gir (avviker fra optimum i ca. 27 % av frøene, et godt læringspoeng).

Nye generatorer (30 i alt), hver etterregnet over 1000 frø fra oppgaveteksten (21 000 tallsvar, 0 avvik), og regnefunksjonene kontrollert mot kildene (28 kontrolltall):

- `k2-hotell-differanse` (2022 oppg. 1): økt DB, differansekontantstrøm, NNV, IR, payback og vurdering av metoden, verdien av en forlengelse, kritisk belegg i de nye rommene (kap. 6 oppg. 6). Gjenskaper 2022: NV 988 363, payback 3,48, forlengelse 3 408 011.
- `k8-kapasitetsutvidelse` (2023 oppg. 4): WACC, merkvantum, arbeidskapital av merkvantumets omsetning, NV spart skatt, NNV etter skatt, salg av utstyret skattemessig gunstigst. Omtrent 4 av 10 frø har en ny kapasitetsgrense som også begrenser salget. Gjenskaper 2023 (NNV 1 044 022, endring 551 286) og kap. 11 oppg. 13 (NNV 746 576, +529 853).
- `k2-kontantstrom-egenkapital` (kap. 2 oppg. 1): prosjektets kontantstrøm, renter, kontantstrøm til egenkapitalen med serie- eller annuitetslån, og hvorfor summen til eierne er lik summen av resultatene. Gjenskaper kapittel-LF 2.1 år for år.
- Koblet inn: prognoseluke 1 og 5, prøveeksamenens trekkpott (hotell 1,5 av 9,5 i oppgave 1, kapasitet 1 av 3 i oppgave 5), og «Samme type med nye tall» under 2022 oppg. 1 og 2023 oppg. 4.

Prøveeksamen på papir (`#/prove/utskrift/<nr>`): fem oppgaver med svarlinjer, fasiten bakerst fra ny side. Valg: svar og fremgangsmåte, bare svar, eller ingen fasit. Fasiten er skjult på skjermen til man ber om den. «Tast inn svarene og få dem rettet» starter samme sett på skjerm uten klokke, og loggen viser «løst på papir». Utskriften bruker lyse farger også i mørkt tema. Settet som ble prøvd, ga 13 A4-sider med full fasit.

Flytte fremdrift (forsiden, Innstillinger): last ned fil eller kopier som tekst, hent fra fil eller lim inn tekst. Før noe endres vises en tabell med filen, enheten og resultatet etter sammenslåing. «Slå sammen» beholder enheten med flest forsøk per oppgavetype og quizkapittel, og tar med avkryssinger og prøveresultater fra begge (samme fil to ganger endrer ingenting). «Erstatt» spør først. Feiltilstander: tomt, ikke JSON, annet program, nyere versjon, ingen fremdrift, for stor fil, ukjente oppgavetyper (hoppes over med beskjed), ugyldige verdier (filtreres bort, også HTML i datofelt), sperret lagring (virker for økten, med beskjed), utklippstavle sperret (teksten vises merket).

Avgjort av eier etter bølgen: sammenslåingen beholdes slik den er (ikke bare «Erstatt»), trekkvektene for de nye oppgavetypene i prøveeksamenen beholdes, og standard fasit i utskriften er «Svar og fremgangsmåte».

Nytt verktøy: `node tools/verify.js 1000` kjører kontrollen mot kildene og etterregningen. Den fanger innsatte feil (prøvd med to bevisste feil i en kopi).

Test etter bølgen: `node tools/check.js 300` OK, `node tools/verify.js 1000` OK, `tools/e2e.js` 264 bestått (51 nye kontroller for papir og flytting).

## Bølge 6: valg mellom alternativer, repetisjon og durasjon (ferdig)

Nye generatorer (34 i alt), i `js/gen/valg.js`. Regnefunksjonene gjenskaper alle tall i kapittel-LF (43 nye kontrolltall). Hver generator er etterregnet over 1000 frø fra oppgaveteksten, med egne formler: 25 000 nye tallsvar, 0 avvik. Fire innsatte feil (én i hver regnefunksjon) ble alle fanget.

- `k6-lite-stort-anlegg` (kap. 6 oppg. 5): kritisk volum for hvert anlegg, største NNV med lite anlegg, volumet der stort slår lite, og NNV for det beste anlegget ved et oppgitt salg. Tallene trekkes slik at stort aldri er bedre allerede under lite anleggs kapasitet, så «fra hvilket salg» har ett svar. Gjenskaper 4 142, 5 562, 639 646 og 7 265.
- `k6-fortsette-avslutte` (kap. 6 oppg. 9): NNV, IR, laveste salgsverdi, laveste årlige innbetaling, kannibalisering som tapt dekningsbidrag, og fortsette eller selge etter ett år (investeringen er sunk, salgsverdien i dag er alternativverdien). Begge utfallene forekommer: omtrent 1 av 4 frø gir «selg nå», og i ca. 6 av 10 frø gir kannibaliseringen negativ NNV, men det lønner seg likevel å fortsette. Gjenskaper 678 437, 16,74 %, 697 000, 1 527 190, −67 618 og 925 620.
- `k8-egenproduksjon-kjop` (kap. 8 oppg. 12): IR før skatt på differansen, kostnadsnåverdi etter skatt for begge, forskjellen, kritisk volum, NNV av et nytt produkt og hvor mye kannibalisering det tåler. Halvparten av frøene gir kjøp som billigst. Installasjonen kostnadsføres direkte, som i LF, og det står i oppgaveteksten. Gjenskaper −673 245, −702 931, 8 994, 85 921 og 1 852.
- `k8-egenkapitalmetoden` (kap. 8 oppg. 8): NNV og IR før skatt, NNV etter skatt med totalkapitalmetoden, annuitetslån, renter, kontantstrøm til egenkapitalen og egenkapitalens internrente. Gjenskaper 60 134, 25,07 %, 75 486, terminbeløp 57 718 og hele regnearket ved 0 % (−263 440 … 408 000, sum 328 479). LF oppgir ikke selve internrenten, siden den krever målsøking. Siden regner den med skattefordelen ved samme rente (26,57 % i LF-tallene) og viser også svaret med skattefordelen regnet ved kravet.
- Koblet inn under temaene «Kritiske verdier og følsomhet» og «Nåverdi etter skatt». De er ikke lagt i prøveeksamenens trekkpott og ikke i prognoseluken på forsiden, fordi ingen av dem er gitt som egen oppgave 2016–2025 (se spørsmål 1).
- Rettet: forslaget etter bølge 5 sa «kap. 11 oppg. 12» om egenproduksjon eller kjøp. Riktig er kap. 8 oppg. 12.

Repetisjonsliste (`#/repeter`, lenket fra forsiden og Øv-siden når den ikke er tom):

- En oppgave havner i listen når et tallsvar er feil på første forsøk, når løsningen åpnes før man har svart (også «Vis alle løsninger»), eller når et tallsvar er feil eller blankt på en levert prøveeksamen. Listen viser hvilke deloppgaver som var feil, datoen og om feilen kom på en prøveeksamen.
- Rekkefølgen er eksamensvekt (sannsynlighet × vekt fra prognosen) × antall oppgaver med feil. Den store skatteoppgaven står derfor foran renteregning.
- «Samme oppgave igjen» åpner nøyaktig de samme tallene, med beskjed om hva som var feil. Er alle tallsvarene riktige på første forsøk, forsvinner oppgaven fra listen. En ny oppgave av samme type uten feil fjerner den eldste. Listen holder høyst 6 oppgaver per type.
- Treffprosenten endres ikke, og prøveeksamenen teller fortsatt ikke i den.
- Flyttes med fremdriften. Sammenslåing er idempotent, og forhåndsvisningen viser «Oppgaver å repetere». Ugyldige oppføringer (negativt nummer, HTML i deloppgavefeltet) filtreres bort. Tom liste har to tilstander: «ennå» (ingenting prøvd) og «alt er løst».

Durasjon og rentenivå: setningen «Durasjonen reduseres hvis diskonteringssatsen reduseres …» står ordrett i forlagets lysbilder til kap. 4 (`Kapittel 4-7utg.pptx` i Drive, lysbildet «Hva påvirker durasjonen?»), så den er ikke foreleserens egen. Forlagets egne tall går mot den. Den samme 7 %-obligasjonen har durasjon 2,80 ved yield 7,91 % (lysbildet) og 2,81 ved yield 4,72 % (LF 2024 oppg. 2). Obligasjon A fra eksamen 2025 gir 2,90 ved 10 % og ca. 2,91 ved 4 %. Teorisiden sier nå dette og ber om svar etter standardteorien. Selve læreboka finnes ikke i Drive og er ikke lest.

Test etter bølgen: `node tools/check.js 3000` OK (34 generatorer), `node tools/verify.js 1000` OK (71 kontrolltall, 46 000 tallsvar), `tools/e2e.js` 300 bestått (36 nye kontroller, blant annet for repetisjonslisten).

## Bølge 7: følsomhet på internrenten, leasing, IR etter skatt og quizrepetisjon (ferdig)

Nye generatorer (37 i alt), i `js/gen/ir.js`. Regnefunksjonene gjenskaper alle tall i kapittel-LF (45 nye kontrolltall, 116 i alt). Hver generator er etterregnet over 1000 frø fra oppgaveteksten med egne formler: 22 000 nye tallsvar, 0 avvik. Fire innsatte feil (kontantstrøm, fortegn på nedskrivingseffekten, effektiv skattesats, arbeidskapital i etter-skatt-kalkylen) ble alle fanget.

- `k6-folsomhet-internrente` (kap. 6 oppg. 1): kontantstrøm og internrente i basis, ny internrente når pris, variable kostnader, volum, investering, levetid og faste kostnader endres én om gangen med 10 % (eller 20 %) i ugunstig retning, og hvor mye prisen kan falle før internrenten er lik kravet. Løsningen tegner stjernediagrammet (SVG, bare linjer og tekst i temaets farger, navnene skjøvet fra hverandre) og har tabellen ved siden av. Gjenskaper 16,95 %, 0,00 %, 4,85 %, 13,19 %, 14,41 %, 15,63 % og 16,03 %. Prisen er alltid den mest kritiske variabelen (det følger av at omsetningen er større enn kontantstrømmen), men rekkefølgen etter den varierer, og 0–6 av endringene tar internrenten under kravet.
- `k8-leasing-kjop` (kap. 8 oppg. 10): lånerente etter skatt, tapt skattefordel av saldoavskrivningene, beregningsgrunnlaget i år 0, leie etter skatt, NNV av leasing mot kjøp, leasingens internrente etter skatt (målsøking) og høyeste leie som lønner seg. Halvparten av frøene har salgsverdi ved slutten (tapt salgsverdi og slipper økt skatt ved nedskriving), og saldosatsen er 20, 24 eller 30 %. Leasing og kjøp er billigst omtrent like ofte. Gjenskaper 6,24 %, 50 808, 252 192, 62 400, −8 952, 7,26 % og 48 909 (skattefordelen ved den eksakte internrenten).
- `k8-ir-etter-skatt` (kap. 8 oppg. 9, med effektiv skattesats fra oppg. 1d): kontantstrøm fra drift, internrente og NNV før skatt, NNV etter skatt, internrente etter skatt ved målsøking og effektiv skattesats. Varianter med salgsverdi lik restsaldo (som i LF), med annen salgsverdi, og uten salgsverdi og arbeidskapital (som 8.1). Effektiv skattesats er høyere enn 22 % i omtrent halvparten av frøene, og forklaringen følger tallene. Gjenskaper 8.9 (378 000, 20,42 %, 175 882, 149 747, −41 893, 217 228, 16,15 %, og 124 282 og −27 973 ved internrenten) og 8.1 (14,96 %, 15 338, 10,52 %, 29,72 %).
- Koblet inn under temaene «Kritiske verdier og følsomhet», «Nåverdi etter skatt» og (leasing) «Kassekreditt, leverandørkreditt, leasing». Ikke lagt i prøveeksamenens trekkpott eller prognoseluken, som avgjort for bølge 6.

Målsøking og toleranse. Internrenten etter skatt godtas innenfor 0,1 prosentpoeng av målsøkingssvaret, som eier avgjorde for egenkapitalmetoden. Etterregningen viste at tilnærmingen med skattefordelen holdt fast på kravet bommer mer enn det: median 0,25 prosentpoeng for leasing, 0,47 for IR etter skatt og 0,44 for egenkapitalmetoden (bølge 6), og den godtas bare i 5–9 % av frøene. Bølge 6-teksten kalte forskjellen «liten». Alle tre løsningene oppgir nå det faktiske avviket og sier om det er innenfor toleransen. Toleransen for effektiv skattesats er satt slik at et svar bygget på en internrente innenfor 0,1 prosentpoeng godtas (ca. ±0,5–0,8 prosentpoeng).

Rettet underveis: nullpunktsøket for internrente etter skatt startet på −50 % (bølge 6) og −30 %. Saldoformelen har en singularitet ved r = −20 %, og søket kunne ende ved feil rot (det skjedde for leasing i ca. 1 av 3 frø før rettingen). Alle søk starter nå på −15 %.

Quiz med repetisjon:

- Et spørsmål du svarer feil på, lagres (tid og antall feil) og kommer igjen i senere runder til du svarer riktig. Hver runde tar med de eldste feilene først, høyst fem, og fyller resten med andre spørsmål. Har kapitlet for få andre spørsmål, fylles runden med flere som venter. Svarer du riktig, forsvinner det; feil igjen øker telleren.
- Spørsmålet er merket «Repetisjon» med hvor mange ganger det er feil. Svaret sier «kommer igjen i en senere runde» eller «fjernet fra repetisjonen», og resultatet teller hvor mange som ble ryddet.
- `#/quiz/repeter` gir en runde med bare spørsmålene som venter. Quizsiden viser antallet totalt og per kapittel, forsiden og repetisjonslisten for oppgaver lenker til den. Tom tilstand har to varianter: «ennå» og «alt er løst».
- Spørsmålene får en stabil id fra teksten (hash), så nye spørsmål eller ny rekkefølge flytter ikke repetisjonen. `check.js` kontrollerer at alle 148 id-ene er unike. Endres teksten i et spørsmål, faller det ut av repetisjonen.
- Flyttes med fremdriften og vises i forhåndsvisningen («Quizspørsmål å repetere»). Sammenslåing er idempotent. Ved import filtreres ukjente spørsmål (med beskjed), negativ tid, ugyldig antall, `__proto__` og en liste i stedet for et objekt bort. Ødelagt eller utgått liste i nettleseren ved oppstart gir tom liste. Virker også med sperret lagring, for økten.
- Treffprosenten per kapittel regnes som før.

Også rettet: «Slett all lagret fremdrift» sa «ingenting å slette» når bare quizsvar eller en eksamensdato var lagret.

Test etter bølgen: `node tools/check.js 3000` OK (37 generatorer, unike quiz-id-er), `node tools/verify.js 1000` OK (116 kontrolltall, 68 000 tallsvar), `tools/e2e.js` 365 bestått (65 nye kontroller for quizrepetisjon, de tre nye typene og stjernediagrammet).

## Bølge 8: kapittel 12 og salg av driftsmiddel (ferdig)

Nye generatorer (41 i alt), i `js/gen/kreditt.js` og `js/gen/salg.js`. Regnefunksjonene gjenskaper alle tall i kapittel-LF (54 nye kontrolltall, 170 i alt). Hver generator er etterregnet over 1000 frø fra oppgaveteksten med egne formler: 34 000 nye tallsvar, 0 avvik. Fem innsatte feil (360/365 dager, tapt omsetning i stedet for tapt DB, rabatt på hele omsetningen, X5 delt på gjeld, salgssum uten skatt ved inntektsføring) ble alle fanget.

- `k12-kredittpolitikk` (kap. 12 oppg. 1 og 2): del 1 er en prosjektkalkyle der kundefordringene (omsetning · dager / 360) bindes i år 0 og frigjøres siste år, med NNV, internrente og hva lengre kredittid koster. Del 2 er strammere kredittpolitikk fra resultat og balanse: nye kundefordringer, netto redusert kapitalbehov (kunder og varelager ned, kreditorer ned øker behovet, nytt utstyr), sparte renter og reduserte tap mot tapt dekningsbidrag, administrasjon og avskrivning. Tiltaket lønner seg i 46 % av frøene. Gjenskaper 150 000, −1 050 000 / 342 000 / 742 000, 25,0 %, 133 540, og 2 550 000, 450 000, 700 000, 2 240 000, 336 000, 707 000, 1 043 000, 756 000, 1 026 000 og 17 000. LF sier ikke hvordan tallene i 12.2 er utledet. Oppgaveteksten er rekonstruert slik at de stemmer: 10 % omsetningsfall, kredittid fra 52,5 til 30 dager, varelager og kreditorer ned 10 %, tap 2 % av ny omsetning, utstyr 60 000 over 3 år.
- `k12-kontantrabatt` (kap. 12 oppg. 3, tall i 1 000 kr, 365 dager som i LF): kundefordringer for dem som tar rabatten og samlet, frigjort kapital, rabattkostnad, sparte renter, reduserte tap, netto resultatøkning, høyeste rabatt som lønner seg, og kundens effektive årsrente ved å ikke ta rabatten. Lønner seg i 41 % av frøene. Gjenskaper 1 398, 10 985, 12 383, −9 587, 1 094, 1 594, 1 342, 656, 1 998 og 405. Svarene oppgis i tusen kroner. Feltet er merket «tusen kr», «1 398 tusen» godtas, og et svar i hele kroner gir egen beskjed.
- `k12-altman-z` (kap. 12 oppg. 5): de fem forholdstallene fra en balanse og resultatlinjer, Z og sone, og hvor mye driftsresultatet må øke (eller kan falle) for å nå neste grense. Arbeidskapitalen er negativ i ca. halvparten av frøene, som i LF. Sonene fordeler seg 31 % høy risiko, 49 % gråsone og 20 % lav. Z ligger aldri nærmere en grense enn 0,03. Gjenskaper alle forholdstall og bidrag og Z = 2,8565. Grensene 1,81 og 2,99 står ikke i kildene. De er tatt fra standardteorien og oppgitt i oppgaveteksten.
- `k8-salg-driftsmiddel` (kap. 8 oppg. 3): internrente før skatt, NV spart skatt, NNV etter skatt med salgssummen inntektsført direkte og nedskrevet på saldo, NV av den økte skatten og forskjellen. Oppgaveteksten forklarer begge måtene. Gjenskaper 20,73 %, 88 000, −512 000 / 195 000 / 156 000 / 351 000, 57 910, 38 567, −550 567 … 428 000 og 77 194.
- Koblet inn: kapittel 12 får tre oppgavetyper på Øv-siden og under «Øv på kapitlet» i teorien. 8.3 ligger under temaet «Nåverdi etter skatt». Ingen av de fire er lagt i prøveeksamenens trekkpott eller prognoseluken. Kapittel 12 har ikke fått eget tema i eksamensanalysen, fordi det aldri er gitt og bare ville gitt en tom rad i varmekartet.
- Teori kap. 12: ny fremgangsmåte for Altmans Z, og grensene står i formelnoten med merknad om kilden.
- Også endret: tallfeltene godtar «tusen» (som «kr» og «%»). Z-formelen i oppgaveteksten brytes mellom leddene på smal skjerm i stedet for å rulle sidelengs.

Test etter bølgen: `node tools/check.js 3000` OK (41 generatorer), `node tools/verify.js 1000` OK (170 kontrolltall, 102 000 tallsvar), `tools/e2e.js` 406 bestått (41 nye kontroller: alle fasitsvar godtas i 390 px, ingen sidelengs rulling i 320 og 390 px, tusen kroner, fortegn på netto og negativ arbeidskapital, sone i løsningen, inntektsført NNV godtas ikke som nedskrevet, kapittel 12 i teori og Øv, utenfor trekkpotten, Tab til Sjekk, Z-formelen hel i 320 px).

Avgjort av eier etter bølgen: salg av driftsmiddel holdes utenfor prøveeksamenens trekkpott som de andre nye typene (1b). Antall dager i året følger oppgaveteksten, og teorisiden sier det (2a). Altmans grenser 1,81 og 2,99 beholdes i oppgaveteksten (3a). Fulgt opp: alle generatorer som regner med dager, oppgir antallet i teksten (leverandørkreditt 360, kredittpolitikk 360, kontantrabatt 365, opsjoner 365). Teorien for kapittel 7 (leverandørkreditt og factoring) sier nå at man skal følge oppgaveteksten, og bruke 360 og si det i svaret hvis ingenting står. Kapittel 12 sa dette fra før.

## Bølge 9: factoring, nøkkeltall og dager i året (ferdig)

Nye generatorer (43 i alt), i `js/gen/kreditt.js`. Regnefunksjonene gjenskaper alle tall i kapittel-LF og forelesningens factoringeksempel (23 nye kontrolltall, 193 i alt). Begge er etterregnet over 1000 frø fra oppgaveteksten med egne formler: 16 000 nye tallsvar, 0 avvik. Fire innsatte feil (renter av hele forskuddsperioden, varelager i kasselikviditeten, 360 i stedet for dagene i teksten, kortsiktig gjeld ikke nedbetalt) ble alle fanget.

- `k7-factoring` (kap. 7 oppg. 7b og 8, og forelesningens eksempel 7-10): kundefordringer før, det bedriften selv binder etter (marginen, og hele fakturaen til forskuddet kommer), frigjort kapital, gjennomsnittlig forskuttert beløp, renter, gebyr (prosent av kredittsalget eller per faktura), netto kostnad, kostnad i prosent av frigjort kapital, og høyeste gebyr før factoring blir dyrere enn kassekreditt. Varianter: forskudd straks eller etter 5–10 dager (halvparten), og kortere kredittid med factoring (3 av 10 frø). Da er forskuddet mindre enn den frigjorte kapitalen, og rentene regnes bare av forskuddet, som i forelesningen. Factoring er billigst i 58 % av frøene. 360 dager i 8 av 10 frø, 365 ellers, alltid oppgitt. Gjenskaper 400 000, 100 000, 300 000, 60 000, 12 600, 72 600, 24,2 % (7b), 1 500 000, 300 000, 140 000, 440 000, 1 060 000, 159 000, 169 000, 15,9 % (8) og 1 300 000, 104 000, 114 000, 8,8 % (7-10, rekonstruert løsning).
- `k12-nokkeltall-likviditet` (kap. 12 oppg. 3): arbeidskapital, balanselikviditet, kasselikviditet, gjeldsandel og kundekredittid fra balansen, frigjort kapital hvis kredittiden kommer ned på bransjesnittet, og ny balanselikviditet når den frigjorte kapitalen nedbetaler kassekreditten (øker når likviditeten er over 1, faller under 1). Tabellen viser de tre foregående årene og bransjesnittet; utviklingen er en forverring i ca. 2 av 3 frø. Balanselikviditeten er under 1 i ca. 19 % av frøene. 365 dager i 8 av 10 frø, 360 ellers. Gjenskaper 73 850, 1,36, 0,78 og 110 dager. LFs gjeldsandeler (80,2–97,1 %) lar seg ikke gjenskape fra balansen, som gir 58,7 %. Generatoren bruker total gjeld / totalkapital, og teorien sier dette.
- Koblet inn: factoring under kapittel 7 og temaet «Kassekreditt, leverandørkreditt, leasing», nøkkeltall under kapittel 12. Ingen av dem er i prøveeksamenens trekkpott eller prognosen.
- Tallfeltene godtar «dager» (som «kr», «%» og «tusen»).
- Teori: fremgangsmåte og eksempel (7.8) for factoring i kapittel 7, fremgangsmåte, to formler, begrep og eksempel (12.3) for nøkkeltall i kapittel 12, nye «typiske feil».

Dager i året, etter eiers avgjørelse (følg oppgaveteksten; står det ingenting, bruk 360 og si det). Gjennomgått alle steder:

- Teori og formelsamling (formelsamlingen bygges fra teorien): samme setning i formlene for leverandørkreditt, factoring, kundefordringer og kundekredittid. Kapittel 12 manglet regelen om 360 når ingenting står; nå med. Eksemplene 12.1 og 12.3 sier hvilket antall oppgaven bruker. Ny «typisk feil» i kapittel 7. Kildemerknaden for leverandørkreditt sier nå at forelesningens eksempel ikke oppgir antallet.
- Black–Scholes: alle kildene bruker 365, og teorien sier det og at oppgaveteksten går foran. Oppgaveteksten i `k13-opsjonsposisjoner` oppgir nå 365 dager i selve spørsmålet (før stod det bare i hintet).
- Generatorer: alle som regner med kredittdager eller dager til bortfall, oppgir antallet. `e2e.js` kontrollerer dette for alle 43 typer over 40 frø. Hotellets åpningsdager (350/360/365) er ikke en dagekonvensjon og er urørt. Renteteoriens tabell med daglig rentesrente (365) er også urørt.

Også rettet: balansetabellen fikk ikke plass i 320 px fordi alle tabellceller er `nowrap`. Radnavnene i de to nye tabellene brytes nå.

Test etter bølgen: `node tools/check.js 3000` OK (43 generatorer), `node tools/verify.js 1000` OK (193 kontrolltall, 118 000 tallsvar), `tools/e2e.js` 448 bestått (42 nye kontroller).

Avgjort av eier etter bølgen: nøkkeltallstabellen snus med årene som rader, så den får plass uten sidelengs rulling på mobil (1a), og gjeldsandelen beholdes som total gjeld / totalkapital (2a). Fulgt opp: tabellen har kolonnene år, balanselikviditet, kasselikviditet, gjeldsandel (%) og kredittid (dager), med 2025 som en rad med spørsmålstegn og bransjesnittet som siste rad. Overskriftene er forkortet og står med vanlige bokstaver i denne tabellen, og teksten under forklarer forkortelsene og enhetene. Den får nå plass i 320 px, og `e2e.js` kontrollerer det (449 bestått).

## Bølge 10: quiz for factoring og nøkkeltall, åpne punkter (ferdig)

Nye quizspørsmål (162 i alt, 148 før). Alle tall er etterregnet for hånd og med et eget skript, og hvert feil alternativ er en bestemt, navngitt feil som forklaringen sier hva er. Rekkefølgen på alternativene stokkes på skjermen som før.

- Kapittel 7, factoring (6 nye, 19 i kapitlet): frigjort kapital når marginen fortsatt er bundet (feil: hele kundefordringene, 365 i stedet for 360 dager), hvorfor marginen ikke er en kostnad, kostnad i prosent (feil: delt på hele kundefordringene, sparte administrasjonskostnader glemt, bare renten), forsinket forskudd (feil: forsinkelsen glemt, marginen glemt, det bundne beløpet), kortere kredittid der rentene bare regnes av forskuddet (feil: renter av frigjort kapital, av fordringene før, med gammel kredittid), og sammenligning med kassekreditt.
- Kapittel 12, nøkkeltall for likviditet (8 nye, 11 i kapitlet): balanselikviditet, kasselikviditet og gjeldsandel fra samme balanse (feil: varelager med eller uten, brøken snudd, all gjeld i nevneren, gjeldsgrad i stedet for gjeldsandel, egenkapitalandel), hvorfor varelageret holdes utenfor, kundekredittid (feil: hele omsetningen med kontantsalg, 360 i stedet for 365, omløpshastighet), frigjort kapital når kredittiden kommer ned på bransjesnittet, og hva nedbetaling av kassekreditten gjør med balanselikviditeten over og under 1 (det samme poenget som generatoren `k12-nokkeltall-likviditet`).
- Hvert spørsmål oppgir alle tallene det trenger, siden runden stokker spørsmålene. Gjeldsandelen er total gjeld / totalkapital, som eier avgjorde etter bølge 9. Antall dager i året står i hvert spørsmål som regner med dager.
- Kapittel 12 har nå 11 spørsmål og gir en full runde på 10. Kapittel 1 (5 spørsmål) er nå det minste kapitlet.

Kontroller:

- `check.js` sjekker nå også at hvert quizspørsmål har fire ulike alternativer, et riktig svar mellom 0 og 3 og en forklaring (alle 162 består), i tillegg til unike id-er.
- `e2e.js` (13 nye kontroller): minst seks factoringspørsmål og åtte nøkkeltallspørsmål, kapittel 12 gir full runde, alle de nye spørsmålene kommer i repetisjonsrunden når de venter, feil svar gir forklaring på alle, ingen sidelengs rulling i 320 px verken på spørsmålet eller forklaringen, riktig svar står ikke på samme plass i dataene, og feil igjen holder dem i repetisjonen. Kontrollen for «kort runde» bruker nå kapittel 1 (5 spørsmål) i stedet for kapittel 12.

Åpne punkter gjennomgått mot `kilder/` (hva kan lukkes uten læreboka):

- Aktivering av installasjonskostnad: lukket. Kildene sier begge deler, og alltid i oppgaveteksten: eksamen 2018 og 2023 aktiverer installasjonen, kapittel-LF 8.12 kostnadsfører den direkte (skattefradrag 14 080 i år 0). Generatoren `k8-egenproduksjon-kjop` gjør som 8.12 og sier det i oppgaveteksten, og løsningen forklarer alternativet. Teorien for nåverdi etter skatt (kapittel 8) sier nå at man skal følge oppgaveteksten, med begge kildene.
- Gjeldsandelen i 12.3: lukket som avgjort av eier (total gjeld / totalkapital). Teorien sier fortsatt at LFs tall ikke lar seg gjenskape.
- 2025 oppg. 4 (variansen for aksje B) og 2025 oppg. 5b: lukket. Siden godtar eller viser begge, og ingen lærebok kan endre hva LF sier.
- Black–Scholes-toleransen: lukket, avgjort av eier.
- Står åpne fordi de krever læreboka eller lysbildene som bilder: Altmans grenser (1,81 og 2,99), durasjon og rentenivå, og factoring med kortere kredittid (eksempel 7-10). For 7-10 er metoden for frigjort kapital og renter den samme som i kapittel-LF 7.7b og 7.8 når kredittiden ikke endres, så det eneste som ikke er bekreftet, er at rentene regnes av forskuddet når kredittiden også blir kortere.
- Står åpent fordi det krever eier: ekte utskrift og flytting mellom fysiske enheter.

Test etter bølgen: `node tools/check.js 3000` OK (43 generatorer, 162 gyldige quizspørsmål med unike id-er), `node tools/verify.js 1000` OK (193 kontrolltall, 118 000 tallsvar), `tools/e2e.js` 462 bestått.

## Åpne punkter

- Altmans grenseverdier (1,81 og 2,99) er ikke kontrollert mot læreboka. Beholdt i oppgaveteksten, avgjort av eier.
- Durasjon og rentenivå: forlagets lysbilder sier det motsatte av standardteorien og av forlagets egne tall (se bølge 6). Siden følger standardteorien. Læreboka er ikke lest, så det står igjen å se hva den sier.
- Factoring med kortere kredittid bygger på forelesningens eksempel 7-10, der løsningen er rekonstruert. Det som ikke er bekreftet, er at rentene bare regnes av forskuddet. Ett nytt quizspørsmål bygger på dette.
- Ekte utskrift og flytting mellom fysiske enheter er ikke testet (bare i hodeløs Chromium, A4-PDF).

Lukket i bølge 10: aktivering av installasjonskostnad (følg oppgaveteksten), gjeldsandelen i 12.3 (avgjort), 2025 oppg. 4 og 5b (begge godtas eller vises), Black–Scholes-toleransen (avgjort).

Avgjort av eier etter bølge 6: de fire nye typene holdes utenfor prøveeksamenens trekkpott (1a), egenkapitalens internrente godtas innenfor 0,1 prosentpoeng av målsøkingssvaret (2a), og «Vis alle løsninger» før svar legger oppgaven i repetisjonslisten uten å endre treffprosenten (3a). Ingen kodeendring trengtes.

## Neste bølge (forslag)

Quizen er fortsatt tynn i resten av kapittel 12 (ett spørsmål om Altmans Z, ingen om kontantrabatt eller kredittpolitikk ut over kapitalbinding), i kapittel 9 (8 spørsmål) og i kapittel 1 (5). Forslag til bølge 11: quizspørsmål for kontantrabatt, kredittpolitikk og Altmans Z, og for kapittel 9, med samme krav som i bølge 10. I tillegg det eier finner i brukertesten på mobil.

## Melding for neste bølge (kopier inn i ny chat)

```text
Kjør bølge 11 i ØKAD 221-øvingssiden. Les BOLGER.md og README.md først, og følg føringene der (norsk bokmål, utformingsreglene, kontrollspørsmålet for alt nytt, rapportformatet med seks punkter).

Innhold i bølge 11:
1. Nye quizspørsmål for kapittel 12 (kontantrabatt, kredittpolitikk, Altmans Z) og kapittel 9, der hvert feil alternativ er en navngitt typisk feil. check.js skal fortsatt melde gyldige spørsmål med unike id-er.
2. Rett det jeg fant i brukertesten på mobil: <lim inn funn, eller skriv «ingen funn»>.
3. Oppdater tools/e2e.js og kjør check.js 3000, verify.js 1000 og e2e.js før du rapporterer.

Commit og push til arbeidsgrenen når alt er grønt.
```
