// Lecture 2 and 3and 4 in this only

document.addEventListener("DOMContentLoaded", () => {
  // Grabbing elements and storing them into some variable so that later on we can actuially go ahead and refer them.(taaki aage agar kuch bhi empe manipulation ya kuch bhi karna hua to variable name k through hi kar denge.)
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // For each runs on every single element.
  // Whatever the task you want to do
  // in this case I Want to run a method which is render task
  //And each one render task I'LL pass on one element
  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    //First of all i want to grab input value whatever he is typying in there.
    // trim means removing extra spaces from the end
    const taskText = todoInput.value.trim();
    // I have text value now
    // Now i want to check if empty or what
    if (taskText === "") return;

    // Now if the task is there, we want to not only just add the task , we want to add unique ID to it, we also want to add property to it which is completed true and false(based on this property we will display a strike through line CSS or not)
    //So let's create an object
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    // push that new task into the array.
    tasks.push(newTask);
    //You can see in the appkication in browser if it is adding into local storage or not.
    saveTasks();
    renderTask(newTask);
    todoInput.value = ""; //clear input
    console.log(tasks);
  });

  // So this will Actually pick up the task from the local storage and we would love to grab it
  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    //matlab if my task is completed then i want tli to add a class called completed.

    //innerHTML means the content inside the  element
    //So in this li(element) that we created we want text in <span>(inline) and a deleted button after it .
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
    li.addEventListener("click", (e) => {
      //click , (e) e means event where ever this li is clicked

      if (e.target.tagName === "BUTTON") return;
      // If the user clicked on a button, then stop here and do nothing
      // RIGHT NOW WE ARE NOT WORRYING ABOUT THE BUTTON OUR ONLY TARGET IS LI
      //agr tag ka naam = button hua to return kar jaao. because right now i m only worry about when somebody is clicking on the whole list item(li)

      //Baki in other cases
      task.completed = !task.completed;
      //IT WILL ACTUALLY REVERSE TRUE tO FALSE or FALSE TO TRUE

      //After that we would love to remove class completed and add class completed.(for that we have toggle feature in classList)
      li.classList.toggle("completed");
      saveTasks();
    });

    /*
    Now the last thing that we would like to do is on this li if the querySelector is button(on this li if the event is coming up on the click andd the event which is triggered is byh the buttton then we would love to do something) : Now there are couple of ways to do it
    //Putting event listener only on button
    */
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      //just calling each task as t?
      //So i want all li's should comeback expect where the id matches.
      //In this, this ''task'' is still this render function.
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    todoList.appendChild(li);
  }

  function saveTasks() {
    //So this method is going to be used to add things to the local storage
    // Now remember everything is going inside this array(tasks). so the whole idea is to push this task array into the local storage.

    localStorage.setItem("tasks", JSON.stringify(tasks));

    //in setItem the value cannot be a direct string, or we cannot just convert the array in any string because we have to convert it back as well. The structure should remain exactly same.
    //Now where can i go and acfually use it??
    //So after push the task and before clearfing the task
  }
});
