const deleteButton = document.querySelectorAll('.fa-trash')
const item = document.querySelectorAll('.item span')
const itemCompleted = document.querySelectorAll('.item span.completed')

Array.from(deleteButton).forEach((element)=>{
  element.addEventListener('click', deleteItem)
})

Array.from(item).forEach((element)=>{
  element.addEventListener('click', markComplete)
})

// Array.from(itemCompleted).forEach((element)=>{
//   element.addEventListener('click', markUnComplete)
// })

Array.from(itemCompleted).forEach((element)=>{
  element.addEventListener('click', undo)
})

async function deleteItem(){
  const itemText = this.parentNode.childNodes[1].innerText
  try{
    const response = await fetch('deleteItem', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': itemText
      })
    })
    const data= await response.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}

async function markComplete(){
  const itemText = this.parentNode.childNodes[1].innerText
  try{
    const response = await fetch('markComplete', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': itemText
      })
    })
        const data = await response.json()
    console.log(data)
    location.reload()

  } catch(err){
    console.log(err)
  }
}

// async function markUnComplete(){
//   const itemText = this.parenNode.childNodes[1].innerText
//   try{
//     const response = await fetch('markUnComplete', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'itemFromJS': itemText
//       })
//     })
//     const data = await response.json()
//     console.log(data)
//     location.reload()
//   }catch(err){
//     console.log(err)
//   }
// }

async function undo(){
  const todoText = this.parentNode.childNodes[1].innerText
  try{
    const response = await fetch('undo', {
      method: 'put',
      headers:{'Content-type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': itemText
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
    }catch(err){
      console.log(err)
    }
}