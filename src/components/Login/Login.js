import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { appConfig, userSession, isUserSignedIn, loginPopup } from '../Shared/defaults';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

function Login() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userSession.isSignInPending()) {
      setLoading(true);
      userSession
        .handlePendingSignIn()
        .then(() => {
          window.location = appConfig.redirectURI();
        })
        .catch((err) => {
          console.debug("Cannot sign you in", err);
        });
    }
  }, []);

  if (isUserSignedIn) {
    return <Redirect to="/dash" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Deprecated
    // userSession.redirectToSignIn();

    const authOptions = {
      // redirectTo: '/dash',
      onFinish: (authData) => {
        window.location = 'dash';
        let userData = userSession.loadUserData();
        console.log(userData)
      },
      onCancel: () => {
        setLoading(false);
      },
      manifestPath: `${appConfig.redirectURI()}/manifest.json`,
      appDetails: {
        name: 'knox',
        icon: `${appConfig.redirectURI()}/icons/logo-180x180.png`,
      },
    };
    // console.log(authOptions)

    await loginPopup(authOptions);
  };

  return (
    <React.Fragment>

      <section className="container">
        <div className="login-section center-align">
          <div>
            <p className="italic">
              Get started by signing in with Blockstack. If you don't have an account, you can create a new one.
            </p>
          </div>
          <div>
            <button className="btn btn-large oxford-blue-btn" onClick={(e) => handleLogin(e)} disabled={loading} >
              {loading ? "Signing you in..." : "Sign in with Blockstack"}
              <i className="material-icons right">fingerprint</i>
            </button>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default Login;