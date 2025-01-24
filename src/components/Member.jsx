import { FaLinkedin } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Member component to display individual team member details
export default function Member({ member }) {
  return (
    <div className="flex flex-col items-center mx-auto p-2">
      {/* Team member image */}
      <img src={member.imageUrl} alt="team" className=" rounded-[11px] h-100 object-cover w-[306px] h-[320px]" />

      <div className="-mt-8 w-full p-2">
        <div className="flex flex-row bg-white rounded-lg items-center shadow-lg p-2">
          <div className="flex flex-col">
            {/* Team member role */}
            <h3 className="text-gray-500">{member.role}</h3>
            {/* Team member name */}
            <h2>{member.name}</h2>
          </div>
          {/* LinkedIn profile link */}
          <a
            className="ml-auto"
            href={member.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-[#B0610F] text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Define PropTypes for the Member component
Member.propTypes = {
  member: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired, // URL of the team member's image
    role: PropTypes.string.isRequired, // Role of the team member
    name: PropTypes.string.isRequired, // Name of the team member
    linkedIn: PropTypes.string.isRequired, // LinkedIn profile URL of the team member
  }).isRequired,
};
