startCountDown(3000);
var alphabetname = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var word = "";
var letterpos = 0;
var selectedLetterArray = [];
var guessedWords = [];
var wordCount = 0;
for(var i = 0; i < 38; i++)
{
    var randomNumber = Math.floor(Math.random()*25);
    document.getElementById("box"+i).innerText = alphabetname[randomNumber];
}
function add(box)
{
    if(letterpos > 27)
    {
        reset();
    }
    else
    {
        var letter = document.getElementById(box).innerText;
        word += letter;
        selectedLetterArray[letterpos] = box;
        document.getElementById(box).style.backgroundColor = "green";
        document.getElementById("letter"+letterpos).style.display = "flex";
        document.getElementById("letter"+letterpos).innerText = letter; 
        document.getElementById(box).removeAttribute("onclick");
        letterpos++;
        if(checkRepeat() !== true)
        {
            compare();
        }
    }   
}
var score = 0

function compare()
{
    for(var i = 0; i < Dictionary.length; i++)
    {
        if(Dictionary[i]==word)
        {
            for(var i = 0; i < word.length; i++)
            {
                document.getElementById("letter"+i).innerText = "";
                document.getElementById("letter"+i).style.display = "none";
                document.getElementById(selectedLetterArray[i]).style.backgroundColor = "red";
            }
            document.getElementById("matched").innerHTML += "<div><h1>"+word+"</h1></div>"
            document.getElementById("score").innerText = score++
            
            guessedWords[wordCount] = word;
            wordCount++;
            word = "";
            letterpos = 0;
            selectedLetterArray = [];
            startCountDown(3000);
        }
    }
}
function reset()
{
    startCountDown(3000);
    for(var i = 0; i < word.length; i++)
    {
        document.getElementById("letter"+i).innerText = "";
        document.getElementById("letter"+i).style.display = "none";
        document.getElementById(selectedLetterArray[i]).style.backgroundColor = "gold";
        document.getElementById(selectedLetterArray[i]).setAttribute("onclick","add(this.id)");
    }
    word = "";
    letterpos = 0;
    selectedLetterArray = [];
}

function checkRepeat()
{
    if(wordCount > 0)
    {
        for(var i = 0; i < guessedWords.length; i++)
        {
            if(guessedWords[i]==word)
            {
                return true;
            }
        }
    }
    return false;
}
var countdownTimer;
var endTime;

function startCountDown(csecs)   // hundredths of a second
{   endTime = Date.now() + 10*csecs; // endTime in millisecs
    decrement();
    countdownTimer = setInterval(decrement, 10);
}

function decrement()
{   var now, time, mins, secs, csecs, timeStr;
    now = Date.now();
    if( now >= endTime)
    {   time = 0;
        gameOver();
        clearInterval( countdownTimer);
    }
    else
    {   time = Math.floor( (endTime - now)/10); // unit = 1/100 sec
        csecs = time%100;
        time = (time-csecs)/100; // unit = 1 sec
        secs = time % 60;
        mins = (time-secs)/60;   // unit = 60 secs
        timeStr =  
          ( (mins < 10)  ? "0" + mins : mins) + ":" +
          ( (secs < 10)  ? "0" + secs : secs) + ":" +
          ( (csecs < 10) ? "0" + csecs : csecs);
    }
    document.getElementById("output").innerHTML=timeStr;
}