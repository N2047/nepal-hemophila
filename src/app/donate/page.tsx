"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useData } from "@/context/DataContext";
import { 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  QrCode, 
  Download, 
  Send,
  Sparkles,
  Lock
} from "lucide-react";
import confetti from "canvas-confetti";

export default function DonatePage() {
  const { isNepali, t } = useLanguage();
  const { submitDonation } = useData();

  const [donationType, setDonationType] = useState<"One-time" | "Monthly">("One-time");
  const [amount, setAmount] = useState<number>(1500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [category, setCategory] = useState<any>("Emergency Factor Fund");
  const [paymentMethod, setPaymentMethod] = useState<any>("eSewa");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorPan, setDonorPan] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [completedDonation, setCompletedDonation] = useState<any>(null);

  const presetAmounts = [500, 1500, 5000, 15000, 50000];

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    const txRef = `${paymentMethod.toUpperCase().replace(" ", "")}-TXN-${Math.floor(100000 + Math.random() * 900000)}`;

    const donation = submitDonation({
      donorName: isAnonymous ? "Anonymous Supporter" : donorName,
      donorEmail,
      donorPhone,
      donorPanOrCitizenship: donorPan,
      isAnonymous,
      amount: finalAmount,
      currency: "NPR",
      category,
      donationType,
      paymentMethod,
      paymentStatus: "Completed",
      transactionReference: txRef,
    });

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    setCompletedDonation(donation);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header Banner */}
      <section className="bg-gradient-medical text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/40 text-xs font-bold text-red-200">
            <Heart className="w-3.5 h-3.5 fill-red-400" />
            <span>{isNepali ? "मानवीय जीवनरक्षा सहयोग" : "Life-Saving Hemophilia Support Fund"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {isNepali ? "हेमोफिलिया बिरामीहरूको जीवनरक्षामा सहयोग गर्नुहोस्" : "Support Life-Saving Care & Clotting Factors"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {isNepali
              ? "नेपाल हेमोफिलिया सोसाइटी (SWC दर्ता नं. १२९०) मा गरिएको सहयोग शतप्रतिशत बिरामी उपचार, आपतकालीन फ्याक्टर आपूर्ति तथा बाल स्वास्थ्य शिविरमा उपयोग हुन्छ। कर-छुट योग्य आधिकारिक रसिद तुरुन्त प्राप्त गर्नुहोस्।"
              : "100% of public contributions directly fund emergency factor reserve replenishment, home care equipment for children, and physiotherapy joint rehabilitation. Instant tax-deductible receipt generated."}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {completedDonation ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-emerald-500 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                {isNepali ? "सहयोग सफलतापूर्वक सम्पन्न भयो" : "Donation Successfully Processed"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Thank You for Your Life-Saving Generosity!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your contribution directly provides emergency clotting factor concentrates to a person experiencing a severe acute bleed in Nepal.
              </p>
            </div>

            {/* Official Tax-Deductible Donation Receipt Card */}
            <div className="p-6 sm:p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="font-extrabold text-primary-900 text-sm sm:text-base block">
                    NEPAL HEMOPHILIA SOCIETY
                  </span>
                  <span className="text-[11px] text-slate-500">Official Institutional Donation Receipt • SWC Reg: 1290</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-accent block">{completedDonation.receiptNumber}</span>
                  <span className="text-[10px] text-slate-400">{completedDonation.createdAt}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
                <div><strong>Donor Name:</strong> {completedDonation.donorName}</div>
                <div><strong>Fund Category:</strong> {completedDonation.category}</div>
                <div><strong>Payment Method:</strong> {completedDonation.paymentMethod}</div>
                <div><strong>Txn Reference:</strong> <span className="font-mono">{completedDonation.transactionReference}</span></div>
                {completedDonation.donorPanOrCitizenship && (
                  <div><strong>Donor PAN/ID:</strong> {completedDonation.donorPanOrCitizenship}</div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm">Total Contribution Amount:</span>
                <span className="text-xl font-black text-emerald-700 font-mono">
                  NPR {completedDonation.amount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.print()}
                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow"
              >
                <Download className="w-4 h-4" />
                <span>Print / Download Tax Receipt (PDF)</span>
              </button>
              <button
                onClick={() => setCompletedDonation(null)}
                className="px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm"
              >
                Make Another Donation
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleDonationSubmit}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8"
          >
            {/* Donation Frequency Toggle */}
            <div className="flex justify-center">
              <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
                <button
                  type="button"
                  onClick={() => setDonationType("One-time")}
                  className={`py-2 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                    donationType === "One-time"
                      ? "bg-white text-primary-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  One-time Gift
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType("Monthly")}
                  className={`py-2 px-6 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 ${
                    donationType === "Monthly"
                      ? "bg-white text-accent shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Monthly Supporter</span>
                </button>
              </div>
            </div>

            {/* Select Amount */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                1. Select Contribution Amount (NPR) *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setAmount(preset);
                      setCustomAmount("");
                    }}
                    className={`py-3 px-4 rounded-xl font-extrabold text-sm border transition-all ${
                      amount === preset && !customAmount
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    NPR {preset.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="relative pt-1">
                <input
                  type="number"
                  min="100"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Or enter custom amount in NPR..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Fund Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                2. Designate Fund Purpose *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-primary focus:outline-none focus:border-primary"
              >
                <option value="Emergency Factor Fund">🚨 Emergency Clotting Factor Reserve</option>
                <option value="General Support">🎗️ General Patient Care & Diagnostics</option>
                <option value="Physiotherapy & Joint Rehab">🏃 Joint Health & Musculoskeletal Rehab</option>
                <option value="Child Education & Youth">🎓 Child School Accommodation & Youth Camp</option>
                <option value="World Hemophilia Day">📢 National Awareness & Screening Drives</option>
              </select>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                3. Choose Payment Gateway (Nepal & International) *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "eSewa", label: "eSewa Mobile Wallet", icon: "🟢" },
                  { id: "Khalti", label: "Khalti Digital Wallet", icon: "🟣" },
                  { id: "Fonepay QR", label: "Fonepay QR Code", icon: "📱" },
                  { id: "Bank Transfer", label: "Bank Direct Wire", icon: "🏦" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      paymentMethod === m.id
                        ? "bg-primary-50 border-primary shadow-sm"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-base block mb-1">{m.icon}</span>
                    <span className="font-bold text-xs text-slate-900 block">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                4. Donor Information (for Official Tax Receipt)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Full Name / Organization *</label>
                  <input
                    type="text"
                    required={!isAnonymous}
                    disabled={isAnonymous}
                    value={isAnonymous ? "Anonymous Donor" : donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Ramesh Shrestha"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Email Address (for receipt) *</label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="donor@example.com"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="+977-98XXXXXXXX"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600">PAN / Tax ID (Optional for tax exemption)</label>
                  <input
                    type="text"
                    value={donorPan}
                    onChange={(e) => setDonorPan(e.target.value)}
                    placeholder="e.g. PAN: 300124890"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anon-donor"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <label htmlFor="anon-donor" className="text-xs text-slate-600 cursor-pointer">
                  Make this an <strong>Anonymous Contribution</strong> (Name will not appear on public partner lists)
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-accent hover:bg-accent-dark text-white font-black text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
            >
              <Lock className="w-4 h-4" />
              <span>
                Proceed to Pay NPR {(customAmount ? Number(customAmount) : amount).toLocaleString()} via {paymentMethod}
              </span>
            </button>
          </form>
        )}

      </div>

    </div>
  );
}
