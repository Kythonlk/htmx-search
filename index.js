import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/search/api", async (req, res) => {
  const searchTerm = req.body.search.toLowerCase();

  if (!searchTerm) {
    return res.send("");
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_limit=100`,
  );
  const photos = await response.json();

  const searchResults = photos.filter((photo) => {
    const title = photo.title.toLowerCase();
    const thumbnailUrl = photo.thumbnailUrl.toLowerCase();

    return title.includes(searchTerm) || thumbnailUrl.includes(searchTerm);
  });

  let searchResultHtml;

  if (searchResults.length > 0) {
    const header = `
           <thead class="bg-gray-800 text-white">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-start text-xs font-medium uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider"
                >
                  Thumbnail
                </th>
              </tr>
            </thead>
      `;
    const searchResultH = searchResults
      .map(
        (photo) => `
        <tr class="border-b bg-sky-900">
          <td><div class="my-4 p-2">${photo.title}</div></td>
          <td><div class="my-4 p-2"><img src="${photo.thumbnailUrl}" width="80" alt="Thumbnail"></div></td>
        </tr>
      `,
      )
      .join("");

    searchResultHtml = header + searchResultH;
  } else {
    searchResultHtml = `
      <tr>
        <td colspan="2"><div class="my-4 p-2">No title or thumbnail found for ${searchTerm}</div></td>
      </tr>
    `;
  }

  res.send(searchResultHtml);
});

app.listen(3000, () => {
  console.log("Server listening on port http://localhost:3000");
});
