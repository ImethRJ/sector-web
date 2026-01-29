export const submitToIndexNow = async () => {
  const payload = {
    host: "sector-institute.web.app",
    key: "c67b431d03a8413aba9a76ab20dd9531",
    keyLocation: "https://sector-institute.web.app/c67b431d03a8413aba9a76ab20dd9531.txt",
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