import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t shadow px-6 py-3 text-center text-gray-600">
      <p>
        &copy; {new Date().getFullYear()} Dormitory Management System. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
