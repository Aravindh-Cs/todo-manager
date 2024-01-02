/*----------------------------------------------------------*/

const root = document.body;
const mode=document.querySelector('.darkmode');
let isDark = JSON.parse(localStorage.getItem("isDark")) || false;

if(isDark)
{
   root.classList.add("modes");
   mode.innerHTML = 'Light';
   isDark = isDark;
   localStorage.setItem("isDark",isDark);
}

mode.addEventListener('click',()=>
{
   if(!isDark)
   {
      root.classList.add("modes");
      mode.innerHTML = 'Light';
      isDark = !isDark;
      localStorage.setItem("isDark",isDark);
   }
   else
   {
      root.classList.remove("modes");
      mode.innerHTML = 'Dark'
      isDark = !isDark;
      localStorage.setItem("isDark",isDark);
   }
})
/*----------------------------------------------------------*/

let greeting = document.querySelector('.greeting');
const time = new Date();
let hr = time.getHours();

if(hr<12)
{
   greeting.innerHTML = "Good Morning,";
}   
else if(hr > 12 && hr < 18)
{
   greeting.innerHTML = "Good Afternoon,";
}
else 
{
    greeting.innerHTML = "Good Evening,";
}

/*----------------------------------------------------------*/

const btn = document.querySelector('#addtask');
const taskInput = document.querySelector('.input');
const clear = document.querySelector('.clr');
let clears = document.querySelector('.clr')


function getTask()
{
   const taskString = localStorage.getItem('tasks');
   return taskString ? JSON.parse(taskString) : [];
}   
function setTask(tasks)
{
   localStorage.setItem('tasks',JSON.stringify(tasks))
}
let tasks = getTask();
//task method
function rendertask()
{
   const taskArea = document.querySelector('.box');
   taskArea.innerHTML='';
   tasks.forEach((task,index)=>
   {
      const li = createTaskElement(task,index);
      taskArea.appendChild(li);
   }) 
   setTask(tasks)
}

function createTaskElement(task,index)
{
    const li = document.createElement('li');

    const p = document.createElement('p');
    p.textContent = task.name;
    if(task.completed)
    {
      p.classList.add ('completed')
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.onchange = () =>toggleTask(index)

    const button = document.createElement('button');
    button.innerHTML = 'Delete';
    button.classList.add('delete')
    button.onclick = () =>deleteTask(index)

    li.appendChild(checkbox)
    li.appendChild(p);
    li.appendChild(button)
    return li;
}

clears.addEventListener('click',()=>
{
   tasks=[]
   rendertask();
})
//adding task
btn.addEventListener('submit',(e)=>
{
   e.preventDefault();
   taskName = taskInput.value.trim();
   if(taskName !=='')
   {
   tasks.push({name:taskName,completed:false})
   rendertask();
   taskInput.value = '';
   }

})
rendertask();
//toggling task
function toggleTask(index)
{
tasks[index].completed = !tasks[index].completed;
rendertask();
}
//delete 
function deleteTask(index)
{
   tasks.splice(index,1);
   rendertask();
}
//filter
function filtertasks(filtertype)
{
    const taskArea = document.querySelector('.box');
    taskArea.innerHTML='';
switch(filtertype)
{
   case 'All':
      tasks.forEach((task,index)=>
      {
        const li =createTaskElement(task,index);
        taskArea.appendChild(li);
      })
      break;
   case 'Pending':
      filtertask(false);
      break;
   case 'Completed':
      filtertask(true);
      break; 
   default:
      break;    
}
}

function filtertask(completed)
   {
    tasks.forEach((task,index)=>
    {
        if(task.completed === completed)
        {
            const li = createTaskElement(task,index);
            const taskArea = document.querySelector('.box');
            taskArea.appendChild(li);
        }
    })
      
   }
rendertask();