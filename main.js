const name = document.getElementById('name');
const add = document.getElementById('add');
const root = document.getElementById('root');

let nameList = localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : [];

const render = () => {
    root.innerHTML = '';
    nameList.forEach(item => {
        root.innerHTML += `<h1>${item.name}
        <button onclick = 'editName(${item.id})' id = 'edit'>Edit</button>
        <button onclick = 'deleteName(${item.id})' id = 'delete'>Delete</button>
        </h1>`
    })
}

render()


add.onclick = () => {
    if(name.value.trim()) {
        nameList = [
            {
                id: nameList.length == 0 ? 1 : nameList[0].id + 1,
                name: name.value.trim()
            },
            ...nameList
        ]
        localStorage.setItem('name', JSON.stringify(nameList))
        render()
    }
}


const deleteName = (id) => {
    nameList = nameList.filter(item => id !== item.id);
    localStorage.setItem('name', JSON.stringify(nameList))
    render();
}

const editName = (id) => {
    const newName = prompt('Enter the new name:');
    if (newName) {
        nameList = nameList.map(item => {
            if (item.id === id) {
                return {
                    id: item.id,
                    name: newName.trim()
                };
            }
            return item;
        });
        localStorage.setItem('name', JSON.stringify(nameList));
        render();
    }
};