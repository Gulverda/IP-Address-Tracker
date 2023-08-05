const apiKey = 'YOUR_API_KEY';
    const ipApiUrl = `https://api.ipify.org?format=json&apiKey=${apiKey}`;

    async function fetchIpAddress() {
      try {
        const response = await fetch(ipApiUrl);
        const data = await response.json();
        const ipAddress = data.ip;
        document.getElementById('ip-address').textContent = ipAddress;
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    }

fetchIpAddress();