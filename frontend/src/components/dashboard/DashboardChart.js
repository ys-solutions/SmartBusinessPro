"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { mois: "Jan", montant: 1200 },
  { mois: "Fév", montant: 2100 },
  { mois: "Mar", montant: 1800 },
  { mois: "Avr", montant: 3200 },
  { mois: "Mai", montant: 2800 },
  { mois: "Juin", montant: 4100 },
  { mois: "Juil", montant: 3600 },
];

export default function DashboardChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

      <h2 className="text-xl font-semibold mb-6">
        Évolution des transactions
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="mois" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="montant"
            stroke="#2563EB"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}