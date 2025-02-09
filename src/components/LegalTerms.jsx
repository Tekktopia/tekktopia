const LegalTerms = () => {
  const terms = [
    {
      list: 'When ordering or registering on our site, as appropriate, you may be asked to enter your full name, gender, age, e-mail address, mailing address, phone number, date of birth, bank account',
    },
    {
      list: "To facilitate our Service, we request certain third-party personal information from you, or your mobile devices address book, such as your recipient's full name, physical address, email addresss,number, and credit or debit card information. This is required information to process your transaction and to help you with your experience, and telephone number. We may also collect from you the recipient's sensitive financial information including bank account numbers",
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
  const terms2 = [
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
        <h1 className="text-5xl sm:text-[60px]/7 pb-2 text-[#1B0000]">
          Terms & Conditions
        </h1>
        <h3 className="pb-2 text-[#1A1717] ">VI. UPDATED: 20th March 2023</h3>
        <p className="text-[#4F5E71]/70 pb-5 font-[400px] text-sm">
          Terms of Service
        </p>
      </div>
      <div className="mb-4">
        <p className="text-[#4F5E71]/70 text-sm">
          quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
          adipisci velit, sed quia non numquat dicta sunt explicabo. Nemo enim
          ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
          quia consequuntur magni dolores eos qui ratione voluptatem sequi
          nesciunt. Neque porro squam est, qui dolorem ipsum quia dolor sit amet
          consect perspielatis unde omnis iste hatus erfor sit voluptatem
          accusantium doloremque laudantium, tota luptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae I minima veniam,
          quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi
          ut ricevelit sed quia non numquam eius modi tempora incidunt ut labore
          et dolore magnam aliquam quaerat voluptatem. Ut oriosam, nisi ut
          aliquid ex ea commodi consequatur? Quis autem vel eum iure
          reprehenderit qui in ea voluptate velit lore magnam aliquam quaerat
          voluptatem. Ut sse quam nihil molestiae consequatur, vel illum qui
          dolorem eum fugiat quo voluptas nulla pariatur?
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
          {terms.map((p, index) => (
            <li key={index} className="list-decimal mb-3 text-[#4F5E71]/70">
              {p.list}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl pb-4 w-full text-[#1B0000]  ">
          We use cookies to:
        </h3>
        <ul className="mb-3">
          {terms2.map((p, index) => (
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

export default LegalTerms;
