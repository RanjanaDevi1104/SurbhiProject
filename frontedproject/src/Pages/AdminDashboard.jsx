import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../APPpath";
import { 
  LogOut, Users, BookOpen, Trash2, Plus, 
  Image as ImageIcon, Loader2, FileText, Globe, Music, Mic, 
  Play, AudioLines, Eye, Menu, X 
} from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [isUploading, setIsUploading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    let endpoint = type === 'workbook' ? `/api/delete-workbook/${id}` : type === 'audio' ? `/api/audio/delete-audio/${id}` : `/api/delete/${id}`;

    try {
      const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: { "token": localStorage.getItem("token") }
      });
      if (res.ok) {
        alert(`${type} deleted!`);
        type === 'workbook' ? fetchWorkbooks() : type === 'audio' ? fetchAudios() : fetchUsers();
      }
    } catch (err) { alert("Delete failed"); }
  };

  // --- UPLOAD HANDLERS (FIXED) ---
  const handleAddWorkbook = async (e) => {
    e.preventDefault();
    if (!imageFile || !pdfFile) return alert("Select both Image and PDF");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("title", newBook.title);
    formData.append("price", newBook.price);
    formData.append("description", newBook.description);
    formData.append("image", imageFile); // Matches backend field 'image'
    formData.append("pdf", pdfFile);     // Matches backend field 'pdf'

    try {
      const res = await fetch(`${BASE_URL}/api/upload`, {
        method: "POST",
        headers: { "token": localStorage.getItem("token") }, // NOTE: NO Content-Type here!
        body: formData,
      });
      if (res.ok) {
        alert("Workbook Published!");
        setNewBook({ title: "", price: "", description: "" });
        setImageFile(null); setPdfFile(null); setPreview(null);
        fetchWorkbooks();
      } else {
        const errorData = await res.json();
        alert("Error: " + errorData.message);
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
    formData.append("image", audioImage); // Matches backend field 'image'
    formData.append("audio", audioFile);   // Matches backend field 'audio'

    try {
      const res = await fetch(`${BASE_URL}/api/audio/upload-audio`, {
        method: "POST",
        headers: { "token": localStorage.getItem("token") },
        body: formData,
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
      
      {/* MOBILE BAR */}
      <div className="lg:hidden fixed top-0 w-full bg-[#090514] border-b border-white/5 p-4 flex justify-between items-center z-[60]">
        <div className="flex items-center gap-2">
           <Mic size={20} className="text-indigo-500" />
           <span className="font-black text-white italic tracking-tighter">COSMIC</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-indigo-400">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-[#090514] border-r border-white/5 flex flex-col z-[55] transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-10 hidden lg:flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
             <Mic size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white italic leading-none">COSMIC</h1>
            <p className="text-[10px] text-indigo-400 font-bold tracking-[0.3em] uppercase">Studio</p>
          </div>
        </div>

        <nav className="mt-24 lg:mt-10 px-4 space-y-2">
          {[{ id: "users", label: "Registry", icon: Users }, { id: "workbooks", label: "Library", icon: BookOpen }, { id: "lightlanguage", label: "Audios", icon: Music }].map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${activeTab === tab.id ? "bg-white/5 text-white border border-white/10" : "text-slate-500 hover:text-slate-300"}`}>
              <tab.icon size={20} className={activeTab === tab.id ? "text-indigo-400" : "text-slate-600"} />
              <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-6 space-y-4">
          <button onClick={() => navigate("/home")} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-white/5 text-[10px] font-bold text-slate-500 hover:text-white transition-all uppercase"><Globe size={14} /> Live Site</button>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"><LogOut size={16} /> Terminal Out</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-72 p-6 lg:p-12 overflow-y-auto mt-16 lg:mt-0">
        <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter uppercase italic mb-10">
          {activeTab === 'users' ? 'User Registry' : activeTab === 'workbooks' ? 'Library Assets' : 'Audio Transmissions'}
        </h2>

        {activeTab === "users" && (
          <div className="bg-[#0c0816] border border-white/5 rounded-[30px] overflow-hidden">
             <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/[0.02] text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    <th className="p-6">Soul Name</th>
                    <th className="p-6">Identity</th>
                    <th className="p-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map(u => (
                    <tr key={u._id} className="group hover:bg-white/[0.01]">
                      <td className="p-6 text-white font-bold">{u.name}</td>
                      <td className="p-6 text-slate-500">{u.email}</td>
                      <td className="p-6 text-right">
                        <button onClick={() => deleteItem('user', u._id)} className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}

        {activeTab === "workbooks" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
             <div className="lg:col-span-4">
                <div className="bg-[#0c0816] p-8 rounded-[32px] border border-white/10 sticky top-12">
                   <h3 className="text-white text-lg font-black italic mb-6">New Workbook</h3>
                   <form onSubmit={handleAddWorkbook} className="space-y-5">
                      <input type="text" placeholder="BOOK TITLE" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white outline-none focus:border-indigo-500" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} required />
                      <input type="number" placeholder="PRICE (₹)" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white outline-none focus:border-indigo-500" value={newBook.price} onChange={e => setNewBook({...newBook, price: e.target.value})} required />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative h-24 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center bg-white/[0.02] overflow-hidden">
                           <input type="file" accept="image/*" onChange={(e) => { setImageFile(e.target.files[0]); setPreview(URL.createObjectURL(e.target.files[0])); }} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                           {preview ? <img src={preview} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-slate-600" />}
                        </div>
                        <div className="relative h-24 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center bg-white/[0.02]">
                           <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                           <FileText size={20} className={pdfFile ? "text-green-500" : "text-slate-600"} />
                        </div>
                      </div>
                      <textarea placeholder="Description..." className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white h-20 resize-none outline-none" value={newBook.description} onChange={e => setNewBook({...newBook, description: e.target.value})}></textarea>
                      
                      {/* PREMIMUM WORKBOOK BUTTON */}
                      <button type="submit" disabled={isUploading} className={`group relative w-full py-4 rounded-xl overflow-hidden transition-all duration-500 ${isUploading ? "bg-slate-800 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]"}`}>
                        {isUploading ? <Loader2 className="animate-spin mx-auto text-white" /> : <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Publish Workbook</span>}
                      </button>
                   </form>
                </div>
             </div>
             <div className="lg:col-span-8 space-y-4">
                {workbooks.map(b => (
                  <div key={b._id} className="flex items-center gap-6 bg-[#0c0816] p-4 rounded-[24px] border border-white/5 hover:border-indigo-500/30 transition-all">
                     <img src={b.image} className="w-20 h-20 rounded-xl object-cover" />
                     <div className="flex-1">
                        <h4 className="text-white font-black italic">{b.title}</h4>
                        <p className="text-slate-500 text-[10px] italic">₹{b.price}</p>
                     </div>
                     <div className="flex gap-2 pr-2">
                        <a href={b.pdfUrl} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full text-slate-400 hover:text-white"><Eye size={18} /></a>
                        <button onClick={() => deleteItem('workbook', b._id)} className="p-3 bg-red-500/10 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {activeTab === "lightlanguage" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
             <div className="lg:col-span-4">
                <div className="bg-[#0c0816] p-8 rounded-[32px] border border-white/10 sticky top-12">
                   <h3 className="text-white text-lg font-black italic mb-6">Transmit Audio</h3>
                   <form onSubmit={handleAddAudio} className="space-y-5">
                      <input type="text" placeholder="AUDIO TITLE" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white outline-none focus:border-purple-500" value={newAudio.title} onChange={e => setNewAudio({...newAudio, title: e.target.value})} required />
                      <input type="number" placeholder="PRICE (₹)" className="w-full bg-white/5 border border-white/5 p-4 rounded-xl text-xs text-white outline-none focus:border-purple-500" value={newAudio.price} onChange={e => setNewAudio({...newAudio, price: e.target.value})} required />
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative h-24 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center bg-white/[0.02] overflow-hidden">
                           <input type="file" accept="image/*" onChange={(e) => { setAudioImage(e.target.files[0]); setAudioPreview(URL.createObjectURL(e.target.files[0])); }} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                           {audioPreview ? <img src={audioPreview} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-slate-600" />}
                        </div>
                        <div className="relative h-24 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center bg-white/[0.02]">
                           <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                           <Music size={20} className={audioFile ? "text-purple-500" : "text-slate-600"} />
                        </div>
                      </div>
                      
                      {/* PREMIUM AUDIO BUTTON */}
                      <button type="submit" disabled={isUploading} className={`group relative w-full py-4 rounded-xl overflow-hidden transition-all duration-500 ${isUploading ? "bg-slate-800 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] hover:bg-right hover:shadow-[0_0_20px_rgba(192,38,211,0.4)]"}`}>
                        {isUploading ? <AudioLines className="animate-pulse mx-auto text-white" /> : <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Deploy Transmission</span>}
                      </button>
                   </form>
                </div>
             </div>
             <div className="lg:col-span-8 space-y-4">
                {audios.map(a => (
                  <div key={a._id} className="flex items-center gap-6 bg-[#0c0816] p-4 rounded-[24px] border border-white/5 hover:border-purple-500/30 transition-all">
                     <img src={a.image} className="w-20 h-20 rounded-xl object-cover" />
                     <div className="flex-1">
                        <h4 className="text-white font-black italic">{a.title}</h4>
                        <span className="text-[10px] text-purple-400 font-bold">₹{a.price}</span>
                     </div>
                     <div className="flex gap-2 pr-2">
                        <a href={a.audioUrl} target="_blank" rel="noreferrer" className="p-3 bg-white/5 rounded-full text-slate-400 hover:text-white"><Play size={18} /></a>
                        <button onClick={() => deleteItem('audio', a._id)} className="p-3 bg-red-500/10 rounded-full text-red-500 hover:bg-red-500 transition-all hover:text-white"><Trash2 size={18} /></button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </main>

      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>}
    </div>
  );
}