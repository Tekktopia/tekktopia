const LegalPolicy = () => {
  const policy1 = [
    {
      list: 'When ordering or registering on our site, as appropriate, you may be asked to enter your full name, gender, age, e-mail address, mailing address, phone number, date of birth, bank account number, and credit or debit card information. This is required information to process your transaction and to help you with your experience.',
    },
    {
      list: "To facilitate our Service, we request certain third-party personal information from you, or your mobile devices address book, such as your recipient's full name, physical address, email address, and telephone number. We may also collect from you the recipient's sensitive financial information including bank account numbers.",
    },
    {
      list: ' Information that we indirectly obtain from you, such as information about the device, hardware, and software you use when accessing the Service, your IP address, the pages you access on this website, and other websites that you visit prior to accessing the Service.',
    },
    {
      list: 'When ordering or registering on our site, as appropriate, you may be asked to enter your full name, gender, age, e-mail address, mailing address, phone number, date of birth, bank account',
    },

    {
      list: ' Information that we indirectly obtain from you, such as information about the device, hardware, and software you use when accessing the Service, your IP address, the pages you access on this website, and other websites that you visit prior to accessing the Service.',
    },
  ];
  const policy2 = [
    {
      list: 'Help remember and process your transactions.',
    },
    {
      list: "Understand and save user's preferences for future visits.",
    },
    {
      list: ' Compile aggregate data about site traffic and site interactions to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.',
    },
  ];
  return (
    <section className="gap-6 flex flex-col">
      <div className="gap-4 flex flex-col">
        <h1 className="text-5xl sm:text-[60px]/7 mb-4 text-[#1B0000]">
          {'Privacy Policy'}
        </h1>
        <h3 className="pb-2 text-[#1A1717] ">
          {
            'Your privacy is important to us. Heres how we use and protect your data.'
          }
        </h3>
        <p className="text-[#4F5E71]/70 pb-5 font-[400px] text-sm">
          {'Last updated on March 1, 2025'}
        </p>
      </div>
      <div className="mb-4">
        <p className="text-[#4F5E71]/70 text-sm">
          Welcome to Tekktopia. Your privacy is important to us, and we are
          committed to protecting your personal data. This Privacy Policy
          explains how we collect, use, disclose, and protect your information
          when you visit our website, and interact with our services. By
          accessing our website or using our services, you agree to the
          practices described in this policy. We strive to be transparent about
          our data practices and ensure that your personal information is
          handled securely and in compliance with applicable data protection
          laws. Please take a moment to read this Privacy Policy carefully. If
          you have any questions or concerns about how we handle your data, feel
          free to contact us.
        </p>
      </div>
      <div className="text-sm">
        <h3 className="text-xl sm:text-2xl pb-4 w-full text-[#1B0000]  sm:w-4/5">
          What personal information do we collect from the people that visit our
          website or app?
        </h3>

        <p className="text-[#1B0000] pb-5">
          We may collect the following information about you, which may include
          non-public information:
        </p>
        <ul className="mb-5">
          {policy1.map((p, index) => (
            <li key={index} className="list-decimal mb-3 text-[#4F5E71]/70">
              {p.list}
            </li>
          ))}
        </ul>
        <p className="text-[#1B0000] pb-5">
        You may provide us with personal information about others, such as Recipients’ name and identifiers, address, phone number, bank account details or email address. If so, you confirm that you have appropriate authority to do so and to allow us to use that information and we will only use it for the specific reason for which it was provided to us.
        
        </p>
        <p>If you believe that one of your contacts has provided us with your personal information and you would like to request that it be removed from our database, please contact us here: <b>info@tekktopia.com</b></p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl pb-4 w-full text-[#1B0000]  ">
          We use cookies to:
        </h3>
        <ul className="mb-3">
          {policy2.map((p, index) => (
            <li
              key={index}
              className="list-decimal mb-3 text-[#4F5E71]/70 text-sm"
            >
              {p.list}
            </li>
          ))}
        </ul>

        <div className="text-[#4F5E71]/70 text-sm flex flex-col gap-4">
          <p>
            You can choose to have your computer warn you each time a cookie is
            being sent, or you can choose to turn off all cookies. You do this
            through your browser (like Internet Explorer) settings. Each browser
            is a little different, so look at your browser&#39;s Help menu to
            learn the correct way to modify your cookies.
          </p>
          <p>
            If you disable cookies, you will not be able to conduct a
            transaction.
          </p>
          <p>
            {' '}
            As is true of most web sites, we gather certain information
            automatically and store it in log files. This information may
            include internet protocol (IP) addresses, browser type, internet
            service provider (ISP), referring/exit pages, operating system,
            date/time stamp, and/or clickstream data. We do link this
            automatically collected data to other information we collect about
            you.
          </p>
          <p>
            We partner with a third party to either display advertising on our
            website or to manage our advertising on other sites. Our third-party
            partner may use technologies such as cookies to gather information
            about your activities on this website and other sites to provide you
            with advertising based upon your browsing activities and interests.
            If you wish to opt out of interest-based advertising,click here
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-xl sm:text-2xl pb-4 w-full text-[#1B0000]  ">
          Mobile Application
        </h3>
        <div className="text-[#4F5E71]/70 text-sm flex flex-col gap-4">
          <p>
            When you download and use our Services, we automatically collect
            information on the type of device you use, operating system version,
            and system and performance information
          </p>
          <p>
            We send you push notifications from time to time to update you about
            any events or promotions that we may be running. If you no longer
            wish to receive these types of communications, you may turn them off
            at the device level. To ensure you receive proper notifications, we
            will need to collect certain information about your device such as
            operating system and user identification information.
          </p>
          <p>
            We collect your location-based information for the purpose of
            locating a place that you may be searching for in your area. We will
            only share this information with our mapping provider for the sole
            purpose of providing you with this service
          </p>
          <p>
            We use mobile analytics software to allow us to better understand
            the functionality of our Mobile Software on your phone. This
            software may record information such as how often you use the
            application, the events that occur within the application,
            aggregated usage, performance data, and where the application was
            downloaded from. We do not link the information we store within the
            analytics software to any personally identifiable information you
            submit within the mobile application.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LegalPolicy;
