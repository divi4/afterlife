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
            question: "You And A Friend Can't See A Movie Cause Your Not 18. You...",
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
            question: "You Are Stuck In A Hotel With 6 Rooms. You...",
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

let tally = 0;
let counter = 0;
let x = 0;

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
            updateProgress();
            updateTally(counter, e.target.id)
            setText(getText());
        }
}));


document.querySelector(".reset").addEventListener("click", function() {
    fadeOutTransition(".third-section");
    setTimeout(() => {
            resetProgress();
            resetTally();
            setText(getText(resetCounter()));
            fadeInTransition(".first-section");
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
    x = updateBar() * counter;
    document.querySelector(".progress").style.width = `${x}px`;
}


function updateTally(counter, e) {
    tally += texts[counter][e][1];
}


function setTally() {
    if(tally > 5) {
        document.querySelector(".tallying").innerText = "Osiris will allow you into the kingdom of the dead";
        document.querySelector(".reward-text").innerText = "Welcome to the afterlife! Take your time and enjoy...";
    } else {
        document.querySelector(".tallying").innerText = "You have failed, Ammit, the crocodile-faced beast will now end your soul's existence";
        document.querySelector(".reward-text").innerText = "Whilst your gobbled up by Ammit, here's what the righteous are enjoying...";
    }
}


function resetTally() {
    tally = 0;
}


// Transitions
function fadeOutTransition(myClass) {
    document.querySelector(myClass).classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(myClass).classList.add("hidden");
        document.querySelector(myClass).classList.remove("fade-out");
        if(myClass === ".second-section") {
            setTally()
            fadeInTransition(".third-section");
        }
    } , 1250);
}


function fadeInTransition(myClass) {
    document.querySelector(myClass).classList.add("fade-in");
    document.querySelector(myClass).classList.remove("hidden");
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
