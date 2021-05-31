
async function stvori(){
    let footer = document.querySelector('footer');
    let articleTemplate = document.querySelector('#article-template');
    let sectionTemplate = document.querySelector('#section-template');
    let zahtjev = await fetch("data/data.json");
    let data = await zahtjev.json();

    for (let sekcija of Object.keys(data)) {

        let sekcijaElement = sectionTemplate.content.cloneNode(true);
        let naslov = sekcijaElement.querySelector('section > h2');

        let sekcijaTijelo = sekcijaElement.querySelector('section');

        naslov.innerHTML = sekcija;

        for (const clanak in Object.keys(data[sekcija]['clanci'])) {
            let clanakJson = data[sekcija]['clanci'][clanak];

            let clanakElement = articleTemplate.content.cloneNode(true);


            let img = clanakElement.querySelector('article > img');
            let h3 = clanakElement.querySelector('article > h3');
            let p = clanakElement.querySelector('article > p');
            let time = clanakElement.querySelector('article > time');

            let article = clanakElement.querySelector('article');

            img.src = "images/" +  clanakJson['fotografija'];
            img.alt = clanakJson['fotografija'];
            h3.innerHTML = clanakJson['naslov'];
            p.innerHTML = clanakJson['summary'];
            time.innerHTML = clanakJson['datum'];
            
            sekcijaTijelo.appendChild(clanakElement);
            article.addEventListener("click",() => {
                prikaziClanak(clanakJson, sekcija);
            });
        }

        footer.parentNode.insertBefore(sekcijaElement, footer);
    }
}

async function prikaziClanak(clanakJson, grupa){
    let win = window.open('article.html');

    win.onload = function (){
        let footer = win.document.querySelector('footer');
        let articleTemplate = win.document.querySelector('#bigger-article-template');

        let clanakElement = articleTemplate.content.cloneNode(true);

        let img = clanakElement.querySelector('section > img');
        let h3 = clanakElement.querySelector('section > div > h3');
        let p = clanakElement.querySelector('section > div > p');
        let time = clanakElement.querySelector('section > div > time');
        let h2 = clanakElement.querySelector('section > h2');

        img.src = "images/" +  clanakJson['fotografija'];
        img.alt = clanakJson['fotografija'];

        p.innerHTML = clanakJson['clanak'];
        time.innerHTML = clanakJson['datum'];

        h3.innerHTML = clanakJson['naslov'];
        h2.innerHTML = grupa;


        footer.parentNode.insertBefore(clanakElement, footer);

    }


}