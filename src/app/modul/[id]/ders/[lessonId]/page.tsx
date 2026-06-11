"use client";

import { useProgress } from "@/context/ProgressContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface LessonContent {
  title: string;
  introduction: string;
  body: string[];
  mascotTip?: string;
  youtubeId?: string; // YouTube Video ID (Konuyla ilgili eğitici video)
  scenario: {
    question: string;
    options: { text: string; isCorrect: boolean; feedback: string }[];
  };
}

// 1. Modül 1. Ders: Medya Nedir? (Tüm Düzeyler İçin Özel İçerikler)
const lessonData: Record<string, Record<string, LessonContent>> = {
  "1-1": {
    primary: {
      title: "Medya Nedir ve Türleri Nelerdir?",
      introduction: "Merhaba küçük dedektif! Bugün çevremizdeki sihirli haberleşme araçlarını keşfedeceğiz. Hazır mısın?",
      youtubeId: "9f387mHh-Cw", // Medya Okuryazarlığı Animasyonu
      body: [
        "📺 **Geleneksel Medya:** Annemizin, babamızın ya da dedemizin izlediği televizyonlar, dinlediği radyolar ve okuduğu kağıttan gazetelerdir. Bunlar bize tek yönlü bilgi verir, yani televizyon konuşur, biz dinleriz.",
        "📱 **Dijital ve Sosyal Medya:** Tabletlerimiz, telefonlarımız ve internet! Burası çok eğlencelidir çünkü sadece izlemeyiz; oyun oynayabilir, resim paylaşabilir ve arkadaşlarımızla konuşabiliriz. Yani biz de medyanın bir parçası oluruz!",
        "🕵️‍♂️ **Peki Dedektif Ne Yapar?** Medyadaki her şey gerçek olmayabilir! Gördüğümüz resimlerin, videoların arkasındaki gizemi çözmek için meraklı olmalıyız."
      ],
      mascotTip: "Medya Dedektifi diyor ki: Ekranda gördüğün her şey birer çizim ya da kurgu olabilir. Gerçek dünyayı asla unutma!",
      scenario: {
        question: "Tablette gezinirken konuşan sevimli bir köpek videosu gördün ve altında 'Bu köpek aslında bir insan!' yazıyor. Ne yaparsın?",
        options: [
          { text: "İnanırım ve hemen arkadaşlarıma köpeğin insan olduğunu söylerim.", isCorrect: false, feedback: "Ayy, acele etme dedektif! Hayvanlar konuşamaz ve insana dönüşemez. Bu sadece eğlenceli bir şaka veya montaj olabilir!" },
          { text: "Bunun bilgisayarla yapılmış eğlenceli bir video olabileceğini düşünür ve aileme gösterip sorarım.", isCorrect: true, feedback: "Harikasın dedektif! Şüpheli şeyleri büyüklere sormak ve bunun bir kurgu olabileceğini anlamak gerçek bir dedektif davranışıdır! (+20 XP)" }
        ]
      }
    },
    secondary: {
      title: "Medya Nedir ve Türleri Nelerdir?",
      introduction: "Medya, hayatımızın merkezinde yer alan devasa bir bilgi ve iletişim ağıdır. Peki bu ağı ne kadar iyi tanıyorsun?",
      youtubeId: "9f387mHh-Cw",
      body: [
        "📺 **Geleneksel Medya:** Gazete, dergi, radyo ve televizyon gibi yayın organlarıdır. Tek yönlüdür (one-to-many). İçerik profesyonel editörler tarafından üretilir ve süzgeçten geçirilerek bize sunulur.",
        "📱 **Dijital ve Sosyal Medya:** Web siteleri, bloglar, YouTube, TikTok, Instagram gibi platformlar. Çift yönlü ve etkileşimlidir (many-to-many). Burada artık sadece tüketici değil, aynı zamanda içerik üreten birer 'üretici-tüketici' (prosumer) konumundayız.",
        "💡 **Kritik Fark:** Geleneksel medyada haberler belli bir denetimden geçerken, sosyal medyada herkes anında istediği şeyi paylaşabilir. Bu da bilgi kirliliğini (infodemi) inanılmaz derecede artırır."
      ],
      mascotTip: "Analist İpucu: Sosyal medyada hızlı tüketim için tasarlanan algoritmalar, doğruluğu değil, en çok etkileşim alan (tıklama, beğeni) içerikleri öne çıkarır.",
      scenario: {
        question: "Sosyal medyada çok sevdiğin bir oyunun ücretsiz dağıtıldığına dair bir gönderi gördün. Gönderide bir link var ve 'Hemen tıkla, hesabınla giriş yap ve oyunu kap!' yazıyor. Ne yaparsın?",
        options: [
          { text: "Çok heyecanlanıp kaçırmamak için hemen linke tıklar ve oyun hesabımla giriş yaparım.", isCorrect: false, feedback: "⚠️ Büyük tehlike! Bu yöntem 'oltalama' (phishing) adı verilen bir hesap çalma yöntemidir. Resmi siteler dışındaki yerlere asla şifreni girmemelisin." },
          { text: "Oyunun kendi resmi web sitesini ve sosyal medya hesaplarını kontrol eder, böyle bir kampanya var mı bakarım.", isCorrect: true, feedback: "Harika analitik yaklaşım! Kaynağı doğrulamak ve resmi kanalları çapraz kontrol etmek seni siber tuzaklardan korur! (+20 XP)" }
        ]
      }
    },
    tertiary: {
      title: "Medya Nedir ve Türleri Nelerdir?",
      introduction: "Medya okuryazarlığı, modern dünyada sadece bir kültür değil, aynı zamanda bir bilgi güvenliği ve zihinsel savunma becerisidir.",
      youtubeId: "9f387mHh-Cw",
      body: [
        "1. **Medyanın Dönüşümü:** Geleneksel kitle iletişim araçlarından (televizyon, gazete) algoritmik, yapay zeka destekli ve mikro-hedefleme yapan dijital platformlara geçiş yapılmıştır. Artık medya sadece haber vermiyor, davranışlarimizi ve algılarımızı şekillendiriyor.",
        "2. **Etkileşim Ekonomisi:** Sosyal medya platformlarının ana gelir modeli reklamlar ve veridir. Kullanıcıların platformda kalma süresini maksimize etmek için tasarlanan algoritmalar, rasyonel bilgiler yerine duygusal tepkileri (öfke, şaşkınlık) tetikleyen içerikleri yaygınlaştırır.",
        "3. **Medya Okuryazarının Rolü:** Aktif bir medya okuryazarı, medyayı pasif bir şekilde alımlamak yerine sorgulayan, dezenformasyon tekniklerini bilen ve dijital ayak izini bilinçli yöneten bireydir."
      ],
      mascotTip: "Uzman Görüşü: Medya okuryazarlığı, sansürle mücadele ederken aynı zamanda manipülasyon ve algı yönetiminden korunmanın yegane entelektüel aracıdır.",
      scenario: {
        question: "Kriz anlarında (afet, deprem, salgın vb.) WhatsApp gruplarında yayılan ve 'Çok güvenilir bir kaynaktan aldım, gizli bilgi!' diye başlayan ses kayıtları veya mesajlar hakkında nasıl davranmalısınız?",
        options: [
          { text: "Çevremdeki insanları hemen uyarmak adına bu mesajı diğer gruplara hızlıca iletirim.", isCorrect: false, feedback: "Yanlış! Kriz anlarında panikle yayılan doğrulanmamış ses kayıtları toplumsal infiale yol açar. İyi niyetli olsanız bile dezenformasyon zincirinin bir halkası olursunuz." },
          { text: "İletilen mesajın doğruluğunu resmi makamlar veya teyit organizasyonları (Teyit.org vb.) üzerinden doğrulamadan asla paylaşmam.", isCorrect: true, feedback: "Doğru ve sorumlu davranış! Kriz anlarında teyit edilmemiş bilgiyi paylaşmamak, en az doğru bilgi kadar değerlidir. Dezenformasyon zincirini kırdınız! (+20 XP)" }
        ]
      }
    }
  }
};

// Diğer dersler için fallback dummy şablonları
const generateFallbackLesson = (moduleId: number, lessonNum: number, level: string): LessonContent => {
  const titles: Record<number, string> = {
    1: "Medya Nedir?", 2: "Haber Değerlendirme", 3: "Dezenformasyon", 4: "Sosyal Medya",
    5: "Görsel Okuryazarlık", 6: "Reklam & İkna", 7: "Dijital Güvenlik",
    8: "Medya Üretimi & Etik", 9: "RTÜK & Düzenleme", 10: "Kriz Dönemleri"
  };
  const title = `${titles[moduleId]} - Ders ${lessonNum}`;

  const youtubeVideoMap: Record<number, string> = {
    1: "9f387mHh-Cw", // Medya Okuryazarlığı Nedir?
    2: "9f387mHh-Cw", // Doğru Bilgi ve Teyit
    3: "9f387mHh-Cw", // Dezenformasyon ve Yalan Haber
    4: "9f387mHh-Cw", // Sosyal Medya ve Algoritmalar
    5: "9f387mHh-Cw", // Görsel Okuryazarlık ve Ters Arama
    6: "9f387mHh-Cw", // Reklam ve İkna
    7: "9f387mHh-Cw", // Dijital Güvenlik
    8: "9f387mHh-Cw", // Medya Etiği
    9: "9f387mHh-Cw", // RTÜK ve Akıllı İşaretler
    10: "9f387mHh-Cw" // Kriz Döneminde Bilgi
  };

  return {
    title,
    introduction: `Modül ${moduleId}, Ders ${lessonNum} eğitimine hoş geldiniz.`,
    youtubeId: youtubeVideoMap[moduleId] || "9f387mHh-Cw",
    body: [
      `Bu derste, ${titles[moduleId]} konusunun temel dinamiklerini ve pratik hayattaki yansımalarını inceleyeceğiz.`,
      "Medya araçlarını doğru kullanmak, bilgi kirliliğini önlemek ve eleştirel düşünebilmek adına bu ders çok önemlidir.",
      "İçerikleri dikkatlice okuyun ve aşağıdaki etkileşimli senaryoyu yanıtlayarak dersi tamamlayın."
    ],
    mascotTip: "İpucu: Medyada gördüğün içeriklerin arkasında kimin olduğunu ve ne amaçla üretildiğini her zaman sorgula.",
    scenario: {
      question: "Bu derste öğrendiklerinizi pekiştirmek için: Aşağıdakilerden hangisi eleştirel bir medya okuryazarının yapması gereken ilk şeydir?",
      options: [
        { text: "Her gördüğü ilgi çekici habere hemen inanmak ve paylaşmak.", isCorrect: false, feedback: "Maalesef yanlış. Sorgulamadan paylaşım yapmak yanlış bilginin yayılmasına yol açar." },
        { text: "Haberin kaynağını, yazarını ve amacını sorgulamak, doğruluğunu çapraz kontrol etmek.", isCorrect: true, feedback: "Harika! Doğru cevap. Gerçek bir medya dedektifi gibi davrandınız! (+20 XP)" }
      ]
    }
  };
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { state, completeLesson } = useProgress();
  const [moduleId, setModuleId] = useState<number>(1);
  const [lessonId, setLessonId] = useState<string>("1-1");

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (params.id && params.lessonId) {
      setModuleId(parseInt(params.id as string));
      setLessonId(params.lessonId as string);
    }
  }, [params.id, params.lessonId]);

  const level: string = state.level || "secondary";

  // Gerçek ders verisini çek veya fallback üret
  const currentContent = (lessonData[lessonId] && lessonData[lessonId][level])
    ? lessonData[lessonId][level]
    : generateFallbackLesson(moduleId, parseInt(lessonId.split("-")[1] || "1"), level);

  const handleOptionClick = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    const opt = currentContent.scenario.options[index];
    setFeedback(opt.feedback);
    setAnswered(true);
    if (opt.isCorrect) {
      setIsSuccess(true);
    }
  };

  const handleCompleteLesson = () => {
    completeLesson(moduleId, lessonId);
    router.push(`/modul/${moduleId}`);
  };

  console.log("Rendering LessonPage:", { lessonId, level, youtubeId: currentContent?.youtubeId });

  return (
    <div style={{ minHeight: "100vh", background: "var(--gray-950)", paddingBottom: "100px" }}>
      {/* ===== HEADER ===== */}
      <header className="navbar scrolled" style={{ position: "relative", marginBottom: "40px" }}>
        <div className="container navbar-inner">
          <Link href={`/modul/${moduleId}`} className="navbar-logo" style={{ fontSize: "1rem", color: "var(--gray-400)", fontWeight: 500 }}>
            ← Modüle Dön
          </Link>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--gray-100)" }}>
            Ders {lessonId}
          </span>
          <div className="navbar-cta">
            <span style={{ fontSize: "0.85rem", color: "var(--primary-400)", fontWeight: 600 }}>⭐ {state.xp} XP</span>
          </div>
        </div>
      </header>

      <div className="container" style={{ maxWidth: "750px" }}>
        {/* ===== LESSON BODY ===== */}
        <article className="glass-card" style={{ padding: "40px", marginBottom: "32px", borderBottom: "4px solid var(--primary-500)" }}>
          <span className="section-badge" style={{ marginBottom: "16px" }}>📖 Ders İçeriği</span>
          <h1 style={{ fontSize: "2.4rem", color: "var(--gray-100)", fontWeight: 800, marginBottom: "24px", fontFamily: "var(--font-heading)", lineHeight: 1.3 }}>
            {currentContent.title}
          </h1>

          <p style={{ fontSize: "1.25rem", color: "var(--gray-100)", fontWeight: 600, marginBottom: "28px", lineHeight: 1.8, borderLeft: "4px solid var(--primary-400)", paddingLeft: "20px" }}>
            {currentContent.introduction}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", color: "var(--gray-200)", lineHeight: 1.9, fontSize: "1.15rem" }}>
            {currentContent.body.map((p, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            ))}
          </div>

          {currentContent.youtubeId && (
            <div style={{ marginTop: "32px", marginBottom: "16px" }}>
              <span className="section-badge" style={{ marginBottom: "12px", background: "rgba(239, 68, 68, 0.08)", color: "var(--danger-500)", border: "1px solid rgba(239, 68, 68, 0.15)" }}>
                🎥 Yardımcı Eğitici Video
              </span>
              <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", height: 0, borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "var(--shadow-sm)" }}>
                <iframe
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                  src={`https://www.youtube-nocookie.com/embed/${currentContent.youtubeId}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {currentContent.mascotTip && (
            <div style={{ marginTop: "32px", background: "rgba(139, 92, 246, 0.05)", border: "1px solid rgba(139, 92, 246, 0.2)", padding: "20px", borderRadius: "var(--radius-md)", display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.5rem" }}>🤖</span>
              <p style={{ fontSize: "1.05rem", color: "var(--accent-400)", fontStyle: "italic", lineHeight: 1.6, fontWeight: 500 }}>
                {currentContent.mascotTip}
              </p>
            </div>
          )}
        </article>

        {/* ===== INTERACTIVE SCENARIO ===== */}
        <section className="glass-card" style={{ padding: "36px", marginBottom: "32px", border: "1px solid rgba(0,0,0,0.08)" }}>
          <span className="section-badge" style={{ background: "rgba(139,92,246,0.1)", color: "var(--accent-400)", border: "1px solid rgba(139,92,246,0.2)", marginBottom: "16px" }}>
            🎯 Sıra Sende!
          </span>
          <h3 style={{ fontSize: "1.4rem", color: "var(--gray-100)", marginBottom: "24px", fontFamily: "var(--font-heading)", lineHeight: 1.6 }}>
            {currentContent.scenario.question}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
            {currentContent.scenario.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let optStyle: React.CSSProperties = {
                padding: "20px",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(0,0,0,0.05)",
                cursor: answered ? "default" : "pointer",
                textAlign: "left",
                fontSize: "1.1rem",
                color: "var(--gray-200)",
                transition: "var(--transition-fast)",
              };

              if (answered) {
                if (opt.isCorrect) {
                  optStyle = {
                    ...optStyle,
                    background: "rgba(34, 197, 94, 0.08)",
                    borderColor: "var(--success-500)",
                    color: "var(--gray-100)",
                  };
                } else if (isSelected) {
                  optStyle = {
                    ...optStyle,
                    background: "rgba(239, 68, 68, 0.08)",
                    borderColor: "var(--danger-500)",
                    color: "var(--gray-100)",
                  };
                } else {
                  optStyle = {
                    ...optStyle,
                    opacity: 0.5,
                  };
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={answered}
                  style={optStyle}
                  className={!answered ? "glass-card" : ""}
                >
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontWeight: 700, color: opt.isCorrect && answered ? "var(--success-400)" : "var(--primary-400)" }}>
                      {idx === 0 ? "A)" : "B)"}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback Display */}
          {answered && (
            <div
              style={{
                background: isSuccess ? "rgba(34, 197, 94, 0.04)" : "rgba(239, 68, 68, 0.04)",
                border: `1px solid ${isSuccess ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
                padding: "20px",
                borderRadius: "var(--radius-md)",
                marginBottom: "24px",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>{isSuccess ? "🎉" : "⚠️"}</span>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: isSuccess ? "var(--success-400)" : "var(--danger-400)", marginBottom: "4px" }}>
                  {isSuccess ? "Doğru Analiz!" : "Tekrar Düşünelim"}
                </h4>
                <p style={{ fontSize: "0.88rem", color: "var(--gray-300)", lineHeight: 1.5 }}>{feedback}</p>
              </div>
            </div>
          )}

          {/* Complete Lesson Action */}
          {answered && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {isSuccess ? (
                <button onClick={handleCompleteLesson} className="btn btn-primary btn-lg" style={{ animation: "pulse-glow 2s infinite" }}>
                  Dersi Tamamla (+20 XP) 🚀
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAnswered(false);
                    setSelectedOption(null);
                    setFeedback("");
                  }}
                  className="btn btn-outline"
                >
                  Tekrar Dene 🔄
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
