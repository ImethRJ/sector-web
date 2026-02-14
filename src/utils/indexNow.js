// src/utils/indexNow.js
export const submitToIndexNow = async () => {
  const KEY = "220e5c9d7d924fada2478adfd92a9bf2"; // Your NEW key
  const HOST = "sectorinstitute.lk";             // Your NEW .lk domain

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://sectorinstitute.lk/220e5c9d7d924fada2478adfd92a9bf2.txt`,
    urlList: [
      `https://sectorinstitute.lk/`,
      `https://sectorinstitute.lk/all-tutors`
    ]
  };

  try {
    const response = await fetch('/api/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log("✅ Sector SEO: sectorinstitute.lk successfully indexed.");
    }
  } catch (err) {
    console.error("❌ Sector SEO: Failed to index .lk domain", err);
  }
};