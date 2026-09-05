import fs from "fs/promises";
import path from "path";
import { CommitteeData, Officer, Member, OfficerUpdateInput, MemberInput, MemberUpdateInput } from "@/types/committee";

const DB_PATH = path.join(process.cwd(), "src", "data", "committee-db.json");

const defaultCommitteeData: CommitteeData = {
  officers: [
    {
      id: "off-1",
      position: "अध्यक्ष",
      name: "श्री मुकुन्द शर्मा",
      address: "काठमाडौं, बागमती प्रदेश",
      phone: "९८५१००१२३४",
      experience: "२५ वर्षभन्दा बढी हेमोफिलिया अधिकार, बिरामी हित तथा राष्ट्रिय संस्थागत विकासको अनुभव।",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      display_order: 1,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "off-2",
      position: "बरिष्ठ–उपाध्यक्ष",
      name: "डा. विशाल सुवेदी",
      address: "काठमाडौं, बागमती प्रदेश",
      phone: "९८४१२३४५६७",
      experience: "वरिष्ठ हेमाटोलोजिस्ट, चिकित्सा सेवा विस्तार तथा क्लिनिकल केयर व्यवस्थापनमा १८ वर्षको सेवा।",
      photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80",
      display_order: 2,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "off-3",
      position: "उपाध्यक्ष",
      name: "श्री हरिकृष्ण ढकाल",
      address: "पोखरा, गण्डकी प्रदेश",
      phone: "९८५६०१२३४५",
      experience: "सामुदायिक परिचालन, प्रादेशिक समन्वय तथा बिरामी सञ्जाल विस्तारमा १५ वर्षको कार्यअनुभव।",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      display_order: 3,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "off-4",
      position: "महासचिव",
      name: "श्रीमती सीता अधिकारी",
      address: "ललितपुर, बागमती प्रदेश",
      phone: "९८०११२२३३४",
      experience: "बिरामी परिवार प्रतिनिधित्व, राष्ट्रिय-अन्तर्राष्ट्रिय पैरवी तथा महिला/बालबालिका कल्याणमा १२ वर्ष।",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      display_order: 4,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "off-5",
      position: "सचिव",
      name: "श्री प्रकाश श्रेष्ठ",
      address: "भरतपुर, बागमती प्रदेश",
      phone: "९८४५०९८७६५",
      experience: "सांगठनिक विस्तार, स्वयंसेवक परिचालन तथा युवा सशक्तीकरण कार्यक्रम सञ्चालनमा १० वर्ष।",
      photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80",
      display_order: 5,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "off-6",
      position: "कोषाध्यक्ष",
      name: "श्री रमेश थापा",
      address: "पोखरा, गण्डकी प्रदेश",
      phone: "९८५६०३४५६७",
      experience: "वित्तीय सुशासन, लेखा प्रणाली तथा संस्थागत स्रोत परिचालन एवं पारदर्शितामा १४ वर्ष।",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      display_order: 6,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    }
  ],
  members: [
    {
      id: "mem-1",
      name: "श्री आशिष तामाङ",
      address: "भक्तपुर, बागमती प्रदेश",
      phone: "९८१३०००००१",
      experience: "युवा सचेतना, डिजिटल ई-लर्निङ प्लेटफर्म तथा हेमोफिलिया युथ विङ नेतृत्वमा ६ वर्ष।",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
      display_order: 1,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "mem-2",
      name: "श्रीमती गीता श्रेष्ठ",
      address: "काठमाडौं, बागमती प्रदेश",
      phone: "९८४१०००००२",
      experience: "महिला तथा बालिका रक्तस्राव विकार पैरवी एवं मातृ स्वास्थ्य सहायतामा ९ वर्षको योगदान।",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      display_order: 2,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "mem-3",
      name: "श्री कृष्ण बहादुर गुरुङ",
      address: "गोरखा, गण्डकी प्रदेश",
      phone: "९८५६०००००३",
      experience: "ग्रामीण स्वास्थ्य पहुँच तथा दुर्गम क्षेत्रका बिरामी पहिचान र प्राथमिक उपचार सहजीकरणमा ७ वर्ष।",
      photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      display_order: 3,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "mem-4",
      name: "श्रीमती सुनिता महर्जन",
      address: "पाटन, बागमती प्रदेश",
      phone: "९८०३०००००४",
      experience: "बिरामी तथा परिवारका लागि मनोसामाजिक परामर्श र पुनर्स्थापना कार्यक्रममा ८ वर्ष।",
      photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80",
      display_order: 4,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "mem-5",
      name: "श्री दिपेन्द्र यादव",
      address: "जनकपुरधाम, मधेश प्रदेश",
      phone: "९८१२०००००५",
      experience: "मधेश प्रदेशमा बिरामी समन्वय, अस्पताल सहकार्य तथा फ्याक्टर उपलब्धता अनुगमनमा ५ वर्ष।",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      display_order: 5,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "mem-6",
      name: "श्री सन्तोष चौधरी",
      address: "नेपालगन्ज, लुम्बिनी प्रदेश",
      phone: "९८५८०००००६",
      experience: "पश्चिम नेपालमा औषधि वितरण, बिरामी यातायात तथा आकस्मिक सेवा समन्वयमा ६ वर्ष।",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
      display_order: 6,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "mem-7",
      name: "श्रीमती मन्जु कार्की",
      address: "धरान, कोशी प्रदेश",
      phone: "९८२२०००००७",
      experience: "कोशी प्रदेशमा बिरामी सशक्तीकरण तथा बी.पी. कोइराला स्वास्थ्य विज्ञान प्रतिष्ठान समन्वयमा ७ वर्ष।",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      display_order: 7,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "mem-8",
      name: "श्री नवराज खड्का",
      address: "वीरेन्द्रनगर, कर्णाली प्रदेश",
      phone: "९८४८०००००८",
      experience: "कर्णालीका दुर्गम जिल्लाहरूमा हेमोफिलिया पहिचान तथा प्रादेशिक स्वास्थ्य पैरवीमा ४ वर्ष।",
      photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
      display_order: 8,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "mem-9",
      name: "श्रीमती कमला जोशी",
      address: "धनगढी, सुदूरपश्चिम प्रदेश",
      phone: "९८४८०००००९",
      experience: "सेती प्रादेशिक अस्पतालमा बिरामी सहायता तथा सुदूरपश्चिममा सचेतना कार्यक्रममा ५ वर्ष।",
      photo: "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=400&q=80",
      display_order: 9,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "mem-10",
      name: "श्री राजु बज्राचार्य",
      address: "काठमाडौं, बागमती प्रदेश",
      phone: "९८५१००००१०",
      experience: "रक्तसञ्चार सेवा समन्वय, आकस्मिक रक्तदाता सञ्जाल तथा फ्याक्टर आपूर्ति व्यवस्थापनमा १० वर्ष।",
      photo: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80",
      display_order: 10,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    },
    {
      id: "mem-11",
      name: "श्री पदम राज पन्त",
      address: "धादिङ, बागमती प्रदेश",
      phone: "९८४१००००११",
      experience: "आपतकालीन बिरामी ओसारपसार, प्राथमिक उपचार तालिम तथा युवा स्वयंसेवक परिचालनमा ६ वर्ष।",
      photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80",
      display_order: 11,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-05T00:00:00.000Z"
    }
  ],
  last_updated: new Date().toISOString()
};

export async function getCommitteeData(): Promise<CommitteeData> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    const data = JSON.parse(raw) as CommitteeData;
    if (!data.officers || !data.members) {
      throw new Error("Invalid structure");
    }
    // Sort officers by display_order
    data.officers.sort((a, b) => a.display_order - b.display_order);
    // Sort members by display_order
    data.members.sort((a, b) => a.display_order - b.display_order);
    return data;
  } catch (error) {
    // If not found, write default and return
    await saveCommitteeData(defaultCommitteeData);
    return defaultCommitteeData;
  }
}

export async function saveCommitteeData(data: CommitteeData): Promise<void> {
  data.last_updated = new Date().toISOString();
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function updateOfficer(id: string, input: OfficerUpdateInput): Promise<Officer | null> {
  const data = await getCommitteeData();
  const idx = data.officers.findIndex((o) => o.id === id);
  if (idx === -1) return null;

  data.officers[idx] = {
    ...data.officers[idx],
    ...input,
    updated_at: new Date().toISOString()
  };

  await saveCommitteeData(data);
  return data.officers[idx];
}

export async function addMember(input: MemberInput): Promise<Member> {
  const data = await getCommitteeData();
  const newMember: Member = {
    ...input,
    id: `mem-${Date.now()}`,
    display_order: input.display_order ?? (data.members.length + 1),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  data.members.push(newMember);
  await saveCommitteeData(data);
  return newMember;
}

export async function updateMember(id: string, input: MemberUpdateInput): Promise<Member | null> {
  const data = await getCommitteeData();
  const idx = data.members.findIndex((m) => m.id === id);
  if (idx === -1) return null;

  data.members[idx] = {
    ...data.members[idx],
    ...input,
    updated_at: new Date().toISOString()
  };

  await saveCommitteeData(data);
  return data.members[idx];
}

export async function deleteMember(id: string): Promise<boolean> {
  const data = await getCommitteeData();
  const initialLen = data.members.length;
  data.members = data.members.filter((m) => m.id !== id);
  
  if (data.members.length === initialLen) return false;

  // Re-index remaining members
  data.members.forEach((m, idx) => {
    m.display_order = idx + 1;
  });

  await saveCommitteeData(data);
  return true;
}

export async function reorderMembers(orderedIds: string[]): Promise<Member[]> {
  const data = await getCommitteeData();
  const memberMap = new Map(data.members.map((m) => [m.id, m]));
  
  const reordered: Member[] = [];
  orderedIds.forEach((id, index) => {
    const mem = memberMap.get(id);
    if (mem) {
      mem.display_order = index + 1;
      mem.updated_at = new Date().toISOString();
      reordered.push(mem);
      memberMap.delete(id);
    }
  });

  // Append any remaining
  memberMap.forEach((mem) => {
    mem.display_order = reordered.length + 1;
    reordered.push(mem);
  });

  data.members = reordered;
  await saveCommitteeData(data);
  return data.members;
}

export function isAuthorizedSuperAdmin(request: Request): boolean {
  const userRole = request.headers.get("x-user-role");
  const authHeader = request.headers.get("authorization");
  
  if (userRole === "SUPER_ADMIN") return true;
  if (authHeader && (authHeader.includes("usr-superadmin") || authHeader.includes("SUPER_ADMIN"))) {
    return true;
  }
  try {
    const url = new URL(request.url);
    const queryRole = url.searchParams.get("userRole") || url.searchParams.get("role");
    if (queryRole === "SUPER_ADMIN") return true;
  } catch (e) {}

  return false;
}
