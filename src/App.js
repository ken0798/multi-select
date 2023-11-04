import { useState } from 'react';
import { FiX } from "react-icons/fi";
import './App.css';

const listData = [
  {
    id: 1,
    name: "Hobbit"
  },
  {
    id: 2,
    name: "Harry Potter"
  },
  {
    id: 3,
    name: "Avengers"
  },
  {
    id: 4,
    name: "Spiderman"
  },
  {
    id: 5,
    name: "Your Name"
  },
  {
    id: 6,
    name: "Five Feet Apart"
  },
  {
    id: 7,
    name: "Pirana"
  },
  {
    id: 8,
    name: "Doreamon"
  },
  {
    id: 9,
    name: "Mickey Mouse"
  },
];
function App() {
  const [selected, setSelected] = useState([])
  const [viewDrop,setViewDrop] = useState(false)
  const [search,setSearch] = useState('')
  function addItems(e) {
    if (!selected.some((each) => each.id === e.id)) {
      setSelected([...selected,e]) 
    } else {
      setSelected(selected.filter(each=>each.id !== e.id))
    } 
    setSearch('')
    setViewDrop(false)
  }
  function removeItems(e) {
    setSelected((pre) => pre.filter((each)=>each.id !== e.id))
  }
  function handleChange(e) {
    setSearch(e.target.value)
  }
  function clearData(e) {
    e.stopPropagation()
    setSelected([])
    setViewDrop(false)
  }
  function viewAlert() {
    const seletedItems = `Selected Items: \n ${selected.map((e)=>e.name).join(", ")}`
    alert(seletedItems)
  }
  const filterdData = listData.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className='main_container'>
      <h1>Multi Select</h1>
      <div onClick={()=>setViewDrop(true)} className='select__container'>
        {selected.map((item) => (
          <div className='chips' key={item.id}>
            <p>{item.name}</p>
            <FiX onClick={removeItems.bind(null,item)} />
          </div>
        ))}
        <input onChange={handleChange} value={search} />
        <FiX onClick={clearData} />
      </div>
      {viewDrop ?<ul className='drop__container'>
        {filterdData.length? filterdData.map((e) => (
          <li className={selected.some((each) => each.id === e.id)?'active':''} onClick={addItems.bind(null,e)} key={e.id}>{ e.name}</li>
        )):<li>No data</li>}
      </ul> : null}
      <button onClick={viewAlert} disabled={!selected.length}>Submit</button>
    </div>
    );
}

export default App;
