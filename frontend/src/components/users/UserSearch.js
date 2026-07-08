"use client";

export default function UserSearch({ value, onChange }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="🔍 Rechercher un utilisateur..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}