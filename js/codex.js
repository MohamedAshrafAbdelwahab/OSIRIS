/* =========================================================
   codex.js — نظام الكتيب «سجل أوزيريس» (OSIRIS Codex)
   ---------------------------------------------------------
   - يُحمَّل قبل scene2.js في الصفحات الثلاث
   - كل الصور الحقيقية من أرشيف ناسا/ويكيميديا (ملكية عامة)
     نُزِّلت محلياً ومضغوطة وقت البناء — لا طلبات خارجية وقت التشغيل
   - مفتاح الحفظ: osiris_codex (مصفوفة معرفات) — لا يُغير
     أي مفتاح مقدس آخر (osiris_save / osiris_language / osiris_volume)
   - الواجهة: زر كتاب بجانب ترس الإعدادات + شارة عداد (ن/20)
     + نبضة ضوئية عند فتح مدخل جديد — تعمل RTL/LTR
   ========================================================= */

const CODEX_STORAGE_KEY = 'osiris_codex';

/* مداخل الكتيب العشرون — النصوص ثنائية اللغة + مصدر الصورة */
const CODEX_ENTRIES = [
  {
    id: 'plaque',
    img: 'plaqueIcon',
    title: { ar: 'لوحة أوزيريس التذكارية', en: 'The OSIRIS Memory Plaque' },
    body: {
      ar: 'لوحة صغيرة نحتها الأخوان طارق وزين بيديهما قبل الانطلاق: «طارق وزين — إلى النجوم معاً». علّقها زين عند مدخل الكبسولة، والتقطها طارق من رمال بحر الهدوء لتظل معه في رحلته نحو المريخ. أثمن قطعة في المشروع كله... وأرخصها ثمناً!',
      en: 'A small plaque the two brothers carved with their own hands before launch: "Tariq & Zain — To the stars, together". Zain hung it at the capsule entrance, and Tariq picked it up from the Tranquility dust to keep it on his journey to Mars. The most precious artifact of the whole project... and the cheapest!',
    },
    credit: { ar: 'من لور اللعبة', en: 'Game lore' },
  },
  {
    id: 'earthrise',
    img: 'earthrise',
    title: { ar: 'الأرض تشرق فوق القمر', en: 'Earthrise Over the Moon' },
    body: {
      ar: 'في 24 ديسمبر 1968 التقط رائد أبولو 8 ويليام أندرس هذه الشهيرة: كوكبنا الأزرق يرتفع فوق أفق القمر الرمادي القاحل. قال أندرس: «ذهبنا لاكتشاف القمر... فاكتشفنا الأرض». الصورة غيّرت نظرتنا لكوكبنا إلى الأبد.',
      en: 'On December 24, 1968, Apollo 8 astronaut William Anders took this legendary photo: our blue planet rising over the barren grey lunar horizon. Anders said: "We came all this way to explore the Moon... and the most important thing is that we discovered the Earth."',
    },
    credit: { ar: 'ناسا — أبولو 8 (AS8-14-2383)', en: 'NASA — Apollo 8 (AS8-14-2383)' },
  },
  {
    id: 'bootprint',
    img: 'bootprint',
    title: { ar: 'بصمة حذاء خالدة', en: 'A Bootprint for Eternity' },
    body: {
      ar: 'هذه البصمة صورها بَز ألدرين في 20 يوليو 1969 ضمن دراسة خواص تربة القمر. لا رياح ولا مطر على القمر، لذا ستبقى آثار أحذية أبولو 11 محفورة في الرمال ملايين السنين — بصمة إنسان من 1969 وبصمة طارق من أيامنا جنباً إلى جنب!',
      en: 'Buzz Aldrin photographed this bootprint on July 20, 1969 while studying lunar soil mechanics. With no wind or rain on the Moon, Apollo 11\'s trails will remain pressed in the dust for millions of years — a human trace from 1969 beside Tariq\'s from our own days!',
    },
    credit: { ar: 'ناسا — أبولو 11 (AS11-40-5880)', en: 'NASA — Apollo 11 (AS11-40-5880)' },
  },
  {
    id: 'flag',
    img: 'flag',
    title: { ar: 'العلم الذي بيّضته الشمس', en: 'The Sun-Bleached Flag' },
    body: {
      ar: 'وقف ألدرين محيّياً العلم الأمريكي في بحر الهدوء. بعد أكثر من نصف قرن من الأشعة فوق البنفسجية القاسية بلا غلاف جووي واقٍ، تبيّض العلم إلى راية بيضاء سلمية — تتقصف خيوطه لكنه ما زال واقفاً في مكانه.',
      en: 'Aldrin stood saluting the US flag in Tranquility Base. After half a century of harsh ultraviolet radiation with no protective atmosphere, the flag has bleached into a peaceful white banner — its threads fray, yet it still stands where it was planted.',
    },
    credit: { ar: 'ناسا — أبولو 11 (AS11-40-5875)', en: 'NASA — Apollo 11 (AS11-40-5875)' },
  },
  {
    id: 'eagle',
    img: 'eagle',
    title: { ar: 'مركبة «النسر» — أول بيت للبشر على القمر', en: 'Eagle — Humanity\'s First Lunar Home' },
    body: {
      ar: 'هذه مركبة الهبوط «النسر» في وضعية الهبوط قبل أن تلمس بحر الهدوء في 20 يوليو 1969. بقي جزؤها السفلي على السطح إلى اليوم كأول منشأة بشرية دائمة على جرم آخر — وقاعدة «النسر» التي وقف عندها طارق بعد 57 عاماً.',
      en: 'This is the Eagle lander in its landing configuration before touching down at Tranquility Base on July 20, 1969. Its descent stage remains on the surface to this day — humanity\'s first permanent structure on another world, and the very base where Tariq stood 57 years later.',
    },
    credit: { ar: 'ناسا — أبولو 11', en: 'NASA — Apollo 11' },
  },
  {
    id: 'psep',
    img: 'psep',
    title: { ar: 'نبض القمر — محطة الزلازل PSEP', en: 'The Moon\'s Pulse — PSEP' },
    body: {
      ar: 'أول جهاز زلزالي في التاريخ يُزرع على جرم غير الأرض (أبولو 11، 1969). سجّلت شبكة محطات أبولو الزلزالية آلاف «الهزات القمرية» حتى أُطفئت عام 1977 — علّمتنا أن القمر ينبض، وأن هزاته تشبه طلقات مطرقة داخل جوف صخري صامت.',
      en: 'The first seismometer ever placed on another world (Apollo 11, 1969). Apollo\'s seismic network recorded thousands of "moonquakes" until it was powered down in 1977 — teaching us that the Moon has a pulse, its quakes ringing like hammer strikes inside a silent rocky shell.',
    },
    credit: { ar: 'ناسا — أبولو 11 (ALSEP)', en: 'NASA — Apollo 11 (ALSEP)' },
  },
  {
    id: 'rhu',
    img: 'rhu',
    title: { ar: 'الدفء النووي — بلوتونيوم-238', en: 'Nuclear Warmth — Pu-238' },
    body: {
      ar: 'هذه الكبسولة الساخنة المتوهجة هي وقود البلوتونيوم-238: يطلق حرارة ثابتة بمجرد تعفّره إشعاعياً بلا لهب ولا حركة. وحدات التدفئة النووية (RHU) في أبولو منحت 15 واطاً من الدفء لكل رائد منذ 1969 — وبعض مسباراتنا اليوم تعيش على هذا الدفء في أعماق الفضاء المظلمة.',
      en: 'This glowing hot pellet is plutonium-238 fuel: it releases steady heat from natural radioactive decay — no flame, no moving parts. Apollo\'s Radioisotope Heater Units have given 15 watts of warmth each since 1969, and some of our deep-space probes still live on this warmth today.',
    },
    credit: { ar: 'وزارة الطاقة الأمريكية/ناسا', en: 'US DOE / NASA' },
  },
  {
    id: 'lrrr',
    img: 'lrrr',
    title: { ar: 'عاكس الليزر الذي لا ينام', en: 'The Reflector That Never Sleeps' },
    body: {
      ar: 'صندوق من 100 منشور زجاجي زرعه أبولو 11 بلا بطاريات ولا أسلاك. أي شعاع ليزر يصيبه يرتد لمصدره بزاوية 180° بدقة مذهلة — وما زال يعمل بعد نصف قرن! بفضله نعرف أن القمر يبتعد عنا 3.8 سم كل سنة، وبفضله حدّد طارق موقعه بدقة المليمتر.',
      en: 'A tray of 100 glass corner-cubes planted by Apollo 11 — no batteries, no wires. Any laser beam striking it returns to its source at a perfect 180°, and it still works half a century later! Thanks to it we know the Moon drifts 3.8 cm away each year — and thanks to it, Tariq fixed his position to millimeter precision.',
    },
    credit: { ar: 'ناسا/جي بي إل — أبولو 11', en: 'NASA/JPL — Apollo 11' },
  },
  {
    id: 'wheel',
    img: 'lrvWheel',
    title: { ar: 'عجلات من شبك فولاذي', en: 'Wheels of Woven Steel' },
    body: {
      ar: 'المطاط العادي يتشظى كالزجاج في صقيع -170° أو ينفجر تحت شمس +120°، فصمم مهندسو أبولو عجلات من شبك أسلاك فولاذية مجلفنة بشرائط تيتانيوم. خفيفة ومرنة وتمتص الصدمات فوق الغبار — نفس العجلات التي وقف عندها طارق في وادي العربة.',
      en: 'Ordinary rubber shatters like glass at -170°C or bursts under +120°C sunlight, so Apollo\'s engineers wove wheels from zinc-coated steel wire mesh with titanium treads. Light, flexible, shock-absorbing over dust — the very wheels Tariq inspected at the rover site.',
    },
    credit: { ar: 'ناسا — أبولو', en: 'NASA — Apollo' },
  },
  {
    id: 'lrv',
    img: 'lrv',
    title: { ar: 'العربة الجوالة LRV — أول سيارة كهربائية على القمر', en: 'LRV — The First Electric Car on the Moon' },
    body: {
      ar: 'عربة أبولو الجوالة: أول مركبة كهربائية يقودها بشر على جرم آخر (أبولو 15-17). قطعت ثلاث عربات 90 كم على القمر بسرعة قصوى 18 كم/س، وهوائيها المقعر بث أول بث تلفزيوني حي لمركبة تسير على القمر — ومن بؤرته أرسل طارق نداء الاستغاثة.',
      en: 'The Lunar Roving Vehicle: the first electric vehicle humans drove on another world (Apollo 15–17). Three rovers covered 90 km at up to 18 km/h, and its parabolic dish beamed the first live TV of a vehicle driving on the Moon — and from its focus, Tariq broadcast his distress call.',
    },
    credit: { ar: 'ناسا — أبولو 17', en: 'NASA — Apollo 17' },
  },
  {
    id: 'camera',
    img: 'liftoff',
    title: { ar: 'كاميرا تنتظر عودة البشر', en: 'A Camera Awaiting Our Return' },
    body: {
      ar: 'في 14 ديسمبر 1972 وجّه مهندس ناسا إد فيندل الكاميرا البعيدة للسماء عمداً لتبدأ التصوير قبل إقلاع مركبة أبولو 17 بـ1.3 ثانية — تعويضاً لتأخر الإشارة بين الأرض والقمر. صوّرت لحظة مغادرة آخر البشر، ثم تُركت شاخصة للنجوم... شاهدة صامتة تنتظر أن نعود.',
      en: 'On December 14, 1972, NASA controller Ed Fendell deliberately tilted the remote camera skyward and began panning 1.3 seconds before Apollo 17\'s liftoff — compensating for the Earth–Moon signal delay. It captured humanity\'s last departure, then was left gazing at the stars... a silent witness awaiting our return.',
    },
    credit: { ar: 'ناسا — أبولو 17 (إد فيندل)', en: 'NASA — Apollo 17 (Ed Fendell)' },
  },
  {
    id: 'fender',
    img: 'fender',
    title: { ar: 'إصلاح أبولو 17 بالشريط اللاصق', en: 'Apollo 17\'s Duct-Tape Repair' },
    body: {
      ar: 'في ديسمبر 1972 انكسر رفرف عجلة العربة القمرية، فكان الغبار سيغمر المعدات. الحل؟ أربع خرائط قمرية ورقية وشريط لاصق فضي ومشابك! صمد الإصلاح حتى نهاية المهمة — ومن هذا الإرث تعلّم طارق أن «لو مفيش حل... الشريط هو الحل».',
      en: 'In December 1972 a rover fender broke, threatening to drown the equipment in dust. The fix? Four paper lunar maps, silver duct tape, and clamps! The repair held until mission\'s end — from this legacy Tariq learned: "when there is no solution... the tape is the solution."',
    },
    credit: { ar: 'ناسا/متحف سميثسونيان (AS17-137-20979)', en: 'NASA / Smithsonian (AS17-137-20979)' },
  },
  {
    id: 'vacuum',
    img: 'vacuumIcon',
    title: { ar: 'فيزياء الإطلاق في الفراغ', en: 'Launch Physics in a Vacuum' },
    body: {
      ar: 'القمر بلا غلاف جوي، لذا حين أشعل طارق محرك الصعود طار الغبار في أقواس باليستية مستقيمة تشبه أشعة العجلة — لا سحب دخان متصاعدة! هذا ما أكدته محاكاة حواسيب ناسا الفائقة عام 2023 لتصرف عادم الصواريخ على سطح القمر.',
      en: 'The Moon has no atmosphere, so when Tariq ignited the ascent engine, dust flew outward in flat ballistic spokes — no billowing smoke columns! This is exactly what NASA supercomputer simulations confirmed in 2023 about rocket exhaust on the lunar surface.',
    },
    credit: { ar: 'ناسا — محاكاة 2023 (رسم توضيحي من اللعبة)', en: 'NASA 2023 simulation (game illustration)' },
  },
  {
    id: 'lor',
    img: 'lor',
    title: { ar: 'قرار الالتقاط المداري LOR', en: 'The LOR Decision' },
    body: {
      ar: 'في 11 يوليو 1962 اختارت ناسا خططة جون هوبولت الجريئة: «الالتقاط المداري القمري» — إرسال مركبة صغيرة فقط للهبوط بينما تنتظر الأم في المدار، لتوفير وقود هائل. القرار جعل الهبوط ممكناً، ومثّله طارق بنفسه حين التحم بكبسولته مع مركبة العبور في المدار القمري.',
      en: 'On July 11, 1962, NASA chose John Houbolt\'s bold plan: Lunar Orbit Rendezvous — landing only a small craft while the mothership waits in orbit, saving enormous fuel. That decision made the Moon landing possible, and Tariq re-enacted it himself when his capsule docked with the transit tug in lunar orbit.',
    },
    credit: { ar: 'ناسا — الأرشيف التاريخي (1962)', en: 'NASA History Office (1962)' },
  },
  {
    id: 'marsWindow',
    img: 'mars',
    title: { ar: 'نافذة المريخ: كل 26 شهراً', en: 'The Mars Window: Every 26 Months' },
    body: {
      ar: 'الأرض والمريخ يتلاقيان في أفضل وضع للرحلة مرة كل 26 شهراً تقريباً فقط — «نافذة الانتقال». من يفوّتها ينتظر أكثر من سنتين! رحلة العبور نفسها تستغرق 7-9 أشهر، ولهذا استغرق وصول الأخوين 240 يوماً... ونفس المدة تقريباً لطارق خلفه.',
      en: 'Earth and Mars align for an optimal journey only once every ~26 months — the "transfer window". Miss it and you wait over two years! The transit itself takes 7–9 months, which is why the brothers\' crossing lasted 240 days... and why Tariq followed the very same path.',
    },
    credit: { ar: 'ناسا/جي بي إل — استكشاف المريخ', en: 'NASA/JPL — Mars Exploration' },
  },
  {
    id: 'opportunity',
    img: 'opportunity',
    title: { ar: 'أوبي — المحارب الذي صمد 15 عاماً', en: 'Oppy — The Rover That Fought 15 Years' },
    body: {
      ar: 'صُمم مسبار Opportunity ليعمل 90 يوماً فقط... فصمد 15 عاماً وقطع أكثر من 45 كم على المريخ! حاصرته عاصفة غبارية كوكبية في يونيو 2018 فأنهت مهمته، وكانت آخر رسائله: «بطاريتي منخفضة والظلام يحل». يقف اليوم حارساً على حافة فوهة إنديفور — ومن موقعه اهتدى زين التائه للمأوى.',
      en: 'Opportunity was designed for just 90 days... it endured 15 years and drove over 45 km on Mars! A planet-encircling dust storm ended its mission in June 2018, its farewell: "My battery is low and it\'s getting dark." It now stands guard on Endeavour\'s rim — and from its resting place, the lost Zain found his way home.',
    },
    credit: { ar: 'ناسا/جي بي إل — آخر بانوراما لوادي المثابرة', en: 'NASA/JPL — Final panorama, Perseverance Valley' },
  },
  {
    id: 'storm',
    img: 'storm',
    title: { ar: 'العاصفة التي أخفت الشمس', en: 'The Storm That Hid the Sun' },
    body: {
      ar: 'عواصف المريخ الغبارية قد تلتف حول الكوكب كله وتحجب 97% من ضوء الشمس — قاتلة لأي مسبار يعتمد على الطاقة الشمسية. خريطة ناسا هذه توثق العاصفة الكوكبية لعام 2018 التي أسكتت أوبي... وعاصفة شبيهة بها تاه فيها زين بعد هبوطه.',
      en: 'Mars dust storms can wrap the entire planet and block 97% of sunlight — deadly for any solar-powered rover. This NASA map documents the 2018 global storm that silenced Oppy... and a storm just like it is where Zain got lost after landing.',
    },
    credit: { ar: 'ناسا/جي بي إل — MARCI/MRO', en: 'NASA/JPL — MARCI/MRO' },
  },
  {
    id: 'insight',
    img: 'insight',
    title: { ar: 'إنسايت — من استمع لقلب المريخ', en: 'InSight — The One Who Listened to Mars' },
    body: {
      ar: 'هبط InSight في سهول إليسيوم عام 2018 حاملاً مقياس الزلازل الأحساس SEIS: استمع لـ1300+ هزة مريخية وكشف أن لب المريخ سائل! في ديسمبر 2022 غطى الغبار ألواحه فودّعنا: «طاقتي منخفضة... كان وقتي هنا هادئاً ومثمراً. شكراً لبقائكم معي».',
      en: 'InSight landed on Elysium Planitia in 2018 carrying the ultra-sensitive SEIS seismometer: it listened to 1,300+ marsquakes and proved Mars has a liquid core! In December 2022 dust smothered its panels and it signed off: "My power\'s really low... my time here has been both serene and productive. Thanks for staying with me."',
    },
    credit: { ar: 'ناسا/جي بي إل', en: 'NASA/JPL' },
  },
  {
    id: 'sunset',
    img: 'sunset',
    title: { ar: 'الغروب الأزرق الأسطوري', en: 'The Legendary Blue Sunset' },
    body: {
      ar: 'على المريخ العكس تماماً: الغروب أزرق! غبار المريخ الدقيق ينثر الضوء الأزرق نحو العين حين تكون الشمس على الأفق، فيحيط بالقرص الغارب هالة زرقاء باردة. هذا هو المشهد الذي اجتمع فيه الأخوان بعد 225 مليون كيلومتر.',
      en: 'On Mars it\'s the exact opposite: sunsets are blue! Fine Martian dust scatters blue light toward the eye when the Sun sits on the horizon, wrapping the setting disc in a cold blue halo. This is the scene where the brothers reunited after 225 million kilometers.',
    },
    credit: { ar: 'ناسا — كيوريوسيتي', en: 'NASA — Curiosity' },
  },
  {
    id: 'sojourner',
    img: 'sojourner',
    title: { ar: 'سوجورنر — أول من مشى على المريخ', en: 'Sojourner — The First to Walk on Mars' },
    body: {
      ar: 'في 1997 نزل المسبار الصغير سوجورنر (بحجم صندوق حذاء!) على متن مركبة Pathfinder وأصبح أول عربة تجوب سطح المريخ. اسمه من «سوجورنر تروث». فتح الطريق لأوبي وكيوريوسيتي وبرسيفيرانس — الجد الأول لكل عربات المريخ.',
      en: 'In 1997 the tiny rover Sojourner (the size of a shoebox!) rolled off the Pathfinder lander to become the first vehicle to roam Mars. Named after Sojourner Truth, it paved the way for Opportunity, Curiosity and Perseverance — the great-grandparent of every Mars rover.',
    },
    credit: { ar: 'ناسا/جي بي إل — Pathfinder', en: 'NASA/JPL — Pathfinder' },
  },
];

/* =========================================================
   كائن الكتيب — حفظ + فتح + واجهة كاملة (زر/شبكة/تفصيل)
   ========================================================= */
const Codex = {
  lang: 'ar',
  panelEl: null,
  btnEl: null,
  toastEl: null,
  toastTimer: null,
  pulseTimer: null,
  detailOpen: false,

  images() {
    return (typeof ASSETS !== 'undefined' && ASSETS.codex) ? ASSETS.codex : {};
  },

  unlocked() {
    try {
      const raw = localStorage.getItem(CODEX_STORAGE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (_) { return []; }
  },

  isUnlocked(id) {
    return this.unlocked().indexOf(id) !== -1;
  },

  /** فتح مدخل — يخزن مرة واحدة ويعيد true لو كان جديداً */
  unlock(id) {
    const entry = CODEX_ENTRIES.find((e) => e.id === id);
    if (!entry) return false;
    const cur = this.unlocked();
    if (cur.indexOf(id) !== -1) return false;
    cur.push(id);
    try { localStorage.setItem(CODEX_STORAGE_KEY, JSON.stringify(cur)); } catch (_) {}
    this.refreshBadge();
    this.pulse();
    this.showToast(entry);
    return true;
  },

  total() { return CODEX_ENTRIES.length; },

  /* ---------- زر الكتيب بجانب الترس ---------- */
  mountButton(host, opts = {}) {
    if (!host || this.btnEl) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'codex-btn';
    btn.title = this.t({ ar: 'سجل أوزيريس (B)', en: 'OSIRIS Logbook (B)' });
    btn.setAttribute('aria-label', btn.title);
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z"/>
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H20v13H6.5A2.5 2.5 0 0 0 4 19.5v-13Z"/>
        <path d="M9 2h1.6v20H9z"/>
        <path d="M13 7h4M13 10.5h4M13 14h2.5" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
      <span class="codex-count">0</span>`;
    btn.addEventListener('click', () => { if (typeof opts.onOpen === 'function') opts.onOpen(); });
    host.appendChild(btn);
    this.btnEl = btn;
    this.refreshBadge();
  },

  refreshBadge() {
    if (!this.btnEl) return;
    const n = this.unlocked().length;
    const c = this.btnEl.querySelector('.codex-count');
    if (c) c.textContent = n + '/' + this.total();
    this.btnEl.classList.toggle('has-new', this._hasNew === true);
  },

  markSeen() {
    this._hasNew = false;
    this.refreshBadge();
  },

  pulse() {
    if (!this.btnEl) return;
    this._hasNew = true;
    this.refreshBadge();
    this.btnEl.classList.remove('pulse');
    void this.btnEl.offsetWidth;
    this.btnEl.classList.add('pulse');
    clearTimeout(this.pulseTimer);
    this.pulseTimer = setTimeout(() => this.btnEl.classList.remove('pulse'), 2600);
  },

  /* ---------- إشعار فتح مدخل ---------- */
  showToast(entry) {
    if (!this.btnEl || !this.btnEl.parentNode) return;
    const host = this.btnEl.parentNode;
    if (!this.toastEl || !this.toastEl.parentNode) {
      const t = document.createElement('div');
      t.className = 'codex-toast';
      host.appendChild(t);
      this.toastEl = t;
    }
    const isAr = this.lang === 'ar';
    this.toastEl.className = 'codex-toast' + (isAr ? '' : ' lang-en');
    this.toastEl.dir = isAr ? 'rtl' : 'ltr';
    this.toastEl.innerHTML = `
      <span class="ct-icon">📖</span>
      <span class="ct-text"></span>`;
    this.toastEl.querySelector('.ct-text').textContent = this.t({
      ar: 'مدخل جديد في سجل أوزيريس: ' + entry.title.ar,
      en: 'New OSIRIS Logbook entry: ' + entry.title.en,
    });
    this.toastEl.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      if (this.toastEl) this.toastEl.classList.remove('show');
    }, 3200);
  },

  t(pair) {
    return pair ? (pair[this.lang] || pair.ar || '') : '';
  },

  /* ---------- اللوحة الرئيسية ---------- */
  isOpen() { return !!this.panelEl; },

  open(host, onClose) {
    if (!host || this.panelEl) return;
    this._onClose = onClose || null;
    const isAr = this.lang === 'ar';
    const ov = document.createElement('div');
    ov.className = 'codex-overlay' + (isAr ? '' : ' lang-en');
    ov.dir = isAr ? 'rtl' : 'ltr';
    ov.innerHTML = `
      <div class="codex-panel">
        <div class="codex-head">
          <span class="codex-title"></span>
          <span class="codex-sub"></span>
          <button type="button" class="codex-close">✕</button>
        </div>
        <div class="codex-progress">
          <div class="codex-progress-bar"><i class="codex-progress-fill"></i></div>
          <span class="codex-progress-txt"></span>
        </div>
        <div class="codex-grid"></div>
        <div class="codex-detail hidden"></div>
      </div>`;
    ov.querySelector('.codex-title').textContent = this.t({ ar: 'سجل أوزيريس', en: 'OSIRIS LOGBOOK' });
    ov.querySelector('.codex-sub').textContent = this.t({ ar: 'أرشيف الآلات التي أنقذتنا', en: 'Archive of the machines that saved us' });
    const n = this.unlocked().length;
    ov.querySelector('.codex-progress-fill').style.width = (100 * n / this.total()) + '%';
    ov.querySelector('.codex-progress-txt').textContent = n + ' / ' + this.total();
    host.appendChild(ov);
    this.panelEl = ov;
    this.markSeen();

    ov.querySelector('.codex-close').addEventListener('click', () => this.close());
    ov.addEventListener('click', (e) => { if (e.target === ov) this.close(); });

    const grid = ov.querySelector('.codex-grid');
    const imgs = this.images();
    CODEX_ENTRIES.forEach((entry) => {
      const cell = document.createElement('button');
      cell.type = 'button';
      const un = this.isUnlocked(entry.id);
      cell.className = 'codex-cell' + (un ? '' : ' locked');
      if (un) {
        const img = document.createElement('img');
        img.src = imgs[entry.img] || '';
        img.alt = '';
        img.draggable = false;
        cell.appendChild(img);
        const cap = document.createElement('span');
        cap.className = 'codex-cap';
        cap.textContent = this.t(entry.title);
        cell.appendChild(cap);
        cell.addEventListener('click', () => this.showDetail(entry));
      } else {
        cell.innerHTML = '<span class="codex-lock">؟</span>';
      }
      grid.appendChild(cell);
    });
  },

  showDetail(entry) {
    const ov = this.panelEl;
    if (!ov) return;
    const d = ov.querySelector('.codex-detail');
    const imgs = this.images();
    d.innerHTML = `
      <img class="cd-img" src="${imgs[entry.img] || ''}" alt="" />
      <div class="cd-body">
        <h4 class="cd-title"></h4>
        <p class="cd-text"></p>
        <div class="cd-credit"></div>
        <button type="button" class="cd-back"></button>
      </div>`;
    d.querySelector('.cd-title').textContent = this.t(entry.title);
    d.querySelector('.cd-text').textContent = this.t(entry.body);
    d.querySelector('.cd-credit').textContent = this.t({ ar: 'المصدر: ', en: 'Source: ' }) + this.t(entry.credit);
    d.querySelector('.cd-back').textContent = this.t({ ar: 'عودة للأرشيف', en: 'Back to archive' });
    d.querySelector('.cd-back').addEventListener('click', () => {
      d.classList.add('hidden');
    });
    d.classList.remove('hidden');
  },

  close() {
    if (!this.panelEl) return;
    this.panelEl.remove();
    this.panelEl = null;
    const cb = this._onClose;
    this._onClose = null;
    if (typeof cb === 'function') cb();
  },

  setLang(lang) {
    this.lang = lang === 'en' ? 'en' : 'ar';
    if (this.panelEl) { this.close(); }   // يُعاد فتحها بالنص الجديد عند الطلب
  },

  destroy() {
    clearTimeout(this.toastTimer);
    clearTimeout(this.pulseTimer);
    if (this.panelEl) { this.panelEl.remove(); this.panelEl = null; }
    if (this.toastEl) { this.toastEl.remove(); this.toastEl = null; }
    if (this.btnEl) { this.btnEl.remove(); this.btnEl = null; }
    this._hasNew = false;
  },
};

if (typeof window !== 'undefined') window.Codex = Codex;
