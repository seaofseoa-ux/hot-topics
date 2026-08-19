// GET THE REFERENCES
const container = document.getElementById("main-content");
const links = document.querySelectorAll("#nav-links a");
let url = "./partials/home.html";

// CREATE THE FUNCTION THAT WILL LOAD THE REQUESTED PARTIAL
const loadContent = (urlFeed) => {
  container.innerHTML = '<p class="loading">Loading content&hellip;</p>';

  fetch(urlFeed)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load "${urlFeed}" (status ${response.status})`);
      }
      return response.text();
    })
    .then((html) => {
      container.innerHTML = html;
      url = urlFeed;
      markActiveLink(urlFeed);
    })
    .catch((error) => {
      container.innerHTML = `<p class="error-msg">Sorry — that content could not be loaded. (${error.message})</p>`;
      console.error(error);
    });
};
// CLOSE YOUR FUNCTION loadContent HERE

// CALL loadContent WITH THE CURRENT VALUE OF url
loadContent(url);

// CREATE THE FUNCTION THAT WILL SELECT A PARTIAL
const selectContent = (event) => {
  // PREVENT DEFAULT BEHAVIOUR OF A LINK TAG
  event.preventDefault();

  // GET THE VALUE OF href ATTRIBUTE OF THE CLICKED LINK
  const href = event.currentTarget.getAttribute("href");

  // CALL THE FUNCTION loadContent PROVIDING THE href
  // VALUE OF THE CLICKED LINK AS THE VALUE FOR THE PARAMETER
  // OF loadContent FUNCTION.
  loadContent(href);
};
// CLOSE YOUR FUNCTION selectContent HERE

// REGISTER links FOR CLICK EVENT WITH selectContent AS EVENT HANDLER!
links.forEach((link) => link.addEventListener("click", selectContent));

// Small helper: highlight whichever nav link matches the currently loaded partial
function markActiveLink(currentHref) {
  links.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === currentHref);
  });
}
