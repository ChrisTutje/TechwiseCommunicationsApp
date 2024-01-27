
function validateWords(e){
    var text = document.getElementById("comBody");
    var msg = document.getElementById("motd");
    var bar = document.getElementsByClassName("titlebar");

    var splitText = text.value.split(" ");
    const badWords = ["tit", "tits", "boob", "boobs", "asshole", "ass", "fuck", "fucks", "fucked", "cock", "cocks", "penis", "cuck", "assholes", "asses", "rectum", "bitch", "bitches", "shit", "shits", "shithead", "shitty", "fag", "faggot", "cocksucker"];
    for (let i in splitText){
        if (badWords.includes(splitText[i])){
            msg.style.backgroundColor = "red";
            msg.innerHTML = "Profane word detected!";
            e.preventDefault();
        }
    }
}


