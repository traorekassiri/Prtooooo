import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Flame, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AdvisorChat() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Bonjour ! Je suis le Directeur Technique Virtuel de Stéphane. Je peux répondre à toutes vos questions d'ingénierie, spécifications thermiques, procédés de soudage (SMAW, TIG, MAG) ou normes (ISO 9606-1, ASME IX) appliquées sur nos chantiers. Posez-moi votre question !"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const userQuery = question.trim();
    setQuestion("");
    setMessages((prev) => [...prev, { role: "user", text: userQuery }]);
    setLoading(true);

    try {
      const response = await fetch("/api/gemini/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userQuery })
      });
      const data = await response.json();
      
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev, 
          { 
            role: "assistant", 
            text: "⚠️ *Erreur Technique* : Impossible d'obtenir la réponse de l'AI pour le moment. Veuillez réessayer plus tard ou appeler Stéphane directement !" 
          }
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev, 
        { 
          role: "assistant", 
          text: "⚠️ *Erreur Réseau* : Veuillez vérifier votre connexion au serveur d'administration locale." 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const presetQuestions = [
    "Quelle est la différence entre le procédé 111 (SMAW) et 141 (TIG) ?",
    "Qu'est-ce que garantit la certification ISO 9606-1 de Stéphane ?",
    "Quels aciers spéciaux ou gaz de protection utilisez-vous ?"
  ];

  const handlePresetClick = (q: string) => {
    setQuestion(q);
  };

  return (
    <section className="py-24 border-t border-slate-905 bg-slate-950/20 relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="font-mono text-orange-500 text-xs tracking-widest uppercase block flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            INTELLIGENCE ARTIFICIELLE
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
            Consultant Métallurgique & Soudage Virtuel
          </h2>
          <p className="text-slate-400 text-xs font-sans font-light">
            Posez vos questions techniques sur nos procédés soudure et obtenez l'avis de notre expert virtuel instantanément.
          </p>
        </div>

        {/* Chat Widget Base Container */}
        <div className="bg-slate-950 border border-slate-900 rounded-lg overflow-hidden shadow-2xl flex flex-col h-[500px]">
          {/* Header Panel */}
          <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-600/10 border border-orange-500/20 text-orange-500 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-display font-medium text-white m-0">Directeur Technique Virtuel</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SOUDAG-AI SPÉCIALIST SYSTEM ACTIVE
                </div>
              </div>
            </div>
            <span className="text-[10px] bg-slate-950 px-2.5 py-1 border border-slate-800 rounded font-mono text-slate-500 uppercase tracking-wider">
              Gemini 3.5 Flash
            </span>
          </div>

          {/* Conversations output log */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex gap-3 text-sm text-left ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role !== "user" && (
                  <div className="w-7 h-7 bg-slate-900 border border-slate-800 text-slate-400 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div 
                  className={`p-4 rounded-lg max-w-[80%] leading-relaxed ${
                    msg.role === "user" 
                      ? "bg-slate-900 text-slate-200 rounded-tr-none" 
                      : "bg-slate-900/40 border border-slate-900/60 text-slate-300 rounded-tl-none font-light py-3"
                  }`}
                >
                  {/* Simplistic formatting support */}
                  <span className="whitespace-pre-line text-xs font-sans">
                    {msg.text}
                  </span>
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 bg-orange-600 text-white rounded-full flex items-center justify-center shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-3 justify-start text-sm">
                <div className="w-7 h-7 bg-slate-900 border border-slate-800 text-slate-400 rounded-full flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-900/40 border border-slate-900/60 p-4 rounded-lg rounded-tl-none text-slate-500 text-xs font-sans flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-500" />
                  L'AI analyse la nuance métallo-thermique...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Presets fast questions clicks */}
          <div className="px-6 py-2.5 bg-slate-950/80 border-t border-slate-900/50 flex flex-wrap gap-2 text-left">
            {presetQuestions.map((pq, idx) => (
              <button
                key={idx}
                onClick={() => handlePresetClick(pq)}
                className="text-[10px] font-sans text-slate-500 hover:text-orange-500 bg-slate-900/50 hover:bg-slate-900 border border-slate-900/80 hover:border-orange-500/10 px-2.5 py-1 rounded transition-colors duration-150"
              >
                {pq}
              </button>
            ))}
          </div>

          {/* Input text bar trigger form */}
          <form onSubmit={handleSubmit} className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
            <input 
              type="text" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
              placeholder="Ex: Comment vérifier l'absence de fissures sur l'acier carbonne ?"
              className="flex-grow bg-slate-950 border border-slate-800 rounded font-sans text-xs text-white px-4 py-3 focus:outline-none focus:border-orange-600 transition-colors"
            />
            <button 
              type="submit" 
              disabled={loading || !question.trim()}
              className="px-5 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-950 disabled:text-slate-600 hover:shadow-orange-600/20 text-white rounded transition-colors flex items-center justify-center shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
