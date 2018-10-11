(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./sample.js":2}],2:[function(require,module,exports){
module.exports = {
    header: {
        name: "Gritty",
        address: "1400 John F Kennedy Blvd",
        city: "Philadelphia",
        state: "PA",
        zip: "19107",
        phone: "215.686.1776",
        email: "gritty@flyers.com"
    },
    sections: [
        {
            label: "Skills",
            grid: [
                {
                    id: "quad1",
                    label: "Mascot Stuff",
                    skills: [
                        "Being annoying",
                        "Overexaggeration skills",
                        "A face for radio",
                        "Giving children nightmares",
                        "Giving adults nightmares",
                    ]
                },
                {
                    id: "quad2",
                    label: "Energy",
                    skills: [
                        "Rappelled from the rafters",
                        "Able to skate without assistance",
                        "Other things",
                    ],
                },
                {
                    id: "quad3",
                    label: "Office Skills",
                    skills: [
                        "Microsoft Word",
                        "Adobe Photoshop",
                        "Did I say Microsoft Word?",
                        "Microsoft Excel once..."
                    ]
                },
                {
                    id: "quad4",
                    label: "Interests",
                    skills: [
                        "Hockey",
                        "Antagonizing people",
                        "Not a big talker"
                    ]
                }
            ]
        },
        {
            label: "Experience",
            items: [
                {
                    role: "Official Mascot",
                    company: "Philadelphia Flyers",
                    location: "Philadelphia, Pa",
                    dates: "October 2018 - Present",
                    bullets: [
                        "Doing BIG THINGS. Big Things over here.",
                        "Marketing team are earning their keep with my rollout. Already been on Conan and all over Instagram."
                    ]
                },
                {
                    role: "Software Developer",
                    company: "Webpages, Inc.",
                    location: "Los Angeles, Ca",
                    dates: "November 2013 - January 2014",
                    bullets: [
                        "Used my marquee-tag skills and got me job making them newfangled web pages for a super important company",
                        "Company folded after they hired me."
                    ]
                },
                {
                    role: "Construction Worker",
                    company: "Dave's Contractors",
                    location: "Indio, Ca",
                    dates: "2010-2013",
                    bullets: [
                        "Built stages for Coachella. Tickets are free if you build ALL of their stages",
                        "Never showered once"
                    ]
                },
            ]
        },
        {
            label: "Education",
            items: [
                {
                    role: "Temple University",
                    location: "Philadelphia, PA",
                    dates: "2016",
                    bullets: [
                        "Best cheesesteak is at Tony Luke's.",
                        "Get the Wiz-Wit. YOU ALLLLREADY KNOW!"
                    ]
                },
                {
                    role: "Chilantro Server",
                    location: "Austin, TX",
                    dates: "June - August 2013",
                    bullets: [
                        "Worked in a Korean/Mexican food truck in Austin.",
                        "Don't knock it until you try the Kimchi fries.",
                        "Implemented front-end technologies including: Javascript, jQuery, AJAX, HTML, CSS."
                    ]
                },
            ]
        }
    ]
}
},{}]},{},[1]);
