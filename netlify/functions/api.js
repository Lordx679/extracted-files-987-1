const express = require('express');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Discord avatar API route
app.get('/api/discord-avatar', async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ 
        error: 'Discord User ID is required' 
      });
    }

    const botToken = process.env.DISCORD_BOT_TOKEN;
    const timestamp = Date.now();
    
    // Method 1: Try with bot token if available
    if (botToken) {
      try {
        console.log(`Attempting Discord API request for user ${userId} with bot token...`);
        
        const discordResponse = await fetch(`https://discord.com/api/v10/users/${userId}`, {
          headers: {
            'Authorization': `Bot ${botToken}`,
            'Content-Type': 'application/json',
            'User-Agent': 'LORD-Portfolio-Bot/1.0'
          },
        });

        console.log(`Discord API response status: ${discordResponse.status}`);

        if (discordResponse.ok) {
          const userData = await discordResponse.json();
          console.log('Discord user data received:', { 
            username: userData.username, 
            avatar: userData.avatar ? 'Present' : 'None',
            discriminator: userData.discriminator 
          });
          
          const avatarUrl = userData.avatar 
            ? `https://cdn.discordapp.com/avatars/${userId}/${userData.avatar}.png?size=256&t=${timestamp}`
            : `https://cdn.discordapp.com/embed/avatars/${parseInt(userData.discriminator) % 5}.png`;

          res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          });

          return res.json({
            avatarUrl,
            username: userData.username,
            discriminator: userData.discriminator,
            lastUpdated: timestamp,
            method: 'bot_api',
            hasRealAvatar: !!userData.avatar
          });
        } else {
          const errorText = await discordResponse.text();
          console.error(`Discord API error ${discordResponse.status}:`, errorText);
        }
      } catch (error) {
        console.error('Bot token request failed:', error);
      }
    } else {
      console.log('No Discord bot token available');
    }

    // Method 2: Try known avatar hash
    const knownAvatarHash = process.env.DISCORD_AVATAR_HASH;
    
    if (knownAvatarHash) {
      const realAvatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${knownAvatarHash}.png?size=256&t=${timestamp}`;
      
      return res.json({
        avatarUrl: realAvatarUrl,
        username: 'LORDX679',
        discriminator: '0000',
        lastUpdated: timestamp,
        method: 'known_hash'
      });
    }

    // Final fallback: Default avatar
    const defaultAvatarIndex = parseInt(userId) % 5;
    const defaultAvatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png?t=${timestamp}`;

    return res.json({
      avatarUrl: defaultAvatarUrl,
      username: 'LORDX679',
      discriminator: '0000',
      lastUpdated: timestamp,
      method: 'default_fallback',
      message: 'لعرض صورتك الحقيقية، يرجى إضافة DISCORD_BOT_TOKEN أو DISCORD_AVATAR_HASH في الـ environment variables'
    });

  } catch (error) {
    console.error('Error in discord-avatar endpoint:', error);
    
    return res.status(500).json({ 
      error: 'Failed to fetch Discord avatar',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Export the serverless function
module.exports.handler = serverless(app);