'use client';

import { useState, useEffect, useMemo } from 'react';

type Token = {
  t?: string;
  v: string;
};

type CodeLine = {
  tokens: Token[];
};

const CODE_LINES: CodeLine[] = [
  { tokens: [{ t: "com", v: "// Привет! Я ментор Алексей" }] },
  { tokens: [{ t: "com", v: "// Сегодня делаем компонент карточки" }] },
  { tokens: [{ v: "" }] },
  { tokens: [
    { t: "kw", v: "import" }, { v: " React " }, { t: "kw", v: "from" },
    { v: " " }, { t: "str", v: "\"react\"" }, { t: "pun", v: ";" },
  ]},
  { tokens: [{ v: "" }] },
  { tokens: [
    { t: "kw", v: "export" }, { v: " " }, { t: "kw", v: "function" }, { v: " " },
    { t: "fn", v: "MentorCard" }, { t: "pun", v: "({" }, { v: " name" },
    { t: "pun", v: "," }, { v: " stack " }, { t: "pun", v: "})" }, { v: " " },
    { t: "pun", v: "{" },
  ]},
  { tokens: [
    { v: "  " }, { t: "kw", v: "return" }, { v: " " }, { t: "pun", v: "(" },
  ]},
  { tokens: [
    { v: "    " }, { t: "pun", v: "<" }, { t: "tag", v: "article" },
    { v: " " }, { t: "pr", v: "className" }, { t: "pun", v: "=" },
    { t: "str", v: "\"card\"" }, { t: "pun", v: ">" },
  ]},
  { tokens: [
    { v: "      " }, { t: "pun", v: "<" }, { t: "tag", v: "h3" },
    { t: "pun", v: ">{" }, { v: "name" }, { t: "pun", v: "}</" },
    { t: "tag", v: "h3" }, { t: "pun", v: ">" },
  ]},
  { tokens: [
    { v: "      " }, { t: "pun", v: "<" }, { t: "tag", v: "p" },
    { t: "pun", v: ">{" }, { v: "stack" }, { t: "pun", v: "?." },
    { t: "fn", v: "join" }, { t: "pun", v: "(" }, { t: "str", v: "\" · \"" },
    { t: "pun", v: ")}</" }, { t: "tag", v: "p" }, { t: "pun", v: ">" },
  ]},
  { tokens: [
    { v: "    " }, { t: "pun", v: "</" }, { t: "tag", v: "article" },
    { t: "pun", v: ">" },
  ]},
  { tokens: [{ v: "  " }, { t: "pun", v: ");" }] },
  { tokens: [{ t: "pun", v: "}" }] },
];

function tokenLen(line: CodeLine): number {
  return line.tokens.reduce((s, tk) => s + tk.v.length, 0);
}

function totalLen(): number {
  return CODE_LINES.reduce((s, l) => s + tokenLen(l) + 1, 0);
}

export default function AnimatedIDE() {
  const [chars, setChars] = useState(0);
  const total = useMemo(totalLen, []);

  useEffect(() => {
    let raf: number;
    let last = performance.now();
    let charsLocal = 0;
    let pauseUntil = 0;

    const tick = (now: number) => {
      if (now < pauseUntil) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const dt = now - last;
      last = now;
      const speed = 32;
      charsLocal += (dt / 1000) * speed;
      if (charsLocal >= total) {
        charsLocal = total;
        pauseUntil = now + 2200;
        setTimeout(() => {
          charsLocal = 0;
          setChars(0);
          last = performance.now();
        }, 2400);
      }
      setChars(Math.floor(charsLocal));
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  let remaining = chars;
  const renderedLines: JSX.Element[] = [];
  let cursorPlaced = false;

  for (let i = 0; i < CODE_LINES.length; i++) {
    const line = CODE_LINES[i];
    const lineLen = tokenLen(line);
    const showFull = remaining >= lineLen;

    if (remaining <= 0 && !cursorPlaced) {
      renderedLines.push(
        <span key={i} className="ln">
          {i === 0 ? <span className="cursor" /> : null}
        </span>
      );
      continue;
    }

    if (showFull) {
      const tokens = line.tokens.map((tk, j) => (
        <span key={j} className={tk.t ? `tok-${tk.t}` : ""}>{tk.v}</span>
      ));
      remaining -= lineLen;
      remaining -= 1;
      renderedLines.push(
        <span key={i} className="ln">
          {tokens}
          {remaining === -1 && !cursorPlaced ? <span className="cursor" /> : null}
        </span>
      );
      if (remaining === -1) cursorPlaced = true;
    } else {
      let left = remaining;
      const tokens: JSX.Element[] = [];
      for (let j = 0; j < line.tokens.length; j++) {
        const tk = line.tokens[j];
        if (left <= 0) break;
        const v = tk.v.slice(0, left);
        tokens.push(
          <span key={j} className={tk.t ? `tok-${tk.t}` : ""}>{v}</span>
        );
        left -= tk.v.length;
      }
      cursorPlaced = true;
      remaining = 0;
      renderedLines.push(
        <span key={i} className="ln">
          {tokens}
          <span className="cursor" />
        </span>
      );
    }
  }

  while (renderedLines.length < CODE_LINES.length) {
    renderedLines.push(
      <span key={`pad-${renderedLines.length}`} className="ln">&nbsp;</span>
    );
  }

  return (
    <div className="ide">
      <div className="ide-titlebar">
        <div className="ide-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="ide-tabs">
          <div className="ide-tab active">
            <span className="lang-dot" />
            MentorCard.jsx
          </div>
          <div className="ide-tab css">
            <span className="lang-dot" />
            card.css
          </div>
        </div>
      </div>
      <div className="ide-body">
        <div className="ide-gutter">
          {CODE_LINES.map((_, i) => <span key={i}>{i + 1}</span>)}
        </div>
        <div className="ide-code">{renderedLines}</div>
      </div>
      <div className="ide-float ide-float-1">
        <div className="av" />
        <div>
          <strong>Алексей · ментор</strong>
          <div className="sub">live · 14:32</div>
        </div>
      </div>
      <div className="ide-float ide-float-2">
        <div className="av" />
        <div>
          <strong>+12 в сообществе</strong>
          <div className="sub">смотрят сессию</div>
        </div>
      </div>
    </div>
  );
}
