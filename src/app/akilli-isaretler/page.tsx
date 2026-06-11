"use client";

import { useProgress } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface SmartSign {
  id: string;
  label: string;
  icon: string;
  color: string;
  type: "age" | "content";
}

interface BroadcastFile {
  id: number;
  title: string;
  genre: string;
  desc: string;
  correctAge: string; // e.g. "G", "7+", "13+", "18+"
  correctContent: string[]; // e.g. ["siddet", "olumsuz"]
  explanation: string;
}

const smartSigns: SmartSign[] = [
  // Age Ratings
  { id: "G", label: "Genel İzleyici", icon: "👪", color: "var(--success-500)", type: "age" },
  { id: "7+", label: "7 Yaş ve Üzeri", icon: "7️⃣", color: "var(--primary-400)", type: "age" },
  { id: "13+", label: "13 Yaş ve Üzeri", icon: "1️⃣3️⃣", color: "var(--warning-400)", type: "age" },
  { id: "18+", label: "18 Yaş ve Üzeri", icon: "1️⃣8️⃣", color: "var(--danger-500)", type: "age" },
  // Content Alerts
  { id: "siddet", label: "Şiddet ve Korku", icon: "💥", color: "#f97316", type: "content" },
  { id: "cinsellik", label: "Cinsellik", icon: "🔞", color: "#ec4899", type: "content" },
  { id: "olumsuz", label: "Olumsuz Örnek", icon: "🚬", color: "#a855f7", type: "content" }
];

const cases: BroadcastFile[] = [
  {
    id: 1,
    title: "Uzay Gezginleri Dedektifliği",
    genre: "Çizgi Dizi / Animasyon",
    desc: "Sevimli robotlar ve uzay tavşanları galaksiyi gezerek kayıp yıldızları arıyor. Karakterler sürekli birbirine yardım ediyor, kaba veya kırıcı hiçbir diyalog içermiyor. Şiddet, korku veya olumsuz davranış teşkil edecek hiçbir unsur bulunmuyor.",
    correctAge: "G",
    correctContent: [],
    explanation: "Bu yapım tamamen zararsız, arkadaşlık ve yardımlaşma temasını işleyen bir animasyondur. RTÜK kurallarına göre hiçbir içerik uyarısı gerektirmez ve 'Genel İzleyici' (G) kitlesine uygundur."
  },
  {
    id: 2,
    title: "Karanlık Labirent: Uyanış",
    genre: "Sinema Filmi / Gerilim - Korku",
    desc: "Karanlık bir labirentte sıkışan gençlerin, aniden beliren canavarlardan kaçışını anlatıyor. Film boyunca karakterlerin korkudan çığlık attığı, canavarların insanlara saldırdığı yoğun kanlı görüntüler ve ani ses efektleriyle (jump-scare) süslenmiş korkutucu sahneler yer alıyor.",
    correctAge: "18+",
    correctContent: ["siddet"],
    explanation: "Yoğun korku, anksiyete tetikleyici ani korkutma sahneleri ve kanlı şiddet içeren yapımlar, çocukların ruh sağlığını olumsuz etkileyeceği için RTÜK tarafından '18 Yaş ve Üzeri' olarak sınıflandırılır ve 'Şiddet ve Korku' uyarısı taşır."
  },
  {
    id: 3,
    title: "Lise Yılları: Rüzgar Esince",
    genre: "Gençlik Dizisi / Drama",
    desc: "Bir grup lise öğrencisinin maceralarını konu alıyor. Sahnelerde bazı popüler öğrencilerin okul arkasında gizlice sigara içtiği, birbirlerine kaba/küfürlü kelimelerle hitap ettiği ve öğretmenlerine karşı saygısızca sergilenen davranışlar ön plana çıkarılıyor.",
    correctAge: "13+",
    correctContent: ["olumsuz"],
    explanation: "Sigara kullanımı, kaba dil ve otoriteye karşı saygısızlık gibi davranışlar RTÜK tarafından 'Olumsuz Örnek Oluşturabilecek Davranışlar' olarak işaretlenir. Bu yapım akran etkileşimi riski taşıdığı için '13 Yaş ve Üzeri' izleyici kitlesi için uygundur."
  },
  {
    id: 4,
    title: "Sokak Savaşı: Hesaplaşma",
    genre: "Televizyon Dizisi / Aksiyon - Polisiye",
    desc: "Şehirdeki organize suç çetelerine karşı savaşan özel bir polis ekibinin hikayesi. Çatışma sahnelerinde silahlar patlıyor, arabalar havaya uçuyor ve bazı dövüş sahnelerinde yaralanmalar görünüyor. Ayrıca karakterler stresli anlarda hafif argo ve kaba davranışlar sergiliyor.",
    correctAge: "13+",
    correctContent: ["siddet", "olumsuz"],
    explanation: "Aksiyon, patlama ve dövüş sahneleri barındıran polisiye yapımlar hem 'Şiddet ve Korku' hem de argo ve yasa dışı çeteleşme ögeleri nedeniyle 'Olumsuz Örnek' uyarılarını beraber taşır. Yaş sınırı olarak ise '13 Yaş ve Üzeri' için uygundur."
  }
];

export default function AkilliIsaretlerPage() {
  const router = useRouter();
  const { state, addXP, earnBadge } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [roundFinished, setRoundFinished] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const currentCase = cases[currentIndex];

  const handleAgeToggle = (ageId: string) => {
    if (checked) return;
    setSelectedAge(selectedAge === ageId ? null : ageId);
  };

  const handleContentToggle = (contentId: string) => {
    if (checked) return;
    if (selectedContent.includes(contentId)) {
      setSelectedContent(selectedContent.filter((id) => id !== contentId));
    } else {
      setSelectedContent([...selectedContent, contentId]);
    }
  };

  const handleCheckDecision = () => {
    if (!selectedAge) {
      alert("Lütfen bir yaş grubu akıllı işareti seçin.");
      return;
    }

    const isAgeMatch = selectedAge === currentCase.correctAge;
    const isContentMatch =
      selectedContent.length === currentCase.correctContent.length &&
      selectedContent.every((c) => currentCase.correctContent.includes(c));

    const correct = isAgeMatch && isContentMatch;
    setIsCorrect(correct);
    setChecked(true);

    if (correct) {
      setEarnedXP((prev) => prev + 40);
    }
  };

  const handleNext = () => {
    setSelectedAge(null);
    setSelectedContent([]);
    setChecked(false);
    setIsCorrect(false);

    if (currentIndex < cases.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setRoundFinished(true);
      // Toplam kazanılan puanı ekle
      addXP(earnedXP);
      // Denetçi rozetini kazan
      earnBadge("RTÜK Denetçisi");
    }
  };

  if (roundFinished) {
    return (
      <div className="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div className="hero-bg">
          <div className="hero-bg-orb hero-bg-orb-1" style={{ background: "var(--success-500)", opacity: 0.15 }} />
          <div className="hero-bg-orb hero-bg-orb-2" />
          <div className="hero-grid" />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "650px", textAlign: "center" }}>
          <div className="glass-card" style={{ padding: "48px 32px" }}>
            <span style={{ fontSize: "4.5rem", display: "block", marginBottom: "20px" }}>🏛️</span>
            <span className="section-badge" style={{ marginBottom: "12px", background: "rgba(34, 197, 94, 0.1)", color: "var(--success-400)" }}>
              Denetim Turu Tamamlandı!
            </span>
            <h2 style={{ fontSize: "2rem", color: "var(--gray-100)", marginBottom: "16px", fontFamily: "var(--font-heading)" }}>
              Lisanslı Yayın Denetçisi
            </h2>

            <p style={{ fontSize: "1rem", color: "var(--gray-300)", marginBottom: "32px", lineHeight: 1.6 }}>
              Tebrikler! RTÜK Akıllı İşaretler standartlarına göre 4 televizyon yapımını da başarıyla denetlediniz. Toplum sağlığını ve çocuk gelişimini koruma görevini layıkıyla üstlendiniz.
            </p>

            <div style={{ background: "rgba(0,0,0,0.05)", border: "var(--border-subtle)", padding: "24px", borderRadius: "var(--radius-md)", marginBottom: "32px", textAlign: "left" }}>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <div style={{ fontSize: "2.5rem" }}>🎖️</div>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "var(--success-400)", fontWeight: 700 }}>YENİ UNVAN & ROZET KİLİDİ AÇILDI:</div>
                  <div style={{ fontSize: "1.1rem", color: "var(--gray-100)", fontWeight: 800 }}>RTÜK Akıllı İşaretler Denetçisi</div>
                  <div style={{ fontSize: "0.88rem", color: "var(--warning-400)", marginTop: "4px" }}>
                    Kazanılan Puan: <strong>+{earnedXP} XP</strong> ve <strong>'RTÜK Denetçisi' Rozeti</strong>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <Link href="/dashboard" className="btn btn-primary btn-lg" style={{ animation: "pulse-glow 2s infinite" }}>
                Kullanıcı Paneline Dön 🚀
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--gray-950)", paddingBottom: "100px" }}>
      {/* ===== HEADER ===== */}
      <header className="navbar scrolled" style={{ position: "relative", marginBottom: "40px" }}>
        <div className="container navbar-inner">
          <Link href="/dashboard" className="navbar-logo" style={{ fontSize: "1rem", color: "var(--gray-400)", fontWeight: 500 }}>
            ← Paneli Dön
          </Link>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--gray-100)" }}>
            RTÜK Akıllı İşaretler Atölyesi
          </span>
          <div className="navbar-cta">
            <span style={{ fontSize: "0.85rem", color: "var(--primary-400)", fontWeight: 600 }}>Puan: +{earnedXP} XP</span>
          </div>
        </div>
      </header>

      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="section-header" style={{ textAlign: "left", maxWidth: "none", marginBottom: "32px" }}>
          <span className="section-badge">Yayın Denetim Masası</span>
          <h2 className="section-title" style={{ fontSize: "1.8rem" }}>Akıllı İşaretleri Sınıflandırın</h2>
          <p className="section-desc">
            Aşağıdaki yapım dosyasını inceleyin. RTÜK standartlarına uygun <strong>Yaş Grubu</strong> (sadece bir adet) ve eğer varsa <strong>İçerik Uyarıları</strong> (birden fazla seçilebilir) işaretlerini damgalayın.
          </p>
        </div>

        {/* ===== YAPIM DOSYASI KARTI ===== */}
        <div className="glass-card" style={{ padding: "36px", marginBottom: "32px", borderLeft: "4px solid var(--primary-500)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span className="section-badge" style={{ background: "rgba(59,130,246,0.1)", color: "var(--primary-400)", border: "1px solid rgba(59,130,246,0.2)" }}>
              YAYIN DOSYASI #{currentCase.id}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>Dosya {currentIndex + 1} / {cases.length}</span>
          </div>
          <h2 style={{ fontSize: "1.4rem", color: "var(--gray-100)", marginBottom: "6px", fontFamily: "var(--font-heading)" }}>
            {currentCase.title}
          </h2>
          <span style={{ fontSize: "0.82rem", color: "var(--gray-500)", fontWeight: 600, display: "block", marginBottom: "16px" }}>
            Kategori: {currentCase.genre}
          </span>
          <div style={{ background: "rgba(0,0,0,0.05)", border: "1px dashed rgba(255,255,255,0.1)", padding: "20px", borderRadius: "var(--radius-md)", color: "var(--gray-300)", fontSize: "0.95rem", lineHeight: 1.6 }}>
            <strong>Detaylı Sahne Raporu:</strong><br />
            {currentCase.desc}
          </div>
        </div>

        {/* ===== AKILLI İŞARETLER SEÇİM ALANI ===== */}
        <div className="glass-card" style={{ padding: "36px", marginBottom: "32px" }}>
          {/* Yaş Sınırları */}
          <h3 style={{ fontSize: "1rem", color: "var(--gray-100)", marginBottom: "16px", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
            1. Yaş Grubu Sınıflandırması (Birini Seçin)
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
            {smartSigns
              .filter((s) => s.type === "age")
              .map((s) => {
                const isSelected = selectedAge === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleAgeToggle(s.id)}
                    disabled={checked}
                    style={{
                      background: isSelected ? s.color : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isSelected ? s.color : "rgba(255,255,255,0.08)"}`,
                      borderRadius: "var(--radius-md)",
                      padding: "16px 8px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      cursor: checked ? "default" : "pointer",
                      transition: "var(--transition-fast)",
                      color: isSelected ? "white" : "var(--gray-300)",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                    }}
                    className={!checked ? "glass-card" : ""}
                  >
                    <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                );
              })}
          </div>

          {/* İçerik Uyarıları */}
          <h3 style={{ fontSize: "1rem", color: "var(--gray-100)", marginBottom: "16px", fontWeight: 700, fontFamily: "var(--font-heading)" }}>
            2. İçerik Uyarı Damgaları (Birden Fazla Seçilebilir / Hiçbiri de Seçilebilir)
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {smartSigns
              .filter((s) => s.type === "content")
              .map((s) => {
                const isSelected = selectedContent.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => handleContentToggle(s.id)}
                    disabled={checked}
                    style={{
                      background: isSelected ? s.color : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isSelected ? s.color : "rgba(255,255,255,0.08)"}`,
                      borderRadius: "var(--radius-md)",
                      padding: "16px 8px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      cursor: checked ? "default" : "pointer",
                      transition: "var(--transition-fast)",
                      color: isSelected ? "white" : "var(--gray-300)",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                    }}
                    className={!checked ? "glass-card" : ""}
                  >
                    <span style={{ fontSize: "2rem" }}>{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* ===== FEEDBACK AND SUBMISSION ===== */}
        {!checked ? (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handleCheckDecision} className="btn btn-primary btn-lg" style={{ minWidth: "200px" }}>
              Kararı Onayla ve Yayınla 🏛️
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Feedback alert box */}
            <div
              style={{
                background: isCorrect ? "rgba(34, 197, 94, 0.04)" : "rgba(239, 68, 68, 0.04)",
                border: `1px solid ${isCorrect ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                padding: "24px",
                borderRadius: "var(--radius-md)",
                marginBottom: "24px",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "2rem" }}>{isCorrect ? "🎉" : "⚠️"}</span>
              <div>
                <h4 style={{ fontSize: "1rem", fontWeight: 800, color: isCorrect ? "var(--success-400)" : "var(--danger-400)", marginBottom: "6px" }}>
                  {isCorrect ? "Yayına Onay Verildi! (+40 XP)" : "Geri Bildirim / RTÜK Kararı"}
                </h4>
                <p style={{ fontSize: "0.88rem", color: "var(--gray-300)", lineHeight: 1.6 }}>
                  {currentCase.explanation}
                </p>
              </div>
            </div>

            {/* Navigation action */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {isCorrect ? (
                <button onClick={handleNext} className="btn btn-primary btn-lg" style={{ minWidth: "160px" }}>
                  {currentIndex === cases.length - 1 ? "Denetimi Sonlandır 🏁" : "Sonraki Dosya ➔"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setChecked(false);
                    setIsCorrect(false);
                    setSelectedAge(null);
                    setSelectedContent([]);
                  }}
                  className="btn btn-outline"
                >
                  Tekrar Sınıflandır 🔄
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
