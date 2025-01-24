import { useState, useEffect, useRef } from 'react';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null); // Tracks the open submenu
  const [isHovering, setIsHovering] = useState(false); // Tracks if the user is hovering
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Tracks mobile menu open/close state
  const [openSubMenu, setOpenSubMenu] = useState(null); // Tracks which mobile submenu is open
  const timeoutRef = useRef(null); // To store the timeout reference

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Services',
      subMenu: [
        { name: 'Mobile & Web Development', href: '/services/mobile-web-dev' },
        {
          name: 'Product Design and Envisioning',
          href: '/services/product-design',
        },
        { name: 'Cloud Computing Services', href: '/services/cloud-computing' },
        { name: 'IT Consulting', href: '/services/it-consulting' },
        {
          name: 'Data Analytics & Business Intelligence',
          href: '/services/data-analytics',
        },
        { name: 'Cybersecurity Solutions', href: '/services/cyber-security' },
      ],
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Career', href: '/career' },
    { name: 'Our Team', href: '/our-team' },
    { name: 'Connect with us', href: '/contact-us', isButton: true },
  ];

  const handleMouseEnter = (name) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovering(true);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
      setOpenDropdown(null);
    }, 300);
  };

  const handleMobileToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleSubMenu = (name) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav className="bg-[#FCFDFF] border-b fixed top-0 p-4 py-1 w-full z-20 flex flex-col box-border lg:flex-row justify-center">
      <div className="px-2 sm:px-6 lg:px-8 flex items-center justify-between w-full h-16 lg:container mx-auto">
        {/* Logo Section */}
        <div className="flex-shrink-0 flex items-center ml-0 font-medium ">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="tekktopia" className="w-8 h-8" />
            <p className="text-[24px] ml-2 sm:text-[30px]">
              <span className="text-[#F5901F]">t</span>ekk
              <span className="text-[#137CC6]">t</span>opia
            </p>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.subMenu && handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={item.subMenu ? '/services' : item.href}
                onClick={(e) => {
                  if (
                    item.name === 'Services' &&
                    openDropdown === item.name &&
                    isHovering
                  ) {
                    e.stopPropagation(); // Stop event bubbling
                  } else {
                    window.location.href = '/services'; // Allow navigation
                  }
                }}
                className={`${
                  item.isButton
                    ? 'bg-[#070223] hover:bg-blue-500 text-[#6797D5] hover:text-white px-4 py-2 box-border'
                    : `${window.location.pathname === item.href ? 'text-[#F5901F]' : 'text-black'} 
hover:text-blue-500 lg:px-3 py-2 box-border`
                } rounded-md text-xs sm:text-sm font-medium flex items-center`}
              >
                {item.name}
                {item.isButton && <FiChevronRight className="ml-2" />}
                {item.subMenu && <FiChevronDown className="ml-2" />}
              </a>

              {/* Dropdown Menu */}
              {item.subMenu && openDropdown === item.name && isHovering && (
                <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-20">
                  {item.subMenu.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-4 py-2 text-sm text-black hover:bg-gray-200"
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={handleMobileToggle}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {!isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <div key={item.name} className="relative">
              <a
                href={item.href}
                className={`${
                  item.isButton
                    ? 'bg-[#070223] hover:bg-blue-500 text-center text-[#6797D5] hover:text-white px-4 py-2'
                    : `${window.location.pathname === item.href ? 'text-[#F5901F]' : 'text-black'} hover:bg-gray-700 hover:text-white px-3 py-2`
                } rounded-md text-base font-medium flex items-center`}
                onClick={() => item.subMenu && toggleSubMenu(item.name)}
              >
                {item.name}
                {item.isButton && <FiChevronRight className="ml-2" />}
                {item.subMenu && <FiChevronDown className="ml-2" />}
              </a>

              {/* Mobile Dropdown Menu */}
              {item.subMenu && openSubMenu === item.name && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.subMenu.map((subItem) => (
                    <a
                      key={subItem.name}
                      href={subItem.href}
                      className="block pl-7 pr-4 py-2 text-base text-black hover:bg-gray-200"
                    >
                      {subItem.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
