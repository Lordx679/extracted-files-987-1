// Netlify function for Discord avatar fetching
exports.handler = async (event, context) => {
  const userId = event.queryStringParameters?.userId || '394912002843344898';
  const timestamp = Date.now();
  
  try {
    const botToken = process.env.DISCORD_BOT_TOKEN;
    
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

        if (discordResponse.ok) {
          const userData = await discordResponse.json();
          console.log('Discord user data received:', { 
            username: userData.username, 
            avatar: userData.avatar,
            discriminator: userData.discriminator
          });
          
          // If we got the avatar hash, use it with proper format detection
          let avatarUrl;
          if (userData.avatar) {
            // Check if it's animated (starts with a_)
            const isAnimated = userData.avatar.startsWith('a_');
            const extension = isAnimated ? 'gif' : 'png';
            avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${userData.avatar}.${extension}?size=256&t=${timestamp}`;
            console.log(`Generated avatar URL: ${avatarUrl}`);
          } else {
            avatarUrl = `https://cdn.discordapp.com/embed/avatars/${parseInt(userData.discriminator) % 5}.png`;
          }

          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              avatarUrl,
              username: userData.username,
              discriminator: userData.discriminator,
              lastUpdated: timestamp,
              method: 'bot_api',
              hasRealAvatar: !!userData.avatar
            }),
          };
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
      console.log(`Using known avatar hash: ${knownAvatarHash}`);
      const realAvatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${knownAvatarHash}.png?size=256&t=${timestamp}`;
      
      // Verify the avatar URL works before returning it
      try {
        const testResponse = await fetch(realAvatarUrl, { method: 'HEAD' });
        if (testResponse.ok) {
          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              avatarUrl: realAvatarUrl,
              username: 'LORDX679',
              discriminator: '0000',
              lastUpdated: timestamp,
              method: 'known_hash',
              hasRealAvatar: true
            }),
          };
        }
      } catch (testError) {
        console.log('Known avatar hash verification failed, continuing to other methods');
      }
    }

    // Method 3: Try lookup service
    try {
      const publicUserUrl = `https://discordlookup.mesaliko.com/user/${userId}`;
      const lookupResponse = await fetch(publicUserUrl);
      
      if (lookupResponse.ok) {
        const lookupData = await lookupResponse.json();
        if (lookupData.avatar && lookupData.avatar.link) {
          console.log('Found avatar via lookup service:', lookupData.avatar.link);
          return {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
              avatarUrl: lookupData.avatar.link,
              username: lookupData.username || 'LORDX679',
              discriminator: lookupData.discriminator || '0000',
              lastUpdated: timestamp,
              method: 'lookup_service',
              hasRealAvatar: true
            }),
          };
        }
      }
    } catch (lookupError) {
      console.log('Lookup service failed, using default fallback');
    }

    // Final fallback: Default avatar
    const defaultAvatarIndex = parseInt(userId) % 5;
    const defaultAvatarUrl = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png?t=${timestamp}`;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        avatarUrl: defaultAvatarUrl,
        username: 'LORDX679',
        discriminator: '0000',
        lastUpdated: timestamp,
        method: 'default_fallback',
        hasRealAvatar: false,
        message: 'لعرض صورتك الحقيقية، أضف DISCORD_BOT_TOKEN أو DISCORD_AVATAR_HASH في environment variables'
      }),
    };
  } catch (error) {
    console.error('Error in discord-avatar function:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Failed to fetch Discord avatar',
        details: error.message || 'Unknown error'
      }),
    };
  }
};
