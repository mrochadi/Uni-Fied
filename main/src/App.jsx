import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  CalendarDays,
  Users,
  MapPin,
  Plus,
  X,
  Share2,
  GraduationCap,
  Sparkles,
  Rss,
  Building2,
  Mail,
  Lock,
  LogOut,
  Pencil,
  UserPlus,
  Clock,
  Check,
} from "lucide-react";

/* ---------------------------------------------------------------
   TOKENS
---------------------------------------------------------------- */
const C = {
  sand50: "#E0FBFC",
  sand100: "#CFF0F2",
  sand200: "#98C1D9",
  ink900: "#293241",
  ink600: "#51637A",
  terra700: "#EE6C4D",
  terra600: "#F08669",
  terra100: "#FBDCD2",
  lawn700: "#3E5A80",
  lawn100: "#DCE6F0",
  gold500: "#98C1D9",
  white: "#FFFFFF",
  line: "#AFDCE2",
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');`;

/* ---------------------------------------------------------------
   DATA
---------------------------------------------------------------- */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

const NATIONALITIES = [
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "NP", name: "Nepal", flag: "🇳🇵" },
];
const flagFor = (code) => NATIONALITIES.find((n) => n.code === code)?.flag || "🏳️";
const nameFor = (code) => NATIONALITIES.find((n) => n.code === code)?.name || "Unknown";
const initialsFromName = (name) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
};

const COURSE_COLORS = [C.terra700, C.lawn700, C.ink900, C.terra600, "#4E7796"];
const colorForCode = (code) => {
  let h = 0;
  for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) % COURSE_COLORS.length;
  return COURSE_COLORS[h];
};

const MOCK_STUDENTS = [
  { id: "s1", name: "Mia Chen", initials: "MC", degree: "Bachelor of Commerce", nat: "CN", mapPos: { x: 55, y: 58 },
    timetable: [
      { day: "Mon", start: 9, end: 11, code: "ECON1001", name: "Intro Microeconomics" },
      { day: "Wed", start: 11, end: 13, code: "MKTG1001", name: "Marketing Principles" },
      { day: "Fri", start: 9, end: 10, code: "ECON1001", name: "Tutorial" },
    ] },
  { id: "s2", name: "Arjun Patel", initials: "AP", degree: "Computer Science", nat: "IN", mapPos: { x: 74, y: 32 },
    timetable: [
      { day: "Mon", start: 9, end: 10, code: "COMP2017", name: "Tutorial" },
      { day: "Tue", start: 10, end: 12, code: "COMP2017", name: "Systems Programming" },
      { day: "Thu", start: 14, end: 16, code: "COMP2123", name: "Data Structures" },
    ] },
  { id: "s3", name: "Yuki Tanaka", initials: "YT", degree: "Design", nat: "JP", mapPos: { x: 49, y: 34 },
    timetable: [
      { day: "Mon", start: 13, end: 15, code: "DESN1001", name: "Design Studio" },
      { day: "Wed", start: 9, end: 11, code: "DESN1001", name: "Design Studio" },
    ] },
  { id: "s4", name: "Linh Nguyen", initials: "LN", degree: "Law", nat: "VN", mapPos: { x: 71, y: 66 },
    timetable: [
      { day: "Tue", start: 9, end: 11, code: "LAWS1001", name: "Foundations of Law" },
      { day: "Thu", start: 9, end: 11, code: "LAWS1001", name: "Foundations of Law" },
    ] },
  { id: "s5", name: "Jake Robinson", initials: "JR", degree: "Engineering", nat: "AU", mapPos: { x: 78, y: 29 },
    timetable: [
      { day: "Mon", start: 9, end: 11, code: "ENGG1000", name: "Engineering Fundamentals" },
      { day: "Wed", start: 13, end: 15, code: "ENGG1000", name: "Workshop" },
      { day: "Fri", start: 11, end: 13, code: "ENGG1000", name: "Tutorial" },
    ] },
  { id: "s6", name: "Sofia Silva", initials: "SS", degree: "Arts / Psychology", nat: "BR", mapPos: { x: 36, y: 44 },
    timetable: [
      { day: "Wed", start: 9, end: 11, code: "PSYC1001", name: "Intro Psychology" },
      { day: "Fri", start: 13, end: 15, code: "PSYC1001", name: "Tutorial" },
    ] },
  { id: "s7", name: "Daniel Kim", initials: "DK", degree: "Science (Biology)", nat: "KR", mapPos: { x: 66, y: 47 },
    timetable: [
      { day: "Tue", start: 13, end: 15, code: "BIOL1001", name: "Cell Biology" },
      { day: "Thu", start: 9, end: 11, code: "BIOL1001", name: "Lab" },
    ] },
  { id: "s8", name: "Amara Okafor", initials: "AO", degree: "Business", nat: "NG", mapPos: { x: 51, y: 33 },
    timetable: [
      { day: "Wed", start: 11, end: 13, code: "MKTG1001", name: "Marketing Principles" },
      { day: "Mon", start: 14, end: 16, code: "MGMT1001", name: "Intro Management" },
    ] },
];

const LANDMARKS = [
  { name: "Quadrangle", x: 38, y: 42 }, { name: "Fisher Library", x: 55, y: 62 },
  { name: "Eastern Avenue", x: 50, y: 33 }, { name: "Manning House", x: 24, y: 28 },
  { name: "Great Hall", x: 40, y: 36 }, { name: "Carslaw", x: 65, y: 46 },
  { name: "Law School", x: 71, y: 64 }, { name: "Engineering", x: 77, y: 28 },
  { name: "Victoria Park", x: 14, y: 58 },
];

const INITIAL_POSTS = [
  { id: "p1", author: "Mia Chen", initials: "MC",
    text: "Anyone else's ECON1001 tutor moving next week's quiz? Feels like half the cohort missed the email.",
    likes: 6, likedByMe: false,
    comments: [{ id: "c1", author: "Amara Okafor", text: "Yes! Pushed to Friday, confirmed on Canvas." }] },
  { id: "p2", author: "Jake Robinson", initials: "JR",
    text: "Workshop group for ENGG1000 — we're missing one more person for the bridge-load project. DM if keen, we meet Wednesdays after class.",
    likes: 3, likedByMe: false, comments: [] },
  { id: "p3", author: "Yuki Tanaka", initials: "YT",
    text: "Design studio crit went well today. If anyone wants a second pair of eyes on a portfolio piece before submission, happy to swap feedback.",
    likes: 9, likedByMe: true,
    comments: [
      { id: "c2", author: "Sofia Silva", text: "Would love that, sending mine over!" },
      { id: "c3", author: "Daniel Kim", text: "Same, thank you 🙏" },
    ] },
];

const COMMUNITIES_SEED = [
  { id: "co1", name: "International Students Society", category: "Cultural", icon: "🌏", desc: "Weekly meetups, cultural nights and support for students from overseas.", members: 1200, joined: false },
  { id: "co2", name: "Vietnamese Students' Association", category: "Cultural", icon: "🇻🇳", desc: "Community and events for Vietnamese and Vietnamese-speaking students.", members: 340, joined: false },
  { id: "co3", name: "COMP2017 Study Group", category: "Academic", icon: "💻", desc: "Peer study sessions and past-paper walkthroughs for Systems Programming.", members: 58, joined: false },
  { id: "co4", name: "Marketing & Commerce Network", category: "Academic", icon: "📈", desc: "Case competitions, resume workshops and industry mixers.", members: 210, joined: false },
  { id: "co5", name: "USyd Chess Club", category: "Social", icon: "♟️", desc: "Casual games and ladder tournaments every Thursday at Manning.", members: 95, joined: false },
  { id: "co6", name: "Hiking & Outdoors Society", category: "Social", icon: "🥾", desc: "Weekend day-trips around the Blue Mountains and beyond.", members: 180, joined: false },
  { id: "co7", name: "Women in STEM", category: "Support", icon: "🔬", desc: "Mentorship, panels and a strong peer network across faculties.", members: 260, joined: false },
  { id: "co8", name: "Engineering Revue", category: "Social", icon: "🎭", desc: "Write, build and perform the annual engineering student revue.", members: 140, joined: false },
];

/* ---------------------------------------------------------------
   LIVE LOCATION — approximate lat/lng bounds of the main USyd
   campus, used to project a real GPS fix onto the stylized map.
   (A production version would use a calibrated map component —
   e.g. real map tiles with lat/lng markers — instead of an
   illustration; these bounds are approximate, for demo purposes.)
---------------------------------------------------------------- */
const CAMPUS_BOUNDS = { north: -33.8862, south: -33.8905, west: 151.1875, east: 151.1945 };
const latLngToPercent = (lat, lng) => {
  const xRaw = ((lng - CAMPUS_BOUNDS.west) / (CAMPUS_BOUNDS.east - CAMPUS_BOUNDS.west)) * 100;
  const yRaw = ((CAMPUS_BOUNDS.north - lat) / (CAMPUS_BOUNDS.north - CAMPUS_BOUNDS.south)) * 100;
  return { x: Math.max(2, Math.min(98, xRaw)), y: Math.max(2, Math.min(98, yRaw)), outOfBounds: xRaw < 0 || xRaw > 100 || yRaw < 0 || yRaw > 100 };
};

/* ---------------------------------------------------------------
   TIMETABLE HELPERS
---------------------------------------------------------------- */
const busySet = (timetable) => {
  const s = new Set();
  timetable.forEach((e) => { for (let h = e.start; h < e.end; h++) s.add(`${e.day}-${h}`); });
  return s;
};
const freeSlots = (timetable) => {
  const busy = busySet(timetable);
  const free = [];
  DAYS.forEach((d) => HOURS.forEach((h) => { if (!busy.has(`${d}-${h}`)) free.push(`${d}-${h}`); }));
  return free;
};
const sharedFreeSlots = (a, b) => { const setB = new Set(b); return a.filter((x) => setB.has(x)); };
const formatSlot = (slot) => { const [day, h] = slot.split("-"); return `${day} ${h}:00–${Number(h) + 1}:00`; };
const classmateMatches = (userTimetable) => {
  const userCodes = new Set(userTimetable.map((e) => e.code.trim().toUpperCase()).filter(Boolean));
  if (userCodes.size === 0) return [];
  return MOCK_STUDENTS.map((stu) => ({ student: stu, shared: stu.timetable.filter((e) => userCodes.has(e.code.trim().toUpperCase())) }))
    .filter((m) => m.shared.length > 0);
};

/* ---------------------------------------------------------------
   DECORATIVE — cloister arch strip
---------------------------------------------------------------- */
function ArchRow({ tone = C.sand100, stroke = C.terra700, height = 22 }) {
  return (
    <svg width="100%" height={height} viewBox="0 0 200 22" preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <pattern id="archPattern" width="20" height="22" patternUnits="userSpaceOnUse">
          <path d="M0,22 L0,11 A9,9 0 0 1 18,11 L18,22 Z" fill={tone} stroke={stroke} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="200" height="22" fill="url(#archPattern)" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   LOGIN / ONBOARDING
---------------------------------------------------------------- */
function LoginScreen({ onSignIn, onGuest }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = email.trim() && password.trim();

  return (
    <div style={{ padding: "48px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      <GraduationCap size={40} color={C.terra700} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: 26, color: C.ink900 }}>Uni-fied</div>
        <div style={{ fontSize: 13, color: C.ink600, marginTop: 4 }}>Sign in with your university email to get started.</div>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${C.line}`, borderRadius: 10, padding: "9px 12px", background: C.white }}>
          <Mail size={15} color={C.ink600} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@uni.edu.au"
            style={{ border: "none", outline: "none", flex: 1, fontSize: 13.5, fontFamily: "Inter, sans-serif", background: "transparent" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${C.line}`, borderRadius: 10, padding: "9px 12px", background: C.white }}>
          <Lock size={15} color={C.ink600} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
            onKeyDown={(e) => e.key === "Enter" && canSubmit && onSignIn()}
            style={{ border: "none", outline: "none", flex: 1, fontSize: 13.5, fontFamily: "Inter, sans-serif", background: "transparent" }} />
        </div>
      </div>

      <button onClick={onSignIn} disabled={!canSubmit} style={{ ...btnPrimary, width: "100%", justifyContent: "center", opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? "pointer" : "default" }}>
        Sign in
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", color: C.ink600, fontSize: 11.5 }}>
        <div style={{ flex: 1, height: 1, background: C.line }} /> or <div style={{ flex: 1, height: 1, background: C.line }} />
      </div>

      <button onClick={onGuest} style={{ ...btnGhost, width: "100%", justifyContent: "center", display: "flex" }}>Continue as guest</button>
      <div style={{ fontSize: 11, color: C.ink600, textAlign: "center" }}>This is a demo — sign-in isn't verified and nothing is saved after you refresh.</div>
    </div>
  );
}

function OnboardingScreen({ onComplete }) {
  const [form, setForm] = useState({ name: "", degree: "", nat: "AU", bio: "" });
  const canSubmit = form.name.trim().length > 0;
  return (
    <div style={{ padding: "36px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <div style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: 21, color: C.ink900 }}>Complete your profile</div>
        <div style={{ fontSize: 13, color: C.ink600, marginTop: 4 }}>This is what other students on Uni-fied will see.</div>
      </div>
      <Field label="Full name">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Alex Nguyen" style={{ ...inputStyle, width: "100%" }} />
      </Field>
      <Field label="Degree / program">
        <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} placeholder="e.g. Bachelor of Science" style={{ ...inputStyle, width: "100%" }} />
      </Field>
      <Field label="Nationality (for your map flag)">
        <select value={form.nat} onChange={(e) => setForm({ ...form, nat: e.target.value })} style={{ ...selectStyle, width: "100%" }}>
          {NATIONALITIES.map((n) => <option key={n.code} value={n.code}>{n.flag} {n.name}</option>)}
        </select>
      </Field>
      <Field label="Bio (optional)">
        <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} placeholder="A line about you…" style={{ ...inputStyle, width: "100%", resize: "none" }} />
      </Field>
      <button onClick={() => canSubmit && onComplete({ name: form.name.trim(), initials: initialsFromName(form.name), degree: form.degree.trim() || "Undeclared", nat: form.nat, bio: form.bio.trim() })}
        disabled={!canSubmit} style={{ ...btnPrimary, justifyContent: "center", opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? "pointer" : "default" }}>
        Get started
      </button>
    </div>
  );
}
function Field({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 11.5, color: C.ink600, fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   PROFILE EDITOR (overlay)
---------------------------------------------------------------- */
function ProfileEditor({ user, onSave, onClose, onLogout, friendCount, communityCount }) {
  const [form, setForm] = useState({ ...user });
  return (
    <div style={{ position: "absolute", inset: 0, background: C.white, zIndex: 20, display: "flex", flexDirection: "column" }}>
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <SectionTitle icon={<Pencil size={15} />} text="Edit profile" />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.ink600 }}><X size={20} /></button>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar initials={initialsFromName(form.name || "?")} size={52} />
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: 700, color: C.ink900, fontSize: 16 }}>{friendCount}</div>
              <div style={{ fontSize: 10.5, color: C.ink600 }}>friends</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: 700, color: C.ink900, fontSize: 16 }}>{communityCount}</div>
              <div style={{ fontSize: 10.5, color: C.ink600 }}>communities</div>
            </div>
          </div>
        </div>

        <Field label="Full name">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ ...inputStyle, width: "100%" }} />
        </Field>
        <Field label="Degree / program">
          <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })} style={{ ...inputStyle, width: "100%" }} />
        </Field>
        <Field label="Nationality (for your map flag)">
          <select value={form.nat} onChange={(e) => setForm({ ...form, nat: e.target.value })} style={{ ...selectStyle, width: "100%" }}>
            {NATIONALITIES.map((n) => <option key={n.code} value={n.code}>{n.flag} {n.name}</option>)}
          </select>
        </Field>
        <Field label="Bio">
          <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} style={{ ...inputStyle, width: "100%", resize: "none" }} />
        </Field>

        <button onClick={() => onSave({ ...form, initials: initialsFromName(form.name || "?") })} style={{ ...btnPrimary, justifyContent: "center" }}>Save changes</button>
        <button onClick={onLogout} style={{ ...btnGhost, justifyContent: "center", display: "flex", gap: 6, alignItems: "center" }}>
          <LogOut size={14} /> Log out
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   FEED TAB
---------------------------------------------------------------- */
function FeedTab({ user }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [draft, setDraft] = useState("");
  const [openComments, setOpenComments] = useState({});
  const [commentDraft, setCommentDraft] = useState({});
  const idRef = useRef(100);

  const addPost = () => {
    if (!draft.trim()) return;
    const p = { id: `p${idRef.current++}`, author: user.name, initials: user.initials, text: draft.trim(), likes: 0, likedByMe: false, comments: [] };
    setPosts([p, ...posts]);
    setDraft("");
  };
  const toggleLike = (id) => setPosts(posts.map((p) => p.id === id ? { ...p, likedByMe: !p.likedByMe, likes: p.likes + (p.likedByMe ? -1 : 1) } : p));
  const addComment = (id) => {
    const text = (commentDraft[id] || "").trim();
    if (!text) return;
    setPosts(posts.map((p) => p.id === id ? { ...p, comments: [...p.comments, { id: `c${idRef.current++}`, author: user.name, text }] } : p));
    setCommentDraft({ ...commentDraft, [id]: "" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14 }}>
        <div style={{ display: "flex", gap: 10 }}>
          <Avatar initials={user.initials} />
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Ask a question, share a note, find a study buddy…" rows={3}
            style={{ flex: 1, resize: "none", border: "none", outline: "none", fontFamily: "Inter, sans-serif", fontSize: 14.5, color: C.ink900, background: "transparent" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={addPost} style={btnPrimary}><Send size={14} style={{ marginRight: 6 }} /> Post</button>
        </div>
      </div>

      {posts.map((p) => (
        <div key={p.id} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
            <Avatar initials={p.initials} />
            <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: C.ink900, fontSize: 14.5 }}>{p.author}</div>
          </div>
          <div style={{ color: C.ink900, fontSize: 15, lineHeight: 1.5, marginBottom: 12 }}>{p.text}</div>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <button onClick={() => toggleLike(p.id)} style={iconBtn(p.likedByMe ? C.terra700 : C.ink600)}>
              <Heart size={16} fill={p.likedByMe ? C.terra700 : "none"} /> {p.likes}
            </button>
            <button onClick={() => setOpenComments({ ...openComments, [p.id]: !openComments[p.id] })} style={iconBtn(C.ink600)}>
              <MessageCircle size={16} /> {p.comments.length}
            </button>
          </div>
          {openComments[p.id] && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.line}`, display: "flex", flexDirection: "column", gap: 10 }}>
              {p.comments.map((c) => (
                <div key={c.id} style={{ fontSize: 13.5, color: C.ink900 }}>
                  <span style={{ fontWeight: 600 }}>{c.author}</span> <span style={{ color: C.ink600 }}>{c.text}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8 }}>
                <input value={commentDraft[p.id] || ""} onChange={(e) => setCommentDraft({ ...commentDraft, [p.id]: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && addComment(p.id)} placeholder="Write a comment…" style={inputStyle} />
                <button onClick={() => addComment(p.id)} style={btnGhost}>Reply</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------
   TIMETABLE TAB
---------------------------------------------------------------- */
function TimetableTab({ userTimetable, setUserTimetable, friendStatus, onAddFriend }) {
  const [form, setForm] = useState({ day: "Mon", start: 9, end: 10, code: "", name: "" });
  const idRef = useRef(1);

  const addEntry = () => {
    if (!form.code.trim() || Number(form.end) <= Number(form.start)) return;
    setUserTimetable([...userTimetable, { id: idRef.current++, ...form, start: Number(form.start), end: Number(form.end) }]);
    setForm({ ...form, code: "", name: "" });
  };
  const removeEntry = (id) => setUserTimetable(userTimetable.filter((e) => e.id !== id));
  const matches = classmateMatches(userTimetable);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16 }}>
        <SectionTitle icon={<Plus size={15} />} text="Add a class" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} style={selectStyle}>
            {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={form.start} onChange={(e) => setForm({ ...form, start: Number(e.target.value) })} style={selectStyle}>
            {HOURS.map((h) => <option key={h} value={h}>{h}:00</option>)}
          </select>
          <span style={{ alignSelf: "center", color: C.ink600, fontSize: 13 }}>to</span>
          <select value={form.end} onChange={(e) => setForm({ ...form, end: Number(e.target.value) })} style={selectStyle}>
            {[...HOURS, 18].map((h) => <option key={h} value={h}>{h}:00</option>)}
          </select>
          <input placeholder="Code e.g. MKTG1001" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} style={{ ...inputStyle, width: 140 }} />
          <input placeholder="Class name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ ...inputStyle, width: 160 }} />
          <button onClick={addEntry} style={btnPrimary}>Add</button>
        </div>
        <div style={{ fontSize: 12, color: C.ink600, marginTop: 8 }}>Tip — try adding <b>MKTG1001</b> or <b>COMP2017</b> to see classmate matches below.</div>
      </div>

      <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16, overflowX: "auto" }}>
        <SectionTitle icon={<CalendarDays size={15} />} text="Your week" />
        <div style={{ marginTop: 10, minWidth: 480 }}>
          <div style={{ display: "grid", gridTemplateColumns: `50px repeat(${DAYS.length}, 1fr)`, gridTemplateRows: `28px repeat(${HOURS.length}, 38px)`, position: "relative" }}>
            <div />
            {DAYS.map((d, i) => <div key={d} style={{ gridColumn: i + 2, gridRow: 1, fontFamily: "IBM Plex Mono, monospace", fontSize: 12, color: C.terra700, fontWeight: 600, textAlign: "center" }}>{d}</div>)}
            {HOURS.map((h, ri) => <div key={h} style={{ gridColumn: 1, gridRow: ri + 2, fontSize: 11, color: C.ink600, fontFamily: "IBM Plex Mono, monospace", paddingTop: 2 }}>{h}:00</div>)}
            {HOURS.map((h, ri) => DAYS.map((d, ci) => (
              <div key={`${d}-${h}`} style={{ gridColumn: ci + 2, gridRow: ri + 2, borderTop: `1px solid ${C.sand100}`, borderLeft: ci === 0 ? "none" : `1px solid ${C.sand100}` }} />
            )))}
            {userTimetable.map((e) => (
              <div key={e.id} onClick={() => removeEntry(e.id)} title="Click to remove"
                style={{ gridColumn: DAYS.indexOf(e.day) + 2, gridRow: `${HOURS.indexOf(e.start) + 2} / ${HOURS.indexOf(e.start) + 2 + (e.end - e.start)}`,
                  background: colorForCode(e.code || "X"), color: "#fff", borderRadius: 6, margin: 2, padding: "4px 6px", fontSize: 11, fontFamily: "Inter, sans-serif", cursor: "pointer", overflow: "hidden", zIndex: 2 }}>
                <div style={{ fontWeight: 700 }}>{e.code || "—"}</div>
                <div style={{ opacity: 0.9 }}>{e.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <SectionTitle icon={<Users size={15} />} text="Classmates found" />
        {matches.length === 0 ? <EmptyNote text="Add a class with a course code to find people sitting in the same lecture." /> : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
            {matches.map(({ student, shared }) => (
              <div key={student.id} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <Avatar initials={student.initials} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: C.ink900 }}>{student.name} <span style={{ marginLeft: 4 }}>{flagFor(student.nat)}</span></div>
                  <div style={{ fontSize: 12.5, color: C.ink600 }}>{student.degree}</div>
                  <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {shared.map((s, i) => <span key={i} style={pill(C.lawn100, C.lawn700)}>{s.code} · {s.day} {s.start}:00</span>)}
                  </div>
                </div>
                <FriendButton status={friendStatus[student.id] || "none"} onAdd={() => onAddFriend(student.id)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   FRIEND BUTTON
---------------------------------------------------------------- */
function FriendButton({ status, onAdd }) {
  if (status === "friends") return <span style={{ ...pill(C.lawn100, C.lawn700), display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}><Check size={12} /> Friends</span>;
  if (status === "pending") return <span style={{ ...pill(C.sand100, C.ink600), display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}><Clock size={12} /> Pending</span>;
  return <button onClick={onAdd} style={{ ...btnGhost, display: "flex", alignItems: "center", gap: 5, flexShrink: 0, whiteSpace: "nowrap" }}><UserPlus size={13} /> Add</button>;
}

/* ---------------------------------------------------------------
   PEOPLE TAB — friends, classmates, free-time matches
---------------------------------------------------------------- */
function PeopleTab({ userTimetable, friendStatus, onAddFriend, onRemoveFriend }) {
  const userFree = freeSlots(userTimetable);
  const friends = MOCK_STUDENTS.filter((s) => friendStatus[s.id] === "friends");
  const ranked = MOCK_STUDENTS.map((stu) => ({ student: stu, shared: sharedFreeSlots(userFree, freeSlots(stu.timetable)) }))
    .sort((a, b) => b.shared.length - a.shared.length);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {friends.length > 0 && (
        <div>
          <SectionTitle icon={<Users size={15} />} text={`Your friends (${friends.length})`} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
            {friends.map((f) => (
              <div key={f.id} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, display: "flex", gap: 12, alignItems: "center" }}>
                <Avatar initials={f.initials} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: C.ink900 }}>{f.name} <span style={{ marginLeft: 4 }}>{flagFor(f.nat)}</span></div>
                  <div style={{ fontSize: 12.5, color: C.ink600 }}>{f.degree}</div>
                </div>
                <button onClick={() => onRemoveFriend(f.id)} style={{ background: "none", border: "none", color: C.ink600, cursor: "pointer" }}><X size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div style={{ background: C.terra100, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
          <Sparkles size={18} color={C.terra700} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: 13.5, color: C.ink900 }}>Ranked by how many free weekday hours (9am–6pm) you both have in common, based on your timetable.</div>
        </div>
        <SectionTitle icon={<Sparkles size={15} />} text="Similar free time" />
        {userTimetable.length === 0 && <EmptyNote text="Your whole week counts as free right now — add classes on the Timetable tab first for sharper matches." />}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
          {ranked.map(({ student, shared }) => (
            <div key={student.id} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, display: "flex", gap: 12 }}>
              <Avatar initials={student.initials} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: C.ink900 }}>{student.name} <span style={{ marginLeft: 4 }}>{flagFor(student.nat)}</span></div>
                  <span style={pill(C.lawn100, C.lawn700)}>{shared.length} free hrs shared</span>
                </div>
                <div style={{ fontSize: 12.5, color: C.ink600, marginBottom: 6 }}>{student.degree}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                  {shared.slice(0, 4).map((s, i) => <span key={i} style={pill(C.sand100, C.terra700)}>{formatSlot(s)}</span>)}
                  {shared.length > 4 && <span style={{ fontSize: 11.5, color: C.ink600 }}>+{shared.length - 4} more</span>}
                </div>
                <FriendButton status={friendStatus[student.id] || "none"} onAdd={() => onAddFriend(student.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   COMMUNITIES TAB
---------------------------------------------------------------- */
function CommunitiesTab({ communities, setCommunities }) {
  const [form, setForm] = useState({ name: "", desc: "" });
  const idRef = useRef(1);

  const toggleJoin = (id) => setCommunities(communities.map((c) => c.id === id ? { ...c, joined: !c.joined, members: c.members + (c.joined ? -1 : 1) } : c));
  const createCommunity = () => {
    if (!form.name.trim()) return;
    setCommunities([{ id: `custom${idRef.current++}`, name: form.name.trim(), category: "Your community", icon: "✨", desc: form.desc.trim() || "A new community on Uni-fied.", members: 1, joined: true }, ...communities]);
    setForm({ name: "", desc: "" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14 }}>
        <SectionTitle icon={<Plus size={15} />} text="Start a community" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
          <input placeholder="Community name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ ...inputStyle, minWidth: 160 }} />
          <input placeholder="Short description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} style={{ ...inputStyle, minWidth: 160 }} />
          <button onClick={createCommunity} style={btnPrimary}>Create</button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {communities.map((c) => (
          <div key={c.id} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 26, lineHeight: 1 }}>{c.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14.5, color: C.ink900 }}>{c.name}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 2, marginBottom: 6 }}>
                <span style={pill(C.sand100, C.terra700)}>{c.category}</span>
                <span style={{ fontSize: 12, color: C.ink600 }}>{c.members} members</span>
              </div>
              <div style={{ fontSize: 13, color: C.ink600, lineHeight: 1.4 }}>{c.desc}</div>
            </div>
            <button onClick={() => toggleJoin(c.id)} style={c.joined ? btnGhostDisabled : btnPrimary}>{c.joined ? "Joined ✓" : "Join"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   MAP TAB
---------------------------------------------------------------- */
function CampusMap({ userPin, isLive, onManualPick, allowManualPick, friendStatus }) {
  const ref = useRef(null);
  const handleClick = (e) => {
    if (!allowManualPick) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onManualPick(Math.max(3, Math.min(97, x)), Math.max(3, Math.min(97, y)));
  };
  return (
    <div ref={ref} onClick={handleClick} style={{ position: "relative", width: "100%", paddingTop: "62%", borderRadius: 14, overflow: "hidden", border: `1px solid ${C.line}`, cursor: allowManualPick ? "crosshair" : "default" }}>
      <svg viewBox="0 0 100 62" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <rect x="0" y="0" width="100" height="62" fill={C.lawn100} />
        <path d="M0,33 L100,33" stroke={C.sand200} strokeWidth="3" />
        <path d="M50,0 L50,62" stroke={C.sand200} strokeWidth="1.4" opacity="0.6" />
        <ellipse cx="14" cy="58" rx="13" ry="7" fill={C.lawn700} opacity="0.35" />
        {[[34,38,10,7],[47,32,9,6],[62,42,11,7],[68,60,10,7],[74,25,10,7],[21,25,9,6]].map(([x,y,w,h],i)=>(
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill={C.sand100} stroke={C.terra700} strokeWidth="0.4" />
            {Array.from({length: Math.max(2, Math.floor(w/2))}).map((_,j)=>(
              <path key={j} d={`M${x+1+j*2},${y+h} L${x+1+j*2},${y+2} A0.9,0.9 0 0 1 ${x+1+j*2+1.2},${y+2} L${x+1+j*2+1.2},${y+h} Z`} fill="none" stroke={C.terra700} strokeWidth="0.25" />
            ))}
          </g>
        ))}
        {LANDMARKS.map((l) => <text key={l.name} x={l.x} y={l.y - 2.5} fontSize="2.6" fontFamily="IBM Plex Mono, monospace" fill={C.ink600} textAnchor="middle">{l.name}</text>)}
      </svg>

      {MOCK_STUDENTS.map((s) => {
        const isFriend = friendStatus[s.id] === "friends";
        const dotColor = isFriend ? C.lawn700 : C.terra700;
        return (
          <div key={s.id} title={`${s.name} · ${nameFor(s.nat)} · ${isFriend ? "friend" : "not connected"}`} style={{ position: "absolute", left: `${s.mapPos.x}%`, top: `${s.mapPos.y}%`, transform: "translate(-50%,-100%)", textAlign: "center" }}>
            <div style={{ fontSize: 20, lineHeight: 1 }}>{flagFor(s.nat)}</div>
            <div style={{ width: 8, height: 8, borderRadius: 999, background: dotColor, margin: "2px auto 0", boxShadow: "0 0 0 2px #fff" }} />
          </div>
        );
      })}

      {userPin && (
        <div title="You" style={{ position: "absolute", left: `${userPin.x}%`, top: `${userPin.y}%`, transform: "translate(-50%,-100%)", textAlign: "center" }}>
          <div style={{ position: "relative", width: 30, height: 30, margin: "0 auto" }}>
            {isLive && <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: C.lawn700, opacity: 0.5, animation: "livePulse 1.8s ease-out infinite" }} />}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{userPin.nat ? flagFor(userPin.nat) : null}</div>
          </div>
          <div style={{ width: 8, height: 8, borderRadius: 999, background: userPin.nat ? C.lawn700 : "#3FA34D", margin: "2px auto 0", boxShadow: `0 0 0 3px ${C.white}` }} />
        </div>
      )}
    </div>
  );
}

function MapTab({ user, friendStatus }) {
  const [sharing, setSharing] = useState(false);
  const [showFlag, setShowFlag] = useState(true);
  const [liveState, setLiveState] = useState("idle"); // idle | locating | live | denied | unsupported
  const [userPin, setUserPin] = useState(null);
  const watchIdRef = useRef(null);

  useEffect(() => {
    if (sharing) {
      if (!("geolocation" in navigator)) { setLiveState("unsupported"); return; }
      setLiveState("locating");
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => { setUserPin(latLngToPercent(pos.coords.latitude, pos.coords.longitude)); setLiveState("live"); },
        () => setLiveState("denied"),
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
    } else {
      if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null; setUserPin(null); setLiveState("idle");
    }
    return () => { if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current); };
  }, [sharing]);

  const allowManualPick = sharing && (liveState === "denied" || liveState === "unsupported");
  const simulateCampusLocation = () => {
    // A sample coordinate near the Quadrangle, for testing without real GPS or DevTools.
    setUserPin(latLngToPercent(-33.888, 151.19));
    setLiveState("live");
  };
  const statusText = {
    idle: "Turn on sharing to appear on the map.",
    locating: "Finding your live location…",
    live: "Showing your live location.",
    denied: "Location permission denied — tap the map to set your spot manually.",
    unsupported: "Live location isn't supported here — tap the map to set your spot manually.",
  }[liveState];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <SectionTitle icon={<MapPin size={15} />} text="Campus map" />
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.ink900 }}>
            <input type="checkbox" checked={sharing} onChange={(e) => setSharing(e.target.checked)} />
            Share my location
          </label>
        </div>
        {sharing && (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 12.5, color: liveState === "live" ? C.lawn700 : C.ink600 }}>{statusText}</span>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.ink900 }}>
              <input type="checkbox" checked={showFlag} onChange={(e) => setShowFlag(e.target.checked)} />
              Show my flag ({flagFor(user.nat)} {nameFor(user.nat)}, set from your profile)
            </label>
            <button onClick={simulateCampusLocation} style={{ ...btnGhost, alignSelf: "flex-start", fontSize: 11.5, padding: "5px 10px" }}>
              Simulate a campus location (for testing)
            </button>
          </div>
        )}
      </div>

      <CampusMap
        userPin={sharing && userPin ? { ...userPin, nat: showFlag ? user.nat : null } : null}
        isLive={liveState === "live"}
        allowManualPick={allowManualPick}
        onManualPick={(x, y) => setUserPin({ x, y })}
        friendStatus={friendStatus}
      />

      <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.ink600, flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: C.lawn700, display: "inline-block" }} /> Friends</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: C.terra700, display: "inline-block" }} /> Everyone else</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: "#3FA34D", display: "inline-block" }} /> You, flag hidden</span>
      </div>
      <div style={{ fontSize: 12.5, color: C.ink600, display: "flex", alignItems: "center", gap: 6 }}>
        <Share2 size={13} /> Your flag is set from the nationality on your profile — you only choose whether it's shown.
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SHARED BITS
---------------------------------------------------------------- */
function Avatar({ initials, size = 34 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: C.terra700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.37, fontWeight: 700, fontFamily: "Inter, sans-serif", flexShrink: 0 }}>
      {initials}
    </div>
  );
}
function SectionTitle({ icon, text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 16, color: C.ink900 }}>
      <span style={{ color: C.terra700 }}>{icon}</span>{text}
    </div>
  );
}
function EmptyNote({ text }) {
  return <div style={{ fontSize: 13, color: C.ink600, background: C.sand100, borderRadius: 10, padding: 12, marginTop: 8 }}>{text}</div>;
}
const pill = (bg, fg) => ({ background: bg, color: fg, fontSize: 11.5, fontFamily: "IBM Plex Mono, monospace", padding: "3px 8px", borderRadius: 999, fontWeight: 600 });
const btnPrimary = { display: "flex", alignItems: "center", background: C.white, color: C.terra700, border: `1.5px solid ${C.terra700}`, borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" };
const btnGhost = { background: C.white, color: C.terra700, border: `1px solid ${C.terra700}`, borderRadius: 999, padding: "7px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" };
const btnGhostDisabled = { ...btnGhost, background: C.white, color: C.lawn700, border: `1px solid ${C.lawn700}`, cursor: "default" };
const iconBtn = (color) => ({ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" });
const inputStyle = { flex: 1, border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 10px", fontSize: 13, fontFamily: "Inter, sans-serif", outline: "none" };
const selectStyle = { border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 8px", fontSize: 13, fontFamily: "Inter, sans-serif", background: "#fff", outline: "none" };

/* ---------------------------------------------------------------
   APP SHELL
---------------------------------------------------------------- */
const TABS = [
  { id: "feed", label: "Feed", icon: Rss },
  { id: "timetable", label: "Timetable", icon: CalendarDays },
  { id: "people", label: "People", icon: Users },
  { id: "communities", label: "Communities", icon: Building2 },
  { id: "map", label: "Map", icon: MapPin },
];

export default function UnifiedApp() {
  const [authStep, setAuthStep] = useState("login"); // login | onboarding | app
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("feed");
  const [userTimetable, setUserTimetable] = useState([]);
  const [friendStatus, setFriendStatus] = useState({});
  const [communities, setCommunities] = useState(COMMUNITIES_SEED);
  const [showProfile, setShowProfile] = useState(false);

  const addFriend = (id) => {
    setFriendStatus((prev) => ({ ...prev, [id]: "pending" }));
    setTimeout(() => setFriendStatus((prev) => (prev[id] === "pending" ? { ...prev, [id]: "friends" } : prev)), 1400);
  };
  const removeFriend = (id) => setFriendStatus((prev) => { const next = { ...prev }; delete next[id]; return next; });

  const handleGuest = () => { setUser({ name: "Guest Student", initials: "GS", degree: "Undeclared", nat: "AU", bio: "" }); setAuthStep("app"); };
  const handleLogout = () => {
    setUser(null); setAuthStep("login"); setTab("feed"); setUserTimetable([]); setFriendStatus({});
    setCommunities(COMMUNITIES_SEED); setShowProfile(false);
  };

  const friendCount = Object.values(friendStatus).filter((v) => v === "friends").length;
  const communityCount = communities.filter((c) => c.joined).length;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: C.white, minHeight: 640, fontFamily: "Inter, sans-serif", borderRadius: 20, overflow: "hidden", border: `1px solid ${C.line}`, boxShadow: "0 20px 50px -20px rgba(38,34,27,0.35)", position: "relative" }}>
      <style>{`${FONT_IMPORT} * { box-sizing: border-box; } input:focus, select:focus, textarea:focus { border-color: ${C.terra700}; } @keyframes livePulse { 0% { transform: scale(0.6); opacity: 0.7; } 70% { transform: scale(2.4); opacity: 0; } 100% { opacity: 0; } }`}</style>

      {authStep !== "app" ? (
        <div>
          {authStep === "login" && <LoginScreen onSignIn={() => setAuthStep("onboarding")} onGuest={handleGuest} />}
          {authStep === "onboarding" && <OnboardingScreen onComplete={(u) => { setUser(u); setAuthStep("app"); }} />}
        </div>
      ) : (
        <>
          {showProfile && (
            <ProfileEditor user={user} friendCount={friendCount} communityCount={communityCount}
              onSave={(u) => { setUser(u); setShowProfile(false); }} onClose={() => setShowProfile(false)} onLogout={handleLogout} />
          )}

          <div style={{ background: C.ink900, padding: "18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <GraduationCap size={22} color={C.gold500} />
              <div style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: 21, color: C.sand50, letterSpacing: 0.3 }}>Uni-fied</div>
              <button onClick={() => setShowProfile(true)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", padding: 0 }} title="Edit profile">
                <Avatar initials={user.initials} size={30} />
              </button>
            </div>
          </div>


          <div style={{ padding: 18, paddingBottom: 90 }}>
            {tab === "feed" && <FeedTab user={user} />}
            {tab === "timetable" && <TimetableTab userTimetable={userTimetable} setUserTimetable={setUserTimetable} friendStatus={friendStatus} onAddFriend={addFriend} />}
            {tab === "people" && <PeopleTab userTimetable={userTimetable} friendStatus={friendStatus} onAddFriend={addFriend} onRemoveFriend={removeFriend} />}
            {tab === "communities" && <CommunitiesTab communities={communities} setCommunities={setCommunities} />}
            {tab === "map" && <MapTab user={user} friendStatus={friendStatus} />}
          </div>

          <div style={{ position: "sticky", bottom: 0, background: C.white, borderTop: `1px solid ${C.line}`, display: "flex" }}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id)} title={label} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 4px", background: "none", border: "none", cursor: "pointer", color: tab === id ? C.terra700 : C.ink600 }}>
                <Icon size={20} strokeWidth={tab === id ? 2.4 : 1.8} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}