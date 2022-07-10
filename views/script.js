const tabledataContainer = document.querySelector('#table-data-Container');
const infoWrapper = document.getElementById('info-content')
const searchBox = document.querySelector('#search-box')

var url =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";


   fetch(url)
  .then(res => res.json())
  .then(data => localStorage.setItem('listData',JSON.stringify(data))
   )

  function renderData(id,fName,lName,Email,Phone){
   const code = `
   <tr class="data-row">
   <td class="column1">${id}</td>
   <td class="column2">${fName}</td>
   <td class="column3">${lName}</td>
   <td class="column4">${Email}</td>
   <td class="column5">${Phone}</td>
   </tr>`
   tabledataContainer.innerHTML += code
  }

  let tableData = JSON.parse(localStorage.getItem('listData'))
  tableData.map(items => renderData(items.id,items.firstName,items.lastName,items.email,items.phone) )

  function showdetails(fName,lName,des,Address){
    const code = `
                <div><b>User selected:</b>${fName} ${lName}</div>
                <div>
                    <b>Description: </b>
                    <textarea cols="50" rows="5" readonly>
                          ${des}
                    </textarea>
                </div>
                <div><b>Address:</b> ${Address.streetAddress} Ct</div>
                <div><b>City:</b>${Address.city}</div>
                <div><b>State:</b>${Address.state}</div>
                <div><b>Zip:</b> ${Address.zip}</div>
    `
    infoWrapper.style.display="block"
    infoWrapper.innerHTML = code

  }

  /* Show Deatails Logic*/ 


  tabledataContainer.addEventListener("click",(e)=>{
    let numId = parseInt(e.path[1].innerText)
    tableData.filter(items => {
      if(items.id == numId){
        const {firstName,lastName,description,address} = items
        console.log(address)
        showdetails(firstName,lastName,description,address)
      }
    })
  })

  /* Live Search Logic*/ 
  
searchBox.addEventListener("keyup",(e) => { 
   tabledataContainer.innerHTML = "" 
   let searchVal =e.target.value.toUpperCase() 
   console.log(searchVal)
    tableData.filter(items => {
      if(items.firstName.toUpperCase().includes(searchVal)){
        renderData(items.id,items.firstName,items.lastName,items.email,items.phone)
      }
  })
})
