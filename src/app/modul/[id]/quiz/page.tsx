"use client";

import { useProgress } from "@/context/ProgressContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Question {
  q: string;
  opts: string[];
  answer: number; // Index of correct option
  explanation: string;
}

const quizQuestions: Record<number, Question[]> = {
  1: [
    {
      q: "Aşağıdakilerden hangisi geleneksel medyanın en belirgin özelliğidir?",
      opts: [
        "Kullanıcıların kendi içeriklerini anında yayınlayabilmesi",
        "Bilginin profesyonel editör süzgecinden geçip tek yönlü sunulması",
        "İzleyicilerin yayın akışına anında yorumlarla yön verebilmesi"
      ],
      answer: 1,
      explanation: "Geleneksel medya (gazete, televizyon, radyo) tek yönlüdür; profesyonel editör süzgecinden geçen içerik kitlelere ulaştırılır."
    },
    {
      q: "Sosyal medya algoritmalarının temel amacı aşağıdakilerden hangisidir?",
      opts: [
        "Kullanıcıya en doğru ve tarafsız haberleri göstermek",
        "Kullanıcıyı siber saldırılardan korumak",
        "Kullanıcının platformda kalma ve etkileşim süresini maksimize etmek"
      ],
      answer: 2,
      explanation: "Sosyal medya algoritmaları, etkileşim ekonomisi üzerine kuruludur; temel amaçları kullanıcının ilgisini çekip ekran başında kalma süresini uzatmaktır."
    },
    {
      q: "Medya okuryazarı bir birey, internette karşılaştığı şüpheli bir görsele nasıl yaklaşmalıdır?",
      opts: [
        "Doğruluğundan emin olmadan paylaşarak arkadaşlarının da görmesini sağlar.",
        "Görseli kaydedip, tersine görsel arama teknikleriyle kaynağını ve ilk çıkış yerini sorgular.",
        "Hemen yorum yazıp gönderiyi paylaşan kişiye hakaret eder."
      ],
      answer: 1,
      explanation: "Tersine görsel arama, şüpheli resimlerin gerçek bağlamını, montajlanıp montajlanmadığını ve ilk paylaşım tarihini bulmak için kullanılan en etkili teyit yöntemlerinden biridir."
    }
  ],
  2: [
    {
      q: "Bir haberin güvenilirliğini denetlerken kullanılan '5N1K' formülündeki 'K' harfi neyi temsil eder?",
      opts: ["Konu", "Karar", "Kim"],
      answer: 2,
      explanation: "5N1K: Ne, Nerede, Ne Zaman, Nasıl, Neden, Kim sorularını temsil eder. 'Kim' sorusu olayın aktörlerini ve haberi yapan kaynağı sorgular."
    },
    {
      q: "Farklı haber sitelerinden bir bilgiyi teyit etme işlemine ne ad verilir?",
      opts: ["Astroturfing", "Çapraz Kaynak Kontrolü", "Phishing"],
      answer: 1,
      explanation: "Çapraz kaynak kontrolü (cross-checking), bir iddianın doğruluğunu anlamak amacıyla farklı bağımsız haber mecralarından ve resmi kaynaklardan doğrulama işlemidir."
    },
    {
      q: "Bir haberin başlığında aşırı şaşırtıcı ifadeler ve 'İnanamayacaksınız!', 'Hemen Tıkla!' gibi çağrılar varsa bu haber muhtemelen hangisidir?",
      opts: ["Tık Tuzağı (Clickbait)", "Kamu Yararı Taşıyan Haber", "Araştırmacı Gazetecilik"],
      answer: 0,
      explanation: "Tık tuzakları (clickbait), kullanıcıların merak duygusunu sömürerek sadece siteye tıklama çekmek amacıyla tasarlanmış yanıltıcı veya abartılı başlıklardır."
    }
  ]
};

// Fallback quiz generator
const generateFallbackQuiz = (moduleId: number): Question[] => {
  return [
    {
      q: `Modül ${moduleId} kapsamında öğrendiğimiz bilgilere göre, dezenformasyon zincirini kırmanın en etkili yolu nedir?`,
      opts: [
        "Gördüğümüz her bilgiyi sorgulamadan gruplara iletmek.",
        "Resmi açıklamaları ve bağımsız doğrulama platformlarını kontrol etmek.",
        "Sosyal medyadaki en çok beğeni alan yoruma güvenmek."
      ],
      answer: 1,
      explanation: "Doğrulama platformlarını (Teyit.org vb.) ve resmi açıklamaları incelemek, dezenformasyonun yayılmasını engeller."
    },
    {
      q: "İnternette paylaştığımız fotoğraflar, yaptığımız aramalar ve bıraktığımız tüm izlerin bütününe ne ad verilir?",
      opts: ["Dijital Ayak İzi", "Çerez (Cookie)", "Filtre Balonu"],
      answer: 0,
      explanation: "Dijital ayak izi, internet üzerinde yaptığımız her türlü aktivitenin arkasında bıraktığı kalıcı veri izleridir."
    },
    {
      q: "Aşağıdakilerden hangisi bir siber zorbalık eylemine maruz kaldığınızda yapılması gereken doğru bir davranıştır?",
      opts: [
        "Aynı sertlikle karşılık verip kavga etmek.",
        "Durumu hemen güvendiğiniz bir yetişkine (ebeveyn, öğretmen) bildirmek ve ekran görüntülerini kaydederek zorbayı engellemek.",
        "Hesaplarınızı tamamen kapatıp interneti bir daha asla kullanmamak."
      ],
      answer: 1,
      explanation: "Siber zorbalıkta kanıtları (ekran görüntüleri) saklamak, zorba hesabı engellemek ve yetişkinlerden destek almak en güvenli yoldur."
    }
  ];
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

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { state, completeQuiz } = useProgress();
  const [moduleId, setModuleId] = useState<number>(1);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    if (params.id) {
      setModuleId(parseInt(params.id as string));
    }
  }, [params.id]);

  const questions = quizQuestions[moduleId] || generateFallbackQuiz(moduleId);
  const title = moduleTitles[moduleId] || "";

  const handleOptionSelect = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);

    const isCorrect = index === questions[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setAnswered(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      // Sınav bitti, eğer en az 2 doğru varsa başarılı kabul et
      const isPassed = score >= Math.ceil(questions.length * 0.6);
      if (isPassed) {
        completeQuiz(moduleId);
      }
    }
  };

  const isPassed = score >= Math.ceil(questions.length * 0.6);

  if (quizFinished) {
    return (
      <div className="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div className="hero-bg">
          <div className="hero-bg-orb hero-bg-orb-1" style={{ background: isPassed ? "var(--success-500)" : "var(--danger-500)", opacity: 0.2 }} />
          <div className="hero-bg-orb hero-bg-orb-2" />
          <div className="hero-grid" />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "600px", textAlign: "center" }}>
          <div className="glass-card" style={{ padding: "48px 32px" }}>
            <span style={{ fontSize: "4rem", display: "block", marginBottom: "20px" }}>
              {isPassed ? "🎉" : "😢"}
            </span>

            <h2 style={{ fontSize: "2rem", color: "var(--gray-100)", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
              {isPassed ? "Sınavı Başarıyla Geçtiniz!" : "Sınavda Başarılı Olamadınız"}
            </h2>

            <p style={{ fontSize: "1.1rem", color: "var(--gray-300)", marginBottom: "24px" }}>
              Toplam <strong>{questions.length}</strong> sorudan <strong>{score}</strong> doğru yanıt verdiniz.
            </p>

            <div style={{ background: "rgba(0,0,0,0.05)", border: "var(--border-subtle)", padding: "20px", borderRadius: "var(--radius-md)", marginBottom: "32px", textAlign: "left" }}>
              {isPassed ? (
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <span style={{ fontSize: "1.5rem" }}>🏆</span>
                  <div>
                    <div style={{ fontSize: "0.85rem", color: "var(--success-400)", fontWeight: 700 }}>KAZANILAN ÖDÜLLER:</div>
                    <div style={{ fontSize: "1rem", color: "var(--gray-100)", fontWeight: 600 }}>+100 XP Sınav Ödülü</div>
                    <div style={{ fontSize: "1rem", color: "var(--accent-400)", fontWeight: 600 }}>+50 XP Modül Rozeti Kilit Açıldı!</div>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <span style={{ fontSize: "1.5rem" }}>⚠️</span>
                  <div style={{ fontSize: "0.88rem", color: "var(--gray-400)", lineHeight: 1.5 }}>
                    Modülü başarıyla tamamlamak ve sonraki modülün kilidini açmak için en az **{Math.ceil(questions.length * 0.6)}** soruya doğru cevap vermelisiniz. Dersleri tekrar okuyup yeniden deneyebilirsiniz.
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              {isPassed ? (
                <Link href="/dashboard" className="btn btn-primary btn-lg" style={{ animation: "pulse-glow 2s infinite" }}>
                  Paneline Dön ve Devam Et 🚀
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setCurrentQuestionIndex(0);
                      setSelectedOption(null);
                      setAnswered(false);
                      setScore(0);
                      setQuizFinished(false);
                    }}
                    className="btn btn-primary"
                  >
                    Tekrar Dene 🔄
                  </button>
                  <Link href={`/modul/${moduleId}`} className="btn btn-outline">
                    Derse Geri Dön 📖
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--gray-950)", paddingBottom: "100px" }}>
      {/* ===== HEADER ===== */}
      <header className="navbar scrolled" style={{ position: "relative", marginBottom: "40px" }}>
        <div className="container navbar-inner">
          <Link href={`/modul/${moduleId}`} className="navbar-logo" style={{ fontSize: "1rem", color: "var(--gray-400)", fontWeight: 500 }}>
            ← Modüle Dön
          </Link>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.2rem", color: "var(--gray-100)" }}>
            Modül {moduleId} Sınavı
          </span>
          <div className="navbar-cta">
            <span style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>Soru: {currentQuestionIndex + 1} / {totalQuestions}</span>
          </div>
        </div>
      </header>

      <div className="container" style={{ maxWidth: "700px" }}>
        {/* Progress Bar */}
        <div style={{ height: "6px", width: "100%", background: "var(--gray-800)", borderRadius: "var(--radius-full)", marginBottom: "32px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
              background: "var(--gradient-primary)",
              borderRadius: "var(--radius-full)",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* ===== QUESTION CARD ===== */}
        <div className="glass-card" style={{ padding: "40px", marginBottom: "24px" }}>
          <span className="section-badge" style={{ marginBottom: "16px" }}>Soru {currentQuestionIndex + 1}</span>
          <h2 style={{ fontSize: "1.3rem", color: "var(--gray-100)", marginBottom: "28px", fontFamily: "var(--font-heading)", lineHeight: 1.5 }}>
            {currentQuestion.q}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {currentQuestion.opts.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.answer;

              let btnStyle: React.CSSProperties = {
                padding: "20px",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(0,0,0,0.05)",
                cursor: answered ? "default" : "pointer",
                textAlign: "left",
                fontSize: "0.95rem",
                color: "var(--gray-300)",
                transition: "var(--transition-fast)",
              };

              if (answered) {
                if (isCorrect) {
                  btnStyle = {
                    ...btnStyle,
                    background: "rgba(34,197,94,0.08)",
                    borderColor: "var(--success-500)",
                    color: "var(--gray-100)",
                  };
                } else if (isSelected) {
                  btnStyle = {
                    ...btnStyle,
                    background: "rgba(239,68,68,0.08)",
                    borderColor: "var(--danger-500)",
                    color: "var(--gray-100)",
                  };
                } else {
                  btnStyle = {
                    ...btnStyle,
                    opacity: 0.5,
                  };
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={answered}
                  style={btnStyle}
                  className={!answered ? "glass-card" : ""}
                >
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        border: "1px solid rgba(0,0,0,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        background: answered && isCorrect ? "var(--success-500)" : answered && isSelected ? "var(--danger-500)" : "transparent",
                        color: answered && (isCorrect || isSelected) ? "white" : "var(--gray-400)",
                      }}
                    >
                      {idx === 0 ? "A" : idx === 1 ? "B" : "C"}
                    </span>
                    <span style={{ flex: 1 }}>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation and Navigation */}
        {answered && (
          <div className="animate-fade-in">
            {/* Explanation box */}
            <div
              style={{
                background: "rgba(0,0,0,0.05)",
                border: "var(--border-subtle)",
                padding: "20px 24px",
                borderRadius: "var(--radius-md)",
                marginBottom: "24px",
                lineHeight: 1.6,
                fontSize: "0.9rem",
                color: "var(--gray-400)",
              }}
            >
              <span style={{ fontWeight: 700, color: "var(--gray-100)", display: "block", marginBottom: "4px" }}>
                💡 Ayrıntılı Bilgi:
              </span>
              {currentQuestion.explanation}
            </div>

            {/* Next question action */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={handleNext} className="btn btn-primary btn-lg" style={{ minWidth: "160px" }}>
                {currentQuestionIndex === totalQuestions - 1 ? "Sınavı Bitir 🏁" : "Sonraki Soru ➔"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
