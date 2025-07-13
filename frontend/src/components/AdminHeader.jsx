import React, { useEffect, useState } from "react";
import { Bell, Sun, Moon } from "lucide-react";

export default function AdminHeader() {
  const [darkMode, setDarkMode] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  // Update the date/time every second
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const formattedDateTime = `${dateTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })} · ${dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })}`;


  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow sticky top-0 z-10">
      {/* Date & Time */}
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {formattedDateTime}
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          type="button"
          className="relative text-gray-600 dark:text-gray-300 hover:text-lavender-600"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {/* Notification badge (optional) */}
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="text-gray-600 dark:text-gray-300 hover:text-lavender-600"
          aria-label="Toggle Theme"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
}
