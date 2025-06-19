import React, { useState } from 'react'
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import img1 from './assets/img1.png'
import img2 from './assets/img1.jpeg'
import img3 from './assets/img2.png'
import img4 from './assets/img3.png'
import img5 from './assets/img4.png'
import Button from '@mui/material/Button';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import './App.css'

const App = () => {

  // users 
  let [users,setUsers] = useState([
    {
      img:img1,
      name:"Ada Evans",
      email:"jabulany@gmail.com",
      contact:"+1 (232) 479-29002",
      age:"32",
      country:"St.Pierre",
      status:true,
      id:"1"
    },
    {
      img:img2,
      name:"Jorgina Hen",
      email:"jarginy@gmail.com",
      contact:"+2 (242) 459-19002",
      age:"32",
      country:"St.Francisco",
      status:false,
      id:"2"
    },
    {
      img:img3,
      name:"Antonella Puttelas",
      email:"anotony99@gmail.com",
      contact:"+1 (412) 129-59434",
      age:"32",
      country:"St.Francisco",
      status:true,
      id:"3"
    },
    {
      img:img4,
      name:"Jonathan Taah",
      email:"jonic2211@yahoo.ru",
      contact:"+1 (433) 210-53221",
      age:"32",
      country:"St.Francisco",
      status:false,
      id:"4"
    },
    {
      img:img5,
      name:"Millan Shcrinnar",
      email:"millanomoda@gamil.com",
      contact:"+1 (121) 240-24324",
      age:"32",
      country:"St.Francisco",
      status:true,
      id:"5"
    },
  ])

  // delete
    function deleteUser(id) {
      users = users.filter((e)=>e.id != id)
      setUsers(users)
    }

    // add
    let [activeAdd,setActiveAdd] = useState(false)
    let [inpAddImg,setInpAddImg] = useState('')
    let [inpAddName,setInpAddName] = useState('')
    let [inpAddEmail,setInpAddEmail] = useState('')
    let [inpAddContact,setInpAddContact] = useState('')
    let [inpAddAge,setInpAddAge] = useState('')
    let [inpAddCountry,setInpAddCountry] = useState('')
    let [inpAddStatus,setInpAddStatus] = useState('')

    function addNewUser() {
      let newuser = {
        img: inpAddImg,
        name: inpAddName,
        email: inpAddEmail,
        contact: inpAddContact,
        age: inpAddAge,
        country: inpAddCountry,
        status: inpAddStatus=='true'?"Verified":"Rejected",
        id: users.length+1
      }
      setUsers([...users,newuser])
      setActiveAdd(false)
    }

    // edit
    let [activeEdit,setActiveEdit] = useState(false)
    let [inpEditImg,setInpEditImg] = useState('')
    let [inpEditName,setInpEditName] = useState('')
    let [inpEditEmail,setInpEditEmail] = useState('')
    let [inpEditContact,setInpEditContact] = useState('')
    let [inpEditAge,setInpEditAge] = useState('')
    let [inpEditCountry,setInpEditCountry] = useState('')
    let [inpEditStatus,setInpEditStatus] = useState('')
    let [idx,setIdx] = useState(null)

    function openEditDialog(e) {
      setActiveEdit(!activeEdit)
      setInpEditImg(e.img)
      setInpEditName(e.name)
      setInpEditEmail(e.email)
      setInpEditContact(e.contact)
      setInpEditAge(e.age)
      setInpEditCountry(e.country)
      setInpEditStatus(e.status?"Verified":"Rejected")
      setIdx(e.id)
    }

    function updatedUser() {
      users = users.map((e)=>{
      if(e.id == idx){
          return {
            ...e,
            img:inpEditImg,
            name: inpEditName,
            email: inpEditEmail,
            contact: inpEditContact,
            age: inpEditAge,
            country: inpEditCountry,
            status: inpEditStatus=='Verified'?true:false
          }
        }
        return e
      })
      setActiveEdit(false)
      setUsers(users)
    }

    // checkbox
    function changeStatus(id) {
      users = users.map((e)=> {
      if(e.id == id){
          return {
            ...e,
            status: !e.status
          }
        }
        return e
      })
      setUsers(users)
    }

    // search 
    let [search,setSearch] = useState('')

    // info
    let [activeInfo,setActiveInfo] = useState(false)
    let [getE,setE] = useState(null)

    function getId(element) {
      setE(element)
      setActiveInfo(!activeInfo)
    }

    // selectStaus
    let [searchStatus,setSearchStatus] = useState('')

    function searchByStatus() {
  if (searchStatus !== "all") {
    return users.filter((e) => e.status === (searchStatus === "true"))
  }
  return users
}

  return (
    <>
    <section className='flex items-center justify-between mb-5'>
      <input value={search} onChange={(e)=>setSearch(e.target.value)} className='border p-2 css w-[20%]' type="text" placeholder='Search...' />
      <article className='flex gap-5 items-center'>
      <select className='border p-1' value={searchStatus} onChange={(e)=>setSearchStatus(e.target.value)}>
        <option value="all">All</option>
        <option value="true">Varified</option>
        <option value="false">Rejected</option>
      </select>
      <Button variant='contained' onClick={()=>setActiveAdd(!activeAdd)} className='p-1 border'>+ Add Customer</Button>
      </article>
    </section>
    

    <table className='w-full border-collapse'>
      <thead>
        <tr className='border-gray-400 border-1'>
          <th><input type="checkbox"/></th>
          <th>#</th>
          <th>User Name</th>
          <th>Contact</th>
          <th>Age</th>
          <th>Country</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase())).map((e)=>{
          return(
            <tr key={e.id} className='border-gray-400 border-1'>
            <td><input type="checkbox" checked={e.status} onChange={()=>changeStatus(e.id)} /></td>
            <td>{e.id}</td>
            <td>
              <article className='flex items-center gap-3'>
             <img src={e.img} alt="" className='w-10 h-10 rounded-full' />
              <div className='flex flex-col items-start'>
              <p>{e.name}</p>
              {e.email}
              </div>
              </article>
              </td>
            <td>{e.contact}</td>
            <td>{e.age}</td>
            <td>{e.country}</td>
            <td className={e.status ? 'text-green-700 ' : 'text-red-700'}>{e.status ? "Verified" : "Rejected"}</td>           
             <td>
              <div className='flex justify-between'>
              <button onClick={()=>getId(e)}><InfoOutlineIcon/></button>
              <button onClick={()=>openEditDialog(e)}><ModeEditIcon/></button>
              <button onClick={()=>deleteUser(e.id)}><DeleteIcon/></button>
              </div>
            </td>
          </tr>
          )
        })}

      </tbody>
        </table>
        {/* // add  */}
        {activeAdd && (
          <main className='my-5 flex flex-col items-center gap-5 w-[50%] m-auto p-7 rounded-2xl bg-gray-100'>
            <h2 className='text-2xl font-semibold text-blue-500'>Add New User</h2>
          <article className='grid grid-cols-3 gap-5 w-full'>
            <input type="text" className='border p-1' placeholder='img...' value={inpAddImg} onChange={(e)=>setInpAddImg(e.target.value)} />
            <input type="text" className='border p-1' placeholder='name...' value={inpAddName} onChange={(e)=>setInpAddName(e.target.value)} />
            <input type="text" className='border p-1' placeholder='email...' value={inpAddEmail} onChange={(e)=>setInpAddEmail(e.target.value)} />
            <input type="text" className='border p-1' placeholder='contact...' value={inpAddContact} onChange={(e)=>setInpAddContact(e.target.value)} />
            <input type="text" className='border p-1' placeholder='age...' value={inpAddAge} onChange={(e)=>setInpAddAge(e.target.value)} />
            <input type="text" className='border p-1' placeholder='country...' value={inpAddCountry} onChange={(e)=>setInpAddCountry(e.target.value)} />
            <select className='border p-1' value={inpAddStatus} onChange={(e)=>setInpAddStatus(e.target.status)}>
              <option value="true">Verified</option>
              <option value="false">Rejected</option>
            </select>
          </article>
          <article className='self-end flex gap-5'>
            <Button variant='contained' color='error' onClick={()=>setActiveAdd(false)}>Close</Button>
            <Button variant='contained' onClick={()=>addNewUser()} className='py-1 px-5 self-end'>Save</Button>
          </article>
          </main>
        )}
    
        {/* // edit  */}
        {activeEdit && (
          <main className='my-5 flex flex-col items-center gap-5 w-[50%] m-auto p-7 rounded-2xl bg-gray-100'>
            <h2 className='text-2xl font-semibold text-blue-500'>Edit New User</h2>
          <article className='grid grid-cols-3 gap-5 w-full'>
            <input type="text" className='border p-1' placeholder='img...' value={inpEditImg} onChange={(e)=>setInpEditImg(e.target.value)} />
            <input type="text" className='border p-1' placeholder='name...' value={inpEditName} onChange={(e)=>setInpEditName(e.target.value)} />
            <input type="text" className='border p-1' placeholder='email...' value={inpEditEmail} onChange={(e)=>setInpEditEmail(e.target.value)} />
            <input type="text" className='border p-1' placeholder='contact...' value={inpEditContact} onChange={(e)=>setInpEditContact(e.target.value)} />
            <input type="text" className='border p-1' placeholder='age...' value={inpEditAge} onChange={(e)=>setInpEditAge(e.target.value)} />
            <input type="text" className='border p-1' placeholder='country...' value={inpEditCountry} onChange={(e)=>setInpEditCountry(e.target.value)} />
            <select className='border p-1' value={inpEditStatus} onChange={(e)=>setInpEditStatus(e.target.status)}>
              <option value="true">Verified</option>
              <option value="false">Rejected</option>
            </select>
          </article>
          <article className='self-end flex gap-5'>
            <Button variant='contained' color='error' onClick={()=>setActiveEdit(false)}>Close</Button>
            <Button variant='contained' onClick={()=>updatedUser()} className='py-1 px-5 self-end'>Save</Button>
          </article>
          </main>
        )}

        {/* // info  */}
        {activeInfo && (
          <main className='my-5 flex flex-col items-start gap-5 w-[40%] m-auto p-5 rounded-2xl bg-gray-100'>
            <h2 className='text-2xl text-blue-500 font-semibold'>User Information</h2>
            <article className='flex items-center gap-3'>
              <img src={getE.img} className='w-15 h-15 rounded-full' alt="" />
              <div className='flex flex-col'>
                <h3 className='text-lg font-semibold'>{getE.name}</h3>
                <p>{getE.email}</p>
              </div>
            </article>
            <section className='flex flex-col'>
              <h1 className='text-lg font-semibold flex  gap-3 items-center'>Phone: <p className='text-[16px] font-normal'>{getE.contact}</p></h1>
              <h1 className='text-lg font-semibold flex  gap-3 items-center'>age: <p className='text-[16px] font-normal'>{getE.age}</p></h1>
              <h1 className='text-lg font-semibold flex  gap-3 items-center'>country: <p className='text-[16px] font-normal'>{getE.country}</p></h1>
              <h1 className='text-lg font-semibold flex  gap-3 items-center'>status: <p className={getE.status ? 'text-green-700' : 'text-red-700'}>{getE.status?"Verified":"Rejected"}</p></h1>
            </section>
          <article className='self-end flex gap-5'>
            <Button variant='contained' color='error' onClick={()=>setActiveInfo(false)}>Close</Button>
          </article>
          </main>
        )}
    </>
  )
}

export default App