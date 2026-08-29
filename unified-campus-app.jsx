import React, { useState, useRef } from "react";
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
} from "lucide-react";

/* ---------------------------------------------------------------
   TOKENS — grounded in the University of Sydney's sandstone
   Quadrangle: warm stone, cloister-arch geometry, quad lawn green.
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
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // each is start of a 1hr block, day ends 18:00

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

const COURSE_COLORS = [C.terra700, C.lawn700, C.ink900, C.terra600, "#4E7796"];
const colorForCode = (code) => {
  let h = 0;
  for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) % COURSE_COLORS.length;
  return COURSE_COLORS[h];
};

const MOCK_STUDENTS = [
  {
    id: "s1", name: "Mia Chen", initials: "MC", degree: "Bachelor of Commerce",
    nat: "CN", mapPos: { x: 55, y: 58 },
    timetable: [
      { day: "Mon", start: 9, end: 11, code: "ECON1001", name: "Intro Microeconomics" },
      { day: "Wed", start: 11, end: 13, code: "MKTG1001", name: "Marketing Principles" },
      { day: "Fri", start: 9, end: 10, code: "ECON1001", name: "Tutorial" },
    ],
  },
  {
    id: "s2", name: "Arjun Patel", initials: "AP", degree: "Computer Science",
    nat: "IN", mapPos: { x: 74, y: 32 },
    timetable: [
      { day: "Mon", start: 9, end: 10, code: "COMP2017", name: "Tutorial" },
      { day: "Tue", start: 10, end: 12, code: "COMP2017", name: "Systems Programming" },
      { day: "Thu", start: 14, end: 16, code: "COMP2123", name: "Data Structures" },
    ],
  },
  {
    id: "s3", name: "Yuki Tanaka", initials: "YT", degree: "Design",
    nat: "JP", mapPos: { x: 49, y: 34 },
    timetable: [
      { day: "Mon", start: 13, end: 15, code: "DESN1001", name: "Design Studio" },
      { day: "Wed", start: 9, end: 11, code: "DESN1001", name: "Design Studio" },
    ],
  },
  {
    id: "s4", name: "Linh Nguyen", initials: "LN", degree: "Law",
    nat: "VN", mapPos: { x: 71, y: 66 },
    timetable: [
      { day: "Tue", start: 9, end: 11, code: "LAWS1001", name: "Foundations of Law" },
      { day: "Thu", start: 9, end: 11, code: "LAWS1001", name: "Foundations of Law" },
    ],
  },
  {
    id: "s5", name: "Jake Robinson", initials: "JR", degree: "Engineering",
    nat: "AU", mapPos: { x: 78, y: 29 },
    timetable: [
      { day: "Mon", start: 9, end: 11, code: "ENGG1000", name: "Engineering Fundamentals" },
      { day: "Wed", start: 13, end: 15, code: "ENGG1000", name: "Workshop" },
      { day: "Fri", start: 11, end: 13, code: "ENGG1000", name: "Tutorial" },
    ],
  },
  {
    id: "s6", name: "Sofia Silva", initials: "SS", degree: "Arts / Psychology",
    nat: "BR", mapPos: { x: 36, y: 44 },
    timetable: [
      { day: "Wed", start: 9, end: 11, code: "PSYC1001", name: "Intro Psychology" },
      { day: "Fri", start: 13, end: 15, code: "PSYC1001", name: "Tutorial" },
    ],
  },
  {
    id: "s7", name: "Daniel Kim", initials: "DK", degree: "Science (Biology)",
    nat: "KR", mapPos: { x: 66, y: 47 },
    timetable: [
      { day: "Tue", start: 13, end: 15, code: "BIOL1001", name: "Cell Biology" },
      { day: "Thu", start: 9, end: 11, code: "BIOL1001", name: "Lab" },
    ],
  },
  {
    id: "s8", name: "Amara Okafor", initials: "AO", degree: "Business",
    nat: "NG", mapPos: { x: 51, y: 33 },
    timetable: [
      { day: "Wed", start: 11, end: 13, code: "MKTG1001", name: "Marketing Principles" },
      { day: "Mon", start: 14, end: 16, code: "MGMT1001", name: "Intro Management" },
    ],
  },
];

const LANDMARKS = [
  { name: "Quadrangle", x: 38, y: 42 },
  { name: "Fisher Library", x: 55, y: 62 },
  { name: "Eastern Avenue", x: 50, y: 33 },
  { name: "Manning House", x: 24, y: 28 },
  { name: "Great Hall", x: 40, y: 36 },
  { name: "Carslaw", x: 65, y: 46 },
  { name: "Law School", x: 71, y: 64 },
  { name: "Engineering", x: 77, y: 28 },
  { name: "Victoria Park", x: 14, y: 58 },
];

const INITIAL_POSTS = [
  {
    id: "p1", author: "Mia Chen", initials: "MC",
    text: "Anyone else's ECON1001 tutor moving next week's quiz? Feels like half the cohort missed the email.",
    likes: 6, likedByMe: false,
    comments: [
      { id: "c1", author: "Amara Okafor", text: "Yes! Pushed to Friday, confirmed on Canvas." },
    ],
  },
  {
    id: "p2", author: "Jake Robinson", initials: "JR",
    text: "Workshop group for ENGG1000 — we're missing one more person for the bridge-load project. DM if keen, we meet Wednesdays after class.",
    likes: 3, likedByMe: false, comments: [],
  },
  {
    id: "p3", author: "Yuki Tanaka", initials: "YT",
    text: "Design studio crit went well today. If anyone wants a second pair of eyes on a portfolio piece before submission, happy to swap feedback.",
    likes: 9, likedByMe: true,
    comments: [
      { id: "c2", author: "Sofia Silva", text: "Would love that, sending mine over!" },
      { id: "c3", author: "Daniel Kim", text: "Same, thank you 🙏" },
    ],
  },
];

/* ---------------------------------------------------------------
   TIMETABLE HELPERS
---------------------------------------------------------------- */
const busySet = (timetable) => {
  const s = new Set();
  timetable.forEach((e) => {
    for (let h = e.start; h < e.end; h++) s.add(`${e.day}-${h}`);
  });
  return s;
};
const freeSlots = (timetable) => {
  const busy = busySet(timetable);
  const free = [];
  DAYS.forEach((d) => HOURS.forEach((h) => { if (!busy.has(`${d}-${h}`)) free.push(`${d}-${h}`); }));
  return free;
};
const sharedFreeSlots = (a, b) => {
  const setB = new Set(b);
  return a.filter((x) => setB.has(x));
};
const formatSlot = (slot) => {
  const [day, h] = slot.split("-");
  return `${day} ${h}:00–${Number(h) + 1}:00`;
};
const classmateMatches = (userTimetable) => {
  const userCodes = new Set(userTimetable.map((e) => e.code.trim().toUpperCase()).filter(Boolean));
  if (userCodes.size === 0) return [];
  return MOCK_STUDENTS.map((stu) => {
    const shared = stu.timetable.filter((e) => userCodes.has(e.code.trim().toUpperCase()));
    return { student: stu, shared };
  }).filter((m) => m.shared.length > 0);
};

/* ---------------------------------------------------------------
   DECORATIVE — cloister arch strip, echoing the Quadrangle arcade
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
   FEED TAB
---------------------------------------------------------------- */
function FeedTab() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [draft, setDraft] = useState("");
  const [openComments, setOpenComments] = useState({});
  const [commentDraft, setCommentDraft] = useState({});
  const idRef = useRef(100);

  const addPost = () => {
    if (!draft.trim()) return;
    const p = { id: `p${idRef.current++}`, author: "You", initials: "Y", text: draft.trim(), likes: 0, likedByMe: false, comments: [] };
    setPosts([p, ...posts]);
    setDraft("");
  };
  const toggleLike = (id) => {
    setPosts(posts.map((p) => p.id === id ? { ...p, likedByMe: !p.likedByMe, likes: p.likes + (p.likedByMe ? -1 : 1) } : p));
  };
  const addComment = (id) => {
    const text = (commentDraft[id] || "").trim();
    if (!text) return;
    setPosts(posts.map((p) => p.id === id ? { ...p, comments: [...p.comments, { id: `c${idRef.current++}`, author: "You", text }] } : p));
    setCommentDraft({ ...commentDraft, [id]: "" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14 }}>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask a question, share a note, find a study buddy…"
          rows={3}
          style={{ width: "100%", resize: "none", border: "none", outline: "none", fontFamily: "Inter, sans-serif", fontSize: 14.5, color: C.ink900, background: "transparent" }}
        />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={addPost} style={btnPrimary}>
            <Send size={14} style={{ marginRight: 6 }} /> Post
          </button>
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
                  <span style={{ fontWeight: 600 }}>{c.author}</span>{" "}
                  <span style={{ color: C.ink600 }}>{c.text}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={commentDraft[p.id] || ""}
                  onChange={(e) => setCommentDraft({ ...commentDraft, [p.id]: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && addComment(p.id)}
                  placeholder="Write a comment…"
                  style={inputStyle}
                />
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
function TimetableTab({ userTimetable, setUserTimetable }) {
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
        <div style={{ fontSize: 12, color: C.ink600, marginTop: 8 }}>
          Tip — try adding <b>MKTG1001</b> or <b>COMP2017</b> to see classmate matches below.
        </div>
      </div>

      <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16, overflowX: "auto" }}>
        <SectionTitle icon={<CalendarDays size={15} />} text="Your week" />
        <div style={{ marginTop: 10, minWidth: 480 }}>
          <div style={{ display: "grid", gridTemplateColumns: `50px repeat(${DAYS.length}, 1fr)`, gridTemplateRows: `28px repeat(${HOURS.length}, 38px)`, position: "relative" }}>
            <div />
            {DAYS.map((d, i) => (
              <div key={d} style={{ gridColumn: i + 2, gridRow: 1, fontFamily: "IBM Plex Mono, monospace", fontSize: 12, color: C.terra700, fontWeight: 600, textAlign: "center" }}>{d}</div>
            ))}
            {HOURS.map((h, ri) => (
              <div key={h} style={{ gridColumn: 1, gridRow: ri + 2, fontSize: 11, color: C.ink600, fontFamily: "IBM Plex Mono, monospace", paddingTop: 2 }}>{h}:00</div>
            ))}
            {HOURS.map((h, ri) => DAYS.map((d, ci) => (
              <div key={`${d}-${h}`} style={{ gridColumn: ci + 2, gridRow: ri + 2, borderTop: `1px solid ${C.sand100}`, borderLeft: ci === 0 ? "none" : `1px solid ${C.sand100}` }} />
            )))}
            {userTimetable.map((e) => (
              <div key={e.id}
                onClick={() => removeEntry(e.id)}
                title="Click to remove"
                style={{
                  gridColumn: DAYS.indexOf(e.day) + 2,
                  gridRow: `${HOURS.indexOf(e.start) + 2} / ${HOURS.indexOf(e.start) + 2 + (e.end - e.start)}`,
                  background: colorForCode(e.code || "X"), color: "#fff", borderRadius: 6, margin: 2, padding: "4px 6px",
                  fontSize: 11, fontFamily: "Inter, sans-serif", cursor: "pointer", overflow: "hidden", zIndex: 2,
                }}>
                <div style={{ fontWeight: 700 }}>{e.code || "—"}</div>
                <div style={{ opacity: 0.9 }}>{e.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <SectionTitle icon={<Users size={15} />} text="Classmates found" />
        {matches.length === 0 ? (
          <EmptyNote text="Add a class with a course code to find people sitting in the same lecture." />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
            {matches.map(({ student, shared }) => (
              <div key={student.id} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <Avatar initials={student.initials} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: C.ink900 }}>{student.name} <span style={{ marginLeft: 4 }}>{flagFor(student.nat)}</span></div>
                  <div style={{ fontSize: 12.5, color: C.ink600 }}>{student.degree}</div>
                  <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {shared.map((s, i) => (
                      <span key={i} style={pill(C.lawn100, C.lawn700)}>{s.code} · {s.day} {s.start}:00</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   COMMUNITY TAB — shared free-time matching
---------------------------------------------------------------- */
function CommunityTab({ userTimetable }) {
  const [connected, setConnected] = useState({});
  const userFree = freeSlots(userTimetable);

  const ranked = MOCK_STUDENTS.map((stu) => {
    const shared = sharedFreeSlots(userFree, freeSlots(stu.timetable));
    return { student: stu, shared };
  }).sort((a, b) => b.shared.length - a.shared.length);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: C.terra100, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Sparkles size={18} color={C.terra700} style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: 13.5, color: C.ink900 }}>
          Ranked by how many free weekday hours (9am–6pm) you both have in common, based on the timetable you've built. Add more classes for sharper matches.
        </div>
      </div>

      {userTimetable.length === 0 && <EmptyNote text="Your whole week counts as free right now — add classes on the Timetable tab first for real matches." />}

      {ranked.map(({ student, shared }) => (
        <div key={student.id} style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, display: "flex", gap: 12 }}>
          <Avatar initials={student.initials} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.ink900 }}>{student.name} <span style={{ marginLeft: 4 }}>{flagFor(student.nat)}</span></div>
              <span style={pill(C.lawn100, C.lawn700)}>{shared.length} free hrs shared</span>
            </div>
            <div style={{ fontSize: 12.5, color: C.ink600, marginBottom: 6 }}>{student.degree}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
              {shared.slice(0, 4).map((s, i) => <span key={i} style={pill(C.sand100, C.terra700)}>{formatSlot(s)}</span>)}
              {shared.length > 4 && <span style={{ fontSize: 11.5, color: C.ink600 }}>+{shared.length - 4} more</span>}
            </div>
            <button onClick={() => setConnected({ ...connected, [student.id]: true })} style={connected[student.id] ? btnGhostDisabled : btnGhost}>
              {connected[student.id] ? "Request sent ✓" : "Say hi"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------
   MAP TAB
---------------------------------------------------------------- */
function CampusMap({ userPin, onPickPin, sharing }) {
  const ref = useRef(null);
  const handleClick = (e) => {
    if (!sharing) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    onPickPin(Math.max(3, Math.min(97, x)), Math.max(3, Math.min(97, y)));
  };
  return (
    <div ref={ref} onClick={handleClick} style={{ position: "relative", width: "100%", paddingTop: "62%", borderRadius: 14, overflow: "hidden", border: `1px solid ${C.line}`, cursor: sharing ? "crosshair" : "default" }}>
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
        {LANDMARKS.map((l) => (
          <text key={l.name} x={l.x} y={l.y - 2.5} fontSize="2.6" fontFamily="IBM Plex Mono, monospace" fill={C.ink600} textAnchor="middle">{l.name}</text>
        ))}
      </svg>

      {MOCK_STUDENTS.map((s) => (
        <div key={s.id} title={`${s.name} · ${nameFor(s.nat)}`} style={{ position: "absolute", left: `${s.mapPos.x}%`, top: `${s.mapPos.y}%`, transform: "translate(-50%,-100%)", textAlign: "center" }}>
          <div style={{ fontSize: 20, lineHeight: 1 }}>{flagFor(s.nat)}</div>
          <div style={{ width: 6, height: 6, borderRadius: 999, background: C.terra700, margin: "2px auto 0" }} />
        </div>
      ))}

      {userPin && (
        <div style={{ position: "absolute", left: `${userPin.x}%`, top: `${userPin.y}%`, transform: "translate(-50%,-100%)", textAlign: "center" }}>
          <div style={{ fontSize: 22, lineHeight: 1 }}>{flagFor(userPin.nat)}</div>
          <div style={{ width: 7, height: 7, borderRadius: 999, background: C.lawn700, margin: "2px auto 0", boxShadow: `0 0 0 3px ${C.lawn100}` }} />
        </div>
      )}
    </div>
  );
}

function MapTab() {
  const [sharing, setSharing] = useState(false);
  const [nat, setNat] = useState("AU");
  const [userPin, setUserPin] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: C.white, border: `1px solid ${C.line}`, borderRadius: 14, padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <SectionTitle icon={<MapPin size={15} />} text="Campus map" />
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.ink900 }}>
            <input type="checkbox" checked={sharing} onChange={(e) => { setSharing(e.target.checked); if (!e.target.checked) setUserPin(null); }} />
            Share my location
          </label>
        </div>
        {sharing && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: C.ink600 }}>Flag shown on your pin:</span>
            <select value={nat} onChange={(e) => setNat(e.target.value)} style={selectStyle}>
              {NATIONALITIES.map((n) => <option key={n.code} value={n.code}>{n.flag} {n.name}</option>)}
            </select>
            <span style={{ fontSize: 12.5, color: C.terra700 }}>Tap anywhere on the map to drop your pin.</span>
          </div>
        )}
      </div>

      <CampusMap userPin={userPin ? { ...userPin, nat } : null} sharing={sharing} onPickPin={(x, y) => setUserPin({ x, y })} />

      <div style={{ fontSize: 12.5, color: C.ink600, display: "flex", alignItems: "center", gap: 6 }}>
        <Share2 size={13} /> Flags mark each student's nationality — a quick way to spot who's around and where they're from.
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   SHARED BITS
---------------------------------------------------------------- */
function Avatar({ initials }) {
  return (
    <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.terra700, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12.5, fontWeight: 700, fontFamily: "Inter, sans-serif", flexShrink: 0 }}>
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
const btnPrimary = { display: "flex", alignItems: "center", background: C.terra700, color: "#fff", border: "none", borderRadius: 999, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" };
const btnGhost = { background: C.sand100, color: C.terra700, border: `1px solid ${C.terra700}`, borderRadius: 999, padding: "7px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" };
const btnGhostDisabled = { ...btnGhost, background: C.lawn100, color: C.lawn700, border: `1px solid ${C.lawn700}`, cursor: "default" };
const iconBtn = (color) => ({ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Inter, sans-serif" });
const inputStyle = { flex: 1, border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 10px", fontSize: 13, fontFamily: "Inter, sans-serif", outline: "none" };
const selectStyle = { border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 8px", fontSize: 13, fontFamily: "Inter, sans-serif", background: "#fff", outline: "none" };

/* ---------------------------------------------------------------
   APP SHELL
---------------------------------------------------------------- */
const TABS = [
  { id: "feed", label: "Feed", icon: Rss },
  { id: "timetable", label: "Timetable", icon: CalendarDays },
  { id: "community", label: "Community", icon: Users },
  { id: "map", label: "Map", icon: MapPin },
];

export default function UnifiedApp() {
  const [tab, setTab] = useState("feed");
  const [userTimetable, setUserTimetable] = useState([]);

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", background: C.sand50, minHeight: 640, fontFamily: "Inter, sans-serif", borderRadius: 20, overflow: "hidden", border: `1px solid ${C.line}`, boxShadow: "0 20px 50px -20px rgba(38,34,27,0.35)" }}>
      <style>{`${FONT_IMPORT} * { box-sizing: border-box; } input:focus, select:focus, textarea:focus { border-color: ${C.terra700}; }`}</style>

      <div style={{ background: C.ink900, padding: "18px 18px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <GraduationCap size={22} color={C.gold500} />
          <div style={{ fontFamily: "Fraunces, serif", fontWeight: 700, fontSize: 21, color: C.sand50, letterSpacing: 0.3 }}>Uni-fied</div>
          <div style={{ fontSize: 11.5, color: C.sand200, marginLeft: "auto" }}>University of Sydney</div>
        </div>
        <div style={{ fontSize: 12, color: C.sand200, marginTop: 2, marginBottom: 12 }}>Discuss, coordinate, and find your people on campus.</div>
      </div>
      <ArchRow tone={C.sand50} stroke={C.ink900} />

      <div style={{ padding: 18, paddingBottom: 90 }}>
        {tab === "feed" && <FeedTab />}
        {tab === "timetable" && <TimetableTab userTimetable={userTimetable} setUserTimetable={setUserTimetable} />}
        {tab === "community" && <CommunityTab userTimetable={userTimetable} />}
        {tab === "map" && <MapTab />}
      </div>

      <div style={{ position: "sticky", bottom: 0, background: C.white, borderTop: `1px solid ${C.line}`, display: "flex" }}>
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 4px",
            background: "none", border: "none", cursor: "pointer",
            color: tab === id ? C.terra700 : C.ink600, fontFamily: "Inter, sans-serif",
          }}>
            <Icon size={19} strokeWidth={tab === id ? 2.4 : 1.8} />
            <span style={{ fontSize: 10.5, fontWeight: tab === id ? 700 : 500 }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
