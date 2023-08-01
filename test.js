const url = "https://opentdb.com/api.php?amount=10&type=boolean"
btn=document.getElementById("quiz")
que=document.getElementById("#question")
time=document.getElementById("timer")
container = document.getElementById('container')
r=document.getElementById("radio_buttons")
radio_values=document.getElementsByName('answer');
result=document.getElementById("result_button")
back=document.getElementById("back_button")
time.classList.add("quiztext")

let SEC=10
let i=0
let j
let n
let not_ans=0
let correct=0
let wrong=0
let correct_answer_arr=[]
let question_arr=[]
let user_answer=[]
let seconds=SEC
let display_time
r.hidden=true
let result_nodes=[]

//Get data from trivia database.
const res=async()=>{
    const response=await axios.get(url)
    data=response.data.results
    data.forEach(addItems)
}

function addItems(item){
    q=item.question
    question_arr.push(q)
    answer=(item.correct_answer).toLowerCase()
    correct_answer_arr.push(answer);
}

function add_user_answers(){
    if(radio_values[0].checked){
        user_answer.push(radio_values[0].value)
    }
    else if (radio_values[1].checked){
        user_answer.push(radio_values[1].value)
    } else {
        user_answer.push("null")
    }
    for(j=0;j<2;j++){
        radio_values[j].checked=false
    }
}

function on_submit(){
    add_user_answers()
    if(user_answer.length==10){
        submit_button.disabled=true
        result_button=create_button("Result")
        result.appendChild(result_button)
        result_button.addEventListener("click",check_answer)
    }
    clearInterval(display_time);
    display()
    add_radio_buttons()
}

//Remove existing radio buttons and add them again on DOM.
function add_radio_buttons() {
    r.hidden=false
    submit_button.addEventListener("click",on_submit)
}

//Display question from array.
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
        document.body.removeChild(r)
        text.innerHTML="No more questions!"
        clearInterval(display_time)
        seconds=0
    }
}

//Display time on DOM and update time after each second.
const timer =()=>{
    if (seconds>0){
        if (seconds>=10){
            time_txt=`00 : ${seconds}`
        }else{
            time_txt=`00 : 0${seconds}`
        }

        // console.log(time_txt)
        time.innerHTML=time_txt
        seconds-=1
    }
    else if (seconds==0){
        add_user_answers()
        // console.log(user_answer)
        time_txt=`00 : 0${seconds}`
        time.innerHTML=time_txt
        seconds=SEC
        next_question()
    }
    // console.log("time!")
}

//Display and time on DOM.
const display=()=>{
    display_time=setInterval(timer,1000)
    next_question()
}

//create button
function create_button(b_string){
    the_button=document.createElement('button')
    the_button.classList.add("button")
    the_button.classList.add("is-primary")
    the_button.textContent = b_string
    return the_button
}

//Make changes in DOM after clicking button.
function clicked(){
    btn.remove()
    submit_button=create_button("Submit")
    document.body.append(submit_button)
    clearInterval(display_time);
    display()
    add_radio_buttons()
}

function check_answer(){
    let final_result=[]
    label_list=["not answered","Correct answered","wrong answered"]
    let x
    for(n=0;n<user_answer.length;n++){
        if(user_answer[n]=="null"){
            not_ans+=1
        }else if (user_answer[n]==correct_answer_arr[n]){
            correct+=1
        }else{
            wrong+=1
        }
    }
    final_result.push(not_ans,correct,wrong)
    document.body.removeChild(text)
    document.body.removeChild(submit_button)
    result_button.remove()

    for(x=0;x<3;x++){
        result_num=document.createElement("h3")
        result_tag=document.createElement("h3")
        result_num.innerText=final_result[x]
        result_tag.innerText=label_list[x]
        result_num.classList.add("result_text")
        result_tag.classList.add("result_text")
        document.body.append(result_num,result_tag)
    }
    back_button=create_button("Back to home")
    back.appendChild(back_button)
}


//Get data.
res()

btn.addEventListener("click",clicked)












