"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sprout, Search, GraduationCap, Mail, Video } from "lucide-react";

const modules = [
  { id: 1, title: "Medya Nedir?", desc: "Medya türleri, toplumsal rolü ve tüketim alışkanlıkları" },
  { id: 2, title: "Haberi Doğrula", desc: "Yanlış bilgi, dezenformasyon ve teyit araçları" },
  { id: 3, title: "Dijital Ayak İzi", desc: "Gizlilik, güvenlik ve dijital kimlik yönetimi" },
  { id: 4, title: "Algoritmalar", desc: "Yankı fanusları, filtre balonları ve sosyal medya algoritmaları" },
  { id: 5, title: "Siber Zorbalık", desc: "Dijital ortamda iletişim etiği ve siber zorbalıkla mücadele" },
  { id: 6, title: "İçerik Üretimi", desc: "Etik ve sorumlu dijital içerik üretimi" }
];

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link href="/" className="navbar-logo">
            <div className="navbar-logo-icon">M</div>
            MedyaOkur
          </Link>
          
          <ul className="navbar-links">
            <li><Link href="#hakkinda">Hakkında</Link></li>
            <li><Link href="#seviyeler">Eğitim Seviyeleri</Link></li>
            <li><Link href="#moduller">Modüller</Link></li>
            <li><Link href="#vaka">Vaka Analizleri</Link></li>
          </ul>

          <div className="navbar-cta">
            <Link href="/giris" className="btn btn-outline btn-sm">Giriş</Link>
            <Link href="/seviye-sec" className="btn btn-primary btn-sm">Kayıt Ol</Link>
            <button 
              className="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero">
        {/* Abstract Background Orbs */}
        <div className="hero-bg">
          <div className="hero-bg-orb hero-bg-orb-1"></div>
          <div className="hero-bg-orb hero-bg-orb-2"></div>
          <div className="hero-bg-orb hero-bg-orb-3"></div>
          <div className="hero-grid"></div>
        </div>

        <div className="container hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            Yeni Nesil Eğitim Platformu
          </div>
          
          <h1 className="hero-title">
            Dijital Dünyada<br />
            <span className="hero-title-gradient">Güvenle Gezin</span>
          </h1>
          
          <p className="hero-subtitle">
            Medya okuryazarlığı becerilerinizi geliştirin. Dezenformasyonu fark edin,
            doğru bilgiye ulaşın ve dijital ayak izinizi bilinçli yönetin.
          </p>
          
          <div className="hero-buttons">
            <Link href="/seviye-sec" className="btn btn-primary btn-lg">
              Eğitime Başla
            </Link>
            <Link href="#moduller" className="btn btn-outline btn-lg">
              Modülleri İncele
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">3</div>
              <div className="hero-stat-label">Yaş Grubu</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">12+</div>
              <div className="hero-stat-label">İnteraktif Modül</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">%100</div>
              <div className="hero-stat-label">Güvenilir İçerik</div>
            </div>
          </div>
        </div>
      </header>

      {/* SEVİYELER SECTION */}
      <section id="seviyeler" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Yaş Grupları</div>
            <h2 className="section-title">Size Özel Eğitim Seviyesi</h2>
            <p className="section-desc">
              Yaş grubunuza ve bilgi seviyenize en uygun içeriklerle medya okuryazarlığı 
              yolculuğunuza hemen başlayın.
            </p>
          </div>

          <div className="levels-grid">
            {/* İlkokul */}
            <div className="level-card level-primary">
              <div className="level-card-icon">
                <Sprout size={40} color="#ffffff" />
              </div>
              <h3 className="level-card-title">İlkokul</h3>
              <p className="level-card-age">7-10 Yaş</p>
              <p className="level-card-desc">
                Temel kavramlar, güvenli internet kullanımı ve dijital dünyanın ilk adımları.
              </p>
              <ul className="level-card-features">
                <li>Oyunlaştırılmış içerikler</li>
                <li>Görsel ağırlıklı öğrenme</li>
                <li>Temel güvenlik kuralları</li>
              </ul>
              <Link href="/seviye-sec" className="btn btn-primary" style={{width: '100%'}}>
                İlkokul Seç
              </Link>
            </div>

            {/* Ortaöğretim */}
            <div className="level-card level-secondary">
              <div className="level-card-icon">
                <Search size={40} color="#ffffff" />
              </div>
              <h3 className="level-card-title">Ortaöğretim</h3>
              <p className="level-card-age">11-14 Yaş</p>
              <p className="level-card-desc">
                Sosyal medya etiği, siber zorbalık ve temel teyit becerileri geliştirme.
              </p>
              <ul className="level-card-features">
                <li>İnteraktif senaryolar</li>
                <li>Sosyal medya simülasyonları</li>
                <li>Eleştirel düşünme egzersizleri</li>
              </ul>
              <Link href="/seviye-sec" className="btn btn-primary" style={{width: '100%', background: 'linear-gradient(135deg, #3b82f6, #2563eb)'}}>
                Ortaöğretim Seç
              </Link>
            </div>

            {/* Yetişkin */}
            <div className="level-card level-tertiary">
              <div className="level-card-icon">
                <GraduationCap size={40} color="#ffffff" />
              </div>
              <h3 className="level-card-title">Yetişkin</h3>
              <p className="level-card-age">15+ Yaş</p>
              <p className="level-card-desc">
                İleri düzey teyit, algoritma okuryazarlığı ve dijital ayak izi yönetimi.
              </p>
              <ul className="level-card-features">
                <li>Gelişmiş teyit araçları</li>
                <li>Derin sahte (deepfake) analizi</li>
                <li>Veri gizliliği yönetimi</li>
              </ul>
              <Link href="/seviye-sec" className="btn btn-primary" style={{width: '100%', background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'}}>
                Yetişkin Seç
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VİDEO TANITIM SECTION */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
            <h2 className="section-title" style={{ marginBottom: '20px' }}>
              Platformu Tanıyın
            </h2>
            <p className="section-desc" style={{ maxWidth: '700px', margin: '0 auto 40px' }}>
              Medya okuryazarlığı eğitimlerimizin nasıl çalıştığını ve size neler kazandıracağını
              kısa tanıtım videomuzda izleyin.
            </p>
            
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button className="btn btn-primary" style={{ width: '80px', height: '80px', borderRadius: '50%', padding: 0 }}>
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODÜLLER SECTION */}
      <section id="moduller" className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Eğitim İçeriği</div>
            <h2 className="section-title">Neler Öğreneceksiniz?</h2>
            <p className="section-desc">
              Kapsamlı modüllerimizle medya okuryazarlığının her alanında yetkinlik kazanın.
            </p>
          </div>

          <div className="modules-grid">
            {modules.map((m, index) => (
              <div key={m.id} className="module-card">
                <div className="module-number">0{index + 1}</div>
                <div className="module-info">
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/moduller" className="btn btn-outline">
              Tüm Modülleri İncele
            </Link>
          </div>
        </div>
      </section>

      {/* ÖZELLİKLER SECTION */}
      <section className="section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3 className="feature-title">Oyunlaştırılmış Öğrenme</h3>
              <p className="feature-desc">
                Sıkıcı teorik dersler yerine interaktif senaryolar, testler ve görevlerle
                eğlenerek öğrenin. Puan toplayın ve rozetler kazanın.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Gelişim Takibi</h3>
              <p className="feature-desc">
                Öğrenme sürecinizi detaylı istatistiklerle takip edin. Hangi konularda
                güçlü, hangilerinde gelişime açık olduğunuzu görün.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Her Cihazda Uyumlu</h3>
              <p className="feature-desc">
                İster bilgisayardan, ister tabletten, isterseniz cep telefonunuzdan
                eğitimlerinize kaldığınız yerden devam edin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VAKA ANALİZLERİ SECTION */}
      <section id="vaka" className="section" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Pratik</div>
            <h2 className="section-title">Gerçek Vaka Analizleri</h2>
            <p className="section-desc">
              Öğrendiklerinizi gerçek hayattan alınmış örnekler üzerinde test edin.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '40px', maxWidth: '800px', margin: '40px auto 0' }}>
            <div className="case-card">
              <div style={{ minWidth: '120px', height: '80px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={32} color="var(--danger-500)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--gray-100)' }}>Sahte İndirim Kampanyası</h3>
                  <span className="case-badge case-badge-fake">Oltalama (Phishing)</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-400)' }}>
                  E-posta yoluyla gelen bu kampanya duyurusundaki manipülasyon tekniklerini ve
                  sahte linkleri nasıl tespit ederdiniz?
                </p>
              </div>
            </div>

            <div className="case-card">
              <div style={{ minWidth: '120px', height: '80px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Video size={32} color="var(--warning-500)" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--gray-100)' }}>Montajlı Siyasi Video</h3>
                  <span className="case-badge case-badge-manipulated">Manipüle Edilmiş</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-400)' }}>
                  Sosyal medyada hızla yayılan bu videodaki kesinti ve bağlamından koparma
                  işaretlerini inceleyin.
                </p>
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/vaka-analizleri" className="btn btn-outline">
              Tüm Vakaları Çöz
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section">
        <div className="container">
          <div className="cta-section">
            <h2 className="cta-title">Dijital Dünyada Bilinçli Adımlar Atın</h2>
            <p className="cta-desc">
              Ücretsiz kayıt olun, seviyenizi belirleyin ve hemen öğrenmeye başlayın.
            </p>
            <Link href="/seviye-sec" className="btn btn-primary btn-lg">
              Ücretsiz Kayıt Ol
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="navbar-logo" style={{ marginBottom: '16px' }}>
                <div className="navbar-logo-icon">M</div>
                MedyaOkur
              </div>
              <p>
                Bireyleri dijital çağın karmaşıklığına karşı güçlendiren, 
                yenilikçi ve etkileşimli medya okuryazarlığı eğitim platformu.
              </p>
            </div>
            
            <div>
              <h4 className="footer-heading">Eğitimler</h4>
              <ul className="footer-links">
                <li><Link href="#">İlkokul Seviyesi</Link></li>
                <li><Link href="#">Ortaöğretim Seviyesi</Link></li>
                <li><Link href="#">Yetişkin Seviyesi</Link></li>
                <li><Link href="#">Eğitmenler İçin</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="footer-heading">Platform</h4>
              <ul className="footer-links">
                <li><Link href="#">Hakkımızda</Link></li>
                <li><Link href="#">Vaka Analizleri</Link></li>
                <li><Link href="#">Teyit Araçları</Link></li>
                <li><Link href="#">S.S.S.</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="footer-heading">İletişim</h4>
              <ul className="footer-links">
                <li><Link href="#">Bize Ulaşın</Link></li>
                <li><Link href="#">Geri Bildirim</Link></li>
                <li><Link href="#">Destek Merkezi</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} MedyaOkur Eğitim Platformu. Tüm hakları saklıdır.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link href="#">Gizlilik Politikası</Link>
              <Link href="#">Kullanım Koşulları</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
