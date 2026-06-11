"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LevelType = "primary" | "secondary" | "tertiary" | "";

export interface ProgressState {
  level: LevelType;
  userName: string;
  xp: number;
  streak: number;
  unlockedModules: number[]; // e.g. [1, 2]
  completedLessons: string[]; // e.g. ["1-1", "1-2"]
  completedQuizzes: number[]; // e.g. [1]
  earnedBadges: string[]; // e.g. ["Medya Dedektifi", "İlk Haber Çözüldü"]
  lastActiveDate: string | null;
}

interface ProgressContextType {
  state: ProgressState;
  loaded: boolean;
  selectLevel: (level: LevelType) => void;
  setUserName: (name: string) => void;
  addXP: (amount: number) => void;
  completeLesson: (moduleId: number, lessonId: string) => void;
  completeQuiz: (moduleId: number) => void;
  earnBadge: (badgeName: string) => void;
  resetProgress: () => void;
}

const DEFAULT_STATE: ProgressState = {
  level: "",
  userName: "Misafir Okur",
  xp: 0,
  streak: 1,
  unlockedModules: [1], // Modül 1 varsayılan olarak açık
  completedLessons: [],
  completedQuizzes: [],
  earnedBadges: [],
  lastActiveDate: null,
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  // localStorage'dan yükle
  useEffect(() => {
    const saved = localStorage.getItem("medya_okur_progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Streak kontrolü
        const today = new Date().toDateString();
        let newStreak = parsed.streak || 1;
        if (parsed.lastActiveDate && parsed.lastActiveDate !== today) {
          const lastDate = new Date(parsed.lastActiveDate);
          const diffTime = Math.abs(new Date().getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1; // streak bozuldu
          }
        }
        setState({
          ...parsed,
          streak: newStreak,
          lastActiveDate: today,
        });
      } catch (e) {
        console.error("Progress parsing error", e);
      }
    }
    setLoaded(true);
  }, []);

  // State değiştikçe localStorage'a kaydet
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("medya_okur_progress", JSON.stringify(state));
    }
  }, [state, loaded]);

  const selectLevel = (level: LevelType) => {
    setState((prev) => ({
      ...prev,
      level,
      // Seviye seçildiğinde ilk badge'i verelim
      earnedBadges: prev.earnedBadges.includes("İlk Adım")
        ? prev.earnedBadges
        : [...prev.earnedBadges, "İlk Adım"],
      xp: prev.xp === 0 ? 50 : prev.xp, // Seviye seçimine 50 XP
    }));
  };

  const setUserName = (userName: string) => {
    setState((prev) => ({ ...prev, userName }));
  };

  const addXP = (amount: number) => {
    setState((prev) => ({ ...prev, xp: prev.xp + amount }));
  };

  const completeLesson = (moduleId: number, lessonId: string) => {
    setState((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;

      const newCompletedLessons = [...prev.completedLessons, lessonId];
      let newXP = prev.xp + 20; // Her ders tamamlama 20 XP
      let newBadges = [...prev.earnedBadges];

      if (newCompletedLessons.length === 1 && !newBadges.includes("Dedektif Adayı")) {
        newBadges.push("Dedektif Adayı");
        newXP += 30;
      }

      return {
        ...prev,
        completedLessons: newCompletedLessons,
        xp: newXP,
        earnedBadges: newBadges,
      };
    });
  };

  const completeQuiz = (moduleId: number) => {
    setState((prev) => {
      const isAlreadyCompleted = prev.completedQuizzes.includes(moduleId);
      const newCompletedQuizzes = isAlreadyCompleted
        ? prev.completedQuizzes
        : [...prev.completedQuizzes, moduleId];

      // Bir sonraki modülün kilidini aç (toplam 10 modül var)
      const nextModuleId = moduleId + 1;
      const newUnlockedModules = prev.unlockedModules.includes(nextModuleId) || nextModuleId > 10
        ? prev.unlockedModules
        : [...prev.unlockedModules, nextModuleId];

      let newXP = prev.xp + (isAlreadyCompleted ? 0 : 100); // Quiz tamamlama 100 XP
      let newBadges = [...prev.earnedBadges];

      // Modüle göre rozet ver
      const moduleBadges: Record<number, string> = {
        1: "Medya Kaşifi",
        2: "Haber Analisti",
        3: "Dezenformasyon Kalkanı",
        4: "Algoritma Bükücü",
        5: "Görsel Dedektif",
        6: "İkna Savar",
        7: "Siber Gardiyan",
        8: "Etik Üretici",
        9: "RTÜK Denetçisi",
        10: "Kriz Uzmanı",
      };

      const badgeForThisModule = moduleBadges[moduleId];
      if (badgeForThisModule && !newBadges.includes(badgeForThisModule)) {
        newBadges.push(badgeForThisModule);
        newXP += 50; // Rozet ödülü 50 XP
      }

      // 10 Modül de bittiyse "Medya Ustası" rozeti
      if (newCompletedQuizzes.length === 10 && !newBadges.includes("Medya Ustası")) {
        newBadges.push("Medya Ustası");
        newXP += 500;
      }

      return {
        ...prev,
        completedQuizzes: newCompletedQuizzes,
        unlockedModules: newUnlockedModules,
        xp: newXP,
        earnedBadges: newBadges,
      };
    });
  };

  const earnBadge = (badgeName: string) => {
    setState((prev) => {
      if (prev.earnedBadges.includes(badgeName)) return prev;
      return {
        ...prev,
        earnedBadges: [...prev.earnedBadges, badgeName],
        xp: prev.xp + 50, // Her özel rozet 50 XP kazandırır
      };
    });
  };

  const resetProgress = () => {
    setState(DEFAULT_STATE);
  };

  return (
    <ProgressContext.Provider
      value={{
        state,
        loaded,
        selectLevel,
        setUserName,
        addXP,
        completeLesson,
        completeQuiz,
        earnBadge,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
