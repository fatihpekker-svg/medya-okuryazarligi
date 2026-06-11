"use client";

import { useProgress } from "@/context/ProgressContext";
import { useState } from "react";
import Link from "next/link";
import { Shield, Wrench, Search, Eye, FileDigit, Image as ImageIcon, Droplets, Bot, Hand, FileText, Lightbulb, CheckCircle2, XCircle, FileImage, Settings, MapPin, SearchCode, FolderSearch, Clock } from "lucide-react";

interface ToolCase {
  id: string;
  title: string;
  badge: string;
  imageSrc: string;
  description: string;
  viralClaim: string;
}

const reverseSearchCases: ToolCase[] = [
  {
    id: "mammoth",
    title: "Sibirya'da Canlı Mamut Görüntülendi!",
    badge: "Çevre & Doğa",
    imageSrc: "🐘",
    description: "Sosyal medyada 15 milyon izlenme alan, Sibirya steplerinde yürüyen tüylü bir mamut videosu.",
    viralClaim: "Açıklama: 'Küresel ısınma sonucu buzullar eridi ve donmuş mamut canlandı! Sibirya yerlileri kameraya aldı!'",
  },
  {
    id: "tsunami",
    title: "İzmir Depremi Sonrası Tsunami Dalgaları!",
    badge: "Afet / Kriz",
    imageSrc: "🌊",
    description: "Depremden hemen sonra İzmir kıyılarına çarpan 30 metrelik dev dalgaları gösteren tüyler ürpertici bir fotoğraf.",
    viralClaim: "Açıklama: 'İzmir'de deprem anı! Dev dalgalar şehri yutuyor, acil tahliye gerekiyor!'",
  }
];

export default function AraclarPage() {
  const { addXP, state, earnBadge } = useProgress();
  const [activeTool, setActiveTool] = useState<"reverse" | "ai" | "exif">("reverse");

  // State: Reverse Image Search Simulator
  const [selectedCase, setSelectedCase] = useState<string>("");
  const [searching, setSearching] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);

  // State: AI Image Detector
  const [foundHotspots, setFoundHotspots] = useState<string[]>([]);
  const [aiAnalysisDone, setAiAnalysisDone] = useState(false);

  // State: EXIF / Metadata Decoder
  const [exifFileLoaded, setExifFileLoaded] = useState(false);
  const [exifAnalyzing, setExifAnalyzing] = useState(false);
  const [exifCompleted, setExifCompleted] = useState(false);

  // 1. REVERSE SEARCH HANDLERS
  const startReverseSearch = (caseId: string) => {
    setSelectedCase(caseId);
    setSearching(true);
    setSearchCompleted(false);

    setTimeout(() => {
      setSearching(false);
      setSearchCompleted(true);
      addXP(40); // 40 XP ödül
    }, 2500);
  };

  // 2. AI DETECTOR HANDLERS
  const handleHotspotClick = (spotId: string) => {
    if (foundHotspots.includes(spotId)) return;
    const nextSpots = [...foundHotspots, spotId];
    setFoundHotspots(nextSpots);

    if (nextSpots.length === 3) {
      setAiAnalysisDone(true);
      addXP(50); // 50 XP ödül
      earnBadge("Görsel Dedektif"); // Rozet kazandır
    }
  };

  // 3. EXIF DECODER HANDLERS
  const triggerExifAnalysis = () => {
    setExifAnalyzing(true);
    setTimeout(() => {
      setExifAnalyzing(false);
      setExifCompleted(true);
      addXP(40); // 40 XP
      earnBadge("İlk Vaka Çözüldü");
    }, 3000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--gray-950)", paddingBottom: "100px" }}>
      {/* ===== NAVBAR ===== */}
      <header className="navbar scrolled" style={{ position: "relative", marginBottom: "40px" }}>
        <div className="container navbar-inner">
          <Link href="/dashboard" className="navbar-logo" style={{ fontSize: "1rem", color: "var(--gray-400)", fontWeight: 500 }}>
            ← Paneli Dön
          </Link>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--gray-100)", display: "flex", alignItems: "center", gap: "8px" }}>
            <Shield size={20} color="var(--primary-500)" /> Dijital Doğrulama Araçları Laboratuvarı
          </span>
          <div className="navbar-cta">
            <span style={{ fontSize: "0.85rem", color: "var(--warning-400)", fontWeight: 600 }}>⭐ {state.xp} XP</span>
          </div>
        </div>
      </header>

      <div className="container">
        {/* ===== DETAYLI AÇIKLAMA VE ARAÇ SEÇİCİ ===== */}
        <section className="glass-card" style={{ padding: "36px", marginBottom: "40px", textAlign: "center" }}>
          <span className="section-badge" style={{ marginBottom: "12px", display: "inline-flex", alignItems: "center", gap: "6px" }}><Wrench size={16} /> İnteraktif Sandbox</span>
          <h1 style={{ fontSize: "2rem", color: "var(--gray-100)", fontWeight: 800, marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
            Haberleri Teyit Etmeyi Öğrenin!
          </h1>
          <p style={{ color: "var(--gray-400)", fontSize: "0.95rem", maxWidth: "680px", margin: "0 auto 28px", lineHeight: 1.6 }}>
            İnternette gördüğünüz şüpheli bir görseli veya iddiayı saniyeler içinde nasıl analiz edeceğinizi uygulamalı olarak deneyimleyin. Profesyonel teyitçilerin kullandığı teknikleri keşfedin.
          </p>

          {/* ARAÇ SEÇİM PANAROMASI */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", maxWidth: "800px", margin: "0 auto" }}>
            <button
              onClick={() => { setActiveTool("reverse"); setSelectedCase(""); setSearchCompleted(false); }}
              style={{
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                background: activeTool === "reverse" ? "var(--gradient-primary)" : "rgba(255,255,255,0.02)",
                border: activeTool === "reverse" ? "1px solid var(--primary-400)" : "var(--border-subtle)",
                color: "var(--gray-100)",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "var(--transition-base)"
              }}
            >
              <span><Search size={18} /></span> Tersine Görsel Arama
            </button>

            <button
              onClick={() => { setActiveTool("ai"); setFoundHotspots([]); setAiAnalysisDone(false); }}
              style={{
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                background: activeTool === "ai" ? "var(--gradient-primary)" : "rgba(255,255,255,0.02)",
                border: activeTool === "ai" ? "1px solid var(--primary-400)" : "var(--border-subtle)",
                color: "var(--gray-100)",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "var(--transition-base)"
              }}
            >
              <span><Eye size={18} /></span> Yapay Zeka (AI) Dedektörü
            </button>

            <button
              onClick={() => { setActiveTool("exif"); setExifFileLoaded(false); setExifCompleted(false); }}
              style={{
                padding: "16px 20px",
                borderRadius: "var(--radius-md)",
                background: activeTool === "exif" ? "var(--gradient-primary)" : "rgba(255,255,255,0.02)",
                border: activeTool === "exif" ? "1px solid var(--primary-400)" : "var(--border-subtle)",
                color: "var(--gray-100)",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "var(--transition-base)"
              }}
            >
              <span><FolderSearch size={18} /></span> Metadata (EXIF) Okuyucu
            </button>
          </div>
        </section>

        {/* ===== ARAÇ İÇERİKLERİ ===== */}

        {/* ARAÇ 1: TERSİNE GÖRSEL ARAMA */}
        {activeTool === "reverse" && (
          <div className="glass-card animate-fade-in" style={{ padding: "40px" }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--gray-100)", marginBottom: "8px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Search size={24} color="var(--primary-500)" /> Tersine Görsel Arama (Reverse Image Search)
            </h2>
            <p style={{ color: "var(--gray-400)", fontSize: "0.9rem", marginBottom: "32px", lineHeight: 1.5 }}>
              İnternetteki görsellerin ilk ne zaman ve hangi web sitesinde paylaşıldığını bulmak için tersine arama yaparız. Bu sayede <strong>eski fotoğrafların yeniymiş gibi servis edilmesini</strong> kolayca yakalarız.
            </p>

            {!selectedCase ? (
              <div>
                <h3 style={{ fontSize: "1rem", color: "var(--gray-100)", marginBottom: "16px", fontWeight: 600 }}>
                  Taramak İstediğiniz Şüpheli Görseli Seçin:
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                  {reverseSearchCases.map((c) => (
                    <div
                      key={c.id}
                      style={{
                        background: "rgba(0,0,0,0.05)",
                        border: "var(--border-subtle)",
                        borderRadius: "var(--radius-lg)",
                        padding: "24px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "var(--transition-base)",
                        cursor: "pointer"
                      }}
                      onClick={() => startReverseSearch(c.id)}
                      className="hover-card"
                    >
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                          <span className="section-badge" style={{ margin: 0 }}>{c.badge}</span>
                          <span style={{ fontSize: "1.5rem" }}>{c.imageSrc}</span>
                        </div>
                        <h4 style={{ fontSize: "1.05rem", color: "var(--gray-100)", fontWeight: 700, marginBottom: "8px" }}>{c.title}</h4>
                        <p style={{ fontSize: "0.85rem", color: "var(--gray-400)", marginBottom: "12px", lineHeight: 1.4 }}>{c.description}</p>
                        <blockquote style={{ background: "rgba(255,255,255,0.7)", padding: "10px 14px", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", color: "var(--warning-400)", fontStyle: "italic", borderLeft: "3px solid var(--warning-400)" }}>
                          {c.viralClaim}
                        </blockquote>
                      </div>
                      <button className="btn btn-primary btn-sm" style={{ width: "100%", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                        Görseli İnternette Araştır <Search size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                {searching ? (
                  <div style={{ padding: "40px 0" }}>
                    <div className="spinner" style={{
                      width: "60px",
                      height: "60px",
                      border: "6px solid rgba(255,255,255,0.05)",
                      borderTop: "6px solid var(--primary-500)",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      margin: "0 auto 24px"
                    }} />
                    <h3 style={{ color: "var(--gray-100)", fontSize: "1.2rem", fontWeight: 700, marginBottom: "8px" }}>Görsel Veritabanı Taranıyor...</h3>
                    <p style={{ color: "var(--gray-400)", fontSize: "0.88rem" }}>Google Lens, TinEye ve Yandex Görsel indeksleri çapraz kontrol ediliyor.</p>
                  </div>
                ) : (
                  <div className="animate-fade-in" style={{ textAlign: "left" }}>
                    {/* Başarı Bilgisi */}
                    <div style={{
                      background: "rgba(34, 197, 94, 0.08)",
                      border: "1px solid rgba(34, 197, 94, 0.2)",
                      padding: "20px",
                      borderRadius: "var(--radius-md)",
                      color: "var(--success-400)",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "32px"
                    }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}><CheckCircle2 size={20} /> Arama Başarıyla Tamamlandı! Küresel veri eşleşmesi bulundu. (+40 XP)</span>
                      <button onClick={() => setSelectedCase("")} className="btn btn-sm btn-outline" style={{ color: "var(--success-400)", borderColor: "rgba(34,197,94,0.3)" }}>
                        Yeni Görsel Seç
                      </button>
                    </div>

                    {/* BULGULAR */}
                    {selectedCase === "mammoth" ? (
                      <div>
                        <h3 style={{ fontSize: "1.2rem", color: "var(--gray-100)", marginBottom: "16px", fontWeight: 700 }}>🔍 Doğrulama Raporu: Sahte Mamut Videosu</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "32px", flexWrap: "wrap" }}>
                          <div style={{ background: "rgba(0,0,0,0.05)", border: "var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
                            🦣
                          </div>
                          <div>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", color: "var(--gray-300)" }}>
                              <tbody>
                                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                                  <td style={{ padding: "12px 0", fontWeight: 700, color: "var(--gray-100)", width: "180px" }}>İlk Paylaşım Tarihi:</td>
                                  <td style={{ padding: "12px 0" }}>14 Kasım 2011 (15 Yıl Önce)</td>
                                </tr>
                                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                                  <td style={{ padding: "12px 0", fontWeight: 700, color: "var(--gray-100)" }}>Orijinal Kaynak:</td>
                                  <td style={{ padding: "12px 0" }}>CGI Sanatçısı Ludovic Celle Portfolyosu (YouTube)</td>
                                </tr>
                                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                                  <td style={{ padding: "12px 0", fontWeight: 700, color: "var(--gray-100)" }}>Gerçek Durum:</td>
                                  <td style={{ padding: "12px 0", color: "var(--danger-400)", fontWeight: 700 }}>SAHTE / 3D ANIMASYON</td>
                                </tr>
                                <tr>
                                  <td style={{ padding: "12px 0", fontWeight: 700, color: "var(--gray-100)" }}>Analiz Özeti:</td>
                                  <td style={{ padding: "12px 0", lineHeight: 1.5 }}>
                                    Yapılan tersine görsel aramasında, videonun gerçekte Sibirya steplerinde değil, Fransız 3D animasyon sanatçısı <strong>Ludovic Celle</strong> tarafından 2011 yılında hazırlanmış deneysel bir CGI (Bilgisayar Üretimli İmgeleme) çalışması olduğu ortaya çıkmıştır. Video, yıllar boyunca dezenformasyon hesapları tarafından kitle çekmek amacıyla defalarca servis edilmiştir.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 style={{ fontSize: "1.2rem", color: "var(--gray-100)", marginBottom: "16px", fontWeight: 700 }}>🔍 Doğrulama Raporu: İzmir Tsunami İddiası</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "32px", flexWrap: "wrap" }}>
                          <div style={{ background: "rgba(0,0,0,0.05)", border: "var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem" }}>
                            🌊
                          </div>
                          <div>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", color: "var(--gray-300)" }}>
                              <tbody>
                                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                                  <td style={{ padding: "12px 0", fontWeight: 700, color: "var(--gray-100)", width: "180px" }}>İlk Paylaşım Tarihi:</td>
                                  <td style={{ padding: "12px 0" }}>11 Mart 2011</td>
                                </tr>
                                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                                  <td style={{ padding: "12px 0", fontWeight: 700, color: "var(--gray-100)" }}>Orijinal Kaynak:</td>
                                  <td style={{ padding: "12px 0" }}>Miyako Kenti Tsunami Felaketi Kaydı, Japonya</td>
                                </tr>
                                <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                                  <td style={{ padding: "12px 0", fontWeight: 700, color: "var(--gray-100)" }}>Gerçek Durum:</td>
                                  <td style={{ padding: "12px 0", color: "var(--danger-400)", fontWeight: 700 }}>BAĞLAMINDAN KOPARILMIŞ (RECYCLED)</td>
                                </tr>
                                <tr>
                                  <td style={{ padding: "12px 0", fontWeight: 700, color: "var(--gray-100)" }}>Analiz Özeti:</td>
                                  <td style={{ padding: "12px 0", lineHeight: 1.5 }}>
                                    Arama sonuçları, bu fotoğrafın İzmir depremiyle hiçbir ilgisi olmadığını kanıtlamaktadır. Görsel, 2011 yılındaki büyük Doğu Japonya depreminde <strong>Miyako şehrini</strong> vuran tsunaminin resmi arşividir. Deprem sonrası panik yaratmak amacıyla eski ve yıkıcı yabancı afet görselleri bağlamından koparılarak sosyal medyada yeniymiş gibi paylaşılmıştır.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ARAÇ 2: AI GÖRSEL DEDEKTÖRÜ */}
        {activeTool === "ai" && (
          <div className="glass-card animate-fade-in" style={{ padding: "40px" }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--gray-100)", marginBottom: "8px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Eye size={24} color="var(--primary-500)" /> Yapay Zeka (AI) Anomali Dedektörü
            </h2>
            <p style={{ color: "var(--gray-400)", fontSize: "0.9rem", marginBottom: "32px", lineHeight: 1.5 }}>
              Generative AI (Yapay Zeka) modelleri muhteşem görseller üretse de, bazı imza hatalar bırakırlar. Bir görselin yapay zekayla üretildiğini anlamak için <strong>ellerdeki parmak sayısına, arka plandaki bozuk metinlere ve fiziksel olarak uyumsuz yansımalara</strong> dikkat etmeliyiz.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", flexWrap: "wrap" }}>
              {/* ANALİZ EKRANI */}
              <div style={{ position: "relative", background: "rgba(255,255,255,0.7)", borderRadius: "var(--radius-lg)", border: "1px solid rgba(0,0,0,0.08)", overflow: "hidden", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--gray-500)", fontWeight: 700, marginBottom: "12px", display: "block" }}>🔎 İNCELEME PANELLERİNE TIKLAYARAK ANOMALİLERİ KEŞFEDİN</span>
                
                {/* Görsel Simülasyon Kutusu */}
                <div style={{ position: "relative", width: "100%", maxWidth: "450px", height: "300px", background: "linear-gradient(135deg, #1e1b4b 0%, #311042 100%)", border: "2px dashed rgba(255,255,255,0.15)", borderRadius: "var(--radius-md)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  
                  {/* Temsili Siyasetçi AI Görsel İllüstrasyonu */}
                  <span style={{ fontSize: "4.5rem", marginBottom: "16px" }}>🤝🤖</span>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1.5px" }}>Siyasetçi ve Robot Zirvesi Görseli</div>
                  
                  {/* HOTSPOT 1: Eller */}
                  <button
                    onClick={() => handleHotspotClick("hands")}
                    style={{
                      position: "absolute",
                      top: "100px",
                      left: "170px",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: foundHotspots.includes("hands") ? "rgba(34,197,94,0.6)" : "rgba(239,68,68,0.4)",
                      border: foundHotspots.includes("hands") ? "2px solid #22c55e" : "2px solid #ef4444",
                      color: "var(--gray-100)",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 10px rgba(239,68,68,0.5)",
                      transition: "var(--transition-fast)"
                    }}
                  >
                    🖐️
                  </button>

                  {/* HOTSPOT 2: Arka plan metni */}
                  <button
                    onClick={() => handleHotspotClick("text")}
                    style={{
                      position: "absolute",
                      top: "40px",
                      right: "60px",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: foundHotspots.includes("text") ? "rgba(34,197,94,0.6)" : "rgba(239,68,68,0.4)",
                      border: foundHotspots.includes("text") ? "2px solid #22c55e" : "2px solid #ef4444",
                      color: "var(--gray-100)",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 10px rgba(239,68,68,0.5)",
                      transition: "var(--transition-fast)"
                    }}
                  >
                    📝
                  </button>

                  {/* HOTSPOT 3: Yansıma / Gölgeler */}
                  <button
                    onClick={() => handleHotspotClick("shadow")}
                    style={{
                      position: "absolute",
                      bottom: "50px",
                      left: "110px",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: foundHotspots.includes("shadow") ? "rgba(34,197,94,0.6)" : "rgba(239,68,68,0.4)",
                      border: foundHotspots.includes("shadow") ? "2px solid #22c55e" : "2px solid #ef4444",
                      color: "var(--gray-100)",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 10px rgba(239,68,68,0.5)",
                      transition: "var(--transition-fast)"
                    }}
                  >
                    💡
                  </button>
                </div>
              </div>

              {/* TESPİT PANELİ */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontSize: "1.1rem", color: "var(--gray-100)", marginBottom: "16px", fontWeight: 700 }}>🔍 Anomali Analiz Raporu ({foundHotspots.length} / 3 Bulundu)</h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {/* Eller */}
                    <div style={{
                      background: foundHotspots.includes("hands") ? "rgba(34,197,94,0.05)" : "rgba(255,255,255,0.01)",
                      border: foundHotspots.includes("hands") ? "1px solid rgba(34,197,94,0.2)" : "var(--border-subtle)",
                      padding: "16px",
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px"
                    }}>
                      <span style={{ fontSize: "1.2rem" }}>{foundHotspots.includes("hands") ? "✅" : "❌"}</span>
                      <div>
                        <h4 style={{ fontSize: "0.92rem", color: "var(--gray-100)", fontWeight: 700 }}>Parmak Sayısı & Eklem Anomalisi (Eller)</h4>
                        <p style={{ fontSize: "0.8rem", color: "var(--gray-400)", marginTop: "4px", lineHeight: 1.4 }}>
                          {foundHotspots.includes("hands")
                            ? "Harika! Siyasetçinin sağ elinde 6 parmak olduğunu yakaladınız. Yapay zeka henüz el anatomilerini kusursuz üretmekte zorlanıyor."
                            : "Siyasetçinin robotla tokalaşan ellerini büyüteçle inceleyin."}
                        </p>
                      </div>
                    </div>

                    {/* Arka plan metni */}
                    <div style={{
                      background: foundHotspots.includes("text") ? "rgba(34,197,94,0.05)" : "rgba(255,255,255,0.01)",
                      border: foundHotspots.includes("text") ? "1px solid rgba(34,197,94,0.2)" : "var(--border-subtle)",
                      padding: "16px",
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px"
                    }}>
                      <span style={{ fontSize: "1.2rem" }}>{foundHotspots.includes("text") ? "✅" : "❌"}</span>
                      <div>
                        <h4 style={{ fontSize: "0.92rem", color: "var(--gray-100)", fontWeight: 700 }}>Bozuk Metin & Harf Deformasyonu (Arka Plan)</h4>
                        <p style={{ fontSize: "0.8rem", color: "var(--gray-400)", marginTop: "4px", lineHeight: 1.4 }}>
                          {foundHotspots.includes("text")
                            ? "Doğru! Arka plandaki afişte anlamsız, yamulmuş semboller ve yapay kelimeler (gibberish) var. AI modelleri düzgün harf basamaz."
                            : "Arka plandaki mavi reklam panosunu inceleyin."}
                        </p>
                      </div>
                    </div>

                    {/* Işık ve gölgeler */}
                    <div style={{
                      background: foundHotspots.includes("shadow") ? "rgba(34,197,94,0.05)" : "rgba(255,255,255,0.01)",
                      border: foundHotspots.includes("shadow") ? "1px solid rgba(34,197,94,0.2)" : "var(--border-subtle)",
                      padding: "16px",
                      borderRadius: "var(--radius-md)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px"
                    }}>
                      <span style={{ fontSize: "1.2rem" }}>{foundHotspots.includes("shadow") ? "✅" : "❌"}</span>
                      <div>
                        <h4 style={{ fontSize: "0.92rem", color: "var(--gray-100)", fontWeight: 700 }}>Gölgeler ve Uyumsuz Fizik (Yansımalar)</h4>
                        <p style={{ fontSize: "0.8rem", color: "var(--gray-400)", marginTop: "4px", lineHeight: 1.4 }}>
                          {foundHotspots.includes("shadow")
                            ? "Mükemmel tespit! Yerdeki yansımalar ve gölgeler, ortamdaki ışık açılarıyla tamamen uyumsuz ve kesik duruyor."
                            : "Karakterlerin yerdeki gölgelerini inceleyin."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SONUÇ PANELLERİ */}
                {aiAnalysisDone ? (
                  <div className="animate-fade-in" style={{ background: "var(--gradient-primary)", padding: "20px", borderRadius: "var(--radius-md)", marginTop: "24px", color: "var(--gray-100)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>🤖 GÖRSEL AI TARAFINDAN ÜRETİLMİŞTİR!</div>
                        <div style={{ fontSize: "0.82rem", opacity: 0.9, marginTop: "2px" }}>Yapay Zeka Eşleşme Oranı: %98.4 (Midjourney v6 Signature)</div>
                      </div>
                      <span style={{ fontSize: "1.3rem" }}>🎉 +50 XP</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ background: "rgba(0,0,0,0.05)", border: "var(--border-subtle)", padding: "16px", borderRadius: "var(--radius-md)", textAlign: "center", fontSize: "0.82rem", color: "var(--gray-500)", marginTop: "24px" }}>
                    🔒 Tüm anomalileri bularak yapay zeka analiz raporunu deşifre edin.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ARAÇ 3: METADATA (EXIF) OKUYUCU */}
        {activeTool === "exif" && (
          <div className="glass-card animate-fade-in" style={{ padding: "40px" }}>
            <h2 style={{ fontSize: "1.4rem", color: "var(--gray-100)", marginBottom: "8px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <FileDigit size={24} color="var(--primary-500)" /> Metadata (EXIF) Bilgi Çözücü
            </h2>
            <p style={{ color: "var(--gray-400)", fontSize: "0.9rem", marginBottom: "32px", lineHeight: 1.5 }}>
              Fotoğraflar çekildiğinde içlerine gizli veriler kaydedilir. <strong>Kameranın modeli, çekim saati, hatta fotoğrafın çekildiği yerin GPS koordinatları</strong> bu dosya bilgisinde saklanır. Dezenformasyoncular eski veya başka ülkelere ait fotoğrafları ısıtıp sunduğunda, metadata onları anında ele verir!
            </p>

            {!exifFileLoaded ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed rgba(255,255,255,0.1)", borderRadius: "var(--radius-lg)", padding: "60px", background: "rgba(0,0,0,0.15)", textAlign: "center" }}>
                <span style={{ fontSize: "3.5rem", marginBottom: "20px" }}>📥</span>
                <h3 style={{ fontSize: "1.2rem", color: "var(--gray-100)", fontWeight: 700, marginBottom: "8px" }}>
                  Şüpheli Fotoğrafı Sürükleyin veya Seçin
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-500)", marginBottom: "24px", maxWidth: "450px" }}>
                  Ankara&apos;daki dünkü protestodan çekildiği iddia edilen ve sosyal medyada hızla yayılan <strong>&ldquo;protesto-ankara.jpg&rdquo;</strong> dosyasını yükleyin.
                </p>
                <button onClick={() => setExifFileLoaded(true)} className="btn btn-primary">
                  Dosyayı Seç: protesto-ankara.jpg 📁
                </button>
              </div>
            ) : (
              <div className="animate-fade-in">
                {exifAnalyzing ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ fontSize: "2rem", animation: "pulse-glow 1.5s infinite", marginBottom: "16px" }}>⚡</div>
                    <h3 style={{ color: "var(--gray-100)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>EXIF Bilgi Blokları Okunuyor...</h3>
                    <p style={{ color: "var(--gray-500)", fontSize: "0.85rem" }}>Kamera sensör verileri ve GPS koordinat paketleri ayrıştırılıyor.</p>
                  </div>
                ) : exifCompleted ? (
                  <div>
                    {/* BAŞARI BİLGİSİ */}
                    <div style={{
                      background: "rgba(34, 197, 94, 0.08)",
                      border: "1px solid rgba(34, 197, 94, 0.2)",
                      padding: "16px 20px",
                      borderRadius: "var(--radius-md)",
                      color: "var(--success-400)",
                      fontWeight: 600,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "32px"
                    }}>
                      <span>🎉 EXIF Verileri Başarıyla Çözüldü! Gerçek ortaya çıktı. (+40 XP)</span>
                      <button onClick={() => { setExifFileLoaded(false); setExifCompleted(false); }} className="btn btn-sm btn-outline" style={{ color: "var(--success-400)", borderColor: "rgba(34,197,94,0.3)" }}>
                        Başka Dosya Yükle
                      </button>
                    </div>

                    {/* EXIF HUD */}
                    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", flexWrap: "wrap" }}>
                      {/* TERMINAL BİLGİ HUD */}
                      <div style={{
                        background: "#0c0a0f",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                        borderRadius: "var(--radius-md)",
                        padding: "24px",
                        fontFamily: "monospace",
                        color: "#c084fc",
                        boxShadow: "0 0 20px rgba(139, 92, 246, 0.05)"
                      }}>
                        <div style={{ color: "var(--gray-500)", marginBottom: "12px", borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: "6px" }}>
                          $ exiftool protesto-ankara.jpg
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <span style={{ color: "var(--gray-400)" }}>File Name:</span>
                          <span>protesto-ankara.jpg</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <span style={{ color: "var(--gray-400)" }}>Camera Maker:</span>
                          <span>Canon</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <span style={{ color: "var(--gray-400)" }}>Camera Model:</span>
                          <span>Canon EOS 5D Mark III</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", background: "rgba(239, 68, 68, 0.1)", padding: "2px 6px", borderRadius: "3px" }}>
                          <span style={{ color: "#f87171" }}>Date/Time Original:</span>
                          <span style={{ color: "#ef4444", fontWeight: "bold" }}>2016:10:14 15:42:08</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", background: "rgba(239, 68, 68, 0.1)", padding: "2px 6px", borderRadius: "3px" }}>
                          <span style={{ color: "#f87171" }}>GPS Location:</span>
                          <span style={{ color: "#ef4444", fontWeight: "bold" }}>48.8566 N, 2.3522 E (Paris, France)</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                          <span style={{ color: "var(--gray-400)" }}>Software Used:</span>
                          <span>Adobe Photoshop CC</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "var(--gray-400)" }}>Resolution:</span>
                          <span>3840 x 2560</span>
                        </div>
                      </div>

                      {/* AÇIKLAMA PANELİ */}
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <h3 style={{ fontSize: "1.2rem", color: "var(--gray-100)", marginBottom: "12px", fontWeight: 700 }}>
                          🚨 BULGU: 10 Yıllık Fransız Fotoğrafı!
                        </h3>
                        <p style={{ color: "var(--gray-300)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "20px" }}>
                          Çözülen metadata raporu, dezenformasyonu saniyeler içinde kanıtlamaktadır:
                        </p>
                        <ul style={{ color: "var(--gray-400)", fontSize: "0.85rem", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", lineHeight: 1.5 }}>
                          <li>
                            <strong style={{ color: "var(--gray-100)" }}>Zaman Sahtekarlığı:</strong> Görsel iddia edildiği gibi &ldquo;dün&rdquo; değil, tam olarak <strong>14 Ekim 2016</strong> tarihinde çekilmiştir.
                          </li>
                          <li>
                            <strong style={{ color: "var(--gray-100)" }}>Konum Sahtekarlığı:</strong> Koordinatlar incelendiğinde fotoğrafın Ankara&apos;da değil, <strong>Fransa&apos;nın Paris şehrinde</strong> kaydedildiği ortaya çıkmıştır.
                          </li>
                          <li>
                            <strong style={{ color: "var(--gray-100)" }}>Manipülasyon:</strong> Dosyanın daha önce <strong>Adobe Photoshop</strong> yazılımı üzerinden geçirilerek kaydedildiği saptanmıştır.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid var(--primary-500)", borderRadius: "var(--radius-lg)", padding: "40px", background: "rgba(59, 130, 246, 0.03)", textAlign: "center" }}>
                    <span style={{ fontSize: "2rem", marginBottom: "12px" }}>📄</span>
                    <h3 style={{ color: "var(--gray-100)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "6px" }}>protesto-ankara.jpg Yüklendi!</h3>
                    <p style={{ color: "var(--gray-400)", fontSize: "0.85rem", marginBottom: "24px" }}>
                      Analiz edilmeye hazır dosya boyutu: 1.8 MB
                    </p>
                    <button onClick={triggerExifAnalysis} className="btn btn-primary" style={{ width: "240px" }}>
                      EXIF Verisini Ayrıştır 🛠️
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
