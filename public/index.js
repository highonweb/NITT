const openadd = (btn)=>{
    document.querySelector(".update").style.height='100vh'
    document.querySelector(".main").style.display='none'
    btn.style.transform='rotate(45deg)'
    btn.setAttribute("onclick",'closeadd(this)')
}
const closeadd = (btn)=>{
    document.querySelector(".update").style.height='0vh'
    document.querySelector(".main").style.display='block'
    btn.style.transform='rotate(90deg)'
    btn.setAttribute("onclick",'openadd(this)')
}
const autoc = async ()=>{
    let sterm = document.querySelector(".sbar").value
    let ac  = document.querySelector(".ac")
    let results = await fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({sterm:sterm})
      })
      let result = await results.json()
      ac.innerHTML=''
      result.map(element => {
          
          div = document.createElement('div')
          if(isNaN(sterm)){div.innerHTML=element.name}
          else{div.innerHTML=element.rollno}
          div.id = "suggestion"
          div.style.cursor = 'pointer'
          div.setAttribute("onclick","search(this)")
          ac.appendChild(div)
      });
      
  
}
const clicksear = ()=>{
    
    search(document.querySelector(".sbar"))
}
const search =async(val)=>{
    let requ=val.value || val.innerHTML
    let results = await fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({sterm:requ})
      })
      resu = await results.json()

      card(resu[0])
}
const card =(va)=>{
    document.querySelector(".ac").innerHTML=''
    document.querySelector('.card').style.height = '350px'
    console.log(va);
    document.querySelector('.del').setAttribute('onclick',`kill(${va.rollno})`)
    document.querySelector('.upd').setAttribute('onclick',`update(${va.rollno})`)
    document.querySelector('.deets').innerHTML = va.name +'<br>'+va.rollno +'<br>'+va.department +'<br>'
}
const register = async ()=>{
    let name = document.querySelector("#name").value
    let roll  = document.querySelector("#roll").value
    let dept  = document.querySelector("#dept").value
    let results = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({
            name:name,
            rollno:roll,
            department:dept
        })
      })
      closeadd(document.querySelector('.add'))
      let result = await results.json()
      console.log(result);
      
      
  
}
const kill = async (roll)=>{
    document.querySelector('.ac').innerHTML=''
    let results = await fetch('http://localhost:3000/kill', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({
            rollno:roll,            
        })
      })
      let result = await results.json()
      console.log(result);
}
const update = async(roll)=>{

openadd(document.querySelector('.add'))
let result = await fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify({sterm:roll})
      })
    let dat = await result.json()
console.log(dat);
kill(roll)
document.querySelector("#name").value=dat[0].name
document.querySelector("#roll").value=dat[0].rollno
document.querySelector("#dept").value=dat[0].department

}