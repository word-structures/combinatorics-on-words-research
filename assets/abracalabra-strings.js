/**
 * abracalabra-strings.js
 * ----------------------
 * Child-facing text for abracalabra, separated from scene data and from
 * mathematical validation.
 *
 * LANGUAGE POLICY (docs/program/WAVE_2_PEDAGOGY_AND_PRODUCT_SYNTHESIS.md,
 * OD-10, DECIDED 2026-08-06):
 *
 *     canonical source   English        the pack that is edited and reviewed
 *     delivery language  may be Finnish what a learner sees first
 *
 * So `en` below is canonical: it is the pack a reviewer checks, and any new
 * key is added there first. `fi` is a delivery translation of the same key
 * shape, present because early playtesting is expected to be with Finnish
 * 10-12-year-olds. `tests/test-abracalabra.js` fails if the two packs' key
 * shapes diverge, which is what stops the Finnish delivery silently rotting.
 *
 * This is deliberately a plain nested object, not an i18n framework. The
 * whole product is seven scenes on a static page.
 *
 * Placeholders are `{name}` and are substituted by `fmt()` in abracalabra.js.
 * No string here carries mathematical authority: every number a player sees
 * is passed in from `abracalabra-scenes.js` or computed by AbelianCore.
 */
(function(global) {
  'use strict';

  var PACKS = {

    // ══ ENGLISH — canonical ═════════════════════════════════════════════
    en: {
      meta: { code: 'en', label: 'English' },

      ui: {
        productName: 'abracalabra',
        tagline: 'Four doors. Four kinds of evidence.',
        chamberOf: 'Door {n} of {total}',
        chamberPart: 'Door {n} of {total} · Part {part} of {parts}',
        restart: 'Start again',
        restartConfirm: 'Start again from the first door?',
        restartYes: 'Yes, start again',
        restartNo: 'Keep going',
        languageLabel: 'Language',
        continue: 'Go on',
        check: 'Check',
        clear: 'Clear',
        howDoYouKnow: 'How do you know?',
        backToAbelisk: 'Abelisk',
        privacyNote: 'Nothing you do here is saved or sent anywhere.'
      },

      // The acts. Each line is shown only AFTER the act is completed,
      // so the vocabulary is earned rather than taught up front.
      acts: {
        FIND:    { name: 'FOUND',  line: 'One example is enough to show that something exists.' },
        BREAK:   { name: 'BROKEN', line: 'One counterexample brings down a claim about every case.' },
        MAP:     { name: 'MAPPED', line: 'Every case accounted for — not just the ones you thought of.' },
        KNOW:    { name: 'KNOWN',  line: 'An empty answer, and the reason it is empty.' },
        MACHINE: { name: 'THE MACHINE CHECKED THEM ALL', line: 'The same logical shape, different hands.' },
        REASON:  { name: 'I KNOW WHY', line: 'Sixteen checks, or two sentences. The reason does not need the list.' }
      },

      rulePlate: {
        label: 'Rule',
        symbols: 'Symbols',
        'looking-for-echoes': 'Looking for: echoes with blocks of 2 or more',
        'no-rule': 'Nothing forbidden — we are counting',
        'strict-rule': 'Forbidden: every echo, even {example}'
      },

      opening: {
        title: 'abracalabra',
        lede: 'Something looks like magic only until you find out how it works.',
        body: 'There are four doors below the Abelisk. Each one opens for a different kind of reason.',
        enter: 'Open the first door'
      },

      scenes: {

        echo: {
          title: 'The Echo',
          intro: 'A sealed panel. Five symbols cut into it. Nothing else.',
          prompt: 'Somewhere here, two blocks side by side hold the same letters — just not in the same order. The panel calls that an echo. Find it.',
          rule: 'The two blocks must sit side by side, be the same length, and be at least two symbols long.',
          help: 'Choose a symbol to start the pair, then another to end it.',
          selecting: 'Start of the pair: symbol {n}. Now choose where it ends.',
          errOdd: 'A pair of blocks has to split evenly down the middle. Choose an even number of symbols.',
          errShort: 'Each block must be at least two symbols. Choose at least four.',
          leftLabel: 'First block',
          rightLabel: 'Second block',
          holds: 'holds',
          attemptFail: 'These two blocks do not hold the same letters.',
          attemptFailAgain: 'Not these two either. Compare what each block holds, not how it reads.',
          success: 'The panel gives.',
          successBody: 'The two blocks do not read the same. They count the same. That is the whole of it.',
          naming: 'The panel calls this an echo. Mathematicians call it an abelian square.'
        },

        crack: {
          title: 'The Crack',
          intro: 'Deeper in. A claim is cut into the door, in the same hand as the panel above.',
          claim: 'AN ECHO ONLY HAPPENS WHEN THE TWO BLOCKS READ THE SAME.',
          prompt: 'The door will not open while it believes this. Build something that shows it is wrong.',
          help: 'Fill the slots. The divider sets how long each block is.',
          blockLen: 'Blocks of {n}',
          errIncomplete: 'Fill every slot first.',
          resultNotEcho: 'Not an echo at all. The two blocks hold different letters, so the claim has nothing to answer for.',
          resultConsistent: 'That is an echo — but both blocks read the same, exactly as the door says. The claim survives this one.',
          success: 'The door cracks.',
          successBody: 'Both blocks hold the same letters. They do not read the same. The door said only. You found one that is not.',
          oneEnough: 'One was enough. A claim about every case falls to a single case that does not fit.',
          repairIntro: 'The door re-cuts itself:',
          repairedClaim: 'AN ECHO HAPPENS WHEN THE TWO BLOCKS HOLD THE SAME LETTERS.',
          repairQuestion: 'Does your example break this one too?',
          repairYes: 'Yes, it breaks this one too',
          repairNo: 'No, this one survives it',
          repairWrong: 'Look again at what you built: both blocks hold the same letters, which is exactly what the new claim says happens.',
          repairRight: 'No — your example fits the new claim. Breaking a claim does not leave nothing behind. It leaves a better one.'
        },

        map: {
          title: 'The Map',
          intro: 'Three empty slots. Only two symbols left in this part of the archive: a and b.',
          prompt: 'The door asks for every word that fits.',
          help: 'Build a word, then set it on the wall.',
          addBtn: 'Set it on the wall',
          errIncomplete: 'Fill all three slots first.',
          duplicate: '{word} is already on the wall.',
          added: '{word} is on the wall.',
          wallLabel: 'The wall',
          wallCount: '{n} on the wall',
          doneBtn: "That's all of them",
          question: 'Are these all of them?',
          questionBody: 'The door does not answer. It waits.',
          countPrompt: 'How many different words of three symbols can be made from a and b?',
          countPlaceholder: 'a number',
          countSubmit: 'That many',
          errNotNumber: 'Give the door a number.',
          guideIntro: 'The door will not take that. It asks something smaller instead:',
          guide1: 'How many symbols can go in the first slot?',
          guide2: 'And in the second?',
          guide3: 'And in the third?',
          guideResult: 'So: {a} × {b} × {c} = {n}.',
          claimedShort: 'You say {claim}. The wall holds {have}. Some are still out there.',
          claimedLong: 'You say {claim}, but there are fewer than that. Count the choices again, slot by slot.',
          organiseBtn: 'Sort the wall',
          organiseBy: 'Sort by',
          organiseFirst: 'first symbol',
          organiseLast: 'last symbol',
          organiseCountA: 'number of a',
          organiseOff: 'no order',
          groupLabel: '{key}',
          success: 'The wall is full.',
          successBody: 'Eight words — and eight is not how many you happened to think of. Two choices, three times over. There is no ninth.'
        },

        'empty-door': {
          title: 'The Empty Door',
          intro: 'Four slots. Two symbols. And a new rule, cut deeper than the others.',
          rule: 'BEHIND THIS DOOR, EVERY ECHO COUNTS — EVEN TWO IDENTICAL SYMBOLS SIDE BY SIDE.',
          ruleNote: 'This is not the rule from the rooms above, and it is not the rule in Abelisk. There, aa and bb are allowed. Here they are not.',
          prompt: 'Build a word of four symbols with no echo anywhere in it.',
          help: 'Fill the slots, then try the door.',
          tryBtn: 'Try the door',
          errIncomplete: 'Fill all four slots first.',
          attemptFail: '{word} — echo at symbols {from}–{to}.',
          echoAt: 'echo at symbols {from}–{to}',
          // Unreachable while the scene's verified truth holds (no word of
          // length 4 survives). Present so that a survivor would be shown
          // rather than silently swallowed if the mathematics ever changed.
          unexpectedSurvivor: '{word} has no echo. That should not be possible under this rule — please report it.',
          attemptDuplicate: 'You have already tried {word}.',
          triedLabel: 'Tried',
          notFound: 'You have not found one.',
          notFoundQuestion: 'Does that mean there is not one?',
          optYes: 'Yes — there is not one.',
          optNo: 'No — I just have not found it yet.',
          optUnsure: 'I cannot tell yet.',
          respYes: 'Careful. Not finding is not the same as there not being one. To say that, you would have to account for all of them.',
          respNo: 'That is the honest answer so far.',
          respUnsure: 'That is the honest answer so far.',
          mapIntro: 'The wall from the room above is still standing.',
          mapBody: 'Eight words of three symbols. Add one symbol to each, and you have every word of four.',
          coverage: 'Accounted for: {n} of {total}',
          nodeTest: 'Test',
          parentDeadFirst: '{word} already has an echo. Adding a symbol cannot take an echo away — so both words growing out of it are settled too.',
          whyQuestion: 'Why does that settle both of them?',
          whyA: 'Because an echo that is already there stays there when the word gets longer.',
          whyB: 'Because both of them start with the same symbols.',
          whyWrong: 'True, but that is not the reason. Two words that start alike can still behave differently.',
          whyRight: 'Yes. That is what lets you settle two words by checking one.',
          parentDead: '{word} already has an echo. Both words growing out of it are settled.',
          parentLive: '{word} has no echo yet. Its two words still have to be checked one at a time.',
          childDead: '{word} — echo at symbols {from}–{to}.',
          nothingSurvived: 'Nothing survived.',
          finalLock: 'How do you know nothing is missing?',
          final1: 'I tried a lot of them and none worked.',
          final2: 'Every word of four symbols from a and b is on this map, and none of them works.',
          final3: 'There is no such word, of any length.',
          finalResp1: 'That was already true before you made the map. The map says more than that.',
          finalResp3: 'Careful. The map covers words of four symbols. It says nothing about longer ones.',
          success: 'The door opens onto nothing. That is the answer.',
          successLines: [
            'There are sixteen words of four symbols over a and b.',
            'You have accounted for all sixteen.',
            'Under this door\u2019s rule, none of them works.'
          ],
          successConclusion: 'So there is no such word of four symbols here. Not "we did not find one". There is not one.',
          bounded: 'This says nothing about longer words, other symbols, or other rules.'
        },

        'third-symbol': {
          title: 'The Third Symbol',
          intro: 'The same strict rule. But now there are three symbols instead of two.',
          transition: 'One more symbol?',
          prompt: 'Build a word, one symbol at a time. The rule has not changed: every echo is forbidden.',
          help: 'Choose a symbol to add to the end of the word.',
          currentWord: 'Your word',
          frontier: 'Next symbol',
          frontierLegal: '{letter} — no echo',
          frontierDead: '{letter} — echo at {from}–{to}',
          frontierAllDead: 'No symbol can be added without creating an echo.',
          restartWord: 'Start a new word',
          longest: 'Longest: {n}',
          chasePrompt: 'Can you reach length 7?',
          reachedSeven: 'Length 7.',
          hitWall: 'Every path ends. None of them reaches 8.',
          hitWallQuestion: 'You cannot check every path yourself. But a machine can.',
          toMachine: 'Let the machine try'
        },

        'counting-machine': {
          title: 'The Counting Machine',
          subtitle: 'Part 1 of 2',
          intro: 'You tried. You reached length 7. You could not reach 8.',
          ask: 'I can check every one. Shall I?',
          runBtn: 'Let the machine check',
          running: 'Checking length {n}…',
          profileLabel: 'Words that survive',
          lengthLabel: 'length',
          countLabel: 'survivors',
          done: 'Done.',
          doneBody: 'The machine checked {total} words. Every word of every length up to 8, over three symbols.',
          comparison: 'In the Empty Door, you covered sixteen words by hand. Here the machine covered {total}.',
          sameShape: 'Same logical shape. Different hands.',
          evidenceCard: 'THE MACHINE CHECKED THEM ALL'
        },

        'shorter-reason': {
          title: 'The Shorter Reason',
          subtitle: 'Part 2 of 2',
          intro: 'Back to two symbols. Same strict rule.',
          recall: 'In the Empty Door, you checked all sixteen words of length 4. None survived.',
          question: 'Can you say why none of your sixteen worked — without checking all sixteen?',
          step1q: 'Under this rule, can two neighbouring symbols be equal?',
          step1a: 'No — aa or bb would be an echo.',
          step1b: 'Yes — doubles are allowed.',
          step1wrong: 'Under this rule, even aa counts as an echo. Two equal neighbours are forbidden.',
          step1right: 'Right. No two neighbours can be equal.',
          step2q: 'If no two neighbours can be equal, what must the word do?',
          step2a: 'It must alternate between a and b.',
          step2b: 'It can still use any pattern.',
          step2wrong: 'With only two symbols and no two neighbours equal, each symbol must differ from the one before it. That is alternation.',
          step2right: 'Yes. With only two symbols, the word must alternate: a b a b… or b a b a…',
          step3q: 'Which words of length 4 alternate between a and b?',
          step3a: 'abab and baba',
          step3b: 'abab, baba, abba, and baab',
          step3wrong: 'abba has two neighbouring b\'s, and baab has two neighbouring a\'s. Only strict alternation survives.',
          step3right: 'Exactly two: abab and baba.',
          step4q: 'Look at abab. Look at baba. Do they have an echo?',
          step4a: 'Yes — both contain ab|ab or ba|ba as an echo.',
          step4b: 'No — the letters are all different.',
          step4wrong: 'In abab: the first two symbols are ab, the next two are ab. Same letters, same counts. That is an echo with blocks of 2.',
          step4right: 'Both do. abab contains ab|ab. baba contains ba|ba. Both are echoes with blocks of length 2.',
          conclusion: 'So: the rule forces alternation. Only two words alternate. Both contain an echo. No list was needed.',
          evidenceCard: 'I KNOW WHY',
          evidenceLine: 'Two sentences, not sixteen checks.',
          bounded: 'This argument covers length 4 over {a,b} under this rule. It says nothing about longer words or more symbols.'
        }
      },

      cliff: {
        title: 'The Cliff',
        wall1label: '2 symbols · every echo counts',
        wall2label: '3 symbols · every echo counts',
        wall3label: '3 symbols · doubles allowed',
        lengthAxis: 'length',
        countAxis: 'survivors',
        wall3empty: '?',
        wall3note: 'This wall is intentionally empty.'
      },

      handoff: {
        body1: 'You have learned more than how to find echoes.',
        body2: 'You found one. You broke a claim. You checked every case. You let a machine check more. Then you found a reason that needed no list at all.',
        body3: 'Two symbols: it ends.',
        body4: 'Three symbols: it ends later.',
        body5: 'One wall is still empty.',
        body6: 'That question is next door.',
        abelisk: 'Play Abelisk',
        learn: 'Read the mathematics',
        again: 'Walk the doors again'
      },

      // Legacy outro kept for structural compatibility; the cliff/handoff
      // view is now the real ending.
      outro: {
        title: 'Beyond',
        body1: 'Change the rule and the answer changes. Next door, in Abelisk, two identical symbols side by side are allowed — and words go a good deal further before they fail.',
        body2: 'Questions of exactly this shape — more symbols, harder rules, longer words — get asked in mathematics too. Some of them have no answer yet.',
        body3: 'Your sixteen were small enough to count. Those are not.',
        abelisk: 'Play Abelisk',
        learn: 'Read the mathematics',
        again: 'Walk the four doors again'
      }
    },

    // ══ FINNISH — delivery ══════════════════════════════════════════════
    fi: {
      meta: { code: 'fi', label: 'Suomi' },

      ui: {
        productName: 'abracalabra',
        tagline: 'Neljä ovea. Neljä erilaista todistetta.',
        chamberOf: 'Ovi {n} / {total}',
        chamberPart: 'Ovi {n} / {total} · Osa {part} / {parts}',
        restart: 'Aloita alusta',
        restartConfirm: 'Aloitetaanko ensimmäiseltä ovelta?',
        restartYes: 'Kyllä, alusta',
        restartNo: 'Jatketaan',
        languageLabel: 'Kieli',
        continue: 'Jatka',
        check: 'Tarkista',
        clear: 'Tyhjennä',
        howDoYouKnow: 'Mistä sen tiedät?',
        backToAbelisk: 'Abelisk',
        privacyNote: 'Mitään täällä tekemääsi ei tallenneta eikä lähetetä minnekään.'
      },

      acts: {
        FIND:    { name: 'LÖYTYI',    line: 'Yksi esimerkki riittää osoittamaan, että jokin on olemassa.' },
        BREAK:   { name: 'MURTUI',    line: 'Yksi vastaesimerkki kaataa väitteen, joka koski kaikkia tapauksia.' },
        MAP:     { name: 'KARTOITETTU', line: 'Jokainen tapaus käyty läpi — ei vain ne, jotka tulivat mieleen.' },
        KNOW:    { name: 'TIEDETÄÄN', line: 'Tyhjä vastaus, ja syy siihen miksi se on tyhjä.' },
        MACHINE: { name: 'KONE TARKISTI NE KAIKKI', line: 'Sama looginen muoto, eri kädet.' },
        REASON:  { name: 'TIEDÄN MIKSI', line: 'Kuusitoista tarkistusta tai kaksi lausetta. Syy ei tarvitse koko listaa.' }
      },

      rulePlate: {
        label: 'Sääntö',
        symbols: 'Merkit',
        'looking-for-echoes': 'Etsitään: kaikuja, joiden lohkot ovat vähintään 2 merkkiä',
        'no-rule': 'Mitään ei kielletä — lasketaan',
        'strict-rule': 'Kielletty: jokainen kaiku, myös {example}'
      },

      opening: {
        title: 'abracalabra',
        lede: 'Jokin näyttää taialta vain siihen asti, kunnes saat selville miten se toimii.',
        body: 'Abeliskin alla on neljä ovea. Jokainen niistä aukeaa eri syystä.',
        enter: 'Avaa ensimmäinen ovi'
      },

      scenes: {

        echo: {
          title: 'Kaiku',
          intro: 'Sinetöity levy. Siihen on kaiverrettu viisi merkkiä. Ei muuta.',
          prompt: 'Jossakin täällä kaksi vierekkäistä lohkoa sisältävät samat kirjaimet — vain eri järjestyksessä. Levy kutsuu sitä kaiuksi. Etsi se.',
          rule: 'Lohkojen pitää olla vierekkäin, yhtä pitkiä, ja vähintään kahden merkin mittaisia.',
          help: 'Valitse merkki, josta pari alkaa, ja sitten toinen, johon se päättyy.',
          selecting: 'Pari alkaa merkistä {n}. Valitse nyt mihin se päättyy.',
          errOdd: 'Lohkopari pitää voida jakaa tasan keskeltä. Valitse parillinen määrä merkkejä.',
          errShort: 'Kummankin lohkon pitää olla vähintään kaksi merkkiä. Valitse ainakin neljä.',
          leftLabel: 'Ensimmäinen lohko',
          rightLabel: 'Toinen lohko',
          holds: 'sisältää',
          attemptFail: 'Näissä kahdessa lohkossa ei ole samoja kirjaimia.',
          attemptFailAgain: 'Ei näissäkään. Vertaa sitä mitä lohkot sisältävät, älä sitä miltä ne näyttävät.',
          success: 'Levy antaa periksi.',
          successBody: 'Lohkot eivät näytä samalta. Ne sisältävät saman. Siinä se koko juttu on.',
          naming: 'Levy kutsuu tätä kaiuksi. Matemaatikot kutsuvat sitä abelin neliöksi.'
        },

        crack: {
          title: 'Halkeama',
          intro: 'Syvemmällä. Oveen on kaiverrettu väite, samalla kädellä kuin ylempi levy.',
          claim: 'KAIKU SYNTYY VAIN SILLOIN, KUN LOHKOT NÄYTTÄVÄT SAMALTA.',
          prompt: 'Ovi ei aukea niin kauan kuin se uskoo tähän. Rakenna jotain, joka osoittaa sen vääräksi.',
          help: 'Täytä ruudut. Jakaja määrää kuinka pitkiä lohkot ovat.',
          blockLen: 'Lohkot {n} merkkiä',
          errIncomplete: 'Täytä ensin kaikki ruudut.',
          resultNotEcho: 'Ei kaiku lainkaan. Lohkoissa on eri kirjaimet, joten väitteellä ei ole tässä mitään vastattavaa.',
          resultConsistent: 'Tämä on kaiku — mutta lohkot näyttävät samalta, aivan kuten ovi sanoo. Väite kestää tämän.',
          success: 'Ovi halkeaa.',
          successBody: 'Lohkoissa on samat kirjaimet. Ne eivät näytä samalta. Ovi sanoi vain. Sinä löysit yhden, joka ei ole.',
          oneEnough: 'Yksi riitti. Väite kaikista tapauksista kaatuu yhteen tapaukseen, joka ei sovi.',
          repairIntro: 'Ovi kaivertaa itsensä uudelleen:',
          repairedClaim: 'KAIKU SYNTYY SILLOIN, KUN LOHKOISSA ON SAMAT KIRJAIMET.',
          repairQuestion: 'Murtaako esimerkkisi myös tämän?',
          repairYes: 'Kyllä, murtaa tämänkin',
          repairNo: 'Ei, tämä kestää sen',
          repairWrong: 'Katso vielä mitä rakensit: molemmissa lohkoissa on samat kirjaimet, ja juuri niin uusi väite sanookin.',
          repairRight: 'Ei — esimerkkisi sopii uuteen väitteeseen. Väitteen murtaminen ei jätä jälkeensä tyhjää. Se jättää paremman väitteen.'
        },

        map: {
          title: 'Kartta',
          intro: 'Kolme tyhjää ruutua. Tässä arkiston osassa on jäljellä vain kaksi merkkiä: a ja b.',
          prompt: 'Ovi pyytää jokaista sanaa, joka näihin sopii.',
          help: 'Rakenna sana ja aseta se seinälle.',
          addBtn: 'Aseta seinälle',
          errIncomplete: 'Täytä ensin kaikki kolme ruutua.',
          duplicate: '{word} on jo seinällä.',
          added: '{word} on seinällä.',
          wallLabel: 'Seinä',
          wallCount: '{n} seinällä',
          doneBtn: 'Siinä kaikki',
          question: 'Ovatko nämä kaikki?',
          questionBody: 'Ovi ei vastaa. Se odottaa.',
          countPrompt: 'Kuinka monta erilaista kolmen merkin sanaa merkeistä a ja b voi tehdä?',
          countPlaceholder: 'luku',
          countSubmit: 'Näin monta',
          errNotNumber: 'Anna ovelle luku.',
          guideIntro: 'Ovi ei ota sitä vastaan. Se kysyy pienempää:',
          guide1: 'Kuinka monta merkkiä ensimmäiseen ruutuun voi tulla?',
          guide2: 'Entä toiseen?',
          guide3: 'Entä kolmanteen?',
          guideResult: 'Siis: {a} × {b} × {c} = {n}.',
          claimedShort: 'Sanot {claim}. Seinällä on {have}. Osa on vielä löytämättä.',
          claimedLong: 'Sanot {claim}, mutta niitä on vähemmän. Laske valinnat uudelleen ruutu kerrallaan.',
          organiseBtn: 'Järjestä seinä',
          organiseBy: 'Järjestä',
          organiseFirst: 'ensimmäisen merkin mukaan',
          organiseLast: 'viimeisen merkin mukaan',
          organiseCountA: 'a-kirjainten määrän mukaan',
          organiseOff: 'ei järjestystä',
          groupLabel: '{key}',
          success: 'Seinä on täynnä.',
          successBody: 'Kahdeksan sanaa — eikä kahdeksan ole se määrä, joka sattui tulemaan mieleen. Kaksi vaihtoehtoa, kolme kertaa. Yhdeksättä ei ole.'
        },

        'empty-door': {
          title: 'Tyhjä ovi',
          intro: 'Neljä ruutua. Kaksi merkkiä. Ja uusi sääntö, kaiverrettuna syvemmälle kuin muut.',
          rule: 'TÄMÄN OVEN TAKANA JOKAINEN KAIKU LASKETAAN — MYÖS KAKSI SAMANLAISTA MERKKIÄ VIERETYSTEN.',
          ruleNote: 'Tämä ei ole ylempien huoneiden sääntö eikä Abeliskin sääntö. Siellä aa ja bb ovat sallittuja. Täällä eivät.',
          prompt: 'Rakenna neljän merkin sana, jossa ei ole kaikua missään kohdassa.',
          help: 'Täytä ruudut ja kokeile ovea.',
          tryBtn: 'Kokeile ovea',
          errIncomplete: 'Täytä ensin kaikki neljä ruutua.',
          attemptFail: '{word} — kaiku merkeissä {from}–{to}.',
          echoAt: 'kaiku merkeissä {from}–{to}',
          unexpectedSurvivor: 'Sanassa {word} ei ole kaikua. Sen ei pitäisi olla tämän säännön mukaan mahdollista — ilmoita tästä.',
          attemptDuplicate: 'Olet jo kokeillut sanaa {word}.',
          triedLabel: 'Kokeiltu',
          notFound: 'Et ole löytänyt yhtäkään.',
          notFoundQuestion: 'Tarkoittaako se, ettei sellaista ole?',
          optYes: 'Kyllä — sellaista ei ole.',
          optNo: 'Ei — en vain ole vielä löytänyt sitä.',
          optUnsure: 'En osaa vielä sanoa.',
          respYes: 'Varovasti. Se ettei löydä, ei ole sama asia kuin se ettei ole. Sen sanomiseen pitäisi käydä läpi kaikki.',
          respNo: 'Se on toistaiseksi rehellinen vastaus.',
          respUnsure: 'Se on toistaiseksi rehellinen vastaus.',
          mapIntro: 'Ylemmän huoneen seinä on yhä pystyssä.',
          mapBody: 'Kahdeksan kolmen merkin sanaa. Lisää jokaiseen yksi merkki, niin sinulla on jokainen neljän merkin sana.',
          coverage: 'Käyty läpi: {n} / {total}',
          nodeTest: 'Kokeile',
          parentDeadFirst: 'Sanassa {word} on jo kaiku. Merkin lisääminen ei voi poistaa kaikua — joten myös molemmat siitä kasvavat sanat ovat selvät.',
          whyQuestion: 'Miksi se ratkaisee molemmat?',
          whyA: 'Koska kaiku, joka on jo siellä, pysyy siellä kun sana pitenee.',
          whyB: 'Koska molemmat alkavat samoilla merkeillä.',
          whyWrong: 'Totta, mutta se ei ole syy. Kaksi samalla tavalla alkavaa sanaa voivat silti käyttäytyä eri tavalla.',
          whyRight: 'Juuri niin. Sen takia voit ratkaista kaksi sanaa tarkistamalla yhden.',
          parentDead: 'Sanassa {word} on jo kaiku. Molemmat siitä kasvavat sanat ovat selvät.',
          parentLive: 'Sanassa {word} ei ole vielä kaikua. Sen kaksi sanaa pitää tarkistaa yksitellen.',
          childDead: '{word} — kaiku merkeissä {from}–{to}.',
          nothingSurvived: 'Yksikään ei selvinnyt.',
          finalLock: 'Mistä tiedät, ettei mitään jäänyt pois?',
          final1: 'Kokeilin monta enkä yksikään toiminut.',
          final2: 'Jokainen neljän merkin sana merkeistä a ja b on tällä kartalla, eikä yksikään toimi.',
          final3: 'Sellaista sanaa ei ole, minkään pituisena.',
          finalResp1: 'Se oli totta jo ennen kuin teit kartan. Kartta sanoo enemmän.',
          finalResp3: 'Varovasti. Kartta kattaa neljän merkin sanat. Se ei sano mitään pidemmistä.',
          success: 'Ovi aukeaa tyhjyyteen. Se on vastaus.',
          successLines: [
            'Neljän merkin sanoja merkeistä a ja b on kuusitoista.',
            'Olet käynyt läpi kaikki kuusitoista.',
            'Tämän oven säännöllä yksikään niistä ei toimi.'
          ],
          successConclusion: 'Siis tällaista neljän merkin sanaa ei täällä ole. Ei niin, että "emme löytäneet". Sitä ei ole.',
          bounded: 'Tämä ei sano mitään pidemmistä sanoista, muista merkeistä tai muista säännöistä.'
        },

        'third-symbol': {
          title: 'Kolmas merkki',
          intro: 'Sama tiukka sääntö. Mutta nyt merkkejä on kolme kahden sijaan.',
          transition: 'Yksi merkki lisää?',
          prompt: 'Rakenna sana, yksi merkki kerrallaan. Sääntö ei ole muuttunut: jokainen kaiku on kielletty.',
          help: 'Valitse merkki lisättäväksi sanan loppuun.',
          currentWord: 'Sanasi',
          frontier: 'Seuraava merkki',
          frontierLegal: '{letter} — ei kaikua',
          frontierDead: '{letter} — kaiku kohdassa {from}–{to}',
          frontierAllDead: 'Mikään merkki ei käy ilman kaikua.',
          restartWord: 'Aloita uusi sana',
          longest: 'Pisin: {n}',
          chasePrompt: 'Pääsetkö pituuteen 7?',
          reachedSeven: 'Pituus 7.',
          hitWall: 'Jokainen polku päättyy. Mikään ei yllä kahdeksaan.',
          hitWallQuestion: 'Et voi itse tarkistaa jokaista polkua. Mutta kone voi.',
          toMachine: 'Anna koneen kokeilla'
        },

        'counting-machine': {
          title: 'Laskukone',
          subtitle: 'Osa 1 / 2',
          intro: 'Yritit. Pääsit pituuteen 7. Et päässyt kahdeksaan.',
          ask: 'Voin tarkistaa jokaisen. Annetaanko minun?',
          runBtn: 'Anna koneen tarkistaa',
          running: 'Tarkistetaan pituutta {n}…',
          profileLabel: 'Selvinneet sanat',
          lengthLabel: 'pituus',
          countLabel: 'selvinneistä',
          done: 'Valmis.',
          doneBody: 'Kone tarkisti {total} sanaa. Jokaisen sanan jokaiselta pituudelta kahdeksaan saakka, kolmella merkillä.',
          comparison: 'Tyhjän oven takana kävit läpi kuusitoista sanaa käsin. Täällä kone kävi läpi {total}.',
          sameShape: 'Sama looginen muoto. Eri kädet.',
          evidenceCard: 'KONE TARKISTI NE KAIKKI'
        },

        'shorter-reason': {
          title: 'Lyhyempi syy',
          subtitle: 'Osa 2 / 2',
          intro: 'Takaisin kahteen merkkiin. Sama tiukka sääntö.',
          recall: 'Tyhjän oven takana tarkistit kaikki kuusitoista neljän merkin sanaa. Yksikään ei selvinnyt.',
          question: 'Voitko sanoa miksi yksikään kuudestatoista ei toiminut — tarkistamatta niitä kaikkia?',
          step1q: 'Voivatko tällä säännöllä kaksi vierekkäistä merkkiä olla samoja?',
          step1a: 'Eivät — aa tai bb olisi kaiku.',
          step1b: 'Kyllä — tuplat ovat sallittuja.',
          step1wrong: 'Tällä säännöllä myös aa on kaiku. Kaksi samaa merkkiä vierekkäin on kielletty.',
          step1right: 'Oikein. Kaksi vierekkäistä merkkiä eivät voi olla samoja.',
          step2q: 'Jos kaksi vierekkäistä merkkiä eivät voi olla samoja, mitä sanan täytyy tehdä?',
          step2a: 'Sen täytyy vuorotella a:n ja b:n välillä.',
          step2b: 'Se voi silti käyttää mitä tahansa järjestystä.',
          step2wrong: 'Kahdella merkillä, kun vierekkäiset eivät saa olla samoja, jokaisen merkin on erottava edellisestä. Se on vuorottelua.',
          step2right: 'Niin. Kahdella merkillä sanan täytyy vuorotella: a b a b… tai b a b a…',
          step3q: 'Mitkä neljän merkin sanat vuorottelevat a:n ja b:n välillä?',
          step3a: 'abab ja baba',
          step3b: 'abab, baba, abba ja baab',
          step3wrong: 'Sanassa abba on kaksi vierekkäistä b:tä ja sanassa baab kaksi vierekkäistä a:ta. Vain tiukka vuorottelu selviytyy.',
          step3right: 'Tasan kaksi: abab ja baba.',
          step4q: 'Katso sanaa abab. Katso sanaa baba. Onko niissä kaiku?',
          step4a: 'Kyllä — molemmissa on ab|ab tai ba|ba kaikuna.',
          step4b: 'Ei — kirjaimet ovat kaikki erilaisia.',
          step4wrong: 'Sanassa abab: kaksi ensimmäistä merkkiä ovat ab, kaksi seuraavaa ovat ab. Samat kirjaimet, samat määrät. Se on kaiku, jonka lohkot ovat 2 merkkiä pitkiä.',
          step4right: 'Molemmissa on. Sanassa abab on ab|ab. Sanassa baba on ba|ba. Molemmat ovat kaikuja, joiden lohkot ovat 2 merkkiä pitkiä.',
          conclusion: 'Siis: sääntö pakottaa vuorottelun. Vain kaksi sanaa vuorottelee. Molemmissa on kaiku. Listaa ei tarvittu.',
          evidenceCard: 'TIEDÄN MIKSI',
          evidenceLine: 'Kaksi lausetta, ei kuuttatoista tarkistusta.',
          bounded: 'Tämä perustelu kattaa pituuden 4 merkeillä {a,b} tällä säännöllä. Se ei sano mitään pidemmistä sanoista tai useammista merkeistä.'
        }
      },

      cliff: {
        title: 'Jyrkänne',
        wall1label: '2 merkkiä · jokainen kaiku lasketaan',
        wall2label: '3 merkkiä · jokainen kaiku lasketaan',
        wall3label: '3 merkkiä · tuplat sallittu',
        lengthAxis: 'pituus',
        countAxis: 'selvinneitä',
        wall3empty: '?',
        wall3note: 'Tämä seinä on tarkoituksella tyhjä.'
      },

      handoff: {
        body1: 'Olet oppinut muutakin kuin löytämään kaikuja.',
        body2: 'Löysit yhden. Kumosit väitteen. Tarkistit kaikki tapaukset. Annoit koneen tarkistaa suuremman joukon. Lopuksi löysit syyn, joka ei tarvinnut koko listaa.',
        body3: 'Kahdella merkillä tie päättyy.',
        body4: 'Kolmella se jatkuu pidemmälle.',
        body5: 'Yksi seinä on vielä tyhjä.',
        body6: 'Se kysymys odottaa seuraavan oven takana.',
        abelisk: 'Pelaa Abeliskiä',
        learn: 'Lue matematiikasta',
        again: 'Kulje ovet uudelleen'
      },

      outro: {
        title: 'Tuolla puolen',
        body1: 'Muuta sääntöä, ja vastaus muuttuu. Naapurissa, Abeliskissä, kaksi samanlaista merkkiä vierekkäin on sallittu — ja sanat yltävät paljon pidemmälle ennen kuin ne kaatuvat.',
        body2: 'Juuri tämänmuotoisia kysymyksiä — enemmän merkkejä, vaikeampia sääntöjä, pidempiä sanoja — kysytään myös matematiikassa. Joihinkin niistä ei ole vielä vastausta.',
        body3: 'Sinun kuusitoista oli tarpeeksi vähän laskettavaksi. Ne eivät ole.',
        abelisk: 'Pelaa Abeliskiä',
        learn: 'Lue matematiikasta',
        again: 'Kulje neljä ovea uudelleen'
      }
    }
  };

  var API = {
    PACKS: PACKS,
    CANONICAL: 'en',
    codes: function() { return Object.keys(PACKS); },
    pack: function(code) { return PACKS[code] || PACKS.en; }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
  } else {
    global.AbracalabraStrings = API;
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
