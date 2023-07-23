const url = "https://opentdb.com/api.php?amount=10&type=boolean"
btn=document.getElementById("quiz")
que=document.getElementById("#question")
time=document.getElementById("timer")

time.classList.add("quiztext")

let SEC=30

let i=0
let correct_answer_arr=[]
let question_arr=[]
let seconds=SEC
let display_time

const res=async()=>{
  const response=await axios.get(url)
  data=response.data.results
  data.forEach(addItems)
}

function stopInterval(){
    clearInterval(display_time);
}


const next_question=()=>{
    if(i<10){
        que_text=question_arr[i]
        if (i==0){
            text=document.createElement('h1')
            text.innerHTML=`${i+1}.${que_text}`
            text.classList.add("container")
            text.classList.add("quiztext")
            document.body.append(text)
        }else{
            text.innerHTML=`${i+1}.${que_text}`
        }
        i=i+1
        seconds=SEC
    }else{
        text.innerHTML="No more questions!"
        clearInterval(display_time)
        console.log("stopped!")
        seconds=0
    }
}

const timer =()=>{
    if (seconds>0){
        if (seconds>=10){
            time_txt=`00 : ${seconds}`
        }else{
            time_txt=`00 : 0${seconds}`
        }

        console.log(time_txt)
        time.innerHTML=time_txt
        seconds-=1
    }
    else if (seconds==0){

        time_txt=`00 : 0${seconds}`
        time.innerHTML=time_txt
        seconds=SEC
        console.log(time_txt)
        next_question()
    }
    console.log("time!")
}

function addItems(item){
    q=item.question
    question_arr.push(q)
    answer=item.correct_answer
    correct_answer_arr.push(answer);
}

const display=()=>{
    display_time=setInterval(timer,1000)
    next_question()
}

function clicked(){
    stopInterval(display_time)
    display()
}

res()

btn.addEventListener("click",clicked)




