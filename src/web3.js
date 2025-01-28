let requesting = false;

const requestAccounts = async () => {
  if (requesting) return;  // ถ้ากำลังขออยู่แล้ว ให้ข้ามการทำงาน
  requesting = true;

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log("Accounts:", accounts);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    requesting = false;  // รีเซ็ตสถานะเมื่อเสร็จสิ้นการทำงาน
  }
};
