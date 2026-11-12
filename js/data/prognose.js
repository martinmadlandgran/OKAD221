/* Temaer, kobling tema → generatorer, og prognosen for eksamen 2026. */
(function (root) {
  'use strict';
  const O = (root.OKAD = root.OKAD || {});
  O.exams = O.exams || []; O.theory = O.theory || []; O.quiz = O.quiz || [];

  O.topics = {
    skatt: { name: 'Nåverdi etter skatt (saldoavskrivning)', ch: [8], gens: ['k8-nv-etter-skatt-komplett', 'k8-saldo-arlig-kontantstrom', 'k8-kapasitetsutvidelse', 'k8-egenproduksjon-kjop', 'k8-egenkapitalmetoden', 'k8-ir-etter-skatt', 'k8-leasing-kjop', 'k8-salg-driftsmiddel'] },
    kvm: { name: 'KVM, beta og WACC', ch: [11], gens: ['k11-wacc-kvm', 'k11-kml-beta'] },
    prosjekt: { name: 'Kontantstrøm, NNV og internrente før skatt', ch: [2, 4], gens: ['k2-prosjekt-for-skatt', 'k4-resultat-til-kontantstrom', 'k2-hotell-differanse', 'k2-kontantstrom-egenkapital', 'k4-modifisert-internrente'] },
    toprosjekt: { name: 'Gjensidig utelukkende prosjekter / Fisher-rente', ch: [4], gens: ['k4-to-prosjekter-fisher', 'k4-resultat-til-kontantstrom', 'k4-lisens-egenproduksjon'] },
    folsomhet: { name: 'Kritiske verdier og følsomhet', ch: [6], gens: ['k6-kritiske-verdier', 'k2-prosjekt-for-skatt', 'k6-lite-stort-anlegg', 'k6-fortsette-avslutte', 'k6-folsomhet-internrente'] },
    portefolje: { name: 'Portefølje: forventning, risiko, korrelasjon', ch: [10], gens: ['k10-to-aksjer-tilstander', 'k10-kurser-til-avkastning'] },
    laan: { name: 'Lån og effektiv rente', ch: [7], gens: ['k7-annuitetslan-maanedlig', 'k7-rentefri-kreditt', 'k7-avbetaling-nominell-effektiv', 'k7-serielan-avdragsfri'] },
    obligasjon: { name: 'Obligasjoner: kurs, YTM, durasjon, terminrenter', ch: [4], gens: ['k4-obligasjon-kurs-ytm-durasjon', 'k4-spotrenter-terminrenter'] },
    levetid: { name: 'Økonomisk levetid og årskostnad', ch: [4], gens: ['k4-okonomisk-levetid', 'k4-arskostnad-ulik-levetid'] },
    rente: { name: 'Renteregning og annuiteter', ch: [3], gens: ['k3-effektiv-rente-grunn', 'k3-sparing-pensjon', 'k3-annuitetslan-arlig', 'k3-aksje-gordon'] },
    payback: { name: 'Payback og andre metoder', ch: [5], gens: ['k5-payback-kapitalrasjonering'] },
    kortfin: { name: 'Kassekreditt, leverandørkreditt, leasing', ch: [7], gens: ['k7-kortsiktig-finansiering', 'k8-leasing-kjop', 'k7-factoring'] },
    inflasjon: { name: 'Inflasjon og realrente', ch: [9], gens: ['k9-inflasjon-realrente'] },
    opsjon: { name: 'Opsjoner', ch: [13], gens: ['k13-opsjoner-binomial', 'k13-opsjonsposisjoner'] },
  };

  /**
   * Prognose for 2026. «prob» er en skjønnsmessig sannsynlighet for at temaet får en egen
   * oppgave/tydelig deloppgave, basert på frekvens 2016–2025 med ekstra vekt på de siste årene.
   */
  O.prediction = {
    slots: [
      { nr: 1, title: 'Prosjektanalyse før skatt', weight: [15, 25], prob: 0.97, topics: ['prosjekt', 'toprosjekt', 'folsomhet'],
        gens: ['k2-prosjekt-for-skatt', 'k4-to-prosjekter-fisher', 'k4-resultat-til-kontantstrom', 'k6-kritiske-verdier', 'k2-hotell-differanse'],
        why: 'Har åpnet settet 10 av 10 ganger. Veksler mellom ett prosjekt med kalkyletabell og feller (2018, 2022, 2023, 2025) og to gjensidig utelukkende prosjekter med Fisher-rente (2016, 2017, 2019, 2020, 2021, 2024). Etter 2025 (ett prosjekt) taler vekslingen svakt for to prosjekter i 2026. Nesten alltid en «baklengs»-deloppgave: kritisk verdi, maks pris eller ekvivalent annuitet.' },
      { nr: 2, title: 'Obligasjoner', weight: [10, 15], prob: 0.8, topics: ['obligasjon'],
        gens: ['k4-obligasjon-kurs-ytm-durasjon', 'k4-spotrenter-terminrenter'],
        why: 'Fantes ikke 2016–2023, men kom både i 2024 (spotrenter, durasjon, YTM, terminrenter) og 2025 (kurs, YTM, ny kurs, Macaulay-durasjon). Forelesningen merker stoffet «kun 221» – det er det som skiller ØKAD 221 fra forgjengerne. Regn med kurs + durasjon, og ett av YTM/terminrenter/renteendring.' },
      { nr: 3, title: 'Lån og effektiv rente', weight: [15, 25], prob: 0.7, topics: ['laan', 'rente'],
        gens: ['k7-annuitetslan-maanedlig', 'k7-rentefri-kreditt', 'k7-avbetaling-nominell-effektiv', 'k7-serielan-avdragsfri'],
        why: 'Kom i 7 av 10 sett (2017, 2018, 2019, 2021, 2022, 2023, 2025). Borte i 2024 da obligasjoner tok plassen, men tilbake i 2025 som forbrukerkreditt. Klassikeren er annuitetslån med månedlige terminer og gebyrer: terminbeløp, rente/avdrag de tre første månedene, effektiv årsrente, restgjeld og én vri.' },
      { nr: 4, title: 'Portefølje av to aksjer', weight: [20, 30], prob: 0.9, topics: ['portefolje', 'kvm'],
        gens: ['k10-to-aksjer-tilstander', 'k10-kurser-til-avkastning'],
        why: 'Seks år på rad (2020–2025) og vekten har økt fra 20 til 25–30 %. De to siste årene er avkastningen oppgitt som kurser som må regnes om. Alltid forventning og standardavvik, så dominans, portefølje (50/50 eller 60/40), og et kort «hvorfor»-spørsmål. Minimum varians (2016, 2021, 2023), risikofri kombinasjon (2021) og systematisk risiko (2024) roterer.' },
      { nr: 5, title: 'WACC og nåverdi etter skatt', weight: [25, 35], prob: 0.99, topics: ['skatt', 'kvm'],
        gens: ['k8-nv-etter-skatt-komplett', 'k8-kapasitetsutvidelse'],
        why: 'Eneste oppgave som har kommet i alle ti sett, alltid til slutt og alltid tyngst (25–40 %). Oppskriften er helt fast: KVM uten skattejustering → WACC → relevant kontantstrøm med 2–4 feller → arbeidskapital → NV spart skatt på saldoavskrivning (alltid 20 % saldo, 22 % skatt). Salgsverdi «på skattemessig gunstigste måte» kom i 2016, 2020, 2021, 2023 og 2024 – ikke i 2025, så den er sannsynlig i 2026.' },
    ],
    jokers: [
      { title: 'Økonomisk levetid / årskostnad', prob: 0.35, topics: ['levetid'], gens: ['k4-okonomisk-levetid', 'k4-arskostnad-ulik-levetid'],
        why: 'Egen 20 %-oppgave i 2016, 2017, 2018 og 2020, deretter borte til årskostnad dukket opp som deloppgave i 2025. Lett å legge inn som deloppgave.' },
      { title: 'Realrente etter skatt / inflasjon', prob: 0.25, topics: ['inflasjon'], gens: ['k9-inflasjon-realrente'],
        why: 'Deloppgave i 2023 (2g). Kort formel som passer som siste deloppgave i en låneoppgave.' },
      { title: 'Opsjoner', prob: 0.15, topics: ['opsjon'], gens: ['k13-opsjoner-binomial', 'k13-opsjonsposisjoner'],
        why: 'Aldri gitt 2016–2025, men kapittel 13 foreleses, det finnes eget regneark, og binomial- og Black–Scholes-formlene sto i formelsamlingen i 2023. Lav sannsynlighet, men billig å forberede: én binomialoppgave og salg-kjøp-paritet.' },
      { title: 'Payback med vurdering av metoden', prob: 0.3, topics: ['payback'], gens: ['k5-payback-kapitalrasjonering', 'k4-to-prosjekter-fisher'],
        why: 'Deloppgave i 2016, 2021 og 2022. Kommer i så fall inne i oppgave 1.' },
      { title: 'Kassekreditt, leverandørkreditt, leasing', prob: 0.1, topics: ['kortfin'], gens: ['k7-kortsiktig-finansiering'],
        why: 'Bare kassekreditt i 2019. Foreleses i kapittel 7.' },
      { title: 'Kapitalmarkedslinjen / kovarians fra beta', prob: 0.2, topics: ['kvm'], gens: ['k11-kml-beta'],
        why: 'Kovarians fra beta i 2019, systematisk vs. usystematisk risiko i 2024. Kommer som drøftings- eller tilleggsdel.' },
    ],
    traps: [
      ['Avskrivninger i resultatbudsjett', 'Ikke en kontantstrøm. Legg dem tilbake (før skatt) eller ta bare skatteeffekten (etter skatt).', '2024, 2025'],
      ['Fordelte felleskostnader', 'Ikke relevante – med mindre oppgaven sier at prosjektet forårsaker en andel (2024: 50 %).', '2023, 2024, 2025'],
      ['Sunk cost (utviklingskostnader)', 'Allerede påløpt. Skal ikke med.', '2020, 2025'],
      ['Alternativkostnad', 'Tapt leieinntekt skal med, selv om ingen betaler noe.', '2018, 2019, 2021'],
      ['Lønn til eksisterende ansatte', 'Bare lønnsøkningen eller vikarkostnaden er relevant.', '2021, 2024'],
      ['Kannibalisering / synergi', 'Regnes som tapt eller vunnet dekningsbidrag – ikke omsetning, og ikke faste enhetskostnader.', '2021, 2025'],
      ['Kapasitetsutvidelse', 'Bare merproduksjonen utover dagens kapasitet er relevant.', '2022, 2023'],
      ['Arbeidskapital', 'x % av NESTE års omsetning, bundet året før. Bare endringen hvert år. Alt frigjøres siste år. Ingen skatt.', 'alle år'],
      ['Installasjonskostnad', 'Aktiveres sammen med anleggsmidlet og øker avskrivningsgrunnlaget.', '2024'],
      ['Salg av anleggsmiddel', '«Skattemessig gunstigst» = nedskriving på saldo: + SV/(1+r)ⁿ − SV·a·s/(r+a)/(1+r)ⁿ.', '2016, 2020, 2021, 2023, 2024'],
      ['Månedsrente × 12', 'Gir nominell rente. Effektiv rente er (1 + månedsrente)¹² − 1.', '2018–2023, 2025'],
      ['Kurser i stedet for avkastning', 'Regn om til avkastning (sluttkurs/startkurs − 1) før du regner forventning og standardavvik.', '2024, 2025'],
    ],
  };

  /** Sammensetning av prøveeksamen 2026. Hver luke trekker én generator. Vekter summerer til 100. */
  O.mockSlots = [
    { weight: 20, pool: [['k4-to-prosjekter-fisher', 3], ['k2-prosjekt-for-skatt', 3], ['k4-resultat-til-kontantstrom', 1], ['k6-kritiske-verdier', 1], ['k2-hotell-differanse', 1.5]] },
    { weight: 10, pool: [['k4-obligasjon-kurs-ytm-durasjon', 3], ['k4-spotrenter-terminrenter', 2]] },
    { weight: 20, pool: [['k7-annuitetslan-maanedlig', 4], ['k7-avbetaling-nominell-effektiv', 1], ['k7-rentefri-kreditt', 1], ['k4-okonomisk-levetid', 1.5], ['k4-arskostnad-ulik-levetid', 1], ['k13-opsjoner-binomial', 0.6], ['k9-inflasjon-realrente', 0.5]] },
    { weight: 20, pool: [['k10-kurser-til-avkastning', 3], ['k10-to-aksjer-tilstander', 3]] },
    { weight: 30, pool: [['k8-nv-etter-skatt-komplett', 2], ['k8-kapasitetsutvidelse', 1]] },
  ];
})(typeof globalThis !== 'undefined' ? globalThis : this);
