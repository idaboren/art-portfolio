const main = document.getElementsByTagName("main")[0];
let path = "../artworks/"
let tags = [];
let artData = [];

await setArtData(); // set artdata from artworks.json

export function getPortfolioView() {
    for (let i = 0; i < tags.length; i++){
        if (tags[i].name != "frontpage")
            getSectionByTag(tags[i])
    }
}

export function getFrontpageView() {
    let frontpage = tags.find(t => t.name == "frontpage")
    getSectionByTag(frontpage);
}

function getSectionByTag(tag) {
    const section = document.createElement("section");
    const sectionContent = document.createElement("div");
    const column1 = document.createElement("div");
    const column2 = document.createElement("div");
    const column3 = document.createElement("div");
    const column4 = document.createElement("div");
    const column5 = document.createElement("div");
    const column6 = document.createElement("div");
    const sectionTitle = document.createElement("h2");
    const sectionDescription = document.createElement("p");
    let sectionLength = 0;
    let sectionArtList = [];

    sectionTitle.innerText = tag.name;
    sectionDescription.innerText = tag.description;
    sectionDescription.classList.add("section-description");
    sectionContent.classList.add("section-content");

    // columns are divided into classes depending on how many images are in a section
    column1.classList.add("column-1");
    column2.classList.add("column-2");
    column3.classList.add("column-2");
    column4.classList.add("column-3");
    column5.classList.add("column-3");
    column6.classList.add("column-3");

    // creates separate list for art with current tag
    for (let i = 0; i < artData.length; i++) {
        if ((artData[i].tags).includes(tag.name)) {
            sectionLength ++;
            sectionArtList.push(artData[i]);
        }
    }

    // creates figure per item in sectionArtList
    for (let i = 0; i < sectionLength; i++){
        const figure = document.createElement("figure");
        const figureImg = document.createElement("img");
        // const figureCaption = document.createElement("figureCaption");

        figure.classList.add("artwork-item");
        figureImg.src = path + sectionArtList[i].path;
        figureImg.alt = sectionArtList[i].altText;
        figureImg.classList.add("artwork-image");
        // figureCaption.innerText = sectionArtList[i].title;
        // figureCaption.classList.add("artwork-title");

        figure.append(figureImg);
        if (sectionLength == 1) {
            column1.append(figure);
        } 
        else if (sectionLength == 2) {
            if ( i == 0 )
                column2.append(figure);
            else
                column3.append(figure);
        }
        else {
            if (i<sectionLength/3) {
                column4.append(figure);
            }
            else if (i>(sectionLength/3) && i<=((sectionLength/3)*2)) {
                column5.append(figure);
            }
            else {
                column6.append(figure);
            }
        }
    }

    main.append(section);

    if (sectionLength >= 3) {
        if (sectionTitle.innerText != "frontpage") { 
            section.append(sectionTitle);
            sectionDescription.innerText ? section.append(sectionDescription) : null; 
        }
        section.append(sectionContent);
        sectionContent.append(column4, column5, column6);
    }
    else if (sectionLength == 2) {
        if (sectionTitle.innerText != "frontpage") { 
            section.append(sectionTitle);
            sectionDescription.innerText ? section.append(sectionDescription) : null; 
        }
        section.append(sectionContent);
        sectionContent.append(column2, column3);
    }
    else {
        if (sectionTitle.innerText != "frontpage") { 
            column2.append(sectionTitle);
            sectionDescription.innerText ? column2.append(sectionDescription) : null; 
        }
        section.append(sectionContent);
        sectionContent.append(column1, column2);
    }
}

async function setArtData() {
  const path = "../artworks/artworks.json";
  await fetch(path)
    .then(response => {
        if (!response.ok) {
            throw new Error('Images could not load: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        artData = data.artworks;
        tags = data.tags;
    })
    .catch(error => {
        console.error('Images could not load: ', error);
    });
}