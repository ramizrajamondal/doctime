import { useState, useMemo } from "react";

const SLOT_END_HOUR = 18; // 6 PM

function getDates() {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function getSlots(date) {
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  // Start minute offset for today: next full hour after current time
  let startMinutes;
  if (isToday) {
    const totalMins = now.getHours() * 60 + now.getMinutes();
    // Round up to next full hour
    startMinutes = now.getMinutes() > 0 ? (now.getHours() + 1) * 60 : totalMins;
  } else {
    startMinutes = 11 * 60; // 11 AM for future days
  }

  const endMinutes = SLOT_END_HOUR * 60; // 6 PM in minutes
  const SLOT_DURATION = 60;  // 1 hour slot
  const BREAK_DURATION = 30; // 30 min break
  const STEP = SLOT_DURATION + BREAK_DURATION; // 90 min per cycle

  const slots = [];
  for (let m = startMinutes; m + SLOT_DURATION <= endMinutes; m += STEP) {
    const from = new Date(date);
    from.setHours(0, m, 0, 0);
    const to = new Date(date);
    to.setHours(0, m + SLOT_DURATION, 0, 0);
    slots.push({ from, to });
  }
  return slots;
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
}

function formatDate(date) {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

  return date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
}

export default function SlotPicker({ onSlotSelect }) {
  const dates = useMemo(() => getDates(), []);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = useMemo(() => getSlots(selectedDate), [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    onSlotSelect?.(slot);
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "0 auto", padding: 16 }}>
      {/* Date Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 8,
          marginBottom: 20,
        }}
      >
        {dates.map((date) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          return (
            <button
              key={date.toDateString()}
              onClick={() => handleDateSelect(date)}
              style={{
                flexShrink: 0,
                padding: "8px 16px",
                borderRadius: 20,
                border: "1px solid",
                borderColor: isSelected ? "#4f46e5" : "#d1d5db",
                background: isSelected ? "#4f46e5" : "#fff",
                color: isSelected ? "#fff" : "#374151",
                fontWeight: isSelected ? 600 : 400,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <div>{formatDate(date)}</div>
              <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>
                {date.toLocaleDateString([], { month: "short", day: "numeric" })}
              </div>
            </button>
          );
        })}
      </div>

      {/* Slots Grid */}
      {slots.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            color: "#9ca3af",
            padding: "40px 0",
            fontSize: 15,
          }}
        >
          No slots available for this day.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          {slots.map((slot) => {
            const key = slot.from.toISOString();
            const isSelected =
              selectedSlot?.from.toISOString() === slot.from.toISOString();
            return (
              <button
                key={key}
                onClick={() => handleSlotSelect(slot)}
                style={{
                  padding: "10px 8px",
                  borderRadius: 10,
                  border: "1px solid",
                  borderColor: isSelected ? "#4f46e5" : "#e5e7eb",
                  background: isSelected ? "#eef2ff" : "#f9fafb",
                  color: isSelected ? "#4f46e5" : "#374151",
                  fontWeight: isSelected ? 600 : 400,
                  fontSize: 13,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.15s",
                }}
              >
                {formatTime(slot.from)}
                <span style={{ display: "block", fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                  – {formatTime(slot.to)}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected Summary */}
      {selectedSlot && (
        <div
          style={{
            marginTop: 24,
            padding: "12px 16px",
            background: "#eef2ff",
            borderRadius: 10,
            border: "1px solid #c7d2fe",
            fontSize: 14,
            color: "#4338ca",
          }}
        >
          Selected:{" "}
          <strong>
            {formatDate(selectedDate)}, {formatTime(selectedSlot.from)} –{" "}
            {formatTime(selectedSlot.to)}
          </strong>
        </div>
      )}
    </div>
  );
}