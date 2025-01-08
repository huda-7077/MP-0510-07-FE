const PrivacyPolicyPage = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4">
        At <strong>Star Ticket</strong>, we are committed to protecting your
        privacy. This Privacy Policy explains how we collect, use, and safeguard
        your personal information.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">
        1. Information We Collect
      </h2>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>Personal Information:</strong> This includes your name, email
          address, phone number, and payment details when you purchase tickets.
        </li>
        <li>
          <strong>Non-Personal Information:</strong> This includes data such as
          browser type, IP address, and website usage patterns.
        </li>
      </ul>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">
        2. How We Use Your Information
      </h2>
      <ul className="mb-4 list-inside list-disc">
        <li>To process ticket purchases and provide customer support.</li>
        <li>
          To send you event updates, promotional offers, and service
          notifications.
        </li>
        <li>To improve our website, services, and user experience.</li>
      </ul>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">
        3. Sharing Your Information
      </h2>
      <p className="mb-4">
        We do not sell or rent your personal information to third parties.
        However, we may share your information with:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>Service providers who assist in ticket processing and delivery.</li>
        <li>Event organizers for event management purposes.</li>
        <li>
          Legal authorities if required by law or to protect our rights and
          users' safety.
        </li>
      </ul>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">
        4. Cookies and Tracking Technologies
      </h2>
      <p className="mb-4">
        We use cookies and similar tracking technologies to enhance your
        experience on our website. Cookies help us understand how you use our
        site and enable us to provide personalized content.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">5. Your Rights</h2>
      <ul className="mb-4 list-inside list-disc">
        <li>
          Access, update, or delete your personal information at any time.
        </li>
        <li>
          Opt-out of receiving promotional emails by clicking the "unsubscribe"
          link.
        </li>
        <li>Request details about how your data is used.</li>
      </ul>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">6. Data Security</h2>
      <p className="mb-4">
        We implement appropriate technical and organizational measures to
        protect your personal information from unauthorized access, disclosure,
        or loss.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">7. Third-Party Links</h2>
      <p className="mb-4">
        Our website may contain links to third-party websites. We are not
        responsible for the privacy practices or content of these websites.
        Please review their privacy policies before providing any personal
        information.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">
        8. Changes to This Policy
      </h2>
      <p className="mb-4">
        We reserve the right to update this Privacy Policy at any time. Any
        changes will be posted on this page with a revised "last updated" date.
      </p>

      <h2 className="mb-2 mt-6 text-2xl font-semibold">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy or our data
        practices, please contact us at:{" "}
        <a
          href="mailto:privacy@starticket.com"
          className="text-blue-600 underline"
        >
          privacy@starticket.com
        </a>
        .
      </p>

      <p className="mt-6 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
