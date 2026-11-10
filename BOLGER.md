# Bølgelogg og overlevering

Arbeidet gjøres i bølger. Etter hver bølge rapporterer Claude i dette formatet:

1. Hva jeg (Claude) har gjort
2. Hva du må teste (bare det Claude ikke kan teste selv)
3. Vedlegg/filer du trenger
4. Spørsmål du må svare på (med svaralternativer og anbefalt svar)
5. Hva neste bølge bør være

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

## Åpne punkter

- Leverandørkreditt 360 dager og aktivering av installasjonskostnad, som før.
- Durasjon og rentenivå: forlagets lysbilder sier det motsatte av standardteorien og av forlagets egne tall (se bølge 6). Siden følger standardteorien. Læreboka er ikke lest, så det står igjen å se hva den sier.
- 2025 oppg. 4: LFs varians for aksje B (0,00579) lar seg ikke gjenskape; eksakt er 0,005852. Siden godtar begge.
- 2025 oppg. 5b: begge versjoner er etterregnet og står.
- Black–Scholes-toleransen beholdes (Excel-nøyaktighet), avgjort av eier.
- Ekte utskrift og flytting mellom fysiske enheter er ikke testet (bare i hodeløs Chromium, A4-PDF).

## Spørsmål til eier etter bølge 6

1. Skal de fire nye oppgavetypene med i prøveeksamenens trekkpott?
   - a) Nei. Prøveeksamenen følger eksamensmønsteret, og ingen av dem er gitt 2016–2025. De finnes under Øv. **(Anbefalt)**
   - b) Ja, med lav vekt: fortsette/avslutte 0,5 i oppgave 1, egenkapitalmetoden og egenproduksjon/kjøp 0,5 hver i oppgave 5.
2. Egenkapitalens internrente godtas innenfor 0,1 prosentpoeng av målsøkingssvaret. Svaret med skattefordelen regnet ved kravet ligger som regel innenfor, men ikke alltid.
   - a) Behold. Målsøking er riktig metode, og hintet sier det. **(Anbefalt)**
   - b) Godta begge svarene uansett avstand.
3. «Vis alle løsninger» før man har svart legger oppgaven i repetisjonslisten, men endrer ikke treffprosenten.
   - a) Behold. Man har ikke vist at man kan oppgaven. **(Anbefalt)**
   - b) Bare feil svar skal telle.

## Neste bølge (forslag)

Siste oppgavetyper fra kapittel-LF som mangler: leasing eller kjøp etter skatt (kap. 8 oppg. 10), følsomhetstabell og stjernediagram på internrenten (kap. 6 oppg. 1) og IR etter skatt med effektiv skattesats (kap. 8 oppg. 9c). Deretter en tidsbasert repetisjon også i quizen (spørsmål man har svart feil på kommer igjen), og en gjennomgang av de nye oppgavetypene på papir i prøveeksamensformat hvis eier svarer b på spørsmål 1.
