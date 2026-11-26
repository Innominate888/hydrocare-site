// Obsah prevzatý z katalógu „hydrocare katalog“ (Canva). Preklepy z katalógu sú opravené.
export const CATEGORIES = [
  { id: 'all', label: 'Všetko' },
  { id: 'tvar', label: 'Tvár' },
  { id: 'oci', label: 'Oči & pery' },
  { id: 'telo', label: 'Telo' },
  { id: 'vlasy', label: 'Vlasy' },
  { id: 'masky', label: 'Masky' },
  { id: 'caje', label: 'Čaje' },
];

export const PRODUCTS = [
  {
    line: 'Hydro Care', name: 'Cleanser', cat: 'tvar',
    tagline: 'Dokonalá a jemná čistota.',
    desc: 'Odstráni z pleti všetky nečistoty aj make-up a pritom ju zanechá krásne hydratovanú a zamatovú. Je veľmi jemný, nevysušuje pleť a chráni hydrolipidovú vrstvu. Dokonalá hydratácia už počas čistenia tváre.',
    ingredients: [
      ['Za studena lisované rastlinné oleje', 'vyživujúci a čistiaci účinok'],
      ['Kyselina hyalurónová', 'zadržiava optimálnu hladinu vody v pokožke'],
      ['Lipozomálne vitamíny', 'dostanú aktívne zložky hlboko do pokožky'],
      ['Alantoín', 'hydratačná bomba, upokojuje a regeneruje pleť'],
    ],
  },
  {
    line: 'Hydro Care', name: 'Serum', cat: 'tvar',
    tagline: 'Mladosť plná života.',
    desc: 'Optimálna koncentrácia kyseliny hyalurónovej a kolagénu zabezpečí okamžitú aj dlhodobú hydratáciu. Pravidelné používanie spomaľuje starnutie a posilňuje vlastnú obranyschopnosť pokožky. Zmierňuje kruhy pod očami, vďaka protizápalovým účinkom je vhodné aj na aknóznu pleť. Perfektný podklad pod make-up.',
    ingredients: [
      ['Kyselina hyalurónová a kolagén', 'viažu vodu, dokonalá hydratácia'],
      ['Slnečnicový a ricínový olej', 'výživa pleti'],
      ['Kyselina myristová', 'výživa pleti'],
      ['Vitamín E', 'antioxidant'],
    ],
  },
  {
    line: 'Hydro Care', name: 'Protection', cat: 'tvar',
    tagline: 'Anti-ageing, UVA a UVB ochrana.',
    desc: 'Kombinácia fyzických filtrov poskytuje ochranu pred UVA aj UVB žiarením a predčasným starnutím. Patentovaná zložka Teflose vytvára na povrchu protizápalový a antiseptický biofilm, ktorý zabraňuje vzniku akné a podráždenia. Ľahká textúra sa nelepí a hneď sa vstrebe.',
    ingredients: [
      ['Oxid titaničitý', 'fyzická ochrana pred UVA a UVB'],
      ['Vitamín E', 'zabraňuje tvorbe voľných radikálov'],
      ['Bisabolol, rumanček', 'upokojujúci a protizápalový účinok'],
      ['Bez parabénov a parfumácie', 'bez parafínu a konzervačných látok'],
    ],
  },
  {
    line: 'Hydro Care', name: 'Cream 24', cat: 'tvar',
    tagline: '100 % aktivita 24 hodín denne.',
    desc: 'Vďaka optimálnej koncentrácii kyseliny hyalurónovej a kolagénu zabezpečí okamžitú aj dlhodobú hydratáciu. Pravidelné používanie spomaľuje starnutie a zvyšuje obranyschopnosť pokožky. Vďaka protizápalovým účinkom je vhodný aj na aknóznu pleť.',
    ingredients: [
      ['Prírodné lipidy', 'pomáhajú obnoviť ochrannú vrstvu pokožky'],
      ['Centella asiatica', 'stimuluje syntézu kolagénu'],
      ['Alantoín a bisabolol', 'znižujú podráždenie, upokojujú'],
      ['Kofeín', 'zlepšuje mikrocirkuláciu a detoxikuje'],
    ],
  },
  {
    line: 'Sun Care', name: 'Face Cream SPF 30', cat: 'tvar',
    tagline: 'High protection ochranný krém.',
    desc: 'Prírodný anti-ageing ochranný krém. Fyzické filtre a vitamín E poskytujú okamžitú ochranu proti UVA a UVB. Výťažok z rumančeka a kurkumy upokojuje pokožku. Vďaka patentovanému zapuzdrenému oxidu titaničitému sa ľahko roztiera.',
    ingredients: [
      ['Fyzické filtre', 'okamžitá UVA a UVB ochrana'],
      ['Vitamín E', 'antioxidant'],
      ['Rumanček a kurkuma', 'upokojujú pokožku'],
    ],
  },
  {
    line: 'Body Care', name: 'Serum', cat: 'telo',
    tagline: 'Vypnutá, spevnená a hydratovaná pokožka.',
    desc: 'Vysoký obsah kyseliny hyalurónovej a kolagénu efektívne vyživuje a napína pokožku. Ľahká textúra na báze vody sa rýchlo vstrebe bez škvŕn. Pri pravidelnom používaní je pokožka jemnejšia, hladšia a hodvábnejšia.',
    ingredients: [
      ['Hyalurón a kolagén', 'zadržiavajú vodu, hydratujú'],
      ['Nechtík lekársky', 'hydratuje a upokojuje'],
      ['Prírodný lanolín', 'chráni, pokožka je flexibilnejšia'],
      ['Lipozomálne vitamíny', 'chránia, vyživujú, regenerujú'],
    ],
  },
  {
    line: 'Body Care', name: 'Cellu Care', cat: 'telo',
    tagline: 'Krém na tvarovanie postavy a celulitídu.',
    desc: 'Profesionálny tvarovací a anticelulitídny krém s thermo účinkom na pomarančovú pokožku a strie. Prírodné spaľovače tukov podporujú prekrvenie a spojivové tkanivo. Ľahká textúra umožňuje aj telový zábal.',
    ingredients: [
      ['Výťažok z papriky', 'zvyšuje krvný a lymfatický obeh'],
      ['Kofeín', 'zvyšuje krvný obeh'],
      ['Výťažok z kurkumy', 'tonizuje, stimuluje'],
      ['Extrakt z grepových jadier', 'antioxidant'],
    ],
  },
  {
    line: 'Hair Care', name: 'Shampoo', cat: 'vlasy', award: true,
    tagline: 'Najlepší hydratačný šampón roka 2024.',
    desc: 'Funkčný šampón, ktorého hlavnou úlohou je posilniť vlasy a znížiť ich vypadávanie. Obsahuje kmeňové bunky bazalky, ktoré aktivujú rast vlasov a tvorbu pigmentu. Vyrobený výlučne z prírodných rastlinných zložiek, bez syntetických chemikálií. Vegánsky výrobok.',
    ingredients: [
      ['Rastlinný keratín, horčičné semeno', 'posilňujú vlasy'],
      ['Lopúch', 'znižuje vypadávanie vlasov'],
      ['Niacín', 'zvyšuje krvný obeh'],
      ['Pelargónia a citrón', 'harmonizujú, upokojujú'],
    ],
  },
  {
    line: 'Eye Care', name: 'Day', cat: 'oci',
    tagline: 'Svieži a vitálny pohľad.',
    desc: 'Ľahký, rýchlo sa vstrebávajúci očný krém s kyselinou hyalurónovou a kolagénom, ktoré okamžite vyplnia jemné vrásky v okolí očí. Kofeín pomáha pri tmavých kruhoch a opuchoch.',
    ingredients: [
      ['Kofeín', 'zvyšuje cirkuláciu'],
      ['Kyselina hyalurónová', 'hydratuje, vypĺňa pokožku'],
      ['Kolagén', 'napína pokožku'],
      ['Rastlinné oleje', 'vitamíny A, E, C hlboko do pokožky'],
    ],
  },
  {
    line: 'Eye Care', name: 'Night', cat: 'oci',
    tagline: 'Nočný krém s botox efektom.',
    desc: 'Obsahuje viac lipidov, no má jemnú textúru. Antioxidanty a oleje vypínajú vrásky okolo očí. Po použití môžete cítiť jemné mravčenie. Redukuje vrásky a tmavé kruhy okolo očí.',
    ingredients: [
      ['Bio certifikované oleje', 'antioxidanty'],
      ['Arginín', 'rastlinný botox'],
      ['Hyalurón a kolagén', 'hydratácia, lifting'],
      ['Vitamín B2', 'detoxikácia, skrášľovač pleti'],
    ],
  },
  {
    line: 'Body Care', name: 'Hand Cream', cat: 'telo',
    tagline: 'Hĺbková výživa pre suché ruky.',
    desc: 'Jemná starostlivosť o pokožku rúk so silným omladzujúcim účinkom. Kyselina hyalurónová a kolagén môžu pomôcť obnoviť objem pokožky, redukovať vrásky a zosvetliť pigmentové škvrny.',
    ingredients: [
      ['Bambucké maslo', 'hydratuje, regeneruje'],
      ['Hyalurón a kolagén', 'hydratácia a pružnosť'],
      ['Vitamín E', 'chráni pred voľnými radikálmi'],
      ['Olivový a mandľový olej', 'vyživujú, upokojujú'],
    ],
  },
  {
    line: 'Body Care', name: 'Hand Cream XCM', cat: 'telo',
    tagline: 'Pre extrémne suché ruky.',
    desc: 'Krém na extrémne suché ruky náchylné na začervenenie. Prírodné bio zložky upokojujú a regenerujú pokožku. Tajomstvo tohto obľúbeného krému je vysoký obsah za studena lisovaných mandľových a olivových zložiek.',
    ingredients: [
      ['Bambucké maslo', 'hydratuje, regeneruje'],
      ['Ricínový olej', 'podporuje tvorbu kolagénu a elastínu'],
      ['Olivový olej', 'udržuje vlhkosť pokožky'],
      ['Mandľový olej', 'znižuje zápaly a svrbenie'],
    ],
  },
  {
    line: 'Lip Care', name: 'Balm', cat: 'oci',
    tagline: '100 % prírodný hypoalergénny balzam.',
    desc: 'Hydratuje, vyživuje a zvlhčuje pery a chráni ich pred predčasným starnutím. Zmäkčuje pery a dodáva im krásny lesk. Môžete ho používať aj niekoľkokrát denne.',
    ingredients: [
      ['Výťažok z kukuričného klasu', 'zjemňuje'],
      ['Včelí vosk', 'zmäkčuje'],
      ['Vitamín E', 'antioxidant'],
      ['Rastlinné oleje', 'chránia, zjemňujú'],
    ],
  },
  {
    line: 'Acne Stop', name: 'Cream', cat: 'tvar',
    tagline: 'Rovnováha mikroflóry pre pokojnú pleť.',
    desc: 'Vhodný pre všetky typy pleti. Účinne reguluje nerovnováhu mikroflóry a zápaly, ako je akné či atopická dermatitída. Nevysušuje, naopak hydratuje. Patentovaná technológia vytvára ochranný biofilm, ktorý pokožke nebráni dýchať.',
    ingredients: [
      ['Rhamnóza', 'udržiava vodu, spomaľuje starnutie'],
      ['Organické oleje a tuky', 'chránia hydrolipidovú bariéru'],
      ['Alantoín', 'zmierňuje iritácie'],
      ['Teflose', 'protizápalová a upokojujúca sila'],
    ],
  },
  {
    line: 'Golden Beauty', name: 'Body Oil', cat: 'telo',
    tagline: 'Antioxidant, výživa a spevnenie.',
    desc: 'Olej z za studena lisovaných domácich surovín s vysokým obsahom rakytníkového oleja bohatého na vitamín C. Okamžite napína, vyhladzuje a regeneruje pokožku, ktorá je zamatovejšia a pevnejšia.',
    ingredients: [
      ['Rakytníkový olej', 'antioxidant, vitamín C'],
      ['Olej z kukuričných klíčkov', 'upokojujúci, protizápalový'],
    ],
  },
  {
    line: 'Hévíz', name: 'Beauty Mask', cat: 'masky',
    tagline: 'Pleť vypnutá a pružná.',
    desc: 'Vyhladzuje vrásky, znižuje zápaly a rozžiari bledú pleť. Jedinečné liečivé bahno z Hévízu a riasa spirulina majú vynikajúci regeneračný a antibakteriálny účinok. Ideálna na tvár, krk aj dekolt.',
    ingredients: [
      ['Liečivé bahno z Hévízu', 'protizápalové, hojivé'],
      ['Kokosový olej', 'antibakteriálny, hydratuje'],
      ['Riasa spirulina', 'zabraňuje vzniku vrások'],
      ['Mätový olej', 'tonizuje, sťahuje póry'],
    ],
  },
  {
    line: 'Hévíz', name: 'Green Algae Mask', cat: 'masky',
    tagline: 'Upokojuje a regeneruje.',
    desc: 'Prírodné zložky intenzívne upokojujú a hydratujú pokožku a sťahujú rozšírené póry. Spirulina, chlorofyl, harmanček a alantoín blahodarne pôsobia na pleť so sklonom k akné.',
    ingredients: [
      ['Alantoín', 'hydratačná bomba, hojí'],
      ['Chlorofyl a gáfrovník', 'antibakteriálny účinok'],
      ['Riasa spirulina', 'bunková regenerácia'],
      ['Rumanček lekársky', 'znižuje opuchy a podráždenie'],
    ],
  },
  {
    line: 'Hydro Care', name: 'Micelárna pena', cat: 'tvar',
    tagline: 'Jemná čistota s extraktom z ovsa.',
    desc: 'Čistiaca micelárna pena s aktívnym vodným extraktom AVENA BIO COSMOS. Jemná kokosová penivá zložka čistí a stará sa o pokožku, alantoín a rastlinné cukry podporujú regeneráciu.',
    ingredients: [
      ['Organický extrakt z ovsa', 'aminokyseliny a vitamíny'],
      ['Alantoín', 'regenerácia pokožky'],
      ['Teflose®', 'podporuje rovnováhu pokožky'],
    ],
  },
  {
    line: 'Hair Care', name: 'Balzam', cat: 'vlasy',
    tagline: 'Zrkadlovo hladké a zdravé vlasy.',
    desc: 'Extrakt z hroznových jadierok, žihľavy, šalvie a kokosové mlieko posilňujú štruktúru vlasu a uhladzujú jeho povrch. Základná starostlivosť pre suché, krehké a ťažko rozčesateľné vlasy.',
    ingredients: [
      ['Hroznové jadierka, žihľava, šalvia', 'posilňujú vlas'],
      ['Kokosové mlieko', 'vyživuje vlasové vlákna'],
      ['Ylang-ylang, grep, klinček', 'wellness zážitok'],
    ],
  },
  {
    line: 'Hair Care', name: 'Conditioner', cat: 'vlasy',
    tagline: 'Objavte možnosti svojich vlasov.',
    desc: 'Obohatený o výťažok z hroznových jadierok, žihľavu, šalviu a kokosové mlieko. Vyživuje vlasy, aby vyzerali krásne, zdravo a silno. Najlepšie v kombinácii s posilňujúcim šampónom HV Hair Care.',
    ingredients: [
      ['Hroznové jadierka a žihľava', 'výživa a sila'],
      ['Šalvia a kokosové mlieko', 'ochrana pred poškodením'],
      ['Ylang-ylang, grapefruit, klinček', 'esenciálne oleje'],
    ],
  },
  {
    line: 'Hydro Care', name: 'Skin Detox', cat: 'caje',
    tagline: 'Čaj dokonalej, čistej a napnutej pokožky.',
    desc: 'Čajová zmes pre tých, ktorí sa chcú starať o pokožku nielen zvonka, ale aj zvnútra. Zostavená podľa receptúry lekárov a naturopatov. Detoxikuje, podporuje imunitu a pôsobí ako antioxidant.',
    ingredients: [
      ['Žihľavový list', 'čistí krv, detoxikuje'],
      ['Repík lekársky', 'protizápalový účinok'],
      ['Pamajorán obyčajný', 'podporuje trávenie'],
    ],
  },
  {
    line: 'Hydro Care', name: 'Light Body', cat: 'caje',
    tagline: 'Podpora metabolizmu a očisty.',
    desc: 'Čajová zmes, ktorá podporuje metabolické procesy, prirodzené chudnutie a očistné procesy organizmu. Zostavená podľa receptúry lekárov a naturopatov.',
    ingredients: [
      ['Šťavel konský', 'podporuje trávenie a detox'],
      ['Mäta pieporná', 'uľahčuje trávenie'],
    ],
  },
].map((p, i) => ({ ...p, id: i + 1, img: `img/prod${String(i + 1).padStart(2, '0')}.jpg` }));
