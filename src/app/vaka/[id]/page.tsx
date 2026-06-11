"use client";

import { useProgress } from "@/context/ProgressContext";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface VakaStep {
  text: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
    xpAward: number;
  }[];
}

interface VakaData {
  title: string;
  desc: string;
  year: string;
  dangerLevel: string; // "Yüksek", "Orta", "Kritik"
  officialReport: string; // RTÜK Raporu Özeti
  steps: VakaStep[];
}

const vakalar: Record<string, VakaData> = {
  "orman-yangini": {
    title: "2021 Orman Yangınları #HelpTurkey Kampanyası",
    desc: "Ağustos 2021'de Türkiye'de büyük orman yangınları yaşanırken sosyal medyada küresel yardım çağrısı başlatıldı. Ancak kısa sürede panik yaratmaya yönelik eski orman yangını fotoğrafları dolaşıma sokuldu.",
    year: "2021",
    dangerLevel: "Kritik",
    officialReport: "RTÜK İzleme Dairesi raporuna göre, yangın döneminde sosyal medyadaki paylaşımların %40'ından fazlası bot hesaplar tarafından yapay olarak köpürtülmüş ve kamuoyunda panik/kaos havası yaratılmak istenmiştir. Eski tarihli başka ülkelere ait görseller (örneğin 2018 Avustralya yangınları) Türkiye gibi gösterilerek algı çalışması yürütülmüştür.",
    steps: [
      {
        text: "Yangınların 3. gününde Twitter akışınızda alevler arasında can çekişen koalalar ve vahşi doğa fotoğrafları görüyorsunuz. Altında 'Türkiye'deki yangından korkunç kareler! Neden yardım edilmiyor?' yazıyor. Binlerce kişi bunu paylaşmış. Ne yaparsınız?",
        options: [
          {
            text: "Çok etkilenip hemen haberi retweet ederim. Yangının büyüklüğünü herkes görmeli!",
            isCorrect: false,
            feedback: "Üzgünüz, aceleci davrandınız. Türkiye'de koala yaşamadığını unutmamalısınız! Bu görsel muhtemelen Avustralya yangınlarına ait. Sorgulamadan paylaşarak dezenformasyonun bir parçası oldunuz.",
            xpAward: 0
          },
          {
            text: "Görseli kaydeder, arama motorunda 'tersine görsel arama' yaparım. Görselin nerede çekildiğine bakarım.",
            isCorrect: true,
            feedback: "Harika! Doğru hareket. Ters arama sonucunda görselin 2019 yılında Avustralya'daki orman yangınlarında çekildiği, Türkiye'deki yangınla hiçbir ilgisi olmadığı ortaya çıktı. Büyük bir dezenformasyon tuzağını fark ettiniz! (+50 XP)",
            xpAward: 50
          }
        ]
      },
      {
        text: "Görselin sahte olduğunu kanıtladınız. Ancak en yakın arkadaşınız bu görseli WhatsApp sınıf grubunda hâlâ paylaşıyor ve panik yaratıyor. Nasıl hareket edersiniz?",
        options: [
          {
            text: "Arkadaşımla grupta tartışma çıkmasın diye sesimi çıkarmam, görmezden gelirim.",
            isCorrect: false,
            feedback: "Pasif kalmak dezenformasyonun yayılmasına izin vermektir. Sorumlu bir dijital vatandaş sessiz kalmamalıdır.",
            xpAward: 0
          },
          {
            text: "Görselin gerçek kaynağını gösteren ters arama sonucunu ve teyit platformunun linkini gruba yazar, paniğe gerek olmadığını belirtirim.",
            isCorrect: true,
            feedback: "Mükemmel dijital dedektif davranışı! Arkadaşınızı ve gruptakileri kırmadan, kanıta dayalı bilgiyle aydınlattınız ve yanlış bilginin yayılma zincirini kırdınız! (+100 XP)",
            xpAward: 100
          }
        ]
      }
    ]
  },
  "covid-vaccine": {
    title: "COVID-19 Aşılarının İçindeki Çip İddiaları",
    desc: "Pandemi sürecinde sosyal medyada aşıların içine mikroçip yerleştirildiği, insanların uzaktan kontrol edileceği ve kaşıkların aşı yapılan kola yapıştığı iddiaları hızla yayıldı.",
    year: "2020",
    dangerLevel: "Yüksek",
    officialReport: "Dünya Sağlık Örgütü (WHO) ve Sağlık Bakanlığı raporlarında, aşı bileşenlerinde mikroçip veya metalik manyetik madde bulunmadığı defalarca kanıtlanmıştır. Kaşık yapışması gibi durumların cildin doğal salgısı (nem, yağ) kaynaklı fiziki bir yüzey gerilimi olduğu açıklanmıştır. Bu iddiaların arkasında aşı karşıtlığını tetikleyerek halk sağlığını tehlikeye atmak isteyen gruplar yer almıştır.",
    steps: [
      {
        text: "Facebook'ta bir videoda, aşı olan bir kadının aşı yapılan koluna metal kaşık tuttuğu ve kaşığın yapıştığı görülüyor. Kadın 'Aşıda çip var, mıknatıs gibi çekiyor!' diyor. Ne yaparsınız?",
        options: [
          {
            text: "İnanılmaz! Koluna kaşık yapışıyor, bu gözle görülür bir kanıt. Hemen videoyu aile grubuna atarım.",
            isCorrect: false,
            feedback: "Fizik kurallarını ve cilt yapısını göz ardı ettiniz. Nemi olan her cilde düz pürüzsüz nesneler yapışabilir (vantuza benzer). Bu manipülatif bir kurgudur.",
            xpAward: 0
          },
          {
            text: "Bu durumun bilimsel açıklamasını araştırırım. Aşıların içindeki maddelerin listesini Sağlık Bakanlığı veya DSÖ resmi sitesinden okurum.",
            isCorrect: true,
            feedback: "Muhteşem analitik yaklaşım! Resmi sağlık otoritelerinin ve fizikçilerin yaptığı açıklamalarda, aşı sıvısında hiçbir manyetik metal bulunmadığı, ciltteki nemin pürüzsüz nesneleri tutabildiği açıklanmıştır. Kanıtı sorguladınız! (+50 XP)",
            xpAward: 50
          }
        ]
      },
      {
        text: "Bilimsel verileri incelediniz. Akrabalarınız aşıdan korktukları için aşı olmayacaklarını söylüyorlar. Onları nasıl ikna edersiniz?",
        options: [
          {
            text: "Onlara 'Cahillik etmeyin, aşı olun' diyerek kızarım.",
            isCorrect: false,
            feedback: "Sert veya suçlayıcı bir ton kullanmak insanları daha çok savunmaya geçirir ve komplo teorilerine inanmaya iter.",
            xpAward: 0
          },
          {
            text: "Resmi bilim kurulu üyelerinin açıklamalarını, makaleleri ve dezenformasyonu çürüten teyit yazılarını sakin bir dille, kanıtlarıyla paylaşırım.",
            isCorrect: true,
            feedback: "Süper! Bilimsel iletişim ve sakin üslup, komplo teorilerine karşı en güçlü silahtır. Yakınlarınızı bilgi kirliliğinden korudunuz! (+100 XP)",
            xpAward: 100
          }
        ]
      }
    ]
  }
};

const generateFallbackVaka = (vakaId: string): VakaData => {
  return {
    title: "Gelişmiş Dezenformasyon Vaka Analizi",
    desc: "Sosyal medyada yayılan manipüle edilmiş haberler ve bot hesaplar aracılığıyla yürütülen bir dezenformasyon dalgası.",
    year: "2024",
    dangerLevel: "Yüksek",
    officialReport: "RTÜK ve Kamu Denetçiliği Raporları doğrultusunda, doğrulanmamış şok edici iddiaların paylaşılmasının toplumda korku kültürünü beslediği saptanmıştır. Medya okuryazarlarının sakin kalıp resmi bildirimleri beklemesi gereklidir.",
    steps: [
      {
        text: "Acil bir kriz döneminde karşınıza 'Son Dakika!' uyarısıyla çok şok edici ama hiçbir resmi televizyon kanalında geçmeyen bir iddia düşüyor. Ne yaparsınız?",
        options: [
          {
            text: "Herkes duysun, panik yapmasın diye hemen retweet ederim.",
            isCorrect: false,
            feedback: "Kriz anlarında şok edici haberleri teyitsiz paylaşmak sadece bilgi kirliliğini artırır.",
            xpAward: 0
          },
          {
            text: "Resmi doğrulama hesaplarını ve haber ajanslarını takip ederek bilginin doğrulanmasını beklerim.",
            isCorrect: true,
            feedback: "Tebrikler! Kriz anlarında en önemli şey soğukkanlı olmak ve doğrulamayı beklemektir. (+50 XP)",
            xpAward: 50
          }
        ]
      },
      {
        text: "İddianın asılsız olduğunu ve bir troll ordusu tarafından yayıldığını öğrendiniz. Ne yaparsınız?",
        options: [
          {
            text: "Ben de o trollere hakaret eden tweetler atarım.",
            isCorrect: false,
            feedback: "Trollere yanıt vermek veya tartışmaya girmek sadece onların etkileşimini ve görünürlüğünü artırır.",
            xpAward: 0
          },
          {
            text: "İlgili hesabı raporlar ve gruptaki arkadaşlarıma durumun bir troll kampanyası olduğunu belirterek kanıtı atarım.",
            isCorrect: true,
            feedback: "Harika! Spam bildirme ve çevrenizi bilgilendirme dijital koruma sağlar. (+100 XP)",
            xpAward: 100
          }
        ]
      }
    ]
  };
};

export default function VakaPage() {
  const params = useParams();
  const router = useRouter();
  const { state, addXP, earnBadge } = useProgress();
  const [vakaId, setVakaId] = useState<string>("orman-yangini");

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [finished, setFinished] = useState(false);
  const [vakaXP, setVakaXP] = useState(0);

  useEffect(() => {
    if (params.id) {
      setVakaId(params.id as string);
    }
  }, [params.id]);

  const vaka = vakalar[vakaId] || generateFallbackVaka(vakaId);
  const steps = vaka.steps;
  const currentStep = steps[currentStepIndex];

  const handleOptionClick = (index: number) => {
    if (answered) return;
    setSelectedOption(index);
    setAnswered(true);

    const opt = currentStep.options[index];
    setFeedback(opt.feedback);
    if (opt.isCorrect) {
      setIsSuccess(true);
      setVakaXP((prev) => prev + opt.xpAward);
    } else {
      setIsSuccess(false);
    }
  };

  const handleNextStep = () => {
    setSelectedOption(null);
    setAnswered(false);
    setFeedback("");

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setFinished(true);
      // Vaka bitiminde genel XP kazanımı
      addXP(vakaXP);
      // Rozet kazanımı
      earnBadge("İlk Vaka Çözüldü");
    }
  };

  if (finished) {
    return (
      <div className="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <div className="hero-bg">
          <div className="hero-bg-orb hero-bg-orb-1" style={{ background: "var(--success-500)", opacity: 0.15 }} />
          <div className="hero-bg-orb hero-bg-orb-2" />
          <div className="hero-grid" />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "700px", textAlign: "center" }}>
          <div className="glass-card" style={{ padding: "48px 32px" }}>
            <span style={{ fontSize: "4rem", display: "block", marginBottom: "20px" }}>🧠</span>
            <span className="section-badge" style={{ marginBottom: "12px" }}>Vaka Başarıyla Çözüldü</span>
            <h2 style={{ fontSize: "2rem", color: "var(--gray-100)", marginBottom: "16px", fontFamily: "var(--font-heading)" }}>
              {vaka.title}
            </h2>

            <div style={{ background: "rgba(0,0,0,0.05)", border: "var(--border-subtle)", padding: "24px", borderRadius: "var(--radius-md)", marginBottom: "32px", textAlign: "left" }}>
              <h4 style={{ fontSize: "1rem", color: "var(--primary-400)", fontWeight: 700, marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>🏛️</span> Resmi RTÜK Analiz Raporu Rapor Özeti:
              </h4>
              <p style={{ fontSize: "0.88rem", color: "var(--gray-300)", lineHeight: 1.6 }}>
                {vaka.officialReport}
              </p>
            </div>

            <div style={{ background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)", padding: "16px", borderRadius: "var(--radius-md)", marginBottom: "32px", display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.3rem" }}>🏆</span>
              <span style={{ fontSize: "0.9rem", color: "var(--gray-100)", fontWeight: 600 }}>
                Kazanılan Toplam Ödül: <strong style={{ color: "var(--warning-400)" }}>+{vakaXP} XP</strong> ve <strong style={{ color: "var(--accent-400)" }}>'İlk Vaka Çözüldü' Rozeti</strong>
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
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
            Vaka Analiz Odası
          </span>
          <div className="navbar-cta">
            <span style={{ fontSize: "0.85rem", color: "var(--danger-400)", fontWeight: 600 }}>Düzey: {vaka.dangerLevel} Tehlike 🚨</span>
          </div>
        </div>
      </header>

      <div className="container" style={{ maxWidth: "750px" }}>
        {/* ===== VAKA OVERVIEW ===== */}
        <div className="glass-card" style={{ padding: "36px", marginBottom: "32px", borderTop: "4px solid var(--danger-500)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <span className="section-badge" style={{ background: "rgba(239,68,68,0.1)", color: "var(--danger-400)", border: "1px solid rgba(239,68,68,0.2)" }}>
              Gerçek Vaka İncelemesi ({vaka.year})
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>Aşama {currentStepIndex + 1} / {steps.length}</span>
          </div>
          <h2 style={{ fontSize: "1.6rem", color: "var(--gray-100)", marginBottom: "12px", fontFamily: "var(--font-heading)" }}>
            {vaka.title}
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--gray-400)", lineHeight: 1.6 }}>
            {vaka.desc}
          </p>
        </div>

        {/* ===== STEP PROMPT ===== */}
        <div className="glass-card" style={{ padding: "40px", marginBottom: "32px" }}>
          <h3 style={{ fontSize: "1.15rem", color: "var(--gray-100)", marginBottom: "28px", fontFamily: "var(--font-heading)", lineHeight: 1.6 }}>
            {currentStep.text}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
            {currentStep.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
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
                if (opt.isCorrect) {
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
                  onClick={() => handleOptionClick(idx)}
                  disabled={answered}
                  style={btnStyle}
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
                background: isSuccess ? "rgba(34,197,94,0.04)" : "rgba(239,68,68,0.04)",
                border: `1px solid ${isSuccess ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
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
                  {isSuccess ? "Mükemmel Karar!" : "Eksik/Hatalı Adım"}
                </h4>
                <p style={{ fontSize: "0.88rem", color: "var(--gray-300)", lineHeight: 1.5 }}>{feedback}</p>
              </div>
            </div>
          )}

          {/* Navigation to Next Step */}
          {answered && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {isSuccess ? (
                <button onClick={handleNextStep} className="btn btn-primary btn-lg">
                  {currentStepIndex === steps.length - 1 ? "Analizi Tamamla 🏁" : "Sonraki Aşamaya Geç ➔"}
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
        </div>
      </div>
    </div>
  );
}
