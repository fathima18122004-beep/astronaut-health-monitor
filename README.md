# 🚀 Astronaut Health Monitor

A real-time web dashboard designed to monitor the health and wellbeing of an astronaut during a space mission.

The dashboard displays live simulated health telemetry, automatically evaluates the astronaut's health status, and generates alerts when critical health thresholds are reached.

---

## 🌌 Project Overview

Long-duration space missions require continuous monitoring of astronaut health. The **Astronaut Health Monitor** provides a simple and user-friendly interface for tracking important health parameters and identifying potential health risks.

The dashboard uses simulated health data that changes over time to demonstrate how a real monitoring system could work.

---

## ✨ Features

- ❤️ Real-time heart rate monitoring
- 🫁 Oxygen level monitoring
- 🌡️ Body temperature monitoring
- 😴 Sleep duration tracking
- 🏃 Exercise time tracking
- 🟢 Normal / 🟡 Warning / 🔴 Critical health status
- 🚨 Automatic health alerts
- ⏱️ Mission day and time indicator
- 📊 Live health trend visualization
- 📱 Responsive design
- 🔄 Automatically changing simulated health data
- 🛰️ Space-mission themed dashboard
- ⚠️ Safety thresholds for health parameters

---

## 🧑‍🚀 Astronaut Information

| Information | Details |
|---|---|
| **Astronaut** | Dr. Maya Anderson |
| **Mission** | Lunar Mission 127 |
| **Location** | Lunar Orbit |
| **Data Type** | Simulated |

> ⚠️ All health information displayed by this application is simulated data created for demonstration purposes.

---

## 📊 Monitored Health Parameters

| Parameter | Description |
|---|---|
| ❤️ Heart Rate | Heart rate in beats per minute |
| 🫁 Oxygen Level | Blood oxygen saturation percentage |
| 🌡️ Body Temperature | Body temperature in °C |
| 😴 Sleep Duration | Daily sleep duration in hours |
| 🏃 Exercise Time | Daily exercise duration |
| 🩺 Overall Health | Normal / Warning / Critical |

---

## 🚨 Alert System

The dashboard continuously evaluates the astronaut's health parameters and automatically generates alerts.

### 🔴 Critical Conditions

The system generates a critical alert when conditions such as the following are detected:

- Oxygen level below **90%**
- Heart rate below **50 BPM**
- Heart rate above **120 BPM**
- Body temperature below **35.5°C**
- Body temperature above **38.5°C**

### 🟡 Warning Conditions

The system generates a warning when conditions such as the following are detected:

- Oxygen level below **94%**
- Heart rate below **60 BPM**
- Heart rate above **100 BPM**
- Body temperature below **36°C**
- Body temperature above **37.5°C**

The overall health status is determined based on the most serious detected condition.

---

## 🔄 Simulated Live Data

The dashboard uses randomly generated health data that changes periodically.

This demonstrates how a real-time monitoring system could:

1. Continuously monitor health parameters
2. Detect changing health conditions
3. Evaluate the astronaut's current status
4. Generate warnings
5. Generate critical alerts

---

## 🛠️ Technologies Used

- **React.js**
- **Vite**
- **JavaScript**
- **HTML5**
- **CSS3**
- **Git**
- **GitHub**

---

## 📁 Project Structure

```text
astronaut-health-monitor/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
