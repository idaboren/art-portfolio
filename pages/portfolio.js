const main = document.getElementsByTagName("main")[0];
let path = "../artworks/"
let tags = [];
let artData = [];

await setArtData(); // set artdata from artworks.json

createSectionsForEveryTag();

function createSectionsForEveryTag() {
    for (let i = 0; i < artData.length; i++) {
        for (let j = 0; j < (artData[i].tags).length; j++){
            if (!tags.includes((artData[i].tags)[j]) && 
            (artData[i].tags)[j] != "frontpage") {
                 tags.push((artData[i].tags)[j]);
                 createSectionByTag((artData[i].tags)[j]);
            }
        }
    }
}

function createSectionByTag(tag) {
    const section = document.createElement("section");
    const sectionTitle = document.createElement("h3");
    const sectionArt = document.createElement("ul");

    sectionTitle.innerText = tag;
    sectionArt.classList.add("artworks-list");

    for (let i = 0; i < artData.length; i++){
        if ((artData[i].tags).includes(tag)){
            const listItem = document.createElement("li");
            const figure = document.createElement("figure");
            const figureImg = document.createElement("img");
            const figureCaption = document.createElement("figureCaption");
    
            figure.classList.add("artwork-item");
            figureImg.src = path + artData[i].path;
            figureImg.alt = artData[i].altText;
            figureImg.classList.add("artwork-image");
            figureCaption.innerText = artData[i].title;
            figureCaption.classList.add("artwork-title");
    
            listItem.append(figure);
            figure.append(figureImg, figureCaption);
            sectionArt.append(listItem);
        }
    }

    main.append(section);
    section.append(sectionTitle, sectionArt);
}

async function setArtData() {
  const path = "../artworks/artworks.json";
  await fetch(path)
    .then(response => {
        if (!response.ok) {
            throw new Error('Images could not load: ' + response.statusText);
            //backup solution?
        }
        return response.json();
    })
    .then(data => {
        artData = data;
    })
    .catch(error => {
        console.error('Images could not load: ', error);
        //backup solution?
    });
}