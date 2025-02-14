const addBtnEl = document.querySelector("#addBtn");
const mainEl = document.querySelector("#main");

addBtnEl.addEventListener("click",() => {
    addNotes();
})

const saveNotes = () => {
    const notes = document.querySelectorAll(".notes textarea");
    const data = [];
    notes.forEach((note)=> {
        data.push(note.value);
    })
    if(data.length === 0){
        localStorage.removeItem("notes");
    }
    else {
        localStorage.setItem("notes",JSON.stringify(data));
    }
}

const addNotes = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("notes");
    note.innerHTML = `
    <div class="tool">
                <i class="trash fa-regular fa-trash-can"></i>
                <i class="save fa-solid fa-floppy-disk"></i>
            </div>
            <textarea>${text}</textarea>
    `;

    mainEl.appendChild(note);
    saveNotes();

    note.querySelector(".trash").addEventListener("click",()=> {
        note.remove();
        saveNotes();
    });

    note.querySelector(".save").addEventListener("click",()=> {
        saveNotes();
    })
};

(
    () => {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNotes();
        } else {
            lsNotes.forEach((lsNote) => {
                addNotes(lsNote);
            });
        }
    }
)();
