/* Tidligere eksamener 2021–2025. */
(function (root) {
  'use strict';
  const O = (root.OKAD = root.OKAD || {});
  O.exams = O.exams || [];

  /* ==================== Desember 2021 ==================== */
  O.exams.push({
    id: '2021',
    year: 2021,
    title: 'Desember 2021',
    note: `<p>Fire oppgaver (25 % + 20 % + 20 % + 35 %). Vekt per deloppgave er ikke oppgitt. Forsiden (varighet og tillatte hjelpemidler) var ikke med i kilden. Løsningsforslaget (LF) er et regneark uten forklarende tekst, så drøftingsdelene («hvilket prosjekt velger du», «begrunn») har ikke noe skrevet svar i LF – der er kommentaren merket som egen. LF bruker KVM <b>uten</b> skattejustering.</p>`,
    tasks: [
      {
        nr: 1, weight: 25,
        title: 'Prosjekt A eller B: NV, internrente, payback',
        topics: ['toprosjekt', 'payback', 'rente'],
        text: `<p>En bedrift vurderer om man enten skal gjennomføre prosjekt A eller B. Det foreligger følgende opplysninger om prosjektenes levetid og investeringsbehov:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Prosjekt</th><th>A</th><th>B</th></tr></thead><tbody><tr><th scope="row">Antatt levetid (år)</th><td>6</td><td>6</td></tr><tr><th scope="row">Anleggsmidler</th><td>1 250 000</td><td>1 600 000</td></tr><tr><th scope="row">Restverdi</th><td>0</td><td>130 000</td></tr><tr><th scope="row">Arbeidskapitalbehov</th><td>80 000</td><td>70 000</td></tr></tbody></table></div>
<p>Kontantstrømmene for hvert prosjekt (vedlikeholdskostnader er ikke inkludert) er budsjettert til:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>A</th><th>B</th></tr></thead><tbody><tr><th scope="row">1</th><td>375 000</td><td>530 000</td></tr><tr><th scope="row">2</th><td>550 000</td><td>570 000</td></tr><tr><th scope="row">3</th><td>600 000</td><td>600 000</td></tr><tr><th scope="row">4</th><td>580 000</td><td>620 000</td></tr><tr><th scope="row">5</th><td>540 000</td><td>600 000</td></tr><tr><th scope="row">6</th><td>400 000</td><td>450 000</td></tr></tbody></table></div>
<p>Vedlikeholdskostnadene for prosjekt A er beregnet til 72 000 årlig. For prosjekt B er vedlikeholdskostnadene anslått til 50 000 i år 1 og deretter vil de øke med 5000 årlig over levetiden. Avkastningskravet er 10 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn prosjektenes tilbakebetalingstid (Pay back), nåverdi og internrente. Hvilket prosjekt vil du eventuelt velge?`,
            topics: ['toprosjekt', 'payback'],
            answer: `A: NV = <b>605 057</b>, internrente = <b>23,66 %</b>, payback = <b>3,04 år</b>. B: NV = <b>630 427</b>, internrente = <b>21,71 %</b>, payback = <b>3,24 år</b>. Velg <b>B</b> (høyest nåverdi) – valget er egen kommentar, LF har ingen tekst.`,
            method: `<p>Sett opp kontantstrømmen linje for linje: anleggsmidler, drift, vedlikehold og arbeidskapital. Arbeidskapitalen bindes i år 0 og frigjøres i år 6. Restverdien til B (130 000) kommer inn i år 6.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Prosjekt A</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody><tr><th scope="row">Anleggsmidler</th><td>−1 250 000</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Drift</th><td></td><td>375 000</td><td>550 000</td><td>600 000</td><td>580 000</td><td>540 000</td><td>400 000</td></tr><tr><th scope="row">Vedlikehold</th><td></td><td>−72 000</td><td>−72 000</td><td>−72 000</td><td>−72 000</td><td>−72 000</td><td>−72 000</td></tr><tr><th scope="row">Arbeidskapital</th><td>−80 000</td><td></td><td></td><td></td><td></td><td></td><td>80 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>−1 330 000</td><td>303 000</td><td>478 000</td><td>528 000</td><td>508 000</td><td>468 000</td><td>408 000</td></tr></tbody></table></div>
<div class="tablewrap"><table class="data"><thead><tr><th>Prosjekt B</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody><tr><th scope="row">Anleggsmidler</th><td>−1 600 000</td><td></td><td></td><td></td><td></td><td></td><td>130 000</td></tr><tr><th scope="row">Drift</th><td></td><td>530 000</td><td>570 000</td><td>600 000</td><td>620 000</td><td>600 000</td><td>450 000</td></tr><tr><th scope="row">Vedlikehold</th><td></td><td>−50 000</td><td>−55 000</td><td>−60 000</td><td>−65 000</td><td>−70 000</td><td>−75 000</td></tr><tr><th scope="row">Arbeidskapital</th><td>−70 000</td><td></td><td></td><td></td><td></td><td></td><td>70 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>−1 670 000</td><td>480 000</td><td>515 000</td><td>540 000</td><td>555 000</td><td>530 000</td><td>575 000</td></tr></tbody></table></div>
<p><b>Nåverdi og internrente:</b> diskonter kontantstrømmene med 10 % (NNV-funksjon), og finn internrenten med IR-funksjonen.</p>
<ul><li>A: NV = <b>605 057</b>, internrente = <b>23,66 %</b></li><li>B: NV = <b>630 427</b>, internrente = <b>21,71 %</b></li></ul>
<p><b>Payback:</b> akkumuler kontantstrømmen til investeringen er dekket, og interpoler i det siste året.</p>
<ul><li>A: akkumulert 1 309 000 etter 3 år, mangler 21 000. 21 000/508 000 = 0,041 av år 4 → <b>3,04 år</b>.</li><li>B: akkumulert 1 535 000 etter 3 år, mangler 135 000. 135 000/555 000 = 0,243 av år 4 → <b>3,24 år</b>.</li></ul>
<p class="muted small">Valg av prosjekt (egen kommentar – LF har ingen tekst): Prosjektene er gjensidig utelukkende → velg høyest nåverdi = B, selv om A har høyere internrente og kortere payback (klassisk rangeringskonflikt).</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Hvilket avkastningskrav ville gitt identisk nåverdi for prosjektene?`,
            topics: ['toprosjekt'],
            answer: `Internrenten på differansekontantstrømmen B − A (Fisher-skjæringspunktet) = <b>12,62 %</b>.`,
            method: `<p>Nåverdiene er like ved det avkastningskravet som gir nåverdi 0 for differansen mellom prosjektene. Sett opp differansekontantstrømmen B − A og finn internrenten på den.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody><tr class="sum"><th scope="row">B − A</th><td>−340 000</td><td>177 000</td><td>37 000</td><td>12 000</td><td>47 000</td><td>62 000</td><td>167 000</td></tr></tbody></table></div>
<p>Internrente på differansen = <b>12,62 %</b>. Ved lavere krav enn dette har B høyest nåverdi, ved høyere krav har A høyest nåverdi.</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Anta nå at kontantstrømmen fra prosjekt A (eksklusiv kostnader til vedlikehold) er en annuitet (like store beløp hvert år). Hvor høyt må det årlige beløpet være for at du skal få samme nåverdi som du fant i a)?`,
            topics: ['rente'],
            answer: `<b>505 935</b> per år.`,
            method: `<p>Finn først nåverdien av driftskontantstrømmen til A (375 000 … 400 000) diskontert med 10 %: <b>2 203 478</b>.</p>
<p>Gjør deretter nåverdien om til en lik årlig annuitet over 6 år ved 10 % (annuitetsfaktor 4,3553):</p>
<div class="formula">Årlig beløp = <span class="frac"><span>2 203 478</span><span>4,3553</span></span> = 505 935</div>
<p>En annuitet på 505 935 i 6 år har samme nåverdi som den opprinnelige driftskontantstrømmen, og gir derfor samme nåverdi for prosjektet som i a).</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 2, weight: 20,
        title: 'Lån: annuitet, effektiv rente, kurs, serielån',
        topics: ['laan'],
        text: `<p>Du vurderer å ta opp et lån på 1 200 000. Etableringsgebyr er 1 000 og termingebyr 100 ved hver betaling. Lånets løpetid er 5 år og nominell årsrente er 3,5 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Anta at lånet tas opp som et annuitetslån med månedlige betalinger. Finn hva du skal betale i renter og avdrag på lånet hver måned, og splitt månedsbeløpet opp i renter og avdrag for de første 3 månedene.`,
            topics: ['laan'],
            answer: `Terminbeløp (renter + avdrag) = <b>21 830,09</b> per måned. Måned 1: rente 3 500,00 / avdrag 18 330,09. Måned 2: 3 446,54 / 18 383,56. Måned 3: 3 392,92 / 18 437,18.`,
            method: `<p>Månedsrente = 3,5 %/12 = 0,2917 %, og 5 år gir 60 terminer. Terminbeløpet finnes med annuitetsformelen (AVDRAG-funksjonen i Excel):</p>
<div class="formula">Terminbeløp = Lån · <span class="frac"><span>i · (1 + i)<sup>n</sup></span><span>(1 + i)<sup>n</sup> − 1</span></span> = <b>21 830,09</b></div>
<p>Renten hver måned er månedsrenten ganger restgjelden ved inngangen til måneden; resten av terminbeløpet er avdrag.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Måned</th><th>Rente</th><th>Avdrag</th></tr></thead><tbody><tr><th scope="row">1</th><td>3 500,00</td><td>18 330,09</td></tr><tr><th scope="row">2</th><td>3 446,54</td><td>18 383,56</td></tr><tr><th scope="row">3</th><td>3 392,92</td><td>18 437,18</td></tr></tbody></table></div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Hva blir lånets effektive årsrente? Angi svaret med 2 desimaler.`,
            topics: ['laan'],
            answer: `Effektiv årsrente = <b>3,78 %</b>.`,
            method: `<p>Effektiv rente er internrenten på lånets faktiske kontantstrøm inkludert gebyrer.</p>
<ul><li>Netto utbetalt: 1 199 000 (lån − etableringsgebyr).</li><li>Månedlig betaling inkl. termingebyr: 21 930,09 i 60 måneder.</li></ul>
<p>Effektiv månedsrente (internrente) = 0,3100 %. Omregnet til årsrente:</p>
<div class="formula">(1,0031)<sup>12</sup> − 1 = <b>3,78 %</b></div>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Hva er restgjelden etter at du har betalt renter og avdrag i 3 år?`,
            topics: ['laan'],
            answer: `Restgjeld = <b>505 294</b>.`,
            method: `<p>Etter 3 år gjenstår 24 terminer. Restgjelden er nåverdien av de gjenværende terminbeløpene (uten gebyr), diskontert med lånets månedsrente:</p>
<div class="formula">Restgjeld = NV av 24 × 21 830,09 til 0,2917 % = <b>505 294</b></div>`,
            src: 'LF'
          },
          {
            label: 'd',
            q: `Anta nå at lånet ble tatt opp som et fastrentelån med årsrente 3,5 %. Etter 3 år, øker årsrenten på tilsvarende lån til 4 %. Anta at du ønsker å innfri lånet. Blir det overkurs eller underkurs, og hvor mye?`,
            topics: ['laan'],
            answer: `<b>Underkurs = 2 586</b>.`,
            method: `<p>Markedsverdien av lånet er nåverdien av de gjenværende terminbeløpene diskontert med den <em>nye</em> markedsrenten.</p>
<ul><li>Ny månedsrente: 4 %/12 = 0,333 %.</li><li>NV av de 24 gjenværende terminbeløpene til ny rente = 502 709.</li><li>Restgjeld (fra c) = 505 294.</li></ul>
<div class="formula">Underkurs = 505 294 − 502 709 = <b>2 586</b></div>
<p class="muted small">Avrundingsforskjell i LF (differansen av de avrundede tallene er 2 585).</p>
<p>Renten har steget, så lånet er verdt mindre enn restgjelden: det blir underkurs, som er en fordel for låntaker ved innfrielse.</p>`,
            src: 'LF'
          },
          {
            label: 'e',
            q: `Anta nå at lånet ble tatt opp som et serielån med årlige betalinger. Nominell årsrente er fremdeles 3,5 %, etableringsgebyr 1 000 og termingebyr 100. Løpetiden er 5 år, men anta at de første 2 årene er avdragsfrie. Hva blir effektiv årsrente på dette lånet? Angi svaret med to desimaler.`,
            topics: ['laan'],
            answer: `Effektiv årsrente = <b>3,53 %</b>.`,
            method: `<p>Serielån med årlige terminer og 2 avdragsfrie år gir deretter 3 like avdrag à 400 000. Renten er 3,5 % av restgjelden ved inngangen til året.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Lån</th><td>1 200 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Renter</th><td></td><td>−42 000</td><td>−42 000</td><td>−42 000</td><td>−28 000</td><td>−14 000</td></tr><tr><th scope="row">Avdrag</th><td></td><td></td><td></td><td>−400 000</td><td>−400 000</td><td>−400 000</td></tr><tr><th scope="row">Gebyrer</th><td>−1 000</td><td>−100</td><td>−100</td><td>−100</td><td>−100</td><td>−100</td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>1 199 000</td><td>−42 100</td><td>−42 100</td><td>−442 100</td><td>−428 100</td><td>−414 100</td></tr></tbody></table></div>
<p>Effektiv årsrente er internrenten på kontantstrømmen: <b>3,53 %</b>.</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 3, weight: 20,
        title: 'To aksjer: forventning, risiko og portefølje',
        topics: ['portefolje'],
        text: `<p>Du vurderer å plassere noe av din sparing i aksjemarkedet og konkret vurdere du to aksjer; aksje A og B. Avkastningen påvirkes av svingninger i etterspørselen etter bedriftens produkter, og kan illustreres slik:</p>
<p><b>Aksje A</b></p>
<div class="tablewrap"><table class="data"><thead><tr><th>Etterspørsel</th><th>Sannsynlighet</th><th>Avkastning</th></tr></thead><tbody><tr><th scope="row">Høy</th><td>0,2</td><td>14 %</td></tr><tr><th scope="row">Normal</th><td>0,5</td><td>12 %</td></tr><tr><th scope="row">Lav</th><td>0,3</td><td>−4 %</td></tr></tbody></table></div>
<p><b>Aksje B</b></p>
<div class="tablewrap"><table class="data"><thead><tr><th>Etterspørsel</th><th>Sannsynlighet</th><th>Avkastning</th></tr></thead><tbody><tr><th scope="row">Høy</th><td>0,2</td><td>12 %</td></tr><tr><th scope="row">Normal</th><td>0,5</td><td>11 %</td></tr><tr><th scope="row">Lav</th><td>0,3</td><td>−1 %</td></tr></tbody></table></div>`,
        parts: [
          {
            label: 'a',
            q: `Beregn aksjenes forventede avkastning og standardavvik. Kan man slå fast om den ene eller andre aksjen entydig er å foretrekke? Begrunn svaret ditt.`,
            topics: ['portefolje'],
            answer: `A: E(r) = <b>7,60 %</b>, standardavvik <b>7,63 %</b>. B: E(r) = <b>7,60 %</b>, standardavvik <b>5,64 %</b>. B dominerer A (samme forventning, lavere risiko) – begrunnelsen er egen kommentar, ikke skrevet i LF.`,
            method: `<p>Forventet avkastning er sannsynlighetsveid snitt av utfallene. Variansen er sannsynlighetsveid kvadrert avvik fra forventningen, og standardavviket er kvadratroten av variansen.</p>
<div class="formula">E(r) = Σ p<sub>i</sub> · r<sub>i</sub> &nbsp;&nbsp;&nbsp; Var(r) = Σ p<sub>i</sub> · (r<sub>i</sub> − E(r))<sup>2</sup> &nbsp;&nbsp;&nbsp; σ = √Var(r)</div>
<div class="tablewrap"><table class="data"><thead><tr><th>Aksje</th><th>E(r)</th><th>Varians</th><th>Standardavvik</th></tr></thead><tbody><tr><th scope="row">A</th><td>7,60 %</td><td>0,005824</td><td>7,63 %</td></tr><tr><th scope="row">B</th><td>7,60 %</td><td>0,003184</td><td>5,64 %</td></tr></tbody></table></div>
<p class="muted small">Begrunnelse (egen kommentar – ikke skrevet i LF): Samme forventning, B har lavere risiko → B dominerer A for en risikoavers investor (isolert sett).</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Anta nå at de to selskapene opererer i helt forskjellige bransjer slik at aksjenes avkastning ikke er korrelert (kovarians og korrelasjonskoeffisient er 0). Er det fornuftig å fordele sparebeløpet likt mellom de to aksjene? Vis ditt svar ved relevante beregninger.`,
            topics: ['portefolje'],
            answer: `50/50: E = 7,60 %, standardavvik <b>4,75 %</b> – lavere enn begge enkeltaksjene, så diversifisering lønner seg. Ikke optimalt: minimum-varians er ca. 35 % A / 65 % B med standardavvik <b>4,54 %</b>.`,
            method: `<p>Med kovarians 0 faller kovariansleddet bort, og porteføljevariansen blir summen av kvadrert vekt ganger varians:</p>
<div class="formula">Var<sub>p</sub> = 0,25 · 0,005824 + 0,25 · 0,003184 = 0,002252 &nbsp;→&nbsp; σ<sub>p</sub> = <b>4,75 %</b></div>
<p>Forventet avkastning er uendret 7,60 %. Standardavviket er lavere enn for begge enkeltaksjer → diversifisering lønner seg.</p>
<p>LF viser også «Optimalt» (minimum-varians): andel A 0,35 / B 0,65, E = 7,60 %, varians 0,002058572, standardavvik <b>4,54 %</b>. Altså: 50/50 er fornuftig (bedre enn enkeltaksje), men ikke optimalt; ca. 35/65 gir lavest risiko.</p>
<p class="muted small">Egen kontroll: minimum-varians-vekt A = σ<sub>B</sub><sup>2</sup>/(σ<sub>A</sub><sup>2</sup> + σ<sub>B</sub><sup>2</sup>) = 0,003184/0,009008 = 0,3535 – stemmer med LF (avrundet 0,35).</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Anta at du må redusere din risiko og at du velger å plassere 30 % av sparingen din risikofritt og resten i aksje B. Risikofri rente er 2 %. Hva blir forventet avkastning og avkastningens standardavvik for denne porteføljen?`,
            topics: ['portefolje'],
            answer: `E = <b>5,92 %</b>, standardavvik = <b>3,95 %</b>.`,
            method: `<p>Den risikofrie plasseringen har standardavvik 0, så porteføljens risiko er bare aksjeandelen ganger aksjens standardavvik.</p>
<div class="formula">E(r<sub>p</sub>) = 0,3 · 2 % + 0,7 · 7,6 % = <b>5,92 %</b></div>
<div class="formula">σ<sub>p</sub> = 0,7 · 5,64 % = <b>3,95 %</b></div>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 4, weight: 35,
        title: 'AS Innovasjon: WACC og nåverdi etter skatt',
        topics: ['kvm', 'skatt'],
        text: `<p>AS Innovasjon har utviklet et nytt produkt som man antar vil oppnå stor suksess i markedet. Produktets salgspris er 1 500 pr. enhet, og det er budsjettert med følgende salgsvolum over den antatte levetiden på 5 år:</p>
<div class="tablewrap"><table class="data"><tbody><tr><th scope="row">Volum år 1</th><td>2 200</td></tr><tr><th scope="row">Volum år 2</th><td>2 200</td></tr><tr><th scope="row">Volum år 3</th><td>2 500</td></tr><tr><th scope="row">Volum år 4</th><td>2 500</td></tr><tr><th scope="row">Volum år 5</th><td>1 850</td></tr></tbody></table></div>
<p>Man antar at dekningsgraden i år 1 til 3 vil bli 40 %. De siste to årene regner man med at dekningsgraden kan øke til 60 % pga. læringseffekter blant arbeiderne slik at man kan produsere mer effektivt.</p>
<p>Dersom prosjektet settes i gang må man anskaffe anleggsmidler for 5 000 000 og man anslår at anleggsmidlene kan selges for 850 000 ved levetidens slutt. Anleggsmidlene avskrives etter saldometoden med 20 % årlig, og salget av anleggsmidlene skal gjennomføres på den skattemessig gunstigste måte. Skattesatsen er 22 %.</p>
<p>Hvis prosjektet starter, må man ta i bruk et lokale man eier, men som er leid ut, med en leieinntekt på 225 000 i år 1. Det er lagt inn i utleieavtalen at leien skal økes med 2 % årlig i hele perioden.</p>
<p>Dersom prosjektet settes i gang, vil en person som allerede er ansatt, få ansvar for prosjektet. Hennes lønn er nå 550 000 årlig, men pga. økt ansvar vil lønnen hennes øke til 700 000 årlig.</p>
<p>AS Innovasjon antar også at dette nye produktet vil skape mer interesse for selskapets øvrige produkter. Omsetningen av disse produktene er i dag 4 millioner årlig. Dekningsgraden er 30 % og man antar at omsetningen av disse produktene kan øke til 4 400 000 årlig i hele perioden.</p>
<p>Hvis prosjektet starter, vil arbeidskapitalbehovet øke og det er anslått av arbeidskapitalen blir 18 % av omsetningen. Se bort fra mulig endring i arbeidskapital som kan komme av at salget av eksisterende produkter øker.</p>
<p>Risikofri rente er 2 % mens AS Innovasjon kan låne penger til en rente på 4 % før skatt. Avkastning på markedsporteføljen er 8 % og bedriftens aksjebeta er 1,75. AS Innovasjon finansierer alle sine prosjekter med en egenkapitalandel på 40 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn AS Innovasjon sin veide totalkapitalkostnad, WACC.`,
            topics: ['kvm'],
            answer: `r<sub>e</sub> = <b>12,50 %</b>, WACC = <b>6,87 %</b> (6,872 %).`,
            method: `<p>Egenkapitalkravet finnes med kapitalverdimodellen (LF bruker KVM uten skattejustering):</p>
<div class="formula">r<sub>e</sub> = r<sub>f</sub> + β · (r<sub>m</sub> − r<sub>f</sub>)</div>
<div class="formula">r<sub>e</sub> = 2 % + 1,75 · (8 % − 2 %) = <b>12,50 %</b></div>
<p>WACC veier egenkapitalkravet og gjeldsrenten etter skatt med kapitalandelene (40 % egenkapital, 60 % gjeld):</p>
<div class="formula">WACC = r<sub>e</sub> · <span class="frac"><span>E</span><span>E + G</span></span> + r<sub>g</sub> · (1 − s) · <span class="frac"><span>G</span><span>E + G</span></span></div>
<div class="formula">WACC = 0,40 · 12,50 % + 0,60 · 4 % · (1 − 0,22) = <b>6,87 %</b> (6,872 %)</div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Beregn prosjektets nåverdi etter skatt. Er prosjektet lønnsomt?`,
            topics: ['skatt'],
            answer: `Nåverdi etter skatt = <b>410 775</b> → prosjektet er lønnsomt (NV &gt; 0).`,
            method: `<p>Kontantstrøm etter skatt (totalkapitalmetoden), diskontert med WACC = 6,872 %:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Salgsinntekter</th><td></td><td>3 300 000</td><td>3 300 000</td><td>3 750 000</td><td>3 750 000</td><td>2 775 000</td></tr><tr><th scope="row">Variable kostnader</th><td></td><td>−1 980 000</td><td>−1 980 000</td><td>−2 250 000</td><td>−1 500 000</td><td>−1 110 000</td></tr><tr><th scope="row">Tapt leie</th><td></td><td>−225 000</td><td>−229 500</td><td>−234 090</td><td>−238 772</td><td>−243 547</td></tr><tr><th scope="row">Økt DB eksisterende produkt</th><td></td><td>120 000</td><td>120 000</td><td>120 000</td><td>120 000</td><td>120 000</td></tr><tr><th scope="row">Lønnsøkning</th><td></td><td>−150 000</td><td>−150 000</td><td>−150 000</td><td>−150 000</td><td>−150 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm fra driften</th><td></td><td>1 065 000</td><td>1 060 500</td><td>1 235 910</td><td>1 981 228</td><td>1 391 453</td></tr><tr><th scope="row">Skatt (22 % av drift)</th><td></td><td>−234 300</td><td>−233 310</td><td>−271 900</td><td>−435 870</td><td>−306 120</td></tr><tr><th scope="row">Arbeidskapital</th><td>−594 000</td><td>0</td><td>−81 000</td><td>0</td><td>175 500</td><td>499 500</td></tr><tr><th scope="row">Anleggsmidler</th><td>−5 000 000</td><td></td><td></td><td></td><td></td><td>850 000</td></tr><tr><th scope="row">NV spart skatt (saldoavskr.)</th><td>818 696</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">NV økt skatt nedskriving</th><td>−99 828</td><td></td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Kontantstrøm prosjekt</th><td>−4 875 132</td><td>830 700</td><td>746 190</td><td>964 010</td><td>1 720 858</td><td>2 434 833</td></tr></tbody></table></div>
<p><b>Nåverdi etter skatt = 410 775</b> → prosjektet er lønnsomt (NV &gt; 0).</p>
<p><b>Metodepunkter i LF:</b></p>
<ul>
<li><b>Alternativkostnad:</b> tapt leie (vokser 2 %/år) er med. Kun <em>lønnsøkningen</em> (150 000) er relevant, ikke hele lønnen.</li>
<li><b>Synergi:</b> økt DB andre produkter = 400 000 · 30 % = 120 000.</li>
<li><b>Arbeidskapital</b> = 18 % av neste års omsetning, bindes året før (år 0: 594 000; år 2: +81 000; år 4: −175 500 frigjort; år 5: resten 499 500 frigjort).</li>
<li><b>Skatt</b> beregnes som 22 % av driftskontantstrømmen (før avskrivninger). Skatteeffekten av avskrivningene tas separat med formelen for evigvarende saldoavskrivning:</li>
</ul>
<div class="formula">NV spart skatt = <span class="frac"><span>AM · a · s</span><span>r + a</span></span></div>
<div class="formula">NV spart skatt = <span class="frac"><span>5 000 000 · 0,20 · 0,22</span><span>0,06872 + 0,20</span></span> = 818 696</div>
<ul><li><b>Salg «skattemessig gunstigst»</b> = salgssummen nedskrives på saldo. Tapt skattebesparelse (lagt i år 0-kolonnen som nåverdi):</li></ul>
<div class="formula"><span class="frac"><span>SV · a · s</span><span>r + a</span></span> · <span class="frac"><span>1</span><span>(1 + r)<sup>5</sup></span></span> = <span class="frac"><span>850 000 · 0,20 · 0,22</span><span>0,26872 · 1,06872<sup>5</sup></span></span> = 99 828</div>`,
            src: 'LF'
          }
        ]
      }
    ]
  });

  /* ==================== Desember 2022 ==================== */
  O.exams.push({
    id: '2022',
    year: 2022,
    title: 'Desember 2022',
    note: `<p><b>Vekting:</b> I originalen står oppgavene som 20 % + 20 % + 20 % + 30 %, altså bare <b>90 %</b> til sammen (trykkfeil i eksamenssettet). Den fjerde oppgaven er dessuten feilnummerert «Oppgave 3 (30 %)» i settet (LF kaller den Oppgave 4). Her er den vist med 30 % slik det står trykt, men den skulle trolig vært 40 %.</p>
<p><b>Internrente i 1a</b> er ikke oppgitt i løsningsforslaget – tallet her (≈ 13,46 %) er egen utregning. Drøftingen av payback-metoden i 1b er også egen kommentar. Forsiden (varighet og hjelpemidler) var ikke med i kilden. LF bruker KVM <b>uten</b> skattejustering.</p>`,
    tasks: [
      {
        nr: 1, weight: 20,
        title: 'Homansbyen Hotell: utvidelse med nabobygg',
        topics: ['prosjekt', 'payback'],
        text: `<p>Homansbyen Hotell AS er et veldrevet hotell sentralt i Oslo. Hotellet har 50 rom og er åpent 350 dager i året. Romprisen er 1 000, og variable kostnader pr. natt er 150. Beleggsprosenten er praktisk talt 100 %, dvs. det er betalende gjester på et rom så godt som hele tiden.</p>
<p>Betalbare faste kostnader til drift av resepsjon, vedlikehold osv. er 2 000 000 årlig.</p>
<p>Hotellet opplever flere ganger at de må avvise gjester fordi det er fullt. Det har nå dukket opp et interessant forslag. Man har muligheten til å leie et nabobygg for 800 000 årlig. Avtalen kan vare i 5 år. Bygget nå oppgraderes for å kunne fungere som hotell, og denne oppgraderingen er beregnet å koste 11 000 000. Dersom man tar dette bygget i bruk øker romkapasiteten til 65 rom, og de faste kostnadene øker til 2 500 000 årlig. Etter at perioden på 5 år er over, overdras bygget igjen til eier uten betaling. Bedriften bruker et avkastningskrav på 10 %.</p>
<p><span class="muted small">Merk: «Bygget nå oppgraderes» står slik i originalen – menes «Bygget må oppgraderes».</span></p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn prosjektets nåverdi og internrente. Er prosjektet lønnsomt?`,
            topics: ['prosjekt'],
            answer: `NV = <b>988 363</b> → lønnsomt. Internrenten er ikke oppgitt i LF; egen utregning gir ≈ <b>13,46 %</b> (&gt; 10 %).`,
            method: `<p>Bruk en differansebetraktning – bare endringene som følger av utvidelsen er relevante.</p>
<ul>
<li>DB nå = 50 rom · 350 dager · (1 000 − 150) = 14 875 000</li>
<li>DB med 65 rom = 19 337 500</li>
<li><b>Økt DB = 4 462 500</b> per år</li>
<li>Økte faste kostnader = 500 000 per år</li>
</ul>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Leie</th><td></td><td>−800 000</td><td>−800 000</td><td>−800 000</td><td>−800 000</td><td>−800 000</td></tr><tr><th scope="row">Økt DB</th><td></td><td>4 462 500</td><td>4 462 500</td><td>4 462 500</td><td>4 462 500</td><td>4 462 500</td></tr><tr><th scope="row">Faste kostnader (økning)</th><td></td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td></tr><tr><th scope="row">Ombygging</th><td>−11 000 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>−11 000 000</td><td>3 162 500</td><td>3 162 500</td><td>3 162 500</td><td>3 162 500</td><td>3 162 500</td></tr></tbody></table></div>
<p>Diskontert med 10 %: <b>NV = 988 363</b> → prosjektet er lønnsomt.</p>
<p class="muted small">Internrenten er <b>ikke oppgitt i LF</b>. Egen utregning: internrente ≈ <b>13,46 %</b> (&gt; 10 % → lønnsomt).</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Hva er prosjektets pay-back eller tilbakebetalingstid? Hva kan du si om denne metoden som verktøy for å analysere prosjektlønnsomhet?`,
            topics: ['payback'],
            answer: `Payback = <b>3,48 år</b>. Vurderingen av metoden er ikke skrevet i LF (egen kommentar): payback ignorerer tidsverdien av penger og kontantstrømmer etter tilbakebetalingstidspunktet.`,
            method: `<p>Kontantstrømmen er lik hvert år, så tilbakebetalingstiden er investeringen delt på årlig kontantstrøm:</p>
<div class="formula">Payback = <span class="frac"><span>11 000 000</span><span>3 162 500</span></span> = <b>3,48 år</b></div>
<p class="muted small">Drøfting av metoden er ikke skrevet i LF. Egen kommentar (standard lærebokpoeng): Payback ignorerer tidsverdien av penger og kontantstrømmer etter tilbakebetalingstidspunktet, og har vilkårlig kravgrense. Metoden brukes som et enkelt risiko-/likviditetsmål, ikke som lønnsomhetsmål.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'c',
            q: `Anta at det kan åpnes en mulighet for å forlenge leieavtalen i 2 år etter at 5-års avtalen er over. Hva er dette verdt regnet i dagens verdi?`,
            topics: ['prosjekt', 'rente'],
            answer: `Verdi i dag = <b>3 408 011</b>.`,
            method: `<p>En forlengelse gir to ekstra år med samme netto kontantstrøm (3 162 500) uten ny investering. Verdien i dag er nåverdien av disse to beløpene, diskontert med 10 %:</p>
<div class="formula">Verdi = <span class="frac"><span>3 162 500</span><span>1,10<sup>6</sup></span></span> + <span class="frac"><span>3 162 500</span><span>1,10<sup>7</sup></span></span> = <b>3 408 011</b></div>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 2, weight: 20,
        title: 'Boliglån i Nordea: annuitetslån',
        topics: ['laan'],
        text: `<p>Du og din samboer vurderer å kjøpe ny leilighet. Kjøpesum er 3 500 000. Det stilles krav om 15 % egenkapital, slik at lånebehovet blir 2 975 000. Du ser noen opplysninger om lånetilbud fra Nordea under. Lånet skal tilbakebetales som et annuitetslån med månedlige betaler over 20 år. Nominell årsrente er 3,35 %, etableringsgebyr er 3 200 og termingebyr er 65 pr. mnd.</p>
<p><span class="muted small">«Opplysninger om lånetilbud fra Nordea under» viser til et bilde/skjermklipp som ikke er med her; alle nødvendige tall står i oppgaveteksten.</span></p>`,
        parts: [
          {
            label: 'a',
            q: `Nordea oppgir at lånet koster 17 091 pr. mnd. Vis hvordan dette beløpet er beregnet. Det kan forekomme minimal avrunding.`,
            topics: ['laan'],
            answer: `Renter og avdrag 17 025,37 + termingebyr 65 = <b>17 090,37</b> ≈ 17 091.`,
            method: `<p>Månedsrente = 3,35 %/12 = 0,2792 %, og 20 år gir 240 terminer. Annuitetsformelen gir renter og avdrag per måned:</p>
<div class="formula">Terminbeløp = Lån · <span class="frac"><span>i · (1 + i)<sup>n</sup></span><span>(1 + i)<sup>n</sup> − 1</span></span> = 17 025,37</div>
<div class="formula">17 025,37 + 65 (termingebyr) = <b>17 090,37</b> ≈ 17 091</div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Splitt beløpet på 17 091 opp i renter, avdrag og gebyr for de første 3 mnd.`,
            topics: ['laan'],
            answer: `Måned 1: rente 8 305,21 / avdrag 8 720,17. Måned 2: 8 280,86 / 8 744,51. Måned 3: 8 256,45 / 8 768,92. Termingebyr 65,00 hver måned.`,
            method: `<p>Renten er månedsrenten (0,2792 %) ganger restgjelden ved inngangen til måneden. Avdraget er terminbeløpet (17 025,37) minus renten, og restgjelden reduseres med avdraget.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Måned</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody><tr><th scope="row">Rente</th><td>8 305,21</td><td>8 280,86</td><td>8 256,45</td></tr><tr><th scope="row">Avdrag</th><td>8 720,17</td><td>8 744,51</td><td>8 768,92</td></tr><tr><th scope="row">Termingebyr</th><td>65,00</td><td>65,00</td><td>65,00</td></tr><tr class="sum"><th scope="row">Sum</th><td>17 090,37</td><td>17 090,37</td><td>17 090,37</td></tr></tbody></table></div>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Nordea oppgir videre at lånets effektive årsrente er 3,46 %. Vis hvordan denne størrelsen er beregnet.`,
            topics: ['laan'],
            answer: `Effektiv månedsrente 0,2837 % → effektiv årsrente = <b>3,46 %</b>.`,
            method: `<p>Effektiv rente er internrenten på lånets kontantstrøm inkludert alle gebyrer.</p>
<ul><li>Netto utbetalt = 2 975 000 − 3 200 = 2 971 800</li><li>240 betalinger à 17 090,37</li></ul>
<p>Effektiv månedsrente (internrente/RENTE-funksjon) = 0,2837 %. Omregnet til årsrente:</p>
<div class="formula">1,002837<sup>12</sup> − 1 = <b>3,46 %</b></div>`,
            src: 'LF'
          },
          {
            label: 'd',
            q: `Hva er restgjelden når det gjenstår 10 år av tilbakebetalingstiden?`,
            topics: ['laan'],
            answer: `Restgjeld = <b>1 734 014</b>.`,
            method: `<p>10 år gjenstår = 120 gjenværende terminer. Restgjelden er nåverdien av de gjenværende terminbeløpene (uten gebyr):</p>
<div class="formula">Restgjeld = NV av 120 × 17 025,37 til 0,2792 % = <b>1 734 014</b></div>`,
            src: 'LF'
          },
          {
            label: 'e',
            q: `Anta at du tar opp lånet med de betingelser som er oppgitt, men at du øker den månedlige betalingen til 20 000 eks. termingebyr. Hvor lang tid tar det å nedbetale lånet?`,
            topics: ['laan', 'rente'],
            answer: `<b>192,48 måneder = 16,04 år</b>.`,
            method: `<p>Finn antall perioder som gjør at nåverdien av 20 000 per måned (eks. gebyr) til 0,2792 % blir lik lånet. LF bruker Excel-funksjonen PERIODER eller målsøking: <b>192,48 måneder = 16,04 år</b>.</p>
<p class="muted small">Egen kontroll med formel: n = −ln(1 − L · i/PMT)/ln(1 + i) = 192,48.</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 3, weight: 20,
        title: 'To aksjer: kovarians, korrelasjon og diversifikasjon',
        topics: ['portefolje'],
        text: `<p>Avkastning til aksjene A og B vil være avhengig av forventede markedsforhold og kan presenteres som i tabellen under:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Markedsforhold</th><th>Vekst</th><th>Normal</th><th>Tilbakegang</th></tr></thead><tbody><tr><th scope="row">Sannsynligheter</th><td>0,5</td><td>0,3</td><td>0,2</td></tr><tr><th scope="row">Aksje A avkastning</th><td>16,00 %</td><td>10,00 %</td><td>−7,00 %</td></tr><tr><th scope="row">Aksje B avkastning</th><td>14,00 %</td><td>11,00 %</td><td>−3,50 %</td></tr></tbody></table></div>`,
        parts: [
          {
            label: 'a',
            q: `Beregn forventet avkastning for hver av aksjene.`,
            topics: ['portefolje'],
            answer: `E(r<sub>A</sub>) = <b>9,60 %</b>, E(r<sub>B</sub>) = <b>9,60 %</b>.`,
            method: `<p>Forventet avkastning er sannsynlighetsveid snitt av utfallene:</p>
<div class="formula">E(r) = Σ p<sub>i</sub> · r<sub>i</sub></div>
<p>E(r<sub>A</sub>) = <b>9,60 %</b> og E(r<sub>B</sub>) = <b>9,60 %</b>.</p>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Beregn avkastningens varians og standardavvik for hver av aksjene.`,
            topics: ['portefolje'],
            answer: `A: varians 0,007564, standardavvik <b>8,70 %</b>. B: varians 0,004459, standardavvik <b>6,68 %</b>.`,
            method: `<div class="formula">Var(r) = Σ p<sub>i</sub> · (r<sub>i</sub> − E(r))<sup>2</sup> &nbsp;&nbsp;&nbsp; σ = √Var(r)</div>
<div class="tablewrap"><table class="data"><thead><tr><th>Aksje</th><th>Varians</th><th>Standardavvik</th></tr></thead><tbody><tr><th scope="row">A</th><td>0,007564</td><td>8,70 %</td></tr><tr><th scope="row">B</th><td>0,004459</td><td>6,68 %</td></tr></tbody></table></div>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Kan du ut fra dine svar på a) og b) si om den ene eller andre aksjen klart er å foretrekke?`,
            topics: ['portefolje'],
            answer: `Ja – <b>B dominerer A</b>: samme forventede avkastning, lavere standardavvik.`,
            method: `<p>LF (ordrett): «B dominerer over A siden forventet avkastning er den samme, mens standardavviket er lavere.»</p>`,
            src: 'LF'
          },
          {
            label: 'd',
            q: `Beregn kovarians og korrelasjon mellom aksjene.`,
            topics: ['portefolje'],
            answer: `Kovarians = <b>0,005774</b>, korrelasjon = <b>0,9942</b>.`,
            method: `<div class="formula">Kov(A, B) = Σ p<sub>i</sub> · (r<sub>A,i</sub> − E(r<sub>A</sub>)) · (r<sub>B,i</sub> − E(r<sub>B</sub>)) = <b>0,005774</b></div>
<div class="formula">ρ<sub>AB</sub> = <span class="frac"><span>Kov(A, B)</span><span>σ<sub>A</sub> · σ<sub>B</sub></span></span> = <b>0,9942</b></div>`,
            src: 'LF'
          },
          {
            label: 'e',
            q: `Hva er forventet avkastning og avkastningens standardavvik for en portefølje bestående av like store andeler av A og B?`,
            topics: ['portefolje'],
            answer: `E = <b>9,60 %</b>, standardavvik = <b>7,68 %</b> (porteføljevarians 0,00589275).`,
            method: `<p>Forventet avkastning er veid snitt: 0,5 · 9,60 % + 0,5 · 9,60 % = <b>9,60 %</b>.</p>
<div class="formula">Var<sub>p</sub> = w<sub>A</sub><sup>2</sup> · σ<sub>A</sub><sup>2</sup> + w<sub>B</sub><sup>2</sup> · σ<sub>B</sub><sup>2</sup> + 2 · w<sub>A</sub> · w<sub>B</sub> · Kov(A, B) = 0,00589275</div>
<p>Standardavvik = <b>7,68 %</b>. Til sammenligning er veid snitt av standardavvikene 7,69 %.</p>`,
            src: 'LF'
          },
          {
            label: 'f',
            q: `Hvorfor blir diversifikasjonsgevinsten ved å eie begge aksjene samtidig i en portefølje relativt beskjeden i dette tilfellet?`,
            topics: ['portefolje'],
            answer: `Fordi korrelasjonen er nær +1 (0,9942) – aksjene svinger nesten helt i takt.`,
            method: `<p>LF (ordrett): «Praktisk talt ingen diversifikasjonseffekt siden korrelasjonen er nær + 1.»</p>
<p>Det ser man også av e): porteføljens standardavvik (7,68 %) er nesten lik veid snitt av standardavvikene (7,69 %).</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 4, weight: 30,
        title: 'Ferje til gassdrift: WACC og NV etter skatt',
        topics: ['kvm', 'skatt'],
        text: `<p><span class="muted small">Trykt som «Oppgave 3 (30 %)» i eksamenssettet – LF kaller den Oppgave 4.</span></p>
<p>Et rederi driver blant annet en ferje som trafikkerer en strekning i Norland Fylke. Rederiet vurderer nå å modifisere motoren slik at den kan drives på gass og ikke tungolje, som til nå. Ved å gå over til gass kan selskapet spare drivstoffkostnader, særlig på grunn av lavere CO2 avgift.</p>
<p>Det er beregnet at besparelsen er 300 pr. fergetur. Ferjen har gjennomsnittlig 15 turer pr. dag gjennom hele året (365 dager).</p>
<p>Når det gjelder andre årlige kostnader, blir ingenting forandret bortsett fra at det vil bli noe høyere lagringskostnader på gass enn på olje. Dette antas å utgjøre 400 000 årlig. Varigheten på investeringen antas å være 5 år. Ombyggingen av motoren til gassdrift og installering av gasstanker vil koste 6 000 000. Investeringene i motorombygging og gasstanker saldoavskrives med 20 % årlig. Skattesatsen er 22 %.</p>
<p>Risikofri rente er 2,89 %, mens rederiet kan låne penger til en rente på 5,45 %. Avkastningen på markedsporteføljen er 10 %. Rederiet er ikke børsnotert, men et sammenlignbart selskap som er børsnotert, har en aksjebeta på 1,54. Rederiet finansierer sine investeringer med en egenkapitalandel på 60 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn selskapet sin veide totalkapitalkostnad.`,
            topics: ['kvm'],
            answer: `r<sub>e</sub> = <b>13,84 %</b>, WACC = <b>10,00 %</b> (10,004 %).`,
            method: `<p>Egenkapitalkravet med KVM (uten skattejustering), med beta fra det sammenlignbare børsnoterte selskapet:</p>
<div class="formula">r<sub>e</sub> = r<sub>f</sub> + β · (r<sub>m</sub> − r<sub>f</sub>)</div>
<div class="formula">r<sub>e</sub> = 2,89 % + 1,54 · (10 % − 2,89 %) = <b>13,84 %</b></div>
<p>Gjeldsrente etter skatt = 5,45 % · 0,78 = 4,25 %.</p>
<div class="formula">WACC = 0,60 · 13,84 % + 0,40 · 4,25 % = <b>10,00 %</b> (10,004 %)</div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Beregn nåverdi etter skatt. Er det lønnsomt å bygge om motoren til gass?`,
            topics: ['skatt'],
            answer: `Nåverdi etter skatt = <b>−1 446 657</b> → ikke lønnsomt å bygge om.`,
            method: `<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Sparte kostnader (300 · 15 · 365)</th><td></td><td>1 642 500</td><td>1 642 500</td><td>1 642 500</td><td>1 642 500</td><td>1 642 500</td></tr><tr><th scope="row">Lagringskostnader</th><td></td><td>−400 000</td><td>−400 000</td><td>−400 000</td><td>−400 000</td><td>−400 000</td></tr><tr><th scope="row">Resultat før skatt</th><td></td><td>1 242 500</td><td>1 242 500</td><td>1 242 500</td><td>1 242 500</td><td>1 242 500</td></tr><tr><th scope="row">Skatt 22 %</th><td></td><td>−273 350</td><td>−273 350</td><td>−273 350</td><td>−273 350</td><td>−273 350</td></tr><tr><th scope="row">Ombygging mv</th><td>−6 000 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">NV spart skatt avskrivning</th><td>879 882</td><td></td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Beregningsgrunnlag (kontantstrøm)</th><td>−5 120 118</td><td>969 150</td><td>969 150</td><td>969 150</td><td>969 150</td><td>969 150</td></tr></tbody></table></div>
<p>Diskontert med WACC (10,004 %): <b>nåverdi etter skatt = −1 446 657</b> → ikke lønnsomt å bygge om.</p>
<p><b>Metode:</b> Skatt beregnes på driftsoverskuddet før avskrivninger. Skattebesparelsen av saldoavskrivningene legges inn som evigvarende nåverdi i år 0:</p>
<div class="formula">NV spart skatt = <span class="frac"><span>AM · a · s</span><span>r + a</span></span></div>
<div class="formula">NV spart skatt = <span class="frac"><span>6 000 000 · 0,20 · 0,22</span><span>0,10004 + 0,20</span></span> = 879 882</div>
<p>Ingen restverdi (saldoen avskrives videre i det uendelige) og ingen arbeidskapital.</p>`,
            src: 'LF'
          }
        ]
      }
    ]
  });

  /* ==================== Desember 2023 ==================== */
  O.exams.push({
    id: '2023',
    year: 2023,
    title: 'Desember 2023',
    note: `<p>Fire oppgaver (25 % + 20 % + 20 % + 35 %). Vekt per deloppgave er ikke oppgitt, og forsiden (varighet og hjelpemidler) var ikke med i kilden. <b>Merk oppgave 2f:</b> ordlyden i løsningsforslaget er selvmotsigende – se forklaringen i løsningen. LF bruker KVM <b>uten</b> skattejustering, og godtar målsøking i Excel der det er aktuelt.</p>`,
    tasks: [
      {
        nr: 1, weight: 25,
        title: 'Nytt prosjekt: NNV, kritisk restverdi, vedlikehold',
        topics: ['prosjekt', 'folsomhet', 'rente'],
        text: `<p>En bedrift vurderer å starte et nytt prosjekt. Levetiden er 4 år og under finner du opplysninger om pris, variable og faste kostnader, samt årlig salgsvolum.</p>
<div class="tablewrap"><table class="data"><tbody><tr><th scope="row">Salgspris</th><td>3 400</td></tr><tr><th scope="row">Variabel enhetskostnad</th><td>1 900</td></tr><tr><th scope="row">Salgsvolum år 1</th><td>2 400</td></tr><tr><th scope="row">Salgsvolum år 2</th><td>2 800</td></tr><tr><th scope="row">Salgsvolum år 3</th><td>2 800</td></tr><tr><th scope="row">Salgsvolum år 4</th><td>2 400</td></tr><tr><th scope="row">Årlige faste kostnader</th><td>1 000 000</td></tr></tbody></table></div>
<p>Dersom prosjektet startes, må man investere 8 500 000 i anleggsmidler. Det er anslått at anleggsmidlene kan selges for 1 800 000 ved levetidens slutt. Prosjektet er vil også medføre at arbeidskapitalen øker, og det er anslått at arbeidskapitalen vil utgjøre 20 % av omsetningen.</p>
<p>I slutten av år 3 må det også utføres et stort vedlikehold av anleggsmidlene for å opprettholde stabil produksjon samt sikre restverdien ved levetidens slutt. Dette er kostnadsberegnet til 1 200 000.</p>
<p>Prosjektets avkastningskrav er 10 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn prosjektets nåverdi (NNV) og internrente. Er prosjektet lønnsomt?`,
            topics: ['prosjekt'],
            answer: `NV = <b>455 916</b> → lønnsomt. Internrente = <b>11,79 %</b>.`,
            method: `<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr><th scope="row">Omsetning</th><td></td><td>8 160 000</td><td>9 520 000</td><td>9 520 000</td><td>8 160 000</td></tr><tr><th scope="row">Variable kostnader</th><td></td><td>−4 560 000</td><td>−5 320 000</td><td>−5 320 000</td><td>−4 560 000</td></tr><tr><th scope="row">Årlige faste kostnader</th><td></td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td></tr><tr><th scope="row">Vedlikehold</th><td></td><td></td><td></td><td>−1 200 000</td><td></td></tr><tr><th scope="row">Anleggsmidler</th><td>−8 500 000</td><td></td><td></td><td></td><td>1 800 000</td></tr><tr><th scope="row">Arbeidskapital</th><td>−1 632 000</td><td>−272 000</td><td>0</td><td>272 000</td><td>1 632 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>−10 132 000</td><td>2 328 000</td><td>3 200 000</td><td>2 272 000</td><td>6 032 000</td></tr></tbody></table></div>
<p><b>Arbeidskapital</b> = 20 % av neste års omsetning, bindes året før: år 0: 20 % · 8 160 000 = 1 632 000; år 1: økning 272 000; år 3: frigjøring 272 000; år 4: rest 1 632 000.</p>
<p>Diskontert med 10 %: <b>NV = 455 916</b> (lønnsomt). Internrente = <b>11,79 %</b> (&gt; 10 %).</p>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Hva må anleggsmidlene minst selges for ved levetidens slutt, for at prosjektet skal være lønnsomt? Se bort fra dette spørsmålet i resten av oppgaven.`,
            topics: ['folsomhet'],
            answer: `Laveste salgsverdi = <b>1 132 493</b>.`,
            method: `<p>Nåverdien kan falle med 455 916 før prosjektet blir ulønnsomt. Salgssummen kommer i år 4, så reduksjonen regnes om til år 4-kroner:</p>
<div class="formula">455 916 · 1,10<sup>4</sup> = 667 507</div>
<div class="formula">Laveste salgsverdi = 1 800 000 − 667 507 = <b>1 132 493</b></div>
<p>LF: «Målsøking godtas også».</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Anta nå at man i stedet for å gjøre det store vedlikeholdet i slutten av år 3, kan man gjøre mindre årlige vedlikehold i slutten av år 1, 2 og 3. Legg til grunn av de årlige beløpene skal være like store. Hvor høye kan de årlige beløpene være for at nåverdien skal bli den samme som den du fant i a)?`,
            topics: ['rente'],
            answer: `<b>362 538</b> per år.`,
            method: `<p>De tre årlige beløpene må ha samme nåverdi som det store vedlikeholdet.</p>
<div class="formula">NV av vedlikeholdet = <span class="frac"><span>1 200 000</span><span>1,10<sup>3</sup></span></span> = 901 578</div>
<p>Gjør om nåverdien til en annuitet over 3 år ved 10 %: årlig beløp = <b>362 538</b>.</p>
<p>LF: «Evt. bruke sluttverdi» – 1 200 000 som sluttverdi av en 3-årig annuitet gir samme svar. «Målsøking godtas også».</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 2, weight: 20,
        title: 'Billån i DnB: annuitetslån og realrente',
        topics: ['laan', 'inflasjon'],
        text: `<p>Etter å ha fullført studiene planlegger du å kjøpe bil. På www.finn.no finner du en BMW 5-serie 2.0D 2016 modell, som tilbys for 309 000. DnB gir et lånetilbud og krever en egenkapitalandel på 35 %. Det påløper gebyrer på 3 551 ved låneopptak, slik at totalt lånebehov blir 204 401 for å finansiere kjøpet. Nominell rente er 6,34 % og lånet gis som et annuitetslån med månedlig betaling over 5 år. Termingebyr er 65.</p>`,
        parts: [
          {
            label: 'a',
            q: `Hvor mye skal du betale i renter og avdrag pr. måned?`,
            topics: ['laan'],
            answer: `<b>3 984,04</b> per måned.`,
            method: `<p>Lån 204 401 (= 309 000 · 0,65 + 3 551), månedsrente 6,34 %/12 = 0,528 %, 60 terminer.</p>
<div class="formula">Terminbeløp = Lån · <span class="frac"><span>i · (1 + i)<sup>n</sup></span><span>(1 + i)<sup>n</sup> − 1</span></span> = <b>3 984,04</b></div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Splitt månedsbeløpet opp i renter og avdrag for de første 3 månedene.`,
            topics: ['laan'],
            answer: `Måned 1: rente 1 079,92 / avdrag 2 904,12. Måned 2: 1 064,58 / 2 919,46. Måned 3: 1 049,15 / 2 934,89.`,
            method: `<p>Renten er månedsrenten (0,528 %) ganger restgjelden ved inngangen til måneden; avdraget er terminbeløpet minus renten.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Måned</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody><tr><th scope="row">Rente</th><td>1 079,92</td><td>1 064,58</td><td>1 049,15</td></tr><tr><th scope="row">Avdrag</th><td>2 904,12</td><td>2 919,46</td><td>2 934,89</td></tr><tr class="sum"><th scope="row">Sum</th><td>3 984,04</td><td>3 984,04</td><td>3 984,04</td></tr></tbody></table></div>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Hva er lånets effektive årsrente?`,
            topics: ['laan'],
            answer: `Effektiv årsrente = <b>8,04 %</b>.`,
            method: `<ul><li>Netto utbetalt = 204 401 − 3 551 = 200 850</li><li>Betaling inkl. termingebyr: 4 049,04 i 60 måneder</li></ul>
<p>Effektiv månedsrente (internrente) = 0,65 % (0,646 %) → effektiv årsrente = <b>8,04 %</b>.</p>`,
            src: 'LF'
          },
          {
            label: 'd',
            q: `Hva er restgjelden når det gjenstår 2 år av tilbakebetalingstiden?`,
            topics: ['laan'],
            answer: `Restgjeld = <b>89 581,38</b>.`,
            method: `<p>2 år gjenstår = 24 gjenværende terminer. Restgjelden er nåverdien av de 24 gjenværende terminbeløpene (3 984,04) diskontert med månedsrenten 0,528 %: <b>89 581,38</b>.</p>`,
            src: 'LF'
          },
          {
            label: 'e',
            q: `Anta at du etter 3 år ønsker å endre terminbeløpet til 5 000 pr. måned eksklusive termingebyr. Hvor lang tid tar det å innfri restgjelden?`,
            topics: ['laan', 'rente'],
            answer: `<b>18,87 måneder</b>.`,
            method: `<p>Etter 3 år er restgjelden 89 581 (fra d). Finn antall perioder som gjør at nåverdien av 5 000 per måned til 0,528 % blir lik restgjelden (PERIODER-funksjonen eller målsøking): <b>18,87 måneder</b>.</p>`,
            src: 'LF'
          },
          {
            label: 'f',
            q: `Ville effektiv årsrente bli påvirket dersom lånet hadde blitt tatt opp som et serielån med de samme betingelsene? Det er ikke nødvendig å utføre beregninger, men gi en begrunnelse.`,
            topics: ['laan'],
            answer: `Ja, den påvirkes. LF skriver at effektiv rente blir «noe lavere» med serielån, men LFs egen begrunnelse (og faglig riktig svar etter egen vurdering) tilsier at den blir noe <b>høyere</b> med serielån. Les forbeholdet i løsningen.`,
            method: `<p>LF (ordrett): «Effektiv årsente hadde blitt noe lavere med serielån. Annuitetslån nedbetales saktere slik at gjennomsnittlig gjeld er høyere, og da slår gebyrene mindre ut.»</p>
<p><b>NB – LF er selvmotsigende her.</b> Begrunnelsen (gebyrene slår <em>mindre</em> ut på annuitetslånet fordi gjennomsnittlig gjeld er høyere) tilsier at annuitetslånet har <em>lavest</em> effektiv rente, dvs. at serielånet får noe <b>høyere</b> effektiv rente – ikke lavere slik første setning sier.</p>
<p class="muted small">Egen vurdering (ikke fra LF): Faglig riktig er at serielån nedbetales raskere → lavere gjennomsnittlig gjeld → faste gebyrer utgjør en større andel → effektiv rente blir noe høyere med serielån. Etterregnet med oppgavens tall: ca. 8,11 % som serielån mot 8,04 % som annuitetslån. Ta dette med forbehold om at LF-ordlyden sier «lavere».</p>`,
            src: 'LF+egen'
          },
          {
            label: 'g',
            q: `Anta at din skattesats er 22 %, og at beregnet inflasjon i perioden er 2,5 % årlig. Hva blir lånets realrente etter skatt?`,
            topics: ['inflasjon', 'laan'],
            answer: `Realrente etter skatt = <b>3,68 %</b> (med effektiv rente 8,04 %). LF: ikke trekk for de som bruker nominell rente.`,
            method: `<div class="formula">Realrente etter skatt = <span class="frac"><span>i · (1 − s) − j</span><span>1 + j</span></span></div>
<p>Med effektiv rente fra c):</p>
<div class="formula"><span class="frac"><span>8,04 % · 0,78 − 2,5 %</span><span>1,025</span></span> = <b>3,68 %</b></div>
<p>LF: «Ikke trekk for de som bruker nominell rente».</p>
<p class="muted small">Egen utregning med nominell rente 6,34 %: (6,34 % · 0,78 − 2,5 %)/1,025 = 2,39 %.</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 3, weight: 20,
        title: 'Aksje X og Y: portefølje og minimum varians',
        topics: ['portefolje'],
        text: `<p>Anta at du eier to aksjer X og Y med følgende egenskaper:</p>
<p><b>Aksje X</b></p>
<div class="tablewrap"><table class="data"><thead><tr><th>Avkastning</th><th>Sannsynlighet</th></tr></thead><tbody><tr><th scope="row">−10 %</th><td>0,3</td></tr><tr><th scope="row">15 %</th><td>0,4</td></tr><tr><th scope="row">20 %</th><td>0,3</td></tr></tbody></table></div>
<p><b>Aksje Y</b></p>
<div class="tablewrap"><table class="data"><thead><tr><th>Avkastning</th><th>Sannsynlighet</th></tr></thead><tbody><tr><th scope="row">−15 %</th><td>0,2</td></tr><tr><th scope="row">9 %</th><td>0,5</td></tr><tr><th scope="row">25 %</th><td>0,3</td></tr></tbody></table></div>`,
        parts: [
          {
            label: 'a',
            q: `Beregn forventet avkastning og avkastningens standardavvik for aksje X og aksje Y alene.`,
            topics: ['portefolje'],
            answer: `X: E = <b>9,00 %</b>, standardavvik <b>12,61 %</b>. Y: E = <b>9,00 %</b>, standardavvik <b>13,86 %</b>.`,
            method: `<div class="formula">E(r) = Σ p<sub>i</sub> · r<sub>i</sub> &nbsp;&nbsp;&nbsp; Var(r) = Σ p<sub>i</sub> · (r<sub>i</sub> − E(r))<sup>2</sup> &nbsp;&nbsp;&nbsp; σ = √Var(r)</div>
<div class="tablewrap"><table class="data"><thead><tr><th>Aksje</th><th>E(r)</th><th>Varians</th><th>Standardavvik</th></tr></thead><tbody><tr><th scope="row">X</th><td>9,00 %</td><td>0,0159</td><td>12,61 %</td></tr><tr><th scope="row">Y</th><td>9,00 %</td><td>0,0192</td><td>13,86 %</td></tr></tbody></table></div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Hvis du må velge en av aksjene, hvilken vil du velge? Begrunn svaret ditt.`,
            topics: ['portefolje'],
            answer: `<b>Aksje X</b> – lik forventet avkastning, men lavere risiko.`,
            method: `<p>LF (ordrett): «Velger aksje X. Forventet avkastning er lik, men aksje X har lavere risiko».</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Anta at selskapene opererer i helt ulike næringer slik at kovariansen og korrelasjonen mellom aksjenes avkastning er 0. Beregn forventet avkastning og avkastningens standardavvik for en portefølje bestående av 60 % X og 40 % Y.`,
            topics: ['portefolje'],
            answer: `E = <b>9,00 %</b>, standardavvik = <b>9,38 %</b>.`,
            method: `<p>Forventet avkastning er veid snitt = <b>9,00 %</b>. Med kovarians 0 faller kovariansleddet bort:</p>
<div class="formula">Var<sub>p</sub> = 0,36 · 0,0159 + 0,16 · 0,0192 = 0,008796 &nbsp;→&nbsp; σ<sub>p</sub> = <b>9,38 %</b></div>`,
            src: 'LF'
          },
          {
            label: 'd',
            q: `Hvilken andel av aksje X og Y i en portefølje vil minimere avkastningens standardavvik?`,
            topics: ['portefolje'],
            answer: `Andel X = <b>54,70 %</b>, andel Y = <b>45,30 %</b>.`,
            method: `<p>Når kovariansen er 0, er minimum-varians-vekten for X lik variansen til Y delt på summen av variansene:</p>
<div class="formula">w<sub>X</sub> = <span class="frac"><span>σ<sub>Y</sub><sup>2</sup></span><span>σ<sub>X</sub><sup>2</sup> + σ<sub>Y</sub><sup>2</sup></span></span> = <span class="frac"><span>0,0192</span><span>0,0351</span></span> = <b>54,70 %</b></div>
<p>Andel Y = 1 − 54,70 % = <b>45,30 %</b>. Aksjen med lavest varians (X) får størst vekt.</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 4, weight: 35,
        title: 'Kapasitetsutvidelse linser: WACC og NNV etter skatt',
        topics: ['kvm', 'skatt'],
        text: `<p>En bedrift produserer og selger blant annet en linse som brukes i fotoenheten i smarttelefoner. Kundene er produsenter av mobiltelefoner verden over. Etterspørselen er svært høy og de siste årene har salget ligget konstant på 100 000 enheter, som er kapasitetsgrensen. Lønnsomheten er meget god, og bedriften kan vise til store overskudd.</p>
<p>Produktet omsettes for 48 pr. enhet, og de variable enhetskostnadene er 25. Man antar at salget neste år kunne økt til 400 000 enheter, dersom man hadde hatt kapasitet til å produsere så mye. Faktisk har markedsavdelingen estimert et mulig salg på 400 000, 500 000, 600 000, 600 000 og 500 000 enheter årlig over de neste 5 år. For å kunne oppnå denne produksjonen, må man investere i produksjonsutstyr for 20 000 000. Utstyret avskrives etter saldometoden med 20 % årlig. Man antar at utrangeringsverdien på produksjonsutstyret er 0. Utstyret må gjennomgå et større vedlikehold i år 4. Dette er kostnadsberegnet til 3 500 000.</p>
<p>Andre betalbare faste kostnader er budsjettert til 2 500 000 årlig. Bedriftens toppledelse krever også at prosjektet må bære en andel av selskapets indirekte faste kostnader. Man anslår at det vil bli 500 000 årlig. Prosjektet vil også medføre økning i arbeidskapitalen. Man anslår at arbeidskapitalen vil utgjøre 20 % av omsetningen.</p>
<p>Skattesatsen er 22 %. Risikofri rente er 3 %, mens bedriften kan låne penger til en rente på 4 % før skatt. Markedsavkastningen er 10 %, og bedriftens aksjebeta er 1,33. Bedriften finansierer sine prosjekter med en gjeldsandel på 36 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Finn prosjektets veide totalavkastningskrav, WACC.`,
            topics: ['kvm'],
            answer: `r<sub>e</sub> = <b>12,31 %</b>, WACC = <b>9,00 %</b> (9,0016 %).`,
            method: `<div class="formula">r<sub>e</sub> = r<sub>f</sub> + β · (r<sub>m</sub> − r<sub>f</sub>)</div>
<div class="formula">r<sub>e</sub> = 3 % + 1,33 · (10 % − 3 %) = <b>12,31 %</b></div>
<p>Gjeldsandel 36 % gir egenkapitalandel 64 %:</p>
<div class="formula">WACC = 0,64 · 12,31 % + 0,36 · 4 % · (1 − 0,22) = <b>9,00 %</b> (9,0016 %)</div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Finn nåverdi etter skatt. Vil du anbefale bedriften å utvide kapasiteten?`,
            topics: ['skatt'],
            answer: `NNV etter skatt = <b>1 044 022</b> → anbefaler å utvide kapasiteten.`,
            method: `<p><b>Relevante kontantstrømmer:</b> Kun <em>økningen</em> i salg utover dagens kapasitet på 100 000 er relevant: 300 000, 400 000, 500 000, 500 000, 400 000 enheter. Fordelte indirekte faste kostnader (500 000) er <b>ikke</b> med (ikke relevant kontantstrøm).</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Omsetning (økning · 48)</th><td></td><td>14 400 000</td><td>19 200 000</td><td>24 000 000</td><td>24 000 000</td><td>19 200 000</td></tr><tr><th scope="row">Variable kostnader (økning · 25)</th><td></td><td>−7 500 000</td><td>−10 000 000</td><td>−12 500 000</td><td>−12 500 000</td><td>−10 000 000</td></tr><tr><th scope="row">Faste kostnader</th><td></td><td>−2 500 000</td><td>−2 500 000</td><td>−2 500 000</td><td>−2 500 000</td><td>−2 500 000</td></tr><tr><th scope="row">Overhaling</th><td></td><td></td><td></td><td></td><td>−3 500 000</td><td></td></tr><tr><th scope="row">Resultat før skatt</th><td></td><td>4 400 000</td><td>6 700 000</td><td>9 000 000</td><td>5 500 000</td><td>6 700 000</td></tr><tr><th scope="row">Skatt 22 %</th><td></td><td>−968 000</td><td>−1 474 000</td><td>−1 980 000</td><td>−1 210 000</td><td>−1 474 000</td></tr><tr><th scope="row">NV spart skatt avskr</th><td>3 034 315</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Anleggsmidler</th><td>−20 000 000</td><td></td><td></td><td></td><td></td><td>0</td></tr><tr><th scope="row">Arbeidskapital</th><td>−2 880 000</td><td>−960 000</td><td>−960 000</td><td>0</td><td>960 000</td><td>3 840 000</td></tr><tr class="sum"><th scope="row">Beregningsgrunnlag (kontantstrøm)</th><td>−19 845 685</td><td>2 472 000</td><td>4 266 000</td><td>7 020 000</td><td>5 250 000</td><td>9 066 000</td></tr></tbody></table></div>
<p>Diskontert med WACC (9,0016 %): <b>NNV etter skatt = 1 044 022</b> → anbefaler å utvide kapasiteten.</p>
<div class="formula">NV spart skatt = <span class="frac"><span>AM · a · s</span><span>r + a</span></span></div>
<div class="formula">NV spart skatt = <span class="frac"><span>20 000 000 · 0,20 · 0,22</span><span>0,090016 + 0,20</span></span> = 3 034 315</div>
<p><b>Arbeidskapital</b> = 20 % av neste års (økte) omsetning, bundet året før.</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Anta nå at anleggsmidlene kan ha en salgsverdi på 1 000 000 ved levetidens slutt. Hvordan endres nåverdien etter skatt? Salget skal behandles på den skattemessig gunstigste måten.`,
            topics: ['skatt'],
            answer: `Nåverdien øker med <b>551 286</b> (ny NNV ≈ 1 595 308 – egen sum).`,
            method: `<p>«Skattemessig gunstigste måte» betyr at salgssummen nedskrives på saldoen, slik at man taper fremtidige avskrivninger i stedet for å skatte av hele gevinsten med en gang.</p>
<div class="formula">NV av salg = <span class="frac"><span>1 000 000</span><span>1,090016<sup>5</sup></span></span> = 649 884</div>
<div class="formula">NV av økt skatt = <span class="frac"><span>1 000 000 · 0,20 · 0,22</span><span>0,290016 · 1,090016<sup>5</sup></span></span> = 98 598</div>
<div class="formula">Endring i nåverdi = 649 884 − 98 598 = <b>551 286</b></div>
<p class="muted small">Ny NNV ≈ 1 595 308 (egen sum av 1 044 022 + 551 286, ikke oppgitt i LF).</p>`,
            src: 'LF'
          }
        ]
      }
    ]
  });

  /* ==================== Eksamen 2024 ==================== */
  O.exams.push({
    id: '2024',
    year: 2024,
    title: 'Eksamen 2024',
    note: `<p>Fire oppgaver (20 % + 15 % + 30 % + 35 %). Termin er ikke oppgitt i kilden, og forsiden (varighet og hjelpemidler) var ikke med. Nytt dette året: obligasjonsoppgave (erstatter låneoppgaven) og drøfting av systematisk/usystematisk risiko. LF bruker KVM <b>uten</b> skattejustering.</p>`,
    tasks: [
      {
        nr: 1, weight: 20,
        title: 'Maskin A eller B: fra resultat til kontantstrøm',
        topics: ['toprosjekt', 'prosjekt'],
        text: `<p>En bedrift vurderer om man skal starte et nytt prosjekt. Man har mottatt tilbud på leveranse av anleggsmidler fra to leverandører, som vi kan kalle maskin A og maskin B. Maskin A koster 10 000 000 og maskin B koster 13 000 000. Maskinene avskrives lineært til 0 over prosjektets levetid på 5 år. Maskin B koster mer i innkjøp, men fordelen er at en mer kapitalintensiv produksjon, reduserer de variable kostnadene.</p>
<p>Arbeidskapital er 900 000 uansett hvilken maskin som eventuelt velges, og avkastningskravet er 10 %. Se bort fra skatt i hele oppgaven.</p>
<p>Bedriften har satt opp følgende resultatbudsjett for hvert av de 5 årene prosjektet er tenkt å vare:</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>Maskin A</th><th>Maskin B</th></tr></thead><tbody><tr><th scope="row">Omsetning</th><td>6 000 000</td><td>6 000 000</td></tr><tr><th scope="row">Variable kostnader</th><td>2 000 000</td><td>1 200 000</td></tr><tr><th scope="row">Betalbare faste kostnader</th><td>1 000 000</td><td>1 000 000</td></tr><tr><th scope="row">Avskrivninger</th><td>2 000 000</td><td>2 600 000</td></tr><tr class="sum"><th scope="row">Driftsresultat</th><td>1 000 000</td><td>1 200 000</td></tr></tbody></table></div>`,
        parts: [
          {
            label: 'a',
            q: `Er prosjektet lønnsomt å gjennomføre, og bør man evt. velge maskin A eller maskin B?`,
            topics: ['toprosjekt', 'prosjekt'],
            answer: `A: NNV = <b>1 031 189</b>, IR = <b>13,51 %</b>. B: NNV = <b>1 063 819</b>, IR = <b>12,87 %</b>. Begge er lønnsomme; velg <b>maskin B</b> (høyest nåverdi).`,
            method: `<p><b>Poenget:</b> fra resultatbudsjett til kontantstrøm. Avskrivninger er ikke kontantstrøm, så kontantstrøm fra drift = driftsresultat + avskrivninger (A: 3 000 000; B: 3 800 000). Arbeidskapital 900 000 ut i år 0 og tilbake i år 5.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Maskin A</th><td>−10 000 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Arbeidskapital</th><td>−900 000</td><td></td><td></td><td></td><td></td><td>900 000</td></tr><tr><th scope="row">Kontantstrøm drift</th><td></td><td>3 000 000</td><td>3 000 000</td><td>3 000 000</td><td>3 000 000</td><td>3 000 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm A</th><td>−10 900 000</td><td>3 000 000</td><td>3 000 000</td><td>3 000 000</td><td>3 000 000</td><td>3 900 000</td></tr></tbody></table></div>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Maskin B</th><td>−13 000 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Arbeidskapital</th><td>−900 000</td><td></td><td></td><td></td><td></td><td>900 000</td></tr><tr><th scope="row">Kontantstrøm drift</th><td></td><td>3 800 000</td><td>3 800 000</td><td>3 800 000</td><td>3 800 000</td><td>3 800 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm B</th><td>−13 900 000</td><td>3 800 000</td><td>3 800 000</td><td>3 800 000</td><td>3 800 000</td><td>4 700 000</td></tr></tbody></table></div>
<ul><li>A: NNV = <b>1 031 189</b>, IR = <b>13,51 %</b></li><li>B: NNV = <b>1 063 819</b>, IR = <b>12,87 %</b></li></ul>
<p>Begge er lønnsomme. LF: «Velger maskin B pga. høyest nåverdi.»</p>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Hvilket avkastningskrav ville gitt identisk nåverdi (NNV)?`,
            topics: ['toprosjekt'],
            answer: `Internrenten på differansen B − A = <b>10,42 %</b>.`,
            method: `<p>Sett opp differansekontantstrømmen B − A og finn internrenten på den. Ved dette avkastningskravet er nåverdien av differansen 0, altså er nåverdiene like.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr class="sum"><th scope="row">B − A</th><td>−3 000 000</td><td>800 000</td><td>800 000</td><td>800 000</td><td>800 000</td><td>800 000</td></tr></tbody></table></div>
<p>IR på differansen = <b>10,42 %</b> («gir lik NNV»).</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 2, weight: 15,
        title: 'Tre obligasjoner: kurs, durasjon, YTM, terminrenter',
        topics: ['obligasjon'],
        text: `<p>Du eier 3 obligasjoner, A, B og C. Alle har pålydende 100 og er risikofrie. Obligasjon A løper ut om 1 år og er utstedt med kupongrente på 5 %. Obligasjon B og C utløper om henholdsvis 2 år og 3 år og er utstedt med kupongrente på henholdsvis 6 % og 7 %.</p>
<p>1-årig spotrente er 4 %, 2-årig spotrente er 4,50 % og 3-årig spotrente er 4,75 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Hva er kurs på obligasjonene?`,
            topics: ['obligasjon'],
            answer: `A = <b>100,96</b>, B = <b>102,84</b>, C = <b>106,23</b>.`,
            method: `<p>Hver kontantstrøm diskonteres med spotrenten for sin løpetid.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0 (kurs)</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody><tr><th scope="row">Obligasjon A</th><td>100,96</td><td>105</td><td></td><td></td></tr><tr><th scope="row">Obligasjon B</th><td>102,84</td><td>6</td><td>106</td><td></td></tr><tr><th scope="row">Obligasjon C</th><td>106,23</td><td>7</td><td>7</td><td>107</td></tr></tbody></table></div>
<div class="formula">A = <span class="frac"><span>105</span><span>1,04</span></span> = <b>100,96</b></div>
<div class="formula">B = <span class="frac"><span>6</span><span>1,04</span></span> + <span class="frac"><span>106</span><span>1,045<sup>2</sup></span></span> = <b>102,84</b></div>
<div class="formula">C = <span class="frac"><span>7</span><span>1,04</span></span> + <span class="frac"><span>7</span><span>1,045<sup>2</sup></span></span> + <span class="frac"><span>107</span><span>1,0475<sup>3</sup></span></span> = <b>106,23</b></div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Beregn durasjon (varighet) på obligasjon C.`,
            topics: ['obligasjon'],
            answer: `Durasjon = <b>2,81 år</b>.`,
            method: `<p>Durasjonen er den nåverdiveide gjennomsnittlige tiden til kontantstrømmene. Nåverdien av C sine kontantstrømmer (diskontert med spotrenter) er 6,73 + 6,41 + 93,09 = 106,23.</p>
<div class="formula">Durasjon = <span class="frac"><span>1 · 6,73 + 2 · 6,41 + 3 · 93,09</span><span>106,23</span></span> = <b>2,81 år</b></div>
<p class="muted small">Egen kontroll: durasjon 2,813 med spotrentevekter og 2,814 med YTM-vekter – samme avrundede svar.</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Hva er YTM (Yield To Maturity) for obligasjon C?`,
            topics: ['obligasjon'],
            answer: `YTM = <b>4,72 %</b>.`,
            method: `<p>YTM er internrenten på obligasjonens kontantstrøm når du kjøper til dagens kurs:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody><tr class="sum"><th scope="row">Obligasjon C</th><td>−106,23</td><td>7</td><td>7</td><td>107</td></tr></tbody></table></div>
<p>Internrente = <b>4,72 %</b>.</p>`,
            src: 'LF'
          },
          {
            label: 'd',
            q: `Hva er 1-årig terminrente mellom år 1 og 2 og mellom år 2 og 3?`,
            topics: ['obligasjon'],
            answer: `Terminrente år 1→2 = <b>5,00 %</b>, år 2→3 = <b>5,25 %</b>.`,
            method: `<p>Terminrenten er den renten som gjør at det å plassere til kort spotrente og så til terminrenten gir samme sluttverdi som å plassere til lang spotrente.</p>
<div class="formula">Terminrente 1→2 = <span class="frac"><span>1,045<sup>2</sup></span><span>1,04</span></span> − 1 = <b>5,00 %</b></div>
<div class="formula">Terminrente 2→3 = <span class="frac"><span>1,0475<sup>3</sup></span><span>1,045<sup>2</sup></span></span> − 1 = <b>5,25 %</b></div>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 3, weight: 30,
        title: 'To aksjer fra kursutfall: systematisk risiko',
        topics: ['portefolje', 'kvm'],
        text: `<p>En investor eier to aksjer, som vi kan kalle for A og B. Kursen på begge er nå 100. Aksje A har følgende forventede utfall om 1 år:</p>
<ul><li>25% sannsynlighet for å være verdt 140</li><li>50% sannsynlighet for å være verdt 110</li><li>25% sannsynlighet for å være verdt 80</li></ul>
<p>For aksje B har vi følgende forventede utfall om 1 år:</p>
<ul><li>25% sannsynlighet for å være verdt 175</li><li>50% sannsynlighet for å være verdt 100</li><li>25% sannsynlighet for å være verdt 65</li></ul>`,
        parts: [
          {
            label: 'a',
            q: `Hva er forventet avkastning for aksje A og aksje B?`,
            topics: ['portefolje'],
            answer: `E(r<sub>A</sub>) = <b>10,00 %</b>, E(r<sub>B</sub>) = <b>10,00 %</b>.`,
            method: `<p>Regn først kursene om til avkastning (kurs i dag er 100):</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Sannsynlighet</th><th>0,25</th><th>0,5</th><th>0,25</th></tr></thead><tbody><tr><th scope="row">Avkastning A</th><td>+40 %</td><td>+10 %</td><td>−20 %</td></tr><tr><th scope="row">Avkastning B</th><td>+75 %</td><td>0 %</td><td>−35 %</td></tr></tbody></table></div>
<div class="formula">E(r) = Σ p<sub>i</sub> · r<sub>i</sub></div>
<p>E(r<sub>A</sub>) = <b>10,00 %</b> og E(r<sub>B</sub>) = <b>10,00 %</b>.</p>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Hva er standardavviket til aksjenes avkastning?`,
            topics: ['portefolje'],
            answer: `A: <b>21,21 %</b> (varians 0,045). B: <b>40,16 %</b> (varians 0,16125).`,
            method: `<div class="formula">Var(r) = Σ p<sub>i</sub> · (r<sub>i</sub> − E(r))<sup>2</sup> &nbsp;&nbsp;&nbsp; σ = √Var(r)</div>
<div class="tablewrap"><table class="data"><thead><tr><th>Aksje</th><th>Varians</th><th>Standardavvik</th></tr></thead><tbody><tr><th scope="row">A</th><td>0,045</td><td>21,21 %</td></tr><tr><th scope="row">B</th><td>0,16125</td><td>40,16 %</td></tr></tbody></table></div>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Anta at begge aksjene er korrekt priset i henhold til kapitalverdimodellen. Kan du si om forskjell i standardavviket mellom A og B skyldes usystematisk eller systematisk risiko? Diskuter.`,
            topics: ['kvm', 'portefolje'],
            answer: `Forskjellen skyldes <b>usystematisk</b> risiko: lik forventet avkastning betyr lik systematisk risiko (beta).`,
            method: `<p>LF (ordrett): «Siden forventet avkastning for A og B er den samme, er systematisk risiko den samme. Høyere standardavvik for B må derfor skyldes usystematisk risiko.»</p>
<p><b>Logikken:</b> I KVM bestemmes forventet avkastning kun av beta. Lik forventet avkastning ⇒ lik beta ⇒ forskjellen i total risiko er usystematisk (diversifiserbar).</p>`,
            src: 'LF'
          },
          {
            label: 'd',
            q: `Anta nå at selskapene opererer i helt ulike markeder slik at kovarians og korrelasjon er 0. Anta at du eier en likeveid portefølje dvs. andel 50 % i aksje A og 50 % i aksje B. Hva blir porteføljens forventede avkastning og standardavvik?`,
            topics: ['portefolje'],
            answer: `E = <b>10,00 %</b>, standardavvik = <b>22,71 %</b>.`,
            method: `<p>Forventet avkastning er veid snitt = <b>10,00 %</b>. Med kovarians 0:</p>
<div class="formula">Var<sub>p</sub> = 0,25 · 0,045 + 0,25 · 0,16125 = 0,0515625 &nbsp;→&nbsp; σ<sub>p</sub> = <b>22,71 %</b></div>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 4, weight: 35,
        title: 'AS Villmark kaffekjele: WACC og NV etter skatt',
        topics: ['kvm', 'skatt'],
        text: `<p>AS Villmark produserer og selger ulike produkter for mennesker som beveger seg mye i skog og mark. Man har nå utviklet en ny kaffekjele som er batteridrevet og ladbar slik at den også kan brukes i perioder det er forbudt å gjøre opp bål i skog og mark.</p>
<p>Hvis prosjektet starter, må man anskaffe nye produksjonsmaskiner, og dette er beregnet å koste 15 000 000. Installasjonskostnadene for maskinene er beregnet til 500 000, og dette beløpet balanseføres (aktiveres) sammen med maskinene. Foreløpig regner man ikke med at anleggsmidlene vil ha noen salgsverdi ved levetidens slutt.</p>
<p>Utstyret avskrives etter saldometoden med 20 % årlig og skattesatsen er 22 %.</p>
<p>AS Villmark vil selge kaffekjelene til distributører for 650 pr. enhet og produksjonskostnadene er 200 pr. enhet. Hvis prosjektet starer vil også arbeidskapitalbehovet øke og man antar at arbeidskapitalen vil utgjøre 25 % av omsetningen.</p>
<p>Det er budsjettert med salg på 8 000 enheter i år 1, 10 000 i år 2, 25 000 i år 3, 25 000 i år 4 og 20 000 ved avslutningen av prosjektet i år 5.</p>
<p>En spesialist fra en annen enhet i selskapet vil midlertidig arbeide med dette prosjektet. Hennes lønn er 650 000 årlig. Det må ansettes to nye personer på midlertidig basis for å ivareta oppgavene som spesialisten hadde. Det er beregnet at samlet lønnskostnad for disse er 1 000 000 årlig. Ved slutten av år 2 vil spesialisten vende tilbake til sin opprinnelige stilling og de midlertidig ansatte vil forlate selskapet.</p>
<p>Kaffekjelene må markedsføres aktivt. Det er budsjettert at markedsføringskostnadene blir 1 500 000 det første året, og deretter 1 000 000 årlig i hele perioden. Hovedkontoret krever at 1 000 000 av selskapets indirekte kostnader må bæres av dette prosjektet årlig, men prosjektet skaper bare 50 % av disse kostnadene.</p>
<p>Risikofri rente er 3 % og AS Villmarkprodukter kan låne penger til en rente på 4,93 % før skatt. Markedsavkastningen er 10 % og selskapets aksjebeta er 1,58. Selskapet er finansiert med 30 % gjeld.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn selskapets veide totalavlastningskrav, WACC.`,
            topics: ['kvm'],
            answer: `r<sub>e</sub> = <b>14,06 %</b>, WACC = <b>11,00 %</b> (10,9956 %).`,
            method: `<div class="formula">r<sub>e</sub> = r<sub>f</sub> + β · (r<sub>m</sub> − r<sub>f</sub>)</div>
<div class="formula">r<sub>e</sub> = 3 % + 1,58 · (10 % − 3 %) = <b>14,06 %</b></div>
<p>30 % gjeld gir 70 % egenkapital:</p>
<div class="formula">WACC = 0,70 · 14,06 % + 0,30 · 4,93 % · (1 − 0,22) = <b>11,00 %</b> (10,9956 %)</div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Beregn prosjektets nåverdi etter skatt. Bør prosjektet gjennomføres?`,
            topics: ['skatt'],
            answer: `Nåverdi etter skatt = <b>1 325 475</b> → prosjektet bør gjennomføres.`,
            method: `<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Omsetning</th><td></td><td>5 200 000</td><td>6 500 000</td><td>16 250 000</td><td>16 250 000</td><td>13 000 000</td></tr><tr><th scope="row">Produksjonskostnader</th><td></td><td>−1 600 000</td><td>−2 000 000</td><td>−5 000 000</td><td>−5 000 000</td><td>−4 000 000</td></tr><tr><th scope="row">Marketing</th><td></td><td>−1 500 000</td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td></tr><tr><th scope="row">Nye ansatte</th><td></td><td>−1 000 000</td><td>−1 000 000</td><td></td><td></td><td></td></tr><tr><th scope="row">Indirekte kostnader (50 %)</th><td></td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td></tr><tr><th scope="row">Resultat før skatt</th><td></td><td>600 000</td><td>2 000 000</td><td>9 750 000</td><td>9 750 000</td><td>7 500 000</td></tr><tr><th scope="row">Skatt 22 %</th><td></td><td>−132 000</td><td>−440 000</td><td>−2 145 000</td><td>−2 145 000</td><td>−1 650 000</td></tr><tr><th scope="row">Arbeidskapital</th><td>−1 300 000</td><td>−325 000</td><td>−2 437 500</td><td>0</td><td>812 500</td><td>3 250 000</td></tr><tr><th scope="row">Anleggsmidler (inkl. installasjon)</th><td>−15 500 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">NV spart skatt avskrivning</th><td>2 200 311</td><td></td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Beregningsgrunnlag (kontantstrøm)</th><td>−14 599 689</td><td>143 000</td><td>−877 500</td><td>7 605 000</td><td>8 417 500</td><td>9 100 000</td></tr></tbody></table></div>
<p>Diskontert med WACC (10,9956 %): <b>nåverdi etter skatt = 1 325 475</b> → prosjektet bør gjennomføres.</p>
<p><b>Metodepunkter i LF:</b></p>
<ul>
<li><b>Installasjon aktiveres:</b> avskrivningsgrunnlaget er 15 500 000.</li>
<li><b>Spesialistens lønn</b> (650 000) er <b>ikke</b> med (betales uansett); relevant er lønn til de to vikarene (1 000 000 i år 1 og 2).</li>
<li>Kun <b>50 %</b> av de fordelte indirekte kostnadene (500 000) er relevante.</li>
<li><b>Arbeidskapital</b> = 25 % av neste års omsetning, bundet året før (år 0: 1 300 000; år 1: +325 000; år 2: +2 437 500; år 4: −812 500; år 5: −3 250 000).</li>
</ul>
<div class="formula">NV spart skatt = <span class="frac"><span>AM · a · s</span><span>r + a</span></span></div>
<div class="formula">NV spart skatt = <span class="frac"><span>15 500 000 · 0,20 · 0,22</span><span>0,109956 + 0,20</span></span> = 2 200 311</div>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Anta nå at anleggsmidlene kan ha en salgsverdi ved levetidens slutt på 1 500 000. Salget skal behandles på den skattemessig gunstigste måte. Hvordan endres nåverdien etter skatt?`,
            topics: ['skatt'],
            answer: `Nåverdien øker med <b>763 962</b> (ny NV ≈ 2 089 437 – egen sum).`,
            method: `<p>Salgssummen nedskrives på saldoen (skattemessig gunstigst), slik at man taper fremtidige avskrivninger.</p>
<div class="formula">NV av salg = <span class="frac"><span>1 500 000</span><span>1,109956<sup>5</sup></span></span> = 890 353</div>
<div class="formula">NV av økt skatt = <span class="frac"><span>1 500 000 · 0,20 · 0,22</span><span>0,309956 · 1,109956<sup>5</sup></span></span> = 126 390</div>
<p><b>Nåverdien øker med 763 962.</b></p>
<p class="muted small">Ny NV ≈ 2 089 437 (egen sum av 1 325 475 + 763 962, ikke oppgitt i LF).</p>`,
            src: 'LF'
          }
        ]
      }
    ]
  });

  /* ==================== Eksamen 2025 ==================== */
  O.exams.push({
    id: '2025',
    year: 2025,
    title: 'Eksamen 2025',
    note: `<p>Fem oppgaver (15 % + 10 % + 25 % + 25 % + 25 %) – ny struktur sammenlignet med tidligere år. Forsiden (varighet og hjelpemidler) var ikke med i kilden; LF-filnavnet tilsier desember 2025.</p>
<p><b>Viktig avvik i oppgave 5b:</b> Det offisielle LF-regnearket bygger på <em>andre forutsetninger</em> enn eksamensteksten (LF: 203 081). Her vises både LF-tabellen og en egen utregning etter oppgaveteksten (≈ 1 190 977), som <b>ikke</b> er offisiell fasit.</p>
<p><b>Oppgave 4:</b> små avrundingsavvik for aksje B mellom LF og egen kontrollregning (standardavvik 7,61 % mot 7,65 %; korrelasjon 0,84 mot 0,83). Konklusjonene er upåvirket. LF bruker KVM <b>uten</b> skattejustering.</p>`,
    tasks: [
      {
        nr: 1, weight: 15,
        title: 'Nytt prosjekt: relevante kostnader og maks maskinpris',
        topics: ['prosjekt', 'folsomhet'],
        text: `<p>En bedrift vurderer å starte et nytt prosjekt, hvor man eventuelt må anskaffe anleggsmidler for 4 000 000. Enkelte data fra kalkylene er gitt under:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr><th scope="row">Pris</th><td>1 400</td><td>1 400</td><td>1 300</td><td>1 200</td></tr><tr><th scope="row">Variabel enh. kostnad</th><td>500</td><td>450</td><td>450</td><td>400</td></tr><tr><th scope="row">Mengde</th><td>2 500</td><td>3 000</td><td>3 000</td><td>2 500</td></tr><tr><th scope="row">Faste kostnader</th><td>2 000 000</td><td>2 000 000</td><td>2 000 000</td><td>2 000 000</td></tr></tbody></table></div>
<p>Bedriften avskriver anleggsmidlene lineært til 0 over levetiden. De faste kostnadene i oppstillingen over består av avskrivninger på 1 000 000 og fordelte faste kostnader fra hovedkontoret på 1 000 000.</p>
<p>Det vil påløpe andre faste kostnader som ikke er med i oppstillingen over på 800 000 årlig. Prosjektet vil også medføre økt arbeidskapital og man antar at arbeidskapitalen vil utgjøre 15 % av omsetningen. Avkastningskravet er 10 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn prosjektets nåverdi og internrente. Er prosjektet lønnsomt?`,
            topics: ['prosjekt'],
            answer: `Nåverdi = <b>972 333</b>, internrente = <b>19,29 %</b> → lønnsomt.`,
            method: `<p><b>Relevante kostnader:</b> De faste kostnadene på 2 000 000 i tabellen er <b>ikke</b> med – avskrivninger er ikke kontantstrøm, og fordelte hovedkontorkostnader er ikke relevante. Kun «andre faste kostnader» på 800 000 er med. Arbeidskapital = 15 % av neste års omsetning, bundet året før.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr><th scope="row">Omsetning</th><td></td><td>3 500 000</td><td>4 200 000</td><td>3 900 000</td><td>3 000 000</td></tr><tr><th scope="row">Variable kostnader</th><td></td><td>−1 250 000</td><td>−1 350 000</td><td>−1 350 000</td><td>−1 000 000</td></tr><tr><th scope="row">Faste kostnader</th><td></td><td>−800 000</td><td>−800 000</td><td>−800 000</td><td>−800 000</td></tr><tr><th scope="row">Arbeidskapital</th><td>−525 000</td><td>−105 000</td><td>45 000</td><td>135 000</td><td>450 000</td></tr><tr><th scope="row">Anleggsmidler</th><td>−4 000 000</td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>−4 525 000</td><td>1 345 000</td><td>2 095 000</td><td>1 885 000</td><td>1 650 000</td></tr></tbody></table></div>
<p>Diskontert med 10 %: <b>nåverdi = 972 333</b>. Internrente = <b>19,29 %</b> → lønnsomt.</p>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Anta at det er mulig å kjøpe en mer avansert maskin som kan gi en mer effektiv produksjon og redusere de variable enhetskostnadene med 50 hvert år. Hvor mye kan man betale for denne maskinen, for at det skal være aktuelt å anskaffe denne?`,
            topics: ['folsomhet'],
            answer: `Maksimalt <b>4 435 677</b> (435 677 mer enn 4 000 000).`,
            method: `<p>Merprisen man kan tåle er nåverdien av kostnadsbesparelsen. Besparelsen er 50 · mengde hvert år:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr class="sum"><th scope="row">Besparelse (50 · mengde)</th><td>125 000</td><td>150 000</td><td>150 000</td><td>125 000</td></tr></tbody></table></div>
<p>Nåverdien med 50 kr lavere variabel enhetskostnad = 1 408 010. Nåverdien øker altså med <b>435 677</b> (besparelsene diskontert med 10 %).</p>
<div class="formula">Maksimal pris = 4 000 000 + 435 677 = <b>4 435 677</b></div>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 2, weight: 10,
        title: 'Grønn obligasjon: kurs, YTM og durasjon',
        topics: ['obligasjon'],
        text: `<p>Du arbeider som analytiker i et investeringsselskap og skal vurdere om du bør investere i en obligasjon. NordEnergi ASA utsteder en trygg, kortsiktig grønn obligasjon for å finansiere investeringer i fornybar energi. Merk at avkastningskravet er lik spotrenten.</p>
<p>Obligasjonsdata:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Obligasjon</th><th>Utsteder</th><th>Pålydende</th><th>Kupongrente</th><th>Løpetid (år)</th><th>Avkastningskrav (markedsrente)</th></tr></thead><tbody><tr><th scope="row">A</th><td>NordEnergi ASA</td><td>1 000</td><td>3 %</td><td>3</td><td>10 %</td></tr></tbody></table></div>`,
        parts: [
          {
            label: 'a',
            q: `Beregn kursen på obligasjonen gitt en markedsrente på 10 %.`,
            topics: ['obligasjon'],
            answer: `Kurs = <b>825,92</b>.`,
            method: `<p>Kontantstrøm: 30, 30, 1 030 (kupong 3 % av 1 000, pluss pålydende i år 3).</p>
<div class="formula">Kurs = <span class="frac"><span>30</span><span>1,1</span></span> + <span class="frac"><span>30</span><span>1,1<sup>2</sup></span></span> + <span class="frac"><span>1 030</span><span>1,1<sup>3</sup></span></span> = <b>825,92</b></div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Beregn avkastning til forfall (YTM) for obligasjonen. Anta at obligasjonen omsettes i dag for kr 850.`,
            topics: ['obligasjon'],
            answer: `YTM = <b>8,92 %</b>.`,
            method: `<p>YTM er internrenten på kontantstrømmen når du kjøper til 850:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody><tr class="sum"><th scope="row">Kontantstrøm</th><td>−850</td><td>30</td><td>30</td><td>1 030</td></tr></tbody></table></div>
<p>Internrente → YTM = <b>8,92 %</b>.</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Beregn ny kurs for obligasjonen dersom avkastningskravet faller til 4 %. Kommenter hvordan kursene påvirkes og hvorfor.`,
            topics: ['obligasjon'],
            answer: `Kurs ved 4 % = <b>972,25</b>. Kursen stiger når renten faller (kommentaren er egen – ikke skrevet i LF).`,
            method: `<p>Diskonter de samme kontantstrømmene (30, 30, 1 030) med 4 %: kurs = <b>972,25</b>.</p>
<p class="muted small">Kommentaren er ikke skrevet i LF. Egen kommentar: Kursen stiger når markedsrenten faller (invers sammenheng), fordi de faste kontantstrømmene diskonteres med en lavere rente. Kursen er under pålydende begge steder fordi kupongen (3 %) er lavere enn avkastningskravet.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'd',
            q: `Beregn durasjonen (Macaulay-durasjon) for obligasjonen ved dagens avkastningskrav på 10 %.`,
            topics: ['obligasjon'],
            answer: `Macaulay-durasjon = <b>2,90 år</b>.`,
            method: `<p>Durasjonen er den nåverdiveide gjennomsnittlige tiden til kontantstrømmene, med kursen 825,92 i nevneren:</p>
<div class="formula">Durasjon = <span class="frac"><span>1 · 30/1,1 + 2 · 30/1,1<sup>2</sup> + 3 · 1 030/1,1<sup>3</sup></span><span>825,92</span></span> = <b>2,90 år</b></div>
<p class="muted small">Egen kontroll: 2,904.</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 3, weight: 25,
        title: 'Forbrukerkreditt hos Power og valg av maskin',
        topics: ['laan', 'levetid'],
        text: `<p class="muted small">Denne oppgaven har ingen felles innledning – hver deloppgave står for seg selv.</p>`,
        parts: [
          {
            label: 'a',
            q: `Hos elektrokjeden Power vurderer du å kjøpe en MacBook Air. Kontantprisen er 15 490. Power tilbyr en rentefri kredittavtale over 6 mnd. Du betaler kun administrasjonsgebyr på 49 månedlig i 6 mnd. med første betaling om 1 måned, og sammen med den første betalingen om 1 måned må du betale et etableringsgebyr på 299. Etter 6 mnd. betaler du maskinen. Hvilken effektiv årsrente innebærer denne avtalen? Angi svaret med 2 desimaler.`,
            topics: ['laan'],
            answer: `Effektiv årsrente = <b>8,00 %</b>.`,
            method: `<p>Sett opp kontantstrømmen per måned sett fra din side. I dag «mottar» du maskinen verdt 15 490; deretter betaler du gebyrer, og til slutt kontantprisen.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Måned</th><th>0</th><th>1</th><th>2–5</th><th>6</th></tr></thead><tbody><tr class="sum"><th scope="row">Kontantstrøm</th><td>15 490</td><td>−348</td><td>−49</td><td>−15 539</td></tr></tbody></table></div>
<p>Måned 1: 49 + 299 = 348. Måned 6: 15 490 + 49 = 15 539.</p>
<p>Effektiv månedsrente (internrente) = 0,64 % → effektiv årsrente = <b>8,00 %</b>.</p>
<div class="formula">Effektiv årsrente = (1 + månedsrente)<sup>12</sup> − 1</div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Som et alternativ til avtalen i a) kan du få en avbetaling over 24 mnd. Du må i då fall betale 767,21 hver måned inklusiv gebyret på 49, og første gang om 1 mnd. Hvilken nominell årsrente legger Power til grunn? Angi svaret med 2 desimaler.`,
            topics: ['laan'],
            answer: `Nominell årsrente = <b>10,48 %</b>.`,
            method: `<p>Nominell rente finnes av terminbeløpet <em>uten</em> gebyr:</p>
<div class="formula">Terminbeløp eks. gebyr = 767,21 − 49 = 718,21</div>
<p>Finn månedsrenten som gjør at nåverdien av 718,21 i 24 måneder blir 15 490: månedsrente = 0,87 % (0,8732 %).</p>
<div class="formula">Nominell årsrente = 12 · månedsrente = <b>10,48 %</b></div>
<p class="muted small">LF kaller raden «Eff og nominell mnd rente».</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Gå ut fra avbetalingen over 24 mnd. fra b). Det påløper nå et etableringsgebyr på 499 som betales sammen med betalingen på 767,21 etter 1 mnd. Hvilken effektiv årsrente innebærer denne avtalen? Angi svaret med 2 desimaler.`,
            topics: ['laan'],
            answer: `Effektiv årsrente = <b>22,56 %</b>.`,
            method: `<p>Nå tas alle gebyrer med i kontantstrømmen:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Måned</th><th>0</th><th>1</th><th>2–24</th></tr></thead><tbody><tr class="sum"><th scope="row">Kontantstrøm</th><td>15 490</td><td>−1 266,21</td><td>−767,21</td></tr></tbody></table></div>
<p>Måned 1: 767,21 + 499 = 1 266,21.</p>
<p>Effektiv månedsrente (internrente) = 1,71 % → effektiv årsrente = <b>22,56 %</b>.</p>`,
            src: 'LF'
          },
          {
            label: 'd',
            q: `<p>En bedrift skifter regelmessig ut en maskin, og nå vurderes 3 maskiner A, B og C. Maskinenes anskaffelseskostnad, levetid og årlige vedlikeholdskostnader er vist i tabellen under:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Maskin</th><th>Kostpris</th><th>Årlig vedlikehold</th><th>Levetid (år)</th></tr></thead><tbody><tr><th scope="row">A</th><td>500 000</td><td>80 000</td><td>5</td></tr><tr><th scope="row">B</th><td>700 000</td><td>50 000</td><td>7</td></tr><tr><th scope="row">C</th><td>900 000</td><td>40 000</td><td>10</td></tr></tbody></table></div>
<p>Hvilken maskin bør man anskaffe? Avkastningskrav er 10 %.</p>`,
            topics: ['levetid'],
            answer: `Årskostnad: A = 211 899, B = 193 784, C = <b>186 471</b> → velg <b>maskin C</b> (lavest årskostnad). Konklusjonen er ikke skrevet ut i LF, men følger av tallene.`,
            method: `<p>Maskinene har ulik levetid og skiftes ut regelmessig. Da kan man ikke sammenligne nåverdiene direkte – man må regne om til <b>årskostnad</b> (ekvivalent annuitet): nåverdien av alle kostnader delt på annuitetsfaktoren for maskinens levetid.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><th scope="row">År 0</th><td>−500 000</td><td>−700 000</td><td>−900 000</td></tr><tr><th scope="row">Årlig år 1–n</th><td>−80 000 (5 år)</td><td>−50 000 (7 år)</td><td>−40 000 (10 år)</td></tr><tr><th scope="row">NV av kostnader (10 %)</th><td>−803 263</td><td>−943 421</td><td>−1 145 783</td></tr><tr class="sum"><th scope="row">Årlig kostnad (annuitet)</th><td>−211 899</td><td>−193 784</td><td>−186 471</td></tr></tbody></table></div>
<p>Konklusjonen er ikke skrevet ut i LF, men tallene gir: <b>velg maskin C</b> (lavest årskostnad, 186 471).</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 4, weight: 25,
        title: 'To aksjer fra kurser: korrelasjon og diversifikasjon',
        topics: ['portefolje'],
        text: `<p>En investor analyserer 2 aksjer som vi kan kalle aksje A og B. I tabellen under ser du kursen for hver aksje i starten og slutten av hver periode, og de tilhørende sannsynlighetene for hvert utfall. Fire eksempel er sannsynligheten for at kursen på aksje A i periode 1 går fra 100 til 120 lik 0,20.</p>
<p>Sannsynlighetene gjelder også de betingede sannsynlighetene, for eksempel at kursen på aksje A skal gå fra 100 til 120 og kursen for aksje B gå fra 50 til 60 samtidig i periode 1, er 0,20.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Periode</th><th>Startkurs aksje A</th><th>Sluttkurs aksje A</th><th>Startkurs aksje B</th><th>Sluttkurs aksje B</th><th>Sann. het</th></tr></thead><tbody><tr><th scope="row">1</th><td>100</td><td>120</td><td>50</td><td>60</td><td>0,20</td></tr><tr><th scope="row">2</th><td>120</td><td>95</td><td>60</td><td>60</td><td>0,30</td></tr><tr><th scope="row">3</th><td>95</td><td>120</td><td>60</td><td>70</td><td>0,15</td></tr><tr><th scope="row">4</th><td>120</td><td>140</td><td>70</td><td>75</td><td>0,35</td></tr></tbody></table></div>
<p><span class="muted small">«Fire eksempel» står slik i originalen – menes «For eksempel».</span></p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn aksjenes forventede avkastning og avkastningens standardavvik.`,
            topics: ['portefolje'],
            answer: `A: E(r) = <b>7,5 %</b>, standardavvik <b>18,83 %</b>. B: E(r) = <b>9,0 %</b>, standardavvik <b>7,61 %</b> (LF; egen kontroll gir 7,65 % for B – godta begge).`,
            method: `<p>Regn først ut avkastningen per periode = sluttkurs/startkurs − 1:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Periode</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr><th scope="row">Sannsynlighet</th><td>0,20</td><td>0,30</td><td>0,15</td><td>0,35</td></tr><tr><th scope="row">Avkastning A</th><td>0,20</td><td>−0,21 (−0,2083)</td><td>0,26 (0,2632)</td><td>0,17 (0,1667)</td></tr><tr><th scope="row">Avkastning B</th><td>0,20</td><td>0,00</td><td>0,17 (0,1667)</td><td>0,07 (0,0714)</td></tr></tbody></table></div>
<div class="formula">E(r) = Σ p<sub>i</sub> · r<sub>i</sub> &nbsp;&nbsp;&nbsp; Var(r) = Σ p<sub>i</sub> · (r<sub>i</sub> − E(r))<sup>2</sup> &nbsp;&nbsp;&nbsp; σ = √Var(r)</div>
<div class="tablewrap"><table class="data"><thead><tr><th>Aksje</th><th>E(r)</th><th>Varians</th><th>Standardavvik</th></tr></thead><tbody><tr><th scope="row">A</th><td>7,5 %</td><td>0,03546</td><td>18,83 %</td></tr><tr><th scope="row">B</th><td>9,0 %</td><td>0,00579</td><td>7,61 %</td></tr></tbody></table></div>
<p class="muted small"><b>Avrundingsavvik for aksje B:</b> Egen kontroll: A stemmer eksakt (E = 7,53 %, varians 0,035460, σ = 18,83 %). For B gir eksakte brøker E = 9,00 %, varians 0,005852 og σ = 7,65 % – altså et lite avvik fra LF (7,61 %) som ikke lar seg reprodusere, sannsynligvis avrunding/detalj i LF-regnearket. Konklusjonene er upåvirket; begge svar bør regnes som riktige.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Anta at det bare er aktuelt å eie en av aksjene alene. Kan du si om den ene eller andre aksjen entydig er å foretrekke?`,
            topics: ['portefolje'],
            answer: `Ja – <b>B</b> er klart å foretrekke: høyere forventet avkastning og lavere standardavvik.`,
            method: `<p>LF (ordrett): «B klart å foretrekke. Høyere avkastning og lavere standardavvik».</p>
<p>B dominerer A: 9,0 % mot 7,5 % i forventet avkastning, og 7,61 % mot 18,83 % i standardavvik.</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Anta at du eier begge aksjene samtidig i en portefølje hvor andelen til hver aksje er 0,5. Hva blir porteføljens forventede avkastning og standardavvik?`,
            topics: ['portefolje'],
            answer: `Forventet avkastning = <b>8,27 %</b>, standardavvik = <b>12,77 %</b> (korrelasjon <b>0,84</b> i LF; egen kontroll 0,83).`,
            method: `<p>Her er kovariansen ikke 0, så den må beregnes fra utfallene:</p>
<div class="formula">Kov(A, B) = Σ p<sub>i</sub> · (r<sub>A,i</sub> − E(r<sub>A</sub>)) · (r<sub>B,i</sub> − E(r<sub>B</sub>))</div>
<p>LF: kovarians 0,01 (vist avrundet), korrelasjon <b>0,84</b>.</p>
<div class="formula">Var<sub>p</sub> = w<sub>A</sub><sup>2</sup> · σ<sub>A</sub><sup>2</sup> + w<sub>B</sub><sup>2</sup> · σ<sub>B</sub><sup>2</sup> + 2 · w<sub>A</sub> · w<sub>B</sub> · Kov(A, B)</div>
<p>50/50: forventet avkastning <b>8,27 %</b>, varians 0,016296209, standardavvik <b>12,77 %</b>.</p>
<p class="muted small">Egen kontroll med eksakte brøker: kovarians 0,011968, korrelasjon 0,831, porteføljevarians 0,016312, σ<sub>p</sub> = 12,77 %. Små avvik fra LF (korrelasjon 0,84 mot 0,83) som følger av avviket for aksje B i a). Standardavviket for porteføljen blir det samme.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'd',
            q: `Hvorfor oppnår man i dette tilfellet en relativt beskjeden diversifikasjonsgevinst ved å eie begge aksjene samtidig?`,
            topics: ['portefolje'],
            answer: `Fordi korrelasjonen mellom aksjene er høy og positiv (0,84).`,
            method: `<p>LF (ordrett): «Lav gevinst pga. høy positiv korrelasjon».</p>
<p>Jo nærmere korrelasjonen er +1, desto mer svinger aksjene i takt, og desto mindre risiko forsvinner når de kombineres.</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 5, weight: 25,
        title: 'AS ABC nytt produkt: WACC og NV etter skatt',
        topics: ['kvm', 'skatt'],
        text: `<p>AS ABC har utviklet et nytt produkt, som man nå vurderer om man skal lansere. Produktet er en videreutvikling av et produkt i et marked hvor man allerede er aktiv. Utviklingskostnadene har beløpt seg til 1 500 000.</p>
<p>Prosjektet vil eventuelt kreve en investering i anleggsmidler på 10 000 000 og levetiden er beregnet til 5 år. Anleggsmidlene avskrives etter saldometoden med 20 % årlig og det er ingen restverdi ved levetidens slutt. Dersom prosjektet starter, regner man med at arbeidskapitalen vil øke med 1 000 000 ved oppstart og videre øke til 1 100 000 i slutten av år 1, for deretter å holde seg konstant inntil den frigjøres ved levetidens slutt.</p>
<p>Salgsvolumet i år 1 er budsjettert til 110 000 enheter, og man forventer at salgsvolumet vil øke med 5 % årlig. Salgsprisen er budsjettert til 60, og man forventer at salgsprisen kan øke med 2 % årlig. De variable enhetskostnadene er budsjettert til 25, og på grunn av gunstige innkjøpsbetingelser regner man ikke med noen økning i enhetskostnadene over tid. Betalbare faste kostnader er budsjettert til 1 020 000 årlig og vil øke med 2 % årlig.</p>
<p>Siden dette er et produkt innen et marked hvor man allerede er aktiv, vil salget av det nye produktet kunne gå ut over salget av et eksisterende produkt. Dette produktet er kalkulert slik:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>1</th><th>2</th></tr></thead><tbody><tr><th scope="row">Pris</th><td>45</td><td>45</td></tr><tr><th scope="row">Var enh k</th><td>20</td><td>20</td></tr><tr><th scope="row">Fast enh k</th><td>10</td><td>10</td></tr><tr class="sum"><th scope="row">Resultat</th><td>15</td><td>15</td></tr></tbody></table></div>
<p>Man regner med at salget av det eksisterende produktet vil falle med 25 000 enheter i år 1 og 20 000 enheter i år 2. Etter år 2, ville dette produktet uansett bli trukket fra markedet.</p>
<p>Bedriftens skattesats er 22 %.</p>
<p>AS ABC finansierer sine prosjekter med 50 % egenkapital og 50 % gjeld. Bedriften kan låne penger til en rente på 5 % før skatt. Risikofri rente er 3 % og markedsavkastningen er 10 %. AS ABC er ikke børsnotert, men et sammenlignbart selskap har en aksjebeta på 1,3.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn ABC AS sitt veide totalavkastningskrav (WACC).`,
            topics: ['kvm'],
            answer: `r<sub>e</sub> = <b>12,10 %</b>, WACC = <b>8,00 %</b>.`,
            method: `<div class="formula">r<sub>e</sub> = r<sub>f</sub> + β · (r<sub>m</sub> − r<sub>f</sub>)</div>
<div class="formula">r<sub>e</sub> = 3 % + 1,3 · (10 % − 3 %) = <b>12,10 %</b></div>
<div class="formula">WACC = r<sub>e</sub> · <span class="frac"><span>E</span><span>E + G</span></span> + r<sub>g</sub> · (1 − s) · <span class="frac"><span>G</span><span>E + G</span></span></div>
<div class="formula">WACC = 0,50 · 12,10 % + 0,50 · 5 % · (1 − 0,22) = <b>8,00 %</b></div>
<p>Denne delen av LF stemmer med oppgaveteksten.</p>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Beregn nåverdi etter skatt. Er prosjektet lønnsomt?`,
            topics: ['skatt'],
            answer: `Beregnet etter oppgaveteksten (<b>ikke offisiell fasit</b>): nåverdi etter skatt ≈ <b>1 190 977</b> → lønnsomt. Det offisielle LF-regnearket viser <b>203 081</b>, men bygger på andre forutsetninger enn eksamensteksten.`,
            method: `<p><b>Advarsel – LF stemmer ikke med oppgaveteksten.</b> Det offisielle LF-regnearket bygger på <em>andre forutsetninger</em> enn eksamensteksten, og LF-tallet kan derfor ikke brukes som fasit på oppgaven slik den står. LF ser ut til å tilhøre en annen/tidligere variant av oppgaven.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Forutsetning</th><th>Eksamensteksten</th><th>LF-regnearket</th></tr></thead><tbody><tr><th scope="row">Volum år 1</th><td>110 000</td><td>100 000</td></tr><tr><th scope="row">Variabel enhetskostnad</th><td>25, ingen økning</td><td>25, øker 3 % årlig</td></tr><tr><th scope="row">Arbeidskapital</th><td>1 000 000 ved oppstart, 1 100 000 fra slutten av år 1</td><td>15 % av omsetningen</td></tr><tr><th scope="row">Kannibalisering av eksisterende produkt</th><td>25 000 / 20 000 tapte enheter i år 1 og 2</td><td>Ikke med</td></tr><tr class="sum"><th scope="row">Nåverdi etter skatt</th><td>≈ 1 190 977 (egen utregning)</td><td>203 081</td></tr></tbody></table></div>

<h4>1. Egen utregning etter oppgaveteksten <span class="muted small">(beregnet etter oppgaveteksten, ikke offisiell fasit)</span></h4>
<p>Utregningen bruker samme metode som LF bruker i alle år, men er <b>ikke hentet fra LF</b> og er ikke verifisert mot noe offisielt løsningsforslag.</p>
<ul>
<li><b>Utviklingskostnader</b> 1 500 000 = sunk cost, ikke med.</li>
<li><b>Kannibalisering:</b> tapt dekningsbidrag på eksisterende produkt = (45 − 20) = 25 per enhet (fast enhetskostnad 10 er ikke relevant). År 1: 25 000 · 25 = 625 000; år 2: 20 000 · 25 = 500 000.</li>
<li><b>Arbeidskapital:</b> −1 000 000 i år 0, −100 000 i år 1, +1 100 000 i år 5.</li>
<li><b>NV spart skatt</b> av saldoavskrivning:</li>
</ul>
<div class="formula">NV spart skatt = <span class="frac"><span>10 000 000 · 0,20 · 0,22</span><span>0,08 + 0,20</span></span> = 1 571 429</div>
<div class="tablewrap"><table class="data"><thead><tr><th>Egen utregning – År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Volum (+5 %)</th><td></td><td>110 000</td><td>115 500</td><td>121 275</td><td>127 339</td><td>133 706</td></tr><tr><th scope="row">Pris (+2 %)</th><td></td><td>60,00</td><td>61,20</td><td>62,42</td><td>63,67</td><td>64,95</td></tr><tr><th scope="row">Omsetning</th><td></td><td>6 600 000</td><td>7 068 600</td><td>7 570 471</td><td>8 107 974</td><td>8 683 640</td></tr><tr><th scope="row">Variable kostnader (25/enhet)</th><td></td><td>−2 750 000</td><td>−2 887 500</td><td>−3 031 875</td><td>−3 183 469</td><td>−3 342 642</td></tr><tr><th scope="row">Faste kostnader (+2 %)</th><td></td><td>−1 020 000</td><td>−1 040 400</td><td>−1 061 208</td><td>−1 082 432</td><td>−1 104 081</td></tr><tr><th scope="row">Tapt DB eksisterende produkt</th><td></td><td>−625 000</td><td>−500 000</td><td></td><td></td><td></td></tr><tr><th scope="row">Resultat før skatt</th><td></td><td>2 205 000</td><td>2 640 700</td><td>3 477 388</td><td>3 842 073</td><td>4 236 917</td></tr><tr><th scope="row">Skatt 22 %</th><td></td><td>−485 100</td><td>−580 954</td><td>−765 025</td><td>−845 256</td><td>−932 122</td></tr><tr><th scope="row">Arbeidskapital</th><td>−1 000 000</td><td>−100 000</td><td></td><td></td><td></td><td>1 100 000</td></tr><tr><th scope="row">Anleggsmidler</th><td>−10 000 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">NV spart skatt avskrivning</th><td>1 571 429</td><td></td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>−9 428 571</td><td>1 619 900</td><td>2 059 746</td><td>2 712 362</td><td>2 996 817</td><td>4 404 795</td></tr></tbody></table></div>
<p><b>Nåverdi etter skatt ved 8 % ≈ 1 190 977</b> → prosjektet er lønnsomt. <span class="muted small">(Beregnet etter oppgaveteksten, ikke offisiell fasit.)</span></p>

<h4>2. LF-regnearket slik det står <span class="muted small">(avvikende forutsetninger)</span></h4>
<div class="tablewrap"><table class="data"><thead><tr><th>LF – År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Volum</th><td></td><td>100 000</td><td>105 000</td><td>110 250</td><td>115 763</td><td>121 551</td></tr><tr><th scope="row">Pris (+2 %)</th><td></td><td>60</td><td>61,20</td><td>62,42</td><td>63,67</td><td>64,95</td></tr><tr><th scope="row">Variabel enhetskostnad (+3 %)</th><td></td><td>25</td><td>25,75</td><td>26,52</td><td>27,32</td><td>28,14</td></tr><tr><th scope="row">Omsetning</th><td></td><td>6 000 000</td><td>6 426 000</td><td>6 882 246</td><td>7 370 885</td><td>7 894 218</td></tr><tr><th scope="row">Variable kostnader</th><td></td><td>−2 500 000</td><td>−2 703 750</td><td>−2 924 106</td><td>−3 162 420</td><td>−3 420 157</td></tr><tr><th scope="row">Faste kostnader (+2 %)</th><td></td><td>−1 020 000</td><td>−1 040 400</td><td>−1 061 208</td><td>−1 082 432</td><td>−1 104 081</td></tr><tr><th scope="row">Resultat før skatt</th><td></td><td>2 480 000</td><td>2 681 850</td><td>2 896 932</td><td>3 126 033</td><td>3 369 980</td></tr><tr><th scope="row">Skatt 22 %</th><td></td><td>−545 600</td><td>−590 007</td><td>−637 325</td><td>−687 727</td><td>−741 396</td></tr><tr><th scope="row">Arbeidskapital (15 % av neste års oms.)</th><td>−900 000</td><td>−63 900</td><td>−68 437</td><td>−73 296</td><td>−78 500</td><td>1 184 133</td></tr><tr><th scope="row">Anleggsmidler</th><td>−10 000 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">NV spart skatt avskrivning</th><td>1 571 429</td><td></td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Beregningsgrunnlag</th><td>−9 328 571</td><td>1 870 500</td><td>2 023 406</td><td>2 186 311</td><td>2 359 806</td><td>3 812 717</td></tr></tbody></table></div>
<p>LF: «Nåverdi etter skatt = <b>203 081</b>». Tallet gjelder LF-variantens forutsetninger; regnestykket er internt konsistent ved 8 % (egen kontroll), men svarer ikke på oppgaven slik den står i eksamensteksten.</p>
<p>Begge utregningene gir positiv nåverdi, så konklusjonen «lønnsomt» er den samme uansett.</p>`,
            src: 'LF+egen'
          }
        ]
      }
    ]
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
