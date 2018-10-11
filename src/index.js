const data = require('./sample.js');

document.addEventListener("DOMContentLoaded", function() {
  document.getElementsByTagName("TITLE")[0].innerText = data.header.name;

  //HEADER
  function drawHeader(_header){
      const header = document.getElementsByTagName("HEADER")[0];
      let html = `<h1>${_header.name}</h1>`;
      html += `<span>${_header.address} &bull; ${_header.city}, ${_header.state} &bull; ${_header.phone} &bull; ${_header.email}</span>`;
      header.insertAdjacentHTML('beforeend', html);
  }

  drawHeader(data.header);

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
    if(experience){
        experience.forEach(item => {
            html += "<section>";
                html += `<span class='role'>${item.role}</span>`;
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
    // console.log(section);
    const body    = document.getElementsByTagName("BODY")[0];
    let html = `<section id='${section.label.toLowerCase()}'>`;
        html += `<h2>${section.label}</h2>`;
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
        }
    html += `</section>`;
    // console.log(html);
    body.insertAdjacentHTML('beforeend', html);
  }

  if(data && data.sections){
    const body    = document.getElementsByTagName("BODY")[0];
    data.sections.forEach(section => {
        renderSection(section);
    })
    body.insertAdjacentHTML('beforeend', "<div class='pagebreak'></div>");
  }
});