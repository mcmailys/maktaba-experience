export const authors = [
  {
    id: "ibn-qayyim",
    slug: "ibn-qayyim-al-jawziyya",
    displayName: "Ibn al-Qayyim",
    fullName: "Muhammad ibn Abī Bakr ibn Ayūb",
    nameArabic: "ابن قيم الجوزية",
    gregorian: "1292 — 1350",
    hijri: "691 – 751 H",
    city: "Damas",
    heroPortrait: "/assets/hero-portrait.jpg",
    book: {
      title: "Les Méditations",
      titleArabic: "الفوائد",
      image: "/assets/book-standing.jpg",
      langue: "Français",
      edition: "Tawbah",
      pages: "~ 600",
      price: "15 €",
      written: "Écrit à Damas — XIVᵉ siècle",
      description:
        "Un chef-d'œuvre de la spiritualité islamique, un guide intemporel vers la connaissance de soi et d'Allah.",
    },
  },
];

export const author = authors[0];

export const timelineEvents = [
  {
    year: "1292",
    text: "Naissance à Damas, au cœur des terres du Shâm. Son père veille sur la madrasa al-Jawziyya, dont il héritera le nom.",
  },
  {
    year: "1313",
    text: "Devient le disciple de Shaykh al-Islām Ibn Taymiyya, qu'il ne quittera presque plus.",
  },
  {
    year: "1328",
    text: "Libéré de la citadelle, il commence à enseigner et à écrire ses premières œuvres majeures.",
  },
  {
    year: "1332",
    text: "Devient une référence dans la spiritualité et la réforme intérieure.",
  },
  {
    year: "1350",
    text: "Décès à Damas. Son héritage continue d'éclairer les cœurs.",
  },
];

export const excerptPages = [
  {
    image: "/assets/feuillet-1.jpg",
    caption: "Bismillah ar-Rahmān ar-Rahīm — calligraphie d'ouverture de l'ouvrage",
  },
  {
    image: "/assets/feuillet-2.jpg",
    caption: "Transcription — le guide de prononciation des termes arabes",
  },
  {
    image: "/assets/feuillet-3.jpg",
    caption: "Biographie de l'imam Ibn Al Qayyim Al Jawziyyah — page 7",
  },
  {
    image: "/assets/feuillet-4.jpg",
    caption: "Table des matières — page 167",
  },
];

export const chain = {
  masters: [
    { name: ["Ibn", "Taymiyya"], image: "/assets/chain/taymiyya.jpg" },
    { name: ["Ibn ʿAbd", "al-Dāʾim"], image: "/assets/chain/abdal-daim.jpg" },
    { name: ["Al-Mizzī"], image: "/assets/chain/mizzi.jpg" },
    { name: ["Ibn", "al-Shīrāzī"], image: "/assets/chain/shirazi.jpg" },
  ],
  students: [
    { name: ["Ibn", "Kathīr"], image: "/assets/chain/kathir.jpg" },
    { name: ["Ibn", "Rajab"], image: "/assets/chain/portrait-4.jpg" },
    { name: ["Ibn ʿAbd", "al-Hādī"], image: "/assets/chain/abdal-hadi.jpg" },
  ],
};

export const otherBooks = [
  {
    id: "peches-guerison",
    title: "Péchés et Guérison",
    subtitle: "Ibn Al-Qayyim",
    image: "/assets/books/book-1.png",
  },
  {
    id: "esprit-ame",
    title: "L'Esprit de l'Âme",
    subtitle: "Al-Ghazâli · Ibn Al-Jawzi · Ibn Qudâmah",
    image: "/assets/books/book-2.png",
  },
  {
    id: "intrigues-diable",
    title: "Les Intrigues du Diable",
    subtitle: "Ibn Al-Qayyim",
    image: "/assets/books/book-3.png",
  },
  {
    id: "ainsi-muhammad",
    title: "Ainsi était Muhammad le Messager d'Allah",
    subtitle: "Éditions Tawbah",
    image: "/assets/books/book-4.png",
  },
  {
    id: "pieux-predecesseurs",
    title: "Ainsi étaient Nos Pieux Prédécesseurs",
    subtitle: "Éditions Tawbah",
    image: "/assets/books/book-5.png",
  },
];

export const catalogBooks = [
  { id: "meditations", title: "Les Méditations", author: "Ibn al-Qayyim al-Jawziyya", edition: "Tawbah", spine: null },
  { id: "peches-guerison", title: "Péchés et Guérison", author: "Ibn al-Qayyim al-Jawziyya", edition: "Tawbah", spine: "/assets/shelf/peches-guerison.webp" },
  { id: "esprit-ame", title: "L'Esprit de l'Âme", author: "Al-Ghazâli · Ibn Al-Jawzi · Ibn Qudâmah", edition: "Tawbah", spine: null },
  { id: "intrigues-diable", title: "Les Intrigues du Diable", author: "Ibn al-Qayyim al-Jawziyya", edition: "Tawbah", spine: null },
  { id: "ainsi-muhammad", title: "Ainsi était Muhammad le Messager d'Allah", author: "Éditions Tawbah", edition: "Tawbah", spine: null },
  { id: "pieux-predecesseurs", title: "Ainsi étaient Nos Pieux Prédécesseurs", author: "Éditions Tawbah", edition: "Tawbah", spine: null },
  { id: "boukhari-t3", title: "Sahîh al-Boukhârî — Tome 3", author: "Imam al-Boukhârî", edition: "UIK", spine: "/assets/shelf/boukhari-t3.webp" },
  { id: "boukhari-t2", title: "Sahîh al-Boukhârî — Tome 2", author: "Imam al-Boukhârî", edition: "BO", spine: "/assets/shelf/boukhari-t2.webp" },
  { id: "muwatta-v2", title: "Al-Muwatta — Volume 2", author: "Imam Mâlik ibn Anas", edition: "Al Bayyinah", spine: "/assets/shelf/muwatta-v2.webp" },
];

export const defaultLibrary = ["boukhari-t3", "boukhari-t2", "muwatta-v2", "peches-guerison"];
