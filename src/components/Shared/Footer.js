import React, { useEffect } from 'react';

function Footer() {
  useEffect(() => {
    setTimeout(() => {
      const bodyTag = document.querySelector('body');
      const bodyHeight = bodyTag.clientHeight;
      const windowHeight = window.innerHeight;
      if(bodyHeight <= windowHeight) {
        const footerTag = document.querySelector('footer');
        const footerHeight = footerTag.clientHeight;

        const finalMarginTop = windowHeight - bodyHeight + footerHeight;

        footerTag.style.marginTop = finalMarginTop + "px";
      }
    }, 2000);
  }, []);

  return(
    <footer className="mt-3rem fs-1-2 bold">
      <div className="row">
        <div className="col m6 s12 footer-left">
          <p>Copyrights ©, 2023 - <a href="#" target="_blank" rel="noopener noreferrer">Knox</a></p>
        </div>

        <div className="col m6 s12 footer-right">
          <a href="mailto:askietian@gmail.com" className="ml-1rem">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;