export interface WeddingInfo {
  groom: {
    name: string;
    grandparents: string;
    parents: string;
  };
  bride: {
    name: string;
    father: string;
  };
  event: {
    title: string;
    dateFormatted: string;
    hijriDate: string;
    isoDateTime: string; // for countdown and calendar
    timeText: string;
    dinnerText: string;
    venueName: string;
    venueAddress: string;
    googleMapsUrl: string;
  };
  residence: {
    line1: string;
    line2: string;
    cityPincode: string;
  };
  duaText: {
    bismillah: string;
    bismillahEnglish: string;
    parentsPrayer: string;
    sunnahDuaArabic: string;
    sunnahDuaTransliteration: string;
    sunnahDuaTranslation: string;
    quranicVerseArabic: string;
    quranicVerseTranslation: string;
    quranicVerseRef: string;
  };
  poetry: {
    intro: string;
    compliments: string;
    giftNote: string;
  };
  contact: {
    whatsappDefaultNumber: string;
    defaultGuestName: string;
  };
}

export const weddingDetails: WeddingInfo = {
  groom: {
    name: "Mohammed Sinan",
    grandparents: "Grand S/o. Marhoom P. Hammabba Beary & Marhoom Mohammad Abdullah Sheikh",
    parents: "Mrs. & Mr. Mohammed Hussain Beary",
  },
  bride: {
    name: "Aysha Zohara",
    father: "D/o. Abdul Lateef Ibrahim",
  },
  event: {
    title: "Wedding Ceremony & Reception",
    dateFormatted: "Thursday, 31st December, 2026",
    hijriDate: "21st Rajab, 1448 H.",
    isoDateTime: "2026-12-31T18:30:00+05:30",
    timeText: "After Namaz Maghrib (~6:30 PM)",
    dinnerText: "Followed by Dinner till 10:00 PM",
    venueName: "Unity Hall",
    venueAddress: "Thokkottu, Mangalore, Karnataka",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Unity+Hall+Thokkottu+Mangalore",
  },
  residence: {
    line1: "Sugandh Palace, Nityanand Nagar,",
    line2: "Ghatkopar (West),",
    cityPincode: "Mumbai - 400 086",
  },
  duaText: {
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahEnglish: "IN THE NAME OF ALLAH THE MOST BENEFICENT & MOST MERCIFUL",
    parentsPrayer: "Oh Allah guide this marriage to the best of understanding, happiness, prosperity & success — Ameen.",
    sunnahDuaArabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    sunnahDuaTransliteration: "Baarakallahu laka wa baaraka 'alayka wa jama'a baynakumaa fee khayr",
    sunnahDuaTranslation: "May Allah bless you, shower His blessings upon you, and unite you both in goodness.",
    quranicVerseArabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    quranicVerseTranslation: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.",
    quranicVerseRef: "Surah Ar-Rum (30:21)",
  },
  poetry: {
    intro: "A Day of togetherness, a moment of joy and emotions,\na dream of every parent today a reality of us.",
    compliments: "Relatives & Friends",
    giftNote: "YOUR PRESENCE & DUA IS OUR GREATEST GIFT",
  },
  contact: {
    whatsappDefaultNumber: "919876543210", // Fallback number, can also be customized via query param ?phone=...
    defaultGuestName: "Honored Guest",
  },
};
