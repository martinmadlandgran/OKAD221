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

Åpne punkter (ikke endret):

- Leverandørkreditt 360 dager og aktivering av installasjonskostnad, som før.
- Durasjon og rentenivå: siden sier at durasjonen synker når renten øker (standard teori, stemmer med tallene). Lysbildet sier det motsatte. Bør sjekkes mot Bredesen kap. 4.
- 2025 oppg. 4: LFs varians for aksje B (0,00579) lar seg ikke gjenskape; eksakt er 0,005852. Siden godtar begge.
- 2025 oppg. 5b: begge versjoner er etterregnet og står.
- `k10-to-aksjer-tilstander`: ca. 5 % av frøene gir minimum-varians-vekt over 300 % (riktig regnet, lite pedagogisk).
- `k11-wacc-kvm`: oppgitte markedsverdier gir andeler som avviker opptil 0,02 prosentpoeng fra de oppgitte.
- `k8-nv-etter-skatt-komplett`: toleransen godtar motsatt fortegn når NNV er nær 0 (ca. 3 % av frøene).
- `k5-payback-kapitalrasjonering`: ca. 4 % av frøene har flere like gode kombinasjoner; løsningen nevner én.

Test etter bølgen: `node tools/check.js 300` OK, `tools/e2e.js` 213 bestått.

## Neste bølge (forslag)

Rydde de fire generatorpunktene over, deretter: flere generatorvarianter (kapasitetsutvidelse, hotell-/differansecase, kap. 2 kontantstrøm til egenkapital), utskriftsvennlig prøveeksamen med fasit bakerst, eksport/import av fremdrift mellom enheter.
