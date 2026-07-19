import { supabase } from "./database.js";

const input = document.querySelector("input");
const taskslist = document.querySelector(".tasks");
const submitBtn = document.querySelector(".btn");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const task = input.value.trim();
  if (!task) return;

  const { data, error } = await supabase
    .from("todos")
    .insert({ task })
    .select();


  const taskId = data[0].id;

  const newTask = document.createElement("li");
  newTask.classList.add("task-item");
  newTask.dataset.id = taskId;
  newTask.innerHTML = `
        <label>
            <input type="checkbox" />
            <span>${task}</span>
            <div class="task-actions">
                <button class="delete">Delete</button>
                <button class="edit">Edit</button>
            </div>
        </label>`;
  taskslist.appendChild(newTask);

  input.value = "";
});

taskslist.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");
    const taskId = li.dataset.id;

    const { error } = await supabase.from("todos").delete().eq("id", taskId);


    li.remove();
  }

  if (e.target.classList.contains("edit")) {
    const li = e.target.closest("li");
    const span = li.querySelector("span");
    const newText = prompt("Task edit karo:", span.textContent);

    if (!newText) return;

    const { error } = await supabase
      .from("todos")
      .update({ task: newText })
      .eq("id", li.dataset.id);

    span.textContent = newText;
  }
});
