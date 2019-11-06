import React, { Component } from 'react';
import { IMAGES } from '../../constants'; 
import { Redirect } from 'react-router-dom';
import { Footer } from '../common';


class PrivacyComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      navigateTo: null
    };
  }
  navigateToResister = () => {
    this.setState({
      navigateTo: '/register'
    });
  }

  navigateToLogin = () => {
    this.setState({
      navigateTo: '/login'
    });    
  }

  render() {
    document.title='Privacy';

    const { navigateTo } = this.state;
    if(navigateTo){
      return <Redirect to={ navigateTo } />;
    }

    return (
      <div id="privacy" className="container-fluid">
        <div className="privacy-header">
          <div className="header-logo">
            <img src= { IMAGES.LOGO } alt='Logo' />
          </div>
          <div className="header-btns">
            <button id="register" name="register" type="button" class="btn-login primary-btn" onClick= { this.navigateToResister } >Register </button>
            <button id="login" name="login" type="button" class="btn-login secondary-btn" onClick= { this.navigateToLogin }>Log In</button>
          </div>
        </div>
        <div className="contianer Privacypage">
          <div className="page-heading">Privacy Policy</div>
          <div className="text">We maintain a log file of all actions that are initiated or facilitated using our website,
          to capture, record and store data concerning the transaction. Access to this data is restricted to those who
          administer our network and public website, and to our legal counsel who may access this information in the
          event of a dispute, in response to legal process or law enforcement inquiries, abuse of our website, or
          violation of our Terms of Use Policy.
      </div>
          <div className="heading">E-mail Address</div>
          <div className="text">
            <p>You should know that e-mail is not necessarily secure against all forms of interception. If your communication
            includes sensitive information about you and you would prefer not to transmit this information in this fashion,
          please contact us by mail or telephone rather than e-mail.</p>
            <p>  We collect only those e-mail addresses that are volunteered by the visitor, through e-mail messages addressed
            to our company or its employees, or through visitor responses via the “contact us” portion of the site, e-mail
            marketing destination web pages and public events. We use the lists of e-mail addresses for marketing purposes
            and to inform those interested in our products about events, products, services or other items of interest.
            We may also use the lists of e-mail addresses volunteered by our visitors to register the visitor for an extranet
          account or to process orders for brochures and other written materials.</p>
            <p>  You may opt-out of receiving the promotional or marketing e-mails at any time by writing to Solar Topps
            at 102 S. 28th St., Phoenix, Arizona 85304. Such requests may take up to ten business days to process.
            This opt-out procedure will not be available for e-mails that are necessary to provide confirmation of a
            completed transaction (such as a purchase, service request or change in the visitor’s user profile)
            or for e-mails that confirm a visitor’s status as a registered user of the Solar Topps customer extranet.</p>
          </div>
          <div className="heading">Other Personal Information</div>
          <div className="text">
            <p>We may use a mailing address or phone number that a visitor provides for a variety of Solar Topps-related reasons.
            We may send periodic mailings to visitors or make telephone calls to inform those visitors who have provided a mailing
            address or telephone number of new products, services or events. If you do not wish to receive such calls or mailings,
            you may request to be removed from the contact list by contacting Solar Topps by telephone at 480-940-1201 or writing
          to us at 102 S. 28th St., Phoenix, Arizona 85034.</p>
            <p>Personal Information is Not Released to Outside Parties.</p>
            <p>Any information that you provide to us via our website will be used for our purposes only. Your information
            will not be shared with other individuals or other companies. However, in some instances we may need to provide
            your name and delivery address to third parties that we use for delivering specific products or services to you
            (such as support services, shipping or direct mail organizations). In such cases, your name and delivery address
            are never shared by these third parties. Solar Topps may access your information in the event of a dispute,
            in response to legal process or law enforcement inquiries, abuse of our website, or violation of our Terms of Use
          Policy.</p>
          </div>
          <div className="heading">Cookies</div>
          <div className="text">A cookie is an element of data that a website can send to your browser, which may then be stored on your
          system. You can set your browser to notify you when you receive a cookie, giving you the chance to decide whether
          to accept it. Solar Topps uses one type of cookie to maintain your login information for as long as you are using
          the site. No personal information is stored in this cookie and the cookie is deleted from your computer when you
          leave the website. Our second cookie type just identifies you as you move throughout our site, providing faster,
          personalized access to view various site pages.</div>
          <div className="heading">Data Security</div>
          <div className="heading">
            <p>We safeguard the security of the data you send us with certain physical, electronic, and managerial procedures.
              We have taken reasonable precautions to protect against misuse, theft, loss, unauthorized access, disclosure,
            alteration or destruction of your personal information.</p>
            <p>While we strive to protect your personal information, we cannot ensure the security of the information you transmit
              to us, and so we urge you to take every precaution to protect your personal data when you are on the Internet. We suggest
              that you change your passwords often, that your passwords include a combination of letters and numbers, and that you make
              certain that you are using a secure browser. Products and services are available which can help give you privacy protection
          while navigating the Web.</p>
          </div>
          <div className="heading">Data Forwarding</div>
          <div className="text">
            We maintain your personal information on servers and computers located in the United States and operated under our direct
              supervision and control. We do not forward your personal information outside the United States.
      </div>
          <div className="heading">Children’s Privacy</div>
          <div className="text">
            We do not structure our website to attract children. Accordingly, we do not to intend to collect personal information
              from anyone whom we know to be under 13 years of age.
          </div>
          <div className="heading">Third Party Sites</div>
          <div className="text">At times Solar Topps’s website may contain links to other sites. When you click on one of these links you are being
            transferred to a website operated by someone other than Solar Topps, and the operator of that website may have a
            different privacy policy. Solar Topps does not share your personal information with these websites and is not
            responsible for their individual privacy practices. We encourage you to investigate the privacy policies of these operators.
            </div>

          <div className="heading">Future Changes</div>
          <div className="text">
            By using our website, you consent to the collection and use of your information as we have outlined in this
            Privacy Policy and to our Terms of Use Policy. Solar Topps may decide to change this Privacy Policy from time to time.
            When we do, we will post those changes on this page so that you are always aware of the information we collect,
            how we use it, and under what circumstances we disclose it.
          </div>
          <div className="heading">Comments and Questions</div>
          <div className="text">
            We welcome comments and questions on this Privacy Policy. As stated above, we are dedicated to protecting your privacy,
            and we will make every reasonable effort to keep your information secure. You can contact us for more questions by telephone
            at 480-940-1201 or writing to us at 102 S. 28th St., Phoenix, Arizona 85034.
          </div>
        </div>
        {/* <Footer /> */}
        <Footer />

      </div>
    );
  }
}

export default PrivacyComponent;