import { useState, useEffect } from "react";

const TAGS = ["Array", "String", "Tree", "Graph", "DP", "Sorting", "Searching", "Greedy", "Backtracking", "Other"];
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const STATUSES = ["To Do", "In Progress", "Done"];

const DIFF_COLOR = { Easy: "#10b981", Medium: "#f59e0b", Hard: "#ef4444" };
const STATUS_COLOR = { "To Do": "#8b5cf6", "In Progress": "#3b82f6", "Done": "#10b981" };
const STATUS_BG = { "To Do": "#8b5cf622", "In Progress": "#3b82f622", "Done": "#10b98122" };

function uid() { return Math.random().toString(36).slice(2, 9); }

const SAMPLE_TASKS = [
  { id: uid(), title: "Two Sum", tag: "Array", difficulty: "Easy", status: "Done", note: "Use hashmap for O(n) solution", link: "https://leetcode.com/problems/two-sum/", createdAt: Date.now() - 86400000 * 3 },
  { id: uid(), title: "Binary Search", tag: "Searching", difficulty: "Easy", status: "Done", note: "Classic divide and conquer", link: "", createdAt: Date.now() - 86400000 * 2 },
  { id: uid(), title: "Merge Intervals", tag: "Array", difficulty: "Medium", status: "In Progress", note: "Sort first then merge overlapping", link: "https://leetcode.com/problems/merge-intervals/", createdAt: Date.now() - 86400000 },
  { id: uid(), title: "Longest Common Subsequence", tag: "DP", difficulty: "Medium", status: "To Do", note: "", link: "", createdAt: Date.now() },
];

export default function DSATracker() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("dsa_tasks");
      return saved ? JSON.parse(saved) : SAMPLE_TASKS;
    } catch { return SAMPLE_TASKS; }
  });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterDiff, setFilterDiff] = useState("All");
  const [filterTag, setFilterTag] = useState("All");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", tag: "Array", difficulty: "Easy", status: "To Do", note: "", link: "" });

  useEffect(() => {
    try { localStorage.setItem("dsa_tasks", JSON.stringify(tasks)); } catch {}
  }, [tasks]);

  function openAdd() {
    setForm({ title: "", tag: "Array", difficulty: "Easy", status: "To Do", note: "", link: "" });
    setEditId(null);
    setShowForm(true);
  }

  function openEdit(task) {
    setForm({ title: task.title, tag: task.tag, difficulty: task.difficulty, status: task.status, note: task.note, link: task.link });
    setEditId(task.id);
    setShowForm(true);
  }

  function handleSubmit() {
    if (!form.title.trim()) return;
    if (editId) {
      setTasks(ts => ts.map(t => t.id === editId ? { ...t, ...form } : t));
    } else {
      setTasks(ts => [{ id: uid(), ...form, createdAt: Date.now() }, ...ts]);
    }
    setShowForm(false);
    setEditId(null);
  }

  function deleteTask(id) {
    setTasks(ts => ts.filter(t => t.id !== id));
  }

  function cycleStatus(id) {
    setTasks(ts => ts.map(t => {
      if (t.id !== id) return t;
      const idx = STATUSES.indexOf(t.status);
      return { ...t, status: STATUSES[(idx + 1) % STATUSES.length] };
    }));
  }

  const filtered = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.tag.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || t.status === filterStatus;
    const matchDiff = filterDiff === "All" || t.difficulty === filterDiff;
    const matchTag = filterTag === "All" || t.tag === filterTag;
    return matchSearch && matchStatus && matchDiff && matchTag;
  });

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === "Done").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    todo: tasks.filter(t => t.status === "To Do").length,
  };

  const pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;

  const inputStyle = {
    width: "100%", padding: "8px 12px", borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.15)", background: "var(--card-bg)",
    color: "var(--card-text-color)", fontSize: 13, outline: "none", boxSizing: "border-box",
  };

  const selectStyle = { ...inputStyle };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1.2rem 4rem", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "var(--card-text-color)" }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: "1.8rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px" }}>DSA Practice Tracker</h1>
          <p style={{ fontSize: 13, opacity: 0.55, margin: 0 }}>Track your questions, mark progress, add notes</p>
        </div>
        <button
          onClick={openAdd}
          style={{
            padding: "9px 18px", borderRadius: 9, border: "none",
            background: "#3b82f6", color: "#fff",
            fontWeight: 700, fontSize: 13, cursor: "pointer",
          }}
        >
          + Add Question
        </button>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: "1.4rem" }}>
        {[
          ["Total", stats.total, "#3b82f6"],
          ["Done", stats.done, "#10b981"],
          ["In Progress", stats.inProgress, "#f59e0b"],
          ["To Do", stats.todo, "#8b5cf6"],
        ].map(([label, val, col]) => (
          <div key={label} style={{ background: col + "14", border: `1px solid ${col}33`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: col, opacity: 0.8, marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: col }}>{val}</div>
          </div>
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div style={{ marginBottom: "1.6rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, opacity: 0.6, marginBottom: 5 }}>
          <span>Overall Progress</span>
          <span>{pct}%</span>
        </div>
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, height: 8, overflow: "hidden" }}>
          <div style={{
            width: `${pct}%`, height: "100%", borderRadius: 10,
            background: "linear-gradient(90deg, #3b82f6, #10b981)",
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      {/* ── Filters ── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1rem", alignItems: "center" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search questions..."
          style={{ ...inputStyle, maxWidth: 220, flex: 1 }}
        />
        {[
          ["Status", ["All", ...STATUSES], filterStatus, setFilterStatus],
          ["Difficulty", ["All", ...DIFFICULTIES], filterDiff, setFilterDiff],
          ["Tag", ["All", ...TAGS], filterTag, setFilterTag],
        ].map(([placeholder, opts, val, setter]) => (
          <select key={placeholder} value={val} onChange={e => setter(e.target.value)} style={{ ...selectStyle, maxWidth: 140 }}>
            {opts.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
      </div>

      {/* ── Task list ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem", opacity: 0.4, fontSize: 14 }}>
            No questions found. Add your first one!
          </div>
        ) : (
          filtered.map(task => (
            <div key={task.id} style={{
              background: "var(--card-bg)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12, padding: "12px 16px",
              display: "grid", gridTemplateColumns: "1fr auto",
              gap: 12, alignItems: "start",
              borderLeft: `3px solid ${STATUS_COLOR[task.status]}`,
              transition: "opacity 0.2s",
              opacity: task.status === "Done" ? 0.75 : 1,
            }}>
              <div>
                {/* Title row */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                  <span style={{
                    fontSize: 14, fontWeight: 600,
                    textDecoration: task.status === "Done" ? "line-through" : "none",
                    opacity: task.status === "Done" ? 0.7 : 1,
                  }}>
                    {task.title}
                  </span>
                  {task.link && (
                    <a href={task.link} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: "#3b82f6", textDecoration: "none" }}>↗ LeetCode</a>
                  )}
                </div>

                {/* Badges */}
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: task.note ? 8 : 0 }}>
                  <span style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 20,
                    background: DIFF_COLOR[task.difficulty] + "22",
                    color: DIFF_COLOR[task.difficulty],
                    border: `1px solid ${DIFF_COLOR[task.difficulty]}44`,
                  }}>{task.difficulty}</span>
                  <span style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 20,
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                  }}>{task.tag}</span>
                  <span style={{
                    fontSize: 10, padding: "2px 8px", borderRadius: 20,
                    background: STATUS_BG[task.status],
                    color: STATUS_COLOR[task.status],
                    border: `1px solid ${STATUS_COLOR[task.status]}44`,
                    cursor: "pointer",
                  }} onClick={() => cycleStatus(task.id)} title="Click to cycle status">
                    {task.status} ↻
                  </span>
                </div>

                {/* Note */}
                {task.note && (
                  <div style={{ fontSize: 12, opacity: 0.55, lineHeight: 1.5, fontStyle: "italic" }}>
                    📝 {task.note}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => openEdit(task)} style={{
                  padding: "5px 10px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.15)",
                  background: "transparent", color: "var(--card-text-color)", fontSize: 12, cursor: "pointer",
                }}>Edit</button>
                <button onClick={() => deleteTask(task.id)} style={{
                  padding: "5px 10px", borderRadius: 7, border: "1px solid #ef444433",
                  background: "#ef444414", color: "#ef4444", fontSize: 12, cursor: "pointer",
                }}>Del</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Add/Edit Modal ── */}
      {showForm && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: "1rem",
          }}
        >
          <div style={{
            background: "var(--navbar-bg)", borderRadius: 16, padding: "1.6rem",
            width: "100%", maxWidth: 480,
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex", flexDirection: "column", gap: 12,
          }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
              {editId ? "Edit Question" : "Add Question"}
            </h2>

            <input
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Question title *"
              style={inputStyle}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <select value={form.tag} onChange={e => setForm(f => ({ ...f, tag: e.target.value }))} style={selectStyle}>
                {TAGS.map(t => <option key={t}>{t}</option>)}
              </select>
              <select value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))} style={selectStyle}>
                {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
              </select>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} style={selectStyle}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            <input
              value={form.link}
              onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
              placeholder="LeetCode / GFG link (optional)"
              style={inputStyle}
            />

            <textarea
              value={form.note}
              onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
              placeholder="Notes, approach, hints... (optional)"
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setShowForm(false)} style={{
                padding: "8px 18px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)",
                background: "transparent", color: "var(--card-text-color)", fontSize: 13, cursor: "pointer",
              }}>Cancel</button>
              <button onClick={handleSubmit} style={{
                padding: "8px 18px", borderRadius: 8, border: "none",
                background: "#3b82f6", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>{editId ? "Save Changes" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
