import React, { useState } from "react";
import { 
  Lock, CheckCircle, Mail, Globe, Sparkles, LogOut, Check, Trash2, 
  Settings, Award, MessageSquare, Plus, ExternalLink, RefreshCw, FileCode2, Copy 
} from "lucide-react";
import { DB, Project, Diploma, Attestation, Testimonial, MediaItem, Message } from "../types";

interface AdminPanelProps {
  db: DB;
  onRefreshDB: () => void;
  onUpdateSettings: (settings: any) => Promise<boolean>;
  onSaveProject: (project: any) => Promise<boolean>;
  onDeleteProject: (id: string) => Promise<boolean>;
  onSaveDiploma: (diploma: any) => Promise<boolean>;
  onDeleteDiploma: (id: string) => Promise<boolean>;
  onSaveAttestation: (attestation: any) => Promise<boolean>;
  onDeleteAttestation: (id: string) => Promise<boolean>;
  onSaveMedia: (media: any) => Promise<boolean>;
  onDeleteMedia: (id: string) => Promise<boolean>;
  onSaveTestimonial: (test: any) => Promise<boolean>;
  onDeleteTestimonial: (id: string) => Promise<boolean>;
  onReadMessage: (id: string) => Promise<boolean>;
  onDeleteMessage: (id: string) => Promise<boolean>;
}

export default function AdminPanel({
  db,
  onRefreshDB,
  onUpdateSettings,
  onSaveProject,
  onDeleteProject,
  onSaveDiploma,
  onDeleteDiploma,
  onSaveAttestation,
  onDeleteAttestation,
  onSaveMedia,
  onDeleteMedia,
  onSaveTestimonial,
  onDeleteTestimonial,
  onReadMessage,
  onDeleteMessage
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [activeTab, setActiveTab] = useState<"msgs" | "settings" | "realis" | "comps" | "hostinger">("msgs");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // General settings edits state
  const [editSettings, setEditSettings] = useState({ ...db.settings });

  // Creation variables holding states
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "", description: "", category: "Charpente Métallique", techniques: [], materials: [], imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800", date: new Date().getFullYear().toString()
  });
  const [projectTechInput, setProjectTechInput] = useState("");
  const [projectMatInput, setProjectMatInput] = useState("");
  const [projectPreviewMode, setProjectPreviewMode] = useState<"edit" | "preview">("edit");

  const [newDip, setNewDip] = useState<Partial<Diploma>>({
    title: "", issuer: "", year: new Date().getFullYear().toString(), imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800", standard: ""
  });

  const [newAtt, setNewAtt] = useState<Partial<Attestation>>({
    title: "", company: "", description: "", year: new Date().getFullYear().toString()
  });

  const [newMedia, setNewMedia] = useState<Partial<MediaItem>>({
    title: "", type: "photo", url: "", videoPlatform: "mp4", category: "Général"
  });

  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: "", company: "Particulier", role: "Client", content: "", rating: 5, approved: true
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin_stephane" && password === "stephane2026") {
      setIsAuthenticated(true);
      setLoginError("");
      setEditSettings({ ...db.settings });
    } else {
      setLoginError("Identifiants incorrects par défaut. Veuillez utiliser admin_stephane / stephane2026");
    }
  };

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleUpdateGeneralSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await onUpdateSettings(editSettings);
    setLoading(false);
    if (success) {
      showNotification("Paramètres généraux mis à jour avec succès dans le fichier de base de données local (db.json) !");
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;
    setLoading(true);

    const techniques = projectTechInput ? projectTechInput.split(",").map(t => t.trim()) : [];
    const materials = projectMatInput ? projectMatInput.split(",").map(m => m.trim()) : [];

    const pSave = {
      ...newProject,
      techniques,
      materials,
    };

    const success = await onSaveProject(pSave);
    setLoading(false);
    if (success) {
      showNotification(`Projet "${newProject.title}" ajouté virtuellement et persisté !`);
      setNewProject({
        title: "", description: "", category: "Charpente Métallique", techniques: [], materials: [], imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800", date: new Date().getFullYear().toString()
      });
      setProjectTechInput("");
      setProjectMatInput("");
      onRefreshDB();
    }
  };

  const handleAddDiploma = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDip.title) return;
    setLoading(true);
    const success = await onSaveDiploma(newDip);
    setLoading(false);
    if (success) {
      showNotification(`Diplôme "${newDip.title}" sauvegardé.`);
      setNewDip({
        title: "", issuer: "", year: new Date().getFullYear().toString(), imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=800", standard: ""
      });
      onRefreshDB();
    }
  };

  const handleAddAttestation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAtt.title) return;
    setLoading(true);
    const success = await onSaveAttestation(newAtt);
    setLoading(false);
    if (success) {
      showNotification(`Attestation "${newAtt.title}" enregistrée.`);
      setNewAtt({
        title: "", company: "", description: "", year: new Date().getFullYear().toString()
      });
      onRefreshDB();
    }
  };

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedia.url) return;
    setLoading(true);
    const success = await onSaveMedia(newMedia);
    setLoading(false);
    if (success) {
      showNotification(`Média sauvegardé avec succès.`);
      setNewMedia({
        title: "", type: "photo", url: "", videoPlatform: "mp4", category: "Général"
      });
      onRefreshDB();
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.content) return;
    setLoading(true);
    const success = await onSaveTestimonial(newTestimonial);
    setLoading(false);
    if (success) {
      showNotification(`Témoignage client ajouté.`);
      setNewTestimonial({
        name: "", company: "Particulier", role: "Client", content: "", rating: 5, approved: true
      });
      onRefreshDB();
    }
  };

  return (
    <section id="admin" className="py-24 border-t border-slate-900 bg-slate-950/40 text-slate-300">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* LOG SCREEN CASE */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Zone Sécurisée
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Espace d'Administration</h2>
              <p className="text-xs font-sans text-slate-500">Uniquement accessible par Stéphane Traoré</p>
            </div>

            <div className="bg-slate-950 border border-slate-900 rounded-lg p-8 shadow-2xl space-y-4">
              {loginError && (
                <div className="p-3 bg-red-600/10 border border-red-600/20 text-red-400 text-xs rounded text-left">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-mono">Identifiant d'accès</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin_stephane"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wider text-slate-500 font-mono">Mot de passe secret</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded font-display font-semibold text-sm shadow-md transition-colors"
                >
                  S'identifier sécurisé
                </button>
              </form>
              
              <div className="pt-4 border-t border-slate-900 text-center text-xs text-slate-600 space-y-1">
                <p>Identifiants d'essai :</p>
                <code className="block bg-slate-900 text-slate-400 p-1 rounded font-mono">admin_stephane / stephane2026</code>
              </div>
            </div>
          </div>
        ) : (
          /* CONNECTED CORE ADMIN PANEL */
          <div className="space-y-10">
            
            {/* Header section with Logout buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-slate-900">
              <div className="text-left space-y-1">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block">TABLEAU DE BORD EXCLUSIF</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-500" />
                  Espace Gestion Stéphane Traoré
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={onRefreshDB}
                  className="px-4 py-2 bg-slate-900 text-xs font-mono text-slate-400 border border-slate-800 rounded hover:text-white flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Synchroniser
                </button>
                <button 
                  onClick={() => setIsAuthenticated(false)}
                  className="px-4 py-2 bg-red-650 hover:bg-red-700 text-xs font-mono text-white rounded flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Se déconnecter
                </button>
              </div>
            </div>

            {/* Success Notifications block */}
            {successMsg && (
              <div className="p-4 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-md text-left flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                {successMsg}
              </div>
            )}

            {/* Nav tabs for Sub-Section Controls */}
            <div className="flex flex-wrap border-b border-slate-900 gap-2">
              <button
                onClick={() => setActiveTab("msgs")}
                className={`px-5 py-3 font-display font-medium text-xs uppercase tracking-wider border-b-2 -mb-px transition-colors ${
                  activeTab === "msgs"
                    ? "text-orange-500 border-orange-500"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Lettrages Reçus ({db.messages.length})
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`px-5 py-3 font-display font-medium text-xs uppercase tracking-wider border-b-2 -mb-px transition-colors ${
                  activeTab === "settings"
                    ? "text-orange-500 border-orange-500"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Profil & Coordonnées
              </button>
              <button
                onClick={() => setActiveTab("realis")}
                className={`px-5 py-3 font-display font-medium text-xs uppercase tracking-wider border-b-2 -mb-px transition-colors ${
                  activeTab === "realis"
                    ? "text-orange-500 border-orange-500"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Gérer Réalisations
              </button>
              <button
                onClick={() => setActiveTab("comps")}
                className={`px-5 py-3 font-display font-medium text-xs uppercase tracking-wider border-b-2 -mb-px transition-colors ${
                  activeTab === "comps"
                    ? "text-orange-500 border-orange-500"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Diplômes & Témoignages
              </button>
              <button
                onClick={() => setActiveTab("hostinger")}
                className={`px-5 py-3 font-display font-medium text-xs uppercase tracking-wider border-b-2 -mb-px transition-colors ${
                  activeTab === "hostinger"
                    ? "text-orange-500 border-orange-500"
                    : "text-slate-400 border-transparent hover:text-white"
                }`}
              >
                Exporter pour Hostinger 🚀
              </button>
            </div>

            {/* TAB CONTAINER CORRESPONDENCES */}

            {/* TAB 1: RECEIVED LETTERS/MESSAGES LISTINGS */}
            {activeTab === "msgs" && (
              <div className="bg-slate-950 border border-slate-900 rounded-lg p-6 space-y-6 text-left">
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-orange-500" />
                  Boîte de réception des Chantiers Réseaux
                </h3>

                {db.messages.length === 0 ? (
                  <p className="text-slate-500 text-sm py-8 text-center font-light">Aucun message pour l'instant.</p>
                ) : (
                  <div className="space-y-4">
                    {db.messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`p-5 rounded-lg border flex flex-col md:flex-row justify-between gap-6 transition-colors ${
                          msg.read 
                            ? "bg-slate-950 border-slate-900/60" 
                            : "bg-slate-900/10 border-orange-500/10 shadow-lg"
                        }`}
                      >
                        <div className="space-y-2 text-left flex-grow max-w-3xl">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="font-display font-bold text-slate-200">{msg.name}</span>
                            <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-500 font-mono">
                              {new Date(msg.date).toLocaleDateString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                            {!msg.read && (
                              <span className="px-2 py-0.5 bg-orange-500/10 border border-orange-500/25 rounded text-[9px] font-mono font-bold text-orange-500 uppercase tracking-wider">
                                Non lu
                              </span>
                            )}
                          </div>
                          
                          <div className="text-xs font-mono text-slate-400 space-x-4">
                            <span>E-mail : {msg.email}</span>
                            {msg.phone && <span>WhatsApp/Tél : {msg.phone}</span>}
                          </div>

                          <div className="pt-2">
                            <div className="text-amber-500 font-sans font-semibold text-xs uppercase tracking-wider">Objet : {msg.subject}</div>
                            <p className="text-slate-400 text-xs font-sans mt-1 leading-relaxed font-light whitespace-pre-line bg-slate-900/10 p-3 rounded border border-slate-900/50">
                              {msg.message}
                            </p>
                          </div>
                        </div>

                        <div className="flex md:flex-col justify-end gap-2 shrink-0">
                          {!msg.read && (
                            <button
                              onClick={async () => {
                                const ok = await onReadMessage(msg.id);
                                if (ok) showNotification("Message marqué lu.");
                              }}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-mono rounded flex items-center gap-1.5"
                            >
                              Marquer lu
                            </button>
                          )}
                          <button
                            onClick={async () => {
                              if (window.confirm("Supprimer ce message définitivement ?")) {
                                const ok = await onDeleteMessage(msg.id);
                                if (ok) showNotification("Message supprimé.");
                              }
                            }}
                            className="px-3 py-1.5 bg-red-600/10 hover:bg-red-650 text-red-400 hover:text-white text-xs font-mono rounded flex items-center gap-1.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: UPDATE GENERAL PROFILE DETAILS */}
            {activeTab === "settings" && (
              <div className="bg-slate-950 border border-slate-900 rounded-lg p-6 space-y-6 text-left">
                <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-orange-500" />
                  Mettre à jour vos Textes, Coordonnées, Stats
                </h3>

                <form onSubmit={handleUpdateGeneralSettings} className="space-y-6">
                  {/* Master Info line */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-mono tracking-wider text-slate-500">Nom Complet d'Artiste</label>
                      <input 
                        type="text"
                        value={editSettings.name}
                        onChange={(e) => setEditSettings({ ...editSettings, name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-mono tracking-wider text-slate-500">Titre Professionnel</label>
                      <input 
                        type="text"
                        value={editSettings.title}
                        onChange={(e) => setEditSettings({ ...editSettings, title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-mono tracking-wider text-slate-500">Adresse E-mail pro</label>
                      <input 
                        type="email"
                        value={editSettings.email}
                        onChange={(e) => setEditSettings({ ...editSettings, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase font-mono tracking-wider text-slate-500">WhatsApp / Indicatif</label>
                      <input 
                        type="text"
                        value={editSettings.phone}
                        onChange={(e) => setEditSettings({ ...editSettings, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Bio block */}
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-mono tracking-wider text-slate-500">Présentation Générale (À propos)</label>
                    <textarea 
                      rows={5}
                      value={editSettings.aboutMe}
                      onChange={(e) => setEditSettings({ ...editSettings, aboutMe: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-xs text-white leading-relaxed font-light"
                    />
                  </div>

                  {/* Career objectives */}
                  <div className="space-y-1">
                    <label className="text-xs uppercase font-mono tracking-wider text-slate-500">Ambitions & Objectifs de Chantiers</label>
                    <textarea 
                      rows={3}
                      value={editSettings.objectives}
                      onChange={(e) => setEditSettings({ ...editSettings, objectives: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-xs text-white leading-relaxed font-light"
                    />
                  </div>

                  {/* Stats panel changes */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-900 pb-1">Statistiques Clés :</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-slate-600">Ans d'expérience</label>
                        <input 
                          type="number"
                          value={editSettings.stats?.experienceYears || 0}
                          onChange={(e) => setEditSettings({
                            ...editSettings,
                            stats: { ...editSettings.stats, experienceYears: parseInt(e.target.value) || 0 }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-slate-600">Chantiers finis</label>
                        <input 
                          type="number"
                          value={editSettings.stats?.completedProjects || 0}
                          onChange={(e) => setEditSettings({
                            ...editSettings,
                            stats: { ...editSettings.stats, completedProjects: parseInt(e.target.value) || 0 }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-slate-600">Brevets Certifiés</label>
                        <input 
                          type="number"
                          value={editSettings.stats?.certificationsCount || 0}
                          onChange={(e) => setEditSettings({
                            ...editSettings,
                            stats: { ...editSettings.stats, certificationsCount: parseInt(e.target.value) || 0 }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-xs text-white font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-mono tracking-wider text-slate-600">Taux cq visuel (%)</label>
                        <input 
                          type="number"
                          value={editSettings.stats?.satisfactionRate || 0}
                          onChange={(e) => setEditSettings({
                            ...editSettings,
                            stats: { ...editSettings.stats, satisfactionRate: parseInt(e.target.value) || 0 }
                          })}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-end">
                    <button 
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded font-display font-semibold text-xs tracking-wider uppercase disabled:opacity-50"
                    >
                      Enregistrer les coordonnées
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: CREATE AND LIST ALL PROJECTS (REALISATIONS) */}
            {activeTab === "realis" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                {/* Form column */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-900 p-6 rounded-lg space-y-6">
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b border-slate-900 pb-4">
                    <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                      <Plus className="w-5 h-5 text-orange-500" />
                      Ouvrage & Réalisation
                    </h3>
                    <div className="flex bg-slate-900 p-1 rounded-md border border-slate-800 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setProjectPreviewMode("edit")}
                        className={`px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider rounded transition-all duration-150 ${
                          projectPreviewMode === "edit"
                            ? "bg-orange-600 text-white font-medium shadow-md shadow-orange-600/15"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        Saisie
                      </button>
                      <button
                        type="button"
                        onClick={() => setProjectPreviewMode("preview")}
                        className={`px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider rounded transition-all duration-150 flex items-center gap-15 ${
                          projectPreviewMode === "preview"
                            ? "bg-orange-600 text-white font-medium shadow-md shadow-orange-600/15"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                        Prévisualisation
                      </button>
                    </div>
                  </div>

                  {projectPreviewMode === "edit" ? (
                    <form onSubmit={handleAddProject} className="space-y-4 text-xs font-sans">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Titre de l'ouvrage *</label>
                        <input 
                          type="text" 
                          value={newProject.title}
                          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                          required
                          placeholder="Ex: Hangar Structure Cordonné 800m2"
                          className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-[11px] text-white focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Catégorie d'Ouvrage *</label>
                        <select 
                          value={newProject.category}
                          onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                          required
                          className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-[11px] text-white focus:outline-none"
                        >
                          <option value="Charpente Métallique">Charpente Métallique</option>
                          <option value="Tuyauterie Industrielle">Tuyauterie Industrielle</option>
                          <option value="Serrurerie & Chaudronnerie">Serrurerie & Chaudronnerie</option>
                          <option value="Toleriede chaudronnerie">Toleriede chaudronnerie</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Description technique *</label>
                        <textarea 
                          rows={3}
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          required
                          placeholder="Découpe plasma, pointage géométrique, passes de fond TIG et finition arc électrode..."
                          className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-[11px] text-white leading-relaxed focus:outline-none font-light"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Procédés de Soudage (séparés par des virgules) *</label>
                        <input 
                          type="text" 
                          value={projectTechInput}
                          onChange={(e) => setProjectTechInput(e.target.value)}
                          required
                          placeholder="Soudage SMAW, TIG sous Argon, DMOS"
                          className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-[11px] text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Aciers et métaux (séparés par des virgules) *</label>
                        <input 
                          type="text" 
                          value={projectMatInput}
                          onChange={(e) => setProjectMatInput(e.target.value)}
                          required
                          placeholder="Acier S355, Inox 316L, Tubes DN150"
                          className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-[11px] text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Image d'illustration (URL Unsplash ou similaire) *</label>
                        <input 
                          type="text" 
                          value={newProject.imageUrl}
                          onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                          required
                          className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-[11px] text-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Année *</label>
                        <input 
                          type="text" 
                          value={newProject.date}
                          onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
                          required
                          className="w-full bg-slate-900 border border-slate-800 rounded px-4 py-2 text-[11px] text-white font-mono"
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white rounded font-display font-semibold transition-colors mt-2"
                      >
                        Ajouter le projet au site
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded text-slate-300 text-[11px] leading-relaxed flex gap-2">
                        <span>💡</span>
                        <span>
                          <strong>Rendu visuel en direct (Temps Réel) :</strong> Voici comment s'affichera la carte de projet sur le site web public.
                        </span>
                      </div>

                      <div className="bg-slate-950/40 border border-slate-900 rounded-lg overflow-hidden flex flex-col hover:border-orange-500/20 transition-all duration-300">
                        <div className="relative aspect-video overflow-hidden bg-slate-900">
                          <img 
                            src={newProject.imageUrl || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800"} 
                            alt={newProject.title || "Titre temporaire"} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover filter contrast-115 transition-all duration-350"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-80" />
                          <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded text-[9px] font-mono text-orange-500 uppercase tracking-widest font-semibold">
                            {newProject.category || "Charpente Métallique"}
                          </span>
                        </div>

                        <div className="p-5 flex-grow flex flex-col justify-between space-y-4 text-left">
                          <div className="space-y-2">
                            <h4 className="text-sm font-display font-medium text-white">
                              {newProject.title || "Titre de l'ouvrage..."}
                            </h4>
                            <p className="text-slate-400 text-[11px] font-sans leading-relaxed font-light line-clamp-3">
                              {newProject.description || "Aucune description de l'ouvrage rédigée..."}
                            </p>
                          </div>

                          <div className="space-y-2 pt-3 border-t border-slate-900/50 text-[11px]">
                            <div className="flex justify-between gap-4">
                              <span className="text-slate-500 font-mono uppercase tracking-wider text-[8px] shrink-0">Techniques :</span>
                              <span className="text-amber-500 text-right font-sans font-light">
                                {projectTechInput || "Ex: Soudage SMAW, MCAW"}
                              </span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-slate-500 font-mono uppercase tracking-wider text-[8px] shrink-0">Matériaux :</span>
                              <span className="text-slate-300 text-right font-sans font-light">
                                {projectMatInput || "Ex: S355, Inox 316L"}
                              </span>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-slate-500 font-mono uppercase tracking-wider text-[8px]">Chantier :</span>
                              <span className="text-slate-300 font-mono text-[9px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                                {newProject.date || new Date().getFullYear()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={async (e) => {
                          e.preventDefault();
                          if (!newProject.title) {
                            showNotification("Veuillez saisir au moins un titre.");
                            setProjectPreviewMode("edit");
                            return;
                          }
                          const techniques = projectTechInput ? projectTechInput.split(",").map(t => t.trim()) : [];
                          const materials = projectMatInput ? projectMatInput.split(",").map(m => m.trim()) : [];
                          const pSave = {
                            ...newProject,
                            techniques,
                            materials,
                          };
                          setLoading(true);
                          const success = await onSaveProject(pSave);
                          setLoading(false);
                          if (success) {
                            showNotification(`Projet "${newProject.title}" ajouté virtuellement et persisté !`);
                            setNewProject({
                              title: "", description: "", category: "Charpente Métallique", techniques: [], materials: [], imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800", date: new Date().getFullYear().toString()
                            });
                            setProjectTechInput("");
                            setProjectMatInput("");
                            setProjectPreviewMode("edit");
                            onRefreshDB();
                          }
                        }}
                        disabled={loading || !newProject.title}
                        className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white rounded font-display font-semibold transition-colors flex items-center justify-center gap-1.5 text-xs uppercase"
                      >
                        <Plus className="w-3.5 h-3.5" /> Publier depuis l'aperçu
                      </button>
                    </div>
                  )}
                </div>

                {/* List column */}
                <div className="lg:col-span-7 bg-slate-950 border border-slate-900 p-6 rounded-lg space-y-6 overflow-y-auto max-h-[600px]">
                  <h3 className="text-lg font-display font-bold text-white">Catalogue Actuel ({db.projects.length} ouvrages)</h3>
                  
                  <div className="space-y-3">
                    {db.projects.map((proj) => (
                      <div key={proj.id} className="p-4 bg-slate-900/50 border border-slate-900 rounded flex gap-4 items-center justify-between">
                        <div className="flex items-center gap-3 text-left">
                          <img 
                            src={proj.imageUrl} 
                            alt={proj.title} 
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover rounded border border-slate-800 shrink-0" 
                          />
                          <div>
                            <h4 className="text-xs font-display font-bold text-white">{proj.title}</h4>
                            <span className="text-[9px] bg-slate-950 px-1.5 py-0.5 text-slate-500 rounded font-mono uppercase tracking-wider">{proj.category}</span>
                          </div>
                        </div>
                        <button
                          onClick={async () => {
                            if (window.confirm(`Supprimer le projet "${proj.title}" ?`)) {
                              const ok = await onDeleteProject(proj.id);
                              if (ok) {
                                showNotification("Projet retiré avec succès.");
                                onRefreshDB();
                              }
                            }
                          }}
                          className="p-1.5 bg-red-650/10 border border-red-600/25 text-red-400 hover:text-white hover:bg-red-600 rounded"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: COMPONENT DETAILS CREATIONS (DIPLOMAS, REVIEWS) */}
            {activeTab === "comps" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-xs font-sans">
                
                {/* Diplômes managing zone */}
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-lg space-y-6">
                  <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-orange-500" /> Ajouter Diplôme / Certification
                  </h3>
                  
                  <form onSubmit={handleAddDiploma} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-500">Intitulé légal *</label>
                      <input 
                        type="text" 
                        value={newDip.title}
                        onChange={(e) => setNewDip({ ...newDip, title: e.target.value })}
                        required
                        placeholder="Ex: Qualification de Soudeur ISO 9606-1"
                        className="w-full bg-slate-900 border border-slate-850 rounded px-3 py-1.5 text-[11px] text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-500">Organisme Émetteur *</label>
                      <input 
                        type="text" 
                        value={newDip.issuer}
                        onChange={(e) => setNewDip({ ...newDip, issuer: e.target.value })}
                        required
                        className="w-full bg-slate-900 border border-slate-850 rounded px-3 py-1.5 text-[11px] text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-500">Norme / Standard de soudage</label>
                      <input 
                        type="text" 
                        value={newDip.standard}
                        onChange={(e) => setNewDip({ ...newDip, standard: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-850 rounded px-3 py-1.5 text-[11px] text-white"
                      />
                    </div>
                    <button type="submit" className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white font-display font-semibold text-[11px] rounded transition-colors">
                      Ajouter Certif
                    </button>
                  </form>
                </div>

                {/* Testimonial managing zone */}
                <div className="bg-slate-950 border border-slate-900 p-6 rounded-lg space-y-6">
                  <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-orange-500" /> Ajouter un Avis Client
                  </h3>
                  
                  <form onSubmit={handleAddTestimonial} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-500">Nom Complet *</label>
                      <input 
                        type="text" 
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                        required
                        className="w-full bg-slate-900 border border-slate-850 rounded px-3 py-1.5 text-[11px] text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-500">Entreprise / Mandat *</label>
                      <input 
                        type="text" 
                        value={newTestimonial.company}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                        required
                        className="w-full bg-slate-900 border border-slate-850 rounded px-3 py-1.5 text-[11px] text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-slate-500">Avis rédigé *</label>
                      <textarea 
                        rows={2}
                        value={newTestimonial.content}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                        required
                        className="w-full bg-slate-900 border border-slate-850 rounded px-3 py-1.5 text-[11px] text-white leading-relaxed font-light"
                      />
                    </div>
                    <button type="submit" className="w-full py-2 bg-orange-600 hover:bg-orange-500 text-white font-display font-semibold text-[11px] rounded transition-colors">
                      Ajouter Témoignage
                    </button>
                  </form>
                </div>

              </div>
            )}

            {/* TAB 5: HOSTINGER PREMIUM EXPORT SYSTEM */}
            {activeTab === "hostinger" && (
              <div className="bg-slate-950 border border-orange-500/10 rounded-lg p-6 md:p-8 space-y-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange-600/10 border border-orange-500/20 text-orange-500 rounded-lg">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">Centre Hub d'Exportation Hostinger Premium</h3>
                    <p className="text-xs text-slate-400 font-sans font-light">
                      Fichiers natifs PHP 8, MySQL et Bootstrap 5 optimisés rattachés à votre espace d'hébergement.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-orange-600/10 border border-orange-500/20 rounded text-xs text-orange-400 leading-relaxed font-sans font-light">
                  <strong>💡 Information d'Intégration d'Exception :</strong> Stéphane, nous avons pré-configuré un pack portable PHP complet à l'intérieur du dossier <code className="bg-slate-950 px-1 py-0.5 text-light text-xxs font-mono">/public/php-version/</code> de votre workspace. Ces fichiers contiennent exactement le même design industriel orange et acier, avec toutes les sécurités XSS, et d'importantes requêtes MySQL préparées contre les injections de code malveillant.
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 border-b border-slate-900 pb-1">Fichiers à télécharger ou copier :</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 bg-slate-900/40 border border-slate-900 rounded space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-white text-xs font-semibold">index.php</span>
                        <span className="text-[10px] text-slate-500 uppercase font-mono">Vue principale</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-light">Affiche le portfolio, les réalisations dynamiques lues en base SQL, et traite le formulaire client.</p>
                      <a href="/php-version/index.php" target="_blank" className="text-xs text-orange-500 font-semibold flex items-center gap-1 hover:underline">
                        <FileCode2 className="w-3.5 h-3.5" /> Consulter le Code
                      </a>
                    </div>

                    <div className="p-4 bg-slate-900/40 border border-slate-900 rounded space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-white text-xs font-semibold">admin.php</span>
                        <span className="text-[10px] text-slate-500 uppercase font-mono">Dashboard</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-light">Espace d'administration complet avec login haché pour effacer/ajouter vos projets en temps réel.</p>
                      <a href="/php-version/admin.php" target="_blank" className="text-xs text-orange-500 font-semibold flex items-center gap-1 hover:underline">
                        <FileCode2 className="w-3.5 h-3.5" /> Consulter le Code
                      </a>
                    </div>

                    <div className="p-4 bg-slate-900/40 border border-slate-900 rounded space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-white text-xs font-semibold">db.sql</span>
                        <span className="text-[10px] text-slate-500 uppercase font-mono">Base MySQL</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed font-light">Script complet d'importation phpMyAdmin comprenant les structures de tables et exemples.</p>
                      <a href="/php-version/db.sql" target="_blank" className="text-xs text-orange-500 font-semibold flex items-center gap-1 hover:underline">
                        <FileCode2 className="w-3.5 h-3.5" /> Consulter le Code
                      </a>
                    </div>
                  </div>

                  <div className="bg-slate-900/20 border border-slate-900 rounded p-6 text-xs text-slate-400 space-y-4">
                    <h5 className="font-display font-medium text-white text-sm">Déploiement Hostinger Rapide :</h5>
                    <ol className="list-decimal list-inside space-y-2 font-sans font-light">
                      <li>Créez une Base MySQL sur votre hPanel Hostinger.</li>
                      <li>Importez le fichier <code className="bg-slate-950 text-slate-400 px-1 rounded text-xxs font-mono">db.sql</code> dans phpMyAdmin.</li>
                      <li>Complétez vos variables de liaison dans le fichier <code className="bg-slate-950 text-slate-400 px-1 rounded text-xxs font-mono">config.php</code>.</li>
                      <li>Chargez l'ensemble des fichiers PHP dans le dossier <code className="bg-slate-950 text-slate-400 px-1 rounded text-xxs font-mono">public_html</code> via le gestionnaire Hostinger.</li>
                    </ol>
                    <a href="/php-version/INSTALLATION_HOSTINGER.md" target="_blank" className="inline-flex items-center gap-1.5 text-xs text-orange-500 font-semibold hover:underline">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Voir le Guide d'Installation Complet (INSTALLATION_HOSTINGER.md)
                    </a>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
