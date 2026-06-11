"use client";

import { useProgress } from "@/context/ProgressContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Lesson {
  id: string; // e.g. "1-1"
  title: string;
  desc: string;
}

const moduleLessons: Record<number, Lesson[]> = {
  1: [
    { id: "1-1", title: "Medya Nedir ve Türleri Nelerdir?", desc: "Geleneksel, dijital ve sosyal medyanın temel özellikleri ve hayatımızdaki yeri." },
    { id: "1-2", title: "Medyanın Toplumsal Rolü", desc: "Medya bizi nasıl etkiler, toplumsal bilinci nasıl şekillendirir?" },
    { id: "1-3", title: "Medya Tüketim Alışkanlıklarımız", desc: "Günde kaç saat medya tüketiyoruz? Alışkanlıklarımızı analiz edelim." },
  ],
  2: [
    { id: "2-1", title: "Güvenilir Bilgi ve Haber Nedir?", desc: "Doğru bilgi ile uydurma haber arasındaki farkları anlamak." },
    { id: "2-2", title: "5N1K Haber Analiz Tekniği", desc: "Ne, Nerede, Ne Zaman, Nasıl, Neden, Kim sorularıyla haber inceleme." },
    { id: "2-3", title: "Çapraz Kaynak Kontrolü", desc: "Tek bir habere inanmadan önce farklı kaynaklardan doğrulama yapma." },
  ],
  3: [
    { id: "3-1", title: "Dezenformasyon ve Misinformasyon", desc: "Yalan haberlerin yayılma biçimleri ve aralarındaki farklar." },
    { id: "3-2", title: "Bot ve Trol Hesapları Tanımak", desc: "Sosyal medyada yapay gündem oluşturan sahte hesapları ayırt etme." },
    { id: "3-3", title: "Deepfake ve AI Manipülasyonları", desc: "Ses ve video taklit teknolojileriyle yapılan manipülasyonlar." },
  ],
  4: [
    { id: "4-1", title: "Sosyal Medya Algoritmaları", desc: "Ekran başında kalmamızı sağlayan algoritmaların arka planı." },
    { id: "4-2", title: "Filtre Balonları ve Yankı Odaları", desc: "Farklı görüşleri duymamızı engelleyen dijital filtreler." },
    { id: "4-3", title: "Dijital Ayak İzi ve Gizlilik", desc: "İnternette bıraktığımız izler ve kişisel verilerimizin güvenliği." },
  ],
  5: [
    { id: "5-1", title: "Görsel Manipülasyonlar", desc: "Fotoğrafların kırpılarak veya montajlanarak bağlamından koparılması." },
    { id: "5-2", title: "Tersine Görsel Arama", desc: "Bir fotoğrafın ilk nerede ve ne zaman paylaşıldığını bulma tekniği." },
    { id: "5-3", title: "Yapay Zeka Görsellerini Ayırt Etme", desc: "Yapay zekanın ürettiği fotoğraflardaki ipuçlarını yakalama." },
  ],
  6: [
    { id: "6-1", title: "Reklam ve İkna Yöntemleri", desc: "Markaların bizi satın almaya yönlendirmek için kullandığı teknikler." },
    { id: "6-2", title: "Influencer Dünyası ve Gizli Reklamlar", desc: "Sosyal medyadaki gizli iş birlikleri ve samimiyet yanılsaması." },
    { id: "6-3", title: "Duygusal Manipülasyonlar", desc: "Korku, öfke ve acıma duygularını tetikleyen medya içerikleri." },
  ],
  7: [
    { id: "7-1", title: "Siber Zorbalık ve Başa Çıkma", desc: "Dijital dünyada hakaret, taciz ve dışlanma durumlarında ne yapılmalı?" },
    { id: "7-2", title: "Kişisel Veri Güvenliği", desc: "Şifre güvenliği, iki adımlı doğrulama ve sosyal mühendislik." },
    { id: "7-3", title: "Oltalama (Phishing) ve Dolandırıcılık", desc: "Sahte ödüller, kuponlar ve banka taklidi mesajlarla yapılan dolandırıcılıklar." },
  ],
  8: [
    { id: "8-1", title: "Sorumlu İçerik Üretimi", desc: "Sosyal medyada paylaşım yaparken dikkat etmemiz gereken ahlaki kurallar." },
    { id: "8-2", title: "Telif Hakları ve Adil Kullanım", desc: "İnternetteki müzik, video ve yazıları yasalara uygun kullanma." },
    { id: "8-3", title: "Dijital Vatandaşlık", desc: "İnternet dünyasının saygılı, faydalı ve etik bir üyesi olmak." },
  ],
  9: [
    { id: "9-1", title: "RTÜK'ün Rolü ve Yayın İlkeleri", desc: "Radyo ve Televizyon Üst Kurulu'nun yayıncılık standartları ve denetimi." },
    { id: "9-2", title: "Akıllı İşaretler Sistemi", desc: "Televizyon ve dijital platformlardaki yaş sınırlamaları ve içerik uyarıları." },
    { id: "9-3", title: "İzleyici Şikayet ve Öneri Kanalları", desc: "Zararlı içerikleri bildirme hakkımız ve toplumsal sorumluluk." },
  ],
  10: [
    { id: "10-1", title: "Afet Dönemlerinde Doğru Bilgi", desc: "Deprem, yangın gibi kriz anlarında dezenformasyonun hayati tehlikeleri." },
    { id: "10-2", title: "Sağlık Krizleri ve Bilgi Kirliliği", desc: "Salgın dönemlerinde kulaktan dolma bilgilerin yayılmasını engellemek." },
    { id: "10-3", title: "Doğrulama (Fact-Checking) Platformları", desc: "Teyit.org, Malumatfuruş gibi platformları etkin kullanma." },
  ],
};

const moduleTitles: Record<number, string> = {
  1: "Medya Nedir?",
  2: "Haber Değerlendirme",
  3: "Dezenformasyon",
  4: "Sosyal Medya",
  5: "Görsel Okuryazarlık",
  6: "Reklam & İkna",
  7: "Dijital Güvenlik",
  8: "Medya Üretimi & Etik",
  9: "RTÜK & Düzenleme",
  10: "Kriz Dönemleri",
};

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const { state } = useProgress();
  const [moduleId, setModuleId] = useState<number>(1);

  useEffect(() => {
    if (params.id) {
      const id = parseInt(params.id as string);
      if (!isNaN(id) && id >= 1 && id <= 10) {
        setModuleId(id);
        // Eğer kullanıcı henüz bu modülü açmadıysa dashboard'a yönlendir
        if (!state.unlockedModules.includes(id)) {
          router.push("/dashboard");
        }
      } else {
        router.push("/dashboard");
      }
    }
  }, [params.id, state.unlockedModules, router]);

  const lessons = moduleLessons[moduleId] || [];
  const title = moduleTitles[moduleId] || "";

  // Bu modüldeki tamamlanan derslerin sayısı
  const completedInModule = lessons.filter((l) => state.completedLessons.includes(l.id));
  const isModuleQuizUnlocked = completedInModule.length === lessons.length;
  const isQuizCompleted = state.completedQuizzes.includes(moduleId);

  return (
    <div style={{ minHeight: "100vh", background: "var(--gray-950)", paddingBottom: "100px" }}>
      {/* ===== HEADER ===== */}
      <header className="navbar scrolled" style={{ position: "relative", marginBottom: "40px" }}>
        <div className="container navbar-inner">
          <Link href="/dashboard" className="navbar-logo" style={{ fontSize: "1rem", color: "var(--gray-400)", fontWeight: 500 }}>
            ← Paneli Dön
          </Link>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--gray-100)" }}>
            Modül {moduleId}: {title}
          </span>
          <div className="navbar-cta">
            <span style={{ fontSize: "0.85rem", color: "var(--primary-400)", fontWeight: 600 }}>⭐ {state.xp} XP</span>
          </div>
        </div>
      </header>

      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="section-header" style={{ textAlign: "left", maxWidth: "none", marginBottom: "32px" }}>
          <span className="section-badge">Modül {moduleId}</span>
          <h2 className="section-title" style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--gray-100)", marginBottom: "16px" }}>{title}</h2>
          <p className="section-desc" style={{ fontSize: "1.15rem", color: "var(--gray-300)", lineHeight: 1.6, maxWidth: "600px" }}>
            Sırayla tüm dersleri tamamlayın. Her ders bitiminde <strong>+20 XP</strong> kazanacaksınız. 3 dersin tamamını bitirdikten sonra modül sonu quizi aktifleşecektir.
          </p>
        </div>

        {/* Progress Display */}
        <div className="glass-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px", marginBottom: "32px" }}>
          <div>
            <div style={{ fontSize: "1.05rem", color: "var(--gray-400)", fontWeight: 600, marginBottom: "4px" }}>Modül İlerlemesi</div>
            <div style={{ fontSize: "1.3rem", color: "var(--gray-100)", fontWeight: 800 }}>
              {completedInModule.length} / {lessons.length} Ders Tamamlandı
            </div>
          </div>
          <div style={{ height: "46px", width: "130px", display: "flex", alignItems: "center", gap: "10px", background: "rgba(0,0,0,0.05)", padding: "12px", borderRadius: "var(--radius-md)", border: "var(--border-subtle)", justifyContent: "center" }}>
            <span style={{ fontSize: "1.2rem" }}>📖</span>
            <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--gray-100)" }}>
              % {Math.round((completedInModule.length / lessons.length) * 100)}
            </span>
          </div>
        </div>

        {/* LESSONS LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
          {lessons.map((l, index) => {
            const isCompleted = state.completedLessons.includes(l.id);
            // Sıralı tamamlama kuralı: Ya tamamlanmıştır ya da kendisinden önceki ders tamamlanmıştır
            const isLessonUnlocked = index === 0 || state.completedLessons.includes(lessons[index - 1].id);

            let cardStyle: React.CSSProperties = {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "28px",
              borderRadius: "var(--radius-md)",
              border: "var(--border-subtle)",
              transition: "var(--transition-base)",
            };

            if (isCompleted) {
              cardStyle = {
                ...cardStyle,
                background: "#e8f5e9",
                borderColor: "#c8e6c9",
              };
            } else if (isLessonUnlocked) {
              cardStyle = {
                ...cardStyle,
                background: "rgba(0,0,0,0.05)",
                borderColor: "rgba(59, 130, 246, 0.2)",
              };
            } else {
              cardStyle = {
                ...cardStyle,
                background: "rgba(0,0,0,0.05)",
                opacity: 0.5,
                cursor: "not-allowed",
              };
            }

            return (
              <div key={l.id} style={cardStyle} className={isLessonUnlocked ? "glass-card" : ""}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1, paddingRight: "16px" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: isCompleted
                        ? "var(--success-500)"
                        : isLessonUnlocked
                        ? "var(--gradient-primary)"
                        : "var(--gray-800)",
                      color: isLessonUnlocked ? "white" : "var(--gray-500)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                    }}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", color: isLessonUnlocked ? "var(--gray-100)" : "var(--gray-500)", marginBottom: "6px", fontWeight: 700 }}>
                      {l.title}
                    </h3>
                    <p style={{ fontSize: "0.95rem", color: "var(--gray-400)", lineHeight: 1.5 }}>{l.desc}</p>
                  </div>
                </div>

                <div>
                  {isCompleted ? (
                    <Link href={`/modul/${moduleId}/ders/${l.id}`} className="btn btn-outline" style={{ background: "#ffffff", color: "#2e7d32", borderColor: "#a5d6a7" }}>
                      Tekrar Oku
                    </Link>
                  ) : isLessonUnlocked ? (
                    <Link href={`/modul/${moduleId}/ders/${l.id}`} className="btn btn-primary">
                      Başla 🚀
                    </Link>
                  ) : (
                    <button disabled className="btn btn-outline" style={{ opacity: 0.5, cursor: "not-allowed" }}>
                      🔒 Kilitli
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* QUIZ PORTAL CARD */}
        <div
          className="glass-card"
          style={{
            background: isQuizCompleted
              ? "rgba(34, 197, 94, 0.03)"
              : isModuleQuizUnlocked
              ? "rgba(139, 92, 246, 0.05)"
              : "rgba(255,255,255,0.01)",
            borderColor: isQuizCompleted
              ? "rgba(34, 197, 94, 0.2)"
              : isModuleQuizUnlocked
              ? "rgba(139, 92, 246, 0.3)"
              : "var(--border-subtle)",
            padding: "36px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🏆</div>
          <h3 style={{ fontSize: "1.6rem", color: "var(--gray-100)", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
            Modül Sonu Değerlendirme Sınavı
          </h3>
          <p style={{ fontSize: "1.05rem", color: "var(--gray-400)", maxWidth: "540px", margin: "0 auto 28px", lineHeight: 1.6 }}>
            {isQuizCompleted
              ? "Tebrikler! Bu modülün değerlendirme sınavını başarıyla geçtiniz ve rozetinizi kazandınız. İstediğiniz zaman testi tekrar çözebilirsiniz."
              : "Derslerden edindiğiniz bilgileri sınayın. Sınavı geçerek bir sonraki modülü açın ve özel modül rozetinizi kazanın! (+100 XP + 50 XP Rozet Ödülü)"}
          </p>

          {isQuizCompleted ? (
            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <Link href={`/modul/${moduleId}/quiz`} className="btn btn-outline">
                Sınavı Tekrar Et
              </Link>
              <Link href="/dashboard" className="btn btn-primary">
                Sonraki Modüle Geç 🚀
              </Link>
            </div>
          ) : isModuleQuizUnlocked ? (
            <Link href={`/modul/${moduleId}/quiz`} className="btn btn-primary btn-lg" style={{ background: "var(--gradient-primary)", boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" }}>
              Sınava Başla 🎯
            </Link>
          ) : (
            <button disabled className="btn btn-outline" style={{ cursor: "not-allowed", opacity: 0.5 }}>
              🔒 Sınav Kilitli (Önce 3 Dersi Tamamlayın)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
