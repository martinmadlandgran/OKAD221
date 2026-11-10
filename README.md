# ØKAD 221 – eksamenstrening i investering og finansiering

Statisk øvingsnettside (ren HTML/CSS/JS, ingen byggesteg) for ØKAD 221 ved NLA.
Åpne `index.html` direkte, eller publiser mappen med GitHub Pages.

## Innhold

| Del | Hva |
|---|---|
| Eksamensanalyse | Varmekart tema × år for de ti settene 2016–2025, hyppighet vektet mot de siste årene, og prognose for 2026 |
| Øvingsoppgaver | 27 generatorer som lager nye tall hver gang, med svarsjekk, hint og løsning steg for steg |
| Prøveeksamen 2026 | Fem oppgaver satt sammen etter prognosen, med tidtaking og automatisk retting |
| Tidligere eksamener | 10 sett, 40 oppgaver, 143 deloppgaver med ordrett tekst, fasit og løsningsmetode |
| Teori | Kapittel 1–13: begreper, formler, fremgangsmåter, eksempler, typiske feil, Excel-funksjoner |
| Quiz | 148 flervalgsspørsmål |
| Formler og kalkulatorer | Søkbar formelsamling, og kalkulatorer for NNV/IR, lån, obligasjon og WACC/saldo |

Fremdrift lagres i nettleserens `localStorage`.

## Kilder og forbehold

Bygget på eksamenssettene med løsningsforslag (2016–2025), forelesningslysbildene og
løsningsforslagene til kapitteloppgavene i Bredesen, *Investering og finansiering* (7. utg.).

- Regnemotoren (`js/fin.js`) er kontrollert mot fasit i løsningsforslagene.
- Lysbildenes formler og tabeller var bilder og er rekonstruert fra standardteori; teoristoffet bør leses sammen med læreboka.
- Løsningsforslaget til 2025 oppgave 5b bygger på andre tall enn eksamensteksten. Siden viser begge.
- Varighet og hjelpemidler sto ikke i eksamensfilene.
- Prognosen for 2026 er et anslag ut fra mønstre, ikke en fasit.

## Utforming

Siden er et arbeidsverktøy, ikke en presentasjon. Reglene den følger:

- Ingen kort, skygger eller gradienter. Struktur lages med linjer og typografi.
- Størrelse følger viktighet: forsiden er en arbeidsliste der oppgavetypene er rangert etter eksamensvekt.
- Grønt betyr «kan trykkes». Gul markeringstusj betyr «dette er svaret».
- Tabeller er satt som en hovedbok: tall i fastbredde, dobbeltstrek under sumrader.
- Hver handling har et svar når noe går galt: tomt eller ugyldig svar, gjenkjente feiltyper (fortegn, desimal i stedet for prosent, størrelsesorden), søk uten treff, ukjente lenker, sperret lagring, ufullstendig prøveeksamen og ugyldige kalkulatorfelt.
- Mobil har egen meny nederst og større trykkflater, ikke bare stablet desktop.

## Utvikling

```bash
node tools/check.js 300
```

Røyk-tester alle generatorer over 300 frø og skriver ut antall eksamener, teorikapitler og quizspørsmål.

```bash
python3 -m http.server 8765
```

```bash
node tools/e2e.js /tmp/skjermbilder
```

Nettlesertest (Playwright): alle sider i fire skjermstørrelser, svarsjekk og feiltilstander, prøveeksamen fra start til retting, tastaturnavigasjon, kontrast (WCAG AA) i lyst og mørkt tema, trykkflater på mobil og sperret lagring.

Struktur: `js/fin.js` (finansfunksjoner), `js/gen/*.js` (oppgavegeneratorer), `js/data/*.js`
(eksamener, teori, quiz, prognose), `js/app.js` (visninger).
