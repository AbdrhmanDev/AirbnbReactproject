import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import FooterLinks from '../FooterLinks/FooterLinks';

const Footer = () => {
  const [showAccordion, setShowAccordion] = useState(false);

  const toggleAccordion = () => {
    setShowAccordion((prev) => !prev);
  };

  return (
    <>
      <footer className="bg-light text-dark mt-5 p-3 border-top">
      {showAccordion && (
          <div className="container mt-3">
            <Accordion defaultActiveKey="0" className='w-100'>
               <FooterLinks />
            </Accordion>
          </div>
        )}
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="mb-3 mb-md-0 text-center text-md-start">
            © 2025 Airbnb, Inc. ·
            <a href="#" className="text-decoration-none ms-2 me-2 text-dark">Terms</a> ·
            <a href="#" className="text-decoration-none me-2 text-dark">Sitemap</a> ·
            <a href="#" className="text-decoration-none me-2 text-dark">Privacy</a> ·
            <a
              className="text-decoration-none text-dark"
              data-bs-toggle="collapse"
              href="#privacyChoices"
              role="button"
              aria-expanded="false"
              aria-controls="privacyChoices"
            >
              Your Privacy Choices <span role="img" aria-label="checkbox">
                <img src="chk.png" alt="" width={"40px"} />
              </span>
            </a>
          </div>

          <div className="text-center text-md-end">
            <span className="me-3">
              🌐 English (US)
            </span>
            <span className="me-3">
              $ USD
            </span>
            <a
              href="#"
              className="text-decoration-none fw-semibold"
              onClick={toggleAccordion}
            >
              Support & resources <span className="ms-1">{showAccordion ? '▴' : '▾'}</span>
            </a>
          </div>
        </div>

        {/* Accordion يظهر حسب الحالة */}
        
      </footer>
    </>
  );
};

export default Footer;
