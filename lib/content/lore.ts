import type { LorePanel } from "../types";

export const lorePanels: LorePanel[] = [
  {
    id: "year-zero",
    image: "/lore/year2026.jpg",
    yearLabel: { th: "ปี 2026", en: "Year 2026" },
    title: { th: "การมาถึงของกลุ่มดาว", en: "The Arrival" },
    body: [
      {
        th: "โลก (Earth) \u2014 ดาวเคราะห์แห่งน้ำ ผืนดิน อากาศ และสิ่งมีชีวิต เคยถูกปกครองโดยเผ่าพันธุ์ที่เรียกตนเองว่า 'มนุษย์' สิ่งมีชีวิตที่มีระบบสังคม ความคิด และความสามารถในการพัฒนาตนเอง จนกระทั่งปี 2026 เมื่อสิ่งมีชีวิตอีกชนิดหนึ่งมาถึง สิ่งมีชีวิตที่เรียกว่า 'กลุ่มดาว'",
        en: "Earth \u2014 a planet of water, land, air, and life \u2014 was once ruled by a species that called itself 'humanity.' Beings with social systems, thought, and the capacity for self-improvement. Until the year 2026, when another kind of life arrived. The beings known as the 'Constellation'",
      },
      {
        th: "เผ่าพันธุ์กลุ่มดาวบุกรุกโลกและยึดครองได้สำเร็จในเวลาอันสั้น อารยธรรมมนุษย์ที่สั่งสมมาหลายพันปีล่มสลายภายในชั่วอายุคนเดียว",
        en: "The The Constellations invaded and conquered Earth in a devastatingly short time. Thousands of years of human civilization collapsed within a single generation.",
      },
    ],
    starDensity: 0.9,
    accent: "#6090c0",
  },
  {
    id: "dark-age",
    image: "/lore/year2026_2526.jpg",
    yearLabel: { th: "ยุคมืด (2026\u20132526)", en: "Dark Age (2026\u20132526)" },
    title: { th: "ยุคแห่งการปกครองของกลุ่มดาว", en: "The Age of Constellation Rule" },
    body: [
      {
        th: "กลุ่มดาวกลายเป็นชนชั้นสูงและผู้ปกครองโลก สังคมดำเนินในลักษณะระบอบขุนนาง โดยมีลำดับชั้นชัดเจนภายในเผ่าพันธุ์เอง",
        en: "The The Constellations became the ruling elite. Society operated as a feudal system with a clear hierarchy within the species itself.",
      },
      {
        th: "กลุ่มดาวราศี (Zodiacs) 13 กลุ่มดาวชั้นสูงสุด ผู้ถือครองอำนาจ พลัง และทรัพยากรทั้งหมด ถือเป็นขุนนางอันดับสูงสุด ส่วนกลุ่มดาวสามัญมีพลังและอายุขัยเกินมนุษย์แต่ยังอยู่ใต้ราศี",
        en: "The 13 Zodiac constellations sat at the apex \u2014 holding all power, strength, and resources as the supreme nobility. Common the Constellations possessed power and longevity beyond humans, yet remained beneath the Zodiacs.",
      },
      {
        th: "มนุษย์ถูกลดสถานะลงมาอีก เป็นเพียงแรงงาน พลเมืองชั้นล่าง และข้าทาส",
        en: "Humans were reduced further still \u2014 to mere labor, lower citizens, and slaves.",
      },
    ],
    starDensity: 0.5,
    accent: "#a878d8",
  },
  {
    id: "decline",
    image: "/lore/year2526_2726.jpg",
    yearLabel: { th: "ยุคเสื่อมถอย (2526\u20132726)", en: "The Decline (2526\u20132726)" },
    title: { th: "รอยร้าวจากภายใน", en: "Cracks From Within" },
    body: [
      {
        th: "ในขณะที่มนุษย์กำลังพยายามเรียนรู้เทคโนโลยีและพลังของกลุ่มดาวอย่างลับๆ ภายในเผ่าพันธุ์กลุ่มดาวเองก็เริ่มแตกแยก",
        en: "While humans secretly studied the Constellations's technology and power, fractures began forming within the constellation species itself.",
      },
      {
        th: "บางกลุ่มเบื่อหน่ายชีวิตอันสุขสบายและหายตัวไปจากสังคม บางกลุ่มไม่พอใจกับลำดับชนชั้นที่ตนได้รับ บางกลุ่มมองว่าระบบปกครองปัจจุบันฉ้อฉลและควรถูกทำลาย",
        en: "Some grew weary of comfortable lives and vanished from society. Some resented their assigned rank. Some believed the current regime was corrupt and deserved destruction.",
      },
      {
        th: "การแตกแยกจากภายในทำให้คานอำนาจของกลุ่มดาวค่อยๆ พังทลายลง",
        en: "This internal fragmentation caused the Constellations's balance of power to slowly crumble.",
      },
    ],
    starDensity: 0.4,
    accent: "#7a6090",
  },
  {
    id: "d-day",
    image: "/lore/d-day.jpg",
    yearLabel: { th: "D-Day (2726\u20132736)", en: "D-Day (2726\u20132736)" },
    title: { th: "วันที่มนุษย์ทวงคืนโลก", en: "The Day Humanity Reclaimed the World" },
    body: [
      {
        th: "มนุษย์เปิดฉากสงครามกลางเมืองครั้งใหญ่ โดยได้รับการสนับสนุนลับจากกลุ่มดาวที่ต้องการโค่นล้มระบอบของพวกตนเอง สงครามกินเวลา 10 ปี",
        en: "Humanity launched a great civil war, secretly supported by the Constellations who wished to overthrow their own regime. The war lasted 10 years.",
      },
      {
        th: "สงครามจบลงด้วยการล่มสลายของชนชั้นปกครองเดิม และมนุษย์ยึดอำนาจกลับคืนมาได้สำเร็จ",
        en: "The war ended with the collapse of the old ruling class. Humanity successfully reclaimed power.",
      },
      {
        th: "จากซากปรักหักพังของสงคราม ได้ก่อเกิดเป็น วิเทียออน (Vitheaon) มหานครแห่งสุดท้ายของมนุษยชาติ และจุดเริ่มต้นใหม่ของโลก",
        en: "From the ruins of war arose Vitheaon \u2014 humanity's last great city, and the world's new beginning.",
      },
    ],
    starDensity: 0.7,
    accent: "#d8a848",
  },
  {
    id: "present",
    image: "/lore/VitheaonYear20.jpg",
    yearLabel: { th: "ปัจจุบัน \u2014 วิเทียออน ปีที่ 20", en: "Present \u2014 Vitheaon Year 20" },
    title: { th: "มหานครวิเทียออน", en: "The City of Vitheaon" },
    body: [
      {
        th: "มนุษย์กลับมาเป็นฝ่ายปกครองภายใต้ระบอบ 'รัฐบาลกลาง' รัฐบาลประกาศว่ามนุษย์และกลุ่มดาวคือประชาชนเท่าเทียมกัน แต่ในความเป็นจริง กลุ่มดาวส่วนมากยังคงถูกกดให้อยู่ในฐานะพลเมืองชั้นสอง ถูกเฝ้าระวัง และล่าโดยหน่วยพิเศษที่รัฐบาลจัดตั้งขึ้น",
        en: "Humans rule again under the 'Central Government.' The state proclaims equality between humans and the Constellations \u2014 but in reality, most Constellations remain second-class citizens, surveilled and hunted by government special units.",
      },
      {
        th: "เมืองแห่งนี้เจริญก้าวหน้าด้วยวิทยาการที่หลอมรวมเวทมนตร์ของกลุ่มดาวเข้ากับวิทยาศาสตร์ของมนุษย์ เกิดเป็นอารยธรรมใหม่ที่ไม่เคยมีมาก่อน",
        en: "The city thrives on technology that fuses constellation magic with human science \u2014 a civilization unlike anything that came before.",
      },
      {
        th: "แต่สิ่งที่ประชาชนไม่รู้คือ ภายในรัฐบาลเอง ยังมีกลุ่มดาวบางส่วนแฝงตัวอยู่เบื้องหลังอำนาจ\n\nเพราะในวิเทียออน ความสงบไม่เคยหมายถึงสันติภาพ มันเป็นเพียงช่วงเวลาสั้นๆ ก่อนที่ความจริงจะถูกขุดขึ้นมาอีกครั้ง ความจริง ที่มาพร้อมกับ \u2026ดวงดาว\u2026",
        en: "But what the people don't know is that within the government itself, some the Constellations still lurk behind the curtain of power.\n\nBecause in Vitheaon, peace never means peace. It is merely a brief pause before the truth is unearthed once more. A truth that comes with \u2026stars\u2026",
      },
    ],
    starDensity: 1.0,
    accent: "#f0c060",
  },
];

/** District data for potential future use in a dedicated section. */
export const districts = [
  {
    id: "the-zenith",
    name: { th: "เดอะเซนิธ (The Zenith)", en: "The Zenith" },
    image: "/districts/TheZenith.png",
    description: {
      th: "ศูนย์กลางอำนาจของรัฐบาลกลาง เขตที่สะอาด สว่าง และถูกเฝ้าระวังที่สุดในเมือง ทุกอย่างที่นี่ถูกออกแบบมาเพื่อแสดงว่า 'รัฐบาลคือความหวัง' แต่เบื้องหลังคือประตูที่ปิดตาย มีทั้งการต่อรองและการทรยศ",
      en: "The Central Government's seat of power. The cleanest, brightest, and most surveilled district in the city. Everything here is designed to show that 'the government is hope.' But behind closed doors \u2014 bargains and betrayals.",
    },
  },
  {
    id: "low-grid",
    name: { th: "โลว์กริด (Low Grid)", en: "Low Grid" },
    image: "/districts/LowGrid.png",
    description: {
      th: "ย่านชั้นล่างของเมือง แออัด มืดหม่น และถูกลืม ตลาดมืดที่ขายได้ทุกอย่างตั้งแต่ข้อมูลต้องห้ามไปจนถึงตัวตนปลอม ผู้คนที่นี่ทั้งมนุษย์และกลุ่มดาวต่างอยู่รอดด้วยการพึ่งพากันและทรยศกัน",
      en: "The city's lower district. Crowded, dark, and forgotten. A black market selling everything from forbidden intel to fake identities. Here, both humans and Constellations survive through mutual reliance \u2014 and mutual betrayal.",
    },
  },
  {
    id: "the-void-ring",
    name: { th: "วงแหวนร้าง (The Void Ring)", en: "The Void Ring" },
    image: "/districts/TheVoidRing.png",
    description: {
      th: "เขตซากปรักหักพังที่ถูกทิ้งร้างหลังสงคราม D-Day ไม่มีใครอยากเข้าไป และรัฐบาลก็ไม่ต้องการให้ใครเข้าไปค้นพบสิ่งที่ยังหลงเหลืออยู่ วงแหวนร้างไม่ใช่แค่สุสานของสงคราม มันคือที่เก็บความจริงที่ถูกฝังไว้",
      en: "A ruined zone abandoned after D-Day. No one wants to enter, and the government doesn't want anyone discovering what remains. The Void Ring is not merely a war graveyard \u2014 it is where buried truths are kept.",
    },
  },
  {
    id: "nova",
    name: { th: "โนวา (Nova)", en: "Nova" },
    image: "/districts/Nova.png",
    description: {
      th: "เขตบันเทิงและการค้าของวิเทียออน ฉาบด้วยแสงสีและเสียงเพลง ดูมีชีวิตชีวาที่สุดในเมือง แต่ที่โนวา ทุกรอยยิ้มมีราคา และทุกบทสนทนาในบาร์อาจถูกรายงานต่อรัฐบาลในคืนเดียวกัน",
      en: "Vitheaon's entertainment and commerce district. Coated in lights and music, the most vibrant part of the city. But in Nova, every smile has a price, and every bar conversation may be reported to the government that same night.",
    },
  },
] as const;
