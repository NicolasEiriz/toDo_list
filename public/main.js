const deleteText = document.querySelectorAll('.fa-trash')
const itemDone = document.querySelectorAll('.fa-check-circle')

Array.from(deleteText).forEach((element)=>{
  element.addEventListener('click', deleteItem)
})

Array.from(itemDone).forEach((element)=>{
  element.addEventListener('click', itemFinish)
})

async function deleteItem(){
  const iName = this.parentNode.childNodes[1].innerText
  const iTime = this.parentNode.childNodes[3].innerText
  try{
    const response = await fetch('deleteItem', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemNameS': iName,
        'itemTimeS': iTime
      })
    })
    const data= await response.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}

async function itemFinish(){
  const iName = this.parentNode.childNodes[1].innerText
  const iTime = this.parentNode.childNodes[3].innerText
  const iCheck = Number(this.parentNode.childNodes[5].innerText)
  try{
    const response = await fetch('checkItem', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemNameS': iName,
        'itemTimeS': iTime,
        'itemCheckS': iCheck
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch(err){
    console.log(err)
  }
}

