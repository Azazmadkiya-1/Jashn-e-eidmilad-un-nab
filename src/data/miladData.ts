import { Track, Quote, MemoryItem, TimelineEvent } from '../types';

export const PLAYLIST_ID = 'PLKM4SfonDHLM';

export const TRACKS: Track[] = [
  {
    id: 'track-1',
    youtubeId: 'A-K4-R1-29E',
    title: 'Mustafa Jaane Rahmat Pe Lakhon Salam',
    reciter: 'Salam-e-Raza',
    year: '1998 Vintage Record',
    duration: '06:15',
    description: 'The timeless greeting of peace written by Ala Hazrat, echoed in every Milad gathering.',
    audioUrl: 'https://archive.org/download/MustafaJaanERahmatPeLaakhonSalam_491/Mustafa%20Jaan%20e%20Rahmat%20pe%20laakhon%20salam.mp3'
  },
  {
    id: 'track-2',
    youtubeId: 'b-7cQf323j8',
    title: 'Ya Nabi Salam Alaika',
    reciter: 'Maher Zain / Traditional Qasaid',
    year: 'Traditional Qasaid',
    duration: '05:40',
    description: 'The standing Qiyam greeting sung at midnight when 12 Rabi-ul-Awwal arrives.',
    audioUrl: 'https://archive.org/download/YaNabiSalamAlayka_201705/Ya%20Nabi%20Salam%20Alayka.mp3'
  },
  {
    id: 'track-3',
    youtubeId: 'N69098n9wGg',
    title: 'Faslon Ko Takalluf Hai Humse Agar',
    reciter: 'Qari Waheed Zafar Qasmi',
    year: 'Classic Broadcast',
    duration: '07:22',
    description: 'Nostalgic radio favorite played on PTV and cassette players during 90s Rabi-ul-Awwal.',
    audioUrl: 'https://archive.org/download/QariWaheedZafarQasmiNaatCollection/Faslon%20Ko%20Takalluf%20He.mp3'
  },
  {
    id: 'track-4',
    youtubeId: 'w5s2c5f9xG0',
    title: 'Zahe Muqaddar Huzoor-e-Haq Se',
    reciter: 'Qari Waheed Zafar Qasmi',
    year: '1995 Master Tape',
    duration: '06:10',
    description: 'Soothes the heart with heartfelt longing for the City of Lights, Madinah.',
    audioUrl: 'https://archive.org/download/QariWaheedZafarQasmiNaatCollection/Zahe%20Muqaddar.mp3'
  },
  {
    id: 'track-5',
    youtubeId: 'G14nK6jYf8w',
    title: 'Owais Raza Qadri - Jashn Manao Gajj Wajj Ke',
    reciter: 'Owais Raza Qadri - Heera Gold',
    year: '2004 Street Procession',
    duration: '04:55',
    description: 'Festive anthem played on neighborhood loudspeakers during street illuminations.',
    audioUrl: 'https://archive.org/download/100MashoorNaat/Jashn-E-Aamad-E-Rasool.mp3'
  },
  {
    id: 'track-6',
    youtubeId: 'C451gD8y3kI',
    title: 'Main To Ummi Hoon Par Mera Aqa',
    reciter: 'Syed Fasihuddin Soharwardi',
    year: 'Vintage Cassette',
    duration: '05:30',
    description: 'Celebrating the unlettered Prophet ﷺ whose mercy illuminated the universe.',
    audioUrl: 'https://archive.org/download/NaatsOfRasool-Ul-ALLAHNaatsFromFamousNaatKhawans/MainToPanjetanKaGhulamHoon.mp3'
  },
  {
    id: 'track-7',
    youtubeId: 'x698L693kG1',
    title: 'Tajdar-e-Haram O Nigah-e-Karam',
    reciter: 'Sabri Brothers',
    year: 'Golden Era Heritage',
    duration: '08:45',
    description: 'Deeply emotional prayer invoking the Master of the Sanctuary ﷺ.',
    audioUrl: 'https://archive.org/download/100MashoorNaat/Tajdar-e-Haram.mp3'
  }
];

export const QUOTES: Quote[] = [
  {
    id: 1,
    arabic: 'صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ',
    urdu: 'نثار تیری چہل پہل پر ہزاروں عیدیں ربیع الاول\nسواۓ ابلیس کے جہاں میں سبھی تو خوشیاں منا رہے ہیں',
    english: 'May thousands of Eids be sacrificed upon the radiance of Rabi-ul-Awwal; Except for despair, the entire universe is rejoicing!',
    poetOrSource: 'Ala Hazrat Imam Ahmad Raza Khan',
    tag: '12 Rabi-ul-Awwal Joy'
  },
  {
    id: 2,
    arabic: 'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ',
    urdu: 'مصطفیٰ جانِ رحمت پہ لاکھوں سلام\nشمعِ بزمِ ہدایت پہ لاکھوں سلام',
    english: 'Millions of salutations upon Mustafa, the soul of mercy; Millions of blessings upon the guiding lamp of guidance.',
    poetOrSource: 'Salam-e-Raza',
    tag: 'Darood-o-Salam'
  },
  {
    id: 3,
    arabic: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
    urdu: 'وہ شمع اجالا جس سے ہوا ہر دل میں سمائے بیٹھے ہیں\nجس سمت صبا نے بات کی اس سمت گلاب کھل گئے',
    english: 'And We have not sent you except as a mercy to all the worlds. [Al-Anbiya: 107]',
    poetOrSource: 'Surah Al-Anbiya',
    tag: 'Mercy Unto Worlds'
  },
  {
    id: 4,
    arabic: 'يَا نَبِي سَلَامٌ عَلَيْكَ',
    urdu: 'پکارو یا رسول اللہ، کہو دل سے حبیب اللہ\nکہ محفل میں محمدؐ کے ملائک ناز کرتے ہیں',
    english: 'Call out O Messenger of Allah! Proclaim from the depth of your soul! Angles take pride in the gathering of Muhammad ﷺ.',
    poetOrSource: 'Traditional Milad Kalam',
    tag: 'Mehfil-e-Naat'
  },
  {
    id: 5,
    arabic: 'اَللّٰهُمَّ صَلِّ عَلٰى مُحَمَّدٍ',
    urdu: 'زمین و آسمان میں ہر طرف ہر سو ہے چہل پہل\nمبارک ہو کہ شفیع الامم دنیا میں آ گئے',
    english: 'The heavens and earth are adorned with festive lights; Rejoice, for the Intercessor of Nations has arrived!',
    poetOrSource: 'Nostalgic Mehfil Memory',
    tag: 'Universal Radiance'
  }
];

export const MEMORIES: MemoryItem[] = [
  {
    id: 'memory-1',
    title: 'Neighborhood Loudspeakers & Fajr Naats',
    period: 'Late Night 1990s & 2000s',
    iconName: 'Radio',
    summary: 'The crisp sound of Naat cassettes playing through horn speakers mounted on street lampposts.',
    detailedMemory: 'Days before 12 Rabi-ul-Awwal, youngsters in the mohalla would climb up step ladders to mount green speakers. From Fajr till late night, timeless voices drifted across rooftops while families drank cardamom chai and decorated their balconies.',
    sensoryDetail: '🔊 Echoing Naat chorus in the crisp autumn night air',
    audioTone: 'cassette'
  },
  {
    id: 'memory-2',
    title: 'Green Jhandiyaan & Fairy Lights Stringing',
    period: 'Community Traditions',
    iconName: 'Sparkles',
    summary: 'Triangular green flags stitched together and strung across narrow mohalla alleys.',
    detailedMemory: 'Every lane competed to be the most beautiful. Children held the string while elders tied green paper pennants from window to window. Green incandescent bulb strings cast an emerald glow on whitewashed walls.',
    sensoryDetail: '🚩 Green paper flags fluttering gently against the starry sky',
    audioTone: 'chime'
  },
  {
    id: 'memory-3',
    title: 'Scent of Rose Water & Attar-e-Kewra',
    period: 'Sacred Fragrance',
    iconName: 'Flower2',
    summary: 'Sprinkling rose water on guests as they entered the Mehfil-e-Milad.',
    detailedMemory: 'Brass Gulab-pash (rose water sprinklers) were passed around at every gathering. The rich scent of Oudh, Kewra essence in Meethi Niyaz, and fresh red rose petals spread on white floor sheets filled the room with serenity.',
    sensoryDetail: '🌹 Fine mist of cool rose water & sweet Kewra fragrance',
    audioTone: 'spritz'
  },
  {
    id: 'memory-4',
    title: 'Meethi Niyaz & Chilled Sharbat Distribution',
    period: 'Warm Hospitality',
    iconName: 'Utensils',
    summary: 'Large cauldrons of Kheer, Halwa, and pink Rose Sharbat distributed to all passersby.',
    detailedMemory: 'Stalls (Sabeel) set up at street corners offered stainless steel tumblers of cold milk flavored with rose syrup and basil seeds (Tukhm-e-Balanga). Nobody passed by without receiving sweet blessing.',
    sensoryDetail: '🥛 Cold pink rose milk with cardamom & silver foil sweets',
    audioTone: 'chime'
  },
  {
    id: 'memory-5',
    title: 'Silent Tasbeeh & Darood Counter',
    period: 'Spiritual Quietude',
    iconName: 'HeartHandshake',
    summary: 'Counting Salawat on olive wood beads or digital thumb counters during quiet night hours.',
    detailedMemory: 'Grandmothers sitting on charpois quietly moving wooden tasbeeh beads, sending millions of blessings upon the Beloved Prophet ﷺ, filling the house with calm spiritual protection.',
    sensoryDetail: '📿 Gentle rhythmic click of wooden beads & whispered Darood',
    audioTone: 'tasbeeh'
  }
];

export const AUTHENTIC_PHRASES = [
  'Jashn-e-Milad Mubarak ﷺ',
  'Aqa Ki Amad — Marhaba!',
  'Sallallahu Alaihi Wa Sallam',
  '12 Rabi-ul-Awwal Mubarak',
  'Rauza-e-Rasool ﷺ'
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'event-1',
    yearCE: '570 CE',
    yearHijri: 'Year of the Elephant',
    title: 'Blessed Birth in Makkah',
    arabicTitle: 'مَوْلِدُ النَّبِيِّ ﷺ',
    location: 'Makkah Al-Mukarramah',
    category: 'birth',
    description: 'The Prophet Muhammad ﷺ was born on 12th Rabi-ul-Awwal in the Year of the Elephant. His birth brought divine radiance and blessings to the universe.',
    significance: 'Celebrated globally during Jashn-e-Eid Milad-un-Nabi as Rahmatun lil-Aalameen (Mercy to all creation).',
    iconName: 'Sun'
  },
  {
    id: 'event-2',
    yearCE: '610 CE',
    yearHijri: '13 Before Hijrah',
    title: 'First Divine Revelation at Cave Hira',
    arabicTitle: 'بِدَايَةُ الْوَحْيِ',
    location: 'Jabal al-Nour, Makkah',
    category: 'prophethood',
    description: 'Angel Jibreel (AS) descended into Cave Hira bringing the first verses of Surah Al-Alaq: "Read in the name of your Lord who created..."',
    significance: 'The dawn of final prophethood and Quranic revelation illuminating humanity from darkness.',
    iconName: 'BookOpen'
  },
  {
    id: 'event-3',
    yearCE: '620 CE',
    yearHijri: '3 Before Hijrah',
    title: 'Al-Isra wal-Mi\'raj (Ascension)',
    arabicTitle: 'الْإِسْرَاءُ وَالْمِعْرَاجُ',
    location: 'Makkah → Jerusalem → Heavens',
    category: 'event',
    description: 'The miraculous night journey from Masjid al-Haram to Masjid al-Aqsa and ascension through the seven heavens into the divine presence.',
    significance: 'The gift of the five daily prayers (Salah) was ordained directly during this ascension.',
    iconName: 'Moon'
  },
  {
    id: 'event-4',
    yearCE: '622 CE',
    yearHijri: '1 AH (Start of Islamic Calendar)',
    title: 'The Great Migration (Hijrah to Madinah)',
    arabicTitle: 'الْهِجْرَةُ النَّبَوِيَّةُ',
    location: 'Makkah → Madinah Al-Munawwarah',
    category: 'migration',
    description: 'The Prophet ﷺ migrated to Yathrib (renamed Madinah Al-Munawwarah). Welcomed by the Ansar with the song "Tala\'al Badru \'Alayna".',
    significance: 'Established the brotherly Islamic community and marks the year 1 AH of the Islamic Hijri calendar.',
    iconName: 'Compass'
  },
  {
    id: 'event-5',
    yearCE: '622 CE',
    yearHijri: '1 AH',
    title: 'Building of Masjid an-Nabawi & Quba',
    arabicTitle: 'بِنَاءُ الْمَسْجِدِ النَّبَوِيِّ',
    location: 'Madinah Al-Munawwarah',
    category: 'event',
    description: 'The Prophet ﷺ personally helped carry unbaked bricks to build Masjid Quba and then Masjid an-Nabawi, the heart of Madinah.',
    significance: 'The center of worship, community governance, and spiritual warmth for generations.',
    iconName: 'Building2'
  },
  {
    id: 'event-6',
    yearCE: '628 CE',
    yearHijri: '6 AH',
    title: 'Treaty of Hudaybiyyah',
    arabicTitle: 'صُلْحُ الْحُدَيْبِيَةِ',
    location: 'Hudaybiyyah',
    category: 'event',
    description: 'A historic peace pact demonstrating immense wisdom and patience, declared by Allah in the Quran as a "Manifest Victory" (Fath Mubeen).',
    significance: 'Paved the way for peaceful spread of Islam across Arabia through diplomacy and moral character.',
    iconName: 'Scroll'
  },
  {
    id: 'event-7',
    yearCE: '630 CE',
    yearHijri: '8 AH',
    title: 'Peaceful Conquest of Makkah',
    arabicTitle: 'فَتْحُ مَكَّةَ',
    location: 'Makkah Al-Mukarramah',
    category: 'event',
    description: 'The Prophet ﷺ entered Makkah with humility, bowing on his camel, and granted general amnesty to all former adversaries saying: "Go, you are free."',
    significance: 'The ultimate example of mercy, forgiveness, and cleansing of the Kaaba from idols.',
    iconName: 'Crown'
  },
  {
    id: 'event-8',
    yearCE: '632 CE',
    yearHijri: '10 AH',
    title: 'Farewell Pilgrimage & Sermon',
    arabicTitle: 'خُطْبَةُ وَدَاعِ الْحَجِّ',
    location: 'Mount Arafat, Makkah',
    category: 'legacy',
    description: 'Delivered the universal charter of human rights on Mount Arafat: "An Arab has no superiority over a non-Arab, nor a white over a black, except by piety."',
    significance: 'Emphasized human equality, women\'s rights, sanctity of life, and holding fast to the Quran & Sunnah.',
    iconName: 'Users'
  },
  {
    id: 'event-9',
    yearCE: '632 CE',
    yearHijri: '11 AH',
    title: 'Blessed Veiling (Wisal) & Eternal Light',
    arabicTitle: 'الْوَفَاةُ النَّبَوِيَّةُ / الْوِصَالُ',
    location: 'Madinah Al-Munawwarah',
    category: 'legacy',
    description: 'On 12th Rabi-ul-Awwal 11 AH, the Beloved Prophet ﷺ passed to the highest companionship (Ar-Rafiq Al-A\'la), leaving an eternal legacy of light and guidance.',
    significance: 'Resting in the Sacred Rawdah Shareef in Madinah, continuously showered with Darood-o-Salam.',
    iconName: 'Sparkles'
  }
];
