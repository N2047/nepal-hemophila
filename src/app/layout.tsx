import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import { CommitteeProvider } from "@/context/CommitteeContext";
import { SiteContentProvider } from "@/context/SiteContentContext";
import { AdminEditModeProvider } from "@/context/AdminEditModeContext";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { Navbar } from "@/components/layout/Navbar";
import { AccessibilityDrawer } from "@/components/layout/AccessibilityDrawer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Footer } from "@/components/layout/Footer";
import { FloatingChatWidget } from "@/components/chat/FloatingChatWidget";
import { AdminFloatingBar } from "@/components/common/AdminFloatingBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-nepali",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nepal Hemophilia Society | Official Institutional Platform (नेपाल हेमोफिलिया सोसाइटी)",
    template: "%s | Nepal Hemophilia Society (NHS)",
  },
  description: "Official institutional website and digital platform of Nepal Hemophilia Society (NHS). Comprehensive bleeding disorders clinical guidelines, treatment center directory, factor availability tracker, patient support and advocacy in Nepal.",
  keywords: [
    "Nepal Hemophilia Society",
    "नेपाल हेमोफिलिया सोसाइटी",
    "Hemophilia Nepal",
    "Factor VIII Nepal",
    "Factor IX",
    "Von Willebrand Disease Nepal",
    "Bir Hospital Hemophilia",
    "Bleeding Disorders Nepal",
    "WFH Nepal",
    "Patient Support Nepal"
  ],
  authors: [{ name: "Nepal Hemophilia Society (NHS)" }],
  creator: "Nepal Hemophilia Society",
  publisher: "Nepal Hemophilia Society",
  metadataBase: new URL("https://hemophilia.org.np"),
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://hemophilia.org.np",
    siteName: "Nepal Hemophilia Society (NHS)",
    title: "Nepal Hemophilia Society — Treatment, Care, Dignity and Equal Opportunities for All",
    description: "Official digital home of Nepal Hemophilia Society. Clinical resources, live factor tracker, 7 provincial treatment centers, and patient registry.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Nepal Hemophilia Society National Care Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepal Hemophilia Society (NHS)",
    description: "Treatment, Care, Dignity and Equal Opportunities for All.",
    images: ["https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Nepal Hemophilia Society",
    "alternateName": "नेपाल हेमोफिलिया सोसाइटी",
    "url": "https://hemophilia.org.np",
    "logo": "https://hemophilia.org.np/logo.png",
    "description": "National patient-led organization for bleeding disorders across all 7 provinces of Nepal.",
    "telephone": "+977-1-4221119",
    "emergencyService": "+977-9851000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bir Hospital Premises, Mahabouddha",
      "addressLocality": "Kathmandu",
      "addressCountry": "NP"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${notoSansDevanagari.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-accent selection:text-white">
        <AuthProvider>
          <LanguageProvider>
            <AccessibilityProvider>
              <DataProvider>
                <CommitteeProvider>
                  <SiteContentProvider>
                    <AdminEditModeProvider>
                      <TopUtilityBar />
                      <Navbar />
                      <AccessibilityDrawer />
                      <main id="main-content" className="flex-1">
                        {children}
                      </main>
                      <Footer />
                      <FloatingChatWidget />
                      <MobileActionBar />
                      <AdminFloatingBar />
                    </AdminEditModeProvider>
                  </SiteContentProvider>
                </CommitteeProvider>
              </DataProvider>
            </AccessibilityProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
