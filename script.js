var editIcon = 'fa-edit';
var saveIcon = 'fa-save';
var squareIcon = "fa-square";
var checkedIcon = "fa-check-square";

var form = document.querySelector('.inputFields');
var input = document.querySelector('.inputFields input');
var submitBtn = document.querySelector('.inputFields .btn');

displayEle();

form.addEventListener('submit', (e) => {
        e.preventDefault();

        var enteredVal = input.value;
        var checked = false;
        var trimVal = enteredVal.trim();
        var ls = localStorage.getItem('todo');

        if (trimVal) {
                var todoArr = (ls ? JSON.parse(ls) : []);

                todoArr.push([trimVal, checked]);
                localStorage.setItem('todo', JSON.stringify(todoArr));

                displayEle();
        }
        input.value = '';
});


// checkbox toggle on click event
function checkboxes(index) {
        var todoArr = JSON.parse(localStorage.getItem('todo'));

        todoArr[index][1] = (todoArr[index][1] ? false:true);

        localStorage.setItem('todo', JSON.stringify(todoArr));

        displayEle();

};


// save and edit function to toggle
function changeEdit(obj, index) {
        var val = obj.previousElementSibling;
        var todoArr = JSON.parse(localStorage.getItem('todo'));

        // console.log(val, index);
        if (val.readOnly == true) {
                // adding keypress event - when pressed enter it saves
                val.addEventListener('keypress', (e)=> {
                        if (e.key === 'Enter') {
                                changeEdit(obj, index);
                        }    
                });

                val.readOnly = false;
                val.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                val.focus();
                val.selectionStart = val.selectionEnd = val.value.length;

                obj.classList.replace(editIcon, saveIcon);
        } else {
                console.log(todoArr);
                val.readOnly = true;
                val.style.backgroundColor = 'white';

                obj.classList.replace(saveIcon, editIcon);
                
                todoArr[index][0] = val.value;
                localStorage.setItem('todo', JSON.stringify(todoArr));
        }

};


// deleting a todo element on click event
function deleteEle(index) {
        var ls = localStorage.getItem('todo');
        var todoArr = JSON.parse(ls);
        todoArr.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(todoArr));

        displayEle();
};



// displaying elements from localStorage
function displayEle() {
        var ls = localStorage.getItem('todo');
        var todoArr = (ls ? JSON.parse(ls) : []);

        if (todoArr.length > 0) {
                createTodoEle(todoArr);
        } else {
                createTodoEle(todoArr);
                console.log(`todoArr is Empty!!`);
        }

        localStorage.setItem('todo', JSON.stringify(todoArr));
};


// Creating todoList elements
function createTodoEle(todoArr) {
        var contentUL = document.querySelector('.content ul');
        var listEle = "";

        todoArr.forEach((val, index) => {
                listEle +=
                        `<li><div class="text-box">`;

                listEle += (val[1] ? 
                        `<i id="checkbox" class="far fa-check-square" onclick="checkboxes(${index});"></i>
                        <input type="text" value="${val[0]}" class="text strike-text" readonly>`
                        :
                        `<i id="checkbox" class="far fa-square" onclick="checkboxes(${index});"></i>
                        <input type="text" value="${val[0]}" class="text" readonly>`
                        );

                listEle +=
                        `<i id="edit" class="far fa-edit" onclick="changeEdit(this, ${index});"></i>
                        </div>
                        <i class="fas fa-trash-alt" onclick="deleteEle(${index});"></i>
                </li>`;
        });

        contentUL.innerHTML = listEle;

};
