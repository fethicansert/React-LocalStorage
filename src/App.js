import './App.css';
import { useEffect, useState  } from 'react';
import InputText from './components/InputText';
import {v4 as uuidv4} from 'uuid'

//*****methods checking if obj key in the object****

// console.log(localStorage.hasOwnProperty('books')); //TRUE
// console.log('books' in localStorage);              //TRUE
// console.log(localStorage.books !== undefined);     //TRUE
// console.log(localStorage?.books);                  // Bu arkadas eger yoksa undefined varsa istenileni veriyor


function App() {
  const [input, setInput] = useState({bookTitle: '', author: ''});
  const [books, setBook] = useState(()=>{
    const localData = localStorage.getItem('books'); // eger boyle bir obje yoksa null doner
    return localData ? JSON.parse(localData) : []; // eger null degilse truthy bir deger doner localData JSON.parse yaparuz falsy bi deger emty array
  });

  useEffect(()=>{
    localStorage.setItem('books',JSON.stringify(books));
  },[books])

  const bookElements = books.length > 0 ? books.map((bookEl,index) => {
    return (
      <li onClick={ e => deleteBook(bookEl.id) } key={bookEl.id}>
        <span className='book-title'>{ bookEl.bookTitle }</span>
        <span className='book-author'>{ bookEl.author }</span>
        <span className='book-number'>{ index + 1 }</span>
      </li>);
  }): null;

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

  function clearInput(){
    setInput(prevState => ({bookTitle: '', author: ''}));
  }


  function createBook(){
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

      clearInput();

    }else{
      alert("Fill all boxes please");
    }
  }

  function deleteBook(key){
    if(window.confirm("Are you sure to delete this item ?")){
      const deleteBookID = key;
      setBook(prevState => {
          const newState = prevState.filter(book => book.id !== deleteBookID);
          return newState;
      });
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
