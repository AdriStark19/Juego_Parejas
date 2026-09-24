document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "t") {
        const html = document.documentElement;

        if (html.getAttribute("data-bs-theme") === "dark") {
            html.setAttribute("data-bs-theme", "light");
        } else {
            html.setAttribute("data-bs-theme", "dark");
        }
    }
});