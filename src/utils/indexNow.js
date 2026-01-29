export const submitToIndexNow = async () => {
  const KEY = "6d60cb2cf77640de8f37ef5846678754";
  const HOST = "sector-institute.web.app";
  
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://sector-institute.web.app/6d60cb2cf77640de8f37ef5846678754.txt`,
    urlList: [
      `https://sector-institute.web.app/`,
      `https://sector-institute.web.app/all-tutors`,
      `https://sector-institute.web.app/sector19365`
    ]
  };

  try {
    const response = await fetch('/api/indexnow', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      console.log("✅ IndexNow: Bing notified via SSR Proxy.");
    }
  } catch (err) {
    console.error("❌ IndexNow: Proxy error", err);
  }
};