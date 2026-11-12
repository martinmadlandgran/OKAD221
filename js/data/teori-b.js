/* Teori og quiz, kapittel 7–13. */
(function (root) {
  'use strict';
  const O = (root.OKAD = root.OKAD || {});
  O.theory = O.theory || []; O.quiz = O.quiz || [];

  /* ===================================================================== */
  /* KAPITTEL 7                                                            */
  /* ===================================================================== */
  O.theory.push({
    nr: 7,
    title: 'Lønnsomhetsvurderinger av lån',
    examWeight: 'høy',
    summary: `<p>Et lån har en <strong>nominell rente</strong>, men det låntakeren faktisk betaler bestemmes også av gebyrer og av at renter belastes flere ganger i året. Den samlede kostnaden uttrykkes med lånets <strong>effektive rente</strong>, som er <em>internrenten til lånets kontantstrøm</em>: netto utbetalt beløp i dag mot alle fremtidige betalinger (renter, avdrag og gebyrer).</p>
<p>Fremgangsmåten er alltid den samme: (1) sett opp kontantstrømmen med tiden mellom to betalinger som én periode, (2) finn internrenten per periode <i>q</i>, (3) regn om til årsrente med <i>p</i> = (1 + <i>q</i>)<sup>m</sup> − 1, der <i>m</i> er antall betalinger per år. Perioderenten skal altså ikke ganges med <i>m</i>.</p>
<p>For <strong>annuitetslån</strong> er terminbeløpet (renter + avdrag) konstant; rentedelen faller og avdragsdelen øker. For <strong>serielån</strong> er avdraget konstant, slik at terminbeløpet faller. <strong>Restgjelden</strong> er alltid lik nåverdien av de gjenstående betalingene diskontert med lånets nominelle perioderente. Diskonterer du de samme betalingene med en ny markedsrente, får du det et fastrentelån er verdt i dag – differansen mot restgjelden er <strong>over- eller underkurs</strong>.</p>
<p>Samme tankegang brukes på næringslivets låneformer: <strong>leverandørkreditt</strong> (å la være å bruke kontantrabatten er å låne av leverandøren), <strong>kassekreditt</strong> (rente på trukket beløp + provisjon av hele rammen), <strong>factoring</strong> (kostnad i prosent av frigjort kapital) og <strong>leasing</strong> (internrenten til forskjellen i kontantstrøm mellom å lease og å kjøpe).</p>`,
    concepts: [
      { term: 'Nominell rente', def: `Rentekostnaden som påløper på lånet, oppgitt per år. Nominell perioderente = nominell årsrente / <i>m</i> (f.eks. 4,45 % / 12 = 0,371 % per måned).` },
      { term: 'Effektiv rente', def: `Internrenten til lånets kontantstrøm, uttrykt per år. Tar hensyn til alle kostnader (etableringsgebyr, termingebyr) og til at det betales flere ganger per år.` },
      { term: 'Ytelse / terminbeløp', def: `Det som betales til banken hver termin: renter + avdrag (+ termingebyr).` },
      { term: 'Annuitetslån', def: `Lån der summen av renter og avdrag er konstant i hele nedbetalingstiden. Rentedelen reduseres og avdragsdelen øker over tid.` },
      { term: 'Serielån', def: `Lån med konstante avdrag. Renten beregnes av restgjelden og faller, slik at terminbeløpet blir lavere for hver termin.` },
      { term: 'Restgjeld', def: `Det som gjenstår å betale i avdrag. Alltid lik nåverdien av de gjenværende betalingene (uten gebyr), diskontert med lånets nominelle perioderente.` },
      { term: 'Overkurs / underkurs', def: `Ved førtidig innfrielse av fastrentelån: har markedsrenten <em>falt</em>, er de gjenstående betalingene verdt mer enn restgjelden, og låntaker må betale <strong>overkurs</strong>. Har markedsrenten <em>økt</em>, får låntaker <strong>underkurs</strong> (innfrir til mindre enn restgjelden).` },
      { term: 'Leverandørkreditt', def: `Betalingsbetingelser som «netto per 30 dager, eller 10 dager – 2 % rabatt». Å betale på forfall i stedet for å ta rabatten tilsvarer et lån fra leverandøren i 20 dager.` },
      { term: 'Kassekreditt', def: `Kortsiktig driftskreditt med en bevilget ramme (<em>limit</em>). Det betales rente av trukket beløp og provisjon av hele rammen, vanligvis per kvartal.` },
      { term: 'Factoring', def: `Et factoringselskap overtar administrasjonen av kundefordringene og forskutterer en andel av dem. Lønnsomheten vurderes ved å se hvor mye kapital som frigjøres og hva det koster netto.` },
      { term: 'Leasing', def: `Leie av driftsmiddel som alternativ til kjøp med lån. Effektiv rente finnes fra forskjellen i kontantstrøm mellom kjøp og leasing, og sammenlignes med bankens lånerente.` }
    ],
    formulas: [
      { name: 'Effektiv perioderente (internrente)', html: `CF<sub>0</sub> = Σ<sub>t=1…n</sub> <span class="frac"><span>CF<sub>t</sub></span><span>(1 + q)<sup>t</sup></span></span>`, note: `CF<sub>0</sub> = netto utbetalt lån (lånebeløp − etableringsgebyr), CF<sub>t</sub> = alle betalinger knyttet til lånet (renter, avdrag, termingebyr), <i>q</i> = effektiv rente per periode. Løses med RENTE (annuitet) eller IR.` },
      { name: 'Fra perioderente til effektiv årsrente', html: `p = (1 + q)<sup>m</sup> − 1`, note: `<i>m</i> = antall betalinger per år (halvårlig 2, kvartalsvis 4, månedlig 12).` },
      { name: 'Terminbeløp annuitetslån', html: `Terminbeløp = Lån · <span class="frac"><span>i</span><span>1 − (1 + i)<sup>−n</sup></span></span>`, note: `<i>i</i> = nominell perioderente, <i>n</i> = antall terminer. Beregnes av brutto lånebeløp. I Excel: AVDRAG(i; n; −lån).` },
      { name: 'Renter og avdrag i en termin', html: `Rente<sub>t</sub> = i · Restgjeld<sub>t−1</sub> &nbsp;&nbsp;&nbsp; Avdrag<sub>t</sub> = Terminbeløp − Rente<sub>t</sub>`, note: `Gjelder annuitetslån. For serielån er avdraget lån / n, og terminbeløpet = avdrag + rente.` },
      { name: 'Restgjeld', html: `Restgjeld<sub>k</sub> = Terminbeløp · <span class="frac"><span>1 − (1 + i)<sup>−(n − k)</sup></span><span>i</span></span>`, note: `Nåverdien av de <i>n − k</i> gjenstående terminbeløpene (uten gebyr) med nominell perioderente <i>i</i>.` },
      { name: 'Over-/underkurs på fastrentelån', html: `Kurs = NV(gjenstående terminbeløp; ny markedsrente) − Restgjeld`, note: `Positiv differanse = overkurs (markedsrenten har falt), negativ = underkurs (markedsrenten har økt).` },
      { name: 'Leverandørkreditt', html: `q = <span class="frac"><span>rabatt</span><span>1 − rabatt</span></span> &nbsp;&nbsp;&nbsp; p = (1 + q)<sup>360 / kredittdager</sup> − 1`, note: `Kredittdager = dagene mellom rabattfrist og forfall. Bruk antall dager i året som oppgaveteksten sier. Står det ingenting, bruk 360 og skriv det i svaret. Løsningsforslagene til kapittel 7 bruker 360, kapittel 12 oppg. 3 bruker 365, og forelesningens eksempel sier ikke hvilket. Eksempel: 98 om 15 dager eller 100 om 45 dager gir q = 2/98 = 2,04 % per 30 dager og p = 1,0204<sup>12</sup> − 1 = 27,43 %.` },
      { name: 'Kassekreditt, effektiv rente per kvartal', html: `q = rente per kvartal + <span class="frac"><span>provisjon per kvartal</span><span>utnyttelsesgrad</span></span>`, note: `Utnyttelsesgrad = trukket beløp / limit. Årsrente = (1 + q)<sup>4</sup> − 1. Eksempel: 6,2 %/4 + 0,33 %/0,50 = 2,21 % per kvartal → 9,14 % per år.` },
      { name: 'Factoring', html: `Kostnad i % = <span class="frac"><span>renter på forskudd + gebyrer − sparte adm.kostnader</span><span>frigjort kapital</span></span>`, note: `Kundefordringer = kredittsalg · kredittdager / 360. Bruk antall dager i året som oppgaveteksten sier. Står det ingenting, bruk 360 og skriv det i svaret. Løsningsforslagene til 7.7b og 7.8 bruker 360. Frigjort kapital = kundefordringer før − det bedriften selv binder etter (marginen til kunden betaler, og hele fakturaen til forskuddet kommer). Rentene regnes av forskuttert beløp, som er lik frigjort kapital når kredittiden ikke endres.` }
    ],
    methods: [
      { title: 'Annuitetslån med gebyrer (den typiske eksamensoppgaven)', steps: [
        `Finn nominell perioderente: i = nominell årsrente / m.`,
        `Terminbeløp uten gebyr av <strong>brutto</strong> lånebeløp: AVDRAG(i; n; −lån).`,
        `Splitt de første terminene: rente = i · restgjeld ved terminens start, avdrag = terminbeløp − rente, ny restgjeld = gammel − avdrag.`,
        `Kontantstrøm for effektiv rente: CF<sub>0</sub> = lån − etableringsgebyr (netto utbetalt). Betaling per termin = terminbeløp + termingebyr.`,
        `Effektiv perioderente: RENTE(n; −(terminbeløp + gebyr); netto utbetalt).`,
        `Effektiv årsrente: (1 + q)<sup>m</sup> − 1.`,
        `Restgjeld etter k terminer: NÅVERDI(i; n − k; −terminbeløp). Nedbetalingstid ved annet månedsbeløp: PERIODER(i; −beløp; lån).`
      ] },
      { title: 'Serielån (ev. med avdragsfrihet)', steps: [
        `Avdrag per termin = lån / antall avdragsterminer. I avdragsfrie terminer betales bare renter (og gebyr).`,
        `Rente per termin = i · restgjeld ved terminens start.`,
        `Sett opp hele kontantstrømmen: + netto utbetalt i tid 0, deretter −(avdrag + rente + termingebyr).`,
        `Betalingene er ulike, så bruk IR på kontantstrømmen (RENTE virker ikke). Regn om til årsrente.`
      ] },
      { title: 'Over-/underkurs på fastrentelån', steps: [
        `Finn terminbeløpet med den avtalte fastrenten.`,
        `Restgjeld = NV av gjenstående terminbeløp med avtalt rente.`,
        `Markedsverdi = NV av de samme terminbeløpene med ny markedsrente.`,
        `Markedsverdi − restgjeld > 0: overkurs. < 0: underkurs.`
      ] },
      { title: 'Factoring: frigjort kapital og kostnad i prosent', steps: [
        `Kundefordringer før = kredittsalg · kredittdager / 360 (eller 365 hvis oppgaven sier det).`,
        `Bundet etter factoring = marginen · kredittsalg · kredittdager / 360, pluss resten av fakturaen i dagene før forskuddet kommer.`,
        `Frigjort kapital = før − etter.`,
        `Renter = rente på forskudd · forskuttert beløp. Forskuttert beløp = (1 − margin) · kredittsalg · (kredittdager − dager før forskuddet) / 360.`,
        `Netto kostnad = renter + factoringgebyr − sparte administrasjonskostnader.`,
        `Kostnad i % = netto kostnad / frigjort kapital. Sammenlign med effektiv rente på alternativ finansiering, for eksempel kassekreditt.`
      ] }
    ],
    examples: [
      { title: 'Eksempel 1: Boliglån – annuitet med månedlige terminer og gebyrer', html: `<p>Lån 1 000 000, nominell rente 2,9 % p.a., etableringsgebyr 2 000, termingebyr 50, månedlige terminer i 20 år (240 terminer).</p>
<p><strong>Terminbeløp:</strong> i = 0,029/12 = 0,2417 % per måned. AVDRAG(0,029/12; 240; −1 000 000) = <strong>5 496,05</strong>. Med termingebyr: 5 546,05.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Måned</th><th>Restgjeld IB</th><th>Rente</th><th>Avdrag</th><th>Restgjeld UB</th></tr></thead><tbody>
<tr><th scope="row">1</th><td>1 000 000,00</td><td>2 416,67</td><td>3 079,38</td><td>996 920,62</td></tr>
<tr><th scope="row">2</th><td>996 920,62</td><td>2 409,22</td><td>3 086,83</td><td>993 833,79</td></tr>
<tr><th scope="row">3</th><td>993 833,79</td><td>2 401,76</td><td>3 094,28</td><td>990 739,51</td></tr>
</tbody></table></div>
<p><strong>Effektiv rente:</strong> netto utbetalt 1 000 000 − 2 000 = 998 000, betaling 5 546,05. RENTE(240; −5 546,05; 998 000) = 0,2519 % per måned. Effektiv årsrente = 1,002519<sup>12</sup> − 1 = <strong>3,06 %</strong>.</p>
<p><strong>Restgjeld:</strong> etter 1 år gjenstår 228 terminer: NÅVERDI(0,029/12; 228; −5 496,05) ≈ <strong>962 552</strong>. Etter 10 år (120 terminer igjen): ≈ <strong>571 910</strong>.</p>
<p><strong>Nedbetalingstid ved 10 000 per måned:</strong> PERIODER(0,029/12; −10 000; 1 000 000) = <strong>114,6 måneder ≈ 9,5 år</strong>. Månedsbeløpet er ikke en gang doblet, men nedbetalingstiden er mer enn halvert.</p>` },
      { title: 'Eksempel 2: Serielån med gebyrer', html: `<p>Lån 100 000, nominell rente 5 % p.a., etableringsgebyr 1 500, termingebyr 50, serielån over ett år med halvårlige terminer.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Halvår</th><th>Avdrag</th><th>Rente (2,5 %)</th><th>Gebyr</th><th>Kontantstrøm</th></tr></thead><tbody>
<tr><th scope="row">0</th><td></td><td></td><td>1 500</td><td>+98 500</td></tr>
<tr><th scope="row">1</th><td>50 000</td><td>2 500</td><td>50</td><td>−52 550</td></tr>
<tr><th scope="row">2</th><td>50 000</td><td>1 250</td><td>50</td><td>−51 300</td></tr>
</tbody></table></div>
<p>IR på kontantstrømmen gir q = 3,615 % per halvår. Effektiv årsrente = 1,03615<sup>2</sup> − 1 = <strong>7,36 %</strong>, mot nominelt 5 %. Forskjellen skyldes gebyrene og at det betales to ganger i året.</p>` },
      { title: 'Eksempel 3: Fastrentelån – over- og underkurs', html: `<p>Annuitetslån 1 000 000, fast rente 5 % i 5 år, årlige betalinger. Terminbeløp = AVDRAG(0,05; 5; −1 000 000) = 230 975.</p>
<p><strong>Renten endres dagen etter opptak:</strong></p>
<div class="tablewrap"><table class="data"><thead><tr><th>Ny markedsrente</th><th>NV av 5 betalinger</th><th>Restgjeld</th><th>Kurs</th></tr></thead><tbody>
<tr><th scope="row">4 %</th><td>1 028 259</td><td>1 000 000</td><td>Overkurs 28 259</td></tr>
<tr><th scope="row">6 %</th><td>972 950</td><td>1 000 000</td><td>Underkurs 27 050</td></tr>
</tbody></table></div>
<p><strong>Renten endres etter 3 år</strong> (to betalinger igjen): restgjeld = NV ved 5 % = 429 477. NV ved 4 % = 435 640 → overkurs 6 163. NV ved 6 % = 423 468 → underkurs 6 009. Jo kortere gjenstående bindingstid, desto mindre over-/underkurs.</p>` },
      { title: 'Eksempel 4: «Rentefri» avbetaling med gebyrer (eget eksempel, eksamenstypen fra 2025)', html: `<p>En vare til 12 000 kr kjøpes på «rentefri» avbetaling: 12 månedlige avdrag à 1 000. Etableringsgebyr 395 kr betales ved kjøpet, og termingebyret er 45 kr per måned.</p>
<p>Kontantstrøm sett fra kunden: i måned 0 mottas en vare verdt 12 000 mot 395 i gebyr, altså netto «lån» 11 605. Deretter betales 1 045 i 12 måneder.</p>
<div class="formula">RENTE(12; −1 045; 11 605) = 1,2127 % per måned</div>
<p>Effektiv årsrente = 1,012127<sup>12</sup> − 1 = <strong>15,56 %</strong>. Perioderenten ganget med 12 (uten rentesrente) er 14,55 %. Den avtalte nominelle renten er 0 %: nominell rente regnes uten gebyrer, slik LF til eksamen 2025 oppg. 3b gjør (terminbeløp minus gebyr). Kreditten er altså langt fra rentefri – gebyrene er skjult rente.</p>` },
      { title: 'Eksempel 5: Factoring med forsinket forskudd (lærebokens oppgave 7.8)', html: `<p>Kredittsalg 9 000 000 per år, kredittid 60 dager, 360 dager i året. Factoringselskapet beholder 20 % margin og forskutterer resten etter 7 dager. Renten på forskuddet er 15 %, fakturagebyret 60 000 per år, og bedriften sparer 50 000 i administrasjon.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>Beregning</th><th>Beløp</th></tr></thead><tbody>
<tr><th scope="row">Kundefordringer før</th><td>9 000 000 · 60 / 360</td><td>1 500 000</td></tr>
<tr><th scope="row">Margin, bundet i 60 dager</th><td>0,2 · 1 500 000</td><td>300 000</td></tr>
<tr><th scope="row">Resten, bundet i 7 dager</th><td>9 000 000 · 0,8 · 7 / 360</td><td>140 000</td></tr>
<tr class="sum"><th scope="row">Frigjort kapital</th><td>1 500 000 − 440 000</td><td>1 060 000</td></tr>
<tr><th scope="row">Renter</th><td>15 % · 1 060 000</td><td>159 000</td></tr>
<tr><th scope="row">Fakturagebyr</th><td></td><td>60 000</td></tr>
<tr><th scope="row">Sparte administrasjonskostnader</th><td></td><td>−50 000</td></tr>
<tr class="sum"><th scope="row">Netto kostnad</th><td></td><td>169 000</td></tr>
</tbody></table></div>
<p>Kostnad i prosent av frigjort kapital: 169 000 / 1 060 000 = <strong>15,9 %</strong>. Factoring lønner seg hvis bedriften ellers må låne dyrere enn dette. Her er forskuttert beløp (0,8 · 9 000 000 · 53 / 360 = 1 060 000) lik den frigjorte kapitalen. Blir kredittiden også kortere med factoring, frigjøres mer kapital enn det som forskutteres, og rentene skal bare regnes av forskuddet.</p>` }
    ],
    pitfalls: [
      `Å gange perioderenten med m i stedet for å bruke (1 + q)<sup>m</sup> − 1. 1 % per måned er 12,68 % effektivt, ikke 12 %.`,
      `Å bruke brutto lånebeløp som nåverdi når effektiv rente beregnes. Det skal være <strong>netto utbetalt</strong> (etter etableringsgebyr), og betalingen skal være <strong>inklusive termingebyr</strong>.`,
      `Å beregne terminbeløpet av netto utbetalt beløp. Terminbeløpet (uten gebyr) beregnes av brutto lån med nominell perioderente.`,
      `Å ta med termingebyret når restgjelden beregnes. Restgjeld = NV av gjenstående renter og avdrag, med nominell perioderente.`,
      `Å forveksle over- og underkurs: overkurs når markedsrenten har <em>falt</em>.`,
      `Å bruke RENTE på et serielån. Betalingene er ulike, så hele kontantstrømmen må settes opp og IR brukes.`,
      `Kassekreditt: provisjonen beregnes av hele rammen, men må fordeles på det beløpet som faktisk er trukket. Lav utnyttelsesgrad gir høy effektiv rente.`,
      `Leverandørkreditt: rabatten skal deles på (1 − rabatt), ikke brukes direkte, og kredittiden er dagene mellom rabattfrist og forfall – ikke hele betalingsfristen.`,
      `Factoring: å dele kostnaden på hele kundefordringene i stedet for den frigjorte kapitalen, eller å glemme at marginen fortsatt er bundet til kunden betaler.`,
      `Å bruke et annet antall dager i året enn oppgaveteksten, eller å blande 360 og 365 i samme oppgave. Står det ingenting, bruk 360 og skriv det.`,
      `Fortegn i Excel: nåverdi og betaling må ha motsatt fortegn i RENTE, AVDRAG og PERIODER.`
    ],
    excel: [
      { fn: 'AVDRAG(rente; antall_innbet; nåverdi)', use: `Terminbeløp (renter + avdrag) for annuitetslån. Navnet er misvisende – funksjonen gir hele terminbeløpet.` },
      { fn: 'RENTE(antall_innbet; betaling; nåverdi)', use: `Perioderente for en annuitet. Gir effektiv perioderente når nåverdi = netto utbetalt og betaling inkluderer termingebyr.` },
      { fn: 'IR(kontantstrøm)', use: `Internrente per periode for en vilkårlig kontantstrøm. Må brukes for serielån og lån med avdragsfrihet.` },
      { fn: 'NÅVERDI(rente; antall_innbet; betaling)', use: `Nåverdi av annuitet. Brukes til restgjeld og til over-/underkurs.` },
      { fn: 'PERIODER(rente; betaling; nåverdi)', use: `Antall terminer som trengs for å nedbetale lånet med et gitt terminbeløp.` },
      { fn: 'RAVDRAG(rente; periode; antall_innbet; nåverdi) og AMORT(…)', use: `Rentedelen (RAVDRAG) og avdragsdelen (AMORT) av terminbeløpet i en bestemt periode på et annuitetslån.` },
      { fn: 'Målsøking (Data → Hva-skjer-hvis-analyse)', use: `Alternativ til PERIODER/RENTE: la Excel endre én celle til en formel får ønsket verdi.` }
    ],
    examNotes: `<p><strong>Gitt 7 av 10 ganger</strong> (2017, 2018, 2019, 2021, 2022, 2023 og 2025). Den typiske oppgaven er et annuitetslån med månedlige terminer, etableringsgebyr og termingebyr, der du skal finne terminbeløpet, splitte renter og avdrag de tre første månedene, beregne effektiv årsrente, finne restgjelden på et senere tidspunkt og ev. nedbetalingstiden ved et annet månedsbeløp.</p>
<p>Varianter som har kommet: over-/underkurs på fastrentelån, serielån med avdragsfri periode, kassekreditt (2019), realrente etter skatt (2023, se kapittel 9) og «rentefri» forbrukerkreditt med gebyrer der både effektiv og nominell rente skulle beregnes (2025).</p>
<p>Du bør kunne formlene for annuitet og nåverdi av annuitet for hånd, og vite nøyaktig hvilke beløp som går inn hvor: brutto lån i terminbeløpet, netto utbetalt og betaling med gebyr i effektiv rente, betaling uten gebyr i restgjelden.</p>`
  });

  /* ===================================================================== */
  /* KAPITTEL 8                                                            */
  /* ===================================================================== */
  O.theory.push({
    nr: 8,
    title: 'Investeringer og skatt',
    examWeight: 'høy',
    summary: `<p>Skatt er en utbetaling, og en investeringsanalyse er derfor ikke ferdig før kontantstrømmen er regnet <strong>etter skatt</strong> og diskontert med et <strong>avkastningskrav etter skatt</strong>. Selskapsskatten er 22 %. For finansinvesteringer er det enkelt: rente etter skatt = rente før skatt · (1 − s).</p>
<p>For realinvesteringer er poenget at <strong>avskrivninger ikke er en kontantstrøm</strong>, men at de reduserer skattepliktig inntekt og dermed skatten. Skattemessig brukes <strong>saldometoden</strong>: hvert år avskrives en fast prosent <i>a</i> av restsaldoen. Saldoen blir aldri null, så avskrivningene – og skattebesparelsen – fortsetter i prinsippet i all fremtid, også etter at prosjektet er avsluttet. Vi forutsetter alltid at bedriften er i skatteposisjon totalt.</p>
<p>Fordi saldoavskrivningene danner en uendelig geometrisk rekke, kan nåverdien av all spart skatt samles i <strong>ett ledd i år 0</strong>: AM<sub>0</sub> · s · a / (r + a). Da kan resten av kalkylen gjøres veldig enkelt: driftskontantstrømmen før avskrivninger belastes med full skatt (22 %), og skatteeffekten av avskrivningene legges til som eget ledd. Dette gir ikke den korrekte kontantstrømmen år for år, men et <em>beregningsgrunnlag</em> med riktig nåverdi. Det er denne metoden løsningsforslagene til eksamen alltid bruker.</p>
<p>Selges anleggsmidlet ved prosjektslutt, er det skattemessig gunstigst å <strong>nedskrive salgssummen på saldoen</strong>. Salgssummen kommer inn som innbetaling, men den reduserer fremtidig avskrivningsgrunnlag, og nåverdien av den tapte skattebesparelsen trekkes fra.</p>`,
    concepts: [
      { term: 'Saldoavskrivning', def: `Skattemessig avskrivningsmetode der årets avskrivning er en fast prosentsats <i>a</i> av restsaldoen ved årets begynnelse. Avskrivningene faller år for år, og saldoen blir aldri helt null.` },
      { term: 'Saldosats (a)', def: `Avskrivningssatsen for saldogruppen. På eksamen har satsen alltid vært 20 %.` },
      { term: 'Restverdi / saldo (RV<sub>t</sub>)', def: `Uavskrevet skattemessig verdi etter <i>t</i> år: AM<sub>0</sub> · (1 − a)<sup>t</sup>. Kan fortsatt avskrives etter prosjektets levetid.` },
      { term: 'Skatteposisjon', def: `Bedriften har samlet sett overskudd, slik at fradrag (avskrivninger, underskudd i prosjektet) faktisk gir redusert skatt. Forutsettes alltid.` },
      { term: 'Beregningsgrunnlag', def: `Kontantstrømmen i den forenklede metoden: drift etter full skatt, investering, arbeidskapital og NV av spart skatt som ett ledd i år 0. Gir riktig nåverdi, men ikke riktig årlig kontantstrøm.` },
      { term: 'Avkastningskrav etter skatt (r<sub>t</sub>)', def: `Kravet til totalkapitalen etter skatt (WACC). Kontantstrøm etter skatt diskonteres med krav etter skatt.` },
      { term: 'Internrente etter skatt', def: `Renten som gir NNV etter skatt lik null. Fordi <i>r</i> også inngår i leddet for NV spart skatt, oppstår en sirkelreferanse – løses med målsøking eller interpolasjon.` },
      { term: 'Effektiv skattesats', def: `(IR før skatt − IR etter skatt) / IR før skatt. Viser hvor stor del av avkastningen skatten faktisk tar.` },
      { term: 'Nedskriving av salgssum på saldo', def: `Salgssummen trekkes fra saldoen i stedet for å inntektsføres direkte. Skatten på salgssummen fordeles dermed over all fremtid gjennom lavere avskrivninger – skattemessig gunstigst.` },
      { term: 'Aksjonærmodellen og fritaksmodellen', def: `Personlige aksjonærer: utbytte oppjusteres med 1,72 og skattlegges med 22 %, dvs. reelt 37,84 % (2025), etter skjermingsfradrag. Selskapsaksjonærer: gevinster er skattefrie og utbytte nesten skattefritt (fritaksmodellen).` }
    ],
    formulas: [
      { name: 'Rente etter skatt (finansinvestering)', html: `r = p · (1 − s)`, note: `<i>p</i> = rente før skatt, <i>s</i> = 22 %. Eksempel: 3 % · 0,78 = 2,34 %.` },
      { name: 'Saldoavskrivning og restsaldo', html: `AV<sub>t</sub> = a · RV<sub>t−1</sub> &nbsp;&nbsp;&nbsp; RV<sub>t</sub> = AM<sub>0</sub> · (1 − a)<sup>t</sup>`, note: `AM<sub>0</sub> = anskaffelseskostnad, <i>a</i> = saldosats, AV<sub>t</sub> = årets avskrivning, RV<sub>t</sub> = restsaldo etter år <i>t</i>.` },
      { name: 'NV av alle saldoavskrivninger', html: `<span class="frac"><span>AM<sub>0</sub> · a</span><span>r + a</span></span>`, note: `Uendelig geometrisk rekke. Første avskrivning i år 1, deretter avtar avskrivningene med (1 − a) per år.` },
      { name: 'NV spart skatt på saldoavskrivninger', html: `<span class="frac"><span>AM<sub>0</sub> · s · a</span><span>r + a</span></span>`, note: `Føres som ett positivt beløp i år 0. Forutsetter at saldoen avskrives videre i all fremtid. <i>r</i> = avkastningskrav etter skatt (WACC).` },
      { name: 'NNV etter skatt – samlet skatteledd (eksamensmetoden)', html: `NNV = −AM<sub>0</sub> + Σ<sub>t=1…n</sub> <span class="frac"><span>CF<sub>t</sub> · (1 − s)</span><span>(1 + r)<sup>t</sup></span></span> + <span class="frac"><span>AM<sub>0</sub> · s · a</span><span>r + a</span></span>`, note: `CF<sub>t</sub> = relevant driftskontantstrøm før skatt og før avskrivninger. Arbeidskapital kommer i tillegg (uten skatteeffekt).` },
      { name: 'NNV etter skatt – årlige avskrivninger', html: `NNV = −AM<sub>0</sub> + Σ<sub>t=1…n</sub> <span class="frac"><span>CF<sub>t</sub> − s · (CF<sub>t</sub> − AV<sub>t</sub>)</span><span>(1 + r)<sup>t</sup></span></span> + <span class="frac"><span>RV<sub>n</sub> · s · a</span><span>r + a</span></span> · <span class="frac"><span>1</span><span>(1 + r)<sup>n</sup></span></span>`, note: `Gir korrekt årlig kontantstrøm etter skatt. Siste ledd er NV av spart skatt på avskrivninger <em>etter</em> levetidens slutt. Gir samme NNV som eksamensmetoden.` },
      { name: 'Salg av anleggsmiddel – nedskriving på saldo', html: `+ <span class="frac"><span>SV</span><span>(1 + r)<sup>n</sup></span></span> − <span class="frac"><span>SV · s · a</span><span>r + a</span></span> · <span class="frac"><span>1</span><span>(1 + r)<sup>n</sup></span></span>`, note: `To tilleggsledd når anleggsmidlet selges for SV i år <i>n</i> «på skattemessig gunstigste måte»: NV av salgssummen, minus NV av økt skatt fordi avskrivningsgrunnlaget reduseres.` },
      { name: 'Effektiv skattesats', html: `<span class="frac"><span>IR før skatt − IR etter skatt</span><span>IR før skatt</span></span>`, note: `Lastebileksemplet: (20,02 − 15,83) / 20,02 = 20,93 %.` },
      { name: 'Utbytteskatt for personlige aksjonærer', html: `0,22 · 1,72 = 0,3784 = 37,84 %`, note: `Oppjusteringsfaktor 1,72 (2025). Utbytte 100 000 gir skatt 37 840 (uten skjermingsfradrag).` }
    ],
    methods: [
      { title: 'Slik regner du nåverdi etter skatt på eksamen', steps: [
        `Finn avkastningskravet etter skatt (ofte WACC fra deloppgave a, se kapittel 11).`,
        `Sett opp den <strong>relevante</strong> driftskontantstrømmen før skatt og før avskrivninger for hvert år: innbetalinger − betalbare kostnader. Ta med alternativkostnader (tapt leie, tapt dekningsbidrag), hold sunk cost og fordelte felleskostnader utenfor.`,
        `Skatt på driften = 22 % av driftskontantstrømmen hvert år (negativ kontantstrøm gir negativ skatt, altså besparelse).`,
        `Arbeidskapital: beløp eller x % av <strong>neste års</strong> omsetning. Bindes året før, justeres når omsetningen endres, frigjøres i siste år. Ingen skatteeffekt.`,
        `Investeringen i år 0 (inkludert installasjon/frakt som aktiveres). Ingen direkte skatteeffekt. Følg oppgaveteksten: eksamen 2018 og 2023 aktiverer installasjonen, og den avskrives sammen med maskinen. Sier oppgaven at den kostnadsføres direkte (lærebokens oppgave 8.12), gir den skattefradrag i år 0: 22 % av kostnaden.`,
        `Legg til NV spart skatt på saldoavskrivninger som ett ledd i år 0: AM<sub>0</sub> · s · a / (r + a).`,
        `Ved salgsverdi SV i år n: + SV i år n, og − SV · s · a / (r + a) i år n (begge diskonteres n år).`,
        `Summer til beregningsgrunnlag per år og diskonter med avkastningskravet etter skatt (bruk uavrundet WACC hvis oppgaven ikke sier noe annet). NNV > 0 → lønnsomt.`
      ] },
      { title: 'Internrente etter skatt', steps: [
        `Sett opp beregningsgrunnlaget med avkastningskravet i en egen celle som inngår både i diskonteringen og i leddet for NV spart skatt.`,
        `Bruk målsøking: sett NNV lik 0 ved å endre avkastningskravet.`,
        `Uten Excel: regn NNV for to krav (f.eks. 10 % og 15 %) og interpoler lineært.`
      ] }
    ],
    examples: [
      { title: 'Eksempel 1: Lastebil med lineære avskrivninger – før og etter skatt', html: `<p>Brukt lastebil 300 000, levetid 3 år, lineær avskrivning 100 000 per år. Sparte transportutgifter 140 000 (år 1 og 2) og 149 000 (år 3). s = 22 %, avkastningskrav 10 % før skatt og 8 % etter skatt.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>År 0</th><th>År 1</th><th>År 2</th><th>År 3</th></tr></thead><tbody>
<tr><th scope="row">Kontantstrøm før skatt</th><td>−300 000</td><td>140 000</td><td>140 000</td><td>149 000</td></tr>
<tr><th scope="row">− Avskrivning</th><td></td><td>100 000</td><td>100 000</td><td>100 000</td></tr>
<tr><th scope="row">= Skattepliktig resultat</th><td></td><td>40 000</td><td>40 000</td><td>49 000</td></tr>
<tr><th scope="row">Skatt 22 %</th><td></td><td>8 800</td><td>8 800</td><td>10 780</td></tr>
<tr class="sum"><th scope="row">Kontantstrøm etter skatt</th><td>−300 000</td><td>131 200</td><td>131 200</td><td>138 220</td></tr>
</tbody></table></div>
<p>Før skatt: NNV (10 %) = 54 921, IR = 20,02 %. Etter skatt: NNV (8 %) = 43 688, IR = 15,83 %. Effektiv skattesats = (20,02 − 15,83) / 20,02 = <strong>20,93 %</strong>.</p>` },
      { title: 'Eksempel 2: Lastebilen med saldoavskrivning 24 % – to metoder, samme svar', html: `<p><strong>Metode 1 – avskrivninger år for år:</strong></p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>År 1</th><th>År 2</th><th>År 3</th></tr></thead><tbody>
<tr><th scope="row">Kontantstrøm før skatt</th><td>140 000</td><td>140 000</td><td>149 000</td></tr>
<tr><th scope="row">Avskrivning (24 % av saldo)</th><td>72 000</td><td>54 720</td><td>41 587</td></tr>
<tr><th scope="row">Skattepliktig resultat</th><td>68 000</td><td>85 280</td><td>107 413</td></tr>
<tr><th scope="row">Skatt 22 %</th><td>14 960</td><td>18 762</td><td>23 631</td></tr>
<tr class="sum"><th scope="row">Kontantstrøm etter skatt</th><td>125 040</td><td>121 238</td><td>125 369</td></tr>
</tbody></table></div>
<p>Restsaldo etter år 3: 300 000 · 0,76<sup>3</sup> = 131 693. Den avskrives videre, og NV (i år 3) av spart skatt etter levetiden er 131 693 · 0,22 · 0,24 / (0,08 + 0,24) = 21 729, som i år 0 er 21 729 / 1,08<sup>3</sup> = 17 249.</p>
<div class="formula">NNV = −300 000 + 125 040/1,08 + 121 238/1,08<sup>2</sup> + 125 369/1,08<sup>3</sup> + 17 249 = 36 492</div>
<p><strong>Metode 2 – samlet skatteledd:</strong></p>
<div class="formula">NNV = −300 000 + (109 200/1,08 + 109 200/1,08<sup>2</sup> + 116 220/1,08<sup>3</sup>) + 300 000 · 0,22 · 0,24 / 0,32 = −300 000 + 286 992 + 49 500 = 36 492</div>
<p>Her er 109 200 = 140 000 · 0,78 og 116 220 = 149 000 · 0,78. Metode 2 er mye raskere og er den som brukes i løsningsforslagene.</p>` },
      { title: 'Eksempel 3: Femårig prosjekt med saldoavskrivning 20 %', html: `<p>Investering 2 500 000, saldosats 20 %, ingen salgsverdi. Variable kostnader 50 % av omsetningen, betalbare faste kostnader 400 000 per år. Avkastningskrav etter skatt 8 %, s = 22 %.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>År 1</th><th>År 2</th><th>År 3</th><th>År 4</th><th>År 5</th></tr></thead><tbody>
<tr><th scope="row">Omsetning</th><td>1 500 000</td><td>1 500 000</td><td>3 500 000</td><td>3 500 000</td><td>3 000 000</td></tr>
<tr><th scope="row">Variable kostnader</th><td>750 000</td><td>750 000</td><td>1 750 000</td><td>1 750 000</td><td>1 500 000</td></tr>
<tr><th scope="row">Faste betalbare kostnader</th><td>400 000</td><td>400 000</td><td>400 000</td><td>400 000</td><td>400 000</td></tr>
<tr class="sub"><th scope="row">Kontantstrøm før skatt</th><td>350 000</td><td>350 000</td><td>1 350 000</td><td>1 350 000</td><td>1 100 000</td></tr>
<tr><th scope="row">Saldoavskrivning 20 %</th><td>500 000</td><td>400 000</td><td>320 000</td><td>256 000</td><td>204 800</td></tr>
<tr><th scope="row">Skattepliktig resultat</th><td>−150 000</td><td>−50 000</td><td>1 030 000</td><td>1 094 000</td><td>895 200</td></tr>
<tr><th scope="row">Skatt 22 %</th><td>−33 000</td><td>−11 000</td><td>226 600</td><td>240 680</td><td>196 944</td></tr>
<tr class="sum"><th scope="row">Kontantstrøm etter skatt</th><td>383 000</td><td>361 000</td><td>1 123 400</td><td>1 109 320</td><td>903 056</td></tr>
</tbody></table></div>
<p>Negativ skatt i år 1 og 2 er en skattebesparelse (bedriften er i skatteposisjon totalt). Restsaldo etter år 5: 2 500 000 · 0,8<sup>5</sup> = 819 200. NV av spart skatt etter levetiden: 819 200 · 0,22 · 0,20 / 0,28 = 128 731 i år 5, som er 87 612 i år 0.</p>
<p>NNV = −2 500 000 + 2 985 908 + 87 612 = <strong>573 521</strong>.</p>
<p><strong>Kontroll med samlet skatteledd:</strong> NV av CF · 0,78 = 2 680 663. NV spart skatt = 2 500 000 · 0,22 · 0,20 / 0,28 = 392 857. NNV = −2 500 000 + 2 680 663 + 392 857 = <strong>573 521</strong>.</p>` },
      { title: 'Eksempel 4: Salg av anleggsmidlet – nedskriving på saldo', html: `<p>Investering 600 000. Driftskontantstrøm før skatt 250 000, 200 000 og 100 000. Anleggsmidlet selges for 350 000 ved utgangen av år 3. Saldosats 20 %, s = 22 %, avkastningskrav etter skatt 10 %. (Lærebokens oppgave 8.3.)</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Ledd</th><th>Beregning</th><th>Nåverdi</th></tr></thead><tbody>
<tr><th scope="row">Investering</th><td></td><td>−600 000</td></tr>
<tr><th scope="row">NV drift etter skatt</th><td>195 000/1,1 + 156 000/1,1<sup>2</sup> + 78 000/1,1<sup>3</sup></td><td>364 801</td></tr>
<tr><th scope="row">NV spart skatt avskrivninger</th><td>600 000 · 0,22 · 0,20 / 0,30</td><td>88 000</td></tr>
<tr><th scope="row">NV salgssum</th><td>350 000 / 1,1<sup>3</sup></td><td>262 960</td></tr>
<tr><th scope="row">NV økt skatt pga. nedskriving</th><td>350 000 · 0,22 · 0,20 / 0,30 / 1,1<sup>3</sup></td><td>−38 567</td></tr>
<tr class="sum"><th scope="row">NNV etter skatt</th><td></td><td>77 194</td></tr>
</tbody></table></div>
<p>Hvis salgssummen i stedet inntektsføres direkte i år 3, betales 22 % skatt av hele salgssummen med en gang: NNV = −600 000 + 364 801 + 88 000 + 350 000 · 0,78 / 1,1<sup>3</sup> = 57 910. Nedskriving på saldo er altså 19 284 bedre, fordi skatten skyves ut i tid.</p>` }
    ],
    pitfalls: [
      `Å trekke avskrivningene fra kontantstrømmen. Avskrivninger er ikke en utbetaling – bare skatteeffekten teller.`,
      `Å glemme at saldoen avskrives videre etter prosjektets levetid. Regner du avskrivninger år for år, må leddet for spart skatt etter levetiden med.`,
      `Å blande de to metodene: bruker du formelen AM<sub>0</sub> · s · a / (r + a), skal du <em>ikke</em> også trekke fra avskrivninger før du beregner skatt.`,
      `Å legge skatt på arbeidskapitalen eller på investeringen. Ingen av dem har direkte skatteeffekt.`,
      `Å beregne arbeidskapitalen av samme års omsetning. Den bindes året <em>før</em> (x % av neste års omsetning) og frigjøres siste år.`,
      `Å ta med sunk cost (f.eks. utviklingskostnader som allerede er betalt) eller fordelte felleskostnader som ikke endres av prosjektet.`,
      `Å glemme alternativkostnader: tapt leieinntekt og tapt dekningsbidrag på eksisterende produkter (kannibalisering) er relevante og skattepliktige.`,
      `Kannibalisering regnes som tapt <em>dekningsbidrag</em>, ikke tapt omsetning og ikke inklusive faste enhetskostnader.`,
      `Ved salg: å glemme minusleddet SV · s · a / (r + a) / (1 + r)<sup>n</sup>, eller å glemme å diskontere det n år.`,
      `Å diskontere kontantstrøm etter skatt med avkastningskrav før skatt (eller omvendt).`,
      `Feil sats i nevneren: det er <i>r + a</i> (avkastningskrav + saldosats), ikke r + s.`
    ],
    excel: [
      { fn: 'NNV(rente; verdi1; verdi2; …)', use: `Nåverdi av kontantstrømmen fra år 1 og utover. Beløpet i år 0 legges til utenfor funksjonen.` },
      { fn: 'IR(kontantstrøm)', use: `Internrente. Gir IR før skatt direkte. For IR etter skatt endrer leddet for NV spart skatt seg med renten – bruk målsøking.` },
      { fn: 'Målsøking', use: `Finn internrente etter skatt: sett NNV-cellen til 0 ved å endre cellen med avkastningskravet.` },
      { fn: 'NÅVERDI(rente; antall_innbet; betaling)', use: `Nåverdi av like årlige beløp, nyttig når driftskontantstrømmen er konstant.` }
    ],
    examNotes: `<p><strong>Kjernen i eksamen: en stor oppgave med WACC og nåverdi etter skatt har kommet 10 av 10 ganger (25–40 % av eksamen).</strong> Kapittel 8 leverer selve regnemetoden, kapittel 11 leverer avkastningskravet.</p>
<p>Løsningsforslagene gjør det alltid slik: relevant driftskontantstrøm før avskrivninger, skatt = 22 % av denne (27 % i 2016 og mars 2017), arbeidskapital som x % av neste års omsetning (bundet året før, frigjort siste år, ingen skatt), og skatteeffekten av saldoavskrivningene som <strong>ett ledd i år 0</strong>: AM · a · s / (r + a). Saldosatsen har alltid vært 20 %. Ved salgsverdi «på skattemessig gunstigste måte»: + SV/(1 + r)<sup>n</sup> − SV · a · s/(r + a)/(1 + r)<sup>n</sup>. Til slutt diskonteres det med WACC (uavrundet i de nyere løsningsforslagene).</p>
<p>Fellene som går igjen: sunk cost (utviklingskostnader), fordelte felleskostnader (ikke relevante, eventuelt bare den delen som faktisk øker), alternativkostnad (tapt leie), bare lønns<em>økning</em> eller vikarkostnad er relevant, kannibalisering som tapt dekningsbidrag, bare merproduksjon ved kapasitetsutvidelse, og installasjonskostnad som aktiveres sammen med investeringen.</p>`
  });

  /* ===================================================================== */
  /* KAPITTEL 9                                                            */
  /* ===================================================================== */
  O.theory.push({
    nr: 9,
    title: 'Investeringsanalyse og prisstigning',
    examWeight: 'lav',
    summary: `<p>Inflasjon reduserer realverdien av penger. For den som har bankinnskudd betyr det lavere <strong>realavkastning</strong>; for den som har gjeld betyr det at realverdien av gjelden faller. <strong>Nominell</strong> avkastning er avkastning i løpende kroner, <strong>real</strong>avkastning er avkastning korrigert for prisstigning.</p>
<p>Sammenhengen er (1 + nominell) = (1 + real) · (1 + inflasjon). Den enkle differansen «nominell − inflasjon» er bare en tilnærming; den nøyaktige formelen deler i tillegg på (1 + <i>j</i>), fordi også avkastningens kjøpekraft må opprettholdes.</p>
<p>Skatt beregnes av <em>nominelle</em> renter. Realrente etter skatt finnes derfor i to trinn: <strong>skatt først, deretter inflasjon</strong>. Realrenten etter skatt «viser hva et lån virkelig koster», og tar helst utgangspunkt i lånets effektive rente.</p>
<p>I investeringsanalysen kan kontantstrømmen budsjetteres i <strong>faste priser</strong> (dagens pengeverdi) eller i <strong>nominelle (løpende) priser</strong>. Regelen er konsistens: nominell kontantstrøm diskonteres med nominelt krav, kontantstrøm i faste priser med realkrav – da blir nåverdien den samme. Når ulike poster har ulik prisstigning, eller når skatt er med (saldoavskrivninger er nominelle), må man budsjettere nominelt.</p>`,
    concepts: [
      { term: 'Nominell avkastning', def: `Avkastning i løpende kroner. 5 % rente på 100 kr gir 105 kr.` },
      { term: 'Realavkastning', def: `Avkastning korrigert for prisstigning – økningen i kjøpekraft.` },
      { term: 'Fisher-sammenhengen', def: `Nominell avkastning = kompensasjon for prisstigning + realavkastning. Tilnærmet: real ≈ nominell − inflasjon.` },
      { term: 'Faste (reelle) priser', def: `Alle beløp uttrykt i dagens pengeverdi (prisnivået i år 0).` },
      { term: 'Nominelle (løpende) priser', def: `Beløp i pengeverdien på transaksjonstidspunktet; inflasjonen er bakt inn.` },
      { term: 'Realrente etter skatt', def: `Rente etter skatt korrigert for inflasjon. Viser hva et lån virkelig koster eller hva en plassering virkelig gir.` },
      { term: 'Spesiell prisstigning', def: `Når noen poster (f.eks. lønn) stiger mer eller mindre enn den generelle inflasjonen. Da må kontantstrømmen budsjetteres i løpende priser.` }
    ],
    formulas: [
      { name: 'Realrente før skatt', html: `p<sub>r</sub> = <span class="frac"><span>p<sub>n</sub> − j</span><span>1 + j</span></span>`, note: `p<sub>n</sub> = nominell rente før skatt, <i>j</i> = inflasjonsrate. Eksempel: (0,05 − 0,02)/1,02 = 2,94 %.` },
      { name: 'Nominell rente fra realrente', html: `p<sub>n</sub> = p<sub>r</sub> · (1 + j) + j = (1 + p<sub>r</sub>)(1 + j) − 1`, note: `Eksempel: 0,06 · 1,0377 + 0,0377 = 0,10 = 10 %.` },
      { name: 'Nominell rente etter skatt', html: `r<sub>n</sub> = p<sub>n</sub> · (1 − s)`, note: `Eksempel: 0,05 · 0,78 = 3,9 %.` },
      { name: 'Realrente etter skatt', html: `r<sub>r</sub> = <span class="frac"><span>p<sub>n</sub> · (1 − s) − j</span><span>1 + j</span></span>`, note: `Skatt først, deretter inflasjon. Eksempel: (0,039 − 0,02)/1,02 = 1,86 %. (Eksamen 2023.)` },
      { name: 'Fra faste til nominelle priser', html: `CF<sub>t</sub><sup>nominell</sup> = CF<sub>t</sub><sup>fast</sup> · (1 + j)<sup>t</sup>`, note: `Kontantstrømmen i år <i>t</i> blåses opp med <i>t</i> års prisstigning.` },
      { name: 'Reell internrente', html: `IR<sub>real</sub> = <span class="frac"><span>IR<sub>nominell</sub> − j</span><span>1 + j</span></span>`, note: `Samme sammenheng som for renter.` }
    ],
    methods: [
      { title: 'Realrente etter skatt', steps: [
        `Start med nominell (helst effektiv) rente før skatt, p<sub>n</sub>.`,
        `Trekk fra skatten: r<sub>n</sub> = p<sub>n</sub> · (1 − s).`,
        `Korriger for inflasjon: r<sub>r</sub> = (r<sub>n</sub> − j) / (1 + j).`
      ] },
      { title: 'Investeringsanalyse med prisstigning', steps: [
        `Avklar om kontantstrømmen er oppgitt i faste eller løpende priser.`,
        `Stiger alle poster med samme sats og det ikke er skatt: velg fritt, men bruk realkrav på faste priser og nominelt krav på løpende priser.`,
        `Har postene ulik prisstigning: regn hver post om til løpende priser og bruk nominelt krav.`,
        `Er skatt med: budsjetter i nominelle priser og bruk nominelt krav etter skatt, med saldoformelen fra kapittel 8.`
      ] }
    ],
    examples: [
      { title: 'Eksempel 1: Bankinnskudd – realavkastning før og etter skatt', html: `<p>Innskudd 100 kr, rente 5 %, inflasjon 2 %, skatt 22 %.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>Beregning</th><th>Svar</th></tr></thead><tbody>
<tr><th scope="row">Realrente før skatt</th><td>(0,05 − 0,02) / 1,02</td><td>2,94 %</td></tr>
<tr><th scope="row">Nominell rente etter skatt</th><td>0,05 · 0,78</td><td>3,90 %</td></tr>
<tr><th scope="row">Realrente etter skatt</th><td>(0,039 − 0,02) / 1,02</td><td>1,86 %</td></tr>
</tbody></table></div>
<p>Tilnærmingen 5 % − 2 % = 3 % er litt for høy. Merk at nominell rente etter skatt er 3,9 % med dagens skattesats på 22 %.</p>` },
      { title: 'Eksempel 2: Hva koster lånet egentlig?', html: `<p>Et lån har effektiv rente 6 % før skatt. Inflasjonen er 2 % og skattesatsen 22 %.</p>
<div class="formula">r<sub>n</sub> = 0,06 · 0,78 = 4,68 % &nbsp;&nbsp;→&nbsp;&nbsp; r<sub>r</sub> = (0,0468 − 0,02) / 1,02 = 2,63 %</div>
<p>Rentefradraget og inflasjonen gjør at lånet reelt koster 2,63 % – under halvparten av den effektive renten.</p>` },
      { title: 'Eksempel 3: Faste og nominelle priser gir samme nåverdi (eget eksempel)', html: `<p>Investering 1 000 000. Kontantstrøm 300 000 per år i fire år, målt i dagens priser. Inflasjon 3,77 %, realavkastningskrav 6 %. Nominelt krav: 1,06 · 1,0377 − 1 = 10,0 %.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>År 0</th><th>År 1</th><th>År 2</th><th>År 3</th><th>År 4</th></tr></thead><tbody>
<tr><th scope="row">Faste priser</th><td>−1 000 000</td><td>300 000</td><td>300 000</td><td>300 000</td><td>300 000</td></tr>
<tr><th scope="row">Nominelle priser</th><td>−1 000 000</td><td>311 310</td><td>323 046</td><td>335 225</td><td>347 863</td></tr>
</tbody></table></div>
<p>NNV av faste priser med realkrav 6 % = <strong>39 532</strong>. NNV av nominelle priser med nominelt krav 9,996 % = <strong>39 532</strong>. Blander du – nominell kontantstrøm med realkrav 6 % – får du 138 201, som er en grov overvurdering.</p>` }
    ],
    pitfalls: [
      `Å blande: nominell kontantstrøm med realkrav gir for høy nåverdi, faste priser med nominelt krav gir for lav.`,
      `Å korrigere for inflasjon før skatt. Skatten beregnes av den nominelle renten: skatt først, så inflasjon.`,
      `Å nøye seg med «nominell − inflasjon» når oppgaven ber om nøyaktig realrente. Husk å dele på (1 + j).`,
      `Å budsjettere i faste priser når skatt er med. Saldoavskrivningene er nominelle og følger ikke prisstigningen.`,
      `Å regne i faste priser når inntekter og kostnader har ulik prisstigning.`,
      `Å bruke 3,6 % som nominell rente etter skatt av 5 %. Det er en rest fra tiden med 28 % skatt; med 22 % blir det 3,9 %.`
    ],
    excel: [
      { fn: 'NNV(rente; verdier)', use: `Brukes med nominelt krav på nominell kontantstrøm, eller realkrav på kontantstrøm i faste priser.` },
      { fn: 'IR(kontantstrøm)', use: `Gir nominell internrente av nominell kontantstrøm og reell internrente av kontantstrøm i faste priser.` },
      { fn: 'Målsøking', use: `Nominell internrente etter skatt (sirkelreferanse via leddet for NV spart skatt).` }
    ],
    examNotes: `<p>Inflasjon har <strong>ikke</strong> kommet som egen oppgave, bare som deloppgave. I 2023 skulle man beregne <strong>realrente etter skatt</strong> på et lån: (i · (1 − s) − j) / (1 + j), der i er lånets effektive rente.</p>
<p>Det du bør kunne: formlene for realrente før og etter skatt (og rekkefølgen skatt → inflasjon), omregning mellom realkrav og nominelt krav, og konsistensregelen for kontantstrøm og avkastningskrav. I den store investeringsoppgaven kan priser og kostnader være oppgitt med årlig vekst – da regner du i løpende priser og bruker WACC som nominelt krav.</p>`
  });

  /* ===================================================================== */
  /* KAPITTEL 10                                                           */
  /* ===================================================================== */
  O.theory.push({
    nr: 10,
    title: 'Finansiell risiko',
    examWeight: 'høy',
    summary: `<p><strong>Risiko</strong> er situasjoner der utfallet ikke er kjent, men der vi kan angi sannsynligheter for hvert utfall – da kan risikoen tallfestes. En aksje beskrives med to tall: <strong>forventet avkastning</strong> (sannsynlighetsveid gjennomsnitt) og <strong>standardavvik</strong> (spredningen rundt forventningen).</p>
<p>Setter vi sammen flere aksjer i en <strong>portefølje</strong>, blir forventet avkastning et veid gjennomsnitt av enkeltaksjene. Det blir standardavviket <em>ikke</em> – det avhenger også av hvordan aksjene svinger i forhold til hverandre, målt med <strong>kovarians</strong> og <strong>korrelasjonskoeffisient</strong> (ρ, mellom −1 og +1). Så lenge ρ &lt; 1 blir porteføljens standardavvik lavere enn det veide gjennomsnittet. Dette er <strong>diversifikasjon</strong>: jo lavere korrelasjon, jo større risikoreduksjon. Ved ρ = +1 er det ingen gevinst, ved ρ = −1 kan all risiko fjernes.</p>
<p>Risikoen som forsvinner i en portefølje er <strong>usystematisk risiko</strong> (bedriftsspesifikk). Det som blir igjen er <strong>systematisk risiko</strong> (markedsrisiko), som rammer alle selskaper og ikke kan diversifiseres bort. Allerede med rundt ti aksjer er mye av den usystematiske risikoen borte.</p>
<p>Porteføljen med lavest mulig standardavvik kalles <strong>minimum-varians-porteføljen</strong>. Porteføljene fra denne og oppover i avkastning er <strong>effisiente</strong>: høyest mulig avkastning for gitt risiko. Kapitlet avsluttes med <strong>markedseffisiens</strong> (svak, halvsterk, sterk) og diskusjonen om aktiv mot passiv forvaltning.</p>`,
    concepts: [
      { term: 'Risiko og usikkerhet', def: `Risiko: utfallet er ukjent, men sannsynlighetene kan angis. Usikkerhet: heller ikke sannsynlighetene kan angis.` },
      { term: 'Forventet avkastning', def: `Sannsynlighetsveid gjennomsnitt av de mulige avkastningene.` },
      { term: 'Varians og standardavvik', def: `Varians er sannsynlighetsveid gjennomsnitt av kvadrerte avvik fra forventningen. Standardavviket er kvadratroten og måles i samme enhet som avkastningen (prosent).` },
      { term: 'Kovarians', def: `Mål på samvariasjonen mellom to aksjers avkastning. Positiv når aksjene tenderer til å gå samme vei.` },
      { term: 'Korrelasjonskoeffisient (ρ)', def: `Normalisert kovarians, mellom −1 og +1. −1: perfekt negativ lineær samvariasjon, 0: ingen samvariasjon, +1: perfekt positiv. Mellom aksjer ofte 0,3–0,5.` },
      { term: 'Diversifikasjon', def: `Å fordele investeringen på flere aksjer for å redusere risiko. Virker når korrelasjonen er lavere enn +1.` },
      { term: 'Usystematisk risiko', def: `Bedriftsrisiko som gjelder det enkelte selskap. Kan elimineres eller sterkt reduseres i en portefølje (diversifiserbar).` },
      { term: 'Systematisk risiko', def: `Markedsrisiko som påvirker alle selskaper (renter, konjunkturer, inflasjon). Kan ikke fjernes ved diversifikasjon.` },
      { term: 'Dominans', def: `Aksje A dominerer B dersom A har minst like høy forventet avkastning og høyst like høyt standardavvik – og er strengt bedre på minst ett av målene.` },
      { term: 'Minimum-varians-porteføljen', def: `Kombinasjonen av aksjene som gir lavest mulig standardavvik.` },
      { term: 'Effisiente porteføljer', def: `Porteføljer som gir høyest mulig forventet avkastning for gitt risiko – den øvre delen av kurven, fra minimum-varians-porteføljen og oppover.` },
      { term: 'Aritmetisk avkastning og logavkastning', def: `Aritmetisk: P<sub>1</sub>/P<sub>0</sub> − 1. Logavkastning: LN(P<sub>1</sub>/P<sub>0</sub>), som er additiv over tid. Avviket er lite når avkastningen er lav.` },
      { term: 'Markedseffisiens', def: `Svak: kursene reflekterer all historisk kursinformasjon (teknisk analyse gir ikke meravkastning). Halvsterk: i tillegg all offentlig informasjon. Sterk: all informasjon, også privat.` },
      { term: 'Aktiv og passiv forvaltning', def: `Aktiv: forvalteren plukker aksjer for å slå markedet. Passiv: porteføljen følger indeksen, med mye lavere kostnader.` },
      { term: 'Markedsporteføljen', def: `I praksis hovedindeksen på Oslo Børs (OSEBX). Avkastningen kalles markedsavkastningen r<sub>m</sub>.` }
    ],
    formulas: [
      { name: 'Avkastning fra kurs', html: `r = <span class="frac"><span>P<sub>1</sub> − P<sub>0</sub></span><span>P<sub>0</sub></span></span>`, note: `Er utfallene oppgitt som kurser, må de regnes om til avkastning først.` },
      { name: 'Forventet avkastning', html: `E(r) = Σ p<sub>s</sub> · r<sub>s</sub>`, note: `p<sub>s</sub> = sannsynligheten for tilstand <i>s</i>, r<sub>s</sub> = avkastningen i tilstanden.` },
      { name: 'Varians og standardavvik', html: `σ<sup>2</sup> = Σ p<sub>s</sub> · (r<sub>s</sub> − E(r))<sup>2</sup> &nbsp;&nbsp;&nbsp; σ = √σ<sup>2</sup>`, note: `Sannsynlighetsveid (populasjons-)varians. Ikke del på n − 1 når sannsynlighetene er oppgitt.` },
      { name: 'Empirisk standardavvik (historiske data)', html: `s = √<span class="frac"><span>Σ (r<sub>t</sub> − r̄)<sup>2</sup></span><span>n − 1</span></span>`, note: `Brukes på tidsserier (Excel STDAV.S). Årlig standardavvik = daglig standardavvik · √252.` },
      { name: 'Kovarians', html: `Kov(A, B) = Σ p<sub>s</sub> · (r<sub>A,s</sub> − E(r<sub>A</sub>)) · (r<sub>B,s</sub> − E(r<sub>B</sub>))`, note: `Med simultan sannsynlighetstabell summeres det over alle kombinasjoner av utfall.` },
      { name: 'Korrelasjonskoeffisient', html: `ρ<sub>AB</sub> = <span class="frac"><span>Kov(A, B)</span><span>σ<sub>A</sub> · σ<sub>B</sub></span></span>`, note: `Omvendt: Kov(A, B) = ρ<sub>AB</sub> · σ<sub>A</sub> · σ<sub>B</sub>.` },
      { name: 'Forventet avkastning, portefølje', html: `E(r<sub>p</sub>) = w<sub>A</sub> · E(r<sub>A</sub>) + w<sub>B</sub> · E(r<sub>B</sub>)`, note: `w = andel av porteføljen, w<sub>A</sub> + w<sub>B</sub> = 1.` },
      { name: 'Varians, portefølje av to aksjer', html: `σ<sub>p</sub><sup>2</sup> = w<sub>A</sub><sup>2</sup>σ<sub>A</sub><sup>2</sup> + w<sub>B</sub><sup>2</sup>σ<sub>B</sub><sup>2</sup> + 2 · w<sub>A</sub> · w<sub>B</sub> · ρ<sub>AB</sub> · σ<sub>A</sub> · σ<sub>B</sub>`, note: `Siste ledd er 2 · w<sub>A</sub> · w<sub>B</sub> · Kov(A, B). Ved ρ = 0 faller det bort. Husk kvadratroten til slutt.` },
      { name: 'Minimum-varians-andel', html: `w<sub>A</sub>* = <span class="frac"><span>σ<sub>B</sub><sup>2</sup> − Kov(A, B)</span><span>σ<sub>A</sub><sup>2</sup> + σ<sub>B</sub><sup>2</sup> − 2 · Kov(A, B)</span></span>`, note: `Ved ρ = 0: w<sub>A</sub>* = σ<sub>B</sub><sup>2</sup> / (σ<sub>A</sub><sup>2</sup> + σ<sub>B</sub><sup>2</sup>). Det er den <em>andre</em> aksjens varians som står i telleren.` },
      { name: 'Kombinasjon med risikofri plassering', html: `E(r) = w · E(r<sub>p</sub>) + (1 − w) · r<sub>f</sub> &nbsp;&nbsp;&nbsp; σ = w · σ<sub>p</sub>`, note: `w = andelen i den risikable porteføljen. Risikofri plassering har standardavvik 0 og kovarians 0.` },
      { name: 'Geometrisk årlig avkastning og logavkastning', html: `r = (P<sub>n</sub> / P<sub>0</sub>)<sup>1/n</sup> − 1 &nbsp;&nbsp;&nbsp; r<sub>log</sub> = <span class="frac"><span>LN(P<sub>n</sub> / P<sub>0</sub>)</span><span>n</span></span>`, note: `Hovedindeksen 1996–2024: fra 100 til 1 425,05 på 29 år gir 9,59 % (geometrisk) og 9,16 % (kontinuerlig).` }
    ],
    methods: [
      { title: 'Porteføljeoppgaven på eksamen – steg for steg', steps: [
        `Er utfallene oppgitt som kurser: regn om til avkastning, r = sluttkurs / startkurs − 1.`,
        `Forventet avkastning for hver aksje: Σ p · r.`,
        `Varians: for hver tilstand, avvik fra forventningen, kvadrer, gang med sannsynligheten og summer. Standardavvik = kvadratroten.`,
        `Dominans: sammenlign E(r) og σ. Høyere avkastning <em>og</em> lavere risiko → dominerer. Ellers avhenger valget av risikoholdningen.`,
        `Kovarians: Σ p · avvik<sub>A</sub> · avvik<sub>B</sub>. Korrelasjon: Kov / (σ<sub>A</sub> · σ<sub>B</sub>).`,
        `Portefølje: E(r<sub>p</sub>) som veid snitt. Varians med porteføljeformelen (eller regn porteføljens avkastning i hver tilstand og behandle den som én aksje – gir samme svar når aksjene har felles tilstander).`,
        `Minimum-varians-andel med formelen. Sett andelen inn og regn E(r<sub>p</sub>) og σ<sub>p</sub>.`,
        `Kombinasjon med risikofri plassering: avkastning som veid snitt, standardavvik = andel i aksjer · σ<sub>p</sub>.`,
        `Kommenter diversifikasjonsgevinsten: sammenlign σ<sub>p</sub> med veid snitt av standardavvikene og forklar med korrelasjonen.`
      ] }
    ],
    examples: [
      { title: 'Eksempel 1: Fra kurser til forventet avkastning og standardavvik', html: `<p>Aksje A er kjøpt for 200 og aksje B for 150. Sannsynligheten for oppgang er 0,55 og for nedgang 0,45.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>Kurs opp</th><th>Kurs ned</th><th>Avkastning opp</th><th>Avkastning ned</th><th>E(r)</th><th>σ</th></tr></thead><tbody>
<tr><th scope="row">Aksje A</th><td>240</td><td>190</td><td>20 %</td><td>−5 %</td><td>8,75 %</td><td>12,44 %</td></tr>
<tr><th scope="row">Aksje B</th><td>195</td><td>135</td><td>30 %</td><td>−10 %</td><td>12,00 %</td><td>19,90 %</td></tr>
</tbody></table></div>
<p>E(r<sub>A</sub>) = 0,55 · 0,20 + 0,45 · (−0,05) = 0,0875. E(r<sub>B</sub>) = 0,55 · 0,30 + 0,45 · (−0,10) = 0,12.</p>
<p>Var(A) = 0,55 · (0,20 − 0,0875)<sup>2</sup> + 0,45 · (−0,05 − 0,0875)<sup>2</sup> = 0,015469 → σ<sub>A</sub> = 12,44 %.</p>
<p>Var(B) = 0,55 · (0,30 − 0,12)<sup>2</sup> + 0,45 · (−0,10 − 0,12)<sup>2</sup> = 0,0396 → σ<sub>B</sub> = 19,90 %.</p>
<p>Ingen av aksjene dominerer den andre: B har høyere forventet avkastning, men også høyere risiko.</p>` },
      { title: 'Eksempel 2: Kovarians, korrelasjon, portefølje og minimum varians (A og B)', html: `<p>Aksjene fra eksempel 1 har denne simultane sannsynlighetsfordelingen:</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>B opp (+30 %)</th><th>B ned (−10 %)</th></tr></thead><tbody>
<tr><th scope="row">A opp (+20 %)</th><td>0,25</td><td>0,30</td></tr>
<tr><th scope="row">A ned (−5 %)</th><td>0,30</td><td>0,15</td></tr>
</tbody></table></div>
<p>Avvik fra forventning: A opp +0,1125, A ned −0,1375, B opp +0,18, B ned −0,22.</p>
<div class="formula">Kov = 0,25 · 0,1125 · 0,18 + 0,30 · 0,1125 · (−0,22) + 0,30 · (−0,1375) · 0,18 + 0,15 · (−0,1375) · (−0,22) = −0,00525</div>
<p>ρ = −0,00525 / (0,1244 · 0,1990) = <strong>−0,212</strong>.</p>
<p><strong>Likeveid portefølje (50/50):</strong> E(r<sub>p</sub>) = 10,38 %. Var = 0,25 · 0,015469 + 0,25 · 0,0396 + 2 · 0,25 · (−0,00525) = 0,011142 → σ<sub>p</sub> = <strong>10,56 %</strong>. Veid snitt av standardavvikene er 16,17 %, så diversifikasjonsgevinsten er stor.</p>
<p><strong>Minimum varians:</strong> w<sub>A</sub>* = (0,0396 + 0,00525) / (0,015469 + 0,0396 + 0,0105) = <strong>0,684</strong>. Med 68,4 % i A og 31,6 % i B blir E(r<sub>p</sub>) = 9,78 % og σ<sub>p</sub> = 9,45 % – lavere enn standardavviket til begge enkeltaksjene.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Andel A</th><th>Andel B</th><th>E(r<sub>p</sub>)</th><th>σ<sub>p</sub></th></tr></thead><tbody>
<tr><th scope="row">0 %</th><td>100 %</td><td>12,00 %</td><td>19,90 %</td></tr>
<tr><th scope="row">30 %</th><td>70 %</td><td>11,03 %</td><td>13,63 %</td></tr>
<tr><th scope="row">50 %</th><td>50 %</td><td>10,38 %</td><td>10,56 %</td></tr>
<tr><th scope="row">70 %</th><td>30 %</td><td>9,73 %</td><td>9,45 %</td></tr>
<tr><th scope="row">90 %</th><td>10 %</td><td>9,08 %</td><td>10,95 %</td></tr>
<tr><th scope="row">100 %</th><td>0 %</td><td>8,75 %</td><td>12,44 %</td></tr>
</tbody></table></div>
<p>Porteføljene med mer enn ca. 68 % i A er ikke effisiente: de har både lavere avkastning og høyere risiko enn minimum-varians-porteføljen.</p>` },
      { title: 'Eksempel 3: Tre konjunkturtilstander – hvorfor liten diversifikasjonsgevinst?', html: `<p>(Lærebokens oppgave 10.1.)</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Konjunktur</th><th>Sannsynlighet</th><th>Aksje A</th><th>Aksje B</th><th>Portefølje 50/50</th></tr></thead><tbody>
<tr><th scope="row">Høy</th><td>0,20</td><td>20 %</td><td>9 %</td><td>14,5 %</td></tr>
<tr><th scope="row">Normal</th><td>0,50</td><td>16 %</td><td>7 %</td><td>11,5 %</td></tr>
<tr><th scope="row">Lav</th><td>0,30</td><td>−4 %</td><td>6 %</td><td>1,0 %</td></tr>
<tr class="sub"><th scope="row">Forventet avkastning</th><td></td><td>10,80 %</td><td>7,10 %</td><td>8,95 %</td></tr>
<tr><th scope="row">Varians</th><td></td><td>0,009616</td><td>0,000109</td><td>0,002837</td></tr>
<tr class="sub"><th scope="row">Standardavvik</th><td></td><td>9,81 %</td><td>1,04 %</td><td>5,33 %</td></tr>
</tbody></table></div>
<p>Var(A) = 0,20 · 0,092<sup>2</sup> + 0,50 · 0,052<sup>2</sup> + 0,30 · (−0,148)<sup>2</sup> = 0,009616.</p>
<p>Kov = 0,20 · 0,092 · 0,019 + 0,50 · 0,052 · (−0,001) + 0,30 · (−0,148) · (−0,011) = 0,000812. ρ = 0,000812 / (0,0981 · 0,0104) = <strong>0,793</strong>.</p>
<p>Veid snitt av standardavvikene er 0,5 · 9,81 % + 0,5 · 1,04 % = 5,43 %, mens porteføljens standardavvik er 5,33 %. Gevinsten er bare 0,10 prosentpoeng fordi aksjene er sterkt positivt korrelert – de går opp og ned i de samme tilstandene.</p>` },
      { title: 'Eksempel 4: Ukorrelerte aksjer, minimum varians og risikofri plassering', html: `<p>Begge aksjene koster 100 i dag. A blir 140 (sannsynlighet 0,6) eller 80 (0,4). B blir 130 (0,6) eller 90 (0,4). Aksjene er uavhengige, så ρ = 0. (Lærebokens oppgave 10.6.)</p>
<p>Avkastning A: +40 % / −20 %, E = 16 %, Var = 0,6 · 0,24<sup>2</sup> + 0,4 · 0,36<sup>2</sup> = 0,0864, σ = 29,39 %.<br>Avkastning B: +30 % / −10 %, E = 14 %, Var = 0,0384, σ = 19,60 %.</p>
<div class="formula">w<sub>A</sub>* = <span class="frac"><span>0,0384</span><span>0,0864 + 0,0384</span></span> = 0,3077</div>
<p>Minimum-varians-porteføljen har 30,8 % i A og 69,2 % i B: E(r<sub>p</sub>) = <strong>14,62 %</strong>, Var = 0,3077<sup>2</sup> · 0,0864 + 0,6923<sup>2</sup> · 0,0384 = 0,026585, σ<sub>p</sub> = <strong>16,30 %</strong>.</p>
<p>Til sammenligning gir 50/50: σ<sub>p</sub> = √(0,25 · 0,0864 + 0,25 · 0,0384) = 17,66 %.</p>
<p><strong>Med risikofri plassering</strong> (egen utvidelse): plasseres halvparten risikofritt til 3 % og halvparten i minimum-varians-porteføljen, blir E(r) = 0,5 · 14,62 % + 0,5 · 3 % = 8,81 % og σ = 0,5 · 16,30 % = 8,15 %.</p>` }
    ],
    pitfalls: [
      `Å regne varians på kurser i stedet for avkastninger. Gjør om til avkastning først.`,
      `Å glemme sannsynlighetsvektene, eller å dele på n − 1. Med oppgitte sannsynligheter brukes Σ p · (avvik)<sup>2</sup>.`,
      `Å glemme å ta kvadratroten – variansen er ikke standardavviket.`,
      `Å regne porteføljens standardavvik som veid snitt av standardavvikene. Det gjelder bare når ρ = +1.`,
      `Å glemme å kvadrere andelene i porteføljeformelen, eller å glemme faktoren 2 i kovariansleddet.`,
      `Minimum varians ved ρ = 0: telleren er den <em>andre</em> aksjens varians. Aksjen med lavest risiko skal ha størst andel.`,
      `Å blande prosent og desimaltall (0,20 og 20) i samme utregning.`,
      `Dominans krever både avkastning og risiko. Høyere avkastning alene er ikke dominans.`,
      `Å forklare liten diversifikasjonsgevinst med «høy risiko». Riktig forklaring er høy positiv korrelasjon.`
    ],
    excel: [
      { fn: 'SUMMERPRODUKT(sannsynligheter; avkastninger)', use: `Forventet avkastning direkte. Brukes også på kvadrerte avvik for varians og på produkter av avvik for kovarians.` },
      { fn: 'ROT(tall)', use: `Kvadratrot – fra varians til standardavvik.` },
      { fn: 'STDAV.S(område) / STDAV.P(område)', use: `Empirisk standardavvik av en tidsserie (utvalg, n − 1) / populasjonsstandardavvik (n).` },
      { fn: 'KOVARIANS.S(område1; område2) og KORRELASJON(område1; område2)', use: `Kovarians og korrelasjon mellom to tidsserier.` },
      { fn: 'LN(tall)', use: `Logavkastning: LN(kurs i dag / kurs i går).` },
      { fn: 'Problemløser / målsøking', use: `Kan finne minimum-varians-andelen numerisk ved å minimere porteføljens varians.` }
    ],
    examNotes: `<p><strong>Gitt 7 av 10 ganger, og hvert år 2020–2025 (20–30 % av eksamen).</strong> Oppgaven har to aksjer med 3–4 tilstander og sannsynligheter – noen ganger oppgitt som kurser som må regnes om til avkastning.</p>
<p>Deloppgavene går i fast rekkefølge: forventet avkastning, varians og standardavvik (sannsynlighetsveid populasjonsvarians), dominans, kovarians og korrelasjon, portefølje 50/50 eller 60/40 (ofte med ρ = 0), minimum-varians-andel (w = σ<sub>B</sub><sup>2</sup> / (σ<sub>A</sub><sup>2</sup> + σ<sub>B</sub><sup>2</sup>) når ρ = 0), kombinasjon med risikofri plassering, og et kort tekstspørsmål om hvorfor diversifikasjonsgevinsten er liten (høy positiv korrelasjon).</p>
<p>I 2024 ble det spurt om systematisk og usystematisk risiko under kapitalverdimodellen, og i 2019 om kovarians med markedet beregnet fra beta (se kapittel 11). Dette er regneoppgaver med mange mellomregninger – sett opp en ryddig tabell og behold nok desimaler i variansen.</p>`
  });

  /* ===================================================================== */
  /* KAPITTEL 11                                                           */
  /* ===================================================================== */
  O.theory.push({
    nr: 11,
    title: 'Risiko og avkastning',
    examWeight: 'høy',
    summary: `<p>Rasjonelle investorer har <strong>risikoaversjon</strong>: de tar ikke risiko uten å få betalt for det i form av høyere forventet avkastning. Men ikke all risiko gir betaling. <strong>Usystematisk risiko</strong> kan diversifiseres bort i en portefølje, og derfor blir investor heller ikke belønnet for å bære den. Bare <strong>systematisk risiko</strong> (markedsrisiko) prises.</p>
<p>Kombinerer man risikofri plassering med en risikabel portefølje, ligger alle kombinasjonene på en rett linje – <strong>kapitalmarkedslinjen</strong>. Helningen er <strong>Sharpe-raten</strong>, og den er høyest når den risikable porteføljen er <strong>markedsporteføljen</strong> M.</p>
<p><strong>Kapitalverdimodellen (KVM)</strong> sier at avkastningskravet til en aksje er risikofri rente pluss en risikopremie som avhenger av aksjens <strong>beta</strong>: r<sub>e</sub> = r<sub>f</sub> + β · (r<sub>m</sub> − r<sub>f</sub>). Beta måler hvor følsom aksjen er for markedets svingninger; markedet har β = 1 og risikofri plassering β = 0.</p>
<p>Et selskap er finansiert med både egenkapital og gjeld. Avkastningskravet til totalkapitalen – <strong>WACC</strong> – er et veid gjennomsnitt av egenkapitalkostnaden og gjeldskostnaden etter skatt, med markedsverdier som vekter. WACC er diskonteringsrenten i investeringsanalysen etter skatt, og dermed inngangen til den store eksamensoppgaven.</p>`,
    concepts: [
      { term: 'Risikoaversjon', def: `Investorer krever kompensasjon i form av høyere forventet avkastning for å ta risiko.` },
      { term: 'Risikofri rente (r<sub>f</sub>)', def: `Avkastningen på en plassering uten risiko, i praksis statsobligasjoner (ofte 10-årig statsobligasjonsrente).` },
      { term: 'Markedets risikopremie', def: `r<sub>m</sub> − r<sub>f</sub>: meravkastningen markedsporteføljen forventes å gi ut over risikofri rente. I praksis ofte rundt 5 %.` },
      { term: 'Kapitalmarkedslinjen', def: `Linjen som viser forventet avkastning og standardavvik for kombinasjoner av risikofri plassering og markedsporteføljen. Helningen er Sharpe-raten.` },
      { term: 'Sharpe-rate', def: `Meravkastning per enhet risiko: (E(r<sub>p</sub>) − r<sub>f</sub>) / σ<sub>p</sub>.` },
      { term: 'Kapitalverdimodellen (KVM)', def: `Modell for avkastningskravet til en aksje: risikofri rente pluss beta ganger markedets risikopremie. Bare systematisk risiko gir risikopremie.` },
      { term: 'Beta (β)', def: `Mål på systematisk risiko: forholdet mellom aksjens kovarians med markedet og markedets varians. β = 1,2 betyr at aksjen forventes å stige 1,2 % når markedet stiger 1 %.` },
      { term: 'Veldiversifisert portefølje', def: `Portefølje der det meste av den usystematiske risikoen er fjernet.` },
      { term: 'Egenkapitalkostnad (r<sub>e</sub>)', def: `Eiernes avkastningskrav, beregnet med KVM.` },
      { term: 'Gjeldskostnad (r<sub>g</sub>)', def: `Långivernes avkastningskrav (lånerenten før skatt). Kan beregnes med KVM og gjeldsbeta når gjelden er omsatt, ellers er den oppgitt.` },
      { term: 'WACC', def: `Weighted Average Cost of Capital – avkastningskravet til totalkapitalen etter skatt (r<sub>t</sub>).` },
      { term: 'Småbedriftspremie', def: `Tillegg i avkastningskravet for små bedrifter (avhengighet av nøkkelpersoner, få kunder, vanskeligere finansiering). Brukes av rundt 80 % i praksis.` }
    ],
    formulas: [
      { name: 'Kapitalverdimodellen (egenkapitalkostnad)', html: `r<sub>e</sub> = r<sub>f</sub> + β<sub>e</sub> · (r<sub>m</sub> − r<sub>f</sub>)`, note: `Uten skattejustering av risikofri rente (slik forelesningen og 7. utgave gjør det). Er «markedets risikopremie» oppgitt, er det hele parentesen.` },
      { name: 'WACC', html: `WACC = r<sub>e</sub> · <span class="frac"><span>E</span><span>V</span></span> + r<sub>g</sub> · (1 − s) · <span class="frac"><span>G</span><span>V</span></span>`, note: `E = markedsverdi egenkapital, G = markedsverdi gjeld, V = E + G, s = 22 %. Skattejusteringen gjelder bare gjeldsleddet.` },
      { name: 'Gjeldskostnad via KVM', html: `r<sub>g</sub> = r<sub>f</sub> + β<sub>g</sub> · (r<sub>m</sub> − r<sub>f</sub>)`, note: `Brukes når gjeldsbeta er oppgitt. Ellers brukes den oppgitte lånerenten.` },
      { name: 'Beta', html: `β<sub>j</sub> = <span class="frac"><span>Kov(r<sub>j</sub>, r<sub>m</sub>)</span><span>Var(r<sub>m</sub>)</span></span>`, note: `Omvendt: Kov(r<sub>j</sub>, r<sub>m</sub>) = β<sub>j</sub> · σ<sub>m</sub><sup>2</sup>. Estimeres som stigningstallet i en regresjon av aksjens avkastning mot markedets.` },
      { name: 'Porteføljebeta', html: `β<sub>p</sub> = Σ w<sub>i</sub> · β<sub>i</sub>`, note: `Veid gjennomsnitt av enkeltaksjenes betaer.` },
      { name: 'Risikofri plassering + risikabel portefølje', html: `E(r<sub>p</sub>) = w · E(r<sub>Y</sub>) + (1 − w) · r<sub>f</sub> &nbsp;&nbsp;&nbsp; σ<sub>p</sub> = w · σ<sub>Y</sub>`, note: `w = andelen i den risikable plasseringen Y.` },
      { name: 'Sharpe-rate', html: `<span class="frac"><span>E(r<sub>p</sub>) − r<sub>f</sub></span><span>σ<sub>p</sub></span></span>`, note: `Helningen på kapitalmarkedslinjen.` },
      { name: 'Systematisk og usystematisk risiko', html: `σ<sub>j</sub><sup>2</sup> = β<sub>j</sub><sup>2</sup> · σ<sub>m</sub><sup>2</sup> + σ<sub>ε</sub><sup>2</sup>`, note: `Total varians = systematisk del (β<sup>2</sup>σ<sub>m</sub><sup>2</sup>) + usystematisk del. Systematisk standardavvik er β · σ<sub>m</sub>. Under KVM prises bare den systematiske delen.` }
    ],
    methods: [
      { title: 'WACC i tre beregninger', steps: [
        `Egenkapitalkostnad med KVM: r<sub>e</sub> = r<sub>f</sub> + β · (r<sub>m</sub> − r<sub>f</sub>). Ikke skattejuster risikofri rente.`,
        `Gjeldskostnad: oppgitt lånerente, eller r<sub>f</sub> + β<sub>g</sub> · (r<sub>m</sub> − r<sub>f</sub>). Etter skatt: r<sub>g</sub> · (1 − 0,22).`,
        `Vekter: E/V og G/V med markedsverdier. Er gjeldsgraden oppgitt som G/E, regn om: G/V = (G/E) / (1 + G/E).`,
        `WACC = r<sub>e</sub> · E/V + r<sub>g</sub> · (1 − s) · G/V. Behold desimalene – bruk uavrundet WACC videre hvis oppgaven ikke ber om avrunding.`
      ] },
      { title: 'Den store eksamensoppgaven: fra WACC til NNV etter skatt', steps: [
        `Beregn r<sub>e</sub> og WACC som over.`,
        `Sett opp relevant driftskontantstrøm før avskrivninger år for år.`,
        `Trekk 22 % skatt av driftskontantstrømmen.`,
        `Arbeidskapital = x % av neste års omsetning: bind året før, juster ved endret omsetning, frigjør siste år.`,
        `År 0: − investering + NV spart skatt = AM · a · s / (WACC + a).`,
        `Ved salgsverdi: + SV i siste år og − SV · a · s / (WACC + a) i siste år.`,
        `Diskonter beregningsgrunnlaget med WACC og konkluder.`
      ] }
    ],
    examples: [
      { title: 'Eksempel 1: KVM og WACC trinn for trinn', html: `<p>r<sub>f</sub> = 3 %, r<sub>m</sub> = 9 %, egenkapitalbeta 1,55, gjeldsbeta 0,24, egenkapitalandel 40 %, gjeldsandel 60 %, skatt 22 %.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Steg</th><th>Beregning</th><th>Svar</th></tr></thead><tbody>
<tr><th scope="row">1. Egenkapitalkostnad</th><td>0,03 + 1,55 · (0,09 − 0,03)</td><td>12,30 %</td></tr>
<tr><th scope="row">2. Gjeldskostnad før skatt</th><td>0,03 + 0,24 · 0,06</td><td>4,44 %</td></tr>
<tr><th scope="row">3. Gjeldskostnad etter skatt</th><td>0,0444 · 0,78</td><td>3,46 %</td></tr>
<tr class="sum"><th scope="row">4. WACC</th><td>0,123 · 0,40 + 0,0346 · 0,60</td><td>7,00 %</td></tr>
</tbody></table></div>
<p>Enklere variant: r<sub>f</sub> = 3 %, markedets risikopremie 6 %, β = 1,5 gir r<sub>e</sub> = 0,03 + 1,5 · 0,06 = 12 %.</p>` },
      { title: 'Eksempel 2: Risikofri plassering og en aksje (egne tall)', html: `<p>Du har 1 000 kr. 350 kr plasseres i aksje Y og resten risikofritt. Anta E(r<sub>Y</sub>) = 12 %, σ<sub>Y</sub> = 20 % og r<sub>f</sub> = 3 %.</p>
<div class="formula">E(r<sub>p</sub>) = 0,35 · 12 % + 0,65 · 3 % = 6,15 % &nbsp;&nbsp;&nbsp; σ<sub>p</sub> = 0,35 · 20 % = 7,0 %</div>
<p>Sharpe-raten er (6,15 − 3) / 7,0 = 0,45 – den samme som for aksje Y alene, (12 − 3) / 20 = 0,45. Alle kombinasjoner av Y og risikofri plassering ligger på samme rette linje.</p>` },
      { title: 'Eksempel 3: Fra WACC til nåverdi etter skatt', html: `<p>Egenkapital 600 000 og gjeld 400 000 (markedsverdier). r<sub>f</sub> = 3,6 %, markedets risikopremie 5 %, β = 1,2, lånerente 3,98 %. Prosjekt: anlegg 200 000, arbeidskapital 50 000, driftskontantstrøm før skatt 100 000 per år i 4 år. Saldosats 20 %, skatt 22 %. (Lærebokens oppgave 11.6.)</p>
<p>r<sub>e</sub> = 3,6 % + 1,2 · 5 % = 9,6 %. WACC = 0,6 · 9,6 % + 0,4 · 3,98 % · 0,78 = 7,0018 % ≈ 7 %.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>År 0</th><th>År 1</th><th>År 2</th><th>År 3</th><th>År 4</th></tr></thead><tbody>
<tr><th scope="row">Anleggsmidler</th><td>−200 000</td><td></td><td></td><td></td><td></td></tr>
<tr><th scope="row">Arbeidskapital</th><td>−50 000</td><td></td><td></td><td></td><td>50 000</td></tr>
<tr><th scope="row">Kontantstrøm drift før skatt</th><td></td><td>100 000</td><td>100 000</td><td>100 000</td><td>100 000</td></tr>
<tr><th scope="row">Skatt 22 %</th><td></td><td>−22 000</td><td>−22 000</td><td>−22 000</td><td>−22 000</td></tr>
<tr><th scope="row">NV spart skatt avskrivninger</th><td>32 593</td><td></td><td></td><td></td><td></td></tr>
<tr class="sum"><th scope="row">Beregningsgrunnlag</th><td>−217 407</td><td>78 000</td><td>78 000</td><td>78 000</td><td>128 000</td></tr>
</tbody></table></div>
<p>NV spart skatt = 200 000 · 0,22 · 0,20 / (0,07 + 0,20) = 32 593. NNV etter skatt (7 %) = <strong>84 940</strong> → prosjektet er lønnsomt.</p>` }
    ],
    pitfalls: [
      `Å skattejustere risikofri rente i KVM. Forelesningen og 7. utgave bruker r<sub>f</sub> uten justering (eldre løsningsforslag fra 2016/2017 gjorde det annerledes).`,
      `Å gange beta med r<sub>m</sub> i stedet for med risikopremien (r<sub>m</sub> − r<sub>f</sub>).`,
      `Å trekke fra r<sub>f</sub> en gang til når oppgaven oppgir «markedets risikopremie» direkte.`,
      `Å glemme (1 − s) på gjeldsleddet i WACC – eller å sette (1 − s) på egenkapitalleddet.`,
      `Å bruke bokførte verdier som vekter. Det skal være markedsverdier.`,
      `Å lese gjeldsgrad G/E som gjeldsandel G/V.`,
      `Å tro at høyt standardavvik alene gir høyt avkastningskrav. Det er beta (systematisk risiko) som teller under KVM.`,
      `Å runde av WACC for tidlig. Nyere løsningsforslag diskonterer med uavrundet WACC.`
    ],
    excel: [
      { fn: 'STIGNINGSTALL(kjente_y; kjente_x)', use: `Beta direkte: y = aksjens avkastning, x = markedets avkastning.` },
      { fn: 'Data → Dataanalyse → Regresjon', use: `Lineær regresjon av aksjens avkastning mot markedets; koeffisienten for X er beta.` },
      { fn: 'KOVARIANS.S(aksje; marked) / VARIANS.S(marked)', use: `Beta som kovarians delt på markedets varians.` },
      { fn: 'NNV(WACC; beregningsgrunnlag år 1–n) + år 0', use: `Netto nåverdi etter skatt med WACC som avkastningskrav.` }
    ],
    examNotes: `<p><strong>WACC + nåverdi etter skatt har kommet 10 av 10 ganger og utgjør 25–40 % av eksamen.</strong> Første deloppgave er nesten alltid å beregne egenkapitalkostnaden med KVM og deretter WACC. Løsningsforslagene bruker r<sub>e</sub> = r<sub>f</sub> + β(r<sub>m</sub> − r<sub>f</sub>) <em>uten</em> skattejustering av risikofri rente, og WACC = r<sub>e</sub> · E/V + r<sub>g</sub> · (1 − s) · G/V med s = 22 %.</p>
<p>Resten av oppgaven er metoden fra kapittel 8: driftskontantstrøm, 22 % skatt, arbeidskapital, saldoformelen med WACC i nevneren, og diskontering med (uavrundet) WACC. En feil i WACC forplanter seg, så dobbeltsjekk denne først.</p>
<p>Teorispørsmål som har dukket opp: systematisk og usystematisk risiko under KVM (2024) og kovarians med markedet beregnet fra beta, Kov = β · σ<sub>m</sub><sup>2</sup> (2019).</p>`
  });

  /* ===================================================================== */
  /* KAPITTEL 12                                                           */
  /* ===================================================================== */
  O.theory.push({
    nr: 12,
    title: 'Arbeidskapital og kredittpolitikk',
    examWeight: 'lav',
    summary: `<p><strong>Kapittel 12 er ikke forelest</strong> – det finnes ingen forelesningslysbilder, og temaet har ikke vært gitt som egen eksamensoppgave. Oversikten her bygger bare på lærebokens oppgaver med løsningsforslag, og er ment som orientering.</p>
<p>Kapitlet handler om forvaltning av <strong>arbeidskapitalen</strong>: hvor mye kapital som er bundet i kundefordringer og varelager, og hvordan <strong>kredittpolitikken</strong> (kredittid, kontantrabatt, strammere oppfølging) påvirker kapitalbinding, rentekostnader, tap på krav og salg. Analysen er en avveining: frigjort kapital · rente og reduserte tap på den ene siden, mot tapt dekningsbidrag, rabattkostnad og økte administrasjonskostnader på den andre.</p>
<p>Likviditeten måles med <strong>nøkkeltall</strong> som balanselikviditet, kasselikviditet, gjeldsandel og kundekredittid, sammenlignet med bransjen. Kapitlet omtaler også <strong>konkursprediksjon</strong> med Altmans Z-score. Det som er nyttig å ta med seg til eksamen, er koblingen til de andre kapitlene: arbeidskapital i investeringskalkylen (kapittel 2, 8 og 11) og kostnaden ved leverandørkreditt og factoring (kapittel 7).</p>`,
    concepts: [
      { term: 'Arbeidskapital', def: `Omløpsmidler minus kortsiktig gjeld. I investeringskalkyler: varelager + kundefordringer − leverandørgjeld.` },
      { term: 'Kundekredittid', def: `Antall dager kundene i gjennomsnitt bruker på å betale. Bestemmer hvor mye kapital som er bundet i kundefordringer.` },
      { term: 'Kredittpolitikk', def: `Bedriftens regler for kredittid, kontantrabatt, kredittvurdering og innkreving.` },
      { term: 'Kontantrabatt', def: `Rabatt til kunder som betaler raskt. Reduserer kundefordringer og tap, men koster rabatten.` },
      { term: 'Altmans Z-score', def: `Veid sum av fem regnskapsbaserte forholdstall som brukes til å vurdere konkursrisiko. Lav Z betyr høy risiko.` },
      { term: 'Balanselikviditet og kasselikviditet', def: `Mål på evnen til å betale kortsiktig gjeld. Balanselikviditet (likviditetsgrad 1) tar med alle omløpsmidler, kasselikviditet (likviditetsgrad 2) holder varelageret utenfor. Sammenlignes med bransjesnitt og tidligere år.` }
    ],
    formulas: [
      { name: 'Kapital bundet i kundefordringer', html: `Kundefordringer = Kredittsalg · <span class="frac"><span>kredittdager</span><span>360</span></span>`, note: `Bruk antall dager i året som oppgaveteksten sier. Står det ingenting, bruk 360 og skriv det i svaret. Løsningsforslagene bruker 360 i oppg. 1 og 2 og 365 i oppg. 3.` },
      { name: 'Balanselikviditet og kasselikviditet', html: `Balanselikviditet = <span class="frac"><span>omløpsmidler</span><span>kortsiktig gjeld</span></span> &nbsp;&nbsp;&nbsp; Kasselikviditet = <span class="frac"><span>omløpsmidler − varelager</span><span>kortsiktig gjeld</span></span>`, note: `Kalles også likviditetsgrad 1 og 2. Vanlige tommelfingerregler er over 2 og over 1, men bransjesnittet er et bedre sammenligningsgrunnlag. Eksempel (12.3): 38 570 / 28 360 = 1,36 og 22 120 / 28 360 = 0,78.` },
      { name: 'Gjeldsandel og kundekredittid', html: `Gjeldsandel = <span class="frac"><span>total gjeld</span><span>totalkapital</span></span> &nbsp;&nbsp;&nbsp; Kundekredittid = <span class="frac"><span>kundefordringer</span><span>kredittsalg</span></span> · 365`, note: `Bruk antall dager i året som oppgaveteksten sier. Står det ingenting, bruk 360 og skriv det i svaret. Løsningsforslaget til 12.3 bruker 365: 21 970 / 72 900 · 365 = 110 dager.` },
      { name: 'Gevinst ved redusert kapitalbinding', html: `Spart rentekostnad = Frigjort kapital · rente`, note: `Sammenholdes med reduserte tap på krav, tapt dekningsbidrag, rabattkostnad og administrasjonskostnader.` },
      { name: 'Altmans Z-score', html: `Z = 1,2 · X<sub>1</sub> + 1,4 · X<sub>2</sub> + 3,3 · X<sub>3</sub> + 0,6 · X<sub>4</sub> + 0,999 · X<sub>5</sub>`, note: `X<sub>1</sub> = arbeidskapital / totale eiendeler, X<sub>2</sub> = opptjent egenkapital / totale eiendeler, X<sub>3</sub> = driftsresultat / totale eiendeler, X<sub>4</sub> = markedsverdi egenkapital / total gjeld, X<sub>5</sub> = omsetning / totale eiendeler. Altman (1968) brukte grensene 1,81 og 2,99: under 1,81 høy konkursrisiko, over 2,99 lav, imellom gråsone. Grensene står ikke i løsningsforslaget og er tatt fra standardteorien.` }
    ],
    methods: [
      { title: 'Lønnsomhet av endret kredittpolitikk', steps: [
        `Beregn kundefordringer (og ev. varelager og leverandørgjeld) før og etter endringen.`,
        `Frigjort kapital · rentesats = spart rentekostnad.`,
        `Legg til reduserte tap på krav.`,
        `Trekk fra tapt dekningsbidrag, kontantrabatt og økte administrasjonskostnader.`,
        `Positiv nettoeffekt → endringen er lønnsom.`
      ] },
      { title: 'Altmans Z-score', steps: [
        `Arbeidskapital = omløpsmidler − kortsiktig gjeld (kan være negativ). Total gjeld = kortsiktig + langsiktig gjeld.`,
        `Regn de fem forholdstallene. X<sub>2</sub> bruker bare opptjent egenkapital, X<sub>4</sub> markedsverdien av egenkapitalen.`,
        `Gang med vektene og summer. Sammenlign med grensene 1,81 og 2,99.`
      ] },
      { title: 'Nøkkeltall for likviditet mot bransjen', steps: [
        `Summer omløpsmidlene (varelager, kundefordringer, kontanter) og den kortsiktige gjelden (kassekreditt, leverandørgjeld og annen kortsiktig gjeld).`,
        `Balanselikviditet = omløpsmidler / kortsiktig gjeld. Kasselikviditet = (omløpsmidler − varelager) / kortsiktig gjeld.`,
        `Gjeldsandel = (langsiktig + kortsiktig gjeld) / sum eiendeler.`,
        `Kundekredittid = kundefordringer / kredittsalg · antall dager i året (som oppgaveteksten sier).`,
        `Sammenlign med bransjesnittet og med tidligere år: er tallene svakere, og blir de verre?`
      ] }
    ],
    examples: [
      { title: 'Eksempel 1: Kundefordringer som del av investeringen', html: `<p>Et prosjekt gir driftsinntekter på 1 800 000 per år, og kundene får 30 dagers kreditt. Det regnes med 360 dager i året, som i oppgaven. (Lærebokens oppgave 12.1.)</p>
<div class="formula">Kundefordringer = 1 800 000 · 30 / 360 = 150 000</div>
<p>Beløpet bindes i år 0 sammen med anlegg (750 000) og andre omløpsmidler (150 000), til sammen 1 050 000, og frigjøres i siste år. Med dekningsgrad 40 % og faste kostnader 378 000 blir den årlige kontantstrømmen 342 000, og 742 000 i år 5 (inkludert frigjort arbeidskapital 300 000 og restverdi 100 000). IR = 25,0 % og NNV ved 20 % = 133 540.</p>` },
      { title: 'Eksempel 2: Innføring av kontantrabatt (tall i 1 000 kr)', html: `<p>Omsetning 72 900, kundefordringer 21 970 (kredittid 110 dager). Bedriften innfører 3 % kontantrabatt ved betaling innen 14 dager. Halvparten av kundene forventes å bruke rabatten, resten betaler fortsatt etter 110 dager. Kassekredittrente 14 %, økte administrasjonskostnader 500, og tap på krav halveres (fra 1,8 % til 0,9 % av omsetningen). Det regnes med 365 dager i året, som i oppgaven. (Lærebokens oppgave 12.3.)</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>Beregning</th><th>Beløp</th></tr></thead><tbody>
<tr><th scope="row">Nye kundefordringer</th><td>72 900 · 0,5 · 14/365 + 72 900 · 0,5 · 110/365</td><td>12 383</td></tr>
<tr><th scope="row">Frigjort kapital</th><td>21 970 − 12 383</td><td>9 587</td></tr>
<tr><th scope="row">Sparte rentekostnader</th><td>14 % · 9 587</td><td>1 342</td></tr>
<tr><th scope="row">Reduserte tap på krav</th><td>0,9 % · 72 900</td><td>656</td></tr>
<tr><th scope="row">Kontantrabatt</th><td>3 % · 50 % · 72 900</td><td>−1 094</td></tr>
<tr><th scope="row">Økte administrasjonskostnader</th><td></td><td>−500</td></tr>
<tr class="sum"><th scope="row">Netto resultatøkning</th><td></td><td>405</td></tr>
</tbody></table></div>` },
      { title: 'Eksempel 3: Nøkkeltall fra balansen (tall i 1 000 kr)', html: `<p>Samme bedrift som i eksempel 2. Balansen for 2022: varelager 16 450, kundefordringer 21 970, kontanter 150, anleggsmidler 35 280 (sum 73 850). Egenkapital 30 490, langsiktig lån 15 000, kassekreditt 14 600, annen kortsiktig gjeld 13 760. Salgsinntekter 72 900, 365 dager i året. (Lærebokens oppgave 12.3.)</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>Beregning</th><th>2022</th><th>Bransjen</th></tr></thead><tbody>
<tr><th scope="row">Balanselikviditet</th><td>38 570 / 28 360</td><td>1,36</td><td>1,5</td></tr>
<tr><th scope="row">Kasselikviditet</th><td>22 120 / 28 360</td><td>0,78</td><td>0,9</td></tr>
<tr><th scope="row">Kundekredittid</th><td>21 970 / 72 900 · 365</td><td>110 dager</td><td>60 dager</td></tr>
<tr><th scope="row">Gjeldsandel</th><td>43 360 / 73 850</td><td>58,7 %</td><td>86 %</td></tr>
</tbody></table></div>
<p>Likviditeten er svakere enn bransjen og har falt hvert år siden 2019 (balanselikviditet 1,83, kasselikviditet 0,95, kredittid 60 dager). Årsaken er særlig kredittiden: kundene bruker nesten dobbelt så lang tid som i bransjen, og fordringene er finansiert med kassekreditt. Det er bakgrunnen for kontantrabatten i eksempel 2.</p>
<p class="small muted">Løsningsforslaget oppgir gjeldsandeler fra 80,2 % (2019) til 97,1 % (2022). De lar seg ikke gjenskape fra balansen, som gir 58,7 %. Tallene for balanselikviditet, kasselikviditet og kredittid stemmer.</p>` }
    ],
    pitfalls: [
      `Å glemme at frigjort kapital i seg selv ikke er en gevinst – gevinsten er den sparte rentekostnaden på kapitalen.`,
      `Å regne tapt omsetning som kostnad. Det er tapt dekningsbidrag som er relevant.`,
      `Å blande 360 og 365 dager i samme oppgave. Bruk det oppgaveteksten sier, og 360 hvis ingenting står.`,
      `Å ta med varelageret i kasselikviditeten, eller å regne gjeldsandelen av egenkapitalen i stedet for av totalkapitalen.`
    ],
    excel: [
      { fn: 'Data → Dataanalyse → Regresjon', use: `Brukes i læreboken til en enkel konkursprediksjonsmodell (konkursstatus mot totalrentabilitet).` }
    ],
    examNotes: `<p><strong>Ikke forelest og aldri gitt som egen oppgave 2016–2025.</strong> Prioriter kapittel 7, 8, 10 og 11. Det eneste fra dette kapitlet som jevnlig er relevant, er forståelsen av arbeidskapital som kapitalbinding i investeringsoppgaven (x % av neste års omsetning, bundet året før og frigjort siste år).</p>`
  });

  /* ===================================================================== */
  /* KAPITTEL 13                                                           */
  /* ===================================================================== */
  O.theory.push({
    nr: 13,
    title: 'Opsjoner',
    examWeight: 'lav',
    summary: `<p>En <strong>opsjon</strong> er et derivat: verdien avhenger av et underliggende objekt, typisk en aksje. Opsjonen gir eieren <strong>rett, men ikke plikt</strong>, til å kjøpe (<strong>kjøpsopsjon</strong>) eller selge (<strong>salgsopsjon</strong>) det underliggende til en avtalt <strong>innløsningskurs</strong>, enten på en bestemt dato (europeisk) eller når som helst innen datoen (amerikansk). Kjøperen betaler en <strong>opsjonspremie</strong> for retten; utstederen (selgeren) mottar premien og har plikt til å oppfylle.</p>
<p>Det finnes fire grunnposisjoner: kjøp og salg av kjøpsopsjon, kjøp og salg av salgsopsjon. Kjøperen kan maksimalt tape premien, mens utstederen av en kjøpsopsjon har ubegrenset tapsmulighet. Ser vi bort fra transaksjonskostnader, er opsjoner et <strong>nullsumspill</strong>. Opsjoner brukes til spekulasjon (giring: stor prosentvis gevinst og tap for en liten innsats) og til forsikring (eier du aksjen, sikrer en salgsopsjon en minstekurs).</p>
<p>Opsjonens verdi er <strong>realverdi + tidsverdi</strong>. Realverdien er det opsjonen ville gitt ved utøvelse nå (aldri negativ). Tidsverdien reflekterer sjansen for ytterligere gevinst før bortfall, og er null på bortfallsdagen.</p>
<p>Verdsettelsen bygger på <strong>opsjonsekvivalenten</strong>: en portefølje av en andel <i>m</i> av aksjen og et lån <i>L</i> som gir nøyaktig samme utbetaling som opsjonen. Samme utbetaling betyr samme pris. I <strong>binomialmodellen</strong> kan aksjen bare gå opp eller ned én gang, og opsjonsverdien blir K<sub>0</sub> = m · P<sub>0</sub> + L. Sannsynlighetene for opp- og nedgang inngår ikke. Salgsopsjonen finnes fra <strong>salg-kjøp-pariteten</strong>. <strong>Black-Scholes</strong> er den kontinuerlige modellen som brukes i praksis.</p>`,
    concepts: [
      { term: 'Derivat', def: `Verdipapir der verdien er avledet av et underliggende objekt. Opsjoner og terminkontrakter er derivater.` },
      { term: 'Kjøpsopsjon (call)', def: `Rett, men ikke plikt, til å <em>kjøpe</em> det underliggende til innløsningskursen.` },
      { term: 'Salgsopsjon (put)', def: `Rett, men ikke plikt, til å <em>selge</em> det underliggende til innløsningskursen.` },
      { term: 'Innløsningskurs (I)', def: `Den avtalte prisen opsjonen kan utøves til (strike).` },
      { term: 'Europeisk og amerikansk opsjon', def: `Europeisk: kan bare utøves <em>på</em> bortfallsdatoen. Amerikansk: kan utøves når som helst <em>innen</em> bortfallsdatoen. Har ikke noe med geografi å gjøre. På Oslo Børs er aksjeopsjoner amerikanske og indeksopsjoner europeiske.` },
      { term: 'Opsjonspremie', def: `Prisen kjøperen betaler for opsjonen. En kontrakt på Oslo Børs omfatter 100 aksjer.` },
      { term: 'Utsteder og holder', def: `Utsteder (writer) selger opsjonen og har plikt til å oppfylle. Holder er kjøper og eier av retten.` },
      { term: 'ITM, ATM, OTM', def: `In the money: lønnsom å utøve (kjøpsopsjon når aksjekurs &gt; innløsningskurs, salgsopsjon når aksjekurs &lt; innløsningskurs). At the money: kursene er like. Out of the money: ikke lønnsom å utøve.` },
      { term: 'Realverdi', def: `Verdien ved umiddelbar utøvelse: max(0, P − I) for kjøpsopsjon og max(0, I − P) for salgsopsjon.` },
      { term: 'Tidsverdi', def: `Opsjonens markedsverdi minus realverdien. Størst tidlig, faller stadig raskere mot bortfall og er null på bortfallsdagen.` },
      { term: 'Opsjonsekvivalenten', def: `En «kunstig» portefølje av en andel <i>m</i> av aksjen og et lån <i>L</i> som gir samme utbetaling som opsjonen, og derfor må ha samme pris.` },
      { term: 'Giring', def: `Opsjoner gir mye større prosentvis gevinst og tap enn aksjen selv for samme innsats.` },
      { term: 'OTC', def: `Over the counter: skreddersydde kontrakter avtalt direkte mellom partene, i motsetning til standardiserte børsomsatte opsjoner.` }
    ],
    formulas: [
      { name: 'Gevinst ved bortfall, per aksje', html: `Kjøper kjøpsopsjon: max(0, P − I) − premie &nbsp;&nbsp;&nbsp; Kjøper salgsopsjon: max(0, I − P) − premie`, note: `P = aksjekurs ved bortfall, I = innløsningskurs. Utstederens gevinst er det samme med motsatt fortegn. Gang med antall aksjer (100 per kontrakt).` },
      { name: 'Nullpunkt', html: `Kjøpsopsjon: P = I + premie &nbsp;&nbsp;&nbsp; Salgsopsjon: P = I − premie`, note: `Aksjekursen ved bortfall der kjøperen verken tjener eller taper.` },
      { name: 'Opsjonsverdi', html: `Opsjonsverdi = realverdi + tidsverdi`, note: `Realverdien kan aldri være negativ.` },
      { name: 'Binomialmodellen: utbetaling ved bortfall', html: `K<sub>u</sub> = max(0, u · P<sub>0</sub> − I) &nbsp;&nbsp;&nbsp; K<sub>d</sub> = max(0, d · P<sub>0</sub> − I)`, note: `P<sub>0</sub> = aksjekurs nå, <i>u</i> og <i>d</i> = multiplikator ved opp- og nedgang.` },
      { name: 'Binomialmodellen: andel aksjer (sikringsforhold)', html: `m = <span class="frac"><span>K<sub>u</sub> − K<sub>d</sub></span><span>u · P<sub>0</sub> − d · P<sub>0</sub></span></span>`, note: `Forskjell i opsjonsutbetaling delt på forskjell i aksjekurs.` },
      { name: 'Binomialmodellen: lån', html: `L = − <span class="frac"><span>m · d · P<sub>0</sub> − K<sub>d</sub></span><span>1 + r<sub>f</sub></span></span>`, note: `Negativt tall (lån). Lånet med renter skal akkurat dekkes av aksjeposten i nedtilstanden.` },
      { name: 'Binomialmodellen: verdi av kjøpsopsjon', html: `K<sub>0</sub> = m · P<sub>0</sub> + L`, note: `Verdien av opsjonsekvivalenten. Sannsynligheten for oppgang inngår ikke.` },
      { name: 'Salg-kjøp-paritet', html: `S<sub>0</sub> = K<sub>0</sub> + <span class="frac"><span>I</span><span>1 + r<sub>f</sub></span></span> − P<sub>0</sub>`, note: `Salgsopsjon = kjøpsopsjon + nåverdi av innløsningskurs − aksjekurs. Samme innløsningskurs og bortfallsdato.` },
      { name: 'Black-Scholes, kjøpsopsjon', html: `K<sub>0</sub> = P<sub>0</sub> · N(d<sub>1</sub>) − I · e<sup>−r<sub>f</sub> · T</sup> · N(d<sub>2</sub>)`, note: `N(·) = kumulativ standard normalfordeling, T = tid til bortfall i år (dager / 365). Løsningsforslagene og forelesningen bruker 365 dager her. Står det noe annet i oppgaveteksten, følg det. Salgsopsjon: S<sub>0</sub> = K<sub>0</sub> + I · e<sup>−r<sub>f</sub> · T</sup> − P<sub>0</sub>.` },
      { name: 'Black-Scholes, d₁ og d₂', html: `d<sub>1</sub> = <span class="frac"><span>LN(P<sub>0</sub> / I) + (r<sub>f</sub> + σ<sup>2</sup> / 2) · T</span><span>σ · √T</span></span> &nbsp;&nbsp;&nbsp; d<sub>2</sub> = d<sub>1</sub> − σ · √T`, note: `σ = aksjens årlige standardavvik (volatilitet).` }
    ],
    methods: [
      { title: 'Verdsette en kjøpsopsjon med binomialmodellen', steps: [
        `Finn aksjekursen i de to tilstandene: u · P<sub>0</sub> og d · P<sub>0</sub>.`,
        `Finn opsjonens utbetaling i hver tilstand: K<sub>u</sub> og K<sub>d</sub> (aldri negativ).`,
        `Andel aksjer: m = (K<sub>u</sub> − K<sub>d</sub>) / (u · P<sub>0</sub> − d · P<sub>0</sub>).`,
        `Lån: L = −(m · d · P<sub>0</sub> − K<sub>d</sub>) / (1 + r<sub>f</sub>).`,
        `Opsjonsverdi: K<sub>0</sub> = m · P<sub>0</sub> + L.`,
        `Kontroll: m · aksjekurs − lån med renter skal gi K<sub>u</sub> i opptilstanden og K<sub>d</sub> i nedtilstanden.`,
        `Salgsopsjon via pariteten: S<sub>0</sub> = K<sub>0</sub> + I / (1 + r<sub>f</sub>) − P<sub>0</sub>.`
      ] },
      { title: 'Black-Scholes', steps: [
        `Regn om tid til bortfall til år: T = dager / 365.`,
        `Beregn d<sub>1</sub> og d<sub>2</sub>.`,
        `Finn N(d<sub>1</sub>) og N(d<sub>2</sub>) fra tabell eller Excel.`,
        `Sett inn i formelen for kjøpsopsjonen. Bruk pariteten for salgsopsjonen.`
      ] }
    ],
    examples: [
      { title: 'Eksempel 1: Kjøp av kjøpsopsjon og av salgsopsjon', html: `<p>Aksjekursen er 380. En kontrakt gjelder 100 aksjer.</p>
<p><strong>Kjøpsopsjon</strong> med innløsningskurs 400 og premie 22 per aksje: du betaler 2 200. Blir kursen 450 ved bortfall, er gevinsten (450 − 400 − 22) · 100 = <strong>2 800</strong>. Nullpunktet er kurs 422. Blir kursen 400 eller lavere, bortfaller opsjonen verdiløs og tapet er premien, 2 200.</p>
<p><strong>Salgsopsjon</strong> med innløsningskurs 400 og premie 44 per aksje: du betaler 4 400. Maksimalt tap er 4 400. Maksimal gevinst (kursen faller til 0) er 400 · 100 − 4 400 = <strong>35 600</strong>. Nullpunktet er kurs 356. Opsjonen er ITM i dag med realverdi 20 og tidsverdi 24 per aksje.</p>` },
      { title: 'Eksempel 2: Giring – aksjer eller opsjoner for 38 000 kr?', html: `<p>For 38 000 kr kan du kjøpe 100 aksjer til kurs 380, eller 38 000 / 22 = 1 727,27 kjøpsopsjoner med innløsningskurs 400.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Kurs ved bortfall</th><th>Gevinst aksjer</th><th>Gevinst opsjoner</th></tr></thead><tbody>
<tr><th scope="row">450</th><td>+7 000 (+18,4 %)</td><td>+48 364 (+127 %)</td></tr>
<tr><th scope="row">350</th><td>−3 000 (−7,9 %)</td><td>−38 000 (−100 %)</td></tr>
</tbody></table></div>
<p>Opsjonsgevinst ved 450: 1 727,27 · 50 − 38 000 = 48 364. Strategiene er likeverdige når 100 · (P − 380) = 1 727,27 · (P − 400) − 38 000, som gir P ≈ <strong>424,58</strong>. Over denne kursen er opsjonene best; under er aksjene best.</p>` },
      { title: 'Eksempel 3: Binomialmodellen', html: `<p>Aksjekursen er P<sub>0</sub> = 150. Neste periode er den enten 300 (u = 2, sannsynlighet 0,6) eller 75 (d = 0,5, sannsynlighet 0,4). Kjøpsopsjon med innløsningskurs I = 125. Risikofri rente 5 %.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Steg</th><th>Beregning</th><th>Svar</th></tr></thead><tbody>
<tr><th scope="row">K<sub>u</sub></th><td>max(0, 300 − 125)</td><td>175</td></tr>
<tr><th scope="row">K<sub>d</sub></th><td>max(0, 75 − 125)</td><td>0</td></tr>
<tr><th scope="row">m</th><td>(175 − 0) / (300 − 75)</td><td>0,7778</td></tr>
<tr><th scope="row">L</th><td>−(0,7778 · 75 − 0) / 1,05</td><td>−55,56</td></tr>
<tr class="sum"><th scope="row">K<sub>0</sub></th><td>0,7778 · 150 − 55,56</td><td>61,11</td></tr>
<tr class="sum"><th scope="row">S<sub>0</sub></th><td>61,11 + 125 / 1,05 − 150</td><td>30,16</td></tr>
</tbody></table></div>
<p><strong>Kontroll:</strong> lånet vokser til 55,56 · 1,05 = 58,33. Opp: 0,7778 · 300 − 58,33 = 175. Ned: 0,7778 · 75 − 58,33 = 0. Porteføljen gir nøyaktig samme utbetaling som opsjonen, så opsjonen må koste 61,11. Sannsynlighetene 0,6 og 0,4 er ikke brukt.</p>` },
      { title: 'Eksempel 4: Black-Scholes', html: `<p>Aksjekurs 186,15, innløsningskurs 195, risikofri rente 2,75 %, standardavvik 25 %, 51 dager til bortfall (T = 51/365 = 0,1397).</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Størrelse</th><th>Verdi</th></tr></thead><tbody>
<tr><th scope="row">d<sub>1</sub></th><td>−0,4092</td></tr>
<tr><th scope="row">d<sub>2</sub> = d<sub>1</sub> − 0,25 · √0,1397</th><td>−0,5026</td></tr>
<tr><th scope="row">N(d<sub>1</sub>)</th><td>0,3412</td></tr>
<tr><th scope="row">N(d<sub>2</sub>)</th><td>0,3076</td></tr>
<tr class="sum"><th scope="row">Kjøpsopsjon</th><td>3,76</td></tr>
<tr class="sum"><th scope="row">Salgsopsjon</th><td>11,86</td></tr>
</tbody></table></div>
<p>Kjøpsopsjon = 186,15 · 0,3412 − 195 · e<sup>−0,0275 · 0,1397</sup> · 0,3076 = 3,76. Salgsopsjon = 3,76 + 195 · e<sup>−0,0275 · 0,1397</sup> − 186,15 = 11,86. Kjøpsopsjonen er OTM og har bare tidsverdi; salgsopsjonen er ITM med realverdi 8,85.</p>` }
    ],
    pitfalls: [
      `Å blande rett og plikt: kjøperen har rett, utstederen har plikt.`,
      `Å tro at europeisk/amerikansk handler om geografi. Det handler om når opsjonen kan utøves.`,
      `Å glemme premien i gevinstberegningen, eller å glemme å gange med 100 aksjer per kontrakt.`,
      `Å la realverdien bli negativ. Den er max(0, ·).`,
      `Å bruke sannsynlighetene for opp- og nedgang i binomialprisingen. De inngår ikke.`,
      `Fortegn på lånet: L er negativ, og K<sub>0</sub> = m · P<sub>0</sub> + L.`,
      `Å glemme å diskontere innløsningskursen med risikofri rente i salg-kjøp-pariteten.`,
      `Utsteder av salgsopsjon håper at opsjonen ender OTM (kursoppgang) slik at premien blir ren gevinst – ikke ITM.`,
      `Black-Scholes: tiden må være i år, og det brukes kontinuerlig diskontering e<sup>−r · T</sup>.`
    ],
    excel: [
      { fn: 'STØRST(0; kurs − innløsningskurs)', use: `Realverdi/utbetaling for en kjøpsopsjon (aldri negativ).` },
      { fn: 'NORMSFORDELING(z) / NORM.S.FORDELING(z; SANN)', use: `N(d<sub>1</sub>) og N(d<sub>2</sub>) i Black-Scholes.` },
      { fn: 'LN(tall), EKSP(tall), ROT(tall)', use: `Naturlig logaritme, e opphøyd i tall og kvadratrot – byggeklossene i Black-Scholes.` },
      { fn: 'Regnearket «Opsjonsprising.xlsx»', use: `Forelesers modell: legg inn tall i de gule cellene (P<sub>0</sub>, u, d, I, r<sub>f</sub>), så beregnes m, L, K<sub>0</sub> og S<sub>0</sub>.` }
    ],
    examNotes: `<p><strong>Opsjoner har aldri vært gitt på eksamen 2016–2025.</strong> Temaet er likevel forelest, og formlene for binomialmodellen og Black-Scholes sto i formelsamlingen i 2023. Regn det derfor som en mulig joker.</p>
<p>Minimumsberedskap: kunne terminologien (kjøps-/salgsopsjon, europeisk/amerikansk, ITM/OTM, realverdi/tidsverdi), gevinst og nullpunkt for de fire grunnposisjonene, en én-periodes binomialberegning (m, L, K<sub>0</sub>) og salg-kjøp-pariteten. Black-Scholes er ren innsetting hvis formelen er oppgitt.</p>`
  });

  /* ===================================================================== */
  /* QUIZ                                                                  */
  /* ===================================================================== */

  /* ---------- Kapittel 7 ---------- */
  O.quiz.push({ ch: 7, q: `Hva er den effektive renten på et lån?`, options: [`Nominell rente pluss etableringsgebyret i prosent av lånet`, `Nominell rente delt på antall terminer per år`, `Internrenten til lånets kontantstrøm, uttrykt per år`, `Renten banken oppgir før gebyrer`], correct: 2, why: `Effektiv rente er internrenten til kontantstrømmen (netto utbetalt mot alle fremtidige betalinger inkludert gebyrer), omregnet til årsrente. Å legge gebyret til som en prosent tar ikke hensyn til når betalingene skjer.` });
  O.quiz.push({ ch: 7, q: `Et lån har effektiv rente 1 % per måned. Hva er effektiv årsrente?`, options: [`12,68 %`, `12,00 %`, `1,00 %`, `6,15 %`], correct: 0, why: `p = (1 + q)<sup>m</sup> − 1 = 1,01<sup>12</sup> − 1 = 12,68 %. 12,00 % er feilen du gjør ved å gange perioderenten med 12 – det gir den nominelle årsrenten, ikke den effektive. 1,00 % er perioderenten for én måned, og 6,15 % er bare et halvt år (1,01<sup>6</sup> − 1).` });
  O.quiz.push({ ch: 7, q: `Du skal finne effektiv rente på et annuitetslån med RENTE-funksjonen. Lånet er på 500 000, etableringsgebyret er 1 300 og termingebyret 35. Hva legger du inn som nåverdi og betaling?`, options: [`Nåverdi 500 000 og terminbeløp uten gebyr`, `Nåverdi 501 300 og terminbeløp med gebyr`, `Nåverdi 498 700 og terminbeløp uten gebyr`, `Nåverdi 498 700 og terminbeløp med gebyr`], correct: 3, why: `Effektiv rente bygger på det låntaker faktisk mottar og faktisk betaler: netto utbetalt (500 000 − 1 300 = 498 700) og betaling inklusive termingebyr. Selve terminbeløpet beregnes derimot av brutto lån (500 000) med nominell rente.` });
  O.quiz.push({ ch: 7, q: `Hva skjer med rente- og avdragsdelen av terminbeløpet på et annuitetslån over tid?`, options: [`Begge er konstante`, `Rentedelen faller og avdragsdelen øker`, `Rentedelen øker og avdragsdelen faller`, `Avdragsdelen er konstant og rentedelen faller`], correct: 1, why: `Terminbeløpet er konstant. Renten beregnes av en stadig lavere restgjeld og faller, slik at en stadig større del av terminbeløpet går til avdrag. Konstant avdrag og fallende rente beskriver et serielån.` });
  O.quiz.push({ ch: 7, q: `Hvordan finner du restgjelden på et annuitetslån etter k av n terminer?`, options: [`Nåverdien av de n − k gjenstående terminbeløpene med effektiv perioderente`, `Lånebeløpet · (n − k) / n`, `Nåverdien av de n − k gjenstående terminbeløpene (uten gebyr) med nominell perioderente`, `Summen av de gjenstående terminbeløpene inklusive gebyrer`], correct: 2, why: `Restgjeld er alltid lik nåverdien av de gjenværende betalingene av renter og avdrag, diskontert med lånets nominelle perioderente. Lån · (n − k)/n gjelder bare serielån. Gebyrer er ikke gjeld.` });
  O.quiz.push({ ch: 7, q: `Du har et fastrentelån og vil innfri det før bindingstiden er ute. Markedsrenten har falt siden du tok opp lånet. Hva skjer?`, options: [`Du må betale overkurs – mer enn restgjelden`, `Du får underkurs – innfrir til mindre enn restgjelden`, `Du betaler nøyaktig restgjelden`, `Banken må betale deg differansen i rente`], correct: 0, why: `Når markedsrenten faller, er de avtalte betalingene verdt mer for banken enn restgjelden (nåverdien med lavere rente er høyere). Differansen er overkurs. Underkurs oppstår når markedsrenten har økt.` });
  O.quiz.push({ ch: 7, q: `En kassekreditt har rente 2,0 % per kvartal av trukket beløp og provisjon 0,4 % per kvartal av limiten. Gjennomsnittlig utnyttelse er 50 %. Hva er effektiv årsrente?`, options: [`9,95 %`, `11,20 %`, `8,24 %`, `11,68 %`], correct: 3, why: `Kvartalsrente = 2,0 % + 0,4 % / 0,50 = 2,8 %. Årsrente = 1,028<sup>4</sup> − 1 = 11,68 %. 11,20 % er 2,8 % · 4 (ingen rentesrente), og 9,95 % kommer av å legge provisjonen til uten å dele på utnyttelsesgraden (2,4 % per kvartal). 8,24 % glemmer provisjonen (1,02<sup>4</sup> − 1).` });
  O.quiz.push({ ch: 7, q: `Betalingsbetingelsene er «netto per 30 dager, eller 10 dager – 2 % rabatt». Hva er renten per periode ved å la være å bruke rabatten, og hvor lang er perioden?`, options: [`2,00 % for 30 dager`, `2,04 % for 20 dager`, `2,00 % for 20 dager`, `2,04 % for 30 dager`], correct: 1, why: `Du «låner» 98 og betaler tilbake 100: 2/98 = 2,04 %. Kredittiden er tiden mellom rabattfristen og forfall, 30 − 10 = 20 dager. Å bruke 2,00 % eller 30 dager er de to vanligste feilene.` });
  O.quiz.push({ ch: 7, q: `Et annuitetslån på 200 000 med 6 % årlig rente og 4 årlige terminer har terminbeløp 57 718. Hvor stort er avdraget i år 1?`, options: [`50 000`, `57 718`, `45 718`, `12 000`], correct: 2, why: `Rente år 1 = 6 % · 200 000 = 12 000. Avdrag = 57 718 − 12 000 = 45 718. 50 000 ville vært avdraget på et serielån, og 12 000 er rentedelen.` });
  O.quiz.push({ ch: 7, q: `To lån har samme nominelle rente og ingen gebyrer. Det ene er et annuitetslån, det andre et serielån. Hva kan du si om effektiv rente?`, options: [`Den er lik for begge lånene`, `Serielånet har lavest effektiv rente fordi totale renter er lavere`, `Annuitetslånet har lavest effektiv rente fordi terminbeløpet er lavere i starten`, `Det kan ikke avgjøres uten å kjenne løpetiden`], correct: 0, why: `Uten gebyrer påvirker ikke avdragsprofilen effektiv rente – den er lik den nominelle perioderenten omregnet til årsrente. At serielånet gir lavere sum renter i kroner, skyldes bare at gjelden nedbetales raskere.` });
  O.quiz.push({ ch: 7, q: `Du låner 50 000, men banken trekker et etableringsgebyr på 2 000 ved utbetaling. Om ett år betaler du tilbake 53 000 (lån + 6 % rente). Hva er effektiv rente?`, options: [`6,00 %`, `10,00 %`, `10,42 %`, `4,17 %`], correct: 2, why: `Netto utbetalt er 48 000 og du betaler 53 000: 53 000 / 48 000 − 1 = 10,42 %. 10,00 % kommer av å dele samlet kostnad (5 000) på brutto lån i stedet for netto utbetalt. 6,00 % er den nominelle renten uten gebyret, og 4,17 % er bare gebyret (2 000 / 48 000).` });
  O.quiz.push({ ch: 7, q: `Hva skjer med den effektive renten på en kassekreditt når utnyttelsesgraden går ned, alt annet likt?`, options: [`Den går ned, fordi mindre er trukket`, `Den er uendret, fordi rentesatsen er den samme`, `Den går ned, fordi provisjonen beregnes av trukket beløp`, `Den går opp, fordi provisjonen av hele rammen fordeles på et mindre trukket beløp`], correct: 3, why: `Provisjonen beregnes av hele limiten uansett hvor mye som er trukket. Jo mindre som er trukket, desto større blir provisjonen i prosent av det faktiske lånet: q = rente + provisjon / utnyttelsesgrad.` });
  O.quiz.push({ ch: 7, q: `En maskin koster 100 000. Alternativt kan den leases mot 40 000 i forskudd nå og 25 000 i slutten av hvert av de tre neste årene. Hvilken kontantstrøm brukes for å finne leasingens effektive rente?`, options: [`+100 000, deretter −25 000 i tre år`, `+60 000, deretter −25 000 i tre år`, `−40 000, deretter −25 000 i tre år`, `+60 000, deretter −38 333 i tre år`], correct: 1, why: `Effektiv rente finnes fra forskjellen mellom leasing og kjøp. Ved å lease sparer du 100 000 og betaler 40 000 nå – et «lån» på 60 000 – og betaler 25 000 per år. Internrenten er 12,04 %, som sammenlignes med bankens lånerente. +100 000 glemmer forskuddet, −40 000 tar bare med leasingbetalingene uten at du slipper kjøpesummen, og −38 333 fordeler forskuddet på årene i stedet for å trekke det fra i år 0.` });
  /* Factoring (bølge 10) */
  O.quiz.push({ ch: 7, q: `Kredittsalget er 7 200 000 per år og kredittiden 45 dager (360 dager i året). Et factoringselskap forskutterer 80 % av fakturaene straks og betaler marginen når kunden betaler. Hvor mye kapital frigjøres?`, options: [`900 000`, `720 000`, `180 000`, `710 137`], correct: 1, why: `Kundefordringer før = 7 200 000 · 45 / 360 = 900 000. Marginen på 20 % er fortsatt bundet til kunden betaler (180 000), så frigjort kapital er 900 000 − 180 000 = 720 000. 900 000 glemmer marginen, og 710 137 regner med 365 dager selv om oppgaven sier 360.` });
  O.quiz.push({ ch: 7, q: `Hvorfor frigjøres ikke hele kundefordringene når factoringselskapet forskutterer 80 % av fakturaene straks?`, options: [`Factoringselskapet beholder 20 % som gebyr`, `Kundene får kortere kredittid med factoring`, `Marginen på 20 % betales først når kunden betaler, så den er fortsatt bundet`, `20 % av kundene betaler aldri`], correct: 2, why: `Marginen er ikke en kostnad. Bedriften får den når kunden betaler fakturaen, og til da er den bundet akkurat som før. Kostnadene ved factoring er renten på forskuddet og gebyrene. At 20 % av kundene ikke betaler, er tap på fordringer. Det har ingenting med marginen å gjøre. Gebyret er et eget beløp, og kredittiden er den samme.` });
  O.quiz.push({ ch: 7, q: `Factoring frigjør 800 000 av kundefordringer på 1 000 000. Renten på forskuddet er 80 000, gebyret 60 000, og bedriften sparer 20 000 i administrasjon. Hva koster factoring i prosent?`, options: [`12,0 %`, `17,5 %`, `15,0 %`, `10,0 %`], correct: 2, why: `Netto kostnad = 80 000 + 60 000 − 20 000 = 120 000, og den deles på frigjort kapital: 120 000 / 800 000 = 15,0 %. 12,0 % deler på hele kundefordringene, 17,5 % glemmer de sparte administrasjonskostnadene, og 10,0 % tar bare med renten.` });
  O.quiz.push({ ch: 7, q: `Kredittsalget er 3 600 000 per år og kredittiden 30 dager (360 dager i året). Factoringselskapet beholder 20 % margin og forskutterer resten etter 10 dager. Hvor mye kapital frigjøres?`, options: [`240 000`, `140 000`, `220 000`, `160 000`], correct: 3, why: `Før: 3 600 000 · 30 / 360 = 300 000. Bundet etter: marginen 0,2 · 300 000 = 60 000, og resten av fakturaen i de 10 dagene før forskuddet kommer, 0,8 · 3 600 000 · 10 / 360 = 80 000. Frigjort = 300 000 − 140 000 = 160 000. 240 000 glemmer forsinkelsen, 220 000 glemmer marginen, og 140 000 er det som fortsatt er bundet.` });
  O.quiz.push({ ch: 7, q: `Med factoring går kundenes kredittid ned fra 60 til 45 dager. Kredittsalget er 3 600 000 (360 dager i året), marginen er 20 %, forskuddet kommer straks, og renten på forskuddet er 12 %. Hvor store blir rentene?`, options: [`61 200`, `72 000`, `43 200`, `57 600`], correct: 2, why: `Forskuttert beløp = 0,8 · 3 600 000 · 45 / 360 = 360 000, og rentene er 12 % · 360 000 = 43 200. Frigjort kapital er større (600 000 − 90 000 = 510 000), fordi kortere kredittid også frigjør kapital, men den delen forskutterer ikke selskapet. 61 200 regner renter av frigjort kapital, 72 000 av kundefordringene før, og 57 600 bruker den gamle kredittiden.` });
  O.quiz.push({ ch: 7, q: `Factoring koster 13,5 % av frigjort kapital. Alternativet er å øke kassekreditten, som har effektiv rente 11 %. Hva bør bedriften velge, ut fra kostnaden?`, options: [`Kassekreditten, fordi den er billigst`, `Factoring, fordi den frigjør kapital`, `Factoring, fordi kostnaden er under 15 %`, `Det kan ikke avgjøres uten å kjenne kredittiden`], correct: 0, why: `Kostnaden i prosent av frigjort kapital er factoringens effektive rente, og den sammenlignes med renten på alternativ finansiering. 13,5 % > 11 %, så kassekreditten er billigst. At factoring frigjør kapital, er nettopp det som skal finansieres, ikke en gevinst i seg selv.` });

  /* ---------- Kapittel 8 ---------- */
  O.quiz.push({ ch: 8, q: `Hvorfor er avskrivninger relevante i en investeringsanalyse etter skatt?`, options: [`Fordi avskrivninger er en årlig utbetaling`, `Fordi de reduserer skattepliktig inntekt og dermed betalt skatt`, `Fordi de viser anleggsmidlets markedsverdi`, `De er ikke relevante – bare kontantstrømmer teller`], correct: 1, why: `Avskrivninger er ikke en kontantstrøm, men de er fradragsberettiget og reduserer skatten, som er en kontantstrøm. Det er derfor bare skatteeffekten av avskrivningene som tas med.` });
  O.quiz.push({ ch: 8, q: `En investering på 1 000 000 avskrives med 20 % på saldo. Skattesatsen er 22 % og avkastningskravet etter skatt 10 %. Hva er nåverdien av spart skatt på grunn av avskrivningene?`, options: [`220 000`, `44 000`, `666 667`, `146 667`], correct: 3, why: `AM · s · a / (r + a) = 1 000 000 · 0,22 · 0,20 / (0,10 + 0,20) = 146 667. 666 667 er nåverdien av selve avskrivningene (uten s), 44 000 er bare første års skattebesparelse, og 220 000 er udiskontert sum.` });
  O.quiz.push({ ch: 8, q: `Hva skjer med nåverdien av spart skatt på saldoavskrivninger når avkastningskravet øker?`, options: [`Den synker, fordi fremtidige skattebesparelser diskonteres hardere`, `Den øker, fordi r står i formelen`, `Den er uendret – den avhenger bare av saldosats og skattesats`, `Den øker, fordi avskrivningene blir større`], correct: 0, why: `Avkastningskravet står i nevneren: AM · s · a / (r + a). Høyere r gir større nevner og lavere nåverdi. Avskrivningene i kroner endres ikke av kravet.` });
  O.quiz.push({ ch: 8, q: `Et anleggsmiddel til 500 000 avskrives med 20 % på saldo. Hva er restsaldoen etter 3 år?`, options: [`200 000`, `244 000`, `256 000`, `320 000`], correct: 2, why: `RV<sub>3</sub> = 500 000 · 0,8<sup>3</sup> = 256 000. 200 000 er feilen ved å avskrive lineært med 20 % av anskaffelseskost hvert år; 320 000 er saldoen etter to år. 244 000 er summen av avskrivningene i de tre årene, ikke restsaldoen.` });
  O.quiz.push({ ch: 8, q: `Hvordan behandles arbeidskapital i en kalkyle etter skatt?`, options: [`Bindingen gir 22 % skattefradrag`, `Frigjøringen i siste år skattlegges med 22 %`, `Den avskrives på saldo sammen med investeringen`, `Den bindes og frigjøres uten skatteeffekt`], correct: 3, why: `Arbeidskapital er kapitalbinding, ikke kostnad eller inntekt. Den går ut ved oppstart (året før omsetningen) og kommer tilbake i siste år, uten skattevirkning.` });
  O.quiz.push({ ch: 8, q: `Bedriften har brukt 2 mill. kr på produktutvikling de siste to årene og vurderer nå om produktet skal settes i produksjon. Hvordan behandles utviklingskostnadene i lønnsomhetsanalysen?`, options: [`De tas ikke med – de er sunk cost`, `De legges til investeringen i år 0`, `De fordeles over prosjektets levetid`, `De tas med etter skatt, altså 1,56 mill. kr`], correct: 0, why: `Kostnader som allerede er påløpt og ikke kan påvirkes av beslutningen, er sunk cost og irrelevante. Bare fremtidige kontantstrømmer som følger av beslutningen skal med.` });
  O.quiz.push({ ch: 8, q: `Anleggsmidlet selges for SV ved utgangen av år n, og salgssummen nedskrives på saldo. Hvilke ledd kommer i tillegg i nåverdiberegningen?`, options: [`+ SV · (1 − s) / (1 + r)<sup>n</sup>`, `+ SV / (1 + r)<sup>n</sup> + SV · s · a / (r + a) / (1 + r)<sup>n</sup>`, `+ SV / (1 + r)<sup>n</sup> − SV · s · a / (r + a) / (1 + r)<sup>n</sup>`, `+ SV / (1 + r)<sup>n</sup> − SV · s · a / (r + a)`], correct: 2, why: `Salgssummen er en innbetaling i år n. Fordi den reduserer saldoen, tapes fremtidige avskrivninger; nåverdien av den økte skatten (sett fra år n) er SV · s · a / (r + a), som også må diskonteres n år. Det første alternativet er direkte inntektsføring, som er mindre gunstig.` });
  O.quiz.push({ ch: 8, q: `Du har 3 % rente på et bankinnskudd. Hva er renten etter skatt (s = 22 %)?`, options: [`2,34 %`, `3,85 %`, `0,66 %`, `3,00 %`], correct: 0, why: `r = p · (1 − s) = 3 % · 0,78 = 2,34 %. 0,66 % er skatten, ikke renten etter skatt. 3,85 % deler på 0,78 i stedet for å gange, og 3,00 % glemmer skatten.` });
  O.quiz.push({ ch: 8, q: `Et prosjekt har internrente 20,02 % før skatt og 15,83 % etter skatt. Hva er den effektive skattesatsen?`, options: [`22,00 %`, `20,93 %`, `4,19 %`, `26,47 %`], correct: 1, why: `(20,02 − 15,83) / 20,02 = 20,93 %. 4,19 er differansen i prosentpoeng, og 26,47 % kommer av å dele på internrenten etter skatt. 22,00 % er den nominelle skattesatsen, som avviker fra den effektive når skattereglene ikke følger den økonomiske verdiendringen.` });
  O.quiz.push({ ch: 8, q: `Arbeidskapitalbehovet er 20 % av neste års omsetning. Omsetningen er 5 mill. kr i år 1 og 6 mill. kr i år 2. Hvilken kontantstrøm gir arbeidskapitalen i år 0 og år 1?`, options: [`År 0: 0, år 1: −1 000 000`, `År 0: −1 000 000, år 1: −1 200 000`, `År 0: −1 200 000, år 1: 0`, `År 0: −1 000 000, år 1: −200 000`], correct: 3, why: `Arbeidskapitalen bindes året før: i år 0 trengs 20 % av 5 mill. = 1 000 000. I år 1 trengs 20 % av 6 mill. = 1 200 000, så bare <em>økningen</em> på 200 000 er ny kontantstrøm.` });
  O.quiz.push({ ch: 8, q: `Du bruker metoden med samlet skatteledd. Driftskontantstrømmen før skatt og avskrivninger er 400 000 i år 1. Hva føres i beregningsgrunnlaget for år 1 (før arbeidskapital)?`, options: [`400 000`, `400 000 minus årets avskrivning`, `312 000`, `312 000 pluss 22 % av årets avskrivning`], correct: 2, why: `I denne metoden belastes driftskontantstrømmen med full skatt: 400 000 · 0,78 = 312 000. Skatteeffekten av alle avskrivningene ligger samlet i år 0-leddet AM · s · a / (r + a). Legger du også til årets avskrivningseffekt, teller du den to ganger.` });
  O.quiz.push({ ch: 8, q: `Et nytt produkt forventes å redusere salget av et eksisterende produkt med 1 000 enheter per år. Det eksisterende produktet har pris 300, variable enhetskostnader 180 og fordelte faste kostnader 70 per enhet. Hvilket beløp er relevant per år?`, options: [`−300 000 (tapt omsetning)`, `−120 000 (tapt dekningsbidrag)`, `−50 000 (tapt fortjeneste etter faste kostnader)`, `0 – det gjelder et annet produkt`], correct: 1, why: `Kannibalisering er en alternativkostnad lik tapt dekningsbidrag: (300 − 180) · 1 000 = 120 000. De variable kostnadene spares når salget faller, mens de fordelte faste kostnadene ikke endres. −300 000 tar med tapt omsetning, men de variable kostnadene spares. −50 000 trekker også fra de fordelte faste kostnadene, som ikke endres. 0 overser at kannibaliseringen skyldes prosjektet.` });
  O.quiz.push({ ch: 8, q: `Hvorfor kan ikke internrenten etter skatt finnes direkte med IR-funksjonen når du bruker saldoformelen?`, options: [`Fordi IR bare virker på kontantstrømmer før skatt`, `Fordi kontantstrømmen skifter fortegn flere ganger`, `Fordi arbeidskapitalen ikke har skatteeffekt`, `Fordi leddet for NV spart skatt selv avhenger av renten – en sirkelreferanse`], correct: 3, why: `AM · s · a / (r + a) inneholder r. Når renten endres, endres også beløpet i år 0. Det løses med målsøking (sett NNV = 0 ved å endre kravet) eller ved interpolasjon mellom to krav.` });
  O.quiz.push({ ch: 8, q: `En personlig aksjonær mottar 100 000 i utbytte (se bort fra skjermingsfradrag, 2025-regler). Hvor mye skatt betales?`, options: [`37 840`, `22 000`, `15 840`, `660`], correct: 0, why: `Utbyttet oppjusteres med 1,72 og skattlegges med 22 %: 100 000 · 1,72 · 0,22 = 37 840, altså 37,84 %. 22 000 er uten oppjustering. Den lave satsen gjelder selskapsaksjonærer under fritaksmodellen. 15 840 skattlegger bare oppjusteringen (72 000 · 0,22), og 660 er skatten for en selskapsaksjonær (3 % av utbyttet skattlegges med 22 %).` });

  /* ---------- Kapittel 9 ---------- */
  O.quiz.push({ ch: 9, q: `Nominell rente er 5 % og inflasjonen 2 %. Hva er den nøyaktige realrenten før skatt?`, options: [`3,00 %`, `3,06 %`, `2,94 %`, `7,10 %`], correct: 2, why: `(0,05 − 0,02) / 1,02 = 2,94 %. 3,00 % er tilnærmingen nominell − inflasjon, som er litt for høy. 3,06 % kommer av å gange med 1,02 i stedet for å dele, og 7,10 % regner motsatt vei (1,05 · 1,02 − 1 gjør en nominell rente enda mer nominell).` });
  O.quiz.push({ ch: 9, q: `Et lån har effektiv rente 8 % før skatt. Inflasjonen er 3 % og skattesatsen 22 %. Hva er realrenten etter skatt?`, options: [`3,15 %`, `3,78 %`, `4,85 %`, `3,24 %`], correct: 0, why: `Skatt først: 8 % · 0,78 = 6,24 %. Deretter inflasjon: (0,0624 − 0,03) / 1,03 = 3,15 %. 3,78 % er feil rekkefølge (realrente 4,85 % ganget med 0,78), og 3,24 % mangler delingen på 1,03.` });
  O.quiz.push({ ch: 9, q: `Kontantstrømmen er budsjettert i løpende (nominelle) priser. Hvilket avkastningskrav skal brukes?`, options: [`Realavkastningskrav`, `Realavkastningskrav minus inflasjon`, `Det spiller ingen rolle`, `Nominelt avkastningskrav`], correct: 3, why: `Konsistensregelen: nominell kontantstrøm → nominelt krav, faste priser → realkrav. Brukes realkrav på en nominell kontantstrøm, blir nåverdien for høy.` });
  O.quiz.push({ ch: 9, q: `Realavkastningskravet er 5 % og forventet inflasjon 3 %. Hva er det nominelle avkastningskravet?`, options: [`8,00 %`, `8,15 %`, `1,94 %`, `15,00 %`], correct: 1, why: `(1,05 · 1,03) − 1 = 8,15 %. 8,00 % er tilnærmingen uten kryssleddet 0,05 · 0,03, 1,94 % regner motsatt vei og trekker inflasjonen fra ((0,05 − 0,03) / 1,03), og 15,00 % ganger satsene (5 · 3) i stedet for (1 + r)(1 + j).` });
  O.quiz.push({ ch: 9, q: `Hvorfor bør kontantstrømmen budsjetteres i nominelle priser når skatt er med i analysen?`, options: [`Fordi skattesatsen øker med inflasjonen`, `Fordi realkrav etter skatt ikke finnes`, `Fordi saldoavskrivningene er nominelle beløp som ikke følger prisstigningen`, `Fordi arbeidskapitalen er skattepliktig`], correct: 2, why: `Avskrivningene beregnes av historisk kostpris og inflasjonsjusteres ikke. Skatten beregnes derfor av nominelle størrelser, og det enkleste og riktige er å budsjettere nominelt med nominelt krav etter skatt.` });
  O.quiz.push({ ch: 9, q: `En kontantstrøm er 100 000 per år i faste priser. Inflasjonen er 3 % per år. Hva er beløpet i år 5 i nominelle priser?`, options: [`115 927`, `115 000`, `86 261`, `112 551`], correct: 0, why: `100 000 · 1,03<sup>5</sup> = 115 927. 115 000 er uten rentesrente, 86 261 er deflatert i stedet for inflatert, og 112 551 bruker bare fire år.` });
  O.quiz.push({ ch: 9, q: `Bankrenten er 4 %, inflasjonen 3 % og skattesatsen 22 %. Hva er realrenten etter skatt på innskuddet?`, options: [`0,97 %`, `0,76 %`, `1,00 %`, `0,12 %`], correct: 3, why: `Etter skatt: 4 % · 0,78 = 3,12 %. Real: (0,0312 − 0,03) / 1,03 = 0,12 %. 0,97 % er realrenten før skatt, 0,76 % er feil rekkefølge (inflasjon først og så skatt: 0,97 % · 0,78), og 1,00 % er tilnærmingen 4 % − 3 % uten skatt. Fordi skatten beregnes av hele den nominelle renten, blir realavkastningen etter skatt nesten null.` });
  O.quiz.push({ ch: 9, q: `Inntektene i et prosjekt forventes å stige 2 % per år, mens lønnskostnadene stiger 5 % per år. Hvordan bør kalkylen settes opp?`, options: [`I faste priser med realkrav, siden gjennomsnittet utjevnes`, `I løpende priser med nominelt krav`, `I faste priser med nominelt krav`, `I løpende priser med realkrav`], correct: 1, why: `Når postene har ulik prisstigning, er ikke kontantstrømmen konstant i faste priser. Hver post må fremskrives med sin egen vekst (løpende priser), og da skal nominelt krav brukes.` });
  /* Bølge 11: hvert feil alternativ er en bestemt feil som forklaringen navngir. */
  O.quiz.push({ ch: 9, q: `Et prosjekt har nominell internrente 12 %. Inflasjonen er 3 %. Hva er den reelle internrenten?`, options: [`9,00 %`, `9,27 %`, `8,74 %`, `15,36 %`], correct: 2, why: `IR<sub>real</sub> = (0,12 − 0,03) / 1,03 = 8,74 %, samme sammenheng som for renter. 9,00 % er tilnærmingen nominell − inflasjon, 9,27 % ganger med 1,03 i stedet for å dele, og 15,36 % regner motsatt vei (1,12 · 1,03 − 1 gjør en nominell rente enda mer nominell).` });
  O.quiz.push({ ch: 9, q: `Et prosjekt har nominell internrente 9 %, inflasjonen er 3 % og realavkastningskravet 6 %. Er prosjektet lønnsomt?`, options: [`Ja: 9 % er over kravet på 6 %`, `Nei: den reelle internrenten er 5,83 %, under kravet`, `Ja: den reelle internrenten er 6,18 %, over kravet`, `Akkurat: 9 % − 3 % = 6 %, lik kravet`], correct: 1, why: `Internrente og krav må måles på samme måte. Reell internrente = (0,09 − 0,03) / 1,03 = 5,83 %, som er under realkravet på 6 %. Å sammenligne nominell internrente med realkrav er blandingsfeilen, 6,18 % ganger med 1,03 i stedet for å dele, og «akkurat» bruker tilnærmingen nominell − inflasjon, som her gir feil konklusjon.` });
  O.quiz.push({ ch: 9, q: `En kontantstrøm er 200 000 i år 3 i nominelle (løpende) priser. Inflasjonen er 3 % per år. Hva er beløpet i faste priser (prisnivået i år 0)?`, options: [`183 028`, `182 000`, `218 545`, `188 519`], correct: 0, why: `200 000 / 1,03<sup>3</sup> = 183 028. 182 000 trekker fra 3 · 3 % uten rentes rente, 218 545 blåser opp i stedet for å deflatere, og 188 519 deflaterer bare to år.` });
  O.quiz.push({ ch: 9, q: `Kontantstrømmen i en kalkyle uten skatt er budsjettert i løpende priser, men diskonteres med realavkastningskravet. Hva skjer med nåverdien?`, options: [`Den blir riktig, fordi inflasjonen utjevner seg over levetiden`, `Den blir for lav, fordi realkravet er for strengt`, `Den blir for høy bare hvis inflasjonen er høyere enn realkravet`, `Den blir for høy, fordi beløp med inflasjon diskonteres med en rente uten inflasjon`], correct: 3, why: `Nominelle beløp inneholder inflasjonen, men realkravet gjør ikke det. Diskonteringen blir for svak, og nåverdien for høy uansett hvor høy inflasjonen er. Motsatt blanding (faste priser med nominelt krav) gir for lav nåverdi. Konsistensregelen: nominelt med nominelt, faste priser med realkrav.` });
  O.quiz.push({ ch: 9, q: `En maskin til 1 000 000 avskrives med 20 % saldo. Saldoavskrivningen i år 2 er 160 000, skattesatsen 22 % og inflasjonen 3 % per år. Hva er skattefordelen av avskrivningen i år 2 målt i faste priser (prisnivået i år 0)?`, options: [`35 200`, `33 179`, `37 344`, `44 000`], correct: 1, why: `Skattefordelen er nominell: 0,22 · 160 000 = 35 200 i år 2. I faste priser: 35 200 / 1,03<sup>2</sup> = 33 179. 35 200 antar at avskrivningene følger prisstigningen, 37 344 blåser opp i stedet for å deflatere, og 44 000 er skattefordelen i år 1 (0,22 · 200 000). Avskrivningene er nominelle og taper realverdi, og derfor budsjetteres det nominelt når skatt er med.` });
  O.quiz.push({ ch: 9, q: `Lønnskostnadene er 500 000 i dag og ventes å stige 5 % per år. Den generelle inflasjonen er 2 %. Hva blir lønnskostnaden i år 2 i løpende priser?`, options: [`520 200`, `550 000`, `529 844`, `551 250`], correct: 3, why: `Posten fremskrives med sin egen vekst: 500 000 · 1,05<sup>2</sup> = 551 250. 520 200 bruker den generelle inflasjonen i stedet for lønnsveksten, 550 000 er uten rentes rente (2 · 5 %), og 529 844 er beløpet i faste priser (551 250 / 1,02<sup>2</sup>), ikke i løpende priser.` });

  /* ---------- Kapittel 10 ---------- */
  O.quiz.push({ ch: 10, q: `En aksje gir +30 % eller −10 % avkastning, begge med sannsynlighet 0,5. Hva er forventet avkastning og standardavvik?`, options: [`E = 20 %, σ = 20 %`, `E = 10 %, σ = 4 %`, `E = 10 %, σ = 20 %`, `E = 10 %, σ = 28,3 %`], correct: 2, why: `E = 0,5 · 30 % + 0,5 · (−10 %) = 10 %. Var = 0,5 · 0,20<sup>2</sup> + 0,5 · (−0,20)<sup>2</sup> = 0,04, σ = 20 %. 4 % er variansen uten kvadratrot, og 28,3 % kommer av å dele på n − 1.` });
  O.quiz.push({ ch: 10, q: `Kov(A, B) = 0,012, σ<sub>A</sub> = 20 % og σ<sub>B</sub> = 30 %. Hva er korrelasjonskoeffisienten?`, options: [`0,20`, `0,06`, `3,33`, `0,012`], correct: 0, why: `ρ = Kov / (σ<sub>A</sub> · σ<sub>B</sub>) = 0,012 / (0,20 · 0,30) = 0,20. 0,06 er produktet av standardavvikene, 3,33 deler på produktet av variansene (0,04 · 0,09), og 0,012 er kovariansen selv.` });
  O.quiz.push({ ch: 10, q: `Aksje A har σ = 20 % og aksje B har σ = 30 %. Korrelasjonen er 0. Hva er standardavviket til en portefølje med 50 % i hver?`, options: [`25,0 %`, `3,25 %`, `36,1 %`, `18,0 %`], correct: 3, why: `Var = 0,25 · 0,04 + 0,25 · 0,09 = 0,0325, σ = 18,03 %. 25,0 % er veid snitt (gjelder bare ved ρ = +1), 3,25 % er variansen, og 36,1 % utelater andelene helt (√(0,04 + 0,09)).` });
  O.quiz.push({ ch: 10, q: `To ukorrelerte aksjer har σ<sub>A</sub> = 10 % og σ<sub>B</sub> = 20 %. Hvor stor andel skal plasseres i A i minimum-varians-porteføljen?`, options: [`20 %`, `80 %`, `66,7 %`, `50 %`], correct: 1, why: `w<sub>A</sub> = σ<sub>B</sub><sup>2</sup> / (σ<sub>A</sub><sup>2</sup> + σ<sub>B</sub><sup>2</sup>) = 0,04 / 0,05 = 80 %. Aksjen med lavest risiko får størst andel. 20 % er feilen ved å sette egen varians i telleren; 66,7 % bruker standardavvik i stedet for varians. 50 % er lik fordeling, som gir minst risiko bare når aksjene er like risikable.` });
  O.quiz.push({ ch: 10, q: `Hva blir porteføljens standardavvik når korrelasjonen mellom to aksjer er +1?`, options: [`Null`, `Lavere enn begge enkeltaksjenes standardavvik`, `Veid gjennomsnitt av enkeltaksjenes standardavvik`, `Høyere enn begge enkeltaksjenes standardavvik`], correct: 2, why: `Ved perfekt positiv korrelasjon er det ingen diversifikasjonsgevinst – standardavviket er bare veid sum. For alle ρ &lt; 1 blir det lavere. Null er mulig bare ved ρ = −1 og riktige andeler.` });
  O.quiz.push({ ch: 10, q: `Hvilken risiko kan ikke fjernes ved å spre investeringen på mange aksjer?`, options: [`Systematisk risiko (markedsrisiko)`, `Usystematisk risiko`, `Bedriftsspesifikk risiko`, `Diversifiserbar risiko`], correct: 0, why: `Systematisk risiko påvirker alle selskaper (renter, konjunkturer) og kan ikke diversifiseres bort. De tre andre alternativene er ulike navn på den risikoen som <em>kan</em> fjernes.` });
  O.quiz.push({ ch: 10, q: `En aksje ble kjøpt for 150. I dårlige tider blir kursen 135. Hvilken avkastning skal brukes i beregningen av forventet avkastning og standardavvik?`, options: [`−15`, `135`, `−11,1 %`, `−10 %`], correct: 3, why: `Avkastning = (135 − 150) / 150 = −10 %. Varians og forventning skal regnes på avkastninger, ikke på kurser eller kronebeløp. −11,1 % kommer av å dele på sluttkursen. −15 er kronebeløpet, og 135 er kursen.` });
  O.quiz.push({ ch: 10, q: `Aksje A har forventet avkastning 12 % og standardavvik 15 %. Aksje B har forventet avkastning 10 % og standardavvik 18 %. Hva er riktig?`, options: [`B dominerer A`, `A dominerer B`, `Ingen dominerer – valget avhenger av risikoholdning`, `Aksjene er likeverdige`], correct: 1, why: `A har både høyere forventet avkastning og lavere risiko, og dominerer derfor B. Hadde A hatt høyere avkastning <em>og</em> høyere risiko, ville ingen dominert. Merk at B likevel kan ha en plass i en portefølje på grunn av diversifikasjon.` });
  O.quiz.push({ ch: 10, q: `Du plasserer 60 % i en aksjeportefølje med forventet avkastning 12 % og standardavvik 20 %, og 40 % risikofritt til 3 %. Hva er forventet avkastning og standardavvik for den samlede plasseringen?`, options: [`E = 8,4 %, σ = 20 %`, `E = 7,5 %, σ = 10 %`, `E = 8,4 %, σ = 12 %`, `E = 12 %, σ = 12 %`], correct: 2, why: `E = 0,6 · 12 % + 0,4 · 3 % = 8,4 %. Risikofri plassering har standardavvik 0, så σ = 0,6 · 20 % = 12 %.` });
  O.quiz.push({ ch: 10, q: `En portefølje av to aksjer gir nesten ingen reduksjon i standardavvik sammenlignet med veid gjennomsnitt. Hva er den beste forklaringen?`, options: [`Aksjene er sterkt positivt korrelert`, `Aksjene har høyt standardavvik`, `Aksjene har ulik forventet avkastning`, `Porteføljen har for få aksjer til at formelen gjelder`], correct: 0, why: `Diversifikasjonsgevinsten avhenger av korrelasjonen. Er den nær +1, svinger aksjene i takt og lite risiko jevnes ut. Nivået på standardavvikene eller forventet avkastning bestemmer ikke gevinsten.` });
  O.quiz.push({ ch: 10, q: `Hva innebærer det at aksjemarkedet er effisient i svak form?`, options: [`At kursene reflekterer all offentlig og privat informasjon`, `At innsidere ikke kan oppnå meravkastning`, `At kursene alltid er lik bokført verdi`, `At historiske kurser ikke kan brukes til å oppnå meravkastning`], correct: 3, why: `Svak effisiens: kursene reflekterer all informasjon i historiske kursbevegelser, så teknisk analyse gir ikke meravkastning. Halvsterk form legger til all offentlig informasjon, og sterk form også privat informasjon.` });
  O.quiz.push({ ch: 10, q: `Aksje A har forventet avkastning 10 % og aksje B 15 %. Hva er forventet avkastning for en portefølje med 60 % i A og 40 % i B?`, options: [`12,5 %`, `12,0 %`, `13,0 %`, `Kan ikke beregnes uten korrelasjonen`], correct: 1, why: `0,6 · 10 % + 0,4 · 15 % = 12 %. Forventet avkastning er alltid veid gjennomsnitt – korrelasjonen påvirker bare risikoen. 12,5 % er et enkelt snitt uten vekter, og 13,0 % bytter vektene (0,4 · 10 % + 0,6 · 15 %).` });
  O.quiz.push({ ch: 10, q: `Du har fått oppgitt avkastningen i fire tilstander med hver sin sannsynlighet. Hvordan beregnes variansen?`, options: [`Summen av kvadrerte avvik delt på 3 (n − 1)`, `Summen av kvadrerte avvik delt på 4`, `Summen av sannsynlighet · kvadrert avvik fra forventet avkastning`, `Summen av sannsynlighet · avvik fra forventet avkastning`], correct: 2, why: `Med en sannsynlighetsfordeling brukes sannsynlighetene som vekter. Deling på n − 1 hører hjemme ved estimering fra historiske data, og deling på n er bare riktig hvis alle tilstandene er like sannsynlige. Summen av p · avvik er alltid null.` });
  // Bølge 17: fire nye spørsmål i kapittel 10 og fire i kapittel 13. Tallene er regnet med eget skript og bygger på eksemplene i forelesningen.
  O.quiz.push({ ch: 10, q: `Aksje A gir +20 % eller −5 %, og aksje B gir +30 % eller −10 %. Sannsynlighetene er 0,25 for begge opp, 0,30 for A opp og B ned, 0,30 for A ned og B opp, og 0,15 for begge ned. Forventet avkastning er 8,75 % for A og 12 % for B. Hva er kovariansen?`, options: [`−0,00525`, `0,00525`, `−0,212`, `0,0105`], correct: 0, why: `Kov = Σ p · (r<sub>A</sub> − 8,75 %) · (r<sub>B</sub> − 12 %) = 0,25 · 0,1125 · 0,18 + 0,30 · 0,1125 · (−0,22) + 0,30 · (−0,1375) · 0,18 + 0,15 · (−0,1375) · (−0,22) = −0,00525. Aksjene går oftest hver sin vei. 0,00525 ganger avkastningene uten å trekke fra forventningene, −0,212 er korrelasjonskoeffisienten (kovariansen delt på 0,1244 · 0,1990), og 0,0105 er produktet av de forventede avkastningene.` });
  O.quiz.push({ ch: 10, q: `Aksje A har standardavvik 12,44 % og aksje B 19,90 %. Kovariansen er −0,00525 (korrelasjon −0,212). Hva er standardavviket til en portefølje med 50 % i hver?`, options: [`16,17 %`, `10,56 %`, `11,73 %`, `1,11 %`], correct: 1, why: `Var = 0,25 · 0,1244² + 0,25 · 0,1990² + 2 · 0,25 · (−0,00525) = 0,011142, og σ = 10,56 %. Porteføljen er mindre risikabel enn begge aksjene. 16,17 % er veid snitt av standardavvikene, som bare gjelder ved korrelasjon +1. 11,73 % glemmer kovariansleddet (som om korrelasjonen var 0), og 1,11 % er variansen skrevet som prosent.` });
  O.quiz.push({ ch: 10, q: `Hovedindeksen steg fra 100 til 1 425,05 på 29 år. Hva er den gjennomsnittlige årlige (geometriske) avkastningen?`, options: [`9,16 %`, `45,69 %`, `9,59 %`, `9,26 %`], correct: 2, why: `(1 425,05 / 100)<sup>1/29</sup> − 1 = 9,59 %. 9,16 % er den årlige logavkastningen (LN(14,2505) / 29), som er lavere fordi den forutsetter kontinuerlig forrentning. 45,69 % er økningen delt på antall år, uten rentesrente, og 9,26 % bruker 30 år i stedet for 29.` });
  O.quiz.push({ ch: 10, q: `Aksjekursen gikk fra 165 til 168 på én dag. Hva er logavkastningen?`, options: [`1,82 %`, `3,00 %`, `1,79 %`, `1,80 %`], correct: 3, why: `LN(168 / 165) = 1,80 %. 1,82 % er den aritmetiske avkastningen (168 / 165 − 1). Forskjellen er liten når avkastningen er lav. 3,00 % er kursendringen i kroner skrevet som prosent, og 1,79 % deler endringen på sluttkursen (3 / 168).` });

  /* ---------- Kapittel 11 ---------- */
  O.quiz.push({ ch: 11, q: `Risikofri rente er 3 %, forventet markedsavkastning 9 % og aksjens beta 1,5. Hva er egenkapitalkostnaden etter KVM?`, options: [`16,5 %`, `13,5 %`, `12,0 %`, `9,0 %`], correct: 2, why: `r<sub>e</sub> = 3 % + 1,5 · (9 % − 3 %) = 12 %. 16,5 % er feilen ved å gange beta med hele markedsavkastningen (3 % + 1,5 · 9 %), og 13,5 % er 1,5 · 9 %. 9,0 % er bare risikopremien for aksjen (1,5 · 6 %), uten risikofri rente.` });
  O.quiz.push({ ch: 11, q: `Egenkapitalkostnaden er 12 %, lånerenten 5 %, egenkapitalandelen 60 % og skattesatsen 22 %. Hva er WACC?`, options: [`8,76 %`, `9,20 %`, `7,18 %`, `7,20 %`], correct: 0, why: `0,6 · 12 % + 0,4 · 5 % · 0,78 = 7,20 % + 1,56 % = 8,76 %. 9,20 % mangler skattejusteringen av gjelden, og 7,18 % skattejusterer hele uttrykket. 7,20 % er bare egenkapitaldelen (0,6 · 12 %).` });
  O.quiz.push({ ch: 11, q: `Hvilken del av WACC skal skattejusteres med (1 − s)?`, options: [`Både egenkapitalkostnaden og gjeldskostnaden`, `Bare egenkapitalkostnaden`, `Ingen av dem`, `Bare gjeldskostnaden`], correct: 3, why: `Renter på gjeld er fradragsberettiget, så gjeldskostnaden etter skatt er r<sub>g</sub> · (1 − s). Egenkapitalkostnaden fra KVM brukes som den er.` });
  O.quiz.push({ ch: 11, q: `Hvilke verdier skal brukes som vekter i WACC?`, options: [`Bokførte verdier fra balansen`, `Markedsverdier av egenkapital og gjeld`, `Pålydende av aksjekapital og gjeld`, `Bokført egenkapital og markedsverdi av gjeld`], correct: 1, why: `Vektene skal være markedsverdier (børsverdi for egenkapitalen). Markedsverdien av gjeld kan settes lik bokført verdi når selskapet ikke er i betalingsvansker, men egenkapitalens markedsverdi kan avvike mye fra bokført.` });
  O.quiz.push({ ch: 11, q: `Hva måler en aksjes beta?`, options: [`Aksjens totale risiko`, `Aksjens usystematiske risiko`, `Aksjens systematiske risiko – følsomheten for markedets svingninger`, `Aksjens forventede meravkastning ut over markedet`], correct: 2, why: `Beta = Kov(r<sub>j</sub>, r<sub>m</sub>) / Var(r<sub>m</sub>) og måler hvor mye aksjen samvarierer med markedet. Total risiko måles med standardavviket.` });
  O.quiz.push({ ch: 11, q: `Hva er beta for markedsporteføljen og for en risikofri plassering?`, options: [`1 og 0`, `0 og 1`, `1 og 1`, `Lik markedets standardavvik og 0`], correct: 0, why: `Markedets kovarians med seg selv er lik markedets varians, så β = 1. En risikofri plassering svinger ikke og har β = 0.` });
  O.quiz.push({ ch: 11, q: `En portefølje består av 50 % i en aksje med beta 1,4 og 50 % i en aksje med beta 0,6. Hva er porteføljens beta?`, options: [`2,0`, `0,84`, `Avhenger av korrelasjonen mellom aksjene`, `1,0`], correct: 3, why: `Porteføljebeta er veid gjennomsnitt: 0,5 · 1,4 + 0,5 · 0,6 = 1,0. I motsetning til standardavvik trengs ikke korrelasjonen. 2,0 er summen av betaene uten vekter, og 0,84 er produktet av dem.` });
  O.quiz.push({ ch: 11, q: `En aksje har beta 1,2. Markedsporteføljens standardavvik er 20 %. Hva er kovariansen mellom aksjen og markedet?`, options: [`0,240`, `0,048`, `0,040`, `0,0576`], correct: 1, why: `Kov = β · σ<sub>m</sub><sup>2</sup> = 1,2 · 0,04 = 0,048. 0,240 er feilen ved å gange med standardavviket i stedet for variansen. 0,040 er markedets varians uten beta, og 0,0576 kvadrerer hele produktet ((1,2 · 0,20)²).` });
  O.quiz.push({ ch: 11, q: `Hvordan beregner løsningsforslagene (7. utgave) egenkapitalkostnaden i den store eksamensoppgaven?`, options: [`r<sub>e</sub> = r<sub>f</sub> · (1 − s) + β · (r<sub>m</sub> − r<sub>f</sub> · (1 − s))`, `r<sub>e</sub> = r<sub>f</sub> + β · r<sub>m</sub>`, `r<sub>e</sub> = r<sub>f</sub> + β · (r<sub>m</sub> − r<sub>f</sub>)`, `r<sub>e</sub> = (r<sub>f</sub> + β · (r<sub>m</sub> − r<sub>f</sub>)) · (1 − s)`], correct: 2, why: `Forelesningen og nyere løsningsforslag bruker KVM uten skattejustering av risikofri rente. Varianten med r<sub>f</sub> · (1 − s) ble brukt i eldre løsningsforslag (2016/2017).` });
  O.quiz.push({ ch: 11, q: `Hvorfor får investorer ikke betalt for å bære usystematisk risiko?`, options: [`Fordi den kan fjernes nesten kostnadsfritt gjennom diversifikasjon`, `Fordi den alltid er svært liten`, `Fordi den er umulig å måle`, `Fordi den allerede inngår i beta`], correct: 0, why: `Markedet priser bare risiko som investorene ikke kan kvitte seg med. Usystematisk risiko forsvinner i en veldiversifisert portefølje og gir derfor ingen risikopremie – den inngår ikke i beta.` });
  O.quiz.push({ ch: 11, q: `Risikofri rente er 4 %, <em>markedets risikopremie</em> er oppgitt til 5 %, og beta er 1,3. Hva er egenkapitalkostnaden?`, options: [`5,3 %`, `11,7 %`, `9,0 %`, `10,5 %`], correct: 3, why: `Markedets risikopremie er allerede (r<sub>m</sub> − r<sub>f</sub>): 4 % + 1,3 · 5 % = 10,5 %. 5,3 % er fellen der risikofri rente trekkes fra en gang til (4 % + 1,3 · (5 % − 4 %)). 11,7 % ganger beta med summen av risikofri rente og premien (1,3 · 9 %), og 9,0 % glemmer beta (4 % + 5 %).` });
  O.quiz.push({ ch: 11, q: `En portefølje har forventet avkastning 12 % og standardavvik 20 %. Risikofri rente er 3 %. Hva er Sharpe-raten?`, options: [`0,60`, `0,45`, `0,15`, `2,22`], correct: 1, why: `(12 % − 3 %) / 20 % = 0,45. 0,60 mangler fratrekket for risikofri rente. 0,15 setter risikofri rente i telleren (3 % / 20 %), og 2,22 snur brøken (20 % / 9 %).` });
  O.quiz.push({ ch: 11, q: `Et selskap har gjeldsgrad G/E = 1 (like mye gjeld som egenkapital). Egenkapitalkostnaden er 10 % og lånerenten 5 %. Hva er WACC med 22 % skatt?`, options: [`7,50 %`, `5,85 %`, `6,95 %`, `8,05 %`], correct: 2, why: `G/E = 1 gir E/V = G/V = 0,5. WACC = 0,5 · 10 % + 0,5 · 5 % · 0,78 = 6,95 %. 7,50 % mangler skattejusteringen. 5,85 % skattejusterer også egenkapitalkostnaden, og 8,05 % legger skatten til lånerenten (· 1,22) i stedet for å trekke den fra.` });
  O.quiz.push({ ch: 11, q: `Hva brukes WACC til i den store eksamensoppgaven?`, options: [`Som avkastningskrav for å diskontere prosjektets kontantstrøm etter skatt`, `Som lånerente i beregningen av terminbeløp`, `Som avkastningskrav før skatt`, `Som skattesats i saldoformelen`], correct: 0, why: `WACC er totalkapitalens avkastningskrav etter skatt. Den brukes både til å diskontere beregningsgrunnlaget og som r i nevneren i AM · s · a / (r + a).` });

  /* ---------- Kapittel 12 ---------- */
  O.quiz.push({ ch: 12, q: `Et prosjekt gir kredittsalg på 1 800 000 per år, og kundene får 30 dagers kreditt (360 dager i året). Hvor mye kapital bindes i kundefordringer?`, options: [`60 000`, `150 000`, `147 945`, `54 000 000`], correct: 1, why: `1 800 000 · 30 / 360 = 150 000. Beløpet er kapitalbinding som bindes ved oppstart og frigjøres ved prosjektslutt. 60 000 deler omsetningen på antall dager i stedet for å gange, 147 945 bruker 365 dager selv om oppgaven sier 360, og 54 000 000 glemmer å dele på dagene i året.` });
  O.quiz.push({ ch: 12, q: `En strammere kredittpolitikk frigjør 2 240 000 i arbeidskapital. Lånerenten er 15 %. Hvilken årlig gevinst gir kapitalfrigjøringen isolert sett?`, options: [`2 240 000`, `Ingen – frigjort kapital er ikke en resultatpost`, `336 000`, `1 904 000`], correct: 2, why: `Gevinsten er den sparte rentekostnaden: 15 % · 2 240 000 = 336 000 per år. Selve kapitalen er ikke en gevinst. Besparelsen må veies mot f.eks. tapt dekningsbidrag ved lavere salg. 1 904 000 trekker rentene fra kapitalen, som om kapitalen var en gevinst.` });
  O.quiz.push({ ch: 12, q: `Hva brukes Altmans Z-score til?`, options: [`Å vurdere en bedrifts konkursrisiko ut fra regnskapsbaserte forholdstall`, `Å beregne avkastningskravet til egenkapitalen`, `Å finne optimal kredittid til kundene`, `Å måle en aksjes systematiske risiko`], correct: 0, why: `Z-score er en veid sum av fem forholdstall (bl.a. arbeidskapital, driftsresultat og omsetning i forhold til totale eiendeler). Lav verdi indikerer høy konkursrisiko.` });
  /* Nøkkeltall for likviditet (bølge 10). Balanse brukt i spørsmålene: varelager 4 000, kundefordringer 5 000, kontanter 1 000, anleggsmidler 15 000 (sum 25 000); egenkapital 9 000, langsiktig lån 8 000, kassekreditt 5 000, leverandørgjeld 3 000. */
  O.quiz.push({ ch: 12, q: `Balansen (tall i 1 000 kr): varelager 4 000, kundefordringer 5 000, kontanter 1 000, anleggsmidler 15 000. Egenkapital 9 000, langsiktig lån 8 000, kassekreditt 5 000, leverandørgjeld 3 000. Hva er balanselikviditeten?`, options: [`0,75`, `1,25`, `0,80`, `0,63`], correct: 1, why: `Omløpsmidler / kortsiktig gjeld = 10 000 / 8 000 = 1,25. 0,75 er kasselikviditeten (uten varelager), 0,80 er brøken snudd, og 0,63 deler på all gjeld i stedet for bare den kortsiktige.` });
  O.quiz.push({ ch: 12, q: `Balansen (tall i 1 000 kr): varelager 4 000, kundefordringer 5 000, kontanter 1 000. Kortsiktig gjeld er kassekreditt 5 000 og leverandørgjeld 3 000. Hva er kasselikviditeten?`, options: [`1,25`, `0,63`, `0,75`, `0,13`], correct: 2, why: `(Omløpsmidler − varelager) / kortsiktig gjeld = (10 000 − 4 000) / 8 000 = 0,75. 1,25 tar med varelageret, 0,63 tar bare med kundefordringene, og 0,13 bare kontantene.` });
  O.quiz.push({ ch: 12, q: `Hvorfor holdes varelageret utenfor kasselikviditeten?`, options: [`Fordi varelageret er finansiert med langsiktig gjeld`, `Fordi varelageret er den minst likvide delen av omløpsmidlene`, `Fordi varelageret allerede er med i kundefordringene`, `Fordi varelageret er et anleggsmiddel`], correct: 1, why: `Varelageret må først selges, og ofte på kreditt, før det blir penger. Kasselikviditeten måler derfor evnen til å betale den kortsiktige gjelden med det som raskt blir kontanter: kundefordringer og kontanter.` });
  O.quiz.push({ ch: 12, q: `Balansen (tall i 1 000 kr): sum eiendeler 25 000, egenkapital 9 000, langsiktig lån 8 000, kortsiktig gjeld 8 000. Hva er gjeldsandelen?`, options: [`178 %`, `32 %`, `36 %`, `64 %`], correct: 3, why: `Gjeldsandel = total gjeld / totalkapital = (8 000 + 8 000) / 25 000 = 64 %. 178 % er gjeldsgraden (gjeld / egenkapital), 32 % tar bare med den kortsiktige gjelden, og 36 % er egenkapitalandelen.` });
  O.quiz.push({ ch: 12, q: `Salgsinntektene er 43 800, av dette 36 500 på kreditt, og kundefordringene er 5 000 (tall i 1 000 kr, 365 dager i året). Hva er kundekredittiden?`, options: [`42 dager`, `50 dager`, `49 dager`, `7,3 dager`], correct: 1, why: `Kundekredittid = kundefordringer / kredittsalg · 365 = 5 000 / 36 500 · 365 = 50 dager. 42 dager deler på hele omsetningen, også kontantsalget, 49 dager bruker 360 dager selv om oppgaven sier 365, og 7,3 er omløpshastigheten (kredittsalg / kundefordringer), ikke dager.` });
  O.quiz.push({ ch: 12, q: `Kredittsalget er 36 500 og kundekredittiden 50 dager (tall i 1 000 kr, 365 dager i året). Bransjesnittet er 30 dager. Hvor mye kapital frigjøres hvis kredittiden kommer ned på bransjesnittet?`, options: [`3 000`, `2 028`, `5 000`, `2 000`], correct: 3, why: `Frigjort kapital = 36 500 · (50 − 30) / 365 = 2 000 (fra 5 000 til 3 000 i kundefordringer). 3 000 er de nye kundefordringene, ikke endringen, 5 000 er alle kundefordringene, og 2 028 bruker 360 dager.` });
  O.quiz.push({ ch: 12, q: `Omløpsmidlene er 10 000 og den kortsiktige gjelden 8 000 (balanselikviditet 1,25). Frigjort kapital på 2 000 fra kundefordringene brukes til å nedbetale kassekreditten. Hva blir balanselikviditeten?`, options: [`1,25`, `1,33`, `1,67`, `1,00`], correct: 1, why: `Både omløpsmidlene og den kortsiktige gjelden går ned med 2 000: 8 000 / 6 000 = 1,33. 1,67 glemmer at kundefordringene også går ned (10 000 / 6 000). Når samme beløp trekkes fra teller og nevner, øker et forholdstall over 1, mens et under 1 faller. 1,25 er tallet før nedbetalingen, og 1,00 trekker 2 000 fra omløpsmidlene, men glemmer at gjelden også går ned (8 000 / 8 000).` });
  O.quiz.push({ ch: 12, q: `Balanselikviditeten er 0,90. Bedriften bruker kapital frigjort fra kundefordringene til å nedbetale kassekreditten. Hva skjer med balanselikviditeten?`, options: [`Den faller, fordi samme beløp trekkes fra teller og nevner og forholdstallet er under 1`, `Den øker, fordi gjelden blir lavere`, `Den er uendret, fordi bare sammensetningen endres`, `Den øker til over 1`], correct: 0, why: `Teller og nevner går ned med like mye. Er forholdstallet under 1, faller det: for eksempel 9 / 10 = 0,90 blir 8 / 9 = 0,89. Er det over 1, øker det. Lavere gjeld alene sier derfor ikke hvilken vei likviditetsgraden går.` });
  /* Kontantrabatt, kredittpolitikk og Altmans Z (bølge 11). Hvert feil alternativ er en bestemt feil som forklaringen navngir.
     Kontantrabatt: omsetning 36 500, kundefordringer 6 000 (60 dager), 2 % rabatt innen 10 dager, 40 % bruker den, resten 60 dager, 365 dager,
     kassekreditt 10 %, tap fra 1,0 % til 0,6 %, administrasjon +30. Gir nye kundefordringer 4 000, frigjort 2 000, rabatt 292, renter 200, tap 146, netto 24.
     Altman: totale eiendeler 20 000, omløpsmidler 4 000, kortsiktig gjeld 5 000, langsiktig gjeld 9 000, bokført EK 6 000, markedsverdi EK 12 000. */
  O.quiz.push({ ch: 12, q: `Omsetningen er 36 500 og kundefordringene 6 000, med 60 dagers kredittid (tall i 1 000 kr, 365 dager i året). Bedriften gir 2 % kontantrabatt ved betaling innen 10 dager. 40 % av omsetningen ventes betalt innen 10 dager, resten etter 60 dager som før. Hvor mye kapital frigjøres i kundefordringer?`, options: [`4 000`, `2 000`, `2 400`, `1 944`], correct: 1, why: `Nye kundefordringer = 36 500 · 0,4 · 10/365 + 36 500 · 0,6 · 60/365 = 400 + 3 600 = 4 000. Frigjort kapital = 6 000 − 4 000 = 2 000. 4 000 er de nye kundefordringene, ikke endringen, 2 400 glemmer at også rabattkundene har 10 dagers kreditt, og 1 944 bruker 360 dager selv om oppgaven sier 365.` });
  O.quiz.push({ ch: 12, q: `Omsetningen er 36 500 (tall i 1 000 kr). Bedriften gir 2 % kontantrabatt, og 40 % av omsetningen ventes å bruke den. Hva koster rabatten per år?`, options: [`730`, `438`, `292`, `40`], correct: 2, why: `Bare omsetningen som bruker rabatten, gir rabatt: 2 % · 40 % · 36 500 = 292. 730 gir rabatt på hele omsetningen, 438 bruker andelen som ikke tar rabatten (60 %), og 40 er 2 % av den frigjorte kapitalen (2 000), ikke av omsetningen.` });
  O.quiz.push({ ch: 12, q: `En kontantrabatt frigjør 2 000 i kundefordringer, og kassekreditten koster 10 % (tall i 1 000 kr). Rabatten er 2 %, og 40 % av omsetningen på 36 500 bruker den. Tap på krav faller fra 1,0 % til 0,6 % av omsetningen, og administrasjonskostnadene øker med 30. Hva er netto resultatøkning per år?`, options: [`24`, `1 824`, `−414`, `−122`], correct: 0, why: `Sparte renter 10 % · 2 000 = 200, reduserte tap 0,4 % · 36 500 = 146, rabatt 2 % · 40 % · 36 500 = 292, administrasjon 30. Netto = 200 + 146 − 292 − 30 = 24. 1 824 regner hele den frigjorte kapitalen som gevinst i stedet for rentene på den, −414 gir rabatt på hele omsetningen (730), og −122 glemmer de reduserte tapene.` });
  O.quiz.push({ ch: 12, q: `Ved en kontantrabatt sparer bedriften 200 i renter og 146 i tap på krav, og administrasjonen øker med 30 (tall i 1 000 kr). 40 % av omsetningen på 36 500 bruker rabatten. Hvor høy kan rabatten være før tiltaket ikke lønner seg, når like mange bruker den?`, options: [`2,37 %`, `0,87 %`, `2,58 %`, `2,16 %`], correct: 3, why: `Sett netto lik 0: rabatt · 0,4 · 36 500 = 200 + 146 − 30, så rabatten = 316 / 14 600 = 2,16 %. 2,37 % glemmer administrasjonskostnadene, 0,87 % deler på hele omsetningen og ikke bare den som får rabatt, og 2,58 % legger administrasjonskostnadene til i stedet for å trekke dem fra.` });
  O.quiz.push({ ch: 12, q: `Kunden får 2 % kontantrabatt ved betaling innen 10 dager, ellers skal hele beløpet betales etter 60 dager (365 dager i året). Hva er den effektive årsrenten for en kunde som ikke tar rabatten?`, options: [`15,89 %`, `14,90 %`, `15,55 %`, `13,08 %`], correct: 0, why: `Kunden låner 98 % av beløpet i 50 dager og betaler 2 % i rente: periode-rente 0,02 / 0,98 = 2,04 %. Effektiv rente = 1,0204<sup>365/50</sup> − 1 = 15,89 %. 14,90 % er enkel rente uten rentes rente (2,04 % · 365/50), 15,55 % bruker 2 % som periode-rente uten å dele på 0,98, og 13,08 % bruker hele kredittiden på 60 dager i stedet for de 50 ekstra dagene. Samme regnestykke som for leverandørkreditt i kapittel 7.` });
  O.quiz.push({ ch: 12, q: `Hvorfor blir en kontantrabatt dyrest når kundene som tar den, allerede betalte raskt?`, options: [`Fordi de kundene har høyest tap på krav`, `Fordi bedriften betaler rabatten uten at det frigjøres kapital`, `Fordi rabatten da regnes av hele omsetningen`, `Fordi kassekredittrenten stiger når kundefordringene faller`], correct: 1, why: `Gevinsten av rabatten kommer av at kundene betaler tidligere enn før. Betalte de raskt allerede, endres ikke kundefordringene, og rabatten blir et rent priskutt. Det er de som betaler tregt og sjelden tar rabatten, som står for tapene. Rabatten gjelder bare omsetningen som får den, og renten er gitt.` });
  O.quiz.push({ ch: 12, q: `Omsetningen er 20 000 000 og kredittiden 54 dager (360 dager i året). En strammere kredittpolitikk korter kredittiden til 36 dager, men omsetningen ventes å falle 10 %. Hva blir de nye kundefordringene?`, options: [`2 000 000`, `1 775 342`, `1 200 000`, `1 800 000`], correct: 3, why: `Ny omsetning 18 000 000 · 36 / 360 = 1 800 000. 2 000 000 bruker den gamle omsetningen, 1 775 342 bruker 365 dager selv om oppgaven sier 360, og 1 200 000 er reduksjonen fra 3 000 000, ikke de nye kundefordringene.` });
  O.quiz.push({ ch: 12, q: `En strammere kredittpolitikk ventes å redusere omsetningen på 20 000 000 med 10 %. De variable kostnadene er 60 % av omsetningen. Hva er tapt dekningsbidrag per år?`, options: [`800 000`, `2 000 000`, `1 200 000`, `720 000`], correct: 0, why: `Tapt dekningsbidrag = 10 % · 20 000 000 · (1 − 0,60) = 800 000. 2 000 000 er tapt omsetning, som ikke er en kostnad, fordi de variable kostnadene også faller. 1 200 000 er de sparte variable kostnadene, og 720 000 regner fallet av den nye omsetningen (18 000 000) i stedet for den gamle.` });
  O.quiz.push({ ch: 12, q: `En strammere kredittpolitikk reduserer kundefordringene med 900 000 og varelageret med 300 000. Fordi salget faller, går også leverandørgjelden (kreditorene) ned med 200 000. Hvor mye reduseres kapitalbehovet netto?`, options: [`1 400 000`, `1 200 000`, `1 000 000`, `900 000`], correct: 2, why: `900 000 + 300 000 − 200 000 = 1 000 000. Mindre leverandørgjeld betyr mindre gratis finansiering fra leverandørene og øker kapitalbehovet. 1 400 000 regner nedgangen i kreditorene som en reduksjon (fortegnsfeil), 1 200 000 glemmer kreditorene, og 900 000 tar bare med kundefordringene.` });
  O.quiz.push({ ch: 12, q: `Hvilken post skal IKKE føres som kostnad når en strammere kredittpolitikk vurderes?`, options: [`Tapt dekningsbidrag fra kunder som forsvinner`, `Økte administrasjonskostnader til innkreving`, `Tapt omsetning fra kunder som forsvinner`, `Avskrivning på nytt utstyr til kredittoppfølging`], correct: 2, why: `Når salget faller, faller også de variable kostnadene. Det som tapes, er dekningsbidraget, ikke omsetningen. Å føre tapt omsetning som kostnad er den typiske feilen. Administrasjon og avskrivning av nytt utstyr er reelle kostnader ved tiltaket og skal med.` });
  O.quiz.push({ ch: 12, q: `Totale eiendeler er 20 000, omløpsmidlene 4 000 og den kortsiktige gjelden 5 000. Hva er X<sub>1</sub> = arbeidskapital / totale eiendeler i Altmans Z?`, options: [`0,20`, `0,05`, `−0,05`, `−0,20`], correct: 2, why: `Arbeidskapital = 4 000 − 5 000 = −1 000, og X<sub>1</sub> = −1 000 / 20 000 = −0,05. 0,20 bruker omløpsmidlene uten å trekke fra den kortsiktige gjelden, 0,05 dropper fortegnet (arbeidskapitalen kan være negativ, og da trekker den Z ned), og −0,20 deler på den kortsiktige gjelden i stedet for på eiendelene.` });
  O.quiz.push({ ch: 12, q: `Totale eiendeler er 20 000. Bokført egenkapital er 6 000 og markedsverdien av egenkapitalen 12 000. Kortsiktig gjeld er 5 000 og langsiktig gjeld 9 000. Hva er X<sub>4</sub> i Altmans Z?`, options: [`0,43`, `0,86`, `2,40`, `0,60`], correct: 1, why: `X<sub>4</sub> = markedsverdi egenkapital / total gjeld = 12 000 / 14 000 = 0,86. 0,43 bruker bokført egenkapital, 2,40 deler bare på den kortsiktige gjelden, og 0,60 deler på totale eiendeler i stedet for gjelden.` });
  O.quiz.push({ ch: 12, q: `Forholdstallene er X<sub>1</sub> = −0,05, X<sub>2</sub> = 0,10, X<sub>3</sub> = 0,08, X<sub>4</sub> = 0,86 og X<sub>5</sub> = 1,50. Z = 1,2 · X<sub>1</sub> + 1,4 · X<sub>2</sub> + 3,3 · X<sub>3</sub> + 0,6 · X<sub>4</sub> + 0,999 · X<sub>5</sub>, og grensene er 1,81 og 2,99. Hva er Z, og hvilken sone?`, options: [`2,48, gråsone`, `2,36, lav konkursrisiko`, `2,10, gråsone`, `2,36, gråsone`], correct: 3, why: `Z = −0,06 + 0,14 + 0,264 + 0,516 + 1,4985 = 2,36, mellom 1,81 og 2,99, altså gråsone. 2,48 regner den negative arbeidskapitalen som positiv, «lav konkursrisiko» krever over 2,99 (ikke over 1,81), og 2,10 bytter vektene på X<sub>4</sub> og X<sub>5</sub>.` });
  O.quiz.push({ ch: 12, q: `Z = 2,3585 og totale eiendeler er 20 000. Driftsresultatet inngår i X<sub>3</sub> = driftsresultat / totale eiendeler med vekt 3,3. Hvor mye må driftsresultatet øke for at Z skal nå 2,99 når alt annet er likt?`, options: [`12 630`, `3 827`, `3 324`, `41 679`], correct: 1, why: `Økningen i Z er 2,99 − 2,3585 = 0,6315 = 3,3 · økning / 20 000, så økningen = 0,6315 / 3,3 · 20 000 = 3 827. 12 630 glemmer vekten 3,3, 3 324 regner avstanden ned til 1,81 i stedet for opp til 2,99, og 41 679 ganger med vekten i stedet for å dele.` });
  O.quiz.push({ ch: 12, q: `Hvilken egenkapital brukes i X<sub>2</sub> i Altmans Z?`, options: [`Opptjent egenkapital (tilbakeholdt overskudd)`, `All bokført egenkapital, også innskutt kapital`, `Markedsverdien av egenkapitalen`, `Egenkapitalen pluss utbytte som er betalt ut i år`], correct: 0, why: `X<sub>2</sub> = opptjent egenkapital / totale eiendeler, og måler hvor mye bedriften har bygget opp av egne overskudd. Innskutt kapital skal ikke med, markedsverdien er X<sub>4</sub> (delt på total gjeld), og utbytte som er betalt ut, er ikke lenger opptjent egenkapital i bedriften.` });

  /* ---------- Kapittel 13 ---------- */
  O.quiz.push({ ch: 13, q: `Hva gir en kjøpsopsjon eieren?`, options: [`Plikt til å kjøpe aksjen til innløsningskursen`, `Rett til å selge aksjen til innløsningskursen`, `Rett, men ikke plikt, til å kjøpe aksjen til innløsningskursen`, `Rett til utbytte fra aksjen i opsjonens løpetid`], correct: 2, why: `Kjøperen av en kjøpsopsjon har en rett, ikke en plikt. Det er utstederen som har plikt til å levere. Retten til å selge er en salgsopsjon.` });
  O.quiz.push({ ch: 13, q: `Hva er forskjellen på en amerikansk og en europeisk opsjon?`, options: [`Amerikanske kan utøves når som helst innen bortfall, europeiske bare på bortfallsdatoen`, `Amerikanske handles i USA, europeiske i Europa`, `Amerikanske gjelder aksjer, europeiske gjelder valuta`, `Europeiske kan utøves når som helst, amerikanske bare på bortfallsdatoen`], correct: 0, why: `Betegnelsene har ingenting med geografi å gjøre. På Oslo Børs er aksjeopsjoner amerikanske og indeksopsjoner europeiske.` });
  O.quiz.push({ ch: 13, q: `Du kjøper en kontrakt (100 aksjer) kjøpsopsjoner med innløsningskurs 400 og premie 22 per aksje. Aksjekursen ved bortfall er 450. Hva er gevinsten?`, options: [`5 000`, `7 200`, `2 200`, `2 800`], correct: 3, why: `(450 − 400 − 22) · 100 = 2 800. 5 000 er utøvelsesverdien før premien er trukket fra. 7 200 legger premien til i stedet for å trekke den fra, og 2 200 er bare premien.` });
  O.quiz.push({ ch: 13, q: `Aksjekursen er 380. En kjøpsopsjon med innløsningskurs 350 omsettes for 45. Hva er realverdi og tidsverdi?`, options: [`Realverdi 45, tidsverdi 0`, `Realverdi 30, tidsverdi 15`, `Realverdi 15, tidsverdi 30`, `Realverdi 0, tidsverdi 45`], correct: 1, why: `Realverdi = 380 − 350 = 30. Tidsverdi = markedspris − realverdi = 45 − 30 = 15.` });
  O.quiz.push({ ch: 13, q: `En aksje koster 100 i dag og blir enten 120 eller 80 om ett år. Risikofri rente er 5 %. Hva er verdien av en kjøpsopsjon med innløsningskurs 100 i binomialmodellen?`, options: [`10,00`, `9,52`, `11,90`, `20,00`], correct: 2, why: `K<sub>u</sub> = 20, K<sub>d</sub> = 0. m = 20 / 40 = 0,5. L = −0,5 · 80 / 1,05 = −38,10. K<sub>0</sub> = 0,5 · 100 − 38,10 = 11,90. 10,00 er feilen ved å glemme å diskontere lånet (0,5 · 100 − 40). 9,52 bruker sannsynligheten 50 % for oppgang og diskonterer forventet utbetaling (0,5 · 20 / 1,05), og 20,00 er verdien i oppgang, før diskontering og uten nedgangen.` });
  O.quiz.push({ ch: 13, q: `Aksjen i forrige spørsmål (kurs 100, innløsningskurs 100, risikofri rente 5 %) har en kjøpsopsjon verdt 11,90. Hva er verdien av en tilsvarende salgsopsjon?`, options: [`7,14`, `11,90`, `16,66`, `4,76`], correct: 0, why: `Salg-kjøp-paritet: S<sub>0</sub> = K<sub>0</sub> + I / (1 + r<sub>f</sub>) − P<sub>0</sub> = 11,90 + 95,24 − 100 = 7,14. 11,90 får du hvis du glemmer å diskontere innløsningskursen. 16,66 legger rentefordelen (4,76) til i stedet for å trekke den fra, og 4,76 er bare rentefordelen (100 − 95,24).` });
  O.quiz.push({ ch: 13, q: `Hvilken rolle spiller sannsynligheten for kursoppgang når en opsjon prises i binomialmodellen?`, options: [`Den brukes til å beregne forventet utbetaling, som så diskonteres`, `Den bestemmer andelen m`, `Den bestemmer størrelsen på lånet L`, `Den inngår ikke i prisingen`], correct: 3, why: `Prisen bestemmes av opsjonsekvivalenten: en portefølje av aksjer og lån som gir samme utbetaling i begge tilstander. Da må prisen være lik uansett hvor sannsynlig hver tilstand er.` });
  O.quiz.push({ ch: 13, q: `Hvilken grunnposisjon har i prinsippet ubegrenset tapsmulighet?`, options: [`Kjøp av kjøpsopsjon`, `Utstedelse (salg) av kjøpsopsjon`, `Kjøp av salgsopsjon`, `Utstedelse (salg) av salgsopsjon`], correct: 1, why: `Utstederen av en kjøpsopsjon må levere aksjen til innløsningskursen uansett hvor høyt kursen stiger. Kjøpere kan maksimalt tape premien, og utstederen av en salgsopsjon kan maksimalt tape innløsningskursen minus premien.` });
  O.quiz.push({ ch: 13, q: `Hva skjer med verdien av opsjoner når volatiliteten (standardavviket) til aksjen øker?`, options: [`Kjøpsopsjoner øker i verdi, salgsopsjoner faller`, `Begge faller i verdi`, `Både kjøps- og salgsopsjoner øker i verdi`, `Verdien påvirkes ikke`], correct: 2, why: `Opsjonseieren har rett uten plikt: store kursutslag i gunstig retning gir stor gevinst, mens tapet er begrenset til premien. Høyere volatilitet øker derfor verdien av begge typer.` });
  O.quiz.push({ ch: 13, q: `Du kjøper en kjøpsopsjon med innløsningskurs 400 og betaler 22 i premie. Ved hvilken aksjekurs på bortfallsdagen går du i null?`, options: [`422`, `400`, `378`, `22`], correct: 0, why: `Nullpunkt for kjøper av kjøpsopsjon = innløsningskurs + premie = 422. 378 ville vært nullpunktet for en salgsopsjon med samme innløsningskurs og premie. 400 glemmer premien, og 22 er premien, ikke en aksjekurs.` });
  O.quiz.push({ ch: 13, q: `Hva håper utstederen av en salgsopsjon på?`, options: [`At kursen faller kraftig slik at opsjonen ender ITM`, `At volatiliteten øker`, `At opsjonen utøves før bortfall`, `At kursen holder seg over innløsningskursen slik at opsjonen ender OTM`], correct: 3, why: `Ender salgsopsjonen OTM (aksjekurs over innløsningskurs), blir den ikke utøvd, og premien er ren gevinst for utstederen. Ender den ITM, må utstederen kjøpe aksjen til overpris.` });
  O.quiz.push({ ch: 13, q: `Aksjekursen er 380. Hvilken opsjon er «in the money»?`, options: [`Kjøpsopsjon med innløsningskurs 400`, `Salgsopsjon med innløsningskurs 400`, `Salgsopsjon med innløsningskurs 350`, `Kjøpsopsjon med innløsningskurs 380`], correct: 1, why: `En salgsopsjon er ITM når aksjekursen er lavere enn innløsningskursen (380 &lt; 400) – retten til å selge for 400 er verdt 20. Kjøpsopsjonen med innløsning 400 er OTM, og den med 380 er ATM.` });
  O.quiz.push({ ch: 13, q: `I binomialeksemplet er P<sub>0</sub> = 150, kursen blir 300 eller 75, og innløsningskursen er 125. Hva er andelen m i opsjonsekvivalenten?`, options: [`0,5000`, `0,5833`, `0,7778`, `1,0000`], correct: 2, why: `m = (K<sub>u</sub> − K<sub>d</sub>) / (uP<sub>0</sub> − dP<sub>0</sub>) = (175 − 0) / (300 − 75) = 0,7778. 0,5833 er feilen ved å dele på 300 alene. 0,5000 er nedgangsfaktoren d (75 / 150), og 1,0000 sikrer med én hel aksje per opsjon.` });
  O.quiz.push({ ch: 13, q: `Hva er tidsverdien av en opsjon på bortfallsdagen?`, options: [`Null`, `Lik premien som ble betalt`, `Lik realverdien`, `Størst mulig`], correct: 0, why: `Tidsverdien reflekterer muligheten for videre gevinst før bortfall. På bortfallsdagen er det ingen tid igjen, og opsjonen er bare verdt realverdien.` });
  O.quiz.push({ ch: 13, q: `Aksjekursen er 150 og blir enten 300 eller 75. Innløsningskursen er 125, risikofri rente 5 %, og sannsynligheten for oppgang er 0,6. Opsjonsekvivalenten er m = 0,7778 aksjer og et lån. Hva er kjøpsopsjonen verdt?`, options: [`61,11`, `116,67`, `58,33`, `100,00`], correct: 0, why: `Lånet er L = −0,7778 · 75 / 1,05 = −55,56, og K<sub>0</sub> = 0,7778 · 150 − 55,56 = 61,11. 116,67 er bare aksjedelen, uten lånet. 58,33 trekker fra lånet uten å diskontere det (0,7778 · 75). 100,00 bruker sannsynligheten 0,6 og diskonterer forventet utbetaling (0,6 · 175 / 1,05), men sannsynligheten skal ikke brukes i binomialprisingen.` });
  O.quiz.push({ ch: 13, q: `Du har 38 000 å spekulere for. Du kan kjøpe 100 aksjer til 380, eller 1 727,27 kjøpsopsjoner med innløsningskurs 400 til 22 per stykk. Ved hvilken aksjekurs på bortfallsdagen gir de to strategiene samme gevinst?`, options: [`422,00`, `424,58`, `380,00`, `400,00`], correct: 1, why: `100 · (P − 380) = 1 727,27 · (P − 400) − 38 000 gir P = 424,58. Over denne kursen gir opsjonene mest, under gir aksjene mest. Det er giringen. 422,00 er nullpunktet for opsjonene alene, 380,00 er dagens aksjekurs, som er nullpunktet for aksjene, og 400,00 er innløsningskursen.` });
  O.quiz.push({ ch: 13, q: `Du kjøper en kontrakt (100 aksjer) salgsopsjoner med innløsningskurs 400 og premie 44 per aksje. Aksjekursen ved bortfall er 300. Hva er gevinsten?`, options: [`10 000`, `−4 400`, `5 600`, `14 400`], correct: 2, why: `(400 − 300 − 44) · 100 = 5 600. 10 000 er utøvelsesverdien før premien er trukket fra, −4 400 behandler opsjonen som en kjøpsopsjon, som er verdiløs når kursen faller, og 14 400 legger premien til i stedet for å trekke den fra.` });
  O.quiz.push({ ch: 13, q: `Du kjøper en salgsopsjon med innløsningskurs 400 og betaler 44 i premie. Ved hvilken aksjekurs på bortfallsdagen går du i null?`, options: [`444`, `400`, `336`, `356`], correct: 3, why: `Nullpunkt for kjøper av salgsopsjon = innløsningskurs − premie = 400 − 44 = 356. 444 legger premien til, som for en kjøpsopsjon, 400 glemmer premien, og 336 trekker premien fra dagens aksjekurs (380) i stedet for fra innløsningskursen.` });
})(typeof globalThis !== 'undefined' ? globalThis : this);
