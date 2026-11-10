# Tidligere eksamener ØKAD 221 Investering og finansiering (Hauge) 2021–2025

Kilde: Google Drive (eksamens-PDF + løsningsforslag i xlsx, lest som tekst). Tabeller er rekonstruert fra flatet tekst.
Merking: **[LF]** = tall/metode hentet direkte fra løsningsforslaget. **[Egen kontroll]** = min egen utregning (ikke fra LF).
LF-ene er regneark uten forklarende tekst; drøftingsdelene («hvilket prosjekt velger du», «begrunn») har derfor som regel ikke noe skrevet svar i LF. Der det er tilfellet står det eksplisitt.

---

# EKSAMEN DESEMBER 2021

## Metadata
- Fil: `InvFinHaugeDes2021.pdf`, LF: `LFInvFinHaugeDes2021.xlsx`
- Termin: desember 2021 (fra filnavn). Den uttrukne PDF-teksten begynner rett på «Oppgave 1» – **forside med emnekode, varighet og tillatte hjelpemidler var ikke med i teksten** (ukjent).
- Antall oppgaver: 4. Vekting: Oppg. 1 = 25 %, Oppg. 2 = 20 %, Oppg. 3 = 20 %, Oppg. 4 = 35 %. Vekt per deloppgave er ikke oppgitt.
- Vedlegg: Formelsamling «Finansiering og investering» (kap. 1 Renteregning, 2 Nåverdi og internrente, 3 Nåverdi og skatt, 4 Avkastningskrav og inflasjon, 5 Forventet verdi/varians/portefølje, 6 KVM/kapitalkostnader/aksjeverdi). Formelsamlingen inneholder både KVM uten skatt (6.1) og med skatt (6.2).
- **KVM-variant i LF: UTEN skattejustering** – re = rf + β(rm − rf) = 2 % + 1,75·(8 % − 2 %) = 12,50 %.

## Oppgave 1 (25 %)

**Oppgavetekst (ordrett):**

En bedrift vurderer om man enten skal gjennomføre prosjekt A eller B. Det foreligger følgende opplysninger om prosjektenes levetid og investeringsbehov:

| Prosjekt | A | B |
|---|---|---|
| Antatt levetid (år) | 6 | 6 |
| Anleggsmidler | 1 250 000 | 1 600 000 |
| Restverdi | 0 | 130 000 |
| Arbeidskapitalbehov | 80 000 | 70 000 |

Kontantstrømmene for hvert prosjekt (vedlikeholdskostnader er ikke inkludert) er budsjettert til:

| År | A | B |
|---|---|---|
| 1 | 375 000 | 530 000 |
| 2 | 550 000 | 570 000 |
| 3 | 600 000 | 600 000 |
| 4 | 580 000 | 620 000 |
| 5 | 540 000 | 600 000 |
| 6 | 400 000 | 450 000 |

Vedlikeholdskostnadene for prosjekt A er beregnet til 72 000 årlig. For prosjekt B er vedlikeholdskostnadene anslått til 50 000 i år 1 og deretter vil de øke med 5000 årlig over levetiden. Avkastningskravet er 10 %.

a) Beregn prosjektenes tilbakebetalingstid (Pay back), nåverdi og internrente. Hvilket prosjekt vil du eventuelt velge?

b) Hvilket avkastningskrav ville gitt identisk nåverdi for prosjektene?

c) Anta nå at kontantstrømmen fra prosjekt A (eksklusiv kostnader til vedlikehold) er en annuitet (like store beløp hvert år). Hvor høyt må det årlige beløpet være for at du skal få samme nåverdi som du fant i a)?

**Løsning [LF]:**

Kontantstrømoppsett (linjer: Anleggsmidler, Drift, Vedlikehold, Arbeidskapital → Kontantstrøm). Arbeidskapital bindes i år 0 og frigjøres i år 6. Restverdi B (130 000) inn i år 6.

| Prosjekt A | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| Anleggsmidler | −1 250 000 | | | | | | |
| Drift | | 375 000 | 550 000 | 600 000 | 580 000 | 540 000 | 400 000 |
| Vedlikehold | | −72 000 | −72 000 | −72 000 | −72 000 | −72 000 | −72 000 |
| Arbeidskapital | −80 000 | | | | | | 80 000 |
| **Kontantstrøm** | −1 330 000 | 303 000 | 478 000 | 528 000 | 508 000 | 468 000 | 408 000 |

| Prosjekt B | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| Anleggsmidler | −1 600 000 | | | | | | 130 000 |
| Drift | | 530 000 | 570 000 | 600 000 | 620 000 | 600 000 | 450 000 |
| Vedlikehold | | −50 000 | −55 000 | −60 000 | −65 000 | −70 000 | −75 000 |
| Arbeidskapital | −70 000 | | | | | | 70 000 |
| **Kontantstrøm** | −1 670 000 | 480 000 | 515 000 | 540 000 | 555 000 | 530 000 | 575 000 |

- **a)** A: NV = **605 057**, internrente = **23,66 %**, payback = **3,04 år** (akkumulert 1 309 000 etter 3 år, mangler 21 000; 21 000/508 000 = 0,041 av år 4).
  B: NV = **630 427**, internrente = **21,71 %**, payback = **3,24 år** (akkumulert 1 535 000 etter 3 år, mangler 135 000; 135 000/555 000 = 0,243 av år 4).
  Valg: LF har ingen tekst. [Egen kommentar] Gjensidig utelukkende prosjekter → velg høyest NV = B, selv om A har høyere internrente og kortere payback (klassisk rangeringskonflikt).
- **b)** Differansekontantstrøm B − A: −340 000, 177 000, 37 000, 12 000, 47 000, 62 000, 167 000. Internrente på differansen (Fisher-skjæringspunkt) = **12,62 %**.
- **c)** Nåverdi av driftskontantstrømmen til A (375 000 … 400 000 diskontert med 10 %) = 2 203 478. Tilsvarende annuitet over 6 år ved 10 %: **505 935 per år** (= 2 203 478 / annuitetsfaktor 4,3553).
- [Egen kontroll] Alle tallene over er etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 1a | Kontantstrøm/NV før skatt, internrente, payback, valg mellom gjensidig utelukkende prosjekter | 2–3 | del av 25 % | Regne (+ kort begrunnelse) |
| 1b | Differanseinvestering / Fisher-rente | 3 | del av 25 % | Regne |
| 1c | Annuitet / ekvivalent årlig beløp | 2 | del av 25 % | Regne |

## Oppgave 2 (20 %)

**Oppgavetekst (ordrett):**

Du vurderer å ta opp et lån på 1 200 000. Etableringsgebyr er 1 000 og termingebyr 100 ved hver betaling. Lånets løpetid er 5 år og nominell årsrente er 3,5 %.

a) Anta at lånet tas opp som et annuitetslån med månedlige betalinger. Finn hva du skal betale i renter og avdrag på lånet hver måned, og splitt månedsbeløpet opp i renter og avdrag for de første 3 månedene.

b) Hva blir lånets effektive årsrente? Angi svaret med 2 desimaler.

c) Hva er restgjelden etter at du har betalt renter og avdrag i 3 år?

d) Anta nå at lånet ble tatt opp som et fastrentelån med årsrente 3,5 %. Etter 3 år, øker årsrenten på tilsvarende lån til 4 %. Anta at du ønsker å innfri lånet. Blir det overkurs eller underkurs, og hvor mye?

e) Anta nå at lånet ble tatt opp som et serielån med årlige betalinger. Nominell årsrente er fremdeles 3,5 %, etableringsgebyr 1 000 og termingebyr 100. Løpetiden er 5 år, men anta at de første 2 årene er avdragsfrie. Hva blir effektiv årsrente på dette lånet? Angi svaret med to desimaler.

**Løsning [LF]:**

- **a)** Månedsrente = 3,5 %/12 = 0,2917 %, 60 terminer. Terminbeløp (renter + avdrag) = **21 830,09**.

| Måned | Rente | Avdrag |
|---|---|---|
| 1 | 3 500,00 | 18 330,09 |
| 2 | 3 446,54 | 18 383,56 |
| 3 | 3 392,92 | 18 437,18 |

- **b)** Netto utbetalt 1 199 000 (lån − etableringsgebyr); månedlig betaling inkl. termingebyr 21 930,09 i 60 mnd. Effektiv månedsrente (internrente) = 0,3100 % → effektiv årsrente = (1,0031)^12 − 1 = **3,78 %**.
- **c)** 24 gjenværende terminer. Restgjeld = NV av 24 × 21 830,09 til 0,2917 % = **505 294**.
- **d)** Ny månedsrente 4 %/12 = 0,333 %. NV av de 24 gjenværende terminbeløpene til ny rente = 502 709. **Underkurs = 2 586** (505 294 − 502 709; avrundingsforskjell i LF).
- **e)** Serielån, årlige terminer, 2 avdragsfrie år, deretter 3 avdrag à 400 000:

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Lån | 1 200 000 | | | | | |
| Renter | | −42 000 | −42 000 | −42 000 | −28 000 | −14 000 |
| Avdrag | | | | −400 000 | −400 000 | −400 000 |
| Gebyrer | −1 000 | −100 | −100 | −100 | −100 | −100 |
| Kontantstrøm | 1 199 000 | −42 100 | −42 100 | −442 100 | −428 100 | −414 100 |

  Effektiv årsrente (internrente) = **3,53 %**.
- [Egen kontroll] a, c, d etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 2a | Annuitetslån, terminbeløp, splitt rente/avdrag | 2 (renteregning) / 9 (lån) | del av 20 % | Regne |
| 2b | Effektiv rente med gebyrer | 9 | del av 20 % | Regne |
| 2c | Restgjeld annuitetslån | 9 | del av 20 % | Regne |
| 2d | Fastrentelån: over-/underkurs ved innfrielse | 9 | del av 20 % | Regne |
| 2e | Serielån med avdragsfrihet, effektiv rente | 9 | del av 20 % | Regne |

## Oppgave 3 (20 %)

**Oppgavetekst (ordrett):**

Du vurderer å plassere noe av din sparing i aksjemarkedet og konkret vurdere du to aksjer; aksje A og B. Avkastningen påvirkes av svingninger i etterspørselen etter bedriftens produkter, og kan illustreres slik:

Aksje A

| Etterspørsel | Sannsynlighet | Avkastning |
|---|---|---|
| Høy | 0,2 | 14 % |
| Normal | 0,5 | 12 % |
| Lav | 0,3 | −4 % |

Aksje B

| Etterspørsel | Sannsynlighet | Avkastning |
|---|---|---|
| Høy | 0,2 | 12 % |
| Normal | 0,5 | 11 % |
| Lav | 0,3 | −1 % |

a) Beregn aksjenes forventede avkastning og standardavvik. Kan man slå fast om den ene eller andre aksjen entydig er å foretrekke? Begrunn svaret ditt.

b) Anta nå at de to selskapene opererer i helt forskjellige bransjer slik at aksjenes avkastning ikke er korrelert (kovarians og korrelasjonskoeffisient er 0). Er det fornuftig å fordele sparebeløpet likt mellom de to aksjene? Vis ditt svar ved relevante beregninger.

c) Anta at du må redusere din risiko og at du velger å plassere 30 % av sparingen din risikofritt og resten i aksje B. Risikofri rente er 2 %. Hva blir forventet avkastning og avkastningens standardavvik for denne porteføljen?

**Løsning [LF]:**

- **a)** A: E(r) = **7,60 %**, varians 0,005824, standardavvik **7,63 %**. B: E(r) = **7,60 %**, varians 0,003184, standardavvik **5,64 %**. Begrunnelse ikke skrevet i LF. [Egen kommentar] Samme forventning, B har lavere risiko → B dominerer A for en risikoavers investor (isolert sett).
- **b)** 50/50 med kovarians 0: E = 7,60 %, varians = 0,25·0,005824 + 0,25·0,003184 = 0,002252, standardavvik **4,75 %** (lavere enn begge enkeltaksjer → diversifisering lønner seg). LF viser også «Optimalt» (minimum-varians): andel A 0,35 / B 0,65, E = 7,60 %, varians 0,002058572, standardavvik **4,54 %**. Altså: 50/50 er fornuftig (bedre enn enkeltaksje), men ikke optimalt; ca. 35/65 gir lavest risiko.
- **c)** 30 % risikofritt (2 %) + 70 % aksje B: E = 0,3·2 % + 0,7·7,6 % = **5,92 %**; standardavvik = 0,7·5,64 % = **3,95 %**.
- [Egen kontroll] Min.-varians-vekt A = σB²/(σA²+σB²) = 0,003184/0,009008 = 0,3535 – stemmer med LF (avrundet 0,35).

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 3a | Forventet avkastning og standardavvik for enkeltaksjer; dominans | 5 (risiko) / 6 (portefølje) | del av 20 % | Regne + begrunne |
| 3b | Portefølje av to aksjer, diversifisering, minimum-varians | 6 | del av 20 % | Regne + drøfte |
| 3c | Kombinasjon risikofri plassering + aksje (kapitalallokering) | 6 | del av 20 % | Regne |

## Oppgave 4 (35 %)

**Oppgavetekst (ordrett):**

AS Innovasjon har utviklet et nytt produkt som man antar vil oppnå stor suksess i markedet. Produktets salgspris er 1 500 pr. enhet, og det er budsjettert med følgende salgsvolum over den antatte levetiden på 5 år:

| | |
|---|---|
| Volum år 1 | 2 200 |
| Volum år 2 | 2 200 |
| Volum år 3 | 2 500 |
| Volum år 4 | 2 500 |
| Volum år 5 | 1 850 |

Man antar at dekningsgraden i år 1 til 3 vil bli 40 %. De siste to årene regner man med at dekningsgraden kan øke til 60 % pga. læringseffekter blant arbeiderne slik at man kan produsere mer effektivt.

Dersom prosjektet settes i gang må man anskaffe anleggsmidler for 5 000 000 og man anslår at anleggsmidlene kan selges for 850 000 ved levetidens slutt. Anleggsmidlene avskrives etter saldometoden med 20 % årlig, og salget av anleggsmidlene skal gjennomføres på den skattemessig gunstigste måte. Skattesatsen er 22 %.

Hvis prosjektet starter, må man ta i bruk et lokale man eier, men som er leid ut, med en leieinntekt på 225 000 i år 1. Det er lagt inn i utleieavtalen at leien skal økes med 2 % årlig i hele perioden.

Dersom prosjektet settes i gang, vil en person som allerede er ansatt, få ansvar for prosjektet. Hennes lønn er nå 550 000 årlig, men pga. økt ansvar vil lønnen hennes øke til 700 000 årlig.

AS Innovasjon antar også at dette nye produktet vil skape mer interesse for selskapets øvrige produkter. Omsetningen av disse produktene er i dag 4 millioner årlig. Dekningsgraden er 30 % og man antar at omsetningen av disse produktene kan øke til 4 400 000 årlig i hele perioden.

Hvis prosjektet starter, vil arbeidskapitalbehovet øke og det er anslått av arbeidskapitalen blir 18 % av omsetningen. Se bort fra mulig endring i arbeidskapital som kan komme av at salget av eksisterende produkter øker.

Risikofri rente er 2 % mens AS Innovasjon kan låne penger til en rente på 4 % før skatt. Avkastning på markedsporteføljen er 8 % og bedriftens aksjebeta er 1,75. AS Innovasjon finansierer alle sine prosjekter med en egenkapitalandel på 40 %.

a) Beregn AS Innovasjon sin veide totalkapitalkostnad, WACC.

b) Beregn prosjektets nåverdi etter skatt. Er prosjektet lønnsomt?

**Løsning [LF]:**

- **a)** re = 2 % + 1,75·(8 % − 2 %) = **12,50 %** (KVM uten skattejustering). WACC = 0,40·12,50 % + 0,60·4 %·(1 − 0,22) = **6,87 %** (6,872 %).
- **b)** Kontantstrøm etter skatt (totalkapitalmetoden, diskontert med WACC):

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Salgsinntekter | | 3 300 000 | 3 300 000 | 3 750 000 | 3 750 000 | 2 775 000 |
| Variable kostnader | | −1 980 000 | −1 980 000 | −2 250 000 | −1 500 000 | −1 110 000 |
| Tapt leie | | −225 000 | −229 500 | −234 090 | −238 772 | −243 547 |
| Økt DB eksisterende produkt | | 120 000 | 120 000 | 120 000 | 120 000 | 120 000 |
| Lønnsøkning | | −150 000 | −150 000 | −150 000 | −150 000 | −150 000 |
| Kontantstrøm fra driften | | 1 065 000 | 1 060 500 | 1 235 910 | 1 981 228 | 1 391 453 |
| Skatt (22 % av drift) | | −234 300 | −233 310 | −271 900 | −435 870 | −306 120 |
| Arbeidskapital | −594 000 | 0 | −81 000 | 0 | 175 500 | 499 500 |
| Anleggsmidler | −5 000 000 | | | | | 850 000 |
| NV spart skatt (saldoavskr.) | 818 696 | | | | | |
| NV økt skatt nedskriving | −99 828 | | | | | |
| **Kontantstrøm prosjekt** | −4 875 132 | 830 700 | 746 190 | 964 010 | 1 720 858 | 2 434 833 |

  **Nåverdi etter skatt = 410 775** → prosjektet er lønnsomt (NV > 0).

  Metodepunkter i LF:
  - Alternativkostnad: tapt leie (vokser 2 %/år) er med. Kun *lønnsøkningen* (150 000) er relevant, ikke hele lønnen. Kannibalisering/synergi: økt DB andre produkter = 400 000 · 30 % = 120 000.
  - Arbeidskapital = 18 % av neste års omsetning, bindes året før (år 0: 594 000; år 2: +81 000; år 4: −175 500 frigjort; år 5: resten 499 500 frigjort).
  - Skatt beregnes som 22 % av driftskontantstrømmen (før avskrivninger); skatteeffekten av avskrivninger tas separat med formelen for evigvarende saldoavskrivning: NV spart skatt = AM·a·s/(r+a) = 5 000 000·0,20·0,22/(0,0687+0,20) = 818 696.
  - Salg «skattemessig gunstigst» = salgssum nedskrives på saldo; tapt skattebesparelse = SV·a·s/(r+a)/(1+r)^5 = 850 000·0,20·0,22/0,2687/1,0687^5 = 99 828 (lagt i år 0-kolonnen som nåverdi).
- [Egen kontroll] NV av prosjektkontantstrømmen ved 6,872 % = 410 775 – stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 4a | WACC/KVM | 7 | del av 35 % | Regne |
| 4b | NV etter skatt med saldoavskrivning, relevante kontantstrømmer (alternativkostnad, arbeidskapital) | 4 (kontantstrøm) / 8 (skatt) | del av 35 % | Regne (+ konklusjon) |

---

# EKSAMEN DESEMBER 2022

## Metadata
- Fil: `InvFinNLADes2022.pdf`, LF: `LFInvFinHaugeDes2022.xlsx`
- Termin: desember 2022 (fra filnavn). **Forside (emnekode, varighet, hjelpemidler) var ikke med i den uttrukne teksten** (ukjent). Ingen formelsamling i teksten.
- Antall oppgaver: 4. Vekting slik det står: Oppg. 1 = 20 %, Oppg. 2 = 20 %, Oppg. 3 = 20 %, og den fjerde oppgaven er (feil)nummerert **«Oppgave 3 (30 %)»** i eksamenssettet (LF kaller den Oppgave 4). NB: vektene summerer til 90 % slik de står trykt (trykkfeil i originalen; trolig er én av dem 30 % eller siste 40 %). Vekt per deloppgave er ikke oppgitt.
- **KVM-variant i LF: UTEN skattejustering** – re = 2,89 % + 1,54·(10 % − 2,89 %) = 13,84 %.

## Oppgave 1 (20 %)

**Oppgavetekst (ordrett):**

Homansbyen Hotell AS er et veldrevet hotell sentralt i Oslo. Hotellet har 50 rom og er åpent 350 dager i året. Romprisen er 1 000, og variable kostnader pr. natt er 150. Beleggsprosenten er praktisk talt 100 %, dvs. det er betalende gjester på et rom så godt som hele tiden.

Betalbare faste kostnader til drift av resepsjon, vedlikehold osv. er 2 000 000 årlig.

Hotellet opplever flere ganger at de må avvise gjester fordi det er fullt. Det har nå dukket opp et interessant forslag. Man har muligheten til å leie et nabobygg for 800 000 årlig. Avtalen kan vare i 5 år. Bygget nå oppgraderes for å kunne fungere som hotell, og denne oppgraderingen er beregnet å koste 11 000 000. Dersom man tar dette bygget i bruk øker romkapasiteten til 65 rom, og de faste kostnadene øker til 2 500 000 årlig. Etter at perioden på 5 år er over, overdras bygget igjen til eier uten betaling. Bedriften bruker et avkastningskrav på 10 %.

a) Beregn prosjektets nåverdi og internrente. Er prosjektet lønnsomt?

b) Hva er prosjektets pay-back eller tilbakebetalingstid? Hva kan du si om denne metoden som verktøy for å analysere prosjektlønnsomhet?

c) Anta at det kan åpnes en mulighet for å forlenge leieavtalen i 2 år etter at 5-års avtalen er over. Hva er dette verdt regnet i dagens verdi?

(Merk: «Bygget nå oppgraderes» står slik i originalen – menes «Bygget må oppgraderes».)

**Løsning [LF]:**

Differansebetraktning (kun endringer er relevante): DB nå = 50 rom · 350 dager · (1 000 − 150) = 14 875 000; DB med 65 rom = 19 337 500; **økt DB = 4 462 500** per år. Økte faste kostnader = 500 000.

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Leie | | −800 000 | −800 000 | −800 000 | −800 000 | −800 000 |
| Økt DB | | 4 462 500 | 4 462 500 | 4 462 500 | 4 462 500 | 4 462 500 |
| Faste kostnader (økning) | | −500 000 | −500 000 | −500 000 | −500 000 | −500 000 |
| Ombygging | −11 000 000 | | | | | |
| **Kontantstrøm** | −11 000 000 | 3 162 500 | 3 162 500 | 3 162 500 | 3 162 500 | 3 162 500 |

- **a)** NV = **988 363** (lønnsomt). **Internrenten er ikke oppgitt i LF.** [Egen utregning] Internrente ≈ **13,46 %** (> 10 % → lønnsomt).
- **b)** Payback = **3,48 år** (11 000 000 / 3 162 500). Drøfting av metoden er ikke skrevet i LF. [Egen kommentar, standard lærebokpoeng] Payback ignorerer tidsverdien av penger og kontantstrømmer etter tilbakebetalingstidspunktet, har vilkårlig kravgrense; brukes som enkelt risiko-/likviditetsmål, ikke som lønnsomhetsmål.
- **c)** Verdi av 2 års forlengelse = NV i dag av 3 162 500 i år 6 og år 7 ved 10 % = **3 408 011**.
- [Egen kontroll] NV, payback og c) etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 1a | Kontantstrøm (differanse)/NV før skatt, internrente | 2–4 | del av 20 % | Regne |
| 1b | Payback + vurdering av metoden | 3 | del av 20 % | Regne + drøfte |
| 1c | NV av forlengelse (utsatt annuitet) | 2–3 | del av 20 % | Regne |

## Oppgave 2 (20 %)

**Oppgavetekst (ordrett):**

Du og din samboer vurderer å kjøpe ny leilighet. Kjøpesum er 3 500 000. Det stilles krav om 15 % egenkapital, slik at lånebehovet blir 2 975 000. Du ser noen opplysninger om lånetilbud fra Nordea under. Lånet skal tilbakebetales som et annuitetslån med månedlige betaler over 20 år. Nominell årsrente er 3,35 %, etableringsgebyr er 3 200 og termingebyr er 65 pr. mnd.

a) Nordea oppgir at lånet koster 17 091 pr. mnd. Vis hvordan dette beløpet er beregnet. Det kan forekomme minimal avrunding.

b) Splitt beløpet på 17 091 opp i renter, avdrag og gebyr for de første 3 mnd.

c) Nordea oppgir videre at lånets effektive årsrente er 3,46 %. Vis hvordan denne størrelsen er beregnet.

d) Hva er restgjelden når det gjenstår 10 år av tilbakebetalingstiden?

e) Anta at du tar opp lånet med de betingelser som er oppgitt, men at du øker den månedlige betalingen til 20 000 eks. termingebyr. Hvor lang tid tar det å nedbetale lånet?

(«Opplysninger om lånetilbud fra Nordea under» viser til et bilde/skjermklipp som ikke er med i teksten; alle nødvendige tall står i oppgaveteksten.)

**Løsning [LF]:**

- **a)** Månedsrente 3,35 %/12 = 0,2792 %, 240 terminer. Renter og avdrag = 17 025,37 + termingebyr 65 = **17 090,37** ≈ 17 091.
- **b)**

| Måned | 1 | 2 | 3 |
|---|---|---|---|
| Rente | 8 305,21 | 8 280,86 | 8 256,45 |
| Avdrag | 8 720,17 | 8 744,51 | 8 768,92 |
| Termingebyr | 65,00 | 65,00 | 65,00 |
| Sum | 17 090,37 | 17 090,37 | 17 090,37 |

- **c)** Netto utbetalt = 2 975 000 − 3 200 = 2 971 800; 240 betalinger à 17 090,37. Effektiv månedsrente (internrente/RENTE-funksjon) = 0,2837 % → effektiv årsrente = 1,002837^12 − 1 = **3,46 %**.
- **d)** 120 gjenværende terminer: restgjeld = NV av 120 × 17 025,37 til 0,2792 % = **1 734 014**.
- **e)** Betaling 20 000 per mnd (eks. gebyr) til 0,2792 %: antall perioder = **192,48 måneder = 16,04 år** (Excel PERIODER eller målsøking).
- [Egen kontroll] Alt etterregnet og stemmer (n = −ln(1 − L·i/PMT)/ln(1+i) = 192,48).

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 2a | Annuitetslån terminbeløp | 2 / 9 | del av 20 % | Regne |
| 2b | Splitt rente/avdrag/gebyr | 9 | del av 20 % | Regne |
| 2c | Effektiv rente med gebyrer | 9 | del av 20 % | Regne |
| 2d | Restgjeld | 9 | del av 20 % | Regne |
| 2e | Nedbetalingstid (antall perioder) | 2 / 9 | del av 20 % | Regne |

## Oppgave 3 (20 %)

**Oppgavetekst (ordrett):**

Avkastning til aksjene A og B vil være avhengig av forventede markedsforhold og kan presenteres som i tabellen under:

| Markedsforhold | Vekst | Normal | Tilbakegang |
|---|---|---|---|
| Sannsynligheter | 0,5 | 0,3 | 0,2 |
| Aksje A avkastning | 16,00 % | 10,00 % | −7,00 % |
| Aksje B avkastning | 14,00 % | 11,00 % | −3,50 % |

a) Beregn forventet avkastning for hver av aksjene.

b) Beregn avkastningens varians og standardavvik for hver av aksjene.

c) Kan du ut fra dine svar på a) og b) si om den ene eller andre aksjen klart er å foretrekke?

d) Beregn kovarians og korrelasjon mellom aksjene.

e) Hva er forventet avkastning og avkastningens standardavvik for en portefølje bestående av like store andeler av A og B?

f) Hvorfor blir diversifikasjonsgevinsten ved å eie begge aksjene samtidig i en portefølje relativt beskjeden i dette tilfellet?

**Løsning [LF]:**

- **a)** E(rA) = **9,60 %**, E(rB) = **9,60 %**.
- **b)** Varians A = 0,007564, standardavvik A = **8,70 %**. Varians B = 0,004459, standardavvik B = **6,68 %**.
- **c)** LF (ordrett): «B dominerer over A siden forventet avkastning er den samme, mens standardavviket er lavere.»
- **d)** Kovarians = **0,005774**; korrelasjon = **0,9942**.
- **e)** 50/50: E = **9,60 %**; porteføljevarians = 0,00589275; standardavvik = **7,68 %**. (Veid snitt av standardavvikene = 7,69 %.)
- **f)** LF (ordrett): «Praktisk talt ingen diversifikasjonseffekt siden korrelasjonen er nær + 1.»
- [Egen kontroll] Alle tall etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 3a | Forventet avkastning | 5–6 | del av 20 % | Regne |
| 3b | Varians/standardavvik | 5–6 | del av 20 % | Regne |
| 3c | Dominans (middelverdi–varians) | 6 | del av 20 % | Drøfte (kort) |
| 3d | Kovarians/korrelasjon | 6 | del av 20 % | Regne |
| 3e | Portefølje forventning/standardavvik | 6 | del av 20 % | Regne |
| 3f | Diversifikasjon og korrelasjon | 6 | del av 20 % | Drøfte (kort) |

## Oppgave 4 (trykt som «Oppgave 3 (30 %)»)

**Oppgavetekst (ordrett):**

Et rederi driver blant annet en ferje som trafikkerer en strekning i Norland Fylke. Rederiet vurderer nå å modifisere motoren slik at den kan drives på gass og ikke tungolje, som til nå. Ved å gå over til gass kan selskapet spare drivstoffkostnader, særlig på grunn av lavere CO2 avgift.

Det er beregnet at besparelsen er 300 pr. fergetur. Ferjen har gjennomsnittlig 15 turer pr. dag gjennom hele året (365 dager).

Når det gjelder andre årlige kostnader, blir ingenting forandret bortsett fra at det vil bli noe høyere lagringskostnader på gass enn på olje. Dette antas å utgjøre 400 000 årlig. Varigheten på investeringen antas å være 5 år. Ombyggingen av motoren til gassdrift og installering av gasstanker vil koste 6 000 000. Investeringene i motorombygging og gasstanker saldoavskrives med 20 % årlig. Skattesatsen er 22 %.

Risikofri rente er 2,89 %, mens rederiet kan låne penger til en rente på 5,45 %. Avkastningen på markedsporteføljen er 10 %. Rederiet er ikke børsnotert, men et sammenlignbart selskap som er børsnotert, har en aksjebeta på 1,54. Rederiet finansierer sine investeringer med en egenkapitalandel på 60 %.

a) Beregn selskapet sin veide totalkapitalkostnad.

b) Beregn nåverdi etter skatt. Er det lønnsomt å bygge om motoren til gass?

**Løsning [LF]:**

- **a)** re = 2,89 % + 1,54·(10 % − 2,89 %) = **13,84 %**. Gjeldsrente etter skatt = 5,45 %·0,78 = 4,25 %. WACC = 0,60·13,84 % + 0,40·4,25 % = **10,00 %** (10,004 %).
- **b)**

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Sparte kostnader (300·15·365) | | 1 642 500 | 1 642 500 | 1 642 500 | 1 642 500 | 1 642 500 |
| Lagringskostnader | | −400 000 | −400 000 | −400 000 | −400 000 | −400 000 |
| Resultat før skatt | | 1 242 500 | 1 242 500 | 1 242 500 | 1 242 500 | 1 242 500 |
| Skatt 22 % | | −273 350 | −273 350 | −273 350 | −273 350 | −273 350 |
| Ombygging mv | −6 000 000 | | | | | |
| NV spart skatt avskrivning | 879 882 | | | | | |
| **Beregningsgrunnlag (kontantstrøm)** | −5 120 118 | 969 150 | 969 150 | 969 150 | 969 150 | 969 150 |

  **Nåverdi etter skatt = −1 446 657** → ikke lønnsomt å bygge om.

  Metode: skatt på driftsoverskudd før avskrivninger; skattebesparelse av saldoavskrivninger som evigvarende nåverdi AM·a·s/(r+a) = 6 000 000·0,20·0,22/(0,10004+0,20) = 879 882. Ingen restverdi (saldo avskrives videre i det uendelige), ingen arbeidskapital.
- [Egen kontroll] Etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 4a | WACC/KVM (beta fra sammenlignbart selskap) | 7 | del av 30 % | Regne |
| 4b | NV etter skatt med saldoavskrivning (kostnadsbesparende investering) | 8 | del av 30 % | Regne (+ konklusjon) |

---

# EKSAMEN DESEMBER 2023

## Metadata
- Fil: `InvFinHaugeDes2023.pdf`, LF: `LFInvFinHaugeDes2023.xlsx`
- Termin: desember 2023 (fra filnavn). **Forside (emnekode, varighet, hjelpemidler) var ikke med i den uttrukne teksten** (ukjent).
- Antall oppgaver: 4. Vekting: Oppg. 1 = 25 %, Oppg. 2 = 20 %, Oppg. 3 = 20 %, Oppg. 4 = 35 %. Vekt per deloppgave ikke oppgitt.
- Vedlegg: Formelsamling (samme struktur som 2021, men oppdatert: bruker «NNV», KVM-formelen med skatt (6.2) er **fjernet**, gjeldskrav 6.3 uten skattejustering, og nye formler for opsjonsprising: Black-Scholes 6.11–6.13 og binomialmodellen 6.14–6.16).
- **KVM-variant i LF: UTEN skattejustering** – re = 3 % + 1,33·(10 % − 3 %) = 12,31 %.

## Oppgave 1 (25 %)

**Oppgavetekst (ordrett):**

En bedrift vurderer å starte et nytt prosjekt. Levetiden er 4 år og under finner du opplysninger om pris, variable og faste kostnader, samt årlig salgsvolum.

| | |
|---|---|
| Salgspris | 3 400 |
| Variabel enhetskostnad | 1 900 |
| Salgsvolum år 1 | 2 400 |
| Salgsvolum år 2 | 2 800 |
| Salgsvolum år 3 | 2 800 |
| Salgsvolum år 4 | 2 400 |
| Årlige faste kostnader | 1 000 000 |

Dersom prosjektet startes, må man investere 8 500 000 i anleggsmidler. Det er anslått at anleggsmidlene kan selges for 1 800 000 ved levetidens slutt. Prosjektet er vil også medføre at arbeidskapitalen øker, og det er anslått at arbeidskapitalen vil utgjøre 20 % av omsetningen.

I slutten av år 3 må det også utføres et stort vedlikehold av anleggsmidlene for å opprettholde stabil produksjon samt sikre restverdien ved levetidens slutt. Dette er kostnadsberegnet til 1 200 000.

Prosjektets avkastningskrav er 10 %.

a) Beregn prosjektets nåverdi (NNV) og internrente. Er prosjektet lønnsomt?

b) Hva må anleggsmidlene minst selges for ved levetidens slutt, for at prosjektet skal være lønnsomt? Se bort fra dette spørsmålet i resten av oppgaven.

c) Anta nå at man i stedet for å gjøre det store vedlikeholdet i slutten av år 3, kan man gjøre mindre årlige vedlikehold i slutten av år 1, 2 og 3. Legg til grunn av de årlige beløpene skal være like store. Hvor høye kan de årlige beløpene være for at nåverdien skal bli den samme som den du fant i a)?

**Løsning [LF]:**

| År | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Omsetning | | 8 160 000 | 9 520 000 | 9 520 000 | 8 160 000 |
| Variable kostnader | | −4 560 000 | −5 320 000 | −5 320 000 | −4 560 000 |
| Årlige faste kostnader | | −1 000 000 | −1 000 000 | −1 000 000 | −1 000 000 |
| Vedlikehold | | | | −1 200 000 | |
| Anleggsmidler | −8 500 000 | | | | 1 800 000 |
| Arbeidskapital | −1 632 000 | −272 000 | 0 | 272 000 | 1 632 000 |
| **Kontantstrøm** | −10 132 000 | 2 328 000 | 3 200 000 | 2 272 000 | 6 032 000 |

Arbeidskapital = 20 % av neste års omsetning, bindes året før (år 0: 20 %·8 160 000 = 1 632 000; år 1: økning 272 000; år 3: frigjøring 272 000; år 4: rest 1 632 000).

- **a)** NV = **455 916** (lønnsomt). Internrente = **11,79 %**.
- **b)** Nåverdien kan falle med 455 916 → salgssum (i år 4) kan falle med 455 916·1,10^4 = 667 507 → **laveste salgsverdi = 1 132 493**. (LF: «Målsøking godtas også».)
- **c)** Nåverdi av vedlikeholdet = 1 200 000/1,10^3 = 901 578. Årlig beløp i 3 år (annuitet, 10 %, 3 år) = **362 538**. (LF: «Evt. bruke sluttverdi» – 1 200 000 som sluttverdi av 3-årig annuitet gir samme svar; «Målsøking godtas også».)
- [Egen kontroll] Alle tall etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 1a | Kontantstrøm/NV før skatt, internrente, arbeidskapital | 3–4 | del av 25 % | Regne |
| 1b | Følsomhetsanalyse/nullpunkt (kritisk restverdi) | 5 | del av 25 % | Regne |
| 1c | Annuitet ekvivalent med engangsbeløp | 2 | del av 25 % | Regne |

## Oppgave 2 (20 %)

**Oppgavetekst (ordrett):**

Etter å ha fullført studiene planlegger du å kjøpe bil. På www.finn.no finner du en BMW 5-serie 2.0D 2016 modell, som tilbys for 309 000. DnB gir et lånetilbud og krever en egenkapitalandel på 35 %. Det påløper gebyrer på 3 551 ved låneopptak, slik at totalt lånebehov blir 204 401 for å finansiere kjøpet. Nominell rente er 6,34 % og lånet gis som et annuitetslån med månedlig betaling over 5 år. Termingebyr er 65.

a) Hvor mye skal du betale i renter og avdrag pr. måned?

b) Splitt månedsbeløpet opp i renter og avdrag for de første 3 månedene.

c) Hva er lånets effektive årsrente?

d) Hva er restgjelden når det gjenstår 2 år av tilbakebetalingstiden?

e) Anta at du etter 3 år ønsker å endre terminbeløpet til 5 000 pr. måned eksklusive termingebyr. Hvor lang tid tar det å innfri restgjelden?

f) Ville effektiv årsrente bli påvirket dersom lånet hadde blitt tatt opp som et serielån med de samme betingelsene? Det er ikke nødvendig å utføre beregninger, men gi en begrunnelse.

g) Anta at din skattesats er 22 %, og at beregnet inflasjon i perioden er 2,5 % årlig. Hva blir lånets realrente etter skatt?

**Løsning [LF]:**

Lån 204 401 (= 309 000·0,65 + 3 551), månedsrente 6,34 %/12 = 0,528 %, 60 terminer.

- **a)** Renter og avdrag per måned = **3 984,04**.
- **b)**

| Måned | 1 | 2 | 3 |
|---|---|---|---|
| Rente | 1 079,92 | 1 064,58 | 1 049,15 |
| Avdrag | 2 904,12 | 2 919,46 | 2 934,89 |
| Sum | 3 984,04 | 3 984,04 | 3 984,04 |

- **c)** Netto utbetalt = 204 401 − 3 551 = 200 850; betaling inkl. termingebyr 4 049,04 i 60 mnd. Effektiv månedsrente 0,65 % (0,646 %) → effektiv årsrente = **8,04 %**.
- **d)** 24 gjenværende terminer: restgjeld = **89 581,38**.
- **e)** Terminbeløp 5 000 på restgjeld 89 581 til 0,528 %/mnd: **18,87 måneder**.
- **f)** LF (ordrett): «Effektiv årsente hadde blitt noe lavere med serielån. Annuitetslån nedbetales saktere slik at gjennomsnittlig gjeld er høyere, og da slår gebyrene mindre ut.»
  **NB – LF er selvmotsigende her.** Begrunnelsen (gebyrene slår *mindre* ut på annuitetslånet fordi gjennomsnittlig gjeld er høyere) tilsier at annuitetslånet har *lavest* effektiv rente, dvs. at serielånet får noe **høyere** effektiv rente – ikke lavere slik første setning sier. [Egen vurdering] Faglig riktig er: serielån nedbetales raskere → lavere gjennomsnittlig gjeld → faste gebyrer utgjør en større andel → effektiv rente blir noe høyere med serielån. Bør presenteres med forbehold om at LF-ordlyden sier «lavere».
- **g)** Realrente etter skatt = (i·(1 − s) − j)/(1 + j) med effektiv rente: (8,04 %·0,78 − 2,5 %)/1,025 = **3,68 %**. LF: «Ikke trekk for de som bruker nominell rente» ([Egen utregning] med nominell 6,34 %: (6,34 %·0,78 − 2,5 %)/1,025 = 2,39 %).
- [Egen kontroll] a–e og g etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 2a | Annuitetslån terminbeløp | 2 / 9 | del av 20 % | Regne |
| 2b | Splitt rente/avdrag | 9 | del av 20 % | Regne |
| 2c | Effektiv rente med gebyrer | 9 | del av 20 % | Regne |
| 2d | Restgjeld | 9 | del av 20 % | Regne |
| 2e | Nedbetalingstid | 2 / 9 | del av 20 % | Regne |
| 2f | Serielån vs. annuitetslån og effektiv rente | 9 | del av 20 % | Drøfte (kort) |
| 2g | Realrente etter skatt (inflasjon) | 2 / 8 (inflasjon og skatt) | del av 20 % | Regne |

## Oppgave 3 (20 %)

**Oppgavetekst (ordrett):**

Anta at du eier to aksjer X og Y med følgende egenskaper:

Aksje X

| Avkastning | Sannsynlighet |
|---|---|
| −10 % | 0,3 |
| 15 % | 0,4 |
| 20 % | 0,3 |

Aksje Y

| Avkastning | Sannsynlighet |
|---|---|
| −15 % | 0,2 |
| 9 % | 0,5 |
| 25 % | 0,3 |

a) Beregn forventet avkastning og avkastningens standardavvik for aksje X og aksje Y alene.

b) Hvis du må velge en av aksjene, hvilken vil du velge? Begrunn svaret ditt.

c) Anta at selskapene opererer i helt ulike næringer slik at kovariansen og korrelasjonen mellom aksjenes avkastning er 0. Beregn forventet avkastning og avkastningens standardavvik for en portefølje bestående av 60 % X og 40 % Y.

d) Hvilken andel av aksje X og Y i en portefølje vil minimere avkastningens standardavvik?

**Løsning [LF]:**

- **a)** X: E = **9,00 %**, varians 0,0159, standardavvik **12,61 %**. Y: E = **9,00 %**, varians 0,0192, standardavvik **13,86 %**.
- **b)** LF (ordrett): «Velger aksje X. Forventet avkastning er lik, men aksje X har lavere risiko».
- **c)** 60/40, kovarians 0: E = **9,00 %**, porteføljevarians = 0,36·0,0159 + 0,16·0,0192 = 0,008796, standardavvik **9,38 %**.
- **d)** Minimum-varians: andel X = **54,70 %**, andel Y = **45,30 %** (= σY²/(σX²+σY²) = 0,0192/0,0351 når kovarians = 0).
- [Egen kontroll] Alle tall etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 3a | Forventet avkastning/standardavvik enkeltaksjer | 5–6 | del av 20 % | Regne |
| 3b | Dominans/valg | 6 | del av 20 % | Drøfte (kort) |
| 3c | Portefølje forventning/standardavvik | 6 | del av 20 % | Regne |
| 3d | Minimum-varians-portefølje | 6 | del av 20 % | Regne |

## Oppgave 4 (35 %)

**Oppgavetekst (ordrett):**

En bedrift produserer og selger blant annet en linse som brukes i fotoenheten i smarttelefoner. Kundene er produsenter av mobiltelefoner verden over. Etterspørselen er svært høy og de siste årene har salget ligget konstant på 100 000 enheter, som er kapasitetsgrensen. Lønnsomheten er meget god, og bedriften kan vise til store overskudd.

Produktet omsettes for 48 pr. enhet, og de variable enhetskostnadene er 25. Man antar at salget neste år kunne økt til 400 000 enheter, dersom man hadde hatt kapasitet til å produsere så mye. Faktisk har markedsavdelingen estimert et mulig salg på 400 000, 500 000, 600 000, 600 000 og 500 000 enheter årlig over de neste 5 år. For å kunne oppnå denne produksjonen, må man investere i produksjonsutstyr for 20 000 000. Utstyret avskrives etter saldometoden med 20 % årlig. Man antar at utrangeringsverdien på produksjonsutstyret er 0. Utstyret må gjennomgå et større vedlikehold i år 4. Dette er kostnadsberegnet til 3 500 000.

Andre betalbare faste kostnader er budsjettert til 2 500 000 årlig. Bedriftens toppledelse krever også at prosjektet må bære en andel av selskapets indirekte faste kostnader. Man anslår at det vil bli 500 000 årlig. Prosjektet vil også medføre økning i arbeidskapitalen. Man anslår at arbeidskapitalen vil utgjøre 20 % av omsetningen.

Skattesatsen er 22 %. Risikofri rente er 3 %, mens bedriften kan låne penger til en rente på 4 % før skatt. Markedsavkastningen er 10 %, og bedriftens aksjebeta er 1,33. Bedriften finansierer sine prosjekter med en gjeldsandel på 36 %.

a) Finn prosjektets veide totalavkastningskrav, WACC.

b) Finn nåverdi etter skatt. Vil du anbefale bedriften å utvide kapasiteten?

c) Anta nå at anleggsmidlene kan ha en salgsverdi på 1 000 000 ved levetidens slutt. Hvordan endres nåverdien etter skatt? Salget skal behandles på den skattemessig gunstigste måten.

**Løsning [LF]:**

- **a)** re = 3 % + 1,33·(10 % − 3 %) = **12,31 %**. WACC = 0,64·12,31 % + 0,36·4 %·(1 − 0,22) = **9,00 %** (9,0016 %).
- **b)** Kun *økningen* i salg utover dagens kapasitet på 100 000 er relevant: 300 000, 400 000, 500 000, 500 000, 400 000 enheter. Fordelte indirekte faste kostnader (500 000) er **ikke** med (ikke relevant kontantstrøm).

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Omsetning (økning · 48) | | 14 400 000 | 19 200 000 | 24 000 000 | 24 000 000 | 19 200 000 |
| Variable kostnader (økning · 25) | | −7 500 000 | −10 000 000 | −12 500 000 | −12 500 000 | −10 000 000 |
| Faste kostnader | | −2 500 000 | −2 500 000 | −2 500 000 | −2 500 000 | −2 500 000 |
| Overhaling | | | | | −3 500 000 | |
| Resultat før skatt | | 4 400 000 | 6 700 000 | 9 000 000 | 5 500 000 | 6 700 000 |
| Skatt 22 % | | −968 000 | −1 474 000 | −1 980 000 | −1 210 000 | −1 474 000 |
| NV spart skatt avskr | 3 034 315 | | | | | |
| Anleggsmidler | −20 000 000 | | | | | 0 |
| Arbeidskapital | −2 880 000 | −960 000 | −960 000 | 0 | 960 000 | 3 840 000 |
| **Beregningsgrunnlag (kontantstrøm)** | −19 845 685 | 2 472 000 | 4 266 000 | 7 020 000 | 5 250 000 | 9 066 000 |

  **NNV etter skatt = 1 044 022** → anbefaler å utvide kapasiteten.
  NV spart skatt = 20 000 000·0,20·0,22/(0,090016 + 0,20) = 3 034 315. Arbeidskapital = 20 % av neste års (økte) omsetning, bundet året før.
- **c)** Salgssum 1 000 000 i år 5: nåverdi av salg = 1 000 000/1,090016^5 = 649 884. Nåverdi av økt skatt (salgssum nedskrives på saldo → tapte avskrivninger) = 1 000 000·0,20·0,22/(0,290016)/1,090016^5 = −98 598. **Nåverdien øker med 551 286** (ny NNV ≈ 1 595 308 [egen sum]).
- [Egen kontroll] WACC, NV spart skatt, NNV og c) etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 4a | WACC/KVM | 7 | del av 35 % | Regne |
| 4b | NV etter skatt med saldoavskrivning; relevante kontantstrømmer (kapasitetsutvidelse, fordelte felleskostnader, arbeidskapital) | 4 / 8 | del av 35 % | Regne (+ anbefaling) |
| 4c | Restverdi/salg av saldoavskrevet driftsmiddel, skattemessig gunstigste behandling | 8 | del av 35 % | Regne |

---

# EKSAMEN 2024

## Metadata
- Fil: `InvFin221Hauge2024.pdf`, LF: `LF221Hauge2024.xlsx`
- År: 2024 (termin ikke oppgitt i filnavn/tekst; emnekode «221» i filnavnet). **Forside (emnenavn, varighet, hjelpemidler) var ikke med i den uttrukne teksten** (ukjent).
- Antall oppgaver: 4. Vekting: Oppg. 1 = 20 %, Oppg. 2 = 15 %, Oppg. 3 = 30 %, Oppg. 4 = 35 %. Vekt per deloppgave ikke oppgitt.
- Vedlegg: Formelsamling (som 2023, men uten opsjonsformlene i den uttrukne teksten; KVM kun uten skatt, formel 6.1).
- **KVM-variant i LF: UTEN skattejustering** – re = 3 % + 1,58·(10 % − 3 %) = 14,06 %.
- Nytt dette året: obligasjonsoppgave (erstatter låneoppgaven) og drøfting av systematisk/usystematisk risiko.

## Oppgave 1 (20 %)

**Oppgavetekst (ordrett):**

En bedrift vurderer om man skal starte et nytt prosjekt. Man har mottatt tilbud på leveranse av anleggsmidler fra to leverandører, som vi kan kalle maskin A og maskin B. Maskin A koster 10 000 000 og maskin B koster 13 000 000. Maskinene avskrives lineært til 0 over prosjektets levetid på 5 år. Maskin B koster mer i innkjøp, men fordelen er at en mer kapitalintensiv produksjon, reduserer de variable kostnadene.

Arbeidskapital er 900 000 uansett hvilken maskin som eventuelt velges, og avkastningskravet er 10 %. Se bort fra skatt i hele oppgaven.

Bedriften har satt opp følgende resultatbudsjett for hvert av de 5 årene prosjektet er tenkt å vare:

| | Maskin A | Maskin B |
|---|---|---|
| Omsetning | 6 000 000 | 6 000 000 |
| Variable kostnader | 2 000 000 | 1 200 000 |
| Betalbare faste kostnader | 1 000 000 | 1 000 000 |
| Avskrivninger | 2 000 000 | 2 600 000 |
| Driftsresultat | 1 000 000 | 1 200 000 |

a) Er prosjektet lønnsomt å gjennomføre, og bør man evt. velge maskin A eller maskin B?

b) Hvilket avkastningskrav ville gitt identisk nåverdi (NNV)?

**Løsning [LF]:**

Poeng: fra resultatbudsjett til kontantstrøm – avskrivninger er ikke kontantstrøm; kontantstrøm drift = driftsresultat + avskrivninger (A: 3 000 000; B: 3 800 000). Arbeidskapital 900 000 ut i år 0, tilbake i år 5.

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Maskin A | −10 000 000 | | | | | |
| Arbeidskapital | −900 000 | | | | | 900 000 |
| Kontantstrøm drift | | 3 000 000 | 3 000 000 | 3 000 000 | 3 000 000 | 3 000 000 |
| **Kontantstrøm A** | −10 900 000 | 3 000 000 | 3 000 000 | 3 000 000 | 3 000 000 | 3 900 000 |

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Maskin B | −13 000 000 | | | | | |
| Arbeidskapital | −900 000 | | | | | 900 000 |
| Kontantstrøm drift | | 3 800 000 | 3 800 000 | 3 800 000 | 3 800 000 | 3 800 000 |
| **Kontantstrøm B** | −13 900 000 | 3 800 000 | 3 800 000 | 3 800 000 | 3 800 000 | 4 700 000 |

- **a)** A: NNV = **1 031 189**, IR = **13,51 %**. B: NNV = **1 063 819**, IR = **12,87 %**. Begge lønnsomme. LF: «Velger maskin B pga. høyest nåverdi.»
- **b)** Differanse B − A: −3 000 000, deretter 800 000 i år 1–5. IR på differansen = **10,42 %** («gir lik NNV»).
- [Egen kontroll] Etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 1a | Fra resultat til kontantstrøm; NV/internrente før skatt; valg mellom gjensidig utelukkende alternativer | 3–4 | del av 20 % | Regne (+ konklusjon) |
| 1b | Differanseinvestering / Fisher-rente | 3 | del av 20 % | Regne |

## Oppgave 2 (15 %)

**Oppgavetekst (ordrett):**

Du eier 3 obligasjoner, A, B og C. Alle har pålydende 100 og er risikofrie. Obligasjon A løper ut om 1 år og er utstedt med kupongrente på 5 %. Obligasjon B og C utløper om henholdsvis 2 år og 3 år og er utstedt med kupongrente på henholdsvis 6 % og 7 %.

1-årig spotrente er 4 %, 2-årig spotrente er 4,50 % og 3-årig spotrente er 4,75 %.

a) Hva er kurs på obligasjonene?

b) Beregn durasjon (varighet) på obligasjon C.

c) Hva er YTM (Yield To Maturity) for obligasjon C?

d) Hva er 1-årig terminrente mellom år 1 og 2 og mellom år 2 og 3?

**Løsning [LF]:**

| År | 0 (kurs) | 1 | 2 | 3 |
|---|---|---|---|---|
| Obligasjon A | 100,96 | 105 | | |
| Obligasjon B | 102,84 | 6 | 106 | |
| Obligasjon C | 106,23 | 7 | 7 | 107 |

- **a)** Hver kontantstrøm diskonteres med spotrenten for sin løpetid: A = 105/1,04 = **100,96**; B = 6/1,04 + 106/1,045² = **102,84**; C = 7/1,04 + 7/1,045² + 107/1,0475³ = **106,23**.
- **b)** NV av C sine kontantstrømmer (diskontert med spotrenter): 6,73 + 6,41 + 93,09 = 106,23. Durasjon = (1·6,73 + 2·6,41 + 3·93,09)/106,23 = **2,81 år**.
- **c)** YTM = internrenten av (−106,23; 7; 7; 107) = **4,72 %**.
- **d)** Terminrente 1→2 = 1,045²/1,04 − 1 = **5,00 %**; terminrente 2→3 = 1,0475³/1,045² − 1 = **5,25 %**.
- [Egen kontroll] Alt etterregnet og stemmer (durasjon 2,813 med spotrentevekter; 2,814 med YTM-vekter – samme avrundede svar).

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 2a | Obligasjonskurs med spotrenter | 9–10 (obligasjoner/rentens terminstruktur) | del av 15 % | Regne |
| 2b | Durasjon | 9–10 | del av 15 % | Regne |
| 2c | YTM (effektiv rente) | 9–10 | del av 15 % | Regne |
| 2d | Terminrenter fra spotrenter | 9–10 | del av 15 % | Regne |

## Oppgave 3 (30 %)

**Oppgavetekst (ordrett):**

En investor eier to aksjer, som vi kan kalle for A og B. Kursen på begge er nå 100. Aksje A har følgende forventede utfall om 1 år:

- 25% sannsynlighet for å være verdt 140
- 50% sannsynlighet for å være verdt 110
- 25% sannsynlighet for å være verdt 80

For aksje B har vi følgende forventede utfall om 1 år:

- 25% sannsynlighet for å være verdt 175
- 50% sannsynlighet for å være verdt 100
- 25% sannsynlighet for å være verdt 65

a) Hva er forventet avkastning for aksje A og aksje B?

b) Hva er standardavviket til aksjenes avkastning?

c) Anta at begge aksjene er korrekt priset i henhold til kapitalverdimodellen. Kan du si om forskjell i standardavviket mellom A og B skyldes usystematisk eller systematisk risiko? Diskuter.

d) Anta nå at selskapene opererer i helt ulike markeder slik at kovarians og korrelasjon er 0. Anta at du eier en likeveid portefølje dvs. andel 50 % i aksje A og 50 % i aksje B. Hva blir porteføljens forventede avkastning og standardavvik?

**Løsning [LF]:**

Først regnes kurs om til avkastning: A: +40 %, +10 %, −20 %; B: +75 %, 0 %, −35 % (sannsynligheter 0,25 / 0,5 / 0,25).

- **a)** E(rA) = **10,00 %**, E(rB) = **10,00 %**.
- **b)** Varians A = 0,045 → standardavvik **21,21 %**. Varians B = 0,16125 → standardavvik **40,16 %**.
- **c)** LF (ordrett): «Siden forventet avkastning for A og B er den samme, er systematisk risiko den samme. Høyere standardavvik for B må derfor skyldes usystematisk risiko.» (Logikk: i KVM bestemmes forventet avkastning kun av beta; lik forventet avkastning ⇒ lik beta ⇒ forskjellen i total risiko er usystematisk/diversifiserbar.)
- **d)** 50/50, kovarians 0: E = **10,00 %**, varians = 0,25·0,045 + 0,25·0,16125 = 0,0515625, standardavvik **22,71 %**.
- [Egen kontroll] Etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 3a | Forventet avkastning (fra kursutfall) | 5–6 | del av 30 % | Regne |
| 3b | Standardavvik | 5–6 | del av 30 % | Regne |
| 3c | Systematisk vs. usystematisk risiko, KVM | 6–7 | del av 30 % | Drøfte |
| 3d | Portefølje forventning/standardavvik | 6 | del av 30 % | Regne |

## Oppgave 4 (35 %)

**Oppgavetekst (ordrett):**

AS Villmark produserer og selger ulike produkter for mennesker som beveger seg mye i skog og mark. Man har nå utviklet en ny kaffekjele som er batteridrevet og ladbar slik at den også kan brukes i perioder det er forbudt å gjøre opp bål i skog og mark.

Hvis prosjektet starter, må man anskaffe nye produksjonsmaskiner, og dette er beregnet å koste 15 000 000. Installasjonskostnadene for maskinene er beregnet til 500 000, og dette beløpet balanseføres (aktiveres) sammen med maskinene. Foreløpig regner man ikke med at anleggsmidlene vil ha noen salgsverdi ved levetidens slutt.

Utstyret avskrives etter saldometoden med 20 % årlig og skattesatsen er 22 %.

AS Villmark vil selge kaffekjelene til distributører for 650 pr. enhet og produksjonskostnadene er 200 pr. enhet. Hvis prosjektet starer vil også arbeidskapitalbehovet øke og man antar at arbeidskapitalen vil utgjøre 25 % av omsetningen.

Det er budsjettert med salg på 8 000 enheter i år 1, 10 000 i år 2, 25 000 i år 3, 25 000 i år 4 og 20 000 ved avslutningen av prosjektet i år 5.

En spesialist fra en annen enhet i selskapet vil midlertidig arbeide med dette prosjektet. Hennes lønn er 650 000 årlig. Det må ansettes to nye personer på midlertidig basis for å ivareta oppgavene som spesialisten hadde. Det er beregnet at samlet lønnskostnad for disse er 1 000 000 årlig. Ved slutten av år 2 vil spesialisten vende tilbake til sin opprinnelige stilling og de midlertidig ansatte vil forlate selskapet.

Kaffekjelene må markedsføres aktivt. Det er budsjettert at markedsføringskostnadene blir 1 500 000 det første året, og deretter 1 000 000 årlig i hele perioden. Hovedkontoret krever at 1 000 000 av selskapets indirekte kostnader må bæres av dette prosjektet årlig, men prosjektet skaper bare 50 % av disse kostnadene.

Risikofri rente er 3 % og AS Villmarkprodukter kan låne penger til en rente på 4,93 % før skatt. Markedsavkastningen er 10 % og selskapets aksjebeta er 1,58. Selskapet er finansiert med 30 % gjeld.

a) Beregn selskapets veide totalavlastningskrav, WACC.

b) Beregn prosjektets nåverdi etter skatt. Bør prosjektet gjennomføres?

c) Anta nå at anleggsmidlene kan ha en salgsverdi ved levetidens slutt på 1 500 000. Salget skal behandles på den skattemessig gunstigste måte. Hvordan endres nåverdien etter skatt?

**Løsning [LF]:**

- **a)** re = 3 % + 1,58·(10 % − 3 %) = **14,06 %**. WACC = 0,70·14,06 % + 0,30·4,93 %·(1 − 0,22) = **11,00 %** (10,9956 %).
- **b)**

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Omsetning | | 5 200 000 | 6 500 000 | 16 250 000 | 16 250 000 | 13 000 000 |
| Produksjonskostnader | | −1 600 000 | −2 000 000 | −5 000 000 | −5 000 000 | −4 000 000 |
| Marketing | | −1 500 000 | −1 000 000 | −1 000 000 | −1 000 000 | −1 000 000 |
| Nye ansatte | | −1 000 000 | −1 000 000 | | | |
| Indirekte kostnader (50 %) | | −500 000 | −500 000 | −500 000 | −500 000 | −500 000 |
| Resultat før skatt | | 600 000 | 2 000 000 | 9 750 000 | 9 750 000 | 7 500 000 |
| Skatt 22 % | | −132 000 | −440 000 | −2 145 000 | −2 145 000 | −1 650 000 |
| Arbeidskapital | −1 300 000 | −325 000 | −2 437 500 | 0 | 812 500 | 3 250 000 |
| Anleggsmidler (inkl. installasjon) | −15 500 000 | | | | | |
| NV spart skatt avskrivning | 2 200 311 | | | | | |
| **Beregningsgrunnlag (kontantstrøm)** | −14 599 689 | 143 000 | −877 500 | 7 605 000 | 8 417 500 | 9 100 000 |

  **Nåverdi etter skatt = 1 325 475** → prosjektet bør gjennomføres.

  Metodepunkter i LF:
  - Installasjon aktiveres: avskrivningsgrunnlag 15 500 000. NV spart skatt = 15 500 000·0,20·0,22/(0,109956 + 0,20) = 2 200 311.
  - Spesialistens lønn (650 000) er **ikke** med (betales uansett); relevant er lønn til de to vikarene (1 000 000 i år 1 og 2).
  - Kun 50 % av de fordelte indirekte kostnadene (500 000) er relevante.
  - Arbeidskapital = 25 % av neste års omsetning, bundet året før (år 0: 1 300 000; år 1: +325 000; år 2: +2 437 500; år 4: −812 500; år 5: −3 250 000).
- **c)** NV salg = 1 500 000/1,109956^5 = 890 353. NV økt skatt ved nedskrivning på saldo = 1 500 000·0,20·0,22/0,309956/1,109956^5 = −126 390. **Nåverdien øker med 763 962** (ny NV ≈ 2 089 437 [egen sum]).
- [Egen kontroll] Etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 4a | WACC/KVM | 7 | del av 35 % | Regne |
| 4b | NV etter skatt med saldoavskrivning; relevante kontantstrømmer (alternativkostnad lønn, fordelte felleskostnader, arbeidskapital, aktivert installasjon) | 4 / 8 | del av 35 % | Regne (+ konklusjon) |
| 4c | Salgsverdi og saldo, skattemessig gunstigste behandling | 8 | del av 35 % | Regne |

---

# EKSAMEN 2025

## Metadata
- Fil: `InvFinHauge2025.pdf`, LF: `LFInvFinDes2025Hauge.xlsx` (LF-filnavnet tilsier desember 2025).
- Topptekst på hver side: «Internt NLA». **Forside (emnekode/-navn, varighet, hjelpemidler) var ikke med i den uttrukne teksten** (ukjent). Ingen formelsamling i den uttrukne teksten.
- Antall oppgaver: **5** (ny struktur). Vekting: Oppg. 1 = 15 %, Oppg. 2 = 10 %, Oppg. 3 = 25 %, Oppg. 4 = 25 %, Oppg. 5 = 25 %. Vekt per deloppgave ikke oppgitt.
- **KVM-variant i LF: UTEN skattejustering** – re = 3 % + 1,3·(10 % − 3 %) = 12,10 %.
- **VIKTIG AVVIK: LF for oppgave 5b stemmer ikke med eksamensteksten** (LF bruker andre forutsetninger – se oppgave 5). Mindre avvik også i oppgave 4 (varians B).

## Oppgave 1 (15 %)

**Oppgavetekst (ordrett):**

En bedrift vurderer å starte et nytt prosjekt, hvor man eventuelt må anskaffe anleggsmidler for 4 000 000. Enkelte data fra kalkylene er gitt under:

| År | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Pris | 1 400 | 1 400 | 1 300 | 1 200 |
| Variabel enh. kostnad | 500 | 450 | 450 | 400 |
| Mengde | 2 500 | 3 000 | 3 000 | 2 500 |
| Faste kostnader | 2 000 000 | 2 000 000 | 2 000 000 | 2 000 000 |

Bedriften avskriver anleggsmidlene lineært til 0 over levetiden. De faste kostnadene i oppstillingen over består av avskrivninger på 1 000 000 og fordelte faste kostnader fra hovedkontoret på 1 000 000.

Det vil påløpe andre faste kostnader som ikke er med i oppstillingen over på 800 000 årlig. Prosjektet vil også medføre økt arbeidskapital og man antar at arbeidskapitalen vil utgjøre 15 % av omsetningen. Avkastningskravet er 10 %.

a) Beregn prosjektets nåverdi og internrente. Er prosjektet lønnsomt?

b) Anta at det er mulig å kjøpe en mer avansert maskin som kan gi en mer effektiv produksjon og redusere de variable enhetskostnadene med 50 hvert år. Hvor mye kan man betale for denne maskinen, for at det skal være aktuelt å anskaffe denne?

**Løsning [LF]:**

Faste kostnader på 2 000 000 i tabellen er **ikke** med (avskrivninger er ikke kontantstrøm; fordelte hovedkontorkostnader er ikke relevante). Kun «andre faste kostnader» 800 000 er med. Arbeidskapital = 15 % av neste års omsetning, bundet året før.

| År | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Omsetning | | 3 500 000 | 4 200 000 | 3 900 000 | 3 000 000 |
| Variable kostnader | | −1 250 000 | −1 350 000 | −1 350 000 | −1 000 000 |
| Faste kostnader | | −800 000 | −800 000 | −800 000 | −800 000 |
| Arbeidskapital | −525 000 | −105 000 | 45 000 | 135 000 | 450 000 |
| Anleggsmidler | −4 000 000 | | | | |
| **Kontantstrøm** | −4 525 000 | 1 345 000 | 2 095 000 | 1 885 000 | 1 650 000 |

- **a)** Nåverdi = **972 333**, internrente = **19,29 %** → lønnsomt.
- **b)** Nåverdi med 50 kr lavere variabel enhetskostnad = 1 408 010; nåverdien øker med **435 677** → kan maksimalt betale **4 435 677** for den avanserte maskinen (435 677 mer enn 4 000 000). (Besparelse = 50 · mengde: 125 000, 150 000, 150 000, 125 000 diskontert med 10 %.)
- [Egen kontroll] Etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 1a | Kontantstrøm/NV før skatt, internrente; relevante kostnader (avskrivning, fordelte felleskostnader), arbeidskapital | 3–4 | del av 15 % | Regne |
| 1b | Maksimal investering / verdi av kostnadsbesparelse (nullpunkt) | 3 / 5 | del av 15 % | Regne |

## Oppgave 2 (10 %)

**Oppgavetekst (ordrett):**

Du arbeider som analytiker i et investeringsselskap og skal vurdere om du bør investere i en obligasjon. NordEnergi ASA utsteder en trygg, kortsiktig grønn obligasjon for å finansiere investeringer i fornybar energi. Merk at avkastningskravet er lik spotrenten.

Obligasjonsdata:

| Obligasjon | Utsteder | Pålydende | Kupongrente | Løpetid (år) | Avkastningskrav (markedsrente) |
|---|---|---|---|---|---|
| A | NordEnergi ASA | 1 000 | 3 % | 3 | 10 % |

a) Beregn kursen på obligasjonen gitt en markedsrente på 10 %.

b) Beregn avkastning til forfall (YTM) for obligasjonen. Anta at obligasjonen omsettes i dag for kr 850.

c) Beregn ny kurs for obligasjonen dersom avkastningskravet faller til 4 %. Kommenter hvordan kursene påvirkes og hvorfor.

d) Beregn durasjonen (Macaulay-durasjon) for obligasjonen ved dagens avkastningskrav på 10 %.

**Løsning [LF]:**

Kontantstrøm: 30, 30, 1 030 (kupong 3 % av 1 000).

- **a)** Kurs = 30/1,1 + 30/1,1² + 1 030/1,1³ = **825,92**.
- **b)** Internrente av (−850; 30; 30; 1 030) → YTM = **8,92 %**.
- **c)** Kurs ved 4 % = **972,25**. Kommentar er ikke skrevet i LF. [Egen kommentar] Kursen stiger når markedsrenten faller (invers sammenheng): faste kontantstrømmer diskonteres med lavere rente. Kurs under pålydende begge steder fordi kupong (3 %) < avkastningskrav.
- **d)** Macaulay-durasjon ved 10 % (kurs 825,92): **2,90 år** = (1·30/1,1 + 2·30/1,1² + 3·1 030/1,1³)/825,92.
- [Egen kontroll] Etterregnet og stemmer (2,904).

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 2a | Obligasjonskurs | 9–10 | del av 10 % | Regne |
| 2b | YTM | 9–10 | del av 10 % | Regne |
| 2c | Kurs ved renteendring + renterisiko | 9–10 | del av 10 % | Regne + kommentar |
| 2d | Macaulay-durasjon | 9–10 | del av 10 % | Regne |

## Oppgave 3 (25 %)

**Oppgavetekst (ordrett):**

a) Hos elektrokjeden Power vurderer du å kjøpe en MacBook Air. Kontantprisen er 15 490. Power tilbyr en rentefri kredittavtale over 6 mnd. Du betaler kun administrasjonsgebyr på 49 månedlig i 6 mnd. med første betaling om 1 måned, og sammen med den første betalingen om 1 måned må du betale et etableringsgebyr på 299. Etter 6 mnd. betaler du maskinen. Hvilken effektiv årsrente innebærer denne avtalen? Angi svaret med 2 desimaler.

b) Som et alternativ til avtalen i a) kan du få en avbetaling over 24 mnd. Du må i då fall betale 767,21 hver måned inklusiv gebyret på 49, og første gang om 1 mnd. Hvilken nominell årsrente legger Power til grunn? Angi svaret med 2 desimaler.

c) Gå ut fra avbetalingen over 24 mnd. fra b). Det påløper nå et etableringsgebyr på 499 som betales sammen med betalingen på 767,21 etter 1 mnd. Hvilken effektiv årsrente innebærer denne avtalen? Angi svaret med 2 desimaler.

d) En bedrift skifter regelmessig ut en maskin, og nå vurderes 3 maskiner A, B og C. Maskinenes anskaffelseskostnad, levetid og årlige vedlikeholdskostnader er vist i tabellen under:

| Maskin | Kostpris | Årlig vedlikehold | Levetid (år) |
|---|---|---|---|
| A | 500 000 | 80 000 | 5 |
| B | 700 000 | 50 000 | 7 |
| C | 900 000 | 40 000 | 10 |

Hvilken maskin bør man anskaffe? Avkastningskrav er 10 %.

**Løsning [LF]:**

- **a)** Kontantstrøm per måned: t0 = +15 490; t1 = −348 (49 + 299); t2–t5 = −49; t6 = −15 539 (15 490 + 49). Effektiv månedsrente (internrente) = 0,64 % → effektiv årsrente = **8,00 %**.
- **b)** Terminbeløp eks. gebyr = 767,21 − 49 = 718,21 i 24 mnd på 15 490. Månedsrente = 0,87 % (0,8732 %) → nominell årsrente = 12 · månedsrente = **10,48 %**. (LF kaller raden «Eff og nominell mnd rente».)
- **c)** Kontantstrøm: t0 = +15 490; t1 = −1 266,21 (767,21 + 499); t2–t24 = −767,21. Effektiv månedsrente = 1,71 % → effektiv årsrente = **22,56 %**.
- **d)** Årskostnad (ekvivalent annuitet) pga. ulik levetid og gjentatt utskifting:

| | A | B | C |
|---|---|---|---|
| År 0 | −500 000 | −700 000 | −900 000 |
| Årlig år 1–n | −80 000 (5 år) | −50 000 (7 år) | −40 000 (10 år) |
| NV av kostnader (10 %) | −803 263 | −943 421 | −1 145 783 |
| **Årlig kostnad (annuitet)** | −211 899 | −193 784 | −186 471 |

  Konklusjon er ikke skrevet ut i LF, men tallene gir: **velg maskin C** (lavest årskostnad 186 471).
- [Egen kontroll] Alle tall etterregnet og stemmer.

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 3a | Effektiv rente på «rentefri» kreditt med gebyrer | 2 / 9 | del av 25 % | Regne |
| 3b | Nominell rente ut fra terminbeløp (annuitet) | 2 / 9 | del av 25 % | Regne |
| 3c | Effektiv rente avbetaling med gebyrer | 2 / 9 | del av 25 % | Regne |
| 3d | Årskostnad / ulik levetid (utskiftingskjede) | 3 (evt. kap. om spesielle investeringsproblemer) | del av 25 % | Regne |

## Oppgave 4 (25 %)

**Oppgavetekst (ordrett):**

En investor analyserer 2 aksjer som vi kan kalle aksje A og B. I tabellen under ser du kursen for hver aksje i starten og slutten av hver periode, og de tilhørende sannsynlighetene for hvert utfall. Fire eksempel er sannsynligheten for at kursen på aksje A i periode 1 går fra 100 til 120 lik 0,20.

Sannsynlighetene gjelder også de betingede sannsynlighetene, for eksempel at kursen på aksje A skal gå fra 100 til 120 og kursen for aksje B gå fra 50 til 60 samtidig i periode 1, er 0,20.

| Periode | Startkurs aksje A | Sluttkurs aksje A | Startkurs aksje B | Sluttkurs aksje B | Sann. het |
|---|---|---|---|---|---|
| 1 | 100 | 120 | 50 | 60 | 0,20 |
| 2 | 120 | 95 | 60 | 60 | 0,30 |
| 3 | 95 | 120 | 60 | 70 | 0,15 |
| 4 | 120 | 140 | 70 | 75 | 0,35 |

a) Beregn aksjenes forventede avkastning og avkastningens standardavvik.

b) Anta at det bare er aktuelt å eie en av aksjene alene. Kan du si om den ene eller andre aksjen entydig er å foretrekke?

c) Anta at du eier begge aksjene samtidig i en portefølje hvor andelen til hver aksje er 0,5. Hva blir porteføljens forventede avkastning og standardavvik?

d) Hvorfor oppnår man i dette tilfellet en relativt beskjeden diversifikasjonsgevinst ved å eie begge aksjene samtidig?

(«Fire eksempel» står slik i originalen – menes «For eksempel».)

**Løsning [LF]:**

Avkastning per periode = sluttkurs/startkurs − 1: A: 0,20; −0,21 (−0,2083); 0,26 (0,2632); 0,17 (0,1667). B: 0,20; 0,00; 0,17 (0,1667); 0,07 (0,0714).

- **a)** E(rA) = **7,5 %**, varians 0,03546, standardavvik **18,83 %**. E(rB) = **9,0 %**, varians 0,00579, standardavvik **7,61 %**.
- **b)** LF (ordrett): «B klart å foretrekke. Høyere avkastning og lavere standardavvik».
- **c)** Kovarians 0,01 (vist avrundet), korrelasjon **0,84**. 50/50: forventet avkastning **8,27 %**, varians 0,016296209, standardavvik **12,77 %**.
- **d)** LF (ordrett): «Lav gevinst pga. høy positiv korrelasjon».
- [Egen kontroll] A stemmer eksakt (E = 7,53 %, var 0,035460, σ 18,83 %). For B får jeg med eksakte brøker E = 9,00 %, **varians 0,005852, σ = 7,65 %**, kovarians 0,011968, korrelasjon 0,831, porteføljevarians 0,016312, σp = 12,77 %. Altså små avvik fra LF (σB 7,61 % vs. 7,65 %; korrelasjon 0,84 vs. 0,83) som jeg ikke har klart å reprodusere – sannsynligvis avrunding/detalj i LF-regnearket. Konklusjonene er upåvirket. Nettsiden bør godta begge (toleranse).

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 4a | Forventet avkastning/standardavvik (fra kurser) | 5–6 | del av 25 % | Regne |
| 4b | Dominans | 6 | del av 25 % | Drøfte (kort) |
| 4c | Kovarians/korrelasjon, portefølje forventning/standardavvik | 6 | del av 25 % | Regne |
| 4d | Diversifikasjon og korrelasjon | 6 | del av 25 % | Drøfte (kort) |

## Oppgave 5 (25 %)

**Oppgavetekst (ordrett):**

AS ABC har utviklet et nytt produkt, som man nå vurderer om man skal lansere. Produktet er en videreutvikling av et produkt i et marked hvor man allerede er aktiv. Utviklingskostnadene har beløpt seg til 1 500 000.

Prosjektet vil eventuelt kreve en investering i anleggsmidler på 10 000 000 og levetiden er beregnet til 5 år. Anleggsmidlene avskrives etter saldometoden med 20 % årlig og det er ingen restverdi ved levetidens slutt. Dersom prosjektet starter, regner man med at arbeidskapitalen vil øke med 1 000 000 ved oppstart og videre øke til 1 100 000 i slutten av år 1, for deretter å holde seg konstant inntil den frigjøres ved levetidens slutt.

Salgsvolumet i år 1 er budsjettert til 110 000 enheter, og man forventer at salgsvolumet vil øke med 5 % årlig. Salgsprisen er budsjettert til 60, og man forventer at salgsprisen kan øke med 2 % årlig. De variable enhetskostnadene er budsjettert til 25, og på grunn av gunstige innkjøpsbetingelser regner man ikke med noen økning i enhetskostnadene over tid. Betalbare faste kostnader er budsjettert til 1 020 000 årlig og vil øke med 2 % årlig.

Siden dette er et produkt innen et marked hvor man allerede er aktiv, vil salget av det nye produktet kunne gå ut over salget av et eksisterende produkt. Dette produktet er kalkulert slik:

| År | 1 | 2 |
|---|---|---|
| Pris | 45 | 45 |
| Var enh k | 20 | 20 |
| Fast enh k | 10 | 10 |
| Resultat | 15 | 15 |

Man regner med at salget av det eksisterende produktet vil falle med 25 000 enheter i år 1 og 20 000 enheter i år 2. Etter år 2, ville dette produktet uansett bli trukket fra markedet.

Bedriftens skattesats er 22 %.

AS ABC finansierer sine prosjekter med 50 % egenkapital og 50 % gjeld. Bedriften kan låne penger til en rente på 5 % før skatt. Risikofri rente er 3 % og markedsavkastningen er 10 %. AS ABC er ikke børsnotert, men et sammenlignbart selskap har en aksjebeta på 1,3.

a) Beregn ABC AS sitt veide totalavkastningskrav (WACC).

b) Beregn nåverdi etter skatt. Er prosjektet lønnsomt?

**Løsning [LF]:**

- **a)** re = 3 % + 1,3·(10 % − 3 %) = **12,10 %**. WACC = 0,50·12,10 % + 0,50·5 %·(1 − 0,22) = **8,00 %**. (Stemmer med oppgaveteksten.)

- **b) ADVARSEL – LF-regnearket bygger på ANDRE forutsetninger enn den eksamensteksten jeg har lest**, og LF-tallet kan derfor ikke brukes som fasit på oppgaven slik den står. LF bruker: volum år 1 = **100 000** (teksten: 110 000), variabel enhetskostnad som **øker 3 % årlig** (teksten: ingen økning), arbeidskapital = **15 % av omsetningen** (teksten: 1 000 000 ved oppstart, 1 100 000 fra slutten av år 1), og **ingen kannibalisering** av eksisterende produkt (teksten: 25 000 / 20 000 tapte enheter i år 1 og 2). LF ser altså ut til å tilhøre en annen/tidligere variant av oppgaven. LF slik det står:

| [LF, avvikende forutsetninger] År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Volum | | 100 000 | 105 000 | 110 250 | 115 763 | 121 551 |
| Pris (+2 %) | | 60 | 61,20 | 62,42 | 63,67 | 64,95 |
| Variabel enhetskostnad (+3 %) | | 25 | 25,75 | 26,52 | 27,32 | 28,14 |
| Omsetning | | 6 000 000 | 6 426 000 | 6 882 246 | 7 370 885 | 7 894 218 |
| Variable kostnader | | −2 500 000 | −2 703 750 | −2 924 106 | −3 162 420 | −3 420 157 |
| Faste kostnader (+2 %) | | −1 020 000 | −1 040 400 | −1 061 208 | −1 082 432 | −1 104 081 |
| Resultat før skatt | | 2 480 000 | 2 681 850 | 2 896 932 | 3 126 033 | 3 369 980 |
| Skatt 22 % | | −545 600 | −590 007 | −637 325 | −687 727 | −741 396 |
| Arbeidskapital (15 % av neste års oms.) | −900 000 | −63 900 | −68 437 | −73 296 | −78 500 | 1 184 133 |
| Anleggsmidler | −10 000 000 | | | | | |
| NV spart skatt avskrivning | 1 571 429 | | | | | |
| Beregningsgrunnlag | −9 328 571 | 1 870 500 | 2 023 406 | 2 186 311 | 2 359 806 | 3 812 717 |

  LF: «Nåverdi etter skatt = **203 081**» (gjelder LF-variantens forutsetninger; [egen kontroll] regnestykket er internt konsistent ved 8 %).

- **b) [EGEN UTREGNING etter eksamensteksten, med samme metode som LF bruker i alle år – IKKE fra LF]:**
  - Utviklingskostnader 1 500 000 = sunk cost, ikke med.
  - Kannibalisering: tapt dekningsbidrag på eksisterende produkt = (45 − 20) = 25 per enhet (fast enhetskostnad 10 er ikke relevant): år 1: 25 000·25 = 625 000; år 2: 20 000·25 = 500 000.
  - Arbeidskapital: −1 000 000 i år 0, −100 000 i år 1, +1 100 000 i år 5.
  - NV spart skatt av saldoavskrivning = 10 000 000·0,20·0,22/(0,08 + 0,20) = 1 571 429.

| [Egen utregning] År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Volum (+5 %) | | 110 000 | 115 500 | 121 275 | 127 339 | 133 706 |
| Pris (+2 %) | | 60,00 | 61,20 | 62,42 | 63,67 | 64,95 |
| Omsetning | | 6 600 000 | 7 068 600 | 7 570 471 | 8 107 974 | 8 683 640 |
| Variable kostnader (25/enhet) | | −2 750 000 | −2 887 500 | −3 031 875 | −3 183 469 | −3 342 642 |
| Faste kostnader (+2 %) | | −1 020 000 | −1 040 400 | −1 061 208 | −1 082 432 | −1 104 081 |
| Tapt DB eksisterende produkt | | −625 000 | −500 000 | | | |
| Resultat før skatt | | 2 205 000 | 2 640 700 | 3 477 388 | 3 842 073 | 4 236 917 |
| Skatt 22 % | | −485 100 | −580 954 | −765 025 | −845 256 | −932 122 |
| Arbeidskapital | −1 000 000 | −100 000 | | | | 1 100 000 |
| Anleggsmidler | −10 000 000 | | | | | |
| NV spart skatt avskrivning | 1 571 429 | | | | | |
| Kontantstrøm | −9 428 571 | 1 619 900 | 2 059 746 | 2 712 362 | 2 996 817 | 4 404 795 |

  [Egen utregning] **Nåverdi etter skatt ved 8 % ≈ 1 190 977** → lønnsomt. (Ikke verifisert mot noe offisielt LF; bør merkes som «beregnet, ikke offisiell fasit» på nettsiden.)

**Klassifisering:**

| Deloppg. | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 5a | WACC/KVM (beta fra sammenlignbart selskap) | 7 | del av 25 % | Regne |
| 5b | NV etter skatt med saldoavskrivning; vekst i pris/volum, sunk cost, kannibalisering, arbeidskapital | 4 / 8 | del av 25 % | Regne (+ konklusjon) |

---

# OPPSUMMERINGSTABELL

Kapittelhenvisninger er mitt beste skjønn ut fra typisk inndeling i Bredesen (ikke kontrollert mot 7. utg. innholdsfortegnelse): 2 = rentesregning, 3 = lønnsomhetsmetoder (NV/IR/payback), 4 = kontantstrøm/prosjektanalyse, 5 = risiko/følsomhet, 6 = porteføljeteori, 7 = KVM/kapitalkostnad (WACC), 8 = skatt (og inflasjon), 9–10 = lån/finansiering og obligasjoner. **Hovedagenten bør verifisere kapittelnumrene mot bokas innholdsfortegnelse.**

| Eksamen | Oppg. | Tema | Kap. | Vekt % | Type |
|---|---|---|---|---|---|
| Des 2021 | 1 | To prosjekter: kontantstrøm før skatt, NV, IR, payback, Fisher-rente (differanse), ekvivalent annuitet | 2–3 | 25 | Regne |
| Des 2021 | 2 | Annuitetslån (mnd): terminbeløp, rente/avdrag, effektiv rente, restgjeld, over-/underkurs fastrentelån, serielån m/avdragsfrihet | 9 (2) | 20 | Regne |
| Des 2021 | 3 | To aksjer: E(r), σ, dominans, portefølje 50/50 (ρ = 0), min.-varians, kombinasjon m/risikofri | 5–6 | 20 | Regne + kort drøfting |
| Des 2021 | 4 | WACC/KVM + NV etter skatt m/saldoavskrivning, alternativkostnader, arbeidskapital, salg av driftsmiddel | 7, 4, 8 | 35 | Regne |
| Des 2022 | 1 | Hotellutvidelse: differansekontantstrøm, NV, IR, payback (+ kritikk av metoden), verdi av forlengelse | 2–4 | 20 | Regne + drøfting |
| Des 2022 | 2 | Annuitetslån bolig: terminbeløp, rente/avdrag/gebyr, effektiv rente, restgjeld, nedbetalingstid | 9 (2) | 20 | Regne |
| Des 2022 | 3 | To aksjer: E(r), varians/σ, dominans, kovarians/korrelasjon, portefølje 50/50, diversifikasjon | 5–6 | 20 | Regne + kort drøfting |
| Des 2022 | 4 (trykt «3») | WACC/KVM + NV etter skatt m/saldoavskrivning (kostnadsbesparende investering, ferje) | 7, 8 | 30 (sum trykt = 90) | Regne |
| Des 2023 | 1 | Prosjekt: kontantstrøm før skatt m/arbeidskapital, NV, IR, kritisk restverdi, ekvivalent annuitet | 2–5 | 25 | Regne |
| Des 2023 | 2 | Annuitetslån bil: terminbeløp, rente/avdrag, effektiv rente, restgjeld, nedbetalingstid, serielån vs. annuitet (teori), realrente etter skatt | 9 (2, 8) | 20 | Regne + kort drøfting |
| Des 2023 | 3 | To aksjer: E(r), σ, valg, portefølje 60/40 (ρ = 0), min.-varians-andeler | 5–6 | 20 | Regne + kort drøfting |
| Des 2023 | 4 | WACC/KVM + NV etter skatt m/saldoavskrivning (kapasitetsutvidelse), salgsverdi skattemessig | 7, 4, 8 | 35 | Regne |
| 2024 | 1 | Maskin A vs. B: resultat → kontantstrøm, NV, IR, Fisher-rente | 3–4 | 20 | Regne |
| 2024 | 2 | Obligasjoner: kurs m/spotrenter, durasjon, YTM, terminrenter | 9–10 | 15 | Regne |
| 2024 | 3 | To aksjer (kursutfall): E(r), σ, systematisk vs. usystematisk risiko (KVM), portefølje 50/50 | 5–7 | 30 | Regne + drøfting |
| 2024 | 4 | WACC/KVM + NV etter skatt m/saldoavskrivning, relevante kostnader, salgsverdi skattemessig | 7, 4, 8 | 35 | Regne |
| 2025 | 1 | Prosjekt: relevante kontantstrømmer, NV, IR, maks pris for bedre maskin | 3–5 | 15 | Regne |
| 2025 | 2 | Obligasjon: kurs, YTM, kurs ved renteendring, Macaulay-durasjon | 9–10 | 10 | Regne + kort kommentar |
| 2025 | 3 | Effektiv/nominell rente på forbrukerkreditt (a–c) + årskostnad ved ulik levetid (d) | 2, 9, 3 | 25 | Regne |
| 2025 | 4 | To aksjer (kurser → avkastning): E(r), σ, dominans, kovarians/korrelasjon, portefølje 50/50, diversifikasjon | 5–6 | 25 | Regne + kort drøfting |
| 2025 | 5 | WACC/KVM + NV etter skatt m/saldoavskrivning, vekst, sunk cost, kannibalisering (LF avviker fra teksten) | 7, 4, 8 | 25 | Regne |

## Gjennomgående observasjoner (for nettsidebygging)

1. **Fast mal 2021–2023:** (1) prosjektanalyse før skatt 20–25 %, (2) annuitetslån 20 %, (3) to-aksje-portefølje 20 %, (4) WACC + NV etter skatt 30–35 %. I 2024 ble låneoppgaven byttet ut med obligasjoner; i 2025 kom både obligasjon (10 %) og en rente-/årskostnadsoppgave (25 %), og settet har 5 oppgaver.
2. **Alle fem LF bruker KVM uten skattejustering:** re = rf + β(rm − rf). WACC = re·E/(E+G) + rg·(1 − s)·G/(E+G). Formelsamlingen 2021 hadde fortsatt med-skatt-varianten (6.2), men LF brukte den ikke; fra 2023 er den fjernet.
3. **Fast LF-metode for NV etter skatt:** kontantstrøm fra drift før avskrivninger × (1 − 22 %), pluss nåverdi av spart skatt på evigvarende saldoavskrivning AM·a·s/(r + a) lagt i år 0; ved salgsverdi: + SV/(1+r)^n − SV·a·s/(r+a)/(1+r)^n («skattemessig gunstigste måte» = nedskriving på saldo). Diskonteres med WACC. Saldosats alltid 20 %, skatt alltid 22 %.
4. **Arbeidskapital** er som regel x % av *neste års* omsetning, bundet ett år i forkant, frigjort til slutt.
5. **Gjengangere blant «feller» i relevante kontantstrømmer:** fordelte felleskostnader (ikke relevante, evt. 50 %), avskrivninger i resultatbudsjett, sunk cost (utvikling), alternativkostnad (tapt leie, kun lønnsøkning/vikarlønn), kannibalisering/synergi (dekningsbidrag, ikke omsetning), kun merproduksjon ved kapasitetsutvidelse.
6. **Porteføljeoppgaven:** to aksjer med 3–4 tilstander; ofte lik forventet avkastning slik at dominans avgjøres av σ; deretter 50/50-portefølje med ρ = 0 eller beregnet kovarians, og et kort «hvorfor»-spørsmål om diversifikasjon/korrelasjon (2024: systematisk vs. usystematisk risiko).
7. **Låneoppgaven:** annuitetslån med månedlige terminer, etablerings- og termingebyr → terminbeløp, rente/avdrag de 3 første månedene, effektiv årsrente (internrente på netto utbetalt), restgjeld, og en vri (nedbetalingstid, overkurs/underkurs, serielån, realrente etter skatt).
8. **Ikke observert i noen av settene:** opsjoner, leasing, aksjeverdsettelse/Gordon, rene teorioppgaver (opsjonsformler står i formelsamlingen 2023, men er ikke brukt). Drøfting forekommer bare som korte tilleggsspørsmål.
9. **LF-kvalitet:** rene regneark, nesten ingen tekst. Kjente problemer: 2022 mangler internrente i 1a (egen: 13,46 %) og vektene summerer til 90 %; 2023 2f har selvmotsigende begrunnelse; 2025 oppg. 5b-LF bygger på andre tall enn eksamensteksten (egen utregning ≈ 1 190 977 mot LF 203 081), og 2025 oppg. 4 har små avrundingsavvik for aksje B.
10. **Metadata:** ingen av PDF-uttrekkene inneholdt forside – varighet og tillatte hjelpemidler er ukjent for alle fem (LF forutsetter Excel: «målsøking godtas», PERIODER-funksjon, så eksamen er trolig digital med regneark).
