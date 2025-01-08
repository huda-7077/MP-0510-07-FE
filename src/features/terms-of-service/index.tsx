const TermsOfServicePage = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-4">
        Welcome to <strong>Star Ticket</strong>. By using our website and
        services, you agree to the following terms and conditions. Please read
        them carefully.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">1. General Terms</h2>
      <p className="mb-4">
        Star Ticket provides an online platform for purchasing tickets for
        various events. By accessing or using our services, you agree to comply
        with and be bound by these terms.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">
        2. Account Registration
      </h2>
      <p className="mb-4">
        To purchase tickets, you may need to create an account. You are
        responsible for maintaining the confidentiality of your account
        credentials and for all activities that occur under your account.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">3. Ticket Purchases</h2>
      <ul className="mb-4 list-inside list-disc">
        <li>
          All ticket sales are final and non-refundable unless stated otherwise.
        </li>
        <li>
          Tickets are subject to availability and may include additional service
          fees.
        </li>
        <li>
          You are responsible for verifying event details, including date, time,
          and location, before making a purchase.
        </li>
      </ul>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">
        4. Prohibited Activities
      </h2>
      <p className="mb-4">You agree not to:</p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          Resell tickets obtained through Star Ticket without authorization.
        </li>
        <li>Use automated systems to access or interact with the website.</li>
        <li>Engage in fraudulent or illegal activities using the platform.</li>
      </ul>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">
        5. Event Changes and Cancellations
      </h2>
      <p className="mb-4">
        Star Ticket is not responsible for changes or cancellations made by
        event organizers. In such cases, refund or rescheduling policies will be
        determined by the event organizer.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">
        6. Intellectual Property
      </h2>
      <p className="mb-4">
        All content, trademarks, and materials on the Star Ticket website are
        owned by or licensed to us and are protected by intellectual property
        laws. You may not use, copy, or distribute our content without
        permission.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">
        7. Disclaimer and Limitation of Liability
      </h2>
      <p className="mb-4">
        Star Ticket is not liable for any damages arising from your use of our
        website or services. Our liability is limited to the maximum extent
        permitted by law.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">8. Governing Law</h2>
      <p className="mb-4">
        These terms are governed by and construed in accordance with the laws of
        your jurisdiction. Any disputes will be resolved exclusively in the
        courts of the applicable jurisdiction.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">9. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to modify these terms at any time. Continued use of
        the website after changes indicates acceptance of the updated terms.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">10. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these terms, please contact us at{" "}
        <a
          href="mailto:support@starticket.com"
          className="text-blue-600 underline"
        >
          support@starticket.com
        </a>
        .
      </p>

      <p className="mt-6 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default TermsOfServicePage;
