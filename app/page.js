"use client";

import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "A", title: "프로필", en: "Profile", items: [
    { n: 1,  l: "프로필 사진",   d: "본인 실사 사진 또는 AI 생성 프로필 이미지 (고해상도 권장)" },
    { n: 2,  l: "이름 (실명)",   d: "반드시 실명 사용 (필수)" },
    { n: 3,  l: "한 줄 소개",   d: '본인을 한 문장으로 표현 (예: "AI로 부동산 분석을 자동화하는 금융 전문가")' },
    { n: 4,  l: "학력",          d: "최종 학력 및 전공" },
    { n: 5,  l: "경력 / 이력",  d: "AI 이전 커리어 포함 — 기존 전문성과 AI의 결합 포인트를 강조" },
  ]},
  { id: "B", title: "AI 역량", en: "AI Competency", items: [
    { n: 6,  l: "AI 활용 경험", d: "어떤 AI 도구를 활용했는지, 어떤 결과물을 만들었는지 구체적으로 기술" },
    { n: 7,  l: "대표 프로젝트", d: "포트폴리오 형태로 구성 — 스크린샷, 데모 링크, 설명 포함" },
    { n: 8,  l: "활용 AI 도구", d: "Claude, ChatGPT, Gemini, Cursor, Midjourney 등 태그 형태로 표시" },
  ]},
  { id: "C", title: "비전 & 목표", en: "Vision & Goals", items: [
    { n: 9,  l: "하고 싶은 일",  d: "앞으로 AI를 활용하여 하고 싶은 일 — 구체적 계획" },
    { n: 10, l: "미래 비전",     d: "3~5년 후 목표, 궁극적으로 이루고자 하는 것" },
    { n: 11, l: "관심 / 협업 분야", d: "관심 있는 분야, 협업하고 싶은 영역" },
  ]},
  { id: "D", title: "상품 & 서비스", en: "Products & Services", items: [
    { n: 12, l: "저서 / 출판물", d: "책 표지 이미지 + 판매 링크 (교보문고, 예스24, 아마존 등)" },
    { n: 13, l: "판매 상품",     d: "디지털 상품, 템플릿, 온라인 강의 등 + 결제/판매 링크 또는 사이트 내 직접 판매 페이지" },
    { n: 14, l: "제공 서비스",   d: "컨설팅, 멘토링, 강연, 개발 의뢰 등 + 문의/예약 링크 또는 직접 예약 폼" },
  ]},
  { id: "E", title: "AI 아바타 챗봇", en: "AI Avatar Chatbot", items: [
    { n: 15, l: "AI 챗봇",       d: "본인을 대신하는 AI 챗봇 탑재 — 방문자가 이 전문가에 대해 질문 가능", special: true },
    { n: 16, l: "챗봇 페르소나", d: "본인의 전문성, 말투, 관심사를 반영한 캐릭터 설정", special: true },
  ]},
  { id: "F", title: "콘텐츠 & 소셜", en: "Content & Social", items: [
    { n: 17, l: "블로그 / 게시판", d: "AI 인사이트, 학습 기록, 활동 공유 공간" },
    { n: 18, l: "SNS / 채널 링크", d: "YouTube, Instagram, LinkedIn, 브런치, X(Twitter) 등" },
  ]},
  { id: "G", title: "회원가입 & 인터랙션", en: "Membership & Interaction", items: [
    { n: 19, l: "회원가입 / 로그인", d: "Supabase Auth 등을 활용한 회원 기능 구현" },
    { n: 20, l: "방명록 / 댓글",     d: "방문자 인터랙션 기능 — 방명록, 댓글, 후기 등" },
    { n: 21, l: "문의 / 연락 폼",   d: "이메일 연동 문의 폼 또는 카카오톡 채널 연결" },
  ]},
  { id: "H", title: "배포", en: "Deployment", items: [
    { n: 22, l: "코드 저장소",    d: "GitHub 저장소에 소스코드 업로드 (Public 또는 Private)" },
    { n: 23, l: "배포 플랫폼",    d: "Vercel 등 배포 플랫폼을 통한 배포 — GitHub 연동 자동 배포 권장, 무료 플랜 활용 가능" },
    { n: 24, l: "도메인",         d: "배포 플랫폼 기본 도메인 또는 커스텀 도메인 연결 (선택)" },
  ]},
  { id: "I", title: "AX-On 연동", en: "Platform Integration", items: [
    { n: 25, l: "프로필 메타데이터", d: "AX-On Platform에 노출될 표준 JSON 데이터 제공 — 이름, 소개, 태그, 썸네일 URL, 사이트 URL" },
    { n: 26, l: "사이트 URL 등록",  d: "완성된 미니 풀스택 웹사이트의 배포 URL을 AX-On Platform에 직접 등록" },
  ]},
];


function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Card({ item, delay }) {
  const [ref, vis] = useVisible(0.1);
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: item.special
          ? "linear-gradient(135deg,rgba(21,101,255,0.13),rgba(0,212,255,0.07))"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${
          hov
            ? item.special ? "rgba(0,212,255,0.5)" : "rgba(77,139,255,0.5)"
            : item.special ? "rgba(0,212,255,0.28)" : "rgba(77,139,255,0.16)"
        }`,
        borderRadius: 14,
        padding: "20px 22px",
        transition: "all 0.45s cubic-bezier(.16,1,.3,1)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(22px)",
        transitionDelay: `${delay}s`,
        boxShadow: hov
          ? item.special ? "0 0 28px rgba(0,212,255,0.2)" : "0 0 24px rgba(21,101,255,0.25)"
          : "none",
        cursor: "default",
      }}
    >
      <div style={{
        fontSize: "0.65rem", fontWeight: 700, letterSpacing: 2,
        color: "#4d8bff", marginBottom: 10,
        display: "flex", alignItems: "center", gap: 6,
      }}>
        <span style={{
          width: 5, height: 5, borderRadius: "50%",
          background: "#00d4ff", boxShadow: "0 0 6px #00d4ff",
          display: "inline-block",
        }} />
        NO.{String(item.n).padStart(2, "0")}
      </div>
      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#e8eef8", marginBottom: 8 }}>
        {item.l}
      </div>
      <div style={{ fontSize: "0.8rem", color: "#7a90b8", lineHeight: 1.75 }}>
        {item.d}
      </div>
    </div>
  );
}

function SectionBlock({ sec }) {
  const [ref, vis] = useVisible(0.1);
  return (
    <div id={`sec-${sec.id}`} style={{ marginBottom: 8 }}>
      <div
        ref={ref}
        style={{
          display: "flex", alignItems: "center", gap: 14,
          marginBottom: 20, paddingTop: 64,
          opacity: vis ? 1 : 0,
          transform: vis ? "none" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <span style={{
          fontFamily: "monospace", fontSize: "0.68rem", fontWeight: 700,
          letterSpacing: 3, color: "#00d4ff",
          background: "rgba(0,212,255,0.08)",
          border: "1px solid rgba(0,212,255,0.22)",
          padding: "4px 10px", borderRadius: 5,
        }}>
          {sec.id}
        </span>
        <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#e8eef8" }}>
          {sec.title}
          <span style={{ fontSize: "0.74rem", color: "#7a90b8", marginLeft: 8, fontWeight: 400 }}>
            {sec.en}
          </span>
        </span>
        <div style={{
          flex: 1, height: 1,
          background: "linear-gradient(to right,rgba(77,139,255,0.22),transparent)",
        }} />
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
        gap: 12,
      }}>
        {sec.items.map((item, i) => (
          <Card key={item.n} item={item} delay={i * 0.07} />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [scrollPct, setScrollPct] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const pct =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      setScrollPct(pct);
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(`sec-${s.id}`);
        if (el) {
          const mid = window.scrollY + window.innerHeight / 2;
          if (mid >= el.offsetTop) setActiveIdx(i);
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      background: "#050d1a", minHeight: "100vh",
      color: "#e8eef8",
      fontFamily: "'Noto Sans KR', system-ui, sans-serif",
      overflowX: "hidden", position: "relative",
    }}>

      {/* Grid BG */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage:
          "linear-gradient(rgba(21,101,255,0.04) 1px,transparent 1px)," +
          "linear-gradient(90deg,rgba(21,101,255,0.04) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Orbs */}
      <div style={{
        position: "fixed", top: -120, left: -120,
        width: 480, height: 480, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(21,101,255,0.16),transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: 60, right: -80,
        width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle,rgba(0,212,255,0.1),transparent 70%)",
        filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
      }} />

      {/* Scroll Progress */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: 2, zIndex: 9999,
        width: `${scrollPct}%`,
        background: "linear-gradient(to right,#1565ff,#00d4ff)",
        boxShadow: "0 0 10px #00d4ff",
        transition: "width 0.1s",
      }} />

      {/* Floating Nav */}
      <div style={{
        position: "fixed", right: 20, top: "50%",
        transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 8, zIndex: 100,
      }}>
        {SECTIONS.map((s, i) => (
          <div
            key={s.id}
            onClick={() =>
              document.getElementById(`sec-${s.id}`)?.scrollIntoView({ behavior: "smooth" })
            }
            title={s.title}
            style={{
              width: 7, height: 7, borderRadius: "50%", cursor: "pointer",
              background: i === activeIdx ? "#00d4ff" : "rgba(77,139,255,0.28)",
              border: "1px solid rgba(77,139,255,0.4)",
              boxShadow: i === activeIdx ? "0 0 8px #00d4ff" : "none",
              transform: i === activeIdx ? "scale(1.5)" : "scale(1)",
              transition: "all 0.25s",
            }}
          />
        ))}
      </div>

      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 880, margin: "0 auto", padding: "0 20px 80px",
      }}>

        {/* HERO */}
        <section style={{
          minHeight: "92vh", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "80px 0 60px", position: "relative",
        }}>
          {/* Profile Photo */}
          <div style={{
            marginBottom: 32,
            display: "flex", alignItems: "center", gap: 24,
          }}>
            <div style={{
              width: 88, height: 88, borderRadius: "50%",
              border: "2px solid rgba(0,212,255,0.4)",
              boxShadow: "0 0 24px rgba(0,212,255,0.2), 0 0 0 6px rgba(0,212,255,0.06)",
              overflow: "hidden", flexShrink: 0,
              background: "rgba(21,101,255,0.1)",
            }}>
              <img
                src="/lks_photo.jpg"
                alt="Profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
          <p style={{
            fontFamily: "monospace", fontSize: "0.7rem",
            letterSpacing: 4, textTransform: "uppercase",
            color: "#00d4ff", marginBottom: 24,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: "#00d4ff" }} />
            AX-On Platform · 2026
          </p>
          <h1 style={{
            fontSize: "clamp(2.6rem,8vw,5rem)", fontWeight: 900,
            lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 8,
          }}>
            <span style={{ display: "block", color: "#e8eef8" }}>AI 전문가</span>
            <span style={{
              display: "block",
              background: "linear-gradient(90deg,#1565ff,#00d4ff,#4d8bff,#1565ff)",
              backgroundSize: "300%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "gradShift 4s ease infinite",
            }}>
              미니 풀스택
            </span>
          </h1>
          <p style={{
            fontSize: "clamp(0.88rem,2.2vw,1.05rem)", color: "#7a90b8",
            lineHeight: 1.85, maxWidth: 480, margin: "24px 0 44px", fontWeight: 300,
          }}>
            개인별 웹사이트 항목 기준 가이드<br />
            30명+ AI 전문가 풀의 디지털 아이덴티티를 정의합니다.
          </p>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[["26", "Total Items"], ["09", "Sections"], ["30+", "AI Experts"]].map(([n, l]) => (
              <div key={l}>
                <div style={{
                  fontFamily: "monospace", fontSize: "1.9rem", fontWeight: 700,
                  background: "linear-gradient(135deg,#4d8bff,#00d4ff)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {n}
                </div>
                <div style={{ fontSize: "0.68rem", color: "#7a90b8", letterSpacing: 1, marginTop: 3 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
          {/* Scroll hint */}
          <div style={{
            position: "absolute", bottom: 32, left: 0,
            display: "flex", alignItems: "center", gap: 10,
            fontSize: "0.68rem", letterSpacing: 2, color: "#7a90b8",
            textTransform: "uppercase",
            animation: "bounce 2s ease infinite",
          }}>
            Scroll
            <div style={{
              width: 1, height: 36,
              background: "linear-gradient(to bottom,#7a90b8,transparent)",
            }} />
          </div>
        </section>

        {/* SECTIONS */}
        {SECTIONS.map((sec) => (
          <SectionBlock key={sec.id} sec={sec} />
        ))}

      </div>

      <footer style={{
        position: "relative", zIndex: 2,
        borderTop: "1px solid rgba(77,139,255,0.14)",
        textAlign: "center", padding: "28px 20px",
        fontFamily: "monospace", fontSize: "0.68rem",
        letterSpacing: 2, color: "#7a90b8",
      }}>
        AX-On Platform · AI Expert Portfolio Guide · 2026
      </footer>
    </div>
  );
}
