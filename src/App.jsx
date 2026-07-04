import { useEffect, useState } from "react";
import {
  Home,
  MapPinned,
  Compass,
  Images,
  User,
  Play,
  Square,
  MapPin,
  Clock,
  Footprints,
  Heart,
  Menu,
  X,
  Camera,
  TrendingUp,
  Award,
} from "lucide-react";
const places = [
  ["Lakeside trail", "A peaceful route beside the water", "2.4 km"],
  ["Hill viewpoint", "Golden-hour city views", "4.1 km"],
  ["Old market walk", "Street food and local stories", "1.8 km"],
];
export default function App() {
  const [page, setPage] = useState("Home"),
    [running, setRunning] = useState(false),
    [sec, setSec] = useState(0),
    [menu, setMenu] = useState(false);
  useEffect(() => {
    if (!running) return;
    let i = setInterval(() => setSec((x) => x + 1), 1000);
    return () => clearInterval(i);
  }, [running]);
  const time = `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;
  const nav = [
    ["Home", Home],
    ["Record", MapPinned],
    ["Discover", Compass],
    ["Memories", Images],
    ["Profile", User],
  ];
  return (
    <div className="app">
      <header>
        <div className="brand">
          <Footprints /> EchoSteps
        </div>
        <nav>
          {nav.map(([n, I]) => (
            <button
              className={page === n ? "active" : ""}
              onClick={() => setPage(n)}
            >
              <I size={18} />
              {n}
            </button>
          ))}
        </nav>
        <button className="mobile" onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      {menu && (
        <div className="mobileNav">
          {nav.map(([n]) => (
            <button
              onClick={() => {
                setPage(n);
                setMenu(false);
              }}
            >
              {n}
            </button>
          ))}
        </div>
      )}
      <main>
        {page === "Home" && (
          <>
            <section className="hero">
              <div>
                <span className="tag">EXPLORE • RECORD • REMEMBER</span>
                <h1>Every walk has a story.</h1>
                <p>
                  Turn ordinary walks into memorable journeys. Record routes,
                  discover nearby places, and keep your best moments together.
                </p>
                <button className="primary" onClick={() => setPage("Record")}>
                  <Play size={18} /> Start exploring
                </button>
              </div>
              <div className="heroMap">
                <MapPin size={46} />
                <b>Your next adventure</b>
                <small>Discover paths around you</small>
              </div>
            </section>
            <section className="stats">
              {[
                ["12", "Walks completed"],
                ["28.6 km", "Distance explored"],
                ["7", "Memories saved"],
              ].map((x) => (
                <div>
                  <strong>{x[0]}</strong>
                  <span>{x[1]}</span>
                </div>
              ))}
            </section>
            <h2>Continue exploring</h2>
            <div className="cards">
              {places.map((p, i) => (
                <article>
                  <div
  className="cover"
  style={{
    backgroundImage: `url(${
      [
        "/images/lakeside.jpg",
        "/images/hill.jpg",
        "/images/market.jpg",
      ][i % 3]
    })`,
  }}
>
  <MapPin />
</div>
                  <h3>{p[0]}</h3>
                  <p>{p[1]}</p>
                  <span>
                    <Footprints size={15} />
                    {p[2]}
                  </span>
                </article>
              ))}
            </div>
          </>
        )}
        {page === "Record" && (
          <section className="record">
            <div className="map">
              <div className="route"></div>
              <div className="pin p1">
                <MapPin />
              </div>
              <div className="pin p2">
                <MapPin />
              </div>
              <div className="mapLabel">Live route preview</div>
            </div>
            <div className="recordPanel">
              <span className="tag">WALK RECORDER</span>
              <h2>
                {running
                  ? "Your walk is being recorded"
                  : "Ready for a new walk?"}
              </h2>
              <div className="timer">
                <Clock />
                <b>{time}</b>
              </div>
              <div className="metrics">
                <div>
                  <Footprints />
                  <b>{(sec / 900).toFixed(2)} km</b>
                  <small>Distance</small>
                </div>
                <div>
                  <TrendingUp />
                  <b>{sec ? Math.round(sec / 6) : 0}</b>
                  <small>Steps</small>
                </div>
              </div>
              <button
                className={running ? "stop" : "primary"}
                onClick={() => setRunning(!running)}
              >
                {running ? (
                  <>
                    <Square size={18} /> Stop walk
                  </>
                ) : (
                  <>
                    <Play size={18} /> Start walk
                  </>
                )}
              </button>
            </div>
          </section>
        )}
        {page === "Discover" && (
          <>
            <div className="title">
              <span className="tag">DISCOVER</span>
              <h1>Find your next route</h1>
              <p>Handpicked places worth walking to.</p>
            </div>
            <div className="cards">
              {places.concat(places).map((p, i) => (
                <article>
                <div
  className="cover"
  style={{
    backgroundImage: `url(${
      [
        "/images/lakeside.jpg",
        "/images/hill.jpg",
        "/images/market.jpg",
      ][i % 3]
    })`,
  }}
>
  <Compass />
</div>
                  <h3>{p[0]}</h3>
                  <p>{p[1]}</p>
                  <span>
                    <MapPin size={15} />
                    {p[2]} away
                  </span>
                </article>
              ))}
            </div>
          </>
        )}
        {page === "Memories" && (
          <section className="title">
            <span className="tag">YOUR MEMORIES</span>
            <h1>Small moments, saved.</h1>
            <div className="memoryGrid">
              {[
                "Morning at the lake",
                "Rainy street walk",
                "Sunset viewpoint",
                "Weekend trail",
              ].map((x, i) => (
                <div className={"memory m" + i}>
                  <Camera />
                  <b>{x}</b>
                  <small>June 2026</small>
                </div>
              ))}
            </div>
          </section>
        )}
        {page === "Profile" && (
          <section className="profile">
            <div className="avatar">AK</div>
            <h1>Ashish Kahar</h1>
            <p>Explorer • Story collector</p>
            <div className="stats">
              {[
                ["12", "Walks"],
                ["28.6 km", "Distance"],
                ["4", "Achievements"],
              ].map((x) => (
                <div>
                  <strong>{x[0]}</strong>
                  <span>{x[1]}</span>
                </div>
              ))}
            </div>
            <h2>Achievements</h2>
            <div className="badges">
              <div>
                <Award /> First steps
              </div>
              <div>
                <Heart /> Route lover
              </div>
              <div>
                <MapPin /> Explorer
              </div>
            </div>
          </section>
        )}
      </main>
      <footer>© 2026 EchoSteps • Built for curious explorers</footer>
    </div>
  );
}
