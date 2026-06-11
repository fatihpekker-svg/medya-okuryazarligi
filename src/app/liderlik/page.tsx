"use client";

import { useProgress } from "@/context/ProgressContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, Medal, Star, Flame, User as UserIcon, Crown } from "lucide-react";

interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  streak: number;
  badges: number;
  isCurrentUser?: boolean;
}

const mockUsers: LeaderboardUser[] = [
  { id: "u1", name: "Ayşe K.", xp: 3450, streak: 12, badges: 14 },
  { id: "u2", name: "Mehmet D.", xp: 2800, streak: 8, badges: 11 },
  { id: "u3", name: "Zeynep Y.", xp: 2150, streak: 5, badges: 8 },
  { id: "u4", name: "Caner T.", xp: 1900, streak: 15, badges: 7 },
  { id: "u5", name: "Elif S.", xp: 1500, streak: 3, badges: 6 },
  { id: "u6", name: "Burak A.", xp: 1250, streak: 2, badges: 5 },
  { id: "u7", name: "Selin Ç.", xp: 980, streak: 4, badges: 4 },
  { id: "u8", name: "Demir Y.", xp: 820, streak: 1, badges: 3 },
  { id: "u9", name: "Cemre N.", xp: 600, streak: 2, badges: 2 },
  { id: "u10", name: "Ali Rıza B.", xp: 450, streak: 1, badges: 1 },
  { id: "u11", name: "Gizem K.", xp: 200, streak: 1, badges: 1 },
  { id: "u12", name: "Umut F.", xp: 100, streak: 0, badges: 0 },
];

export default function LiderlikPage() {
  const { state, loaded } = useProgress();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    if (!loaded) return;

    const currentUser: LeaderboardUser = {
      id: "current-user",
      name: state.userName === "Misafir Okur" ? "Sen (Misafir)" : `${state.userName} (Sen)`,
      xp: state.xp,
      streak: state.streak,
      badges: state.earnedBadges.length,
      isCurrentUser: true,
    };

    const combinedUsers = [...mockUsers, currentUser];
    // Sort by XP descending
    combinedUsers.sort((a, b) => b.xp - a.xp);
    
    setLeaderboard(combinedUsers);
  }, [loaded, state]);

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--gray-950)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "var(--primary-400)", fontSize: "1.2rem", fontWeight: 600 }}>Yükleniyor...</div>
      </div>
    );
  }

  const getRankStyle = (index: number) => {
    if (index === 0) return { icon: <Crown size={16} />, color: "#fbbf24", bg: "rgba(251, 191, 36, 0.15)" }; // Gold
    if (index === 1) return { icon: "2", color: "#94a3b8", bg: "rgba(148, 163, 184, 0.15)" }; // Silver
    if (index === 2) return { icon: "3", color: "#b45309", bg: "rgba(180, 83, 9, 0.15)" }; // Bronze
    return { icon: `${index + 1}`, color: "var(--gray-500)", bg: "transparent" };
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
            <Trophy size={20} color="var(--warning-400)" /> Liderlik Tablosu
          </span>
          <div className="navbar-cta">
            <span style={{ fontSize: "0.85rem", color: "var(--warning-400)", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}><Star size={14} /> {state.xp} XP</span>
          </div>
        </div>
      </header>

      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Header Section */}
        <div className="section-header" style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: "16px", animation: "float 3s ease-in-out infinite" }}><Medal size={64} color="var(--primary-500)" /></div>
          <h1 className="section-title" style={{ fontSize: "2.2rem" }}>Haftalık Sıralama</h1>
          <p className="section-desc" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Diğer MedyaOkur üyeleriyle yarışın! Dersleri tamamlayın, vakaları çözün ve XP kazanarak liderlik tablosunda zirveye yerleşin.
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="glass-card animate-fade-in-up" style={{ padding: "0", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)" }}>
          {/* Table Header */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "60px 1fr 100px 100px 120px", 
            padding: "16px 24px", 
            background: "rgba(255,255,255,0.7)", 
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            fontSize: "0.85rem",
            color: "var(--gray-400)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}>
            <div style={{ textAlign: "center" }}>Sıra</div>
            <div>Okuryazar</div>
            <div style={{ textAlign: "center" }}>Seri</div>
            <div style={{ textAlign: "center" }}>Rozet</div>
            <div style={{ textAlign: "right" }}>XP Puanı</div>
          </div>

          {/* Table Body */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {leaderboard.map((user, index) => {
              const rankStyle = getRankStyle(index);
              const isTop3 = index < 3;

              return (
                <div 
                  key={user.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 100px 100px 120px",
                    padding: "16px 24px",
                    alignItems: "center",
                    borderBottom: index === leaderboard.length - 1 ? "none" : "1px solid rgba(255,255,255,0.03)",
                    background: user.isCurrentUser 
                      ? "linear-gradient(90deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))" 
                      : index % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                    borderLeft: user.isCurrentUser ? "4px solid var(--primary-500)" : "4px solid transparent",
                    transition: "var(--transition-fast)",
                    boxShadow: user.isCurrentUser ? "inset 0 0 20px rgba(59, 130, 246, 0.05)" : "none",
                  }}
                  className={user.isCurrentUser ? "" : "hover-highlight"}
                >
                  {/* Rank */}
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: rankStyle.bg,
                      color: rankStyle.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: isTop3 ? "1.2rem" : "0.95rem",
                      boxShadow: isTop3 ? `0 0 10px ${rankStyle.color}40` : "none"
                    }}>
                      {rankStyle.icon}
                    </div>
                  </div>

                  {/* Name */}
                  <div style={{ fontWeight: user.isCurrentUser ? 800 : 600, color: user.isCurrentUser ? "white" : "var(--gray-300)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ 
                      width: "36px", 
                      height: "36px", 
                      borderRadius: "50%", 
                      background: user.isCurrentUser ? "var(--gradient-primary)" : "var(--gray-800)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem"
                    }}>
                      <UserIcon size={18} color={user.isCurrentUser ? "var(--gray-100)" : "var(--gray-400)"} />
                    </div>
                    {user.name}
                  </div>

                  {/* Streak */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px", color: "var(--gray-300)", fontWeight: 600, fontSize: "0.95rem" }}>
                    <Flame size={16} color="var(--warning-400)" /> {user.streak}
                  </div>

                  {/* Badges */}
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "4px", color: "var(--gray-300)", fontWeight: 600, fontSize: "0.95rem" }}>
                    <Trophy size={16} color="var(--gray-400)" /> {user.badges}
                  </div>

                  {/* XP */}
                  <div style={{ textAlign: "right", color: user.isCurrentUser ? "var(--warning-400)" : "white", fontWeight: 800, fontSize: "1.1rem" }}>
                    {user.xp.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current User Fixed Status Bar (Optional to add stickiness, but layout looks good inline) */}
        <div style={{ marginTop: "24px", textAlign: "center", color: "var(--gray-500)", fontSize: "0.85rem" }}>
          Sıralamalar her hafta Pazartesi günü sıfırlanır. Genel rozet ve XP puanınız kalıcıdır.
        </div>
      </div>

      <style jsx>{`
        .hover-highlight:hover {
          background: rgba(255, 255, 255, 0.03) !important;
        }
      `}</style>
    </div>
  );
}
