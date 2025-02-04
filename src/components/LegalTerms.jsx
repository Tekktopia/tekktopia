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
  return (
    <section className="">
      <div className="pb-5">
        <h1 className="text-5xl pb-2">Terms & Conditions</h1>
        <h3 className="pb-2">VI. UPDATED: 20th March 2023</h3>
        <p className="text-neutral-500 pb-5">Terms of Service</p>
        <p className="text-neutral-500 text-sm">
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
        <h3 className="text-3xl pb-4 w-4/5">
          What personal information do we collect from the people that visit our
          website or app?
        </h3>
        <p className="text-neutral-500 pb-5">
          We may collect the following information about you, which may include
          non-public information:
        </p>
        <ul>
          {terms.map((p, index) => (
            <li key={index} className="list-decimal mb-3 text-neutral-500">
              {p.list}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LegalTerms;
