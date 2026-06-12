import { Link } from "react-router-dom";

function Landing() {

  return (

    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #0f766e)"
      }}
    >

      <div className="container text-center text-white">

        <div className="d-flex justify-content-center align-items-center mb-4">
  <span className="display-2 me-3">🛡️</span>

  <h1 className="display-1 fw-bold mb-0">
    Privacy Shield
  </h1>
  
</div>

        <p className="lead fs-3">
          Detect Hidden Trackers
        </p>

        <p className="lead fs-3">
          Monitor Privacy Risks
        </p>

        <p className="lead fs-3">
          Block Advertising Profiling
        </p>

        <div className="mt-5">

          <Link
            to="/login"
            className="btn btn-primary btn-lg px-5 me-3 shadow"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn btn-success btn-lg px-5 shadow"
          >
            Register
          </Link>

        </div>

        <div className="row mt-5">

          <div className="col-md-4 mb-3">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h1>🔍</h1>

                <h5 className="fw-bold">
                  Tracker Detection
                </h5>

                <p className="text-muted">
                  Discover hidden trackers
                  running on websites.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h1>⚠️</h1>

                <h5 className="fw-bold">
                  Risk Monitoring
                </h5>

                <p className="text-muted">
                  Analyze privacy threats
                  in real time.
                </p>

              </div>

            </div>

          </div>

          <div className="col-md-4 mb-3">

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h1>🛡️</h1>

                <h5 className="fw-bold">
                  Tracker Blocking
                </h5>

                <p className="text-muted">
                  Stop advertising
                  profiling automatically.
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="row mt-5">

          <div className="col-md-4">

            <h2 className="fw-bold">
              100+
            </h2>

            <p>
               Tracker Domains
            </p>

          </div>

          <div className="col-md-4">

            <h2 className="fw-bold">
              1000+
            </h2>

            <p>
              Detections Logged
            </p>

          </div>

          <div className="col-md-4">

            <h2 className="fw-bold">
              24/7
            </h2>

            <p>
              Privacy Monitoring
            </p>

          </div>

        </div>

        <hr className="mt-5" />

        <p className="text-light">
          Privacy Shield © 2026
        </p>

      </div>

    </div>
  );
}
<p className="text-secondary small">
  Built with React • Django REST Framework • Chrome Extension
</p>

export default Landing;