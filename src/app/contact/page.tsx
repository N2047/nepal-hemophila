"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { useSiteContent } from "@/context/SiteContentContext";
import { ProvinceName } from "@/types";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  HelpCircle
} from "lucide-react";

import { EditableContentWrapper } from "@/components/common/EditableContentWrapper";

export default function ContactPage() {
  const { isNepali, t } = useLanguage();
  const { logAudit, chapters, globalSettings } = useData();
  const { orgDetails, emergency } = useSiteContent();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState<ProvinceName>("Bagmati");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logAudit("CONTACT_MESSAGE_SUBMIT", "ContactMessage", `msg-${Date.now()}`, `Message from ${name} (${email}) - Subject: ${subject}`);
    setSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  const fallbackOffices = [
    { nameNp: "कोशी प्रादेशिक शाखा", nameEn: "Koshi Provincial Chapter", cityNp: "धरान / विराटनगर", cityEn: "Dharan / Biratnagar", phone: "+977-25-525555", email: "koshi@hemophilia.org.np" },
    { nameNp: "मधेश प्रादेशिक शाखा", nameEn: "Madhesh Provincial Chapter", cityNp: "जनकपुरधाम", cityEn: "Janakpurdham", phone: "+977-41-520133", email: "madhesh@hemophilia.org.np" },
    { nameNp: "बागमती प्रादेशिक शाखा", nameEn: "Bagmati Provincial Chapter", cityNp: "काठमाडौं", cityEn: "Kathmandu", phone: "+977-1-4221119", email: "bagmati@hemophilia.org.np" },
    { nameNp: "गण्डकी प्रादेशिक शाखा", nameEn: "Gandaki Provincial Chapter", cityNp: "पोखरा", cityEn: "Pokhara", phone: "+977-61-520067", email: "gandaki@hemophilia.org.np" },
    { nameNp: "लुम्बिनी प्रादेशिक शाखा", nameEn: "Lumbini Provincial Chapter", cityNp: "नेपालगञ्ज / बुटवल", cityEn: "Nepalgunj / Butwal", phone: "+977-81-520120", email: "lumbini@hemophilia.org.np" },
    { nameNp: "कर्णाली प्रादेशिक शाखा", nameEn: "Karnali Provincial Chapter", cityNp: "वीरेन्द्रनगर, सुर्खेत", cityEn: "Birendranagar, Surkhet", phone: "+977-83-520200", email: "karnali@hemophilia.org.np" },
    { nameNp: "सुदूरपश्चिम प्रादेशिक शाखा", nameEn: "Sudurpashchim Provincial Chapter", cityNp: "धनगढी", cityEn: "Dhangadhi", phone: "+977-91-521259", email: "sudurpashchim@hemophilia.org.np" },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-teal-300">
            <Building2 className="w-3.5 h-3.5" />
            <span>{isNepali ? "सम्पर्क तथा कार्यालयहरू" : "Head Office & Provincial Network"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "नेपाल हेमोफिलिया सोसाइटीमा सम्पर्क गर्नुहोस्" : "Contact Nepal Hemophilia Society"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "केन्द्रीय सचिवालय, काठमाडौं तथा नेपालका सातै प्रदेशमा रहेका हाम्रा सम्पर्क कार्यालयहरूमा सोझै सम्पर्क गर्नुहोस्।"
              : "Get in touch with our central secretariat in Kathmandu or reach out to our regional coordinators across all 7 provinces."}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-primary-900">
                {isNepali ? "हामीलाई सन्देश पठाउनुहोस्" : "Send Us an Official Message"}
              </h2>
              <p className="text-xs text-slate-500">
                {isNepali ? "तपाईंको सन्देश सम्बन्धित शाखा वा विभागमा पठाइनेछ।" : "Your inquiry will be routed to the appropriate department or provincial chapter."}
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3 animate-in fade-in duration-150">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-base text-emerald-900">Thank You! Your message has been received.</h3>
                <p className="text-xs text-emerald-800">Our secretariat team will respond to your email and phone promptly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Binita Poudel"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+977-98XXXXXXXX"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Province *</label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
                    >
                      <option value="Bagmati">Bagmati Province</option>
                      <option value="Gandaki">Gandaki Province</option>
                      <option value="Koshi">Koshi Province</option>
                      <option value="Lumbini">Lumbini Province</option>
                      <option value="Madhesh">Madhesh Province</option>
                      <option value="Karnali">Karnali Province</option>
                      <option value="Sudurpashchim">Sudurpashchim Province</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Subject / Category *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-medium"
                  >
                    <option value="General Inquiry">General Institutional Inquiry</option>
                    <option value="Medical Assistance">Medical / Patient Assistance</option>
                    <option value="Membership Question">Membership & Identity Card Question</option>
                    <option value="Donation & CSR Partnership">Donation / CSR & Corporate Partnership</option>
                    <option value="Media & Press Inquiry">Media & Press Relations</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Message Content *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your detailed message here..."
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Central Secretariat Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Central Office Card */}
            <EditableContentWrapper label="सम्पर्क तथा हटलाइन सम्पादन गर्नुहोस्" adminUrl="/admin?tab=cms&sub=settings">
              <div className="bg-gradient-medical text-white rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Central Secretariat</span>
                  <h3 className="text-xl font-extrabold text-white mt-1">Nepal Hemophilia Society (NHS)</h3>
                </div>

                <div className="space-y-3 text-xs text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{isNepali ? (globalSettings?.addressNp || orgDetails?.addressNp || "काठमाडौं, नेपाल (केन्द्रीय सचिवालय)") : (globalSettings?.addressEn || orgDetails?.addressEn || "Kathmandu, Nepal (Central Secretariat)")}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-teal-300 shrink-0" />
                    <a href={`tel:${(globalSettings?.contactPhone || orgDetails?.phone || "+97714221119").replace(/[^0-9+]/g, "")}`} className="hover:text-white font-semibold">{globalSettings?.contactPhone || orgDetails?.phone || "+977-1-4221119"}</a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                    <a href={`mailto:${globalSettings?.contactEmail || orgDetails?.email || "info@hemophilia-nepal.org.np"}`} className="hover:text-white font-semibold">{globalSettings?.contactEmail || orgDetails?.email || "info@hemophilia-nepal.org.np"}</a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>{isNepali ? (orgDetails?.officeHoursNp || "आइतबार – शुक्रबार: बिहान १०:०० – साँझ ५:००") : (orgDetails?.officeHoursEn || "Sunday – Friday: 10:00 AM – 05:00 PM NPT")}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/20">
                  <div className="text-xs font-bold text-red-200 uppercase tracking-wide mb-1">
                    24/7 Bleeding Emergency On-Call Hotline:
                  </div>
                  <a
                    href={`tel:${(globalSettings?.emergencyHotline || orgDetails?.emergencyPhone || emergency?.hotline1 || "+9779851000000").replace(/[^0-9+]/g, "")}`}
                    className="inline-block px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold transition-colors shadow"
                  >
                    📞 {globalSettings?.emergencyHotline || orgDetails?.emergencyPhone || emergency?.hotline1 || "+977-9851000000"}
                  </a>
                </div>
              </div>
            </EditableContentWrapper>

            {/* Social & Legal Note */}
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <span className="font-bold text-slate-800 block">Registration & Statutory Transparency:</span>
              <p>Social Welfare Council (SWC) Affiliation No. {globalSettings?.swcAffiliationNo || orgDetails?.swcRegNo || "1290"}. PAN: {globalSettings?.panNumber || orgDetails?.panNo || "300123456"}.</p>
            </div>

          </div>

        </div>

        {/* 7 Provincial Chapters Directory */}
        <EditableContentWrapper label="प्रादेशिक शाखाहरू सम्पादन गर्नुहोस्" adminUrl="/admin?tab=cms&sub=chapters">
          <section className="space-y-6 pt-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-900">
                {isNepali ? "७ वटै प्रदेश शाखाहरूको प्रत्यक्ष सम्पर्क" : "7 Provincial Chapters Contact Directory"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Direct hotlines and email addresses for localized hospital liaison across Nepal:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {(chapters && chapters.length > 0 ? chapters : fallbackOffices).map((office: any, idx: number) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:shadow-md transition-shadow">
                  <h4 className="font-bold text-sm text-primary-900">
                    {isNepali ? (office.provinceNameNp || office.nameNp || office.name) : (office.provinceNameEn || office.nameEn || office.name)}
                  </h4>
                  <div className="text-slate-600 space-y-1">
                    <div>📍 <strong>Location:</strong> {isNepali ? (office.cityNp || office.partnerHospitalNp || office.city) : (office.cityEn || office.partnerHospitalEn || office.city)}</div>
                    <div>📞 <strong>Phone:</strong> <a href={`tel:${office.phone}`} className="text-accent font-semibold">{office.phone}</a></div>
                    {office.email && <div>✉️ <strong>Email:</strong> <a href={`mailto:${office.email}`} className="text-primary hover:underline">{office.email}</a></div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </EditableContentWrapper>

      </div>

    </div>
  );
}
