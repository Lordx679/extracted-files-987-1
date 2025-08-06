import type { Express } from "express";
import { createServer, type Server } from "http";

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
