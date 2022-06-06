let Boxes = document.querySelectorAll('.box');
let txt = document.querySelector('input');
let button = document.querySelector('button.add');
let clear = document.querySelector('button.clear');
let drag = null;
let data = localStorage.data ? JSON.parse(localStorage.data) : [];
// if (localStorage.data != '') {
//     let data = JSON.parse(localStorage.data)
// } else {
//     let data = [
//         { "inner": "sayed", "location": 0, "draggable": true }
//     ]
// }

window.onload = txt.focus();

if (localStorage.data != []) {
    JSON.parse(localStorage.data).map(localItem => {
        let item = document.createElement('div');
        let itemTxt = document.createTextNode(localItem.inner);
        item.appendChild(itemTxt);
        item.setAttribute('draggable', true);
        item.setAttribute("location", localItem.location);
        item.setAttribute("selected", false);
        item.classList.add('item');
        Boxes.forEach(localBox => {
            if (localBox.getAttribute("key") == localItem.location) {
                localBox.appendChild(item)
            }
        })
    })
    dragItem();
}

// dragItem();

button.addEventListener('click', () => {
    if (txt.value != '') {
        let item = document.createElement('div');
        let itemTxt = document.createTextNode(txt.value);
        item.appendChild(itemTxt);
        item.setAttribute('draggable', true);
        item.setAttribute("location", 0);
        item.classList.add('item');
        Boxes[0].appendChild(item);
        txt.value = '';

        // create data value
        let val = {
            "inner": item.textContent,
            "location": 0,
            "draggable": true,
            "selected": false
        }

        data.push(val);
        localStorage.setItem("data", JSON.stringify(data));
        console.log(data)
    }
    dragItem();
})

txt.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        if (txt.value != '') {
            let item = document.createElement('div');
            let itemTxt = document.createTextNode(txt.value);
            item.appendChild(itemTxt);
            item.setAttribute('draggable', true);
            item.setAttribute("location", 0);
            item.setAttribute("selected", false);
            item.classList.add('item');
            Boxes[0].appendChild(item);
            txt.value = '';

            // create data value
            let val = {
                "inner": item.textContent,
                "location": 0,
                "draggable": true,
                "selected": false
            }

            data.push(val);
            localStorage.setItem("data", JSON.stringify(data));
            console.log(data)
        }
        dragItem();
    }
})

// let items = document.querySelectorAll('.item');
// items.forEach(it => {
//     it.addEventListener('keydown', (e) => {
//         if (e.key == "delete") {
//             if (it.selected == true) {
//                 console.log(it.inner);
//             }
//         }
//     })
// })



function dragItem() {

    let items = document.querySelectorAll('.item');
    items.forEach(element => {

        element.addEventListener("dragstart", () => {
            drag = element;
            element.style.opacity = "0.7";
            element.style.color = "white";
            element.selected = true;
        })

        element.addEventListener("dragend", () => {
            drag = null;
            element.style.opacity = "1";
            element.selected = false;
        })

        Boxes.forEach(box => {

            box.addEventListener('dragover', (e) => {
                e.preventDefault()
                box.style.backgroundColor = "green";
                box.style.color = '#fff';
            })

            box.addEventListener('dragleave', () => {
                box.style.backgroundColor = "white";
                box.style.color = "green";
            })

            box.addEventListener('drop', () => {
                box.appendChild(drag);
                box.style.backgroundColor = "white";
                box.style.color = "green";
                drag.setAttribute("location", box.getAttribute("key"));
                data.map(koko => {
                    if (koko.inner == drag.textContent) {
                        koko.location = box.getAttribute("key");
                    }
                })
                localStorage.setItem("data", JSON.stringify(data))
            })
        })
    })
}

clear.addEventListener('click', () => {
    let items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.parentElement.removeChild(item);
    })
    data = [];
    localStorage.setItem('data', data);
})
