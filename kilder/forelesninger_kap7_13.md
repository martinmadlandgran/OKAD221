# ØKAD 221 – Forelesningsuttrekk kapittel 7–13 (Hauge, Bredesen 7. utg.)

## LES FØRST: kildekvalitet og merking

Kilde: tekstuttrekk av PowerPoint-filene (Google Drive). **Alle formler, tabeller, Excel-skjermbilder og figurer på lysbildene er bilder som IKKE kom med i tekstuttrekket.** Bare løpende tekst (kulepunkter, overskrifter, noen tall i tekst) er lest.

Merking brukt i denne filen:

- **[LYSBILDE]** = står ordrett/direkte i lysbildeteksten (sikkert).
- **[REKONSTRUERT]** = formel/tabell/mellomregning som manglet (bilde), som jeg har gjenskapt fra standard lærebokteori og regnet ut selv. Der lysbildet oppgir et sluttsvar, er rekonstruksjonen kontrollregnet mot det (markert «stemmer med lysbildet»). Der ingen kontroll var mulig, står «ikke verifiserbar».
- **[MANGLER]** = innhold som fantes på lysbildet som bilde, og som ikke lar seg gjenskape (inndata ukjent). Ikke gjett på disse.

Filer lest (alle 9 ble lest, men kun tekstlaget):
Kap 7 + «utv», Kap 8 + «utv», Kap 9, Kap 10, Kap 11, Kap 13 (fil «Kapittel 13-7utgHauge.pptx»), Opsjonsprising.xlsx.

**Kapittel 12: det finnes ingen forelesnings-PowerPoint for kapittel 12** (ikke i listen over filer). Kap 12-stoff må ev. hentes fra læreboken.

«utv»-filene: samme lysbilder som grunnversjonen + noen få ekstra innledende lysbilder (kap 7: «Lån», «Nominell rente/ytelse», kassekreditt-forklaring; kap 8: Laffer-kurven, «Avskrivning»-intro). Ingen ekstra regneeksempler eller løsninger. Det nye er flettet inn under og merket «(utv)».

Gjennomgående notasjon hos foreleser: skattesats s = 22 %; avkastningskrav totalkapital etter skatt r_t; nåverdi NV / netto nåverdi NNV; internrente IR; kontantstrøm CF_t; norsk Excel (AVDRAG, RENTE, NÅVERDI, PERIODER, IR, STDAV.S, målsøking).

---

# KAPITTEL 7: Lønnsomhetsvurderinger av lån

## 7.1 Temaer [LYSBILDE]
- Nominell og effektiv rente på lån
- Gebyrer og effektiv rente
- Avbetalingskontrakter
- Låneformer og effektiv rente (annuitet/serie, fast/flytende)
- Låneformer i næringslivet: kassekreditt, leverandørkreditt, factoring, leasing

## 7.2 Begreper og definisjoner [LYSBILDE]
- **Lån** (utv): en avtale mellom to parter. Långiver (kreditor) låner ut et pengebeløp; låntaker (debitor) påtar seg en forpliktelse til å betale tilbake lånet. Långivere: banker og andre finansielle selskaper. Långiver krever som oftest rente. Et lån har som regel: en årlig rente, antall betalinger per år, antall år med nedbetaling (n), eventuelle gebyrer (FK).
- **Nominell rente**: rentekostnaden som påløper på et lån.
- **Ytelse** (utv): det som betales til banken. Ytelse = Renter (R) + Avdrag (A) + Gebyrer (FK).
- **Effektiv rente**: I tillegg til renter påløper ofte gebyrer, og renter beregnes og belastes flere ganger pr. år. Dette øker lånets kostnad ut over den nominelle renten – lånets effektive rente. **Effektiv rente = internrenten til lånets kontantstrøm.**
- Lov om kredittkjøp § 6a (sitert på lysbildet): effektiv rente skal beregnes etter en matematisk formel fastsatt i forskrift, uttrykkes i prosent pr. år, og beregnes på grunnlag av **alle kostnader** forbrukeren skal betale for kreditten.
- **Annuitetslån**: summen av renter og avdrag (terminbeløpet) er konstant i nedbetalingstiden. Rentedelen reduseres over tid, avdragsdelen øker. Renter og avdrag finnes med AVDRAG-funksjonen.
- **Serielån**: avdraget er konstant. Rentedelen reduseres over tid, og dermed reduseres terminbeløpet. Renter og avdrag må beregnes manuelt.
- **Restgjeld**: «Restgjeld er alltid lik nåverdien av de gjenværende betalingene» (diskontert med lånets nominelle perioderente).
- **Fastrente**: fjerner risiko knyttet til renteutvikling, men ved innfrielse før forfall kan man få **overkurs** (markedsrenten har falt – lånet må innfris til mer enn pålydende restgjeld) eller **underkurs** (markedsrenten har økt).
- **Kassekreditt** (utv): veldig vanlig, kortsiktig låneform som skal dekke likviditetsbehov når inntektene er lave. Bedriften har en kredittkonto; renter påløper på brukt (trukket) beløp. Bedriften betaler i tillegg for muligheten til å bruke kreditten (provisjon av bevilget ramme = **limit**). Kan sammenlignes med et kredittkort: grense (limit) f.eks. 100 000, årsgebyr (provisjon) f.eks. 100 kr, brukt beløp forrentes.
- **Leverandørkreditt**: betalingsbetingelser som «netto pr. 30 dager, eller 10 dager – 2 % rabatt». Å ikke bruke rabatten = å låne av leverandøren.
- **Factoring**: både administrative tjenester (reskontrokontroll mv.) og finansielle tjenester (forskuttering av fordringer). Lønnsomhetsanalysen må ivareta begge sider. To spørsmål: Hvor mye kapital frigjøres? Hva koster dette (netto)?
- **Leasing (leie)**: alternativ til f.eks. bankfinansiering. Effektiv rente finnes ut fra **forskjellen i kontantstrøm mellom kjøp og leasing**, og sammenlignes med alternativ finansiering (bank).

## 7.3 Fremgangsmåte og formler

Fremgangsmåte for effektiv rente [LYSBILDE]:
1. Sett opp lånets kontantstrøm. Bruk tidsrommet mellom hver nedbetaling som én periode på tidsaksen.
2. Regn ut effektiv perioderente = internrenten til lånets kontantstrøm.
3. Regn om fra effektiv perioderente til årlig (p.a.) rente.

Formel effektiv perioderente (formelen var bilde) [REKONSTRUERT, symbolforklaringen er LYSBILDE]:

    CF_0 = Σ_{t=1..n} CF_t / (1 + q)^t      (dvs. CF_0 − Σ CF_t/(1+q)^t = 0)

- CF_0 = netto utbetalt lån (etter fradrag for gebyrer mv.)
- CF_t = alle utbetalinger knyttet til lånet (renter, avdrag, betalingsgebyrer)
- q = effektiv rente pr. periode

Fra perioderente til årsrente (formel bilde) [REKONSTRUERT, stemmer med alle eksempler]:

    p = (1 + q)^m − 1

**«Viktig – m er antall betalinger pr. år»** [LYSBILDE]: halvårlig m = 2, kvartalsvis m = 4, månedlig m = 12.

Nominell perioderente = nominell årsrente / m (f.eks. 4,45 %/12 = 0,371 %) [LYSBILDE].

Annuitet (terminbeløp) [REKONSTRUERT standardformel; foreleser bruker Excel AVDRAG]:

    Terminbeløp = Lån · i / (1 − (1 + i)^−n),   i = nominell perioderente, n = antall terminer

Leverandørkreditt [REKONSTRUERT standardformel, lysbildets formel/svar var bilde]:

    perioderente = rabatt / (1 − rabatt);   effektiv årsrente = (1 + perioderente)^(365/kredittdager) − 1

## 7.4 Regneeksempler

### Eks 7-1: Serielån med gebyrer [LYSBILDE tall og svar; tabell REKONSTRUERT]
Lån 100 000, nominell rente 5 % p.a., etableringsgebyr 1 500, termingebyr 50 pr. forfall, serielån over ett år med halvårlige terminer.

| Tid (halvår) | Avdrag | Rente (2,5 % av restgjeld) | Termingebyr | Kontantstrøm |
|---|---|---|---|---|
| 0 | | | | +98 500 (100 000 − 1 500) |
| 1 | 50 000 | 2 500 | 50 | −52 550 |
| 2 | 50 000 | 1 250 | 50 | −51 300 |

Internrente pr. halvår q ≈ 3,62 % (nøyaktig 3,615 %). Effektiv årsrente p = 1,0362² − 1 = 0,0736 = **7,36 %** (stemmer med lysbildet).
Poeng [LYSBILDE]: effektiv rente blir høyere enn nominell pga. etableringsgebyr og termingebyr, samt at renter og avdrag betales flere ganger årlig.

### Eks 7-2: Billån Nordea (BMW 120D xDrive) [LYSBILDE]
Kjøpesum 369 000, egenkapital 129 000, lånebehov 240 000. Nominell rente 4,45 % p.a. Annuitetslån 36 måneder, månedlige terminer. Gebyrer ved låneopptak 1 600 + 1 473 = 3 073. Nordea oppgir terminbeløp 7 310 og effektiv årsrente 6,26 %.
- Banken låner ut penger også til gebyrene: faktisk lånebeløp 240 000 + 3 073 = 243 073.
- Nominell månedsrente 4,45 %/12 = 0,371 %.
- Ytelse med AVDRAG: `=AVDRAG(0,0445/12; 36; 243073)` → 7 225 [REKONSTRUERT: 7 225,24]. Siden Nordea oppgir 7 310, må termingebyr 85 være inkludert (7 225 + 85 = 7 310).
- Effektiv rente: netto utbetalt = 243 073 − 3 073 = 240 000; ytelse inkl. termingebyr 7 310. `=RENTE(36; -7310; 240000)` → 0,5068812 % pr. måned. Effektiv årsrente = 1,005068812^12 − 1 = 0,0626 = **6,26 %**.
- Merknad [LYSBILDE]: RENTE gir samme verdi som IR, men med IR må hele kontantstrømmen over 36 måneder settes opp; RENTE holder med ett beløp fordi lånet er et annuitetslån.

### Eks 7-3: Avbetalingskjøp Power (Mac) [LYSBILDE, delvis MANGLER]
Mac med tilbehør 20 000. Månedlige betalinger 1 918,50 etterskuddsvis. Power oppgir effektiv årsrente 30,4 %.
- Effektiv månedsrente med RENTE: 2,2312 %. Effektiv årsrente = 1,022312^12 − 1 = 0,3036 ≈ 30,4 % (slik står det på lysbildet).
- [MANGLER] Tilbudstabellen (antall måneder, gebyrer) var bilde. [REKONSTRUERT] 12 månedlige betalinger gir `=RENTE(12; -1918,5; 20000)` = 2,234 % pr. md., altså ≈ lysbildets 2,2312 % – løpetiden er etter alt å dømme 12 måneder (liten differanse kan skyldes gebyr/avrunding i originalen).

### Eks 7-4: Boliglån Nordea [LYSBILDE tall; mellomregning REKONSTRUERT og stemmer]
Lån 1 000 000, nominell rente 2,9 %, etableringsgebyr 2 000, termingebyr 50, månedlig over 20 år (annuitet, 240 terminer).
- Månedlig renter + avdrag: `=AVDRAG(0,029/12; 240; 1000000)` = 5 496,05. Inkl. termingebyr: 5 546,05.
- Effektiv rente: «Husk at **netto utbetalt lån** skal brukes som nåverdi i Excel-funksjonen, og **betaling inklusiv gebyrer** skal brukes». `=RENTE(240; -5546,05; 998000)` = 0,251912 % pr. md. Effektiv årsrente = 1,00251912^12 − 1 = 0,0306 = **3,06 %**.
- Restgjeld: nåverdi av gjenværende betalinger (uten gebyr) med nominell månedsrente. Etter 1 år gjenstår 228 betalinger, etter 10 år 120. `=NÅVERDI(0,029/12; 228; -5496,05)` ≈ **962 552**; `=NÅVERDI(0,029/12; 120; -5496,05)` ≈ **571 910** [REKONSTRUERT – lysbildets tall var bilde].
- Raskere nedbetaling: betaler 10 000 pr. måned i renter og avdrag. Antall perioder til NV = 1 000 000: **114,6 måneder ≈ 9,5 år**. Løses med målsøking (legg inn tilfeldig antall perioder, her 25, og la Excel søke til NÅVERDI = 1 000 000) eller `=PERIODER(0,029/12; -10000; 1000000)` = 114,6. Poeng: «Selv om månedsbeløpet ikke dobles, blir tilbakebetalingstiden mer enn halvert.»

### Eks 7-5: Annuitetslån vs serielån [LYSBILDE totalsummer; tabell REKONSTRUERT]
Lån 100 000, rente 8 % p.a., løpetid 5 år, årlige terminer.

Annuitet (terminbeløp 25 046 hvert år; total betaling 125 230 ifølge lysbildet = 5 · 25 046):

| År | Renter | Avdrag | Terminbeløp | Restgjeld UB |
|---|---|---|---|---|
| 1 | 8 000 | 17 046 | 25 046 | 82 954 |
| 2 | 6 636 | 18 409 | 25 046 | 64 545 |
| 3 | 5 164 | 19 882 | 25 046 | 44 663 |
| 4 | 3 573 | 21 473 | 25 046 | 23 190 |
| 5 | 1 855 | 23 190 | 25 046 | 0 |

Serielån (avdrag 20 000 hvert år; total betaling 124 000):

| År | Renter | Avdrag | Terminbeløp | Restgjeld UB |
|---|---|---|---|---|
| 1 | 8 000 | 20 000 | 28 000 | 80 000 |
| 2 | 6 400 | 20 000 | 26 400 | 60 000 |
| 3 | 4 800 | 20 000 | 24 800 | 40 000 |
| 4 | 3 200 | 20 000 | 23 200 | 20 000 |
| 5 | 1 600 | 20 000 | 21 600 | 0 |

Konklusjon [LYSBILDE]: Effektiv rente = 8 % i begge tilfeller. **Avdragsprofil påvirker ikke effektiv rente**, men kan gjøre det når det er gebyrer: gjennomsnittlig lånesaldo er høyere med annuitetslån, så gebyrene slår mindre ut, og effektiv rente kan bli litt lavere med annuitetslån enn med serielån.

### Eks 7-6: Fastrentelån – over-/underkurs [LYSBILDE]
Annuitetslån 1 000 000, nominell årsrente 5 %, løpetid og rentebinding 5 år, årlig betaling. Terminbeløp `=AVDRAG(0,05;5;1000000)` = 230 975 [REKONSTRUERT].
- Renten endres dagen etter opptak: NV av betalingene ved 4 % = 1 028 259 → **overkurs 28 259**; ved 6 % = 972 950 → **underkurs 27 050** (stemmer med lysbildet).
- Renteendring etter 3 år (to betalinger gjenstår) [svartabell var bilde – REKONSTRUERT]: restgjeld (5 %) = 429 477. NV av to betalinger ved 4 % = 435 640 → overkurs ≈ 6 163; ved 6 % = 423 468 → underkurs ≈ 6 009.

### Eks 7-7: Leverandørkreditt [LYSBILDE oppgave; svar REKONSTRUERT, ikke verifiserbar]
Betingelser: netto pr. 30 dager, eller 10 dager – 2 % rabatt. Hvilken effektiv rente oppnås ved å bruke rabatten / betales ved ikke å bruke den?
- Kredittid 20 dager, perioderente 2/98 = 2,04 %. Effektiv årsrente = 1,0204^(365/20) − 1 ≈ **44,6 %** (med 360 dager: 1,0204^18 − 1 ≈ 43,9 %). Lysbildets eget tall var bilde – uvisst om 360 eller 365 dager brukes.

### Eks 7-8: Kassekreditt Nordea [LYSBILDE]
Rente av trukket beløp + provisjon av bevilgningsrammen (limit), betales pr. kvartal. Limit 500 000, utnyttelsesgrad 50 % (trekk 250 000), rente 6,2 % p.a., provisjon 0,33 % pr. kvartal.
- Rente pr. kvartal: 250 000 · 0,062/4 = 3 875. Provisjon: 500 000 · 0,0033 = 1 650. Sum **5 525**.
- 5 525 / 250 000 = 0,0221 = 2,21 % pr. kvartal. Effektiv årsrente = 1,0221^4 − 1 = 0,0914 = **9,14 %**.
- «Effektiv rente kan alternativt finnes slik:» [formel bilde; REKONSTRUERT]: kvartalsrente = 0,062/4 + 0,0033/0,50 = 0,0155 + 0,0066 = 0,0221 (provisjon delt på utnyttelsesgrad).

### Eks 7-9: Kassekreditt med tilleggsrente [LYSBILDE oppgave; løsning MANGLER]
Kunde med lavere kredittverdighet: rente 8 % p.a., tilleggsrente 2 % p.a. ved trekk over 60 %, limit 500 000, gjennomsnittlig trekk 90 % (450 000).
[REKONSTRUERT, ikke verifiserbar – det er uklart om tilleggsrenten gjelder bare beløpet over 60 % og om provisjon 0,33 %/kvartal inngår]: Tolkning A (tillegg kun på 150 000 over 60 %-grensen, provisjon 1 650): (9 000 + 750 + 1 650)/450 000 = 2,53 % pr. kvartal → 10,5 % p.a. Uten provisjon: 2,17 % → 8,95 % p.a. Bruk læreboken for fasit.

### Eks 7-10: Factoring [LYSBILDE inndata; løsning REKONSTRUERT, ikke verifiserbar]
Omsetning 12 000 000 pr. år (1 000 000 pr. md.). Kundekreditt hittil 45 dager, reduseres til 30 dager med factoring. **20 % margin** (factoringselskapet forskutterer 80 %), 13 % rente på forskudd. Administrasjonsgebyr 25 pr. faktura, snittfaktura 5 000 → 12 000 000/5 000 = 2 400 fakturaer. Sparte adm.kostnader 50 000.
- Kapital frigjort: fordringer før = 12 000 000 · 45/360 = 1 500 000. Etter = 12 000 000 · 30/360 = 1 000 000, hvorav 80 % forskutteres (800 000) → bundet 200 000. Frigjort = 1 500 000 − 200 000 = **1 300 000**.
- Kostnad: rente 13 % · 800 000 = 104 000 + gebyr 2 400 · 25 = 60 000 − spart 50 000 = **114 000 netto** → 114 000/1 300 000 ≈ **8,8 %**.
(Lysbildene «Hvor mye kapital frigjøres?» og «Hva koster det?» var rene bilder.)

### Eks 7-11: Leasing [LYSBILDE oppgave; svar REKONSTRUERT]
Maskin koster 100 000. Leasing: forskudd 40 000 nå + 3 betalinger à 25 000 i slutten av hvert år. Effektiv rente?
- Differansekontantstrøm leasing − kjøp: år 0: +60 000 (sparer 100 000, betaler 40 000); år 1–3: −25 000. Internrente = **12,04 %** (`=RENTE(3;-25000;60000)`). Sammenlignes med bankens lånerente. (Ingen skatt i dette eksemplet.)

## 7.5 Excel-funksjoner (norsk Excel) [LYSBILDE]
- `AVDRAG(rente; antall_innbet; nåverdi)` – terminbeløp annuitetslån (renter + avdrag).
- `RENTE(antall_innbet; betaling; nåverdi)` – perioderente for annuitet (= internrente når betalingene er like).
- `IR(kontantstrøm)` – internrente for vilkårlig kontantstrøm (må brukes for serielån).
- `NÅVERDI(rente; antall_innbet; betaling)` – nåverdi av annuitet (brukes til restgjeld og over-/underkurs).
- `PERIODER(rente; betaling; nåverdi)` – antall perioder.
- Målsøking (Goal Seek).

## 7.6 Fallgruver / vektlagt
- m = antall betalinger pr. år – husk omregning (1+q)^m − 1; ikke gang perioderenten med m.
- Ved effektiv rente: bruk **netto utbetalt** lån som nåverdi og **betaling inkl. termingebyr** som terminbeløp. Terminbeløpet (ekskl. gebyr) beregnes derimot av brutto lånebeløp med nominell rente.
- Hvis banken låner ut til gebyrene: lånebeløp = lånebehov + gebyr, netto utbetalt = lånebehov.
- Restgjeld = NV av gjenværende betalinger (uten gebyr) med nominell perioderente.
- Avdragsprofil påvirker ikke effektiv rente uten gebyrer.
- Overkurs når markedsrenten har falt, underkurs når den har økt.

## 7.7 Kontroll-/diskusjonsspørsmål på lysbildene
- Hva blir lånets kontantstrøm? (serielånseksemplet)
- Hvordan er bankens oppgitte terminbeløp og effektive rente beregnet?
- Bør et lån tas opp med fast eller flytende rente? Hva taler for og imot hvert alternativ?
- Hvilken effektiv rente oppnår man ved å bruke kontantrabatten?
- Factoring: Hvor mye kapital frigjøres? Hva koster det (netto)?

---

# KAPITTEL 8: Investeringer og skatt

## 8.1 Temaer [LYSBILDE]
- Norske skatter – kort oversikt (skattesatsen er redusert over tid og er nå **22 %**)
- Lønnsomhet av finansinvesteringer etter skatt (bankinnskudd; aksjer og aksjefond)
- Lønnsomhet av realinvesteringer etter skatt (lineære avskrivninger; saldoavskrivninger)
- Skattemessig behandling av salg av anleggsmidler (inntektsføring av salgssum; nedskriving av salgssum på saldo)
- (utv) Laffer-kurven: Arthur Laffer – ideen om at lavere skattesatser kan gi høyere skatteinntekter.

## 8.2 Begreper og definisjoner [LYSBILDE]
- **Bankinnskudd**: man betaler skatt fra første rentekrone; gjeldsrenter gir inntektsfradrag (dersom man er i skatteposisjon).
- **Aksjeavkastning**: kursgevinst ved realisasjon + dividende (utbytte).
- **Aksjonærmodellen** (personlige skattytere): utbytte skattlegges, men skatten kan utsettes med aksjesparekonto.
- **Fritaksmodellen** (selskapsaksjonærer): selskaper betaler bare 0,66 % skatt av utbytteinntekt (2024). Gevinst ved salg er helt skattefri; tilsvarende ingen fradrag for tap.
- **Oppjusteringsfaktor 1,72 (2025)**: skattepliktig utbytte til privatpersoner oppjusteres med 1,72 før det skattlegges med 22 %. Reell skattesats = 0,22 · 1,72 = 0,3784 = **37,84 %**. Eksempel: utbytte 100 000 → grunnlag 172 000 → skatt 37 840.
- **Skjermingsrente / skjermingsfradrag**: reduserer skatten noe (ikke hensyntatt i eksemplet). Skjermingsrenten tilsvarer risikofri rente og angir hvor høy skattefri avkastning kan være; avkastning ut over dette skattlegges. 2024: 4,45 %.
- **Avskrivning** (utv): en maskin taper seg i verdi over tid; investeringsmidler kan derfor avskrives. Regnskapsverdien reduseres, og reduksjonen trekkes fra kontantstrømmen før skatt slik at skattepliktig inntekt blir lavere. **«Avskrivninger er IKKE en kontantstrøm»** – det er en regnskapsmessig post som reduserer skattepliktig inntekt; bedriften betaler ikke avskrivningen til noen.
  - Mini-eksempel (utv): maskin kjøpes for 100, gir kontantstrøm før skatt 50, verdifall 15 → skattepliktig inntekt 35, ikke 50 → mindre skatt.
- **Realinvesteringer etter skatt**: avskrivninger blir relevante i etter-skatt-kalkyle fordi de påvirker resultat og dermed kontantstrømmen via skatten. **Vi forutsetter alltid at bedriften er i skatteposisjon totalt**, slik at avskrivningene blir effektive. Fremgangsmåte: (1) sett opp resultatbudsjett for å finne skatt, (2) legg tilbake avskrivningene for å finne kontantstrøm etter skatt.
- **Saldometoden vs lineær**: skattemessige avskrivninger skal gjøres etter saldometoden; lineære avskrivninger er ofte best egnet bedriftsøkonomisk.
- **Effektiv skattesats**: (IR før skatt − IR etter skatt)/IR før skatt.
- **Internrente etter skatt**: renten som gir NNV = 0 (symbol r). Uttrykket er en sirkelreferanse (r inngår også i leddet for NV av spart skatt) – løses enklest med målsøking i Excel (sett nåverdi lik 0 ved å endre avkastningskravet), eller ved å regne NV for to krav (f.eks. 10 % og 15 %) og interpolere.

## 8.3 Formler

Finansinvestering [LYSBILDE]:

    r = p · (1 − s)       r = rente etter skatt, p = rente før skatt, s = 22 %
    Eks: p = 3 % → r = 0,03 · 0,78 = 2,34 %

Saldoavskrivning – symboler [LYSBILDE]: AM_0 = anskaffelseskostnad, a = saldoavskrivningssats (noen lysbilder kaller satsen c), AV_t = årets avskrivning, RV_t = restverdi (saldo).

    AV_t = a · RV_{t−1}                       [REKONSTRUERT]
    RV_t = AM_0 · (1 − a)^t                   [LYSBILDE]

Saldoavskrivninger som geometrisk/uendelig rekke [LYSBILDE prinsipp; formel REKONSTRUERT, kontrollert mot eksemplene]:

    NV av alle avskrivninger        = AM_0 · a / (r_t + a)
    NV spart skatt pga. avskrivninger = AM_0 · s · a / (r_t + a)

Nåverdi etter skatt, variant 1 – årlig kontantstrøm etter skatt [formel bilde; REKONSTRUERT, beskrivelsen er LYSBILDE]:

    NNV = −AM_0 + Σ_{t=1..n} [CF_t − s·(CF_t − AV_t)] / (1 + r_t)^t
          + [RV_n · s · a / (r_t + a)] / (1 + r_t)^n

«Det første leddet etter summetegnet er den årlige kontantstrømmen etter skatt og det siste leddet er nåverdi spart skatt pga. avskrivninger etter levetidens slutt.»

Nåverdi etter skatt, variant 2 – samlet skatteledd (foreleser: «kan med fordel samles i ett ledd») [REKONSTRUERT, gir identisk svar]:

    NNV = −AM_0 + Σ_{t=1..n} CF_t·(1 − s) / (1 + r_t)^t + AM_0 · s · a / (r_t + a)

«Den skattemessig relevante kontantstrømmen før skatt belastes med full skatt uten å ta hensyn til avskrivningene, men avskrivningenes skatteeffekt legges til igjen i eget ledd. Vi får da ikke en korrekt årlig kontantstrøm, men et beregningsgrunnlag vi kan bruke for å finne nåverdi.»

Salg av anleggsmiddel, saldogruppe a–d og j – salgssummen nedskrives på saldo. Fire ledd [LYSBILDE ledd-navn; formel REKONSTRUERT fra lærebokstandard, ikke verifiserbar mot tall]:

    NNV = −AM_0
          + Σ CF_t·(1 − s)/(1 + r_t)^t                 (NV CF etter skatt, uten korreksjon for skatteeffekt av avskrivninger)
          + S_n/(1 + r_t)^n                             (NV salg anleggsmiddel)
          + AM_0 · s · a/(r_t + a)                      (NV spart skatt pga. avskrivninger)
          − [S_n · s · a/(r_t + a)]/(1 + r_t)^n         (NV økt skatt pga. nedskriving på saldo og redusert avskrivningsgrunnlag)

**Arbeidskapital:** behandles ikke eksplisitt i kap 8-lysbildene (ingen eksempler med arbeidskapital i tekstlaget). Standard (lærebok): binding i år 0 og frigjøring i år n, uten skatteeffekt.
**Avkastningskrav:** etter-skatt-kontantstrøm diskonteres med avkastningskrav etter skatt (r_t); før-skatt med krav før skatt (lastebil: 10 % før, 8 % etter).

## 8.4 Regneeksempler

### Eks 8-1: Lastebil, lineære avskrivninger [LYSBILDE inndata, IR-er; tabell REKONSTRUERT og stemmer]
Brukt lastebil 300 000, levetid 3 år, lineær avskrivning 100 000 pr. år. Sparte transportutgifter 140 000 (år 1 og 2) og 149 000 (år 3). s = 22 %, avkastningskrav før skatt 10 %, etter skatt 8 %.

| | År 0 | År 1 | År 2 | År 3 |
|---|---|---|---|---|
| Kontantstrøm før skatt | −300 000 | 140 000 | 140 000 | 149 000 |
| − Avskrivning | | 100 000 | 100 000 | 100 000 |
| = Skattepliktig resultat | | 40 000 | 40 000 | 49 000 |
| Skatt 22 % | | 8 800 | 8 800 | 10 780 |
| Kontantstrøm etter skatt | −300 000 | 131 200 | 131 200 | 138 220 |

- Før skatt: NNV (10 %) = 54 921; IR = **20,02 %**.
- Etter skatt: NNV (8 %) = 43 688; IR = **15,83 %**.
- Effektiv skattesats = (20,02 − 15,83)/20,02 · 100 = **20,93 %** [LYSBILDE].

### Eks 8-2: Saldoavskrivninger, IB = 100 000, a = 30 % [tabell REKONSTRUERT]

| År | Saldo IB | Avskrivning (30 %) | Restverdi UB |
|---|---|---|---|
| 1 | 100 000 | 30 000 | 70 000 |
| 2 | 70 000 | 21 000 | 49 000 |
| 3 | 49 000 | 14 700 | 34 300 |
| 4 | 34 300 | 10 290 | 24 010 |
| 5 | 24 010 | 7 203 | 16 807 |

RV_t = AM_0·(1 − a)^t, f.eks. RV_5 = 100 000 · 0,7^5 = 16 807.
Geometrisk rekke med r_t = 8 % [REKONSTRUERT]: NV av alle avskrivninger = 100 000 · 0,30/(0,08 + 0,30) = 78 947; NV spart skatt = 78 947 · 0,22 = 17 368.

### Eks 8-3: Lastebilen med saldoavskrivning 24 % [LYSBILDE: sats, restverdi 131 693, sum avskrivninger 168 307; resten REKONSTRUERT]

| | År 1 | År 2 | År 3 |
|---|---|---|---|
| Kontantstrøm før skatt | 140 000 | 140 000 | 149 000 |
| Avskrivning (24 % av saldo) | 72 000 | 54 720 | 41 587 |
| Skattepliktig resultat | 68 000 | 85 280 | 107 413 |
| Skatt 22 % | 14 960 | 18 762 | 23 631 |
| Kontantstrøm etter skatt | 125 040 | 121 238 | 125 369 |

- Restverdi etter år 3: 300 000 · 0,76³ = 131 693 (= 300 000 − 168 307). Kan fortsatt avskrives etter levetidens slutt.
- NV (i år 3) av spart skatt etter levetid: 131 693 · 0,22 · 0,24/(0,08 + 0,24) = 21 729; diskontert til år 0: 21 729/1,08³ = 17 249.
- NNV etter skatt (8 %) = −300 000 + 125 040/1,08 + 121 238/1,08² + 125 369/1,08³ + 17 249 = **36 492**.
- Alternativ beregning (variant 2): −300 000 + (140 000·0,78/1,08 + 140 000·0,78/1,08² + 149 000·0,78/1,08³) + 300 000 · 0,22 · 0,24/0,32 = −300 000 + 286 992 + 49 500 = **36 492** (samme svar).

### Eks 8-4: «Nytt eksempel» 5-årig prosjekt [LYSBILDE inndata og restverdi 819 200; resten REKONSTRUERT]
Investering 2 500 000, saldosats 20 %, ingen salgsverdi. Omsetning år 1–5: 1 500 000; 1 500 000; 3 500 000; 3 500 000; 3 000 000. Variable kostnader 50 % av omsetning, betalbare faste kostnader 400 000 pr. år. Avkastningskrav etter skatt 8 %, s = 22 %.

| | År 1 | År 2 | År 3 | År 4 | År 5 |
|---|---|---|---|---|---|
| Omsetning | 1 500 000 | 1 500 000 | 3 500 000 | 3 500 000 | 3 000 000 |
| Variable kostnader (50 %) | 750 000 | 750 000 | 1 750 000 | 1 750 000 | 1 500 000 |
| Faste betalbare kostnader | 400 000 | 400 000 | 400 000 | 400 000 | 400 000 |
| Kontantstrøm før skatt | 350 000 | 350 000 | 1 350 000 | 1 350 000 | 1 100 000 |
| Saldoavskrivning 20 % | 500 000 | 400 000 | 320 000 | 256 000 | 204 800 |
| Skattepliktig resultat | −150 000 | −50 000 | 1 030 000 | 1 094 000 | 895 200 |
| Skatt 22 % | −33 000 | −11 000 | 226 600 | 240 680 | 196 944 |
| Kontantstrøm etter skatt | 383 000 | 361 000 | 1 123 400 | 1 109 320 | 903 056 |

(Negativ skatt i år 1–2 = skattebesparelse, fordi bedriften forutsettes å være i skatteposisjon totalt.)
- Uavskrevet restverdi etter år 5: 2 500 000 · 0,8^5 = 819 200 [LYSBILDE].
- NV spart skatt etter levetid: 819 200 · 0,22 · 0,20/(0,08 + 0,20) = 128 731 (år 5) → 128 731/1,08^5 = 87 612.
- NNV etter skatt = −2 500 000 + NV(CF etter skatt) 2 985 908 + 87 612 = **573 521**.
- Samlet metode: −2 500 000 + Σ CF·0,78/1,08^t (= 2 680 663) + 2 500 000 · 0,22 · 0,20/0,28 (= 392 857) = **573 521**. («Legg spesielt merke til beregningen av nåverdi spart skatt på grunn av avskrivninger.»)

### Eks 8-5: AS Cycle (salg, nedskriving på saldo) – [MANGLER]
Alle tall var bilder. Kun struktur kjent: NNV = NV CF etter skatt + NV salgssum + NV spart skatt pga. avskrivninger − NV økt skatt pga. nedskriving.

### Eks 8-6: AS Trevare (r_t = 0,12) – [MANGLER]
Kun avkastningskrav 12 % og samme leddstruktur som AS Cycle er kjent.

### Eks 8-7: Internrente etter skatt – [MANGLER tall]
Metode: beregn NNV ved 10 % og 15 % og interpoler til omtrentlig internrente; eller målsøking i Excel. Hvilket prosjekt/tall som ble brukt, var bilde.

## 8.5 Excel / fallgruver / vektlagt
- Målsøking for internrente etter skatt (sirkelreferanse).
- Gjeldende saldosatser 2025: skatteetaten.no/satser/avskrivningssatser (tabellen var bilde).
- Avskrivninger er ikke kontantstrøm – kun skatteeffekten teller.
- Husk at saldo fortsetter å avskrives etter prosjektets levetid (uendelig rekke) – leddet for spart skatt etter levetid må med.
- Variant 2 gir ikke «korrekt årlig kontantstrøm», bare et beregningsgrunnlag for NV.
- Bruk avkastningskrav etter skatt på kontantstrøm etter skatt.

## 8.6 Spørsmål på lysbildene
- «Hva er nåverdi etter skatt?» (5-årsprosjektet). (utv) «Avskrivning – hva betyr det?»

---

# KAPITTEL 9: Investeringsanalyse og prisstigning

## 9.1 Temaer [LYSBILDE]
- Nominell avkastning og realavkastning
- Reell lånerente (realrente), før og etter skatt
- Realinvesteringer og inflasjon
- Budsjettering av kontantstrøm: nominelle (løpende) priser vs faste (reelle) priser
- Prisstigning og skatt

## 9.2 Begreper [LYSBILDE]
- **Hvorfor inflasjon er relevant**: inflasjon reduserer realverdien av innskudd (penger blir mindre verdt) og reduserer derfor realavkastningen. For gjeld er effekten motsatt: realverdien av gjelden reduseres og lånet blir enklere å betjene over tid (avdrag blir en lavere andel av inntekt, gitt at inntekten øker). Ingen umiddelbar likviditetseffekt; i inflasjonsperioder kan sentralbanken heve renten.
- **Nominell avkastning**: avkastning i løpende kroner (5 % på innskudd 100 → 105).
- **Realavkastning**: avkastning korrigert for prisstigning.
- **Fisher-hypotesen**: nominell avkastning = kompensasjon for prisstigning + realavkastning. Tilnærmet: real ≈ nominell − inflasjon (5 % − 2 % = 3 %). Ikke helt nøyaktig fordi også realavkastningens kjøpekraft må opprettholdes.
- **Kontantstrøm i faste (reelle) priser**: alle beløp uttrykt i dagens pengeverdi (prisnivå år 0).
- **Kontantstrøm i nominelle (løpende) priser**: inflasjonen er bakt inn; beløp i pengeverdien på transaksjonstidspunktet.
- **Realrente etter skatt**: «viser hva et lån virkelig koster». Mest rimelig å ta utgangspunkt i lånets **effektive** rente.

## 9.3 Symboler og formler
Symboler [LYSBILDE]: p_n = nominell rente før skatt; p_r = realrente før skatt; r_n = nominell rente etter skatt; r_r = realrente etter skatt; s = skattesats; j = inflasjonsrate.

Formlene var bilder; [REKONSTRUERT] og kontrollert mot lysbildenes tallsvar:

    p_r = (p_n − j)/(1 + j)            = (0,05 − 0,02)/1,02 = 0,0294 = 2,94 %   (stemmer)
    p_n = p_r·(1 + j) + j              = 0,0294·1,02 + 0,02 = 0,05 = 5 %        (stemmer; lysbildet skriver formen «0,06 · 1,0377 + 0,0377 = 0,10»)
    r_n = p_n·(1 − s)                  = 0,05·0,78 = 0,039 = 3,9 %
    r_r = (r_n − j)/(1 + j)            = (0,039 − 0,02)/1,02 = 0,0186 = 1,86 %  (stemmer)

**OBS avvik på lysbildet:** teksten sier «eller 3,6 %» for nominell rente etter skatt. Med s = 22 % blir det 3,9 %, og det er 3,9 % som gir lysbildets neste svar 1,86 %. «3,6 %» er trolig en rest fra eldre utgave (s = 28 %). Bruk 3,9 %.

Lån med effektiv rente 6 % før skatt [LYSBILDE svar]: r_n = 0,06·0,78 = 0,0468; r_r = (0,0468 − 0,02)/1,02 = 0,0263 = **2,63 %**.

Rekkefølge: **skatt først (på nominell rente), deretter inflasjonsjustering.**

Kontantstrøm: nominell CF_t = fast CF_t · (1 + j)^t.

Konsistensregel [LYSBILDE]:
- Kontantstrøm i løpende (nominelle) priser → nominelt avkastningskrav.
- Kontantstrøm i faste priser → realavkastningskrav.
- Brukes korrekt krav, blir nåverdien den samme uansett.

Internrenter: nominell og reell internrente henger sammen på samme måte [formel bilde; REKONSTRUERT]: IR_real = (IR_nom − j)/(1 + j).

## 9.4 Regneeksempler
### Eks 9-1: Bankinnskudd [LYSBILDE]
Innskudd 100, rente 5 %, etter ett år 105. Inflasjon 2 %. Realavkastning før skatt 2,94 % (tilnærmet 3 %). Etter skatt: nominell 3,9 %, real 1,86 %.

### Eks 9-2: Faste vs nominelle priser, 5 % inflasjon [LYSBILDE oppgave; tabell REKONSTRUERT – antall år på lysbildet ukjent]
Kontantstrøm 1 000 000 i dagens pengeverdi, inflasjon 5 % årlig. «Kontantstrømmen i nominelle priser øker med 5 % årlig.»

| År | Faste priser | Nominelle priser |
|---|---|---|
| 1 | 1 000 000 | 1 050 000 |
| 2 | 1 000 000 | 1 102 500 |
| 3 | 1 000 000 | 1 157 625 |
| 4 | 1 000 000 | 1 215 506 |

### Eks 9-3: «Eksempel – prisstigning» (inflasjon 3,77 %) [delvis MANGLER]
Kjent fra tekst: kontantstrøm i faste priser er konstant (prisnivå år 0); i løpende priser øker den 3,77 % årlig. Forutsatt at inntekter og alle kostnader øker med samme sats – hvis ikke, må man budsjettere i løpende priser. Realavkastningskrav p_r = 6 %; nominelt krav p_n = 0,06 · 1,0377 + 0,0377 = 0,10 = 10 %. «Nåverdien blir identisk.» Selve kontantstrømstallene, NV og internrentene var bilder → [MANGLER].

### Eks 9-4: Spesiell prisstigning [MANGLER tall]
Inntektene øker 3,77 % årlig, kostnadene 6 % årlig → må budsjettere i løpende priser og bruke nominelt krav. Tabellen var bilde.

### Eks 9-5: Inflasjon og skatt [MANGLER tall]
Med skatt er det enklest å budsjettere i **nominelle priser** (beregningsgrunnlag + NV etter skatt som i kap 8, med nominelt krav etter skatt). Nominell internrente etter skatt r_n = 0,0882 = **8,82 %** (funnet med målsøking pga. sirkelreferanse). Inndata var bilde.

## 9.5 Fallgruver / vektlagt
- «Avkastningskrav – vær konsistent»: aldri bland nominell kontantstrøm med realkrav eller omvendt.
- Skatt beregnes av nominelle størrelser; saldoavskrivninger er nominelle → bruk nominelle priser når skatt er med.
- Den enkle differansen (nominell − inflasjon) er bare en tilnærming.
- Figur: nominelle og reelle utlånsrenter 1980–2022 (bilde).

## 9.6 Spørsmål på lysbildene
- Hvorfor er inflasjonen relevant?
- Hva er realavkastningen hvis prisstigningen er 2 %?
- Hva blir kontantstrømmene i faste og nominelle priser?

---

# KAPITTEL 10: Finansiell risiko

## 10.1 Temaer [LYSBILDE]
Introduksjon til finansiell risiko; forventet avkastning og risiko for enkeltaksjer; kovarians og korrelasjon; forventet avkastning og standardavvik for porteføljer; diversifikasjon; effisiente porteføljer; investering i aksjemarkedet i Norge; markedseffisiens.

## 10.2 Begreper [LYSBILDE]
- **Risiko**: situasjoner hvor et utfall ikke er kjent med sikkerhet, men hvor vi kan angi sannsynligheter for hvert utfall. Siden sannsynlighetsfordelingen anses kjent, kan risikoen kvantifiseres.
- **Usikkerhet**: utfall ikke kjent med sikkerhet, og det er heller ikke mulig å angi sannsynligheter.
- **Varians / standardavvik**: beskriver risikoen til en plassering.
- **Aritmetisk avkastning**: P_1/P_0 − 1. **Logavkastning** = LN(kurs dag 2 / kurs dag 1); ofte mer hensiktsmessig fordi logavkastning er **additiv**. Avviket er lite når avkastningen er lav.
- **Usystematisk risiko (bedriftsrisiko)**: gjelder den enkelte bedrift; kan elimineres eller sterkt reduseres ved å sette sammen flere aksjer i en portefølje (diversifikasjon).
- **Systematisk risiko (markedsrisiko)**: påvirker alle bedrifter/aksjemarkedet generelt; kan ikke elimineres ved diversifikasjon.
- **Kovarians og korrelasjonskoeffisient**: mål for sammenhengen mellom avkastningen til enkeltaksjer. Korrelasjonskoeffisienten er normalisert, mellom −1 og +1: −1 perfekt negativ lineær korrelasjon; 0 ingen samvariasjon; +1 perfekt positiv lineær korrelasjon. Mellom aksjekurser ofte rundt 0,3–0,5.
- **Diversifikasjonsprinsippet**: å fordele en investering på mange aksjer reduserer risikoen. Diversifiserbar risiko = delen som kan elimineres. Ikke-diversifiserbar risiko = minimumsnivået som ikke kan fjernes. Diversifikasjon reduserer risiko bare ned til et visst nivå. Allerede med 10 aksjer er risikoreduksjonen vesentlig.
- **Minimum-varians-porteføljen**: porteføljen som minimerer standardavviket.
- **Effisiente porteføljer**: (definert i kap 11-lysbildene) porteføljer som gir høyest mulig avkastning for gitt risiko, eller lavest mulig risiko for gitt avkastning.
- **Aksjeindekser Oslo Børs**: Hovedindeksen **OSEBX** (ca. 60 mest omsatte aksjer, kapitalveid, totalavkastningsindeks: kurs + utbytte); Aksjeindeksen **OSEAX** (alle noterte aksjer, totalavkastningsindeks); Fondsindeksen **OSEFX** (tilpasset aksjefond). Hovedindeksen kalles ofte **markedsporteføljen**, avkastningen **markedsavkastningen r_m**.
- **Markedseffisiens** (Eugene Fama, nobelpris 2013 – «father of the efficient-market hypothesis»):
  - **Svak effisiens**: kursene reflekterer alle historiske prisbevegelser → ingen meravkastning ved å analysere historiske kurser (teknisk aksjeanalyse).
  - **Halvsterk effisiens**: kursene reflekterer i tillegg all tilgjengelig offentlig informasjon.
  - **Sterk effisiens**: prisene reflekterer all informasjon, offentlig eller privat.
- **Aktiv forvaltning**: profesjonelle forvaltere velger ut aksjer for å «slå markedet». **Passiv forvaltning**: portefølje lik børsens indeks, avkastning som børsen generelt; fordelen er mye lavere kostnader.
- **Mean reversion**: gjennomsnittlig avkastning på børsen er ganske stabil – over tid dras avkastningen mot gjennomsnittet. Standardavviket kan derfor overdrive risikoen ved lang plasseringshorisont; sannsynligheten for å tape penger er mer relevant for mange.
- **Equity premium puzzle**: avkastningen på børs er historisk «uforklarlig høy». Årlig realavkastning 1982–2024: snitt 7,05 %.

## 10.3 Formler (alle formelbilder manglet; [REKONSTRUERT] og kontrollert mot lysbildenes tall)

    E(r) = Σ p_s · r_s
    Var(r) = σ² = Σ p_s · (r_s − E(r))²,   σ = √Var
    Empirisk: s² = Σ (r_t − r̄)² / (n − 1)   (Excel STDAV.S)
    Årlig standardavvik = daglig standardavvik · √252                     [LYSBILDE]
    Kov(A,B) = Σ p_s · (r_A,s − E(r_A)) · (r_B,s − E(r_B))
    ρ_AB = Kov(A,B) / (σ_A · σ_B)   ⇔   Kov(A,B) = ρ_AB · σ_A · σ_B
    E(r_p) = w_A·E(r_A) + w_B·E(r_B)       (veid gjennomsnitt)            [LYSBILDE prinsipp]
    Var(r_p) = w_A²σ_A² + w_B²σ_B² + 2·w_A·w_B·ρ_AB·σ_A·σ_B   (= … + 2·w_A·w_B·Kov(A,B))
    Minimum varians: w_A* = (σ_B² − Kov(A,B)) / (σ_A² + σ_B² − 2·Kov(A,B))
    Geometrisk årlig avkastning: r = (P_n/P_0)^(1/n) − 1                  [LYSBILDE]
    Logavkastning årlig (kontinuerlig): r = LN(P_n/P_0)/n                 [LYSBILDE]

ρ = +1: standardavviket blir bare veid sum av enkeltaksjenes standardavvik (ingen diversifikasjonseffekt). ρ = −1: all risiko kan fjernes. Jo lavere korrelasjon, jo mer risikoreduksjon. [LYSBILDE]

## 10.4 Regneeksempler

### Eks 10-1: Aksje A og B – forventet avkastning og standardavvik [LYSBILDE; varians REKONSTRUERT og stemmer med grafdata]
Aksje A kjøpt for 200, B for 150. Sannsynlighet oppgang 0,55, nedgang 0,45.
- A: opp til 240 (+20 %), ned til 190 (−5 %). B: opp til 195 (+30 %), ned til 135 (−10 %).
- Forventet kurs A: 240·0,55 + 190·0,45 = 217,50; B: 195·0,55 + 135·0,45 = 168,00.
- Forventet avkastning A: 17,50/200 = **8,75 %**; B: 18,00/150 = **12,00 %**.
  (Skrivefeil på lysbildet: «0,0120» skal være 0,12, og «Kurs øker til 190» for B skal være 195.)
- Var(A) = 0,55·(0,20 − 0,0875)² + 0,45·(−0,05 − 0,0875)² = 0,015469 → σ_A = **12,44 %**.
- Var(B) = 0,55·(0,30 − 0,12)² + 0,45·(−0,10 − 0,12)² = 0,0396 → σ_B = **19,90 %**.

### Eks 10-2: Kovarians, korrelasjon og portefølje av A og B [REKONSTRUERT – simultanfordelingen var bilde]
Lysbildets grafdata («Effisiente porteføljer», se tabell under) er bare forenlige med Kov(A,B) = −0,00525 og ρ = −0,212. Det svarer til følgende simultanfordeling (marginaler 0,55/0,45 for begge aksjer), som gjengir alle 11 punkter eksakt:

| | B opp (+30 %) | B ned (−10 %) |
|---|---|---|
| A opp (+20 %) | 0,25 | 0,30 |
| A ned (−5 %) | 0,30 | 0,15 |

- Kov = 0,25·(0,1125)(0,18) + 0,30·(0,1125)(−0,22) + 0,30·(−0,1375)(0,18) + 0,15·(−0,1375)(−0,22) = **−0,00525**.
- ρ = −0,00525/(0,1244·0,1990) = **−0,212**.
- Likeveid portefølje (50/50): E(r_p) = 10,38 %; Var = 0,25·0,015469 + 0,25·0,0396 + 2·0,25·(−0,00525) = 0,011142 → σ_p = **10,56 %**.
- Minimum varians: w_A* = (0,0396 + 0,00525)/(0,015469 + 0,0396 + 0,0105) = **0,684** (68,4 % i A).

Porteføljer ved ulike andeler (tallene E(r) og σ er [LYSBILDE], grafdata; andelene er utledet):

| Andel A | Andel B | Forventet avkastning | Standardavvik |
|---|---|---|---|
| 0 % | 100 % | 12,00 % | 19,90 % |
| 10 % | 90 % | 11,68 % | 17,69 % |
| 20 % | 80 % | 11,35 % | 15,58 % |
| 30 % | 70 % | 11,03 % | 13,63 % |
| 40 % | 60 % | 10,70 % | 11,92 % |
| 50 % | 50 % | 10,38 % | 10,56 % |
| 60 % | 40 % | 10,05 % | 9,69 % |
| 70 % | 30 % | 9,73 % | 9,45 % |
| 80 % | 20 % | 9,40 % | 9,90 % |
| 90 % | 10 % | 9,08 % | 10,95 % |
| 100 % | 0 % | 8,75 % | 12,44 % |

Effisiente porteføljer = den øvre delen av kurven (fra minimum-varians-porteføljen og oppover i avkastning). Tabellen «standardavvik ved ulike korrelasjonskoeffisienter» var bilde [MANGLER], men kan regnes med formelen.

### Eks 10-3: Olav Thon, juli 2022 [LYSBILDE]
Kurs 165 (1. juli) → 168 (4. juli). Aritmetisk avkastning 168/165 − 1 = 0,01818 ≈ 1,82 %. Logavkastning LN(168/165) = 0,01809 ≈ 1,80 %. Tabellene for empirisk varians/standardavvik og årlig standardavvik 2018–2021 var bilder [MANGLER].

### Eks 10-4: Hovedindeksen 1996–2024 [LYSBILDE]
Indeks fra 100 til 1 425,05 over 29 år.
- Geometrisk (årlig renteberegning): (1 + r)^29 = 14,2505 → r = 14,2505^(1/29) − 1 = **9,59 %**.
- Logavkastning (kontinuerlig): e^(r·29) = 14,2505 → r = LN(14,2505)/29 = 2,656792/29 = **9,16 %**.

### Eks 10-5: BW Offshore, «positiv trend september 2018?» [LYSBILDE grafdata]
Illustrasjon mot teknisk analyse/svak effisiens: kursen var ca. 60–66 i september 2018 og falt til ca. 30–32 i slutten av desember 2018.

## 10.5 Excel / vektlagt
- `=STDAV.S(...)` empirisk standardavvik; `=LN(...)`.
- Skille risiko/usikkerhet; systematisk/usystematisk; tre effisiensformer; aktiv/passiv forvaltning.
- Avisoppslag (DN 7.9.24, Aftenposten 27.02.25) om aktiv vs passiv forvaltning (bilder).

## 10.6 Spørsmål på lysbildene
- Kan investorer konsekvent «plukke vinnere» eller oppnå høyere avkastning enn markedet?
- Er det mulig å «slå markedet» over tid? Aktiv eller passiv forvaltning?
- Er aksjemarkedet tryggere enn det ser ut til?

---

# KAPITTEL 11: Risiko og avkastning

## 11.1 Temaer [LYSBILDE]
Utdyping av risikobegrepet; systematisk risiko for enkeltaksjer; kapitalverdimodellen; egenkapitalkostnad, gjeldskostnad og totalkapitalkostnad; avkastningskrav i praksis.

## 11.2 Begreper [LYSBILDE]
- **Hovedidé**: rasjonelle investorer har **risikoaversjon** – de pådrar seg ikke risiko uten kompensasjon i form av høyere forventet avkastning. Aksjemarkedet bestemmer prisen på risiko gjennom aksjekursene. Uten risikovilje: plassering i f.eks. statsobligasjoner gir **risikofri rente** r_f.
- **Markedsrisiko = systematisk risiko**; **bedriftsrisiko/aksjespesifikk risiko = usystematisk risiko** (Markowitz, nobelpris 1990). Ikke alle risikokilder påvirker bedriftene likt: melkeprisen er viktig for Synnøve Finden, men neppe for Hydro (usystematisk). Økt rentenivå påvirker alle bedrifter (systematisk); også inflasjonsfare, økonomisk vekst.
- Usystematisk risiko kan langt på vei fjernes i en portefølje, **derfor blir investor heller ikke belønnet for å bære den**.
- **Veldiversifisert portefølje**: portefølje hvor det meste av den usystematiske risikoen er fjernet.
- **Kapitalmarkedslinjen (CML)**: kombinasjoner av risikofri plassering og risikabel portefølje. Helningen = **Sharpe-ratio**. Høyest Sharpe-ratio i M – **markedsporteføljen**.
- **Kapitalverdimodellen (KVM)**: forventet avkastning/avkastningskrav på en aksje består av risikofri rente r_f pluss aksjens risikopremie, som avhenger av aksjens systematiske risiko. All usystematisk risiko er diversifisert bort og er ikke relevant.
- **Beta (β)**: måler systematisk risiko – hvor følsom en aksjes avkastning er for endringer i markedet. β = 1,2 betyr at hvis markedet går opp 1 %, er forventet økning i aksjekursen 1,2 %.
- **WACC** (Weighted Average Cost of Capital) = avkastningskrav til totalkapitalen = r_t.
- **Småbedriftspremie**: tillegg i avkastningskravet for småbedrifter (avhengighet av nøkkelpersoner, få kjerneprodukter/kunder, vanskeligere finansiering). Rundt 80 % bruker småbedriftspremie.

## 11.3 Formler

Portefølje av risikofri plassering og én risikabel aksje (andel w i aksjen, 1 − w risikofritt) [formler bilde; REKONSTRUERT, regelen for standardavvik er LYSBILDE]:

    E(r_p) = w·E(r_Y) + (1 − w)·r_f
    σ_p = w·σ_Y        (standardavviket til risikofri plassering er 0)
    Sharpe-ratio = (E(r_p) − r_f)/σ_p      (helning på kapitalmarkedslinjen)

**Kapitalverdimodellen – varianten foreleser bruker [LYSBILDE]: UTEN skattejustering av risikofri rente:**

    r_e = r_f + β_e·(r_m − r_f)

(r_m − r_f = markedets risikopremie.) Det finnes ingen (1 − s)-justering av r_f i lysbildene.
NB: Læreboken (Bredesen) kan ha en skattejustert variant; forelesningen bruker den enkle varianten over.

Beta [formel bilde; REKONSTRUERT standard, beskrivelsen «forholdet mellom kovariansen og markedets varians» er LYSBILDE]:

    β_j = Kov(r_j, r_m)/Var(r_m)

Estimering: minste kvadraters metode (lineær regresjon) Y = β0 + β1·X, Y = aksjens avkastning, X = markedets avkastning; helningen = β.
Porteføljebeta = veid sum av enkeltbetaene: β_p = Σ w_i·β_i [LYSBILDE prinsipp].

Gjeldskostnad via KVM (bare når gjelden er omsatt; ellers er gjeldsrenten oppgitt) [LYSBILDE]:

    r_g = r_f + β_g·(r_m − r_f)

**WACC [LYSBILDE]:**

    WACC = r_t = r_e·E/V + r_g·(1 − s)·G/V

- V = total markedsverdi, E = markedsverdi egenkapital, G = markedsverdi gjeld, V = E + G, E/V + G/V = 1.
- **«Pass på at gjeldsrenten skal uttrykkes etter skatt»** – (1 − s) kun på gjeldsleddet.
- **Markedsverdier** skal brukes (børskurs for EK; kan avvike betydelig fra bokført). Hvis selskapet ikke er i betalingsvansker, kan markedsverdi av gjeld settes lik bokført verdi.

## 11.4 Regneeksempler
### Eks 11-1: Kapitalmarkedslinjen [LYSBILDE oppgave; tall MANGLER]
1 000 kr å plassere: 350 kr i aksje Y (w = 35 %), resten risikofritt. Forventet avkastning og standardavvik? E(r_Y), σ_Y og r_f sto i bilde → [MANGLER]. Metode: E(r_p) = 0,35·E(r_Y) + 0,65·r_f; σ_p = 0,35·σ_Y.

### Eks 11-2: KVM [LYSBILDE inndata; svar REKONSTRUERT]
r_f = 0,03, markedets risikopremie r_m − r_f = 0,06, β = 1,5 → r = 0,03 + 1,5·0,06 = **0,12 = 12 %**.

### Eks 11-3: Beta Olav Thon ASA [LYSBILDE]
Månedlig avkastning over 5 år (2018–2022) mot markedet; regresjon i Excel (Data → Dataanalyse → Regresjon). **β = 1,23**. Tabell med aksjebetaer 2018–2022 var bilde [MANGLER].

### Eks 11-4: WACC trinn for trinn [LYSBILDE; sluttsvar REKONSTRUERT]
1. Egenkapitalkostnad: r_f = 0,03, r_m = 0,09, β_e = 1,55 → r_e = 0,03 + 1,55·(0,09 − 0,03) = **0,1230 = 12,30 %**.
2. Gjeldsrente: β_g = 0,24 → r_g = 0,03 + 0,24·0,06 = **0,0444 = 4,44 %**.
3. Vekter: E/V = 0,40, G/V = 0,60.
4. WACC = 0,123·0,40 + 0,0444·(1 − 0,22)·0,60 = 0,0492 + 0,0208 = **0,0700 ≈ 7,0 %** [REKONSTRUERT med s = 22 %; lysbildets sluttsvar var bilde].

## 11.5 Avkastningskrav i praksis [LYSBILDE]
- KVM er mindre relevant for investorer uten veldiversifisert portefølje – for dem er også usystematisk risiko viktig.
- Betaverdier finnes bare for børsnoterte selskaper; publiserte verdier kan brukes som tilnærming for andre selskaper i samme bransje. Betaverdier kan justeres for ulik finansiell og driftsmessig risiko.
- Studie (2012) blant Norges 500 største bedrifter om metoder og avkastningskrav.
- PwC/NFF-undersøkelsen: de fleste bruker **10-årig statsobligasjonsrente** som risikofri rente og en **markedsrisikopremie på 5 %**.
- Ca. 80 % bruker småbedriftspremie.
- Excel: Data → Dataanalyse → Regresjon.

## 11.6 Fallgruver / vektlagt
- Bare systematisk risiko prises.
- Skattejustering kun av gjeldsrenten i WACC.
- Markedsverdier, ikke bokførte verdier, som vekter.
- Tre beregninger: (1) EK-krav, (2) gjeldskostnad, (3) veie sammen til WACC.

## 11.7 Spørsmål på lysbildene
- Hva blir forventet avkastning og standardavvik for porteføljen (350 i aksje Y, resten risikofritt)?
- Hva er egenkapitalens avkastningskrav? Hva er gjeldskostnaden?
- Hvilken rente og hvilken risikopremie skal brukes ved beregning av WACC? Hva med småbedriftene?

---

# KAPITTEL 12
**Ingen forelesnings-PowerPoint.** Ikke dekket i dette uttrekket.

---

# KAPITTEL 13: Opsjoner

(Filens første overskrift er feilaktig «Handelsfinansiering» – gjenbrukt mal; innholdet er kapittel 13 Opsjoner.)

## 13.1 Temaer [LYSBILDE]
Hva er en opsjon? Opsjonsmarkedet på Oslo Børs. Motiver bak opsjonshandel. Verdsettelse av opsjoner. Binomialmodellen. Salg-kjøp-pariteten.

## 13.2 Begreper [LYSBILDE]
- **Derivater**: verdipapirer hvor verdien avhenger av («derived from») et underliggende objekt. Opsjoner og terminkontrakter.
- Oslo Børs startet omsetning av **standardiserte** aksjeopsjoner i mai 1990. Standardisering = standard vilkår → lettere å omsette over børs. Alternativ: skreddersydde instrumenter, **OTC (Over The Counter)**, der kjøper og selger avtaler vilkårene seg imellom.
- **Opsjon**: gir eieren **rett, men ikke plikt**, til å selge eller kjøpe det underliggende objektet til en på forhånd avtalt pris, **på** (europeisk) eller **innen** (amerikansk) en bestemt dato. Betegnelsene har ingenting med geografi å gjøre. Aksjeopsjoner på Oslo Børs er amerikanske; indeksopsjoner er europeiske.
- **Kjøpsopsjon (call)**: rett til å kjøpe. **Salgsopsjon (put)**: rett til å selge.
- **Innløsningskurs / utøvelsespris (strike/exercise price)**: prisen man har rett, men ikke plikt, til å kjøpe/selge for. Standardiserte, fastsettes etter bestemte regler.
- **Bortfallsdato/utløpsdato (expiration date)**.
- **Utsteder (writer)** = selger av opsjonen. **Holder** = kjøper/eier.
- **Kontraktsstørrelse Oslo Børs**: hver kontrakt omfatter 100 underliggende aksjer; minimum 10 kontrakter pr. handel → minimum 1 000 aksjer.
- **Opsjonspremie**: prisen kjøper betaler for opsjonen.
- **ITM (In The Money)**: opsjonen er lønnsom å utøve. Kjøpsopsjon ITM når aksjekurs > innløsningskurs; salgsopsjon ITM når aksjekurs < innløsningskurs. **OTM (Out of The Money)**: ikke lønnsom å utøve. **ATM (At The Money)**: innløsningskurs = aksjekurs.
- **Nullsumspill**: når vi ser bort fra transaksjonskostnader – den enes gevinst er den andres tap.
- **Fire grunnposisjoner**: kjøp av kjøpsopsjon, salg (utstedelse) av kjøpsopsjon, kjøp av salgsopsjon, salg (utstedelse) av salgsopsjon.
  - Kjøper av kjøpsopsjon: forventer kursoppgang. Maks tap = premien; gevinstmulighet i prinsippet uendelig.
  - Utsteder av kjøpsopsjon: forventer fall/stabil kurs slik at opsjonen blir OTM og premien blir gevinst; **ubegrenset tapsmulighet**.
  - Kjøper av salgsopsjon: forventer kursfall; eier du aksjen, **forsikrer** du kursen.
  - Utsteder av salgsopsjon: forventer kursoppgang slik at premien blir ren gevinst. (Lysbildet skriver «slik at opsjonen blir ITM» – det må være OTM; skrivefeil.)
- **Opsjonsverdi = realverdi + tidsverdi**.
  - **Realverdi**: kjøpsopsjon = aksjekurs − innløsningskurs; salgsopsjon = innløsningskurs − aksjekurs. Kan aldri bli negativ (max(0, ·)).
  - **Tidsverdi**: verdien ut over realverdien (markedskurs − realverdi). Reflekterer markedets prising av sjansen for å tjene penger innen bortfall. Størst i begynnelsen, reduseres stadig mer mot bortfall (fallet akselererer mot slutten), og er null på bortfallsdagen.
- «Hva påvirker opsjonsverdien?» – tabellen var bilde [MANGLER]. (Standard: aksjekurs, innløsningskurs, tid til bortfall, volatilitet, risikofri rente, utbytte.)
- **Opsjonsekvivalenten**: en «kunstig» portefølje som gir samme avkastning som opsjonen: kjøpe en andel **m** av underliggende aksje + ta opp et lån **L**. Samme avkastning ⇒ samme pris.
- **Black-Scholes**: den mest avanserte modellen; kurset bruker den forenklede **binomialmodellen**, som har mange av de samme egenskapene.

## 13.3 Formler

Gevinst ved bortfall, pr. aksje [REKONSTRUERT standard, i tråd med eksemplene]:

    Kjøper kjøpsopsjon:  max(0, P − I) − premie
    Selger kjøpsopsjon:  premie − max(0, P − I)
    Kjøper salgsopsjon:  max(0, I − P) − premie
    Selger salgsopsjon:  premie − max(0, I − P)

Binomialmodellen – symboler [LYSBILDE]: P_0 = aksjekurs nå; p = sannsynlighet for kursøkning; u = multiplikator ved oppgang; d = multiplikator ved nedgang; u·P_0 og d·P_0 = aksjekurs ved oppgang/nedgang; K_0 = dagens verdi av kjøpsopsjonen; K_u = max(0, u·P_0 − I); K_d = max(0, d·P_0 − I); I = innløsningskurs; r_f = risikofri rente; m = andel av aksjen; L = lån; S_0 = verdi salgsopsjon.

    m = (K_u − K_d)/(u·P_0 − d·P_0)                       [REKONSTRUERT; stemmer med regnearket: 0,7778]
    L = −(m·d·P_0 − K_d)/(1 + r_f)                        [REKONSTRUERT; stemmer: −55,56]
    K_0 = m·P_0 + L                                       [LYSBILDE]
    Salg-kjøp-paritet:  S_0 = K_0 + I/(1 + r_f) − P_0     [LYSBILDE: «Salgsopsjon = Kjøpsopsjon + NV innløsning − aksjekurs»]

**Merk:** sannsynligheten p (0,6/0,4) brukes ikke i prisingen.

Black-Scholes (kun i regnearket; formler ikke vist på lysbilder) [REKONSTRUERT standard, kontrollert mot regnearkets d1]:

    d1 = [LN(P_0/I) + (r_f + σ²/2)·T]/(σ·√T),   d2 = d1 − σ·√T
    Kjøpsopsjon = P_0·N(d1) − I·e^(−r_f·T)·N(d2)
    Salgsopsjon = Kjøpsopsjon + I·e^(−r_f·T) − P_0

## 13.4 Regneeksempler

### Eks 13-1: Kjøp av kjøpsopsjon [LYSBILDE; gevinsttall REKONSTRUERT]
Aksjekurs 380. Kjøpsopsjon med innløsningskurs 400, premie 22 pr. aksje, 100 aksjer → betaler 2 200. Kurs ved bortfall 450.
- Gevinst: (450 − 400 − 22)·100 = **2 800** (utøvelsesverdi 5 000 − premie 2 200). Nullpunkt ved kurs 422. Maks tap 2 200.

### Eks 13-2: Giring med kjøpsopsjoner [LYSBILDE oppgave; svar REKONSTRUERT]
38 000 å spekulere for: enten 38 000/380 = 100 aksjer, eller 38 000/22 = 1 727,27 kjøpsopsjoner (innløsning 400).

| Kurs ved bortfall | Gevinst aksjer | Gevinst opsjoner |
|---|---|---|
| 450 | 100·(450 − 380) = +7 000 (+18,4 %) | 1 727,27·50 − 38 000 = +48 364 (+127 %) |
| 350 | 100·(350 − 380) = −3 000 (−7,9 %) | −38 000 (−100 %) |

Likeverdige strategier: 100·(P − 380) = 1 727,27·(P − 400) − 38 000 → **P ≈ 424,58**.

### Eks 13-3: Kjøp av salgsopsjon [LYSBILDE]
Aksjekurs 380, salgsopsjon med innløsningskurs 400, premie 44, 100 aksjer → premie 4 400. Maks tap 4 400. Maks gevinst (kurs → 0): 400·100 = 40 000 − 4 400 = **35 600**. Nullpunkt ved kurs 356 [REKONSTRUERT].

### Eks 13-4: Binomialmodellen [LYSBILDE + regneark]
P_0 = 150. Neste periode: +100 % til 300 (sanns. 0,6) eller −50 % til 75 (sanns. 0,4). u = 2, d = 0,5. Kjøpsopsjon med innløsningskurs I = 125 (ITM nå). r_f = 5 %.
- K_u = max(0, 300 − 125) = 175. K_d = max(0, 75 − 125) = 0.
- m = (175 − 0)/(300 − 75) = **0,7778**.
- L = −(0,7778·75 − 0)/1,05 = **−55,56** (regnearket viser avrundet −56).
- K_0 = 0,7778·150 − 55,56 = **61,11**.
- S_0 = 61,11 + 125/1,05 − 150 = **30,16**.
- Kontroll av replikering: opp: 0,7778·300 − 58,33 = 175; ned: 0,7778·75 − 58,33 = 0.

Regnearket «Opsjonsprising.xlsx», ark binomialmodell («Legg inn tall i gule celler, modellen beregner resten»):

| Inndata | Verdi | Beregnet | Verdi |
|---|---|---|---|
| P0 | 150 | uP0 | 300 |
| u | 2,0 | dP0 | 75 |
| d | 0,5 | m | 0,7778 |
| I | 125 | L | −56 (−55,56) |
| rf | 5,0 % | Ku | 175 |
| | | Kd | 0 |
| | | K0 (kjøpsopsjon) | 61,11 |
| | | S0 (salgsopsjon) | 30,16 |

### Eks 13-5: Black-Scholes (regnearket) [REGNEARK]

| Inndata | Verdi |
|---|---|
| Aksjekurs nå | 186,15 |
| Innløsningskurs | 195,00 |
| Risikofri rente | 2,75 % |
| Standardavvik | 25,00 % |
| Tid til bortfall | 51 dager = 0,14 år (51/365) |
| d1 | −0,4091804 |
| d2 | −0,5026303 |
| N(d1) | 0,3412036 |
| N(d2) | 0,3076121 |
| **Verdi kjøpsopsjon** | **3,76** |
| **Verdi salgsopsjon** | **11,86** |

### Annet
- Opsjonskurser Equinor 28. august 2023, aksjekurs 323,80 – kurstabellen var bilde [MANGLER].
- Lysbildene henviser til «Oppgave 1 kapittel 13» og «Oppgave 4 kapittel 13» (lærebokoppgaver gjennomgått i forelesning; innhold ikke i lysbildene).
- Avkastningsdiagrammer (pay-off) for de fire grunnposisjonene og «Markedsverdi – kjøpsopsjon» var figurer [MANGLER].

## 13.5 Fallgruver / vektlagt
- Rett, ikke plikt (kjøper); utsteder har plikt.
- Amerikansk vs europeisk (innen vs på dato).
- Realverdi aldri negativ; tidsverdi = 0 ved bortfall.
- Sannsynlighetene inngår ikke i binomialprisen.
- L er negativ (lån); NV av innløsningskurs diskonteres med r_f i pariteten.
- Kontrakt = 100 aksjer (gang premie med 100).

## 13.6 Spørsmål på lysbildene
- Hva er en opsjon? Hvorfor handles det med opsjoner?
- Giring: Hva blir gevinsten hvis kursen blir 450? 350? Hva må kursen være for at strategiene er likeverdige?
- Hva er en opsjon verdt? Hva påvirker opsjonsverdien?
- Hvilken pay-off gir kjøpsopsjonen ved bortfall? Hva er opsjonen verdt i dag?

---

# SAMLET OVERSIKT OVER HULL (innhold som var bilder)

| Kap | Mangler helt (inndata ukjent) | Rekonstruert uten fasit å kontrollere mot |
|---|---|---|
| 7 | Power-tilbudstabell; «Factoring hos Elcon» | Leverandørkreditt-svar; kassekreditt m/tilleggsrente; factoring-løsning; leasing-svar; restgjeld boliglån; over-/underkurs etter 3 år |
| 8 | AS Cycle; AS Trevare; internrente-eksempel (10 %/15 %); saldosatstabell 2025; skattesatshistorikk | Formelbildene (NV etter skatt, salgsledd); mellomtall i eks 8-3 og 8-4 (sluttsvar lysbilde ukjent, men restverdier stemmer) |
| 9 | Eks. prisstigning 3,77 % (kontantstrøm, NV, IR); spesiell prisstigning; inflasjon og skatt (IR 8,82 %) | – (formler kontrollert mot tallsvar) |
| 10 | Olav Thon varians-tabell; korrelasjonstabeller; std.avvik ved ulike ρ | Simultanfordeling A/B (gjengir lysbildets 11 grafpunkter eksakt) |
| 11 | CML-eksemplets tall for aksje Y; betatabell; | WACC-sluttsvar 7,0 % |
| 13 | Equinor-kurstabell; pay-off-figurer; «hva påvirker opsjonsverdien»-tabell | Gevinsttall i eks 13-1/13-2 |
