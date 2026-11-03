import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BookOpen,
  Repeat,
  Layers,
  Search,
  Volume2,
  CheckCircle2,
  Sparkles,
  Flame,
  Trophy,
  Plus,
  Filter,
  ArrowRightLeft,
  Brain,
  MessageSquare,
  GraduationCap,
  Home,
  Baby,
  Clock,
  Sliders,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  Check,
  X,
  HelpCircle,
  UserCheck,
  Bookmark,
  Star,
  Play,
  Award,
  Settings,
  Trash2,
  Info,
  Smartphone,
  Maximize2,
  Rocket,
  Copy,
  Globe,
  Download
} from 'lucide-react';

// ==========================================
// 1. VERİ TABANI: 250 CÜMLE KALIBI VE KIRIK MEALLERİ (5 KATEGORİ)
// ==========================================
const BASE_100_PATTERNS = [
  // KATEGORİ 1: TEMEL "JOKER" İSKELETLER (1-20)
  {
    id: 1,
    category: 'joker',
    ar: 'أُرِيدُ أَنْ ...',
    trPron: 'Urîdu en ...',
    tr: '... yapmak istiyorum.',
    hasSlot: true,
    slotType: 'verb_en',
    femNote: 'Kadın/Erkek ortak kullanır (Ben istiyorum).',
    exampleAr: 'أُرِيدُ أَنْ أَشْرَبَ الشَّايَ.',
    examplePron: 'Urîdu en eşrabeş-şâye.',
    exampleTr: 'Çay içmek istiyorum.'
  },
  {
    id: 2,
    category: 'joker',
    ar: 'لَا أُرِيدُ أَنْ ...',
    trPron: 'Lâ urîdu en ...',
    tr: '... yapmak istemiyorum.',
    hasSlot: true,
    slotType: 'verb_en',
    femNote: 'Kadın/Erkek ortak kullanır.',
    exampleAr: 'لَا أُرِيدُ أَنْ أَخْرُجَ الْآنَ.',
    examplePron: 'Lâ urîdu en ahruce el-âne.',
    exampleTr: 'Şu an çıkmak istemiyorum.'
  },
  {
    id: 3,
    category: 'joker',
    ar: 'يَجِبُ عَلَيَّ أَنْ ...',
    trPron: 'Yecibu aleyye en ...',
    tr: '... yapmam gerekiyor.',
    hasSlot: true,
    slotType: 'verb_en',
    femNote: 'Kadın/Erkek ortak kullanır.',
    exampleAr: 'يَجِبُ عَلَيَّ أَنْ أُحَضِّرَ الدَّرْسَ.',
    examplePron: 'Yecibu aleyye en uhaddıred-derse.',
    exampleTr: 'Dersi hazırlamam gerekiyor.'
  },
  {
    id: 4,
    category: 'joker',
    ar: 'يَجِبُ عَلَيْكَ أَنْ ...',
    trPron: 'Yecibu aleyke en ...',
    tr: '... yapman gerekiyor.',
    hasSlot: true,
    slotType: 'verb_en_you',
    femAr: 'يَجِبُ عَلَيْكِ أَنْ ...',
    femPron: 'Yecibu aleyki en ...',
    femNote: 'Eşinize/kızınıza söylerken "aleyki" (عَلَيْكِ) kullanılır ve fiilin sonuna "î" eklenir.',
    exampleAr: 'يَجِبُ عَلَيْكَ أَنْ تَدْرُسَ جَيِّدًا.',
    examplePron: 'Yecibu aleyke en tedruse ceyyiden.',
    exampleTr: 'İyi çalışman gerekiyor.'
  },
  {
    id: 5,
    category: 'joker',
    ar: 'هَلْ يُمْكِنُكَ أَنْ ...؟',
    trPron: 'Hel yumkinuke en ...?',
    tr: '... yapabilir misin?',
    hasSlot: true,
    slotType: 'verb_en_you',
    femAr: 'هَلْ يُمْكِنُكِ أَنْ ...؟',
    femPron: 'Hel yumkinuki en ...?',
    femNote: 'Dişil hitapta "yumkinuki" (يُمْكِنُكِ) denir.',
    exampleAr: 'هَلْ يُمْكِنُكَ أَنْ تُسَاعِدَنِي؟',
    examplePron: 'Hel yumkinuke en tusâidenî?',
    exampleTr: 'Bana yardım edebilir misin?'
  },
  {
    id: 6,
    category: 'joker',
    ar: 'أَحْتَاجُ إِلَى ...',
    trPron: 'Ahtâcu ilâ ...',
    tr: '...-e ihtiyacım var.',
    hasSlot: true,
    slotType: 'noun',
    femNote: 'Kadın/Erkek ortak kullanır.',
    exampleAr: 'أَحْتَاجُ إِلَى قَلَمٍ وَدَفْتَرٍ.',
    examplePron: 'Ahtâcu ilâ kalemin ve defterin.',
    exampleTr: 'Bir kalem ve deftere ihtiyacım var.'
  },
  {
    id: 7,
    category: 'joker',
    ar: 'أَنَا ذَاهِبٌ إِلَى ...',
    trPron: 'Ene zâhibun ilâ ...',
    tr: '...-e gidiyorum.',
    hasSlot: true,
    slotType: 'place',
    femAr: 'أَنَا ذَاهِبَةٌ إِلَى ...',
    femPron: 'Ene zâhibetun ilâ ...',
    femNote: 'Konuşan kişi kadınsa "zâhibetun" (ذَاهِبَةٌ) der.',
    exampleAr: 'أَنَا ذَاهِبٌ إِلَى الْمَدْرَسَةِ.',
    examplePron: 'Ene zâhibun ilel-medreseti.',
    exampleTr: 'Okula gidiyorum.'
  },
  {
    id: 8,
    category: 'joker',
    ar: 'لَيْسَ عِنْدِي وَقْتٌ لِـ ...',
    trPron: 'Leyse indî vaktun li-...',
    tr: '... için vaktim yok.',
    hasSlot: true,
    slotType: 'noun',
    femNote: 'Kadın/Erkek ortak kullanır.',
    exampleAr: 'لَيْسَ عِنْدِي وَقْتٌ لِلالَّعِبِ.',
    examplePron: 'Leyse indî vaktun lil-la’ibi.',
    exampleTr: 'Oyun için vaktim yok.'
  },
  {
    id: 9,
    category: 'joker',
    ar: 'مِنْ فَضْلِكَ، أَعْطِنِي ...',
    trPron: 'Min fadlike, a’tınî ...',
    tr: 'Lütfen bana ... ver.',
    hasSlot: true,
    slotType: 'noun',
    femAr: 'مِنْ فَضْلِكِ، أَعْطِينِي ...',
    femPron: 'Min fadliki, a’tînî ...',
    femNote: 'Eşinize/kızınıza hitapta "Min fadliki, a’tînî" denir.',
    exampleAr: 'مِنْ فَضْلِكَ، أَعْطِنِي الْمِفْتَاحَ.',
    examplePron: 'Min fadlike, a’tınî el-miftâha.',
    exampleTr: 'Lütfen bana anahtarı ver.'
  },
  {
    id: 10,
    category: 'joker',
    ar: 'أَيْنَ وَضَعْتَ ...؟',
    trPron: 'Eyne vada’te ...?',
    tr: '...-i nereye koydun?',
    hasSlot: true,
    slotType: 'noun',
    femAr: 'أَيْنَ وَضَعْتِ ...؟',
    femPron: 'Eyne vada’ti ...?',
    femNote: 'Eşinize sorarken "Eyne vada’ti" (وَضَعْتِ) kullanılır.',
    exampleAr: 'أَيْنَ وَضَعْتَ الْحَقِيبَةَ؟',
    examplePron: 'Eyne vada’tel-hakîbete?',
    exampleTr: 'Çantayı nereye koydun?'
  },
  {
    id: 11,
    category: 'joker',
    ar: 'أَبْحَثُ عَنْ ...',
    trPron: 'Ebhasu an ...',
    tr: '...-i arıyorum.',
    hasSlot: true,
    slotType: 'noun',
    femNote: 'Kadın/Erkek ortak kullanır.',
    exampleAr: 'أَبْحَثُ عَنْ نَظَّارَتِي.',
    examplePron: 'Ebhasu an nazzâratî.',
    exampleTr: 'Gözlüğümü arıyorum.'
  },
  {
    id: 12,
    category: 'joker',
    ar: 'نَسِيتُ أَنْ ...',
    trPron: 'Nesîtu en ...',
    tr: '... yapmayı unuttum.',
    hasSlot: true,
    slotType: 'verb_en',
    femNote: 'Kadın/Erkek ortak kullanır.',
    exampleAr: 'نَسِيتُ أَنْ أَشْتَرِيَ الْخُبْزَ.',
    examplePron: 'Nesîtu en eşteriyel-hubze.',
    exampleTr: 'Ekmek almayı unuttum.'
  },
  {
    id: 13,
    category: 'joker',
    ar: 'سَأَفْعَلُ هَذَا بَعْدَ ...',
    trPron: 'Se-ef’alu hâzâ ba’de ...',
    tr: 'Bunu ...-den sonra yapacağım.',
    hasSlot: true,
    slotType: 'noun',
    femNote: 'Kadın/Erkek ortak kullanır.',
    exampleAr: 'سَأَفْعَلُ هَذَا بَعْدَ الدَّرْسِ.',
    examplePron: 'Se-ef’alu hâzâ ba’ded-dersi.',
    exampleTr: 'Bunu dersten sonra yapacağım.'
  },
  {
    id: 14,
    category: 'joker',
    ar: 'مَاذَا تَفْعَلُ فِي ...؟',
    trPron: 'Mâzâ tef’alu fî ...?',
    tr: '...-de ne yapıyorsun?',
    hasSlot: true,
    slotType: 'place',
    femAr: 'مَاذَا تَفْعَلِينَ فِي ...؟',
    femPron: 'Mâzâ tef’alîne fî ...?',
    femNote: 'Dişil hitapta "tef’alîne" (تَفْعَلِينَ) denir.',
    exampleAr: 'مَاذَا تَفْعَلُ فِي الْمَطْبَخِ؟',
    examplePron: 'Mâzâ tef’alu fil-matbahı?',
    exampleTr: 'Mutfakta ne yapıyorsun?'
  },
  {
    id: 15,
    category: 'joker',
    ar: 'لِمَاذَا لَمْ ...؟',
    trPron: 'Limâzâ lem ...?',
    tr: 'Neden ... yapmadın?',
    hasSlot: false,
    femNote: 'Fiilin sonu ceزم (sükun) olur; dişil hitapta "-î" olur.',
    exampleAr: 'لِمَاذَا لَمْ تَكْتُبِ الدَّرْسَ؟',
    examplePron: 'Limâzâ lem tektubid-derse?',
    exampleTr: 'Neden dersi yazmadın?'
  },
  {
    id: 16,
    category: 'joker',
    ar: 'مَتَى سَنَذْهَبُ إِلَى ...؟',
    trPron: 'Metâ senezhebu ilâ ...?',
    tr: '...-e ne zaman gideceğiz?',
    hasSlot: true,
    slotType: 'place',
    femNote: 'Çoğul ("biz") olduğu için herkes için aynıdır.',
    exampleAr: 'مَتَى سَنَذْهَبُ إِلَى الْحَدِيقَةِ؟',
    examplePron: 'Metâ senezhebu ilel-hadîkati?',
    exampleTr: 'Parka ne zaman gideceğiz?'
  },
  {
    id: 17,
    category: 'joker',
    ar: 'أُفَضِّلُ ... عَلَى ...',
    trPron: 'Ufeddilu ... alâ ...',
    tr: '...-i, ...-e tercih ederim.',
    hasSlot: true,
    slotType: 'noun',
    femNote: 'Kadın/Erkek ortak kullanır.',
    exampleAr: 'أُفَضِّلُ الشَّايَ عَلَى الْقَهْوَةِ.',
    examplePron: 'Ufeddiluş-şâye alel-kahveti.',
    exampleTr: 'Çayı kahveye tercih ederim.'
  },
  {
    id: 18,
    category: 'joker',
    ar: 'مِنَ الْمُمْكِنِ أَنْ ...',
    trPron: 'Minel-mumkini en ...',
    tr: '... olması mümkündür / ...-ebilirim.',
    hasSlot: true,
    slotType: 'verb_en',
    femNote: 'Genel olasılık bildirir.',
    exampleAr: 'مِنَ الْمُمْكِنِ أَنْ أَتَأَخَّرَ قَلِيلًا.',
    examplePron: 'Minel-mumkini en eteahhara kalîlen.',
    exampleTr: 'Biraz gecikmem mümkün / gecikebilirim.'
  },
  {
    id: 19,
    category: 'joker',
    ar: 'أَظُنُّ أَنَّ ...',
    trPron: 'Ezunnu enne ...',
    tr: 'Sanırım ki / Bence ...',
    hasSlot: false,
    femNote: 'Kadın/Erkek ortak kullanır.',
    exampleAr: 'أَظُنُّ أَنَّ الِامْتِحَانَ سَهْلٌ.',
    examplePron: 'Ezunnu ennel-imtihâne sehlun.',
    exampleTr: 'Sanırım sınav kolay.'
  },
  {
    id: 20,
    category: 'joker',
    ar: 'لَا أَسْتَطِيعُ أَنْ ... الْآنَ.',
    trPron: 'Lâ estatîu en ... el-âne.',
    tr: 'Şu an ... yapamam.',
    hasSlot: true,
    slotType: 'verb_en',
    femNote: 'Kadın/Erkek ortak kullanır.',
    exampleAr: 'لَا أَسْتَطِيعُ أَنْ أَتَكَلَّمَ الْآنَ.',
    examplePron: 'Lâ estatîu en etekelleme el-âne.',
    exampleTr: 'Şu an konuşamam.'
  },

  // KATEGORİ 2: EV VE EŞ İLE İLETİŞİM (21-40)
  {
    id: 21,
    category: 'home',
    ar: 'مَاذَا سَنَطْبُخُ الْيَوْمَ؟',
    trPron: 'Mâzâ senatbuhu el-yevme?',
    tr: 'Bugün ne pişireceğiz?',
    hasSlot: false,
    femNote: 'Ortak kullanım.'
  },
  {
    id: 22,
    category: 'home',
    ar: 'الطَّعَامُ جَاهِزٌ، تَعَالَوْا إِلَى الْمَائِدَةِ.',
    trPron: 'Et-taâmu câhizun, teâlev ilel-mâide.',
    tr: 'Yemek hazır, sofraya gelin.',
    hasSlot: false,
    femNote: 'Tüm aileye (çoğul) sesleniş.'
  },
  {
    id: 23,
    category: 'home',
    ar: 'هَلْ نَحْتَاجُ إِلَى شَيْءٍ مِنَ السُّوقِ؟',
    trPron: 'Hel nahtâcu ilâ şey’in mines-sûk?',
    tr: 'Marketten bir şeye ihtiyacımız var mı?',
    hasSlot: false,
    femNote: 'Ortak kullanım.'
  },
  {
    id: 24,
    category: 'home',
    ar: 'سَأَعُودُ إِلَى الْبَيْتِ فِي السَّاعَةِ ...',
    trPron: 'Se-eûdu ilel-beyti fis-sâati ...',
    tr: 'Eve saat ...-de döneceğim.',
    hasSlot: false,
    exampleAr: 'سَأَعُودُ إِلَى الْبَيْتِ فِي السَّاعَةِ الْخَامِسَةِ.',
    examplePron: 'Se-eûdu ilel-beyti fis-sâatil-hâmiseti.',
    exampleTr: 'Eve saat beşte döneceğim.'
  },
  {
    id: 25,
    category: 'home',
    ar: 'أَنَا مُتْعَبٌ جِدًّا الْيَوْمَ.',
    trPron: 'Ene mut’abun cidden el-yevme.',
    tr: 'Bugün çok yorgunum.',
    hasSlot: false,
    femAr: 'أَنَا مُتْعَبَةٌ جِدًّا الْيَوْمَ.',
    femPron: 'Ene mut’abetun cidden el-yevme.',
    femNote: 'Konuşan kadınsa "mut’abetun" (مُتْعَبَةٌ) der.'
  },
  {
    id: 26,
    category: 'home',
    ar: 'هَلْ شَرِبْتِ الْقَهْوَةَ؟',
    trPron: 'Hel şeribtil-kahvete?',
    tr: 'Kahve içtin mi? (Eşe hitaben)',
    hasSlot: false,
    femAr: 'هَلْ شَرِبْتِ الْقَهْوَةَ؟',
    femPron: 'Hel şeribtil-kahvete?',
    femNote: 'Erkeğe sorarken "Hel şeribtel-kahvete?" (شَرِبْتَ) denir.'
  },
  {
    id: 27,
    category: 'home',
    ar: 'دَعِينَا نَشْرَبِ الشَّايَ مَعًا.',
    trPron: 'Deînâ neşrabiş-şâye mean.',
    tr: 'Gel birlikte çay içelim. (Eşe hitaben)',
    hasSlot: false,
    femAr: 'دَعِينَا نَشْرَبِ الشَّايَ مَعًا.',
    femPron: 'Deînâ neşrabiş-şâye mean.',
    femNote: 'Erkeğe hitap edilirken "Da’nâ" (دَعْنَا) kullanılır.'
  },
  {
    id: 28,
    category: 'home',
    ar: 'مَنْ سَيَأْخُذُ الْأَوْلَادَ مِنَ الْمَدْرَسَةِ؟',
    trPron: 'Men se-ye’huzul-evlâde minel-medreseti?',
    tr: 'Çocukları okuldan kim alacak?',
    hasSlot: false
  },
  {
    id: 29,
    category: 'home',
    ar: 'هَلْ دَفَعْتَ فَاتُورَةَ ...؟',
    trPron: 'Hel defa’te fâtûrate ...?',
    tr: '... faturasını ödedin mi?',
    hasSlot: true,
    slotType: 'noun',
    femAr: 'هَلْ دَفَعْتِ فَاتُورَةَ ...؟',
    femPron: 'Hel defa’ti fâtûrate ...?',
    exampleAr: 'هَلْ دَفَعْتَ فَاتُورَةَ الْكَهْرَبَاءِ؟',
    examplePron: 'Hel defa’te fâtûratel-kehrabâi?',
    exampleTr: 'Elektrik faturasını ödedin mi?'
  },
  {
    id: 30,
    category: 'home',
    ar: 'الْبَيْتُ يَحْتَاجُ إِلَى تَنْظِيفٍ.',
    trPron: 'El-beytu yahtâcu ilâ tanzîfin.',
    tr: 'Evin temizliğe ihtiyacı var.',
    hasSlot: false
  },
  {
    id: 31,
    category: 'home',
    ar: 'سَأُصَلِّي ثُمَّ آتِي.',
    trPron: 'Se-usallî summe âtî.',
    tr: 'Namaz kılıp geleceğim.',
    hasSlot: false
  },
  {
    id: 32,
    category: 'home',
    ar: 'جَزَاكِ اللَّهُ خَيْرًا، سَلِمَتْ يَدَاكِ.',
    trPron: 'Cezâkillâhu hayran, selimet yedâki.',
    tr: 'Allah razı olsun, ellerine sağlık. (Eşe hitaben)',
    hasSlot: false,
    femAr: 'جَزَاكِ اللَّهُ خَيْرًا، سَلِمَتْ يَدَاكِ.',
    femPron: 'Cezâkillâhu hayran, selimet yedâki.',
    femNote: 'Erkeğe söylerken: "Cezâkellâhu hayran, selimet yedâke".'
  },
  {
    id: 33,
    category: 'home',
    ar: 'مَا رَأْيُكِ فِي ...؟',
    trPron: 'Mâ re’yuki fî ...?',
    tr: '... hakkında ne düşünüyorsun? (Eşe hitaben)',
    hasSlot: true,
    slotType: 'noun',
    femAr: 'مَا رَأْيُكِ فِي ...؟',
    femPron: 'Mâ re’yuki fî ...?',
    femNote: 'Erkeğe sorarken "Mâ re’yuke fî..." (رَأْيُكَ) denir.'
  },
  {
    id: 34,
    category: 'home',
    ar: 'سَنَزُورُ عَائِلَتِي هَذَا الْأُسْبُوعَ.',
    trPron: 'Senezûru âiletî hâzel-usbûa.',
    tr: 'Bu hafta ailemi ziyaret edeceğiz.',
    hasSlot: false
  },
  {
    id: 35,
    category: 'home',
    ar: 'لَا تَنْسَيْ أَنْ تُوقِظِينِي فِي السَّاعَةِ ...',
    trPron: 'Lâ tensey en tûkızînî fis-sâati ...',
    tr: 'Beni saat ...-de uyandırmayı unutma. (Eşe hitaben)',
    hasSlot: false,
    femAr: 'لَا تَنْسَيْ أَنْ تُوقِظِينِي فِي السَّاعَةِ السَّابِعَةِ.',
    femPron: 'Lâ tensey en tûkızînî fis-sâatis-sâbiati.',
    femNote: 'Erkeğe söylerken: "Lâ tense en tûkızanî..." (لَا تَنْسَ أَنْ تُوقِظَنِي).'
  },
  {
    id: 36,
    category: 'home',
    ar: 'الْجَوُّ بَارِدٌ، أَغْلِقِ النَّافِذَةَ.',
    trPron: 'El-cevvu bâridun, ağlikin-nâfizete.',
    tr: 'Hava soğuk, pencereyi kapat.',
    hasSlot: false,
    femAr: 'الْجَوُّ بَارِدٌ، أَغْلِقِي النَّافِذَةَ.',
    femPron: 'El-cevvu bâridun, ağlikîn-nâfizete.'
  },
  {
    id: 37,
    category: 'home',
    ar: 'أَيْنَ مِفْتَاحُ السَّيَّارَةِ؟',
    trPron: 'Eyne miftâhus-seyyâreti?',
    tr: 'Arabanın anahtarı nerede?',
    hasSlot: false
  },
  {
    id: 38,
    category: 'home',
    ar: 'سَأَخْرُجُ قَلِيلًا وَأَعُودُ.',
    trPron: 'Se-ahrucu kalîlen ve eûdu.',
    tr: 'Biraz çıkıp döneceğim.',
    hasSlot: false
  },
  {
    id: 39,
    category: 'home',
    ar: 'هَلْ كُلُّ شَيْءٍ عَلَى مَا يُرَامُ؟',
    trPron: 'Hel kullu şey’in alâ mâ yurâm?',
    tr: 'Her şey yolunda mı?',
    hasSlot: false
  },
  {
    id: 40,
    category: 'home',
    ar: 'تُصْبِحُونَ عَلَى خَيْرٍ.',
    trPron: 'Tusbihûne alâ hayrin.',
    tr: 'İyi geceler (Allah rahatlık versin).',
    hasSlot: false
  },

  // KATEGORİ 3: ÇOCUKLARLA İLETİŞİM VE EBEVEYNLİK (41-60)
  {
    id: 41,
    category: 'kids',
    ar: 'هَيَّا اسْتَيْقِظْ، حَانَ وَقْتُ الْمَدْرَسَةِ.',
    trPron: 'Heyyâ isteykız, hâne vaktul-medreseti.',
    tr: 'Hadi uyan, okul vakti geldi.',
    hasSlot: false,
    femAr: 'هَيَّا اسْتَيْقِظِي، حَانَ وَقْتُ الْمَدْرَسَةِ.',
    femPron: 'Heyyâ isteykızî, hâne vaktul-medreseti.',
    femNote: 'Kız çocuğuna "isteykızî" (اسْتَيْقِظِي) denir.'
  },
  {
    id: 42,
    category: 'kids',
    ar: 'هَلْ أَكْمَلْتَ وَاجِبَكَ الْمَنْزِلِيَّ؟',
    trPron: 'Hel ekmelte vâcibekel-menziliyye?',
    tr: 'Ev ödevini bitirdin mi?',
    hasSlot: false,
    femAr: 'هَلْ أَكْمَلْتِ وَاجِبَكِ الْمَنْزِلِيَّ؟',
    femPron: 'Hel ekmelti vâcibekil-menziliyye?'
  },
  {
    id: 43,
    category: 'kids',
    ar: 'اِغْسِلْ يَدَيْكَ قَبْلَ الْأَكْلِ.',
    trPron: 'İğsil yedeyke kablel-ekli.',
    tr: 'Yemekten önce ellerini yıka.',
    hasSlot: false,
    femAr: 'اِغْسِلِي يَدَيْكِ قَبْلَ الْأَكْلِ.',
    femPron: 'İğsilî yedeyki kablel-ekli.'
  },
  {
    id: 44,
    category: 'kids',
    ar: 'نَظِّفْ أَسْنَانَكَ قَبْلَ النَّوْمِ.',
    trPron: 'Nazzif esnâneke kablen-nevmi.',
    tr: 'Uyumadan önce dişlerini fırçala.',
    hasSlot: false,
    femAr: 'نَظِّفِي أَسْنَانَكِ قَبْلَ النَّوْمِ.',
    femPron: 'Nazzifî esnâneki kablen-nevmi.'
  },
  {
    id: 45,
    category: 'kids',
    ar: 'اِلْبَسْ مَلَابِسَكَ بِسُرْعَةٍ.',
    trPron: 'İlbes melâbiseke bi-sur’atin.',
    tr: 'Kıyafetlerini hızlıca giy.',
    hasSlot: false,
    femAr: 'اِلْبَسِي مَلَابِسَكِ بِسُرْعَةٍ.',
    femPron: 'İlbesî melâbiseki bi-sur’atin.'
  },
  {
    id: 46,
    category: 'kids',
    ar: 'لَا تَلْعَبْ بِالْهَاتِفِ كَثِيرًا.',
    trPron: 'Lâ tel’ab bil-hâtifi kesîran.',
    tr: 'Telefonla çok oynama.',
    hasSlot: false,
    femAr: 'لَا تَلْعَبِي بِالْهَاتِفِ كَثِيرًا.',
    femPron: 'Lâ tel’abî bil-hâtifi kesîran.'
  },
  {
    id: 47,
    category: 'kids',
    ar: 'رَتِّبْ غُرْفَتَكَ مِنْ فَضْلِكَ.',
    trPron: 'Rettib ğurfeteke min fadlike.',
    tr: 'Lütfen odanı topla.',
    hasSlot: false,
    femAr: 'رَتِّبِي غُرْفَتَكِ مِنْ فَضْلِكِ.',
    femPron: 'Rettibî ğurfeteki min fadliki.'
  },
  {
    id: 48,
    category: 'kids',
    ar: 'مَاذَا فَعَلْتَ فِي الْمَدْرَسَةِ الْيَوْمَ؟',
    trPron: 'Mâzâ fealte fil-medreseti el-yevme?',
    tr: 'Bugün okulda ne yaptın?',
    hasSlot: false,
    femAr: 'مَاذَا فَعَلْتِ فِي الْمَدْرَسَةِ الْيَوْمَ؟',
    femPron: 'Mâzâ fealti fil-medreseti el-yevme?'
  },
  {
    id: 49,
    category: 'kids',
    ar: 'كُلْ طَعَامَكَ كُلَّهُ.',
    trPron: 'Kul taâmeke kullehu.',
    tr: 'Yemeğinin hepsini ye.',
    hasSlot: false,
    femAr: 'كُلِي طَعَامَكِ كُلَّهُ.',
    femPron: 'Kulî taâmeki kullehu.'
  },
  {
    id: 50,
    category: 'kids',
    ar: 'حَانَ وَقْتُ النَّوْمِ، اِذْهَبْ إِلَى فِرَاشِكَ.',
    trPron: 'Hâne vaktun-nevmi, izheb ilâ firâşike.',
    tr: 'Uyku vakti geldi, yatağına git.',
    hasSlot: false,
    femAr: 'حَانَ وَقْتُ النَّوْمِ، اِذْهَبِي إِلَى فِرَاشِكِ.',
    femPron: 'Hâne vaktun-nevmi, izhebî ilâ firâşiki.'
  },
  {
    id: 51,
    category: 'kids',
    ar: 'لَا تَتَشَاجَرْ مَعَ أَخِيكَ / أُخْتِكَ.',
    trPron: 'Lâ teteşâcer mea ahîke / uhtike.',
    tr: 'Kardeşinle kavga etme.',
    hasSlot: false,
    femAr: 'لَا تَتَشَاجَرِي مَعَ أَخِيكِ / أُخْتِكِ.',
    femPron: 'Lâ teteşâcerî mea ahîki / uhtiki.'
  },
  {
    id: 52,
    category: 'kids',
    ar: 'أَنَا فَخُورٌ بِكَ جِدًّا.',
    trPron: 'Ene fahûrun bike cidden.',
    tr: 'Seninle çok gurur duyuyorum.',
    hasSlot: false,
    femAr: 'أَنَا فَخُورٌ بِكِ جِدًّا.',
    femPron: 'Ene fahûrun biki cidden.'
  },
  {
    id: 53,
    category: 'kids',
    ar: 'اِسْمَعْ كَلَامَ أُمِّكَ.',
    trPron: 'İsma’ kelâme ummike.',
    tr: 'Annenin sözünü dinle.',
    hasSlot: false,
    femAr: 'اِسْمَعِي كَلَامَ أُمِّكِ.',
    femPron: 'İsma’î kelâme ummiki.'
  },
  {
    id: 54,
    category: 'kids',
    ar: 'إِذَا أَكْمَلْتَ دَرْسَكَ، سَنَذْهَبُ إِلَى الْحَدِيقَةِ.',
    trPron: 'İzâ ekmelte derseke, senezhebu ilel-hadîkati.',
    tr: 'Dersini bitirirsen parka gideceğiz.',
    hasSlot: false,
    femAr: 'إِذَا أَكْمَلْتِ دَرْسَكِ، سَنَذْهَبُ إِلَى الْحَدِيقَةِ.',
    femPron: 'İzâ ekmelti derseki, senezhebu ilel-hadîkati.'
  },
  {
    id: 55,
    category: 'kids',
    ar: 'كُنْ حَذِرًا، لَا تَرْكُضْ هُنَا.',
    trPron: 'Kun haziran, lâ terkud hunâ.',
    tr: 'Dikkatli ol, burada koşma.',
    hasSlot: false,
    femAr: 'كُونِي حَذِرَةً، لَا تَرْكُضِي هُنَا.',
    femPron: 'Kûnî haziraten, lâ terkudî hunâ.'
  },
  {
    id: 56,
    category: 'kids',
    ar: 'هَلْ يُؤْلِمُكَ شَيْءٌ؟',
    trPron: 'Hel yu’limuke şey’un?',
    tr: 'Bir yerin ağrıyor mu?',
    hasSlot: false,
    femAr: 'هَلْ يُؤْلِمُكِ شَيْءٌ؟',
    femPron: 'Hel yu’limuki şey’un?'
  },
  {
    id: 57,
    category: 'kids',
    ar: 'أَحْضِرْ حَقِيبَتَكَ وَتَعَالَ.',
    trPron: 'Ahdır hakîbeteke ve teâle.',
    tr: 'Çantanı getir ve gel.',
    hasSlot: false,
    femAr: 'أَحْضِرِي حَقِيبَتَكِ وَتَعَالَيْ.',
    femPron: 'Ahdırî hakîbeteki ve teâley.'
  },
  {
    id: 58,
    category: 'kids',
    ar: 'أَحْسَنْتَ يَا بُنَيَّ، عَمَلٌ رَائِعٌ!',
    trPron: 'Ahsente yâ buneyye, amelun râiun!',
    tr: 'Aferin oğlum/yavrum, harika iş!',
    hasSlot: false,
    femAr: 'أَحْسَنْتِ يَا بُنَيَّتِي، عَمَلٌ رَائِعٌ!',
    femPron: 'Ahsenti yâ buneyyetî, amelun râiun!'
  },
  {
    id: 59,
    category: 'kids',
    ar: 'لَا تَبْكِ، أَنَا هُنَا مَعَكَ.',
    trPron: 'Lâ tebki, ene hunâ meake.',
    tr: 'Ağlama, ben burada seninleyim.',
    hasSlot: false,
    femAr: 'لَا تَبْكِي، أَنَا هُنَا مَعَكِ.',
    femPron: 'Lâ tebkî, ene hunâ meaki.'
  },
  {
    id: 60,
    category: 'kids',
    ar: 'سَأَحْكِي لَكَ قِصَّةً قَبْلَ النَّوْمِ.',
    trPron: 'Se-ahkî leke kıssaten kablen-nevmi.',
    tr: 'Uyumadan önce sana bir hikaye anlatacağım.',
    hasSlot: false,
    femAr: 'سَأَحْكِي لَكِ قِصَّةً قَبْلَ النَّوْمِ.',
    femPron: 'Se-ahkî leki kıssaten kablen-nevmi.'
  },

  // KATEGORİ 4: OKUL, SINIF VE ÖĞRETMENLİK (61-85)
  {
    id: 61,
    category: 'school',
    ar: 'السَّلَامُ عَلَيْكُمْ يَا طُلَّابُ، كَيْفَ حَالُكُمُ الْيَوْمَ؟',
    trPron: 'Es-selâmu aleykum yâ tullâb, keyfe hâlukum el-yevme?',
    tr: 'Selamünaleyküm öğrenciler, bugün nasılsınız?',
    hasSlot: false
  },
  {
    id: 62,
    category: 'school',
    ar: 'اِفْتَحُوا كُتُبَكُمْ عَلَى الصَّفْحَةِ ...',
    trPron: 'İftahû kutubekum alas-safhati ...',
    tr: 'Kitaplarınızı ... sayfadan açın.',
    hasSlot: false,
    exampleAr: 'اِفْتَحُوا كُتُبَكُمْ عَلَى الصَّفْحَةِ الْعَاشِرَةِ.',
    examplePron: 'İftahû kutubekum alas-safhatil-âşireti.',
    exampleTr: 'Kitaplarınızı onuncu sayfadan açın.'
  },
  {
    id: 63,
    category: 'school',
    ar: 'اِنْتَبِهُوا إِلَيَّ وَاسْتَمِعُوا جَيِّدًا.',
    trPron: 'İntebihû ileyye vestemiû ceyyiden.',
    tr: 'Bana dikkat edin ve iyi dinleyin.',
    hasSlot: false
  },
  {
    id: 64,
    category: 'school',
    ar: 'مَنْ يَعْرِفُ الْجَوَابَ الصَّحِيحَ؟',
    trPron: 'Men ya’riful-cevâbes-sahîha?',
    tr: 'Doğru cevabı kim biliyor?',
    hasSlot: false
  },
  {
    id: 65,
    category: 'school',
    ar: 'اِرْفَعْ يَدَكَ قَبْلَ أَنْ تَتَكَلَّمَ.',
    trPron: 'İrfa’ yedeke kable en tetekelleme.',
    tr: 'Konuşmadan önce parmak kaldır.',
    hasSlot: false,
    femAr: 'اِرْفَعِي يَدَكِ قَبْلَ أَنْ تَتَكَلَّمِي.',
    femPron: 'İrfa’î yedeki kable en tetekellemî.'
  },
  {
    id: 66,
    category: 'school',
    ar: 'اُكْتُبُوا هَذَا عَلَى الدَّفْتَرِ.',
    trPron: 'Uktubû hâzâ aled-defteri.',
    tr: 'Bunu deftere yazın.',
    hasSlot: false
  },
  {
    id: 67,
    category: 'school',
    ar: 'هَلْ فَهِمْتُمُ الدَّرْسَ أَمْ أُعِيدُ مَرَّةً أُخْرَى؟',
    trPron: 'Hel fehimtumud-derse em uîdu merraten uhrâ?',
    tr: 'Dersi anladınız mı yoksa bir kez daha tekrar edeyim mi?',
    hasSlot: false
  },
  {
    id: 68,
    category: 'school',
    ar: 'هَلْ هُنَاكَ أَيُّ سُؤَالٍ؟',
    trPron: 'Hel hunâke eyyu suâlin?',
    tr: 'Herhangi bir soru var mı?',
    hasSlot: false
  },
  {
    id: 69,
    category: 'school',
    ar: 'مَنْ هُوَ الْغَائِبُ الْيَوْمَ؟',
    trPron: 'Men huvel-ğâibu el-yevme?',
    tr: 'Bugün kim yok (devamsız)?',
    hasSlot: false
  },
  {
    id: 70,
    category: 'school',
    ar: 'هُدُوءً مِنْ فَضْلِكُمْ، لَا تَتَكَلَّمُوا.',
    trPron: 'Hudûen min fadlikum, lâ tetekellemû.',
    tr: 'Sessizlik lütfen, konuşmayın.',
    hasSlot: false
  },
  {
    id: 71,
    category: 'school',
    ar: 'مَوْضُوعُنَا الْيَوْمَ هُوَ ...',
    trPron: 'Mevdûunâ el-yevme huve ...',
    tr: 'Bugünkü konumuz ...',
    hasSlot: true,
    slotType: 'noun'
  },
  {
    id: 72,
    category: 'school',
    ar: 'اِقْرَأِ النَّصَّ بِصَوْتٍ مُرْتَفِعٍ.',
    trPron: 'İkra’in-nassa bi-savtin murtefiin.',
    tr: 'Metni yüksek sesle oku.',
    hasSlot: false,
    femAr: 'اِقْرَئِي النَّصَّ بِصَوْتٍ مُرْتَفِعٍ.',
    femPron: 'İkra’în-nassa bi-savtin murtefiin.'
  },
  {
    id: 73,
    category: 'school',
    ar: 'الِامْتِحَانُ سَيَكُونُ فِي الْأُسْبُوعِ الْقَادِمِ.',
    trPron: 'El-imtihânu se-yekûnu fil-usbûil-kâdimi.',
    tr: 'Sınav gelecek hafta olacak.',
    hasSlot: false
  },
  {
    id: 74,
    category: 'school',
    ar: 'إِجَابَتُكَ صَحِيحَةٌ، بَارَكَ اللَّهُ فِيكَ.',
    trPron: 'İcâbetuke sahîhatun, bârakallâhu fîke.',
    tr: 'Cevabın doğru, Allah seni mübarek kılsın (aferin).',
    hasSlot: false,
    femAr: 'إِجَابَتُكِ صَحِيحَةٌ، بَارَكَ اللَّهُ فِيكِ.',
    femPron: 'İcâbetuki sahîhatun, bârakallâhu fîki.'
  },
  {
    id: 75,
    category: 'school',
    ar: 'إِجَابَتُكَ قَرِيبَةٌ، حَاوِلْ مَرَّةً أُخْرَى.',
    trPron: 'İcâbetuke karîbetun, hâvil merraten uhrâ.',
    tr: 'Cevabın yakın, bir kez daha dene.',
    hasSlot: false,
    femAr: 'إِجَابَتُكِ قَرِيبَةٌ، حَاوِلِي مَرَّةً أُخْرَى.',
    femPron: 'İcâbetuki karîbetun, hâvilî merraten uhrâ.'
  },
  {
    id: 76,
    category: 'school',
    ar: 'لَا تَنْسَوْا أَنْ تُحْضِرُوا ... غَدًا.',
    trPron: 'Lâ tensev en tuhdırû ... ğaden.',
    tr: 'Yarın ... getirmeyi unutmayın.',
    hasSlot: true,
    slotType: 'noun'
  },
  {
    id: 77,
    category: 'school',
    ar: 'عِنْدِي حِصَّةٌ فِي الصَّفِّ ... الْآنَ.',
    trPron: 'İndî hissatun fis-saffi ... el-âne.',
    tr: 'Şu an ... sınıfta dersim var.',
    hasSlot: false
  },
  {
    id: 78,
    category: 'school',
    ar: 'سَأُحَضِّرُ أَسْئِلَةَ الِامْتِحَانِ الْيَوْمَ.',
    trPron: 'Se-uhaddıru es’iletel-imtihâni el-yevme.',
    tr: 'Bugün sınav sorularını hazırlayacağım.',
    hasSlot: false
  },
  {
    id: 79,
    category: 'school',
    ar: 'يَجِبُ أَنْ أُدْخِلَ الدَّرَجَاتِ فِي النِّظَامِ.',
    trPron: 'Yecibu en udhiled-derecâti fin-nizâmi.',
    tr: 'Notları sisteme girmem gerekiyor.',
    hasSlot: false
  },
  {
    id: 80,
    category: 'school',
    ar: 'لَدَيْنَا اجْتِمَاعٌ مَعَ الْمُدِيرِ وَالْمُعَلِّمِينَ.',
    trPron: 'Ledeynâ ictimâun meal-mudîri vel-muallimîne.',
    tr: 'Müdür ve öğretmenlerle toplantımız var.',
    hasSlot: false
  },
  {
    id: 81,
    category: 'school',
    ar: 'مَا هِيَ حِصَّتُكَ التَّالِيَةُ؟',
    trPron: 'Mâ hiye hissatuket-tâliyetu?',
    tr: 'Sonraki dersin ne? (Meslektaşa hitaben)',
    hasSlot: false,
    femAr: 'مَا هِيَ حِصَّتُكِ التَّالِيَةُ؟',
    femPron: 'Mâ hiye hissatukit-tâliyetu?'
  },
  {
    id: 82,
    category: 'school',
    ar: 'انْتَهَى الدَّرْسُ، يُمْكِنُكُمُ الْخُرُوجُ إِلَى الِاسْتِرَاحَةِ.',
    trPron: 'İntehed-dersu, yumkinukumul-hurûcu ilel-istirâhati.',
    tr: 'Ders bitti, teneffüse çıkabilirsiniz.',
    hasSlot: false
  },
  {
    id: 83,
    category: 'school',
    ar: 'رَاجِعُوا هَذَا الْمَوْضُوعَ فِي الْبَيْتِ.',
    trPron: 'Râciû hâzel-mevdûa fil-beyti.',
    tr: 'Bu konuyu evde tekrar edin.',
    hasSlot: false
  },
  {
    id: 84,
    category: 'school',
    ar: 'أَغْلِقُوا الْكُتُبَ وَاسْتَعِدُّوا لِلِاخْتِبَارِ.',
    trPron: 'Ağlikul-kutube vesteiddû lil-ihtibâri.',
    tr: 'Kitapları kapatın ve teste hazırlanın.',
    hasSlot: false
  },
  {
    id: 85,
    category: 'school',
    ar: 'أَنَا الْمُعَلِّمُ الْمُنَاوِبُ الْيَوْمَ.',
    trPron: 'Enel-muallimul-munâvibu el-yevme.',
    tr: 'Bugün nöbetçi öğretmen benim.',
    hasSlot: false,
    femAr: 'أَنَا الْمُعَلِّمَةُ الْمُنَاوِبَةُ الْيَوْمَ.',
    femPron: 'Enel-muallimetul-munâvibetu el-yevme.'
  },

  // KATEGORİ 5: ZAMAN, SOSYAL HAYAT VE DIŞARIDAKİ İŞLER (86-100)
  {
    id: 86,
    category: 'social',
    ar: 'كَمِ السَّاعَةُ الْآنَ؟',
    trPron: 'Kemis-sâatu el-âne?',
    tr: 'Şu an saat kaç?',
    hasSlot: false
  },
  {
    id: 87,
    category: 'social',
    ar: 'تَأَخَّرْنَا، يَجِبُ أَنْ نُسْرِعَ.',
    trPron: 'Teahharnâ, yecibu en nusria.',
    tr: 'Geç kaldık, acele etmeliyiz.',
    hasSlot: false
  },
  {
    id: 88,
    category: 'social',
    ar: 'بِكَمْ هَذَا مِنْ فَضْلِكَ؟',
    trPron: 'Bi-kem hâzâ min fadlike?',
    tr: 'Bu ne kadar acaba?',
    hasSlot: false
  },
  {
    id: 89,
    category: 'social',
    ar: 'أُرِيدُ أَنْ أَشْتَرِيَ كِيلُو مِنْ ...',
    trPron: 'Urîdu en eşteriye kîlû min ...',
    tr: 'Bir kilo ... almak istiyorum.',
    hasSlot: true,
    slotType: 'noun'
  },
  {
    id: 90,
    category: 'social',
    ar: 'هَلْ يُمْكِنُ الدَّفْعُ بِالْبِطَاقَةِ؟',
    trPron: 'Hel yumkinud-def’u bil-bitâkati?',
    tr: 'Kartla ödeme yapılabilir mi?',
    hasSlot: false
  },
  {
    id: 91,
    category: 'social',
    ar: 'فِي الْيَوْمِ التَّالِي / فِي الْأُسْبُوعِ الْمَاضِي...',
    trPron: 'Fil-yevmit-tâlî / Fil-usbûil-mâdî...',
    tr: 'Ertesi gün / Geçen hafta...',
    hasSlot: false
  },
  {
    id: 92,
    category: 'social',
    ar: 'سَأَتَّصِلُ بِكَ بَعْدَ قَلِيلٍ.',
    trPron: 'Se-ettesılu bike ba’de kalîlin.',
    tr: 'Seni birazdan arayacağım.',
    hasSlot: false,
    femAr: 'سَأَتَّصِلُ بِكِ بَعْدَ قَلِيلٍ.',
    femPron: 'Se-ettesılu biki ba’de kalîlin.'
  },
  {
    id: 93,
    category: 'social',
    ar: 'أَنَا مَشْغُولٌ الْآنَ، نَتَكَلَّمُ لَاحِقًا.',
    trPron: 'Ene meşğûlun el-âne, netekellemu lâhikan.',
    tr: 'Şu an meşgulüm, daha sonra konuşuruz.',
    hasSlot: false,
    femAr: 'أَنَا مَشْغُولَةٌ الْآنَ، نَتَكَلَّمُ لَاحِقًا.',
    femPron: 'Ene meşğûletun el-âne, netekellemu lâhikan.'
  },
  {
    id: 94,
    category: 'social',
    ar: 'إِنْ شَاءَ اللَّهُ نَلْتَقِي غَدًا.',
    trPron: 'İnşâallâhu neltekî ğaden.',
    tr: 'İnşallah yarın görüşürüz.',
    hasSlot: false
  },
  {
    id: 95,
    category: 'social',
    ar: 'عَفْوًا، لَمْ أَفْهَمْ مَا قُلْتَ.',
    trPron: 'Afven, lem efhem mâ kulte.',
    tr: 'Affedersiniz, ne dediğinizi anlamadım.',
    hasSlot: false,
    femAr: 'عَفْوًا، لَمْ أَفْهَمْ مَا قُلْتِ.',
    femPron: 'Afven, lem efhem mâ kulti.'
  },
  {
    id: 96,
    category: 'social',
    ar: 'كَيْفَ يُمْكِنُنِي الذَّهَابُ إِلَى ...؟',
    trPron: 'Keyfe yumkinunî ez-zehâbu ilâ ...?',
    tr: '...-e nasıl gidebilirim?',
    hasSlot: true,
    slotType: 'place'
  },
  {
    id: 97,
    category: 'social',
    ar: 'الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ.',
    trPron: 'Elhamdulillâhi alâ kulli hâlin.',
    tr: 'Her halükarda Allah’a hamdolsun.',
    hasSlot: false
  },
  {
    id: 98,
    category: 'social',
    ar: 'تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ.',
    trPron: 'Tekabbelallâhu minnâ ve minkum.',
    tr: 'Allah bizden de sizden de kabul etsin.',
    hasSlot: false
  },
  {
    id: 99,
    category: 'social',
    ar: 'شَفَاكَ اللَّهُ وَعَافَاكَ.',
    trPron: 'Şefâkallâhu ve âfâke.',
    tr: 'Allah şifa ve afiyet versin (Geçmiş olsun).',
    hasSlot: false,
    femAr: 'شَفَاكِ اللَّهُ وَعَافَاكِ.',
    femPron: 'Şefâkillâhu ve âfâki.'
  },
  {
    id: 100,
    category: 'social',
    ar: 'فِي أَمَانِ اللَّهِ، مَعَ السَّلَامَةِ.',
    trPron: 'Fî emânillâh, meas-selâme.',
    tr: 'Allah’a emanet olun, güle güle.',
    hasSlot: false
  }
];

// EK 150 CÜMLE KALIBI (101 - 250 ARASI: KATEGORİLERE GÖRE)
const EXTRA_150_RAW = [
  // 1. JOKER İSKELETLER (101-130)
  [101, 'joker', 'عَلَيَّ أَنْ أَبْدَأَ بِـ ...', 'Aleyye en ebdee bi-...', '... ile başlamam lazım.', 'عَلَيَّ: benim üzerime/lazım | أَنْ: -mek/-mak | أَبْدَأَ: başlamam | بِـ: ile'],
  [102, 'joker', 'هَلْ أَنْتَ مُتَأَكِّدٌ مِنْ ...؟', 'Hel ente muteekkidun min ...?', '... konusunda emin misin?', 'هَلْ: mı/mi | أَنْتَ: sen | مُتَأَكِّدٌ: emin | مِنْ: -den/konusunda'],
  [103, 'joker', 'مِنَ الْأَفْضَلِ أَنْ ...', 'Minel-efdalî en ...', '... yapmamız/yapman daha iyidir.', 'مِنَ: -den | الْأَفْضَلِ: en iyi/daha iyi | أَنْ: -mek/-mak'],
  [104, 'joker', 'أَنَا مُسْتَعِدٌّ لِـ ...', 'Ene mustaiddun li-...', '... için hazırım.', 'أَنَا: ben | مُسْتَعِدٌّ: hazırım | لِـ: için'],
  [105, 'joker', 'لَا دَاعِيَ لِـ ...', 'Lâ dâiye li-...', '...-e gerek yok.', 'لَا: yok | دَاعِيَ: gerek/sebep | لِـ: için/-e'],
  [106, 'joker', 'كُنْتُ أُرِيدُ أَنْ ...', 'Kuntu urîdu en ...', '... yapmak istiyordum.', 'كُنْتُ: idim | أُرِيدُ: istiyorum | أَنْ: -mek/-mak'],
  [107, 'joker', 'يَبْدُو أَنَّ الْأَمْرَ ...', 'Yebdû ennel-emra ...', 'Görünüşe göre bu iş ...', 'يَبْدُو: görünüyor | أَنَّ: ki | الْأَمْرَ: iş/durum'],
  [108, 'joker', 'أَتَمَنَّى أَنْ ...', 'Etemennâ en ...', '... olmasını temenni ederim / dilerim.', 'أَتَمَنَّى: diliyorum/temenni ederim | أَنْ: -mesini/-masını'],
  [109, 'joker', 'أَخَافُ أَنْ ...', 'Ehâfu en ...', '...-mekten korkuyorum / endişe ediyorum.', 'أَخَافُ: korkuyorum | أَنْ: -mekten/-maktan'],
  [110, 'joker', 'قَرَّرْتُ أَنْ ...', 'Karrartu en ...', '... yapmaya karar verdim.', 'قَرَّرْتُ: karar verdim | أَنْ: -meye/-maya'],
  [111, 'joker', 'أُحَاوِلُ أَنْ ...', 'Uhâvilu en ...', '... yapmaya çalışıyorum.', 'أُحَاوِلُ: çabalıyorum/çalışıyorum | أَنْ: -meye/-maya'],
  [112, 'joker', 'تَعَوَّدْتُ عَلَى ...', 'Teavvedtu alâ ...', '...-e alıştım.', 'تَعَوَّدْتُ: alıştım | عَلَى: üzerine/-e'],
  [113, 'joker', 'أَنَا مُهْتَمٌّ بِـ ...', 'Ene muhtemmun bi-...', '... ile ilgileniyorum.', 'أَنَا: ben | مُهْتَمٌّ: ilgiliyim/önemsiyorum | بِـ: ile'],
  [114, 'joker', 'مَا زِلْتُ أَنْتَظِرُ ...', 'Mâ ziltu entazıru ...', 'Hâlâ ... bekliyorum.', 'مَا زِلْتُ: hâlâ devam ediyorum | أَنْتَظِرُ: bekliyorum'],
  [115, 'joker', 'أَوْشَكْتُ عَلَى الْاِنْتِهَاءِ مِنْ ...', 'Evşektu alel-intihâi min ...', '...-i bitirmek üzereyim.', 'أَوْشَكْتُ: yaklaştım/üzereyim | عَلَى الْاِنْتِهَاءِ: bitirmeye | مِنْ: -den'],
  [116, 'joker', 'لَيْسَ مِنَ السَّهْلِ أَنْ ...', 'Leyse mines-sehli en ...', '... yapmak kolay değil.', 'لَيْسَ: değildir | مِنَ السَّهْلِ: kolaydan/kolay | أَنْ: -mek'],
  [117, 'joker', 'مِنَ الضَّرُورِيِّ أَنْ ...', 'Mined-darûriyyi en ...', '... yapmak zorunludur / şarttır.', 'مِنَ الضَّرُورِيِّ: zaruridir/gerekir | أَنْ: -mek/-mak'],
  [118, 'joker', 'هَلْ تَسْمَحُ لِي بِـ ...؟', 'Hel tesmahu lî bi-...?', 'Bana ... için izin verir misin?', 'هَلْ: mı | تَسْمَحُ: izin verirsin | لِي: bana | بِـ: ile/için'],
  [119, 'joker', 'لَا أَعْرِفُ كَيْفَ ...', 'Lâ a’rifu keyfe ...', 'Nasıl ... yapacağımı bilmiyorum.', 'لَا أَعْرِفُ: bilmiyorum | كَيْفَ: nasıl'],
  [120, 'joker', 'أَعْتَقِدُ أَنَّ هَذَا ...', 'A’tekıdu enne hâzâ ...', 'İnanıyorum ki / Bence bu ...', 'أَعْتَقِدُ: inanıyorum/düşünüyorum | أَنَّ: ki | هَذَا: bu'],
  [121, 'joker', 'بِالنِّسْبَةِ لِي، هَذَا الْمَوْضُوعُ مُهِمٌّ.', 'Bin-nisbeti lî, hâzel-mevdûu muhimmun.', 'Bana göre bu konu önemlidir.', 'بِالنِّسْبَةِ: göre/nispetle | لِي: bana | هَذَا: bu | الْمَوْضُوعُ: konu | مُهِمٌّ: önemlidir'],
  [122, 'joker', 'عَلَى الرَّغْمِ مِنْ ذَلِكَ، سَأُحَاوِلُ.', 'Aler-rağmi min zâlike, se-uhâvilu.', 'Buna rağmen deneyeceğim.', 'عَلَى الرَّغْمِ: rağmen | مِنْ ذَلِكَ: buna/bundan | سَأُحَاوِلُ: deneyeceğim'],
  [123, 'joker', 'لَا أَتَذَكَّرُ أَيْنَ ...', 'Lâ etezekkeru eyne ...', 'Nerede ... olduğunu hatırlamıyorum.', 'لَا أَتَذَكَّرُ: hatırlamıyorum | أَيْنَ: nerede'],
  [124, 'joker', 'هَلْ يُوجَدُ هُنَا ...؟', 'Hel yûcedu hunâ ...?', 'Burada ... var mı?', 'هَلْ: mı/mi | يُوجَدُ: bulunur/var | هُنَا: burada'],
  [125, 'joker', 'أَنَا بِحَاجَةٍ مَاسَّةٍ إِلَى ...', 'Ene bi-hâcetin mâssetin ilâ ...', '...-e acil ihtiyacım var.', 'أَنَا: ben | بِحَاجَةٍ: ihtiyaç içindeyim | مَاسَّةٍ: acil/şiddetli | إِلَى: -e/-a'],
  [126, 'joker', 'كُلَّمَا قَرَأْتُ فَهِمْتُ أَكْثَرَ.', 'Kullemâ kara’tu fehimtu eksera.', 'Okudukça daha çok anladım.', 'كُلَّمَا: her ne zaman/-dıkça | قَرَأْتُ: okudum | فَهِمْتُ: anladım | أَكْثَرَ: daha çok'],
  [127, 'joker', 'بِدُونِ شَكٍّ، هَذَا صَحِيحٌ.', 'Bidûni şekkin, hâzâ sahîhun.', 'Şüphesiz bu doğrudur.', 'بِدُونِ: olmaksızın/-sız | شَكٍّ: şüphe | هَذَا: bu | صَحِيحٌ: doğrudur'],
  [128, 'joker', 'عَلَى أَيِّ حَالٍ، شُكْرًا لَكَ.', 'Alâ eyyi hâlin, şukran leke.', 'Her halükarda sana teşekkür ederim.', 'عَلَى: üzerine | أَيِّ: hangi/her | حَالٍ: durum | شُكْرًا: teşekkür | لَكَ: sana'],
  [129, 'joker', 'يَسُرُّنِي أَنْ أَسْمَعَ هَذَا.', 'Yesurrunî en esmea hâzâ.', 'Bunu duymak beni sevindirdi.', 'يَسُرُّنِي: beni sevindirir | أَنْ: -mek | أَسْمَعَ: duymam | هَذَا: bunu'],
  [130, 'joker', 'لَا يَهُمُّنِي مَا يَقُولُونَ.', 'Lâ yehummunî mâ yekûlûne.', 'Ne dedikleri beni ilgilendirmiyor.', 'لَا يَهُمُّنِي: beni ilgilendirmez/önemsetmez | مَا: ne/şey | يَقُولُونَ: diyorlar'],

  // 2. EV & EŞ İLE İLETİŞİM (131-160)
  [131, 'home', 'هَلْ أَغْلَقْتِ بَابَ الْمَنْزِلِ؟', 'Hel ağlakti bâbel-menzili?', 'Evin kapısını kapattın mı? (Eşe)', 'هَلْ: mı | أَغْلَقْتِ: sen kapattın | بَابَ: kapısını | الْمَنْزِلِ: evin'],
  [132, 'home', 'نَفِدَ الْحَلِيبُ وَالْبَيْضُ فِي الثَّلَّاجَةِ.', 'Nefidel-halîbu vel-beydu fis-sellâceti.', 'Buzdolabında süt ve yumurta bitti.', 'نَفِدَ: tükendi/bitti | الْحَلِيبُ: süt | وَالْبَيْضُ: ve yumurta | فِي الثَّلَّاجَةِ: buzdolabında'],
  [133, 'home', 'سَأَشْتَرِي الْخُضْرَوَاتِ وَالْفَوَاكِهَ.', 'Se-eşterî el-hudravâti vel-fevâkihe.', 'Sebze ve meyve satın alacağım.', 'سَأَشْتَرِي: satın alacağım | الْخُضْرَوَاتِ: sebzeler | وَالْفَوَاكِهَ: ve meyveler'],
  [134, 'home', 'أَيْنَ شَاحِنُ الْهَاتِفِ؟', 'Eyne şâhinul-hâtifi?', 'Telefonun şarj aleti nerede?', 'أَيْنَ: nerede | شَاحِنُ: şarj aleti | الْهَاتِفِ: telefonun'],
  [135, 'home', 'اِنْقَطَعَتِ الْكَهْرَبَاءُ فَجْأَةً.', 'İnkataatil-kehrabâu fec’eten.', 'Elektrik aniden kesildi.', 'اِنْقَطَعَتِ: kesildi | الْكَهْرَبَاءُ: elektrik | فَجْأَةً: aniden'],
  [136, 'home', ' الْإِنْتَرْنِتُ ضَعِيفٌ جِدًّا الْيَوْمَ.', 'El-internetu daîfun cidden el-yevme.', 'İnternet bugün çok zayıf.', 'الْإِنْتَرْنِتُ: internet | ضَعِيفٌ: zayıftır | جِدًّا: çok | الْيَوْمَ: bugün'],
  [137, 'home', 'هَلْ شَغَّلْتِ الْغَسَّالَةَ؟', 'Hel şağğaltil-ğassâlete?', 'Çamaşır makinesini çalıştırdın mı?', 'هَلْ: mı | شَغَّلْتِ: çalıştırdın (sen) | الْغَسَّالَةَ: çamaşır makinesini'],
  [138, 'home', 'سَأُرَتِّبُ غُرْفَةَ الْجُلُوسِ.', 'Se-urettibu ğurfetel-culûsi.', 'Oturma odasını toplayacağım.', 'سَأُرَتِّبُ: düzenleyeceğim/toplayacağım | غُرْفَةَ: odasını | الْجُلُوسِ: oturma'],
  [139, 'home', 'الْغَدَاءُ لَذِيذٌ جِدًّا الْيَوْمَ.', 'El-ğadâu lezîzun cidden el-yevme.', 'Öğle yemeği bugün çok lezzetli.', 'الْغَدَاءُ: öğle yemeği | لَذِيذٌ: lezzetlidir | جِدًّا: çok | الْيَوْمَ: bugün'],
  [140, 'home', 'ضَعِي الْأَطْبَاقَ عَلَى الطَّاوِلَةِ.', 'Daî el-atbâka alet-tâvileti.', 'Tabakları masanın üzerine koy.', 'ضَعِي: koy (sen) | الْأَطْبَاقَ: tabakları | عَلَى: üzerine | الطَّاوِلَةِ: masanın'],
  [141, 'home', 'سَأُرْمِي الْقُمَامَةَ قَبْلَ الذَّهَابِ.', 'Se-urmî el-kumâmete kablez-zehâbi.', 'Gitmeden önce çöpü atacağım.', 'سَأُرْمِي: atacağım | الْقُمَامَةَ: çöpü | قَبْلَ: önce | الذَّهَابِ: gitmekten'],
  [142, 'home', 'مَنْ يَدُقُّ الْبَابَ فِي هَذِهِ السَّاعَةِ؟', 'Men yedukkul-bâbe fî hâzihis-sâati?', 'Bu saatte kapıyı kim çalıyor?', 'مَنْ: kim | يَدُقُّ: çalıyor | الْبَابَ: kapıyı | فِي هَذِهِ: bu ...-de | السَّاعَةِ: saatte'],
  [143, 'home', 'ضُيُوفُنَا سَيَأْتُونَ بَعْدَ صَلَاةِ الْمَغْرِبِ.', 'Duyûfunâ se-ye’tûne ba’de salâtil-mağribi.', 'Misafirlerimiz akşam namazından sonra gelecekler.', 'ضُيُوفُنَا: misafirlerimiz | سَيَأْتُونَ: gelecekler | بَعْدَ: sonra | صَلَاةِ الْمَغْرِبِ: akşam namazından'],
  [144, 'home', 'أَهْلًا وَسَهْلًا، تَفَضَّلُوا بِالدُّخُولِ.', 'Ehlen ve sehlen, tefaddalû bid-duhûli.', 'Hoş geldiniz, buyurun içeri girin.', 'أَهْلًا وَسَهْلًا: hoş geldiniz | تَفَضَّلُوا: buyurun | بِالدُّخُولِ: girişle/içeri'],
  [145, 'home', 'الْبَيْتُ بَيْتُكُمْ، خُذُوا رَاحَتَكُمْ.', 'El-beytu beytukum, huzû râhatekum.', 'Ev sizin eviniz, rahatınıza bakın.', 'الْبَيْتُ: ev | بَيْتُكُمْ: sizin evinizdir | خُذُوا: alın | رَاحَتَكُمْ: rahatınızı'],
  [146, 'home', 'افْتَحِي السِّتَارَةَ لِيَدْخُلَ الضَّوْءُ.', 'İftahî es-sitârate li-yedhuled-dav’u.', 'Işık girmesi için perdeyi aç.', 'افْتَحِي: aç | السِّتَارَةَ: perdeyi | لِيَدْخُلَ: girmesi için | الضَّوْءُ: ışık'],
  [147, 'home', 'أَطْفِئِ الْمِصْبَاحَ قَبْلَ أَنْ تَنَامَ.', 'Atfi’il-mısbâha kable en tenâme.', 'Uyumadan önce lambayı söndür.', 'أَطْفِئِ: söndür/kapat | الْمِصْبَاحَ: lambayı | قَبْلَ أَنْ: -meden önce | تَنَامَ: uyuman'],
  [148, 'home', 'هَلْ كَوَيْتِ قَمِيصِي الْأَبْيَضَ؟', 'Hel keveyti kamîsî el-ebyada?', 'Beyaz gömleğimi ütüledin mi?', 'هَلْ: mi | كَوَيْتِ: ütüledin | قَمِيصِي: gömleğimi | الْأَبْيَضَ: beyaz'],
  [149, 'home', 'جِيرَانُنَا أُنَاسٌ طَيِّبُونَ جِدًّا.', 'Cîrânunâ unâsun tayyibûne cidden.', 'Komşularımız çok iyi insanlar.', 'جِيرَانُنَا: komşularımız | أُنَاسٌ: insanlardır | طَيِّبُونَ: iyilerdir | جِدًّا: çok'],
  [150, 'home', 'سَأَسْتَحِمُّ ثُمَّ أَبْدَأُ بِالْعَمَلِ.', 'Se-estahimmu summe ebdeu bil-ameli.', 'Duş alıp sonra işe başlayacağım.', 'سَأَسْتَحِمُّ: duş alacağım | ثُمَّ: sonra | أَبْدَأُ: başlarım | بِالْعَمَلِ: işe'],
  [151, 'home', 'هَلْ بَقِيَ خُبْزٌ فِي الْمَطْبَخِ؟', 'Hel bakiye hubzun fil-matbahı?', 'Mutfakta ekmek kaldı mı?', 'هَلْ: mı | بَقِيَ: kaldı | خُبْزٌ: ekmek | فِي الْمَطْبَخِ: mutfakta'],
  [152, 'home', 'سَخِّنِي الْحَسَاءَ قَلِيلًا مِنْ فَضْلِكِ.', 'Sahhınî el-hasâe kalîlen min fadliki.', 'Lütfen çorbayı biraz ısıt.', 'سَخِّنِي: ısıt | الْحَسَاءَ: çorbayı | قَلِيلًا: biraz | مِنْ فَضْلِكِ: lütfen'],
  [153, 'home', 'أَيْنَ وَلَّاعَةُ الْفُرْنِ؟', 'Eyne vellâatul-furni?', 'Fırının/ocağın çakmağı nerede?', 'أَيْنَ: nerede | وَلَّاعَةُ: çakmağı | الْفُرْنِ: fırının/ocağın'],
  [154, 'home', 'نَحْتَاجُ إِلَى تَغْيِيرِ أُنْبُوبِ الْغَازِ.', 'Nahtâcu ilâ tağyîri unbûbil-ğâzi.', 'Tüpü (gaz tüpünü) değiştirmemiz gerekiyor.', 'نَحْتَاجُ: ihtiyacımız var | إِلَى تَغْيِيرِ: değiştirmeye | أُنْبُوبِ الْغَازِ: gaz tüpünü'],
  [155, 'home', 'لَا تَقْلَقِي، سَأَحُلُّ هَذِهِ الْمُشْكِلَةَ.', 'Lâ taklakî, se-ehullu hâzihil-muşkilete.', 'Endişelenme, bu sorunu çözeceğim.', 'لَا تَقْلَقِي: endişelenme | سَأَحُلُّ: çözeceğim | هَذِهِ: bu | الْمُشْكِلَةَ: sorunu'],
  [156, 'home', 'شُكْرًا عَلَى صَبْرِكِ وَاهْتِمَامِكِ.', 'Şukran alâ sabriki vehtimâmiki.', 'Sabrın ve ilgin için teşekkür ederim.', 'شُكْرًا: teşekkürler | عَلَى: üzerine/için | صَبْرِكِ: sabrın | وَاهْتِمَامِكِ: ve ilgin'],
  [157, 'home', 'الْأَوْلَادُ نَامُوا، يُمْكِنُنَا التَّحَدُّثُ الْآنَ.', 'El-evlâdu nâmû, yumkinunâ et-tehaddusu el-âne.', 'Çocuklar uyudu, şimdi konuşabiliriz.', 'الْأَوْلَادُ: çocuklar | نَامُوا: uyudular | يُمْكِنُنَا: yapabiliriz | التَّحَدُّثُ: konuşmak | الْآنَ: şimdi'],
  [158, 'home', 'كَمْ مِيزَانِيَّتُنَا لِهَذَا الشَّهْرِ؟', 'Kem mîzâniyyetunâ li-hâzeş-şehri?', 'Bu ay için bütçemiz ne kadar?', 'كَمْ: ne kadar | مِيزَانِيَّتُنَا: bütçemiz | لِهَذَا: bu ... için | الشَّهْرِ: ay'],
  [159, 'home', 'سَأَسْتَيْقِظُ مُبَكِّرًا لِصَلَاةِ الْفَجْرِ.', 'Se-esteykızu mubekkiran li-salâtil-fecri.', 'Sabah namazı için erken uyanacağım.', 'سَأَسْتَيْقِظُ: uyanacağım | مُبَكِّرًا: erkenden | لِصَلَاةِ: namazı için | الْفَجْرِ: sabah/fecir'],
  [160, 'home', 'اللَّهُمَّ بَارِكْ لَنَا فِي بَيْتِنَا وَأَوْلَادِنَا.', 'Allâhumme bârik lenâ fî beytinâ ve evlâdinâ.', 'Allah’ım evimizi ve çocuklarımızı bize mübarek kıl.', 'اللَّهُمَّ: Allah’ım | بَارِكْ: bereketli/mübarek kıl | لَنَا: bize | فِي بَيْتِنَا: evimizde | وَأَوْلَادِنَا: ve çocuklarımızda'],

  // 3. ÇOCUKLAR & EBEVEYNLİK (161-190)
  [161, 'kids', 'قُلْ بِسْمِ اللَّهِ قَبْلَ الطَّعَامِ.', 'Kul bismillâhi kablet-taâmi.', 'Yemekten önce Bismillah de.', 'قُلْ: de/söyle | بِسْمِ اللَّهِ: Allah’ın adıyla | قَبْلَ: önce | الطَّعَامِ: yemekten'],
  [162, 'kids', 'قُلِ الْحَمْدُ لِلَّهِ بَعْدَ الْأَكْلِ.', 'Kulil-hamdulillâhi ba’del-ekli.', 'Yemekten sonra Elhamdülillah de.', 'قُلِ: de | الْحَمْدُ لِلَّهِ: Allah’a hamdolsun | بَعْدَ: sonra | الْأَكْلِ: yemekten'],
  [163, 'kids', 'كُلْ بِيَدِكَ الْيُمْنَى يَا بُنَيَّ.', 'Kul bi-yedikel-yumnâ yâ buneyye.', 'Sağ elinle ye yavrum.', 'كُلْ: ye | بِيَدِكَ: elinle | الْيُمْنَى: sağ | يَا بُنَيَّ: ey oğlum/yavrum'],
  [164, 'kids', 'شَارِكْ أَلْعَابَكَ مَعَ إِخْوَتِكَ.', 'Şârik el’âbeke mea ihvetike.', 'Oyuncaklarını kardeşlerinle paylaş.', 'شَارِكْ: paylaş | أَلْعَابَكَ: oyuncaklarını | مَعَ: ile | إِخْوَتِكَ: kardeşlerin'],
  [165, 'kids', 'لَا تَرْفَعْ صَوْتَكَ فِي الْبَيْتِ.', 'Lâ terfa’ savteke fil-beyti.', 'Evde sesini yükseltme.', 'لَا تَرْفَعْ: yükseltme | صَوْتَكَ: sesini | فِي الْبَيْتِ: evde'],
  [166, 'kids', 'اِعْتَذِرْ مِنْ أَخِيكَ فَوْرًا.', 'İ’tezir min ahîke fevran.', 'Hemen kardeşinden özür dile.', 'اِعْتَذِرْ: özür dile | مِنْ: -den | أَخِيكَ: kardeşinden | فَوْرًا: derhal/hemen'],
  [167, 'kids', 'قَبِّلْ يَدَ جَدِّكَ وَجَدَّتِكَ.', 'Kabbil yede ceddike ve ceddetike.', 'Dedenin ve ninenin elini öp.', 'قَبِّلْ: öp | يَدَ: elini | جَدِّكَ: dedenin | وَجَدَّتِكَ: ve ninenin'],
  [168, 'kids', 'حَافِظْ عَلَى نَظَافَةِ مَلَابِسِكَ.', 'Hâfız alâ nazâfeti melâbisike.', 'Kıyafetlerinin temizliğini koru (temiz tut).', 'حَافِظْ: koru/dikkat et | عَلَى نَظَافَةِ: temizliğine | مَلَابِسِكَ: elbiselerinin'],
  [169, 'kids', 'ارْبِطْ حِذَاءَكَ جَيِّدًا لِئَلَّا تَسْقُطَ.', 'İrbit hizâeke ceyyiden li-ellâ teskuta.', 'Düşmemek için ayakkabını iyi bağla.', 'ارْبِطْ: bağla | حِذَاءَكَ: ayakkabını | جَيِّدًا: iyice | لِئَلَّا: -memek için | تَسْقُطَ: düşmen'],
  [170, 'kids', 'اِلْبَسْ مِعْطَفَكَ، الْجَوُّ مُمْطِرٌ.', 'İlbes mi’tafeke, el-cevvu mumtirun.', 'Montunu giy, hava yağmurlu.', 'اِلْبَسْ: giy | مِعْطَفَكَ: montunu/paltonu | الْجَوُّ: hava | مُمْطِرٌ: yağmurludur'],
  [171, 'kids', 'لَا تَقْتَرِبْ مِنَ التِّلْفَازِ كَثِيرًا.', 'Lâ takterib minet-tilfâzi kesîran.', 'Televizyona çok yaklaşma.', 'لَا تَقْتَرِبْ: yaklaşma | مِنَ التِّلْفَازِ: televizyona | كَثِيرًا: çok'],
  [172, 'kids', 'اِنْتَهَى وَقْتُ الرُّسُومِ الْمُتَحَرِّكَةِ.', 'İntehâ vaktur-rusûmil-muteharriketi.', 'Çizgi film vakti bitti.', 'اِنْتَهَى: bitti | وَقْتُ: vakti | الرُّسُومِ الْمُتَحَرِّكَةِ: çizgi filmin'],
  [173, 'kids', 'هَلْ حَفِظْتَ السُّورَةَ الْجَدِيدَةَ؟', 'Hel hafıztes-sûratel-cedîdete?', 'Yeni sureyi ezberledin mi?', 'هَلْ: mi | حَفِظْتَ: ezberledin | السُّورَةَ: sureyi | الْجَدِيدَةَ: yeni'],
  [174, 'kids', 'تَعَالَ نَقْرَأِ الْقُرْآنَ مَعًا.', 'Teâle nakra’il-Kur’âne mean.', 'Gel birlikte Kur’an okuyalım.', 'تَعَالَ: gel | نَقْرَأِ: okuyalım | الْقُرْآنَ: Kur’an’ı | مَعًا: birlikte'],
  [175, 'kids', 'كَيْفَ كَانَ امْتِحَانُ الرِّيَاضِيَّاتِ؟', 'Keyfe kâne imtihânur-riyâdıyyâti?', 'Matematik sınavı nasıldı?', 'كَيْفَ: nasıl | كَانَ: idi/oldu | امْتِحَانُ: sınavı | الرِّيَاضِيَّاتِ: matematiğin'],
  [176, 'kids', 'أَرِنِي دَفْتَرَكَ لِأُرَاجِعَهُ.', 'Erinî deftereke li-urâciahu.', 'Kontrol etmem için defterini bana göster.', 'أَرِنِي: bana göster | دَفْتَرَكَ: defterini | لِأُرَاجِعَهُ: onu kontrol etmem için'],
  [177, 'kids', 'اِشْرَبِ الْحَلِيبَ لِتَكْبُرَ وَتَقْوَى.', 'İşrabil-halîbe li-tekbura ve takvâ.', 'Büyümek ve güçlenmek için sütü iç.', 'اِشْرَبِ: iç | الْحَلِيبَ: sütü | لِتَكْبُرَ: büyümen için | وَتَقْوَى: ve güçlenmen için'],
  [178, 'kids', 'لَا تَأْكُلِ الْحَلْوَى قَبْلَ الْغَدَاءِ.', 'Lâ te’kulil-halvâ kablel-ğadâi.', 'Öğle yemeğinden önce tatlı/şeker yeme.', 'لَا تَأْكُلِ: yeme | الْحَلْوَى: tatlıyı/şekeri | قَبْلَ: önce | الْغَدَاءِ: öğle yemeğinden'],
  [179, 'kids', 'أَمْسِكْ يَدِي عِنْدَ عُبُورِ الشَّارِعِ.', 'Emsik yedî inde ubûriş-şârii.', 'Caddeden karşıya geçerken elimi tut.', 'أَمْسِكْ: tut | يَدِي: elimi | عِنْدَ: esnasında | عُبُورِ: geçme | الشَّارِعِ: caddeyi'],
  [180, 'kids', 'لَا تَتَكَلَّمْ مَعَ الْغُرَبَاءِ.', 'Lâ tetekellem meal-ğurabâi.', 'Yabancılarla konuşma.', 'لَا تَتَكَلَّمْ: konuşma | مَعَ: ile | الْغُرَبَاءِ: yabancılar'],
  [181, 'kids', 'ضَعْ كُتُبَكَ فِي الْحَقِيبَةِ مُنْذُ الْمَسَاءِ.', 'Da’ kutubeke fil-hakîbeti munzul-mesâi.', 'Kitaplarını akşamdan çantaya koy.', 'ضَعْ: koy | كُتُبَكَ: kitaplarını | فِي الْحَقِيبَةِ: çantaya | مُنْذُ الْمَسَاءِ: akşamdan itibaren'],
  [182, 'kids', 'مَاذَا تُرِيدُ أَنْ تَكُونَ فِي الْمُسْتَقْبَلِ؟', 'Mâzâ turîdu en tekûne fil-mustakbeli?', 'Gelecekte ne olmak istiyorsun?', 'مَاذَا: ne | تُرِيدُ: istiyorsun | أَنْ تَكُونَ: olmayı | فِي الْمُسْتَقْبَلِ: gelecekte'],
  [183, 'kids', 'أَنْتَ وَلَدٌ ذَكِيٌّ وَمُؤَدَّبٌ.', 'Ente veledun zekiyyun ve mueddebun.', 'Sen zeki ve terbiyeli bir çocuksun.', 'أَنْتَ: sen | وَلَدٌ: bir çocuksun | ذَكِيٌّ: zeki | وَمُؤَدَّبٌ: ve edepli/terbiyeli'],
  [184, 'kids', 'قُلِ الصِّدْقَ دَائِمًا وَلَا تَكْذِبْ.', 'Kulis-sıdka dâimen ve lâ tekzib.', 'Her zaman doğruyu söyle ve yalan söyleme.', 'قُلِ: söyle | الصِّدْقَ: doğruyu | دَائِمًا: daima | وَلَا تَكْذِبْ: ve yalan söyleme'],
  [185, 'kids', 'سَاعِدْ أُمَّكَ فِي حَمْلِ الْأَكْيَاسِ.', 'Sâid ummeke fî hamlil-ekyâsi.', 'Poşetleri taşımada annene yardım et.', 'سَاعِدْ: yardım et | أُمَّكَ: annene | فِي حَمْلِ: taşımada | الْأَكْيَاسِ: poşetleri'],
  [186, 'kids', 'هَلْ تَوَضَّأْتَ لِلصَّلَاةِ؟', 'Hel tevadda’te lis-salâti?', 'Namaz için abdest aldın mı?', 'هَلْ: mi | تَوَضَّأْتَ: abdest aldın | لِلصَّلَاةِ: namaz için'],
  [187, 'kids', 'تَعَالَ نُصَلِّ جَمَاعَةً فِي الْبَيْتِ.', 'Teâle nusalli cemâaten fil-beyti.', 'Gel evde cemaatle namaz kılalım.', 'تَعَالَ: gel | نُصَلِّ: namaz kılalım | جَمَاعَةً: cemaat olarak | فِي الْبَيْتِ: evde'],
  [188, 'kids', 'خُذْ دَوَاءَكَ حَتَّى تَشْفَى بِسُرْعَةٍ.', 'Huz devâeke hattâ teşfâ bi-sur’atin.', 'Hızlıca iyileşmek için ilacını al.', 'خُذْ: al | دَوَاءَكَ: ilacını | حَتَّى: -mek için/kadar | تَشْفَى: iyileşmen | بِسُرْعَةٍ: hızla'],
  [189, 'kids', 'أُحِبُّكَ كَثِيرًا يَا قُرَّةَ عَيْنِي.', 'Uhibbuke kesîran yâ kurrate aynî.', 'Seni çok seviyorum ey gözümün nuru.', 'أُحِبُّكَ: seni seviyorum | كَثِيرًا: çok | يَا قُرَّةَ عَيْنِي: ey gözümün nuru'],
  [190, 'kids', 'بَارَكَ اللَّهُ فِيكَ وَحَفِظَكَ مِنْ كُلِّ سُوءٍ.', 'Bârakallâhu fîke ve hafızake min kulli sûin.', 'Allah seni mübarek kılsın ve her kötülükten korusun.', 'بَارَكَ اللَّهُ فِيكَ: Allah seni mübarek kılsın | وَحَفِظَكَ: ve seni korusun | مِنْ كُلِّ: her ...-den | سُوءٍ: kötülükten'],

  // 4. OKUL, SINIF & ÖĞRETMENLİK (191-225)
  [191, 'school', 'اِجْلِسْ فِي مَكَانِكَ يَا بُنَيَّ.', 'İclis fî mekânike yâ buneyye.', 'Yerine otur evladım.', 'اِجْلِسْ: otur | فِي مَكَانِكَ: kendi yerine | يَا بُنَيَّ: ey evladım'],
  [192, 'school', 'تَعَالَ إِلَى السَّبُّورَةِ وَاكْتُبِ الْجُمْلَةَ.', 'Teâle iles-sebbûrati vektubil-cumlete.', 'Tahtaya gel ve cümleyi yaz.', 'تَعَالَ: gel | إِلَى السَّبُّورَةِ: tahtaya | وَاكْتُبِ: ve yaz | الْجُمْلَةَ: cümleyi'],
  [193, 'school', 'اِمْسَحِ السَّبُّورَةَ مِنْ فَضْلِكَ.', 'İmsahis-sebbûrate min fadlike.', 'Lütfen tahtayı sil.', 'اِمْسَحِ: sil | السَّبُّورَةَ: yazı tahtasını | مِنْ فَضْلِكَ: lütfen'],
  [194, 'school', 'كَرِّرُوا بَعْدِي بِصَوْتٍ وَاحِدٍ.', 'Kerrirû ba’dî bi-savtin vâhidin.', 'Benden sonra hep bir ağızdan tekrar edin.', 'كَرِّرُوا: tekrar edin | بَعْدِي: benden sonra | بِصَوْتٍ وَاحِدٍ: tek bir sesle'],
  [195, 'school', 'مَا مَعْنَى هَذِهِ الْكَلِمَةِ بِالتُّرْكِيَّةِ؟', 'Mâ ma’nâ hâzihil-kelimeti bit-turkiyyeti?', 'Bu kelimenin Türkçedeki anlamı nedir?', 'مَا: nedir | مَعْنَى: anlamı | هَذِهِ الْكَلِمَةِ: bu kelimenin | بِالتُّرْكِيَّةِ: Türkçe ile'],
  [196, 'school', 'ضَعْ هَذِهِ الْكَلِمَةَ فِي جُمْلَةٍ مُفِيدَةٍ.', 'Da’ hâzihil-kelimete fî cumletin mufîdetin.', 'Bu kelimeyi anlamlı bir cümle içinde kullan.', 'ضَعْ: koy/kullan | هَذِهِ الْكَلِمَةَ: bu kelimeyi | فِي جُمْلَةٍ: bir cümlede | مُفِيدَةٍ: faydalı/anlamlı'],
  [197, 'school', 'مَا هُوَ جَمْعُ هَذِهِ الْكَلِمَةِ؟', 'Mâ huve cem’u hâzihil-kelimeti?', 'Bu kelimenin çoğulu nedir?', 'مَا هُوَ: nedir | جَمْعُ: çoğulu | هَذِهِ الْكَلِمَةِ: bu kelimenin'],
  [198, 'school', 'مَا هُوَ مُضَادُّ هَذِهِ الْكَلِمَةِ؟', 'Mâ huve mudâddu hâzihil-kelimeti?', 'Bu kelimenin zıt anlamlısı nedir?', 'مَا هُوَ: nedir | مُضَادُّ: zıttı/karşıtı | هَذِهِ الْكَلِمَةِ: bu kelimenin'],
  [199, 'school', 'أَجِبْ عَنِ الْأَسْئِلَةِ التَّالِيَةِ.', 'Ecib anil-es’iletit-tâliyeti.', 'Aşağıdaki soruları cevapla.', 'أَجِبْ: cevap ver | عَنِ الْأَسْئِلَةِ: sorulara | التَّالِيَةِ: gelen/aşağıdaki'],
  [200, 'school', 'اِمْلَأِ الْفَرَاغَاتِ بِالْكَلِمَةِ الْمُنَاسِبَةِ.', 'İmle’il-ferâğâti bil-kelimetil-munâsibeti.', 'Boşlukları uygun kelimeyle doldur.', 'اِمْلَأِ: doldur | الْفَرَاغَاتِ: boşlukları | بِالْكَلِمَةِ: kelimeyle | الْمُنَاسِبَةِ: uygun'],
  [201, 'school', 'لَا تَنْسَ كِتَابَةَ اسْمِكَ عَلَى الْوَرَقَةِ.', 'Lâ tense kitâbete ismike alel-verakati.', 'Kağıdın üzerine adını yazmayı unutma.', 'لَا تَنْسَ: unutma | كِتَابَةَ: yazmayı | اسْمِكَ: adını | عَلَى الْوَرَقَةِ: kağıdın üzerine'],
  [202, 'school', 'بَقِيَتْ خَمْسُ دَقَائِقَ عَلَى نِهَايَةِ الِامْتِحَانِ.', 'Bakiyet hamsu dekâika alâ nihâyetil-imtihâni.', 'Sınavın bitmesine beş dakika kaldı.', 'بَقِيَتْ: kaldı | خَمْسُ دَقَائِقَ: beş dakika | عَلَى نِهَايَةِ: sonuna/bitimine | الِامْتِحَانِ: sınavın'],
  [203, 'school', 'ضَعُوا الْأَقْلَامَ وَسَلِّمُوا الْأَوْرَاقَ.', 'Daû el-eklâme ve sellimû el-evrâka.', 'Kalemleri bırakın ve kağıtları teslim edin.', 'ضَعُوا: bırakın/koyun | الْأَقْلَامَ: kalemleri | وَسَلِّمُوا: ve teslim edin | الْأَوْرَاقَ: kağıtları'],
  [204, 'school', 'لَا تَنْظُرْ إِلَى وَرَقَةِ زَمِيلِكَ.', 'Lâ tenzur ilâ verakati zemîlike.', 'Arkadaşının kağıdına bakma.', 'لَا تَنْظُرْ: bakma | إِلَى وَرَقَةِ: kağıdına | زَمِيلِكَ: sıra arkadaşının'],
  [205, 'school', 'خَطُّكَ جَمِيلٌ وَوَاضِحٌ جِدًّا.', 'Hattuke cemîlun ve vâdıhun cidden.', 'Yazın çok güzel ve okunaklı.', 'خَطُّكَ: el yazın | جَمِيلٌ: güzeldir | وَوَاضِحٌ: ve açıktır/okunaklıdır | جِدًّا: çok'],
  [206, 'school', 'عَلَيْكَ أَنْ تُحَسِّنَ خَطَّكَ قَلِيلًا.', 'Aleyke en tuhassine hattake kalîlen.', 'El yazını biraz güzelleştirmen gerekiyor.', 'عَلَيْكَ: senin üzerine/gerekir | أَنْ تُحَسِّنَ: güzelleştirmen | خَطَّكَ: yazını | قَلِيلًا: biraz'],
  [207, 'school', 'لِمَاذَا تَأَخَّرْتَ عَنِ الدَّرْسِ الْيَوْمَ؟', 'Limâzâ teahharte anid-dersi el-yevme?', 'Bugün derse neden geç kaldın?', 'لِمَاذَا: niçin | تَأَخَّرْتَ: geç kaldın | عَنِ الدَّرْسِ: dersten/derse | الْيَوْمَ: bugün'],
  [208, 'school', 'هَلْ يُمْكِنُنِي الذَّهَابُ إِلَى دَوْرَةِ الْمِيَاهِ؟', 'Hel yumkinunî ez-zehâbu ilâ devratil-miyâhi?', 'Lavaboya gidebilir miyim?', 'هَلْ يُمْكِنُنِي: yapabilir miyim | الذَّهَابُ: gitmek | إِلَى دَوْرَةِ الْمِيَاهِ: lavaboya/tuvalete'],
  [209, 'school', 'تَفَضَّلْ، وَلَكِنْ لَا تَتَأَخَّرْ.', 'Tefaddal, ve lâkin lâ teteahhar.', 'Buyur (git), ama geç kalma.', 'تَفَضَّلْ: buyur | وَلَكِنْ: fakat | لَا تَتَأَخَّرْ: gecikme'],
  [210, 'school', 'رَنَّ الْجَرَسُ، لِنَبْدَأِ الدَّرْسَ.', 'Rennel-cerasu, li-nebde’id-derse.', 'Zil çaldı, derse başlayalım.', 'رَنَّ: çaldı | الْجَرَسُ: zil | لِنَبْدَأِ: başlayalım | الدَّرْسَ: derse'],
  [211, 'school', 'سَأُوَسِّعُ أَوْرَاقَ الْعَمَلِ الْآنَ.', 'Se-uvezzıu evrâkal-ameli el-âne.', 'Şimdi çalışma kağıtlarını dağıtacağım.', 'سَأُوَسِّعُ/سَأُوَزِّعُ: dağıtacağım | أَوْرَاقَ الْعَمَلِ: çalışma kağıtlarını | الْآنَ: şimdi'],
  [212, 'school', 'اِعْمَلُوا فِي مَجْمُوعَاتٍ ثُنَائِيَّةٍ.', 'İ’melû fî mecmûâtin sunâiyyetin.', 'İkili gruplar halinde çalışın.', 'اِعْمَلُوا: çalışın | فِي مَجْمُوعَاتٍ: gruplar halinde | ثُنَائِيَّةٍ: ikili'],
  [213, 'school', 'مَنْ يُرِيدُ أَنْ يَقْرَأَ الْفِقْرَةَ الْأُولَى؟', 'Men yurîdu en yakrael-fıkratel-ûlâ?', 'İlk paragrafı kim okumak ister?', 'مَنْ: kim | يُرِيدُ: ister | أَنْ يَقْرَأَ: okumayı | الْفِقْرَةَ: paragrafı | الْأُولَى: birinci/ilk'],
  [214, 'school', 'لَا تَخَفْ مِنَ الْخَطَأِ، نَحْنُ نَتَعَلَّمُ.', 'Lâ tehaf minel-hata’i, nahnu neteallemu.', 'Hata yapmaktan korkma, biz öğreniyoruz.', 'لَا تَخَفْ: korkma | مِنَ الْخَطَأِ: hatadan | نَحْنُ: biz | نَتَعَلَّمُ: öğreniyoruz'],
  [215, 'school', 'مُسْتَوَاكَ تَحَسَّنَ كَثِيرًا هَذَا الشَّهْرَ.', 'Mustevâke tehassene kesîran hâzeş-şehra.', 'Seviyen bu ay çok gelişti.', 'مُسْتَوَاكَ: senin seviyen | تَحَسَّنَ: iyileşti/gelişti | كَثِيرًا: çok | هَذَا الشَّهْرَ: bu ay'],
  [216, 'school', 'سَأَتَحَدَّثُ مَعَ وَلِيِّ أَمْرِكَ.', 'Se-etehaddesu mea veliyyi emrike.', 'Velinle (anne/babanla) konuşacağım.', 'سَأَتَحَدَّثُ: konuşacağım | مَعَ: ile | وَلِيِّ أَمْرِكَ: senin velin'],
  [217, 'school', 'يَوْمُ اجْتِمَاعِ أَوْلِيَاءِ الْأُمُورِ هُوَ السَّبْتُ.', 'Yevmu ictimâi evliyâil-umûri huves-sebtu.', 'Veli toplantısı günü cumartesidir.', 'يَوْمُ اجْتِمَاعِ: toplantı günü | أَوْلِيَاءِ الْأُمُورِ: velilerin | هُوَ: o | السَّبْتُ: cumartesidir'],
  [218, 'school', 'أَيْنَ مِلَفُّ الصَّفِّ التَّاسِعِ؟', 'Eyne mileffus-saffit-tâsii?', 'Dokuzuncu sınıfın dosyası nerede?', 'أَيْنَ: nerede | مِلَفُّ: dosyası | الصَّفِّ: sınıfın | التَّاسِعِ: dokuzuncu'],
  [219, 'school', 'آلَةُ الطِّبَاعَةِ لَا تَعْمَلُ فِي غُرْفَةِ الْمُعَلِّمِينَ.', 'Âletut-tıbâati lâ ta’melu fî ğurfetil-muallimîne.', 'Öğretmenler odasında yazıcı (fotokopi) çalışmıyor.', 'آلَةُ الطِّبَاعَةِ: yazıcı | لَا تَعْمَلُ: çalışmıyor | فِي غُرْفَةِ الْمُعَلِّمِينَ: öğretmenler odasında'],
  [220, 'school', 'عِنْدِي حِصَّةٌ فَارِغَةٌ بَعْدَ الظُّهْرِ.', 'İndî hissatun fâriğatun ba’dez-zuhri.', 'Öğleden sonra boş bir dersim var.', 'عِنْدِي: benim var | حِصَّةٌ: bir ders | فَارِغَةٌ: boş | بَعْدَ الظُّهْرِ: öğleden sonra'],
  [221, 'school', 'مَتَى تَبْدَأُ الْعُطْلَةُ الصَّيْفِيَّةُ؟', 'Metâ tebdeul-utletus-sayfiyyetu?', 'Yaz tatili ne zaman başlıyor?', 'مَتَى: ne zaman | تَبْدَأُ: başlıyor | الْعُطْلَةُ: tatil | الصَّيْفِيَّةُ: yaz (yazlık)'],
  [222, 'school', 'نَتَمَنَّى لَكُمْ عُطْلَةً سَعِيدَةً وَمُفِيدَةً.', 'Netemennâ lekum utleten saîdeten ve mufîdeten.', 'Size mutlu ve verimli bir tatil dileriz.', 'نَتَمَنَّى: dileriz | لَكُمْ: sizin için | عُطْلَةً: bir tatil | سَعِيدَةً: mutlu | وَمُفِيدَةً: ve faydalı'],
  [223, 'school', 'اِحْتَرِمْ مُعَلِّمِيكَ وَزُمَلَاءَكَ.', 'İhterim muallimîke ve zumelâeke.', 'Öğretmenlerine ve arkadaşlarına saygı göster.', 'اِحْتَرِمْ: saygı göster | مُعَلِّمِيكَ: öğretmenlerine | وَزُمَلَاءَكَ: ve arkadaşlarına'],
  [224, 'school', 'الْعِلْمُ نُورٌ وَالْجَهْلُ ظَلَامٌ.', 'El-ilmu nûrun vel-cehlu zalâmun.', 'İlim nurdur, cehalet karanlıktır.', 'الْعِلْمُ: ilim | نُورٌ: ışıktır/nurdur | وَالْجَهْلُ: ve cehalet | ظَلَامٌ: karanlıktır'],
  [225, 'school', 'مَنْ جَدَّ وَجَدَ، وَمَنْ زَرَعَ حَصَدَ.', 'Men cedde vecede, ve men zeraa hasade.', 'Çalışan kazanır (bulan olur), eken biçer.', 'مَنْ: kim | جَدَّ: çabaladı/çalıştı | وَجَدَ: buldu | وَمَنْ زَرَعَ: ve kim ektiyse | حَصَدَ: biçti'],

  // 5. ZAMAN, SOSYAL HAYAT & DIŞARIDAKİ İŞLER (226-250)
  [226, 'social', 'جُزِيتَ خَيْرًا عَلَى مُسَاعَدَتِكَ.', 'Cuzîte hayran alâ musâadetike.', 'Yardımın için Allah seni hayırla mükafatlandırsın.', 'جُزِيتَ: mükafatlandırıldın | خَيْرًا: hayırla | عَلَى: üzerine/için | مُسَاعَدَتِكَ: yardımın'],
  [227, 'social', 'عَلَى الرَّحْبِ وَالسَّعَةِ، هَذَا وَاجِبِي.', 'Aler-rahbi ves-seati, hâzâ vâcibî.', 'Rica ederim (baş üstüne), bu benim görevim.', 'عَلَى الرَّحْبِ وَالسَّعَةِ: rica ederim/memnuniyetle | هَذَا: bu | وَاجِبِي: görevimdir'],
  [228, 'social', 'أَسْتَأْذِنُكَ الْآنَ، يَجِبُ أَنْ أَنْصَرِفَ.', 'Este’zinuke el-âne, yecibu en ensarife.', 'Şimdi müsaadeni istiyorum, ayrılmam gerekiyor.', 'أَسْتَأْذِنُكَ: senden izin istiyorum | الْآنَ: şimdi | يَجِبُ: gerekir | أَنْ أَنْصَرِفَ: ayrılmam'],
  [229, 'social', 'تَوَكَّلْنَا عَلَى اللَّهِ، لِنَنْطَلِقْ.', 'Tevekkelnâ alallâhi, li-nentalik.', 'Allah’a tevekkül ettik, hadi yola çıkalım.', 'تَوَكَّلْنَا: tevekkül ettik | عَلَى اللَّهِ: Allah’a | لِنَنْطَلِقْ: yola koyulalım'],
  [230, 'social', 'الْمُرُورُ مُزْدَحِمٌ جِدًّا فِي هَذِهِ السَّاعَةِ.', 'El-murûru muzdahimun cidden fî hâzihis-sâati.', 'Bu saatte trafik çok yoğun.', 'الْمُرُورُ: trafik | مُزْدَحِمٌ: kalabalıktır/yoğundur | جِدًّا: çok | فِي هَذِهِ السَّاعَةِ: bu saatte'],
  [231, 'social', 'أُرِيدُ تَعْبِئَةَ الْوَقُودِ بِالْكَامِلِ.', 'Urîdu ta’bietel-vekûdi bil-kâmili.', 'Depoyu tamamen doldurmak (yakıt almak) istiyorum.', 'أُرِيدُ: istiyorum | تَعْبِئَةَ: doldurmayı | الْوَقُودِ: yakıtı | بِالْكَامِلِ: tamamen'],
  [232, 'social', 'حَجَزْتُ مَوْعِدًا عِنْدَ الطَّبِيبِ.', 'Haceztu mev’iden indet-tabîbi.', 'Doktordan randevu aldım.', 'حَجَزْتُ: ayırttım/aldım | مَوْعِدًا: bir randevu | عِنْدَ: yanında/-dan | الطَّبِيبِ: doktorun'],
  [233, 'social', 'أَيْنَ أَقْرَبُ صَيْدَلِيَّةٍ مَفْتُوحَةٍ؟', 'Eyne akrabu saydeliyyetin meftûhatin?', 'En yakın açık eczane nerede?', 'أَيْنَ: nerede | أَقْرَبُ: en yakın | صَيْدَلِيَّةٍ: eczane | مَفْتُوحَةٍ: açık'],
  [234, 'social', 'الْفَاتُورَةُ مِنْ فَضْلِكَ يَا أَخِي.', 'El-fâtûratu min fadlike yâ ahî.', 'Hesap (fatura) lütfen kardeşim.', 'الْفَاتُورَةُ: hesap/fatura | مِنْ فَضْلِكَ: lütfen | يَا أَخِي: ey kardeşim'],
  [235, 'social', 'اِحْتَفِظْ بِالْبَاقِي لِنَفْسِكَ.', 'İhtefız bil-bâkî li-nefsike.', 'Üstü (para üstü) kalsın.', 'اِحْتَفِظْ: sakla/tut | بِالْبَاقِي: kalanı (para üstünü) | لِنَفْسِكَ: kendin için'],
  [236, 'social', 'هَلْ يُوجَدُ مَقَاسٌ أَكْبَرُ مِنْ هَذَا؟', 'Hel yûcedu mekâsun ekberu min hâzâ?', 'Bunun daha büyük bedeni var mı?', 'هَلْ يُوجَدُ: var mı | مَقَاسٌ: beden/ölçü | أَكْبَرُ: daha büyük | مِنْ هَذَا: bundan'],
  [237, 'social', 'السِّعْرُ غَالٍ قَلِيلًا، هَلْ هُنَاكَ تَخْفِيضٌ؟', 'Es-si’ru ğâlin kalîlen, hel hunâke tahfîdun?', 'Fiyat biraz pahalı, indirim var mı?', 'السِّعْرُ: fiyat | غَالٍ: pahalıdır | قَلِيلًا: biraz | هَلْ هُنَاكَ: var mı | تَخْفِيضٌ: indirim'],
  [238, 'social', 'مَتَى يُؤَذِّنُ أَذَانُ الْعِشَاءِ؟', 'Metâ yuezzinu ezânul-işâi?', 'Yatsı ezanı ne zaman okunuyor?', 'مَتَى: ne zaman | يُؤَذِّنُ: okunur | أَذَانُ: ezanı | الْعِشَاءِ: yatsının'],
  [239, 'social', 'تَقَبَّلَ اللَّهُ طَاعَتَكُمْ، جُمُعَةٌ مُبَارَكَةٌ.', 'Tekabbelallâhu tâatekum, cum’atun mubâraketun.', 'Allah ibadetlerinizi kabul etsin, hayırlı cumalar.', 'تَقَبَّلَ اللَّهُ: Allah kabul etsin | طَاعَتَكُمْ: itaatinizi/ibadetinizi | جُمُعَةٌ مُبَارَكَةٌ: mübarek cuma'],
  [240, 'social', 'كُلُّ عَامٍ وَأَنْتُمْ بِخَيْرٍ، عِيدٌ مُبَارَكٌ.', 'Kullu âmin ve entum bi-hayrin, îdun mubârakun.', 'Her yılınız hayırla geçsin, bayramınız mübarek olsun.', 'كُلُّ عَامٍ: her yıl | وَأَنْتُمْ بِخَيْرٍ: siz hayır içinde olun | عِيدٌ مُبَارَكٌ: bayram mübarek'],
  [241, 'social', 'مُبَارَكٌ النَّجَاحُ، أَتَمَنَّى لَكَ التَّوْفِيقَ.', 'Mubârakun en-necâhu, etemennâ leket-tevfîka.', 'Başarın mübarek olsun, sana muvaffakiyet dilerim.', 'مُبَارَكٌ: kutlu/mübarek olsun | النَّجَاحُ: başarı | أَتَمَنَّى لَكَ: sana dilerim | التَّوْفِيقَ: başarı/muvaffakiyet'],
  [242, 'social', 'الْبَقَاءُ لِلَّهِ، عَظَّمَ اللَّهُ أَجْرَكُمْ.', 'El-bekâu lillâhi, azzamallâhu ecrakum.', 'Beka Allah’ındır, başınız sağ olsun (Allah ecrinizi büyütüp sabır versin).', 'الْبَقَاءُ لِلَّهِ: kalıcılık Allah’ındır | عَظَّمَ اللَّهُ: Allah büyütsün | أَجْرَكُمْ: mükafatınızı/ecrinizi'],
  [243, 'social', 'حَمْدًا لِلَّهِ عَلَى سَلَامَتِكَ.', 'Hamden lillâhi alâ selâmetike.', 'Sağ salim kavuştuğuna/kurtulduğuna şükürler olsun (Geçmiş olsun).', 'حَمْدًا لِلَّهِ: Allah’a hamdolsun | عَلَى سَلَامَتِكَ: senin selametine'],
  [244, 'social', 'سَفَرًا سَعِيدًا وَعَوْدًا حَمِيدًا.', 'Seferan saîden ve avden hamîden.', 'Hayırlı yolculuklar, sağ salim gidip dönün.', 'سَفَرًا سَعِيدًا: mutlu yolculuk | وَعَوْدًا: ve dönüş | حَمِيدًا: övülmüş/güzel'],
  [245, 'social', 'تَكَلَّمْ بِبُطْءٍ مِنْ فَضْلِكَ لِأَفْهَمَكَ.', 'Tekellem bi-but’in min fadlike li-efhemeke.', 'Seni anlamam için lütfen yavaş konuş.', 'تَكَلَّمْ: konuş | بِبُطْءٍ: yavaşça | مِنْ فَضْلِكَ: lütfen | لِأَفْهَمَكَ: seni anlamam için'],
  [246, 'social', 'أَنَا أَتَعَلَّمُ اللُّغَةَ الْعَرَبِيَّةَ مُنْذُ سَنَةٍ.', 'Ene eteallemul-luğatel-arabiyyete munzu senetin.', 'Bir yıldır Arapça öğreniyorum.', 'أَنَا أَتَعَلَّمُ: ben öğreniyorum | اللُّغَةَ الْعَرَبِيَّةَ: Arap dilini | مُنْذُ سَنَةٍ: bir yıldan beri'],
  [247, 'social', 'أُرِيدُ أَنْ أُمَارِسَ الْمُحَادَثَةَ مَعَكَ.', 'Urîdu en umârisel-muhâdesete meake.', 'Seninle konuşma pratiği yapmak istiyorum.', 'أُرِيدُ: istiyorum | أَنْ أُمَارِسَ: pratik yapmayı | الْمُحَادَثَةَ: karşılıklı konuşmayı | مَعَكَ: seninle'],
  [248, 'social', 'صَحِّحْ لِي إِذَا أَخْطَأْتُ فِي الْكَلَامِ.', 'Sahhih lî izâ ahta’tu fil-kelâmi.', 'Konuşmada hata yaparsam beni düzelt.', 'صَحِّحْ لِي: benim için düzelt | إِذَا: eğer/-dığında | أَخْطَأْتُ: hata yaptım | فِي الْكَلَامِ: konuşmada'],
  [249, 'social', 'بَلِّغْ سَلَامِي إِلَى جَمِيعِ الْعَائِلَةِ.', 'Belliğ selâmî ilâ cemîil-âileti.', 'Tüm aileye selamımı ilet.', 'بَلِّغْ: ulaştır/ilet | سَلَامِي: selamımı | إِلَى جَمِيعِ: tamamına | الْعَائِلَةِ: ailenin'],
  [250, 'social', 'أَسْتَوْدِعُكُمُ اللَّهَ الَّذِي لَا تَضِيعُ وَدَائِعُهُ.', 'Estevdiukumullâhellezî lâ tadîu vedâiuhu.', 'Sizi, emanetleri zayi olmayan Allah’a emanet ediyorum.', 'أَسْتَوْدِعُكُمُ اللَّهَ: sizi Allah’a emanet ederim | الَّذِي: o ki | لَا تَضِيعُ: kaybolmaz/zayi olmaz | وَدَائِعُهُ: O’nun emanetleri']
];

// İlk 100 cümlenin Kelime Kelime (Kırık Meal) Sözlüğü
const BREAKDOWNS_1_100 = {
  1: 'أُرِيدُ: istiyorum | أَنْ: -mek/-mak | ...: (fiil)',
  2: 'لَا: değil/hayır | أُرِيدُ: istiyorum | أَنْ: -mek/-mak',
  3: 'يَجِبُ: gerekir | عَلَيَّ: benim üzerime | أَنْ: -mem/-mam',
  4: 'يَجِبُ: gerekir | عَلَيْكَ: senin üzerine | أَنْ: -men/-man',
  5: 'هَلْ: mı/mi | يُمْكِنُكَ: senin için mümkün mü (-ebilir misin) | أَنْ: -mek',
  6: 'أَحْتَاجُ: ihtiyacım var | إِلَى: -e/-a | ...: (isim)',
  7: 'أَنَا: ben | ذَاهِبٌ: gidenim/gidiyorum | إِلَى: -e/-a',
  8: 'لَيْسَ: yoktur | عِنْدِي: yanımda/bende | وَقْتٌ: vakit | لِـ: için',
  9: 'مِنْ فَضْلِكَ: lütfundan (lütfen) | أَعْطِنِي: bana ver | ...: (nesne)',
  10: 'أَيْنَ: nereye/nerede | وَضَعْتَ: koydun | ...: (nesne)',
  11: 'أَبْحَثُ: arıyorum | عَنْ: -i / hakkında | ...: (nesne)',
  12: 'نَسِيتُ: unuttum | أَنْ: -meyi/-mayı | ...: (fiil)',
  13: 'سَأَفْعَلُ: yapacağım | هَذَا: bunu | بَعْدَ: -den sonra',
  14: 'مَاذَا: ne | تَفْعَلُ: yapıyorsun | فِي: içinde/-de',
  15: 'لِمَاذَا: niçin/neden | لَمْ: -medi/-madı (geçmiş olumsuzluk)',
  16: 'مَتَى: ne zaman | سَنَذْهَبُ: gideceğiz | إِلَى: -e/-a',
  17: 'أُفَضِّلُ: tercih ederim | ...: (1. şey) | عَلَى: üzerine (-e karşı)',
  18: 'مِنَ الْمُمْكِنِ: mümkündür | أَنْ: -mesi/-ması',
  19: 'أَظُنُّ: sanıyorum/zannediyorum | أَنَّ: ki',
  20: 'لَا أَسْتَطِيعُ: gücüm yetmez/yapamam | أَنْ: -meyi | الْآنَ: şimdi',
  21: 'مَاذَا: ne | سَنَطْبُخُ: pişireceğiz | الْيَوْمَ: bugün',
  22: 'الطَّعَامُ: yemek | جَاهِزٌ: hazırdır | تَعَالَوْا: gelin | إِلَى الْمَائِدَةِ: sofraya',
  23: 'هَلْ: mı | نَحْتَاجُ: ihtiyacımız var | إِلَى شَيْءٍ: bir şeye | مِنَ السُّوقِ: marketten',
  24: 'سَأَعُودُ: döneceğim | إِلَى الْبَيْتِ: eve | فِي السَّاعَةِ: saat ...-de',
  25: 'أَنَا: ben | مُتْعَبٌ: yorgunum | جِدًّا: çok | الْيَوْمَ: bugün',
  26: 'هَلْ: mi | شَرِبْتِ: içtin (sen-kadın) | الْقَهْوَةَ: kahveyi',
  27: 'دَعِينَا: bırak bizi / hadi gel | نَشْرَبِ: içelim | الشَّايَ: çayı | مَعًا: birlikte',
  28: 'مَنْ: kim | سَيَأْخُذُ: alacak | الْأَوْلَادَ: çocukları | مِنَ الْمَدْرَسَةِ: okuldan',
  29: 'هَلْ: mi | دَفَعْتَ: ödedin | فَاتُورَةَ: faturasını | ...: (isim)',
  30: 'الْبَيْتُ: ev | يَحْتَاجُ: ihtiyaç duyuyor | إِلَى تَنْظِيفٍ: temizliğe',
  31: 'سَأُصَلِّي: namaz kılacağım | ثُمَّ: sonra | آتِي: gelirim',
  32: 'جَزَاكِ اللَّهُ: Allah seni mükafatlandırsın | خَيْرًا: hayırla | سَلِمَتْ: sağ/esen olsun | يَدَاكِ: iki elin',
  33: 'مَا: nedir | رَأْيُكِ: senin görüşün/fikrin | فِي: hakkında',
  34: 'سَنَزُورُ: ziyaret edeceğiz | عَائِلَتِي: ailemi | هَذَا الْأُسْبُوعَ: bu hafta',
  35: 'لَا تَنْسَيْ: unutma | أَنْ تُوقِظِينِي: beni uyandırmayı | فِي السَّاعَةِ: saat ...-de',
  36: 'الْجَوُّ: hava | بَارِدٌ: soğuktur | أَغْلِقِ: kapat | النَّافِذَةَ: pencereyi',
  37: 'أَيْنَ: nerede | مِفْتَاحُ: anahtarı | السَّيَّارَةِ: arabanın',
  38: 'سَأَخْرُجُ: çıkacağım | قَلِيلًا: biraz | وَأَعُودُ: ve döneceğim',
  39: 'هَلْ: mı | كُلُّ شَيْءٍ: her şey | عَلَى مَا يُرَامُ: istenildiği gibi / yolunda',
  40: 'تُصْبِحُونَ: sabahlarsınız (sabaha çıkın) | عَلَى خَيْرٍ: hayır üzerine (İyi geceler)',
  41: 'هَيَّا: hadi | اسْتَيْقِظْ: uyan | حَانَ: geldi/yaklaştı | وَقْتُ الْمَدْرَسَةِ: okul vakti',
  42: 'هَلْ: mi | أَكْمَلْتَ: tamamladın/bitirdin | وَاجِبَكَ: ödevini | الْمَنْزِلِيَّ: ev (evsel)',
  43: 'اِغْسِلْ: yıka | يَدَيْكَ: iki elini | قَبْلَ: önce | الْأَكْلِ: yemekten',
  44: 'نَظِّفْ: temizle/fırçala | أَسْنَانَكَ: dişlerini | قَبْلَ النَّوْمِ: uykudan önce',
  45: 'اِلْبَسْ: giy | مَلَابِسَكَ: elbiselerini | بِسُرْعَةٍ: hızla',
  46: 'لَا تَلْعَبْ: oynama | بِالْهَاتِفِ: telefonla | كَثِيرًا: çok',
  47: 'رَتِّبْ: düzenle/topla | غُرْفَتَكَ: odanı | مِنْ فَضْلِكَ: lütfen',
  48: 'مَاذَا: ne | فَعَلْتَ: yaptın | فِي الْمَدْرَسَةِ: okulda | الْيَوْمَ: bugün',
  49: 'كُلْ: ye | طَعَامَكَ: yemeğini | كُلَّهُ: onun tamamını/hepsini',
  50: 'حَانَ: geldi | وَقْتُ النَّوْمِ: uyku vakti | اِذْهَبْ: git | إِلَى فِرَاشِكَ: yatağına',
  51: 'لَا تَتَشَاجَرْ: tartışma/kavga etme | مَعَ: ile | أَخِيكَ: erkek kardeşin | أُخْتِكَ: kız kardeşin',
  52: 'أَنَا: ben | فَخُورٌ: gururluyum | بِكَ: seninle | جِدًّا: çok',
  53: 'اِسْمَعْ: dinle/işit | كَلَامَ: sözünü | أُمِّكَ: annenin',
  54: 'إِذَا: eğer/-dığında | أَكْمَلْتَ: bitirdin | دَرْسَكَ: dersini | سَنَذْهَبُ: gideceğiz | إِلَى الْحَدِيقَةِ: parka',
  55: 'كُنْ: ol | حَذِرًا: dikkatli | لَا تَرْكُضْ: koşma | هُنَا: burada',
  56: 'هَلْ: mı | يُؤْلِمُكَ: sana acı veriyor / ağrıtıyor | شَيْءٌ: bir şey',
  57: 'أَحْضِرْ: getir | حَقِيبَتَكَ: çantanı | وَتَعَالَ: ve gel',
  58: 'أَحْسَنْتَ: güzel yaptın (aferin) | يَا بُنَيَّ: ey yavrum | عَمَلٌ: iş | رَائِعٌ: harika',
  59: 'لَا تَبْكِ: ağlama | أَنَا: ben | هُنَا: burada | مَعَكَ: seninleyim',
  60: 'سَأَحْكِي: anlatacağım | لَكَ: sana | قِصَّةً: bir hikaye | قَبْلَ النَّوْمِ: uykudan önce',
  61: 'السَّلَامُ عَلَيْكُمْ: selam üzerinize olsun | يَا طُلَّابُ: ey öğrenciler | كَيْفَ حَالُكُمُ: haliniz nasıl | الْيَوْمَ: bugün',
  62: 'اِفْتَحُوا: açınız | كُتُبَكُمْ: kitaplarınızı | عَلَى الصَّفْحَةِ: ... sayfasından',
  63: 'اِنْتَبِهُوا: dikkat edin | إِلَيَّ: bana | وَاسْتَمِعُوا: ve dinleyin | جَيِّدًا: iyice',
  64: 'مَنْ: kim | يَعْرِفُ: biliyor | الْجَوَابَ: cevabı | الصَّحِيحَ: doğru',
  65: 'اِرْفَعْ: kaldır | يَدَكَ: elini (parmağını) | قَبْلَ أَنْ: -meden önce | تَتَكَلَّمَ: konuşman',
  66: 'اُكْتُبُوا: yazınız | هَذَا: bunu | عَلَى الدَّفْتَرِ: defterin üzerine',
  67: 'هَلْ فَهِمْتُمُ: anladınız mı | الدَّرْسَ: dersi | أَمْ: yoksa | أُعِيدُ: tekrar edeyim mi | مَرَّةً أُخْرَى: bir kez daha',
  68: 'هَلْ هُنَاكَ: orada var mı | أَيُّ: herhangi bir | سُؤَالٍ: soru',
  69: 'مَنْ هُوَ: kimdir o | الْغَائِبُ: bulunmayan/devamsız | الْيَوْمَ: bugün',
  70: 'هُدُوءً: sessizlik | مِنْ فَضْلِكُمْ: lütfen | لَا تَتَكَلَّمُوا: konuşmayınız',
  71: 'مَوْضُوعُنَا: bizim konumuz | الْيَوْمَ: bugün | هُوَ: odur ki ...',
  72: 'اِقْرَأِ: oku | النَّصَّ: metni | بِصَوْتٍ: bir sesle | مُرْتَفِعٍ: yüksek',
  73: 'الِامْتِحَانُ: sınav | سَيَكُونُ: olacaktır | فِي الْأُسْبُوعِ: haftada | الْقَادِمِ: gelecek',
  74: 'إِجَابَتُكَ: senin cevabın | صَحِيحَةٌ: doğrudur | بَارَكَ اللَّهُ فِيكَ: Allah seni mübarek kılsın',
  75: 'إِجَابَتُكَ: cevabın | قَرِيبَةٌ: yakındır | حَاوِلْ: dene/çabala | مَرَّةً أُخْرَى: bir kez daha',
  76: 'لَا تَنْسَوْا: unutmayınız | أَنْ تُحْضِرُوا: getirmenizi | ...: (nesne) | غَدًا: yarın',
  77: 'عِنْدِي: benim var | حِصَّةٌ: bir dersim | فِي الصَّفِّ: ... sınıfta | الْآنَ: şimdi',
  78: 'سَأُحَضِّرُ: hazırlayacağım | أَسْئِلَةَ: sorularını | الِامْتِحَانِ: sınavın | الْيَوْمَ: bugün',
  79: 'يَجِبُ: gerekir | أَنْ أُدْخِلَ: girmem | الدَّرَجَاتِ: notları/dereceleri | فِي النِّظَامِ: sisteme',
  80: 'لَدَيْنَا: bizim var | اجْتِمَاعٌ: bir toplantımız | مَعَ الْمُدِيرِ: müdürle | وَالْمُعَلِّمِينَ: ve öğretmenlerle',
  81: 'مَا هِيَ: nedir | حِصَّتُكَ: senin dersin | التَّالِيَةُ: sıradaki/sonraki',
  82: 'انْتَهَى: bitti | الدَّرْسُ: ders | يُمْكِنُكُمُ: sizin için mümkündür | الْخُرُوجُ: çıkmak | إِلَى الِاسْتِرَاحَةِ: teneffüse',
  83: 'رَاجِعُوا: gözden geçirin/tekrar edin | هَذَا الْمَوْضُوعَ: bu konuyu | فِي الْبَيْتِ: evde',
  84: 'أَغْلِقُوا: kapatınız | الْكُتُبَ: kitapları | وَاسْتَعِدُّوا: ve hazırlanınız | لِلِاخْتِبَارِ: teste/sınava',
  85: 'أَنَا: ben | الْمُعَلِّمُ: öğretmenim | الْمُنَاوِبُ: nöbetçi | الْيَوْمَ: bugün',
  86: 'كَمِ: kaçtır | السَّاعَةُ: saat | الْآنَ: şu an',
  87: 'تَأَخَّرْنَا: geç kaldık | يَجِبُ: gerekir | أَنْ نُسْرِعَ: acele etmemiz',
  88: 'بِكَمْ: kaça / ne kadara | هَذَا: bu | مِنْ فَضْلِكَ: lütfen',
  89: 'أُرِيدُ: istiyorum | أَنْ أَشْتَرِيَ: satın almayı | كِيلُو مِنْ: ...-den bir kilo',
  90: 'هَلْ يُمْكِنُ: mümkün müdür | الدَّفْعُ: ödeme yapmak | بِالْبِطَاقَةِ: kart ile',
  91: 'فِي الْيَوْمِ التَّالِي: ertesi günde | فِي الْأُسْبُوعِ الْمَاضِي: geçen haftada',
  92: 'سَأَتَّصِلُ: iletişime geçeceğim/arayacağım | بِكَ: seninle | بَعْدَ قَلِيلٍ: birazdan',
  93: 'أَنَا مَشْغُولٌ: ben meşgulüm | الْآنَ: şu an | نَتَكَلَّمُ: konuşuruz | لَاحِقًا: daha sonra',
  94: 'إِنْ شَاءَ اللَّهُ: Allah dilerse | نَلْتَقِي: buluşuruz/görüşürüz | غَدًا: yarın',
  95: 'عَفْوًا: affedersiniz | لَمْ أَفْهَمْ: anlamadım | مَا: şeyi/ne | قُلْتَ: söyledin',
  96: 'كَيْفَ: nasıl | يُمْكِنُنِي: benim için mümkün olur | الذَّهَابُ: gitmek | إِلَى: -e/-a',
  97: 'الْحَمْدُ لِلَّهِ: hamd Allah’adır | عَلَى: üzerine | كُلِّ حَالٍ: her durum/hal',
  98: 'تَقَبَّلَ اللَّهُ: Allah kabul etsin | مِنَّا: bizden | وَمِنْكُمْ: ve sizden',
  99: 'شَفَاكَ اللَّهُ: Allah sana şifa versin | وَعَافَاكَ: ve sana afiyet versin',
  100: 'فِي أَمَانِ اللَّهِ: Allah’ın güvencesinde/emanetinde | مَعَ السَّلَامَةِ: selametle'
};

const parseBreakdownString = (str) => {
  if (!str) return [];
  return str.split('|').map((part) => {
    const [w, ...mParts] = part.trim().split(':');
    return {
      w: (w || '').trim(),
      m: mParts.join(':').trim()
    };
  });
};

// 250 CÜMLENİN TAM BİRLEŞTİRİLMİŞ LİSTESİ (Kırık mealleriyle birlikte)
const INITIAL_PATTERNS = [
  ...BASE_100_PATTERNS.map((p) => ({
    ...p,
    words: parseBreakdownString(BREAKDOWNS_1_100[p.id])
  })),
  ...EXTRA_150_RAW.map(([id, category, ar, trPron, tr, breakdownStr]) => ({
    id,
    category,
    ar,
    trPron,
    tr,
    hasSlot: ar.includes('...'),
    slotType: ar.includes('أَنْ ...') ? 'verb_en' : ar.includes('إِلَى ...') ? 'place' : 'noun',
    words: parseBreakdownString(breakdownStr)
  }))
];

// ==========================================
// 2. VERİ TABANI: ZENGİN KELİME VE DEĞİŞKEN HAVUZU (SÖZLÜK & SLOTLAR)
// ==========================================
const INITIAL_VOCABULARY = [
  // A) "أَنْ" SONRASI BEN KİPİ FİİLLER (verb_en)
  { id: 'v1', ar: 'أَشْرَبَ الشَّايَ', trPron: 'eşrabeş-şâye', tr: 'çay içmek (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ش-ر-ب' },
  { id: 'v2', ar: 'أَشْرَبَ الْقَهْوَةَ', trPron: 'eşrabel-kahvete', tr: 'kahve içmek (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ش-ر-ب' },
  { id: 'v3', ar: 'أَذْهَبَ إِلَى الْمَدْرَسَةِ', trPron: 'ezhebe ilel-medreseti', tr: 'okula gitmek (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ذ-ه-ب' },
  { id: 'v4', ar: 'أَذْهَبَ إِلَى السُّوقِ', trPron: 'ezhebe iles-sûki', tr: 'markete gitmek (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ذ-ه-ب' },
  { id: 'v5', ar: 'أَسْتَرِيحَ قَلِيلًا', trPron: 'esterîha kalîlen', tr: 'biraz dinlenmek (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ر-و-ح' },
  { id: 'v6', ar: 'أُحَضِّرَ الدَّرْسَ', trPron: 'uhaddıred-derse', tr: 'dersi hazırlamak (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ح-ض-ر' },
  { id: 'v7', ar: 'أَقْرَأَ الْكِتَابَ', trPron: 'ekrael-kitâbe', tr: 'kitap okumak (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ق-ر-أ' },
  { id: 'v8', ar: 'أَنَامَ مُبَكِّرًا', trPron: 'enâme mubekkiran', tr: 'erken uyumak (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ن-و-م' },
  { id: 'v9', ar: 'أَتَكَلَّمَ مَعَكَ', trPron: 'etekelleme meake', tr: 'seninle konuşmak (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ك-ل-م' },
  { id: 'v10', ar: 'أُصَلِّيَ الْعَصْرَ', trPron: 'usalliyel-asra', tr: 'ikindi namazını kılmak (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ص-ل-و' },
  { id: 'v11', ar: 'أَشْتَرِيَ الْخُبْزَ', trPron: 'eşteriyel-hubze', tr: 'ekmek satın almak (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ش-ر-ي' },
  { id: 'v12', ar: 'أَغْسِلَ السَّيَّارَةَ', trPron: 'ağsiles-seyyârate', tr: 'arabayı yıkamak (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'غ-س-ل' },
  { id: 'v13', ar: 'أُعَلِّمَ الطُّلَّابَ', trPron: 'uallimet-tullâbe', tr: 'öğrencilere öğretmek (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ع-ل-م' },
  { id: 'v14', ar: 'أَتَعَلَّمَ الْعَرَبِيَّةَ', trPron: 'eteallemel-arabiyyete', tr: 'Arapça öğrenmek (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'ع-ل-م' },
  { id: 'v15', ar: 'أَسْأَلَ سُؤَالًا', trPron: 'es’ele suâlen', tr: 'bir soru sormak (ben)', type: 'verb_en', cat: 'Fiiller (Ben)', root: 'س-أ-ل' },

  // B) "أَنْ" SONRASI SEN KİPİ FİİLLER (verb_en_you)
  { id: 'vy1', ar: 'تُسَاعِدَنِي', trPron: 'tusâidenî', tr: 'bana yardım etmen', type: 'verb_en_you', cat: 'Fiiller (Sen)', root: 'س-ع-د' },
  { id: 'vy2', ar: 'تَدْرُسَ جَيِّدًا', trPron: 'tedruse ceyyiden', tr: 'iyi ders çalışman', type: 'verb_en_you', cat: 'Fiiller (Sen)', root: 'د-ر-س' },
  { id: 'vy3', ar: 'تَفْتَحَ الْبَابَ', trPron: 'teftahal-bâbe', tr: 'kapıyı açman', type: 'verb_en_you', cat: 'Fiiller (Sen)', root: 'ف-ت-ح' },
  { id: 'vy4', ar: 'تَنْتَظِرَ قَلِيلًا', trPron: 'tentazıra kalîlen', tr: 'biraz beklemen', type: 'verb_en_you', cat: 'Fiiller (Sen)', root: 'ن-ظ-ر' },
  { id: 'vy5', ar: 'تَكْتُبَ الْوَاجِبَ', trPron: 'tektubel-vâcibe', tr: 'ödevi yazman', type: 'verb_en_you', cat: 'Fiiller (Sen)', root: 'ك-ت-ب' },
  { id: 'vy6', ar: 'تَسْتَمِعَ إِلَيَّ', trPron: 'testemia ileyye', tr: 'beni dinlemen', type: 'verb_en_you', cat: 'Fiiller (Sen)', root: 'س-م-ع' },
  { id: 'vy7', ar: 'تَشْتَرِيَ الْحَلِيبَ', trPron: 'teşteriyel-halîbe', tr: 'süt alman', type: 'verb_en_you', cat: 'Fiiller (Sen)', root: 'ش-ر-ي' },
  { id: 'vy8', ar: 'تُحْضِرَ الْمَاءَ', trPron: 'tuhdırel-mâe', tr: 'su getirmen', type: 'verb_en_you', cat: 'Fiiller (Sen)', root: 'ح-ض-ر' },

  // C) MEKANLAR VE YERLER (place)
  { id: 'p1', ar: 'الْمَدْرَسَةِ', trPron: 'el-medreseti', tr: 'okul / okula', type: 'place', cat: 'Mekan & Okul', root: 'د-ر-س' },
  { id: 'p2', ar: 'الْبَيْتِ', trPron: 'el-beyti', tr: 'ev / eve', type: 'place', cat: 'Ev & Aile', root: 'ب-ي-ت' },
  { id: 'p3', ar: 'الْمَسْجِدِ', trPron: 'el-mescidi', tr: 'cami / camiye', type: 'place', cat: 'Günlük Hayat', root: 'س-ج-د' },
  { id: 'p4', ar: 'السُّوقِ', trPron: 'es-sûki', tr: 'çarşı / market', type: 'place', cat: 'Günlük Hayat', root: 'س-و-ق' },
  { id: 'p5', ar: 'الْحَدِيقَةِ', trPron: 'el-hadîkati', tr: 'park / bahçe', type: 'place', cat: 'Çocuk & Ebeveyn', root: 'ح-د-ق' },
  { id: 'p6', ar: 'الْمُسْتَشْفَى', trPron: 'el-musteşfâ', tr: 'hastane', type: 'place', cat: 'Günlük Hayat', root: 'ش-ف-ي' },
  { id: 'p7', ar: 'الْمَطْبَخِ', trPron: 'el-matbahı', tr: 'mutfak', type: 'place', cat: 'Ev & Aile', root: 'ط-ب-خ' },
  { id: 'p8', ar: 'الصَّفِّ', trPron: 'es-saffi', tr: 'sınıf', type: 'place', cat: 'Mekan & Okul', root: 'ص-ف-ف' },
  { id: 'p9', ar: 'الْمَكْتَبَةِ', trPron: 'el-mektebeti', tr: 'kütüphane / kırtasiye', type: 'place', cat: 'Mekan & Okul', root: 'ك-ت-ب' },
  { id: 'p10', ar: 'غُرْفَةِ الْمُعَلِّمِينَ', trPron: 'ğurfetil-muallimîne', tr: 'öğretmenler odası', type: 'place', cat: 'Mekan & Okul', root: 'غ-ر-ف' },

  // D) OKUL, EV VE GÜNLÜK İSİMLER (noun)
  { id: 'n1', ar: 'الْكِتَابَ', trPron: 'el-kitâbe', tr: 'kitap', type: 'noun', cat: 'Mekan & Okul', root: 'ك-ت-ب' },
  { id: 'n2', ar: 'الدَّفْتَرَ', trPron: 'ed-deftere', tr: 'defter', type: 'noun', cat: 'Mekan & Okul', root: 'د-ف-ت-ر' },
  { id: 'n3', ar: 'الْقَلَمَ', trPron: 'el-kaleme', tr: 'kalem', type: 'noun', cat: 'Mekan & Okul', root: 'ق-ل-م' },
  { id: 'n4', ar: 'الِامْتِحَانَ', trPron: 'el-imtihâne', tr: 'sınav', type: 'noun', cat: 'Mekan & Okul', root: 'م-ح-ن' },
  { id: 'n5', ar: 'الْوَاجِبَ الْمَنْزِلِيَّ', trPron: 'el-vâcibel-menziliyye', tr: 'ev ödevi', type: 'noun', cat: 'Mekan & Okul', root: 'و-ج-ب' },
  { id: 'n6', ar: 'السَّبُّورَةَ', trPron: 'es-sebbûrate', tr: 'yazı tahtası', type: 'noun', cat: 'Mekan & Okul', root: 'س-ب-ر' },
  { id: 'n7', ar: 'الدَّرَجَاتِ', trPron: 'ed-derecâti', tr: 'sınav notları', type: 'noun', cat: 'Mekan & Okul', root: 'د-ر-ج' },
  { id: 'n8', ar: 'الْمُدِيرَ', trPron: 'el-mudîra', tr: 'okul müdürü', type: 'noun', cat: 'Mekan & Okul', root: 'د-و-ر' },
  { id: 'n9', ar: 'الطُّلَّابَ', trPron: 'et-tullâbe', tr: 'öğrenciler', type: 'noun', cat: 'Mekan & Okul', root: 'ط-ل-ب' },
  { id: 'n10', ar: 'الِاسْتِرَاحَةَ', trPron: 'el-istirâhate', tr: 'teneffüs / dinlenme', type: 'noun', cat: 'Mekan & Okul', root: 'ر-و-ح' },
  { id: 'n11', ar: 'الْمِفْتَاحَ', trPron: 'el-miftâha', tr: 'anahtar', type: 'noun', cat: 'Ev & Aile', root: 'ف-ت-ح' },
  { id: 'n12', ar: 'الْهَاتِفَ', trPron: 'el-hâtife', tr: 'telefon', type: 'noun', cat: 'Ev & Aile', root: 'ه-ت-ف' },
  { id: 'n13', ar: 'الْحَقِيبَةَ', trPron: 'el-hakîbete', tr: 'çanta', type: 'noun', cat: 'Çocuk & Ebeveyn', root: 'ح-ق-ب' },
  { id: 'n14', ar: 'الْمَلَابِسَ', trPron: 'el-melâbise', tr: 'kıyafetler / elbiseler', type: 'noun', cat: 'Çocuk & Ebeveyn', root: 'ل-ب-س' },
  { id: 'n15', ar: 'الْفُطُورَ', trPron: 'el-futûra', tr: 'kahvaltı', type: 'noun', cat: 'Ev & Aile', root: 'ف-ط-ر' },
  { id: 'n16', ar: 'الْعَشَاءَ', trPron: 'el-aşâe', tr: 'akşam yemeği', type: 'noun', cat: 'Ev & Aile', root: 'ع-ش-و' },
  { id: 'n17', ar: 'الْغَدَاءَ', trPron: 'el-ğadâe', tr: 'öğle yemeği', type: 'noun', cat: 'Ev & Aile', root: 'غ-د-و' },
  { id: 'n18', ar: 'الْخُبْزَ', trPron: 'el-hubze', tr: 'ekmek', type: 'noun', cat: 'Ev & Aile', root: 'خ-ب-ز' },
  { id: 'n19', ar: 'الْمَاءَ', trPron: 'el-mâe', tr: 'su', type: 'noun', cat: 'Ev & Aile', root: 'م-و-ه' },
  { id: 'n20', ar: 'الشَّايَ', trPron: 'eş-şâye', tr: 'çay', type: 'noun', cat: 'Ev & Aile', root: 'ش-ا-ي' },
  { id: 'n21', ar: 'الْقَهْوَةَ', trPron: 'el-kahvete', tr: 'kahve', type: 'noun', cat: 'Ev & Aile', root: 'ق-ه-و' },
  { id: 'n22', ar: 'التُّفَّاحِ', trPron: 'et-tuffâhı', tr: 'elma', type: 'noun', cat: 'Ev & Aile', root: 'ت-ف-ح' },
  { id: 'n23', ar: 'الْكَهْرَبَاءِ', trPron: 'el-kehrabâi', tr: 'elektrik', type: 'noun', cat: 'Ev & Aile', root: 'ك-ه-ر-ب' },
  { id: 'n24', ar: 'السَّيَّارَةَ', trPron: 'es-seyyârate', tr: 'araba', type: 'noun', cat: 'Günlük Hayat', root: 'س-ي-ر' },
  { id: 'n25', ar: 'النَّظَّارَةَ', trPron: 'en-nazzârate', tr: 'gözlük', type: 'noun', cat: 'Günlük Hayat', root: 'ن-ظ-ر' },
  { id: 'n26', ar: 'الصَّلَاةِ', trPron: 'es-salâti', tr: 'namaz', type: 'noun', cat: 'Günlük Hayat', root: 'ص-ل-و' },
  { id: 'n27', ar: 'الْمُسَاعَدَةِ', trPron: 'el-musâadeti', tr: 'yardım', type: 'noun', cat: 'Günlük Hayat', root: 'س-ع-د' },
  { id: 'n28', ar: 'الْإِجَازَةِ', trPron: 'el-icâzeti', tr: 'tatil / izin', type: 'noun', cat: 'Günlük Hayat', root: 'ج-و-ز' },
  { id: 'n29', ar: 'الْأَوْلَادَ', trPron: 'el-evlâde', tr: 'çocuklar', type: 'noun', cat: 'Çocuk & Ebeveyn', root: 'و-ل-د' },
  { id: 'n30', ar: 'الْقِصَّةَ', trPron: 'el-kıssate', tr: 'hikaye / öykü', type: 'noun', cat: 'Çocuk & Ebeveyn', root: 'ق-ص-ص' }
];

const CATEGORIES = [
  { id: 'all', name: 'Tümü (250)', icon: Layers, color: 'bg-slate-600' },
  { id: 'joker', name: '1. Joker İskeletler (50)', icon: Sparkles, color: 'bg-emerald-600' },
  { id: 'home', name: '2. Ev & Eş (50)', icon: Home, color: 'bg-teal-600' },
  { id: 'kids', name: '3. Çocuklar & Ebeveyn (50)', icon: Baby, color: 'bg-amber-600' },
  { id: 'school', name: '4. Okul & Öğretmenlik (60)', icon: GraduationCap, color: 'bg-indigo-600' },
  { id: 'social', name: '5. Zaman & Sosyal (40)', icon: Clock, color: 'bg-rose-600' }
];

// ==========================================
// 3. YARDIMCI FONKSİYONLAR: ARAPÇA SESLENDİRME & DİŞİL DÖNÜŞTÜRÜCÜ
// ==========================================
const speakArabic = (text, rate = 0.9, onStartCallback, onEndCallback) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\.\.\./g, '').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ar-SA';
    utterance.rate = rate;

    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((v) => v.lang.includes('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }
    if (onStartCallback) utterance.onstart = onStartCallback;
    if (onEndCallback) {
      utterance.onend = onEndCallback;
      utterance.onerror = onEndCallback;
    }
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error('Seslendirme hatası:', e);
    if (onEndCallback) onEndCallback();
  }
};

// Otomatik Eril -> Dişil Muhatap Dönüştürücü (Özel tanım yoksa kurallı dönüştürür)
const getPatternByGender = (pattern, isFem) => {
  if (!isFem) {
    return { ar: pattern.ar, trPron: pattern.trPron };
  }
  if (pattern.femAr && pattern.femPron) {
    return { ar: pattern.femAr, trPron: pattern.femPron };
  }
  // Genel eril zamir eklerini (-ke -> -ki) dönüştürme yedeği
  const convertedAr = pattern.ar
    .replace(/كَ\b/g, 'كِ')
    .replace(/عَلَيْكَ/g, 'عَلَيْكِ')
    .replace(/يُمْكِنُكَ/g, 'يُمْكِنُكِ')
    .replace(/فَضْلِكَ/g, 'فَضْلِكِ');
  const convertedPron = pattern.trPron
    .replace(/ke\b/g, 'ki')
    .replace(/fadlike/g, 'fadliki')
    .replace(/aleyke/g, 'aleyki');
  return { ar: convertedAr, trPron: convertedPron };
};

// ==========================================
// 4. ANA UYGULAMA BİLEŞENİ (MOBİL-ÖNCELİKLİ & THUMB-ZONE)
// ==========================================
export default function App() {
  // 6 Ergonomik Alt Sekme: 'daily' | 'patterns' | 'broken' | 'lab' | 'vocab' | 'dictionary'
  const [activeTab, setActiveTab] = useState('daily');
  const [dictSubTab, setDictSubTab] = useState('search'); // 'search' | 'quiz' | 'deploy'
  const [isPhoneFrame, setIsPhoneFrame] = useState(true); // Masaüstünde telefon çerçevesi önizlemesi
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedBlock, setCopiedBlock] = useState(null);

  // Kullanıcı İlerleme Verileri (LocalStorage)
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('ar_mastered_patterns');
      return saved ? JSON.parse(saved) : [1, 21, 41, 61];
    } catch {
      return [1, 21, 41, 61];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('ar_bookmarked_patterns');
      return saved ? JSON.parse(saved) : [1, 5, 42, 62];
    } catch {
      return [1, 5, 42, 62];
    }
  });

  const [learnedVocabIds, setLearnedVocabIds] = useState(() => {
    try {
      const saved = localStorage.getItem('ar_learned_vocab');
      return saved ? JSON.parse(saved) : ['v1', 'p1', 'n1'];
    } catch {
      return ['v1', 'p1', 'n1'];
    }
  });

  const [customWords, setCustomWords] = useState(() => {
    try {
      const saved = localStorage.getItem('ar_custom_words');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [dailyCount, setDailyCount] = useState(() => {
    try {
      const saved = localStorage.getItem('ar_daily_count');
      return saved ? Number(saved) : 4;
    } catch {
      return 4;
    }
  });

  const [streak] = useState(5);
  const dailyGoal = 10;

  // LocalStorage Kayıtları
  useEffect(() => {
    try {
      localStorage.setItem('ar_mastered_patterns', JSON.stringify(masteredIds));
    } catch (e) {}
  }, [masteredIds]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_bookmarked_patterns', JSON.stringify(bookmarkedIds));
    } catch (e) {}
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_learned_vocab', JSON.stringify(learnedVocabIds));
    } catch (e) {}
  }, [learnedVocabIds]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_custom_words', JSON.stringify(customWords));
    } catch (e) {}
  }, [customWords]);

  useEffect(() => {
    try {
      localStorage.setItem('ar_daily_count', String(dailyCount));
    } catch (e) {}
  }, [dailyCount]);

  // Sesli Okuma Yardımcıları (Dalga animasyonu destekli)
  const playAudio = useCallback((text, rate = 0.95) => {
    speakArabic(
      text,
      rate,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  }, []);

  const allVocabulary = useMemo(() => [...INITIAL_VOCABULARY, ...customWords], [customWords]);

  // ==========================================
  // BÖLÜM 1: PRATİK (THUMB-ZONE FLASHCARD) STATE'LERİ
  // ==========================================
  const [srsCategory, setSrsCategory] = useState('all');
  const [srsIndex, setSrsIndex] = useState(0);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showFemMode, setShowFemMode] = useState(false);
  const [srsSessionFeedback, setSrsSessionFeedback] = useState(null);

  const srsDeck = useMemo(() => {
    return INITIAL_PATTERNS.filter((p) => srsCategory === 'all' || p.category === srsCategory);
  }, [srsCategory]);

  const currentSrsCard = srsDeck[srsIndex % srsDeck.length] || INITIAL_PATTERNS[0];
  const currentSrsGendered = useMemo(
    () => getPatternByGender(currentSrsCard, showFemMode),
    [currentSrsCard, showFemMode]
  );

  const handleSrsRate = (rating) => {
    setDailyCount((prev) => prev + 1);
    if (rating === 'good' || rating === 'easy') {
      if (!masteredIds.includes(currentSrsCard.id)) {
        setMasteredIds((prev) => [...prev, currentSrsCard.id]);
      }
      setSrsSessionFeedback('Harika! Kalıp hafızaya kaydedildi (+10 XP)');
    } else {
      setSrsSessionFeedback('Tekrar listesine eklendi. Sesli devam!');
    }
    setTimeout(() => setSrsSessionFeedback(null), 1600);
    setIsCardRevealed(false);
    setShowHint(false);
    setSrsIndex((prev) => (prev + 1) % srsDeck.length);
  };

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // ==========================================
  // BÖLÜM 2: LABORATUVAR (MOBİL DİKEY AKIŞLI SLOT-FILLING)
  // ==========================================
  const slotPatterns = useMemo(() => INITIAL_PATTERNS.filter((p) => p.hasSlot), []);
  const [labSlotTypeFilter, setLabSlotTypeFilter] = useState('all'); // 'all' | 'verb' | 'noun'
  const [selectedLabPatternId, setSelectedLabPatternId] = useState(1);
  const [selectedSlotItemId, setSelectedSlotItemId] = useState('v1');

  const filteredSlotPatterns = useMemo(() => {
    if (labSlotTypeFilter === 'verb') {
      return slotPatterns.filter((p) => p.slotType?.startsWith('verb'));
    }
    if (labSlotTypeFilter === 'noun') {
      return slotPatterns.filter((p) => p.slotType === 'noun' || p.slotType === 'place');
    }
    return slotPatterns;
  }, [slotPatterns, labSlotTypeFilter]);

  const currentLabPattern = useMemo(
    () => slotPatterns.find((p) => p.id === Number(selectedLabPatternId)) || slotPatterns[0],
    [selectedLabPatternId, slotPatterns]
  );

  const compatibleSlotItems = useMemo(() => {
    if (!currentLabPattern) return [];
    return allVocabulary.filter((v) => v.type === currentLabPattern.slotType);
  }, [currentLabPattern, allVocabulary]);

  useEffect(() => {
    if (compatibleSlotItems.length > 0) {
      setSelectedSlotItemId(compatibleSlotItems[0].id);
    }
  }, [currentLabPattern, compatibleSlotItems]);

  const currentSlotItem = useMemo(
    () => compatibleSlotItems.find((v) => v.id === selectedSlotItemId) || compatibleSlotItems[0],
    [compatibleSlotItems, selectedSlotItemId]
  );

  const combinedLabSentence = useMemo(() => {
    if (!currentLabPattern || !currentSlotItem) return null;
    const gendered = getPatternByGender(currentLabPattern, showFemMode);
    const fullAr = gendered.ar.replace('...', currentSlotItem.ar);
    const fullPron = gendered.trPron.replace('...', currentSlotItem.trPron);
    const fullTr = currentLabPattern.tr.replace('...', `[${currentSlotItem.tr.replace(' (ben)', '')}]`);
    return { fullAr, fullPron, fullTr };
  }, [currentLabPattern, currentSlotItem, showFemMode]);

  // ==========================================
  // BÖLÜM 3: 250 KALIP & EZBER TESTİ STATE'LERİ
  // ==========================================
  const [patternFilterCat, setPatternFilterCat] = useState('all');
  const [patternSearch, setPatternSearch] = useState('');
  const [onlyUnmastered, setOnlyUnmastered] = useState(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [patternsSubMode, setPatternsSubMode] = useState('memorize'); // 'memorize' | 'list'
  const [memQuizType, setMemQuizType] = useState('tr_to_ar'); // 'tr_to_ar' | 'ar_to_tr' | 'fill_word' | 'self_mask'
  const [memQuestionIdx, setMemQuestionIdx] = useState(0);
  const [memSelectedAnswer, setMemSelectedAnswer] = useState(null);
  const [memScore, setMemScore] = useState(0);
  const [memStreak, setMemStreak] = useState(0);
  const [revealedIdsInMask, setRevealedIdsInMask] = useState([]);

  const filteredPatterns = useMemo(() => {
    return INITIAL_PATTERNS.filter((p) => {
      const matchesCat = patternFilterCat === 'all' || p.category === patternFilterCat;
      const matchesMastery = !onlyUnmastered || !masteredIds.includes(p.id);
      const matchesBookmark = !onlyBookmarked || bookmarkedIds.includes(p.id);
      const q = patternSearch.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.ar.includes(q) ||
        p.tr.toLowerCase().includes(q) ||
        p.trPron.toLowerCase().includes(q);
      return matchesCat && matchesMastery && matchesBookmark && matchesQuery;
    });
  }, [patternFilterCat, patternSearch, onlyUnmastered, onlyBookmarked, masteredIds, bookmarkedIds]);

  const toggleMastered = (id) => {
    setMasteredIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  // 250 Cümle Ezberleme Testi Sorusu Üretici
  const currentMemQuestion = useMemo(() => {
    const pool = filteredPatterns.length >= 4 ? filteredPatterns : INITIAL_PATTERNS;
    const target = pool[memQuestionIdx % pool.length] || INITIAL_PATTERNS[0];

    // Yanıltıcı şıklar (aynı kategoriden öncelikli)
    const otherPool = INITIAL_PATTERNS.filter((p) => p.id !== target.id);
    const d1 = otherPool[(target.id * 3) % otherPool.length];
    const d2 = otherPool[(target.id * 7 + 5) % otherPool.length];
    const d3 = otherPool[(target.id * 11 + 9) % otherPool.length];
    const options = [target, d1, d2, d3].sort((a, b) => ((a.id * 17 + memQuestionIdx) % 5) - ((b.id * 17 + memQuestionIdx) % 5));

    // Boşluk doldurma için hedef cümlenin ilk anlamlı kelimesini gizle
    const cleanArWords = target.ar.replace(/\.\.\./g, '').trim().split(/\s+/);
    const missingWordIdx = cleanArWords.length > 2 ? 1 : 0;
    const missingWord = cleanArWords[missingWordIdx] || cleanArWords[0];
    const maskedSentenceAr = cleanArWords
      .map((w, idx) => (idx === missingWordIdx ? ' [ ؟؟؟ ] ' : w))
      .join(' ');

    const wordOptions = [
      missingWord,
      d1.ar.split(/\s+/)[0],
      d2.ar.split(/\s+/)[0],
      d3.ar.split(/\s+/)[0]
    ].sort();

    return {
      target,
      options,
      missingWord,
      maskedSentenceAr,
      wordOptions
    };
  }, [filteredPatterns, memQuestionIdx]);

  const handleMemAnswer = (choice, isCorrect) => {
    if (memSelectedAnswer !== null) return;
    setMemSelectedAnswer(choice);
    playAudio(currentMemQuestion.target.ar, 0.95);
    setDailyCount((c) => c + 1);
    if (isCorrect) {
      setMemScore((s) => s + 10);
      setMemStreak((st) => st + 1);
      if (!masteredIds.includes(currentMemQuestion.target.id)) {
        setMasteredIds((prev) => [...prev, currentMemQuestion.target.id]);
      }
    } else {
      setMemStreak(0);
    }
  };

  // ==========================================
  // BÖLÜM 3.5: KIRIK MEAL (KELİME KELİME MEAL) STATE'LERİ
  // ==========================================
  const [brokenCatFilter, setBrokenCatFilter] = useState('all');
  const [brokenSearch, setBrokenSearch] = useState('');
  const [hideBrokenTr, setHideBrokenTr] = useState(false);

  const filteredBrokenPatterns = useMemo(() => {
    return INITIAL_PATTERNS.filter((p) => {
      const matchesCat = brokenCatFilter === 'all' || p.category === brokenCatFilter;
      const q = brokenSearch.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.ar.includes(q) ||
        p.tr.toLowerCase().includes(q) ||
        p.trPron.toLowerCase().includes(q) ||
        (p.words && p.words.some((w) => w.w.includes(q) || w.m.toLowerCase().includes(q)));
      return matchesCat && matchesQuery;
    });
  }, [brokenCatFilter, brokenSearch]);

  // ==========================================
  // BÖLÜM 4: KELİMELER (DOKUN-AÇ KARTLAR) STATE'LERİ
  // ==========================================
  const [vocabCatFilter, setVocabCatFilter] = useState('Tümü');
  const [vocabQuizMode, setVocabQuizMode] = useState(true); // Mobilde varsayılan olarak aktif hatırlama açık
  const [flippedVocabIds, setFlippedVocabIds] = useState([]);

  const vocabCategories = ['Tümü', 'Fiiller (Ben)', 'Fiiller (Sen)', 'Mekan & Okul', 'Ev & Aile', 'Çocuk & Ebeveyn', 'Günlük Hayat'];

  const filteredVocab = useMemo(() => {
    return allVocabulary.filter((v) => vocabCatFilter === 'Tümü' || v.cat === vocabCatFilter);
  }, [allVocabulary, vocabCatFilter]);

  const toggleVocabLearned = (id) => {
    setLearnedVocabIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const toggleVocabFlip = (id) => {
    setFlippedVocabIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // ==========================================
  // BÖLÜM 5: SÖZLÜK, HIZLI TEST VE KURULUM REHBERİ
  // ==========================================
  const [dictSearch, setDictSearch] = useState('');
  const [dictDirection, setDictDirection] = useState('all');
  const [newWordForm, setNewWordForm] = useState({ ar: '', trPron: '', tr: '', cat: 'Günlük Hayat', type: 'noun', root: '' });
  const [showAddWordModal, setShowAddWordModal] = useState(false);

  const dictionaryResults = useMemo(() => {
    const q = dictSearch.toLowerCase().trim();
    const words =
      dictDirection === 'patterns'
        ? []
        : allVocabulary.filter(
            (v) =>
              !q ||
              v.ar.includes(q) ||
              v.tr.toLowerCase().includes(q) ||
              v.trPron.toLowerCase().includes(q) ||
              (v.root && v.root.includes(q))
          );

    const patterns =
      dictDirection === 'words'
        ? []
        : INITIAL_PATTERNS.filter(
            (p) =>
              !q ||
              p.ar.includes(q) ||
              p.tr.toLowerCase().includes(q) ||
              p.trPron.toLowerCase().includes(q)
          );

    return { words, patterns };
  }, [dictSearch, dictDirection, allVocabulary]);

  const handleAddCustomWord = (e) => {
    e.preventDefault();
    if (!newWordForm.ar.trim() || !newWordForm.tr.trim()) return;
    const newEntry = {
      id: 'cust_' + Date.now(),
      ar: newWordForm.ar.trim(),
      trPron: newWordForm.trPron.trim() || '-',
      tr: newWordForm.tr.trim(),
      cat: newWordForm.cat,
      type: newWordForm.type,
      root: newWordForm.root.trim() || '-',
      isCustom: true
    };
    setCustomWords((prev) => [newEntry, ...prev]);
    setNewWordForm({ ar: '', trPron: '', tr: '', cat: 'Günlük Hayat', type: 'noun', root: '' });
    setShowAddWordModal(false);
  };

  // Hızlı Konuşma Testi
  const [quizQuestionIdx, setQuizQuestionIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizSelectedOption, setQuizSelectedOption] = useState(null);

  const quizQuestions = useMemo(() => {
    const indices = [0, 20, 27, 40, 41, 60, 61, 69, 79, 86, 94];
    return indices.map((idx) => {
      const correct = INITIAL_PATTERNS[idx];
      const distractors = INITIAL_PATTERNS.filter((p) => p.id !== correct.id)
        .slice((idx * 3) % 70, ((idx * 3) % 70) + 3);
      const options = [correct, ...distractors].sort((a, b) => a.id - b.id);
      return {
        promptTr: correct.tr,
        contextCat: CATEGORIES.find((c) => c.id === correct.category)?.name || 'Günlük',
        correct,
        options
      };
    });
  }, []);

  const currentQuiz = quizQuestions[quizQuestionIdx % quizQuestions.length];

  const handleQuizSelect = (option) => {
    if (quizSelectedOption) return;
    setQuizSelectedOption(option);
    playAudio(option.ar, 0.95);
    if (option.id === currentQuiz.correct.id) {
      setQuizScore((s) => s + 10);
      setDailyCount((c) => c + 1);
    }
  };

  const copyToClipboard = (text, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedBlock(id);
      setTimeout(() => setCopiedBlock(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-start sm:justify-center sm:py-4 font-sans select-none">
      {/* MASAÜSTÜ GÖRÜNÜM KONTROL ÇUBUĞU (Sadece geniş ekranlarda görünür) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md mb-2.5 px-2 text-xs text-slate-300">
        <span className="flex items-center gap-1.5 font-medium">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          Başparmak Ergonomili Mobil Tasarım
        </span>
        <button
          onClick={() => setIsPhoneFrame(!isPhoneFrame)}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 px-3 py-1 rounded-full transition"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          {isPhoneFrame ? 'Geniş Ekran Modu' : 'Mobil Çerçeve Modu'}
        </button>
      </div>

      {/* MOBİL UYGULAMA KONTEYNERİ (THUMB-ZONE MIMARİSİ) */}
      <div
        className={`w-full ${
          isPhoneFrame ? 'max-w-md sm:rounded-[36px] sm:border-[6px] sm:border-slate-800 sm:h-[860px]' : 'max-w-4xl sm:rounded-2xl sm:h-[90vh]'
        } h-[100dvh] bg-slate-50 text-slate-800 shadow-2xl flex flex-col justify-between overflow-hidden relative`}
      >
        {/* ====================================================
            1. ÜST DURUM ÇUBUĞU (COMPACT TOP BAR - GÖRSEL TAKİP)
           ==================================================== */}
        <header className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white px-4 pt-3 pb-2.5 shadow-md shrink-0 z-20">
          <div className="flex items-center justify-between gap-2">
            {/* Başlık & Canlı Ses İndikatörü */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center relative">
                <MessageSquare className="w-5 h-5 text-emerald-300" />
                {isSpeaking && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight leading-tight flex items-center gap-1.5">
                  Arapça Kalıp Ustası
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded-md font-semibold">
                    250 KALIP
                  </span>
                </h1>
                <p className="text-[11px] text-emerald-200/80">
                  {masteredIds.length}/250 Ezber • {learnedVocabIds.length} Kelime
                </p>
              </div>
            </div>

            {/* Sağ Kontroller: Seri + Tek Dokunuşla Eril/Dişil Hitap */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg text-xs font-bold text-amber-300">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {streak}g
              </div>

              <button
                onClick={() => setShowFemMode(!showFemMode)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition active:scale-95 ${
                  showFemMode
                    ? 'bg-pink-600 border-pink-400 text-white shadow-sm'
                    : 'bg-emerald-800/80 border-emerald-600/60 text-emerald-100'
                }`}
                title="Muhatap Cinsiyetini Değiştir"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{showFemMode ? 'Dişil (ـكِ)' : 'Eril (ـكَ)'}</span>
              </button>
            </div>
          </div>

          {/* Günlük Hedef İlerleme Çubuğu */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-emerald-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${Math.min(100, (dailyCount / dailyGoal) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-emerald-200 shrink-0">
              Hedef: {dailyCount}/{dailyGoal}
            </span>
          </div>
        </header>

        {/* ====================================================
            2. ORTA KAYDIRILABİLİR İÇERİK ALANI
           ==================================================== */}
        <main className="flex-1 overflow-y-auto flex flex-col justify-between p-3.5 space-y-3">
          {/* ----------------------------------------------------
              SEKME 1: PRATİK (THUMB-ZONE OPTİMİZE FLASHCARD)
             ---------------------------------------------------- */}
          {activeTab === 'daily' && (
            <div className="flex-1 flex flex-col justify-between gap-3 h-full">
              {/* Kategori Yatay Kaydırma Çubuğu (Pills) */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 shrink-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSrsCategory(cat.id);
                      setSrsIndex(0);
                      setIsCardRevealed(false);
                      setShowHint(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-95 ${
                      srsCategory === cat.id
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {cat.name.split(' (')[0]}
                  </button>
                ))}
              </div>

              {/* Bildirim Toast */}
              {srsSessionFeedback && (
                <div className="bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md animate-bounce">
                  <CheckCircle2 className="w-4 h-4" />
                  {srsSessionFeedback}
                </div>
              )}

              {/* ORTA FLASHCARD (Görsel Odak Alanı) */}
              <div
                onClick={() => {
                  if (!isCardRevealed) {
                    setIsCardRevealed(true);
                    playAudio(currentSrsGendered.ar, 0.9);
                  }
                }}
                className="flex-1 bg-white rounded-3xl shadow-md border border-slate-200/90 p-5 flex flex-col justify-between relative overflow-y-auto cursor-pointer active:bg-slate-50/50 transition"
              >
                {/* Kart Üst Rozetler */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    #{currentSrsCard.id} • {CATEGORIES.find((c) => c.id === currentSrsCard.category)?.name.split('.')[1]?.split('(')[0] || 'Kalıp'}
                  </span>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[11px] font-semibold">
                      {(srsIndex % srsDeck.length) + 1}/{srsDeck.length}
                    </span>
                    <button
                      onClick={() => toggleBookmark(currentSrsCard.id)}
                      className={`p-1.5 rounded-full border transition ${
                        bookmarkedIds.includes(currentSrsCard.id)
                          ? 'bg-amber-50 border-amber-300 text-amber-500'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Kart Merkez İçeriği */}
                <div className="my-auto py-3 text-center space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 block">
                      ÖNCE TÜRKÇE DÜŞÜN, SESLİ ARAPÇA SÖYLE:
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-snug">
                      "{currentSrsCard.tr}"
                    </h2>
                  </div>

                  {/* İpucu Alanı (Kart açılmadan önce) */}
                  {!isCardRevealed && showHint && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 font-medium">
                      İlk kelime ipucu:{' '}
                      <strong dir="rtl" className="font-serif text-base mx-1">
                        {currentSrsGendered.ar.split(' ')[0]}
                      </strong>{' '}
                      ({currentSrsGendered.trPron.split(' ')[0]}...)
                    </div>
                  )}

                  {/* Açılmış Arapça Cevap */}
                  {isCardRevealed ? (
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 space-y-2.5 animate-fade-in">
                      <p
                        dir="rtl"
                        className="text-3xl sm:text-4xl font-bold text-emerald-950 font-serif leading-relaxed"
                      >
                        {currentSrsGendered.ar}
                      </p>
                      <p className="text-base font-bold text-emerald-700 italic">
                        {currentSrsGendered.trPron}
                      </p>

                      {currentSrsCard.femNote && (
                        <p className="text-[11px] text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-lg">
                          💡 {currentSrsCard.femNote}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="py-4 text-slate-400 text-xs flex flex-col items-center gap-1">
                      <span>Cevabı görmek için karta veya aşağıdaki yeşil butona dokunun</span>
                    </div>
                  )}
                </div>

                {/* Kart Alt Bilgi (Dolu Örnek veya Boşluk Kısayolu) */}
                <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-xs" onClick={(e) => e.stopPropagation()}>
                  {!isCardRevealed ? (
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-amber-700 font-bold flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      {showHint ? 'İpucunu Gizle' : 'İlk Kelime İpucu'}
                    </button>
                  ) : currentSrsCard.exampleAr ? (
                    <button
                      onClick={() => playAudio(currentSrsCard.exampleAr, 0.9)}
                      className="text-left text-[11px] text-slate-600 hover:text-emerald-700 flex items-center gap-1.5"
                    >
                      <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        <strong>Örnek:</strong> {currentSrsCard.examplePron} ({currentSrsCard.exampleTr})
                      </span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400">Sesli tekrar konuşmayı hızlandırır</span>
                  )}

                  {currentSrsCard.hasSlot && (
                    <button
                      onClick={() => {
                        setSelectedLabPatternId(currentSrsCard.id);
                        setActiveTab('lab');
                      }}
                      className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1.5 rounded-xl flex items-center gap-1 shrink-0"
                    >
                      <Sliders className="w-3.5 h-3.5" /> Türet
                    </button>
                  )}
                </div>
              </div>

              {/* =========================================================
                  ALT %35 BAŞPARMAK BÖLGESİ (THUMB-ZONE ACTION DECK)
                  Tüm ana etkileşim butonları başparmağın tam altındadır!
                 ========================================================= */}
              <div className="bg-white rounded-3xl p-3.5 shadow-lg border border-slate-200/90 space-y-2.5 shrink-0">
                {/* Hızlı Ses ve Gezinme Satırı */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => {
                      setIsCardRevealed(false);
                      setShowHint(false);
                      setSrsIndex((prev) => (prev - 1 + srsDeck.length) % srsDeck.length);
                    }}
                    className="h-12 rounded-2xl bg-slate-100 active:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Önceki
                  </button>

                  <button
                    onClick={() => playAudio(currentSrsGendered.ar, 0.95)}
                    className="h-12 rounded-2xl bg-emerald-100 active:bg-emerald-200 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-700" /> Dinle 1x
                  </button>

                  <button
                    onClick={() => playAudio(currentSrsGendered.ar, 0.6)}
                    className="h-12 rounded-2xl bg-amber-100 active:bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" /> Yavaş 0.6x
                  </button>

                  <button
                    onClick={() => {
                      setIsCardRevealed(false);
                      setShowHint(false);
                      setSrsIndex((prev) => (prev + 1) % srsDeck.length);
                    }}
                    className="h-12 rounded-2xl bg-slate-100 active:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1"
                  >
                    Sonraki <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Ana Eylem: Kartı Çevir VEYA 4'lü SRS Değerlendirme (Min 54px yükseklik) */}
                {!isCardRevealed ? (
                  <button
                    onClick={() => {
                      setIsCardRevealed(true);
                      playAudio(currentSrsGendered.ar, 0.95);
                    }}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 active:from-emerald-700 active:to-teal-700 text-white font-extrabold text-base shadow-md flex items-center justify-center gap-2.5 transition active:scale-[0.99]"
                  >
                    <Eye className="w-5 h-5" />
                    Cevabı Göster & Sesli Dinle
                  </button>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      onClick={() => handleSrsRate('again')}
                      className="h-14 rounded-2xl bg-rose-50 active:bg-rose-100 border border-rose-200 text-rose-700 font-extrabold text-xs flex flex-col items-center justify-center"
                    >
                      <span>Tekrar</span>
                      <span className="text-[10px] font-normal opacity-75">1 dk</span>
                    </button>
                    <button
                      onClick={() => handleSrsRate('hard')}
                      className="h-14 rounded-2xl bg-amber-50 active:bg-amber-100 border border-amber-200 text-amber-800 font-extrabold text-xs flex flex-col items-center justify-center"
                    >
                      <span>Zor</span>
                      <span className="text-[10px] font-normal opacity-75">Yarın</span>
                    </button>
                    <button
                      onClick={() => handleSrsRate('good')}
                      className="h-14 rounded-2xl bg-emerald-50 active:bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold text-xs flex flex-col items-center justify-center"
                    >
                      <span>İyi</span>
                      <span className="text-[10px] font-normal opacity-75">3 gün</span>
                    </button>
                    <button
                      onClick={() => handleSrsRate('easy')}
                      className="h-14 rounded-2xl bg-emerald-600 active:bg-emerald-700 text-white font-extrabold text-xs shadow-sm flex flex-col items-center justify-center"
                    >
                      <span>Kolay!</span>
                      <span className="text-[10px] font-normal opacity-85">Öğrendim</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ----------------------------------------------------
              SEKME 2: KALIP BİRLEŞTİRME LABORATUVARI (MOBİL AKIŞ)
             ---------------------------------------------------- */}
          {activeTab === 'lab' && (
            <div className="space-y-3.5 pb-4">
              {/* ÜSTTE SABİT (STICKY) CANLI CÜMLE ÖNİZLEME KARTI */}
              {combinedLabSentence && (
                <div className="sticky top-0 z-10 bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-3xl p-4 shadow-lg border border-emerald-700/60 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 px-2.5 py-0.5 rounded-full font-bold">
                      Canlı Kombinasyon (1000+ Cümle)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => playAudio(combinedLabSentence.fullAr, 0.95)}
                        className="bg-amber-400 active:bg-amber-500 text-slate-950 font-extrabold px-3 py-1.5 rounded-xl flex items-center gap-1 text-xs shadow"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Dinle
                      </button>
                      <button
                        onClick={() => playAudio(combinedLabSentence.fullAr, 0.6)}
                        className="bg-white/15 active:bg-white/25 text-white font-bold px-2.5 py-1.5 rounded-xl text-xs"
                      >
                        0.6x
                      </button>
                    </div>
                  </div>

                  <div className="text-center py-1 space-y-1">
                    <p dir="rtl" className="text-2xl sm:text-3xl font-bold font-serif text-amber-300 leading-relaxed">
                      {combinedLabSentence.fullAr}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-emerald-200 italic">
                      {combinedLabSentence.fullPron}
                    </p>
                    <p className="text-xs font-bold text-white bg-white/10 inline-block px-3 py-1 rounded-full">
                      {combinedLabSentence.fullTr}
                    </p>
                  </div>
                </div>
              )}

              {/* ADIM 1: ANA KALIP İSKELETİ SEÇİMİ (Yatay Kaydırılabilir / Filtreli) */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase text-slate-700 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    1. Kalıp İskeleti Seç ({filteredSlotPatterns.length})
                  </h3>
                  <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px] font-bold">
                    {[
                      { id: 'all', label: 'Tümü' },
                      { id: 'verb', label: 'Fiil Alanlar' },
                      { id: 'noun', label: 'İsim/Yer Alanlar' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setLabSlotTypeFilter(t.id)}
                        className={`px-2 py-1 rounded-md transition ${
                          labSlotTypeFilter === t.id ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Yatay Kaydırmalı Kalıp Kartları (Başparmakla Sürükle-Seç) */}
                <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
                  {filteredSlotPatterns.map((p) => {
                    const active = p.id === currentLabPattern.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedLabPatternId(p.id)}
                        className={`shrink-0 w-52 p-3 rounded-2xl border text-right transition flex flex-col justify-between ${
                          active
                            ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div dir="rtl" className="text-lg font-bold text-slate-900 font-serif">
                          {p.ar}
                        </div>
                        <div className="text-left mt-1.5">
                          <div className="text-[11px] font-bold text-emerald-700 italic">{p.trPron}</div>
                          <div className="text-xs font-bold text-slate-700 truncate">{p.tr}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ADIM 2: BOŞLUĞA GELECEK KELİMEYİ DOKUNARAK SEÇ */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    2. Boşluğa (...) Gelecek İfadeye Dokun ({compatibleSlotItems.length})
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold">Otomatik Seslendirir</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {compatibleSlotItems.map((item) => {
                    const isPicked = currentSlotItem?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedSlotItemId(item.id);
                          const gendered = getPatternByGender(currentLabPattern, showFemMode);
                          playAudio(gendered.ar.replace('...', item.ar), 0.95);
                          setDailyCount((c) => c + 1);
                        }}
                        className={`p-3 rounded-2xl border text-left transition active:scale-95 flex flex-col justify-between min-h-[76px] ${
                          isPicked
                            ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/30'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <div dir="rtl" className="text-lg font-bold text-slate-900 font-serif self-end">
                          {item.ar}
                        </div>
                        <div className="mt-1">
                          <div className="text-[11px] font-semibold text-emerald-700 italic leading-tight">
                            {item.trPron}
                          </div>
                          <div className="text-xs font-bold text-slate-800 leading-tight mt-0.5">
                            {item.tr.replace(' (ben)', '')}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------
              SEKME 3: 250 CÜMLE KALIBI & EZBERLEME TEST MERKEZİ
             ---------------------------------------------------- */}
          {activeTab === 'patterns' && (
            <div className="space-y-3 pb-4">
              {/* Üst Mod Seçici: Ezber Test Çalışması vs 250 Cümle Tüm Liste */}
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200 space-y-2.5 sticky top-0 z-10">
                <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setPatternsSubMode('memorize')}
                    className={`py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                      patternsSubMode === 'memorize'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-300" />
                    Ezber Test Çalışması
                  </button>
                  <button
                    onClick={() => setPatternsSubMode('list')}
                    className={`py-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                      patternsSubMode === 'list'
                        ? 'bg-emerald-700 text-white shadow-sm'
                        : 'text-slate-600'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Tüm 250 Kalıp ({filteredPatterns.length})
                  </button>
                </div>

                {/* Kategori Kaydırma (Her iki modda da aktif) */}
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setPatternFilterCat(cat.id);
                        setMemQuestionIdx(0);
                        setMemSelectedAnswer(null);
                      }}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
                        patternFilterCat === cat.id
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Sadece Ezberleme Modunda 4 Farklı Ezber Yöntemi Seçici */}
                {patternsSubMode === 'memorize' ? (
                  <div className="grid grid-cols-4 gap-1 pt-0.5">
                    {[
                      { id: 'tr_to_ar', label: 'TR ➔ AR Test' },
                      { id: 'ar_to_tr', label: 'AR ➔ TR Test' },
                      { id: 'fill_word', label: 'Kelime Bul' },
                      { id: 'self_mask', label: 'Gizle / Ezberle' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          setMemQuizType(m.id);
                          setMemSelectedAnswer(null);
                        }}
                        className={`py-1.5 px-1 rounded-lg text-[10px] font-extrabold border text-center transition ${
                          memQuizType === m.id
                            ? 'bg-amber-50 border-amber-400 text-amber-900'
                            : 'bg-slate-50 border-slate-200 text-slate-500'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 pt-0.5">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={patternSearch}
                        onChange={(e) => setPatternSearch(e.target.value)}
                        placeholder="250 kalıp içinde ara (Türkçe, Arapça, okunuş)..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <button
                        onClick={() => setOnlyUnmastered(!onlyUnmastered)}
                        className={`px-2.5 py-1 rounded-lg font-bold border transition ${
                          onlyUnmastered
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        {onlyUnmastered ? '✓ Sadece Ezberlenmeyenler' : 'Ezberlenmeyenleri Filtrele'}
                      </button>
                      <button
                        onClick={() => setOnlyBookmarked(!onlyBookmarked)}
                        className={`px-2.5 py-1 rounded-lg font-bold border flex items-center gap-1 transition ${
                          onlyBookmarked
                            ? 'bg-amber-50 border-amber-400 text-amber-800'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <Bookmark className="w-3 h-3 fill-current" /> Favoriler ({bookmarkedIds.length})
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ALT MOD 1: 250 CÜMLE EZBERLEME TEST ÇALIŞMASI */}
              {patternsSubMode === 'memorize' && (
                <div className="space-y-3">
                  {memQuizType !== 'self_mask' ? (
                    <div className="bg-white rounded-3xl p-4 shadow-md border border-slate-200 space-y-4">
                      {/* Üst Skor & İlerleme */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                          Cümle #{currentMemQuestion.target.id} • Soru {(memQuestionIdx % filteredPatterns.length) + 1}/{filteredPatterns.length}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                            Seri: {memStreak} 🔥
                          </span>
                          <span className="font-extrabold text-emerald-700">
                            {memScore} Puan
                          </span>
                        </div>
                      </div>

                      {/* Soru Gövdesi */}
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center space-y-2">
                        {memQuizType === 'tr_to_ar' && (
                          <>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                              TÜRKÇE CÜMLENİN ARAPÇASINI SEÇİN:
                            </span>
                            <h3 className="text-lg font-extrabold text-slate-800">
                              "{currentMemQuestion.target.tr}"
                            </h3>
                          </>
                        )}

                        {memQuizType === 'ar_to_tr' && (
                          <>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                              ARAPÇA CÜMLENİN DOĞRU ANLAMINI SEÇİN:
                            </span>
                            <p dir="rtl" className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif leading-relaxed">
                              {currentMemQuestion.target.ar}
                            </p>
                            <div className="flex items-center justify-center gap-2 pt-1">
                              <span className="text-xs font-semibold text-emerald-700 italic">
                                {currentMemQuestion.target.trPron}
                              </span>
                              <button
                                onClick={() => playAudio(currentMemQuestion.target.ar, 0.9)}
                                className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        )}

                        {memQuizType === 'fill_word' && (
                          <>
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700">
                              CÜMLEDEKİ EKSİK ARAPÇA KELİMEYİ BULUN:
                            </span>
                            <p dir="rtl" className="text-2xl font-bold text-slate-900 font-serif leading-relaxed">
                              {currentMemQuestion.maskedSentenceAr}
                            </p>
                            <p className="text-xs font-bold text-slate-600">
                              Anlamı: "{currentMemQuestion.target.tr}"
                            </p>
                          </>
                        )}
                      </div>

                      {/* Şıklar */}
                      <div className="space-y-2">
                        {memQuizType === 'fill_word'
                          ? currentMemQuestion.wordOptions.map((wordOpt, i) => {
                              const isCorrect = wordOpt === currentMemQuestion.missingWord;
                              const isChosen = memSelectedAnswer === wordOpt;
                              let btnClass = 'bg-slate-50 border-slate-200 text-slate-900';
                              if (memSelectedAnswer !== null) {
                                if (isCorrect) btnClass = 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/30';
                                else if (isChosen) btnClass = 'bg-rose-100 border-rose-400 text-rose-900';
                              }
                              return (
                                <button
                                  key={i}
                                  onClick={() => handleMemAnswer(wordOpt, isCorrect)}
                                  dir="rtl"
                                  className={`w-full p-3.5 rounded-2xl border text-center text-xl font-bold font-serif transition active:scale-[0.99] ${btnClass}`}
                                >
                                  {wordOpt}
                                </button>
                              );
                            })
                          : currentMemQuestion.options.map((opt) => {
                              const isCorrect = opt.id === currentMemQuestion.target.id;
                              const isChosen = memSelectedAnswer === opt.id;
                              let btnClass = 'bg-slate-50 border-slate-200 hover:bg-slate-100';
                              if (memSelectedAnswer !== null) {
                                if (isCorrect) btnClass = 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20';
                                else if (isChosen) btnClass = 'bg-rose-50 border-rose-400';
                              }

                              return (
                                <button
                                  key={opt.id}
                                  onClick={() => handleMemAnswer(opt.id, isCorrect)}
                                  className={`w-full p-3.5 rounded-2xl border transition active:scale-[0.99] flex items-center justify-between gap-2 ${btnClass}`}
                                >
                                  {memQuizType === 'tr_to_ar' ? (
                                    <>
                                      <span className="text-[11px] font-semibold text-emerald-700 italic text-left">
                                        {opt.trPron}
                                      </span>
                                      <span dir="rtl" className="text-xl font-bold text-slate-900 font-serif text-right">
                                        {opt.ar}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-xs sm:text-sm font-extrabold text-slate-800 text-left w-full">
                                      {opt.tr}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                      </div>

                      {/* Cevap Sonrası Kırık Meal Özeti & Sonraki Soru Butonu */}
                      {memSelectedAnswer !== null && (
                        <div className="space-y-2.5 pt-1 animate-fade-in">
                          <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-extrabold text-emerald-900">
                                Doğru Cümle & Kırık Meali:
                              </span>
                              <button
                                onClick={() => playAudio(currentMemQuestion.target.ar, 0.9)}
                                className="text-xs font-bold text-emerald-800 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-emerald-200"
                              >
                                <Volume2 className="w-3.5 h-3.5" /> Tekrar Dinle
                              </button>
                            </div>
                            <p dir="rtl" className="text-xl font-bold text-emerald-950 font-serif text-right">
                              {currentMemQuestion.target.ar}
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1" dir="rtl">
                              {currentMemQuestion.target.words?.map((w, idx) => (
                                <span
                                  key={idx}
                                  className="bg-white border border-emerald-200 rounded-lg px-2 py-1 text-[11px] inline-flex items-center gap-1"
                                >
                                  <strong className="font-serif text-sm text-emerald-950">{w.w}</strong>
                                  <span dir="ltr" className="text-slate-600 font-medium">
                                    = {w.m}
                                  </span>
                                </span>
                              ))}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setMemSelectedAnswer(null);
                              setMemQuestionIdx((i) => i + 1);
                            }}
                            className="w-full h-13 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
                          >
                            Sonraki Ezber Sorusu <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* KENDİNİ TEST ET (GİZLE / AÇ HIZLI EZBER LİSTESİ) */
                    <div className="space-y-2.5">
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center justify-between text-xs text-amber-900">
                        <span className="font-bold">
                          Türkçeye bakıp Arapçasını zihinden söyleyin, kontrol için karta dokunun.
                        </span>
                        <button
                          onClick={() =>
                            setRevealedIdsInMask(
                              revealedIdsInMask.length > 0 ? [] : filteredPatterns.map((p) => p.id)
                            )
                          }
                          className="bg-white border border-amber-300 px-2.5 py-1 rounded-xl font-extrabold shrink-0 ml-2"
                        >
                          {revealedIdsInMask.length > 0 ? 'Tümünü Gizle' : 'Tümünü Aç'}
                        </button>
                      </div>

                      {filteredPatterns.map((p) => {
                        const isOpened = revealedIdsInMask.includes(p.id);
                        const isMastered = masteredIds.includes(p.id);
                        return (
                          <div
                            key={p.id}
                            onClick={() => {
                              setRevealedIdsInMask((prev) =>
                                prev.includes(p.id) ? prev.filter((i) => i !== p.id) : [...prev, p.id]
                              );
                              if (!isOpened) playAudio(p.ar, 0.95);
                            }}
                            className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm cursor-pointer transition active:scale-[0.99] space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-slate-500">#{p.id}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMastered(p.id);
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${
                                  isMastered
                                    ? 'bg-emerald-600 border-emerald-600 text-white'
                                    : 'bg-slate-50 border-slate-200 text-slate-600'
                                }`}
                              >
                                {isMastered ? '✓ Ezberlendi' : 'Ezberledim İşaretle'}
                              </button>
                            </div>
                            <p className="text-sm font-extrabold text-slate-800">{p.tr}</p>
                            {isOpened ? (
                              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-1">
                                <p dir="rtl" className="text-2xl font-bold text-emerald-950 font-serif text-right">
                                  {p.ar}
                                </p>
                                <p className="text-xs font-bold text-emerald-700 italic">{p.trPron}</p>
                              </div>
                            ) : (
                              <div className="bg-slate-100 rounded-xl py-2 text-center text-xs font-bold text-slate-500">
                                👁️ Arapçasını Görmek ve Dinlemek İçin Dokun
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ALT MOD 2: TÜM 250 KALIP LİSTESİ */}
              {patternsSubMode === 'list' && (
                <div className="space-y-2.5">
                  {filteredPatterns.map((pattern) => {
                    const isMastered = masteredIds.includes(pattern.id);
                    const isBookmarked = bookmarkedIds.includes(pattern.id);
                    const gendered = getPatternByGender(pattern, showFemMode);

                    return (
                      <div
                        key={pattern.id}
                        className={`bg-white rounded-2xl p-3.5 border shadow-sm transition space-y-2 ${
                          isMastered ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            #{pattern.id} • {CATEGORIES.find((c) => c.id === pattern.category)?.name.split(' (')[0]}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => playAudio(gendered.ar, 0.95)}
                              className="h-9 px-2.5 rounded-xl bg-emerald-50 active:bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center gap-1"
                            >
                              <Volume2 className="w-4 h-4" /> 1x
                            </button>
                            <button
                              onClick={() => playAudio(gendered.ar, 0.6)}
                              className="h-9 px-2 rounded-xl bg-amber-50 active:bg-amber-100 text-amber-800 font-bold text-[11px]"
                            >
                              0.6x
                            </button>
                            <button
                              onClick={() => toggleBookmark(pattern.id)}
                              className={`h-9 w-9 rounded-xl border flex items-center justify-center ${
                                isBookmarked
                                  ? 'bg-amber-50 border-amber-300 text-amber-500'
                                  : 'bg-white border-slate-200 text-slate-400'
                              }`}
                            >
                              <Bookmark className="w-4 h-4 fill-current" />
                            </button>
                            <button
                              onClick={() => toggleMastered(pattern.id)}
                              className={`h-9 w-9 rounded-xl border flex items-center justify-center ${
                                isMastered
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'bg-white border-slate-200 text-slate-400'
                              }`}
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p dir="rtl" className="text-2xl font-bold text-slate-900 font-serif text-right leading-relaxed">
                          {gendered.ar}
                        </p>

                        <div>
                          <p className="text-xs font-bold text-emerald-700 italic">{gendered.trPron}</p>
                          <p className="text-sm font-extrabold text-slate-800 mt-0.5">{pattern.tr}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------
              SEKME 3.5: KIRIK MEAL (250 CÜMLENİN KELİME KELİME ANALİZİ)
             ---------------------------------------------------- */}
          {activeTab === 'broken' && (
            <div className="space-y-3 pb-4">
              {/* Üst Sabit Filtre ve Arama */}
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 space-y-2.5 sticky top-0 z-10">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      250 Cümle Kırık Meal ({filteredBrokenPatterns.length})
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Kelime kutularına dokunarak tek tek telaffuzunu dinleyin
                    </p>
                  </div>

                  <button
                    onClick={() => setHideBrokenTr(!hideBrokenTr)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border flex items-center gap-1 shrink-0 transition ${
                      hideBrokenTr
                        ? 'bg-amber-500 border-amber-500 text-white'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {hideBrokenTr ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {hideBrokenTr ? 'Mealleri Göster' : 'Mealleri Gizle'}
                  </button>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={brokenSearch}
                    onChange={(e) => setBrokenSearch(e.target.value)}
                    placeholder="Cümle veya kelime meali ara (Örn: يَجِبُ, gerekir, okul,#45)..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Kategori Sekmeleri */}
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setBrokenCatFilter(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
                        brokenCatFilter === cat.id
                          ? 'bg-emerald-700 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Kırık Meal Cümle Kartları Listesi */}
              <div className="space-y-3">
                {filteredBrokenPatterns.map((p) => {
                  const catInfo = CATEGORIES.find((c) => c.id === p.category);
                  return (
                    <div
                      key={p.id}
                      className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3"
                    >
                      {/* Üst Bilgi & Ses */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          #{p.id} • {catInfo?.name.split(' (')[0]}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => playAudio(p.ar, 0.95)}
                            className="px-2.5 py-1 rounded-xl bg-emerald-50 active:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> Tümünü Dinle
                          </button>
                          <button
                            onClick={() => playAudio(p.ar, 0.6)}
                            className="px-2 py-1 rounded-xl bg-amber-50 active:bg-amber-100 text-amber-800 font-bold text-[11px]"
                          >
                            0.6x
                          </button>
                        </div>
                      </div>

                      {/* Ana Arapça Cümle */}
                      <div className="text-right border-b border-slate-100 pb-2">
                        <p dir="rtl" className="text-2xl font-bold text-slate-900 font-serif leading-relaxed">
                          {p.ar}
                        </p>
                        <p className="text-xs font-semibold text-emerald-700 italic text-left mt-1">
                          {p.trPron}
                        </p>
                        <p className="text-sm font-extrabold text-slate-800 text-left mt-0.5">
                          {p.tr}
                        </p>
                      </div>

                      {/* KELİME KELİME KIRIK MEAL KUTULARI (Sağdan Sola RTL Akış) */}
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1.5">
                          KELİME KELİME KIRIK MEAL (DİNLEMEK İÇİN KELİMEYE DOKUNUN):
                        </span>
                        <div dir="rtl" className="flex flex-wrap gap-2">
                          {p.words &&
                            p.words.map((item, idx) => (
                              <button
                                key={idx}
                                onClick={() => playAudio(item.w, 0.85)}
                                className="bg-emerald-50/70 hover:bg-emerald-100/80 active:scale-95 border border-emerald-200/90 rounded-2xl px-3 py-2 flex flex-col items-center justify-center min-w-[78px] transition text-center"
                              >
                                <span className="text-lg font-bold font-serif text-emerald-950 leading-snug">
                                  {item.w}
                                </span>
                                <span
                                  dir="ltr"
                                  className={`text-[11px] font-bold text-slate-700 border-t border-emerald-200/60 pt-1 mt-1 w-full ${
                                    hideBrokenTr ? 'blur-sm select-none' : ''
                                  }`}
                                >
                                  {item.m}
                                </span>
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ----------------------------------------------------
              SEKME 4: KELİME & DEĞİŞKEN HAVUZU (DOKUN-AÇ KARTLAR)
             ---------------------------------------------------- */}
          {activeTab === 'vocab' && (
            <div className="space-y-3 pb-4">
              <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 space-y-2.5 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-800">
                      Kalıp İçi Kelime Havuzu ({allVocabulary.length})
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Karta dokunarak anlamı açın ve sesi dinleyin
                    </p>
                  </div>

                  <button
                    onClick={() => setVocabQuizMode(!vocabQuizMode)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition ${
                      vocabQuizMode
                        ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {vocabQuizMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {vocabQuizMode ? 'Test Modu Açık' : 'Hepsini Göster'}
                  </button>
                </div>

                <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                  {vocabCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setVocabCatFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
                        vocabCatFilter === cat
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {filteredVocab.map((word) => {
                  const isLearned = learnedVocabIds.includes(word.id);
                  const isFlipped = flippedVocabIds.includes(word.id);
                  const hideMeaning = vocabQuizMode && !isFlipped;

                  return (
                    <div
                      key={word.id}
                      onClick={() => {
                        if (vocabQuizMode) toggleVocabFlip(word.id);
                        playAudio(word.ar, 0.9);
                      }}
                      className={`bg-white rounded-2xl p-3.5 border shadow-sm transition active:scale-[0.98] cursor-pointer flex flex-col justify-between min-h-[124px] ${
                        isLearned ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                        <span className="text-[10px] font-bold text-slate-400 truncate max-w-[90px]">
                          {word.root && word.root !== '-' ? `Kök: ${word.root}` : word.cat}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => playAudio(word.ar, 0.85)}
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleVocabLearned(word.id)}
                            className={`p-1.5 rounded-lg border ${
                              isLearned
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-white border-slate-200 text-slate-300'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p dir="rtl" className="text-2xl font-bold text-slate-900 font-serif text-right my-1">
                        {word.ar}
                      </p>

                      {hideMeaning ? (
                        <div className="bg-amber-50 border border-amber-200/80 rounded-xl py-1.5 text-center text-[11px] font-bold text-amber-800">
                          Anlam için dokun
                        </div>
                      ) : (
                        <div className="border-t border-slate-100 pt-1.5">
                          <p className="text-[11px] font-semibold text-emerald-700 italic leading-tight">
                            {word.trPron}
                          </p>
                          <p className="text-xs font-extrabold text-slate-800 mt-0.5 leading-tight">
                            {word.tr}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ----------------------------------------------------
              SEKME 5: SÖZLÜK, HIZLI TEST VE CANLIYA ALMA (DEPLOY) REHBERİ
             ---------------------------------------------------- */}
          {activeTab === 'dictionary' && (
            <div className="space-y-3.5 pb-4">
              {/* Alt Mod Seçici: Sözlük | Hızlı Test | Telefona & Web'e Yükle */}
              <div className="grid grid-cols-3 gap-1.5 bg-slate-200/80 p-1 rounded-2xl">
                <button
                  onClick={() => setDictSubTab('search')}
                  className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition ${
                    dictSubTab === 'search' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" /> Sözlük
                </button>
                <button
                  onClick={() => setDictSubTab('quiz')}
                  className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition ${
                    dictSubTab === 'quiz' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-500" /> Hızlı Test
                </button>
                <button
                  onClick={() => setDictSubTab('deploy')}
                  className={`py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition ${
                    dictSubTab === 'deploy' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5 text-rose-500" /> Yükleme
                </button>
              </div>

              {/* 5A: ÇİFT YÖNLÜ SÖZLÜK */}
              {dictSubTab === 'search' && (
                <div className="space-y-3">
                  <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-700">
                        Arapça ⇄ Türkçe Sözlük
                      </span>
                      <button
                        onClick={() => setShowAddWordModal(!showAddWordModal)}
                        className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Kelime Ekle
                      </button>
                    </div>

                    {showAddWordModal && (
                      <form
                        onSubmit={handleAddCustomWord}
                        className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-2"
                      >
                        <input
                          type="text"
                          dir="rtl"
                          required
                          placeholder="Arapça Yazılışı (Örn: الْمُعَلِّمُ)"
                          value={newWordForm.ar}
                          onChange={(e) => setNewWordForm({ ...newWordForm, ar: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-serif"
                        />
                        <input
                          type="text"
                          placeholder="Okunuşu (Örn: el-muallimu)"
                          value={newWordForm.trPron}
                          onChange={(e) => setNewWordForm({ ...newWordForm, trPron: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                        />
                        <input
                          type="text"
                          required
                          placeholder="Türkçe Anlamı (Örn: öğretmen)"
                          value={newWordForm.tr}
                          onChange={(e) => setNewWordForm({ ...newWordForm, tr: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                        />
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setShowAddWordModal(false)}
                            className="text-xs text-slate-500 px-3 py-1"
                          >
                            İptal
                          </button>
                          <button
                            type="submit"
                            className="bg-emerald-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg"
                          >
                            Kaydet
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={dictSearch}
                        onChange={(e) => setDictSearch(e.target.value)}
                        placeholder="Türkçe, Arapça veya okunuş yazın (Örn: okul, şeribe, مدرسة)..."
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 divide-y divide-slate-100">
                    {dictionaryResults.words.map((w) => (
                      <div key={w.id} className="py-2.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => playAudio(w.ar, 0.85)}
                            className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <div>
                            <div className="text-xs font-extrabold text-slate-800">{w.tr}</div>
                            <div className="text-[11px] text-emerald-700 italic">{w.trPron}</div>
                          </div>
                        </div>
                        <div dir="rtl" className="text-xl font-bold text-slate-900 font-serif">
                          {w.ar}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5B: HIZLI REFLEKS TESTİ */}
              {dictSubTab === 'quiz' && (
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                      {currentQuiz.contextCat}
                    </span>
                    <span className="text-sm font-extrabold text-amber-500">Puan: {quizScore}</span>
                  </div>

                  <div className="text-center py-2">
                    <p className="text-[10px] font-bold uppercase text-slate-400">BU CÜMLENİN ARAPÇASI HANGİSİ?</p>
                    <p className="text-lg font-extrabold text-slate-800 mt-1">"{currentQuiz.promptTr}"</p>
                  </div>

                  <div className="space-y-2">
                    {currentQuiz.options.map((opt) => {
                      const isSelected = quizSelectedOption?.id === opt.id;
                      const isCorrect = opt.id === currentQuiz.correct.id;
                      let style = 'bg-slate-50 border-slate-200';
                      if (quizSelectedOption) {
                        if (isCorrect) style = 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20';
                        else if (isSelected) style = 'bg-rose-50 border-rose-400';
                      }
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleQuizSelect(opt)}
                          className={`w-full p-3.5 rounded-2xl border text-right transition flex items-center justify-between gap-2 ${style}`}
                        >
                          <span className="text-xs text-emerald-700 italic text-left">{opt.trPron}</span>
                          <span dir="rtl" className="text-xl font-bold font-serif">
                            {opt.ar}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSelectedOption && (
                    <button
                      onClick={() => {
                        setQuizSelectedOption(null);
                        setQuizQuestionIdx((i) => i + 1);
                      }}
                      className="w-full h-12 rounded-2xl bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-1.5"
                    >
                      Sonraki Soru <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* 5C: KODLARI NEREYE YÜKLEYEBİLİRİZ? (VERCEL / CLOUDFLARE / PWA KURULUM REHBERİ) */}
              {dictSubTab === 'deploy' && (
                <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-200 space-y-4 text-xs leading-relaxed">
                  <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-4 rounded-2xl space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                      Ücretsiz & Reklamsız Yayınlama
                    </span>
                    <h3 className="text-base font-extrabold">
                      Bu Uygulamayı Telefonunuza ve İnternete Nasıl Yüklersiniz?
                    </h3>
                    <p className="text-emerald-100 text-[11px]">
                      Bu tek dosyalık React kodunu tamamen ücretsiz olarak 3 farklı yöntemle yayınlayıp telefonunuzun ana ekranına gerçek bir mobil uygulama (PWA) gibi kurabilirsiniz.
                    </p>
                  </div>

                  {/* Yöntem 1: Vercel + GitHub */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-emerald-600" />
                      1. En Profesyonel Yöntem: Vercel veya Cloudflare Pages (Ücretsiz)
                    </h4>
                    <p className="text-slate-600">
                      Bilgisayarınızda veya GitHub üzerinde hızlı bir Vite + React projesi oluşturup bu kodu <code>src/App.jsx</code> içine yapıştırarak 1 dakikada yayına alabilirsiniz:
                    </p>
                    <div className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-[11px] overflow-x-auto space-y-1">
                      <div>npm create vite@latest arapca-ustasi -- --template react</div>
                      <div>cd arapca-ustasi</div>
                      <div>npm install lucide-react tailwindcss</div>
                    </div>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                      <li>
                        Oluşan projede <code>src/App.jsx</code> dosyasının içini tamamen silip sağdaki editördeki kodu yapıştırın.
                      </li>
                      <li>
                        Projeyi <strong>GitHub</strong> hesabınıza yükleyin ve <strong>vercel.com</strong> (veya <strong>pages.cloudflare.com</strong>) adresine girip <em>"Add New Project"</em> diyerek deponuzu seçin.
                      </li>
                      <li>
                        Kendi alan adınız varsa (örneğin Cloudflare üzerinden) <code>arapca.alanadiniz.com</code> şeklinde CNAME kaydıyla ücretsiz bağlayabilirsiniz.
                      </li>
                    </ul>
                  </div>

                  {/* Yöntem 2: Bilgisayar Olmadan Anında Yayınlama */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                    <h4 className="font-extrabold text-amber-950 text-sm flex items-center gap-1.5">
                      <Rocket className="w-4 h-4 text-amber-600" />
                      2. Hiç Kurulum Yapmadan (Tarayıcıdan 30 Saniyede): StackBlitz / CodeSandbox
                    </h4>
                    <p className="text-amber-900">
                      Bilgisayarınıza hiçbir program kurmadan doğrudan tarayıcıdan yayınlamak isterseniz:
                    </p>
                    <ol className="list-decimal list-inside text-amber-900 space-y-1">
                      <li>
                        <strong>stackblitz.com</strong> veya <strong>codesandbox.io</strong> sitesine girip <em>"React + Tailwind"</em> şablonu açın.
                      </li>
                      <li>
                        <code>App.jsx</code> içine bu kodu yapıştırın ve sol menüden <code>lucide-react</code> paketini ekleyin.
                      </li>
                      <li>
                        Üstteki <strong>Share / Deploy</strong> butonuna basarak size özel canlı uygulama linkini alın!
                      </li>
                    </ol>
                  </div>

                  {/* Yöntem 3: Telefona Uygulama Olarak Kurma (PWA) */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                    <h4 className="font-extrabold text-emerald-950 text-sm flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-700" />
                      3. Telefona "Ana Ekrana Ekle" (PWA) ile Tam Ekran Kurulum
                    </h4>
                    <p className="text-emerald-900">
                      Uygulamayı yayınladıktan sonra telefonunuzdan linki açın:
                    </p>
                    <ul className="list-disc list-inside text-emerald-900 space-y-1">
                      <li>
                        <strong>Android (Chrome):</strong> Sağ üstteki üç noktaya (⋮) dokunun ve <strong>"Ana ekrana ekle / Uygulamayı yükle"</strong> seçeneğine basın.
                      </li>
                      <li>
                        <strong>iPhone (Safari):</strong> Alt ortadaki <strong>Paylaş</strong> simgesine dokunun ve <strong>"Ana Ekrana Ekle"</strong> seçeneğine basın.
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* ====================================================
            3. ALT NAVİGASYON ÇUBUĞU (FIXED BOTTOM TAB BAR)
            Başparmağın en kolay ulaştığı yeşil bölgede 6 ana sekme
           ==================================================== */}
        <nav className="bg-white border-t border-slate-200 px-1.5 py-1.5 shrink-0 z-20 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-6 gap-0.5">
            {[
              { id: 'daily', label: 'Pratik', icon: Repeat },
              { id: 'patterns', label: '250 Ezber', icon: Trophy },
              { id: 'broken', label: 'Kırık Meal', icon: BookOpen },
              { id: 'lab', label: 'Laboratuvar', icon: Sliders },
              { id: 'vocab', label: 'Kelimeler', icon: Brain },
              { id: 'dictionary', label: 'Sözlük', icon: Search }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center py-1.5 rounded-2xl transition active:scale-95 min-h-[52px] ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-extrabold'
                      : 'text-slate-400 hover:text-slate-600 font-medium'
                  }`}
                >
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-emerald-600 stroke-[2.5]' : ''}`} />
                  <span className="text-[9.5px] sm:text-[10px] mt-1 tracking-tight leading-none">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
