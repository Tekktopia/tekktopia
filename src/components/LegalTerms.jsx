const LegalTerms = () => {
  const terms = [
    'Mobile & Web App Development.',
    'Brand Identity & Design.',
    'Cloud Computing Services.',
    'Data Analytics & Business Intelligence.',
    'IT Consulting.',
    'Cybersecurity Solutions.',
  ];

  const sections = [
    {
      title: 'User Responsibilities',
      items: [
        'You must provide accurate and up-to-date information when using our services.',
        'Unauthorized use of our services, including hacking or reverse engineering, is strictly prohibited.',
        'You agree not to engage in any activities that may harm Tekktopia or other users.',
        'Users must comply with all applicable laws and regulations when using our services.',
        'Any misuse of our services, such as spamming or fraudulent activities, will result in immediate termination of access.',
      ],
    },
    {
      title: 'Account Registration',
      items: [
        'To access certain services, users may be required to create an account.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'Tekktopia is not liable for any unauthorized access to your account resulting from negligence.',
        'You must notify us immediately of any unauthorized use or security breach.',
      ],
    },
    {
      title: 'Payments and Subscriptions',
      items: [
        'All payments must be made through our designated payment methods.',
        'Failure to complete payment may result in service suspension or termination.',
        'Tekktopia reserves the right to update pricing and service charges at any time.',
        'Refund policies, if applicable, will be outlined in separate agreements or service-specific terms.',
      ],
    },
    {
      title: 'Service Availability and Modifications',
      items: [
        'We strive to keep our services available at all times but do not guarantee uninterrupted access.',
        'Tekktopia reserves the right to modify, suspend, or discontinue any part of our services without prior notice.',
        'Scheduled maintenance or unforeseen technical issues may temporarily affect availability.',
      ],
    },
  ];

  const textSections = [
    {
      title: 'Intellectual Property',
      content:
        'All content, designs, and services offered by Tekktopia remain the intellectual property of Tekktopia. You may not reproduce, distribute, or use our materials without permission.',
    },
    {
      title: 'Data Collection and Privacy',
      content:
        'By using our services, you consent to our data collection practices outlined in our Privacy Policy. We take necessary precautions to ensure that your data is protected and handled responsibly.',
    },
    {
      title: 'Limitation of Liability',
      content:
        'Tekktopia is not responsible for any direct, indirect, incidental, or consequential damages resulting from the use of our services, including but not limited to data loss, service interruptions, or unauthorized access to your information.',
    },
    {
      title: 'Indemnification',
      content:
        'You agree to indemnify and hold Tekktopia, its affiliates, employees, and partners harmless from any claims, damages, or legal expenses resulting from your misuse of our services or violation of these terms.',
    },
    {
      title: 'Modifications',
      content:
        'We reserve the right to update these terms at any time. Changes will be posted on this page, and continued use of our services after modifications constitute acceptance of the revised terms.',
    },
  ];

  return (
    <section className="gap-6 flex flex-col">
      <div className="gap-4 flex flex-col">
        <h1 className="text-5xl sm:text-[60px]/7 pb-2 text-[#1B0000]">
          {'Terms & Conditions'}
        </h1>
        <h3 className="pb-2 text-[#1A1717]">{'VI. UPDATED: 1st March 2025'}</h3>
        <p className="text-[#4F5E71]/70 pb-5 font-[400px] text-sm">
          {'Terms of Service'}
        </p>
      </div>
      <div className="mb-4">
        <p className="text-[#4F5E71]/70 text-sm">
          {
            '   Welcome to Tekktopia. These Terms and Conditions govern your use of our website and services. By accessing or using any part of our services, you acknowledge that you have read, understood, and agreed to be bound by these terms. If you do not agree with any part of these terms, you should discontinue your use of our services immediately.'
          }
        </p>
      </div>
      <div className="text-sm">
        <h3 className="text-xl sm:text-2xl pb-4 w-full text-[#1B0000]">
          {'Services Provided'}
        </h3>
        <p className="text-[#1B0000] pb-5">{'Tekktopia Specializes in:'}</p>
        <ul className="mb-5">
          {terms.map((item, index) => (
            <li key={index} className="list-decimal mb-3 text-[#4F5E71]/70">
              {item}
            </li>
          ))}
        </ul>
      </div>
      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl sm:text-2xl pb-4 w-full text-[#1B0000]">
            {section.title}
          </h3>
          <ul className="mb-3">
            {section.items.map((item, idx) => (
              <li
                key={idx}
                className="list-decimal mb-3 text-[#4F5E71]/70 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {textSections.map((section, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl sm:text-2xl pb-4 w-full text-[#1B0000]">
            {section.title}
          </h3>
          <p className="text-[#4F5E71]/70 text-sm">{section.content}</p>
        </div>
      ))}
    </section>
  );
};

export default LegalTerms;
