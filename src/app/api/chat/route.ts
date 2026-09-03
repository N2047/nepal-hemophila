import { NextRequest, NextResponse } from "next/server";
import { N8NWebhookPayload } from "@/types/chat";

// Fallback Nepal Hemophilia Society Intelligent Knowledge Base Engine
function getFallbackResponse(message: string, lang: "en" | "np"): { text: string; quickReplies?: string[]; isEmergency?: boolean } {
  const query = message.toLowerCase().trim();

  const isNepali = lang === "np" || /[\u0900-\u097F]/.test(query);

  // 1. Emergency / Acute Bleed
  if (
    query.includes("emergency") ||
    query.includes("bleed") ||
    query.includes("blood") ||
    query.includes("चोट") ||
    query.includes("रक्तस्राव") ||
    query.includes("आपतकालीन") ||
    query.includes("घाउ") ||
    query.includes("दर्द") ||
    query.includes("दुख्यो")
  ) {
    if (isNepali) {
      return {
        text: `🚨 **आकस्मिक रक्तस्राव प्राथमिक उपचार (Emergency Bleed Protocol)**:\n\n1. **R.I.C.E. विधि तुरुन्त अपनाउनुहोस्**:\n   - **Rest (आराम)**: चोट लागेको अंगलाई स्थिर राख्नुहोस्।\n   - **Ice (बरफ)**: सफा कपडामा बरफ बेरेर १५-२० मिनेट सेक्नुहोस् (प्रत्यक्ष छालामा नराख्नुहोस्)।\n   - **Compression (पट्टी)**: हल्का दबाब दिएर ब्यान्डेज बाँध्नुहोस्।\n   - **Elevation (माथि उठाउने)**: मुटुको सतहभन्दा माथि उठाएर राख्नुहोस्।\n\n2. **फ्याक्टर इन्फ्युजन (Factor Infusion)**:\n   - तुरुन्त सिफारिस गरिएको मात्रामा **Factor VIII / IX** लगाउनुहोस्।\n\n📞 **२४/७ आपतकालीन सम्पर्कहरू**:\n- **वीर अस्पताल (केन्द्रीय हेमोफिलिया केयर)**: [०१-४२२१११९](tel:014221119)\n- **NHS हटलाइन**: [९८५१००००००](tel:9851000000)\n\n*टाउको, घाँटी वा पेटमा गम्भीर चोट लागेको भए ढिलो नगरी तुरुन्त आकस्मिक कक्ष जानुहोस्!*`,
        quickReplies: [
          "फ्याक्टर उपलब्धता कहाँ छ?",
          "नजिकैको उपचार केन्द्र",
          "वीर अस्पतालको सम्पर्क",
          "एम्बुलेन्स सेवा"
        ],
        isEmergency: true,
      };
    } else {
      return {
        text: `🚨 **Acute Bleeding Emergency Protocol**:\n\n1. **Apply R.I.C.E. Principle Immediately**:\n   - **Rest**: Immobilize the affected joint/muscle.\n   - **Ice**: Wrap ice in a towel and apply for 15–20 minutes.\n   - **Compression**: Apply gentle elastic bandage support.\n   - **Elevation**: Elevate the limb above heart level.\n\n2. **Infuse Clotting Factor Immediately**:\n   - Administer prescribed **Factor VIII or IX** dosage as soon as possible.\n\n📞 **24/7 NHS Emergency Helplines**:\n- **Bir Hospital Hemophilia Ward**: [+977-1-4221119](tel:+97714221119)\n- **National NHS Hotline**: [+977-9851000000](tel:+9779851000000)\n\n*Head, neck, or abdominal bleeding requires immediate hospital emergency room admission!*`,
        quickReplies: [
          "Where to get Factors?",
          "Find Treatment Center",
          "Call Bir Hospital",
          "Doctor Directory"
        ],
        isEmergency: true,
      };
    }
  }

  // 2. Factor Availability
  if (
    query.includes("factor") ||
    query.includes("फ्याक्टर") ||
    query.includes("fviii") ||
    query.includes("fix") ||
    query.includes("औषधि") ||
    query.includes("medicine") ||
    query.includes("availability")
  ) {
    if (isNepali) {
      return {
        text: `🩸 **फ्याक्टर कन््सन्ट्रेट उपलब्धता (Clotting Factor Stocks)**:\n\nनेपाल हेमोफिलिया सोसाइटी (NHS) ले विश्व हेमोफिलिया महासंघ (WFH) को सहयोगमा नेपालका विभिन्न सरकारी तथा प्रादेशिक अस्पतालहरूमा **Factor VIII** र **Factor IX** निःशुल्क/सहुलियत रूपमा उपलब्ध गराउँदै आएको छ।\n\n📍 **प्रमुख वितरण केन्द्रहरू**:\n- **बागमती प्रदेश**: वीर अस्पताल र कान्ति बाल अस्पताल, काठमाडौं\n- **कोशी प्रदेश**: कोशी अस्पताल, विराटनगर & बी.पी. कोइराला स्वास्थ्य विज्ञान प्रतिष्ठान (BPKIHS), धरान\n- **मधेश प्रदेश**: जनकपुर प्रादेशिक अस्पताल & नारायणी अस्पताल, वीरगन्ज\n- **गण्डकी प्रदेश**: पोखरा स्वास्थ्य विज्ञान प्रतिष्ठान (पश्चिमाञ्चल क्षेत्रीय अस्पताल)\n- **लुम्बिनी प्रदेश**: लुम्बिनी प्रादेशिक अस्पताल, बुटवल & भेरी अस्पताल, नेपालगन्ज\n- **कर्णाली प्रदेश**: कर्णाली प्रादेशिक अस्पताल, सुर्खेत\n- **सुदूरपश्चिम प्रदेश**: सेती प्रादेशिक अस्पताल, धनगढी\n\n👉 *तपाईं वेबसाइटको **[फ्याक्टर उपलब्धता ट्र्याकर](/factor-availability)** मा गएर लाइभ स्टक जाँच गर्न सक्नुहुन्छ।*`,
        quickReplies: [
          "फ्याक्टर ट्र्याकर हेर्नुहोस्",
          "नजिकको अस्पताल कुन हो?",
          "फ्याक्टर कसरी पाउने?",
          "सदस्यता फारम"
        ],
      };
    } else {
      return {
        text: `🩸 **Factor Concentrate Availability (Live Stocks)**:\n\nNepal Hemophilia Society (NHS), in partnership with the World Federation of Hemophilia (WFH) Humanitarian Aid Program, distributes **Factor VIII & Factor IX** across key regional centers.\n\n📍 **Key Distribution Centers**:\n- **Bagmati**: Bir Hospital & Kanti Children's Hospital, Kathmandu\n- **Koshi**: Koshi Hospital (Biratnagar) & BPKIHS (Dharan)\n- **Madhesh**: Janakpur Provincial Hospital & Narayani Hospital (Birgunj)\n- **Gandaki**: Pokhara Academy of Health Sciences (WRH)\n- **Lumbini**: Lumbini Provincial Hospital (Butwal) & Bheri Hospital (Nepalgunj)\n- **Karnali**: Karnali Provincial Hospital (Surkhet)\n- **Sudurpashchim**: Seti Provincial Hospital (Dhangadhi)\n\n👉 *Check the live stock levels on our **[Factor Availability Tracker](/factor-availability)**.*`,
        quickReplies: [
          "Check Live Factor Stocks",
          "Locate Hospital",
          "How to register as patient?",
          "Emergency Contact"
        ],
      };
    }
  }

  // 3. Treatment Centers / Hospitals
  if (
    query.includes("center") ||
    query.includes("centre") ||
    query.includes("hospital") ||
    query.includes("अस्पताल") ||
    query.includes("केन्द्र") ||
    query.includes("doctor") ||
    query.includes("डाक्टर") ||
    query.includes("clinic")
  ) {
    if (isNepali) {
      return {
        text: `🏥 **हेमोफिलिया उपचार केन्द्रहरू (Treatment Centers in Nepal)**:\n\nनेपालका ७ वटै प्रदेशमा NHS सँग आबद्ध उपचार तथा परामर्श केन्द्रहरू उपलब्ध छन्।\n\n1. **केन्द्रीय कार्यालय र मुख्य केन्द्र**: वीर अस्पताल परिसर, महाबौद्ध, काठमाडौं (सम्पर्क: ०१-४२२१११९)\n2. **बालबालिकाका लागि**: कान्ति बाल अस्पताल, महाराजगञ्ज\n3. **पूर्वी नेपाल**: बीपीकेआईएचएस (धरान), कोशी अस्पताल (विराटनगर)\n4. **मध्य तथा पश्चिम**: पश्चिमाञ्चल अस्पताल (पोखरा), लुम्बिनी अस्पताल (बुटवल), भेरी अस्पताल (नेपालगन्ज)\n\n👉 विस्तृत ठेगाना र सम्पर्क नम्बरका लागि **[उपचार केन्द्र निर्देशिका](/treatment-centres)** हेर्नुहोस्।`,
        quickReplies: [
          "उपचार केन्द्रहरूको सूची",
          "वीर अस्पतालको ओपिडी समय",
          "हेमोफिलियाका लक्षण के हुन्?",
          "सहयोग लिनुहोस्"
        ],
      };
    } else {
      return {
        text: `🏥 **Hemophilia Treatment Centers (HTC Network)**:\n\nNHS operates in collaboration with dedicated Hemophilia Treatment Centers across all 7 provinces:\n\n1. **National Central HTC**: Bir Hospital, Mahabouddha, Kathmandu (Tel: +977-1-4221119)\n2. **Pediatric HTC**: Kanti Children's Hospital, Maharajgunj\n3. **Eastern Hubs**: BPKIHS (Dharan) & Koshi Hospital (Biratnagar)\n4. **Western & Central Hubs**: WRH (Pokhara), Lumbini Hospital (Butwal), Bheri Hospital (Nepalgunj)\n\n👉 View maps and on-duty hematologists in our **[Treatment Centres Directory](/treatment-centres)**.`,
        quickReplies: [
          "View All Centers",
          "OPD Timings",
          "Factor Stocks",
          "Contact Helpdesk"
        ],
      };
    }
  }

  // 4. Membership / Registration / Donation
  if (
    query.includes("member") ||
    query.includes("register") ||
    query.includes("दर्ता") ||
    query.includes("सदस्यता") ||
    query.includes("सहयोग") ||
    query.includes("donate") ||
    query.includes("दान")
  ) {
    if (isNepali) {
      return {
        text: `🤝 **NHS सदस्यता तथा सहयोग (Membership & Support)**:\n\n- **बिरामी दर्ता (Patient Registry)**: यदि तपाईं वा तपाईंको परिवारमा कसैलाई हेमोफिलिया छ भने, निःशुल्क राष्ट्रिय बिरामी परिचयपत्र र फ्याक्टर प्राप्त गर्न दर्ता हुनुहोस्।\n- **अनलाइन फारम**: [सदस्यता दर्ता फारम](/membership) भर्नुहोस्।\n- **आर्थिक सहयोग / दान**: हेमोफिलिया पीडित बालबालिकाहरूको उपचार र शिक्षाका लागि [दान गर्नुहोस् (Donate)](/donate)।\n\nथप जानकारीका लागि NHS कार्यालय फोन: **०१-४२२१११९** मा सम्पर्क गर्नुहोस्।`,
        quickReplies: [
          "सदस्यता फारम भर्नुहोस्",
          "दान (Donate) गर्ने तरिका",
          "फ्याक्टर कार्ड कसरी बनाउने?"
        ],
      };
    } else {
      return {
        text: `🤝 **NHS Patient Membership & Donations**:\n\n- **National Patient Registry**: Register to receive your official Hemophilia ID card, subsidized clotting factors, and emergency care access.\n- **Online Registration**: Visit our **[Membership Application](/membership)**.\n- **Donate**: Support emergency factor supply and patient welfare via **[Donation Portal](/donate)**.\n\nFor personalized inquiries, call our central administration at **+977-1-4221119**.`,
        quickReplies: [
          "Apply for Membership",
          "Donate to NHS",
          "Download Patient Guide"
        ],
      };
    }
  }

  // 5. Default / General Assistance
  if (isNepali) {
    return {
      text: `नमस्ते! म **नेपाल हेमोफिलिया सोसाइटी (NHS) को AI सहायक** हुँ। म तपाईंलाई हेमोफिलिया, फ्याक्टर उपलब्धता, आकस्मिक प्राथमिक उपचार, र उपचार केन्द्रहरूको जानकारी दिन सक्छु।\n\nतपाईंलाई आज म कसरी सहयोग गर्न सक्छु? तलका मुख्य विकल्पहरू मध्ये कुनै एक छान्नुहोस् वा आफ्नो प्रश्न लेख्नुहोस्:`,
      quickReplies: [
        "🚨 आपतकालीन रक्तस्राव सल्लाह",
        "🩸 फ्याक्टर कहाँ पाइन्छ?",
        "🏥 नजिकैको उपचार केन्द्र",
        "📋 बिरामी सदस्यता दर्ता"
      ],
    };
  } else {
    return {
      text: `Hello! I am the **Nepal Hemophilia Society (NHS) AI Assistant** powered by our automated workflow backend. I can assist you with emergency protocols, factor availability, treatment center locations, and patient care guidelines.\n\nHow can I help you today? Feel free to ask a question or select a quick topic below:`,
      quickReplies: [
        "🚨 Emergency Bleed Protocol",
        "🩸 Factor Availability Tracker",
        "🏥 Find Nearest Hospital",
        "📋 Patient Registration"
      ],
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      message,
      chatInput,
      sessionId = `session_${Date.now()}`,
      language = "np",
      history = [],
      customWebhookUrl,
    } = body;

    const queryText = (message || chatInput || "").trim();

    if (!queryText) {
      return NextResponse.json(
        { error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    // Determine Webhook URL from: 1. Request custom URL, 2. Env variable
    const webhookUrl =
      customWebhookUrl ||
      process.env.N8N_WEBHOOK_URL ||
      process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    // If webhookUrl is configured and valid, forward request to n8n
    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        const payload: N8NWebhookPayload = {
          action: "sendMessage",
          sessionId,
          chatInput: queryText,
          message: queryText,
          language: language === "en" ? "en" : "np",
          timestamp: new Date().toISOString(),
          history: history.slice(-6), // Send last 6 messages context
          metadata: {
            platform: "Nepal Hemophilia Society Web Portal",
            userAgent: request.headers.get("user-agent") || undefined,
            url: request.headers.get("referer") || undefined,
          },
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // 12 seconds timeout

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const contentType = response.headers.get("content-type") || "";
          let resultText = "";
          let quickReplies: string[] | undefined = undefined;
          let isEmergency: boolean | undefined = undefined;

          if (contentType.includes("application/json")) {
            const data = await response.json();

            // Extract text from common n8n response patterns
            if (Array.isArray(data) && data.length > 0) {
              const firstItem = data[0];
              resultText =
                firstItem.output ||
                firstItem.response ||
                firstItem.text ||
                firstItem.message ||
                firstItem.reply ||
                (typeof firstItem === "string" ? firstItem : JSON.stringify(firstItem));
              quickReplies = firstItem.quickReplies;
              isEmergency = firstItem.isEmergency;
            } else if (typeof data === "object" && data !== null) {
              resultText =
                data.output ||
                data.response ||
                data.text ||
                data.message ||
                data.reply ||
                JSON.stringify(data);
              quickReplies = data.quickReplies;
              isEmergency = data.isEmergency;
            } else {
              resultText = String(data);
            }
          } else {
            resultText = await response.text();
          }

          if (resultText && resultText.trim()) {
            return NextResponse.json({
              success: true,
              source: "n8n",
              text: resultText,
              quickReplies: quickReplies || (language === "np" 
                ? ["थप सोध्नुहोस्", "फ्याक्टर उपलब्धता", "आपतकालीन नम्बर"] 
                : ["Ask more", "Factor Tracker", "Emergency Contact"]),
              isEmergency: isEmergency || false,
              timestamp: new Date().toISOString(),
            });
          }
        }
      } catch (webhookError: any) {
        console.warn("n8n Webhook connection failed or timed out, using fallback:", webhookError?.message);
        // Seamlessly fall through to Fallback
      }
    }

    // Fallback Engine when n8n is not configured or offline
    const fallback = getFallbackResponse(queryText, language);

    return NextResponse.json({
      success: true,
      source: "fallback",
      text: fallback.text,
      quickReplies: fallback.quickReplies,
      isEmergency: fallback.isEmergency || false,
      timestamp: new Date().toISOString(),
      notice: !webhookUrl ? "Running on NHS local intelligent engine (n8n Webhook can be configured in settings)." : undefined,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error processing chat message.",
        text: "माफ गर्नुहोस्, प्राविधिक समस्या उत्पन्न भयो। कृपया आपतकालीन अवस्थामा सिधै ०१-४२२१११९ मा फोन गर्नुहोस्।",
      },
      { status: 500 }
    );
  }
}
