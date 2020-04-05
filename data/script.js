import { AutoTest } from "./autotest.js";

let autoTests = null;

function getCode(index){
    return "gab." + (index+1) + "_1";
}

const PROVINCES = {
    "Estuaire": [
        "Cocobeach",
        "Kango",
        "Libreville",
        "Nkan",
        "Ntoum"
    ],

    "Haut-Ogooué": [
        "Franceville",
        "Lékoni",
        "Moanda",
        "Mounana",
        "Okondja"
    ],

    "Moyen-Ogooué": [
        "Lambaréné",
        "Ndjolé"
    ],

    "Ngounié": [
        "Fougamou",
        "Mbigou",
        "Mimongo",
        "Mouila",
        "Ndendé"
    ],

    "Nyanga": [
        "Mayumba",
        "Tchibanga",
        "Tsogni"
    ],

    "Ogooué-Ivindo": [
        "Booué",
        "Makokou",
        "Mékambo"
    ],

    "Ogooué-Lolo": [
        "Koulamoutou",
        "Lastourville"
    ],

    "Ogooué-Maritime": [
        "Gamba",
        "Omboué",
        "Port-Gentil"
    ],

    "Wouleu-Ntem": [
        "Bitam",
        "Medouneu",
        "Minvoul",
        "Mitzic",
        "Oyem"
    ]
}

loadAllAutoTest();

function loadMap(colors){
    console.log(colors);
    jQuery(document).ready(function () {

        jQuery('#vmap').vectorMap({
            map: 'gabon',
            backgroundColor: '#00c652',
            borderColor: '#818181',
            borderOpacity: 0.25,
            borderWidth: 1,
            color: '#f4f3f0',
            enableZoom: true,
            hoverColor: false,
            hoverOpacity: 0.7,
            normalizeFunction: 'linear',
            scaleColors: ['#b6d6ff', '#005ace'],
            selectedColor: '#c9dfaf',
            selectedRegions: null,
            showTooltip: true,
            colors: colors,
            onRegionClick: function (element, code, region) {
                this.selectedRegions = code
                console.log(code);
                const data = getRegionData(region);
                displayRegionData(region, data);
                window.location = "#data";
            }
        });
    })
}

function getRegionData(region) {
    const data = [];
    autoTests.questions.forEach(question => {
        if (PROVINCES[region].includes(question.ville)) {
            const score = getScore(question);
            data.push({ question, score });
        }
    })
    return data;
}

function visualize(gdpData) {
    var max = 0,
        min = Number.MAX_VALUE,
        cc,
        startColor = [200, 238, 255],
        endColor = [0, 100, 145],
        colors = {},
        hex;

    //find maximum and minimum values
    for (cc in gdpData) {
        if (parseFloat(gdpData[cc]) > max) {
            max = parseFloat(gdpData[cc]);
        }
        if (parseFloat(gdpData[cc]) < min) {
            min = parseFloat(gdpData[cc]);
        }
    }

    //set colors according to values of GDP
    for (cc in gdpData) {
        if (gdpData[cc] > 0) {
            colors[cc] = '#';
            for (var i = 0; i < 3; i++) {
                hex = Math.round(startColor[i]
                    + (endColor[i]
                        - startColor[i])
                    * (gdpData[cc] / (max - min + 1))).toString(16);
                if (hex.length == 1) {
                    hex = '0' + hex;
                }
                colors[cc] += (hex.length == 1 ? '0' : '') + hex;
            }
        }
    }

    return colors;
}

function displayRegionData(region, data) {
    document.querySelector('.province').innerHTML = region;
    document.querySelector('.nb_test').innerHTML = "<strong>" + getTestCount(data) + "</strong>" + " Auto test";
    document.querySelector('.nb_bad').innerHTML = "<strong>" + getPotentiellementMaladeCount(data) + "</strong>" + " Potentiellement malade";
    document.querySelector('.nb_good').innerHTML = "<strong>" + getPotentiellementSainCount(data) + "</strong>" + " Potentiellement sain";

    displayVillesData(data, region);

}

function displayGlobalData() {
    const data = [];
    autoTests.questions.forEach(question => {
        const score = getScore(question);
        data.push({ question, score });
    })

    document.querySelector('.gnb_test').innerHTML = getTestCount(data);
    document.querySelector('.gnb_bad').innerHTML = getPotentiellementMaladeCount(data);
    document.querySelector('.gnb_good').innerHTML = getPotentiellementSainCount(data);
}

function displayVillesData(provinceData, region) {
    const container = document.querySelector('.villes');
    clearContainer(container);
    PROVINCES[region].forEach(ville => {
        const result = getVilleData(ville, provinceData);
        displayResult(ville, result, container);
    })
}

function displayResult(ville, result, container) {
    const template = `
        <div class="ville">
            <h2>${ville}</h2>
            <div class="result">
            <p class="vnb_test">Auto Test</p>
            <p class="vnb_bad">Potentiellement Malade</p>
            <p class="vnb_good">Potentiellement Sain</p>
            </div>
            <div class="result">
            <p class="vnb_test">${result.nbTest}</p>
            <p class="vnb_bad">${result.nbBad}</p>
            <p class="vnb_good">${result.nbGood}</p>
            </div>
        </div>
    `;

    const element = new DOMParser().parseFromString(template, 'text/html');
    container.appendChild(element.querySelector('.ville'));
}

function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function getVilleData(ville, provinceData) {
    let nbTest = 0, nbGood = 0, nbBad = 0;
    provinceData.forEach(data => {
        if (data.question.ville == ville) {
            nbTest++;
            if (getScore(data.question) < 80) {
                nbGood++;
            } else {
                nbBad++;
            }
        }
    })

    return { nbTest, nbGood, nbBad };
}

function getScore(question) {
    let score = 0;
    question.questions.forEach(
        q => {
            if (q.reponse) {
                score += q.notes[q.reponse];
            }
            if (q.nextQuestions != [] && q.nextQuestions != null) {
                if (q.fonctionDetermnineQuestionSuivante) {
                    q.fonctionDetermnineQuestionSuivante(q.reponse);
                    const nextQuestion = q.nextQuestions[q.indexquestionSuivante];
                    console.log("question suivante");
                    score += nextQuestion.notes[nextQuestion.reponse];
                }
            }
        }
    )
    return score;
}

function getTestCount(data) {
    return data.length;
}

function getPotentiellementMaladeCount(data) {
    let count = 0;
    data.forEach(d => {
        if (d.score >= 80) {
            count++;
        }
    });
    return count;
}

function getPotentiellementSainCount(data) {
    let count = 0;
    data.forEach(d => {
        if (d.score < 80) {
            count++;
        }
    });
    return count;
}

function loadAllAutoTest() {
    fetch('https://app.bloquercovid19.com/bat/autotest')
        .then(response => response.json())
        .then(json => {
            const questions = [];
            json.autotest.forEach(q => {
                questions.push(JSON.parse(q.json));
            })
            autoTests = new AutoTest(questions);
            displayGlobalData();

            const gdpData = {};
            let i = 0;
            for(let region in PROVINCES) {
                gdpData[getCode(i)] = getRegionData(region).length + 1;
                i++;
            }
            console.log(gdpData);
            loadMap(visualize(gdpData));
        })
}



