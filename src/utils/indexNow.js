export const submitToIndexNow = async () => {
  const payload = {
    host: "sector-institute.web.app",
    key: "6d60cb2cf77640de8f37ef5846678754",
    keyLocation: "https://sector-institute.web.app/6d60cb2cf77640de8f37ef5846678754.txt",
    urlList: ["https://sector-institute.web.app/"]
  };

  try {
    // Call your OWN firebase function instead of api.indexnow.org
    await fetch('/api/indexnow', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log("✅ Success via Proxy!");
  } catch (err) {
    console.error("❌ Proxy failed", err);
  }
};