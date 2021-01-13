// Set up questions and tally logic
const texts = {
    1: {
            question: "Theres A Nasty Rumor Spreading Around The School. You...",
            answer1: ["Try To Stop The Rumor As Best As You Can And Stand On Her/His Side.", 2],
            answer2: ["Ask A Friend To Help You Stop The Rumor As Fast As You Can.", 1],
            answer3: ["Trash Him/Her And Make Fun Of Them. You Don't Want To Care.", -2],
            answer4: ["Ignore The Rumor. Just Enjoy Your Wonderful Life At School.", -1]
        },
    2: {
            question: "You And A Friend Can't See A Movie Cause Your Not 18. You...",
            answer1: ["Use Your Hands To Mix It Up And Its Good As New For You.", -1],
            answer2: ["Leave It Alone. Just Eat Breakfast And Fix it Up Later Afternoon Or Other Time.", -2],
            answer3: ["Take A Shower And Look In The Mirror On How It Looks.", 1],
            answer4: ["Fix Up The Hair By Brushing And Combing It Before Eating Breakfast.", 2]
        },
    3: {
            question: "You And A Friend Can't See A Movie Cause Your Not 18. You...",
            answer1: ["Make A Fake ID Out Of Construction Paper To Get In.", -2],
            answer2: ["Find A Friend Whos 18 To Help You Get In And Watch The Movie.", -1],
            answer3: ["Play Arcade Games In The Complex Before You Can Go Home.", 2],
            answer4: ["Wait Until Your 18 So You Can See The Movie In The Complex.", 1]
        },
    4: {
            question: "You Are Stuck In A Hotel With 6 Rooms. You...",
            answer1: ["Get In The One Filled With The Things You Can Buy Like The Mall.", 2],
            answer2: ["Get In The One Filled With Cruise Ships To A Luxurious Hotel.", 1],
            answer3: ["Get In The One Filled With Hungry Tigers And Bloody-Sucking Bats.", -2],
            answer4: ["Get In The One Filled With Assassinators Holding Tommy Guns Pulling The Trigger.", -1]
        },
    5: {
            question: "You Are Too Dizzy To Do Things. You...",
            answer1: ["Take A Nap Until You Become As Good As New.", -1],
            answer2: ["Take Some Other Medicine If You Don't Have Pills And Take A Nap.", 1],
            answer3: ["Take Some Pills And Take A Nap Until You Feel Much Better.", 2],
            answer4: ["Ask Someone To Buy You Medicine To Help You Feel Better.", -2]
        },
    6: {
            question: "You Can't Buy A Pearl Necklace. You...",
            answer1: ["Be Annoyed And Glare At The Jewel Clerk Very Angrily.", -1],
            answer2: ["Ask If You Have Enough Money To Buy Something Else To Wear.", 2],
            answer3: ["Rob The Jewelry Store Necklace And Put It On Yourself To Play With.", -2],
            answer4: ["Go To Another Jewelry Store That Makes The Jewelry Very,Very Cheap.", 1]
        },
    7: {
            question: "Be honest: Do you ever root for the bad guys to win in an action movie? ",
            answer1: ["All the time. Good guys are boring.", -2],
            answer2: ["I might enjoy the violent scenes, but I always root for good or triumph in the end", 1],
            answer3: ["Violence in movies bothers me a little (or a lot)", 2],
            answer4: ["Depends...how cute are the 'bad guys'?", -1]
        },
    8: {
            question: "Would you actually steal candy from a baby?",
            answer1: ["I'll take it, but I'll share it", -1],
            answer2: ["What kind of candy are we talking about here?", 1],
            answer3: ["Yeah, sure. Why not?", -2],
            answer4: ["Seriously? No way. That's horrible", 2]
        },
    9: {
            question: "Have you ever done any community service? ",
            answer1: ["I regularly donate my time.", 2],
            answer2: ["Nope, don't see the point.", -2],
            answer3: ["I've done some, but only to buff up my resume.", 1],
            answer4: ["Yes. But only because I was ordered to.", -1]
        },
    10: {
            question: "Two men are arguing in a public space. They are close to coming to blows. What do you hope happens next? ",
            answer1: ["I hope I can intervene as an ass-kicker.", 1],
            answer2: ["I hope I can intervene as a peacemaker.", 2],
            answer3: ["FIGHT! FIGHT!", -2],
            answer4: ["I hope I don't see anyone get hurt.", -1]
        }
}

let counter = 0;

window.addEventListener("load", function() {
    setText(getText());
    fadeInTransition(".answers");
});

document.querySelectorAll(".answer").forEach(element => element.addEventListener("click", function() {
        if(counter + 1 > 10) {
            counter = 11;
            fadeOutTransition(".first-section");
            setTimeout(fadeInTransition(".second-section"), 1500);
        } else {
            setText(getText());
        }
        updateProgress();
}));


document.querySelector(".reset").addEventListener("click", function() {
    fadeOutTransition(".third-section");
    setTimeout(() => {
            resetProgress();
            setText(getText(resetCounter()));
            fadeInTransition(".first-section");
    } , 2250)
})


function resetProgress() {
    const x = 0;
    document.querySelector(".progress").style.width = x;
}


function updateBar() {
    const barWidth = document.querySelector(".bar").clientWidth;
    const increments = barWidth/11;
    return increments;
}


function updateProgress() {
    const x = updateBar() * counter;
    document.querySelector(".progress").style.width = x;
}


// Transitions
function fadeOutTransition(myClass) {
    document.querySelector(myClass).classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(myClass).classList.add("hidden");
        document.querySelector(myClass).classList.remove("fade-out");
        if(myClass === ".second-section") {
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
    document.querySelector("#ans1").innerText = `${texts[counter].answer1[0]}`;
    document.querySelector("#ans2").innerText = `${texts[counter].answer2[0]}`;
    document.querySelector("#ans3").innerText = `${texts[counter].answer3[0]}`;
    document.querySelector("#ans4").innerText = `${texts[counter].answer4[0]}`;
}


function resetText() {
    document.querySelector(".question").innerText = "";
    document.querySelector("#ans1").innerText = "";
    document.querySelector("#ans2").innerText = "";
    document.querySelector("#ans3").innerText = "";
    document.querySelector("#ans4").innerText = "";
}
