import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Flame } from "lucide-react";

function floor(n) {
  return Math.floor(n);
}

function num(n) {
  if (n === "" || n === null || n === undefined) return 0;
  const v = typeof n === "string" ? Number(n) : n;
  return Number.isFinite(v) ? v : 0;
}

function fmt(n) {
  return new Intl.NumberFormat("en-US").format(Math.floor(n));
}

export default function FairylandDamageCalculator() {
  const [weaponDmg, setWeaponDmg] = useState(900);
  const [axeSkill, setAxeSkill] = useState(200);
  const [humanPower, setHumanPower] = useState(600);
  const [bonusDmg, setBonusDmg] = useState(0);
  const [petPower, setPetPower] = useState(2000);
  const [godGuardian, setGodGuardian] = useState(225);
  const [smallFlameMult, setSmallFlameMult] = useState(2.45);
  const [bigFlameMult, setBigFlameMult] = useState(2.55);
  const [autoFlameByGuardian, setAutoFlameByGuardian] = useState(true);
  const [elementBonus, setElementBonus] = useState(1.5);
  const [calib, setCalib] = useState(0);

  const presets = [
    {
      label: "📊 測試組 #1 (900,192,800,0,2000,251)",
      values: { weaponDmg: 900, axeSkill: 192, humanPower: 800, bonusDmg: 0, petPower: 2000, godGuardian: 251 }
    },
    {
      label: "📊 測試組 #2 (900,200,600,0,2000,225)",
      values: { weaponDmg: 900, axeSkill: 200, humanPower: 600, bonusDmg: 0, petPower: 2000, godGuardian: 225 }
    }
  ];

  function applyPreset(v) {
    setWeaponDmg(v.weaponDmg);
    setAxeSkill(v.axeSkill);
    setHumanPower(v.humanPower);
    setBonusDmg(v.bonusDmg);
    setPetPower(v.petPower);
    setGodGuardian(v.godGuardian);
  }

  const beastMultRaw = useMemo(() => 4 + num(axeSkill) * 0.02, [axeSkill]);
  const beastMult = useMemo(() => beastMultRaw + num(calib), [beastMultRaw, calib]);

  const smallFlameAuto = useMemo(() => 2.32 + 0.005 * (num(godGuardian) - 225), [godGuardian]);
  const bigFlameAuto = useMemo(() => 2.42 + 0.005 * (num(godGuardian) - 225), [godGuardian]);
  const smallFlameEff = autoFlameByGuardian ? smallFlameAuto : num(smallFlameMult);
  const bigFlameEff = autoFlameByGuardian ? bigFlameAuto : num(bigFlameMult);

  const baseSurface = floor(num(weaponDmg) * (1 + num(axeSkill) / 50)) + num(humanPower) * 2 + num(bonusDmg);
  const surface = baseSurface;
  const beastSurface = floor((surface - num(bonusDmg)) * (1 + num(petPower) / 200)) + 1 + num(bonusDmg);

  function skillCalc(skillMult) {
    const origin = floor(beastSurface * beastMult * skillMult);
    const elemental = floor(origin * elementBonus);
    return { origin, elemental };
  }

  const small = skillCalc(smallFlameEff);
  const big = skillCalc(bigFlameEff);

  return (
    <div style={{ background: "#f8f8f8", color: "#000", minHeight: "100vh", padding: "2rem" }}>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
      >
        <Calculator size={24} /> 童話Online 傷害計算器
      </motion.h1>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p.values)}
            style={{
              padding: "0.4rem 0.8rem",
              background: "#eee",
              border: "1px solid #ccc",
              borderRadius: 6,
              cursor: "pointer"
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
        <Field label="武器傷害" value={weaponDmg} onChange={setWeaponDmg} />
        <Field label="斧技" value={axeSkill} onChange={setAxeSkill} />
        <Field label="人力" value={humanPower} onChange={setHumanPower} />
        <Field label="追加傷害" value={bonusDmg} onChange={setBonusDmg} />
        <Field label="武化寵力" value={petPower} onChange={setPetPower} />
        <Field label="神守等級" value={godGuardian} onChange={setGodGuardian} />
        <Stat title="獸王倍率（含校準）" value={beastMult.toFixed(3)} />
        <Field label={`小火刀倍率${autoFlameByGuardian ? "（自動）" : ""}`} value={Number(smallFlameEff.toFixed(2))} onChange={setSmallFlameMult} disabled={autoFlameByGuardian} />
        <Field label={`大火刀倍率${autoFlameByGuardian ? "（自動）" : ""}`} value={Number(bigFlameEff.toFixed(2))} onChange={setBigFlameMult} disabled={autoFlameByGuardian} />
        <Check label="根據神守自動計算火刀倍率" checked={autoFlameByGuardian} onChange={setAutoFlameByGuardian} />
        <Field label="屬性修正(屬剋倍率)" value={elementBonus} onChange={setElementBonus} />
        <Field label="校準係數(加到獸王倍率)" value={calib} onChange={setCalib} />
      </div>

      <div style={{ marginTop: "2rem", display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
        <Stat title="表傷" value={fmt(baseSurface)} />
        <Stat title="武化表傷" value={fmt(beastSurface)} />
        <Stat title="獸王倍率（含校準）" value={beastMult.toFixed(3)} />
        <Stat title="小火刀倍率" value={smallFlameEff.toFixed(2)} />
        <Stat title="大火刀倍率" value={bigFlameEff.toFixed(2)} />
      </div>

      <div style={{ marginTop: "2rem", display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <Skill title="小火刀" data={small} />
        <Skill title="大火刀" data={big} />
      </div>

      <footer style={{ marginTop: "3rem", textAlign: "center", color: "#555", fontSize: "0.9rem" }}>
        📝 Credit: Special thanks to Wilson Lee for providing the original formula reference
      </footer>
    </div>
  );
}

function Field({ label, value, onChange, disabled = false }) {
  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      onChange("");
    } else {
      onChange(Number(val));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ fontSize: "0.9rem", marginBottom: 4 }}>{label}</label>
      <input
        type="number"
        value={value === "" ? "" : value}
        disabled={disabled}
        onChange={handleChange}
        style={{ padding: "0.4rem 0.6rem", border: "1px solid #ccc", borderRadius: 6, fontSize: "1rem", background: disabled ? "#eee" : "#fff" }}
      />
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: "1rem", background: "white" }}>
      <div style={{ fontSize: "0.9rem", color: "#666" }}>{title}</div>
      <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>{value}</div>
    </div>
  );
}

function Skill({ title, data }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: "1rem", background: "white" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <Flame size={16} /> {title}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: "0.8rem", color: "#666" }}>獸王原始傷害</div>
          <div style={{ fontWeight: 600 }}>{fmt(data.origin)}</div>
        </div>
        <div>
          <div style={{ fontSize: "0.8rem", color: "#666" }}>屬剋後傷害</div>
          <div style={{ fontWeight: 600, color: "#c45c00" }}>{fmt(data.elemental)}</div>
        </div>
      </div>
    </div>
  );
}

function Check({ label, checked, onChange }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span style={{ fontSize: 14 }}>{label}</span>
    </label>
  );
}
