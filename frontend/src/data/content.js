export const authors = [
  {
    id: "ibn-qayyim",
    slug: "ibn-qayyim-al-jawziyya",
    nameLatin: "Ibn Qayyim al-Jawziyya",
    nameArabic: "ابن قيم الجوزية",
    fullName: "Shams al-Dīn Muḥammad ibn Abī Bakr",
    hijri: "691 – 751 H",
    gregorian: "1292 – 1350",
    city: "Damas",
    country: "Syrie",
    coords: [36.2765, 33.5138],
    portraitCutout: "/assets/portrait-cutout.png",
    portraitFull: "/assets/portrait-full.png",
    book: {
      titleArabic: "الفوائد",
      titleLatin: "Al-Fawā'id",
      titleFrench: "Les Méditations",
      image: "/assets/book.png",
      publisher: "Éditions Tawbah",
      price: "24,90 €",
    },
  },
];

export const author = authors[0];

export const timelineEvents = [
  {
    hijri: "691 H",
    year: "1292",
    title: "Naissance à Damas",
    text: "Le 7 Ṣafar, au cœur de la vieille ville. Son père veille sur la madrasa al-Jawziyya — « la petite école » dont le fils héritera le nom.",
  },
  {
    hijri: "712 H",
    year: "1313",
    title: "La rencontre",
    text: "À vingt et un ans, il se lie à Shaykh al-Islām Ibn Taymiyya. Il devient son plus proche disciple : scribe de ses cours, témoin de ses combats.",
  },
  {
    hijri: "726 H",
    year: "1326",
    title: "La citadelle",
    text: "Emprisonné avec son maître dans la citadelle de Damas. Derrière les murs, il fait de la cellule une école : mémorisation, écriture, prière.",
  },
  {
    hijri: "728 H",
    year: "1328",
    title: "L'héritage",
    text: "Ibn Taymiyya meurt. Libéré, Ibn al-Qayyim enseigne à la Jawziyya et dicte ses œuvres dans les cercles de savoir de Damas.",
  },
  {
    hijri: "751 H",
    year: "1350",
    title: "Le retour",
    text: "Il rend l'âme un soir de Rajab, à cinquante-huit ans. On prie sur lui à la mosquée des Omeyyades ; on l'enterre près de son maître.",
  },
];

export const excerptPages = [
  {
    type: "cover",
    arabic: "الفوائد",
    title: "Les Méditations",
    author: "Ibn Qayyim al-Jawziyya",
    note: "Extraits — Éditions Tawbah",
  },
  {
    type: "quote",
    text: "En vérité, il y a dans le cœur une désolation que rien ne peut dissiper sinon la compagnie d'Allah ; une solitude que rien ne peut rompre sinon l'isolement avec Lui ; une tristesse que rien ne peut écarter sinon la joie de Le connaître. Et il y a en lui un vide que rien ne comble, sinon Son amour, le retour vers Lui et le rappel constant de Lui.",
    source: "Al-Fawā'id — traduction française libre",
  },
  {
    type: "quote",
    text: "Les actions des cœurs sont la racine ; les actions des membres ne sont que leurs branches et leurs fruits. Le cœur est le roi et les membres sont ses soldats : s'il est sain, ils sont sains ; s'il est corrompu, ils se corrompent.",
    source: "Al-Fawā'id — traduction française libre",
  },
  {
    type: "quote",
    text: "Ce bas-monde est un pont : traverse-le, et ne t'y installe pas. Regarde comme les heures te font franchir les étapes, une à une, jusqu'à ce que le voyage s'achève. Chaque souffle est un pas vers le terme.",
    source: "Al-Fawā'id — traduction française libre",
  },
  {
    type: "end",
    quote: "Le savoir n'est pas ce qui est rapporté ; le savoir est une lumière qu'Allah dépose dans le cœur.",
    note: "Fin de l'extrait. L'ouvrage complet rassemble des centaines de méditations dictées au fil des jours.",
  },
];
