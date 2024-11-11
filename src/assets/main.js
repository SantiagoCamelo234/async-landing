const url = 'https://youtube-v31.p.rapidapi.com/search?relatedToVideoId=7ghhRHRP6t4&part=id%2Csnippet&type=video&maxResults=50';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '49a6c2fb96msh8fbe0b154494893p1a25bfjsn9f2401e374be',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};

const content = null || document.querySelector('#content');

async function fetchData(url){
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

(async  ()=> { // se ejecuta automaticamente cuando se carga el script
    try {
        const videos = await fetchData(url);
        // template (HTML) que se va a iterar por cada elemento de la respuesta
        let view = ` <!-- content -->
        ${videos.items.map(video => `
          <div class="group relative">
          <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${video.snippet.title}
            </h3>
          </div>
        </div>
            `).slice(0, 4).join('')}
         `;
        content.innerHTML = view;

        

    } catch (error) {
        console.error(error);
        let view = `<h1>Ha ocurrido un error</h1>`;
        content.innerHTML = view;
    }
})();