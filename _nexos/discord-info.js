// Function to fetch Discord widget status
async function fetchDiscordData() {
  try {
    const response = await fetch(`http://localhost:3001/discord-info`);
    if (!response.ok) {
      throw new Error('Failed to fetch Discord widget data');
    }
    const infos = await response.json();
    return infos;
  } catch (error) {
    console.error('Error fetching Discord widget:', error.message);
    return null;
  }
}

// Function to update HTML with Discord widget data
async function updateDiscordData() {
  const infos = await fetchDiscordData();
  if (infos) {
    const infoContainer = document.getElementById('discord-info');
    infoContainer.innerHTML = '';
    const infoDiv = document.createElement('div');
    infoDiv.className = 'message';
    infoDiv.innerHTML = `
  <div class="flex p-2 gap-4">
  <img src="https://cdn.discordapp.com/icons/832187937675804683/454fead076c6b3a154905d21d3ed7736.webp?size=128"
    alt="Server Logo" width="48" height="48">
  <div class="flex flex-col">
    <div class="flex gap-4">
      <h2>${infos.name}</h2>
      <p>${infos.presence_count} ONLINE</p>
    </div>
    <p>${infos.instant_invite}</p>
  </div>
    <img src="https://streamkit.discord.com/static/media/discord_logo_white.9a823ca6b8fc45606216d185eb2ba419.svg"
      alt="Discord Logo" width="48" height="48">
</div>
`;
    infoContainer.appendChild(infoDiv);
  } else {
    // Handle error or display a message
    document.getElementById('discord-info').innerHTML = '<p>Failed to fetch Discord widget data.</p>';
  }
}

// Initial 5-second delay before the first fetch
setTimeout(() => {
  updateDiscordData();
  
  // Refresh every minute thereafter
  setInterval(updateDiscordData, 90000); // Refresh every 60 seconds (1 minute)
}, 4000); // Initial delay of 5 seconds