"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Download, 
  CheckCircle2, 
  Search, 
  Send,
  Ticket,
  X
} from "lucide-react";
import confetti from "canvas-confetti";

export default function EventsPage() {
  const { isNepali, l } = useLanguage();
  const { events, registerForEvent } = useData();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Registration Modal State
  const [registeringEvent, setRegisteringEvent] = useState<any>(null);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regSuccessTicket, setRegSuccessTicket] = useState<any>(null);

  const categories = [
    "All",
    "World Hemophilia Day",
    "Conference",
    "CME Training",
    "Youth Camp",
    "Webinar"
  ];

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.title.np.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.en.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === "All" || evt.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registeringEvent) return;

    registerForEvent(registeringEvent.id, regName, regEmail);

    const ticketNumber = `NHS-TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    setRegSuccessTicket({
      event: registeringEvent,
      name: regName,
      email: regEmail,
      ticketNumber,
      date: registeringEvent.date,
      time: registeringEvent.time,
      location: l(registeringEvent.location),
    });

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <Calendar className="w-3.5 h-3.5" />
            <span>{isNepali ? "कार्यक्रम तथा क्यालेन्डर" : "Events, Conferences & Campaigns"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "आगामी सम्मेलन, जनचेतना र प्रशिक्षण कार्यक्रमहरू" : "NHS Events, World Hemophilia Day & CME Workshops"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "विश्व हेमोफिलिया दिवस, राष्ट्रिय सम्मेलन, स्वास्थ्य शिविर तथा चिकित्सक तालिममा सहभागी हुन अनलाइन दर्ता गर्नुहोस्।"
              : "Register for national conferences, youth empowerment camps, clinical webinars, and annual World Hemophilia Day walks."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Search & Category Filter */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search event by title, city, or topic..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              id={evt.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <img
                    src={evt.image}
                    alt={l(evt.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-primary-900/85 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {evt.category}
                  </div>
                  {evt.isOnline && (
                    <div className="absolute top-3 right-3 bg-teal-600 text-white px-3 py-1 rounded-full text-[10px] font-bold">
                      ● Online Webinar
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-bold text-accent">
                      <Calendar className="w-4 h-4" /> {evt.date} {evt.endDate ? `– ${evt.endDate}` : ""}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" /> {evt.time}
                    </span>
                  </div>

                  <h2 className="font-bold text-lg text-slate-900 leading-snug">
                    {l(evt.title)}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {l(evt.description)}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{l(evt.location)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400 shrink-0" />
                      <span><strong>Organizer:</strong> {l(evt.organizer)}</span>
                    </div>
                  </div>

                  {evt.documents && evt.documents.length > 0 && (
                    <div className="pt-2">
                      {evt.documents.map((doc, dIdx) => (
                        <a
                          key={dIdx}
                          href={doc.url}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{l(doc.title)} ({doc.size})</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  👥 <strong>{evt.attendeesCount}</strong> Registered
                </span>

                <button
                  onClick={() => {
                    setRegisteringEvent(evt);
                    setRegSuccessTicket(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Ticket className="w-4 h-4" />
                  <span>RSVP / Register Online</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RSVP Registration Modal */}
        {registeringEvent && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
              
              {!regSuccessTicket ? (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-primary tracking-wider">Event RSVP</span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{l(registeringEvent.title)}</h3>
                    </div>
                    <button onClick={() => setRegisteringEvent(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-xs text-slate-500">
                    📅 {registeringEvent.date} • 📍 {l(registeringEvent.location)}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Anup Sharma"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address (for ticket) *</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setRegisteringEvent(null)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm RSVP</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Registration Confirmed!</h3>

                  {/* Digital Pass */}
                  <div className="p-5 bg-gradient-medical text-white rounded-2xl text-left space-y-2 text-xs shadow-lg">
                    <div className="flex justify-between border-b border-white/20 pb-2">
                      <span className="font-bold text-amber-300">NHS OFFICIAL EVENT PASS</span>
                      <span className="font-mono text-amber-300">{regSuccessTicket.ticketNumber}</span>
                    </div>
                    <div className="text-base font-bold text-white pt-1">{regSuccessTicket.name}</div>
                    <div className="text-slate-300">{l(regSuccessTicket.event.title)}</div>
                    <div className="pt-2 text-[11px] text-slate-300 flex justify-between">
                      <span>📅 {regSuccessTicket.date} ({regSuccessTicket.time})</span>
                      <span>📍 {regSuccessTicket.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setRegisteringEvent(null);
                      setRegSuccessTicket(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
