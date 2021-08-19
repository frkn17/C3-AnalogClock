const second = document.querySelector('#second');
const minHand = document.querySelector('#minute-hand');
const hourHand = document.querySelector('#hour-hand');
const selectHour = document.querySelector('#hour');
const selectMin = document.querySelector('#min');
const btnSetAlarm = document.querySelector('#setAlarmBtn');
const alarName=document.querySelector('#alarmName');
const btnDeleteAll = document.querySelector('#deleteAlarmBtn');
const myAlarms = document.querySelector('ul');

var option;
var alarmHour;
var alarMinute;
var date;




for(let i = 0;i<24;i++){
    option = document.createElement('option');
    option.id=i;
    option.value=i;
    if(String(i).length<2){
        option.textContent=`0${i}`;
    }
    else{
        option.textContent=i;
    }
    selectHour.appendChild(option);
}
for(let i=0;i<60;i++){
    option = document.createElement('option');
    option.id=i;
    option.value=i;
    if(String(i).length<2){
        option.textContent=`0${i}`;
    }
    else{
        option.textContent=i;
    }
    selectMin.appendChild(option);
}


btnSetAlarm.addEventListener('click',()=>{
    alarmHour=selectHour.selectedIndex;
    alarMinute=selectMin.selectedIndex;
    const li = document.createElement('li');
    if((String(alarmHour).length <2) || (String(alarMinute).length<2)){
        if((String(alarmHour).length <2) && (String(alarMinute).length>1) ){
            li.appendChild(document.createTextNode(`${alarName.value} - 0${alarmHour}:${alarMinute}`));
        }
        else if((String(alarmHour).length >1) && (String(alarMinute).length<2) ){
            li.appendChild(document.createTextNode(`${alarName.value} - ${alarmHour}:0${alarMinute}`));
        }
        else{
            li.appendChild(document.createTextNode(`${alarName.value} - 0${alarmHour}:0${alarMinute}`));
        }
    }
    else{
        li.appendChild(document.createTextNode(`${alarName.value} - ${alarmHour}:${alarMinute}`));
    }
    const a = document.createElement('a');
    a.setAttribute('href','#');
    a.innerHTML='<i class="far fa-trash-alt"></i>';
    li.appendChild(a);
    myAlarms.appendChild(li);
});


myAlarms.addEventListener('click',(e)=>{
    if(e.target.className === 'far fa-trash-alt'){
        e.target.parentElement.parentElement.remove();
    }
});


btnDeleteAll.addEventListener('click',()=>{
    document.querySelector('ul').innerHTML='';
    document.querySelector('#alarmMessage').textContent='';
});

setInterval(()=>{
     date= new Date();
    second.style.transform =`rotate(${(date.getSeconds()*6)+180}deg)`;
    minHand.style.transform =`rotate(${(date.getMinutes()*6)+180}deg)`;
    hourHand.style.transform =`rotate(${(date.getHours()*30)+180}deg)`;
    alarmControl();
    
}
,1000);


var alarmControl = () => {
    let text,hour,min,name;
    for(let i = 0;i<myAlarms.children.length;i++){
        text=(myAlarms.children[i]).innerText;
        hour=Number((((text.split('-'))[1]).split(':'))[0]);
        min=Number((((text.split('-'))[1]).split(':'))[1]);
        name=(text.split('-'))[0];
        if(hour == date.getHours()){
            if(min == date.getMinutes()){
               document.querySelector('#alarmMessage').textContent=`Time for ${name}. Or snooze the alarm for a minute`;
               if(date.getSeconds() < 60){
                   (myAlarms.children[i]).style.backgroundColor='#26B94C';
               }
            }
           else{
               document.querySelector('#alarmMessage').textContent=' ';
                myAlarms.children[i].style.backgroundColor='#BB9829';
           }
           
        }
    }
}


