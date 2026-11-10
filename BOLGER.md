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

## Åpne punkter

- Leverandørkreditt 360 dager og aktivering av installasjonskostnad, som før.
- Durasjon og rentenivå: siden sier at durasjonen synker når renten øker (standard teori, stemmer med tallene). Lysbildet sier det motsatte. Bør sjekkes mot Bredesen kap. 4.
- 2025 oppg. 4: LFs varians for aksje B (0,00579) lar seg ikke gjenskape; eksakt er 0,005852. Siden godtar begge.
- 2025 oppg. 5b: begge versjoner er etterregnet og står.
- Black–Scholes-toleransen beholdes (Excel-nøyaktighet), avgjort av eier.
- Ekte utskrift og flytting mellom fysiske enheter er ikke testet (bare i hodeløs Chromium, A4-PDF).

## Neste bølge (forslag)

Flere oppgavetyper fra kapittel-LF som ennå mangler: egenproduksjon eller kjøp (kostnadsnåverdi, kap. 11 oppg. 12), lite eller stort anlegg (kap. 6 oppg. 5), fortsette eller avslutte med sunk cost (kap. 6 oppg. 9) og egenkapitalmetoden etter skatt (kap. 8 oppg. 8). Deretter en repetisjonsliste som tar frem oppgavetypene man har bommet på, og en sjekk av durasjonspunktet mot læreboka.
