import type { GlossaryEntry } from "../types";

export const glossaryEntries: GlossaryEntry[] = [
  {
    id: "starborn",
    icon: "star",
    title: { th: "กลุ่มดาว", en: "The Constellations" },
    teaser: {
      th: "เผ่าพันธุ์จากนอกโลกที่เคยรุกรานโลก ปัจจุบันแบ่งเป็นชั้นสูงและกลุ่มดาวทั่วไป",
      en: "An off-world race that once invaded Earth, now stratified into nobility and common Constellations.",
    },
    body: [
      {
        th: "กลุ่มดาวเลื่องชื่อคือชั้นสูงสุดของเผ่าพันธุ์ ส่วนกลุ่มดาวทั่วไปทำหน้าที่เป็นกำลังรบหรือพลเมือง ปัจจุบันส่วนใหญ่กลายเป็นพลเมืองชั้นสองของวิเทียออน",
        en: "The Renowned Constellations sit at the apex of their kind, while common Constellations serve as soldiers or citizens — most are now second-class residents of Vitheaon.",
      },
    ],
  },
  {
    id: "central-government",
    icon: "tower",
    iconTint: "var(--gold-burnished)",
    title: { th: "รัฐบาลกลาง", en: "Central Government" },
    teaser: {
      th: "องค์การปกครองสูงสุดของวิเทียออน โฆษณาความเท่าเทียม แต่อำนาจหลักยังเป็นของมนุษย์",
      en: "The supreme governing body of Vitheaon — preaching equality, yet still ruled in practice by humans.",
    },
    body: [
      {
        th: "ภายในรัฐบาลมีทั้งหน่วยงานเปิดเผยและหน่วยงานลับ ซึ่งดำเนินงานคู่ขนานเพื่อรักษาเสถียรภาพของเมืองในขณะที่ความตึงเครียดเพิ่มขึ้น",
        en: "Open and clandestine agencies operate in parallel under the Government to preserve order while tensions rise beneath the surface.",
      },
    ],
  },
  {
    id: "government-starborn",
    icon: "scale",
    iconTint: "var(--glow-nebula)",
    title: { th: "กลุ่มดาวรัฐบาล", en: "Government Constellations" },
    teaser: {
      th: "กลุ่มดาวที่ทำงานในรัฐบาล ทั้งสภาแฝงและหน่วยงานลับ — ผู้กำหนดทิศทางจากเงา",
      en: "Constellations working inside the Government — both the Hidden Council and the Secret Agency — steering the city from the shadows.",
    },
    body: [
      {
        th: "พวกเขาคือผู้แฝงตัวที่อยู่ในจุดสูงสุดของอำนาจทั้งสองฝั่ง รู้จักกันเฉพาะในวงในและเก็บความลับไว้ลึกกว่าใคร",
        en: "Infiltrators perched at the heights of both spheres — known only to the inner circle, keeping secrets deeper than any vault.",
      },
    ],
    subEntries: [
      {
        id: "hidden-council",
        title: { th: "สภาแฝง", en: "Hidden Council" },
        body: {
          th: "กลุ่มดาวที่ปลอมตัวเป็นมนุษย์ผู้ทรงอำนาจ ควบคุมทิศทางของรัฐบาลจากเบื้องหลัง",
          en: "Constellations disguised as influential humans, steering policy from behind the scenes.",
        },
      },
      {
        id: "secret-agency",
        title: { th: "หน่วยงานลับ", en: "Secret Agency" },
        body: {
          th: "หน่วยข่าวกรองที่ทำงานภายในรัฐ การมีอยู่ของพวกเขาเป็นความลับจากประชาชน",
          en: "An intelligence cell whose existence is concealed from the public, sanctioned only by the inner circle.",
        },
      },
    ],
  },
  {
    id: "infiltrators",
    icon: "mask",
    iconTint: "#7aa890",
    title: { th: "กลุ่มผู้แฝงตัว", en: "Infiltrators" },
    teaser: {
      th: "กลุ่มดาวที่เลือกใช้ชีวิตเหมือนมนุษย์ธรรมดา ปกปิดพลังเพื่อหลบเลี่ยงการไล่ล่า",
      en: "Constellations who live as ordinary humans, hiding their power to escape pursuit.",
    },
    body: [
      {
        th: "บางคนทำงานเพื่อสันติภาพ บางคนรอวันที่จะลุกขึ้น และบางคนเพียงต้องการความสงบ พวกเขากระจายอยู่ทั่ววิเทียออน",
        en: "Some work toward peace, some bide their time, others just want quiet. They are scattered throughout the city.",
      },
    ],
  },
  {
    id: "rebels",
    icon: "swords",
    iconTint: "#c87878",
    title: { th: "กลุ่มกบฏ", en: "Rebels" },
    teaser: {
      th: "กลุ่มดาวที่ต่อต้านรัฐบาลอย่างเปิดเผย ภัยคุกคามที่ถูกประกาศเป็นทางการของเมือง",
      en: "Constellations who openly defy the Government — publicly named as threats to the city.",
    },
    body: [
      {
        th: "บางส่วนคืออดีตชนชั้นปกครองที่ต้องการทวงคืนอำนาจ บางส่วนเพียงไม่ยอมรับระบบใหม่ พวกเขาใช้พลังโดยไม่ปิดบัง",
        en: "Some are former high lords seeking to reclaim power, others simply refuse to bow to the new order. They wield their gifts without disguise.",
      },
    ],
  },
];
