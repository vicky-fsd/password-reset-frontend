import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const location = useLocation();
  const { state } = location;
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("Auth Token") || null
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Assign a default value to state.message
  const defaultMessage = "Welcome";
  const message = state?.message || defaultMessage; // Use optional chaining to check for state

  useEffect(() => {
    const delay = 2000; // 2 seconds delay
    const timeout = setTimeout(() => {
      if (authToken) {
        setLoading(false);
      } else {
        setLoading(false);
        toast.info("Redirecting to the login page.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/login");
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [authToken, navigate]);

  return (
    <>
      <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5 py-md-0">
        <div className="col-md-7 bg-light">
          <div className="text-center p-5">
            <h1 className="text-main fw-bolder">Password Reset Application!</h1>
            <h6 className="mt-2 mb-3">
              This app implements a secure password reset process with email
              verification and database updates.
            </h6>
            {loading ? (
              <div className="d-flex justify-content-center">
                <Oval
                  height={30}
                  width={30}
                  color="#fff"
                  visible={true}
                  secondaryColor="#86b7fe"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              </div>
            ) : authToken ? (
              <p className="text-success" style={{ fontSize: "24px" }}>
                {message} {userName}!
              </p>
            ) : (
              <Link to="/login">Log in</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
