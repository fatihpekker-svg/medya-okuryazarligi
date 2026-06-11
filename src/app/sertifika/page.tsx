"use client";

import { useProgress } from "@/context/ProgressContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Lock, Shield, Award, Sparkles, Printer, Copy, CheckCircle2, ChevronLeft, Download } from "lucide-react";

export default function CertificatePage() {
  const router = useRouter();
  const { state, loaded } = useProgress();
  const [certCode, setCertCode] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [isDigitalTheme, setIsDigitalTheme] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Mouse coordinates for holographic reflective gold foil effect
  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded) return;

    // Tarih ve benzersiz sertifika doğrulama kodu oluştur
    setCurrentDate(new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" }));
    
    // İsme göre deterministik veya benzersiz kod üret
    const hash = state.userName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setCertCode(`MO-2026-${hash}-${randomSuffix}`);
  }, [loaded, state.userName]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 50, y: 50 });
  };

  const handlePrint = () => {
    window.print();
  };

  const simulateDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Sertifikanız PDF formatında hazırlanıyor. Yazdır menüsünden 'PDF olarak kaydet' seçeneği ile en yüksek çözünürlükte kaydedebilirsiniz.");
      window.print();
    }, 1500);
  };

  const copyVerificationCode = () => {
    navigator.clipboard.writeText(certCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--gray-950)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--primary-400)", fontSize: "1.2rem", fontWeight: 600 }}>Yükleniyor...</div>
      </div>
    );
  }

  const completedCount = state.completedQuizzes.length;
  const isUnlocked = completedCount >= 10;
  
  const levelTitles = {
    primary: "Medya Dedektifi (İlkokul Düzeyi)",
    secondary: "Medya Analisti (Ortaöğretim Düzeyi)",
    tertiary: "Medya Uzmanı (Yetişkin Düzeyi)",
    "": "Medya Okuryazarı"
  };

  return (
    <div className="certificate-page-wrapper" style={{ minHeight: "100vh", background: "var(--gray-950)", padding: "40px 20px 100px", position: "relative", overflow: "hidden" }}>
      {/* Dynamic Background Orbs */}
      <div style={{
        position: "absolute",
        top: "-10%",
        left: "-10%",
        width: "50vw",
        height: "50vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0
      }} />
      <div style={{
        position: "absolute",
        bottom: "-10%",
        right: "-10%",
        width: "50vw",
        height: "50vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body, .certificate-page-wrapper {
            background: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .certificate-container {
            border: 15px double #c5a880 !important;
            background: #fdfbf7 !important;
            box-shadow: none !important;
            transform: none !important;
            margin: 0 auto !important;
            page-break-inside: avoid;
            color: #2c3e50 !important;
          }
          .classic-text-dark {
            color: #1a252f !important;
          }
          .classic-text-muted {
            color: #7f8c8d !important;
          }
        }
      `}</style>

      {/* ===== ACTIONS HEADER (HIDDEN IN PRINT) ===== */}
      <div className="no-print container" style={{ maxWidth: "1000px", position: "relative", zIndex: 10, marginBottom: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <Link href="/dashboard" className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,0,0,0.05)" }}>
            <ChevronLeft size={16} /> Kontrol Paneli
          </Link>
          
          {isUnlocked && (
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => setIsDigitalTheme(!isDigitalTheme)}
                className="btn btn-outline"
                style={{
                  borderColor: "rgba(212,175,55,0.3)",
                  color: "#d4af37",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(212,175,55,0.05)"
                }}
              >
                {isDigitalTheme ? <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Award size={16} /> Klasik Baskı Görünümü</div> : <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Sparkles size={16} /> Dijital Hologram Görünümü</div>}
              </button>

              <button
                onClick={simulateDownload}
                disabled={downloading}
                className="btn btn-primary"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #aa7c11)",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(212, 175, 55, 0.25)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                {downloading ? <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Printer size={16} /> Hazırlanıyor...</div> : <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Download size={16} /> İndir / Yazdır (PDF)</div>}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container" style={{ maxWidth: "1000px", position: "relative", zIndex: 5 }}>
        
        {/* ========================================================= */}
        {/* CASE A: SERTİFİKA KİLİTLİ (Eğitim Tamamlanmadı)             */}
        {/* ========================================================= */}
        {!isUnlocked && (
          <div className="glass-card animate-fade-in-up" style={{ padding: "50px", textAlign: "center", maxWidth: "720px", margin: "0 auto", border: "1px dashed rgba(139, 92, 246, 0.3)" }}>
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "rgba(139,92,246,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "3.5rem",
              margin: "0 auto 24px",
              boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)"
            }}>
              <Lock size={80} color="var(--primary-500)" />
            </div>
            
            <span className="section-badge" style={{ background: "rgba(239, 68, 68, 0.15)", color: "var(--danger-400)", border: "1px solid rgba(239,68,68,0.3)" }}>
              Sertifika Kilitli
            </span>
            
            <h1 style={{ fontSize: "2rem", color: "var(--gray-100)", fontWeight: 800, marginTop: "16px", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
              Resmi Sertifikanız Henüz Hazır Değil!
            </h1>
            
            <p style={{ color: "var(--gray-400)", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "540px", margin: "0 auto 32px" }}>
              MedyaOkur ve RTÜK onaylı, dijital ve basılabilir altın mühürlü sertifikanızı kazanabilmek için eğitim müfredatındaki <strong>10 modülün tamamını</strong> ve sınavlarını başarıyla bitirmelisiniz.
            </p>

            {/* İlerleme Çubuğu */}
            <div style={{ background: "rgba(0,0,0,0.05)", border: "var(--border-subtle)", padding: "24px", borderRadius: "var(--radius-md)", marginBottom: "32px", textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "8px", fontWeight: 600 }}>
                <span style={{ color: "var(--gray-300)" }}>Eğitim İlerleme Durumu</span>
                <span style={{ color: "var(--primary-400)" }}>{completedCount} / 10 Modül</span>
              </div>
              <div style={{ height: "8px", width: "100%", background: "var(--gray-800)", borderRadius: "var(--radius-full)", overflow: "hidden", marginBottom: "16px" }}>
                <div style={{ height: "100%", width: `${completedCount * 10}%`, background: "var(--gradient-primary)", borderRadius: "var(--radius-full)" }} />
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--gray-500)", display: "block" }}>
                💡 Kalan {10 - completedCount} modülün sınavlarını başarıyla tamamladığınızda, adınıza özel tescilli sertifika kodunuz anında üretilecektir.
              </span>
            </div>

            <Link href="/dashboard" className="btn btn-primary btn-lg" style={{ background: "var(--gradient-primary)", padding: "14px 32px" }}>
              Eğitime Devam Et <ChevronLeft size={16} />
            </Link>
          </div>
        )}

        {/* ========================================================= */}
        {/* CASE B: SERTİFİKA AÇIK (Eğitim Tamamlandı)               */}
        {/* ========================================================= */}
        {isUnlocked && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>
            
            {/* 1. SEÇENEK: YÜKSEK KALİTE DİJİTAL HOLOGRAM TEMASI */}
            {isDigitalTheme ? (
              <div className="no-print animate-fade-in">
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "900px",
                    margin: "0 auto",
                    aspectRatio: "1.58 / 1", // Standard landscape certificate aspect ratio
                    background: "#0b0c16",
                    borderRadius: "16px",
                    border: "2px solid rgba(212, 175, 55, 0.4)",
                    padding: "6% 8%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    color: "var(--gray-100)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.8), 0 0 50px rgba(212,175,55,0.05)",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
                  }}
                >
                  {/* Holographic metallic glare overlay */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at ${coords.x}% ${coords.y}%, rgba(212, 175, 55, 0.15) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 80%)`,
                    pointerEvents: "none",
                    zIndex: 1
                  }} />

                  {/* Corner gold vector brackets */}
                  <div style={{ position: "absolute", top: "20px", left: "20px", width: "40px", height: "40px", borderTop: "3px solid #d4af37", borderLeft: "3px solid #d4af37", borderRadius: "4px 0 0 0" }} />
                  <div style={{ position: "absolute", top: "20px", right: "20px", width: "40px", height: "40px", borderTop: "3px solid #d4af37", borderRight: "3px solid #d4af37", borderRadius: "0 4px 0 0" }} />
                  <div style={{ position: "absolute", bottom: "20px", left: "20px", width: "40px", height: "40px", borderBottom: "3px solid #d4af37", borderLeft: "3px solid #d4af37", borderRadius: "0 0 0 4px" }} />
                  <div style={{ position: "absolute", bottom: "20px", right: "20px", width: "40px", height: "40px", borderBottom: "3px solid #d4af37", borderRight: "3px solid #d4af37", borderRadius: "0 0 4px 0" }} />

                  {/* Header Logo */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 2 }}>
                    <div>
                      <span style={{ display: 'flex', justifyContent: 'center' }}><Shield size={32} color="#d4af37" /></span>
                      <h4 style={{ fontSize: "0.7rem", color: "var(--gray-400)", letterSpacing: "2.5px", textTransform: "uppercase", marginTop: "4px" }}>
                        MEDYAOKUR AKADEMİSİ
                      </h4>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "0.6rem", border: "1px solid rgba(212,175,55,0.4)", color: "#d4af37", padding: "4px 8px", borderRadius: "var(--radius-sm)", fontWeight: 700 }}>
                        T.C. RTÜK PROJE ORTAĞI
                      </span>
                    </div>
                  </div>

                  {/* Mid Title & User Name */}
                  <div style={{ textAlign: "center", margin: "auto 0", zIndex: 2 }}>
                    <h5 style={{ fontSize: "0.8rem", color: "#d4af37", letterSpacing: "4px", textTransform: "uppercase", fontWeight: 600 }}>
                      BAŞARI SERTİFİKASI
                    </h5>
                    <h1 style={{ fontSize: "2.8vw", fontWeight: 900, background: "linear-gradient(135deg, #fff 30%, #d4af37 80%, #aa7c11 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "10px 0" }}>
                      {state.userName}
                    </h1>
                    <p style={{ color: "var(--gray-400)", fontSize: "0.9vw", maxWidth: "600px", margin: "0 auto", lineHeight: 1.5 }}>
                      Güvenilir bilgi analizi, dezenformasyon teşhisi ve RTÜK denetim atölyeleri dahil olmak üzere 10 temel eğitim modülünü üstün başarıyla tamamlayarak bu sertifikayı almaya hak kazanmıştır.
                    </p>
                  </div>

                  {/* Footer Stats & Stamp */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", zIndex: 2 }}>
                    <div style={{ fontSize: "0.7rem", color: "var(--gray-500)" }}>
                      <div>UNVAN: <strong style={{ color: "var(--gray-100)" }}>{levelTitles[state.level]}</strong></div>
                      <div style={{ marginTop: "2px" }}>DOĞRULAMA KODU: <strong style={{ color: "#d4af37" }}>{certCode}</strong></div>
                    </div>

                    {/* Holographic Seal */}
                    <div style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.05) 80%)",
                      border: "2px solid #d4af37",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#d4af37",
                      fontWeight: 800,
                      fontSize: "0.55rem",
                      textAlign: "center",
                      boxShadow: "0 0 15px rgba(212,175,55,0.2)"
                    }}>
                      RESMİ<br />ONAYLI
                    </div>

                    <div style={{ fontSize: "0.7rem", color: "var(--gray-500)", textAlign: "right" }}>
                      <div>TARİH: <strong style={{ color: "var(--gray-100)" }}>{currentDate}</strong></div>
                      <div style={{ marginTop: "2px" }}>SKOR: <strong style={{ color: "var(--gray-100)" }}>10/10 MODÜL</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* 2. SEÇENEK: RESMİ IVORY KLASİK BASKI TEMASI (YAZDIRILABİLİR - HER İKİ GÖRÜNÜMDE DE YAZICIDA BU BASILIR) */}
            <div className={isDigitalTheme ? "no-print" : "animate-fade-in"}>
              <div
                className="certificate-container"
                style={{
                  maxWidth: "900px",
                  margin: "0 auto",
                  background: "#fdfbf7",
                  color: "#2c3e50",
                  border: "20px double #c5a880",
                  borderRadius: "4px",
                  padding: "50px 45px",
                  textAlign: "center",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                  position: "relative",
                  fontFamily: "Georgia, serif"
                }}
              >
                {/* Decorative brackets */}
                <div style={{ position: "absolute", top: "15px", left: "15px", fontSize: "1.5rem", color: "#c5a880" }}>✦</div>
                <div style={{ position: "absolute", top: "15px", right: "15px", fontSize: "1.5rem", color: "#c5a880" }}>✦</div>
                <div style={{ position: "absolute", bottom: "15px", left: "15px", fontSize: "1.5rem", color: "#c5a880" }}>✦</div>
                <div style={{ position: "absolute", bottom: "15px", right: "15px", fontSize: "1.5rem", color: "#c5a880" }}>✦</div>

                {/* Certificate Header */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "8px" }}><Shield size={48} color="#c5a880" /></div>
                  <h4 className="classic-text-muted" style={{ fontSize: "0.8rem", letterSpacing: "0.2em", color: "#7f8c8d", fontWeight: 700, textTransform: "uppercase", marginBottom: "12px", fontFamily: "var(--font-body)" }}>
                    TÜRKİYE CUMHURİYETİ MEDYA OKURYAZARLIĞI AKADEMİSİ
                  </h4>
                  <div style={{ width: "80px", height: "2px", background: "#c5a880", margin: "0 auto 16px" }} />
                  <h1 className="classic-text-dark" style={{ fontSize: "2.1rem", fontWeight: 800, color: "#1a252f", letterSpacing: "0.05em", lineHeight: 1.2 }}>
                    MEDYA OKURYAZARLIĞI EĞİTİM SERTİFİKASI
                  </h1>
                </div>

                {/* Certificate Body */}
                <div style={{ marginBottom: "32px" }}>
                  <p className="classic-text-muted" style={{ fontStyle: "italic", fontSize: "1rem", color: "#555", marginBottom: "20px" }}>
                    Bu belge, dezenformasyon ve bilgi kirliliğine karşı eleştirel düşünme, bilimsel teyit ve etik içerik üretimi programını başarıyla tamamlayan:
                  </p>

                  <h2 style={{ fontSize: "2.4rem", fontWeight: 900, color: "#a87f32", borderBottom: "2px solid #e2d1b9", display: "inline-block", paddingBottom: "6px", marginBottom: "20px", minWidth: "300px" }}>
                    {state.userName}
                  </h2>

                  <p className="classic-text-dark" style={{ fontSize: "1.05rem", color: "#2c3e50", fontWeight: 600, marginBottom: "8px" }}>
                    tarafından hak edilmiştir.
                  </p>
                  <p className="classic-text-muted" style={{ fontSize: "0.9rem", color: "#7f8c8d" }}>
                    Kullanıcı, 10 modüllük kapsamlı eğitim programının ve interaktif vaka analizlerinin tamamını başarıyla bitirerek
                  </p>
                  <p className="classic-text-dark" style={{ fontSize: "1.1rem", color: "#1a252f", fontWeight: 700, marginTop: "6px" }}>
                    &ldquo; {levelTitles[state.level]} &rdquo;
                  </p>
                  <p className="classic-text-muted" style={{ fontSize: "0.9rem", color: "#7f8c8d" }}>
                    unvanını almaya hak kazanmıştır.
                  </p>
                </div>

                {/* Signatures & Seal */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", alignItems: "flex-end", marginTop: "32px" }}>
                  {/* Left Sign */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ borderBottom: "1px solid #bdc3c7", paddingBottom: "8px", width: "160px", margin: "0 auto 8px" }}>
                      <span style={{ fontFamily: "monospace", color: "#95a5a6", fontSize: "0.8rem" }}>RTÜK_Koord_E-imza</span>
                    </div>
                    <div className="classic-text-dark" style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2c3e50" }}>Radyo ve Televizyon Üst Kurulu</div>
                    <div className="classic-text-muted" style={{ fontSize: "0.7rem", color: "#7f8c8d" }}>Medya Okuryazarlığı Koordinatörlüğü</div>
                  </div>

                  {/* Golden Seal */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, #fcd856 0%, #d4af37 70%, #aa7c11 100%)",
                        border: "4px double #fff",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--gray-100)",
                        fontWeight: 800,
                        fontSize: "0.7rem",
                        textAlign: "center",
                        lineHeight: 1.1,
                        transform: "rotate(-10deg)",
                      }}
                    >
                      RESMİ<br />ONAYLI<br /><div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}><Award size={12} color="#c5a880" /></div>
                    </div>
                  </div>

                  {/* Right Sign */}
                  <div style={{ textAlign: "center" }}>
                    <div style={{ borderBottom: "1px solid #bdc3c7", paddingBottom: "8px", width: "160px", margin: "0 auto 8px" }}>
                      <span style={{ fontFamily: "monospace", color: "#95a5a6", fontSize: "0.8rem" }}>MedyaOkur_E-imza</span>
                    </div>
                    <div className="classic-text-dark" style={{ fontSize: "0.78rem", fontWeight: 700, color: "#2c3e50" }}>MedyaOkur Platformu</div>
                    <div className="classic-text-muted" style={{ fontSize: "0.7rem", color: "#7f8c8d" }}>Eğitim Direktörlüğü</div>
                  </div>
                </div>

                {/* Certificate Footer info */}
                <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between", borderTop: "1px solid #e2d1b9", paddingTop: "12px", fontSize: "0.75rem", color: "#95a5a6", fontFamily: "var(--font-body)" }}>
                  <span>Tarih: <strong>{currentDate}</strong></span>
                  <span>Doğrulama Kodu: <strong style={{ color: "#7f8c8d" }}>{certCode}</strong></span>
                </div>
              </div>
            </div>

            {/* Public verification suite (Hidden in print) */}
            <div className="no-print glass-card" style={{ padding: "30px", maxWidth: "900px", margin: "0 auto", borderLeft: "4px solid #d4af37" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
                <div>
                  <h3 style={{ color: "var(--gray-100)", fontSize: "1.1rem", fontWeight: 700, marginBottom: "4px" }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Shield size={16} /> Resmi Sertifika Doğrulama Sistemi</div>
                  </h3>
                  <p style={{ color: "var(--gray-400)", fontSize: "0.85rem", lineHeight: 1.4 }}>
                    Sertifikanız ulusal güvenlik protokollerine uygun şekilde tescillenmiştir. Doğrulama kodunu kopyalayarak özgeçmişinize (LinkedIn) veya kurumlara ibraz edebilirsiniz.
                  </p>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.7)", padding: "12px 18px", borderRadius: "var(--radius-md)", border: "var(--border-subtle)" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "0.95rem", color: "#d4af37", fontWeight: "bold" }}>
                    {certCode}
                  </div>
                  <button
                    onClick={copyVerificationCode}
                    className="btn btn-sm btn-outline"
                    style={{
                      padding: "6px 12px",
                      borderColor: copied ? "#22c55e" : "rgba(255,255,255,0.15)",
                      color: copied ? "#22c55e" : "white",
                    }}
                  >
                    {copied ? "Kopyalandı! ✓" : "Kopyala 📋"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
