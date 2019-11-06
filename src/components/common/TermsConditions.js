import React, { Component } from 'react';
import { IMAGES } from '../../constants'; 
import { Redirect } from 'react-router-dom';
import { Footer } from '../common';

class TermsAndConditionsComponent extends Component {
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
    document.title='Terms & Conditions';
    const { navigateTo } = this.state;
    if(navigateTo){
      return <Redirect to={ navigateTo } />;
    }
    return (
      <div id="Terms" className="container-fluid">
        <div className="privacy-header">
          <div className="header-logo">
            <img src= { IMAGES.LOGO } alt='Logo' />
          </div>
          <div className="header-btns">
            <button id="register" name="register" type="button" class="btn-login primary-btn" onClick= { this.navigateToResister } >Register </button>
            <button id="login" name="login" type="button" class="btn-login secondary-btn" onClick= { this.navigateToLogin }>Log In</button>
          </div>
        </div>
        <div className="contianer termspage">
          <div className="page-heading">Terms & Conditions</div>
          <div className="text">By accessing this web site, you the user are bound by the terms and conditions set forth below for your use of the web site.
            The site and the functions, facilities and services related thereto(“the Site”) are proprietary World Wide Web services operated and maintained 
            by Solar Topps, LLC.This Agreement contains the terms and conditions on which Solar Topps is willing to permit your use of the Site and you must 
            accept these terms and conditions for use of the Site.Your use of the Site signifies your agreement to the terms and conditions of this 
            User Agreement.If you do not agree with these terms and conditions, you should exit the Site now and not use the Site in the future.
          </div>
          <div className="heading">1. Users</div>
          <div className="text">This Site may be used by you in an individual capacity or as a representative of a business entity.This Site is available 
            only to individuals of the age of majority who can form legally binding contracts under applicable law and your use of this Site is your 
            representation that you satisfy this requirement.You are solely responsible for maintaining the confidentiality of your password / passphrase 
            and account if any.Furthermore, you are solely responsible for any and all activities that occur under or in connection with your account or 
            which result from access to or use of the Site using your password / passphrase or account.Each user is solely responsible 
            for his or her transmissions.
          </div>
          <div className="heading">2. Prohibited Uses</div>
          <div className="text">
            <p>a) You agree that you will not use the Site: (i) in a manner that is prohibited by any law or regulation, or to facilitate 
            the violation of any law or regulation; (ii) to invade the privacy of others; (iii) to violate, plagiarize, or infringe on the intellectual 
            property or contractual rights of any person in connection with any use of the Site; (iv) to transmit unlawful, fraudulent, offensive, obscene, 
            pornographic, defamatory, abusive, threatening, discriminatory or otherwise objectionable material, or to encourage conduct that would give rise 
            to civil liability of any manner.</p>
            <p>b) You agree that you will not: (i) violate, or assist in violating, the security of the Site, whether intentionally, negligently or otherwise;
            (ii) impersonate Solar Topps personnel or other persons or entities; (iii) use any electronic mail message, device, software or
            programming routine that may impair, interfere or impose an unreasonable burden on the Site or Solar Topps; (iv) intercept or
            expropriate any system, data or information of this web Site; or(v) resell, assign or transfer, in whole or in part, your right to use the Site.
            </p>
            <p>
            c) You agree to provide true, accurate, and complete information about yourself, to update such information as necessary, and
            to maintain the confidentiality of your password / passphrase and account designation.You agree that you are solely responsible
            for all activities that occur using your password / passphrase or account.You agree to notify Solar Topps immediately in the
            event of any unauthorized use of your password / passphrase or account or any other breach of security.You agree that
            Solar Topps employees may have access to your account and records as reasonably necessary to investigate complaints and maintain the Site.
            </p>
          </div>
          <div className="heading">3. Proprietary Materials</div>
          <div className="text">
            The Site contains trademarks, copyrights and other proprietary information and materials.This Site and all such materials are
              owned or licensed by us.Everything on this Site is copyrighted.You agree not to publish, modify, create derivative works from,
              sell or otherwise transmit or exploit any of such proprietary materials without the express written permission of the owner
              of the rights to such materials.You agree not to remove any copyright, trademark, or other proprietary notice or legend contained
              on this Site or on any materials obtained through this Site.
          </div>
            <div className="heading">4. User Information; Privacy</div>
            <div className="text">
              You should review our current Privacy Policy which is incorporated in this Agreement by reference.We reserve the right to disclose
              non - personally identifiable information regarding you to third parties, and any information required to be disclosed by law to
            government authorities.
            </div>
            <div className="heading">5. No Warranties</div>
            <div className="text">
              <p>
              a) The information and services included in or available through the Site may include inaccuracies or errors.Solar
                  Topps may make improvements and / or changes to the Site at any time without notice.Solar Topps does not guarantee that access
                  to or use of the Site will be uninterrupted or error free, that bugs or malfunctions will be corrected, or that the Site and its
                  servers are free of harmful components.Solar Topps does not guarantee that the uses of its Site, or the materials provided within the Site,
                  are accurate, without error, or reliable.
              </p>
              <p>
                b) You acknowledge and agree that Solar Topps is not responsible or liable for messages you receive, even if they are unlawful,
                harassing, libelous, privacy invading, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable, or infringe
                the intellectual property or other rights of another.
                </p>
              <p>
                c) You acknowledge that Solar Topps will not be responsible for any injuries or damages connected with the use of, loss of use of,
                or inability to use, the Site.Solar Topps does not guarantee that message keys will always be available.Solar Topps does not take
                responsibility if keys are lost for any reason.The user is solely responsible for any and all information that he or she transmits
                using the Site.Solar Topps will not be responsible or liable for any product acquired or requested using the Site.The user’s sole
                and exclusive remedy is to discontinue their use of the Site.
                </p>
              <p>
                d) YOU AGREE TO ACCEPT THE SITE “AS IS” AND TO USE IT AT YOUR SOLE RISK.SOLAR TOPPS DISCLAIMS ALL REPRESENTATIONS,
                WARRANTIES AND GUARANTEES OF ANY KIND, EXPRESSED OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTIBILITY OR
                FITNESS FOR PARTICULAR PURPOSE.YOU AGREE THAT SOLAR TOPPS WILL HAVE NO LIABILITY FOR INJURIES OR DAMAGES OF ANY KIND WHATSOEVER.
                THIS SECTION 5 IS A FUNDAMENTAL ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN YOU AND SOLAR TOPPS.NEITHER THE SITE NOR THE SERVICE
                WOULD BE MAINTAINED WITHOUT SUCH DISCLAIMERS AND LIMITATIONS OF LIABILITY IN EFFECT.
              </p>
            </div>
            <div className="heading">6. Indemnification</div>
            <div className="text">
              You agree that Solar Topps, its subsidiaries, officers and employees, will not be held responsible for any third party claim,
              demand, or damage, including reasonable attorneys’ fees, arising out of your use of the Site.
            </div>
            <div className="heading">7. Export Control Laws</div>
            <div className="text">
              Export of any information from this Site is subject to all United States Export Control laws.No content from this Site may
              be downloaded or otherwise exported in violation of these or any other laws.
            </div>
            <div className="heading">8. Amendment to User Agreement</div>
            <div className="text">
              Solar Topps has the right to amend this User Agreement at any time by posting the amended User Agreement on this Site.The amended User 
              Agreement will be effective on the date specified in the posting.Your use of the Site following the effectiveness of any notice of 
              amendment will indicate your acceptance of the amended User Agreement.
            </div>
            <div className="heading">9. Governing Law and Jurisdiction</div>
            <div className="text">
              This User Agreement and all other aspects of your use of the Site shall be governed by the laws of the State of Arizona, 
              without regard to its conflicts of laws principles.The parties submit to the jurisdiction of and agree that all claims and 
              disputes arising out of this User Agreement or your use of the Site shall be submitted to and resolved by binding arbitration 
              in Phoenix, Arizona pursuant to the rules of the American Arbitration Association, and shall not be consolidated in any arbitration 
              with any claim or controversy of any other party.Judgment on the arbitration award may be entered in any court having jurisdiction
              thereof.Either you or Solar Topps may seek any interim or preliminary relief from a court of competent jurisdiction necessary to
              protect the rights or property of you or Solar Topps pending the completion of arbitration.
            </div>
            <div className="heading">10. Links to Third - Party Sites, Advertisers and Promotions</div>
            <div className="text">
              <p>
                a) The links included within this Site may allow you leave the Site and visit third party sites.These third party sites are not 
                under the control of Solar Topps.Solar Topps will not be responsible for the contents of any third party site nor is Solar 
                Topps responsible for the functionality of any third party site.Solar Topps provides links between our Site and third party 
                sites to you strictly as a convenience.A link’s inclusion in this Site does not constitute an endorsement the site or its 
                operators or of the goods or services provide by or accessed through said site.
              </p>
              <p>
                b) Any promotions sponsored by advertisers on the Site or your dealings with said advertisers are matters solely between you and 
                  that advertiser or third party.Solar Topps will not be responsible in whole or in any part for any such connections or dealing 
                  with advertisers, third parties or their promotions.
              </p>
            </div>
            <div className="heading">11. Promotions, Referrals and Gift Cards</div>
            <div className="text">
              <p>
                a) If not stated herein and a promotion, referral or gift card(“rewards”) is premised on an individual “going solar”, whether that be 
                  yourself or a third party, all rewards will be processed for payment when said individual has their system commissioned and 
                  all final paperwork is successfully processed by the Company.Moreover, all offers shall expire unless stated otherwise on 
                  Company approved material, within thirty days(30) from when issued by the Company.Unless stated otherwise, all rewards 
                  will be accepted only if a valid coupon has been provided by the Energy Consultant, signed by the Topps’ customer at time 
                  of entering into an agreement to “go solar, ” and has been received in Company’s office prior to expiration date.
              </p>
              <p>
                b) ”We Pay Your Last 3 Electric Bills” Promotion: The Company will pay a Topps Customers’ last three electric bills the customer 
                  paid prior to going solar.This value will be paid once the account owner to whom the Topps Customer Account is associated 
                  is able to show proof of payment of these bills.The value paid by the Company is capped at $500 for the total of the three 
                  month period.This period will be determined by the Company as requested in its sole discretion.Lastly, this promotion is not 
                  valid if the Topps’ customer has received any amount of a discount on the system price when entering into the agreement.
              </p>
            </div>
            <div className="heading">12. Vendor Agreements</div>
            <div className="text">
              No Employee, independent contractor or their agent have any authority to act, to enter into any contract, or to incur any liability 
              on behalf of the Company.There will be no actual or implied authority to act in such a manner unless specifically authorized
              by the Company President in writing beforehand to the third party with whom relationship is being established.All contractual
              obligations, to be valid and enforceable, must be entered into by and only with the Company President and a Certified Copy of 
              Resolutions of Corporation must be provided by the Company to the Vendor.Moreover, electronic signatures will not suffice.All 
              valid contracts must contain a wet - signature.
            </div>
            <div className="heading">13. Entire Agreement</div>
            <div className="text">
              This User Agreement and all materials incorporated by reference constitute the entire understanding between you and us with respect 
              to your rights and obligations as a user of the Site.If any provision of this User Agreement is held to be invalid or 
              unenforceable, that provision shall be struck and the remaining provisions shall be enforced.The failure by Solar Topps 
              to enforce any provision of this User Agreement at any time is not a waiver of any provision or right.
            </div>
        </div>
        <Footer />
      </div>
      );
    }
  }
      
export default TermsAndConditionsComponent;