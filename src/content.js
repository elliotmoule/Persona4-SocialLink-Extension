// Character name to full Wikipedia image URL mapping
const CHARACTER_IMAGE_MAP = {
  'nanako': 'https://upload.wikimedia.org/wikipedia/en/e/e9/Nanako_Dojima.png',
  'chie': 'https://upload.wikimedia.org/wikipedia/en/d/dc/ChieSatonaka.png',
  'yukiko': 'https://upload.wikimedia.org/wikipedia/en/3/3e/Yukiko_Amagi.png',
  'rise': 'https://upload.wikimedia.org/wikipedia/en/a/aa/Rise_Kujikawa.png',
  'kanji': 'https://upload.wikimedia.org/wikipedia/en/f/f4/Kanji_Tatsumi.png',
  'naoto': 'https://upload.wikimedia.org/wikipedia/en/4/4c/Naoto_Shirogane.png',
  'yosuke': 'https://upload.wikimedia.org/wikipedia/en/b/b1/Yosuke_Hanamura.png',
  'teddie': 'https://upload.wikimedia.org/wikipedia/en/8/8c/Teddie_%28Persona%29.png',
  'marie': 'https://upload.wikimedia.org/wikipedia/en/5/5e/Marie_%28Persona%29.png',
  'kou': 'https://megatenwiki.com/images/b/ba/P4G_Kou_Ichijo_Basketball_Uniform_Neutral_Portrait_Graphic.png',
  'daisuke': 'https://megatenwiki.com/images/thumb/b/b3/P4_Daisuke_Nagase_Artwork.png/600px-P4_Daisuke_Nagase_Artwork.png',
  'ayane': 'https://megatenwiki.com/images/b/b6/P4_Ayane_Matsunaga_Artwork.png',
  'ai': 'https://megatenwiki.com/images/thumb/d/db/P4_Ai_Ebihara_Artwork.png/600px-P4_Ai_Ebihara_Artwork.png',
  'yumi': 'https://megatenwiki.com/images/thumb/e/ec/P4_Yumi_Ozawa_Artwork.png/600px-P4_Yumi_Ozawa_Artwork.png',
  'naoki': 'https://megatenwiki.com/images/4/4e/P4_Naoki_Konishi_Artwork.png',
  'shu': 'https://megatenwiki.com/images/f/fd/P4_Shu_Nakajima_Artwork.png',
  'eri': 'https://megatenwiki.com/images/b/b6/P4_Eri_Minami_Artwork.png',
  'sayoko': 'https://megatenwiki.com/images/thumb/d/d4/P4_Sayoko_Uehara_Artwork.png/600px-P4_Sayoko_Uehara_Artwork.png',
  'hisano': 'https://megatenwiki.com/images/f/f6/P4_Hisano_Kuroda_Artwork.png',
};

// Check if page contains the specific text in an h2 tag
function checkForSocialLinkText() {
  const header2Tags = document.querySelectorAll('h2');
  
  for (const h2 of header2Tags) {
    if (h2.textContent.includes('S-Link Guide')) {
      return true;
    }
  }
  
  return false;
}

// Extract character name from the page
function extractCharacterName() {
  // Try to extract from the page title or heading
  const title = document.title;
  
  // Pattern: "Persona 4 Golden: [Character Name] - [Arcana] Social Link..."
  const match = title.match(/Persona 4 Golden[:\s]+([^-]+)/i);
  
  if (match) {
    // Clean up the character name
    let characterName = match[1].trim();
    
    // Remove common suffixes like "Justice", "Magician", etc.
    characterName = characterName.split(/\s+/)[0];
    
    return characterName;
  }
  
  // Fallback: try to extract from H1
  const h1 = document.querySelector('h1');
  if (h1) {
    const h1Match = h1.textContent.match(/([A-Z][a-z]+)/);
    if (h1Match) {
      return h1Match[1];
    }
  }
  
  return null;
}

// Create and inject the floating image
function injectFloatingImage(characterName) {
  const articleStory = document.getElementById('article-story');
  
  if (!articleStory) {
    console.log('article-story div not found');
    return;
  }
  
  // Normalize character name and look up full image URL
  const normalizedName = characterName.toLowerCase();
  const imageUrl = CHARACTER_IMAGE_MAP[normalizedName];
  
  if (!imageUrl) {
    console.log(`No image mapping found for character: ${characterName}`);
    return;
  }
  
  // Create the floating container
  const floatingContainer = document.createElement('div');
  floatingContainer.id = 'p4g-floating-image';
  floatingContainer.className = 'p4g-float-container';
  
  // Create the image
  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = `${characterName} portrait`;
  img.onerror = function() {
    console.log(`Image failed to load for ${characterName}: ${imageUrl}`);
    floatingContainer.style.display = 'none';
  };
  
  floatingContainer.appendChild(img);
  
  // Insert the floating container before the article-story div
  articleStory.parentNode.insertBefore(floatingContainer, articleStory);
  
  console.log(`Floating image added for character: ${characterName} (${imageUrl})`);
}

// Main execution
function init() {
  // Check if this is a social link page
  if (!checkForSocialLinkText()) {
    console.log('Not a Persona 4 Golden social link page');
    return;
  }
  
  // Extract character name
  const characterName = extractCharacterName();
  
  if (!characterName) {
    console.log('Could not extract character name');
    return;
  }
  
  console.log(`Found character: ${characterName}`);
  
  // Inject the floating image
  injectFloatingImage(characterName);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}