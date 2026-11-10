/* Tidligere eksamener 2016–2020. */
(function (root) {
  'use strict';
  const O = (root.OKAD = root.OKAD || {});
  O.exams = O.exams || [];

  /* ===== Desember 2016 ===== */
  O.exams.push({
    id: '2016',
    year: 2016,
    title: 'Desember 2016',
    note: `<p><b>Skattejustert KVM:</b> Løsningsforslaget (LF) til oppgave 3 bruker kapitalverdimodellen <em>med</em> skattejustert risikofri rente, r<sub>e</sub> = r<sub>f</sub> · (1 − s) + β · [r<sub>m</sub> − r<sub>f</sub> · (1 − s)]. Dagens pensum (7. utg.) bruker KVM <em>uten</em> skattejustering, r<sub>e</sub> = r<sub>f</sub> + β · (r<sub>m</sub> − r<sub>f</sub>), slik at avkastningskrav og nåverdi vil avvike noe fra LF. Egen utregning (ikke LF): uten skattejustering blir r<sub>e</sub> = 12,36 % og WACC = 8,73 %, som fortsatt avrundes til 9 % – nåverdien i 3b blir da den samme så lenge du runder av til hel prosent.</p>
<p><b>Oppgave 4:</b> Oppgaveteksten har rotete bokstavering («a)» er bare innledning, «b)» er regnespørsmålet, og «c)» viser til «forklaringen i c)») – det ser ut til at et forklaringsspørsmål har falt ut. LF finnes i to versjoner: LF-regnearket bruker tallene i eksamensoppgaven og er riktig fasit, mens LF-PDF-en bruker andre tall (trolig fra en tidligere versjon av oppgaven).</p>
<p><b>Småfeil i LF-PDF:</b> «837 391» i teksten (riktig er 837 931), «A/B/Y» brukt om prosjekt S/L, og teksten til 2b sier «investeringskjede» der den mener engangsinvestering.</p>`,
    tasks: [
      {
        nr: 1, weight: 20,
        title: 'HighTech: selvutviklet enhet eller lisens',
        topics: ['prosjekt', 'payback', 'toprosjekt', 'folsomhet'],
        text: `<p>Bedriften AS HighTech produserer hovedsakelig elektroniske produkter som brukes i stabilitetskontrollen i nye bilmodeller (ESP). Selskapet står overfor valget mellom å produsere en ny bedre type selvutviklet styringsenhet (S), eller produsere en brikke på lisens (L) fra Bosch. Begge typer kan brukes av Mercedes Benz i den nye CLA-serien. Bedriften er usikker på hvilket alternativ som er mest lønnsomt, og har kontaktet deg for å gi din anbefaling. Følgende data foreligger:</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>Selvutviklet (S)</th><th>Lisens (L)</th></tr></thead><tbody><tr><th scope="row">Salgspris pr. enhet kr.</th><td>2 500</td><td>2 750</td></tr><tr><th scope="row">Variable enhetskostnader kr.</th><td>1 740</td><td>2 125</td></tr><tr><th scope="row">Økte faste kostnader pr. år kr.</th><td>6 000 000</td><td>4 725 000</td></tr><tr><th scope="row">Forventet årlig salg (enheter)</th><td>12 000</td><td>12 000</td></tr><tr><th scope="row">Levetid (år)</th><td>5</td><td>4</td></tr><tr><th scope="row">Investeringsutgift (kr)</th><td>11 250 000</td><td>8 500 000</td></tr><tr><th scope="row">Utrangervingsverdi (kr)</th><td>0</td><td>400 000</td></tr></tbody></table></div>`,
        parts: [
          {
            label: 'a',
            q: `Beregn nåverdien av prosjektene når avkastningskravet settes til 9 %.`,
            topics: ['prosjekt'],
            answer: `NV(S) = <b>885 712</b>, NV(L) = <b>773 593</b>.`,
            method: `<p>Årlig kontantstrøm S = (2 500 − 1 740) · 12 000 − 6 000 000 = 3 120 000. L = (2 750 − 2 125) · 12 000 − 4 725 000 = 2 775 000, pluss utrangeringsverdi 400 000 i år 4.</p>
<p>Kontantstrøm prosjekt S:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Dekningsbidrag</th><td></td><td>9 120 000</td><td>9 120 000</td><td>9 120 000</td><td>9 120 000</td><td>9 120 000</td></tr><tr><th scope="row">Økte faste kostnader</th><td></td><td>−6 000 000</td><td>−6 000 000</td><td>−6 000 000</td><td>−6 000 000</td><td>−6 000 000</td></tr><tr><th scope="row">Investering</th><td>−11 250 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>−11 250 000</td><td>3 120 000</td><td>3 120 000</td><td>3 120 000</td><td>3 120 000</td><td>3 120 000</td></tr></tbody></table></div>
<p>Kontantstrøm prosjekt L:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr><th scope="row">Dekningsbidrag</th><td></td><td>7 500 000</td><td>7 500 000</td><td>7 500 000</td><td>7 500 000</td></tr><tr><th scope="row">Økte faste kostnader</th><td></td><td>−4 725 000</td><td>−4 725 000</td><td>−4 725 000</td><td>−4 725 000</td></tr><tr><th scope="row">Investering / utrangering</th><td>−8 500 000</td><td></td><td></td><td></td><td>400 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>−8 500 000</td><td>2 775 000</td><td>2 775 000</td><td>2 775 000</td><td>3 175 000</td></tr></tbody></table></div>
<p>Med finansiell kalkulator: NV(S) = 885 712 og NV(L) = 773 593.</p>
<p>Med rentetabell:</p>
<div class="formula">NPV S = −11 250 000 + 3 120 000 · A(5, 9 %) = −11 250 000 + 3 120 000 · 3,8897 = 885 864</div>
<div class="formula">NPV L = −8 500 000 + 2 775 000 · A(3, 9 %) + 3 175 000 · R<sup>−1</sup>(4, 9 %) = −8 500 000 + 2 775 000 · 2,5313 + 3 175 000 · 0,7084 = 773 528</div>
<p>Avrundingsavviket ved bruk av tabell er «uten betydning».</p>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Beregn internrenten for prosjektene.`,
            topics: ['prosjekt'],
            answer: `Internrente S = <b>11,99 %</b> (≈ 12 %), L = <b>13,00 %</b>.`,
            method: `<p>Internrenten er den renten som gir nåverdi lik null for kontantstrømmene i a). Den finnes med finansiell kalkulator: S = 11,99 % (≈ 12 %) og L = 13,00 %.</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Beregn tilbakebetalingstiden (pay-back) for prosjektene.`,
            topics: ['payback'],
            answer: `Pay-back S = <b>3,61 år</b>, L = <b>3,1 år</b> (3,06).`,
            method: `<div class="formula">Pay-back S = <span class="frac"><span>11 250 000</span><span>3 120 000</span></span> = 3,61 år</div>
<div class="formula">Pay-back L = <span class="frac"><span>8 500 000</span><span>2 775 000</span></span> = 3,1 år (3,06)</div>
<p>Man kan argumentere for at reell tilbakebetalingstid for L er enda kortere på grunn av restverdien; begge svar godtas.</p>`,
            src: 'LF'
          },
          {
            label: 'd',
            q: `På basis av de resultatene du har kommet fram til i a) til c) over, hvilket prosjekt vil du anbefale? Svaret skal begrunnes.`,
            topics: ['toprosjekt'],
            answer: `Velg <b>S</b> (høyest nåverdi). Internrenten på differanseinvesteringen S − L er <b>10,08 %</b> &gt; 9 %.`,
            method: `<p>Metodene rangerer ulikt: nåverdi favoriserer S, mens internrente og pay-back favoriserer L. Velg prosjektet med høyest nåverdi = S.</p>
<p>Internrentemetoden kan ikke uten videre rangere gjensidig utelukkende prosjekter; man må beregne differanseinvesteringen S − L og dens internrente:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Prosjekt S</th><td>−11 250 000</td><td>3 120 000</td><td>3 120 000</td><td>3 120 000</td><td>3 120 000</td><td>3 120 000</td></tr><tr><th scope="row">Prosjekt L</th><td>−8 500 000</td><td>2 775 000</td><td>2 775 000</td><td>2 775 000</td><td>3 175 000</td><td>–</td></tr><tr class="sum"><th scope="row">S − L</th><td>−2 750 000</td><td>345 000</td><td>345 000</td><td>345 000</td><td>−55 000</td><td>3 120 000</td></tr></tbody></table></div>
<p>Internrenten på differanseinvesteringen = 10,08 % &gt; 9 % → velg det største prosjektet (S). (LF-teksten skriver ett sted «A» og «B»/«Y» for S og L – skrivefeil i LF.)</p>
<p><em>Egen merknad (ikke LF):</em> Prosjektene har ulik levetid (5 mot 4 år), men LF sammenligner rene nåverdier uten å justere for levetid (ingen årsannuitet/kjede).</p>`,
            src: 'LF+egen'
          },
          {
            label: 'e',
            q: `Kan et annet avkastningskrav gjøre om på din anbefaling i d)?`,
            topics: ['toprosjekt'],
            answer: `Ja. Ved avkastningskrav <b>10,08 %</b> er nåverdiene like; ved krav over dette er NV(L) &gt; NV(S).`,
            method: `<p>Internrenten på differanseinvesteringen S − L (10,08 %) er det avkastningskravet der de to prosjektene har lik nåverdi. Ved avkastningskrav over 10,08 % er NV(L) &gt; NV(S), og anbefalingen snur.</p>`,
            src: 'LF'
          },
          {
            label: 'f',
            q: `Se bort fra punkt e). Etter å ha bestemt deg for å anbefale ett av prosjektene, ønsker du å kartlegge usikkerheten knyttet til en del av faktorene i din lønnsomhetsanalyse. Utfør en følsomhetsanalyse av pris og salgsmengde for det prosjektet du valgte i d).`,
            topics: ['folsomhet'],
            answer: `Nåverdiannuitet = <b>227 707</b> per år. Laveste pris ≈ <b>2 481,02</b>, laveste mengde ≈ <b>11 700,4 enheter</b>.`,
            method: `<p>Gjør NV(S) = 885 712 om til en nåverdiannuitet:</p>
<div class="formula"><span class="frac"><span>885 712</span><span>A(5, 9 %)</span></span> = <span class="frac"><span>885 712</span><span>3,8897</span></span> = 227 707 per år</div>
<p>Faller den årlige kontantstrømmen med 227 707, blir NPV = 0.</p>
<ul>
<li>Pris kan falle 227 707 / 12 000 = 18,98 → laveste pris ≈ 2 481,02.</li>
<li>Mengde kan falle 227 707 / (2 500 − 1 740) = 299,6 → laveste mengde ≈ 11 700,4 enheter.</li>
</ul>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 2, weight: 25,
        title: 'Sørlandsskuffa: utskifting og optimal levetid',
        topics: ['prosjekt', 'levetid'],
        text: `<p>AS Sørlandsskuffa produserer snøskuffer som er effektive til å fjerne snø ved store nedbørsmengder. Maskinen som brukes til produksjon ble kjøpt inn for 6 år siden til en pris på 1 millioner kr. Maskinen har sett sine bedre dager og man vurderer nå å selge denne for 200 000 kr. Man regner ikke med at den varer mer enn 6 år til, og at den da kan selges for 50 000 kr.</p>
<p>Ledelsen har derfor vurdert en ny maskin som koster 2,5 millioner kr i dag. Om 6 år han man uansett tenkt å avslutte produksjon av snøskuffer, og man regner med at maskinen da kan selges for 1 million kr. Hvis man kjøper den nye maskinen, må man beregne ytterligere 150 000 kr til installasjon og at de årlige faste kostnadene vil øke fra 400 000 til 475 000 kr. Fordelen med den nye maskinen er at bedriften kan øke sin produksjon (det er også marked for det) og de variable kostnadene pr. enhet reduseres. Tabellen under gir ytterligere informasjon om de to maskinene:</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>Gammel maskin</th><th>Ny maskin</th></tr></thead><tbody><tr><th scope="row">Årlig sagsvolum (antall snøskuffer)</th><td>800</td><td>1 200</td></tr><tr><th scope="row">Salgspris pr. enhet</th><td>1 500</td><td>1 500</td></tr><tr><th scope="row">Direkte materialer pr. enhet</th><td>400</td><td>400</td></tr><tr><th scope="row">Direkte lønn pr. enhet</th><td>500</td><td>300</td></tr><tr><th scope="row">Øvrige variable enhetskostnader</th><td>150</td><td>100</td></tr></tbody></table></div>
<p>Bedriften bruker et avkastningskrav på 12 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Bør AS Sørlandsskuffa erstatte den gamle maskinen med en ny?`,
            topics: ['prosjekt', 'levetid'],
            answer: `Nei – behold den gamle maskinen. NV behold gammel = <b>1 505 438</b> &gt; NV kjøp ny = <b>1 201 858</b> (differanse 303 580).`,
            method: `<p>Sett opp kontantstrømmen for hvert alternativ over de 6 årene og sammenlign nåverdiene ved 12 %.</p>
<p>Alternativ «behold gammel»:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody><tr><th scope="row">Salgsverdi gammel</th><td></td><td></td><td></td><td></td><td></td><td></td><td>50 000</td></tr><tr><th scope="row">Dekningsbidrag</th><td></td><td>360 000</td><td>360 000</td><td>360 000</td><td>360 000</td><td>360 000</td><td>360 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td></td><td>360 000</td><td>360 000</td><td>360 000</td><td>360 000</td><td>360 000</td><td>410 000</td></tr></tbody></table></div>
<p>NV (12 %) = 1 505 438.</p>
<p><em>Egen kontroll (ikke LF):</em> DB gammel = (1 500 − 400 − 500 − 150) · 800 = 450 · 800 = 360 000. De eksisterende faste kostnadene (400 000) tas ikke med i noen av alternativene; kun økningen på 75 000 belastes ny maskin.</p>
<p>Alternativ «kjøp ny»:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th></tr></thead><tbody><tr><th scope="row">Kjøp og salg av ny</th><td>−2 500 000</td><td></td><td></td><td></td><td></td><td></td><td>1 000 000</td></tr><tr><th scope="row">Selg gammel</th><td>200 000</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Installasjon</th><td>−150 000</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Dekningsbidrag</th><td></td><td>840 000</td><td>840 000</td><td>840 000</td><td>840 000</td><td>840 000</td><td>840 000</td></tr><tr><th scope="row">Økte faste kostnader</th><td></td><td>−75 000</td><td>−75 000</td><td>−75 000</td><td>−75 000</td><td>−75 000</td><td>−75 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>−2 450 000</td><td>765 000</td><td>765 000</td><td>765 000</td><td>765 000</td><td>765 000</td><td>1 765 000</td></tr></tbody></table></div>
<p>NV (12 %) = 1 201 858.</p>
<p><em>Egen kontroll (ikke LF):</em> DB ny = (1 500 − 400 − 300 − 100) · 1 200 = 700 · 1 200 = 840 000.</p>
<p>Nåverdien er høyere ved å beholde den gamle maskinen (1 505 438 &gt; 1 201 858; differanse 303 580 i LF-regnearket) → ikke bytt, behold gammel maskin.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `<p>AS Sørandsskuffa produserer også andre produkter og maskinen som brukes begynner å bli helt nedslitt. Man vurderer derfor å anskaffe en ny maskin med en kostpris på 1,6 millioner kr. Maskinen har en teknisk levetid på 5 år og avkastningskravet er fremdeles 12 %.</p>
<p>Kontantstrømmen fra produksjonen hvor maskinen brukes og salgsverdi for den nye maskinen avhengig av hvor lenge den beholdes, er gitt i tabellen under:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Ny maskin</th><th>År 1</th><th>År 2</th><th>År 3</th><th>År 4</th><th>År 5</th></tr></thead><tbody><tr><th scope="row">Kontantstrøm</th><td>800 000</td><td>700 000</td><td>550 000</td><td>300 000</td><td>100 000</td></tr><tr><th scope="row">Salgsverdi</th><td>1 000 000</td><td>550 000</td><td>450 000</td><td>300 000</td><td>50 000</td></tr></tbody></table></div>
<p>Hva er optimal økonomisk levetid for den nye maskinen dersom den er en engangsinvestering?</p>`,
            topics: ['levetid'],
            answer: `<b>4 år</b> (høyest nåverdi, NV = 445 111).`,
            method: `<p>LF beregner nåverdi og nåverdiannuitet for hver mulig levetid. Kontantstrømmen siste år = driftskontantstrøm + salgsverdi.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Levetid</th><th>År 0</th><th>År 1</th><th>År 2</th><th>År 3</th><th>År 4</th><th>År 5</th><th>NPV</th><th>Annuitet</th></tr></thead><tbody><tr><th scope="row">1 år</th><td>−1 600 000</td><td>1 800 000</td><td></td><td></td><td></td><td></td><td>7 143</td><td>8 000</td></tr><tr><th scope="row">2 år</th><td>−1 600 000</td><td>800 000</td><td>1 250 000</td><td></td><td></td><td></td><td>110 778</td><td>65 547</td></tr><tr><th scope="row">3 år</th><td>−1 600 000</td><td>800 000</td><td>700 000</td><td>1 000 000</td><td></td><td></td><td>384 102</td><td>159 920</td></tr><tr><th scope="row">4 år</th><td>−1 600 000</td><td>800 000</td><td>700 000</td><td>550 000</td><td>600 000</td><td></td><td>445 111</td><td>146 546</td></tr><tr><th scope="row">5 år</th><td>−1 600 000</td><td>800 000</td><td>700 000</td><td>550 000</td><td>300 000</td><td>150 000</td><td>339 570</td><td>94 200</td></tr></tbody></table></div>
<p>Engangsinvestering → behold maskinen det antall år som maksimerer nåverdien = 4 år (NV 445 111). (LF-teksten skriver «Dersom det er en investeringskjede» her, men mener åpenbart engangsinvestering – skrivefeil i LF.)</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Hva er optimal økonomisk levetid for den nye maskinen dersom det er en investeringskjede (maskinen erstattes med en identisk) i all framtid?`,
            topics: ['levetid'],
            answer: `Skift ut <b>hvert 3. år</b> (høyest nåverdiannuitet, 159 920).`,
            method: `<p>Bruk samme tabell som i b), men se på kolonnen for nåverdiannuitet (NPV fordelt som lik årlig annuitet over levetiden ved 12 %):</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Levetid</th><th>NPV</th><th>Annuitet</th></tr></thead><tbody><tr><th scope="row">1 år</th><td>7 143</td><td>8 000</td></tr><tr><th scope="row">2 år</th><td>110 778</td><td>65 547</td></tr><tr><th scope="row">3 år</th><td>384 102</td><td>159 920</td></tr><tr><th scope="row">4 år</th><td>445 111</td><td>146 546</td></tr><tr><th scope="row">5 år</th><td>339 570</td><td>94 200</td></tr></tbody></table></div>
<p>Investeringskjede → skift ut slik at nåverdiannuiteten maksimeres = hvert 3. år (annuitet 159 920).</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 3, weight: 35,
        title: 'IMAX Heartsafe: WACC og nåverdi etter skatt',
        topics: ['kvm', 'skatt'],
        text: `<p>AS IMAX har vurderer å lansere et nytt produkt, nemlig en ny ergometersykkel Heartsafe. Sykkelen har kostet 500 000 å utvikle, og en viktig nyvinning er avansert programvare som overvåker hjerterytme og som gir brukere god informasjon om hvor hardt man kan presse kroppen. Budsjettert salgspris til detaljister er 2 200 kr pr. enhet, og dekningsgraden er budsjettert til 45 %. Prosjektets levetid er tenkt å være 5 år, og man budsjetterer med følgende årlige salgsvolum i levetiden:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>Volum</th></tr></thead><tbody><tr><th scope="row">Volum år 1</th><td>2 000</td></tr><tr><th scope="row">Volum år 2</th><td>2 100</td></tr><tr><th scope="row">Volum år 3</th><td>2 100</td></tr><tr><th scope="row">Volum år 4</th><td>1 800</td></tr><tr><th scope="row">Volum år 5</th><td>1 500</td></tr></tbody></table></div>
<p>Dersom produktet lansertes, vil også arbeidskapitalbehovet øke. Det er anslått at arbeidskapitalen vil utgjøre 20 % av omsetningen.</p>
<p>En leder må tilsettes for å håndtere etableringen og produksjon/salg av det nye produktet. Det er budsjettert med en lønn på kr 550 000 årlig. En person som allerede er ansatt vil ivareta denne funksjonen, men på grunn av økt ansvar vil vedkommende få en lønnsøkning på kr 200 000.</p>
<p>Prosjektet vil også bli belastet med indirekte kostnader på 500 000 kr årlig. Halvparten av disse kostnadene oppstår pga. prosjektet.</p>
<p>Investeringen i produksjonsutstyr vil eventuelt utgjøre 4 500 000 kr. Ved levetidens slutt regner man med at anleggsmidlene kan selges for 800 000 kr. Salget skal behandles på den skattemessig gunstigste måten.</p>
<p>Anleggsmidlene avskrives med en saldosats på 20 % årlig og skattesatsen er 27 %. Bedriften finansierer sine investeringer med en gjeldsandel på 40 % og bedriften betaler en gjeldsrente på 4,5 % før skatt. Risikofri rente er 3 %, avkastningen på markedsporteføljen er 9 % og bedriftens aksjebeta er 1,56.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn bedriftens totalavkastningskrav, WACC. Rund gjerne av til nærmeste hele prosent.`,
            topics: ['kvm'],
            answer: `r<sub>e</sub> = <b>12,78 %</b> (12,81 % i LF-regnearket), WACC = 8,98 % / 9,00 % → avrundes til <b>9 %</b>.`,
            method: `<p>LF bruker KVM <em>med skatt</em> (formelsamlingens formel 6.2) og veid kapitalkostnad (formel 6.9):</p>
<div class="formula">r<sub>e</sub> = 0,03 · (1 − 0,27) + [0,09 − 0,03 · (1 − 0,27)] · 1,56 = 0,1278 (PDF) / 0,128136 (regneark)</div>
<div class="formula">r<sub>t</sub> = 0,045 · (1 − 0,27) · 0,40 + 0,1278 · 0,60 = 0,0898 (PDF) / 9,00 % (regneark)</div>
<p>Avrundes til WACC = 9 %.</p>
<p><em>Egen kontroll (ikke LF):</em> r<sub>e</sub> = 0,0219 + 1,56 · 0,0681 = 0,128136; WACC = 0,01314 + 0,07688 = 0,0900. Stemmer med regnearket.</p>
<p><b>Merk:</b> Dagens pensum (7. utg.) bruker KVM uten skattejustering av risikofri rente. Egen utregning (ikke LF): r<sub>e</sub> = 0,03 + 1,56 · (0,09 − 0,03) = 12,36 % og WACC = 0,045 · 0,73 · 0,40 + 0,1236 · 0,60 = 8,73 % – som også avrundes til 9 %.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Hva er prosjektets nåverdi etter skatt? Vis grunnlaget for beregningen. Bør prosjektet gjennomføres?`,
            topics: ['skatt'],
            answer: `Nåverdi etter skatt = <b>588 824</b> → prosjektet er lønnsomt og bør gjennomføres.`,
            method: `<p>Nøkkelpunkter i LF:</p>
<ul>
<li>Utviklingskostnaden 500 000 er sunk cost – ikke med.</li>
<li>Lederlønn: kun lønnsøkningen 200 000 er relevant (ikke 550 000).</li>
<li>Indirekte kostnader: kun halvparten (250 000) er merkostnad.</li>
<li>Variable kostnader = 55 % av omsetningen (dekningsgrad 45 %).</li>
<li>Arbeidskapital = 20 % av omsetningen, bindes året <em>før</em> (år 0: 20 % · 4 400 000 = 880 000; år 1: økning 44 000; år 3 og 4: frigjøring 132 000; år 5: resten 660 000 frigjøres).</li>
<li>Skatt beregnes på driftskontantstrøm før skatt (uten avskrivninger); avskrivningenes skatteeffekt legges inn som nåverdi i år 0 (formel 3.5/3.6).</li>
</ul>
<p>NV av spart skatt på saldoavskrivningene:</p>
<div class="formula"><span class="frac"><span>4 500 000 · 0,20 · 0,27</span><span>0,09 + 0,20</span></span> = 837 931</div>
<p>(PDF-teksten skriver «837 391», tabellen og regnearket har 837 931 – skrivefeil i teksten.)</p>
<p>Salgssummen 800 000 nedskrives på saldo («skattemessig gunstigste måte»). NV av økt skatt:</p>
<div class="formula"><span class="frac"><span>800 000 · 0,20 · 0,27</span><span>1,09<sup>5</sup> · (0,09 + 0,20)</span></span> = 96 817 (inngår som −96 817)</div>
<p>Beregningsgrunnlag (9 %):</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Salgsinntekter</th><td></td><td>4 400 000</td><td>4 620 000</td><td>4 620 000</td><td>3 960 000</td><td>3 300 000</td></tr><tr><th scope="row">Variable kostnader</th><td></td><td>−2 420 000</td><td>−2 541 000</td><td>−2 541 000</td><td>−2 178 000</td><td>−1 815 000</td></tr><tr><th scope="row">Økte indirekte kostnader</th><td></td><td>−250 000</td><td>−250 000</td><td>−250 000</td><td>−250 000</td><td>−250 000</td></tr><tr><th scope="row">Lønnsøkning</th><td></td><td>−200 000</td><td>−200 000</td><td>−200 000</td><td>−200 000</td><td>−200 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm drift før skatt</th><td></td><td>1 530 000</td><td>1 629 000</td><td>1 629 000</td><td>1 332 000</td><td>1 035 000</td></tr><tr><th scope="row">Skatt (27 %)</th><td></td><td>−413 100</td><td>−439 830</td><td>−439 830</td><td>−359 640</td><td>−279 450</td></tr><tr><th scope="row">Arbeidskapital</th><td>−880 000</td><td>−44 000</td><td>0</td><td>132 000</td><td>132 000</td><td>660 000</td></tr><tr><th scope="row">Anleggsmidler</th><td>−4 500 000</td><td></td><td></td><td></td><td></td><td>800 000</td></tr><tr><th scope="row">NV spart skatt avskrivning</th><td>837 931</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">NV økt skatt nedskrivning</th><td>−96 817</td><td></td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Beregningsgrunnlag</th><td>−4 638 886</td><td>1 072 900</td><td>1 189 170</td><td>1 321 170</td><td>1 104 360</td><td>2 215 550</td></tr></tbody></table></div>
<p>Nåverdi etter skatt ved 9 % = 588 824 → prosjektet er lønnsomt og bør gjennomføres.</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 4, weight: 20,
        title: 'Lottovinner: to aksjer og portefølje',
        topics: ['portefolje'],
        text: `<p>a) En student har hatt hellet med seg og vunnet et betydelig beløp i Lotto. Han/hun vurderer å plassere pengene i aksjemarkedet, men han/hun sier at risikoen ikke kan være for høy fordi han/hun planlegger å bruke beløpet som egenkapital ved anskaffelse av leilighet når studiene er fullført om få år. Konkret vurderes to aksjer, aksje A og B. Avkastningen påvirkes av svingninger i etterspørselen etter bedriftenes produkter, og kan illustreres slik:</p>
<p>Aksje A</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Etterspørsel</th><th>Sannsynlighet</th><th>Avkastning</th></tr></thead><tbody><tr><th scope="row">Høy</th><td>0,20</td><td>14,00 %</td></tr><tr><th scope="row">Normal</th><td>0,50</td><td>10,00 %</td></tr><tr><th scope="row">Lav</th><td>0,30</td><td>−4,00 %</td></tr></tbody></table></div>
<p>Aksje B</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Etterspørsel</th><th>Sannsynlighet</th><th>Avkastning</th></tr></thead><tbody><tr><th scope="row">Høy</th><td>0,20</td><td>9,00 %</td></tr><tr><th scope="row">Normal</th><td>0,50</td><td>7,00 %</td></tr><tr><th scope="row">Lav</th><td>0,30</td><td>−2,00 %</td></tr></tbody></table></div>`,
        parts: [
          {
            label: 'b',
            q: `Beregn forventet avkastning og avkastningens standardavvik for aksje A og B.`,
            topics: ['portefolje'],
            answer: `Aksje A: E(r) = <b>6,60 %</b>, σ = <b>7,10 %</b>. Aksje B: E(r) = <b>4,70 %</b>, σ = <b>4,45 %</b>.`,
            method: `<p><b>Viktig:</b> LF-PDF og LF-regnearket bruker ulike tall. LF-regnearket bruker tallene i eksamensoppgaven og er riktig fasit for oppgaven slik den står:</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>Aksje A</th><th>Aksje B</th></tr></thead><tbody><tr><th scope="row">Forventet avkastning</th><td>6,60 %</td><td>4,70 %</td></tr><tr><th scope="row">Varians</th><td>0,0050</td><td>0,0020</td></tr><tr><th scope="row">Standardavvik</th><td>7,10 %</td><td>4,45 %</td></tr></tbody></table></div>
<p>Forventet avkastning er sannsynlighetsveid gjennomsnitt, variansen er sannsynlighetsveid kvadrert avvik fra forventningen, og standardavviket er kvadratroten av variansen.</p>
<p><em>Egen kontroll (ikke LF):</em></p>
<ul>
<li>E(A) = 0,2 · 14 + 0,5 · 10 + 0,3 · (−4) = 6,6 %. Var(A) = 0,2 · 7,4<sup>2</sup> + 0,5 · 3,4<sup>2</sup> + 0,3 · 10,6<sup>2</sup> = 50,44 (%<sup>2</sup>) = 0,005044 → σ = 7,10 %.</li>
<li>E(B) = 1,8 + 3,5 − 0,6 = 4,7 %. Var(B) = 0,2 · 4,3<sup>2</sup> + 0,5 · 2,3<sup>2</sup> + 0,3 · 6,7<sup>2</sup> = 19,81 (%<sup>2</sup>) = 0,001981 → σ = 4,45 %.</li>
</ul>
<p><b>LF-PDF</b> bruker andre tall enn eksamensoppgaven (sannsynligheter 0,25/0,50/0,25, avkastning A 15 %/10 %/−3 %, B 8 %/7 %/−2 % – trolig fra en tidligere versjon av oppgaven): E(r<sub>A</sub>) = 0,25 · 0,15 + 0,50 · 0,10 − 0,25 · 0,03 = 0,08; E(r<sub>B</sub>) = 0,25 · 0,08 + 0,50 · 0,07 − 0,25 · 0,02 = 0,05; σ<sup>2</sup>(r<sub>A</sub>) = 0,004450 → σ = 6,67 %; σ<sup>2</sup>(r<sub>B</sub>) = 0,001650 → σ = 4,06 %.</p>
<p>LF forklarer også hva størrelsene uttrykker: Forventet avkastning gjenspeiler avkastningen man kan oppnå dersom man eier aksjen lenge. Standardavviket måler risiko, eller hvor ofte og hvor mye avkastningen avviker fra forventet verdi.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'c',
            q: `Legg til grunn at de to selskapene opererer i helt ulike bransjer, slik at avkastningen til aksjene ikke er korrelert (korrelasjonskoeffisienten er 0). Basert på din beregning i b) og forklaringen i c) og ønsket om lav risiko, så sier studenten at alle pengene bør plasseres i aksje B. Er dette et fornuftig valg? Foreta relevante beregninger og ta stilling til om denne plasseringsstrategien er fornuftig.`,
            topics: ['portefolje'],
            answer: `Nei. En 50/50-portefølje gir E(r) = <b>5,65 %</b> og σ = <b>4,19 %</b> – høyere avkastning og lavere risiko enn B alene. Minimum-varians-porteføljen har andel A = <b>0,2820</b>, E(r) = <b>5,24 %</b>, σ = <b>3,77 %</b>.`,
            method: `<p>Det er ikke fornuftig å legge alle eggene i én kurv, selv om B har lavere standardavvik enn A. Siden kovariansen er 0, faller kovariansleddet i porteføljevariansen bort:</p>
<div class="formula">Var(r<sub>P</sub>) = w<sub>A</sub><sup>2</sup> · σ<sub>A</sub><sup>2</sup> + w<sub>B</sub><sup>2</sup> · σ<sub>B</sub><sup>2</sup></div>
<p><b>LF-regnearket (oppgavens tall):</b></p>
<ul>
<li>Portefølje 50/50: forventet avkastning 5,65 %, varians 0,00175625, standardavvik 4,19 % → høyere forventet avkastning og lavere standardavvik enn B alene.</li>
<li>Minimum-varians-portefølje: andel A = 0,2820, andel B = 0,7180, forventet avkastning 5,24 %, varians 0,001422372, standardavvik 3,77 %.</li>
</ul>
<p>Formel for minimum-varians-andelen ved ρ = 0:</p>
<div class="formula">w<sub>A</sub> = <span class="frac"><span>σ<sup>2</sup><sub>B</sub></span><span>σ<sup>2</sup><sub>A</sub> + σ<sup>2</sup><sub>B</sub></span></span> = <span class="frac"><span>0,001981</span><span>0,007025</span></span> = 0,2820</div>
<p>En likeveid portefølje gir altså høyere avkastning og lavere standardavvik enn B alene → B alene er ikke effisient. LF: «Oppgaven konkretiserer med hensikt ikke presist hva studentene skal gjøre, men man må påpeke og eksemplifisere at A og B i portefølje vil dominere over B alene og ulike sammensetninger aksepteres som gode løsninger.»</p>
<p><b>LF-PDF (andre tall enn eksamensoppgaven, se b):</b> 50/50: E(r<sub>P</sub>) = 0,065; σ<sup>2</sup>(r<sub>P</sub>) = 0,5<sup>2</sup> · 0,004450 + 0,5<sup>2</sup> · 0,001650 = 0,001525; σ = 3,905 %. Minimum-varians: optimal andel A = 0,001650 / (0,004450 + 0,001650) = 0,2705 → forventet avkastning 5,81 %, standardavvik 3,47 %.</p>`,
            src: 'LF'
          }
        ]
      }
    ]
  });

  /* ===== Mars 2017 ===== */
  O.exams.push({
    id: '2017',
    year: 2017,
    title: 'Mars 2017',
    note: `<p><b>LF er bare et regneark med tall.</b> Sluttsvarene er hentet fra LF-regnearket, mens metodebeskrivelsene er en tolkning av regnearkets linjer (kontrollregnet). Drøftingsdelene (4c, forklaringen i 4d og 4e) har ingen LF-tekst; det som står der er egen skisse.</p>
<p><b>Skattejustert KVM:</b> LF til oppgave 2d bruker kapitalverdimodellen <em>med</em> skattejustert risikofri rente, r<sub>e</sub> = r<sub>f</sub> · (1 − s) + β · [r<sub>m</sub> − r<sub>f</sub> · (1 − s)]. Dagens pensum (7. utg.) bruker KVM <em>uten</em> skattejustering, slik at avkastningskrav og nåverdi vil avvike noe fra LF. Egen utregning (ikke LF): uten skattejustering blir r<sub>e</sub> = 9,33 % og WACC = 8,04 %, som fortsatt avrundes til 8 % – nåverdien i 2e blir da den samme så lenge du runder av til hel prosent.</p>
<p><b>Oppgave 4d/4e:</b> LF oppgir internrenten på differanseinvesteringen Y − X til 9,17 %. Etterregning (egen utregning, ikke LF) gir 8,68 %; konklusjonene endres ikke.</p>`,
    tasks: [
      {
        nr: 1, weight: 20,
        title: 'Renteregning, annuitetslån og effektiv rente',
        topics: ['rente', 'levetid', 'laan'],
        text: ``,
        parts: [
          {
            label: 'a',
            q: `Hva er nåverdien av kr 5 000 om 7 år når renta er 6 %?`,
            topics: ['rente'],
            answer: `PV = <b>3 325</b>.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<div class="formula">PV = <span class="frac"><span>5 000</span><span>1,06<sup>7</sup></span></span> = 3 325,29</div>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Anta at du setter kr 5 000 i banken i dag. Hvor mye kan du heve etter 10 år når renta er 5 % de første 4 årene og deretter stiger til 7 % årlig?`,
            topics: ['rente'],
            answer: `Sluttverdi = <b>9 121</b>.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>4 år med 5 % og deretter 6 år med 7 %:</p>
<div class="formula">FV = 5 000 · 1,05<sup>4</sup> · 1,07<sup>6</sup> = 9 120,74</div>`,
            src: 'LF+egen'
          },
          {
            label: 'c',
            q: `En bruktbil koster kr 120 000. Bilen kan selges for kr 10 000 etter 6 år. Hva er den årlige kostnaden (avskrivning og rentekostnader) hvis renta er 9 %?`,
            topics: ['levetid', 'rente'],
            answer: `Nåverdi av kostnaden = 114 037; årlig kostnad = <b>25 421</b>.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Nåverdien av kostnaden ved å eie bilen («Kostnad bil» i LF):</p>
<div class="formula">120 000 − <span class="frac"><span>10 000</span><span>1,09<sup>6</sup></span></span> = 114 037</div>
<p>Gjøres om til en annuitet over 6 år ved 9 %:</p>
<div class="formula"><span class="frac"><span>114 037</span><span>A(6, 9 %)</span></span> = <span class="frac"><span>114 037</span><span>4,4859</span></span> = 25 421</div>`,
            src: 'LF+egen'
          },
          {
            label: 'd',
            q: `Et verdipapir gir en utbetaling på kr 30 000 hvert år i 6 år. Anta at første beløp kommer om ett år. Hva er markedsverdien på verdipapiret hvis renta er 7 %?`,
            topics: ['rente'],
            answer: `PV = <b>142 996</b>.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<div class="formula">PV = 30 000 · A(6, 7 %) = 30 000 · 4,7665 = 142 996</div>`,
            src: 'LF+egen'
          },
          {
            label: 'e',
            q: `Finn renter og avdrag det første året på et annuitetslån over 4 år når lånerenten er 6 % pr. år og lånebeløpet er kr 400 000. Renter og avdrag skal betales hvert halvår.`,
            topics: ['laan'],
            answer: `Terminbeløp = <b>56 983</b> per halvår. Første år: renter 12 000 + 10 651 = <b>22 651</b>, avdrag 44 983 + 46 332 = <b>91 315</b> (årssummene er egen summering).`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Halvårsrente 3 % (6 % / 2), 8 terminer. Terminbeløp (ytelse) = 400 000 · A<sup>−1</sup>(8, 3 %) = 56 983.</p>
<div class="tablewrap"><table class="data"><thead><tr><th></th><th>6 mnd</th><th>12 mnd</th></tr></thead><tbody><tr><th scope="row">Rente</th><td>12 000</td><td>10 651</td></tr><tr><th scope="row">Avdrag</th><td>44 983</td><td>46 332</td></tr><tr class="sum"><th scope="row">Sum</th><td>56 983</td><td>56 983</td></tr></tbody></table></div>
<p>Rente i termin 2 = 3 % av restgjeld 355 017.</p>
<p><em>Egen sum for første år (ikke LF):</em> renter 12 000 + 10 651 = 22 651, avdrag 44 983 + 46 332 = 91 315.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'f',
            q: `Anta at det påløper et etableringsgebyr på kr 1 500 ved låneopptak og et termingebyr på kr 60 ved hvert forfall på lånet i e). Hva er lånets effektive rente?`,
            topics: ['laan'],
            answer: `Halvårsrente = 3,11 %, effektiv årsrente = <b>6,33 %</b>.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Kontantstrøm for låntaker: +398 500 (400 000 − 1 500) i dag, deretter −57 043 (56 983 + 60) i 8 halvår. Internrenten per halvår = 3,11 %.</p>
<div class="formula">Effektiv årsrente = 1,0311<sup>2</sup> − 1 = 6,33 %</div>`,
            src: 'LF+egen'
          }
        ]
      },
      {
        nr: 2, weight: 40,
        title: 'Aqua: vann på flaske',
        topics: ['prosjekt', 'folsomhet', 'kvm', 'skatt'],
        text: `<p>Bedriften Aqua vurderer å investere kr 5 000 000 i et produksjonsanlegg for vann på flasker. I tillegg til anleggsinvesteringene må arbeidskapitalen økes med kr 2 000 000. Bedriften har inngått en kontrakt med to store dagligvarekjeder som vil distribuere produktet. Prisen pr. flaske til distributør vil være kr 6 og de variable produksjonskostnadene kr 3 pr. flaske. Det er budsjettert å selge 1 000 000 flasker pr. år i 5 år. Betalbare faste driftskostnader vil bli kr 500 000 pr. år dersom prosjektet starter. Det vil også være nødvendig med intensiv markedsføring av produktet, og man antar at markedsføringskostnadene vil bli kr 500 000 pr. år. Eieren av grunnen hvor tappingen skjer, vil overta anleggsmidlene gratis (ingen betaling) ved levetidens slutt, men det er anslått at markedsverdien på dette tidspunktet vil være kr 1 500 000. Avkastningskravet er 11 %. Se bort fra skatt i del a) til c) i oppgaven.</p>`,
        parts: [
          {
            label: 'a',
            q: `Finn nåverdi og internrente til prosjektet. Er prosjektet lønnsomt?`,
            topics: ['prosjekt'],
            answer: `NV (11 %) = <b>1 578 697</b>, internrente = <b>18,7 %</b> → lønnsomt.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Faste kostnader = 500 000 drift + 500 000 markedsføring = 1 000 000. Dekningsbidrag = (6 − 3) · 1 000 000 = 3 000 000.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Dekningsbidrag</th><td></td><td>3 000 000</td><td>3 000 000</td><td>3 000 000</td><td>3 000 000</td><td>3 000 000</td></tr><tr><th scope="row">Faste kostnader</th><td></td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td></tr><tr><th scope="row">Arbeidskapital</th><td>−2 000 000</td><td></td><td></td><td></td><td></td><td>2 000 000</td></tr><tr><th scope="row">Anleggsmidler</th><td>−5 000 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>−7 000 000</td><td>2 000 000</td><td>2 000 000</td><td>2 000 000</td><td>2 000 000</td><td>4 000 000</td></tr></tbody></table></div>
<p>NV (11 %) = 1 578 697. Internrente = 18,7 %. → lønnsomt (NV &gt; 0, internrente &gt; 11 %).</p>
<p>Merk: anleggsmidlene gir <em>ingen</em> salgsinntekt i år 5 (gis bort gratis); arbeidskapitalen frigjøres i år 5.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Hva er laveste antall flasker man må selge pr. år for at prosjektet skal være lønnsomt?`,
            topics: ['folsomhet'],
            answer: `Laveste salgsvolum = <b>857 617 flasker</b> pr. år (volumet kan falle med 142 383).`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Gjør nåverdien om til en nåverdiannuitet:</p>
<div class="formula"><span class="frac"><span>1 578 697</span><span>A(5, 11 %)</span></span> = <span class="frac"><span>1 578 697</span><span>3,6959</span></span> = 427 148</div>
<p>Salgsvolumet kan falle med 427 148 / (6 − 3) = 142 383 flasker → laveste salgsvolum = 857 617 flasker pr. år.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'c',
            q: `Eieren av vannkilden innleder forhandlinger om en årlig kompensasjon (etterskuddsvis) i stedet for å overta anleggsmidlene gratis etter 5 år. Hva er det meste bedriften kan gå med på å betale i årlig kompensasjon?`,
            topics: ['prosjekt', 'rente'],
            answer: `Maksimal årlig kompensasjon = <b>240 855 kr</b>.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>«Nåverdi markedspris anlegg»:</p>
<div class="formula"><span class="frac"><span>1 500 000</span><span>1,11<sup>5</sup></span></span> = 890 177</div>
<p>«Årlig nåverdiannuitet»:</p>
<div class="formula"><span class="frac"><span>890 177</span><span>A(5, 11 %)</span></span> = 240 855</div>
<p>Tolkning: bedriften beholder da anlegget verdt 1 500 000 i år 5; denne verdien omgjort til en årlig etterskuddsannuitet er det meste den kan betale uten å komme dårligere ut enn i a).</p>`,
            src: 'LF+egen'
          },
          {
            label: 'd',
            q: `Anta at bedriften finansierer sine investeringer med en egenkapitalandel på 80 %. Risikofri rente er 2,5 % mens bedriften kan låne penger til en rente på 4 %. Markedsavkastningen er anslått til 10 % og bedriftens egenkapitalbeta er 0,91. Skattesatsen er 27 %. Hva er bedriftens veide totalkapitalavkastningskrav (WACC) etter skatt?`,
            topics: ['kvm'],
            answer: `Egenkapitalkostnad = <b>9,26 %</b>, WACC = <b>8,00 %</b> (rundes av til 8 %).`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>LF-tallene svarer til KVM <em>med skatt</em> (formelsamlingens formel 6.2). Egen kontroll:</p>
<div class="formula">r<sub>e</sub> = 0,025 · 0,73 + 0,91 · (0,10 − 0,025 · 0,73) = 0,01825 + 0,91 · 0,08175 = 0,09264</div>
<div class="formula">WACC = 0,09264 · 0,8 + 0,04 · 0,73 · 0,2 = 0,07411 + 0,00584 = 0,07995 ≈ 8 %</div>
<p><b>Merk:</b> Dagens pensum (7. utg.) bruker KVM uten skattejustering av risikofri rente. Egen utregning (ikke LF): r<sub>e</sub> = 0,025 + 0,91 · (0,10 − 0,025) = 9,33 % og WACC = 0,0933 · 0,8 + 0,04 · 0,73 · 0,2 = 8,04 % – som også avrundes til 8 %.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'e',
            q: `Legg til grunn at anleggsmidlene avskrives etter saldometoden med en sats på 20 % årlig. Hva er prosjektets nåverdi etter skatt? Se bort fra punkt c).`,
            topics: ['skatt'],
            answer: `Nåverdi etter skatt = <b>1 154 809</b>.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>NV av spart skatt på saldoavskrivningene (evig saldoavskrivning), ved WACC 8 %:</p>
<div class="formula"><span class="frac"><span>5 000 000 · 0,20 · 0,27</span><span>0,08 + 0,20</span></span> = 964 286</div>
<p>Ingen korreksjon for salg, fordi anleggsmidlene overdras uten vederlag (salgssum 0 → saldoen avskrives videre).</p>
<p>Beregningsgrunnlag ved WACC 8 %:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Kontantstrøm drift</th><td></td><td>2 000 000</td><td>2 000 000</td><td>2 000 000</td><td>2 000 000</td><td>2 000 000</td></tr><tr><th scope="row">Skatt (27 %)</th><td></td><td>−540 000</td><td>−540 000</td><td>−540 000</td><td>−540 000</td><td>−540 000</td></tr><tr><th scope="row">Anleggsmidler</th><td>−5 000 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Arbeidskapital</th><td>−2 000 000</td><td></td><td></td><td></td><td></td><td>2 000 000</td></tr><tr><th scope="row">Nåverdi spart skatt avskrivning</th><td>964 286</td><td></td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Beregningsgrunnlag</th><td>−6 035 714</td><td>1 460 000</td><td>1 460 000</td><td>1 460 000</td><td>1 460 000</td><td>3 460 000</td></tr></tbody></table></div>
<p>Nåverdi etter skatt = 1 154 809. (Egen kontroll: NV av beregningsgrunnlaget ved 8 % = 1 154 809. Stemmer.)</p>`,
            src: 'LF+egen'
          }
        ]
      },
      {
        nr: 3, weight: 20,
        title: 'Optimal økonomisk levetid for produksjonsanlegg',
        topics: ['levetid'],
        text: `<p>En bedrift investerer 450 i et nytt produksjonsanlegg. Man ønsker å vurdere hvor mange år dette anlegget skal drives. Bedriften benytter et avkastningskrav på 12 %. Innbetalinger og utbetalinger knyttet til prosjektet og salgsverdier for anleggsmidlene er budsjettert til (alle beløp kommer i slutten av året):</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>Innbetaling</th><th>Utbetaling</th><th>Salgsverdi</th></tr></thead><tbody><tr><th scope="row">1</th><td>570</td><td>330</td><td>285</td></tr><tr><th scope="row">2</th><td>540</td><td>360</td><td>210</td></tr><tr><th scope="row">3</th><td>510</td><td>390</td><td>135</td></tr><tr><th scope="row">4</th><td>480</td><td>420</td><td>60</td></tr></tbody></table></div>`,
        parts: [
          {
            label: 'a',
            q: `Beregn optimal økonomisk levetid for anlegget under forutsetning av at det ikke skal gjenanskaffes.`,
            topics: ['levetid'],
            answer: `<b>3 år</b> (høyest NPV, 89,28).`,
            method: `<p>Netto driftskontantstrøm: år 1 = 240, år 2 = 180, år 3 = 120, år 4 = 60. Siste års kontantstrøm = netto drift + salgsverdi. LF-regnearket gir:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Levetid</th><th>År 0</th><th>År 1</th><th>År 2</th><th>År 3</th><th>År 4</th><th>NPV</th><th>Annuitet</th></tr></thead><tbody><tr><th scope="row">1 år</th><td>−450</td><td>525</td><td></td><td></td><td></td><td>18,75</td><td>21,00</td></tr><tr><th scope="row">2 år</th><td>−450</td><td>240</td><td>390</td><td></td><td></td><td>75,19</td><td>44,49</td></tr><tr><th scope="row">3 år</th><td>−450</td><td>240</td><td>180</td><td>255</td><td></td><td>89,28</td><td>37,17</td></tr><tr><th scope="row">4 år</th><td>−450</td><td>240</td><td>180</td><td>120</td><td>120</td><td>69,46</td><td>22,87</td></tr></tbody></table></div>
<p>Uten gjenanskaffelse velges levetiden med høyest NPV → 3 år (NPV 89,28). (Konklusjonen er utledet av LF-tabellen; LF har ingen tekst.)</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Beregn optimal økonomisk levetid for anlegget under forutsetning av at det skal gjenanskaffes i all fremtid.`,
            topics: ['levetid'],
            answer: `<b>2 år</b> (høyest nåverdiannuitet, 44,49).`,
            method: `<p>Bruk tabellen fra a), men se på nåverdiannuiteten (NPV omgjort til lik årlig annuitet over levetiden ved 12 %):</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Levetid</th><th>NPV</th><th>Annuitet</th></tr></thead><tbody><tr><th scope="row">1 år</th><td>18,75</td><td>21,00</td></tr><tr><th scope="row">2 år</th><td>75,19</td><td>44,49</td></tr><tr><th scope="row">3 år</th><td>89,28</td><td>37,17</td></tr><tr><th scope="row">4 år</th><td>69,46</td><td>22,87</td></tr></tbody></table></div>
<p>Med gjenanskaffelse i all fremtid velges levetiden med høyest nåverdiannuitet → 2 år (annuitet 44,49). (Konklusjonen er utledet av LF-tabellen; LF har ingen tekst.)</p>`,
            src: 'LF+egen'
          }
        ]
      },
      {
        nr: 4, weight: 20,
        title: 'Prosjekt X og Y: nåverdi mot internrente',
        topics: ['toprosjekt'],
        text: `<p>En industrivirksomhet vurderer to gjensidig utelukkende investeringer. Prosjekt X vil ha en økonomisk levetid på 2 år, mens prosjekt Y forutsettes å ha en økonomisk levetid på 3 år. Årlige kontantstrømmer er som følger:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody><tr><th scope="row">Prosjekt X</th><td>−2 000 000</td><td>1 000 000</td><td>1 400 000</td><td></td></tr><tr><th scope="row">Prosjekt Y</th><td>−2 000 000</td><td>−200 000</td><td>1 600 000</td><td>1 200 000</td></tr></tbody></table></div>`,
        parts: [
          {
            label: 'a',
            q: `Beregn nåverdien til hvert av prosjektene når avkastningskravet er 8 %. Hvilket prosjekt er mest lønnsomt?`,
            topics: ['toprosjekt', 'prosjekt'],
            answer: `NV(X) = <b>126 200</b>, NV(Y) = <b>139 156</b> → Y har høyest nåverdi.`,
            method: `<p>LF-regnearket (kun tall, ingen tekst):</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>NPV (8 %)</th><th>IRR</th></tr></thead><tbody><tr><th scope="row">Prosjekt X</th><td>−2 000 000</td><td>1 000 000</td><td>1 400 000</td><td></td><td>126 200</td><td>12,3 %</td></tr><tr><th scope="row">Prosjekt Y</th><td>−2 000 000</td><td>−200 000</td><td>1 600 000</td><td>1 200 000</td><td>139 156</td><td>10,9 %</td></tr><tr><th scope="row">Prosjekt Y − X</th><td>0</td><td>−1 200 000</td><td>200 000</td><td>1 200 000</td><td>12 955</td><td>9,17 %</td></tr></tbody></table></div>
<p>Hver kontantstrøm diskonteres med 8 %. Y har høyest nåverdi.</p>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Beregn internrenten til hvert av prosjektene. Hvilket prosjekt er mest lønnsomt?`,
            topics: ['toprosjekt', 'prosjekt'],
            answer: `IRR(X) = <b>12,3 %</b>, IRR(Y) = <b>10,9 %</b> → X har høyest internrente.`,
            method: `<p>Internrenten er renten som gir nåverdi lik null for hvert prosjekt (finansiell kalkulator/regneark). LF: IRR(X) = 12,3 %, IRR(Y) = 10,9 % → X har høyest internrente, altså motsatt rangering av nåverdimetoden i a).</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Hvorfor gir de to metodene forskjellig rangering av prosjektene? Hvilket prosjekt vil du anbefale? Presiser hvilke forutsetninger du tar og begrunn svaret.`,
            topics: ['toprosjekt'],
            answer: `LF mangler tekst. Egen skisse: velg <b>Y</b> (høyest NV), forutsatt engangsinvesteringer og at 8 % er riktig krav.`,
            method: `<p><b>LF mangler tekst.</b> Egen skisse (ikke LF; i tråd med LF for des 2016 oppg. 1d):</p>
<p>Metodene rangerer ulikt fordi kontantstrømmene har ulik tidsprofil/levetid, og internrentemetoden implisitt forutsetter reinvestering til internrenten, mens nåverdimetoden forutsetter reinvestering til avkastningskravet. Ved gjensidig utelukkende prosjekter velges høyest NV → Y, gitt forutsetningen om at prosjektene er engangsinvesteringer (ingen gjentakelse) og at 8 % er riktig krav.</p>
<p><em>Egen merknad:</em> Dersom prosjektene kan gjentas, burde man sammenligne nåverdiannuiteter: X: 126 200 / A(2, 8 %) ≈ 70 769; Y: 139 156 / A(3, 8 %) ≈ 53 997 – da er X best. LF sier ikke noe om dette, men «Presiser hvilke forutsetninger du tar» peker mot nettopp denne problemstillingen.</p>`,
            src: 'egen'
          },
          {
            label: 'd',
            q: `Vis kontantstrømmen og beregn internrenten til differanseinvesteringen for de to investeringsalternativene. Forklar hvordan internrenten kan brukes til å sammenligne lønnsomheten til de to alternativene.`,
            topics: ['toprosjekt'],
            answer: `Differansekontantstrøm Y − X: 0, −1 200 000, 200 000, 1 200 000. Internrente = <b>9,17 %</b> ifølge LF (etterregnet: <b>8,68 %</b>), NV (8 %) = 12 955.`,
            method: `<p>LF-regnearket:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>NPV (8 %)</th><th>IRR</th></tr></thead><tbody><tr><th scope="row">Prosjekt Y − X</th><td>0</td><td>−1 200 000</td><td>200 000</td><td>1 200 000</td><td>12 955</td><td>9,17 %</td></tr></tbody></table></div>
<p>Tolkning (egen, standard – LF har ingen tekst): Internrenten på differanseinvesteringen (9,17 %) er større enn avkastningskravet (8 %) → merinvesteringen i Y er lønnsom → velg Y.</p>
<p><b>Merk – LF-tallet stemmer ikke ved etterregning (egen utregning, ikke LF):</b> Kontantstrømmen 0, −1 200 000, 200 000, 1 200 000 har internrente <b>8,68 %</b>, ikke 9,17 %. Kontroll: ved 8,68 % er NV(X) ≈ NV(Y) ≈ 105 434, mens ved 9,17 % er NV(X) = 90 688 og NV(Y) = 81 595. Konklusjonen er den samme (8,68 % &gt; 8 % → velg Y).</p>`,
            src: 'LF+egen'
          },
          {
            label: 'e',
            q: `Vil et annet avkastningskrav kunne endre rangeringen av lønnsomhet?`,
            topics: ['toprosjekt'],
            answer: `Ja – ved avkastningskrav over <b>9,17 %</b> blir NV(X) &gt; NV(Y), og rangeringen snur (utledet av LF-tallet; LF mangler tekst). Etterregnet er skjæringspunktet <b>8,68 %</b>.`,
            method: `<p><b>LF mangler tekst.</b> Utledet av LF-tallet: internrenten på differanseinvesteringen Y − X (9,17 %) er avkastningskravet der prosjektene har lik nåverdi. Ved avkastningskrav over 9,17 % blir NV(X) &gt; NV(Y), og rangeringen snur.</p>
<p><b>Merk (egen utregning, ikke LF):</b> Etterregning gir at skjæringspunktet er 8,68 %, ikke LF-tallet 9,17 % (se d).</p>`,
            src: 'LF+egen'
          }
        ]
      }
    ]
  });

  /* ===== Høst 2018 ===== */
  O.exams.push({
    id: '2018',
    year: 2018,
    title: 'Høst 2018',
    note: `<p><b>LF er bare et regneark med tall.</b> Sluttsvarene er hentet fra LF-regnearket, mens metodebeskrivelsene er en tolkning av regnearkets linjer (kontrollregnet). Konklusjonsspørsmål (2e, 3c og «er prosjektet lønnsomt») har ingen LF-tekst; konklusjonene der er utledet av tallene.</p>
<p><b>KVM:</b> Fra og med dette settet bruker LF kapitalverdimodellen <em>uten</em> skattejustering av risikofri rente, r<sub>e</sub> = r<sub>f</sub> + β · (r<sub>m</sub> − r<sub>f</sub>), i motsetning til LF for desember 2016 og mars 2017.</p>`,
    tasks: [
      {
        nr: 1, weight: 25,
        title: 'Femårig prosjekt: nåverdi og kritiske verdier',
        topics: ['prosjekt', 'folsomhet'],
        text: `<p>En bedrift vurderer å sette i gang et 5-årig prosjekt. Det er budsjettert med følgende salgsvolum og salgspriser i løpet av levetiden:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Salgsvolum</th><td>1 000</td><td>1 300</td><td>1 300</td><td>1 300</td><td>1 000</td></tr><tr><th scope="row">Salgspris</th><td>2 700</td><td>2 700</td><td>2 700</td><td>2 700</td><td>2 700</td></tr></tbody></table></div>
<p>Variable enhetskostnader er 1 620 og de årlige faste kostnadene er budsjettert til 500 000. Dersom prosjektet settes i gang, vil det bli nødvendig å investere i anleggsmidler for 3 000 000. Det er anslått at anleggsmidlene kan selges for 1 000 000 ved levetidens slutt.</p>
<p>Investeringen vil eventuelt også med føre økt arbeidskapitalbehov. Det er anslått at arbeidskapitalen vil utgjøre 20 % av omsetningen. Avkastningskravet er 10 %.</p>
<p>Et moment i en deloppgave gjelder bare denne deloppgaven.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn prosjektets nåverdi (NPV) og internrente (IRR). Er prosjektet lønnsomt?`,
            topics: ['prosjekt'],
            answer: `NPV (10 %) = <b>310 742</b>, internrente = <b>12,71 %</b> → lønnsomt.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Omsetning</th><td></td><td>2 700 000</td><td>3 510 000</td><td>3 510 000</td><td>3 510 000</td><td>2 700 000</td></tr><tr><th scope="row">Variable kostnader</th><td></td><td>−1 620 000</td><td>−2 106 000</td><td>−2 106 000</td><td>−2 106 000</td><td>−1 620 000</td></tr><tr><th scope="row">Dekningsbidrag</th><td></td><td>1 080 000</td><td>1 404 000</td><td>1 404 000</td><td>1 404 000</td><td>1 080 000</td></tr><tr><th scope="row">Faste kostnader</th><td></td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td></tr><tr><th scope="row">Arbeidskapital</th><td>−540 000</td><td>−162 000</td><td>–</td><td>–</td><td>162 000</td><td>540 000</td></tr><tr><th scope="row">Anleggsmidler</th><td>−3 000 000</td><td></td><td></td><td></td><td></td><td>1 000 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>−3 540 000</td><td>418 000</td><td>904 000</td><td>904 000</td><td>1 066 000</td><td>2 120 000</td></tr></tbody></table></div>
<p>Arbeidskapital: 20 % av <em>neste</em> års omsetning bindes året før (år 0: 20 % · 2 700 000 = 540 000; år 1: økning 20 % · 810 000 = 162 000; år 4: frigjøring 162 000; år 5: resten 540 000).</p>
<p>NPV (10 %) = 310 742. Internrente = 12,71 %. → lønnsomt (konklusjonen følger av tallene; LF har ingen tekst).</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Anslaget på de faste kostnadene er noe usikkert. Hvor høye kan de faste kostnadene eventuelt være, for at prosjektet skal være lønnsomt?`,
            topics: ['folsomhet'],
            answer: `Faste kostnader kan øke til <b>581 973</b> (nåverdiannuitet 81 973).`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Gjør nåverdien om til en nåverdiannuitet – så mye kan den årlige kontantstrømmen falle før NPV = 0:</p>
<div class="formula"><span class="frac"><span>310 742</span><span>A(5, 10 %)</span></span> = 81 973</div>
<p>Faste kostnader kan øke til 500 000 + 81 973 = 581 973.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'c',
            q: `Hvor høy må salgsverdien på anleggsmidlet minst være ved levetidens slutt, for at prosjektet skal være lønnsomt?`,
            topics: ['folsomhet'],
            answer: `Laveste salgssum = <b>499 548</b> (salgssummen kan falle med 500 452).`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Nåverdien kan falle med 310 742. Salgssummen kommer i år 5, så den kan falle med:</p>
<div class="formula">310 742 · 1,10<sup>5</sup> = 500 452</div>
<p>Laveste salgssum = 1 000 000 − 500 452 = 499 548.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'd',
            q: `Anta at et annet prosjekt har samme investeringsutgift, restverdi, salgspris, variable enhetskostnader og faste kostnader som prosjektet over. Eneste forskjellen er at salgsvolumet er konstant hvert år (annuitet), og at det ikke er kapitalbinding i arbeidskapital. Hvor mange enheter må årlig selges i dette prosjektet, for at nåverdien skal bli den samme som den du beregnet i a).`,
            topics: ['folsomhet'],
            answer: `Nødvendig salg pr. år = <b>1 120 enheter</b> (årlig dekningsbidrag 1 209 568).`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<ol>
<li>«Nåverdi fra år 1 til 5 må minst være» 2 689 820. (Egen kontroll: = 3 000 000 − 1 000 000 / 1,10<sup>5</sup> + 310 742 = 2 689 820, dvs. investering minus NV av restverdi pluss ønsket NPV.)</li>
<li>Nåverdiannuitet = 2 689 820 / A(5, 10 %) = 709 568.</li>
<li>+ faste kostnader 500 000 → nødvendig årlig dekningsbidrag = 1 209 568.</li>
<li>DB pr. enhet = 2 700 − 1 620 = 1 080 → nødvendig salg pr. år = 1 120 enheter (1 209 568 / 1 080 = 1 119,97).</li>
</ol>
<p>LF-kontroll: kontantstrøm −3 000 000; 709 568 i år 1–4; 1 709 568 i år 5 → NPV = 310 742.</p>`,
            src: 'LF+egen'
          }
        ]
      },
      {
        nr: 2, weight: 20,
        title: 'Annuitetslån mot serielån: effektiv rente',
        topics: ['laan'],
        text: `<p>Du vurderer å ta opp et lån på 600 000. Det påløper et etableringsgebyr på 2 000 ved låneopptak, og ved hver betaling påløper et termingebyr på 100. Lånets løpetid er 5 år.</p>`,
        parts: [
          {
            label: 'a',
            q: `Anta at lånet tas opp som et annuitetslån med månedlig betaling. Nominell årsrente er 3 %. Beregn månedlig ytelse (renter og avdrag) på lånet.`,
            topics: ['laan'],
            answer: `Ytelse (renter + avdrag) = <b>10 781,21</b> per måned; med termingebyr 100 → <b>10 881,21</b>.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Månedsrente 0,25 % (3 % / 12), 60 terminer. Ytelsen er lånebeløpet multiplisert med invers annuitetsfaktor: 600 000 · A<sup>−1</sup>(60, 0,25 %) = 10 781,21. Med termingebyr 100 blir summen 10 881,21 per måned.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Hva er restgjelden etter at det er betalt renter/avdrag i 2 år?`,
            topics: ['laan'],
            answer: `Restgjeld = <b>370 728</b>.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Gjenværende 3 år = 36 perioder. Restgjelden er nåverdien av de 36 gjenværende ytelsene à 10 781,21 ved 0,25 % per måned:</p>
<div class="formula">Restgjeld = 10 781,21 · A(36, 0,25 %) = 370 728</div>
<p>Gebyrene inngår ikke i restgjelden.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'c',
            q: `Hva er lånets effektive årsrente?`,
            topics: ['laan'],
            answer: `Månedsrente = 0,29 %, effektiv årsrente = <b>3,57 %</b>.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Låntakers kontantstrøm: utbetalt 598 000 (600 000 − 2 000), deretter 60 betalinger à 10 881,21. Internrenten per måned = 0,29 % (egen kontroll: 0,2925 %).</p>
<div class="formula">Effektiv årsrente = 1,002925<sup>12</sup> − 1 = 3,57 %</div>`,
            src: 'LF+egen'
          },
          {
            label: 'd',
            q: `Som et alternativ kan lånet tas opp som et serielån med 3,15 % nominell rente. Renter/avdrag skal betales etterskuddsvis årlig. Løpetiden på dette lånet er også 5 år, men de 2 første årene er avdragsfrie (det betales kun renter og gebyrer). Hva er lånets effektive årsrente?`,
            topics: ['laan'],
            answer: `Effektiv årsrente = <b>3,26 %</b>.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Serielån med årlige terminer, avdragsfritt i år 1–2, deretter 3 like avdrag à 200 000:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Lån</th><td>600 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Gebyrer</th><td>−2 000</td><td>−100</td><td>−100</td><td>−100</td><td>−100</td><td>−100</td></tr><tr><th scope="row">Rente (3,15 %)</th><td></td><td>−18 900</td><td>−18 900</td><td>−18 900</td><td>−12 600</td><td>−6 300</td></tr><tr><th scope="row">Avdrag</th><td></td><td></td><td></td><td>−200 000</td><td>−200 000</td><td>−200 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>598 000</td><td>−19 000</td><td>−19 000</td><td>−219 000</td><td>−212 700</td><td>−206 400</td></tr></tbody></table></div>
<p>Effektiv årsrente = internrenten til kontantstrømmen = 3,26 %.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'e',
            q: `Hvilket lån vil du velge, serielånet eller annuitetslånet?`,
            topics: ['laan'],
            answer: `Velg <b>serielånet</b> – lavest effektiv rente (3,26 % &lt; 3,57 %). Utledet av LF-tallene; LF mangler tekst.`,
            method: `<p><b>LF mangler tekst.</b> Utledet av LF-tallene: serielånet har lavest effektiv rente (3,26 % &lt; 3,57 %) → velg serielånet.</p>
<p><em>Egen merknad:</em> En god besvarelse bør også nevne at lånene har ulik avdragsprofil/likviditetsbelastning, men effektiv rente er sammenligningsgrunnlaget.</p>`,
            src: 'LF+egen'
          }
        ]
      },
      {
        nr: 3, weight: 20,
        title: 'Maskinens økonomiske levetid',
        topics: ['levetid'],
        text: `<p>En bedrift vurderer å kjøpe en maskin som koster 440 000 i anskaffelse. Maskinens innbetalinger, utbetalinger og salgsverdi er budsjettert til:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>Innbetalinger</th><th>Utbetalinger</th><th>Salgsverdi</th></tr></thead><tbody><tr><th scope="row">1</th><td>400 000</td><td>200 000</td><td>240 000</td></tr><tr><th scope="row">2</th><td>380 000</td><td>220 000</td><td>190 000</td></tr><tr><th scope="row">3</th><td>360 000</td><td>240 000</td><td>140 000</td></tr><tr><th scope="row">4</th><td>340 000</td><td>260 000</td><td>90 000</td></tr><tr><th scope="row">5</th><td>320 000</td><td>280 000</td><td>40 000</td></tr></tbody></table></div>`,
        parts: [
          {
            label: 'a',
            q: `Beregn maskinens økonomiske levetid under forutsetning av at maskinen ikke skal gjenanskaffes. Avkastningskravet settes til 10 %.`,
            topics: ['levetid'],
            answer: `<b>4 år</b> (høyest NPV, 80 320).`,
            method: `<p>Netto drift: år 1 = 200 000, år 2 = 160 000, år 3 = 120 000, år 4 = 80 000, år 5 = 40 000. Siste år = drift + salgsverdi. LF-regnearket gir:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Levetid</th><th>År 0</th><th>År 1</th><th>År 2</th><th>År 3</th><th>År 4</th><th>År 5</th><th>NPV</th><th>Annuitet</th></tr></thead><tbody><tr><th scope="row">1 år</th><td>−440 000</td><td>440 000</td><td></td><td></td><td></td><td></td><td>−40 000</td><td>−44 000</td></tr><tr><th scope="row">2 år</th><td>−440 000</td><td>200 000</td><td>350 000</td><td></td><td></td><td></td><td>31 074</td><td>17 905</td></tr><tr><th scope="row">3 år</th><td>−440 000</td><td>200 000</td><td>160 000</td><td>260 000</td><td></td><td></td><td>69 391</td><td>27 903</td></tr><tr><th scope="row">4 år</th><td>−440 000</td><td>200 000</td><td>160 000</td><td>120 000</td><td>170 000</td><td></td><td>80 320</td><td>25 339</td></tr><tr><th scope="row">5 år</th><td>−440 000</td><td>200 000</td><td>160 000</td><td>120 000</td><td>80 000</td><td>80 000</td><td>68 522</td><td>18 076</td></tr></tbody></table></div>
<p>Uten gjenanskaffelse velges levetiden med høyest NPV → 4 år (NPV 80 320). (Konklusjonen er utledet av LF-tabellen; LF har ingen tekst.)</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Beregn maskinens økonomiske levetid under forutsetning av at maskinen skal gjenanskaffes i all framtid.`,
            topics: ['levetid'],
            answer: `<b>3 år</b> (høyest nåverdiannuitet, 27 903).`,
            method: `<p>Bruk tabellen fra a), men se på nåverdiannuiteten:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Levetid</th><th>NPV</th><th>Annuitet</th></tr></thead><tbody><tr><th scope="row">1 år</th><td>−40 000</td><td>−44 000</td></tr><tr><th scope="row">2 år</th><td>31 074</td><td>17 905</td></tr><tr><th scope="row">3 år</th><td>69 391</td><td>27 903</td></tr><tr><th scope="row">4 år</th><td>80 320</td><td>25 339</td></tr><tr><th scope="row">5 år</th><td>68 522</td><td>18 076</td></tr></tbody></table></div>
<p>Ved gjenanskaffelse i all framtid velges levetiden med høyest nåverdiannuitet → 3 år (annuitet 27 903). (Konklusjonen er utledet av LF-tabellen; LF har ingen tekst.)</p>`,
            src: 'LF+egen'
          },
          {
            label: 'c',
            q: `Er investeringen lønnsom?`,
            topics: ['levetid', 'prosjekt'],
            answer: `Ja – NPV er positiv ved optimal levetid (<b>80 320</b> som engangsinvestering; positiv annuitet 27 903 per år i kjede). LF mangler tekst.`,
            method: `<p><b>LF mangler tekst.</b> Utledet: ja, investeringen er lønnsom – NPV er positiv ved optimal levetid (80 320 som engangsinvestering; positiv annuitet 27 903 per år i kjede, tilsvarende NV = 27 903 / 0,10 = 279 030 for evig kjede – sistnevnte tall er egen utregning).</p>`,
            src: 'LF+egen'
          }
        ]
      },
      {
        nr: 4, weight: 35,
        title: 'TrillFa: WACC og nåverdi etter skatt',
        topics: ['kvm', 'skatt'],
        text: `<p>AS TrillFa er et børsnotert selskap som produserer ulike redskaper. Man vurderer nå å ta et nytt produkt opp i sortimentet, nemlig trillebårer. Hvis man bestemmer seg for å produsere trillebårer, må man anskaffe produksjonsmaskiner for 10 000 000. Det vil også påløpe installasjonskostnader og frakt på 1 000 000. Installasjonskostnaden balanseføres (aktiveres) sammen med maskinen.</p>
<p>Maskinen vil ha en levetid på 5 år og vil avskrives etter saldometoden med 20 % årlig. Det er budsjettert med en salgsinntekt på 12 000 000 årlig. Dekningsgraden er 45 %, og det er antatt at de betalbare faste driftskostnadene blir 1 000 000 årlig.</p>
<p>Dersom den nye maskinen kjøpes, vil lageret av materialer måtte økes med 1 000 000. Kundefordringene vil øke med 750 000, mens leverandørgjelden vil øke med 500 000.</p>
<p>Hvis den nye maskinen anskaffes, vil man måtte ta i bruk et lokale, som for tiden er utleid for en leie på 500 000 årlig. Maskinen vil kreve en stor overhaling etter 3 år. Dette er beregnet å koste 750 000.</p>
<p>En mekaniker som arbeider i bedriften, vil få ansvaret for å føre tilsyn med produksjonen. Lønnen hennes er 500 000 pr. år. Det må eventuelt ansettes en erstatning for henne, til de samme lønnsbetingelser. Disse kostnadene er ikke inkludert i de øvrige kostnadene referert til foran.</p>
<p>Bedriften kan låne penger til en rente på 4 % før skatt. Risikofri rente er 3 % før skatt, og bedriftens egenkapitalbeta (aksjebeta) er 1,65. Avkastningen på markedsporteføljen er 8 %. Bedriften finansierer sine prosjekter med en egenkapitalandel på 60 %. Skattesatsen er 22 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn prosjektets veide avkastningskrav (WACC) etter skatt. Rund gjerne av til nærmeste hele prosent.`,
            topics: ['kvm'],
            answer: `Egenkapitalkostnad = <b>11,25 %</b>, lånerente etter skatt = <b>3,12 %</b>, WACC = <b>8,00 %</b> (avrundet 8 %).`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>LF-tallene svarer til KVM <em>uten</em> skattejustering av risikofri rente (formelsamlingens formel 6.1). Egen kontroll:</p>
<div class="formula">r<sub>e</sub> = 0,03 + 1,65 · (0,08 − 0,03) = 11,25 %</div>
<div class="formula">Lånerente etter skatt = 4 % · (1 − 0,22) = 3,12 %</div>
<div class="formula">WACC = 0,1125 · 0,60 + 0,0312 · 0,40 = 0,0675 + 0,01248 = 0,07998 ≈ 8 %</div>
<p><b>Merk – inkonsistens mellom årene:</b> I des 2016 og mars 2017 bruker LF KVM <em>med</em> skatt (formel 6.2: r<sub>f</sub> · (1 − s)). Med formel 6.2 ville 2018-tallene gitt r<sub>e</sub> = 0,0234 + 1,65 · 0,0566 = 11,68 % og WACC = 8,26 % (egen utregning) – avrundet fortsatt 8 %.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Beregn prosjektets nåverdi etter skatt. Er prosjektet lønnsomt`,
            topics: ['skatt'],
            answer: `NPV etter skatt = <b>453 576</b> → lønnsomt.`,
            method: `<p><em>LF for dette settet er bare et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Nøkkelpunkter:</p>
<ul>
<li>Avskrivningsgrunnlag = 10 000 000 + 1 000 000 (installasjon/frakt aktiveres) = 11 000 000.</li>
<li>Arbeidskapital = lager 1 000 000 + kundefordringer 750 000 − leverandørgjeld 500 000 = 1 250 000, bindes i år 0 og frigjøres i år 5.</li>
<li>Tapt leieinntekt 500 000 = alternativkostnad (tas med, og skattlegges).</li>
<li>Mekaniker: merkostnaden er lønn til erstatteren, 500 000 pr. år.</li>
<li>Overhaling 750 000 i år 3 kostnadsføres direkte (fradrag i år 3).</li>
<li>«Resultat før skatt» er her driftskontantstrøm før skatt (uten avskrivninger); avskrivningseffekten ligger i NV-leddet i år 0.</li>
</ul>
<p>NV av spart skatt på saldoavskrivningene:</p>
<div class="formula"><span class="frac"><span>11 000 000 · 0,20 · 0,22</span><span>0,08 + 0,20</span></span> = 1 728 571</div>
<p>Ingen restverdi oppgitt → ingen salgskorreksjon.</p>
<p>Beregningsgrunnlag ved 8 %:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Økte inntekter</th><td></td><td>12 000 000</td><td>12 000 000</td><td>12 000 000</td><td>12 000 000</td><td>12 000 000</td></tr><tr><th scope="row">Variable kostnader (55 %)</th><td></td><td>−6 600 000</td><td>−6 600 000</td><td>−6 600 000</td><td>−6 600 000</td><td>−6 600 000</td></tr><tr><th scope="row">Faste kostnader</th><td></td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td></tr><tr><th scope="row">Tapt leie</th><td></td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td></tr><tr><th scope="row">Mekaniker</th><td></td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td></tr><tr><th scope="row">Vedlikehold (overhaling)</th><td></td><td></td><td></td><td>−750 000</td><td></td><td></td></tr><tr class="sum"><th scope="row">Resultat før skatt</th><td></td><td>3 400 000</td><td>3 400 000</td><td>2 650 000</td><td>3 400 000</td><td>3 400 000</td></tr><tr><th scope="row">Skatt (22 %)</th><td></td><td>−748 000</td><td>−748 000</td><td>−583 000</td><td>−748 000</td><td>−748 000</td></tr><tr><th scope="row">Maskiner og utstyr</th><td>−11 000 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">NV spart skatt avskr.</th><td>1 728 571</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Arbeidskapital</th><td>−1 250 000</td><td></td><td></td><td></td><td></td><td>1 250 000</td></tr><tr class="sum"><th scope="row">Beregningsgrunnlag</th><td>−10 521 429</td><td>2 652 000</td><td>2 652 000</td><td>2 067 000</td><td>2 652 000</td><td>3 902 000</td></tr></tbody></table></div>
<p>NPV etter skatt = 453 576 → lønnsomt (konklusjonen følger av tallet; LF har ingen tekst).</p>`,
            src: 'LF+egen'
          }
        ]
      }
    ]
  });

  /* ===== Høst 2019 ===== */
  O.exams.push({
    id: '2019',
    year: 2019,
    title: 'Høst 2019',
    note: `<p><b>Avvik mellom LF og oppgave 3:</b> LF bruker aksjebeta 1,65 og lånerente 4,04 %, mens oppgaveteksten sier beta 1,61 og lånerente 4 %. WACC avrundes til 9 % uansett, så nåverdien i 3b påvirkes ikke, men kovariansen i 3c blir 0,07986 (LF) mot 0,07792 med oppgavens tall (egen utregning).</p>
<p><b>LF er et regneark med tall</b> og to korte tekstlinjer (oppgave 1). Metodebeskrivelsene er en tolkning av regnearkets linjer (kontrollregnet). LF bruker KVM uten skattejustering av risikofri rente.</p>`,
    tasks: [
      {
        nr: 1, weight: 25,
        title: 'Fish Farming: blåskjell eller sjøørret',
        topics: ['prosjekt', 'toprosjekt'],
        text: `<p>Selskapet Fish Farming A/S vurderer for øyeblikket to prosjekter. Et prosjekt er innen havbruk og et er innen skjelldyrking. Selskapet har fått konsesjon for enten oppdrett av blåskjell eller oppdrett av sjøørret i Oslofjorden i 4 år og vurderer nå hvilket av disse to prosjektene som bør startes. Avkastningskravet er 10 % for begge prosjektene.</p>
<p>Blåskjellprosjektet krever en investering på 22 millioner kroner i nødvendig utstyr for oppdrett av blåskjell og forventes å generere en årlig kontantstrøm på 13 millioner kroner i år 1 til 4. Imidlertid er selskapet pålagt i konsesjonsvilkårene å gjennomføre opprydding og fjerning av alt utstyr i løpet av siste driftsår (år 4). Opprydding og fjerning av utstyret er beregnet til å koste 10 millioner kroner etter at man har tatt hensyn til salg av gjenværende anvendbart anleggsutstyr.</p>
<p>Ørretprosjektet krever en investering på 12 millioner kroner i nødvendig utstyr for oppdrett av sjøørret og forventes å generere en årlig kontantstrøm på 7 millioner kroner i år 1 til 4. Som for blåskjell er selskapet pålagt i konsesjonsvilkårene å gjennomføre opprydding og fjerning av alt utstyr i løpet av siste driftsår (år 4). Opprydding og fjerning av utstyret er beregnet til å koste 2 millioner kroner etter at man har tatt hensyn til salg av gjenværende anvendbart anleggsutstyr.</p>`,
        parts: [
          {
            label: 'a',
            q: `Sett opp kontantstrømmene for begge prosjektene.`,
            topics: ['prosjekt'],
            answer: `Blåskjell: −22 000 000; 13 000 000; 13 000 000; 13 000 000; 3 000 000. Sjøørret: −12 000 000; 7 000 000; 7 000 000; 7 000 000; 5 000 000.`,
            method: `<p>Oppryddingskostnaden kommer i år 4 og trekkes fra driftskontantstrømmen det året.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr><th scope="row">Blåskjellfarm (investering)</th><td>−22 000 000</td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Opprydding og fjerning</th><td></td><td></td><td></td><td></td><td>−10 000 000</td></tr><tr><th scope="row">Kontantstrøm fra drift</th><td></td><td>13 000 000</td><td>13 000 000</td><td>13 000 000</td><td>13 000 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm blåskjell</th><td>−22 000 000</td><td>13 000 000</td><td>13 000 000</td><td>13 000 000</td><td>3 000 000</td></tr></tbody></table></div>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr><th scope="row">Sjøørret (investering)</th><td>−12 000 000</td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Opprydding og fjerning</th><td></td><td></td><td></td><td></td><td>−2 000 000</td></tr><tr><th scope="row">Kontantstrøm fra drift</th><td></td><td>7 000 000</td><td>7 000 000</td><td>7 000 000</td><td>7 000 000</td></tr><tr class="sum"><th scope="row">Kontantstrøm sjøørret</th><td>−12 000 000</td><td>7 000 000</td><td>7 000 000</td><td>7 000 000</td><td>5 000 000</td></tr></tbody></table></div>`,
            src: 'LF'
          },
          {
            label: 'b',
            q: `Beregn nåverdier og internrenter for prosjektene.`,
            topics: ['prosjekt', 'toprosjekt'],
            answer: `Blåskjell: NV = <b>12 378 116</b>, IRR = <b>38,07 %</b>. Sjøørret: NV = <b>8 823 031</b>, IRR = <b>42,45 %</b>.`,
            method: `<p>Kontantstrømmene fra a) diskonteres med 10 %; internrenten er renten som gir nåverdi lik null (finansiell kalkulator/regneark).</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Prosjekt</th><th>NV (10 %)</th><th>IRR</th></tr></thead><tbody><tr><th scope="row">Blåskjell</th><td>12 378 116</td><td>38,07 %</td></tr><tr><th scope="row">Sjøørret</th><td>8 823 031</td><td>42,45 %</td></tr></tbody></table></div>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Bruk dine egne ord og bruk gjerne mer utførlige analyser, og innstill overfor ledelsen i Hauge Fish Farming A/S hvilken beslutning de bør gjennomføre på basis av det du har lært ved Hauge School of Management. Metodene (nåverdi og internrente) som brukes i analysene under b) ovenfor, må gi identisk svar ved løsning av oppgaven!`,
            topics: ['toprosjekt'],
            answer: `Velg <b>blåskjell</b>. Internrenten på differanseinvesteringen (blåskjell − sjøørret) = <b>31,52 %</b> &gt; avkastningskravet 10 %.`,
            method: `<p>Det er en rangeringskonflikt: nåverdi → blåskjell, internrente → sjøørret. Den løses med differanseinvesteringen (blåskjell − sjøørret):</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr><th scope="row">Blåskjellfarm</th><td>−22 000 000</td><td>13 000 000</td><td>13 000 000</td><td>13 000 000</td><td>3 000 000</td></tr><tr><th scope="row">Sjøørret</th><td>−12 000 000</td><td>7 000 000</td><td>7 000 000</td><td>7 000 000</td><td>5 000 000</td></tr><tr class="sum"><th scope="row">Differanseinvestering</th><td>−10 000 000</td><td>6 000 000</td><td>6 000 000</td><td>6 000 000</td><td>−2 000 000</td></tr></tbody></table></div>
<p>Internrente differanseinvestering = 31,52 %. LF-tekst: «Velger det største (Blåskjell) siden IRR på differanseinvestering &gt; avkastningskrav». Da gir nåverdi- og internrentemetoden samme svar.</p>
<p><em>Egen kontroll (ikke LF):</em> NV av differansen ved 10 % = 3 555 085 = 12 378 116 − 8 823 031.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'd',
            q: `Hvilket avkastningskrav ville gitt identisk nåverdi for de to prosjektene?`,
            topics: ['toprosjekt'],
            answer: `<b>31,52 %</b>.`,
            method: `<p>LF: «Lik NV ved avk krav 31,52 %». Dette er internrenten på differanseinvesteringen fra c) – ved dette avkastningskravet er nåverdien av differansen null, og de to prosjektene har dermed lik nåverdi.</p>`,
            src: 'LF'
          }
        ]
      },
      {
        nr: 2, weight: 35,
        title: 'Lån, fastrente og kassekreditt',
        topics: ['laan', 'kortfin'],
        text: ``,
        parts: [
          {
            label: 'a',
            q: `<p>En bank tilbyr lån med en nominell rente på 4 % p.a. Tilbakebetalingstiden er 4 år, etableringsgebyret er 1 200 og termingebyret er 100 (ikke termingebyr for alternativet med avdragsfritt lån under). Beregn effektiv rente for et lån på 1 000 000 for følgende tre varianter av lånet:</p>
<ul>
<li>Serielån, tilbakebetales med etterskuddsvise, årlige betalinger</li>
<li>Avdragsfritt lån, hvor lånebeløpet tilbakebetales i sin helhet etter 4 år uten belastning av termingebyrer. Årlige rentebetalinger.</li>
<li>Annuitetslån med etterskuddsvise, månedlige betalinger</li>
</ul>`,
            topics: ['laan'],
            answer: `Serielån: <b>4,07 %</b>. Avdragsfritt lån: <b>4,03 %</b>. Annuitetslån: effektiv månedsrente 0,3570 % → effektiv årsrente <b>4,369 %</b>.`,
            method: `<p><em>LF for dette settet er et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Sett opp låntakers kontantstrøm netto for gebyrer; effektiv rente er internrenten til kontantstrømmen.</p>
<p><b>Serielån:</b></p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr><th scope="row">Lån</th><td>1 000 000</td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Avdrag</th><td></td><td>−250 000</td><td>−250 000</td><td>−250 000</td><td>−250 000</td></tr><tr><th scope="row">Renter</th><td></td><td>−40 000</td><td>−30 000</td><td>−20 000</td><td>−10 000</td></tr><tr><th scope="row">Gebyrer</th><td>−1 200</td><td>−100</td><td>−100</td><td>−100</td><td>−100</td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>998 800</td><td>−290 100</td><td>−280 100</td><td>−270 100</td><td>−260 100</td></tr></tbody></table></div>
<p>Effektiv årsrente = 4,07 %.</p>
<p><b>Avdragsfritt lån (ingen termingebyr):</b></p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody><tr><th scope="row">Lån</th><td>1 000 000</td><td></td><td></td><td></td><td>−1 000 000</td></tr><tr><th scope="row">Renter</th><td></td><td>−40 000</td><td>−40 000</td><td>−40 000</td><td>−40 000</td></tr><tr><th scope="row">Gebyrer</th><td>−1 200</td><td></td><td></td><td></td><td></td></tr><tr class="sum"><th scope="row">Kontantstrøm</th><td>998 800</td><td>−40 000</td><td>−40 000</td><td>−40 000</td><td>−1 040 000</td></tr></tbody></table></div>
<p>Effektiv årsrente = 4,03 %.</p>
<p><b>Annuitetslån, månedlig:</b> Utbetalt 998 800. Månedsrente 0,3333 % (4 % / 12), 48 perioder. Renter og avdrag = 22 579 per måned; + termingebyr 100 = 22 679. Effektiv månedsrente = 0,3570 %.</p>
<div class="formula">Effektiv årsrente = 1,003570<sup>12</sup> − 1 = 4,369 %</div>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Ta for deg alternativet med annuitetslånet over. Hva er restgjeld når det gjenstår 1 år av tilbakebetalingstiden?`,
            topics: ['laan'],
            answer: `Restgjeld = <b>265 168</b>.`,
            method: `<p><em>LF for dette settet er et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Restgjelden er nåverdien av de 12 gjenværende ytelsene à 22 579 ved lånerenten 0,3333 % per måned (termingebyret inngår ikke): 22 579 · A(12, 0,3333 %) = 265 168.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'c',
            q: `Anta nå at annuitetslånet ble tatt opp som et fastrentelån med nominell årsrente 4 %. Da det gjenstår 1 år av tilbakebetalingstiden, faller rente på tilsvarende lån til 3,5 %. Hva blir underkurs eller overkurs på lånet?`,
            topics: ['laan'],
            answer: `Overkurs = <b>713</b> (nåverdi av gjenværende betalinger til ny rente 265 881 − restgjeld 265 168).`,
            method: `<p><em>LF for dette settet er et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Ny årsrente 3,50 % → ny månedsrente 0,29 % (3,5 % / 12 = 0,2917 %). 12 gjenstående betalinger à 22 579.</p>
<ul>
<li>Nåverdi av gjenværende betalinger til ny rente = 265 881.</li>
<li>Restgjeld = 265 168.</li>
<li>Overkurs = 265 881 − 265 168 = 713.</li>
</ul>
<p>Renten har falt → lånets markedsverdi er høyere enn restgjelden → overkurs som låntaker må betale ved innfrielse.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'd',
            q: `En bedrift har en kassekredittavtale med en bevilgningsramme (limit) på 1 000 000 med en gjennomsnittlig utnyttelsesgrad på 50 %. Limitprovisjonen er 0,30 % pr. kvartal og renten er 7,0 % p.a. av trukket beløp. Dersom det er trukket mer enn 60 %, påløper en tilleggsrente på 2 % p.a. på det overskytende beløp. Beregn effektiv rente år. år ved en utnyttelsesgrad på henholdsvis 40 %, 50 % og 80 %.`,
            topics: ['kortfin'],
            answer: `Effektiv årsrente: <b>10,38 %</b> (40 %), <b>9,74 %</b> (50 %), <b>9,31 %</b> (80 %).`,
            method: `<p><em>LF for dette settet er et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>(«år. år» i oppgaveteksten er en skrivefeil for «pr. år».)</p>
<p>LF regner per kvartal: rente og provisjon for ett kvartal divideres på trukket beløp, og kvartalsrenten q annualiseres med (1 + q)<sup>4</sup> − 1.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Utnyttelse</th><th>40 %</th><th>50 %</th><th>80 %</th></tr></thead><tbody><tr><th scope="row">Lån (trukket)</th><td>400 000</td><td>500 000</td><td>800 000</td></tr><tr><th scope="row">Rente (7 % / 4)</th><td>7 000</td><td>8 750</td><td>10 500</td></tr><tr><th scope="row">Limitprovisjon (0,30 % · 1 000 000)</th><td>3 000</td><td>3 000</td><td>3 000</td></tr><tr><th scope="row">Tilleggsrente</th><td>0</td><td>0</td><td>4 500</td></tr><tr class="sum"><th scope="row">Sum betalt per kvartal</th><td>10 000</td><td>11 750</td><td>18 000</td></tr><tr><th scope="row">Kvartalsrente (sum / trukket)</th><td>2,50 %</td><td>2,35 %</td><td>2,25 %</td></tr><tr class="sum"><th scope="row">Effektiv årsrente ((1 + q)<sup>4</sup> − 1)</th><td>10,38 %</td><td>9,74 %</td><td>9,31 %</td></tr></tbody></table></div>
<p><em>Merknad om 80 %-kolonnen (egen tolkning av LF-tallene):</em> LF regner 7 % / 4 på de første 600 000 (= 10 500) og «rente med 2 % tilleggsrente» = 9 % / 4 på de overskytende 200 000 (= 4 500). Linjen «Tilleggsrente 4 500» er altså <em>hele</em> renten (9 %) på det overskytende beløpet, ikke bare tillegget på 2 %. Totalt 15 000 i rente + 3 000 provisjon = 18 000, som er korrekt total.</p>`,
            src: 'LF+egen'
          }
        ]
      },
      {
        nr: 3, weight: 40,
        title: 'Tullin: WACC, nåverdi etter skatt, kovarians',
        topics: ['kvm', 'skatt'],
        text: `<p>AS Tullin er et børsnotert selskap. Man vurdere nå å lansere et nytt produkt. Selskapets ledelse har vurdert det slik at det er marked for produktet i 5 år, og det er budsjettert med følgende salgspris, salgsvolum og dekningsgrad gjennom prosjektets levetid:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Størrelse</th><th>Verdi</th></tr></thead><tbody><tr><th scope="row">Salgspris pr. enhet</th><td>1 100</td></tr><tr><th scope="row">Salgsmengde år 1 til år 3</th><td>5 000</td></tr><tr><th scope="row">Salgsmengde år 4 til år 5</th><td>5 500</td></tr><tr><th scope="row">Dekningsgrad</th><td>60 %</td></tr></tbody></table></div>
<p>Dersom dette produktet lanseres, må man ta i bruk et lokale som i dag er utleid for 800 000 årlig. På grunn av større arealbruk øker også bedriftens faste kostnader. Faste kostnader i dag er 500 000 årlig, og man antar at disse kostnadene vil øke til 1 000 000 årlig dersom produktet lanseres.</p>
<p>Prosjektet vil også bli belastet med indirekte kostnader på 500 000 årlig. Av disse kostnadene kan 25 % tilskrives prosjektet direkte, mens den øvrige andelen er fordelte kostnader fra hovedkontoret.</p>
<p>Dersom prosjektet starter, må man anskaffe anleggsmidler for 6 000 000. Anleggsmidlene avskrives med 20 % årlig, og man regner med at anleggsmidlene ikke vil ha noen salgsverdi ved levetidens slutt. Prosjektet vil også medføre økt kapitalbehov til arbeidskapital. Det er anslått at arbeidskapitalen vil utgjøre 15 % av omsetningen.</p>
<p>Bedriften finansierer sine prosjektet slik at forholdet mellom gjeld og egenkapital er 1/1. Risikofri rente er 2,55 % mens bedriften kan låne penger til en rente på 4 %. Avkastning på markedsporteføljen er 10 % og markedsporteføljens standardavvik er 0,22 eller 22 %. Bedriftens aksjebeta er 1,61 og skattesatsen er 22 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn bedriftens veide totalavkastningskrav, WACC. Rund gjerne av til nærmeste hele prosent.`,
            topics: ['kvm'],
            answer: `LF (med beta 1,65 og lånerente 4,04 %): egenkapitalkostnad = <b>14,84 %</b>, WACC = <b>9,00 %</b>. Med oppgavens tall (egen utregning): r<sub>e</sub> = 14,54 %, WACC = 8,83 % ≈ <b>9 %</b>.`,
            method: `<p><em>LF for dette settet er et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p><b>Avvik mellom LF og oppgave:</b> LF bruker beta 1,65 og lånerente 4,04 %, mens oppgaveteksten sier beta 1,61 og lånerente 4 %. Egenkapitalandelen er 50 % (gjeld/egenkapital = 1/1).</p>
<p><b>LF sine tall</b> (egen kontroll; KVM uten skattejustering, formelsamlingens formel 6.1):</p>
<div class="formula">r<sub>e</sub> = 0,0255 + 1,65 · (0,10 − 0,0255) = 0,148425</div>
<div class="formula">WACC = 0,148425 · 0,5 + 0,0404 · (1 − 0,22) · 0,5 = 0,0742 + 0,0158 = 0,08997 ≈ 9,00 %</div>
<p><b>Med eksamenstekstens tall (beta 1,61, lånerente 4 %) – egen utregning, ikke LF:</b></p>
<div class="formula">r<sub>e</sub> = 0,0255 + 1,61 · 0,0745 = 14,54 %</div>
<div class="formula">WACC = 0,1454 · 0,5 + 0,04 · 0,78 · 0,5 = 0,0727 + 0,0156 = 8,83 % ≈ 9 %</div>
<p>Avrundet WACC blir 9 % uansett, så b) påvirkes ikke.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Beregn nåverdi etter skatt. Er prosjektet lønnsomt?`,
            topics: ['skatt'],
            answer: `Nåverdi etter skatt = <b>649 708</b> → lønnsomt.`,
            method: `<p><em>LF for dette settet er et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Nøkkelpunkter:</p>
<ul>
<li>Faste kostnader: kun økningen 500 000 (fra 500 000 til 1 000 000).</li>
<li>Tapt leie 800 000 = alternativkostnad (skattlegges).</li>
<li>Indirekte kostnader: kun 25 % · 500 000 = 125 000 er relevant; resten er fordelte hovedkontorkostnader.</li>
<li>Arbeidskapital = 15 % av (neste års) omsetning: år 0: 15 % · 5 500 000 = 825 000; år 3: økning 15 % · 550 000 = 82 500; år 5: frigjøring 907 500.</li>
</ul>
<p>NV av spart skatt på saldoavskrivningene:</p>
<div class="formula"><span class="frac"><span>6 000 000 · 0,20 · 0,22</span><span>0,09 + 0,20</span></span> = 910 345</div>
<p>Ingen salgsverdi → ingen salgskorreksjon.</p>
<p>Beregningsgrunnlag ved 9 %:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Omsetning</th><td></td><td>5 500 000</td><td>5 500 000</td><td>5 500 000</td><td>6 050 000</td><td>6 050 000</td></tr><tr><th scope="row">Variable kostnader (40 %)</th><td></td><td>−2 200 000</td><td>−2 200 000</td><td>−2 200 000</td><td>−2 420 000</td><td>−2 420 000</td></tr><tr><th scope="row">Faste kostnader (økning)</th><td></td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td></tr><tr><th scope="row">Tapt leie</th><td></td><td>−800 000</td><td>−800 000</td><td>−800 000</td><td>−800 000</td><td>−800 000</td></tr><tr><th scope="row">Indirekte kostnader (25 %)</th><td></td><td>−125 000</td><td>−125 000</td><td>−125 000</td><td>−125 000</td><td>−125 000</td></tr><tr class="sum"><th scope="row">Resultat før skatt</th><td></td><td>1 875 000</td><td>1 875 000</td><td>1 875 000</td><td>2 205 000</td><td>2 205 000</td></tr><tr><th scope="row">Skatt (22 %)</th><td></td><td>−412 500</td><td>−412 500</td><td>−412 500</td><td>−485 100</td><td>−485 100</td></tr><tr><th scope="row">Anleggsmidler</th><td>−6 000 000</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">NV spart skatt</th><td>910 345</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Arbeidskapital</th><td>−825 000</td><td></td><td></td><td>−82 500</td><td></td><td>907 500</td></tr><tr class="sum"><th scope="row">Beregningsgrunnlag</th><td>−5 914 655</td><td>1 462 500</td><td>1 462 500</td><td>1 380 000</td><td>1 719 900</td><td>2 627 400</td></tr></tbody></table></div>
<p>Nåverdi etter skatt = 649 708 → lønnsomt (konklusjonen følger av tallet; LF har ingen tekst).</p>`,
            src: 'LF+egen'
          },
          {
            label: 'c',
            q: `Hva er kovariansen mellom AS Tullin sin aksjeavkastning og markedsporteføljens avkastning?`,
            topics: ['kvm', 'portefolje'],
            answer: `LF (med beta 1,65): kovarians = <b>0,07986</b>. Med oppgavens beta 1,61 (egen utregning, ikke LF): <b>0,07792</b>.`,
            method: `<p>Beta er kovariansen mellom aksjen og markedet dividert på markedets varians (formelsamlingens formel 6.4), så kovariansen finnes ved å snu formelen:</p>
<div class="formula">β = <span class="frac"><span>cov(r<sub>j</sub>, r<sub>m</sub>)</span><span>σ<sup>2</sup><sub>m</sub></span></span> ⇒ cov = β · σ<sup>2</sup><sub>m</sub></div>
<p>Varians markedsportefølje = 0,22<sup>2</sup> = 0,0484.</p>
<p><b>LF (bruker beta 1,65, ikke oppgavens 1,61):</b> kovarians = 1,65 · 0,0484 = 0,07986.</p>
<p><b>Med eksamenstekstens beta 1,61 (egen utregning, ikke LF):</b> kovarians = 1,61 · 0,0484 = 0,07792.</p>`,
            src: 'LF+egen'
          }
        ]
      }
    ]
  });

  /* ===== Desember 2020 ===== */
  O.exams.push({
    id: '2020',
    year: 2020,
    title: 'Desember 2020',
    note: `<p><b>LF er et regneark med tall</b> og noen korte tekstkommentarer i oppgave 3. Der LF ikke har tekst, er metodebeskrivelsene en tolkning av regnearkets linjer (kontrollregnet), og konklusjoner er utledet av tallene. LF bruker KVM uten skattejustering av risikofri rente.</p>`,
    tasks: [
      {
        nr: 1, weight: 25,
        title: 'Prosjekt A og B: gjensidig utelukkende',
        topics: ['toprosjekt', 'folsomhet'],
        text: `<p>En bedrift vurderer for tiden to gjensidig utelukkende prosjekter, som vi kan kalle prosjekt A og B. Kontantstrømmen fra driften for prosjektene er gitt i oppstillingen under:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody><tr><th scope="row">Prosjekt A</th><td>−6 500</td><td>2 000</td><td>2 500</td><td>2 900</td></tr><tr><th scope="row">Prosjekt B</th><td>−3 500</td><td>2 000</td><td>1 000</td><td>1 000</td></tr></tbody></table></div>
<p>Ved utgangen av år 3 har anleggsmidlene i prosjekt A en utrangeringsverdi på 2 000, mens de i prosjekt B har en utrangeringsverdi på 1 000. Disse verdiene er ikke tatt med i kontantstrømoppstillingen over. Avkastningskravet er 15 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn nåverdi og internrente for begge prosjektene. Hvilket prosjekt vil du anbefale bli gjennomført?`,
            topics: ['toprosjekt', 'prosjekt'],
            answer: `NV(A) = <b>351,32</b>, IRR(A) = <b>17,77 %</b>. NV(B) = <b>310,31</b>, IRR(B) = <b>20,34 %</b>. Anbefaling: <b>A</b> (høyest NV).`,
            method: `<p><em>LF for dette settet er et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Kontantstrøm inkludert utrangeringsverdi i år 3 (A: 2 900 + 2 000 = 4 900; B: 1 000 + 1 000 = 2 000):</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>NNV (15 %)</th><th>IR</th></tr></thead><tbody><tr><th scope="row">Prosjekt A</th><td>−6 500</td><td>2 000</td><td>2 500</td><td>4 900</td><td>351,32</td><td>17,77 %</td></tr><tr><th scope="row">Prosjekt B</th><td>−3 500</td><td>2 000</td><td>1 000</td><td>2 000</td><td>310,31</td><td>20,34 %</td></tr></tbody></table></div>
<p>Anbefaling (utledet; LF har ikke tekst her, men differanseinvesteringen i b) viser det): A – høyest NV, og internrenten på differanseinvesteringen (15,6 %) er større enn kravet (15 %).</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Hvilket avkastningskrav ville gitt prosjektene samme nåverdi?`,
            topics: ['toprosjekt'],
            answer: `<b>15,6 %</b> (internrenten på differanseinvesteringen A − B).`,
            method: `<p>Sett opp differanseinvesteringen A − B og finn internrenten:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody><tr><th scope="row">Prosjekt A</th><td>−6 500</td><td>2 000</td><td>2 500</td><td>4 900</td></tr><tr><th scope="row">Prosjekt B</th><td>−3 500</td><td>2 000</td><td>1 000</td><td>2 000</td></tr><tr class="sum"><th scope="row">A − B</th><td>−3 000</td><td>0</td><td>1 500</td><td>2 900</td></tr></tbody></table></div>
<p>Internrente = 15,6 % (egen kontroll: 15,596 %). Ved dette avkastningskravet har prosjektene samme nåverdi.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'c',
            q: `Hva måtte utrangeringsverdien for anleggsmidlet i prosjekt B være, for at nåverdien skal være den samme som i prosjekt A?`,
            topics: ['folsomhet'],
            answer: `Nødvendig utrangeringsverdi B = <b>1 062,38</b> (økning 62,38).`,
            method: `<p><em>LF for dette settet er et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Nåverdien av B må øke med 351,32 − 310,31 = 41,01. Utrangeringsverdien kommer i år 3, så salgssummen må øke med:</p>
<div class="formula">41,01 · 1,15<sup>3</sup> = 62,38</div>
<p>Nødvendig utrangeringsverdi B = 1 000 + 62,38 = 1 062,38. (LF kaller linjen «Laveste salgssum».)</p>`,
            src: 'LF+egen'
          },
          {
            label: 'd',
            q: `Ta for deg prosjekt A. Anta nå at den årlige kontantstrømmen fra driften i år 1 til 3 i oppstillingen over skal være en annuitet. Hva må det årlige beløpet være, for at nåverdien skal være den samme som du fikk i a). Ta også hensyn til utrangeringsverdien på anleggsmidlet når det selges i slutten av år 3.`,
            topics: ['folsomhet', 'rente'],
            answer: `Årlig beløp = <b>2 424,77</b>.`,
            method: `<p><em>LF for dette settet er et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>«Nåverdi CF år 1 til 3 for A» = 5 536,29. (Egen kontroll: = 6 500 + 351,32 − 2 000 / 1,15<sup>3</sup>, dvs. nåverdien av driftskontantstrømmene alene.)</p>
<div class="formula">Annuitet = <span class="frac"><span>5 536,29</span><span>A(3, 15 %)</span></span> = 2 424,77 per år</div>
<p>LF-kontroll: −6 500; 2 425; 2 425; 4 425 (= 2 425 + 2 000) → NPV = 351,32.</p>`,
            src: 'LF+egen'
          }
        ]
      },
      {
        nr: 2, weight: 20,
        title: 'Optimal levetid og utskiftingsfrekvens',
        topics: ['levetid'],
        text: `<p>En bedrift vurderer å starte et nytt prosjekt. Maskinen koster 750 000 i innkjøp og det påløper også monteringskostnader på 50 000. Markedsavdelingen mener at prosjektet vil gi følgende netto kontantstrøm:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>Netto kontantstrøm</th></tr></thead><tbody><tr><th scope="row">År 1</th><td>600 000</td></tr><tr><th scope="row">År 2</th><td>650 000</td></tr><tr><th scope="row">År 3</th><td>600 000</td></tr><tr><th scope="row">År 4</th><td>300 000</td></tr><tr><th scope="row">År 5</th><td>150 000</td></tr></tbody></table></div>
<p>Leverandøren av maskinen har gitt følgende anslag for salgsverdi (utrangeringsverdi) av maskinen for ulike år:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>Salgsverdi</th></tr></thead><tbody><tr><th scope="row">År 1</th><td>550 000</td></tr><tr><th scope="row">År 2</th><td>450 000</td></tr><tr><th scope="row">År 3</th><td>350 000</td></tr><tr><th scope="row">År 4</th><td>200 000</td></tr><tr><th scope="row">År 5</th><td>50 000</td></tr></tbody></table></div>
<p>Man vil bruke et avkastningskrav på 10 % på dette prosjektet.</p>`,
        parts: [
          {
            label: 'a',
            q: `Hva blir den økonomisk optimale levetiden dersom prosjektet er en engangsinvestering?`,
            topics: ['levetid'],
            answer: `<b>4 år</b> (høyest NV, 1 074 940).`,
            method: `<p>Investering = 750 000 + 50 000 = 800 000. Siste års kontantstrøm = netto kontantstrøm + salgsverdi. LF-regnearket gir:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Levetid</th><th>År 0</th><th>År 1</th><th>År 2</th><th>År 3</th><th>År 4</th><th>År 5</th><th>NNV</th><th>Annuitet</th></tr></thead><tbody><tr><th scope="row">1 år</th><td>−800 000</td><td>1 150 000</td><td></td><td></td><td></td><td></td><td>245 455</td><td>270 000</td></tr><tr><th scope="row">2 år</th><td>−800 000</td><td>600 000</td><td>1 100 000</td><td></td><td></td><td></td><td>654 545</td><td>377 143</td></tr><tr><th scope="row">3 år</th><td>−800 000</td><td>600 000</td><td>650 000</td><td>950 000</td><td></td><td></td><td>996 394</td><td>400 665</td></tr><tr><th scope="row">4 år</th><td>−800 000</td><td>600 000</td><td>650 000</td><td>600 000</td><td>500 000</td><td></td><td>1 074 940</td><td>339 112</td></tr><tr><th scope="row">5 år</th><td>−800 000</td><td>600 000</td><td>650 000</td><td>600 000</td><td>300 000</td><td>200 000</td><td>1 062 522</td><td>280 291</td></tr></tbody></table></div>
<p>Engangsinvestering → velg levetiden med høyest nåverdi → 4 år (NV 1 074 940). (Konklusjonen er utledet av LF-tabellen.)</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Anta nå at maskinen skal skiftes ut med en tilsvarende maskin i all fremtid. Hva blir den optimale utskiftingsfrekvensen?`,
            topics: ['levetid'],
            answer: `Skift ut <b>hvert 3. år</b> (høyest nåverdiannuitet, 400 665).`,
            method: `<p>Bruk tabellen fra a), men se på nåverdiannuiteten:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Levetid</th><th>NNV</th><th>Annuitet</th></tr></thead><tbody><tr><th scope="row">1 år</th><td>245 455</td><td>270 000</td></tr><tr><th scope="row">2 år</th><td>654 545</td><td>377 143</td></tr><tr><th scope="row">3 år</th><td>996 394</td><td>400 665</td></tr><tr><th scope="row">4 år</th><td>1 074 940</td><td>339 112</td></tr><tr><th scope="row">5 år</th><td>1 062 522</td><td>280 291</td></tr></tbody></table></div>
<p>Utskifting i all fremtid → velg levetiden med høyest nåverdiannuitet → hvert 3. år (annuitet 400 665). (Konklusjonen er utledet av LF-tabellen.)</p>`,
            src: 'LF+egen'
          }
        ]
      },
      {
        nr: 3, weight: 25,
        title: 'Tre aksjer: risiko, korrelasjon og portefølje',
        topics: ['portefolje'],
        text: `<p>En investor vurderer 3 aksjer, som vi kan kalle for aksje A, B og C. Avkastningen avhenger av den generelle økonomiske tilstanden, som vi kan kalle tilstand 1, 2 og 3, og er vist i tabellen under. Sannsynlighetene gjelder også betinget sannsynlighet, dvs. at ulike aksjer gir en gitt avkastning samtidig. Gjør rede for hvilke forutsetninger du gjør i analysen og om du eventuelt foretar forenklinger.</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Tilstand</th><th>Sannsynlighet</th><th>Aksje A</th><th>Aksje B</th><th>Aksje C</th></tr></thead><tbody><tr><th scope="row">Tilstand 1</th><td>0,30</td><td>10 %</td><td>10 %</td><td>10 %</td></tr><tr><th scope="row">Tilstand 2</th><td>0,40</td><td>15 %</td><td>15 %</td><td>7,5 %</td></tr><tr><th scope="row">Tilstand 3</th><td>0,30</td><td>10 %</td><td>10 %</td><td>20 %</td></tr></tbody></table></div>`,
        parts: [
          {
            label: 'a',
            q: `Beregn forventet avkastning og avkastningens standardavvik for aksje A, B og C.`,
            topics: ['portefolje'],
            answer: `E(r) = <b>12,00 %</b> for alle tre. Standardavvik: A = <b>2,45 %</b>, B = <b>2,45 %</b>, C = <b>5,34 %</b>.`,
            method: `<div class="tablewrap"><table class="data"><thead><tr><th>Størrelse</th><th>Aksje A</th><th>Aksje B</th><th>Aksje C</th></tr></thead><tbody><tr><th scope="row">Forventet avkastning</th><td>12,00 %</td><td>12,00 %</td><td>12,00 %</td></tr><tr><th scope="row">Varians</th><td>0,00060</td><td>0,00060</td><td>0,00285</td></tr><tr><th scope="row">Standardavvik</th><td>2,45 %</td><td>2,45 %</td><td>5,34 %</td></tr></tbody></table></div>
<p><em>Egen kontroll (ikke LF):</em></p>
<ul>
<li>E(A) = 0,3 · 10 + 0,4 · 15 + 0,3 · 10 = 12 %. Var(A) = 0,3 · (−2)<sup>2</sup> + 0,4 · 3<sup>2</sup> + 0,3 · (−2)<sup>2</sup> = 6 (%<sup>2</sup>) = 0,0006.</li>
<li>E(C) = 3 + 3 + 6 = 12 %. Var(C) = 0,3 · (−2)<sup>2</sup> + 0,4 · (−4,5)<sup>2</sup> + 0,3 · 8<sup>2</sup> = 1,2 + 8,1 + 19,2 = 28,5 (%<sup>2</sup>) = 0,00285.</li>
</ul>
<p>Aksje B har samme avkastning som A i alle tilstander og får derfor samme tall.</p>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Anta at investoren må velge en av aksjene. Hvilken vil du anbefale?`,
            topics: ['portefolje'],
            answer: `<b>A eller B</b> (likeverdige) – samme forventede avkastning som C, men lavere standardavvik.`,
            method: `<p>LF: «Forventet avkastning er identisk. A og B er likeverdige, men foretrekkes framfor C pga. lavere standardavvik.»</p>`,
            src: 'LF'
          },
          {
            label: 'c',
            q: `Beregn kovarians og korrelasjonskoeffisient mellom aksje A og B, A og C samt B og C.`,
            topics: ['portefolje'],
            answer: `A og B: kovarians = <b>0,0006</b>, korrelasjon = <b>1,0000</b>. A og C samt B og C: kovarians = <b>−0,0009</b>, korrelasjon = <b>−0,6882</b>.`,
            method: `<p>LF: «Vi ser med en gang av korrelasjonen mellom A og B er 1 (avkastning er identisk) men man [kan] beregne om man ønsker:»</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Par</th><th>Kovarians</th><th>Korrelasjon</th></tr></thead><tbody><tr><th scope="row">A og B</th><td>0,0006</td><td>1,0000</td></tr><tr><th scope="row">A og C / B og C</th><td>−0,0009</td><td>−0,6882</td></tr></tbody></table></div>
<p><em>Egen kontroll (ikke LF):</em> cov(A, C) = 0,3 · (−2)(−2) + 0,4 · (3)(−4,5) + 0,3 · (−2)(8) = 1,2 − 5,4 − 4,8 = −9 (%<sup>2</sup>) = −0,0009.</p>
<div class="formula">ρ = <span class="frac"><span>−0,0009</span><span>0,02449 · 0,05339</span></span> = −0,688</div>`,
            src: 'LF+egen'
          },
          {
            label: 'd',
            q: `Du forklarer investoren at det ikke er lurt å legge alle eggene i en kurv og at man bør eie flere aksjer samtidig. Anta nå at det kun er aktuelt med en portefølje bestående av to aksjer og at andelen til hver aksje skal være 0,50. Hvilken portefølje vil du foreslå? Begrunn svaret med relevante beregninger.`,
            topics: ['portefolje'],
            answer: `Foreslå <b>A + C</b> (eller B + C): E(r) = 12,00 %, standardavvik = <b>2,03 %</b>, mot 2,45 % for A + B.`,
            method: `<p>Andeler 0,50/0,50, kun to aksjer i porteføljen:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Portefølje</th><th>A + B</th><th>A + C</th><th>B + C</th></tr></thead><tbody><tr><th scope="row">Forventet avkastning</th><td>12,00 %</td><td>12,00 %</td><td>12,00 %</td></tr><tr><th scope="row">Varians</th><td>0,0006</td><td>0,0004</td><td>0,0004</td></tr><tr><th scope="row">Standardavvik</th><td>2,45 %</td><td>2,03 %</td><td>2,03 %</td></tr></tbody></table></div>
<p><em>Egen kontroll (ikke LF):</em> Var(A + C) = 0,25 · 0,0006 + 0,25 · 0,00285 + 2 · 0,25 · (−0,0009) = 0,0004125 → σ = 2,03 %.</p>
<p>LF-tekst: «A og B trenger strengt tatt ikke beregnes siden avkastning og standardavvik blir som å eie A eller B alene. Det er tilstrekkelig også å beregne enten A + C eller B + C, siden resultatene blir identisk. Det er fornuftig ikke å eie A og B i en portefølje fordi de er perfekt positivt korrelert, og aksje C bør heller inkluderes i porteføljen.»</p>`,
            src: 'LF+egen'
          }
        ]
      },
      {
        nr: 4, weight: 30,
        title: 'Nytt produkt: WACC og nåverdi etter skatt',
        topics: ['kvm', 'skatt'],
        text: `<p>En bedrift vurderer å lansere et nytt produkt. Man har gjennomført en markedsanalyse som indikerer at det er marked for produktet. Man har en kontrakt med markedsanalyse-selskapet om at undersøkelsen skal kose 300 000, men man har ikke mottatt faktura enda. Man antar at det er marked for produktet i 5 år. Det er budsjettert med følgende salgspris, salgsvolum og dekningsgrad gjennom prosjektets levetid:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>Størrelse</th><th>Verdi</th></tr></thead><tbody><tr><th scope="row">Salgspris pr. enhet</th><td>1 500</td></tr><tr><th scope="row">Salgsmengde år 1 til år 3</th><td>4 000</td></tr><tr><th scope="row">Salgsmengde år 4 til år 5</th><td>4 500</td></tr><tr><th scope="row">Dekningsgrad</th><td>70 %</td></tr></tbody></table></div>
<p>Det er anslått at de betalbare faste kostnadene vil være 1 000 000 høyere årlig enn de er nå. Prosjektet vil også bli belastet med indirekte kostnader på 1 000 000 årlig. Av disse kostnadene kan 50 % tilskrives prosjektet direkte, mens den øvrige andelen er fordelte kostnader fra hovedkontoret.</p>
<p>Dersom prosjektet starter, må man anskaffe anleggsmidler for 10 000 000. Anleggsmidlene avskrives med 20 % årlig, og man regner med at anleggsmidlene vil ha salgsverdi på 1 500 000 ved levetidens slutt. Salget skal behandles på den skattemessig gunstigste måte.</p>
<p>Prosjektet vil også medføre økt kapitalbinding i arbeidskapital. Man anslår at arbeidskapitalen vil utgjøre 15 % av omsetningen.</p>
<p>Bedriften finansierer sine prosjekter med en egenkapitalandel på 40 %. Risikofri rente er 2 % mens bedriften kan låne penger til en rente på 4,50 %. Avkastning på markedsporteføljen er 10 % og bedriftens aksjebeta er 1,26. Skattesatsen er 22 %.</p>`,
        parts: [
          {
            label: 'a',
            q: `Beregn bedriftens veide totalavkastningskrav, WACC. Rund gjerne av til nærmeste hele prosent.`,
            topics: ['kvm'],
            answer: `Egenkapitalkostnad = <b>12,08 %</b>, WACC = 0,06938 → avrundet <b>7 %</b>.`,
            method: `<p><em>LF for dette settet er et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>LF-tallene svarer til KVM uten skattejustering av risikofri rente (formelsamlingens formel 6.1). Egen kontroll:</p>
<div class="formula">r<sub>e</sub> = 0,02 + 1,26 · (0,10 − 0,02) = 0,1208</div>
<div class="formula">WACC = 0,1208 · 0,40 + 0,045 · (1 − 0,22) · 0,60 = 0,04832 + 0,02106 = 0,06938 ≈ 7 %</div>`,
            src: 'LF+egen'
          },
          {
            label: 'b',
            q: `Beregn nåverdi etter skatt. Er prosjektet lønnsomt?`,
            topics: ['skatt'],
            answer: `Nåverdi etter skatt = <b>1 494 278</b> → lønnsomt.`,
            method: `<p><em>LF for dette settet er et regneark med tall; metodebeskrivelsen er en tolkning av regnearket (kontrollregnet), ikke LF-tekst.</em></p>
<p>Nøkkelpunkter:</p>
<ul>
<li>Markedsanalysen 300 000 er <em>ikke</em> med i LF: kontrakten er inngått, kostnaden påløper uansett → sunk cost (selv om faktura ikke er mottatt).</li>
<li>Faste kostnader: økning 1 000 000. Indirekte kostnader: kun 50 % · 1 000 000 = 500 000 er relevant.</li>
<li>Arbeidskapital = 15 % av (neste års) omsetning: år 0: 900 000; år 3: økning 15 % · 750 000 = 112 500; år 5: frigjøring 1 012 500.</li>
</ul>
<p>NV av spart skatt på saldoavskrivningene:</p>
<div class="formula"><span class="frac"><span>10 000 000 · 0,20 · 0,22</span><span>0,07 + 0,20</span></span> = 1 629 630</div>
<p>Salgssummen 1 500 000 nedskrives på saldo («skattemessig gunstigste måte»). NV av økt skatt:</p>
<div class="formula"><span class="frac"><span>1 500 000 · 0,20 · 0,22</span><span>(0,07 + 0,20) · 1,07<sup>5</sup></span></span> = 174 286 (inngår som −174 286)</div>
<p>Beregningsgrunnlag ved 7 %:</p>
<div class="tablewrap"><table class="data"><thead><tr><th>År</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr></thead><tbody><tr><th scope="row">Omsetning</th><td></td><td>6 000 000</td><td>6 000 000</td><td>6 000 000</td><td>6 750 000</td><td>6 750 000</td></tr><tr><th scope="row">Variable kostnader (30 %)</th><td></td><td>−1 800 000</td><td>−1 800 000</td><td>−1 800 000</td><td>−2 025 000</td><td>−2 025 000</td></tr><tr><th scope="row">Faste kostnader (økning)</th><td></td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td><td>−1 000 000</td></tr><tr><th scope="row">Indirekte kostnader (50 %)</th><td></td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td><td>−500 000</td></tr><tr class="sum"><th scope="row">Resultat før skatt</th><td></td><td>2 700 000</td><td>2 700 000</td><td>2 700 000</td><td>3 225 000</td><td>3 225 000</td></tr><tr><th scope="row">Skatt (22 %)</th><td></td><td>−594 000</td><td>−594 000</td><td>−594 000</td><td>−709 500</td><td>−709 500</td></tr><tr><th scope="row">Anleggsmidler</th><td>−10 000 000</td><td></td><td></td><td></td><td></td><td>1 500 000</td></tr><tr><th scope="row">NV spart skatt pga. avskr.</th><td>1 629 630</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">NV økt skatt nedskriving</th><td>−174 286</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th scope="row">Arbeidskapital</th><td>−900 000</td><td>–</td><td>–</td><td>−112 500</td><td>–</td><td>1 012 500</td></tr><tr class="sum"><th scope="row">Beregningsgrunnlag</th><td>−9 444 656</td><td>2 106 000</td><td>2 106 000</td><td>1 993 500</td><td>2 515 500</td><td>5 028 000</td></tr></tbody></table></div>
<p>Nåverdi etter skatt = 1 494 278 → lønnsomt (konklusjonen følger av tallet; LF har ingen tekst).</p>`,
            src: 'LF+egen'
          }
        ]
      }
    ]
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
