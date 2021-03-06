// Set up animation states and transistions
// Change the image to weighing-start for > 526px;
// Make heart draggable
const texts = {
    1: {
            question: "Theres A Nasty Rumor Spreading Around The School. You...",
            ans1: ["Try To Stop The Rumor As Best As You Can And Stand On Her/His Side.", 2],
            ans2: ["Ask A Friend To Help You Stop The Rumor As Fast As You Can.", 1],
            ans3: ["Trash Him/Her And Make Fun Of Them. You Don't Want To Care.", -2],
            ans4: ["Ignore The Rumor. Just Enjoy Your Wonderful Life At School.", -1]
        },
    2: {
            question: "Your having a bad hair day. You...",
            ans1: ["Use Your Hands To Mix It Up And Its Good As New For You.", -1],
            ans2: ["Leave It Alone. Just Eat Breakfast And Fix it Up Later Afternoon Or Other Time.", -2],
            ans3: ["Take A Shower And Look In The Mirror On How It Looks.", 1],
            ans4: ["Fix Up The Hair By Brushing And Combing It Before Eating Breakfast.", 2]
        },
    3: {
            question: "You And A Friend Can't See A Movie Cause Your Not 18. You...",
            ans1: ["Make A Fake ID Out Of Construction Paper To Get In.", -2],
            ans2: ["Find A Friend Whos 18 To Help You Get In And Watch The Movie.", -1],
            ans3: ["Play Arcade Games In The Complex Before You Can Go Home.", 2],
            ans4: ["Wait Until Your 18 So You Can See The Movie In The Complex.", 1]
        },
    4: {
            question: "You Are Stuck In A Hotel With 4 Rooms. You...",
            ans1: ["Get In The One Filled With The Things You Can Buy Like The Mall.", 2],
            ans2: ["Get In The One Filled With Cruise Ships To A Luxurious Hotel.", 1],
            ans3: ["Get In The One Filled With Hungry Tigers And Bloody-Sucking Bats.", -2],
            ans4: ["Get In The One Filled With Assassinators Holding Tommy Guns Pulling The Trigger.", -1]
        },
    5: {
            question: "You Are Too Dizzy To Do Things. You...",
            ans1: ["Take A Nap Until You Become As Good As New.", -1],
            ans2: ["Take Some Other Medicine If You Don't Have Pills And Take A Nap.", 1],
            ans3: ["Take Some Pills And Take A Nap Until You Feel Much Better.", 2],
            ans4: ["Ask Someone To Buy You Medicine To Help You Feel Better.", -2]
        },
    6: {
            question: "You Can't Buy A Pearl Necklace. You...",
            ans1: ["Be Annoyed And Glare At The Jewel Clerk Very Angrily.", -1],
            ans2: ["Ask If You Have Enough Money To Buy Something Else To Wear.", 2],
            ans3: ["Rob The Jewelry Store Necklace And Put It On Yourself To Play With.", -2],
            ans4: ["Go To Another Jewelry Store That Makes The Jewelry Very,Very Cheap.", 1]
        },
    7: {
            question: "Be honest: Do you ever root for the bad guys to win in an action movie? ",
            ans1: ["All the time. Good guys are boring.", -2],
            ans2: ["I might enjoy the violent scenes, but I always root for good or triumph in the end", 1],
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
            ans2: ["Nope, don't see the point.", -2],
            ans3: ["I've done some, but only to buff up my resume.", 1],
            ans4: ["Yes. But only because I was ordered to.", -1]
        },
    10: {
            question: "Two men are arguing in a public space. They are close to coming to blows. What do you hope happens next? ",
            ans1: ["I hope I can intervene as an ass-kicker.", 1],
            ans2: ["I hope I can intervene as a peacemaker.", 2],
            ans3: ["FIGHT! FIGHT!", -2],
            ans4: ["I hope I don't see anyone get hurt.", -1]
        }
}

let tally = [];
let counter = 0;
let width = 0;
let j = 0;


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
            setTimeout(fadeInTransition(".second-section"), 1500);
        } else {
            updateTally(counter, e.target.id)
            setText(getText());
            updateProgress();
        }
}));


document.querySelector(".reset").addEventListener("click", function() {
    fadeOutTransition(".third-section");
    fadeOutTransition(".tallying");
    fadeOutTransition(".judgement");
    setTimeout(() => {
            resetProgress();
            resetTally();
            setText(getText(resetCounter()));
            fadeInTransition(".first-section");
            resetScales();
    } , 2250)
})


function resetProgress() {
    x = 0;
    document.querySelector(".progress").style.width = x;
}


function updateBar() {
    const barWidth = document.querySelector(".bar").clientWidth;
    const increments = barWidth/11;
    return increments;
}


function updateProgress() {
    width = updateBar() * counter;
    document.querySelector(".progress").style.width = `${width}px`;
}


function updateTally(counter, e) {
    tally[counter-1] = texts[counter][e][1];
}


function runTally() {
    // if(j < tally.length) {
    //     setTimeout(function() {
    //         if(tally[j] === 1) {
    //             scaleWin()
    //             console.log(1);
    //         } else if(tally[j] === 2) {
    //             scaleWin()
    //             scaleWin()
    //             console.log(2);
    //         } else if(tally[j] === -1) {
    //             scaleLose()
    //             console.log(-1);
    //         } else if(tally[j] === -2) {
    //             scaleLose()
    //             console.log(-2);
    //         }
    //         j += 1;
    //     }, 500);
    // } else {
    //     return "setInterval(runTally(), 400)";
    // }
    const total = tally.reduce((a, b) => a + b, 0);
    setResults(total);
}


function setResults(total) {
    if(total > 3) {
        scaleWin(1);
        document.querySelector(".tallying").innerText = "Osiris will allow you into the kingdom of the dead";
        document.querySelector(".reward-text").innerText = "Welcome to the afterlife! Take your time and enjoy...";
    } else {
        scaleWin(0);
        document.querySelector(".tallying").innerText = "You have failed, Ammit, the crocodile-faced beast will now end your soul's existence";
        document.querySelector(".reward-text").innerText = "Whilst your gobbled up by Ammit, here's what the righteous are enjoying...";
    }
    setTimeout(function() {
        fadeInTransition(".tallying");
        fadeInTransition(".judgement");
    }, 800);
};


function resetTally() {
    tally = [];
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
            setResults()
            fadeInTransition(".third-section");
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
        } else if(myClass === ".third-section") {
                runTally(); //    const clear = setInterval(runTally(), 400);
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
