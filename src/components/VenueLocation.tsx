import React from 'react';
import { WeddingInfo } from '../data/weddingDetails';
import { MapPin, Navigation, Calendar as CalendarIcon, Download } from 'lucide-react';

interface VenueLocationProps {
  wedding: WeddingInfo;
}

export const VenueLocation: React.FC<VenueLocationProps> = ({ wedding }) => {
  // Generate Google Calendar Link
  const handleAddToGoogleCalendar = () => {
    const startDate = "20261231T130000Z"; // approx 18:30 IST is 13:00 UTC
    const endDate = "20261231T170000Z";   // 22:30 IST is 17:00 UTC
    const title = encodeURIComponent(`Wedding Ceremony - ${wedding.groom.name} & ${wedding.bride.name}`);
    const details = encodeURIComponent(
      `In the Name of Allah, Mrs. & Mr. Mohammed Hussain Beary cordially invite you to the wedding ceremony of their son ${wedding.groom.name} with ${wedding.bride.name}.\n\nNikah: After Namaz Maghrib\nDinner: Followed by Dinner till 10:00 PM\nVenue: ${wedding.event.venueName}, ${wedding.event.venueAddress}`
    );
    const location = encodeURIComponent(`${wedding.event.venueName}, ${wedding.event.venueAddress}`);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Generate and download .ics file for Apple Calendar & Outlook
  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mohammed Sinan & Aysha Zohara Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-sinan-aysha-20261231@dollyeo',
      'DTSTART:20261231T130000Z',
      'DTEND:20261231T170000Z',
      `SUMMARY:Wedding Ceremony - ${wedding.groom.name} & ${wedding.bride.name}`,
      `DESCRIPTION:Mrs. & Mr. Mohammed Hussain Beary solicit your blessings for the wedding ceremony of ${wedding.groom.name} with ${wedding.bride.name}. Nikah after Maghrib, dinner till 10 PM.`,
      `LOCATION:${wedding.event.venueName}, ${wedding.event.venueAddress}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-sinan-aysha.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-14 px-4 relative z-10">
      <div className="max-w-2xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <p className="font-arabic text-xl text-champagne-gold mb-1">
            مَوْقِعُ الحَفْل
          </p>
          <h2 className="font-elegant text-2xl sm:text-3xl text-maroon-900 font-semibold">
            Wedding Venue & Location
          </h2>
          <p className="font-body text-xs sm:text-sm text-soft-black/60 mt-1">
            We eagerly anticipate welcoming you and your family
          </p>
        </div>

        {/* Venue Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-champagne-gold/30 shadow-xl text-center">
          <div className="w-14 h-14 rounded-full bg-maroon-50 border border-maroon-200/50 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-7 h-7 text-maroon-700" />
          </div>

          <h3 className="font-elegant text-2xl sm:text-3xl font-bold text-maroon-900">
            {wedding.event.venueName}
          </h3>
          <p className="font-body text-sm sm:text-base text-soft-black/80 mt-1">
            {wedding.event.venueAddress}
          </p>
          <p className="font-elegant text-xs text-soft-black/50 mt-1 italic">
            (Nikah After Namaz Maghrib • Dinner till 10:00 PM)
          </p>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
            {/* Google Maps Directions */}
            <a
              href={wedding.event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-maroon-800 text-cream font-elegant text-xs uppercase tracking-widest font-semibold hover:bg-maroon-900 transition-all shadow-md group"
            >
              <Navigation className="w-4 h-4 text-champagne-gold group-hover:rotate-45 transition-transform" />
              <span>Get Directions</span>
            </a>

            {/* Google Calendar */}
            <button
              onClick={handleAddToGoogleCalendar}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white text-maroon-900 border border-champagne-gold/40 font-elegant text-xs uppercase tracking-widest font-semibold hover:bg-champagne-gold/10 transition-all shadow-sm"
            >
              <CalendarIcon className="w-4 h-4 text-champagne-gold" />
              <span>Google Calendar</span>
            </button>

            {/* Apple / Outlook iCal */}
            <button
              onClick={handleDownloadICS}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white text-maroon-900 border border-champagne-gold/40 font-elegant text-xs uppercase tracking-widest font-semibold hover:bg-champagne-gold/10 transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-maroon-700" />
              <span>Apple / iCal</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
