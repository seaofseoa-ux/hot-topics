// ==========================================================================
// GET THE REFERENCES
// ==========================================================================
const container = document.querySelector('#main-content');
const links = document.querySelectorAll('[data-link]');
let url = './partials/home.html'; // default content shown on first load

// ==========================================================================
// CREATE THE FUNCTION THAT WILL LOAD THE REQUESTED PARTIAL
// ==========================================================================
// loadContent RUNS EVERY TIME A LINK IS CLICKED.
// loadContent REQUIRES THE INPUT. THIS INPUT IS THE VALUE OF THE href
// ATTRIBUTE OF THE CLICKED LINK. EVERY TIME A LINK IS CLICKED, urlFeed WILL
// GET THE UPDATED PATH TO THE REQUESTED CONTENT.
function loadContent(urlFeed) {
  container.innerHTML = '<div class="container"><p class="loading-note">Loading content&hellip;</p></div>';

  fetch(urlFeed)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok (' + response.status + ')');
      }
      return response.text();
    })
    .then((html) => {
      container.innerHTML = html;
      updateActiveLink(urlFeed);
    })
    .catch((error) => {
      container.innerHTML =
        '<div class="container"><p class="loading-note">Sorry — that entry could not be loaded right now.</p></div>';
      console.error('loadContent failed:', error);
    });
}
// CLOSE loadContent

// CALL loadContent WITH THE CURRENT VALUE OF url SO THE HOME ENTRIES SHOW
// ON THE VERY FIRST PAGE LOAD
loadContent(url);

// ==========================================================================
// CREATE THE FUNCTION THAT WILL SELECT A PARTIAL
// ==========================================================================
function selectContent(event) {
  event.preventDefault(); // PREVENT DEFAULT BEHAVIOUR OF A LINK TAG

  const href = event.currentTarget.getAttribute('href'); // VALUE OF href
  loadContent(href); // CALL loadContent WITH THE CLICKED LINK'S href VALUE
}
// CLOSE selectContent

// ==========================================================================
// REGISTER links FOR CLICK EVENT WITH selectContent AS EVENT HANDLER
// ==========================================================================
links.forEach((link) => {
  link.addEventListener('click', selectContent);
});

// small helper: keep the nav-bar showing which entry is on screen
function updateActiveLink(href) {
  links.forEach((link) => {
    const isNavLink = link.closest('#nav-links') !== null;
    if (isNavLink) {
      link.classList.toggle('is-active', link.getAttribute('href') === href);
    }
  });
}
