import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../APPpath";
import { 
  LogOut, Users, BookOpen, Trash2, Plus, 
  Image as ImageIcon, Loader2, FileText, Globe, Music, Mic, 
  Play, Menu, X, Eye 
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- SEPARATE LOADING STATES ---
  const [isUploadingBook, setIsUploadingBook] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);

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

  // --- DELETE FUNCTION ---
  const deleteItem = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type} permanently?`)) return;
    let endpoint = type === 'workbook' ? `/api/delete-workbook/${id}` : type === 'audio' ? `/api/audio/delete-audio/${id}` : `/api/delete/${id}`;

    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: { "token": localStorage.getItem("token") }
      });
      if (res.ok) {
        alert(`${type} deleted!`);
        if (type === 'workbook') fetchWorkbooks();
        if (type === 'audio') fetchAudios();
        if (type === 'user') fetchUsers();
      }
    } catch (err) { alert("Delete failed"); }
  };

  // --- UPLOAD WORKBOOK HANDLER ---
  const handleAddWorkbook = async (e) => {
    e.preventDefault();
    if (!imageFile || !pdfFile) return alert("Select both Image and PDF");

    setIsUploadingBook(true); // START WORKBOOK LOADING
    const formData = new FormData();
    formData.append("title", newBook.title);
    formData.append("price", newBook.price);
    formData.append("description", newBook.description);
    formData.append("image", imageFile);
    formData.append("pdf", pdfFile);

    try {
      const res = await fetch(`${BASE_URL}/api/upload-workbook`, {
        method: "POST",
        headers: { "token": localStorage.getItem("token") },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert("Workbook Published!");
        setNewBook({ title: "", price: "", description: "" });
        setImageFile(null); setPdfFile(null); setPreview(null);
        fetchWorkbooks();
      } else { alert(data.message || "Upload failed"); }
    } catch (err) { alert("Network Error: " + err.message); } 
    finally { setIsUploadingBook(false); } // STOP WORKBOOK LOADING
  };

  // --- UPLOAD AUDIO HANDLER ---
  const handleAddAudio = async (e) => {
    e.preventDefault();
    if (!audioImage || !audioFile) return alert("Select Thumbnail and MP3");

    setIsUploadingAudio(true); // START AUDIO LOADING
    const formData = new FormData();
    formData.append("title", newAudio.title);
    formData.append("price", newAudio.price);
    formData.append("description", newAudio.description);
    formData.append("image", audioImage); 
    formData.append("audio", audioFile);     

    try {
      const res = await fetch(`${BASE_URL}/api/audio/upload-audio`, {
        method: "POST",
        headers: { "token": localStorage.getItem("token") },
        body: formData,
      });
      if (res.ok) {
        alert("Audio Transmission Online!");
        setNewAudio({ title: "", price: "", description: "" });
        setAudioImage(null); setAudioFile(null); setAudioPreview(null);
        fetchAudios();
      }
    } catch (err) { alert("Audio upload failed"); }
    finally { setIsUploadingAudio(false); } // STOP AUDIO LOADING
  };

  const handleLogout = () => { localStorage.clear(); navigate("/"); };

  return (
    <div className="flex min-h-screen bg-[#05020a] text-slate-300 font-sans">
      
      {/* --- MOBILE TOP BAR --- */}
      <div className="lg:hidden fixed top-0 w-full bg-[#090514] border-b border-white/5 p-4 flex justify-between items-center z-[60]">
        <div className="flex items-center gap-2">
           <Mic size={20} className="text-indigo-500" />
           <span className="font-black text-white italic tracking-tighter">COSMIC</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-indigo-400">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-[#090514] border-r border-white/5 flex flex-col z-[55] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} lg:h-full`}>
        <div className="p-10 hidden lg:flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
             <Mic size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter italic leading-none">COSMIC</h1>
            <p className="text-[10px] text-indigo-400 font-bold tracking-[0.3em] uppercase">Studio</p>
          </div>
        </div>

        <nav className="mt-24 lg:mt-10 px-4 space-y-2">
          {[{ id: "users", label: "Registry", icon: Users }, { id: "workbooks", label: "Library", icon: BookOpen }, { id: "lightlanguage", label: "Audios", icon: Music }].map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${activeTab === tab.id ? "bg-white/5 text-white border border-white/10" : "text-slate-500 hover:text-slate-300"}`}>
              <tab.icon size={20} className={activeTab === tab.id ? "text-indigo-400" : "text-slate-600"} />
              <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-6 space-y-4">
          <button onClick={() => navigate("/home")} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all"><Globe size={14} /> Live Site</button>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em]"><LogOut size={16} /> Terminal Out</button>
        </div>
      </aside>

      {/* --- CONTENT AREA --- */}
      <main className="flex-1 lg:ml-72 p-6 lg:p-12 overflow-y-auto mt-16 lg:mt-0">
        
        <header className="mb-10 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              {activeTab === 'users' ? 'User Registry' : activeTab === 'workbooks' ? 'Library Assets' : 'Audio Transmissions'}
            </h2>
            <p className="text-slate-500 text-[10px] font-bold tracking-[0.4em] uppercase mt-4">Command Center / {activeTab}</p>
        </header>

        {/* 1. USERS TAB */}
        {activeTab === "users" && (
          <div className="bg-[#0c0816] border border-white/5 rounded-[30px] overflow-hidden shadow-3xl">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-white/[0.02] text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    <tr><th className="p-6 lg:p-10">Soul Name</th><th className="p-6 lg:p-10">Identity (Email)</th><th className="p-6 lg:p-10 text-right">Access</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map(u => (
                      <tr key={u._id} className="group hover:bg-white/[0.01]">
                        <td className="p-6 lg:p-10 text-white font-bold">{u.name}</td>
                        <td className="p-6 lg:p-10 text-slate-500">{u.email}</td>
                        <td className="p-6 lg:p-10 text-right"><button onClick={() => deleteItem('user', u._id)} className="p-4 bg-red-500/5 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={20} /></button></td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
          </div>
        )}

        {/* 2. WORKBOOKS TAB */}
        {activeTab === "workbooks" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             <div className="lg:col-span-4">
                <div className="bg-[#0c0816] p-8 rounded-[32px] border border-white/10 sticky top-12">
                   <h3 className="text-white text-lg font-black italic mb-6 flex items-center gap-3"><Plus className="text-indigo-500" size={20} /> New Workbook</h3>
                   <form onSubmit={handleAddWorkbook} className="space-y-5">
                      <input type="text" placeholder="BOOK TITLE" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white font-bold outline-none" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} required />
                      <input type="number" placeholder="PRICE (₹)" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white font-bold outline-none" value={newBook.price} onChange={e => setNewBook({...newBook, price: e.target.value})} required />
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
                      <textarea placeholder="Description..." className="w-full bg-white/5 p-4 rounded-xl text-xs text-white h-20 resize-none outline-none" value={newBook.description} onChange={e => setNewBook({...newBook, description: e.target.value})}></textarea>
                      <button type="submit" disabled={isUploadingBook} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-[10px] text-white font-black uppercase tracking-widest">
                        {isUploadingBook ? <Loader2 className="animate-spin mx-auto" /> : "Publish Workbook"}
                      </button>
                   </form>
                </div>
             </div>
             <div className="lg:col-span-8 space-y-4">
                {workbooks.map(b => (
                  <div key={b._id} className="group flex items-center gap-6 bg-[#0c0816] p-4 rounded-[24px] border border-white/5 hover:border-indigo-500/30 transition-all">
                     <img src={b.image} className="w-20 h-20 rounded-xl object-cover" />
                     <div className="flex-1"><h4 className="text-white font-black italic">{b.title}</h4><p className="text-slate-500 text-[10px] mt-1">{b.description}</p><span className="text-[10px] font-bold text-indigo-400 mt-2 block">₹{b.price}</span></div>
                     <div className="flex items-center gap-3">
                        <a href={b.pdfUrl || b.pdf} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10"><Eye size={18} /></a>
                        <button onClick={() => deleteItem('workbook', b._id)} className="w-10 h-10 rounded-full border border-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500/10"><Trash2 size={18} /></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* 3. AUDIO TAB */}
        {activeTab === "lightlanguage" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             <div className="lg:col-span-4">
                <div className="bg-[#0c0816] p-8 rounded-[32px] border border-white/10 sticky top-12">
                   <h3 className="text-white text-lg font-black italic mb-6 flex items-center gap-3"><Mic className="text-purple-500" size={20} /> Transmit Audio</h3>
                   <form onSubmit={handleAddAudio} className="space-y-5">
                      <input type="text" placeholder="AUDIO TITLE" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white outline-none" value={newAudio.title} onChange={e => setNewAudio({...newAudio, title: e.target.value})} required />
                      <input type="number" placeholder="PRICE (₹)" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white outline-none" value={newAudio.price} onChange={e => setNewAudio({...newAudio, price: e.target.value})} required />
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
                      <button type="submit" disabled={isUploadingAudio} className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-[10px] text-white font-black uppercase tracking-widest">
                        {isUploadingAudio ? <Loader2 className="animate-spin mx-auto" /> : "Deploy Audio"}
                      </button>
                   </form>
                </div>
             </div>
             <div className="lg:col-span-8 space-y-4">
                {audios.map(a => (
                  <div key={a._id} className="group flex items-center gap-8 bg-[#0c0816] p-6 rounded-[32px] border border-white/5 hover:border-purple-500/30 transition-all">
                     <img src={a.image} className="w-20 h-20 rounded-2xl object-cover" />
                     <div className="flex-1"><h4 className="text-white font-black italic">{a.title}</h4><div className="flex gap-3 mt-2"><span className="text-[10px] text-purple-400 uppercase bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/10">High Freq</span><span className="text-[10px] text-slate-500 font-bold">₹{a.price}</span></div></div>
                     <div className="flex items-center gap-4">
                        <a href={a.audioUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center text-slate-500 hover:bg-white/5"><Play size={18} fill="currentColor" /></a>
                        <button onClick={() => deleteItem('audio', a._id)} className="w-12 h-12 rounded-full border border-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500/10"><Trash2 size={18} /></button>
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