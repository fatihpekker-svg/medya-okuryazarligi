"use client";

import { useProgress, LevelType } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { User as UserIcon, Flame, Trophy, BarChart3, Medal, Award, Star, BookOpen, Shield, GraduationCap, TrendingUp, Cpu, Activity, Video, Lock, CheckCircle2 } from "lucide-react";

interface BadgeDetail {
  name: string;
  icon: string;
  color: string;
  description: string;
  requirement: string;
}

const allBadges: BadgeDetail[] = [
  { name: "İlk Adım", icon: "🎯", color: "#3b82f6", description: "MedyaOkur platformuna ilk adımı attınız.", requirement: "Platforma başarıyla kaydolduğunuzda kazanılır." },
  { name: "Dedektif Adayı", icon: "🕵️", color: "#10b981", description: "Medya dünyasındaki ilk dersinizi tamamladınız.", requirement: "Herhangi bir dersi tamamladığınızda kazanılır." },
  { name: "Medya Kaşifi", icon: "🌱", color: "#22c55e", description: "Medya Nedir modülünü başarıyla bitirdiniz.", requirement: "Modül 1 sınavını geçtiğinizde kazanılır." },
  { name: "Haber Analisti", icon: "📰", color: "#a855f7", description: "Haber Değerlendirme tekniklerinde ustalaştınız.", requirement: "Modül 2 sınavını geçtiğinizde kazanılır." },
  { name: "Dezenformasyon Kalkanı", icon: "🛡️", color: "#f59e0b", description: "Dezenformasyon ve manipülasyonları teşhis etmeye başladınız.", requirement: "Modül 3 sınavını geçtiğinizde kazanılır." },
  { name: "Algoritma Bükücü", icon: "⚙️", color: "#ec4899", description: "Sosyal medya algoritmalarını ve yankı odalarını çözdünüz.", requirement: "Modül 4 sınavını geçtiğinizde kazanılır." },
  { name: "Görsel Dedektif", icon: "👁️", color: "#06b6d4", description: "Fotoğraf ve video manipülasyonlarını deşifre ettiniz.", requirement: "Modül 5 sınavını geçtiğinizde kazanılır." },
  { name: "İkna Savar", icon: "📢", color: "#f97316", description: "Gizli reklamları ve manipülatif pazarlamayı fark ettiniz.", requirement: "Modül 6 sınavını geçtiğinizde kazanılır." },
  { name: "Siber Gardiyan", icon: "🔒", color: "#ef4444", description: "Kişisel veri güvenliğinizi ve siber korunmayı sağladınız.", requirement: "Modül 7 sınavını geçtiğinizde kazanılır." },
  { name: "Etik Üretici", icon: "✏️", color: "#eab308", description: "Sorumlu içerik üretimi ve telif etiğini benimsediniz.", requirement: "Modül 8 sınavını geçtiğinizde kazanılır." },
  { name: "RTÜK Denetçisi", icon: "🏛️", color: "#8b5cf6", description: "Akıllı işaretler sınıflandırma atölyesini tamamladınız.", requirement: "Akıllı İşaretler mini oyununu tamamladığınızda kazanılır." },
  { name: "Kriz Uzmanı", icon: "🚨", color: "#ec4899", description: "Afet ve kriz dezenformasyonlarıyla başa çıkmayı öğrendiniz.", requirement: "Modül 10 sınavını geçtiğinizde kazanılır." },
  { name: "İlk Vaka Çözüldü", icon: "🧠", color: "#14b8a6", description: "İlk gerçek dünya dezenformasyon simülasyonunu çözdünüz.", requirement: "Herhangi bir interaktif vaka çalışmasını tamamladığınızda kazanılır." },
  { name: "Medya Ustası", icon: "👑", color: "#d946ef", description: "Tüm eğitim modüllerini başarıyla tamamlayan elit okuryazar.", requirement: "10 modül sınavının tamamını geçtiğinizde kazanılır." }
];


export default function ProfilPage() {
  const router = useRouter();
  const { state, loaded } = useProgress();
  const [activeTab, setActiveTab] = useState<"stats" | "badges" | "certificate">("stats");

  useEffect(() => {
    // Seviye seçilmediyse seviye seçimine yönlendir (Sadece yükleme bittikten sonra)
    if (loaded && !state.level) {
      router.push("/seviye-sec");
    }
  }, [loaded, state.level, router]);

  if (!loaded || !state.level) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--gray-950)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--primary-400)", fontSize: "1.2rem", fontWeight: 600, fontFamily: "var(--font-heading)" }}>Yükleniyor...</div>
      </div>
    );
  }

  const levelLabels: Record<LevelType, string> = {
    primary: "🌱 İlkokul (Medya Dedektifi)",
    secondary: "🔍 Ortaöğretim (Medya Analisti)",
    tertiary: "🎓 Yetişkin (Medya Uzmanı)",
    "": "",
  };

  const getRank = (xp: number) => {
    if (xp < 200) return "🥉 Başlangıç";
    if (xp < 500) return "🥈 Keşifçi";
    if (xp < 1000) return "🥇 Analist";
    return "💎 Medya Uzmanı";
  };

  // İstatistik hesaplamaları
  const totalModules = 10;
  const completedModulesCount = state.completedQuizzes.length;
  const completedLessonsCount = state.completedLessons.length;
  const earnedBadgesCount = state.earnedBadges.length;

  // Dinamik / Simüle Başarı Oranları
  const verificationSuccessRate = completedModulesCount > 0 ? Math.min(100, 75 + completedModulesCount * 2.5) : 0;
  const averageQuizScore = completedModulesCount > 0 ? Math.min(100, 80 + completedModulesCount * 1.5) : 0;

  return (
    <div style={{ minHeight: "100vh", background: "var(--gray-950)", paddingBottom: "100px" }}>
      {/* ===== NAVBAR ===== */}
      <header className="navbar scrolled" style={{ position: "relative", marginBottom: "40px" }}>
        <div className="container navbar-inner">
          <Link href="/dashboard" className="navbar-logo" style={{ fontSize: "1rem", color: "var(--gray-400)", fontWeight: 500 }}>
            ← Paneli Dön
          </Link>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--gray-100)" }}>
            Öğrenci Profili & Analitik
          </span>
          <div className="navbar-cta">
            <span style={{ fontSize: "0.85rem", color: "var(--warning-400)", fontWeight: 600 }}>⭐ {state.xp} XP</span>
          </div>
        </div>
      </header>

      <div className="container" style={{ maxWidth: "900px" }}>
        {/* ===== ÜST PROFİL KARTI ===== */}
        <section className="glass-card" style={{ padding: "40px", marginBottom: "40px", borderLeft: "4px solid var(--accent-500)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap" }}>
            <div style={{
              width: "90px",
              height: "90px",
              borderRadius: "var(--radius-full)",
              background: "var(--gradient-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.8rem",
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
              color: "var(--gray-100)"
            }}>
              <UserIcon size={44} />
            </div>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <span className="section-badge" style={{ background: "rgba(139,92,246,0.1)", color: "var(--accent-400)" }}>
                {levelLabels[state.level]}
              </span>
              <h1 style={{ fontSize: "2rem", color: "var(--gray-100)", fontWeight: 800, marginTop: "8px", marginBottom: "4px" }}>
                {state.userName}
              </h1>
              <p style={{ color: "var(--gray-400)", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "6px" }}>
                Rütbe: <strong style={{ color: "var(--gray-100)" }}>{getRank(state.xp)}</strong> • Seri: <strong style={{ color: "var(--warning-400)", display: "flex", alignItems: "center", gap: "4px" }}><Flame size={16} /> {state.streak} Gün</strong>
              </p>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ textAlign: "center", background: "rgba(0,0,0,0.05)", padding: "12px 20px", borderRadius: "var(--radius-md)", border: "var(--border-subtle)" }}>
                <div style={{ fontSize: "1.5rem", color: "var(--gray-100)", fontWeight: 800 }}>{state.xp}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--gray-500)", fontWeight: 600, marginTop: "2px" }}>TOPLAM XP</div>
              </div>
              <div style={{ textAlign: "center", background: "rgba(0,0,0,0.05)", padding: "12px 20px", borderRadius: "var(--radius-md)", border: "var(--border-subtle)" }}>
                <div style={{ fontSize: "1.5rem", color: "var(--gray-100)", fontWeight: 800 }}>{earnedBadgesCount}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--gray-500)", fontWeight: 600, marginTop: "2px" }}>ROZET</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TAB NAVIGASYONU ===== */}
        <div style={{ display: "flex", borderBottom: "var(--border-subtle)", gap: "24px", marginBottom: "32px" }}>
          <button
            onClick={() => setActiveTab("stats")}
            style={{
              padding: "12px 8px",
              background: "none",
              border: "none",
              color: activeTab === "stats" ? "var(--gray-100)" : "var(--gray-500)",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              borderBottom: activeTab === "stats" ? "2px solid var(--primary-500)" : "2px solid transparent",
              transition: "var(--transition-fast)"
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart3 size={18} /> Analitik & İstatistikler</div>
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            style={{
              padding: "12px 8px",
              background: "none",
              border: "none",
              color: activeTab === "badges" ? "var(--gray-100)" : "var(--gray-500)",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              borderBottom: activeTab === "badges" ? "2px solid var(--primary-500)" : "2px solid transparent",
              transition: "var(--transition-fast)"
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Medal size={18} /> Başarı Rozetleri ({earnedBadgesCount}/{allBadges.length})</div>
          </button>
          <button
            onClick={() => setActiveTab("certificate")}
            style={{
              padding: "12px 8px",
              background: "none",
              border: "none",
              color: activeTab === "certificate" ? "var(--gray-100)" : "var(--gray-500)",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              borderBottom: activeTab === "certificate" ? "2px solid var(--primary-500)" : "2px solid transparent",
              transition: "var(--transition-fast)"
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Award size={18} /> Sertifika Bilgisi</div>
          </button>
        </div>

        {/* ===== SEKMELERİN İÇERİKLERİ ===== */}

        {/* 1. SEKME: İSTATİSTİKLER VE GRAFİKLER */}
        {activeTab === "stats" && (
          <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Temel Veri Kartları Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
              <div className="glass-card" style={{ padding: "24px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--gray-500)", fontWeight: 700 }}>EĞİTİM TAMAMLAMA</span>
                <h3 style={{ fontSize: "1.8rem", color: "var(--gray-100)", marginTop: "8px", marginBottom: "16px", fontWeight: 800 }}>
                  % {Math.round((completedModulesCount / totalModules) * 100)}
                </h3>
                <div style={{ height: "6px", background: "var(--gray-800)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(completedModulesCount / totalModules) * 100}%`, background: "var(--success-500)" }} />
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--gray-500)", display: "block", marginTop: "8px" }}>
                  10 modülden {completedModulesCount} tanesi başarıyla bitirildi.
                </span>
              </div>

              <div className="glass-card" style={{ padding: "24px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--gray-500)", fontWeight: 700 }}>ÇÖZÜLEN INTERAKTİF DERS</span>
                <h3 style={{ fontSize: "1.8rem", color: "var(--gray-100)", marginTop: "8px", marginBottom: "16px", fontWeight: 800 }}>
                  {completedLessonsCount} / 30
                </h3>
                <div style={{ height: "6px", background: "var(--gray-800)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(completedLessonsCount / 30) * 100}%`, background: "var(--primary-500)" }} />
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--gray-500)", display: "block", marginTop: "8px" }}>
                  Toplam 30 dersten {completedLessonsCount} ders tamamlandı.
                </span>
              </div>

              <div className="glass-card" style={{ padding: "24px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--gray-500)", fontWeight: 700 }}>DEZENFORMASYON DOĞRULAMA BAŞARISI</span>
                <h3 style={{ fontSize: "1.8rem", color: "var(--gray-100)", marginTop: "8px", marginBottom: "16px", fontWeight: 800 }}>
                  {completedModulesCount > 0 ? `% ${verificationSuccessRate}` : "Hesaplanıyor..."}
                </h3>
                <div style={{ height: "6px", background: "var(--gray-800)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${verificationSuccessRate}%`, background: "var(--warning-500)" }} />
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--gray-500)", display: "block", marginTop: "8px" }}>
                  Ders sonu pratiklerinde doğru cevaba ulaşma ortalamanız.
                </span>
              </div>
            </div>

            {/* Performans Analiz Detayı */}
            <div className="glass-card" style={{ padding: "32px" }}>
              <h3 style={{ fontSize: "1.1rem", color: "var(--gray-100)", marginBottom: "20px", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={24} color="var(--primary-500)" /> Eğitim Performans Grafiği</div>
              </h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "var(--gray-300)", marginBottom: "6px" }}>
                    <span>Sınav Başarı Puanı</span>
                    <span style={{ fontWeight: 700 }}>{completedModulesCount > 0 ? `${averageQuizScore} / 100` : "Katılınmadı"}</span>
                  </div>
                  <div style={{ height: "12px", background: "var(--gray-900)", borderRadius: "var(--radius-sm)", border: "var(--border-subtle)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${averageQuizScore}%`, background: "linear-gradient(90deg, var(--primary-500), var(--accent-500))" }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "var(--gray-300)", marginBottom: "6px" }}>
                    <span>Medya Okuryazarı Bilinç Endeksi</span>
                    <span style={{ fontWeight: 700 }}>{Math.round(Math.min(100, 30 + completedModulesCount * 7))} / 100</span>
                  </div>
                  <div style={{ height: "12px", background: "var(--gray-900)", borderRadius: "var(--radius-sm)", border: "var(--border-subtle)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.round(Math.min(100, 30 + completedModulesCount * 7))}%`, background: "linear-gradient(90deg, #10b981, #059669)" }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem", color: "var(--gray-300)", marginBottom: "6px" }}>
                    <span>Gerçek Kriz Çözüm Oranı</span>
                    <span style={{ fontWeight: 700 }}>% {state.earnedBadges.includes("İlk Vaka Çözüldü") ? 100 : 0}</span>
                  </div>
                  <div style={{ height: "12px", background: "var(--gray-900)", borderRadius: "var(--radius-sm)", border: "var(--border-subtle)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${state.earnedBadges.includes("İlk Vaka Çözüldü") ? 100 : 0}%`, background: "linear-gradient(90deg, #f59e0b, #d97706)" }} />
                  </div>
                </div>
              </div>

              <div style={{ background: "rgba(0,0,0,0.05)", border: "var(--border-subtle)", padding: "16px 20px", borderRadius: "var(--radius-md)", marginTop: "24px", fontSize: "0.85rem", color: "var(--gray-400)", lineHeight: 1.5 }}>
                💡 <strong>Medya Analistinin Tavsiyesi:</strong> Dezenformasyon ve görsel manipülasyon modüllerinin sınav puanlarını yüksek tutmak, resmi sertifikanızın üzerindeki doğrulama güvenilirlik skorunuzu doğrudan artıracaktır.
              </div>
            </div>
          </div>
        )}

        {/* 2. SEKME: BAŞARI ROZETLERİ (DETAYLI & KİLİTLİLER) */}
        {activeTab === "badges" && (
          <div className="animate-fade-in">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
              {allBadges.map((b, index) => {
                const isEarned = state.earnedBadges.includes(b.name);

                return (
                  <div
                    key={index}
                    className="glass-card"
                    style={{
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      opacity: isEarned ? 1 : 0.45,
                      border: `1px solid ${isEarned ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.04)"}`,
                      background: isEarned ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.005)",
                      boxShadow: isEarned ? `0 8px 24px rgba(255, 255, 255, 0.02)` : "none",
                      position: "relative",
                      transition: "var(--transition-base)"
                    }}
                  >
                    {!isEarned && (
                      <span style={{ position: "absolute", top: "12px", right: "12px", fontSize: "0.9rem", color: "var(--gray-500)" }}>🔒</span>
                    )}

                    <div style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "var(--radius-full)",
                      background: isEarned ? b.color : "var(--gray-900)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "2.2rem",
                      marginBottom: "16px",
                      boxShadow: isEarned ? `0 0 20px ${b.color}40` : "none"
                    }}>
                      {b.icon}
                    </div>

                    <h4 style={{ fontSize: "1rem", color: "var(--gray-100)", fontWeight: 700, marginBottom: "8px" }}>{b.name}</h4>
                    
                    <p style={{ fontSize: "0.8rem", color: isEarned ? "var(--gray-300)" : "var(--gray-500)", lineHeight: 1.4, flex: 1, marginBottom: "12px" }}>
                      {isEarned ? b.description : b.requirement}
                    </p>

                    {isEarned ? (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.72rem", background: "rgba(34, 197, 94, 0.1)", color: "var(--success-400)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontWeight: 700 }}>
                        <CheckCircle2 size={12} /> Kazanıldı
                      </span>
                    ) : (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.72rem", background: "rgba(0,0,0,0.05)", color: "var(--gray-500)", padding: "4px 10px", borderRadius: "var(--radius-full)", fontWeight: 700 }}>
                        <Lock size={12} /> Kilitli
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. SEKME: SERTİFİKA BİLGİLERİ */}
        {activeTab === "certificate" && (
          <div className="animate-fade-in" style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div className="glass-card" style={{ padding: "40px", textAlign: "center" }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}><Award size={80} color="var(--primary-500)" /></div>
              <h2 style={{ fontSize: "1.6rem", color: "var(--gray-100)", fontWeight: 800, marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
                Resmi Dijital Sertifika Durumu
              </h2>
              
              <div style={{ background: "rgba(0,0,0,0.05)", border: "var(--border-subtle)", padding: "24px", borderRadius: "var(--radius-md)", margin: "24px 0", textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--gray-400)" }}>Gerekli Eğitim Modülü:</span>
                  <span style={{ color: "var(--gray-100)", fontWeight: 700 }}>{totalModules} Modül</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--gray-400)" }}>Tamamlanan Modül:</span>
                  <span style={{ color: "var(--gray-100)", fontWeight: 700 }}>{completedModulesCount} Modül</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--gray-400)" }}>Kalan Gereksinim:</span>
                  <span style={{ color: completedModulesCount === totalModules ? "var(--success-400)" : "var(--primary-400)", fontWeight: 700 }}>
                    {completedModulesCount === totalModules ? "Hazır!" : `${totalModules - completedModulesCount} Modül Sınavı`}
                  </span>
                </div>
              </div>

              {completedModulesCount === totalModules ? (
                <div>
                  <div style={{
                    background: "rgba(34, 197, 94, 0.05)",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                    padding: "20px",
                    borderRadius: "var(--radius-md)",
                    marginBottom: "32px",
                    fontSize: "0.9rem",
                    color: "var(--success-300)"
                  }}>
                    Tebrikler, tüm modülleri başarıyla tamamladınız! Resmi krem-altın mühürlü sertifikanızın kilidi açıldı.
                  </div>
                  <Link href="/sertifika" className="btn btn-primary btn-lg" style={{ width: "100%", animation: "pulse-glow 2s infinite", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <Award size={20} /> Sertifikamı Görüntüle ve Yazdır
                  </Link>
                </div>
              ) : (
                <div>
                  <div style={{ height: "12px", background: "var(--gray-800)", borderRadius: "var(--radius-full)", overflow: "hidden", marginBottom: "32px" }}>
                    <div style={{ height: "100%", width: `${(completedModulesCount / totalModules) * 100}%`, background: "var(--gradient-primary)" }} />
                  </div>
                  <button disabled className="btn btn-outline" style={{ width: "100%", opacity: 0.5, cursor: "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <Shield size={20} /> Sertifika Kazanmak İçin Modülleri Bitirin
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
