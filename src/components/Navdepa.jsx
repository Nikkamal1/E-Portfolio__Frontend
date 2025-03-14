import React from 'react';

const Navdepa = () => {
  return (
    <nav className="bg-white text-black h-16 flex items-center justify-between px-6 fixed top-0 left-0 w-full z-10 shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="assets\depa-logo.png"  // เปลี่ยนเป็นที่อยู่ไฟล์รูปโลโก้ของคุณ
          alt="Logo"
          className="h-20"  // ปรับขนาดโลโก้
        />
      </div>

      {/* ข้อมูลอื่นๆ เช่น ปุ่มเมนู หรือปุ่มต่างๆ */}
      {/* <div className="flex items-center space-x-6">
        <button className="text-lg">Menu 1</button>
        <button className="text-lg">Menu 2</button>
        <button className="text-lg">Login</button>
      </div> */}
    </nav>
  );
};

export default Navdepa;
