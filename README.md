# ØKAD 221 – eksamenstrening i investering og finansiering

Statisk øvingsnettside (ren HTML/CSS/JS, ingen byggesteg) for ØKAD 221 ved NLA.
Åpne `index.html` direkte, eller publiser mappen med GitHub Pages.

## Innhold

| Del | Hva |
|---|---|
| Eksamensanalyse | Varmekart tema × år for de ti settene 2016–2025, hyppighet vektet mot de siste årene, og prognose for 2026 |
| Øvingsoppgaver | 43 generatorer som lager nye tall hver gang, med svarsjekk, hint og løsning steg for steg |
| Repeter | Oppgavene du har bommet på (feil første forsøk, løsning åpnet før svar, feil på prøveeksamen), med den viktigste eksamenstypen øverst. Samme oppgave igjen eller nye tall |
| Prøveeksamen 2026 | Fem oppgaver satt sammen etter prognosen, med tidtaking og automatisk retting. Kan også skrives ut med fasit bakerst og rettes på skjerm etterpå |
| Tidligere eksamener | 10 sett, 40 oppgaver, 143 deloppgaver med ordrett tekst, fasit og løsningsmetode |
| Teori | Kapittel 1–13: begreper, formler, fremgangsmåter, eksempler, typiske feil, Excel-funksjoner |
| Quiz | 190 flervalgsspørsmål. Spørsmål du svarer feil på, kommer igjen i senere runder (høyst fem per runde) til du svarer riktig, og kan også repeteres for seg |
| Formler og kalkulatorer | Søkbar formelsamling, og kalkulatorer for NNV/IR, lån, obligasjon og WACC/saldo |

Fremdrift lagres i nettleserens `localStorage`. Den kan flyttes til en annen enhet fra forsiden (Innstillinger): last ned en fil eller kopier som tekst, og hent den inn på den andre enheten. Ved henting kan man slå sammen (beholder det beste fra begge, idempotent) eller erstatte. Repetisjonslisten for oppgaver og quizspørsmålene som venter på repetisjon, følger med.

## Kilder og forbehold

Bygget på eksamenssettene med løsningsforslag (2016–2025), forelesningslysbildene og
løsningsforslagene til kapitteloppgavene i Bredesen, *Investering og finansiering* (7. utg.).

- Regnemotoren (`js/fin.js`) er kontrollert mot fasit i løsningsforslagene.
- Lysbildenes formler og tabeller var bilder og er rekonstruert fra standardteori; teoristoffet bør leses sammen med læreboka.
- Løsningsforslaget til 2025 oppgave 5b bygger på andre tall enn eksamensteksten. Siden viser begge.
- Eksamen varer 4 timer (oppgitt av emneansvarlig student). Tillatte hjelpemidler sto ikke i eksamensfilene.
- Prognosen for 2026 er et anslag ut fra mønstre, ikke en fasit.

## Utforming

Siden er et arbeidsverktøy, ikke en presentasjon. Reglene den følger:

- Ingen kort, skygger eller gradienter. Struktur lages med linjer og typografi.
- Størrelse følger viktighet: forsiden er en arbeidsliste der oppgavetypene er rangert etter eksamensvekt.
- Grønt betyr «kan trykkes». Gul markeringstusj betyr «dette er svaret».
- Tabeller er satt som en hovedbok: tall i fastbredde, dobbeltstrek under sumrader.
- Hver handling har et svar når noe går galt: tomt eller ugyldig svar, gjenkjente feiltyper (fortegn, desimal i stedet for prosent, størrelsesorden), søk uten treff, ukjente lenker, sperret lagring, ufullstendig prøveeksamen, ugyldige kalkulatorfelt og fremdriftsfiler som er tomme, ødelagte, fra en nyere versjon eller fra et annet program.
- Mobil har egen meny nederst og større trykkflater, ikke bare stablet desktop.

## Utvikling

```bash
node tools/check.js 300
```

Røyk-tester alle generatorer over 300 frø og skriver ut antall eksamener, teorikapitler og quizspørsmål (og kontrollerer at hvert quizspørsmål får en unik id, har fire ulike svaralternativer, et gyldig riktig svar og en forklaring).

```bash
node tools/verify.js 1000
```

Faglig kontroll uten generatorenes egen fasit: regnefunksjonene for de 16 nyeste oppgavetypene mot tall i `kilder/` (eksamen 2022 og 2023, kapittel-LF 2.1, 6.1, 6.5, 6.9, 7.7b, 7.8, 8.1, 8.3, 8.8, 8.9, 8.10, 8.12, 11.13, 12.1, 12.2, 12.3 og 12.5, og forelesningens factoringeksempel 7-10), og uavhengig etterregning fra oppgaveteksten for de samme generatorene.

```bash
python3 -m http.server 8765
```

```bash
node tools/e2e.js /tmp/skjermbilder
```

Nettlesertest (Playwright): alle sider i fire skjermstørrelser, svarsjekk og feiltilstander, prøveeksamen fra start til retting, prøveeksamen på papir (utskrift, fasit på ny side), flytting av fremdrift (eksport, import, sammenslåing, ugyldige filer), repetisjonslisten (fylles, tømmes, prøveeksamen, flytting), quizrepetisjon (fylles, tømmes, høyst fem per runde, flytting, ugyldige data), oppgavetypene fra bølge 7 (fasit, toleranse for målsøking, stjernediagram på mobil, i mørkt tema og på utskrift), bølge 8 (fasit, svar i tusen kroner, fortegn, kapittel 12 i teori og Øv, utenfor prøveeksamenen) og bølge 9 (factoring og nøkkeltall: fasit, svar i dager, typiske forvekslinger, tabeller i 320 px, og at alle oppgaver med dager oppgir antall dager i året), bølge 10 (quizspørsmålene om factoring og nøkkeltall: alle kommer i repetisjonsrunden, gir forklaring ved feil svar og får plass i 320 px), bølge 11 (kontantrabatt, kredittpolitikk, Altmans Z og kapittel 9: det samme, og at hvert feil tallalternativ er forklart og tall ikke brytes over to linjer), bølge 12 (kapittel 1 i quizen: det samme, og hardt mellomrom i tusenskillet på alle sider: teori, eksamener, formler, kalkulatorer og alle generatorer med løsninger), tastaturnavigasjon, kontrast (WCAG AA) i lyst og mørkt tema, trykkflater på mobil og sperret lagring.

Struktur: `js/fin.js` (finansfunksjoner), `js/gen/*.js` (oppgavegeneratorer; `ir.js` har følsomhet på internrenten, leasing og internrente etter skatt, `salg.js` salg av driftsmiddel, `kreditt.js` kapittel 12 og factoring), `js/data/*.js`
(eksamener, teori, quiz, prognose), `js/app.js` (visninger).
