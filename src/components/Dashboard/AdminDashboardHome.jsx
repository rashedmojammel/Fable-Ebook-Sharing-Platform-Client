"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart, Area,
  PieChart, Pie, Cell, Tooltip as PieTooltip, Legend,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

// ── colour tokens ────────────────────────────────────────────────────────────
const C = {
  slate:   "#0F172A",
  ink:     "#1E293B",
  muted:   "#64748B",
  border:  "#E2E8F0",
  surface: "#F8FAFC",
  white:   "#FFFFFF",
  blue:    "#3B82F6",
  indigo:  "#6366F1",
  violet:  "#8B5CF6",
  emerald: "#10B981",
  amber:   "#F59E0B",
  rose:    "#F43F5E",
  cyan:    "#06B6D4",
  orange:  "#F97316",
  teal:    "#14B8A6",
  pink:    "#EC4899",
};

const PIE_COLORS = [C.blue, C.violet, C.emerald, C.amber, C.rose, C.cyan, C.orange, C.teal, C.pink, C.indigo];

// ── tiny helpers ─────────────────────────────────────────────────────────────
const fmt  = (n) => Number(n ?? 0).toLocaleString();
const fmtD = (n) => `$${Number(n ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// ── stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, accent }) {
  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "24px 28px",
        display: "flex",
        alignItems: "center",
        gap: 18,
        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
      }}
    >
      <div
        style={{
          width: 52, height: 52,
          borderRadius: 14,
          background: `${accent}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 24, flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 12, color: C.muted, fontWeight: 500, letterSpacing: ".04em", textTransform: "uppercase" }}>
          {label}
        </p>
        <p style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 700, color: C.slate, letterSpacing: "-.5px" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ── chart card wrapper ────────────────────────────────────────────────────────
function ChartCard({ title, subtitle, children }) {
  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "28px 28px 20px",
        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
      }}
    >
      <div style={{ marginBottom: 20 }}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.slate }}>{title}</p>
        {subtitle && (
          <p style={{ margin: "3px 0 0", fontSize: 12, color: C.muted }}>{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

// ── custom area tooltip ───────────────────────────────────────────────────────
function AreaTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.slate, borderRadius: 10, padding: "10px 14px", fontSize: 13 }}>
      <p style={{ color: "#94A3B8", margin: "0 0 6px", fontSize: 11 }}>{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ margin: "2px 0", color: C.white, fontWeight: 600 }}>
          {p.dataKey === "revenue" ? fmtD(p.value) : fmt(p.value)}{" "}
          <span style={{ color: "#94A3B8", fontWeight: 400 }}>{p.dataKey}</span>
        </p>
      ))}
    </div>
  );
}

// ── custom pie tooltip ────────────────────────────────────────────────────────
function CustomPieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div style={{ background: C.slate, borderRadius: 10, padding: "10px 14px", fontSize: 13 }}>
      <p style={{ margin: 0, color: C.white, fontWeight: 600 }}>{name}</p>
      <p style={{ margin: "3px 0 0", color: "#94A3B8" }}>{value} ebooks</p>
    </div>
  );
}

// ── skeleton loader ───────────────────────────────────────────────────────────
function Skeleton({ h = 28, w = "100%", radius = 8 }) {
  return (
    <div
      style={{
        height: h, width: w, borderRadius: radius,
        background: "linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function AdminDashboardHome({ analytics }) {
  const {
    totalUsers    = 0,
    totalWriters  = 0,
    totalSold     = 0,
    totalRevenue  = 0,
    monthlySales  = [],
    byGenre       = [],
  } = analytics ?? {};

  const stats = [
    { label: "Total Users",       value: fmt(totalUsers),    icon: "👥", accent: C.blue    },
    { label: "Total Writers",     value: fmt(totalWriters),  icon: "✍️",  accent: C.violet  },
    { label: "Ebooks Sold",       value: fmt(totalSold),     icon: "📚", accent: C.emerald },
    { label: "Total Revenue",     value: fmtD(totalRevenue), icon: "💰", accent: C.amber   },
  ];

  // normalise genre data
  const genreData = byGenre.map((g, i) => ({
    name:  g.genre || "Unknown",
    value: g.count,
    fill:  PIE_COLORS[i % PIE_COLORS.length],
  }));

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0 }
          100% { background-position: -200% 0 }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.surface, padding: "36px 32px", fontFamily: "Inter, system-ui, sans-serif" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: C.slate, letterSpacing: "-.5px" }}>
            Admin Dashboard
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: C.muted }}>
            Platform overview at a glance
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 32,
        }}>
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Charts row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 20,
        }}>

          {/* Monthly Sales Area Chart */}
          <ChartCard
            title="Monthly Sales & Revenue"
            subtitle="Purchases and revenue over the last 12 months"
          >
            {monthlySales.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0", color: C.muted, fontSize: 14 }}>
                No sales data yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={monthlySales} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.blue}   stopOpacity={0.18} />
                      <stop offset="95%" stopColor={C.blue}   stopOpacity={0}    />
                    </linearGradient>
                    <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={C.violet} stopOpacity={0.18} />
                      <stop offset="95%" stopColor={C.violet} stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: C.muted, fontSize: 11 }}
                    axisLine={false} tickLine={false}
                  />
                  <YAxis
                    yAxisId="sales"
                    orientation="left"
                    tick={{ fill: C.muted, fontSize: 11 }}
                    axisLine={false} tickLine={false}
                    width={32}
                  />
                  <YAxis
                    yAxisId="revenue"
                    orientation="right"
                    tick={{ fill: C.muted, fontSize: 11 }}
                    axisLine={false} tickLine={false}
                    tickFormatter={(v) => `$${v}`}
                    width={52}
                  />
                  <Tooltip content={<AreaTooltip />} />
                  <Area
                    yAxisId="sales"
                    type="monotone" dataKey="sales"
                    stroke={C.blue} strokeWidth={2.5}
                    fill="url(#gradSales)" dot={false} activeDot={{ r: 5 }}
                  />
                  <Area
                    yAxisId="revenue"
                    type="monotone" dataKey="revenue"
                    stroke={C.violet} strokeWidth={2.5}
                    fill="url(#gradRevenue)" dot={false} activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}

            {/* Legend */}
            <div style={{ display: "flex", gap: 20, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
              {[{ color: C.blue, label: "Sales (units)" }, { color: C.violet, label: "Revenue ($)" }].map(({ color, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: C.muted }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: "inline-block" }} />
                  {label}
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Genre Pie Chart */}
          <ChartCard
            title="Ebooks by Genre"
            subtitle="Distribution across all published titles"
          >
            {genreData.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0", color: C.muted, fontSize: 14 }}>
                No genre data yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={genreData}
                    cx="50%" cy="46%"
                    innerRadius={68}
                    outerRadius={108}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {genreData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <PieTooltip content={<CustomPieTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ fontSize: 12, color: C.muted }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

        </div>
      </div>
    </>
  );
}