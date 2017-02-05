export const addTodo = (list,item) => [...list,item]

export const generateId = () => Math.floor(Math.random()*1000000)

export const  findById = (id,list) => list.find(item => item.id === id)

export const toggleTodo = (todo) => ({...todo,isComplete: !todo.isComplete})

export const updateTodo = (list, updated) => {
        const undatedIndex = list.findIndex(item => item.id === updated.id)
        return [
            ...list.slice(0,undatedIndex),
            updated,
            ...list.slice(undatedIndex+1)
        ]
}

export const removeTodo = (list,id)  => {

    const removeIndex = list.findIndex(item  => item.id === id  )
    return [
        ...list.slice(0,removeIndex),
        ...list.slice(removeIndex+1)

    ]
}

export const filterTodos = (list,route) => {
    console.log("route..."+ route);
    switch(route){

        case '/active':
            console.log("Inside Active");
            return list.filter(item => !item.isComplete)
        case '/complete':
            return list.filter(item => item.isComplete)
        default:
            return list

    }
}
