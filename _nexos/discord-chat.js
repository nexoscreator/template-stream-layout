// Function to fetch Discord widget status
async function fetchDiscordWidget() {
    try {
        const response = await fetch(`http://localhost:3001/discord-chat`);
        if (!response.ok) {
            throw new Error('Failed to fetch Discord widget data');
        }
        const messages = await response.json();
        return messages;
    } catch (error) {
        console.error('Error fetching Discord widget:', error.message);
        return null;
    }
}

async function fetchMessages() {
    const messages = await fetchDiscordWidget();
    if(messages) {
        const messagesContainer = document.getElementById('discord-messages');
        messagesContainer.innerHTML = '';
        // Get the last 10 messages
        const lastTenMessages = messages.slice(10);
        lastTenMessages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message p-2 bg-gray-700';
            messageDiv.innerHTML = `
                <div class="flex gap-2 items-center">
                <img class="rounded-full" src="https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=32" alt="${message.author.username}" width="32" height="32">
                <h4>${message.author.username}</h4>
                </div>
                <p>${message.content}</p>
            `;
            messagesContainer.appendChild(messageDiv);
        });
    } else {
        // Handle error or display a message
    document.getElementById('discord-messages').innerHTML = '<p>Failed to fetch Discord widget data.</p>';
    }
}

// Initial 5-second delay before the first fetch
setTimeout(() => {
    fetchMessages();
    
    // Refresh every minute thereafter
    setInterval(fetchMessages, 60000); // Refresh every 60 seconds (1 minute)
}, 8000); // Initial delay of 5 seconds