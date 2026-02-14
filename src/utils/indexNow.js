export const submitToIndexNow = async () => {
  const KEY = "220e5c9d7d924fada2478adfd92a9bf2";
  const HOST = "sectorinstitute.lk";

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://sectorinstitute.lk/220e5c9d7d924fada2478adfd92a9bf2.txt`,
    urlList: [
      `https://sectorinstitute.lk/`,
      `https://sectorinstitute.lk/teachers`,
      `https://sectorinstitute.lk/timetable`,
      `https://sectorinstitute.lk/about`
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