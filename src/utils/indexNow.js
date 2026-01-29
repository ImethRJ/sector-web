// src/utils/indexNow.js

export const submitToIndexNow = async () => {
  const KEY = "6d60cb2cf77640de8f37ef5846678754"; // Your existing key from public folder
  const HOST = "sector-institute.web.app";
  
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://sector-institute.web.app/6d60cb2cf77640de8f37ef5846678754.txt`, // Matching your file in the public directory
    urlList: [
      `https://sector-institute.web.app/`,
      `https://sector-institute.web.app/all-tutors`, // Your faculty directory page
      `https://sector-institute.web.app/sector19365`  // Your secret admin URL
    ]
  };

  try {
    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.status === 200) {
      console.log("✅ Sector Institute: Bing notified of all pages including secret admin.");
    } else {
      console.error("⚠️ IndexNow Error:", response.status); // Check for 403 or 422
    }
  } catch (error) {
    console.error("❌ IndexNow: Network error", error);
  }
};