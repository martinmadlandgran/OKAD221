/* Teori og quiz, kapittel 1–6. */
(function (root) {
  'use strict';
  const O = (root.OKAD = root.OKAD || {});
  O.theory = O.theory || []; O.quiz = O.quiz || [];

  /* ===================================================================== */
  /* KAPITTEL 1                                                            */
  /* ===================================================================== */
  O.theory.push({
    nr: 1,
    title: 'Innledning: investering og finansiering',
    examWeight: 'lav',
    summary: `<p>Faget handler om to beslutninger som henger sammen. <strong>Investeringsproblemet</strong> gjelder bedriftens <em>anvendelse</em> av kapital: hvilke prosjekter og anleggsmidler skal vi satse på? <strong>Finansieringsproblemet</strong> gjelder <em>anskaffelsen</em> av kapital: skal investeringene betales med egenkapital eller gjeld? I tillegg kommer styringen av <strong>arbeidskapitalen</strong> (varelager, kundefordringer, kortsiktig gjeld).</p>
<p>Balansen er et nyttig bilde: eiendelssiden (omløpsmidler og anleggsmidler) er «investeringen», mens gjeld og egenkapital er «finansieringen». Tre grunnprinsipper går igjen i hele emnet: (1) <em>tid er penger</em> – en krone i dag er mer verdt enn en krone i framtiden, (2) <em>ikke legg alle eggene i én kurv</em> – risiko kan reduseres ved å spre plasseringene, og (3) <em>du kan narre noen av og til, men ikke alle hele tiden</em> – finansmarkedene er i stor grad effisiente.</p>
<p>Kapittel 1 gir ikke egne regneoppgaver på eksamen, men begrepene brukes overalt. Viktigst å ta med seg: eksamen løses i Excel, og faget læres ved å regne mange oppgaver selv.</p>`,
    concepts: [
      { term: 'Investeringsproblemet', def: `Gjelder bedriftens <strong>anvendelse</strong> av kapital: valg av forretningsområde, størrelsen på investeringsbudsjettet og hvilke prosjekter som skal gjennomføres.` },
      { term: 'Finansieringsproblemet', def: `Gjelder bedriftens <strong>anskaffelse</strong> av kapital: hvordan skaffe penger til investeringene, og hvor mye som skal være egenkapital og gjeld (kapitalstruktur).` },
      { term: 'Balansemodellen', def: `Omløpsmidler + anleggsmidler = kortsiktig gjeld + langsiktig gjeld + egenkapital. Venstre side viser hva kapitalen er brukt til, høyre side hvor den kommer fra.` },
      { term: 'Netto arbeidskapital', def: `Omløpsmidler − kortsiktig gjeld. Den delen av omløpsmidlene som må finansieres langsiktig.` },
      { term: 'Effisient marked', def: `Et marked der relevant informasjon spres raskt og billig og raskt blir innbakt i prisene på finansielle aktiva, for eksempel aksjer.` },
      { term: 'Diversifisering', def: `Å spre plasseringene på flere objekter (f.eks. flere aksjer) for å redusere risiko.` }
    ],
    formulas: [
      { name: 'Balanseligningen', html: `Omløpsmidler + Anleggsmidler = Kortsiktig gjeld + Langsiktig gjeld + Egenkapital`, note: `Eiendelssiden er «investeringen», gjeld og egenkapital er «finansieringen».` },
      { name: 'Netto arbeidskapital', html: `Arbeidskapital = Omløpsmidler − Kortsiktig gjeld`, note: `Brukes i kapittel 2 når kontantstrømmen korrigeres for endring i arbeidskapital.` }
    ],
    methods: [
      { title: 'Slik bør du jobbe med faget', steps: [
        `Regn oppgavene selv i Excel – én oppgave per arkfane, med inndata samlet øverst og formler som peker på inndatacellene.`,
        `Regn noen oppgaver for hånd i starten, slik at du forstår hva Excel-funksjonene faktisk gjør.`,
        `Skriv alltid en kort konklusjon i ord: er prosjektet lønnsomt, og hvorfor?`
      ] }
    ],
    examples: [],
    pitfalls: [
      `Å blande investering (anvendelse av kapital) og finansiering (anskaffelse av kapital).`,
      `Å tro at arbeidskapital er det samme som omløpsmidler – kortsiktig gjeld skal trekkes fra.`
    ],
    excel: [
      { fn: 'Excel på eksamen', use: `Hele eksamen avlegges i Excel. Bygg modellen med et tydelig inndatafelt og la alle beregninger hente tall derfra; da kan du bruke målsøking og endre forutsetninger uten å regne alt på nytt.` }
    ],
    examNotes: `<p>Kapittel 1 gir ikke egne eksamensoppgaver. Begrepene (investering/finansiering, arbeidskapital, tidsverdi, effisiente markeder) er bakgrunn for alt som kommer senere. Bruk tiden på kapittel 2–6, som dekker den faste eksamensoppgaven om prosjektanalyse før skatt.</p>`
  });

  /* ===================================================================== */
  /* KAPITTEL 2                                                            */
  /* ===================================================================== */
  O.theory.push({
    nr: 2,
    title: 'Kontantstrømmer',
    examWeight: 'høy',
    summary: `<p>En investeringsanalyse står og faller med kontantstrømmen. <strong>Prosjektets kontantstrøm</strong> er innbetalinger minus utbetalinger som følge av prosjektet – det som er til disposisjon for kapitaleierne (både eiere og långivere). Derfor skal betalinger <em>til</em> kapitaleierne – renter, avdrag og utbytte – <strong>ikke</strong> med i prosjektets kontantstrøm. Finansieringen tas hensyn til gjennom avkastningskravet.</p>
<p>Regnskapsmessig resultat er ikke det samme som kontantstrøm. Avskrivninger er en kostnad uten utbetaling, inntekter og kostnader periodiseres uavhengig av betalingstidspunktet, og rentekostnader hører til finansieringen. Oppskriften er derfor: start med driftsresultatet, <em>legg til</em> avskrivningene, <em>korriger</em> for endring i arbeidskapital, og ta med kjøp og salg av anleggsmidler.</p>
<p>Bare <strong>endringer</strong> som skyldes prosjektet er relevante (differansekontantstrøm). Allerede brukte penger er <em>sunk cost</em> og skal ikke med. Ressurser prosjektet legger beslag på, verdsettes til <em>alternativkostnaden</em> (f.eks. tapt leieinntekt). Fordelte felleskostnader som ikke endres av prosjektet, er irrelevante, mens tapt dekningsbidrag på eksisterende produkter (kannibalisering) skal med.</p>
<p><strong>Arbeidskapitalen</strong> (varelager, kundefordringer minus leverandørgjeld) uttrykkes ofte som en prosent av omsetningen. Konvensjonen er at behovet for et år bindes <em>året før</em> (arbeidskapital for år 1 betales i år 0), at endringer følger endringer i neste års omsetning, og at alt som står igjen frigjøres i prosjektets siste år.</p>`,
    concepts: [
      { term: 'Prosjektets kontantstrøm', def: `Innbetalinger − utbetalinger som følge av prosjektet, før betalinger til kapitaleierne. Kalles også kontantstrøm til totalkapitalen. Diskonteres med totalkapitalens avkastningskrav.` },
      { term: 'Kontantstrøm til egenkapitalen', def: `Det eierne sitter igjen med etter at långiverne har fått sitt: prosjektets kontantstrøm + låneopptak − avdrag − renter. Diskonteres med egenkapitalens avkastningskrav.` },
      { term: 'Arbeidskapital', def: `Omløpsmidler − kortsiktig gjeld. I prosjektanalyse: kapital bundet i varelager og kundefordringer, fratrukket leverandørgjeld. Økt binding er en utbetaling, frigjøring en innbetaling.` },
      { term: 'Avskrivning', def: `Regnskapsmessig fordeling av anskaffelseskost over levetiden. <strong>Ingen utbetaling</strong> – skal legges tilbake når man går fra resultat til kontantstrøm (før skatt har den ingen kontantstrømeffekt).` },
      { term: 'Sunk cost', def: `Allerede medgåtte (ugjenkallelige) kostnader. De påvirkes ikke av beslutningen og skal ses bort fra.` },
      { term: 'Alternativkostnad', def: `Verdien av den beste alternative anvendelsen av en ressurs prosjektet bruker, f.eks. tapt leieinntekt for egne lokaler eller salgsverdien av utstyr man allerede eier.` },
      { term: 'Differansekontantstrøm', def: `Kontantstrøm <em>med</em> prosjektet minus kontantstrøm <em>uten</em> prosjektet. Bare denne endringen er beslutningsrelevant.` },
      { term: 'Fordelte felleskostnader', def: `Indirekte kostnader (administrasjon, husleie o.l.) som regnskapet fordeler på prosjektet. Irrelevante dersom totalbeløpet ikke endres av prosjektet.` },
      { term: 'Kannibalisering', def: `Det nye produktet reduserer salget av eksisterende produkter. Tapt dekningsbidrag er en relevant negativ kontantstrøm.` },
      { term: 'Realinvestering / finansinvestering', def: `Realinvesteringer er bygg, maskiner, varelager o.l. Finansinvesteringer er aksjer, obligasjoner og bankinnskudd. Immaterielle investeringer er f.eks. forskning og utdanning.` }
    ],
    formulas: [
      { name: 'Prosjektets kontantstrøm fra regnskapstall', html: `Driftsresultat (før renter)<br>+ Avskrivninger<br>= Kontantstrøm fra driften<br>− Økning i arbeidskapital (+ frigjøring)<br>− Investering i anleggsmidler (+ salgssum/restverdi)<br>= <strong>Prosjektets kontantstrøm</strong>`, note: `Brukes når oppgaven gir et resultatbudsjett. Avskrivningene er trukket fra i resultatet og må legges tilbake; rentekostnader skal ikke med.` },
      { name: 'Prosjektets kontantstrøm direkte', html: `CF<sub>t</sub> = M<sub>t</sub> · (P − V) − FK<sub>betalbare</sub> − ΔAK<sub>t</sub> − Investering<sub>t</sub> + Restverdi<sub>t</sub>`, note: `M = mengde, P = pris, V = variable enhetskostnader, FK = betalbare faste kostnader (uten avskrivninger), ΔAK = økning i arbeidskapital som betales på tidspunkt t.` },
      { name: 'Arbeidskapitalbehov og endring', html: `AK<sub>t</sub> = a · Omsetning<sub>t+1</sub> &nbsp;&nbsp;⇒&nbsp;&nbsp; Kontantstrøm<sub>t</sub> = −(AK<sub>t</sub> − AK<sub>t−1</sub>)`, note: `a = arbeidskapitalens andel av omsetningen. Behovet for neste års omsetning bindes nå. I siste år er AK<sub>n</sub> = 0, slik at hele restbeløpet frigjøres.` },
      { name: 'Kontantstrøm til egenkapitalen', html: `CF<sub>EK,t</sub> = Prosjektets kontantstrøm<sub>t</sub> + Låneopptak<sub>t</sub> − Avdrag<sub>t</sub> − Renter<sub>t</sub>`, note: `Før skatt. Serielån: like avdrag og rente av inngående saldo. Annuitetslån: likt terminbeløp.` },
      { name: 'Arbeidskapital fra balansen', html: `Arbeidskapital = Omløpsmidler − Kortsiktig gjeld`, note: `Finn nivået hvert år fra balansebudsjettet og bruk <em>endringen</em> fra år til år.` }
    ],
    methods: [
      { title: 'Slik setter du opp prosjektets kontantstrøm', steps: [
        `Tegn en tidsakse fra år 0 til siste år. Investeringen skjer i år 0; driftskontantstrømmer forutsettes å komme i slutten av hvert år.`,
        `Beregn omsetning (mengde · pris) og variable kostnader for hvert år.`,
        `Trekk fra <strong>betalbare</strong> faste kostnader. Står avskrivninger inne i de faste kostnadene, må de tas ut.`,
        `Gå gjennom opplysningene og merk hver av dem som relevant eller irrelevant: sunk cost og fordelte felleskostnader ut, alternativkostnader og tapt dekningsbidrag inn.`,
        `Beregn arbeidskapitalbehovet (andel · neste års omsetning) og før endringen året før. Frigjør alt i siste år.`,
        `Legg inn investering i år 0 og eventuell salgssum/restverdi i siste år.`,
        `Summer hver kolonne. Kontroll: summen av all arbeidskapital over levetiden skal være 0.`
      ] },
      { title: 'Fra resultat- og balansebudsjett til kontantstrøm', steps: [
        `Beregn arbeidskapitalen hvert år: omløpsmidler − kortsiktig gjeld. Finn endringen (økning = utbetaling).`,
        `Kontantstrøm fra driften = driftsresultat + avskrivninger − økning i arbeidskapital. Rentekostnadene holdes utenfor.`,
        `Kontantstrøm fra anleggsmidler = −kjøp + salg (les av balansen/oppgaven).`,
        `Summer til prosjektets kontantstrøm.`,
        `Kontantstrøm til eierne: legg til låneopptak og trekk fra avdrag (fra balansen) og renter (fra resultatbudsjettet).`
      ] }
    ],
    examples: [
      { title: 'Eksempel: AS Trevare – arbeidskapital som andel av omsetningen', html: `<p>Pris 1 500 per enhet. Salg 6 000 enheter i år 1, 8 000 i år 2 og 3 og 7 000 i år 4. Variable kostnader er 60 % av omsetningen, betalbare faste kostnader 500 000 per år. Anleggsmidler koster 10 000 000 og selges for 1 000 000 i år 4. Arbeidskapitalen er 17,5 % av omsetningen.</p>
<p>Arbeidskapital: 17,5 % av år 1-omsetningen (9 000 000) = 1 575 000 bindes i år 0. Omsetningen øker med 3 000 000 til år 2, altså bindes 525 000 mer i år 1. Fra år 3 til 4 faller omsetningen 1 500 000, så 262 500 frigjøres i år 3. Resten, 17,5 % · 10 500 000 = 1 837 500, frigjøres i år 4.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody>
<tr><th scope="row">Omsetning</th><td></td><td>9 000 000</td><td>12 000 000</td><td>12 000 000</td><td>10 500 000</td></tr>
<tr><th scope="row">Variable kostnader (60 %)</th><td></td><td>−5 400 000</td><td>−7 200 000</td><td>−7 200 000</td><td>−6 300 000</td></tr>
<tr><th scope="row">Betalbare faste kostnader</th><td></td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td></tr>
<tr><th scope="row">Kontantstrøm fra driften</th><td></td><td>3 100 000</td><td>4 300 000</td><td>4 300 000</td><td>3 700 000</td></tr>
<tr><th scope="row">Anleggsmidler</th><td>−10 000 000</td><td></td><td></td><td></td><td>1 000 000</td></tr>
<tr><th scope="row">Endring arbeidskapital</th><td>−1 575 000</td><td>−525 000</td><td>0</td><td>262 500</td><td>1 837 500</td></tr>
<tr><th scope="row">Prosjektets kontantstrøm</th><td>−11 575 000</td><td>2 575 000</td><td>4 300 000</td><td>4 562 500</td><td>6 537 500</td></tr>
</tbody></table></div>
<p>Summen av kontantstrømmen er 6 400 000 – det samme som summen av driftsresultatene (avskrivning 2 250 000 per år gir driftsresultat 850 000, 2 050 000, 2 050 000 og 1 450 000). Totalen er lik, men <strong>tidsplasseringen</strong> er forskjellig, og det er tidsplasseringen som avgjør nåverdien.</p>` },
      { title: 'Eksempel: Fra prosjektets kontantstrøm til kontantstrøm til egenkapitalen', html: `<p>Pris 700, variable enhetskostnader 100, volum 1 000 / 1 200 / 1 000 / 800 i år 1–4. Faste kostnader er oppgitt til 500 000, <em>hvorav avskrivninger 250 000</em>. Arbeidskapital 20 % av neste års omsetning. Anlegg 1 000 000. Prosjektet finansieres delvis med et serielån på 600 000 til 5 % rente over 4 år.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody>
<tr><th scope="row">Omsetning</th><td></td><td>700 000</td><td>840 000</td><td>700 000</td><td>560 000</td></tr>
<tr><th scope="row">Variable kostnader</th><td></td><td>−100 000</td><td>−120 000</td><td>−100 000</td><td>−80 000</td></tr>
<tr><th scope="row">Betalbare faste kostnader</th><td></td><td>−250 000</td><td>−250 000</td><td>−250 000</td><td>−250 000</td></tr>
<tr><th scope="row">Endring arbeidskapital</th><td>−140 000</td><td>−28 000</td><td>28 000</td><td>28 000</td><td>112 000</td></tr>
<tr><th scope="row">Anleggsmidler</th><td>−1 000 000</td><td></td><td></td><td></td><td></td></tr>
<tr><th scope="row">Prosjektets kontantstrøm</th><td>−1 140 000</td><td>322 000</td><td>498 000</td><td>378 000</td><td>342 000</td></tr>
<tr><th scope="row">Låneopptak</th><td>600 000</td><td></td><td></td><td></td><td></td></tr>
<tr><th scope="row">Avdrag</th><td></td><td>−150 000</td><td>−150 000</td><td>−150 000</td><td>−150 000</td></tr>
<tr><th scope="row">Renter (5 % av inngående saldo)</th><td></td><td>−30 000</td><td>−22 500</td><td>−15 000</td><td>−7 500</td></tr>
<tr><th scope="row">Kontantstrøm til egenkapitalen</th><td>−540 000</td><td>142 000</td><td>325 500</td><td>213 000</td><td>184 500</td></tr>
</tbody></table></div>
<p>Legg merke til tre ting: (1) bare 250 000 av de faste kostnadene er betalbare, (2) arbeidskapitalbehovet er 140 000, 168 000, 140 000 og 112 000 ved inngangen til år 1–4, og endringen føres året før, (3) renter og avdrag kommer først inn når vi går fra prosjektets kontantstrøm til eiernes kontantstrøm.</p>` },
      { title: 'Eksempel: Relevante kontantstrømmer – alternativkostnad og kannibalisering', html: `<p>Et nytt produkt selges for 1 500 med dekningsgrad 60 % (variable kostnader 40 %). Volum 2 000 / 2 000 / 2 500 / 2 500 / 1 750. Produksjonen skjer i egne lokaler som ellers kunne vært leid ut for 225 000 per år. Det nye produktet reduserer dekningsbidraget på et eksisterende produkt med 200 000 i år 1 og 2. Lønnskostnadene øker med 100 000 per år. Arbeidskapital 20 % av neste års omsetning, investering 5 000 000, restverdi 700 000 i år 5.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody>
<tr><th scope="row">Salgsinntekter</th><td></td><td>3 000 000</td><td>3 000 000</td><td>3 750 000</td><td>3 750 000</td><td>2 625 000</td></tr>
<tr><th scope="row">Variable kostnader (40 %)</th><td></td><td>−1 200 000</td><td>−1 200 000</td><td>−1 500 000</td><td>−1 500 000</td><td>−1 050 000</td></tr>
<tr><th scope="row">Tapt leieinntekt (alternativkostnad)</th><td></td><td>−225 000</td><td>−225 000</td><td>−225 000</td><td>−225 000</td><td>−225 000</td></tr>
<tr><th scope="row">Tapt dekningsbidrag, eksisterende produkt</th><td></td><td>−200 000</td><td>−200 000</td><td></td><td></td><td></td></tr>
<tr><th scope="row">Økt lønn</th><td></td><td>−100 000</td><td>−100 000</td><td>−100 000</td><td>−100 000</td><td>−100 000</td></tr>
<tr><th scope="row">Kontantstrøm fra driften</th><td></td><td>1 275 000</td><td>1 275 000</td><td>1 925 000</td><td>1 925 000</td><td>1 250 000</td></tr>
<tr><th scope="row">Endring arbeidskapital</th><td>−600 000</td><td>0</td><td>−150 000</td><td>0</td><td>225 000</td><td>525 000</td></tr>
<tr><th scope="row">Anleggsmidler</th><td>−5 000 000</td><td></td><td></td><td></td><td></td><td>700 000</td></tr>
<tr><th scope="row">Prosjektets kontantstrøm</th><td>−5 600 000</td><td>1 275 000</td><td>1 125 000</td><td>1 925 000</td><td>2 150 000</td><td>2 475 000</td></tr>
</tbody></table></div>
<p>Den tapte leien er ingen utbetaling i regnskapet, men den er en reell konsekvens av prosjektet og må med. Arbeidskapitalbehovet er 600 000 / 600 000 / 750 000 / 750 000 / 525 000 ved utgangen av år 0–4 og 0 etter år 5.</p>` },
      { title: 'Eksempel: Hvorfor er sum prosjektkontantstrøm og sum resultat ikke like? (AS Mekanikk)', html: `<p>Et treårig prosjekt har budsjettert resultat 250, 450 og 1 154 (sum 1 854). Prosjektets kontantstrøm er −3 700, 756, 1 700 og 3 470 (sum 2 226), mens kontantstrømmen til egenkapitalen er −1 100, 0, 1 180 og 1 774 (sum 1 854).</p>
<p>Summen av kontantstrømmen til <strong>egenkapitalen</strong> er lik summen av resultatene – over hele levetiden er alt som er resultatført også betalt. Prosjektets kontantstrøm er 372 høyere, og det er nøyaktig rentene som er betalt til långiverne: rentene er en kostnad i resultatet, men er ikke med i prosjektets kontantstrøm, fordi den skal vise hva som er til disposisjon for <em>alle</em> kapitaleierne.</p>` }
    ],
    pitfalls: [
      `<strong>Avskrivninger tas med som utbetaling.</strong> Står det «faste kostnader inkludert avskrivninger», må avskrivningene trekkes ut. Går du fra driftsresultat, må de legges tilbake.`,
      `<strong>Renter og avdrag trekkes fra i prosjektets kontantstrøm.</strong> Finansieringen ligger i avkastningskravet; tar du den med i kontantstrømmen også, teller du den dobbelt.`,
      `<strong>Arbeidskapital i feil år.</strong> Behovet er en prosent av <em>neste</em> års omsetning og bindes året før. Første binding skjer i år 0.`,
      `<strong>Hele arbeidskapitalnivået føres hvert år.</strong> Det er bare <em>endringen</em> som er kontantstrøm.`,
      `<strong>Glemmer å frigjøre arbeidskapitalen</strong> i siste år (og glemmer restverdien på anleggsmidlene).`,
      `<strong>Sunk cost tas med</strong> – markedsundersøkelser, utviklingskostnader eller investeringer som allerede er betalt, påvirker ikke beslutningen.`,
      `<strong>Fordelte felleskostnader tas med</strong> selv om de totale felleskostnadene ikke endres av prosjektet.`,
      `<strong>Alternativkostnader og kannibalisering glemmes</strong> fordi de ikke vises som utbetalinger i regnskapet.`,
      `<strong>Bokført verdi brukes i stedet for salgsverdi.</strong> Det er markedsverdien (hva du faktisk får) som er relevant, ikke kostpris eller bokført verdi.`
    ],
    excel: [
      { fn: 'Oppsett i regneark', use: `Legg inndata (pris, volum, kostnader, arbeidskapitalandel, avkastningskrav) i et eget felt og år 0 til n bortover som kolonner. La alle beregninger referere til inndatacellene, slik at målsøking og følsomhetsanalyse fungerer senere.` },
      { fn: 'Arbeidskapital-rad', use: `Lag én rad for arbeidskapitalbehov (=andel*omsetning neste år, 0 i siste år) og én rad for endring (=−(behov i år − behov året før)). Kontroller at endringsraden summerer til 0.` },
      { fn: 'NNV(rente; verdier)', use: `Når kontantstrømmen er satt opp: <code>=NNV(krav; CF1:CFn) + CF0</code>. Funksjonen diskonterer første verdi én periode, så år 0 må legges til utenfor.` },
      { fn: 'SUMMER(verdier)', use: `Brukes til kontroll: summen av prosjektets kontantstrøm skal være lik summen av driftsresultat før renter når alt er avviklet.` }
    ],
    examNotes: `<p><strong>Kommer hver gang.</strong> Prosjektanalyse før skatt – sett opp kontantstrømmen og beregn NNV og internrente – har vært med på alle de 10 eksamenene 2016–2025 og utgjør typisk 15–25 % av oppgavesettet. Kontantstrømoppsettet er grunnmuren; feil her forplanter seg til alle delspørsmål.</p>
<p>Oppgaveteksten inneholder nesten alltid de samme fellene:</p>
<ul>
<li>et resultatbudsjett der <strong>avskrivningene</strong> er trukket fra – de er ikke kontantstrøm,</li>
<li><strong>fordelte felleskostnader</strong> som ikke påvirkes av prosjektet – irrelevante,</li>
<li>penger som allerede er brukt (<strong>sunk cost</strong>),</li>
<li>en ressurs med <strong>alternativ anvendelse</strong> (lokaler som kunne vært leid ut, utstyr som kunne vært solgt),</li>
<li><strong>arbeidskapital</strong> oppgitt som x % av <em>neste års</em> omsetning – bindes året før og frigjøres siste år.</li>
</ul>
<p>Skriv gjerne én setning om hvorfor du har holdt en post utenfor. Det viser forståelse og gir uttelling selv om et tall skulle bli feil.</p>`
  });

  /* ===================================================================== */
  /* KAPITTEL 3                                                            */
  /* ===================================================================== */
  O.theory.push({
    nr: 3,
    title: 'Renteregning',
    examWeight: 'middels',
    summary: `<p>Renteregning er verktøykassen for resten av faget. Utgangspunktet er <strong>pengenes tidsverdi</strong>: fordi penger kan plasseres og gi avkastning, er et beløp i dag mer verdt enn samme beløp senere. Å regne <strong>sluttverdi</strong> er å flytte et beløp framover i tid med rentesrente; å regne <strong>nåverdi</strong> er det motsatte – å diskontere et framtidig beløp tilbake til i dag.</p>
<p>Fire størrelser henger sammen: nåverdi, sluttverdi, rente og antall perioder. Kjenner du tre, kan du finne den fjerde. Når renten godskrives flere ganger i året, må du skille mellom <strong>nominell</strong> årsrente og <strong>effektiv</strong> årsrente; jo oftere renten legges til, jo høyere blir den effektive renten.</p>
<p>En <strong>annuitet</strong> er en rekke like store beløp med like mellomrom. Nåverdien finnes ved å gange beløpet med annuitetsfaktoren, og den inverse faktoren gjør et engangsbeløp om til like årlige beløp – det er dette som brukes både på annuitetslån og senere på nåverdiannuitet og kritiske verdier. Varer betalingene evig, blir nåverdien ganske enkelt beløpet delt på renten, eventuelt delt på (rente − vekst) hvis beløpet vokser.</p>`,
    concepts: [
      { term: 'Sluttverdi (FV)', def: `Hva et beløp har vokst til etter n perioder med rente i. Også kalt framtidsverdi.` },
      { term: 'Nåverdi (NV)', def: `Hva et framtidig beløp er verdt i dag når det diskonteres med renten i. «Omvendt renteregning».` },
      { term: 'Rentesrente', def: `Renter beregnes også av tidligere opptjente renter. To år til 20 % gir 44 % avkastning, ikke 40 %.` },
      { term: 'Nominell og effektiv rente', def: `Nominell årsrente (NOM) er den oppgitte satsen. Effektiv årsrente (EFF) er den faktiske årlige avkastningen når renten godskrives m ganger per år. Perioderenten er NOM/m.` },
      { term: 'Kontinuerlig forrentning', def: `Grensetilfellet der renten godskrives uendelig ofte. Sluttverdien blir CF<sub>0</sub> · e<sup>i·n</sup>.` },
      { term: 'Annuitet', def: `En rekke like store beløp med like mellomrom. <strong>Etterskuddsannuitet</strong>: betaling i slutten av hver periode (standard). <strong>Forskuddsannuitet</strong>: betaling i begynnelsen av hver periode.` },
      { term: 'Annuitetsfaktor (nåverdifaktor)', def: `Nåverdien av 1 krone per periode i n perioder. Den inverse annuitetsfaktoren gjør en nåverdi om til et likt beløp per periode.` },
      { term: 'Annuitetslån', def: `Lån der <strong>summen av renter og avdrag</strong> (terminbeløpet) er konstant. Rentedelen faller og avdragsdelen øker over tid.` },
      { term: 'Serielån', def: `Lån der <strong>avdraget</strong> er konstant. Rentene faller, så terminbeløpet er høyest i starten.` },
      { term: 'Uendelig annuitet og vekstrekke', def: `Et fast beløp i all framtid har nåverdi CF/i. Vokser beløpet med g per år, er nåverdien CF<sub>1</sub>/(i − g) (Gordons formel).` }
    ],
    formulas: [
      { name: 'Sluttverdi av ett beløp', html: `FV<sub>n</sub> = CF<sub>0</sub> · (1 + i)<sup>n</sup>`, note: `CF<sub>0</sub> = beløp i dag, i = rente per periode, n = antall perioder.` },
      { name: 'Nåverdi av ett beløp', html: `NV = <span class="frac"><span>FV<sub>n</sub></span><span>(1 + i)<sup>n</sup></span></span>`, note: `Diskontering. 1/(1 + i)<sup>n</sup> kalles diskonteringsfaktoren.` },
      { name: 'Ukjent rente', html: `i = (FV<sub>n</sub> / CF<sub>0</sub>)<sup>1/n</sup> − 1`, note: `Gjennomsnittlig årlig avkastning (geometrisk). Excel: RENTE.` },
      { name: 'Ukjent antall perioder', html: `n = <span class="frac"><span>ln(FV<sub>n</sub> / CF<sub>0</sub>)</span><span>ln(1 + i)</span></span>`, note: `Excel: PERIODER.` },
      { name: 'Effektiv rente', html: `EFF = (1 + NOM/m)<sup>m</sup> − 1`, note: `m = antall renteperioder per år. Sluttverdi etter n år: CF<sub>0</sub> · (1 + NOM/m)<sup>m·n</sup>.` },
      { name: 'Kontinuerlig forrentning', html: `FV<sub>n</sub> = CF<sub>0</sub> · e<sup>i·n</sup> &nbsp;&nbsp; EFF = e<sup>i</sup> − 1 &nbsp;&nbsp; i = ln(1 + EFF)`, note: `Brukes når renten godskrives fortløpende.` },
      { name: 'Nåverdi av etterskuddsannuitet', html: `NV = CF · <span class="frac"><span>(1 + i)<sup>n</sup> − 1</span><span>i · (1 + i)<sup>n</sup></span></span>`, note: `Brøken er annuitetsfaktoren A<sub>n,i</sub>. Kan også skrives (1 − (1 + i)<sup>−n</sup>)/i. Første betaling kommer om én periode.` },
      { name: 'Sluttverdi av etterskuddsannuitet', html: `FV = CF · <span class="frac"><span>(1 + i)<sup>n</sup> − 1</span><span>i</span></span>`, note: `Sluttverdifaktoren. Ved forskuddsannuitet ganges resultatet med (1 + i), fordi hvert beløp forrentes én periode ekstra.` },
      { name: 'Annuitetsbeløp (terminbeløp på annuitetslån)', html: `Annuitet = Lån · <span class="frac"><span>i · (1 + i)<sup>n</sup></span><span>(1 + i)<sup>n</sup> − 1</span></span>`, note: `Invers annuitetsfaktor. Samme formel gjør en nåverdi om til nåverdiannuitet (kap. 4 og 6).` },
      { name: 'Uendelig annuitet', html: `NV = <span class="frac"><span>CF</span><span>i</span></span>`, note: `Fast beløp i all framtid, første betaling om ett år.` },
      { name: 'Uendelig vekstrekke (Gordons formel)', html: `NV = <span class="frac"><span>CF<sub>1</sub></span><span>i − g</span></span>`, note: `CF<sub>1</sub> er <strong>neste</strong> periodes betaling, g er årlig vekst, og i må være større enn g.` }
    ],
    methods: [
      { title: 'Slik løser du en renteregningsoppgave', steps: [
        `Tegn en tidslinje og plasser alle beløp på riktig tidspunkt. Avgjør om betalingene kommer i begynnelsen eller slutten av perioden.`,
        `Bestem perioden (år, kvartal, måned) og bruk <strong>perioderenten</strong> og antall <strong>perioder</strong> konsekvent.`,
        `Avgjør hva som er ukjent: nåverdi, sluttverdi, beløp per periode, rente eller antall perioder.`,
        `Velg formel eller Excel-funksjon. Enkeltbeløp: (1 + i)<sup>n</sup>. Like beløp: annuitetsfaktor. Ulike beløp: diskonter hvert beløp for seg (NNV).`,
        `Kontroller svaret med sunn fornuft: nåverdi er lavere enn summen av framtidige beløp, og effektiv rente er høyere enn nominell når m > 1.`
      ] },
      { title: 'Slik setter du opp en nedbetalingsplan', steps: [
        `Annuitetslån: beregn terminbeløpet med invers annuitetsfaktor (Excel: AVDRAG).`,
        `Rente hver termin = perioderente · inngående restlån.`,
        `Avdrag = terminbeløp − rente (annuitetslån), eller lån/n (serielån).`,
        `Utgående restlån = inngående restlån − avdrag. Kontroller at restlånet er 0 etter siste termin.`
      ] }
    ],
    examples: [
      { title: 'Eksempel: Sluttverdi, ukjent rente og ukjent tid', html: `<p><strong>Sluttverdi:</strong> 100 settes i banken til 5 %. Etter to år: 100 · 1,05<sup>2</sup> = 110,25. Omvendt er nåverdien av 110,25 om to år 110,25/1,05<sup>2</sup> = 100.</p>
<p><strong>Ukjent rente:</strong> 100 plassert i et aksjefond har vokst til 395 på 10 år. Årlig avkastning: (395/100)<sup>1/10</sup> − 1 = 0,1473 = <strong>14,73 %</strong>. I Excel: <code>=RENTE(10;0;-100;395)</code>.</p>
<p><strong>Ukjent tid:</strong> Hvor lang tid tar det å doble et innskudd til 7 % rente? n = ln 2 / ln 1,07 = <strong>10,24 år</strong>. I Excel: <code>=PERIODER(7%;0;-100;200)</code>.</p>` },
      { title: 'Eksempel: Nominell og effektiv rente', html: `<p>Nominell årsrente er 5 %. Med halvårlig godskriving blir perioderenten 2,5 % og effektiv rente 1,025<sup>2</sup> − 1 = 5,0625 %.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Renteberegning</th><th>m</th><th>Effektiv rente</th></tr></thead><tbody>
<tr><th scope="row">Årlig</th><td>1</td><td>5,0000 %</td></tr>
<tr><th scope="row">Halvårlig</th><td>2</td><td>5,0625 %</td></tr>
<tr><th scope="row">Kvartalsvis</th><td>4</td><td>5,0945 %</td></tr>
<tr><th scope="row">Månedlig</th><td>12</td><td>5,1162 %</td></tr>
<tr><th scope="row">Daglig</th><td>365</td><td>5,1267 %</td></tr>
<tr><th scope="row">Kontinuerlig</th><td>∞</td><td>5,1271 %</td></tr>
</tbody></table></div>
<p>Et tilsvarende eksempel med 20 % nominell rente og kvartalsvis godskriving: 100 · 1,05<sup>4</sup> = 121,55, altså 21,55 % effektiv rente. Skal du finne den kontinuerlige renten som gir 5 % effektiv årsrente, er svaret ln 1,05 = 4,879 %.</p>` },
      { title: 'Eksempel: Nåverdi og sluttverdi av annuitet', html: `<p>Du mottar 50 000 i slutten av hvert år i 5 år. Renten er 5 %.</p>
<div class="formula">Annuitetsfaktor = <span class="frac"><span>1,05<sup>5</sup> − 1</span><span>0,05 · 1,05<sup>5</sup></span></span> = 4,329477</div>
<p>Nåverdi = 50 000 · 4,329477 = <strong>216 474</strong>. Sluttverdi = 50 000 · (1,05<sup>5</sup> − 1)/0,05 = 50 000 · 5,525631 = <strong>276 282</strong>. Kontroll: 216 474 · 1,05<sup>5</sup> = 276 282.</p>
<p>Med ulike beløp må hvert beløp diskonteres for seg: 25 000, 35 000, 45 000 og 55 000 i år 1–4 til 5 % gir nåverdi 25 000/1,05 + 35 000/1,05<sup>2</sup> + 45 000/1,05<sup>3</sup> + 55 000/1,05<sup>4</sup> = <strong>139 677</strong> og sluttverdi 169 778.</p>` },
      { title: 'Eksempel: Annuitetslån og serielån', html: `<p>Lån 100 000, rente 10 %, 5 år. Terminbeløp på annuitetslånet: 100 000 · 0,263797 = <strong>26 379,75</strong>.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>Terminbeløp</th><th>Rente</th><th>Avdrag</th><th>Restlån</th></tr></thead><tbody>
<tr><th scope="row">1</th><td>26 379,75</td><td>10 000,00</td><td>16 379,75</td><td>83 620,25</td></tr>
<tr><th scope="row">2</th><td>26 379,75</td><td>8 362,03</td><td>18 017,72</td><td>65 602,53</td></tr>
<tr><th scope="row">3</th><td>26 379,75</td><td>6 560,25</td><td>19 819,50</td><td>45 783,03</td></tr>
<tr><th scope="row">4</th><td>26 379,75</td><td>4 578,30</td><td>21 801,44</td><td>23 981,59</td></tr>
<tr><th scope="row">5</th><td>26 379,75</td><td>2 398,16</td><td>23 981,59</td><td>0</td></tr>
</tbody></table></div>
<p>Som <strong>serielån</strong> ville avdraget vært 20 000 hvert år og rentene 10 000, 8 000, 6 000, 4 000 og 2 000. Terminbeløpet faller da fra 30 000 til 22 000, og samlede renter blir 30 000 mot 31 899 på annuitetslånet – serielånet nedbetales raskere i starten.</p>` },
      { title: 'Eksempel: Uendelig annuitet og Gordons formel', html: `<p>20 000 per år i all framtid til 5 % rente har nåverdi 20 000/0,05 = <strong>400 000</strong>. Vokser beløpet med 2 % per år (neste betaling 20 000), blir nåverdien 20 000/(0,05 − 0,02) = <strong>666 667</strong>.</p>
<p><strong>Aksjeverdsetting:</strong> Siste utbytte var 7, og utbyttet ventes å vokse 7 % per år. Avkastningskravet er 12 %. Neste utbytte er 7 · 1,07 = 7,49, og aksjeverdien blir 7,49/(0,12 − 0,07) = <strong>149,80</strong>. Bruker du siste utbytte (7) i telleren, får du 140 – en klassisk feil.</p>` }
    ],
    pitfalls: [
      `<strong>Legger sammen renter uten rentesrente.</strong> To år til 20 % er 44 %, ikke 40 %.`,
      `<strong>Blander årsrente og perioderente.</strong> Ved månedlige betalinger skal du bruke månedsrente og antall måneder.`,
      `<strong>Forveksler nominell og effektiv rente.</strong> Effektiv rente er høyere enn nominell når renten godskrives oftere enn årlig.`,
      `<strong>Feil betalingstidspunkt.</strong> Annuitetsformlene forutsetter etterskuddsbetaling. Forskuddsannuitet gir (1 + i) ganger høyere nåverdi og sluttverdi.`,
      `<strong>Gordons formel med siste i stedet for neste betaling.</strong> Telleren er betalingen om ett år.`,
      `<strong>Excel-funksjonen AVDRAG</strong> gir hele terminbeløpet (renter + avdrag), ikke avdraget alene. Avdragsdelen heter AMORT og rentedelen RAVDRAG.`,
      `<strong>Fortegn i Excel.</strong> Finansfunksjonene ser inn- og utbetalinger med motsatt fortegn; legg inn nåverdi med minus for å få positivt svar.`
    ],
    excel: [
      { fn: 'SLUTTVERDI(rente; antall_innbet; betaling; nåverdi)', use: `Sluttverdi av en annuitet og/eller et engangsbeløp. Eksempel: <code>=SLUTTVERDI(5%;5;-50000)</code> gir 276 282.` },
      { fn: 'NÅVERDI(rente; antall_innbet; betaling; sluttverdi)', use: `Nåverdi av en <em>annuitet</em> (og eventuelt et sluttbeløp, f.eks. pålydende på en obligasjon). Eksempel: <code>=NÅVERDI(5%;5;-50000)</code> gir 216 474.` },
      { fn: 'NNV(rente; verdier)', use: `Nåverdi av en vilkårlig kontantstrøm. Første verdi diskonteres én periode, så beløp på tidspunkt 0 legges til utenfor funksjonen.` },
      { fn: 'AVDRAG(rente; antall_innbet; nåverdi)', use: `Terminbeløpet på et annuitetslån (renter + avdrag). Eksempel: <code>=AVDRAG(10%;5;-100000)</code> gir 26 379,75. Brukes også til å gjøre en nåverdi om til en annuitet.` },
      { fn: 'RAVDRAG / AMORT', use: `RAVDRAG gir rentedelen og AMORT avdragsdelen av terminbeløpet i en bestemt periode.` },
      { fn: 'RENTE(antall_innbet; betaling; nåverdi; sluttverdi)', use: `Finner ukjent rente. Eksempel: <code>=RENTE(10;0;-100;395)</code> gir 14,73 %.` },
      { fn: 'PERIODER(rente; betaling; nåverdi; sluttverdi)', use: `Finner ukjent antall perioder. Eksempel: <code>=PERIODER(7%;0;-100;200)</code> gir 10,24.` },
      { fn: 'EFFEKTIV.RENTE(nominell_rente; perioder)', use: `Effektiv årsrente fra nominell rente og antall renteperioder per år. Eksempel: <code>=EFFEKTIV.RENTE(5%;2)</code> gir 5,0625 %.` }
    ],
    examNotes: `<p>Rene renteregningsoppgaver har vært gitt som egen oppgave to ganger (mars 2017 og 2025 oppg. 3a–c, effektiv og nominell rente på forbrukerkreditt). Likevel er dette kapitlet forutsetningen for nesten alt annet: nåverdi og internrente (10 av 10 eksamener), nåverdiannuitet og kritiske verdier (6 av 10), ekvivalent annuitet (mars 2017, 2020, 2021, 2023), lån og obligasjoner.</p>
<p>Det du må kunne på rams, er å diskontere en kontantstrøm, bruke annuitetsfaktoren begge veier (beløp → nåverdi og nåverdi → årlig beløp), og regne mellom nominell og effektiv rente. Eksamen løses i Excel, så øv på NNV, AVDRAG, RENTE, PERIODER og NÅVERDI – og husk at AVDRAG gir hele terminbeløpet.</p>`
  });

  /* ===================================================================== */
  /* KAPITTEL 4                                                            */
  /* ===================================================================== */
  O.theory.push({
    nr: 4,
    title: 'Lønnsomhetsberegninger og obligasjoner',
    examWeight: 'høy',
    summary: `<p><strong>Netto nåverdi (NNV)</strong> er fagets hovedmetode. Alle kontantstrømmer diskonteres med avkastningskravet og summeres. NNV viser hvor mye eiernes formue øker i dagens kroner hvis prosjektet gjennomføres: avkastningskravet er dekket, og NNV er det som blir til overs. Avkastningskravet består av risikofri rente pluss en risikopremie, og for prosjektets kontantstrøm brukes et veid gjennomsnitt av kravet til egenkapitalen og lånerenten (WACC).</p>
<p><strong>Internrenten (IR)</strong> er avkastningskravet som gir NNV = 0 – prosjektets avkastning i prosent. Et uavhengig prosjekt er lønnsomt når IR er høyere enn avkastningskravet, og da gir NNV og IR samme konklusjon. Men IR kan gi feil <em>rangering</em> når prosjektene er gjensidig utelukkende og har ulik størrelse, ulik levetid eller ulik tidsprofil, og den kan gi flere svar når kontantstrømmen skifter fortegn mer enn én gang. Løsningen er <strong>differanseinvesteringen</strong>: trekk det lille prosjektet fra det store og beregn internrenten på differansen. Denne renten er også det avkastningskravet som gir de to prosjektene lik nåverdi (krysningspunktet mellom nåverdiprofilene, ofte kalt Fisher-renten).</p>
<p><strong>Nåverdiannuiteten</strong> fordeler nåverdien som et likt årlig beløp over levetiden. Den brukes til å sammenligne alternativer med ulik levetid som gjentas (årskostnad), til å finne optimal utskiftingstid i en investeringskjede, og til å finne «hvilket årlig beløp gir samme nåverdi». Ved en <em>engangsinvestering</em> velges levetiden med høyest NNV; i en <em>investeringskjede</em> velges levetiden med høyest nåverdiannuitet.</p>
<p><strong>Obligasjoner</strong> (kun ØKAD 221) er omsettelige lån. Kursen er nåverdien av kuponger og pålydende, diskontert med spotrentene for hver løpetid. <strong>Yield to maturity (YTM)</strong> er internrenten i obligasjonens kontantstrøm. Kurs og rente beveger seg motsatt vei: stiger markedsrenten, faller kursen. <strong>Durasjonen</strong> – den tidsveide gjennomsnittlige løpetiden – forteller hvor følsom kursen er, og modifisert durasjon (volatilitet) gir omtrentlig prosentvis kursendring per prosentpoeng renteendring.</p>`,
    concepts: [
      { term: 'Netto nåverdi (NNV)', def: `Nåverdien av alle framtidige kontantstrømmer minus investeringen. Et <strong>absolutt</strong> lønnsomhetsmål som viser eiernes formuesøkning.` },
      { term: 'Avkastningskrav', def: `Den avkastningen kapitalen minst må gi: risikofri rente + risikopremie. For prosjektets kontantstrøm brukes veid gjennomsnitt av egenkapitalkostnad og lånerente (WACC).` },
      { term: 'Internrente (IR)', def: `Det avkastningskravet som gir NNV = 0. Et <strong>relativt</strong> mål – avkastningen i prosent på kapitalen som er bundet i prosjektet.` },
      { term: 'Nåverdiprofil', def: `Graf som viser NNV som funksjon av avkastningskravet. Krysser x-aksen ved internrenten.` },
      { term: 'Uavhengige og gjensidig utelukkende prosjekter', def: `Uavhengige prosjekter kan gjennomføres hver for seg. Gjensidig utelukkende prosjekter konkurrerer – bare ett kan velges, og det skal være det med høyest NNV.` },
      { term: 'Differanseinvestering', def: `Kontantstrømmen til det største prosjektet minus kontantstrømmen til det minste. Er internrenten på differansen høyere enn avkastningskravet, lønner det seg å velge det største.` },
      { term: 'Krysningsrente (Fisher-rente)', def: `Avkastningskravet der to prosjekter har lik NNV. Er lik internrenten til differanseinvesteringen.` },
      { term: 'Nåverdiannuitet', def: `NNV fordelt som et likt årlig beløp over levetiden: NNV delt på annuitetsfaktoren. Kalles også ekvivalent annuitet; for rene kostnader «årskostnad».` },
      { term: 'Økonomisk levetid', def: `Den levetiden som er mest lønnsom, i motsetning til teknisk levetid. Engangsinvestering: maksimer NNV. Investeringskjede: maksimer nåverdiannuiteten.` },
      { term: 'Obligasjon, pålydende og kupongrente', def: `En obligasjon er et omsettelig gjeldspapir. Pålydende er lånebeløpet som tilbakebetales ved forfall. Kupongrenten er den faste renten av pålydende som betales periodisk. Kurs oppgis ofte i prosent av pålydende.` },
      { term: 'Nullkupongobligasjon', def: `Obligasjon uten rentebetalinger. Avkastningen kommer av at den selges til kurs under pålydende. Durasjonen er lik løpetiden.` },
      { term: 'Spotrente', def: `Renten fra i dag og fram til et bestemt tidspunkt, f.eks. i<sub>3</sub> = treårsrenten. Spotrentene for ulike løpetider utgjør rentenes terminstruktur (rentekurven).` },
      { term: 'Terminrente', def: `Renten for en framtidig periode, avledet av dagens spotrenter. <sub>1</sub>f<sub>2</sub> er renten mellom år 1 og år 2.` },
      { term: 'Yield to maturity (YTM)', def: `Avkastning fram til forfall, også kalt effektiv rente: den ene diskonteringsrenten som gjør nåverdien av obligasjonens betalinger lik kursen – altså internrenten.` },
      { term: 'Durasjon (Macaulay)', def: `Tidsveid gjennomsnittlig løpetid, der hver betalings vekt er dens andel av obligasjonens nåverdi. Måles i år og er et mål på renterisiko.` },
      { term: 'Modifisert durasjon (volatilitet)', def: `Durasjon delt på (1 + yield). Angir omtrentlig prosentvis kursendring når renten endres ett prosentpoeng.` },
      { term: 'Kursrisiko og kredittrisiko', def: `Kursrisiko (renterisiko): kursen endres når rentenivået endres – gjelder også statsobligasjoner. Kredittrisiko: fare for at utsteder ikke betaler – gjelder foretaksobligasjoner.` }
    ],
    formulas: [
      { name: 'Netto nåverdi', html: `NNV = −CF<sub>0</sub> + Σ<sub>t=1…n</sub> <span class="frac"><span>CF<sub>t</sub></span><span>(1 + i)<sup>t</sup></span></span>`, note: `CF<sub>0</sub> = investering på tidspunkt 0, CF<sub>t</sub> = kontantstrøm i år t, i = avkastningskrav, n = levetid. NNV > 0 betyr lønnsomt.` },
      { name: 'Avkastningskrav til totalkapitalen (før skatt)', html: `i = <span class="frac"><span>EK</span><span>EK + G</span></span> · i<sub>EK</sub> + <span class="frac"><span>G</span><span>EK + G</span></span> · i<sub>G</sub>`, note: `Veid gjennomsnitt (WACC). Eksempel: 50 % egenkapital til 14 % og 50 % gjeld til 6 % gir 10 %.` },
      { name: 'Internrente', html: `−CF<sub>0</sub> + Σ<sub>t=1…n</sub> <span class="frac"><span>CF<sub>t</sub></span><span>(1 + IR)<sup>t</sup></span></span> = 0`, note: `Løses ved prøving og feiling eller IR-funksjonen i Excel. Lønnsomt hvis IR > avkastningskravet.` },
      { name: 'Differanseinvestering', html: `CF<sub>t</sub>(B − A) = CF<sub>t</sub>(B) − CF<sub>t</sub>(A) &nbsp;&nbsp;⇒&nbsp;&nbsp; IR<sub>B−A</sub> løser NNV<sub>B</sub> = NNV<sub>A</sub>`, note: `B er det største prosjektet. IR<sub>B−A</sub> > i ⇒ velg B. IR<sub>B−A</sub> < i ⇒ velg A. Nåverdiene er additive: NNV(B − A) = NNV(B) − NNV(A).` },
      { name: 'Nåverdiannuitet (ekvivalent annuitet)', html: `Annuitet = NNV · <span class="frac"><span>i · (1 + i)<sup>n</sup></span><span>(1 + i)<sup>n</sup> − 1</span></span> = <span class="frac"><span>NNV</span><span>A<sub>n,i</sub></span></span>`, note: `A<sub>n,i</sub> = annuitetsfaktoren. Gir det like årlige beløpet som har samme nåverdi som prosjektet.` },
      { name: 'Årskostnad', html: `Årskostnad = <span class="frac"><span>NV(kostnader)</span><span>A<sub>n,i</sub></span></span>, &nbsp; NV(kostnader) = Investering + NV(driftskostnader) − NV(restverdi)`, note: `Brukes når alternativene har ulik levetid og skal gjentas. Velg lavest årskostnad.` },
      { name: 'Obligasjonskurs fra spotrenter', html: `Kurs = Σ<sub>t=1…n</sub> <span class="frac"><span>CF<sub>t</sub></span><span>(1 + i<sub>t</sub>)<sup>t</sup></span></span> = <span class="frac"><span>K</span><span>1 + i<sub>1</sub></span></span> + <span class="frac"><span>K</span><span>(1 + i<sub>2</sub>)<sup>2</sup></span></span> + … + <span class="frac"><span>K + P</span><span>(1 + i<sub>n</sub>)<sup>n</sup></span></span>`, note: `K = kupong (kupongrente · pålydende), P = pålydende, i<sub>t</sub> = spotrenten for løpetid t. Hver betaling diskonteres med «sin» spotrente.` },
      { name: 'Yield to maturity (YTM)', html: `Kurs = Σ<sub>t=1…n</sub> <span class="frac"><span>CF<sub>t</sub></span><span>(1 + y)<sup>t</sup></span></span>`, note: `y = YTM = internrenten i kontantstrømmen (−kurs, kuponger, kupong + pålydende). Kupongrente > y ⇒ kurs over pålydende; kupongrente < y ⇒ kurs under pålydende.` },
      { name: 'Spotrente fra nullkupongobligasjon', html: `i<sub>t</sub> = (Pålydende / Kurs)<sup>1/t</sup> − 1`, note: `En nullkupongobligasjon har bare én betaling, så spotrenten kan leses direkte av kursen.` },
      { name: 'Terminrente', html: `(1 + i<sub>n</sub>)<sup>n</sup> = (1 + i<sub>n−1</sub>)<sup>n−1</sup> · (1 + <sub>n−1</sub>f<sub>n</sub>) &nbsp;&nbsp;⇒&nbsp;&nbsp; <sub>n−1</sub>f<sub>n</sub> = <span class="frac"><span>(1 + i<sub>n</sub>)<sup>n</sup></span><span>(1 + i<sub>n−1</sub>)<sup>n−1</sup></span></span> − 1`, note: `Å plassere i n år til spotrenten skal gi det samme som å plassere i n − 1 år og deretter ett år til terminrenten.` },
      { name: 'Macaulay-durasjon', html: `D = <span class="frac"><span>Σ<sub>t=1…n</sub> t · NV(CF<sub>t</sub>)</span><span>Kurs</span></span> = Σ<sub>t=1…n</sub> t · w<sub>t</sub>, &nbsp; w<sub>t</sub> = <span class="frac"><span>NV(CF<sub>t</sub>)</span><span>Kurs</span></span>`, note: `Vektene w<sub>t</sub> er hver betalings andel av kursen og summerer til 1. Nåverdiene beregnes med obligasjonens yield (eller spotrentene – forskjellen er minimal).` },
      { name: 'Modifisert durasjon (volatilitet)', html: `Volatilitet = <span class="frac"><span>D</span><span>1 + y</span></span>`, note: `Kursfølsomhet for renteendringer.` },
      { name: 'Omtrentlig kursendring', html: `<span class="frac"><span>ΔKurs</span><span>Kurs</span></span> ≈ −Volatilitet · Δy`, note: `Δy i prosentpoeng gir kursendring i prosent. Tilnærmingen er god for små renteendringer; på grunn av konveksitet faller kursen litt mindre og stiger litt mer enn anslaget.` }
    ],
    methods: [
      { title: 'Slik beregner du NNV og internrente', steps: [
        `Sett opp prosjektets kontantstrøm (kapittel 2) fra år 0 til n.`,
        `Bestem avkastningskravet. Bruker du prosjektets kontantstrøm, skal kravet være totalkapitalens (veid gjennomsnitt).`,
        `NNV: <code>=NNV(krav; CF1:CFn) + CF0</code>.`,
        `Internrente: <code>=IR(CF0:CFn)</code>.`,
        `Konkluder i ord: «NNV er positiv / IR er høyere enn avkastningskravet, prosjektet er lønnsomt og øker eiernes formue med NNV.»`
      ] },
      { title: 'Slik velger du mellom to gjensidig utelukkende prosjekter', steps: [
        `Beregn NNV og IR for begge. Velg i utgangspunktet prosjektet med <strong>høyest NNV</strong>.`,
        `Rangerer NNV og IR ulikt, forklar hvorfor (ulik størrelse, levetid eller tidsprofil) og vis det med differanseinvesteringen.`,
        `Lag differansekontantstrømmen: størst minus minst, år for år.`,
        `Beregn internrenten på differansen. Er den høyere enn avkastningskravet, velges det største prosjektet.`,
        `Spør oppgaven «hvilket avkastningskrav gir lik nåverdi?», er svaret nettopp differanseinvesteringens internrente. Under denne renten er det største prosjektet best, over den det minste.`
      ] },
      { title: 'Slik finner du optimal økonomisk levetid', steps: [
        `For hver mulig levetid: sett opp kontantstrømmen med driftskontantstrøm til og med avslutningsåret, og legg salgs-/utrangeringsverdien til i avslutningsåret.`,
        `Beregn NNV for hvert alternativ.`,
        `Engangsinvestering (gjentas ikke): velg levetiden med høyest NNV.`,
        `Investeringskjede (skiftes ut med tilsvarende utstyr): gjør hver NNV om til nåverdiannuitet og velg levetiden med høyest annuitet.`
      ] },
      { title: 'Slik løser du en obligasjonsoppgave', steps: [
        `Sett opp kontantstrømmen: kupong hvert år og kupong + pålydende ved forfall.`,
        `Kurs: diskonter hver betaling med spotrenten for sin løpetid og summer.`,
        `YTM: bruk IR på kontantstrømmen (−kurs, kuponger, kupong + pålydende).`,
        `Terminrenter: bruk sammenhengen (1 + i<sub>n</sub>)<sup>n</sup> = (1 + i<sub>n−1</sub>)<sup>n−1</sup>(1 + f).`,
        `Durasjon: lag en rad med nåverdien av hver betaling, gang med tidspunktet, summer og del på kursen.`,
        `Ny kurs ved renteendring: regn kursen på nytt med ny rente, og kommenter at kursen faller når renten stiger – mest for obligasjoner med lang durasjon.`
      ] }
    ],
    examples: [
      { title: 'Eksempel: NNV, internrente og økonomisk tolkning', html: `<p>Investering 10 000 000, levetid 3 år. Omsetning 7, 12 og 9 millioner. Lønn 25 % og materialer 15 % av omsetningen, betalbare faste kostnader 1 000 000. Finansiering: 50 % egenkapital (krav 14 %) og 50 % gjeld (6 %), som gir avkastningskrav 0,5 · 14 % + 0,5 · 6 % = 10 %.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody>
<tr><th scope="row">Omsetning</th><td></td><td>7 000 000</td><td>12 000 000</td><td>9 000 000</td></tr>
<tr><th scope="row">Lønn og materialer (40 %)</th><td></td><td>−2 800 000</td><td>−4 800 000</td><td>−3 600 000</td></tr>
<tr><th scope="row">Faste kostnader</th><td></td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td></tr>
<tr><th scope="row">Kontantstrøm</th><td>−10 000 000</td><td>3 200 000</td><td>6 200 000</td><td>4 400 000</td></tr>
<tr><th scope="row">Nåverdi (10 %)</th><td>−10 000 000</td><td>2 909 091</td><td>5 123 967</td><td>3 305 785</td></tr>
</tbody></table></div>
<p><strong>NNV = 1 338 843</strong> og <strong>IR = 17,07 %</strong>. Prosjektet er lønnsomt etter begge kriterier.</p>
<p><strong>Tolkning:</strong> Eierne kunne lånt 11 338 843 til 10 %, satt 10 000 000 i prosjektet og beholdt 1 338 843 selv. Kontantstrømmen betaler lånet nøyaktig ned: 11 338 843 · 1,1 − 3 200 000 = 9 272 727; 9 272 727 · 1,1 − 6 200 000 = 4 000 000; 4 000 000 · 1,1 − 4 400 000 = 0. NNV er altså formuesøkningen i dag, etter at avkastningskravet er dekket.</p>
<p><strong>Ekvivalent annuitet:</strong> Hvilket likt årlig beløp i tre år gir samme nåverdi? 1 338 843 / 2,486852 = <strong>538 369</strong> per år.</p>` },
      { title: 'Eksempel: To gjensidig utelukkende prosjekter og differanseinvestering', html: `<p>Et rederi velger mellom to båter over 4 år, avkastningskrav 15 %. Havblikk koster 4 500 000 og gir 1 000 000 per år pluss restverdi 3 600 000. Huldra koster 8 000 000 og gir 1 750 000 per år pluss restverdi 6 000 000.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>NNV (15 %)</th><th>IR</th></tr></thead><tbody>
<tr><th scope="row">Havblikk</th><td>−4 500 000</td><td>1 000 000</td><td>1 000 000</td><td>1 000 000</td><td>4 600 000</td><td>413 290</td><td>18,4 %</td></tr>
<tr><th scope="row">Huldra</th><td>−8 000 000</td><td>1 750 000</td><td>1 750 000</td><td>1 750 000</td><td>7 750 000</td><td>426 732</td><td>17,0 %</td></tr>
<tr><th scope="row">Huldra − Havblikk</th><td>−3 500 000</td><td>750 000</td><td>750 000</td><td>750 000</td><td>3 150 000</td><td>13 442</td><td>15,1 %</td></tr>
</tbody></table></div>
<p>IR peker på Havblikk, NNV på Huldra. Differanseinvesteringen – de ekstra 3 500 000 Huldra koster – gir 15,1 %, som er (så vidt) høyere enn kravet på 15 %. <strong>Velg Huldra.</strong> Kontroll: 426 732 − 413 290 = 13 442.</p>
<p>15,1 % er også svaret på «hvilket avkastningskrav gir de to prosjektene lik nåverdi?». Er kravet lavere enn 15,1 %, er Huldra best; er det høyere, er Havblikk best.</p>
<p>Et enklere talleksempel: A (−200 000, +260 000) har IR 30 % og NNV 36 364 ved 10 %; B (−400 000, +500 000) har IR 25 % og NNV 54 545. Differansen (−200 000, +240 000) har IR 20 % > 10 %, så B velges. Nåverdiprofilene krysser ved 20 %.</p>` },
      { title: 'Eksempel: Optimal økonomisk levetid', html: `<p>En maskin koster 400 000. Driftskontantstrømmen er 300 000, 350 000, 320 000, 300 000 og 200 000 i år 1–5, og utrangeringsverdien er 350 000, 300 000, 250 000, 200 000 og 100 000 etter henholdsvis 1–5 år. Avkastningskrav 12 %.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Levetid</th><th>År 1</th><th>År 2</th><th>År 3</th><th>År 4</th><th>År 5</th><th>NNV</th><th>Nåverdiannuitet</th></tr></thead><tbody>
<tr><th scope="row">1 år</th><td>650 000</td><td></td><td></td><td></td><td></td><td>180 357</td><td>202 000</td></tr>
<tr><th scope="row">2 år</th><td>300 000</td><td>650 000</td><td></td><td></td><td></td><td>386 033</td><td>228 415</td></tr>
<tr><th scope="row">3 år</th><td>300 000</td><td>350 000</td><td>570 000</td><td></td><td></td><td>552 590</td><td>230 070</td></tr>
<tr><th scope="row">4 år</th><td>300 000</td><td>350 000</td><td>320 000</td><td>500 000</td><td></td><td>692 404</td><td>227 963</td></tr>
<tr><th scope="row">5 år</th><td>300 000</td><td>350 000</td><td>320 000</td><td>300 000</td><td>300 000</td><td>735 528</td><td>204 043</td></tr>
</tbody></table></div>
<p>I avslutningsåret er kontantstrømmen driftskontantstrøm + utrangeringsverdi (f.eks. 320 000 + 250 000 = 570 000 ved 3 års levetid). Investeringen i år 0 er −400 000 i alle alternativene.</p>
<p><strong>Engangsinvestering:</strong> behold maskinen i 5 år (høyest NNV, 735 528). <strong>Investeringskjede:</strong> skift ut hvert 3. år (høyest nåverdiannuitet, 230 070). Når maskinen kan erstattes med en ny og like god, lønner det seg ikke å beholde den gamle i de svake siste årene.</p>` },
      { title: 'Eksempel: Årskostnad ved ulik levetid', html: `<p>To maskiner gjør samme jobb og skiftes ut regelmessig. Avkastningskrav 10 %. Maskin A koster 270 000, varer 4 år, har driftskostnader 100 000 per år og utrangeringsverdi 70 000. Maskin B koster 420 000, varer 7 år, har driftskostnader 90 000 per år og ingen salgsverdi.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>Maskin A</th><th>Maskin B</th></tr></thead><tbody>
<tr><th scope="row">Nåverdi av kostnadene</th><td>270 000 + 100 000 · 3,169865 − 70 000/1,1<sup>4</sup> = 539 176</td><td>420 000 + 90 000 · 4,868419 = 858 158</td></tr>
<tr><th scope="row">Annuitetsfaktor</th><td>3,169865 (4 år)</td><td>4,868419 (7 år)</td></tr>
<tr><th scope="row">Årskostnad</th><td>170 094</td><td>176 270</td></tr>
</tbody></table></div>
<p><strong>Velg A</strong> – lavest årskostnad, selv om B har lavere driftskostnader. Nåverdiene 539 176 og 858 158 kan ikke sammenlignes direkte, fordi B dekker behovet i 7 år og A bare i 4. I Excel: <code>=AVDRAG(10%;4;-539176)</code>.</p>` },
      { title: 'Eksempel: Obligasjon – kurs fra spotrenter, YTM, terminrenter og durasjon', html: `<p>En treårig obligasjon har pålydende 1 000 og kupongrente 7 %. Spotrentene er 6 % (1 år), 7 % (2 år) og 8 % (3 år).</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År (t)</th><th>Kontantstrøm</th><th>Spotrente</th><th>Nåverdi</th><th>t · nåverdi</th></tr></thead><tbody>
<tr><th scope="row">1</th><td>70</td><td>6 %</td><td>66,04</td><td>66,04</td></tr>
<tr><th scope="row">2</th><td>70</td><td>7 %</td><td>61,14</td><td>122,28</td></tr>
<tr><th scope="row">3</th><td>1 070</td><td>8 %</td><td>849,40</td><td>2 548,20</td></tr>
<tr><th scope="row">Sum</th><td></td><td></td><td>976,58</td><td>2 736,52</td></tr>
</tbody></table></div>
<p><strong>Kurs</strong> = 70/1,06 + 70/1,07<sup>2</sup> + 1 070/1,08<sup>3</sup> = <strong>976,58</strong> (97,66 % av pålydende). Kursen er under pålydende fordi kupongrenten (7 %) er lavere enn markedsrenten.</p>
<p><strong>YTM:</strong> internrenten i (−976,58; 70; 70; 1 070) = <strong>7,91 %</strong> – litt under treårsrenten, fordi de to første kupongene diskonteres med lavere spotrenter.</p>
<p><strong>Terminrenter:</strong> <sub>1</sub>f<sub>2</sub> = 1,07<sup>2</sup>/1,06 − 1 = <strong>8,01 %</strong>, og <sub>2</sub>f<sub>3</sub> = 1,08<sup>3</sup>/1,07<sup>2</sup> − 1 = <strong>10,03 %</strong>. Stigende rentekurve gir terminrenter over spotrentene.</p>
<p><strong>Durasjon:</strong> 2 736,52 / 976,58 = <strong>2,80 år</strong>. <strong>Volatilitet:</strong> 2,80 / 1,0791 = <strong>2,60</strong>. Øker yielden med ett prosentpoeng, faller kursen med omtrent 2,60 %. Kontroll: ny kurs ved yield 8,91 % er 951,64, et fall på 2,55 %.</p>
<p>Til sammenligning har en tilsvarende obligasjon med 4 % kupong kurs 898,26, YTM 7,94 % og durasjon 2,88, mens en med 11 % kupong har kurs 1 081,01, YTM 7,86 % og durasjon 2,72. Lavere kupong gir lengre durasjon og større kursutslag.</p>` },
      { title: 'Eksempel: Ny kurs ved renteendring – med kommentar', html: `<p>En treårig obligasjon har pålydende 1 000 og 5 % kupong. Markedsrenten (yield) er 8 %.</p>
<p><strong>Kurs:</strong> 50/1,08 + 50/1,08<sup>2</sup> + 1 050/1,08<sup>3</sup> = 46,30 + 42,87 + 833,52 = <strong>922,69</strong>.</p>
<p><strong>Macaulay-durasjon:</strong> (1 · 46,30 + 2 · 42,87 + 3 · 833,52) / 922,69 = <strong>2,85 år</strong>. Modifisert durasjon: 2,85 / 1,08 = 2,64.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Yield</th><th>Kurs</th><th>Endring</th><th>Anslag med modifisert durasjon</th></tr></thead><tbody>
<tr><th scope="row">7 %</th><td>947,51</td><td>+2,69 %</td><td>+2,64 %</td></tr>
<tr><th scope="row">8 %</th><td>922,69</td><td>–</td><td>–</td></tr>
<tr><th scope="row">9 %</th><td>898,75</td><td>−2,59 %</td><td>−2,64 %</td></tr>
</tbody></table></div>
<p><strong>Kommentar:</strong> Kupongene er faste, så når markedsrenten stiger, blir obligasjonen mindre verdt – nye kjøpere krever høyere avkastning og betaler lavere kurs. Durasjonen gir et godt anslag, men kursen stiger litt mer ved rentefall enn den faller ved renteøkning (konveksitet). Jo lengre løpetid og lavere kupong, desto større kursutslag.</p>` }
    ],
    pitfalls: [
      `<strong>NNV-funksjonen brukt på hele rekken inkludert år 0.</strong> Da diskonteres investeringen ett år for mye. Skriv <code>=NNV(krav; CF1:CFn) + CF0</code>.`,
      `<strong>Velger prosjekt etter høyest internrente</strong> når prosjektene er gjensidig utelukkende. NNV avgjør; bruk differanseinvesteringen for å vise det.`,
      `<strong>Trekker feil vei i differanseinvesteringen.</strong> Ta størst minus minst, slik at differansen starter med en utbetaling.`,
      `<strong>Sammenligner nåverdier direkte når levetidene er ulike</strong> og prosjektene gjentas. Gjør om til nåverdiannuitet/årskostnad.`,
      `<strong>Blander kriteriene for økonomisk levetid.</strong> Engangsinvestering → høyest NNV. Investeringskjede → høyest nåverdiannuitet.`,
      `<strong>Glemmer utrangeringsverdien i avslutningsåret</strong> når levetidsalternativene settes opp.`,
      `<strong>Flere internrenter.</strong> Skifter kontantstrømmen fortegn mer enn én gang, kan det finnes flere internrenter, og IR-regelen kan ikke brukes ukritisk.`,
      `<strong>Bruker egenkapitalkravet på prosjektets kontantstrøm</strong> (eller omvendt). Kontantstrøm og avkastningskrav må høre sammen.`,
      `<strong>Obligasjoner: diskonterer alle betalinger med samme spotrente.</strong> Hver betaling skal ha spotrenten for sin løpetid; én felles rente er YTM.`,
      `<strong>Obligasjoner: glemmer pålydende i siste betaling</strong>, eller regner kupongen av kursen i stedet for av pålydende.`,
      `<strong>Tror at kursen stiger når renten stiger.</strong> Kurs og rente går motsatt vei.`,
      `<strong>Feil om durasjon og rentenivå.</strong> Durasjonen <em>synker</em> når renten (yielden) øker, fordi de sene betalingene får lavere vekt. Den øker med løpetiden og synker med høyere kupong.`,
      `<strong>Forveksler durasjon og modifisert durasjon.</strong> Kursendringen anslås med modifisert durasjon = durasjon/(1 + y).`
    ],
    excel: [
      { fn: 'NNV(rente; verdier)', use: `Nåverdi av kontantstrømmen fra år 1 og utover. År 0 legges til utenfor: <code>=NNV(B1; C5:F5) + B5</code>.` },
      { fn: 'IR(verdier)', use: `Internrenten. Her tas hele rekken <em>inkludert</em> år 0 med. Brukes også til YTM (−kurs, kuponger, kupong + pålydende) og til differanseinvesteringens internrente.` },
      { fn: 'AVDRAG(rente; antall_innbet; nåverdi)', use: `Gjør en nåverdi om til annuitet: <code>=AVDRAG(krav; n; -NNV)</code> gir nåverdiannuiteten; med nåverdien av kostnadene får du årskostnaden.` },
      { fn: 'NÅVERDI(rente; antall_innbet; betaling; sluttverdi)', use: `Rask obligasjonskurs når alle betalinger diskonteres med samme rente: <code>=NÅVERDI(8%;3;-50;-1000)</code> gir 922,69.` },
      { fn: 'Målsøking', use: `Data → Hva-skjer-hvis-analyse → Målsøking. Sett cellen «NNV A − NNV B» til 0 ved å endre avkastningskravet for å finne krysningsrenten, eller sett NNV lik en ønsket verdi ved å endre et årlig beløp.` },
      { fn: 'MODIR(verdier; kapitalrente; reinvesteringsrente)', use: `Modifisert internrente, der innbetalingene forutsettes reinvestert til avkastningskravet. Gir ett entydig svar også når vanlig IR er problematisk.` }
    ],
    examNotes: `<p><strong>Kjernen i eksamen.</strong> NNV og internrente på en prosjektkontantstrøm har vært med 10 av 10 ganger (15–25 % av settet). I tillegg kommer disse gjengangerne:</p>
<ul>
<li><strong>To gjensidig utelukkende prosjekter</strong> med differanseinvestering eller spørsmålet «hvilket avkastningskrav gir lik nåverdi?»: 6 av 10 (2016, 2017, 2019, 2020, 2021, 2024). Svaret er internrenten på differansekontantstrømmen, og du bør kunne forklare hvorfor NNV og IR rangerer ulikt.</li>
<li><strong>Optimal økonomisk levetid</strong> (engangsinvestering → maks NNV, kjede → maks nåverdiannuitet): 2016, 2017, 2018, 2020. <strong>Årskostnad ved ulik levetid</strong>: 2025.</li>
<li><strong>Ekvivalent annuitet</strong> – «hvor stort må det årlige beløpet være for å gi samme nåverdi?»: mars 2017, 2020, 2021, 2023. Del nåverdien på annuitetsfaktoren (AVDRAG).</li>
<li><strong>Obligasjoner</strong> – nytt de to siste årene og merket «kun 221» i forelesningen: 2024 (kurs fra spotrenter, durasjon, YTM, terminrenter) og 2025 (kurs, YTM, ny kurs ved renteendring med kommentar, Macaulay-durasjon). Regn med at dette kommer igjen.</li>
</ul>
<p>På obligasjonsoppgaver gis det poeng for kommentaren: kursen faller når renten stiger, og utslaget er størst for obligasjoner med lang løpetid og lav kupong (høy durasjon).</p>`
  });

  /* ===================================================================== */
  /* KAPITTEL 5                                                            */
  /* ===================================================================== */
  O.theory.push({
    nr: 5,
    title: 'Andre lønnsomhetsmetoder',
    examWeight: 'middels',
    summary: `<p>I praksis suppleres nåverdi og internrente med enklere metoder. <strong>Payback-metoden</strong> (tilbakebetalingstid) spør hvor lang tid det tar før kontantstrømmen har betalt tilbake investeringen. Prosjektet godtas hvis tilbakebetalingstiden er kortere enn et maksimum ledelsen har satt. Metoden er lett å forstå og sier noe om likviditet og risiko, men den ser bort fra pengenes tidsverdi og fra alt som skjer etter tilbakebetalingstidspunktet, og kravet er vilkårlig. Den maksimerer derfor ikke eiernes formue. <strong>Diskontert payback</strong> bruker nåverdier og retter opp det første problemet, men ikke de andre. Moralen er: bruk gjerne payback, men ikke alene.</p>
<p><strong>ARR</strong> (accounting rate of return, også kalt ROI) er regnskapsmessig avkastning: gjennomsnittlig årlig resultat i forhold til investert kapital. Tallet er lett å hente fra regnskapet, men det bygger på resultat i stedet for kontantstrøm, tar ikke hensyn til tidsverdi, og det finnes ingen etablert beregningsmåte – ulike definisjoner gir ulike svar.</p>
<p><strong>Kapitalrasjonering</strong> betyr at bedriften ikke har kapital til alle lønnsomme prosjekter. Da er det ikke nok å velge prosjektene med høyest NNV; målet er høyest samlet NNV innenfor budsjettet. Er prosjektene delbare og begrensningen gjelder én periode, rangeres prosjektene etter <strong>nåverdiindeks</strong> – nåverdi per investert krone. Er prosjektene udelbare, må man sammenligne kombinasjoner.</p>`,
    concepts: [
      { term: 'Payback (tilbakebetalingstid)', def: `Antall år før de akkumulerte kontantstrømmene er lik investeringsutgiften. Godta prosjektet hvis tiden er kortere enn lengste akseptable tilbakebetalingstid.` },
      { term: 'Diskontert payback', def: `Tilbakebetalingstid beregnet med <em>nåverdien</em> av kontantstrømmene. Alltid lengre enn vanlig payback. Et prosjekt som aldri betaler seg tilbake diskontert, har negativ NNV.` },
      { term: 'ARR (accounting rate of return)', def: `Regnskapsmessig avkastning: gjennomsnittlig årlig resultat delt på investeringen eller på gjennomsnittlig bundet kapital. ROI er et synonym.` },
      { term: 'Kapitalrasjonering', def: `Mangel på kapital til å gjennomføre alle lønnsomme prosjekter. <strong>Soft</strong> rasjonering er selvpålagt (f.eks. av kontrollhensyn); <strong>hard</strong> rasjonering betyr at markedet ikke vil finansiere prosjektene.` },
      { term: 'Nåverdiindeks (NVI)', def: `Netto nåverdi per investert krone. Brukes til å rangere delbare prosjekter når kapitalen er begrenset i én periode.` },
      { term: 'Delbare prosjekter', def: `Prosjekter der man kan gjennomføre en andel og få tilsvarende andel av nåverdien.` }
    ],
    formulas: [
      { name: 'Payback ved lik årlig kontantstrøm', html: `PB = <span class="frac"><span>CF<sub>0</sub></span><span>Årlig kontantstrøm</span></span>`, note: `CF<sub>0</sub> = investeringsutgiften.` },
      { name: 'Payback ved ulik kontantstrøm', html: `PB = k + <span class="frac"><span>Udekket beløp etter år k</span><span>Kontantstrøm i år k + 1</span></span>`, note: `k = siste år der akkumulert kontantstrøm fortsatt er negativ. Brøken er lineær interpolering innenfor året.` },
      { name: 'Diskontert payback', html: `Minste T slik at Σ<sub>t=1…T</sub> <span class="frac"><span>CF<sub>t</sub></span><span>(1 + i)<sup>t</sup></span></span> ≥ CF<sub>0</sub>`, note: `Samme framgangsmåte som payback, men med diskonterte kontantstrømmer.` },
      { name: 'ARR – variant 1', html: `ARR = <span class="frac"><span>Gjennomsnittlig årlig resultat</span><span>Investeringsutgift</span></span>`, note: `Resultat = kontantstrøm − avskrivning.` },
      { name: 'ARR – variant 2', html: `ARR = <span class="frac"><span>Gjennomsnittlig årlig resultat</span><span>Gjennomsnittlig investert kapital</span></span>`, note: `Ved lineær avskrivning til null er gjennomsnittlig kapital halve investeringen, og variant 2 blir det dobbelte av variant 1. Oppgi alltid hvilken definisjon du bruker.` },
      { name: 'Nåverdiindeks', html: `NVI = <span class="frac"><span>NNV</span><span>Investeringsutgift</span></span>`, note: `Nåverdi per investert krone i perioden med kapitalbegrensning.` },
      { name: 'Andel av siste prosjekt ved delbarhet', html: `Andel = <span class="frac"><span>Restbudsjett</span><span>Investeringsutgift</span></span>, &nbsp; Bidrag = Andel · NNV`, note: `Brukes på det siste prosjektet som ikke får plass i sin helhet.` }
    ],
    methods: [
      { title: 'Slik beregner du payback', steps: [
        `Sett opp kontantstrømmen og lag en rad med akkumulert kontantstrøm, med start i −investeringen.`,
        `Finn det siste året der akkumulert kontantstrøm fortsatt er negativ (år k).`,
        `Interpoler: PB = k + udekket beløp / kontantstrøm i år k + 1.`,
        `Sammenlign med kravet og kommenter svakhetene ved metoden.`,
        `Diskontert payback: gjør det samme med nåverdien av hver kontantstrøm.`
      ] },
      { title: 'Slik velger du prosjekter ved kapitalrasjonering', steps: [
        `Beregn NNV for alle prosjektene og stryk dem med negativ NNV.`,
        `Beregn NVI = NNV / investering for hvert prosjekt.`,
        `Ranger fra høyest til lavest NVI.`,
        `Fyll opp budsjettet i den rekkefølgen. Det siste prosjektet tas med som en andel hvis prosjektene er delbare.`,
        `Er prosjektene udelbare: sett opp de kombinasjonene som får plass i budsjettet, og velg den med høyest samlet NNV.`,
        `Prosjekter som forutsetter hverandre, slås sammen og behandles som ett.`
      ] }
    ],
    examples: [
      { title: 'Eksempel: Payback, NNV og internrente gir ulik rangering', html: `<p>To prosjekter med avkastningskrav 8 % (tall i 1 000):</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>A</th><th>Akkumulert A</th><th>B</th><th>Akkumulert B</th></tr></thead><tbody>
<tr><th scope="row">0</th><td>−180</td><td>−180</td><td>−400</td><td>−400</td></tr>
<tr><th scope="row">1</th><td>55</td><td>−125</td><td>122</td><td>−278</td></tr>
<tr><th scope="row">2</th><td>60</td><td>−65</td><td>133</td><td>−145</td></tr>
<tr><th scope="row">3</th><td>40</td><td>−25</td><td>96</td><td>−49</td></tr>
<tr><th scope="row">4</th><td>89</td><td>64</td><td>170</td><td>121</td></tr>
</tbody></table></div>
<p>Payback A = 3 + 25/89 = <strong>3,28 år</strong>. Payback B = 3 + 49/170 = <strong>3,29 år</strong>. Metoden skiller knapt mellom prosjektene.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>A</th><th>B</th><th>B − A</th></tr></thead><tbody>
<tr><th scope="row">Payback</th><td>3,28 år</td><td>3,29 år</td><td></td></tr>
<tr><th scope="row">NNV (8 %), i kroner</th><td>19 537</td><td>28 152</td><td>8 615</td></tr>
<tr><th scope="row">Internrente</th><td>12,5 %</td><td>11,0 %</td><td>9,7 %</td></tr>
</tbody></table></div>
<p>Er prosjektene gjensidig utelukkende, velges <strong>B</strong>: høyest NNV, og differanseinvesteringens internrente (9,7 %) er over kravet på 8 %. Payback og IR ville pekt på A.</p>
<p><strong>Diskontert payback for A:</strong> nåverdiene er 50,93, 51,44, 31,75 og 65,42. Akkumulert etter tre år: −45,88. Diskontert payback = 3 + 45,88/65,42 = <strong>3,70 år</strong>.</p>` },
      { title: 'Eksempel: Fire metoder, tre ulike vinnere', html: `<p>Tre prosjekter koster 100 000 hver og avskrives lineært med 20 000 per år over 5 år. Avkastningskrav 24 %. Kontantstrømmer (i 1 000): A 40/50/50/50/60, B 60/25/40/60/70, C 30/40/50/65/80.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody>
<tr><th scope="row">Payback</th><td>2,20 år</td><td>2,38 år</td><td>2,60 år</td></tr>
<tr><th scope="row">NNV (24 %)</th><td>32 616</td><td>34 882</td><td>31 214</td></tr>
<tr><th scope="row">Internrente</th><td>38 %</td><td>39 %</td><td>36 %</td></tr>
<tr><th scope="row">Gjennomsnittlig resultat</th><td>30 000</td><td>31 000</td><td>33 000</td></tr>
<tr><th scope="row">ARR (av investering)</th><td>30 %</td><td>31 %</td><td>33 %</td></tr>
<tr><th scope="row">ARR (av gjennomsnittlig kapital 50 000)</th><td>60 %</td><td>62 %</td><td>66 %</td></tr>
</tbody></table></div>
<p>Payback foretrekker A (raskest tilbake), NNV og IR foretrekker B, og ARR foretrekker C (størst samlet resultat, uansett når det kommer). Det er <strong>B</strong> som øker eiernes formue mest. Payback for A: etter to år er 90 dekket, resten 10 av 50 i år 3 gir 2,20. Resultat = kontantstrøm − 20 000.</p>` },
      { title: 'Eksempel: Kapitalrasjonering med nåverdiindeks', html: `<p>Investeringsbudsjettet er 3 000 000, og fire lønnsomme prosjekter krever til sammen 5 300 000.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Prosjekt</th><th>Investering</th><th>NNV</th><th>NVI</th><th>Rang</th></tr></thead><tbody>
<tr><th scope="row">P</th><td>1 000 000</td><td>400 000</td><td>0,40</td><td>1</td></tr>
<tr><th scope="row">Q</th><td>1 500 000</td><td>450 000</td><td>0,30</td><td>3</td></tr>
<tr><th scope="row">R</th><td>800 000</td><td>280 000</td><td>0,35</td><td>2</td></tr>
<tr><th scope="row">S</th><td>2 000 000</td><td>500 000</td><td>0,25</td><td>4</td></tr>
</tbody></table></div>
<p><strong>Delbare prosjekter:</strong> Velg P og R (1 800 000). Restbudsjettet 1 200 000 brukes på Q: andel 1 200 000 / 1 500 000 = 80 %, som gir 0,8 · 450 000 = 360 000. Samlet NNV = 400 000 + 280 000 + 360 000 = <strong>1 040 000</strong>. Merk at S har høyest NNV i kroner, men kommer ikke med – den gir minst per investert krone.</p>
<p><strong>Udelbare prosjekter:</strong> Da må kombinasjonene sammenlignes. P + R gir 680 000, P + Q gir 850 000, R + Q 730 000, R + S 780 000 og P + S (nøyaktig 3 000 000) gir <strong>900 000</strong>. Beste valg er P og S – NVI-rangeringen holder ikke lenger når prosjektene ikke kan deles.</p>` }
    ],
    pitfalls: [
      `<strong>Bruker payback som eneste beslutningsgrunnlag.</strong> Kort tilbakebetalingstid betyr ikke høy lønnsomhet; kontantstrøm etter tilbakebetalingstiden ignoreres.`,
      `<strong>Glemmer å interpolere</strong> og svarer med et helt antall år.`,
      `<strong>Bruker resultat i stedet for kontantstrøm i payback.</strong> Payback bygger på kontantstrøm; ARR bygger på resultat.`,
      `<strong>ARR uten definisjon.</strong> Det finnes flere varianter; skriv hvilken du bruker. Husk at resultat = kontantstrøm − avskrivning.`,
      `<strong>Rangerer etter NNV i kroner ved kapitalrasjonering.</strong> Når kapitalen er knapp, er det nåverdi per investert krone som teller.`,
      `<strong>Bruker NVI-rangering på udelbare prosjekter</strong> uten å sjekke kombinasjoner.`,
      `<strong>Bruker NVI når prosjektene ikke konkurrerer om knapp kapital.</strong> For gjensidig utelukkende prosjekter uten kapitalbegrensning er det høyest NNV som gjelder.`,
      `<strong>Regner NVI som nåverdi av innbetalingene delt på investeringen.</strong> I dette emnet er NVI = NNV / investeringsutgift.`
    ],
    excel: [
      { fn: 'Akkumulert kontantstrøm', use: `Lag en rad med løpende sum (=forrige akkumulert + årets kontantstrøm). Payback leses av der raden skifter fortegn, og brøken regnes ut med en enkel formel.` },
      { fn: 'NNV(rente; verdier)', use: `Brukes til NNV for hvert prosjekt før NVI beregnes, og til nåverdien av hver enkelt kontantstrøm i diskontert payback (eller del hver kontantstrøm på (1 + i)^t).` },
      { fn: 'IR(verdier)', use: `Internrente for hvert prosjekt og for differanseinvesteringen når metodene skal sammenlignes.` },
      { fn: 'GJENNOMSNITT(verdier)', use: `Gjennomsnittlig årlig resultat til ARR.` },
      { fn: 'Sortering', use: `Ved kapitalrasjonering: beregn NVI i en kolonne og sorter synkende, og lag en kolonne med akkumulert investering for å se hvor budsjettet tar slutt.` }
    ],
    examNotes: `<p><strong>Payback</strong> har kommet i 2016, 2021 og 2022 – gjerne som et kort delspørsmål etter NNV/IR, og ofte med tillegget «hva kan du si om denne metoden?». Da skal du både regne ut tilbakebetalingstiden (med interpolering) og drøfte: metoden er enkel og sier noe om likviditet og risiko, men den tar ikke hensyn til tidsverdien, ser bort fra kontantstrøm etter tilbakebetalingstiden, bruker et vilkårlig krav og maksimerer ikke eiernes formue.</p>
<p>ARR og kapitalrasjonering/nåverdiindeks er pensum og kan dukke opp som mindre deloppgaver. Kan du rangere etter NVI, fylle opp et budsjett og forklare hvorfor NNV-rangering ikke er nok når kapitalen er knapp, er du dekket.</p>`
  });

  /* ===================================================================== */
  /* KAPITTEL 6                                                            */
  /* ===================================================================== */
  O.theory.push({
    nr: 6,
    title: 'Følsomhetsanalyse og kritiske verdier',
    examWeight: 'høy',
    summary: `<p>Kontantstrømmen i en investeringsanalyse er forventede størrelser, og virkeligheten kan bli annerledes. Kapittel 6 handler om praktiske metoder for å kartlegge risikoen. I en <strong>følsomhetsanalyse</strong> endres <em>én</em> faktor om gangen: hvor mye kan prisen, mengden, kostnadene eller investeringen endres i ugunstig retning før prosjektet blir ulønnsomt? Verdien som gir NNV = 0, kalles <strong>kritisk verdi</strong> (nullpunkt). I en <strong>scenarioanalyse</strong> endres flere faktorer samtidig, og i en <strong>simulering</strong> trekkes faktorene fra sannsynlighetsfordelinger.</p>
<p>Nøkkelen til kritiske verdier er <strong>nåverdiannuiteten</strong>. NNV gjort om til et likt årlig beløp forteller hvor mye den årlige kontantstrømmen kan falle før nåverdien blir null. Derfra er resten enkle divisjoner: prisen tåler et fall på annuiteten delt på mengden, mengden tåler et fall på annuiteten delt på <em>dekningsbidraget</em> per enhet, og de faste kostnadene tåler en økning lik annuiteten. Investeringsutgiften tåler en økning lik NNV, og en restverdi i siste år tåler et fall lik NNV framskrevet til siste år.</p>
<p>Uttrykt i prosent viser de kritiske endringene hvilke forutsetninger prosjektet er mest sårbart for. Typisk tåler prisen minst, fordi et prisfall slår rett ut i kontantstrømmen, mens faste kostnader og investering tåler mer. Dette illustreres i et <strong>stjernediagram</strong>, der den bratteste linjen tilhører den mest kritiske faktoren.</p>`,
    concepts: [
      { term: 'Følsomhetsanalyse', def: `Også kalt sensitivitetsanalyse. Undersøker hvor mye <strong>én</strong> kalkylefaktor kan endres i negativ retning før prosjektet blir ulønnsomt, alt annet likt.` },
      { term: 'Kritisk verdi (nullpunkt)', def: `Den verdien av en faktor som gir NNV = 0. Oppgis gjerne også som prosentvis endring fra forventet verdi.` },
      { term: 'Scenarioanalyse', def: `Flere faktorer endres samtidig, f.eks. i et pessimistisk, forventet og optimistisk scenario, og NNV beregnes for hvert.` },
      { term: 'Simulering', def: `Faktorene trekkes gjentatte ganger fra sannsynlighetsfordelinger, slik at man får en fordeling av mulige nåverdier.` },
      { term: 'Regnskapsmessig break-even', def: `Mengden der regnskapsresultatet er null: (betalbare faste kostnader + avskrivninger) / dekningsbidrag per enhet.` },
      { term: 'Finansiell break-even', def: `Mengden der NNV = 0. Ligger høyere enn regnskapsmessig break-even, fordi også avkastningskravet på kapitalen skal dekkes.` },
      { term: 'Dekningsbidrag per enhet', def: `Pris − variable enhetskostnader. Det én ekstra solgt enhet bidrar med til kontantstrømmen.` },
      { term: 'Stjernediagram', def: `Figur som viser NNV (eller IR) som funksjon av prosentvis endring i hver faktor. Brattest linje = mest følsom faktor.` },
      { term: 'Risikonivåer', def: `Prosjektets egenrisiko (prosjektet isolert), bedriftsrisiko (virkning på bedriftens samlede kontantstrøm) og markedsrisiko (for en veldiversifisert investor).` }
    ],
    formulas: [
      { name: 'NNV ved konstant årlig kontantstrøm', html: `NNV = −CF<sub>0</sub> + (M · (P − V) − FK) · A<sub>n,i</sub>`, note: `M = salgsmengde, P = pris, V = variable enhetskostnader, FK = betalbare faste kostnader, CF<sub>0</sub> = investeringsutgift, A<sub>n,i</sub> = annuitetsfaktoren.` },
      { name: 'Nåverdiannuitet', html: `Annuitet = <span class="frac"><span>NNV</span><span>A<sub>n,i</sub></span></span>`, note: `Så mye kan den årlige kontantstrømmen falle før NNV = 0. Excel: AVDRAG.` },
      { name: 'Kritisk prisfall (og kritisk økning i variable enhetskostnader)', html: `ΔP = <span class="frac"><span>Annuitet</span><span>M</span></span>`, note: `Laveste pris = P − ΔP. Høyeste variable enhetskostnad = V + ΔP.` },
      { name: 'Kritisk mengdefall', html: `ΔM = <span class="frac"><span>Annuitet</span><span>P − V</span></span>`, note: `Del på <strong>dekningsbidraget</strong>, ikke prisen – færre solgte enheter sparer også variable kostnader.` },
      { name: 'Kritisk økning i faste kostnader', html: `ΔFK = Annuitet`, note: `Høyeste årlige faste kostnader = FK + annuiteten.` },
      { name: 'Kritisk økning i investeringsutgift', html: `ΔCF<sub>0</sub> = NNV`, note: `Høyeste investeringsbeløp = CF<sub>0</sub> + NNV = nåverdien av framtidige kontantstrømmer.` },
      { name: 'Kritisk fall i restverdi (år n)', html: `ΔRestverdi = NNV · (1 + i)<sup>n</sup>`, note: `Restverdien kommer i år n, så NNV må framskrives dit.` },
      { name: 'Kritisk økning i arbeidskapital', html: `ΔAK = <span class="frac"><span>NNV</span><span>1 − (1 + i)<sup>−n</sup></span></span>`, note: `Gjelder arbeidskapital som bindes i år 0 og frigjøres i år n. Kostnaden ved bindingen er tapt rente.` },
      { name: 'Kritisk prisfall ved varierende mengde', html: `ΔP = <span class="frac"><span>NNV</span><span>Σ<sub>t=1…n</sub> M<sub>t</sub> / (1 + i)<sup>t</sup></span></span>`, note: `Når salget ikke er likt hvert år, deles NNV på nåverdien av mengdene.` },
      { name: 'Regnskapsmessig break-even', html: `M = <span class="frac"><span>FK + Avskrivninger</span><span>P − V</span></span>`, note: `Sammenlign med finansiell break-even (NNV = 0), som alltid ligger høyere for et prosjekt med kapitalbinding.` }
    ],
    methods: [
      { title: 'Slik finner du kritiske verdier med nåverdiannuitet', steps: [
        `Beregn prosjektets NNV. Den må være positiv for at spørsmålet skal gi mening.`,
        `Gjør NNV om til nåverdiannuitet: NNV / annuitetsfaktor (<code>=AVDRAG(krav; n; -NNV)</code>).`,
        `Årlige størrelser: del annuiteten på mengden (pris og variable enhetskostnader), på dekningsbidraget per enhet (mengde), eller bruk annuiteten direkte (faste kostnader).`,
        `Engangsstørrelser: investeringen tåler en økning lik NNV; restverdien et fall lik NNV · (1 + i)<sup>n</sup>.`,
        `Oppgi både kritisk verdi og prosentvis endring, og ranger faktorene etter hvor lite de tåler.`,
        `Kontroller minst ett svar ved å sette den kritiske verdien inn i modellen – NNV skal bli 0.`
      ] },
      { title: 'Slik bruker du målsøking', steps: [
        `Bygg modellen slik at NNV-cellen avhenger av inndatacellene (pris, mengde osv.) gjennom formler.`,
        `Velg Data → Hva-skjer-hvis-analyse → Målsøking.`,
        `«Sett celle»: NNV-cellen. «Til verdi»: 0. «Ved å endre celle»: inndatacellen du vil finne kritisk verdi for.`,
        `Noter svaret, og sett inndatacellen tilbake til opprinnelig verdi før neste målsøking.`,
        `Målsøking fungerer også når kontantstrømmen varierer fra år til år, der annuitetsmetoden ikke kan brukes direkte.`
      ] }
    ],
    examples: [
      { title: 'Eksempel: Kritiske verdier ved konstant kontantstrøm', html: `<p>Investering 10 000 000, levetid 8 år, avkastningskrav 20 % (annuitetsfaktor 3,837160). Salg 12 000 enheter per år til pris 700, variable enhetskostnader 300 og betalbare faste kostnader 1 800 000.</p>
<p>Årlig kontantstrøm = 12 000 · (700 − 300) − 1 800 000 = 3 000 000. NNV = −10 000 000 + 3 000 000 · 3,837160 = <strong>1 511 479</strong>. Nåverdiannuitet = 1 511 479 / 3,837160 = <strong>393 906</strong>.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Faktor</th><th>Beregning</th><th>Kritisk verdi</th><th>Endring</th></tr></thead><tbody>
<tr><th scope="row">Pris</th><td>393 906 / 12 000 = 32,83</td><td>667,17</td><td>−4,7 %</td></tr>
<tr><th scope="row">Mengde</th><td>393 906 / 400 = 985</td><td>11 015</td><td>−8,2 %</td></tr>
<tr><th scope="row">Variable enhetskostnader</th><td>393 906 / 12 000 = 32,83</td><td>332,83</td><td>+10,9 %</td></tr>
<tr><th scope="row">Investering</th><td>NNV = 1 511 479</td><td>11 511 479</td><td>+15,1 %</td></tr>
<tr><th scope="row">Faste kostnader</th><td>393 906</td><td>2 193 906</td><td>+21,9 %</td></tr>
<tr><th scope="row">Avkastningskrav</th><td>internrenten</td><td>24,95 %</td><td></td></tr>
</tbody></table></div>
<p>Prosjektet er mest følsomt for prisen. <strong>Regnskapsmessig break-even:</strong> (1 800 000 + 1 250 000) / 400 = 7 625 enheter, der 1 250 000 er lineær avskrivning. <strong>Finansiell break-even</strong> er 11 015 enheter – langt høyere, fordi kapitalen også skal ha 20 % avkastning.</p>` },
      { title: 'Eksempel: Kritiske verdier med arbeidskapital', html: `<p>Pris 3 050, variable enhetskostnader 1 600, kvantum 700, faste kostnader 600 000. Anlegg 950 000 og arbeidskapital 150 000 (frigjøres i år 4). Avkastningskrav 12 %, 4 år.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody>
<tr><th scope="row">Omsetning</th><td></td><td>2 135 000</td><td>2 135 000</td><td>2 135 000</td><td>2 135 000</td></tr>
<tr><th scope="row">Variable kostnader</th><td></td><td>−1 120 000</td><td>−1 120 000</td><td>−1 120 000</td><td>−1 120 000</td></tr>
<tr><th scope="row">Faste kostnader</th><td></td><td>−600 000</td><td>−600 000</td><td>−600 000</td><td>−600 000</td></tr>
<tr><th scope="row">Anlegg og arbeidskapital</th><td>−1 100 000</td><td></td><td></td><td></td><td>150 000</td></tr>
<tr><th scope="row">Kontantstrøm</th><td>−1 100 000</td><td>415 000</td><td>415 000</td><td>415 000</td><td>565 000</td></tr>
</tbody></table></div>
<p>NNV = <strong>255 828</strong>, IR = 22,1 %, nåverdiannuitet = 255 828 / 3,0373 = <strong>84 227</strong>.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Faktor</th><th>Beregning</th><th>Kritisk verdi</th><th>Endring</th></tr></thead><tbody>
<tr><th scope="row">Pris</th><td>84 227 / 700 = 120,32</td><td>2 929,68</td><td>−3,9 %</td></tr>
<tr><th scope="row">Variable enhetskostnader</th><td>84 227 / 700 = 120,32</td><td>1 720,32</td><td>+7,5 %</td></tr>
<tr><th scope="row">Kvantum</th><td>84 227 / 1 450 = 58</td><td>642</td><td>−8,3 %</td></tr>
<tr><th scope="row">Faste kostnader</th><td>84 227</td><td>684 227</td><td>+14,0 %</td></tr>
</tbody></table></div>
<p>Selv om kontantstrømmen i år 4 er høyere enn de andre årene, kan annuitetsmetoden brukes: en endring i pris, mengde eller faste kostnader slår likt ut hvert år.</p>` },
      { title: 'Eksempel: Varierende salg og kritisk restverdi', html: `<p>Investering 6 000 000, restverdi 1 250 000 i år 4, avkastningskrav 10 %. Pris 3 700, dekningsbidrag 2 220 per enhet (60 %), faste kostnader 900 000. Volum 1 000 / 1 300 / 1 300 / 1 200.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody>
<tr><th scope="row">Dekningsbidrag</th><td></td><td>2 220 000</td><td>2 886 000</td><td>2 886 000</td><td>2 664 000</td></tr>
<tr><th scope="row">Faste kostnader</th><td></td><td>−900 000</td><td>−900 000</td><td>−900 000</td><td>−900 000</td></tr>
<tr><th scope="row">Anleggsmidler</th><td>−6 000 000</td><td></td><td></td><td></td><td>1 250 000</td></tr>
<tr><th scope="row">Kontantstrøm</th><td>−6 000 000</td><td>1 320 000</td><td>1 986 000</td><td>1 986 000</td><td>3 014 000</td></tr>
</tbody></table></div>
<p>NNV = <strong>392 036</strong>, IR = 12,63 %, nåverdiannuitet = 392 036 / 3,169865 = 123 676.</p>
<ul>
<li><strong>Faste kostnader</strong> kan øke med 123 676 til 1 023 676 (de er like hvert år, så annuiteten kan brukes).</li>
<li><strong>Restverdien</strong> kan falle med 392 036 · 1,1<sup>4</sup> = 573 980, til 676 020.</li>
<li><strong>Prisen:</strong> mengden varierer, så NNV deles på nåverdien av mengdene: 1 000/1,1 + 1 300/1,1<sup>2</sup> + 1 300/1,1<sup>3</sup> + 1 200/1,1<sup>4</sup> = 3 779,80. Prisen kan falle med 392 036 / 3 779,80 = 103,72, til <strong>3 596,28</strong> (variable enhetskostnader holdt fast i kroner).</li>
<li><strong>Volumet i år 4</strong> kan falle med 573 980 / 2 220 = 259 enheter, til 941.</li>
</ul>
<p>I Excel løses alle fire raskest med målsøking – resultatene blir de samme.</p>` },
      { title: 'Eksempel: Følsomhet målt på internrenten (stjernediagram)', html: `<p>Investering 350 000, pris 20, variable enhetskostnader 15, faste kostnader 25 000, mengde 20 000, levetid 10 år. Årlig kontantstrøm 75 000 gir internrente 16,95 %. Hver faktor endres 10 % i ugunstig retning:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Faktor</th><th>Ny verdi</th><th>Kontantstrøm</th><th>Internrente</th></tr></thead><tbody>
<tr><th scope="row">Salgspris</th><td>18</td><td>35 000</td><td>0,00 %</td></tr>
<tr><th scope="row">Variable enhetskostnader</th><td>16,5</td><td>45 000</td><td>4,85 %</td></tr>
<tr><th scope="row">Salgsvolum</th><td>18 000</td><td>65 000</td><td>13,19 %</td></tr>
<tr><th scope="row">Investeringsutgift</th><td>385 000</td><td>75 000</td><td>14,41 %</td></tr>
<tr><th scope="row">Levetid</th><td>9 år</td><td>75 000</td><td>15,63 %</td></tr>
<tr><th scope="row">Faste kostnader</th><td>27 500</td><td>72 500</td><td>16,03 %</td></tr>
</tbody></table></div>
<p>Dekningsbidraget er bare 5 kr per enhet, så et prisfall på 10 % (2 kr) fjerner 40 % av dekningsbidraget og hele lønnsomheten. Volumfallet koster derimot bare 2 000 · 5 = 10 000. I et stjernediagram ville prislinjen vært brattest.</p>` }
    ],
    pitfalls: [
      `<strong>Deler på prisen i stedet for dekningsbidraget</strong> når kritisk mengde beregnes. Selger du én enhet mindre, sparer du også de variable kostnadene.`,
      `<strong>Bruker NNV direkte på årlige størrelser.</strong> NNV er et engangsbeløp i dag; årlige faktorer må regnes via nåverdiannuiteten.`,
      `<strong>Bruker annuiteten på engangsstørrelser.</strong> Investeringen tåler en økning lik NNV; restverdien et fall lik NNV · (1 + i)<sup>n</sup> – ikke annuiteten og ikke NNV udiskontert.`,
      `<strong>Bruker annuitetsmetoden på pris eller mengde når salget varierer</strong> fra år til år. Del NNV på nåverdien av mengdene, eller bruk målsøking.`,
      `<strong>Forveksler regnskapsmessig og finansiell break-even.</strong> Regnskapsmessig nullpunkt dekker ikke kapitalkostnaden.`,
      `<strong>Oppgir bare endringen, ikke den kritiske verdien</strong> (eller omvendt). Les hva oppgaven spør om: «laveste pris» er selve prisen, ikke prisfallet.`,
      `<strong>Glemmer å tilbakestille cellen</strong> etter målsøking, slik at neste beregning bygger på feil tall.`,
      `<strong>Tolker følsomhetsanalysen som en sannsynlighet.</strong> Den sier hvor mye en faktor tåler, ikke hvor sannsynlig endringen er – og den endrer bare én faktor om gangen.`
    ],
    excel: [
      { fn: 'Målsøking', use: `Hovedverktøyet for kritiske verdier: sett NNV-cellen til 0 ved å endre pris, mengde, faste kostnader, restverdi eller investering. Krever at NNV-cellen er koblet til inndatacellen via formler.` },
      { fn: 'AVDRAG(rente; antall_innbet; nåverdi)', use: `<code>=AVDRAG(krav; n; -NNV)</code> gir nåverdiannuiteten – utgangspunktet for alle kritiske årlige verdier.` },
      { fn: 'NNV(rente; verdier)', use: `NNV i basiskalkylen. Kan også brukes på mengderekken for å finne «nåverdien av mengdene» når salget varierer.` },
      { fn: 'IR(verdier)', use: `Internrenten er den kritiske verdien for avkastningskravet.` },
      { fn: 'Scenariobehandling', use: `Data → Hva-skjer-hvis-analyse → Scenariobehandling. Lagrer sett med inndata (pessimistisk, forventet, optimistisk) og lager et scenariosammendrag med NNV for hvert.` },
      { fn: 'Datatabell', use: `Data → Hva-skjer-hvis-analyse → Datatabell. Viser NNV for mange verdier av én eller to faktorer – grunnlaget for et stjernediagram.` }
    ],
    examNotes: `<p><strong>Kritiske verdier har kommet på 6 av 10 eksamener</strong>, nesten alltid som oppfølging til prosjektanalysen: «hva er laveste pris?», «hvor mye kan mengden falle?», «hva må restverdien minst være?», «hvor høye kan de faste kostnadene bli?» eller «hva er høyeste investeringsbeløp?». Alle bygger på samme idé: NNV = 0, og veien dit går via nåverdiannuiteten.</p>
<p>Siden eksamen løses i Excel, er målsøking den raskeste metoden – men vis gjerne framgangsmåten med nåverdiannuitet i tillegg, og skriv en kort kommentar om hvilken faktor prosjektet er mest følsomt for. Husk fellene: del på dekningsbidraget for mengde, framskriv NNV for restverdi, og bruk NNV (ikke annuiteten) for investeringsbeløpet.</p>`
  });

  /* ===================================================================== */
  /* QUIZ                                                                  */
  /* ===================================================================== */

  /* ---- Kapittel 1 ---- */
  O.quiz.push({ ch: 1, q: `Hva gjelder investeringsproblemet?`, options: [`Hvordan bedriften skaffer kapital`, `Hvordan bedriften anvender kapital`, `Hvor mye utbytte eierne skal ha`, `Hvordan regnskapet skal føres`], correct: 1, why: `Investeringsproblemet gjelder anvendelsen av kapital – hvilke prosjekter og eiendeler bedriften skal satse på. Anskaffelsen av kapital er finansieringsproblemet.` });
  O.quiz.push({ ch: 1, q: `Hvordan defineres netto arbeidskapital?`, options: [`Omløpsmidler − kortsiktig gjeld`, `Anleggsmidler − langsiktig gjeld`, `Omløpsmidler + anleggsmidler`, `Egenkapital − gjeld`], correct: 0, why: `Netto arbeidskapital er omløpsmidler minus kortsiktig gjeld. De andre alternativene blander inn anleggsmidler eller finansieringssiden.` });
  O.quiz.push({ ch: 1, q: `Hva kjennetegner et effisient marked?`, options: [`Prisene endres aldri`, `Bare profesjonelle investorer får handle`, `Relevant informasjon blir raskt innbakt i prisene`, `Alle investorer oppnår samme avkastning uansett risiko`], correct: 2, why: `I et effisient marked spres informasjon raskt og billig og reflekteres raskt i prisene. Det betyr ikke at prisene står stille eller at risiko ikke belønnes.` });
  O.quiz.push({ ch: 1, q: `«Ikke legg alle eggene i én kurv» handler om …`, options: [`pengenes tidsverdi`, `effisiente markeder`, `skatteplanlegging`, `å redusere risiko ved å spre plasseringene`], correct: 3, why: `Prinsippet beskriver diversifisering: risikoen reduseres når kapitalen spres på flere plasseringer. Tidsverdi («tid er penger») og markedseffisiens er de to andre grunnprinsippene.` });
  O.quiz.push({ ch: 1, q: `Hvilken side av balansen viser finansieringen?`, options: [`Eiendelssiden`, `Gjeld og egenkapital`, `Bare omløpsmidlene`, `Bare anleggsmidlene`], correct: 1, why: `Gjeld og egenkapital viser hvor kapitalen kommer fra (finansieringen). Eiendelssiden viser hva den er brukt til (investeringen).` });

  /* ---- Kapittel 2 ---- */
  O.quiz.push({ ch: 2, q: `Et resultatbudsjett viser driftsresultat 400 000 etter at avskrivninger på 250 000 er trukket fra. Arbeidskapitalen er uendret. Hva er kontantstrømmen fra driften?`, options: [`150 000`, `400 000`, `650 000`, `250 000`], correct: 2, why: `Avskrivninger er en kostnad uten utbetaling og legges tilbake: 400 000 + 250 000 = 650 000. Å trekke dem fra en gang til (150 000) eller la resultatet stå (400 000) er de vanlige feilene.` });
  O.quiz.push({ ch: 2, q: `Hvilken post skal IKKE være med i prosjektets kontantstrøm (kontantstrøm til totalkapitalen)?`, options: [`Renter på lånet som finansierer prosjektet`, `Økt binding i varelager`, `Salgssum for maskinen ved prosjektslutt`, `Tapt leieinntekt for lokalene prosjektet bruker`], correct: 0, why: `Renter, avdrag og utbytte er betalinger til kapitaleierne og holdes utenfor – finansieringen ligger i avkastningskravet. Arbeidskapital, restverdi og alternativkostnader er relevante.` });
  O.quiz.push({ ch: 2, q: `Arbeidskapitalen er 15 % av neste års omsetning. Omsetningen er 2 000 000 i år 1 og 3 000 000 i år 2. Hva er kontantstrømmen fra arbeidskapital i år 1?`, options: [`−450 000`, `−300 000`, `+150 000`, `−150 000`], correct: 3, why: `I år 0 er det bundet 15 % av 2 000 000 = 300 000. I år 1 må beholdningen opp til 15 % av 3 000 000 = 450 000. Endringen, 150 000, er en utbetaling i år 1. −450 000 er hele nivået, ikke endringen; −300 000 hører hjemme i år 0.` });
  O.quiz.push({ ch: 2, q: `Bedriften har brukt 500 000 på en markedsundersøkelse før investeringsbeslutningen tas. Hvordan behandles beløpet i analysen?`, options: [`Som utbetaling i år 0`, `Det holdes utenfor – det er sunk cost`, `Det fordeles over prosjektets levetid`, `Det legges til investeringsutgiften`], correct: 1, why: `Pengene er brukt uansett hva som besluttes, og påvirker ikke valget. Sunk cost skal ikke med, verken i år 0 eller fordelt.` });
  O.quiz.push({ ch: 2, q: `Et nytt prosjekt får i internregnskapet belastet 200 000 per år i andel av konsernets administrasjonskostnader. De totale administrasjonskostnadene endres ikke. Hva er relevant kontantstrøm?`, options: [`0`, `−200 000 per år`, `−100 000 per år`, `+200 000 per år`], correct: 0, why: `Bare endringer som skyldes prosjektet er relevante. Fordelte felleskostnader som ikke endres totalt, gir ingen differansekontantstrøm.` });
  O.quiz.push({ ch: 2, q: `Prosjektet skal bruke et lokale bedriften eier, som ellers kunne vært leid ut for 300 000 per år. Hvordan behandles dette?`, options: [`Ingen kontantstrøm, siden bedriften eier lokalet`, `+300 000 per år, fordi prosjektet sparer leie`, `−300 000 per år som alternativkostnad`, `Bokført verdi av lokalet trekkes fra i år 0`], correct: 2, why: `Prosjektet fører til at bedriften går glipp av 300 000 i leie per år. Det er en reell konsekvens (alternativkostnad), selv om ingen faktura betales.` });
  O.quiz.push({ ch: 2, q: `Når frigjøres arbeidskapitalen i en vanlig prosjektanalyse?`, options: [`Den frigjøres ikke`, `Gradvis med like beløp hvert år`, `Året etter prosjektets siste år`, `I prosjektets siste år (pluss underveis hvis omsetningen faller)`], correct: 3, why: `Når prosjektet avvikles, selges varelageret og kundene betaler. Gjenværende arbeidskapital frigjøres derfor i siste år. Faller omsetningen underveis, frigjøres en del året før fallet.` });
  O.quiz.push({ ch: 2, q: `Prosjektets kontantstrøm i år 1 er 322 000. Det betales 150 000 i avdrag og 30 000 i renter på prosjektlånet. Hva er kontantstrømmen til egenkapitalen i år 1?`, options: [`292 000`, `142 000`, `172 000`, `502 000`], correct: 1, why: `Kontantstrøm til egenkapitalen = prosjektets kontantstrøm − avdrag − renter = 322 000 − 150 000 − 30 000 = 142 000. Både renter og avdrag går til långiver.` });
  O.quiz.push({ ch: 2, q: `Faste kostnader er oppgitt til 500 000 per år, hvorav 250 000 er avskrivninger. Hvor mye trekkes fra i kontantstrømmen hvert år?`, options: [`250 000`, `500 000`, `750 000`, `0`], correct: 0, why: `Bare de betalbare faste kostnadene er kontantstrøm: 500 000 − 250 000 = 250 000. Avskrivningene er en fordeling av investeringen, som allerede er med i år 0.` });
  O.quiz.push({ ch: 2, q: `Et nytt produkt ventes å redusere dekningsbidraget på et av bedriftens eksisterende produkter med 200 000 per år. Hva gjør du?`, options: [`Ser bort fra det – det gjelder et annet produkt`, `Legger det til som en innbetaling`, `Tar det med som negativ kontantstrøm i prosjektet`, `Tar det bare med i år 0`], correct: 2, why: `Kannibalisering er en følge av prosjektet. Tapt dekningsbidrag er en relevant negativ kontantstrøm i de årene tapet oppstår.` });
  O.quiz.push({ ch: 2, q: `Et anleggsmiddel ble kjøpt for 40 mill., har bokført verdi 15 mill. og kan selges for 12 mill. i dag. Prosjektet innebærer at det beholdes. Hvilket beløp er relevant?`, options: [`40 mill.`, `15 mill.`, `25 mill.`, `12 mill.`], correct: 3, why: `Det som er relevant, er hva bedriften gir avkall på ved å beholde anleggsmidlet: salgsverdien på 12 mill. Kostpris er sunk cost, og bokført verdi er en regnskapsstørrelse.` });
  O.quiz.push({ ch: 2, q: `Over hele levetiden er summen av kontantstrømmen til egenkapitalen lik summen av regnskapsresultatene. Hvorfor foretrekkes likevel kontantstrømmen i analysen?`, options: [`Kontantstrømmen er alltid høyere`, `Tidsplasseringen er forskjellig, og den avgjør nåverdien`, `Resultatet inneholder ikke kostnader`, `Regnskapet tar ikke med investeringen`], correct: 1, why: `Summen er den samme, men beløpene faller på ulike tidspunkter (investeringen betales i år 0, mens avskrivningene fordeles). Nåverdien avhenger av når pengene faktisk betales.` });

  /* ---- Kapittel 3 ---- */
  O.quiz.push({ ch: 3, q: `Du setter 10 000 i banken til 6 % årlig rente. Hva står på kontoen etter 3 år?`, options: [`11 800,00`, `11 236,00`, `11 910,16`, `12 624,77`], correct: 2, why: `10 000 · 1,06³ = 11 910,16. 11 800 er uten rentesrente, 11 236 er etter to år og 12 624,77 etter fire år.` });
  O.quiz.push({ ch: 3, q: `Hva er nåverdien av 50 000 som mottas om 4 år, når renten er 8 %?`, options: [`36 751`, `34 000`, `39 692`, `68 024`], correct: 0, why: `50 000 / 1,08⁴ = 36 751. 39 692 er diskontert bare tre år, 68 024 er sluttverdien, og 34 000 er enkel rente (50 000 − 4 · 8 %).` });
  O.quiz.push({ ch: 3, q: `Et beløp plasseres til 20 % rente per år i to år. Hva er samlet avkastning?`, options: [`40 %`, `44 %`, `20 %`, `48 %`], correct: 1, why: `1,20² − 1 = 44 %. Rentesrente gjør at avkastningen blir høyere enn 20 % + 20 %.` });
  O.quiz.push({ ch: 3, q: `Nominell årsrente er 12 %, og renten godskrives månedlig. Hva er effektiv årsrente?`, options: [`12,00 %`, `12,36 %`, `12,55 %`, `12,68 %`], correct: 3, why: `(1 + 0,12/12)¹² − 1 = 1,01¹² − 1 = 12,68 %. 12,36 % gjelder halvårlig og 12,55 % kvartalsvis godskriving.` });
  O.quiz.push({ ch: 3, q: `Hva er nåverdien av 30 000 per år i all framtid når renten er 6 %?`, options: [`180 000`, `318 000`, `500 000`, `530 000`], correct: 2, why: `Uendelig annuitet: 30 000 / 0,06 = 500 000. 530 000 forutsetter at første betaling kommer i dag.` });
  O.quiz.push({ ch: 3, q: `En aksje betalte nettopp 5 kr i utbytte. Utbyttet ventes å vokse 4 % per år, og avkastningskravet er 10 %. Hva er aksjen verdt etter Gordons formel?`, options: [`86,67`, `83,33`, `52,00`, `50,00`], correct: 0, why: `Neste utbytte er 5 · 1,04 = 5,20, og verdien er 5,20 / (0,10 − 0,04) = 86,67. 83,33 bruker siste utbytte i telleren; 52 og 50 glemmer veksten i nevneren.` });
  O.quiz.push({ ch: 3, q: `Et annuitetslån på 500 000 har 5 % rente og nedbetales over 10 år med årlige terminer. Hva er terminbeløpet?`, options: [`50 000`, `64 752`, `75 000`, `52 500`], correct: 1, why: `500 000 · 0,05 · 1,05¹⁰ / (1,05¹⁰ − 1) = 64 752. 75 000 er første termin på et serielån (50 000 + 25 000), og 50 000 er bare avdraget på et serielån.` });
  O.quiz.push({ ch: 3, q: `Hva gir funksjonen AVDRAG i norsk Excel?`, options: [`Bare avdragsdelen av terminbeløpet`, `Bare rentedelen av terminbeløpet`, `Restlånet etter en termin`, `Hele terminbeløpet (renter + avdrag) på et annuitetslån`], correct: 3, why: `Til tross for navnet gir AVDRAG hele terminbeløpet. Avdragsdelen finnes med AMORT og rentedelen med RAVDRAG.` });
  O.quiz.push({ ch: 3, q: `Hva kjennetegner et annuitetslån sammenlignet med et serielån?`, options: [`Avdragene er like store hver termin`, `Rentedelen øker over tid`, `Terminbeløpet er likt, og avdragsdelen øker over tid`, `Det har alltid lavere samlede rentekostnader`], correct: 2, why: `På et annuitetslån er summen av renter og avdrag konstant; rentedelen faller og avdragsdelen øker. Like avdrag kjennetegner serielånet, som gir lavere samlede renter fordi det nedbetales raskere.` });
  O.quiz.push({ ch: 3, q: `Omtrent hvor lang tid tar det å doble et innskudd når renten er 7 % per år?`, options: [`10,2 år`, `14,3 år`, `7,0 år`, `12,0 år`], correct: 0, why: `n = ln 2 / ln 1,07 = 10,24 år. 14,3 år er svaret uten rentesrente (100 % / 7 %).` });
  O.quiz.push({ ch: 3, q: `Du sparer et likt beløp hvert år i fem år. Hva skjer med sluttverdien hvis beløpene settes inn i begynnelsen av hvert år i stedet for i slutten?`, options: [`Den blir uendret`, `Den blir (1 + i) ganger større`, `Den blir (1 + i) ganger mindre`, `Den øker med nøyaktig ett sparebeløp`], correct: 1, why: `Ved forskuddsannuitet forrentes hvert beløp én periode ekstra, så sluttverdien (og nåverdien) blir (1 + i) ganger større enn ved etterskuddsannuitet.` });
  O.quiz.push({ ch: 3, q: `100 kr plassert i et fond har vokst til 395 kr på 10 år. Hva er gjennomsnittlig årlig avkastning?`, options: [`29,5 %`, `39,5 %`, `3,95 %`, `14,7 %`], correct: 3, why: `(395/100)^(1/10) − 1 = 14,73 %. 29,5 % er totalavkastningen (295 %) delt på 10 – uten hensyn til rentesrente.` });

  /* ---- Kapittel 4 ---- */
  O.quiz.push({ ch: 4, q: `Et prosjekt koster 1 000 000 og gir 600 000 i hvert av de to neste årene. Avkastningskravet er 10 %. Hva er NNV?`, options: [`200 000`, `41 322`, `37 566`, `1 041 322`], correct: 1, why: `−1 000 000 + 600 000/1,1 + 600 000/1,1² = 41 322. 200 000 er udiskontert sum. 37 566 er resultatet hvis hele rekken inkludert år 0 legges i NNV-funksjonen, og 1 041 322 er nåverdien uten at investeringen er trukket fra.` });
  O.quiz.push({ ch: 4, q: `Hvordan beregnes NNV riktig i Excel når kontantstrømmen i år 0 (negativt beløp) står i B5 og år 1–4 i C5:F5?`, options: [`=NNV(krav; B5:F5)`, `=NNV(krav; C5:F5) − B5`, `=NNV(krav; C5:F5) + B5`, `=IR(B5:F5)`], correct: 2, why: `NNV-funksjonen diskonterer første verdi én periode. År 0 skal derfor stå utenfor funksjonen og legges til (beløpet er allerede negativt). Å ta med B5 i området diskonterer alt ett år for mye.` });
  O.quiz.push({ ch: 4, q: `Hvordan defineres internrenten?`, options: [`Det avkastningskravet som gir NNV = 0`, `Renten på prosjektets lån`, `Gjennomsnittlig resultat delt på investeringen`, `Avkastningskravet til egenkapitalen`], correct: 0, why: `Internrenten er diskonteringsrenten som gjør nåverdien av kontantstrømmen lik null – prosjektets egen avkastning i prosent.` });
  O.quiz.push({ ch: 4, q: `Prosjekt A har NNV 36 364 og IR 30 %. Prosjekt B har NNV 54 545 og IR 25 %. Prosjektene er gjensidig utelukkende, og kapitalen er ikke begrenset. Hva velges?`, options: [`A, fordi internrenten er høyest`, `Begge`, `Ingen, fordi metodene er uenige`, `B, fordi nåverdien er høyest`], correct: 3, why: `Ved gjensidig utelukkende prosjekter avgjør NNV, som måler formuesøkningen i kroner. IR er et relativt mål og favoriserer små prosjekter.` });
  O.quiz.push({ ch: 4, q: `To gjensidig utelukkende prosjekter har en differanseinvestering (størst minus minst) med internrente 15,1 %. Avkastningskravet er 15 %. Hva betyr det?`, options: [`Det minste prosjektet bør velges`, `Det største prosjektet bør velges, og 15,1 % er kravet som gir lik nåverdi`, `Begge prosjektene er ulønnsomme`, `Prosjektene har lik internrente`], correct: 1, why: `Når differanseinvesteringens internrente er høyere enn kravet, lønner merinvesteringen seg, og det største velges. Internrenten på differansen er samtidig krysningsrenten der nåverdiene er like.` });
  O.quiz.push({ ch: 4, q: `En maskin kan brukes i 1–5 år og skal IKKE erstattes når den tas ut av bruk. Hvilken levetid er optimal?`, options: [`Den som gir høyest nåverdiannuitet`, `Den tekniske levetiden`, `Den som gir høyest NNV`, `Den som gir kortest payback`], correct: 2, why: `Ved en engangsinvestering velges levetiden med høyest NNV. Nåverdiannuiteten brukes når anleggsmidlet skiftes ut fortløpende (investeringskjede).` });
  O.quiz.push({ ch: 4, q: `Maskin A har nåverdi av kostnadene 539 176 over 4 år, maskin B 858 158 over 7 år. Annuitetsfaktorene ved 10 % er 3,1699 og 4,8684. Maskinene skiftes ut fortløpende. Hvilken velges?`, options: [`A – årskostnad ca. 170 100 mot 176 300`, `B – fordi driftskostnadene per år er lavest`, `B – fordi den varer lengst`, `B – årskostnad ca. 122 600`], correct: 0, why: `Årskostnad A = 539 176/3,1699 ≈ 170 094; B = 858 158/4,8684 ≈ 176 270. A er billigst per år. Nåverdiene kan ikke sammenlignes direkte når levetidene er ulike, og 122 600 er nåverdien delt på 7 år uten hensyn til renten.` });
  O.quiz.push({ ch: 4, q: `Et prosjekt har NNV 1 338 843 over 3 år ved 10 % (annuitetsfaktor 2,4869). Hvilket likt årlig beløp gir samme nåverdi?`, options: [`446 281`, `1 472 727`, `133 884`, `538 369`], correct: 3, why: `Ekvivalent annuitet = NNV / annuitetsfaktor = 1 338 843 / 2,4869 ≈ 538 369. 446 281 er NNV delt på 3 – det ser bort fra renten.` });
  O.quiz.push({ ch: 4, q: `En nullkupongobligasjon med pålydende 1 000 og forfall om 2 år omsettes for 873,44. Hva er toårs spotrente?`, options: [`14,5 %`, `7,0 %`, `6,3 %`, `12,7 %`], correct: 1, why: `(1 000/873,44)^(1/2) − 1 = 7,0 %. 14,5 % er avkastningen over hele toårsperioden, 12,7 % er rabatten i prosent av pålydende, og 6,3 % er rabatten delt på to år.` });
  O.quiz.push({ ch: 4, q: `Spotrentene er 6 % for ett år og 7 % for to år. Hva er terminrenten mellom år 1 og år 2?`, options: [`6,5 %`, `7,0 %`, `8,0 %`, `1,0 %`], correct: 2, why: `1,07² / 1,06 − 1 = 8,01 %. Toårsrenten er et (geometrisk) snitt av ettårsrenten og terminrenten, så terminrenten må ligge over 7 %.` });
  O.quiz.push({ ch: 4, q: `Markedsrenten stiger. Hva skjer med kursen på en fastrenteobligasjon?`, options: [`Kursen faller`, `Kursen stiger`, `Kursen er uendret, siden kupongen er fast`, `Kursen går mot pålydende umiddelbart`], correct: 0, why: `Kupongene er faste. Når investorene krever høyere avkastning, diskonteres betalingene hardere og kursen faller. Kurs og rente beveger seg motsatt vei.` });
  O.quiz.push({ ch: 4, q: `En obligasjon har durasjon 2,80 år og yield 7,91 %, altså modifisert durasjon 2,60. Yielden øker med 0,5 prosentpoeng. Omtrent hvor mye endres kursen?`, options: [`+1,30 %`, `−2,60 %`, `−0,50 %`, `−1,30 %`], correct: 3, why: `Kursendring ≈ −modifisert durasjon · renteendring = −2,60 · 0,5 = −1,30 %. −2,60 % gjelder ett helt prosentpoeng, og fortegnet er negativt fordi renten stiger.` });
  O.quiz.push({ ch: 4, q: `Hvilken påstand om durasjon er riktig?`, options: [`Høyere kupongrente gir lengre durasjon`, `En nullkupongobligasjon har durasjon lik løpetiden`, `Durasjonen øker når markedsrenten øker`, `Durasjonen er alltid lengre enn løpetiden`], correct: 1, why: `En nullkupongobligasjon har bare én betaling, så durasjonen er lik løpetiden. Høyere kupong og høyere rente gir kortere durasjon, og for kupongobligasjoner er durasjonen kortere enn løpetiden.` });
  O.quiz.push({ ch: 4, q: `Hva er yield to maturity (YTM)?`, options: [`Kupongrenten delt på kursen`, `Spotrenten for obligasjonens løpetid`, `Internrenten i obligasjonens kontantstrøm når den kjøpes til dagens kurs`, `Terminrenten i obligasjonens siste år`], correct: 2, why: `YTM er den ene renten som gjør nåverdien av kuponger og pålydende lik kursen – altså internrenten. Kupong delt på kurs er direkteavkastningen og tar ikke med kursgevinst/-tap fram til forfall.` });
  O.quiz.push({ ch: 4, q: `En obligasjon har kupongrente 5 %, og markedsrenten (yield) for tilsvarende obligasjoner er 8 %. Hva vet vi om kursen?`, options: [`Den er under pålydende`, `Den er lik pålydende`, `Den er over pålydende`, `Den kan ikke bestemmes uten durasjonen`], correct: 0, why: `Når kupongrenten er lavere enn markedsrenten, må kjøperen kompenseres gjennom en kurs under pålydende. Eksempel: 5 % kupong, 3 år og 8 % yield gir kurs 922,69.` });
  O.quiz.push({ ch: 4, q: `I hvilket tilfelle kan et prosjekt ha mer enn én internrente?`, options: [`Når levetiden er lang`, `Når investeringen er stor`, `Når avkastningskravet er lavt`, `Når kontantstrømmen skifter fortegn mer enn én gang`], correct: 3, why: `Hvert fortegnsskifte kan gi en internrente. En vanlig investering (utbetaling først, deretter innbetalinger) har ett fortegnsskifte og én internrente.` });

  /* ---- Kapittel 5 ---- */
  O.quiz.push({ ch: 5, q: `Et prosjekt koster 180 og gir 55, 60, 40 og 89 i år 1–4. Hva er tilbakebetalingstiden (payback)?`, options: [`3,00 år`, `3,72 år`, `3,28 år`, `4,00 år`], correct: 2, why: `Etter tre år er 155 tilbakebetalt, og 25 gjenstår. 25/89 = 0,28, så payback = 3,28 år. 4,00 år er uten interpolering.` });
  O.quiz.push({ ch: 5, q: `En investering på 4 750 000 gir en årlig besparelse på 920 000. Hva er payback?`, options: [`5,16 år`, `4,16 år`, `6,00 år`, `0,19 år`], correct: 0, why: `Ved lik årlig kontantstrøm er payback = investering / årlig kontantstrøm = 4 750 000 / 920 000 = 5,16 år. 0,19 er brøken snudd.` });
  O.quiz.push({ ch: 5, q: `Hvilken innvending mot payback-metoden er IKKE riktig?`, options: [`Den ser bort fra kontantstrøm etter tilbakebetalingstiden`, `Den er vanskelig å forstå og beregne`, `Den tar ikke hensyn til pengenes tidsverdi`, `Kravet til tilbakebetalingstid er vilkårlig`], correct: 1, why: `Payback er tvert imot svært enkel å forstå og beregne – det er metodens fordel. De tre andre er de reelle svakhetene.` });
  O.quiz.push({ ch: 5, q: `Hva skiller diskontert payback fra vanlig payback?`, options: [`Den bruker resultat i stedet for kontantstrøm`, `Den tar hensyn til kontantstrøm etter tilbakebetalingstiden`, `Den gir alltid kortere tilbakebetalingstid`, `Den bruker nåverdien av kontantstrømmene`], correct: 3, why: `Diskontert payback bruker nåverdier og tar dermed hensyn til tidsverdien. Den ignorerer fortsatt kontantstrøm etter tilbakebetaling, og tiden blir lengre, ikke kortere.` });
  O.quiz.push({ ch: 5, q: `En investering på 75 000 avskrives lineært over 5 år. Gjennomsnittlig årlig resultat er 12 000. Hva er ARR målt mot gjennomsnittlig investert kapital?`, options: [`16 %`, `80 %`, `32 %`, `24 %`], correct: 2, why: `Gjennomsnittlig kapital er 75 000/2 = 37 500, og ARR = 12 000/37 500 = 32 %. 16 % er ARR målt mot hele investeringen – den andre vanlige definisjonen.` });
  O.quiz.push({ ch: 5, q: `Et prosjekt har årlig kontantstrøm 45 000 og lineær avskrivning 15 000. Hvilket tall inngår i ARR for dette året?`, options: [`30 000`, `45 000`, `60 000`, `15 000`], correct: 0, why: `ARR bygger på regnskapsmessig resultat: kontantstrøm − avskrivning = 30 000. Payback og NNV bruker derimot kontantstrømmen (45 000).` });
  O.quiz.push({ ch: 5, q: `Et prosjekt krever en investering på 2 000 000 og har NNV 430 000. Hva er nåverdiindeksen?`, options: [`4,65`, `0,215`, `1,215`, `0,43`], correct: 1, why: `NVI = NNV / investeringsutgift = 430 000 / 2 000 000 = 0,215. 1,215 er nåverdien av innbetalingene delt på investeringen – en annen definisjon enn den som brukes i emnet.` });
  O.quiz.push({ ch: 5, q: `Budsjettet er 3 000 000. Etter å ha valgt de høyest rangerte prosjektene gjenstår 750 000. Neste prosjekt koster 2 000 000, har NNV 430 000 og er delbart. Hvor mye øker samlet NNV?`, options: [`430 000`, `0`, `322 500`, `161 250`], correct: 3, why: `Andelen som får plass er 750 000 / 2 000 000 = 37,5 %, og bidraget er 0,375 · 430 000 = 161 250.` });
  O.quiz.push({ ch: 5, q: `Hvorfor er det ikke nok å rangere prosjekter etter NNV i kroner når kapitalen er begrenset?`, options: [`NNV tar ikke hensyn til pengenes tidsverdi`, `NNV kan ikke beregnes når kapitalen er begrenset`, `Et stort prosjekt med høy NNV kan fortrenge flere små som til sammen gir mer`, `NNV er alltid negativ ved kapitalrasjonering`], correct: 2, why: `Målet er høyest samlet NNV innenfor budsjettet. Da er det nåverdi per investert krone som teller, og et kapitalkrevende prosjekt kan gi mindre igjen per krone enn flere mindre.` });
  O.quiz.push({ ch: 5, q: `Når gir rangering etter nåverdiindeks garantert riktig utvalg?`, options: [`Når prosjektene er delbare og kapitalen bare er begrenset i én periode`, `Når prosjektene er gjensidig utelukkende`, `Når prosjektene er udelbare`, `Alltid`], correct: 0, why: `NVI-rangering forutsetter delbare prosjekter og begrensning i én periode. Ved udelbare prosjekter må kombinasjoner sammenlignes, og for gjensidig utelukkende prosjekter uten kapitalbegrensning gjelder høyest NNV.` });
  O.quiz.push({ ch: 5, q: `Prosjekt A har payback 3 år, prosjekt B 4 år, men B har høyest NNV. Prosjektene er gjensidig utelukkende. Hvilket øker eiernes formue mest?`, options: [`A, fordi pengene kommer raskest tilbake`, `B, fordi nåverdien er høyest`, `Begge er like gode`, `Det kan ikke avgjøres uten ARR`], correct: 1, why: `NNV måler formuesøkningen. Payback sier bare hvor raskt investeringen er tilbakebetalt og ser bort fra det som kommer etterpå.` });
  O.quiz.push({ ch: 5, q: `Hva menes med «hard» kapitalrasjonering?`, options: [`Ledelsen har selv satt et tak på investeringsbudsjettet`, `Prosjektene er udelbare`, `Avkastningskravet er satt ekstra høyt`, `Kapitalmarkedet er ikke villig til å finansiere prosjektene`], correct: 3, why: `Hard rasjonering kommer utenfra: markedet deler ikke bedriftens syn på lønnsomheten. Selvpålagte begrensninger kalles soft rasjonering.` });

  /* ---- Kapittel 6 ---- */
  O.quiz.push({ ch: 6, q: `Et prosjekt har nåverdiannuitet 84 227. Pris 3 050, variable enhetskostnader 1 600 og kvantum 700. Hvor mange enheter kan salget falle med per år før NNV blir 0?`, options: [`28`, `120`, `58`, `53`], correct: 2, why: `Kritisk mengdefall = annuitet / dekningsbidrag per enhet = 84 227 / 1 450 = 58. Å dele på prisen (28) er den klassiske feilen – færre solgte enheter sparer også variable kostnader.` });
  O.quiz.push({ ch: 6, q: `Samme prosjekt: nåverdiannuitet 84 227, pris 3 050 og kvantum 700. Hva er laveste akseptable pris?`, options: [`2 929,68`, `2 684,53`, `120,32`, `2 991,91`], correct: 0, why: `Prisfall = 84 227 / 700 = 120,32, så laveste pris er 3 050 − 120,32 = 2 929,68. 120,32 er prisfallet, ikke prisen; 2 684,53 bruker hele NNV i stedet for annuiteten, og 2 991,91 deler annuiteten på dekningsbidraget.` });
  O.quiz.push({ ch: 6, q: `Et prosjekt har NNV 1 511 479 og investeringsutgift 10 000 000. Hva er høyeste investeringsbeløp som gir NNV ≥ 0?`, options: [`10 393 906`, `11 511 479`, `10 000 000`, `13 000 000`], correct: 1, why: `Investeringen betales i år 0 og kan øke med hele NNV: 10 000 000 + 1 511 479 = 11 511 479. Annuiteten (393 906) gjelder årlige størrelser, ikke engangsbeløp i år 0.` });
  O.quiz.push({ ch: 6, q: `Et treårig prosjekt har NNV 678 437 ved 10 % avkastningskrav og en budsjettert restverdi på 1 600 000 i år 3. Hva må restverdien minst være?`, options: [`921 563`, `1 327 190`, `1 090 280`, `697 000`], correct: 3, why: `Restverdien kan falle med NNV framskrevet til år 3: 678 437 · 1,1³ = 903 000. Laveste restverdi er 1 600 000 − 903 000 = 697 000. 921 563 trekker fra NNV uten å framskrive.` });
  O.quiz.push({ ch: 6, q: `Betalbare faste kostnader er 1 800 000, årlige avskrivninger 1 250 000 og dekningsbidraget 400 per enhet. Hva er regnskapsmessig break-even?`, options: [`4 500 enheter`, `3 125 enheter`, `7 625 enheter`, `11 015 enheter`], correct: 2, why: `(1 800 000 + 1 250 000) / 400 = 7 625 enheter. 4 500 utelater avskrivningene, og 11 015 er finansiell break-even (NNV = 0).` });
  O.quiz.push({ ch: 6, q: `Hvorfor ligger finansiell break-even høyere enn regnskapsmessig break-even?`, options: [`Fordi avkastningskravet på investert kapital også må dekkes`, `Fordi avskrivningene telles to ganger`, `Fordi prisen er lavere i finansiell analyse`, `Fordi variable kostnader ikke er med i regnskapet`], correct: 0, why: `Regnskapsmessig nullpunkt dekker bare kostnadene inkludert avskrivninger. For at NNV skal bli null, må kontantstrømmen i tillegg gi avkastning på kapitalen.` });
  O.quiz.push({ ch: 6, q: `Nåverdiannuiteten er 393 906, og betalbare faste kostnader er 1 800 000 per år. Hva er høyeste årlige faste kostnader prosjektet tåler?`, options: [`1 406 094`, `2 193 906`, `3 311 479`, `1 800 000`], correct: 1, why: `Faste kostnader kan øke med nåverdiannuiteten: 1 800 000 + 393 906 = 2 193 906. Å legge til hele NNV (3 311 479) blander engangsbeløp og årlige beløp.` });
  O.quiz.push({ ch: 6, q: `Hva er forskjellen mellom følsomhetsanalyse og scenarioanalyse?`, options: [`Følsomhetsanalysen bruker sannsynlighetsfordelinger`, `Scenarioanalysen ser bare på investeringsutgiften`, `Det er ingen forskjell`, `Følsomhetsanalysen endrer én faktor om gangen, scenarioanalysen flere samtidig`], correct: 3, why: `Følsomhetsanalysen holder alt annet konstant og endrer én faktor. Scenarioanalysen endrer flere faktorer samtidig, og simulering trekker faktorene fra sannsynlighetsfordelinger.` });
  O.quiz.push({ ch: 6, q: `Hvilken kritisk verdi er lik prosjektets internrente?`, options: [`Kritisk pris`, `Kritisk levetid`, `Kritisk avkastningskrav`, `Kritisk investeringsutgift`], correct: 2, why: `Internrenten er per definisjon avkastningskravet som gir NNV = 0, altså den høyeste verdien kravet kan ha før prosjektet blir ulønnsomt.` });
  O.quiz.push({ ch: 6, q: `Du skal finne laveste pris med målsøking i Excel. Hva legges inn?`, options: [`Sett celle: NNV. Til verdi: 0. Ved å endre celle: pris`, `Sett celle: pris. Til verdi: 0. Ved å endre celle: NNV`, `Sett celle: IR. Til verdi: 0. Ved å endre celle: avkastningskrav`, `Sett celle: NNV. Til verdi: 1. Ved å endre celle: mengde`], correct: 0, why: `Målcellen er NNV, målverdien 0, og cellen som endres er inndatacellen for prisen. NNV-cellen må avhenge av priscellen gjennom formler.` });
  O.quiz.push({ ch: 6, q: `Salgsmengden varierer fra år til år. Hvordan finner du kritisk prisfall uten målsøking?`, options: [`Nåverdiannuitet delt på gjennomsnittlig mengde`, `NNV delt på nåverdien av mengdene`, `NNV delt på summen av mengdene`, `Nåverdiannuitet delt på dekningsbidraget`], correct: 1, why: `Et prisfall på ΔP reduserer kontantstrømmen med ΔP · mengde hvert år. Nåverdien av tapet er ΔP ganger nåverdien av mengdene, som settes lik NNV. Gjennomsnittlig eller udiskontert mengde tar ikke hensyn til tidsplasseringen.` });
  O.quiz.push({ ch: 6, q: `I et stjernediagram har prislinjen brattest helning. Hva betyr det?`, options: [`Prisen er den mest usikre faktoren`, `Prisen kan endres mest før NNV blir null`, `Prisen har ingen betydning for lønnsomheten`, `NNV er mest følsom for endringer i prisen`], correct: 3, why: `Bratt linje betyr at en gitt prosentvis endring slår sterkt ut i NNV. Diagrammet sier ikke noe om hvor sannsynlig en endring er – bare hvor mye den betyr.` });
})(typeof globalThis !== 'undefined' ? globalThis : this);
