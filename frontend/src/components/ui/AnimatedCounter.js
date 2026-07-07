"use client";

import CountUp from "react-countup";

export default function AnimatedCounter({
  value,
  duration = 2,
}) {
  return (
    <CountUp
      end={value}
      duration={duration}
      separator=" "
    />
  );
}