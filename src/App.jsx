import { useEffect, useMemo, useState } from "react";
import "./App.css";

const INITIAL_DATA = {
  heartRate: 78,
  oxygen: 97,
  temperature: 36.7,
  sleep: 7.4,
  exercise: 52,
};

function randomChange(value, min, max, step = 1) {
  const change = (Math.random() * 2 - 1) * step;
  return Math.min(max, Math.max(min, value + change));
}

function getHealthStatus(data) {
  if (
    data.oxygen < 90 ||
    data.heartRate < 50 ||
    data.heartRate > 120 ||
    data.temperature < 35.5 ||
    data.temperature > 38.5
  ) {
    return "CRITICAL";
  }

  if (
    data.oxygen < 94 ||
    data.heartRate < 60 ||
    data.heartRate > 100 ||
    data.temperature < 36 ||
    data.temperature > 37.5
  ) {
    return "WARNING";
  }

  return "NORMAL";
}

function getAlerts(data) {
  const alerts = [];

  if (data.oxygen < 90) {
    alerts.push({
      type: "critical",
      title: "Critical Oxygen Alert",
      message: `Oxygen level has fallen to ${data.oxygen.toFixed(
        1
      )}%. Immediate attention required.`,
    });
  } else if (data.oxygen < 94) {
    alerts.push({
      type: "warning",
      title: "Low Oxygen Warning",
      message: `Oxygen level is ${data.oxygen.toFixed(
        1
      )}%. Monitor astronaut condition.`,
    });
  }

  if (data.heartRate > 120) {
    alerts.push({
      type: "critical",
      title: "High Heart Rate",
      message: `Heart rate is ${Math.round(
        data.heartRate
      )} BPM. Immediate monitoring required.`,
    });
  } else if (data.heartRate > 100) {
    alerts.push({
      type: "warning",
      title: "Elevated Heart Rate",
      message: `Heart rate is ${Math.round(data.heartRate)} BPM.`,
    });
  }

  if (data.heartRate < 50) {
    alerts.push({
      type: "critical",
      title: "Low Heart Rate",
      message: `Heart rate is ${Math.round(
        data.heartRate
      )} BPM. Immediate monitoring required.`,
    });
  }

  if (data.temperature > 38.5 || data.temperature < 35.5) {
    alerts.push({
      type: "critical",
      title: "Abnormal Body Temperature",
      message: `Body temperature is ${data.temperature.toFixed(
        1
      )}°C.`,
    });
  } else if (data.temperature > 37.5 || data.temperature < 36) {
    alerts.push({
      type: "warning",
      title: "Temperature Warning",
      message: `Body temperature is ${data.temperature.toFixed(
        1
      )}°C.`,
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      type: "normal",
      title: "All Systems Normal",
      message: "Astronaut health parameters are within safe limits.",
    });
  }

  return alerts;
}

function HealthCard({
  icon,
  title,
  value,
  unit,
  status,
  percentage,
}) {
  return (
    <div className="health-card">
      <div className="card-top">
        <div className="health-icon">{icon}</div>

        <span className={`mini-status ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <p className="card-title">{title}</p>

      <div className="value-row">
        <span className="health-value">{value}</span>
        <span className="health-unit">{unit}</span>
      </div>

      <div className="progress-track">
        <div
          className={`progress-bar ${status.toLowerCase()}`}
          style={{ width: `${Math.min(100, Math.max(5, percentage))}%` }}
        />
      </div>
    </div>
  );
}

function App() {
  const [health, setHealth] = useState(INITIAL_DATA);
  const [missionSeconds, setMissionSeconds] = useState(
    127 * 24 * 60 * 60 + 14 * 60 * 60 + 32 * 60
  );
  const [currentTime, setCurrentTime] = useState(new Date());
  const [history, setHistory] = useState([
    {
      time: "10:01",
      oxygen: 97,
      heartRate: 77,
      temperature: 36.7,
    },
    {
      time: "10:02",
      oxygen: 96,
      heartRate: 79,
      temperature: 36.8,
    },
    {
      time: "10:03",
      oxygen: 98,
      heartRate: 76,
      temperature: 36.6,
    },
    {
      time: "10:04",
      oxygen: 97,
      heartRate: 80,
      temperature: 36.8,
    },
    {
      time: "10:05",
      oxygen: 97,
      heartRate: 78,
      temperature: 36.7,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealth((previous) => {
        const next = {
          heartRate: randomChange(
            previous.heartRate,
            45,
            125,
            5
          ),
          oxygen: randomChange(
            previous.oxygen,
            86,
            100,
            2
          ),
          temperature: randomChange(
            previous.temperature,
            35,
            39,
            0.15
          ),
          sleep: randomChange(
            previous.sleep,
            0,
            10,
            0.1
          ),
          exercise: randomChange(
            previous.exercise,
            0,
            120,
            2
          ),
        };

        setHistory((oldHistory) => {
          const newPoint = {
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            oxygen: Number(next.oxygen.toFixed(1)),
            heartRate: Math.round(next.heartRate),
            temperature: Number(next.temperature.toFixed(1)),
          };

          return [...oldHistory.slice(-11), newPoint];
        });

        return next;
      });

      setMissionSeconds((previous) => previous + 1);
      setCurrentTime(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const overallStatus = getHealthStatus(health);
  const alerts = useMemo(() => getAlerts(health), [health]);

  const missionDays = Math.floor(
    missionSeconds / (24 * 60 * 60)
  );

  const remainingAfterDays =
    missionSeconds % (24 * 60 * 60);

  const missionHours = Math.floor(
    remainingAfterDays / (60 * 60)
  );

  const remainingAfterHours =
    remainingAfterDays % (60 * 60);

  const missionMinutes = Math.floor(
    remainingAfterHours / 60
  );

  const missionSecondsDisplay =
    remainingAfterHours % 60;

  const formatMissionTime = () => {
    return `${String(missionDays).padStart(3, "0")} : ${String(
      missionHours
    ).padStart(2, "0")} : ${String(missionMinutes).padStart(
      2,
      "0"
    )} : ${String(missionSecondsDisplay).padStart(2, "0")}`;
  };

  const parameterStatus = (parameter) => {
    if (parameter === "oxygen") {
      if (health.oxygen < 90) return "CRITICAL";
      if (health.oxygen < 94) return "WARNING";
      return "NORMAL";
    }

    if (parameter === "heartRate") {
      if (
        health.heartRate < 50 ||
        health.heartRate > 120
      )
        return "CRITICAL";

      if (
        health.heartRate < 60 ||
        health.heartRate > 100
      )
        return "WARNING";

      return "NORMAL";
    }

    if (parameter === "temperature") {
      if (
        health.temperature < 35.5 ||
        health.temperature > 38.5
      )
        return "CRITICAL";

      if (
        health.temperature < 36 ||
        health.temperature > 37.5
      )
        return "WARNING";

      return "NORMAL";
    }

    return "NORMAL";
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">✦</div>

          <div>
            <h1>ASTRA<span>MED</span></h1>
            <p>ASTRONAUT HEALTH MONITOR</p>
          </div>
        </div>

        <div className="nav-right">
          <div className="live-indicator">
            <span className="live-dot"></span>
            LIVE MONITORING
          </div>

          <div className="mission-id">
            MISSION <strong>LM-127</strong>
          </div>
        </div>
      </header>

      <main className="dashboard">

        {/* HERO */}
        <section className="hero">

          <div className="hero-left">

            <div className="eyebrow">
              <span className="eyebrow-line"></span>
              HUMAN SPACEFLIGHT HEALTH SYSTEM
            </div>

            <h2>
              Astronaut
              <br />
              <span>Health Monitor</span>
            </h2>

            <p className="hero-description">
              Real-time physiological monitoring system
              for astronaut health during deep-space
              missions.
            </p>

            <div className="astronaut-profile">

              <div className="astronaut-avatar">
                👩‍🚀
              </div>

              <div className="astronaut-info">
                <h3>Dr. Maya Anderson</h3>

                <p>
                  Mission Specialist · Crew Member 01
                </p>

                <div className="profile-tags">
                  <span>NASA</span>
                  <span>CREW-01</span>
                  <span>MEDICAL CLEARANCE</span>
                </div>
              </div>

            </div>
          </div>

          <div className="hero-right">

            <div className="mission-panel">

              <div className="panel-label">
                MISSION ELAPSED TIME
              </div>

              <div className="mission-time">
                {formatMissionTime()}
              </div>

              <div className="time-labels">
                <span>DAYS</span>
                <span>HOURS</span>
                <span>MIN</span>
                <span>SEC</span>
              </div>

              <div className="mission-progress">

                <div className="progress-header">
                  <span>MISSION PROGRESS</span>
                  <span>42.3%</span>
                </div>

                <div className="large-progress">
                  <div className="large-progress-fill"></div>
                </div>

              </div>

              <div className="mission-details">

                <div>
                  <span>MISSION</span>
                  <strong>LUNAR MISSION 127</strong>
                </div>

                <div>
                  <span>LOCATION</span>
                  <strong>LUNAR ORBIT</strong>
                </div>

                <div>
                  <span>CREW</span>
                  <strong>01 / 04</strong>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CURRENT STATUS */}
        <section className="status-section">

          <div className="section-heading">
            <div>
              <p className="section-kicker">
                CURRENT STATUS
              </p>

              <h2>Biometric Overview</h2>
            </div>

            <div className="last-updated">
              <span className="pulse"></span>
              LAST UPDATED{" "}
              {currentTime.toLocaleTimeString()}
            </div>
          </div>

          <div className="health-grid">

            <HealthCard
              icon="♥"
              title="Heart Rate"
              value={Math.round(health.heartRate)}
              unit="BPM"
              status={parameterStatus("heartRate")}
              percentage={(health.heartRate / 140) * 100}
            />

            <HealthCard
              icon="◉"
              title="Oxygen Level"
              value={health.oxygen.toFixed(1)}
              unit="% SpO₂"
              status={parameterStatus("oxygen")}
              percentage={health.oxygen}
            />

            <HealthCard
              icon="♨"
              title="Body Temperature"
              value={health.temperature.toFixed(1)}
              unit="°C"
              status={parameterStatus("temperature")}
              percentage={
                ((health.temperature - 34) / 6) * 100
              }
            />

            <HealthCard
              icon="☾"
              title="Sleep Duration"
              value={health.sleep.toFixed(1)}
              unit="HOURS"
              status="NORMAL"
              percentage={(health.sleep / 10) * 100}
            />

            <HealthCard
              icon="↗"
              title="Exercise Time"
              value={Math.round(health.exercise)}
              unit="MIN"
              status="NORMAL"
              percentage={(health.exercise / 120) * 100}
            />

            <div
              className={`overall-card ${overallStatus.toLowerCase()}`}
            >
              <div className="overall-header">
                <span>OVERALL HEALTH</span>
                <div className="status-ring">
                  {overallStatus === "NORMAL"
                    ? "✓"
                    : overallStatus === "WARNING"
                    ? "!"
                    : "!"}
                </div>
              </div>

              <div className="overall-status">
                {overallStatus}
              </div>

              <p>
                {overallStatus === "NORMAL"
                  ? "All monitored parameters are within safe limits."
                  : overallStatus === "WARNING"
                  ? "One or more parameters require attention."
                  : "Critical condition detected. Immediate attention required."}
              </p>
            </div>

          </div>

        </section>

        {/* CHART + ALERTS */}
        <section className="monitor-grid">

          {/* CHART */}
          <div className="panel chart-panel">

            <div className="panel-heading">

              <div>
                <p className="section-kicker">
                  LIVE TELEMETRY
                </p>

                <h2>Health Trends</h2>
              </div>

              <div className="chart-legend">
                <span>
                  <i className="legend-heart"></i>
                  Heart Rate
                </span>

                <span>
                  <i className="legend-oxygen"></i>
                  Oxygen
                </span>
              </div>

            </div>

            <div className="chart">

              <div className="chart-y-axis">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
              </div>

              <div className="chart-area">

                <div className="grid-line line-1"></div>
                <div className="grid-line line-2"></div>
                <div className="grid-line line-3"></div>
                <div className="grid-line line-4"></div>
                <div className="grid-line line-5"></div>

                <div className="chart-bars">

                  {history.map((item, index) => {
                    const heartHeight =
                      Math.min(
                        95,
                        Math.max(
                          10,
                          ((item.heartRate - 40) /
                            100) *
                            100
                        )
                      );

                    const oxygenHeight =
                      Math.min(
                        95,
                        Math.max(
                          10,
                          ((item.oxygen - 80) /
                            20) *
                            100
                        )
                      );

                    return (
                      <div
                        className="chart-column"
                        key={index}
                      >

                        <div className="bar-group">

                          <div
                            className="data-bar heart-bar"
                            style={{
                              height: `${heartHeight}%`,
                            }}
                            title={`Heart Rate: ${item.heartRate} BPM`}
                          ></div>

                          <div
                            className="data-bar oxygen-bar"
                            style={{
                              height: `${oxygenHeight}%`,
                            }}
                            title={`Oxygen: ${item.oxygen}%`}
                          ></div>

                        </div>

                        <span>
                          {item.time}
                        </span>

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>

          </div>

          {/* ALERT PANEL */}
          <div className="panel alert-panel">

            <div className="panel-heading">

              <div>
                <p className="section-kicker">
                  SAFETY SYSTEM
                </p>

                <h2>Health Alerts</h2>
              </div>

              <span className="alert-count">
                {alerts.length}
              </span>

            </div>

            <div className="alerts-list">

              {alerts.map((alert, index) => (
                <div
                  className={`alert-item ${alert.type}`}
                  key={index}
                >

                  <div className="alert-icon">
                    {alert.type === "critical"
                      ? "!"
                      : alert.type === "warning"
                      ? "!"
                      : "✓"}
                  </div>

                  <div className="alert-content">

                    <h3>{alert.title}</h3>

                    <p>{alert.message}</p>

                    <span>
                      {currentTime.toLocaleTimeString()}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* THRESHOLDS */}
        <section className="threshold-section">

          <div className="section-heading">

            <div>
              <p className="section-kicker">
                MEDICAL PARAMETERS
              </p>

              <h2>Safety Thresholds</h2>
            </div>

          </div>

          <div className="threshold-grid">

            <div className="threshold-card">
              <span className="threshold-icon">♥</span>
              <div>
                <h3>Heart Rate</h3>
                <p>Safe range</p>
              </div>
              <strong>60–100 BPM</strong>
            </div>

            <div className="threshold-card">
              <span className="threshold-icon">◉</span>
              <div>
                <h3>Oxygen Level</h3>
                <p>Critical below</p>
              </div>
              <strong>90% SpO₂</strong>
            </div>

            <div className="threshold-card">
              <span className="threshold-icon">♨</span>
              <div>
                <h3>Temperature</h3>
                <p>Safe range</p>
              </div>
              <strong>36–37.5°C</strong>
            </div>

            <div className="threshold-card">
              <span className="threshold-icon">⚡</span>
              <div>
                <h3>Monitoring</h3>
                <p>Data refresh</p>
              </div>
              <strong>3 seconds</strong>
            </div>

          </div>

        </section>

        {/* FOOTER */}
        <footer>

          <div>
            <strong>ASTRAMED</strong>
            <span>
              Astronaut Health Monitoring System
            </span>
          </div>

          <div className="footer-right">
            <span>SIMULATED DATA</span>
            <span>MISSION LM-127</span>
            <span>© 2026</span>
          </div>

        </footer>

      </main>
    </div>
  );
}

export default App;