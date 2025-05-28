// import teamMember from '../assets/images/teamMember.png';
import Member from '../components/Member';

// TeamMembers component to display a grid of team members
export default function TeamMembers() {
  // Array of team member objects with their details
  const teamMembers = [
    // {
    //   name: 'AKINOLA DANIEL OSHINUBI',
    //   imageUrl: '/daniel-oshinubi.png',
    //   role: 'Founder & MD/CEO',
    //   linkedIn: 'https://www.linkedin.com/in/akinolaoshinubi/',
    // },
    {
      name: 'IREOLUWA ADEOLUWA',
      imageUrl: '/ire_adeoluwa.jpg',
      // role: 'Co-Founder & CTO',
      role: 'Founder & CEO',
      linkedIn: 'https://www.linkedin.com/in/ire-adeoluwa-2068361b5/',
    },
    {
      name: 'BOLUWATIFE ONI',
      imageUrl: '/tife-oni.png',
      role: 'Head, Sales & Business Development',
      linkedIn: 'https://www.linkedin.com/in/boluwatife-oni-connect/',
    },
    {
      name: 'OLUWADAMILARE ADEKOYA',
      imageUrl: '/dami-adekoya.png',
      role: 'Product Manager',
      linkedIn: 'https://www.linkedin.com/in/oluwadamilare-adekoya-370610266/',
    },

    // {
    //   name: 'DAVID AKERELE',
    //   imageUrl: '/unknown2.png',
    //   role: 'Head, Software Development',
    //   linkedIn: 'https://www.linkedin.com/in/david-akerele-38837623a/',
    // },
    {
      name: 'ADEMAKINWA AMORI',
      imageUrl: '/unknown2.png',
      role: 'Head, Product Design',
      linkedIn: 'https://www.linkedin.com/in/ademakinwaa/',
    },

    // {
    //   name: 'SAMUEL OLAWUMI',
    //   imageUrl: '/samuel-olawumi.jpg',
    //   role: 'Software Engineer',
    //   linkedIn: 'https://www.linkedin.com/in/WumiCodes',
    // },
    // {
    //   name: 'JOLAOLUWA OLUSANYA',
    //   imageUrl: '/samuel-olawumi.jpg',
    //   role: 'Software Engineer',
    //   linkedIn: 'https://www.linkedin.com/in/ireoluwa-adesanya-8b5b9b1b4/',
    // },
    {
      name: 'OREOLUWA LEO-DADA',
      imageUrl: '/ore-dada.png',
      role: 'Digital Marketing Executive',
      linkedIn: 'https://www.linkedin.com/in/oreoluwa-leo-dada-73b156248',
    },
    {
      name: 'ADETAYO ADENIYI - L.L.B, B.L, MCIARB [UK]',
      imageUrl: '/unknown2.png',
      role: 'PRINCIPAL PARTNER, ALMOND & GAVEL [LEGAL ADVISER].',
      linkedIn: 'https://www.linkedin.com/in/adetayo-adeniyi-b7930a163/',
    },
  ];

  return (
    // Grid container for displaying team members
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 w-full lg:px-8 gap-8">
      {/* Map over the teamMembers array and render a Member component for each team member */}
      {teamMembers.map((member, index) => {
        return (
          // Render Member component with member details and unique key
          <Member member={member} key={index} />
        );
      })}
    </div>
  );
}
