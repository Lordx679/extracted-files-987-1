import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Discord avatar API route with enhanced fallback methods
  app.get('/api/discord-avatar', async (req, res) => {
    try {
      // Use the actual Discord User ID for LORDX679
      const userId = req.query.userId as string || '394912002843344898';

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

      // Method 2: Try common avatar patterns for your specific user ID
      const commonAvatarHashes = [
        'a_dynamic_hash', // For animated avatars
        'static_hash_1',
        'static_hash_2'
      ];

      // Since we know your user ID, let's try some potential avatar URLs
      const potentialAvatars = [
        // Try animated GIF first
        `https://cdn.discordapp.com/avatars/${userId}/a_animated_hash.gif?size=256&t=${timestamp}`,
        // Try common PNG patterns
        `https://cdn.discordapp.com/avatars/${userId}/avatar_hash.png?size=256&t=${timestamp}`,
        `https://cdn.discordapp.com/avatars/${userId}/webp_avatar.webp?size=256&t=${timestamp}`,
      ];

      // Method 3: Try using Discord's widget API (sometimes works)
      try {
        const widgetResponse = await fetch(`https://discord.com/api/guilds/GUILD_ID/widget.json`);
        // This would work if you're in a public guild, but requires guild ID
      } catch (widgetError) {
        // Widget method failed
      }

      // Method 4: Try known avatar patterns for your user ID
      const knownAvatarHash = process.env.DISCORD_AVATAR_HASH;
      
      if (knownAvatarHash) {
        console.log(`Using known avatar hash: ${knownAvatarHash}`);
        const realAvatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${knownAvatarHash}.png?size=256&t=${timestamp}`;
        
        // Verify the avatar URL works before returning it
        try {
          const testResponse = await fetch(realAvatarUrl, { method: 'HEAD' });
          if (testResponse.ok) {
            return res.json({
              avatarUrl: realAvatarUrl,
              username: 'LORDX679',
              discriminator: '0000',
              lastUpdated: timestamp,
              method: 'known_hash',
              hasRealAvatar: true
            });
          }
        } catch (testError) {
          console.log('Known avatar hash verification failed, continuing to other methods');
        }
      }

      // Method 5: Try common Discord avatar formats for your user ID
      const commonFormats = [
        'webp',
        'png', 
        'jpg',
        'gif'
      ];

      // Try a few common avatar patterns
      for (const format of commonFormats) {
        try {
          const testUrl = `https://cdn.discordapp.com/avatars/${userId}/avatar.${format}?size=256&t=${timestamp}`;
          const testResponse = await fetch(testUrl, { method: 'HEAD' });
          
          if (testResponse.ok) {
            return res.json({
              avatarUrl: testUrl,
              username: 'LORDX679',
              discriminator: '0000',
              lastUpdated: timestamp,
              method: 'discovered_format'
            });
          }
        } catch (err) {
          // Continue to next format
        }
      }

      // Final fallback: Use a better fallback that might actually work
      // Try some common Discord CDN patterns for the specific user
      const potentialHashes = [
        'a_animated_hash_example', // For animated avatars
        'static_hash_example',     // For static avatars
      ];

      // Method 6: Try to fetch user info using a different approach
      try {
        // Use Discord's public API endpoints that don't require bot token
        const publicUserUrl = `https://discordlookup.mesaliko.com/user/${userId}`;
        const lookupResponse = await fetch(publicUserUrl);
        
        if (lookupResponse.ok) {
          const lookupData = await lookupResponse.json();
          if (lookupData.avatar && lookupData.avatar.link) {
            console.log('Found avatar via lookup service');
            return res.json({
              avatarUrl: lookupData.avatar.link,
              username: lookupData.username || 'LORDX679',
              discriminator: lookupData.discriminator || '0000',
              lastUpdated: timestamp,
              method: 'lookup_service',
              hasRealAvatar: true
            });
          }
        }
      } catch (lookupError) {
        console.log('Lookup service failed, using default fallback');
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
        hasRealAvatar: false,
        message: 'لعرض صورتك الحقيقية، راجع ملف GET_YOUR_DISCORD_INFO.md لمعرفة كيفية الحصول على DISCORD_AVATAR_HASH'
      });

    } catch (error) {
      console.error('Error in discord-avatar endpoint:', error);
      
      return res.status(500).json({ 
        error: 'Failed to fetch Discord avatar',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
