import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../APPpath";
import { 
  LogOut, Users, BookOpen, Trash2, Plus, 
  Image as ImageIcon, Loader2, FileText, Globe, Music, Mic, 
  Play, AudioLines, Headset, CheckCircle2, Eye 
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [isUploading, setIsUploading] = useState(false);

  // Data States
  const [users, setUsers] = useState([]);
  const [workbooks, setWorkbooks] = useState([]);
  const [audios, setAudios] = useState([]);

  // Form States - Workbooks
  const [newBook, setNewBook] = useState({ title: "", price: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null); 
  const [preview, setPreview] = useState(null);

  // Form States - Audios
  const [newAudio, setNewAudio] = useState({ title: "", price: "", description: "" });
  const [audioImage, setAudioImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); } 
    else { fetchUsers(); fetchWorkbooks(); fetchAudios(); }
  }, [navigate]);

  // --- API FETCH FUNCTIONS ---
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/users`, { headers: { "token": localStorage.getItem("token") } });
      const data = await res.json();
      if (data.users) setUsers(data.users);
    } catch (err) { console.error(err); }
  };

  const fetchWorkbooks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/all`);
      const data = await res.json();
      setWorkbooks(Array.isArray(data) ? data : (data.workbooks || []));
    } catch (err) { console.error(err); }
  };

  const fetchAudios = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/audio/all-audios`);
      const data = await res.json();
      setAudios(Array.isArray(data) ? data : (data.audios || []));
    } catch (err) { console.error(err); }
  };

  // --- DELETE FUNCTION (Unified) ---
  const deleteItem = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type} permanently?`)) return;

    let endpoint = "";
    if (type === 'workbook') {
      endpoint = `/api/delete-workbook/${id}`; 
    } else if (type === 'audio') {
      endpoint = `/api/audio/delete-audio/${id}`;
    } else if (type === 'user') {
      endpoint = `/api/users/delete/${id}`; 
    }

    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: { 
          "token": localStorage.getItem("token"),
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();

      if (res.ok) {
        alert(`${type} deleted successfully!`);
        if (type === 'workbook') fetchWorkbooks();
        if (type === 'audio') fetchAudios();
        if (type === 'user') fetchUsers();
      } else {
        alert(`Error: ${data.message || "Failed to delete"}`);
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Network error: Could not connect to server");
    }
  };

  // --- UPLOAD HANDLERS ---
  const handleAddWorkbook = async (e) => {
    e.preventDefault();
    if (!imageFile || !pdfFile) return alert("Select both Image and PDF");
    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", newBook.title);
    formData.append("price", newBook.price);
    formData.append("description", newBook.description);
    formData.append("image", imageFile); 
    formData.append("pdf", pdfFile);     
    try {
      const res = await fetch(`${BASE_URL}/api/upload`, {
        method: "POST", headers: { "token": localStorage.getItem("token") }, body: formData,
      });
      if (res.ok) {
        alert("Workbook Published!");
        setNewBook({ title: "", price: "", description: "" });
        setImageFile(null); setPdfFile(null); setPreview(null);
        fetchWorkbooks();
      }
    } catch (err) { alert("Upload failed"); }
    finally { setIsUploading(false); }
  };

  const handleAddAudio = async (e) => {
    e.preventDefault();
    if (!audioImage || !audioFile) return alert("Select Thumbnail and MP3");
    setIsUploading(true);
    const formData = new FormData();
    formData.append("title", newAudio.title);
    formData.append("price", newAudio.price);
    formData.append("description", newAudio.description);
    formData.append("image", audioImage); 
    formData.append("audio", audioFile);     
    try {
      const res = await fetch(`${BASE_URL}/api/audio/upload-audio`, {
        method: "POST", headers: { "token": localStorage.getItem("token") }, body: formData,
      });
      if (res.ok) {
        alert("Transmission Online!");
        setNewAudio({ title: "", price: "", description: "" });
        setAudioImage(null); setAudioFile(null); setAudioPreview(null);
        fetchAudios();
      }
    } catch (err) { alert("Audio upload failed"); }
    finally { setIsUploading(false); }
  };

  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  return (
    <div className="flex min-h-screen bg-[#05020a] text-slate-300 font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-[#090514] border-r border-white/5 flex flex-col fixed h-full z-50">
        <div className="p-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
             <Mic size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter italic leading-none">COSMIC</h1>
            <p className="text-[10px] text-indigo-400 font-bold tracking-[0.3em] uppercase">Studio</p>
          </div>
        </div>

        <nav className="mt-10 px-4 space-y-2">
          {[
            { id: "users", label: "Registry", icon: Users },
            { id: "workbooks", label: "Library", icon: BookOpen },
            { id: "lightlanguage", label: "Audios", icon: Music },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                activeTab === tab.id 
                ? "bg-white/5 text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] border border-white/10" 
                : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]"
              }`}
            >
              <tab.icon size={20} className={activeTab === tab.id ? "text-indigo-400" : "text-slate-600 group-hover:text-slate-400"} />
              <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-6 space-y-4">
          <button onClick={() => navigate("/home")} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 transition-all">
            <Globe size={14} /> Live Site
          </button>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em]">
            <LogOut size={16} /> Terminal Out
          </button>
        </div>
      </aside>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 ml-72 p-12 overflow-y-auto">
        
        <div className="flex justify-between items-start mb-16">
          <div>
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              {activeTab === 'users' && 'User Registry'}
              {activeTab === 'workbooks' && 'Library Assets'}
              {activeTab === 'lightlanguage' && 'Audio Transmissions'}
            </h2>
            <p className="text-slate-500 text-xs font-bold tracking-[0.4em] uppercase mt-4">Command Center / {activeTab}</p>
          </div>
        </div>

        {/* 1. USERS REGISTRY */}
        {activeTab === "users" && (
          <div className="bg-[#0c0816] border border-white/5 rounded-[40px] overflow-hidden shadow-3xl animate-in fade-in slide-in-from-bottom-4">
             <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/[0.02] text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    <th className="p-10">Soul Name</th>
                    <th className="p-10">Identity (Email)</th>
                    <th className="p-10 text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map(u => (
                    <tr key={u._id} className="group hover:bg-white/[0.01] transition-all">
                      <td className="p-10 text-white font-bold tracking-tight">{u.name}</td>
                      <td className="p-10 text-slate-500 font-medium">{u.email}</td>
                      <td className="p-10 text-right">
                        <button onClick={() => deleteItem('user', u._id)} className="p-4 bg-red-500/5 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}

        {/* 2. WORKBOOKS / LIBRARY (LIST STYLE UI) */}
        {activeTab === "workbooks" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in zoom-in-95">
             <div className="lg:col-span-4">
                <div className="bg-[#0c0816] p-8 rounded-[32px] border border-white/10 sticky top-12 shadow-2xl">
                   <h3 className="text-white text-lg font-black italic mb-6 flex items-center gap-3">
                      <Plus className="text-indigo-500" size={20} /> New Workbook
                   </h3>
                   <form onSubmit={handleAddWorkbook} className="space-y-5">
                      <input type="text" placeholder="BOOK TITLE" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white font-bold outline-none focus:border-indigo-500/50" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} required />
                      <input type="number" placeholder="PRICE (₹)" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white font-bold outline-none focus:border-indigo-500/50" value={newBook.price} onChange={e => setNewBook({...newBook, price: e.target.value})} required />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative h-24 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center bg-white/[0.02]">
                           <input type="file" accept="image/*" onChange={(e) => { setImageFile(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); }} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                           {preview ? <img src={preview} className="w-full h-full object-cover rounded-xl" /> : <ImageIcon size={18} className="text-slate-600" />}
                        </div>
                        <div className="relative h-24 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center bg-white/[0.02]">
                           <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                           <FileText size={18} className={pdfFile ? "text-green-500" : "text-slate-600"} />
                        </div>
                      </div>
                      <textarea placeholder="Brief description..." className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white h-20 resize-none outline-none" value={newBook.description} onChange={e => setNewBook({...newBook, description: e.target.value})}></textarea>
                      <button type="submit" disabled={isUploading} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-[10px] text-white font-black uppercase tracking-widest shadow-xl">
                        {isUploading ? <Loader2 className="animate-spin mx-auto" /> : "Publish Workbook"}
                      </button>
                   </form>
                </div>
             </div>
             <div className="lg:col-span-8 space-y-4">
                {workbooks.map(b => (
                  <div key={b._id} className="group flex items-center gap-6 bg-[#0c0816] p-4 rounded-[24px] border border-white/5 hover:border-indigo-500/30 transition-all shadow-xl">
                     <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={b.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center gap-2">
                           <h4 className="text-white text-md font-black uppercase tracking-tight italic">{b.title}</h4>
                           <span className="bg-indigo-500/10 text-indigo-400 text-[8px] font-black px-2 py-0.5 rounded uppercase border border-indigo-500/20">Book</span>
                        </div>
                        <p className="text-slate-500 text-[10px] mt-1 line-clamp-1 italic">{b.description}</p>
                        <span className="text-[10px] font-bold text-indigo-400 mt-2 block">₹{b.price}</span>
                     </div>
                     <div className="flex items-center gap-3 pr-2">
                        <a href={b.pdfUrl || b.pdf} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/10 text-slate-400"><Eye size={18} /></a>
                        <button onClick={() => deleteItem('workbook', b._id)} className="w-10 h-10 rounded-full border border-red-500/10 flex items-center justify-center hover:bg-red-500/10 text-red-500"><Trash2 size={18} /></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* 3. AUDIO TRANSMISSIONS */}
        {activeTab === "lightlanguage" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in zoom-in-95">
             <div className="lg:col-span-4">
                <div className="bg-[#0c0816] p-8 rounded-[32px] border border-white/10 sticky top-12 shadow-2xl">
                   <h3 className="text-white text-lg font-black italic mb-6 flex items-center gap-3">
                     <Mic className="text-purple-500" size={20} /> Transmit Audio
                   </h3>
                   <form onSubmit={handleAddAudio} className="space-y-5">
                      <input type="text" placeholder="AUDIO TITLE" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white outline-none focus:border-purple-500/50" value={newAudio.title} onChange={e => setNewAudio({...newAudio, title: e.target.value})} required />
                      <input type="number" placeholder="PRICE (₹)" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white outline-none focus:border-purple-500/50" value={newAudio.price} onChange={e => setNewAudio({...newAudio, price: e.target.value})} required />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative h-24 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center bg-white/[0.02]">
                           <input type="file" accept="image/*" onChange={(e) => { setAudioImage(e.target.files[0]); setAudioPreview(URL.createObjectURL(e.target.files[0])); }} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                           {audioPreview ? <img src={audioPreview} className="h-full w-full object-cover rounded-xl" /> : <ImageIcon size={18} className="text-slate-600" />}
                        </div>
                        <div className="relative h-24 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center bg-white/[0.02]">
                           <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                           <Music size={18} className={audioFile ? "text-purple-500" : "text-slate-600"} />
                        </div>
                      </div>
                      <button type="submit" disabled={isUploading} className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-[10px] text-white font-black uppercase tracking-widest shadow-xl">
                        {isUploading ? <Loader2 className="animate-spin mx-auto" /> : "Deploy Audio"}
                      </button>
                   </form>
                </div>
             </div>
             <div className="lg:col-span-8 space-y-4">
                {audios.map(a => (
                  <div key={a._id} className="group flex items-center gap-8 bg-[#0c0816] p-6 rounded-[32px] border border-white/5 hover:border-purple-500/30 transition-all shadow-xl">
                     <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={a.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                     </div>
                     <div className="flex-1">
                        <h4 className="text-white text-md font-black uppercase tracking-tight italic leading-none">{a.title}</h4>
                        <div className="flex items-center gap-3 mt-2">
                           <span className="text-[10px] font-black text-purple-400 uppercase bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10">High Freq</span>
                           <span className="text-[10px] text-slate-500 font-bold">₹{a.price}</span>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 pr-4">
                        <a href={a.audioUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 text-slate-500 transition-all">
                           <Play size={18} fill="currentColor" />
                        </a>
                        <button onClick={() => deleteItem('audio', a._id)} className="w-12 h-12 rounded-full border border-red-500/10 flex items-center justify-center hover:bg-red-500/10 text-red-500 transition-all"><Trash2 size={18} /></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>
    </div>
  );
}