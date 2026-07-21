import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function AnimatedCounter({ value, duration = 1000, type = "number" }) {
  const shouldReduceMotion = useReducedMotion();
  const numericTarget = typeof value === "string" ? parseFloat(value.replace(/[^0-9.]/g, "")) : value;
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? numericTarget : 0);
  const prevValueRef = useRef(shouldReduceMotion ? numericTarget : 0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(numericTarget);
      return;
    }

    const startValue = prevValueRef.current;
    const endValue = numericTarget;
    if (startValue === endValue) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentValue = startValue + easedProgress * (endValue - startValue);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        prevValueRef.current = endValue;
      }
    };

    requestAnimationFrame(animate);
  }, [numericTarget, duration, shouldReduceMotion]);

  const formatValue = (val) => {
    if (isNaN(val)) return value; // fallback to original string if not numeric

    const rounded = Math.round(val);
    if (type === "percent") {
      return `${rounded}%`;
    }
    if (type === "currency") {
      return `$${rounded.toLocaleString()}`;
    }
    if (type === "float") {
      return val.toFixed(2);
    }
    return rounded.toLocaleString();
  };

  return <span>{formatValue(displayValue)}</span>;
}
