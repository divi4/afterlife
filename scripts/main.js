// Set up animation states and transistions
// Change the image to weighing-start for > 526px;
// Make heart draggable
const texts = {
    1: {
            question: "There's a nasty rumor spreading around the school. You...",
            ans1: ["Try to stop the rumor as best as you can and stand on her/his side.", 2],
            ans2: ["Ask a friend to help you stop the rumor as fast as you can.", 1],
            ans3: ["Trash him/her and make fun of them. You don't want to care.", -2],
            ans4: ["Ignore the rumor. Just enjoy your wonderful life at school.", -1]
        },
    2: {
            question: "Your having a bad hair day. You...",
            ans1: ["Use your hands to mix it up and its good as new for you.", -1],
            ans2: ["Leave it alone. Just eat breakfast and fix it up late afternoon or whenever.", -2],
            ans3: ["Take a shower and look in the mirror to see how it looks.", 1],
            ans4: ["Fix up the hair by brushing and combing it before eating breakfast.", 2]
        },
    3: {
            question: "You and a friend can't see a movie cause your not 18. You...",
            ans1: ["Make a fake ID out of construction paper to get in.", -2],
            ans2: ["Find a friend whos 18 to help you get in and watch the movie.", -1],
            ans3: ["Play arcade games in the complex before you can go home.", 2],
            ans4: ["Wait until your 18 so you can see the movie in the complex.", 1]
        },
    4: {
            question: "You are stuck in a hotel with 4 rooms. You...",
            ans1: ["Get in the one filled with the things you can buy like from the mall.", 2],
            ans2: ["Get in the one filled with cruise ships and luxurious hotels.", 1],
            ans3: ["Get in the one filled with hungry tigers and blood-sucking bats.", -2],
            ans4: ["Get in the one filled with assassins firing Tommy guns", -1]
        },
    5: {
            question: "You are too Dizzy to to things. You...",
            ans1: ["Take a nap until you become as good as new.", -1],
            ans2: ["Take some other medicine if you don't have pills and take a nap.", 1],
            ans3: ["Take some pills and take a nap until you feel much better.", 2],
            ans4: ["Ask someone to buy you medicine to help you feel better.", -2]
        },
    6: {
            question: "You can't buy a pearl necklace. You...",
            ans1: ["Rob the jewelry store necklace and put it on yourself to play with.", -2],
            ans2: ["Ask if you have enough money to buy something else to wear.", 2],
            ans3: ["Be annoyed and glare at the jewel clerk very angrily.", -1],
            ans4: ["Go to another jewelry store that makes the jewelry very, very cheap.", 1]
        },
    7: {
            question: "Be honest: Do you ever root for the bad guys to win in an action movie? ",
            ans1: ["All the time. Good guys are boring.", -2],
            ans2: ["I might enjoy the violence but I always root for good to triumph in the end", 1],
            ans3: ["Violence in movies bothers me a little (or a lot)", 2],
            ans4: ["Depends...how cute are the 'bad guys'?", -1]
        },
    8: {
            question: "Would you actually steal candy from a baby?",
            ans1: ["I'll take it, but I'll share it", -1],
            ans2: ["What kind of candy are we talking about here?", 1],
            ans3: ["Yeah, sure. Why not?", -2],
            ans4: ["Seriously? No way. That's horrible", 2]
        },
    9: {
            question: "Have you ever done any community service? ",
            ans1: ["I regularly donate my time.", 2],
            ans2: ["I haven't but I plan on doing some in the future.", 1],
            ans3: ["Nope, don't see the point.", -2],
            ans4: ["I've done some, but only to buff up my resume.", -1]
        },
    10: {
            question: "Two men are arguing in a public space. They are close to coming to blows. What do you hope happens next? ",
            ans1: ["FIGHT! FIGHT!", -2],
            ans2: ["I hope I can intervene as a peacemaker.", 2],
            ans3: ["I hope I can intervene as an ass-kicker.", 1],
            ans4: ["I hope I don't see anyone get hurt.", -1]
        }
}

let tally = 0;
let counter = 0;
let width = 0;


let rotation = 0;
let translateXLeft = -4;
let translateXRight = -0.5;
let translateYLeft = 17;
let translateYRight = -16;
let interval;

window.addEventListener("load", function() {
    setText(getText());
    fadeInTransition(".answers");
});

document.querySelectorAll(".answer").forEach(element => element.addEventListener("click", function(e) {
        if(counter + 1 > 10) {
            counter = 11;
            updateProgress();
            fadeOutTransition(".first-section");
            fadeOutTransition("footer");
            setTimeout(fadeInTransition(".second-section"), 1500);
        } else {
            updateTally(counter, e.target.id)
            setText(getText());
            updateProgress();
        }
}));


document.querySelector(".reset").addEventListener("click", function() {
    fadeOutTransition(".third-section");
    fadeOutTransition("footer");
    fadeOutTransition(".tallying");
    fadeOutTransition(".judgement");
    setTimeout(() => {
            resetProgress();
            resetTally();
            setText(getText(resetCounter()));
            fadeInTransition(".first-section");
            fadeInTransition("footer");
            resetScales();
    } , 2250)
})


function resetProgress() {
    width = 0;
    document.documentElement.style.setProperty("--x", width);
}


function updateBar() {
    const barWidth = document.querySelector(".bar").clientWidth;
    const increments = barWidth/11;
    return increments;
}


function updateProgress() {
    width = updateBar() * counter;
    document.documentElement.style.setProperty("--x", width + "px");
}


function updateTally(counter, e) {
    tally += texts[counter][e][1];
}


function setTally() {
    if(tally > 2) {
        startScale(1);
        document.querySelector(".tallying").innerText = "Osiris will allow you into the kingdom of the dead";
        document.querySelector(".reward-text").innerText = "Welcome to the afterlife! Take your time and enjoy...";
    } else {
        startScale(0);
        document.querySelector(".tallying").innerText = "You have failed, Ammit, the crocodile-faced beast will now end your soul's existence";
        document.querySelector(".reward-text").innerText = "Whilst your gobbled up by Ammit, here's what the righteous are enjoying...";
    }
    setTimeout(function() {
        fadeInTransition(".tallying");
        fadeInTransition(".judgement");
    }, 800);
};


function resetTally() {
    tally = 0;
}


// Transitions
function fadeOutTransition(myClass) {
    document.querySelector(myClass).classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(myClass).classList.add("hidden");
        document.querySelector(myClass).classList.remove("fade-out");
        if(myClass === ".tallying" || myClass === ".judgement") {
            document.querySelector(myClass).classList.add("invisible");
        }
        if(myClass === ".second-section") {
            setTally()
            fadeInTransition(".third-section");
            fadeInTransition("footer");
        }
    } , 1250);
}


function fadeInTransition(myClass) {
    document.querySelector(myClass).classList.add("fade-in");
    document.querySelector(myClass).classList.remove("hidden");
    document.querySelector(myClass).classList.remove("invisible");
    setTimeout(() => {
        document.querySelector(myClass).classList.remove("fade-in");
        if(myClass === ".second-section") {
            fadeOutTransition(".second-section");
        }
    }, 3750);
}


function resetCounter() {
    counter = 0;
    return counter;
}


function getText() {
    counter = counter + 1;
    return counter;
}


function setText(counter) {
    document.querySelector(".question").innerText = `${texts[counter].question}`
    document.querySelector("#ans1").innerText = `${texts[counter].ans1[0]}`;
    document.querySelector("#ans2").innerText = `${texts[counter].ans2[0]}`;
    document.querySelector("#ans3").innerText = `${texts[counter].ans3[0]}`;
    document.querySelector("#ans4").innerText = `${texts[counter].ans4[0]}`;
}


function resetText() {
    document.querySelector(".question").innerText = "";
    document.querySelector("#ans1").innerText = "";
    document.querySelector("#ans2").innerText = "";
    document.querySelector("#ans3").innerText = "";
    document.querySelector("#ans4").innerText = "";
}


// Animation to move arm and plates of scales
function startScale(check) {
    if(check === 1) {
        interval = setInterval(scaleWin, 50);
    } else if(check === 0) {
        interval = setInterval(scaleLose, 50);
    }
}


function scaleWin() {
    if(rotation <= 6) {
        rotation += 0.3;
        translateXLeft -= 0.1;
        translateXRight -= 0.2;

        document.querySelector("#arm").style.webkitTransform = 'rotate('+ rotation +'deg)'
        document.querySelector("#arm").style.mozTransform = 'rotate('+ rotation +'deg)'
        document.querySelector("#arm").style.msTransform = 'rotate('+ rotation +'deg)'
        document.querySelector("#arm").style.transform = 'rotate('+ rotation +'deg)'

        lPlateWin();
        rPlateWin();

    } else {
        return "setInterval(scaleWin, 50)";
    }
};


function lPlateWin() {
    translateYLeft -= 0.4;
    document.querySelector("#l-plate").style.webkitTransform = 'translate(' + translateXLeft + 'px, ' + translateYLeft + 'px)'
    document.querySelector("#l-plate").style.mozTransform = 'translate(' + translateXLeft + 'px, ' + translateYLeft + 'px)'
    document.querySelector("#l-plate").style.msTransform = 'translate(' + translateXLeft + 'px, ' + translateYLeft + 'px)'
    document.querySelector("#l-plate").style.transform = 'translate(' + translateXLeft + 'px, ' + translateYLeft + 'px)'
}


function rPlateWin() {
    translateYRight += 0.3;
    document.querySelector("#r-plate").style.webkitTransform = 'translate(' + translateXRight + 'px, ' + translateYRight + 'px)'
    document.querySelector("#r-plate").style.mozTransform = 'translate(' + translateXRight + 'px, ' + translateYRight + 'px)'
    document.querySelector("#r-plate").style.msTransform = 'translate(' + translateXRight + 'px, ' + translateYRight + 'px)'
    document.querySelector("#r-plate").style.transform = 'translate(' + translateXRight + 'px, ' + translateYRight + 'px)'
}


function scaleLose() {
    if(rotation >= -6) {
        rotation -= 0.3;
        translateXLeft += 0.2;
        translateXRight += 0.1;


        document.querySelector("#arm").style.webkitTransform = 'rotate('+ rotation +'deg)'
        document.querySelector("#arm").style.mozTransform = 'rotate('+ rotation +'deg)'
        document.querySelector("#arm").style.msTransform = 'rotate('+ rotation +'deg)'
        document.querySelector("#arm").style.transform = 'rotate('+ rotation +'deg)'

        lPlateLose();
        rPlateLose();

    } else {
        return "setInterval(scaleLose, 50)";
    }
};


function lPlateLose() {
    translateYLeft += 0.3;
    document.querySelector("#l-plate").style.webkitTransform = 'translate(' + translateXLeft + 'px, ' + translateYLeft + 'px)'
    document.querySelector("#l-plate").style.mozTransform = 'translate(' + translateXLeft + 'px, ' + translateYLeft + 'px)'
    document.querySelector("#l-plate").style.msTransform = 'translate(' + translateXLeft + 'px, ' + translateYLeft + 'px)'
    document.querySelector("#l-plate").style.transform = 'translate(' + translateXLeft + 'px, ' + translateYLeft + 'px)'
}


function rPlateLose() {
    translateYRight -= 0.35;
    document.querySelector("#r-plate").style.webkitTransform = 'translate(' + translateXRight + 'px, ' + translateYRight + 'px)'
    document.querySelector("#r-plate").style.mozTransform = 'translate(' + translateXRight + 'px, ' + translateYRight + 'px)'
    document.querySelector("#r-plate").style.msTransform = 'translate(' + translateXRight + 'px, ' + translateYRight + 'px)'
    document.querySelector("#r-plate").style.transform = 'translate(' + translateXRight + 'px, ' + translateYRight + 'px)'
}


function resetScales() {
    clearInterval(interval);
    rotation = 0;
    translateXLeft = -4;
    translateXRight = -0.5;
    translateYLeft = 17;
    translateYRight = -16;
    document.querySelector("#arm").style.webkitTransform = 'rotate('+ 0 +')'
    document.querySelector("#arm").style.mozTransform = 'rotate('+ 0 +')'
    document.querySelector("#arm").style.msTransform = 'rotate('+ 0 +')'
    document.querySelector("#arm").style.transform = 'rotate('+ 0 +')'

    document.querySelector("#l-plate").style.webkitTransform = 'translate(' + -4 + 'px, ' + 17 + 'px)'
    document.querySelector("#l-plate").style.mozTransform = 'translate(' + -4 + 'px, ' + 17 + 'px)'
    document.querySelector("#l-plate").style.msTransform = 'translate(' + -4 + 'px, ' + 17 + 'px)'
    document.querySelector("#l-plate").style.transform = 'translate(' + -4 + 'px, ' + 17 + 'px)'

    document.querySelector("#r-plate").style.webkitTransform = 'translate(' + -0.5 + 'px, ' + -16 + 'px)'
    document.querySelector("#r-plate").style.mozTransform = 'translate(' + -0.5 + 'px, ' + -16 + 'px)'
    document.querySelector("#r-plate").style.msTransform = 'translate(' + -0.5 + 'px, ' + -16 + 'px)'
    document.querySelector("#r-plate").style.transform = 'translate(' + -0.5 + 'px, ' + -16 + 'px)'
}
