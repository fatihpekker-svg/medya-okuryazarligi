"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProgress, LevelType } from "@/context/ProgressContext";
import { Shield, AlertTriangle, Sprout, Search, GraduationCap } from "lucide-react";

export default function SeviyeSecPage() {
  const router = useRouter();
  const { state, loaded, selectLevel, setUserName } = useProgress();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (loaded && state.userName && state.userName !== "Misafir Okur") {
      setName(state.userName);
    }
  }, [loaded, state.userName]);

  const handleSelectLevel = (level: LevelType) => {
    if (!name.trim()) {
      setError("Lütfen devam etmeden önce adınızı girin.");
      return;
    }
    setUserName(name.trim());
    selectLevel(level);
    router.push("/dashboard");
  };

  return (
    <div className="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div className="hero-bg">
        <div className="hero-bg-orb hero-bg-orb-1" />
        <div className="hero-bg-orb hero-bg-orb-2" />
        <div className="hero-grid" />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "1000px" }}>
        <div className="section-header" style={{ marginBottom: "40px" }}>
          <span className="section-badge" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Shield size={16} /> MedyaOkur Yolculuğu</span>
          <h1 className="section-title">Eğitim Seviyenizi Seçin</h1>
          <p className="section-desc" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Profilinizi oluşturun ve yaş grubunuza göre özel olarak hazırlanmış interaktif derslere ve vaka analizlerine başlayın.
          </p>
        </div>

        {/* Name Input Card */}
        <div className="glass-card" style={{ maxWidth: "500px", margin: "0 auto 40px", padding: "24px", textAlign: "center" }}>
          <label htmlFor="name-input" style={{ display: "block", fontSize: "1rem", fontWeight: 600, color: "var(--gray-100)", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
            Adınız ve Soyadınız (Sertifika için gereklidir)
          </label>
          <input
            id="name-input"
            type="text"
            placeholder="Örn. Ahmet Yılmaz"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.trim()) setError("");
            }}
            style={{
              width: "100%",
              padding: "12px 20px",
              borderRadius: "var(--radius-full)",
              border: "1px solid rgba(0,0,0,0.08)",
              background: "rgba(0,0,0,0.05)",
              color: "var(--gray-100)",
              fontSize: "1rem",
              outline: "none",
              transition: "var(--transition-fast)",
              textAlign: "center",
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--primary-500)"}
            onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"}
          />
          {error && (
            <p style={{ color: "var(--danger-400)", fontSize: "0.85rem", marginTop: "8px", fontWeight: 500 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><AlertTriangle size={14} /> {error}</div>
            </p>
          )}
        </div>

        {/* Levels Grid */}
        <div className="levels-grid" style={{ marginTop: "20px" }}>
          {/* İlkokul */}
          <div
            className="level-card level-primary"
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectLevel("primary")}
          >
            <div className="level-card-icon" style={{ display: "flex", justifyContent: "center" }}><Sprout size={48} color="#ffffff" /></div>
            <h3 className="level-card-title">İlkokul</h3>
            <p className="level-card-age">7 – 10 yaş</p>
            <p className="level-card-desc">
              Oyun tabanlı, karakter odaklı ve eğlenceli içeriklerle medya dünyasını keşfet.
            </p>
            <ul className="level-card-features">
              <li>Medya Dedektifi maskotu</li>
              <li>10-15 dk eğlenceli dersler</li>
              <li>Ödül ve rozet sistemi</li>
              <li>Karakter hikayeleri</li>
            </ul>
            <button className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
              Başla <Sprout size={16} />
            </button>
          </div>

          {/* Ortaöğretim */}
          <div
            className="level-card level-secondary"
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectLevel("secondary")}
          >
            <div className="level-card-icon" style={{ display: "flex", justifyContent: "center" }}><Search size={48} color="#ffffff" /></div>
            <h3 className="level-card-title">Ortaöğretim</h3>
            <p className="level-card-age">11 – 17 yaş</p>
            <p className="level-card-desc">
              Gerçek vakalar, sosyal medya simülasyonları ve takım görevleriyle eleştirel düşünme.
            </p>
            <ul className="level-card-features">
              <li>Gerçek vaka analizleri</li>
              <li>Sosyal medya simülasyonu</li>
              <li>Meydan okumalar (Challenges)</li>
              <li>MEB müfredat uyumlu</li>
            </ul>
            <button className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
              Başla <Search size={16} />
            </button>
          </div>

          {/* Yetişkin */}
          <div
            className="level-card level-tertiary"
            style={{ cursor: "pointer" }}
            onClick={() => handleSelectLevel("tertiary")}
          >
            <div className="level-card-icon" style={{ display: "flex", justifyContent: "center" }}><GraduationCap size={48} color="#ffffff" /></div>
            <h3 className="level-card-title">Yetişkin</h3>
            <p className="level-card-age">18+ yaş</p>
            <p className="level-card-desc">
              Profesyonel, veri odaklı ve sertifika hedefli kapsamlı eğitim programı.
            </p>
            <ul className="level-card-features">
              <li>Resmi Sertifika programı</li>
              <li>Veri analizi atölyeleri</li>
              <li>Veli ve öğretmen rehberi</li>
              <li>Gelişmiş doğrulama araçları</li>
            </ul>
            <button className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
              Başla <GraduationCap size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
