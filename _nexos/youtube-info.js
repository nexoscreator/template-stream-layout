async function fetchChannelData() {
  try {
      const response = await fetch('http://localhost:3001/youtube-info');
      const channelData = await response.json();
      document.getElementById('channel-logo').src = channelData.snippet.thumbnails.default.url;
      document.getElementById('channel-title').textContent = channelData.snippet.title;
      document.getElementById('channel-subscribers').textContent = `${channelData.statistics.subscriberCount} SUBSCRIBERS`;
      document.getElementById('channel-link').innerText = channelData.snippet.customUrl;
      document.getElementById('channel-yt').src = 'https://streamkit.discord.com/static/media/discord_logo_white.9a823ca6b8fc45606216d185eb2ba419.svg';
  } catch (error) {
      console.error('Error fetching channel data:', error);
  }
}

// Initial 5-second delay before the first fetch
setTimeout(() => {
  fetchChannelData();
  
  // Refresh every minute thereafter
  setInterval(fetchChannelData, 60000); // Refresh every 60 seconds (1 minute)
}, 1000); // Initial delay of 5 seconds