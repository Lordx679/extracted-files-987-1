# 🎯 Simple Discord Avatar Integration Guide

## 🚀 **Method 1: Ultra-Simple HTML (Copy & Paste)**

```html
<!-- Replace YOUR_DISCORD_USER_ID with: 394912002843344898 -->
<img src="https://your-domain.replit.app/api/discord-avatar?userId=394912002843344898" 
     alt="My Discord Avatar" 
     style="width: 128px; height: 128px; border-radius: 50%;"
     onclick="this.src=this.src.split('?')[0]+'?userId=394912002843344898&t='+Date.now()">
```

**How it works:**
- The `src` points to your custom API endpoint
- Click the image to refresh manually
- Adds timestamp to prevent caching

---

## 🔄 **Method 2: Auto-Refreshing Version**

```html
<img id="my-discord-avatar" 
     src="https://your-domain.replit.app/api/discord-avatar?userId=394912002843344898" 
     alt="My Discord Avatar" 
     style="width: 128px; height: 128px; border-radius: 50%;">

<script>
// Auto-refresh every 30 seconds
setInterval(function() {
    const img = document.getElementById('my-discord-avatar');
    const timestamp = Date.now();
    img.src = `https://your-domain.replit.app/api/discord-avatar?userId=394912002843344898&t=${timestamp}`;
}, 30000);
</script>
```

---

## 🛡️ **Method 3: With Error Handling & Fallback**

```html
<img id="discord-avatar" 
     src="https://cdn.discordapp.com/embed/avatars/0.png" 
     alt="Discord Avatar" 
     style="width: 128px; height: 128px; border-radius: 50%;">

<script>
async function loadDiscordAvatar() {
    const img = document.getElementById('discord-avatar');
    try {
        const response = await fetch('https://your-domain.replit.app/api/discord-avatar?userId=394912002843344898');
        const data = await response.json();
        img.src = data.avatarUrl;
    } catch (error) {
        console.log('Using fallback avatar');
        img.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
    }
}

// Load on page start and refresh every 30 seconds
loadDiscordAvatar();
setInterval(loadDiscordAvatar, 30000);
</script>
```

---

## 🌐 **Alternative Public APIs (No Backend Required)**

### Option A: Discord CDN Direct (Static)
```html
<!-- This won't auto-update but is super reliable -->
<img src="https://cdn.discordapp.com/embed/avatars/3.png" 
     alt="Discord Default Avatar"
     style="width: 128px; height: 128px; border-radius: 50%;">
```

### Option B: Third-Party Services
```html
<!-- Using a hypothetical third-party service -->
<img src="https://discord-avatar-api.com/394912002843344898.png" 
     alt="Discord Avatar">
```

---

## 🎯 **Ready-to-Use Implementation**

**Replace `your-domain.replit.app` with your actual Replit domain:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Discord Avatar</title>
</head>
<body>
    <h1>Welcome to My Site</h1>
    
    <!-- Your Discord Avatar -->
    <img id="my-avatar" 
         src="https://your-domain.replit.app/api/discord-avatar?userId=394912002843344898" 
         alt="My Discord Avatar"
         style="width: 150px; height: 150px; border-radius: 50%; border: 3px solid #7289da; cursor: pointer;"
         onclick="refreshMyAvatar()">
    
    <p>Click my avatar to refresh it!</p>
    
    <script>
        function refreshMyAvatar() {
            const img = document.getElementById('my-avatar');
            const timestamp = Date.now();
            img.src = `https://your-domain.replit.app/api/discord-avatar?userId=394912002843344898&t=${timestamp}`;
        }
        
        // Auto-refresh every 2 minutes
        setInterval(refreshMyAvatar, 120000);
    </script>
</body>
</html>
```

---

## 📚 **Why Can't You Use Discord Links Directly?**

1. **CORS Issues**: Discord blocks direct embedding from external websites
2. **Authentication**: Discord API requires proper tokens for user data
3. **Caching**: Browsers cache images, so updates won't show immediately
4. **Rate Limits**: Direct API calls from frontend would hit Discord's rate limits

## 🔧 **How Your Custom API Solves This:**

1. **Server-Side Requests**: Your backend makes the Discord API calls
2. **Cache Busting**: Adds timestamps to force fresh image loads
3. **Error Handling**: Provides fallback avatars when Discord is unavailable
4. **No CORS Issues**: Your domain serves the images

---

## 🚀 **Advanced: Serverless Function (Optional)**

For a completely serverless approach using Vercel/Netlify:

```javascript
// api/discord-avatar.js (Vercel) or .netlify/functions/discord-avatar.js (Netlify)
export default async function handler(req, res) {
    const { userId } = req.query;
    
    try {
        // Fetch from Discord API with bot token
        const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
            headers: { 'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}` }
        });
        
        const userData = await response.json();
        const avatarUrl = userData.avatar 
            ? `https://cdn.discordapp.com/avatars/${userId}/${userData.avatar}.png`
            : `https://cdn.discordapp.com/embed/avatars/0.png`;
            
        res.json({ avatarUrl, username: userData.username });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch avatar' });
    }
}
```

Then use: `https://your-vercel-app.vercel.app/api/discord-avatar?userId=394912002843344898`