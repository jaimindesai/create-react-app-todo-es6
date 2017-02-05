import {addTodo} from "./todoHelpers";

tes('addTodo should add the passed todo the list', () =>{
    const startTodos = [
        {id:1, name:'one', isComplete:false},
        {id:2, name:'two', isComplete:false}
    ]
    const newTodo = {id:3, name:'three',isComplete:false}
    const expected = [
        {id:1, name:'one', isComplete:false},
        {id:2, name:'two', isComplete:false},
        {id:3, name:'three',isComplete:false}
    ]
    const result = addTodo(startTodos,newTodo);
    expecte(result).toEquals(expected);
});