// Complete website creation using JavaScript
(function() {
 // Create stars background
 function createStars() {
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars-container';
  
  for (let i = 0; i < 150; i++) {
   const star = document.createElement('div');
   star.className = 'star';
   const size = Math.random() * 3 + 1;
   star.style.width = size + 'px';
   star.style.height = size + 'px';
   star.style.left = Math.random() * 100 + '%';
   star.style.top = Math.random() * 100 + '%';
   star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
   star.style.setProperty('--delay', (Math.random() * 2) + 's');
   starsContainer.appendChild(star);
  }
  
  document.body.appendChild(starsContainer);
 }
 
 // Create header with title
 function createHeader(siteInfo) {
  const header = document.createElement('header');
  header.className = 'header';
  
  const titleContainer = document.createElement('div');
  titleContainer.className = 'title-container';
  
  const mainTitle = document.createElement('h1');
  mainTitle.className = 'main-title';
  mainTitle.textContent = siteInfo.title;
  
  const teamName = document.createElement('p');
  teamName.className = 'team-name';
  teamName.textContent = `by ${siteInfo.team}`;
  
  titleContainer.appendChild(mainTitle);
  titleContainer.appendChild(teamName);
  
  // Profile section with spark connection
  const profileSection = document.createElement('div');
  profileSection.className = 'profile-section';
  
  // Nebula profile
  const nebulaWrapper = document.createElement('div');
  nebulaWrapper.className = 'profile-wrapper';
  const nebulaPic = document.createElement('img');
  nebulaPic.className = 'profile-pic';
  nebulaPic.src = siteInfo.nebulaProfilePic;
  nebulaPic.alt = 'Nebula Profile';
  nebulaPic.onerror = function() {
   this.src = 'https://via.placeholder.com/120x120/6c5ce7/ffffff?text=N';
  };
  nebulaWrapper.appendChild(nebulaPic);
  
  // Spark connection
  const sparkConnection = document.createElement('div');
  sparkConnection.className = 'spark-connection';
  
  const sparkLine = document.createElement('div');
  sparkLine.className = 'spark-line';
  
  const sparkParticles = document.createElement('div');
  sparkParticles.className = 'spark-particles';
  
  for (let i = 0; i < 8; i++) {
   const particle = document.createElement('div');
   particle.className = 'spark-particle';
   sparkParticles.appendChild(particle);
  }
  
  sparkConnection.appendChild(sparkLine);
  sparkConnection.appendChild(sparkParticles);
  
  // CRX profile
  const crxWrapper = document.createElement('div');
  crxWrapper.className = 'profile-wrapper';
  const crxPic = document.createElement('img');
  crxPic.className = 'profile-pic';
  crxPic.src = siteInfo.crxProfilePic;
  crxPic.alt = 'CRX Profile';
  crxPic.onerror = function() {
   this.src = 'https://via.placeholder.com/120x120/a855f7/ffffff?text=C';
  };
  crxWrapper.appendChild(crxPic);
  
  profileSection.appendChild(nebulaWrapper);
  profileSection.appendChild(sparkConnection);
  profileSection.appendChild(crxWrapper);
  
  header.appendChild(titleContainer);
  header.appendChild(profileSection);
  
  return header;
 }
 
 // Create main content with cards
 function createMainContent(apps) {
  const mainContainer = document.createElement('main');
  mainContainer.className = 'main-container';
  
  const sectionTitle = document.createElement('h2');
  sectionTitle.className = 'section-title';
  sectionTitle.textContent = 'Supported Apps';
  
  const cardGrid = document.createElement('div');
  cardGrid.className = 'card-grid';
  
  apps.forEach(app => {
   const card = document.createElement('div');
   card.className = 'app-card';
   card.addEventListener('click', () => {
    window.location.href = app.url;
   });
   
   card.innerHTML = `
                <div class="card-image-container">
                    <img class="card-image" src="${app.image}" alt="${app.name}" 
                         onerror="this.src='https://via.placeholder.com/400x200/1a1a2e/a855f7?text=${app.name}'">
                    <div class="card-image-overlay"></div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${app.name}</h3>
                    <p class="card-description">${app.description}</p>
                </div>
                <div class="card-footer">
                    <span class="visit-text">Visit ${app.name}</span>
                    <span class="arrow-icon">→</span>
                </div>
            `;
   
   cardGrid.appendChild(card);
  });
  
  mainContainer.appendChild(sectionTitle);
  mainContainer.appendChild(cardGrid);
  
  return mainContainer;
 }
 
 // Create footer
 function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
            <p>&copy; ${new Date().getFullYear()} Nebula by Team CRX. All rights reserved.</p>
        `;
  return footer;
 }
 
 // Show loading state
 function showLoading() {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading';
  loadingDiv.id = 'loading-state';
  loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading apps...</p>
        `;
  document.body.appendChild(loadingDiv);
 }
 
 // Hide loading state
 function hideLoading() {
  const loadingDiv = document.getElementById('loading-state');
  if (loadingDiv) {
   loadingDiv.remove();
  }
 }
 
 // Show error state
 function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message || 'Failed to load data. Please try again later.';
  document.body.appendChild(errorDiv);
 }
 
 // Initialize website
 async function initWebsite() {
  createStars();
  showLoading();
  
  try {
   const response = await fetch('nebula.json');
   if (!response.ok) {
    throw new Error('Failed to fetch data');
   }
   
   const data = await response.json();
   
   hideLoading();
   
   // Create and append all sections
   const header = createHeader(data.siteInfo);
   const mainContent = createMainContent(data.supportedApps);
   const footer = createFooter();
   
   document.body.appendChild(header);
   document.body.appendChild(mainContent);
   document.body.appendChild(footer);
   
  } catch (error) {
   hideLoading();
   console.error('Error loading data:', error);
   showError('Unable to load app data. Please check your connection and try again.');
   
   // Create minimal header even on error
   const fallbackHeader = createHeader({
    title: 'Nebula',
    team: 'Team CRX',
    nebulaProfilePic: 'https://via.placeholder.com/120x120/6c5ce7/ffffff?text=N',
    crxProfilePic: 'https://via.placeholder.com/120x120/a855f7/ffffff?text=C'
   });
   document.body.appendChild(fallbackHeader);
   
   const footer = createFooter();
   document.body.appendChild(footer);
  }
 }
 
 // Start the website
 initWebsite();
})();