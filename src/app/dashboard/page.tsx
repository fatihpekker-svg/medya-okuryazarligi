"use client";

import { useProgress, LevelType } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Shield, Trophy, User, RefreshCw, Flame, Star, GraduationCap, Gamepad, Search, Lock, ShieldCheck, Microscope, PlayCircle } from "lucide-react";

const modules = [
  { id: 1, title: "Medya Nedir?", desc: "Medya türleri, toplumsal rolü ve tüketim alışkanlıkları" },
  { id: 2, title: "Haber Değerlendirme", desc: "Güvenilir kaynak, 5N1K analizi, çapraz kontrol" },
  { id: 3, title: "Dezenformasyon", desc: "Çarpıtma, bot hesaplar, deepfake ve manipülasyon" },
  { id: 4, title: "Sosyal Medya", desc: "Algoritma, filtre balonları, dijital ayak izi" },
  { id: 5, title: "Görsel Okuryazarlık", desc: "Fotoğraf manipülasyonu, ters arama, AI görseller" },
  { id: 6, title: "Reklam & İkna", desc: "Hedefleme, influencer, duygusal manipülasyon" },
  { id: 7, title: "Dijital Güvenlik", desc: "Siber zorbalık, veri güvenliği, dolandırıcılık" },
  { id: 8, title: "Medya Üretimi & Etik", desc: "Sorumlu içerik, telif, dijital vatandaşlık" },
  { id: 9, title: "RTÜK & Düzenleme", desc: "Akıllı İşaretler, yayın ilkeleri, şikâyet" },
  { id: 10, title: "Kriz Dönemleri", desc: "Afet haberciliği, sağlık krizleri, doğrulama" },
];

const caseStudies = [
  { id: "orman-yangini", title: "Orman Yangınları #HelpTurkey Paylaşımları", badge: "Manipüle", type: "manipulated", year: "2021" },
  { id: "covid-vaccine", title: "Aşıların İçindeki Çipler ve Yan Etkileri", badge: "Sahte", type: "fake", year: "2020" },
  { id: "earthquake-scam", title: "Deprem Sonrası Sahte Yardım Hesapları", badge: "Sahte", type: "fake", year: "2023" },
  { id: "deepfake-celeb", title: "Ünlülerin Deepfake Siyasi/Finans Videoları", badge: "Manipüle", type: "manipulated", year: "2024" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { state, loaded, resetProgress } = useProgress();

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

  const getNextRankXP = (xp: number) => {
    if (xp < 200) return 200;
    if (xp < 500) return 500;
    if (xp < 1000) return 1000;
    return 2000; // Max Rank
  };

  const nextXP = getNextRankXP(state.xp);
  const prevRankXP = nextXP === 200 ? 0 : nextXP === 500 ? 200 : nextXP === 1000 ? 500 : 1000;
  const progressPercent = Math.min(100, Math.max(0, ((state.xp - prevRankXP) / (nextXP - prevRankXP)) * 100));

  const totalLessons = 30; // Varsayılan: Her modülde 3 ders var
  const completedLessonsCount = state.completedLessons.length;
  const totalQuizzesCount = state.completedQuizzes.length;
  const completionPercent = Math.round((totalQuizzesCount / modules.length) * 100);

  const isCertificateUnlocked = totalQuizzesCount === modules.length;

  const handleReset = () => {
    if (confirm("Tüm ilerlemenizi, XP puanlarınızı ve rozetlerinizi sıfırlamak istediğinize emin misiniz?")) {
      resetProgress();
      router.push("/seviye-sec");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--gray-950)", paddingBottom: "100px" }}>
      {/* ===== HEADER ===== */}
      <header className="navbar scrolled" style={{ position: "relative", marginBottom: "40px" }}>
        <div className="container navbar-inner">
          <Link href="/" className="navbar-logo" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Shield className="navbar-logo-icon" size={24} color="var(--primary-500)" />
            <span style={{ fontWeight: 800 }}>MedyaOkur</span>
          </Link>
          <div className="navbar-cta" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/liderlik" style={{ fontSize: "0.95rem", color: "var(--gray-200)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
              <Trophy size={16} color="var(--warning-500)" /> Sıralama
            </Link>
            <Link href="/profil" style={{ fontSize: "0.95rem", color: "var(--gray-200)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
              <User size={16} color="var(--primary-500)" /> Profilim
            </Link>
            <span style={{ fontSize: "0.95rem", color: "var(--gray-300)", fontWeight: 500 }}>{state.userName}</span>
            <button onClick={handleReset} className="btn btn-outline btn-sm" style={{ borderColor: "rgba(239,68,68,0.3)", color: "var(--danger-500)", display: "flex", alignItems: "center", gap: "6px", marginLeft: "8px" }}>
              <RefreshCw size={14} /> Sıfırla
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        {/* ===== USER OVERVIEW ===== */}
        <section className="glass-card" style={{ marginBottom: "32px", padding: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <span className="section-badge" style={{ marginBottom: "8px" }}>
                {levelLabels[state.level]}
              </span>
              <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "var(--gray-100)", marginBottom: "8px" }}>
                Hoş Geldin, {state.userName}!
              </h1>
              <p style={{ color: "var(--gray-400)", fontSize: "1rem" }}>
                Medya okuryazarlığı yolculuğunda dezenformasyonlara karşı kalkanını geliştiriyorsun.
              </p>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <div className="hero-stat" style={{ background: "rgba(0,0,0,0.05)", padding: "16px 24px", borderRadius: "var(--radius-md)", border: "var(--border-subtle)" }}>
                <div className="hero-stat-number" style={{ color: "var(--warning-400)", display: "flex", alignItems: "center", gap: "8px" }}><Flame size={24} /> {state.streak}</div>
                <div className="hero-stat-label">Günlük Seri</div>
              </div>
              <div className="hero-stat" style={{ background: "rgba(0,0,0,0.05)", padding: "16px 24px", borderRadius: "var(--radius-md)", border: "var(--border-subtle)" }}>
                <div className="hero-stat-number" style={{ color: "var(--primary-400)", display: "flex", alignItems: "center", gap: "8px" }}><Star size={24} /> {state.xp}</div>
                <div className="hero-stat-label">XP Puanı</div>
              </div>
            </div>
          </div>

          {/* XP PROGRESS BAR */}
          <div style={{ marginTop: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--gray-400)", marginBottom: "8px", fontWeight: 600 }}>
              <span>Mevcut Ünvan: {getRank(state.xp)}</span>
              <span>Sonraki Seviye: {state.xp} / {nextXP} XP</span>
            </div>
            <div style={{ height: "10px", width: "100%", background: "var(--gray-800)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressPercent}%`, background: "var(--gradient-primary)", borderRadius: "var(--radius-full)", transition: "width 0.5s ease-out" }} />
            </div>
          </div>
        </section>

        {/* ===== STATS & BADGES ===== */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "32px", marginBottom: "48px", flexWrap: "wrap" }}>
          {/* Certificates Card */}
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", color: "var(--gray-100)", marginBottom: "12px", fontFamily: "var(--font-heading)", display: "flex", alignItems: "center", gap: "8px" }}>
                <GraduationCap size={24} color="var(--primary-500)" /> Sertifika Durumu
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--gray-400)", lineHeight: 1.5, marginBottom: "20px" }}>
                10 modülün tamamını tamamlayarak <strong>RTÜK & MedyaOkur</strong> onaylı resmi dijital sertifikanızı almaya hak kazanın.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(0,0,0,0.05)", padding: "12px", borderRadius: "var(--radius-md)", border: "var(--border-subtle)", marginBottom: "20px" }}>
                <div><Trophy size={28} color="var(--warning-500)" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>Tamamlanma Oranı</div>
                  <div style={{ fontSize: "1rem", color: "var(--gray-100)", fontWeight: 700 }}>% {completionPercent}</div>
                </div>
              </div>
            </div>
            {isCertificateUnlocked ? (
              <Link href="/sertifika" className="btn btn-primary" style={{ width: "100%", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <GraduationCap size={20} /> Sertifikamı Al
              </Link>
            ) : (
              <button disabled className="btn btn-outline" style={{ width: "100%", opacity: 0.5, cursor: "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <Lock size={20} /> Sertifika Kilitli
              </button>
            )}
          </div>

          {/* Badges Collection */}
          <div className="glass-card">
            <h3 style={{ fontSize: "1.2rem", color: "var(--gray-100)", marginBottom: "16px", fontFamily: "var(--font-heading)" }}>
              🏆 Rozet Koleksiyonu ({state.earnedBadges.length} Rozet)
            </h3>
            {state.earnedBadges.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "150px", color: "var(--gray-500)", fontSize: "0.9rem" }}>
                <span style={{ fontSize: "2rem", marginBottom: "8px" }}>🎖️</span>
                <span>Henüz kazanılmış bir rozetiniz bulunmuyor.</span>
                <span>Dersleri ve sınavları tamamlayarak kazanmaya başlayın!</span>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {state.earnedBadges.map((badge, idx) => {
                  const badgeIcons: Record<string, string> = {
                    "İlk Adım": "🎯",
                    "Dedektif Adayı": "🕵️",
                    "Medya Kaşifi": "🌱",
                    "Haber Analisti": "📰",
                    "Dezenformasyon Kalkanı": "🛡️",
                    "Algoritma Bükücü": "⚙️",
                    "Görsel Dedektif": "👁️",
                    "İkna Savar": "📢",
                    "Siber Gardiyan": "🔒",
                    "Etik Üretici": "✏️",
                    "RTÜK Denetçisi": "🏛️",
                    "Kriz Uzmanı": "🚨",
                    "Medya Ustası": "👑",
                    "İlk Vaka Çözüldü": "🧠",
                  };
                  return (
                    <div
                      key={idx}
                      style={{
                        background: "rgba(0,0,0,0.05)",
                        border: "var(--border-subtle)",
                        padding: "12px 18px",
                        borderRadius: "var(--radius-md)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        boxShadow: "var(--shadow-sm)",
                      }}
                    >
                      <span style={{ fontSize: "1.3rem" }}>{badgeIcons[badge] || "🏅"}</span>
                      <span style={{ fontSize: "0.85rem", color: "var(--gray-100)", fontWeight: 600 }}>{badge}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ===== EDUCATION CURRICULUM ===== */}
        <section style={{ marginBottom: "60px" }}>
          <div className="section-header" style={{ textAlign: "left", maxWidth: "none", marginBottom: "32px" }}>
            <h2 className="section-title" style={{ fontSize: "1.8rem" }}>📖 Eğitim Müfredatı</h2>
            <p className="section-desc" style={{ fontSize: "0.95rem" }}>
              Adım adım ilerleyin. Bir modülü ve quizini tamamladığınızda bir sonraki modülün kilidi açılacaktır.
            </p>
          </div>

          <div className="modules-grid" style={{ gap: "24px" }}>
            {modules.map((m) => {
              const isUnlocked = state.unlockedModules.includes(m.id);
              const isCompleted = state.completedQuizzes.includes(m.id);
              const isCurrent = isUnlocked && !isCompleted;

              let cardStyle: React.CSSProperties = {
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "28px",
                borderRadius: "var(--radius-lg)",
                border: "var(--border-subtle)",
                transition: "var(--transition-base)",
              };

              if (isCompleted) {
                cardStyle = {
                  ...cardStyle,
                  background: "rgba(34, 197, 94, 0.08)",
                  borderColor: "rgba(34, 197, 94, 0.35)",
                };
              } else if (isCurrent) {
                cardStyle = {
                  ...cardStyle,
                  background: "rgba(59, 130, 246, 0.08)",
                  borderColor: "rgba(59, 130, 246, 0.4)",
                  boxShadow: "0 4px 20px rgba(59, 130, 246, 0.12)",
                };
              } else {
                cardStyle = {
                  ...cardStyle,
                  background: "rgba(0, 0, 0, 0.06)",
                  opacity: 0.6,
                  cursor: "not-allowed",
                };
              }

              return (
                <div key={m.id} style={cardStyle} className={isUnlocked ? "glass-card" : ""}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px" }}>
                    <div
                      className="module-number"
                      style={{
                        background: isCompleted
                          ? "linear-gradient(135deg, #22c55e, #16a34a)"
                          : isUnlocked
                          ? "var(--gradient-primary)"
                          : "var(--gray-800)",
                        color: isUnlocked ? "white" : "var(--gray-500)",
                      }}
                    >
                      {isCompleted ? "✓" : m.id}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "1.1rem", color: isUnlocked ? "var(--gray-100)" : "var(--gray-500)", marginBottom: "4px" }}>
                        {m.title}
                      </h3>
                      <p style={{ fontSize: "0.85rem", color: isUnlocked ? "var(--gray-300)" : "var(--gray-500)" }}>{m.desc}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                    {isCompleted ? (
                      <span style={{ fontSize: "0.82rem", color: "var(--success-400)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                        🎉 Modül Tamamlandı (+150 XP)
                      </span>
                    ) : isCurrent ? (
                      <span style={{ fontSize: "0.82rem", color: "var(--primary-400)", fontWeight: 600 }}>
                        ⚡ Aktif Modül
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.82rem", color: "var(--gray-600)", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                        🔒 Kilitli
                      </span>
                    )}

                    {isUnlocked ? (
                      <Link href={`/modul/${m.id}`} className={`btn btn-sm ${isCompleted ? "btn-outline" : "btn-primary"}`}>
                        {isCompleted ? "Tekrar İncele" : "Başla 🚀"}
                      </Link>
                    ) : (
                      <button disabled className="btn btn-sm btn-outline" style={{ opacity: 0.5, cursor: "not-allowed" }}>
                        Kilitli 🔒
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ===== RTÜK AKILLI İŞARETLER OYUNU BANNER ===== */}
        <section style={{ marginBottom: "60px" }}>
          <div className="glass-card" style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)",
            borderColor: "rgba(139, 92, 246, 0.25)",
            padding: "36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.05)"
          }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <span className="section-badge" style={{ background: "rgba(59, 130, 246, 0.15)", color: "var(--accent-400)", border: "1px solid rgba(139, 92, 246, 0.3)", marginBottom: "0", gap: "8px" }}>
                <Gamepad size={16} /> İnteraktif Mini Oyun
              </span>
              <h2 style={{ fontSize: "1.6rem", color: "var(--gray-100)", marginTop: "12px", marginBottom: "8px", fontFamily: "var(--font-heading)" }}>
                RTÜK Akıllı İşaretler Atölyesi
              </h2>
              <p style={{ color: "var(--gray-400)", fontSize: "0.92rem", lineHeight: 1.5 }}>
                Resmi RTÜK Yayın Denetçisi rolünü üstlenin! Televizyon yapımlarını inceleyip, yaş gruplarını ve içerik uyarısı işaretlerini doğru damgalayarak puanları ve özel başarı rozetlerini toplayın.
              </p>
            </div>
            <div>
              <Link href="/akilli-isaretler" className="btn btn-primary btn-lg" style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)", display: "flex", alignItems: "center", gap: "8px" }}>
                Denetime Başla <ShieldCheck size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== DİJİTAL DOĞRULAMA ARAÇLARI LABORATUVARI BANNER ===== */}
        <section style={{ marginBottom: "60px" }}>
          <div className="glass-card" style={{
            background: "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)",
            borderColor: "rgba(16, 185, 129, 0.25)",
            padding: "36px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            boxShadow: "0 0 30px rgba(16, 185, 129, 0.05)"
          }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <span className="section-badge" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.3)", marginBottom: "0", gap: "8px" }}>
                <Search size={16} /> Doğrulama Atölyesi
              </span>
              <h2 style={{ fontSize: "1.6rem", color: "var(--gray-100)", marginTop: "12px", marginBottom: "8px", fontFamily: "var(--font-heading)" }}>
                Dijital Doğrulama Araçları Laboratuvarı
              </h2>
              <p style={{ color: "var(--gray-400)", fontSize: "0.92rem", lineHeight: 1.5 }}>
                Tersine görsel arama simülatörünü kullanın, görselleri EXIF/Metadata çözücüyle röntgenleyin ve yapay zeka tarafından üretilmiş görsellerdeki anatomik anomalileri dedektörle yakalayın!
              </p>
            </div>
            <div>
              <Link href="/araclar" className="btn btn-primary btn-lg" style={{ background: "linear-gradient(135deg, #06b6d4, #10b981)", border: "none", boxShadow: "0 4px 20px rgba(16, 185, 129, 0.3)", display: "flex", alignItems: "center", gap: "8px" }}>
                Laboratuvara Gir <Microscope size={20} />
              </Link>
            </div>
          </div>
        </section>

        {/* ===== INTERACTIVE CASE STUDIES ===== */}
        <section>
          <div className="section-header" style={{ textAlign: "left", maxWidth: "none", marginBottom: "32px" }}>
            <h2 className="section-title" style={{ fontSize: "1.8rem" }}>🔎 Gerçek Vaka Analizleri</h2>
            <p className="section-desc" style={{ fontSize: "0.95rem" }}>
              Türkiye&apos;de yaşanmış gerçek dezenformasyon ve manipülasyon olaylarını kararlar alarak analiz edin.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "800px" }}>
            {caseStudies.map((c) => (
              <div key={c.id} className="case-card" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span className={`case-badge case-badge-${c.type}`}>{c.badge}</span>
                  <div>
                    <h3 style={{ fontSize: "1rem", color: "var(--gray-100)", marginBottom: "4px" }}>{c.title}</h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--gray-500)" }}>Yıl: {c.year} • RTÜK Raporu Destekli İnteraktif Simülasyon</p>
                  </div>
                </div>
                <Link href={`/vaka/${c.id}`} className="btn btn-outline btn-sm" style={{ color: "var(--primary-400)", borderColor: "rgba(59,130,246,0.3)" }}>
                  Analiz Et →
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
