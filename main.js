const input = document.getElementById("searchInput");
input.focus();
const resultsList = document.getElementById("results");
const clearButton = document.getElementById("clearButton");

// Clear-Button
clearButton.addEventListener("click", () => {
  input.value = "";
  resultsList.innerHTML = "";
});

// Search-Input
input.addEventListener("input", () => {
  const query = input.value;
  resultsList.innerHTML = "";

  if (query.length > 1) {
    chrome.bookmarks.search(query, (results) => {
      results.forEach((item) => {
        if (item.url) {
          const listItem = document.createElement("li");
          listItem.className =
            "list-group-item list-group-item-action d-flex justify-content-between align-items-center";

          const content = document.createElement("div");

          const title = document.createElement("p");
          title.className = "mb-1 list-title";
          title.textContent = item.title;

          const link = document.createElement("a");
          link.href = item.url;
          link.target = "_blank";
          link.textContent = item.url || item.title;
          link.className = "text-decoration-none";
          link.style.fontSize = "0.75em";
          link.style.wordBreak = "break-all";

          const icon = document.createElement("img");
          icon.src = "./assets/share.png";
          icon.alt = "Copy Icon";
          icon.height = 18;

          const copyButton = document.createElement("button");
          copyButton.className = "btn btn-sm";
          copyButton.setAttribute("title", "Copy URL");
          copyButton.onclick = () => {
            navigator.clipboard.writeText(item.url);
          };

          copyButton.appendChild(icon);
          content.appendChild(title);
          content.appendChild(link);
          listItem.appendChild(content);
          listItem.appendChild(copyButton);
          resultsList.appendChild(listItem);
        }
      });
    });
  }
});
