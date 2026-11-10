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
| 4 | Faglig kvalitetssikring | Ikke startet |

## Bølge 4: faglig kvalitetssikring (neste)

Mål: finne og rette faglige feil i innhold som ikke er lest linje for linje.

Kildene ligger i `kilder/` (uttrekk fra Drive, så Drive trenger ikke leses på nytt):
`eksamener_2016_2020.md`, `eksamener_2021_2025.md`, `forelesninger_kap1_6.md`,
`forelesninger_kap7_13.md`, `kapittel_lf.md`. Merkingen [LYSBILDE]/[REKONSTRUERT]/[MANGLER]
i forelesningsfilene sier hva som er lest direkte og hva som er gjenskapt.

Å gjøre:

1. `js/data/teori-a.js` og `js/data/teori-b.js`: kontroller hver formel, hvert eksempel (regn etter) og hver «typisk feil» mot `kilder/` og standard teori. Størst risiko: formler som var bilder på lysbildene, kapittel 12 (ikke forelest), ARR-variantene i kap. 5 og Altman Z i kap. 12.
2. Quiz (148 spørsmål i de samme filene): kontroller at `correct` peker på riktig alternativ, at regnestykker stemmer og at ingen distraktor også er riktig.
3. `js/gen/*.js`: uavhengig etterregning av fasit og løsningstekst for et utvalg frø per generator. Motoren `js/fin.js` er kontrollert mot LF, men generatorenes egen logikk (arbeidskapital, differansekontantstrøm, levetidstabell, tekst som beskriver svaret) er bare stikkprøvd.
4. `js/data/eksamen-a.js` og `eksamen-b.js`: stikkprøv fasit og tabeller mot `kilder/`.
5. Kjente åpne punkter: leverandørkreditt bruker 360 dager (som kapittel-LF; foreleserens konvensjon er ukjent). Installasjonskostnad aktiveres (som eksamen 2024; lærebokoppgave 8.12 kostnadsfører). 2025 oppg. 5b har LF som ikke samsvarer med oppgaveteksten.

Etterpå: kjør `node tools/check.js 300` og nettlesertesten i `tools/e2e.js` (se `README.md`).

Mulige senere bølger: flere generatorvarianter (kapasitetsutvidelse, hotell-/differansecase, kap. 2 kontantstrøm til egenkapital), utskriftsvennlig prøveeksamen med fasit bakerst, eksport/import av fremdrift mellom enheter.
