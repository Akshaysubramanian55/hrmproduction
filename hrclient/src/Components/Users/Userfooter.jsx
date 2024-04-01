import React from "react";

import './Userfooter.css';

function Userfooter(){
  return(
    <>
    <footer>
              <div>
                  <div className="about">
                      <h4>About Us</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna vitae neque lacinia tristique.</p>
                  </div>
                  <div className="contact">
                      <h4>Contact Us</h4>
                      <ul >
                          <li> 123 Street Name, City, Country</li>
                          <li> +1234567890</li>
                          <li> info@example.com</li>
                      </ul>
                  </div>
              </div>
              <hr />
                  <div className="copyright">
                      <div className="below">
                          <p >Copyright &copy; 2024 Your Company Name</p>
                      </div>

                  </div>
              
        
    </footer>
    </>
  )
}

export default Userfooter;