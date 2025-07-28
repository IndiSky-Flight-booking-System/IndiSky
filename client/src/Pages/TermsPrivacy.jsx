import React from 'react';
import SlideBar from '../Component/SlideBar';
import Footer from '../Component/Footer';

function TermsPrivacy() {
  return (
    <div>
      <SlideBar />
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4" style={{ color: '#512888' }}>Terms & Conditions / Privacy Policy</h2>

        <div className="p-4 border rounded bg-light shadow-sm">
          <h4 className="mb-3">Terms & Conditions</h4>
          <p>
            By using IndiSky, you agree to comply with and be bound by the following terms and conditions of use.
            All bookings are subject to availability and confirmation.
            IndiSky reserves the right to change pricing and policies at any time without prior notice.
            Users are responsible for the accuracy of personal and booking details provided.
            Refund and cancellation policies apply based on the airline's rules and IndiSky's internal policies.
          </p>

          <h4 className="mt-4 mb-3">Privacy Policy</h4>
          <p>
            IndiSky is committed to protecting your personal data. Your information is used only to facilitate bookings and improve user experience.
            We do not sell or share your data with third parties except when required by law or necessary for service fulfillment.
            We implement standard security practices to protect your data from unauthorized access.
            By using our services, you consent to our data collection and use as outlined in this policy.
          </p>

          <p className="mt-4">
            If you have any concerns about privacy or our terms, please contact support via the <a href="/contact">Contact Page</a>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TermsPrivacy;
