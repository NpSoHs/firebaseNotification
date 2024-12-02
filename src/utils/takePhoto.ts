export const fetchPhoto = async (photoUrl: string) => {
    // ตรวจสอบว่า photoUrl เป็น string หรือไม่
    if (typeof photoUrl !== 'string') {
      console.error("photoUrl is not a valid string");
      return;
    }
  
    const response = await fetch(photoUrl);
  
    if (response.ok) {
      const data = await response.blob(); // รับ Blob จาก API response
      const photoUrls = URL.createObjectURL(data); // สร้าง URL ชั่วคราวจาก Blob
      console.log(photoUrls);
      return photoUrls;
    } else {
      console.error("Failed to fetch photo");
    }
  };
  