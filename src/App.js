import './App.css';
import Split from 'react-split'
import { useEffect, useState  } from 'react';
import InputText from './components/InputText';
import {v4 as uuidv4} from 'uuid'





function App() {
  const [input, setInput] = useState({bookTitle: '', author: ''});
  const [books, setBook] = useState(()=>{
    const localData = localStorage.getItem('books');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(()=>{
    localStorage.setItem('books',JSON.stringify(books));
  },[books])

  const bookElements = books.length > 0 ? books.map((bookEl,index) => {
    return (
      <li onClick={ e => deleteBook(e, bookEl.id) } key={bookEl.id}>
        <span className='book-title'>{ bookEl.bookTitle }</span>
        <span className='book-author'>{ bookEl.author }</span>
        <span className='book-number'>{ index + 1 }</span>
      </li>);
  }): null;

  function deleteBook(e,key){
    const deleteBookID = key;
    
    
 
    // setBook(prevState => {
    //     const newState = prevState.filter(e => e.id)
    // });
    
  }

  function handleInput(e){
    const {name, value} = e.target;
    setInput(prevState =>({...prevState,[name]:value}));
  }

  function checkInput(){
    if(input.bookTitle !== '' && input.author !== ''){
      return true
    }else{
      return false
    }
  }

  function createBook(){
    console.log(localStorage);
    if(checkInput()){

      const book = {
        id:uuidv4(),
        bookTitle: input.bookTitle,
        author:input.author
      }

      setBook(prevState => {
        console.log(prevState);
        return [...prevState,book];
      });

    }else{
      alert("Fill all boxes please");
    }
  }

 

  return (
    <div className="App">
      <header>
        <h1>Ninja Reading List</h1>
        <p>Currently you have <span>{books.length}</span> books to het thourgh</p>
      </header>

      <main>
        <InputText name='bookTitle' value={input.bookTitle}  onChange={ handleInput }  placeholder='book title' />
        <InputText name='author' value={input.author}  onChange={ handleInput }  placeholder='author' />
        <button onClick={ createBook }>Add Book</button>
        {books.length === 0 ? <p>No books to read.</p>: <ul className='book-list'>{ bookElements }</ul>}
      </main>
    </div>
  );


}



export default App;

///#482B46 outside
//#71436F header
// #40233D input
// #4E2F4E input container