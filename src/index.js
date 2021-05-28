const isCoverLetter = false;

const data = require('./resumes/eric_m_levine.js');

const showGithub = true;

document.addEventListener("DOMContentLoaded", function() {
  document.getElementsByTagName("TITLE")[0].innerText = data.header.name;

  //HEADER
  function drawHeader(_header){
      const header = document.getElementsByTagName("HEADER")[0];
      const {address, email, city, name, phone, state} = _header;
      let html = `<h1>${name}</h1>`;
      html += `<span class='address'>${address} &bull; ${city}, ${state} &bull; ${phone} &bull; ${email}</span>`;
      header.insertAdjacentHTML('beforeend', html);
  }

  drawHeader(data.header);

  if(isCoverLetter){
    const dateString = new Date().toLocaleDateString('en-US');
    const html = `<div class='row'><span class='date'>${dateString}</span></div>`;
    document.getElementsByTagName('header')[0].insertAdjacentHTML('afterend', html);
  }

//SKILLS GRID
function drawSkillsGrid(gridData){
    let html      = "";
    if(gridData){
        html += "<section id='skills_grid'>";
        gridData.forEach(quadrant => {
            if(quadrant.skills && quadrant.skills.length > 0){
                html += `<div class='quadrant' id='${quadrant.id}'>`;
                    html += `<div class='label'>${quadrant.label}</div>`;
                    html += "<ul>";
                    quadrant.skills.forEach(skill => {
                        // console.log(skill);
                        html += `<li><span>${skill}</span></li>`;
                    });
                    html += "</ul>";
                    // console.log(html);
                html += "</div>";
            }
        });
        html += "</section>";
    }
    return html;
}

//EXPERIENCE SECTION
function drawExperience(experience){
    let html      = "";
    let role      = null;
    if(experience){
        if(showGithub){
            html += `
            <div class='github'>
                <img src='img/octocat.png' />
                <span><span id='githubUsername'>elevee</span></span>
            </div>
            `;
        }
        experience.forEach(item => {
            html += "<section>";
                if(item.role !== role){
                    html += `<span class='role'>${item.role}</span>`;
                    role = item.role;
                }
                html += "<div class='divtable'><div class='tablerow'>";
                    html += `<span class='company'>${item.company}</span><span class='location'>${item.location}</span><span class='right'>${item.dates}</span>`;
                html += "</div></div>";
                html += item.bullets && item.bullets.length > 0 ? renderBullets(item.bullets) : "";
                // console.log(html);
            html += "</section>";
        });
    }
    return html;
}

//EDUCATION SECTION
function drawEducation(education){
    let html      = "";
    if(education){
        education.forEach(item => {
            html += "<section>";
                html += "<div class='divtable'><div class='tablerow'>";
                html += `<span class='role'>${item.role}</span><span class='location'>${item.location}</span>`;
                html += `<span class='right'>${item.dates}</span>`;
                html += "</div></div>";
                html += item.bullets && item.bullets.length > 0 ? renderBullets(item.bullets) : "";
                // console.log(html);
            html += "</section>";
        });
    }
    return html;
}

function renderBullets(bullets){
    let html = "";
    if(bullets && bullets.length > 0){
        html += "<ul>";
        bullets.forEach(bullet => {
            html += `<li><span>${bullet}</span></li>`;
        })
        html += "</ul>";
    }
    return html;
}

function renderSection(section){
    const body    = document.getElementsByTagName("BODY")[0];
    let html = `<section id='${section.label.toLowerCase()}'>`;
        if (!isCoverLetter) {
            html += `<h2>${section.label}</h2>`;
        }
        switch(section.label){
            case "Skills":
                if(section.grid && section.grid.length > 0){
                    html += drawSkillsGrid(section.grid);
                }
                break;
            case "Experience":
                if(section.items && section.items.length > 0){
                    html += drawExperience(section.items);
                }
                break;
            case "Education":
                if(section.items && section.items.length > 0){
                    html += drawEducation(section.items);
                }
                break;
            case "Cover Letter":
                if(section.letter?.body && section.letter.body.length > 0){
                    html += drawCoverLetter(section);
                }
                break;
        }
    html += `</section>`;
    // console.log(html);
    body.insertAdjacentHTML('beforeend', html);
}

if(data && data.sections){
    const body    = document.getElementsByTagName("BODY")[0];
    let renderableSections;
    if(isCoverLetter){
        renderableSections = data.sections.filter(section => section.label === 'Cover Letter');  
    } else {
        renderableSections = data.sections.filter(section => section.label !== 'Cover Letter');
    }
    renderableSections.forEach(section => {
        renderSection(section);
    })
    body.insertAdjacentHTML('beforeend', "<div class='pagebreak'></div>");
}

function drawCoverLetter(section) {
    const {body, salutation, valediction} = section.letter;
    let html = "";
    if(salutation){
        html += `<p id='salutation'>${salutation}</p>`;
    }
    if(body){
        body.forEach(paragraph => html += `<p>${paragraph}</p>`);
    }
    if(valediction){
        html += `<p id='valediction'>${valediction}</p>`;
        html += `<img src='img/signature.png' id='signature' />`;
        html += `<p id='printedName'>Eric Levine</p>`;
    }
    return html;
}

});