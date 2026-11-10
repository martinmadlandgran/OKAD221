# Tidligere eksamener 2016–2020 – Investering og finansiering (Hauge)

Kilde: Google Drive (eksamens-PDF + løsningsforslag PDF/xlsx), lest med `read_file_content` (tekstuttrekk).
Konvensjoner i denne filen:
- **LF** = tall/tekst hentet direkte fra løsningsforslaget.
- **Egen kontroll** = min egen utregning/merknad (ikke fra LF).
- Tabeller er rekonstruert fra flatet PDF-tekst. Der rekonstruksjonen er usikker er det merket.
- Kapittelnummer (1–13) er etter beste skjønn mot Bredesen «Investering og finansiering» – de er IKKE oppgitt i eksamenene.

---

# EKSAMEN 1: Desember 2016

## Metadata
- Filnavn: `BA3HaugeDes2016.pdf` (LF: `LFBA3HaugeDes2016.pdf` og `LFBA3HaugeDes2016.xlsx`)
- Termin: desember 2016 (fra filnavn). «BA3» i filnavnet tyder på 3. semester bachelor.
- Emnekode/-navn: **ikke med i tekstuttrekket** (forsiden mangler i uttrekket; formelsamlingen har tittelen «Finansiering og investering»).
- Varighet: **ikke oppgitt i tekstuttrekket**.
- Tillatte hjelpemidler: **ikke oppgitt i tekstuttrekket**. (LF nevner «finansiell kalkulator» og «rentetabell», og eksamen har vedlagt formelsamling – så kalkulator + rentetabeller + vedlagt formelsamling var åpenbart i bruk.)
- Antall oppgaver: 4. Vekting: Oppg 1 = 20 %, Oppg 2 = 25 %, Oppg 3 = 35 %, Oppg 4 = 20 %.
- Vedlegg: Formelsamling (gjengitt i eget avsnitt nederst i denne eksamensseksjonen).

## Oppgave 1 (20 %)

### Oppgavetekst (ordrett)
Bedriften AS HighTech produserer hovedsakelig elektroniske produkter som brukes i stabilitetskontrollen i nye bilmodeller (ESP). Selskapet står overfor valget mellom å produsere en ny bedre type selvutviklet styringsenhet (S), eller produsere en brikke på lisens (L) fra Bosch. Begge typer kan brukes av Mercedes Benz i den nye CLA-serien. Bedriften er usikker på hvilket alternativ som er mest lønnsomt, og har kontaktet deg for å gi din anbefaling. Følgende data foreligger:

| | Selvutviklet (S) | Lisens (L) |
|---|---|---|
| Salgspris pr. enhet kr. | 2 500 | 2 750 |
| Variable enhetskostnader kr. | 1 740 | 2 125 |
| Økte faste kostnader pr. år kr. | 6 000 000 | 4 725 000 |
| Forventet årlig salg (enheter) | 12 000 | 12 000 |
| Levetid (år) | 5 | 4 |
| Investeringsutgift (kr) | 11 250 000 | 8 500 000 |
| Utrangervingsverdi (kr) | 0 | 400 000 |

a) Beregn nåverdien av prosjektene når avkastningskravet settes til 9 %.

b) Beregn internrenten for prosjektene.

c) Beregn tilbakebetalingstiden (pay-back) for prosjektene.

d) På basis av de resultatene du har kommet fram til i a) til c) over, hvilket prosjekt vil du anbefale? Svaret skal begrunnes.

e) Kan et annet avkastningskrav gjøre om på din anbefaling i d)?

f) Se bort fra punkt e). Etter å ha bestemt deg for å anbefale ett av prosjektene, ønsker du å kartlegge usikkerheten knyttet til en del av faktorene i din lønnsomhetsanalyse. Utfør en følsomhetsanalyse av pris og salgsmengde for det prosjektet du valgte i d).

### Løsning (LF)

Kontantstrøm prosjekt S (LF):

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Dekningsbidrag | | 9 120 000 | 9 120 000 | 9 120 000 | 9 120 000 | 9 120 000 |
| Økte faste kostnader | | −6 000 000 | −6 000 000 | −6 000 000 | −6 000 000 | −6 000 000 |
| Investering | −11 250 000 | | | | | |
| Kontantstrøm | −11 250 000 | 3 120 000 | 3 120 000 | 3 120 000 | 3 120 000 | 3 120 000 |

Kontantstrøm prosjekt L (LF):

| År | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Dekningsbidrag | | 7 500 000 | 7 500 000 | 7 500 000 | 7 500 000 |
| Økte faste kostnader | | −4 725 000 | −4 725 000 | −4 725 000 | −4 725 000 |
| Investering / utrangering | −8 500 000 | | | | 400 000 |
| Kontantstrøm | −8 500 000 | 2 775 000 | 2 775 000 | 2 775 000 | 3 175 000 |

Årlig kontantstrøm S = (2 500 − 1 740) · 12 000 − 6 000 000 = 3 120 000. L = (2 750 − 2 125) · 12 000 − 4 725 000 = 2 775 000, pluss utrangeringsverdi 400 000 i år 4.

- **a) LF:** NV(S) = **885 712**, NV(L) = **773 593** (kalkulator). Med rentetabell: NPV S = −11 250 000 + 3 120 000 · A(5, 9 %) = −11 250 000 + 3 120 000 · 3,8897 = 885 864. NPV L = −8 500 000 + 2 775 000 · A(3, 9 %) + 3 175 000 · R⁻¹(4, 9 %) = −8 500 000 + 2 775 000 · 2,5313 + 3 175 000 · 0,7084 = 773 528. Avrundingsavvik med tabell er «uten betydning».
- **b) LF:** Internrente S = **11,99 %** (≈ 12 %), L = **13,00 %**. Finnes med finansiell kalkulator.
- **c) LF:** Pay-back S = 11 250 000 / 3 120 000 = **3,61 år**. L = 8 500 000 / 2 775 000 = **3,1 år** (3,06). LF: man kan argumentere for at reell tilbakebetalingstid for L er enda kortere pga. restverdien; begge svar godtas.
- **d) LF:** Metodene rangerer ulikt: NV favoriserer S, internrente og pay-back favoriserer L. Velg prosjektet med høyest NV = **S**. Internrentemetoden kan ikke uten videre rangere gjensidig utelukkende prosjekter; man må beregne differanseinvesteringen S − L og dens internrente:

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Prosjekt S | −11 250 000 | 3 120 000 | 3 120 000 | 3 120 000 | 3 120 000 | 3 120 000 |
| Prosjekt L | −8 500 000 | 2 775 000 | 2 775 000 | 2 775 000 | 3 175 000 | – |
| S − L | −2 750 000 | 345 000 | 345 000 | 345 000 | −55 000 | 3 120 000 |

  Internrente på differanseinvesteringen = **10,08 %** > 9 % → velg det største prosjektet (S). (LF-teksten skriver ett sted «A» og «B»/«Y» for S og L – skrivefeil i LF.)
- **e) LF:** Ja. Ved avkastningskrav 10,08 % er nåverdiene like; ved krav over dette er NV(L) > NV(S).
- **f) LF:** Gjør NV(S) = 885 712 om til nåverdiannuitet: 885 712 / A(5, 9 %) = 885 712 / 3,8897 = **227 707** per år. Faller årlig kontantstrøm med 227 707 blir NPV = 0.
  - Pris kan falle 227 707 / 12 000 = 18,98 → **laveste pris ≈ 2 481,02**.
  - Mengde kan falle 227 707 / (2 500 − 1 740) = 299,6 → **laveste mengde ≈ 11 700,4 enheter**.

**Egen merknad:** Prosjektene har ulik levetid (5 vs 4 år), men LF sammenligner rene nåverdier uten å justere for levetid (ingen årsannuitet/kjede).

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 1a | Kontantstrøm / NV før skatt | 2–3 | del av 20 % | Regne |
| 1b | Internrente | 3 | del av 20 % | Regne |
| 1c | Tilbakebetalingstid (pay-back) | 3 | del av 20 % | Regne |
| 1d | Rangering gjensidig utelukkende prosjekter, differanseinvestering | 3 | del av 20 % | Regne + drøfte |
| 1e | Fisher-skjæringspunkt / avkastningskravets betydning | 3 | del av 20 % | Drøfte (kort) |
| 1f | Følsomhetsanalyse / nullpunkt (pris, mengde) via nåverdiannuitet | 7 (risiko/følsomhet) | del av 20 % | Regne |

## Oppgave 2 (25 %)

### Oppgavetekst (ordrett)
AS Sørlandsskuffa produserer snøskuffer som er effektive til å fjerne snø ved store nedbørsmengder. Maskinen som brukes til produksjon ble kjøpt inn for 6 år siden til en pris på 1 millioner kr. Maskinen har sett sine bedre dager og man vurderer nå å selge denne for 200 000 kr. Man regner ikke med at den varer mer enn 6 år til, og at den da kan selges for 50 000 kr.

Ledelsen har derfor vurdert en ny maskin som koster 2,5 millioner kr i dag. Om 6 år han man uansett tenkt å avslutte produksjon av snøskuffer, og man regner med at maskinen da kan selges for 1 million kr. Hvis man kjøper den nye maskinen, må man beregne ytterligere 150 000 kr til installasjon og at de årlige faste kostnadene vil øke fra 400 000 til 475 000 kr. Fordelen med den nye maskinen er at bedriften kan øke sin produksjon (det er også marked for det) og de variable kostnadene pr. enhet reduseres. Tabellen under gir ytterligere informasjon om de to maskinene:

| | Gammel maskin | Ny maskin |
|---|---|---|
| Årlig sagsvolum (antall snøskuffer) | 800 | 1 200 |
| Salgspris pr. enhet | 1 500 | 1 500 |
| Direkte materialer pr. enhet | 400 | 400 |
| Direkte lønn pr. enhet | 500 | 300 |
| Øvrige variable enhetskostnader | 150 | 100 |

Bedriften bruker et avkastningskrav på 12 %.

a) Bør AS Sørlandsskuffa erstatte den gamle maskinen med en ny?

AS Sørandsskuffa produserer også andre produkter og maskinen som brukes begynner å bli helt nedslitt. Man vurderer derfor å anskaffe en ny maskin med en kostpris på 1,6 millioner kr. Maskinen har en teknisk levetid på 5 år og avkastningskravet er fremdeles 12 %.

Kontantstrømmen fra produksjonen hvor maskinen brukes og salgsverdi for den nye maskinen avhengig av hvor lenge den beholdes, er gitt i tabellen under:

| Ny maskin | År 1 | År 2 | År 3 | År 4 | År 5 |
|---|---|---|---|---|---|
| Kontantstrøm | 800 000 | 700 000 | 550 000 | 300 000 | 100 000 |
| Salgsverdi | 1 000 000 | 550 000 | 450 000 | 300 000 | 50 000 |

b) Hva er optimal økonomisk levetid for den nye maskinen dersom den er en engangsinvestering?

c) Hva er optimal økonomisk levetid for den nye maskinen dersom det er en investeringskjede (maskinen erstattes med en identisk) i all framtid?

### Løsning (LF)

**a)** Alternativ «behold gammel» (LF):

| År | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| Salgsverdi gammel | | | | | | | 50 000 |
| Dekningsbidrag | | 360 000 | 360 000 | 360 000 | 360 000 | 360 000 | 360 000 |
| Kontantstrøm | | 360 000 | 360 000 | 360 000 | 360 000 | 360 000 | 410 000 |

NV (12 %) = **1 505 438**.
Egen kontroll: DB gammel = (1 500 − 400 − 500 − 150) · 800 = 450 · 800 = 360 000. De eksisterende faste kostnadene (400 000) tas ikke med i noen av alternativene; kun økningen på 75 000 belastes ny maskin.

Alternativ «kjøp ny» (LF):

| År | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| Kjøp og salg av ny | −2 500 000 | | | | | | 1 000 000 |
| Selg gammel | 200 000 | | | | | | |
| Installasjon | −150 000 | | | | | | |
| Dekningsbidrag | | 840 000 | 840 000 | 840 000 | 840 000 | 840 000 | 840 000 |
| Økte faste kostnader | | −75 000 | −75 000 | −75 000 | −75 000 | −75 000 | −75 000 |
| Kontantstrøm | −2 450 000 | 765 000 | 765 000 | 765 000 | 765 000 | 765 000 | 1 765 000 |

NV (12 %) = **1 201 858**.
Egen kontroll: DB ny = (1 500 − 400 − 300 − 100) · 1 200 = 700 · 1 200 = 840 000.

**LF-svar a):** NV er høyere ved å beholde den gamle maskinen (1 505 438 > 1 201 858; differanse 303 580 i xlsx) → **ikke bytt, behold gammel maskin**.

**b) og c)** LF beregner NV og nåverdiannuitet for hver mulig levetid (kontantstrøm siste år = driftskontantstrøm + salgsverdi):

| Levetid | År 0 | År 1 | År 2 | År 3 | År 4 | År 5 | NPV | Annuitet |
|---|---|---|---|---|---|---|---|---|
| 1 år | −1 600 000 | 1 800 000 | | | | | 7 143 | 8 000 |
| 2 år | −1 600 000 | 800 000 | 1 250 000 | | | | 110 778 | 65 547 |
| 3 år | −1 600 000 | 800 000 | 700 000 | 1 000 000 | | | 384 102 | 159 920 |
| 4 år | −1 600 000 | 800 000 | 700 000 | 550 000 | 600 000 | | 445 111 | 146 546 |
| 5 år | −1 600 000 | 800 000 | 700 000 | 550 000 | 300 000 | 150 000 | 339 570 | 94 200 |

- **b) LF:** Engangsinvestering → behold det antall år som maksimerer NV = **4 år** (NV 445 111). (LF-teksten skriver «Dersom det er en investeringskjede» her, men mener åpenbart engangsinvestering – skrivefeil i LF.)
- **c) LF:** Investeringskjede → skift ut slik at nåverdiannuiteten maksimeres = **hvert 3. år** (annuitet 159 920).

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 2a | Utskiftingsanalyse / kontantstrøm, NV før skatt (behold vs. erstatt) | 2–3 (evt. 5) | del av 25 % | Regne |
| 2b | Optimal økonomisk levetid – engangsinvestering (maks NV) | 5 (levetid/utskifting) | del av 25 % | Regne |
| 2c | Optimal levetid – investeringskjede (maks nåverdiannuitet) | 5 | del av 25 % | Regne |

## Oppgave 3 (35 %)

### Oppgavetekst (ordrett)
AS IMAX har vurderer å lansere et nytt produkt, nemlig en ny ergometersykkel Heartsafe. Sykkelen har kostet 500 000 å utvikle, og en viktig nyvinning er avansert programvare som overvåker hjerterytme og som gir brukere god informasjon om hvor hardt man kan presse kroppen. Budsjettert salgspris til detaljister er 2 200 kr pr. enhet, og dekningsgraden er budsjettert til 45 %. Prosjektets levetid er tenkt å være 5 år, og man budsjetterer med følgende årlige salgsvolum i levetiden:

| | |
|---|---|
| Volum år 1 | 2 000 |
| Volum år 2 | 2 100 |
| Volum år 3 | 2 100 |
| Volum år 4 | 1 800 |
| Volum år 5 | 1 500 |

Dersom produktet lansertes, vil også arbeidskapitalbehovet øke. Det er anslått at arbeidskapitalen vil utgjøre 20 % av omsetningen.

En leder må tilsettes for å håndtere etableringen og produksjon/salg av det nye produktet. Det er budsjettert med en lønn på kr 550 000 årlig. En person som allerede er ansatt vil ivareta denne funksjonen, men på grunn av økt ansvar vil vedkommende få en lønnsøkning på kr 200 000.

Prosjektet vil også bli belastet med indirekte kostnader på 500 000 kr årlig. Halvparten av disse kostnadene oppstår pga. prosjektet.

Investeringen i produksjonsutstyr vil eventuelt utgjøre 4 500 000 kr. Ved levetidens slutt regner man med at anleggsmidlene kan selges for 800 000 kr. Salget skal behandles på den skattemessig gunstigste måten.

Anleggsmidlene avskrives med en saldosats på 20 % årlig og skattesatsen er 27 %. Bedriften finansierer sine investeringer med en gjeldsandel på 40 % og bedriften betaler en gjeldsrente på 4,5 % før skatt. Risikofri rente er 3 %, avkastningen på markedsporteføljen er 9 % og bedriftens aksjebeta er 1,56.

a) Beregn bedriftens totalavkastningskrav, WACC. Rund gjerne av til nærmeste hele prosent.

b) Hva er prosjektets nåverdi etter skatt? Vis grunnlaget for beregningen. Bør prosjektet gjennomføres?

### Løsning (LF)

**a) LF:** KVM med skatt (formel 6.2) og veid kapitalkostnad (formel 6.9):
- r_e = 0,03 · (1 − 0,27) + [0,09 − 0,03 · (1 − 0,27)] · 1,56 = **0,1278** (PDF) / 0,128136 (xlsx)
- r_t = 0,045 · (1 − 0,27) · 0,40 + 0,1278 · 0,60 = **0,0898** (PDF) / 9,00 % (xlsx)
- Avrundes til **WACC = 9 %**.

Egen kontroll: r_e = 0,0219 + 1,56 · 0,0681 = 0,128136; WACC = 0,01314 + 0,07688 = 0,0900. Stemmer med xlsx.

**b) LF:** Beregningsgrunnlag (9 %):

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Salgsinntekter | | 4 400 000 | 4 620 000 | 4 620 000 | 3 960 000 | 3 300 000 |
| Variable kostnader | | −2 420 000 | −2 541 000 | −2 541 000 | −2 178 000 | −1 815 000 |
| Økte indirekte kostnader | | −250 000 | −250 000 | −250 000 | −250 000 | −250 000 |
| Lønnsøkning | | −200 000 | −200 000 | −200 000 | −200 000 | −200 000 |
| Kontantstrøm drift før skatt | | 1 530 000 | 1 629 000 | 1 629 000 | 1 332 000 | 1 035 000 |
| Skatt (27 %) | | −413 100 | −439 830 | −439 830 | −359 640 | −279 450 |
| Arbeidskapital | −880 000 | −44 000 | 0 | 132 000 | 132 000 | 660 000 |
| Anleggsmidler | −4 500 000 | | | | | 800 000 |
| NV spart skatt avskrivning | 837 931 | | | | | |
| NV økt skatt nedskrivning | −96 817 | | | | | |
| Beregningsgrunnlag | −4 638 886 | 1 072 900 | 1 189 170 | 1 321 170 | 1 104 360 | 2 215 550 |

**Nåverdi etter skatt = 588 824 → prosjektet er lønnsomt og bør gjennomføres.**

Metode / nøkkelpunkter i LF:
- Utviklingskostnaden 500 000 er sunk cost – ikke med.
- Lederlønn: kun lønnsøkningen 200 000 er relevant (ikke 550 000).
- Indirekte kostnader: kun halvparten (250 000) er merkostnad.
- Variable kostnader = 55 % av omsetning (dekningsgrad 45 %).
- Arbeidskapital = 20 % av omsetningen, bindes året FØR (år 0: 20 % · 4 400 000 = 880 000; år 1: økning 44 000; år 3 og 4: frigjøring 132 000; år 5: resten 660 000 frigjøres).
- Skatt beregnes på driftskontantstrøm før skatt (uten avskrivninger); avskrivningenes skatteeffekt legges inn som nåverdi i år 0 (formel 3.5/3.6):
  - NV spart skatt av saldoavskrivninger = 4 500 000 · 0,20 · 0,27 / (0,09 + 0,20) = **837 931** (PDF-teksten skriver «837 391», tabellen og xlsx har 837 931 – skrivefeil i teksten).
  - Salgssum 800 000 nedskrives på saldo («skattemessig gunstigste måte»): NV økt skatt = 800 000 · 0,20 · 0,27 / [1,09⁵ · (0,09 + 0,20)] = **−96 817**.

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 3a | WACC / KVM (med skatt) | 9 (kapitalkostnad) / 8 (KVM) | del av 35 % | Regne |
| 3b | NV etter skatt med saldoavskrivning, arbeidskapital, relevante kontantstrømmer (sunk cost, merkostnader) | 2 + 4 (skatt) | del av 35 % | Regne (+ kort konklusjon) |

## Oppgave 4 (20 %)

### Oppgavetekst (ordrett)
a) En student har hatt hellet med seg og vunnet et betydelig beløp i Lotto. Han/hun vurderer å plassere pengene i aksjemarkedet, men han/hun sier at risikoen ikke kan være for høy fordi han/hun planlegger å bruke beløpet som egenkapital ved anskaffelse av leilighet når studiene er fullført om få år. Konkret vurderes to aksjer, aksje A og B. Avkastningen påvirkes av svingninger i etterspørselen etter bedriftenes produkter, og kan illustreres slik:

Aksje A

| Etterspørsel | Sannsynlighet | Avkastning |
|---|---|---|
| Høy | 0,20 | 14,00 % |
| Normal | 0,50 | 10,00 % |
| Lav | 0,30 | −4,00 % |

Aksje B

| Etterspørsel | Sannsynlighet | Avkastning |
|---|---|---|
| Høy | 0,20 | 9,00 % |
| Normal | 0,50 | 7,00 % |
| Lav | 0,30 | −2,00 % |

b) Beregn forventet avkastning og avkastningens standardavvik for aksje A og B.

c) Legg til grunn at de to selskapene opererer i helt ulike bransjer, slik at avkastningen til aksjene ikke er korrelert (korrelasjonskoeffisienten er 0). Basert på din beregning i b) og forklaringen i c) og ønsket om lav risiko, så sier studenten at alle pengene bør plasseres i aksje B. Er dette et fornuftig valg? Foreta relevante beregninger og ta stilling til om denne plasseringsstrategien er fornuftig.

**NB (egen merknad om bokstavering):** Oppgaveteksten har rotete bokstavering – «a)» er bare innledning uten spørsmål, «b)» er regnespørsmålet, og «c)» viser til «forklaringen i c)». LF bruker a) = beregning, b) = forklar hva forventet avkastning/standardavvik uttrykker, c) = vurder plasseringen. Det ser ut til at et forklaringsspørsmål har falt ut av oppgaveteksten.

### Løsning (LF) – VIKTIG: LF-PDF og LF-xlsx bruker ULIKE tall

**LF-xlsx (bruker tallene i eksamensoppgaven – dette er riktig fasit for oppgaven slik den står):**

| | Aksje A | Aksje B |
|---|---|---|
| Forventet avkastning | **6,60 %** | **4,70 %** |
| Varians | 0,0050 | 0,0020 |
| Standardavvik | **7,10 %** | **4,45 %** |

Egen kontroll: E(A) = 0,2·14 + 0,5·10 + 0,3·(−4) = 6,6 %. Var(A) = 0,2·7,4² + 0,5·3,4² + 0,3·10,6² = 50,44 (%²) = 0,005044 → σ = 7,10 %. E(B) = 1,8 + 3,5 − 0,6 = 4,7 %. Var(B) = 0,2·4,3² + 0,5·2,3² + 0,3·6,7² = 19,81 (%²) = 0,001981 → σ = 4,45 %. Stemmer.

Portefølje 50/50 (xlsx): forventet avkastning **5,65 %**, varians 0,00175625, standardavvik **4,19 %** → høyere forventet avkastning og lavere standardavvik enn B alene.
Minimum-varians-portefølje (xlsx): andel A = **0,2820**, andel B = 0,7180, forventet avkastning **5,24 %**, varians 0,001422372, standardavvik **3,77 %**.
(Formel ved ρ = 0: w_A = σ²_B / (σ²_A + σ²_B) = 0,001981 / 0,007025 = 0,2820.)

**LF-PDF (bruker ANDRE tall enn eksamensoppgaven: sannsynligheter 0,25/0,50/0,25, avkastning A 15 %/10 %/−3 %, B 8 %/7 %/−2 % – trolig fra en tidligere versjon av oppgaven):**
- E(r_A) = 0,25·0,15 + 0,50·0,10 − 0,25·0,03 = 0,08; E(r_B) = 0,25·0,08 + 0,50·0,07 − 0,25·0,02 = 0,05.
- σ²(r_A) = 0,004450 → σ = 6,67 %; σ²(r_B) = 0,001650 → σ = 4,06 %.
- 50/50: E(r_P) = 0,065; σ²(r_P) = 0,5²·0,004450 + 0,5²·0,001650 = 0,001525; σ = 3,905 %.
- Minimum-varians: optimal andel A = 0,001650 / (0,004450 + 0,001650) = 0,2705 → forventet avkastning 5,81 %, standardavvik 3,47 %.

**LF (tekst), gjelder uansett tallsett:**
- (LF b) Forventet avkastning gjenspeiler avkastningen man kan oppnå dersom man eier aksjen lenge. Standardavviket måler risiko, eller hvor ofte og hvor mye avkastningen avviker fra forventet verdi.
- (LF c) Det er ikke fornuftig å legge alle eggene i én kurv, selv om B har lavere standardavvik enn A. En likeveid portefølje gir høyere avkastning og lavere standardavvik enn B alene → B alene er ikke effisient. Siden kovariansen er 0 faller kovariansleddet bort. Man kan også beregne minimum-varians-andelen. «Oppgaven konkretiserer med hensikt ikke presist hva studentene skal gjøre, men man må påpeke og eksemplifisere at A og B i portefølje vil dominere over B alene og ulike sammensetninger aksepteres som gode løsninger.»

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 4 (a/b) | Forventet avkastning og standardavvik for enkeltaksjer | 7–8 (risiko/portefølje) | del av 20 % | Regne |
| 4 (LF b) | Tolke forventning og standardavvik | 7–8 | del av 20 % | Drøfte/teori (kort) |
| 4c | Portefølje av to aksjer, diversifisering, ρ = 0, minimum-varians-portefølje | 8 (porteføljeteori) | del av 20 % | Regne + drøfte |

## Formelsamling vedlagt eksamen des 2016 (innhold, rekonstruert fra forvansket PDF-tekst)
Tittel: «Formelsamling – Finansiering og investering». Formelnumrene under er eksamens egne.

1. **Renteregning**
   - 1-1 Sluttverdi: FV = CF₀ · (1 + i)ⁿ
   - 1-2 Nåverdi: PV = FVₙ · 1/(1 + i)ⁿ
   - 1-3 Nåverdi etterskuddsannuitet: PV = PMT · [(1 + i)ⁿ − 1] / [i · (1 + i)ⁿ]
   - 1-4 Annuitetsfaktor: A(n, i) = [(1 + i)ⁿ − 1] / [i · (1 + i)ⁿ]
   - 1-5 Invers annuitetsfaktor: A⁻¹(n, i) = i · (1 + i)ⁿ / [(1 + i)ⁿ − 1]
   - 1-6 Annuitet: PMT = PV · i · (1 + i)ⁿ / [(1 + i)ⁿ − 1]
   - 1-7 Evig annuitet: PV = CF / i
   - 1-8 Evig annuitet med vekst: PV = CF / (i − g)
   - 1-9 Annuitet med vekst, n perioder: PV = CF · [(1 + i)ⁿ − (1 + g)ⁿ] / [(1 + i)ⁿ · (i − g)]
   - 1-10 Årsrente fra perioderente: p = (1 + q)ᵐ − 1
   - 1-11 Effektiv årsrente: i_eff = (1 + i/m)ᵐ − 1
2. **Nåverdi og internrente**
   - 2-1 NPV = CF₀ + CF₁/(1 + i) + CF₂/(1 + i)² + … + CFₙ/(1 + i)ⁿ
   - 2-2 0 = CF₀ + CF₁/(1 + irr) + … + CFₙ/(1 + irr)ⁿ
3. **Nåverdi og skatt**
   - 3.1 Effektiv skattesats: s_E = (p − r)/p
   - 3.2 Bokført restverdi år t: RV_t = AM₀ · (1 − a)ᵗ
   - 3.3 Avskrivning år t: AV_t = AM₀ · (1 − a)ᵗ⁻¹ · a
   - 3.4 NV av saldoavskrivninger = AM₀ · a / (r_t + a)
   - 3.5 NV av spart skatt = AM₀ · a · s / (r_t + a)
   - 3.6 NV etter skatt, saldogruppe A–D og J: NPV = −AM₀ + Σ CF_t·(1 − s)/(1 + r)ᵗ + SV/(1 + r)ⁿ + AM₀·a·s/(r + a) − SV·a·s / [(1 + r)ⁿ · (r + a)]
   - 3.7 NV etter skatt, saldogruppe E–I (med gevinstføringssats g) – uttrykket er for forvansket i tekstuttrekket til å gjengis sikkert.
4. **Avkastningskrav på finansinvesteringer og inflasjon**
   - 4.1 Realavkastning før skatt: p_r = (p_n − j)/(1 + j)
   - 4.2 p_n = p_r · (1 + j) + j
   - 4.3 Realavkastning etter skatt: r_r = [p_n · (1 − s) − j]/(1 + j)
5. **Forventet verdi, varians, standardavvik, kovarians, korrelasjon**
   - 5.1 E(r) = p₁r₁ + … + pₙrₙ
   - 5.2 Var(r) = σ² = Σ (r_i − E(r))² · p_i
   - 5.3 σ = √Var(r)
   - 5.4 E(r_p) = w₁E(r₁) + … + wₙE(rₙ)
   - 5.5 σ_AB = Σ (r_Ai − E(r_A))·(r_Bi − E(r_B))·p_i
   - 5.6 ρ_AB = σ_AB / (σ_A · σ_B)
   - 5.7 Var(r_P) = w_A²σ_A² + 2·w_A·w_B·σ_AB + w_B²σ_B² = w_A²σ_A² + 2·w_A·w_B·ρ_AB·σ_A·σ_B + w_B²σ_B²
   - 5.8 σ_P = √Var(r_P)
   - 5.9 Minimum-varians-portefølje: a_A = [σ²(r_B) − ρ·σ(r_A)·σ(r_B)] / [σ²(r_A) + σ²(r_B) − 2·ρ·σ(r_A)·σ(r_B)]
   - 5.10 Sharpe = (E(r) − r_f)/σ
6. **Kapitalverdimodellen, kapitalkostnader og aksjeverdi**
   - 6.1 E(r_j) = r_f + β_j · [E(r_m) − r_f]
   - 6.2 Med skatt: E(r_j) = r_f·(1 − s) + β_j · [E(r_m) − r_f·(1 − s)]
   - 6.3 Avkastningskrav gjeld (før skatt): E(r_g) = r_f + β_g · [E(r_m) − r_f·(1 − s)]
   - 6.4 β_j = cov(r_j, r_m)/var(r_m) = σ_jm/σ_m²
   - 6.5 β_j = σ_j · ρ_jm / σ_m
   - 6.6 Empirisk varians: Var(r_m) = 1/(n − 1) · Σ (r_mi − r̄_m)²
   - 6.7 Empirisk kovarians: cov(r_j, r_m) = 1/(n − 1) · Σ (r_ji − r̄_j)(r_mi − r̄_m)
   - 6.8 Gordon: P₀ = D₁/(r − g)
   - 6.9 WACC: r_t = r_e · E/(E + G) + r_g · (1 − s) · G/(E + G)
   - 6.10 Vektstangformelen: r_e = r_t + [r_t − r_g·(1 − s)] · G/E

---

# EKSAMEN 2: Mars 2017

## Metadata
- Filnavn: `BØ3HaugeMars2017.pdf` (LF: `LFBA3HaugeMar2017.xlsx` – KUN regneark, ingen forklarende tekst)
- Termin: mars 2017 (fra filnavn; trolig kontinuasjons-/utsatt eksamen for høst 2016-kullet).
- Emnekode/-navn: **ikke med i tekstuttrekket** (formelsamlingen heter «Finansiering og investering»).
- Varighet: **ikke oppgitt i tekstuttrekket**. Tillatte hjelpemidler: **ikke oppgitt i tekstuttrekket** (formelsamling vedlagt, identisk med des 2016).
- Antall oppgaver: 4. Vekting: Oppg 1 = 20 %, Oppg 2 = 40 %, Oppg 3 = 20 %, Oppg 4 = 20 %.
- **LF er bare et regneark med tall.** All metodebeskrivelse under er min tolkning av regnearkets linjer (kontrollregnet der det står «Egen kontroll»). Drøftingsdelene (4c, 4d-forklaring, 4e) har INGEN LF-tekst.

## Oppgave 1 (20 %)

### Oppgavetekst (ordrett)
a) Hva er nåverdien av kr 5 000 om 7 år når renta er 6 %?

b) Anta at du setter kr 5 000 i banken i dag. Hvor mye kan du heve etter 10 år når renta er 5 % de første 4 årene og deretter stiger til 7 % årlig?

c) En bruktbil koster kr 120 000. Bilen kan selges for kr 10 000 etter 6 år. Hva er den årlige kostnaden (avskrivning og rentekostnader) hvis renta er 9 %?

d) Et verdipapir gir en utbetaling på kr 30 000 hvert år i 6 år. Anta at første beløp kommer om ett år. Hva er markedsverdien på verdipapiret hvis renta er 7 %?

e) Finn renter og avdrag det første året på et annuitetslån over 4 år når lånerenten er 6 % pr. år og lånebeløpet er kr 400 000. Renter og avdrag skal betales hvert halvår.

f) Anta at det påløper et etableringsgebyr på kr 1 500 ved låneopptak og et termingebyr på kr 60 ved hvert forfall på lånet i e). Hva er lånets effektive rente?

### Løsning (LF-tall fra xlsx; metode = min tolkning, kontrollregnet)
- **a) LF: PV = 3 325.** Metode: 5 000 / 1,06⁷ = 3 325,29.
- **b) LF: Sluttverdi = 9 121.** Metode: 5 000 · 1,05⁴ · 1,07⁶ = 9 120,74.
- **c) LF: «Kostnad bil» (nåverdi) = 114 037; årlig kostnad = 25 421.** Metode: NV av kostnad = 120 000 − 10 000 / 1,09⁶ = 114 037; gjøres om til annuitet over 6 år ved 9 %: 114 037 / A(6, 9 %) = 114 037 / 4,4859 = 25 421.
- **d) LF: PV = 142 996.** Metode: 30 000 · A(6, 7 %) = 30 000 · 4,7665 = 142 996.
- **e) LF:** Halvårsrente 3 % (6 % / 2), 8 terminer. Terminbeløp (ytelse) = **56 983** (= 400 000 · A⁻¹(8, 3 %)).

| | 6 mnd | 12 mnd |
|---|---|---|
| Rente | 12 000 | 10 651 |
| Avdrag | 44 983 | 46 332 |
| Sum | 56 983 | 56 983 |

  Egen sum for første år: renter 12 000 + 10 651 = **22 651**, avdrag 44 983 + 46 332 = **91 315**. (Rente termin 2 = 3 % av restgjeld 355 017.)
- **f) LF: Halvårsrente = 3,11 %, effektiv årsrente = 6,33 %.** Metode: kontantstrøm for låntaker: +398 500 (400 000 − 1 500) i dag, deretter −57 043 (56 983 + 60) i 8 halvår. Internrenten per halvår = 3,11 %; effektiv årsrente = 1,0311² − 1 = 6,33 %.

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 1a | Rentesregning: nåverdi av enkeltbeløp | 1–2 (rentesregning) | del av 20 % | Regne |
| 1b | Rentesregning: sluttverdi med skiftende rente | 1–2 | del av 20 % | Regne |
| 1c | Årskostnad (kapitalkostnad som annuitet) | 2 / 5 | del av 20 % | Regne |
| 1d | Nåverdi av annuitet | 1–2 | del av 20 % | Regne |
| 1e | Annuitetslån, halvårlige terminer, renter/avdrag | 10 (lån/finansiering) | del av 20 % | Regne |
| 1f | Effektiv rente med gebyrer | 10 | del av 20 % | Regne |

## Oppgave 2 (40 %)

### Oppgavetekst (ordrett)
Bedriften Aqua vurderer å investere kr 5 000 000 i et produksjonsanlegg for vann på flasker. I tillegg til anleggsinvesteringene må arbeidskapitalen økes med kr 2 000 000. Bedriften har inngått en kontrakt med to store dagligvarekjeder som vil distribuere produktet. Prisen pr. flaske til distributør vil være kr 6 og de variable produksjonskostnadene kr 3 pr. flaske. Det er budsjettert å selge 1 000 000 flasker pr. år i 5 år. Betalbare faste driftskostnader vil bli kr 500 000 pr. år dersom prosjektet starter. Det vil også være nødvendig med intensiv markedsføring av produktet, og man antar at markedsføringskostnadene vil bli kr 500 000 pr. år. Eieren av grunnen hvor tappingen skjer, vil overta anleggsmidlene gratis (ingen betaling) ved levetidens slutt, men det er anslått at markedsverdien på dette tidspunktet vil være kr 1 500 000. Avkastningskravet er 11 %. Se bort fra skatt i del a) til c) i oppgaven.

a) Finn nåverdi og internrente til prosjektet. Er prosjektet lønnsomt?

b) Hva er laveste antall flasker man må selge pr. år for at prosjektet skal være lønnsomt?

c) Eieren av vannkilden innleder forhandlinger om en årlig kompensasjon (etterskuddsvis) i stedet for å overta anleggsmidlene gratis etter 5 år. Hva er det meste bedriften kan gå med på å betale i årlig kompensasjon?

d) Anta at bedriften finansierer sine investeringer med en egenkapitalandel på 80 %. Risikofri rente er 2,5 % mens bedriften kan låne penger til en rente på 4 %. Markedsavkastningen er anslått til 10 % og bedriftens egenkapitalbeta er 0,91. Skattesatsen er 27 %. Hva er bedriftens veide totalkapitalavkastningskrav (WACC) etter skatt?

e) Legg til grunn at anleggsmidlene avskrives etter saldometoden med en sats på 20 % årlig. Hva er prosjektets nåverdi etter skatt? Se bort fra punkt c).

### Løsning (LF-tall fra xlsx; metode = min tolkning, kontrollregnet)

**a) LF:** Kontantstrøm (faste kostnader = 500 000 drift + 500 000 markedsføring = 1 000 000):

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Dekningsbidrag | | 3 000 000 | 3 000 000 | 3 000 000 | 3 000 000 | 3 000 000 |
| Faste kostnader | | −1 000 000 | −1 000 000 | −1 000 000 | −1 000 000 | −1 000 000 |
| Arbeidskapital | −2 000 000 | | | | | 2 000 000 |
| Anleggsmidler | −5 000 000 | | | | | |
| Kontantstrøm | −7 000 000 | 2 000 000 | 2 000 000 | 2 000 000 | 2 000 000 | 4 000 000 |

**NV (11 %) = 1 578 697. Internrente = 18,7 %.** → lønnsomt (NV > 0, IRR > 11 %). Merk: anleggsmidlene gir INGEN salgsinntekt i år 5 (gis bort gratis); arbeidskapitalen frigjøres i år 5.

**b) LF:** Nåverdiannuitet = **427 148** (= 1 578 697 / A(5, 11 %) = 1 578 697 / 3,6959). Salgsvolum kan falle med 427 148 / (6 − 3) = **142 383** flasker → **laveste salgsvolum = 857 617 flasker pr. år**.

**c) LF:** «Nåverdi markedspris anlegg» = 1 500 000 / 1,11⁵ = **890 177**; «Årlig nåverdiannuitet» = 890 177 / A(5, 11 %) = **240 855**. → Maksimal årlig kompensasjon = **240 855 kr**. (Tolkning: bedriften beholder da anlegget verdt 1 500 000 i år 5; denne verdien omgjort til årlig etterskuddsannuitet er det meste den kan betale uten å komme dårligere ut enn i a).)

**d) LF:** Egenkapitalkostnad = **9,26 %**, **WACC = 8,00 %** (rundes av til 8 %).
Egen kontroll (KVM med skatt, formel 6.2): r_e = 0,025·0,73 + 0,91·(0,10 − 0,025·0,73) = 0,01825 + 0,91·0,08175 = 0,09264. WACC = 0,09264·0,8 + 0,04·0,73·0,2 = 0,07411 + 0,00584 = 0,07995 ≈ 8 %.

**e) LF:** Beregningsgrunnlag ved WACC 8 %:

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Kontantstrøm drift | | 2 000 000 | 2 000 000 | 2 000 000 | 2 000 000 | 2 000 000 |
| Skatt (27 %) | | −540 000 | −540 000 | −540 000 | −540 000 | −540 000 |
| Anleggsmidler | −5 000 000 | | | | | |
| Arbeidskapital | −2 000 000 | | | | | 2 000 000 |
| Nåverdi spart skatt avskrivning | 964 286 | | | | | |
| Beregningsgrunnlag | −6 035 714 | 1 460 000 | 1 460 000 | 1 460 000 | 1 460 000 | 3 460 000 |

**Nåverdi etter skatt = 1 154 809.**
Metode: NV spart skatt = 5 000 000 · 0,20 · 0,27 / (0,08 + 0,20) = 964 286 (evig saldoavskrivning). Ingen korreksjon for salg, fordi anleggsmidlene overdras uten vederlag (salgssum 0 → saldoen avskrives videre). Egen kontroll: NV av beregningsgrunnlaget ved 8 % = 1 154 809. Stemmer.

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 2a | Kontantstrøm / NV og internrente før skatt, arbeidskapital | 2–3 | del av 40 % | Regne |
| 2b | Følsomhetsanalyse / nullpunkt (kritisk salgsvolum) via nåverdiannuitet | 7 | del av 40 % | Regne |
| 2c | Nåverdiannuitet / ekvivalent årlig beløp (maks årlig kompensasjon) | 2–3 | del av 40 % | Regne |
| 2d | WACC / KVM med skatt | 8–9 | del av 40 % | Regne |
| 2e | NV etter skatt med saldoavskrivning | 4 | del av 40 % | Regne |

## Oppgave 3 (20 %)

### Oppgavetekst (ordrett)
En bedrift investerer 450 i et nytt produksjonsanlegg. Man ønsker å vurdere hvor mange år dette anlegget skal drives. Bedriften benytter et avkastningskrav på 12 %. Innbetalinger og utbetalinger knyttet til prosjektet og salgsverdier for anleggsmidlene er budsjettert til (alle beløp kommer i slutten av året):

| År | Innbetaling | Utbetaling | Salgsverdi |
|---|---|---|---|
| 1 | 570 | 330 | 285 |
| 2 | 540 | 360 | 210 |
| 3 | 510 | 390 | 135 |
| 4 | 480 | 420 | 60 |

a) Beregn optimal økonomisk levetid for anlegget under forutsetning av at det ikke skal gjenanskaffes.

b) Beregn optimal økonomisk levetid for anlegget under forutsetning av at det skal gjenanskaffes i all fremtid.

### Løsning (LF-tall fra xlsx)
Netto driftskontantstrøm: år 1 = 240, år 2 = 180, år 3 = 120, år 4 = 60. Siste års kontantstrøm = netto drift + salgsverdi.

| Levetid | År 0 | År 1 | År 2 | År 3 | År 4 | NPV | Annuitet |
|---|---|---|---|---|---|---|---|
| 1 år | −450 | 525 | | | | 18,75 | 21,00 |
| 2 år | −450 | 240 | 390 | | | 75,19 | 44,49 |
| 3 år | −450 | 240 | 180 | 255 | | 89,28 | 37,17 |
| 4 år | −450 | 240 | 180 | 120 | 120 | 69,46 | 22,87 |

- **a) (konklusjon utledet av LF-tabellen; LF har ingen tekst):** Uten gjenanskaffelse → maks NPV → **3 år** (NPV 89,28).
- **b) (utledet av LF-tabellen):** Med gjenanskaffelse i all fremtid → maks nåverdiannuitet → **2 år** (annuitet 44,49).

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 3a | Optimal økonomisk levetid – engangsinvestering (maks NV) | 5 | del av 20 % | Regne |
| 3b | Optimal levetid – investeringskjede (maks nåverdiannuitet) | 5 | del av 20 % | Regne |

## Oppgave 4 (20 %)

### Oppgavetekst (ordrett)
En industrivirksomhet vurderer to gjensidig utelukkende investeringer. Prosjekt X vil ha en økonomisk levetid på 2 år, mens prosjekt Y forutsettes å ha en økonomisk levetid på 3 år. Årlige kontantstrømmer er som følger:

| År | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Prosjekt X | −2 000 000 | 1 000 000 | 1 400 000 | |
| Prosjekt Y | −2 000 000 | −200 000 | 1 600 000 | 1 200 000 |

a) Beregn nåverdien til hvert av prosjektene når avkastningskravet er 8 %. Hvilket prosjekt er mest lønnsomt?

b) Beregn internrenten til hvert av prosjektene. Hvilket prosjekt er mest lønnsomt?

c) Hvorfor gir de to metodene forskjellig rangering av prosjektene? Hvilket prosjekt vil du anbefale? Presiser hvilke forutsetninger du tar og begrunn svaret.

d) Vis kontantstrømmen og beregn internrenten til differanseinvesteringen for de to investeringsalternativene. Forklar hvordan internrenten kan brukes til å sammenligne lønnsomheten til de to alternativene.

e) Vil et annet avkastningskrav kunne endre rangeringen av lønnsomhet?

### Løsning (LF-tall fra xlsx – kun tall, ingen tekst)

| År | 0 | 1 | 2 | 3 | NPV (8 %) | IRR |
|---|---|---|---|---|---|---|
| Prosjekt X | −2 000 000 | 1 000 000 | 1 400 000 | | 126 200 | 12,3 % |
| Prosjekt Y | −2 000 000 | −200 000 | 1 600 000 | 1 200 000 | 139 156 | 10,9 % |
| Prosjekt Y − X | 0 | −1 200 000 | 200 000 | 1 200 000 | 12 955 | 9,17 % |

- **a) LF:** NV(X) = **126 200**, NV(Y) = **139 156** → Y har høyest NV.
- **b) LF:** IRR(X) = **12,3 %**, IRR(Y) = **10,9 %** → X har høyest internrente.
- **c) LF mangler tekst.** Egen skisse (ikke LF; i tråd med LF for des 2016 oppg 1d): Metodene rangerer ulikt fordi kontantstrømmene har ulik tidsprofil/levetid, og internrentemetoden implisitt forutsetter reinvestering til internrenten, mens NV forutsetter reinvestering til avkastningskravet. Ved gjensidig utelukkende prosjekter velges høyest NV → Y, gitt forutsetningen om at prosjektene er engangsinvesteringer (ingen gjentakelse) og at 8 % er riktig krav. (Egen merknad: dersom prosjektene kan gjentas, burde man sammenligne nåverdiannuiteter: X: 126 200 / A(2, 8 %) ≈ 70 769; Y: 139 156 / A(3, 8 %) ≈ 53 997 – da er X best. LF sier ikke noe om dette, men «Presiser hvilke forutsetninger du tar» peker mot nettopp denne problemstillingen.)
- **d) LF:** Differansekontantstrøm Y − X: 0, −1 200 000, 200 000, 1 200 000. **Internrente = 9,17 %**, NV (8 %) = 12 955. Tolkning (egen, standard): IRR på differanseinvesteringen (9,17 %) > avkastningskravet (8 %) → merinvesteringen i Y er lønnsom → velg Y.
- **e) LF mangler tekst.** Utledet av LF-tallet: ja – ved avkastningskrav over 9,17 % blir NV(X) > NV(Y), og rangeringen snur.

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 4a | NV før skatt, gjensidig utelukkende prosjekter | 3 | del av 20 % | Regne |
| 4b | Internrente | 3 | del av 20 % | Regne |
| 4c | NV vs. internrente – rangeringskonflikt, forutsetninger | 3 | del av 20 % | Drøfte |
| 4d | Differanseinvestering og dens internrente | 3 | del av 20 % | Regne + forklare |
| 4e | Fisher-skjæringspunkt / avkastningskravets betydning | 3 | del av 20 % | Drøfte (kort) |

---

# EKSAMEN 3: Høst 2018 (desember 2018)

## Metadata
- Filnavn: `InvFinHaugeHøst2018.pdf` (LF: `LFInvFinHaugeDes2018.xlsx` – KUN regneark, ingen forklarende tekst)
- Termin: høst 2018 (LF-filnavnet sier des 2018).
- Emnekode/-navn: **ikke med i tekstuttrekket** («InvFin» i filnavn; formelsamlingen heter «Finansiering og investering»).
- Varighet: **ikke oppgitt i tekstuttrekket**. Tillatte hjelpemidler: **ikke oppgitt i tekstuttrekket** (samme formelsamling vedlagt som 2016/2017; her er også formel 3.7 og 6.10 lesbare, se under).
- Antall oppgaver: 4. Vekting: Oppg 1 = 25 %, Oppg 2 = 20 %, Oppg 3 = 20 %, Oppg 4 = 35 %.
- **LF er bare et regneark med tall.** Metodebeskrivelser er min tolkning av regnearklinjene (kontrollregnet). Konklusjonsspørsmål (2e, 3c, «er prosjektet lønnsomt») har ingen LF-tekst.
- Formelsamling: lik des 2016. Tillegg som er lesbart her: 3.7 (saldogruppe E–I) inneholder leddet −[SV − AM₀·(1 − a)ⁿ] · g · s / [(r_t + g) · (1 + r_t)ⁿ] (gevinst-/tapskonto); 6.10 vektstangformelen r_e = r_t + [r_t − r_g·(1 − s)] · G/E.

## Oppgave 1 (25 %)

### Oppgavetekst (ordrett)
En bedrift vurderer å sette i gang et 5-årig prosjekt. Det er budsjettert med følgende salgsvolum og salgspriser i løpet av levetiden:

| År | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Salgsvolum | 1 000 | 1 300 | 1 300 | 1 300 | 1 000 |
| Salgspris | 2 700 | 2 700 | 2 700 | 2 700 | 2 700 |

Variable enhetskostnader er 1 620 og de årlige faste kostnadene er budsjettert til 500 000. Dersom prosjektet settes i gang, vil det bli nødvendig å investere i anleggsmidler for 3 000 000. Det er anslått at anleggsmidlene kan selges for 1 000 000 ved levetidens slutt.

Investeringen vil eventuelt også med føre økt arbeidskapitalbehov. Det er anslått at arbeidskapitalen vil utgjøre 20 % av omsetningen. Avkastningskravet er 10 %.

Et moment i en deloppgave gjelder bare denne deloppgaven.

a) Beregn prosjektets nåverdi (NPV) og internrente (IRR). Er prosjektet lønnsomt?

b) Anslaget på de faste kostnadene er noe usikkert. Hvor høye kan de faste kostnadene eventuelt være, for at prosjektet skal være lønnsomt?

c) Hvor høy må salgsverdien på anleggsmidlet minst være ved levetidens slutt, for at prosjektet skal være lønnsomt?

d) Anta at et annet prosjekt har samme investeringsutgift, restverdi, salgspris, variable enhetskostnader og faste kostnader som prosjektet over. Eneste forskjellen er at salgsvolumet er konstant hvert år (annuitet), og at det ikke er kapitalbinding i arbeidskapital. Hvor mange enheter må årlig selges i dette prosjektet, for at nåverdien skal bli den samme som den du beregnet i a).

### Løsning (LF-tall fra xlsx; metode = min tolkning, kontrollregnet)

**a) LF:**

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Omsetning | | 2 700 000 | 3 510 000 | 3 510 000 | 3 510 000 | 2 700 000 |
| Variable kostnader | | −1 620 000 | −2 106 000 | −2 106 000 | −2 106 000 | −1 620 000 |
| Dekningsbidrag | | 1 080 000 | 1 404 000 | 1 404 000 | 1 404 000 | 1 080 000 |
| Faste kostnader | | −500 000 | −500 000 | −500 000 | −500 000 | −500 000 |
| Arbeidskapital | −540 000 | −162 000 | – | – | 162 000 | 540 000 |
| Anleggsmidler | −3 000 000 | | | | | 1 000 000 |
| Kontantstrøm | −3 540 000 | 418 000 | 904 000 | 904 000 | 1 066 000 | 2 120 000 |

**NPV (10 %) = 310 742. Internrente = 12,71 %.** → lønnsomt (konklusjonen følger av tallene; LF har ingen tekst).
Arbeidskapital: 20 % av NESTE års omsetning bindes året før (år 0: 20 % · 2 700 000 = 540 000; år 1: økning 20 % · 810 000 = 162 000; år 4: frigjøring 162 000; år 5: resten 540 000).

**b) LF:** Nåverdiannuitet = 310 742 / A(5, 10 %) = **81 973**. **Faste kostnader kan øke til 581 973.**

**c) LF:** Nåverdien kan falle med 310 742. Salgssummen (i år 5) kan falle med 310 742 · 1,10⁵ = **500 452** → **laveste salgssum = 499 548**.

**d) LF:**
- «Nåverdi fra år 1 til 5 må minst være» **2 689 820** (egen kontroll: = 3 000 000 − 1 000 000/1,10⁵ + 310 742 = 2 689 820, dvs. investering minus NV av restverdi pluss ønsket NPV).
- Nåverdiannuitet = 2 689 820 / A(5, 10 %) = **709 568**.
- + faste kostnader 500 000 → nødvendig årlig dekningsbidrag = **1 209 568**.
- DB pr. enhet = 2 700 − 1 620 = 1 080 → **nødvendig salg pr. år = 1 120 enheter** (1 209 568 / 1 080 = 1 119,97).
- LF-kontroll: kontantstrøm −3 000 000; 709 568 i år 1–4; 1 709 568 i år 5 → NPV = 310 742.

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 1a | Kontantstrøm / NV og internrente før skatt, arbeidskapital som % av omsetning | 2–3 | del av 25 % | Regne |
| 1b | Følsomhetsanalyse / nullpunkt (faste kostnader) via nåverdiannuitet | 7 | del av 25 % | Regne |
| 1c | Følsomhetsanalyse / nullpunkt (restverdi) | 7 | del av 25 % | Regne |
| 1d | «Baklengs» NV: nødvendig årlig volum for gitt NPV (annuitet) | 2–3 / 7 | del av 25 % | Regne |

## Oppgave 2 (20 %)

### Oppgavetekst (ordrett)
Du vurderer å ta opp et lån på 600 000. Det påløper et etableringsgebyr på 2 000 ved låneopptak, og ved hver betaling påløper et termingebyr på 100. Lånets løpetid er 5 år.

a) Anta at lånet tas opp som et annuitetslån med månedlig betaling. Nominell årsrente er 3 %. Beregn månedlig ytelse (renter og avdrag) på lånet.

b) Hva er restgjelden etter at det er betalt renter/avdrag i 2 år?

c) Hva er lånets effektive årsrente?

d) Som et alternativ kan lånet tas opp som et serielån med 3,15 % nominell rente. Renter/avdrag skal betales etterskuddsvis årlig. Løpetiden på dette lånet er også 5 år, men de 2 første årene er avdragsfrie (det betales kun renter og gebyrer). Hva er lånets effektive årsrente?

e) Hvilket lån vil du velge, serielånet eller annuitetslånet?

### Løsning (LF-tall fra xlsx; metode = min tolkning, kontrollregnet)
- **a) LF:** Månedsrente 0,25 % (3 %/12), 60 terminer. **Ytelse (renter + avdrag) = 10 781,21**; med termingebyr 100 → sum **10 881,21** per måned.
- **b) LF:** Gjenværende 3 år = 36 perioder. **Restgjeld = 370 728** (= nåverdi av 36 gjenværende ytelser à 10 781,21 ved 0,25 % = 10 781,21 · A(36, 0,25 %)). Gebyrene inngår ikke i restgjelden.
- **c) LF:** Utbetalt 598 000 (600 000 − 2 000); 60 betalinger à 10 881,21. **Månedsrente = 0,29 %** (egen kontroll: 0,2925 %), **effektiv årsrente = 3,57 %** (= 1,002925¹² − 1).
- **d) LF:** Serielån, årlige terminer, avdragsfritt i år 1–2, deretter 3 like avdrag à 200 000:

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Lån | 600 000 | | | | | |
| Gebyrer | −2 000 | −100 | −100 | −100 | −100 | −100 |
| Rente (3,15 %) | | −18 900 | −18 900 | −18 900 | −12 600 | −6 300 |
| Avdrag | | | | −200 000 | −200 000 | −200 000 |
| Kontantstrøm | 598 000 | −19 000 | −19 000 | −219 000 | −212 700 | −206 400 |

  **Effektiv årsrente = 3,26 %** (internrenten til kontantstrømmen).
- **e) LF mangler tekst.** Utledet av LF-tallene: serielånet har lavest effektiv rente (3,26 % < 3,57 %) → velg **serielånet**. (Egen merknad: en god besvarelse bør også nevne at lånene har ulik avdragsprofil/likviditetsbelastning, men effektiv rente er sammenligningsgrunnlaget.)

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 2a | Annuitetslån, månedlig terminbeløp | 10 (lån) | del av 20 % | Regne |
| 2b | Restgjeld annuitetslån | 10 | del av 20 % | Regne |
| 2c | Effektiv rente med gebyrer (månedlig → årlig) | 10 | del av 20 % | Regne |
| 2d | Serielån med avdragsfri periode, effektiv rente | 10 | del av 20 % | Regne |
| 2e | Valg mellom lån (sammenligne effektiv rente) | 10 | del av 20 % | Kort vurdering |

## Oppgave 3 (20 %)

### Oppgavetekst (ordrett)
En bedrift vurderer å kjøpe en maskin som koster 440 000 i anskaffelse. Maskinens innbetalinger, utbetalinger og salgsverdi er budsjettert til:

| År | Innbetalinger | Utbetalinger | Salgsverdi |
|---|---|---|---|
| 1 | 400 000 | 200 000 | 240 000 |
| 2 | 380 000 | 220 000 | 190 000 |
| 3 | 360 000 | 240 000 | 140 000 |
| 4 | 340 000 | 260 000 | 90 000 |
| 5 | 320 000 | 280 000 | 40 000 |

a) Beregn maskinens økonomiske levetid under forutsetning av at maskinen ikke skal gjenanskaffes. Avkastningskravet settes til 10 %.

b) Beregn maskinens økonomiske levetid under forutsetning av at maskinen skal gjenanskaffes i all framtid.

c) Er investeringen lønnsom?

### Løsning (LF-tall fra xlsx)
Netto drift: år 1 = 200 000, år 2 = 160 000, år 3 = 120 000, år 4 = 80 000, år 5 = 40 000. Siste år = drift + salgsverdi.

| Levetid | År 0 | År 1 | År 2 | År 3 | År 4 | År 5 | NPV | Annuitet |
|---|---|---|---|---|---|---|---|---|
| 1 år | −440 000 | 440 000 | | | | | −40 000 | −44 000 |
| 2 år | −440 000 | 200 000 | 350 000 | | | | 31 074 | 17 905 |
| 3 år | −440 000 | 200 000 | 160 000 | 260 000 | | | 69 391 | 27 903 |
| 4 år | −440 000 | 200 000 | 160 000 | 120 000 | 170 000 | | 80 320 | 25 339 |
| 5 år | −440 000 | 200 000 | 160 000 | 120 000 | 80 000 | 80 000 | 68 522 | 18 076 |

- **a) (utledet av LF-tabellen):** Uten gjenanskaffelse → maks NPV → **4 år** (NPV 80 320).
- **b) (utledet av LF-tabellen):** Gjenanskaffelse i all framtid → maks annuitet → **3 år** (annuitet 27 903).
- **c) LF mangler tekst.** Utledet: ja, investeringen er lønnsom – NPV er positiv ved optimal levetid (80 320 som engangsinvestering; positiv annuitet 27 903 per år i kjede, tilsvarende NV = 27 903 / 0,10 = 279 030 for evig kjede – sistnevnte tall er egen utregning).

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 3a | Optimal økonomisk levetid – engangsinvestering | 5 | del av 20 % | Regne |
| 3b | Optimal levetid – investeringskjede (nåverdiannuitet) | 5 | del av 20 % | Regne |
| 3c | Lønnsomhetsvurdering | 5 / 3 | del av 20 % | Kort vurdering |

## Oppgave 4 (35 %)

### Oppgavetekst (ordrett)
AS TrillFa er et børsnotert selskap som produserer ulike redskaper. Man vurderer nå å ta et nytt produkt opp i sortimentet, nemlig trillebårer. Hvis man bestemmer seg for å produsere trillebårer, må man anskaffe produksjonsmaskiner for 10 000 000. Det vil også påløpe installasjonskostnader og frakt på 1 000 000. Installasjonskostnaden balanseføres (aktiveres) sammen med maskinen.

Maskinen vil ha en levetid på 5 år og vil avskrives etter saldometoden med 20 % årlig. Det er budsjettert med en salgsinntekt på 12 000 000 årlig. Dekningsgraden er 45 %, og det er antatt at de betalbare faste driftskostnadene blir 1 000 000 årlig.

Dersom den nye maskinen kjøpes, vil lageret av materialer måtte økes med 1 000 000. Kundefordringene vil øke med 750 000, mens leverandørgjelden vil øke med 500 000.

Hvis den nye maskinen anskaffes, vil man måtte ta i bruk et lokale, som for tiden er utleid for en leie på 500 000 årlig. Maskinen vil kreve en stor overhaling etter 3 år. Dette er beregnet å koste 750 000.

En mekaniker som arbeider i bedriften, vil få ansvaret for å føre tilsyn med produksjonen. Lønnen hennes er 500 000 pr. år. Det må eventuelt ansettes en erstatning for henne, til de samme lønnsbetingelser. Disse kostnadene er ikke inkludert i de øvrige kostnadene referert til foran.

Bedriften kan låne penger til en rente på 4 % før skatt. Risikofri rente er 3 % før skatt, og bedriftens egenkapitalbeta (aksjebeta) er 1,65. Avkastningen på markedsporteføljen er 8 %. Bedriften finansierer sine prosjekter med en egenkapitalandel på 60 %. Skattesatsen er 22 %.

a) Beregn prosjektets veide avkastningskrav (WACC) etter skatt. Rund gjerne av til nærmeste hele prosent.

b) Beregn prosjektets nåverdi etter skatt. Er prosjektet lønnsomt

### Løsning (LF-tall fra xlsx; metode = min tolkning, kontrollregnet)

**a) LF:** Egenkapitalkostnad = **11,25 %**; lånerente etter skatt = 4 % · (1 − 0,22) = **3,12 %**; **WACC = 8,00 %** (avrundet 8 %).
Egen kontroll: 11,25 % = 0,03 + 1,65 · (0,08 − 0,03), dvs. **KVM UTEN skattejustering av risikofri rente (formel 6.1)**. WACC = 0,1125 · 0,60 + 0,0312 · 0,40 = 0,0675 + 0,01248 = 0,07998.
**NB – inkonsistens mellom årene:** I des 2016 og mars 2017 bruker LF KVM MED skatt (formel 6.2: r_f·(1 − s)). Med formel 6.2 ville 2018-tallene gitt r_e = 0,0234 + 1,65·0,0566 = 11,68 % og WACC = 8,26 % (egen utregning) – avrundet fortsatt 8 %.

**b) LF:** Beregningsgrunnlag ved 8 %:

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Økte inntekter | | 12 000 000 | 12 000 000 | 12 000 000 | 12 000 000 | 12 000 000 |
| Variable kostnader (55 %) | | −6 600 000 | −6 600 000 | −6 600 000 | −6 600 000 | −6 600 000 |
| Faste kostnader | | −1 000 000 | −1 000 000 | −1 000 000 | −1 000 000 | −1 000 000 |
| Tapt leie | | −500 000 | −500 000 | −500 000 | −500 000 | −500 000 |
| Mekaniker | | −500 000 | −500 000 | −500 000 | −500 000 | −500 000 |
| Vedlikehold (overhaling) | | | | −750 000 | | |
| Resultat før skatt | | 3 400 000 | 3 400 000 | 2 650 000 | 3 400 000 | 3 400 000 |
| Skatt (22 %) | | −748 000 | −748 000 | −583 000 | −748 000 | −748 000 |
| Maskiner og utstyr | −11 000 000 | | | | | |
| NV spart skatt avskr. | 1 728 571 | | | | | |
| Arbeidskapital | −1 250 000 | | | | | 1 250 000 |
| Beregningsgrunnlag | −10 521 429 | 2 652 000 | 2 652 000 | 2 067 000 | 2 652 000 | 3 902 000 |

**NPV etter skatt = 453 576** → lønnsomt (konklusjon følger av tallet; LF har ingen tekst).

Metode / nøkkelpunkter:
- Avskrivningsgrunnlag = 10 000 000 + 1 000 000 (installasjon/frakt aktiveres) = 11 000 000.
- NV spart skatt av saldoavskrivninger = 11 000 000 · 0,20 · 0,22 / (0,08 + 0,20) = **1 728 571**. Ingen restverdi oppgitt → ingen salgskorreksjon.
- Arbeidskapital = lager 1 000 000 + kundefordringer 750 000 − leverandørgjeld 500 000 = **1 250 000**, bindes i år 0 og frigjøres i år 5.
- Tapt leieinntekt 500 000 = alternativkostnad (med, og skattlegges).
- Mekaniker: merkostnaden er lønn til erstatteren, 500 000 pr. år.
- Overhaling 750 000 i år 3 kostnadsføres direkte (fradrag i år 3).
- «Resultat før skatt» er her driftskontantstrøm før skatt (uten avskrivninger); avskrivningseffekten ligger i NV-leddet i år 0.

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 4a | WACC / KVM | 8–9 | del av 35 % | Regne |
| 4b | NV etter skatt med saldoavskrivning, arbeidskapital (lager/kunder/leverandører), alternativkostnad, relevante kontantstrømmer | 2 + 4 | del av 35 % | Regne (+ kort konklusjon) |

---

# EKSAMEN 4: Høst 2019 (desember 2019)

## Metadata
- Filnavn: `InvFinHaugeH2019.pdf` (LF: `LFInvFinHaugeDes2019.xlsx` – KUN regneark, nesten ingen tekst)
- Termin: høst 2019 (LF-filnavnet sier des 2019).
- Emnekode/-navn: **ikke med i tekstuttrekket** («InvFin» i filnavn; formelsamlingen heter «Finansiering og investering»).
- Varighet: **ikke oppgitt i tekstuttrekket**. Tillatte hjelpemidler: **ikke oppgitt i tekstuttrekket** (samme formelsamling vedlagt som tidligere år).
- Antall oppgaver: 3. Vekting: Oppg 1 = 25 %, Oppg 2 = 35 %, Oppg 3 = 40 %.
- **LF er et regneark med tall** og to korte tekstlinjer (oppg 1). Metodebeskrivelser er min tolkning (kontrollregnet).
- **NB: LF for oppgave 3 bruker andre inngangstall enn eksamensteksten** (beta 1,65 i LF mot 1,61 i oppgaven; lånerente 4,04 % i LF mot 4 % i oppgaven). Se detaljer under oppgave 3.

## Oppgave 1 (25 %)

### Oppgavetekst (ordrett)
Selskapet Fish Farming A/S vurderer for øyeblikket to prosjekter. Et prosjekt er innen havbruk og et er innen skjelldyrking. Selskapet har fått konsesjon for enten oppdrett av blåskjell eller oppdrett av sjøørret i Oslofjorden i 4 år og vurderer nå hvilket av disse to prosjektene som bør startes. Avkastningskravet er 10 % for begge prosjektene.

Blåskjellprosjektet krever en investering på 22 millioner kroner i nødvendig utstyr for oppdrett av blåskjell og forventes å generere en årlig kontantstrøm på 13 millioner kroner i år 1 til 4. Imidlertid er selskapet pålagt i konsesjonsvilkårene å gjennomføre opprydding og fjerning av alt utstyr i løpet av siste driftsår (år 4). Opprydding og fjerning av utstyret er beregnet til å koste 10 millioner kroner etter at man har tatt hensyn til salg av gjenværende anvendbart anleggsutstyr.

Ørretprosjektet krever en investering på 12 millioner kroner i nødvendig utstyr for oppdrett av sjøørret og forventes å generere en årlig kontantstrøm på 7 millioner kroner i år 1 til 4. Som for blåskjell er selskapet pålagt i konsesjonsvilkårene å gjennomføre opprydding og fjerning av alt utstyr i løpet av siste driftsår (år 4). Opprydding og fjerning av utstyret er beregnet til å koste 2 millioner kroner etter at man har tatt hensyn til salg av gjenværende anvendbart anleggsutstyr.

a) Sett opp kontantstrømmene for begge prosjektene.

b) Beregn nåverdier og internrenter for prosjektene.

c) Bruk dine egne ord og bruk gjerne mer utførlige analyser, og innstill overfor ledelsen i Hauge Fish Farming A/S hvilken beslutning de bør gjennomføre på basis av det du har lært ved Hauge School of Management. Metodene (nåverdi og internrente) som brukes i analysene under b) ovenfor, må gi identisk svar ved løsning av oppgaven!

d) Hvilket avkastningskrav ville gitt identisk nåverdi for de to prosjektene?

### Løsning (LF-tall fra xlsx)

**a) LF:**

| År | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Blåskjellfarm (investering) | −22 000 000 | | | | |
| Opprydding og fjerning | | | | | −10 000 000 |
| Kontantstrøm fra drift | | 13 000 000 | 13 000 000 | 13 000 000 | 13 000 000 |
| **Kontantstrøm blåskjell** | −22 000 000 | 13 000 000 | 13 000 000 | 13 000 000 | 3 000 000 |

| År | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Sjøørret (investering) | −12 000 000 | | | | |
| Opprydding og fjerning | | | | | −2 000 000 |
| Kontantstrøm fra drift | | 7 000 000 | 7 000 000 | 7 000 000 | 7 000 000 |
| **Kontantstrøm sjøørret** | −12 000 000 | 7 000 000 | 7 000 000 | 7 000 000 | 5 000 000 |

**b) LF:** Blåskjell: **NV = 12 378 116**, **IRR = 38,07 %**. Sjøørret: **NV = 8 823 031**, **IRR = 42,45 %**.

**c) LF:** Rangeringskonflikt (NV → blåskjell, IRR → sjøørret). Løses med differanseinvestering (blåskjell − sjøørret):

| År | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Blåskjellfarm | −22 000 000 | 13 000 000 | 13 000 000 | 13 000 000 | 3 000 000 |
| Sjøørret | −12 000 000 | 7 000 000 | 7 000 000 | 7 000 000 | 5 000 000 |
| Differanseinvestering | −10 000 000 | 6 000 000 | 6 000 000 | 6 000 000 | −2 000 000 |

**Internrente differanseinvestering = 31,52 %.** LF-tekst: «Velger det største (Blåskjell) siden IRR på differanseinvestering > avkastningskrav». (Egen kontroll: NV av differansen ved 10 % = 3 555 085 = 12 378 116 − 8 823 031.)

**d) LF:** «Lik NV ved avk krav 31,52 %».

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 1a | Sette opp kontantstrøm (inkl. oppryddingskostnad) | 2 | del av 25 % | Regne |
| 1b | NV og internrente før skatt | 3 | del av 25 % | Regne |
| 1c | Gjensidig utelukkende prosjekter, NV vs. IRR, differanseinvestering | 3 | del av 25 % | Regne + drøfte |
| 1d | Fisher-skjæringspunkt | 3 | del av 25 % | Regne |

## Oppgave 2 (35 %)

### Oppgavetekst (ordrett)
a) En bank tilbyr lån med en nominell rente på 4 % p.a. Tilbakebetalingstiden er 4 år, etableringsgebyret er 1 200 og termingebyret er 100 (ikke termingebyr for alternativet med avdragsfritt lån under). Beregn effektiv rente for et lån på 1 000 000 for følgende tre varianter av lånet:

- Serielån, tilbakebetales med etterskuddsvise, årlige betalinger
- Avdragsfritt lån, hvor lånebeløpet tilbakebetales i sin helhet etter 4 år uten belastning av termingebyrer. Årlige rentebetalinger.
- Annuitetslån med etterskuddsvise, månedlige betalinger

b) Ta for deg alternativet med annuitetslånet over. Hva er restgjeld når det gjenstår 1 år av tilbakebetalingstiden?

c) Anta nå at annuitetslånet ble tatt opp som et fastrentelån med nominell årsrente 4 %. Da det gjenstår 1 år av tilbakebetalingstiden, faller rente på tilsvarende lån til 3,5 %. Hva blir underkurs eller overkurs på lånet?

d) En bedrift har en kassekredittavtale med en bevilgningsramme (limit) på 1 000 000 med en gjennomsnittlig utnyttelsesgrad på 50 %. Limitprovisjonen er 0,30 % pr. kvartal og renten er 7,0 % p.a. av trukket beløp. Dersom det er trukket mer enn 60 %, påløper en tilleggsrente på 2 % p.a. på det overskytende beløp. Beregn effektiv rente år. år ved en utnyttelsesgrad på henholdsvis 40 %, 50 % og 80 %.

(«år. år» er skrivefeil i oppgaven for «pr. år».)

### Løsning (LF-tall fra xlsx; metode = min tolkning, kontrollregnet)

**a) LF – Serielån:**

| År | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Lån | 1 000 000 | | | | |
| Avdrag | | −250 000 | −250 000 | −250 000 | −250 000 |
| Renter | | −40 000 | −30 000 | −20 000 | −10 000 |
| Gebyrer | −1 200 | −100 | −100 | −100 | −100 |
| Kontantstrøm | 998 800 | −290 100 | −280 100 | −270 100 | −260 100 |

**Effektiv årsrente = 4,07 %.**

**a) LF – Avdragsfritt lån (ingen termingebyr):**

| År | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| Lån | 1 000 000 | | | | −1 000 000 |
| Renter | | −40 000 | −40 000 | −40 000 | −40 000 |
| Gebyrer | −1 200 | | | | |
| Kontantstrøm | 998 800 | −40 000 | −40 000 | −40 000 | −1 040 000 |

**Effektiv årsrente = 4,03 %.**

**a) LF – Annuitetslån, månedlig:** Utbetalt 998 800. Månedsrente 0,3333 % (4 %/12), 48 perioder. Renter og avdrag = **22 579** per måned; + termingebyr 100 = **22 679**. **Effektiv månedsrente = 0,3570 %** → **effektiv årsrente = 4,369 %** (= 1,003570¹² − 1).

**b) LF: Restgjeld når 1 år gjenstår = 265 168** (= NV av 12 gjenværende ytelser à 22 579 ved 0,3333 % per måned).

**c) LF:** Ny årsrente 3,50 % → ny månedsrente 0,29 % (3,5 %/12 = 0,2917 %). 12 gjenstående betalinger. Nåverdi av gjenværende betalinger (à 22 579) til ny rente = **265 881**. Restgjeld = 265 168. **Overkurs = 713.** (Renten har falt → lånets markedsverdi er høyere enn restgjelden → overkurs som låntaker må betale ved innfrielse.)

**d) LF – Kassekreditt (regnet per kvartal):**

| Utnyttelse | 40 % | 50 % | 80 % |
|---|---|---|---|
| Lån (trukket) | 400 000 | 500 000 | 800 000 |
| Rente (7 %/4) | 7 000 | 8 750 | 10 500 |
| Limitprovisjon (0,30 % · 1 000 000) | 3 000 | 3 000 | 3 000 |
| Tilleggsrente | 0 | 0 | 4 500 |
| Sum betalt per kvartal | 10 000 | 11 750 | 18 000 |
| Kvartalsrente (sum / trukket) | 2,50 % | 2,35 % | 2,25 % |
| **Effektiv årsrente** ((1 + q)⁴ − 1) | **10,38 %** | **9,74 %** | **9,31 %** |

Merknad om 80 %-kolonnen (egen tolkning av LF-tallene): LF regner 7 %/4 på de første 600 000 (= 10 500) og «rente med 2 % tilleggsrente» = 9 %/4 på de overskytende 200 000 (= 4 500). Linjen «Tilleggsrente 4 500» er altså HELE renten (9 %) på det overskytende beløpet, ikke bare tillegget på 2 %. Totalt 15 000 i rente + 3 000 provisjon = 18 000, som er korrekt total.

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 2a | Effektiv rente: serielån, avdragsfritt lån, annuitetslån (månedlig) med gebyrer | 10 (lån) | del av 35 % | Regne |
| 2b | Restgjeld annuitetslån | 10 | del av 35 % | Regne |
| 2c | Fastrentelån – over-/underkurs ved renteendring | 10 | del av 35 % | Regne |
| 2d | Kassekreditt – effektiv rente med limitprovisjon og tilleggsrente | 10 (kortsiktig finansiering) | del av 35 % | Regne |

## Oppgave 3 (40 %)

### Oppgavetekst (ordrett)
AS Tullin er et børsnotert selskap. Man vurdere nå å lansere et nytt produkt. Selskapets ledelse har vurdert det slik at det er marked for produktet i 5 år, og det er budsjettert med følgende salgspris, salgsvolum og dekningsgrad gjennom prosjektets levetid:

| | |
|---|---|
| Salgspris pr. enhet | 1 100 |
| Salgsmengde år 1 til år 3 | 5 000 |
| Salgsmengde år 4 til år 5 | 5 500 |
| Dekningsgrad | 60 % |

Dersom dette produktet lanseres, må man ta i bruk et lokale som i dag er utleid for 800 000 årlig. På grunn av større arealbruk øker også bedriftens faste kostnader. Faste kostnader i dag er 500 000 årlig, og man antar at disse kostnadene vil øke til 1 000 000 årlig dersom produktet lanseres.

Prosjektet vil også bli belastet med indirekte kostnader på 500 000 årlig. Av disse kostnadene kan 25 % tilskrives prosjektet direkte, mens den øvrige andelen er fordelte kostnader fra hovedkontoret.

Dersom prosjektet starter, må man anskaffe anleggsmidler for 6 000 000. Anleggsmidlene avskrives med 20 % årlig, og man regner med at anleggsmidlene ikke vil ha noen salgsverdi ved levetidens slutt. Prosjektet vil også medføre økt kapitalbehov til arbeidskapital. Det er anslått at arbeidskapitalen vil utgjøre 15 % av omsetningen.

Bedriften finansierer sine prosjektet slik at forholdet mellom gjeld og egenkapital er 1/1. Risikofri rente er 2,55 % mens bedriften kan låne penger til en rente på 4 %. Avkastning på markedsporteføljen er 10 % og markedsporteføljens standardavvik er 0,22 eller 22 %. Bedriftens aksjebeta er 1,61 og skattesatsen er 22 %.

a) Beregn bedriftens veide totalavkastningskrav, WACC. Rund gjerne av til nærmeste hele prosent.

b) Beregn nåverdi etter skatt. Er prosjektet lønnsomt?

c) Hva er kovariansen mellom AS Tullin sin aksjeavkastning og markedsporteføljens avkastning?

### Løsning (LF-tall fra xlsx; metode = min tolkning, kontrollregnet)

**a) LF (med LF sine inngangstall: beta 1,65, lånerente 4,04 %, EK-andel 50 %):** Egenkapitalkostnad = **14,84 %**, **WACC = 9,00 %** (avrundet 9 %).
Egen kontroll av LF: r_e = 0,0255 + 1,65 · (0,10 − 0,0255) = 0,148425 (KVM UTEN skattejustering, formel 6.1). WACC = 0,148425 · 0,5 + 0,0404 · (1 − 0,22) · 0,5 = 0,0742 + 0,0158 = 0,08997 ≈ 9,00 %.
**Med eksamenstekstens tall (beta 1,61, lånerente 4 %) – egen utregning, ikke LF:** r_e = 0,0255 + 1,61 · 0,0745 = 14,54 %; WACC = 0,1454 · 0,5 + 0,04 · 0,78 · 0,5 = 0,0727 + 0,0156 = **8,83 % ≈ 9 %**. Avrundet WACC blir 9 % uansett, så b) påvirkes ikke.

**b) LF:** Beregningsgrunnlag ved 9 %:

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Omsetning | | 5 500 000 | 5 500 000 | 5 500 000 | 6 050 000 | 6 050 000 |
| Variable kostnader (40 %) | | −2 200 000 | −2 200 000 | −2 200 000 | −2 420 000 | −2 420 000 |
| Faste kostnader (økning) | | −500 000 | −500 000 | −500 000 | −500 000 | −500 000 |
| Tapt leie | | −800 000 | −800 000 | −800 000 | −800 000 | −800 000 |
| Indirekte kostnader (25 %) | | −125 000 | −125 000 | −125 000 | −125 000 | −125 000 |
| Resultat før skatt | | 1 875 000 | 1 875 000 | 1 875 000 | 2 205 000 | 2 205 000 |
| Skatt (22 %) | | −412 500 | −412 500 | −412 500 | −485 100 | −485 100 |
| Anleggsmidler | −6 000 000 | | | | | |
| NV spart skatt | 910 345 | | | | | |
| Arbeidskapital | −825 000 | | | −82 500 | | 907 500 |
| Beregningsgrunnlag | −5 914 655 | 1 462 500 | 1 462 500 | 1 380 000 | 1 719 900 | 2 627 400 |

**Nåverdi etter skatt = 649 708** → lønnsomt (konklusjon følger av tallet; LF har ingen tekst).

Metode / nøkkelpunkter:
- Faste kostnader: kun økningen 500 000 (fra 500 000 til 1 000 000).
- Tapt leie 800 000 = alternativkostnad (skattlegges).
- Indirekte kostnader: kun 25 % · 500 000 = 125 000 er relevant; resten er fordelte hovedkontorkostnader.
- NV spart skatt = 6 000 000 · 0,20 · 0,22 / (0,09 + 0,20) = **910 345**. Ingen salgsverdi → ingen salgskorreksjon.
- Arbeidskapital = 15 % av (neste års) omsetning: år 0: 15 % · 5 500 000 = 825 000; år 3: økning 15 % · 550 000 = 82 500; år 5: frigjøring 907 500.

**c) LF (med beta 1,65):** Varians markedsportefølje = 0,22² = 0,0484. **Kovarians = beta · varians = 1,65 · 0,0484 = 0,07986** (formel 6.4: β = cov/var ⇒ cov = β · σ²_m).
**Med eksamenstekstens beta 1,61 (egen utregning, ikke LF):** kovarians = 1,61 · 0,0484 = **0,07792**.

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 3a | WACC / KVM | 8–9 | del av 40 % | Regne |
| 3b | NV etter skatt med saldoavskrivning, arbeidskapital, alternativkostnad, relevante kostnader | 2 + 4 | del av 40 % | Regne (+ kort konklusjon) |
| 3c | Beta/kovarians (β = cov/var) | 8 (KVM/portefølje) | del av 40 % | Regne |

---

# EKSAMEN 5: Desember 2020

## Metadata
- Filnavn: `InvFinHaugeDes2020.pdf` (LF: `LFInvFinHaugeDes2020.xlsx` – regneark med tall og noen korte tekstkommentarer i oppg 3)
- Termin: desember 2020.
- Emnekode/-navn: **ikke med i tekstuttrekket** («InvFin» i filnavn).
- Varighet: **ikke oppgitt i tekstuttrekket**. Tillatte hjelpemidler: **ikke oppgitt i tekstuttrekket**. (Ingen formelsamling i uttrekket denne gangen – mulig hjemmeeksamen pga. korona, men det står ikke.)
- Antall oppgaver: 4. Vekting: Oppg 1 = 25 %, Oppg 2 = 20 %, Oppg 3 = 25 %, Oppg 4 = 30 %.
- Metodebeskrivelser er min tolkning av regnearklinjene (kontrollregnet) der LF ikke har tekst.

## Oppgave 1 (25 %)

### Oppgavetekst (ordrett)
En bedrift vurderer for tiden to gjensidig utelukkende prosjekter, som vi kan kalle prosjekt A og B. Kontantstrømmen fra driften for prosjektene er gitt i oppstillingen under:

| År | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Prosjekt A | −6 500 | 2 000 | 2 500 | 2 900 |
| Prosjekt B | −3 500 | 2 000 | 1 000 | 1 000 |

Ved utgangen av år 3 har anleggsmidlene i prosjekt A en utrangeringsverdi på 2 000, mens de i prosjekt B har en utrangeringsverdi på 1 000. Disse verdiene er ikke tatt med i kontantstrømoppstillingen over. Avkastningskravet er 15 %.

a) Beregn nåverdi og internrente for begge prosjektene. Hvilket prosjekt vil du anbefale bli gjennomført?

b) Hvilket avkastningskrav ville gitt prosjektene samme nåverdi?

c) Hva måtte utrangeringsverdien for anleggsmidlet i prosjekt B være, for at nåverdien skal være den samme som i prosjekt A?

d) Ta for deg prosjekt A. Anta nå at den årlige kontantstrømmen fra driften i år 1 til 3 i oppstillingen over skal være en annuitet. Hva må det årlige beløpet være, for at nåverdien skal være den samme som du fikk i a). Ta også hensyn til utrangeringsverdien på anleggsmidlet når det selges i slutten av år 3.

### Løsning (LF-tall fra xlsx; metode = min tolkning, kontrollregnet)

**a) LF:** Kontantstrøm inkl. utrangeringsverdi i år 3:

| År | 0 | 1 | 2 | 3 | NNV (15 %) | IR |
|---|---|---|---|---|---|---|
| Prosjekt A | −6 500 | 2 000 | 2 500 | 4 900 | 351,32 | 17,77 % |
| Prosjekt B | −3 500 | 2 000 | 1 000 | 2 000 | 310,31 | 20,34 % |

**NV(A) = 351,32, IRR(A) = 17,77 %. NV(B) = 310,31, IRR(B) = 20,34 %.** Anbefaling (utledet; LF har ikke tekst her, men differanseinvesteringen under viser det): **A** – høyest NV, og IRR på differanseinvesteringen (15,6 %) > kravet (15 %).

**b) LF:** Differanseinvestering A − B: −3 000, 0, 1 500, 2 900 → **internrente = 15,6 %** (egen kontroll: 15,596 %). Ved dette avkastningskravet har prosjektene samme NV.

**c) LF:** Nåverdien (av B) må øke med 351,32 − 310,31 = **41,01**. Salgssummen i år 3 må øke med 41,01 · 1,15³ = **62,38** → nødvendig utrangeringsverdi B = **1 062,38**. (LF kaller linjen «Laveste salgssum».)

**d) LF:** «Nåverdi CF år 1 til 3 for A» = **5 536,29** (egen kontroll: = 6 500 + 351,32 − 2 000/1,15³, dvs. NV av driftskontantstrømmene alene). Annuitet = 5 536,29 / A(3, 15 %) = **2 424,77** per år. LF-kontroll: −6 500; 2 425; 2 425; 4 425 (= 2 425 + 2 000) → NPV = 351,32.

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 1a | NV og internrente før skatt, gjensidig utelukkende prosjekter | 3 | del av 25 % | Regne + kort anbefaling |
| 1b | Differanseinvestering / Fisher-skjæringspunkt | 3 | del av 25 % | Regne |
| 1c | Nullpunkt/«baklengs» NV: nødvendig utrangeringsverdi | 3 / 7 | del av 25 % | Regne |
| 1d | Ekvivalent annuitet for gitt NV | 2–3 | del av 25 % | Regne |

## Oppgave 2 (20 %)

### Oppgavetekst (ordrett)
En bedrift vurderer å starte et nytt prosjekt. Maskinen koster 750 000 i innkjøp og det påløper også monteringskostnader på 50 000. Markedsavdelingen mener at prosjektet vil gi følgende netto kontantstrøm:

| År | Netto kontantstrøm |
|---|---|
| År 1 | 600 000 |
| År 2 | 650 000 |
| År 3 | 600 000 |
| År 4 | 300 000 |
| År 5 | 150 000 |

Leverandøren av maskinen har gitt følgende anslag for salgsverdi (utrangeringsverdi) av maskinen for ulike år:

| År | Salgsverdi |
|---|---|
| År 1 | 550 000 |
| År 2 | 450 000 |
| År 3 | 350 000 |
| År 4 | 200 000 |
| År 5 | 50 000 |

Man vil bruke et avkastningskrav på 10 % på dette prosjektet.

a) Hva blir den økonomisk optimale levetiden dersom prosjektet er en engangsinvestering?

b) Anta nå at maskinen skal skiftes ut med en tilsvarende maskin i all fremtid. Hva blir den optimale utskiftingsfrekvensen?

### Løsning (LF-tall fra xlsx)
Investering = 750 000 + 50 000 = 800 000. Siste års kontantstrøm = netto kontantstrøm + salgsverdi.

| Levetid | År 0 | År 1 | År 2 | År 3 | År 4 | År 5 | NNV | Annuitet |
|---|---|---|---|---|---|---|---|---|
| 1 år | −800 000 | 1 150 000 | | | | | 245 455 | 270 000 |
| 2 år | −800 000 | 600 000 | 1 100 000 | | | | 654 545 | 377 143 |
| 3 år | −800 000 | 600 000 | 650 000 | 950 000 | | | 996 394 | 400 665 |
| 4 år | −800 000 | 600 000 | 650 000 | 600 000 | 500 000 | | 1 074 940 | 339 112 |
| 5 år | −800 000 | 600 000 | 650 000 | 600 000 | 300 000 | 200 000 | 1 062 522 | 280 291 |

- **a) (utledet av LF-tabellen):** Engangsinvestering → maks NV → **4 år** (NV 1 074 940).
- **b) (utledet av LF-tabellen):** Utskifting i all fremtid → maks nåverdiannuitet → **hvert 3. år** (annuitet 400 665).

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 2a | Optimal økonomisk levetid – engangsinvestering | 5 | del av 20 % | Regne |
| 2b | Optimal utskiftingsfrekvens – investeringskjede (nåverdiannuitet) | 5 | del av 20 % | Regne |

## Oppgave 3 (25 %)

### Oppgavetekst (ordrett)
En investor vurderer 3 aksjer, som vi kan kalle for aksje A, B og C. Avkastningen avhenger av den generelle økonomiske tilstanden, som vi kan kalle tilstand 1, 2 og 3, og er vist i tabellen under. Sannsynlighetene gjelder også betinget sannsynlighet, dvs. at ulike aksjer gir en gitt avkastning samtidig. Gjør rede for hvilke forutsetninger du gjør i analysen og om du eventuelt foretar forenklinger.

| | Sannsynlighet | Aksje A | Aksje B | Aksje C |
|---|---|---|---|---|
| Tilstand 1 | 0,30 | 10 % | 10 % | 10 % |
| Tilstand 2 | 0,40 | 15 % | 15 % | 7,5 % |
| Tilstand 3 | 0,30 | 10 % | 10 % | 20 % |

a) Beregn forventet avkastning og avkastningens standardavvik for aksje A, B og C.

b) Anta at investoren må velge en av aksjene. Hvilken vil du anbefale?

c) Beregn kovarians og korrelasjonskoeffisient mellom aksje A og B, A og C samt B og C.

d) Du forklarer investoren at det ikke er lurt å legge alle eggene i en kurv og at man bør eie flere aksjer samtidig. Anta nå at det kun er aktuelt med en portefølje bestående av to aksjer og at andelen til hver aksje skal være 0,50. Hvilken portefølje vil du foreslå? Begrunn svaret med relevante beregninger.

### Løsning (LF fra xlsx, inkl. LF sine tekstkommentarer)

**a) LF:**

| | Aksje A | Aksje B | Aksje C |
|---|---|---|---|
| Forventet avkastning | 12,00 % | 12,00 % | 12,00 % |
| Varians | 0,00060 | 0,00060 | 0,00285 |
| Standardavvik | 2,45 % | 2,45 % | 5,34 % |

Egen kontroll: E(A) = 0,3·10 + 0,4·15 + 0,3·10 = 12 %. Var(A) = 0,3·(−2)² + 0,4·3² + 0,3·(−2)² = 6 (%²) = 0,0006. E(C) = 3 + 3 + 6 = 12 %. Var(C) = 0,3·(−2)² + 0,4·(−4,5)² + 0,3·8² = 1,2 + 8,1 + 19,2 = 28,5 (%²) = 0,00285. Stemmer.

**b) LF:** «Forventet avkastning er identisk. A og B er likeverdige, men foretrekkes framfor C pga. lavere standardavvik.»

**c) LF:** «Vi ser med en gang av korrelasjonen mellom A og B er 1 (avkastning er identisk) men man [kan] beregne om man ønsker:»
- Kovarians AB = **0,0006**; korrelasjon AB = **1,0000**
- Kovarians AC og BC = **−0,0009**; korrelasjon AC og BC = **−0,6882**

Egen kontroll: cov(A,C) = 0,3·(−2)(−2) + 0,4·(3)(−4,5) + 0,3·(−2)(8) = 1,2 − 5,4 − 4,8 = −9 (%²) = −0,0009. ρ = −0,0009 / (0,02449 · 0,05339) = −0,688. Stemmer.

**d) LF:** Andeler 0,50/0,50, kun to aksjer i porteføljen:

| Portefølje | A + B | A + C | B + C |
|---|---|---|---|
| Forventet avkastning | 12,00 % | 12,00 % | 12,00 % |
| Varians | 0,0006 | 0,0004 | 0,0004 |
| Standardavvik | 2,45 % | 2,03 % | 2,03 % |

(Egen kontroll: Var(A+C) = 0,25·0,0006 + 0,25·0,00285 + 2·0,25·(−0,0009) = 0,0004125 → σ = 2,03 %.)
LF-tekst: «A og B trenger strengt tatt ikke beregnes siden avkastning og standardavvik blir som å eie A eller B alene. Det er tilstrekkelig også å beregne enten A + C eller B + C, siden resultatene blir identisk. Det er fornuftig ikke å eie A og B i en portefølje fordi de er perfekt positivt korrelert, og aksje C bør heller inkluderes i porteføljen.» → **Foreslå A + C (eller B + C).**

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 3a | Forventet avkastning og standardavvik, enkeltaksjer | 7–8 | del av 25 % | Regne |
| 3b | Valg mellom aksjer (forventning–varians-kriteriet) | 8 | del av 25 % | Kort vurdering |
| 3c | Kovarians og korrelasjonskoeffisient | 8 | del av 25 % | Regne |
| 3d | Portefølje av to aksjer, diversifisering | 8 | del av 25 % | Regne + drøfte |

## Oppgave 4 (30 %)

### Oppgavetekst (ordrett)
En bedrift vurderer å lansere et nytt produkt. Man har gjennomført en markedsanalyse som indikerer at det er marked for produktet. Man har en kontrakt med markedsanalyse-selskapet om at undersøkelsen skal kose 300 000, men man har ikke mottatt faktura enda. Man antar at det er marked for produktet i 5 år. Det er budsjettert med følgende salgspris, salgsvolum og dekningsgrad gjennom prosjektets levetid:

| | |
|---|---|
| Salgspris pr. enhet | 1 500 |
| Salgsmengde år 1 til år 3 | 4 000 |
| Salgsmengde år 4 til år 5 | 4 500 |
| Dekningsgrad | 70 % |

Det er anslått at de betalbare faste kostnadene vil være 1 000 000 høyere årlig enn de er nå. Prosjektet vil også bli belastet med indirekte kostnader på 1 000 000 årlig. Av disse kostnadene kan 50 % tilskrives prosjektet direkte, mens den øvrige andelen er fordelte kostnader fra hovedkontoret.

Dersom prosjektet starter, må man anskaffe anleggsmidler for 10 000 000. Anleggsmidlene avskrives med 20 % årlig, og man regner med at anleggsmidlene vil ha salgsverdi på 1 500 000 ved levetidens slutt. Salget skal behandles på den skattemessig gunstigste måte.

Prosjektet vil også medføre økt kapitalbinding i arbeidskapital. Man anslår at arbeidskapitalen vil utgjøre 15 % av omsetningen.

Bedriften finansierer sine prosjekter med en egenkapitalandel på 40 %. Risikofri rente er 2 % mens bedriften kan låne penger til en rente på 4,50 %. Avkastning på markedsporteføljen er 10 % og bedriftens aksjebeta er 1,26. Skattesatsen er 22 %.

a) Beregn bedriftens veide totalavkastningskrav, WACC. Rund gjerne av til nærmeste hele prosent.

b) Beregn nåverdi etter skatt. Er prosjektet lønnsomt?

### Løsning (LF-tall fra xlsx; metode = min tolkning, kontrollregnet)

**a) LF:** Egenkapitalkostnad = **12,08 %**; **WACC = 0,06938** → avrundet **7 %**.
Egen kontroll: r_e = 0,02 + 1,26 · (0,10 − 0,02) = 0,1208 (KVM UTEN skattejustering, formel 6.1). WACC = 0,1208 · 0,40 + 0,045 · (1 − 0,22) · 0,60 = 0,04832 + 0,02106 = 0,06938.

**b) LF:** Beregningsgrunnlag ved 7 %:

| År | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Omsetning | | 6 000 000 | 6 000 000 | 6 000 000 | 6 750 000 | 6 750 000 |
| Variable kostnader (30 %) | | −1 800 000 | −1 800 000 | −1 800 000 | −2 025 000 | −2 025 000 |
| Faste kostnader (økning) | | −1 000 000 | −1 000 000 | −1 000 000 | −1 000 000 | −1 000 000 |
| Indirekte kostnader (50 %) | | −500 000 | −500 000 | −500 000 | −500 000 | −500 000 |
| Resultat før skatt | | 2 700 000 | 2 700 000 | 2 700 000 | 3 225 000 | 3 225 000 |
| Skatt (22 %) | | −594 000 | −594 000 | −594 000 | −709 500 | −709 500 |
| Anleggsmidler | −10 000 000 | | | | | 1 500 000 |
| NV spart skatt pga. avskr. | 1 629 630 | | | | | |
| NV økt skatt nedskriving | −174 286 | | | | | |
| Arbeidskapital | −900 000 | – | – | −112 500 | – | 1 012 500 |
| Beregningsgrunnlag | −9 444 656 | 2 106 000 | 2 106 000 | 1 993 500 | 2 515 500 | 5 028 000 |

**Nåverdi etter skatt = 1 494 278** → lønnsomt (konklusjon følger av tallet; LF har ingen tekst).

Metode / nøkkelpunkter:
- Markedsanalysen 300 000 er IKKE med i LF: kontrakten er inngått, kostnaden påløper uansett → sunk cost (selv om faktura ikke er mottatt).
- Faste kostnader: økning 1 000 000. Indirekte: kun 50 % · 1 000 000 = 500 000 er relevant.
- NV spart skatt = 10 000 000 · 0,20 · 0,22 / (0,07 + 0,20) = **1 629 630**.
- Salgssum 1 500 000 nedskrives på saldo («skattemessig gunstigste måte»): NV økt skatt = 1 500 000 · 0,20 · 0,22 / [(0,07 + 0,20) · 1,07⁵] = **−174 286**.
- Arbeidskapital = 15 % av (neste års) omsetning: år 0: 900 000; år 3: økning 15 % · 750 000 = 112 500; år 5: frigjøring 1 012 500.

### Klassifisering
| Del | Tema | Kap. | Vekt | Type |
|---|---|---|---|---|
| 4a | WACC / KVM | 8–9 | del av 30 % | Regne |
| 4b | NV etter skatt med saldoavskrivning og salg av anleggsmiddel, arbeidskapital, sunk cost, relevante kostnader | 2 + 4 | del av 30 % | Regne (+ kort konklusjon) |

---

# OPPSUMMERING

## Tabell: eksamen × oppgave

Kapittelnummer er anslag (ikke oppgitt i eksamenene). Vekt er per hel oppgave (deloppgaver er ikke vektet enkeltvis i noen av eksamenene).

| Eksamen | Oppg | Deloppg. | Tema | Kap. (anslag) | Vekt % | Type |
|---|---|---|---|---|---|---|
| Des 2016 | 1 | a–f | NV, internrente, pay-back, gjensidig utelukkende prosjekter/differanseinvestering, følsomhet (pris, mengde) | 2–3, 7 | 20 | Regne + litt drøfting |
| Des 2016 | 2 | a–c | Utskifting (behold vs. ny maskin), optimal økonomisk levetid (engangs/kjede) | 3, 5 | 25 | Regne |
| Des 2016 | 3 | a–b | WACC/KVM + NV etter skatt med saldoavskrivning, arbeidskapital, salg av AM | 8–9, 4 | 35 | Regne |
| Des 2016 | 4 | a–c | Portefølje: forventning/standardavvik, to-aksjeportefølje ρ = 0, minimum varians | 7–8 | 20 | Regne + drøfte |
| Mars 2017 | 1 | a–f | Rentesregning (NV, sluttverdi, annuitet, årskostnad), annuitetslån halvårlig, effektiv rente | 1–2, 10 | 20 | Regne |
| Mars 2017 | 2 | a–e | NV/IRR før skatt, kritisk volum, årlig ekvivalent, WACC/KVM, NV etter skatt saldo | 2–3, 7, 8–9, 4 | 40 | Regne |
| Mars 2017 | 3 | a–b | Optimal økonomisk levetid (engangs/kjede) | 5 | 20 | Regne |
| Mars 2017 | 4 | a–e | NV vs. internrente, gjensidig utelukkende, differanseinvestering, Fisher-punkt | 3 | 20 | Regne + drøfte |
| Høst 2018 | 1 | a–d | NV/IRR før skatt m/arbeidskapital, følsomhet (faste kostn., restverdi), nødvendig volum | 2–3, 7 | 25 | Regne |
| Høst 2018 | 2 | a–e | Annuitetslån månedlig, restgjeld, effektiv rente, serielån m/avdragsfrihet, valg av lån | 10 | 20 | Regne |
| Høst 2018 | 3 | a–c | Optimal økonomisk levetid (engangs/kjede), lønnsomhet | 5 | 20 | Regne |
| Høst 2018 | 4 | a–b | WACC/KVM + NV etter skatt saldo, arbeidskapital, alternativkostnad | 8–9, 4 | 35 | Regne |
| Høst 2019 | 1 | a–d | Kontantstrøm, NV/IRR, gjensidig utelukkende, differanseinvestering, Fisher-punkt | 2–3 | 25 | Regne + drøfte |
| Høst 2019 | 2 | a–d | Effektiv rente (serie/avdragsfritt/annuitet), restgjeld, over-/underkurs fastrentelån, kassekreditt | 10 | 35 | Regne |
| Høst 2019 | 3 | a–c | WACC/KVM + NV etter skatt saldo, arbeidskapital, alternativkostnad + kovarians fra beta | 8–9, 4, 8 | 40 | Regne |
| Des 2020 | 1 | a–d | NV/IRR, gjensidig utelukkende, Fisher-punkt, nødvendig restverdi, ekvivalent annuitet | 2–3 | 25 | Regne |
| Des 2020 | 2 | a–b | Optimal økonomisk levetid (engangs/kjede) | 5 | 20 | Regne |
| Des 2020 | 3 | a–d | Portefølje: forventning/standardavvik, kovarians/korrelasjon, to-aksjeportefølje | 7–8 | 25 | Regne + drøfte |
| Des 2020 | 4 | a–b | WACC/KVM + NV etter skatt saldo, arbeidskapital, salg av AM, sunk cost | 8–9, 4 | 30 | Regne |

## Tema-frekvens (5 eksamener)

| Tema | Des 2016 | Mars 2017 | Høst 2018 | Høst 2019 | Des 2020 | Antall |
|---|---|---|---|---|---|---|
| WACC/KVM + NV etter skatt (saldo) – «stor» oppgave | 35 % | (del av 40 %) | 35 % | 40 % | 30 % | 5/5 |
| NV/IRR før skatt, gjensidig utelukkende, differanseinvestering | 20 % | 20 % (+ del av 40 %) | 25 % (uten diff.inv.) | 25 % | 25 % | 5/5 |
| Følsomhet/nullpunkt via nåverdiannuitet | ja (1f) | ja (2b) | ja (1b–d) | nei | ja (1c–d) | 4/5 |
| Optimal økonomisk levetid (engangs vs. kjede) | 25 % (del) | 20 % | 20 % | nei | 20 % | 4/5 |
| Lån: annuitet/serie, effektiv rente, restgjeld | nei | 20 % (del) | 20 % | 35 % | nei | 3/5 |
| Portefølje (forventning, std.avvik, kovarians, korrelasjon) | 20 % | nei | nei | (3c: kovarians fra beta) | 25 % | 2–3/5 |
| Rentesregning (grunnleggende) | nei | 20 % (del) | nei | nei | nei | 1/5 |
| Kassekreditt, over-/underkurs fastrentelån | nei | nei | nei | ja (2c–d) | nei | 1/5 |
| Obligasjoner, opsjoner, leasing, aksjeverdsettelse/Gordon | nei | nei | nei | nei | nei | 0/5 |

## Avvik og forbehold funnet underveis
1. **Metadata mangler i alle fem eksamens-PDF-er** slik de kommer ut av tekstuttrekket: ingen forside med emnekode, emnenavn, varighet eller tillatte hjelpemidler. Kun oppgavetekst + (2016–2019) vedlagt formelsamling «Finansiering og investering». Emnekode ØKAD 221 / NLA står ikke i noen av filene (filnavnene sier «BA3»/«BØ3»/«InvFin» + «Hauge»).
2. **Des 2016 oppg 4:** LF-PDF bruker andre tall enn eksamensoppgaven (sannsynligheter 0,25/0,50/0,25 osv.). LF-xlsx bruker oppgavens tall og er riktig fasit: E(A) = 6,60 %, σ(A) = 7,10 %, E(B) = 4,70 %, σ(B) = 4,45 %.
3. **Des 2016 LF-PDF har småfeil:** «837 391» i tekst (riktig 837 931); «A/B/Y» brukt om S/L; 2b-teksten sier «investeringskjede» der den mener engangsinvestering.
4. **Høst 2019 oppg 3:** LF bruker beta 1,65 og lånerente 4,04 %, mens oppgaveteksten sier beta 1,61 og 4 %. WACC avrundes til 9 % uansett, men kovariansen i c) blir 0,07986 (LF) mot 0,07792 (oppgavens tall, egen utregning).
5. **KVM med/uten skatt er inkonsistent mellom årene:** 2016 og mars 2017 bruker r_e = r_f·(1 − s) + β·[r_m − r_f·(1 − s)] (formel 6.2). 2018, 2019 og 2020 bruker r_e = r_f + β·(r_m − r_f) (formel 6.1). Gjeldsrenten multipliseres alltid med (1 − s). WACC avrundes alltid til hel prosent før NV-beregningen.
6. **LF 2017–2020 er rene regneark** uten forklarende tekst (unntak: noen linjer i 2019 oppg 1 og 2020 oppg 3). Drøftings-/begrunnelsesdeler (mars 2017 4c/4e, høst 2018 2e/3c, «er prosjektet lønnsomt») har ingen LF-tekst; det jeg har skrevet der er merket som utledet/egen skisse.
7. Alle LF-tall er kontrollregnet av meg (NV, IRR, annuiteter, WACC, effektiv rente, porteføljetall) og stemmer med LF, med unntakene nevnt over.

## Gjennomgående løsningsoppskrifter i LF (nyttig for øvingsnettsiden)
- **NV etter skatt (saldo):** driftskontantstrøm før skatt (uten avskrivninger) → skatt = sats · driftskontantstrøm → legg avskrivningenes skattefordel inn som ÉN nåverdi i år 0: AM · a · s / (r + a). Ved salg: trekk fra SV · a · s / [(r + a) · (1 + r)ⁿ] i år 0 og ta SV som innbetaling i år n. Arbeidskapital som % av omsetning bindes året FØR omsetningen og frigjøres helt siste år. Kun relevante kostnader: merkostnader, alternativkostnader (tapt leie) med; sunk cost og fordelte felleskostnader ut.
- **Følsomhet/nullpunkt:** gjør NV om til nåverdiannuitet (NV / annuitetsfaktor) og del på mengde (→ prisendring), dekningsbidrag per enhet (→ mengdeendring), eller legg til faste kostnader. For engangsbeløp i år n: NV · (1 + r)ⁿ.
- **Optimal levetid:** tabell med én rad per mulig levetid; siste års CF = drift + salgsverdi; engangsinvestering → maks NV; kjede → maks nåverdiannuitet.
- **Gjensidig utelukkende prosjekter:** NV avgjør; IRR kan rangere feil; differanseinvestering (stor − liten), IRR på denne > krav → velg det største; IRR på differansen = avkastningskravet som gir lik NV.
- **Lån:** sett opp låntakers kontantstrøm netto for gebyrer; effektiv rente = internrente (per termin), annualiser med (1 + q)ᵐ − 1; restgjeld = NV av gjenstående terminbeløp (uten gebyr) til lånerenten; over-/underkurs = NV av gjenstående terminbeløp til ny markedsrente − restgjeld.
