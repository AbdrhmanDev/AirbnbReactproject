import React from "react";
import { Link } from "react-router-dom";
import "./FooterLinks.css"; 

const FooterLinks = () => {
  return (
    <div className="footer-container">
      <div className="footer-columns">
        <div className="footer-column">
          <h6 className="footer-title">Support</h6>
          <ul>
            <li><Link to="#">Help Center</Link></li>
            <li><Link to="#">Get help with Link safety issue</Link></li>
            <li><Link to="#">AirCover</Link></li>
            <li><Link to="#">Anti-discrimination</Link></li>
            <li><Link to="#">Disability support</Link></li>
            <li><Link to="#">Cancellation options</Link></li>
            <li><Link to="#">Report neighborhood concern</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h6 className="footer-title">Hosting</h6>
          <ul>
            <li><Link to="#">Airbnb your home</Link></li>
            <li><Link to="#">AirCover for Hosts</Link></li>
            <li><Link to="#">Hosting resources</Link></li>
            <li><Link to="#">Community forum</Link></li>
            <li><Link to="#">Hosting responsibly</Link></li>
            <li><Link to="#">Airbnb-friendly apartments</Link></li>
            <li><Link to="#">Join Link free Hosting class</Link></li>
            <li><Link to="#">Find Link co-host</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h6 className="footer-title">Airbnb</h6>
          <ul>
            <li><Link to="#">Newsroom</Link></li>
            <li><Link to="#">New features</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Investors</Link></li>
            <li><Link to="#">Gift cards</Link></li>
            <li><Link to="#">Airbnb.org emergency stays</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
