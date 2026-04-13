"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [best, setBest] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("bestScore");
    if (saved) setBest(Number(saved));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Your Best Score: {best ?? "No test yet"}</p>
    </div>
  );
}
