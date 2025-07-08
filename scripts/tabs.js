// Function to show a specific tab section by name
function showTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Get all elements with class "tabcontent" (the tab content panels)
    tabcontent = document.getElementsByClassName("tabcontent");

    // Hide all tabcontent panels
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class "tablink" (the nav buttons)
    tablinks = document.getElementsByClassName("tablink");

    // Remove the "active" class from all nav buttons
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the tab content that matches the requested tabName
    document.getElementById(tabName).style.display = "block";

    // If this was triggered by a click event...
    if (evt) {
        // Add the "active" class to the clicked nav button
        evt.currentTarget.className += " active";
    } else {
        // If triggered by hash or code (not a click), find the matching nav link...
        var hashLink = document.querySelector(`.tablink[onclick*="${tabName}"]`);
        if (hashLink) {
            // ...and add the "active" class to it
            hashLink.className += " active";
        }
    }
}


const tabs = document.querySelectorAll('.tabcontent');
tabs.forEach(tab => {
  tab.style.display = 'none';
});

// When the page finishes loading...
window.onload = function () {
    // Get the URL hash (if present), e.g., "#l2"
    const hash = window.location.hash.substring(1);

    // If the hash matches an element ID on the page...
    if (hash && document.getElementById(hash)) {
        // Show that tab (simulate a tab switch without a click)
        showTab(null, hash);

        // Remove the hash from the address bar without reloading the page
        history.replaceState(null, null, window.location.pathname);
    } else {
        // If no hash or invalid, simulate a click on the default tab (usually the first one)
        document.getElementById("defaultOpen").click();
    }
};








