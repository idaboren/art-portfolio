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
    const sectionContent = document.createElement("div");
    const column1 = document.createElement("div");
    const column2 = document.createElement("div");
    const column3 = document.createElement("div");
    const sectionTitle = document.createElement("h3");
    let sectionLength = 0;
    let sectionArtList = [];

    sectionTitle.innerText = tag;
    sectionContent.classList.add("sectionContent")
    column1.classList.add("column");
    column2.classList.add("column");
    column3.classList.add("column");

    for (let i = 0; i < artData.length; i++){
        if ((artData[i].tags).includes(tag)){
            sectionLength ++;
            sectionArtList.push(artData[i]);
        }
    }

    for (let i = 0; i < sectionArtList.length; i++){
        const figure = document.createElement("figure");
        const figureImg = document.createElement("img");
        // const figureCaption = document.createElement("figureCaption");

        figure.classList.add("artwork-item");
        figureImg.src = path + artData[i].path;
        figureImg.alt = artData[i].altText;
        figureImg.classList.add("artwork-image");
        // figureCaption.innerText = artData[i].title;
        // figureCaption.classList.add("artwork-title");

        figure.append(figureImg);
        if (i<sectionLength/3)
        {
            column1.append(figure);
        }
        else if(i>(sectionLength/3) && i<=((sectionLength/3)*2))
        {
            column2.append(figure);
        }
        else{
            column3.append(figure);
        }
    }

    main.append(section);
    section.append(sectionTitle, sectionContent);
    sectionContent.append(column1, column2, column3);
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