// Character name to full Wikipedia image URL mapping
const CHARACTER_IMAGE_MAP = {
  'nanako': 'https://static.wikia.nocookie.net/megamitensei/images/4/40/NanakoDojima.png',
  'dojima': 'https://static.wikia.nocookie.net/megamitensei/images/4/42/P4DojimaRender.png',
  'chie': 'https://static.wikia.nocookie.net/megamitensei/images/8/88/P4A_Chie_Render.png',
  'yukiko': 'https://static.wikia.nocookie.net/megamitensei/images/3/3f/Yukiko_Amagi_%28BlazBlue_Cross_Tag_Battle%2C_Character_Select_Artwork%29.png',
  'rise': 'https://static.wikia.nocookie.net/megamitensei/images/a/ab/P4A_Rise_Render.png',
  'kanji': 'https://static.wikia.nocookie.net/megamitensei/images/5/5c/P4A_Kanji_Render.png',
  'naoto': 'https://static.wikia.nocookie.net/megamitensei/images/0/0e/P4A_Naoto.png',
  'yosuke': 'https://static.wikia.nocookie.net/megamitensei/images/d/d2/Persona_4_arena_Yosuke.png',
  'marie': 'https://static.wikia.nocookie.net/megamitensei/images/c/cf/P4AU_Marie.png',
  'kou': 'https://static.wikia.nocookie.net/megamitensei/images/2/25/P4_Kou.png',
  'daisuke': 'https://static.wikia.nocookie.net/megamitensei/images/9/95/Daisuke.png',
  'ayane': 'https://static.wikia.nocookie.net/megamitensei/images/b/bb/Ayane_P4.png',
  'ai': 'https://static.wikia.nocookie.net/megamitensei/images/9/9d/P4_Ai.png',
  'yumi': 'https://static.wikia.nocookie.net/megamitensei/images/c/c8/Yumi_P4.png',
  'naoki': 'https://static.wikia.nocookie.net/megamitensei/images/8/8a/Naoki_render.png',
  'shu': 'https://static.wikia.nocookie.net/megamitensei/images/2/29/Shu.png',
  'eri': 'https://static.wikia.nocookie.net/megamitensei/images/d/da/Eri.png',
  'sayoko': 'https://static.wikia.nocookie.net/megamitensei/images/f/f9/Sayoko.png',
  'hisano': 'https://static.wikia.nocookie.net/megamitensei/images/3/38/Hisano.png',
  'fox': 'https://static.wikia.nocookie.net/megamitensei/images/3/35/Fox_P4.png',
  'margaret': 'https://static.wikia.nocookie.net/megamitensei/images/9/96/Margaret.png',
};

// Check if page contains the specific text in an h2 tag
function checkForSocialLinkText() {
  const header2Tags = document.querySelectorAll('h2');
  
  for (const h2 of header2Tags) {
    if (h2.textContent.includes('S-Link Guide') || (h2.textContent.includes('Social Link'))) {
      return true;
    }
  }
  
  return false;
}

function updateTabTitle(characterName) {
  const currentTitle = document.title;
  document.title = `${characterName} - Social Link Guide - ${currentTitle}`;
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

    if (characterName == 'Athletes') {
        characterName = 'Kou'
    } else if (characterName == 'Fusion') {
        characterName = 'Margaret'
    }
    
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
  
  // Make sure the article-story div has position relative for absolute positioning to work
  if (getComputedStyle(articleStory).position === 'static') {
    articleStory.style.position = 'relative';
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
  
  // Insert the floating container as the first child of article-story
  articleStory.insertBefore(floatingContainer, articleStory.firstChild);
  
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
  
  updateTabTitle(characterName);
  
  // Inject the floating image
  injectFloatingImage(characterName);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}