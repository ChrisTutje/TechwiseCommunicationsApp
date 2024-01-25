
function validateWords(e){
    var text = document.getElementById("comBody");
    var msg = document.getElementById("motd");
    var bar = document.getElementsByClassName("titlebar");

    var splitText = text.value.split(" ");
    const badWords = ["tits", "boob"];
    console.log("checking words...");
    console.log(splitText);
    for (let i in splitText){
        if (badWords.includes(splitText[i])){
            console.log("word found");
            msg.style.backgroundColor = "red";
            msg.innerHTML = "Profane word detected!";
            e.preventDefault();
        }
    }
}


