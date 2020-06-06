import { Todo } from '../classes';
import {todoList} from '../index'

//referencias al html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltro = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


const numPendientes = 0;
 
export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ todo.completado ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ todo.completado ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
      <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    
    return div.firstElementChild;
}

txtInput.addEventListener('keyup', (e) => {
    if(e.keyCode === 13 && txtInput.value.length > 0){
        console.log(txtInput.value);

       const nuevoTodo = new Todo(txtInput.value);
       todoList.nuevoTodo(nuevoTodo);

       console.log(todoList);

       crearTodoHtml(nuevoTodo);
       txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (e) => {
    
    const nombreElemento = e.target.localName;
    const todoElemento = e.target.parentElement.parentElement;
    const todoId = todoElemento.dataset.id;

    if(nombreElemento.includes('input')) {
        todoList.marcarCompletados(todoId);
        todoElemento.classList.toggle('completed');
        
    }else if(nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
       
    }
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length-1; i >= 0;i--){
        const elemento = divTodoList.children[i];
        
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
            numPendientes++;
            htmlPendientes.innerText = numPendientes;
        }
    }

});

ulFiltro.addEventListener('click', (e) => {
    const filtro = e.target.text;
    if( !filtro ){return}

    anchorFiltros.forEach( elem => elem.classList.remove('selected'));

    e.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        
        switch(filtro){
            case 'Pendientes':
            if(completado) {
                elemento.classList.add('hidden');
            }
            break;
        }

        switch(filtro){
            case 'Completados':
            if(!completado) {
                elemento.classList.add('hidden');
            }
            break;
        }
    }
});

