// import { useState } from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Note from './components/Note';
import Thumbnail from './components/Thumbnail';
import deleteIcon from './icons/bin.png';

function App() {
  const initialValue = JSON.parse(window.localStorage.getItem('notes')) ?? [];

  const [notes, setNotes] = useState(() => initialValue ?? []);

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function handleChangeandDisplay(i) {
    const clickedNotes = notes.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          clicked: true
        };
      }
      return {
        ...item,
        clicked: false
      };
    });
    setNotes(clickedNotes);
  }

  function deleteItem() {
    const cleanedNotes = notes.filter(item => item.clicked !== true);
    setNotes(cleanedNotes);
  }

  function displayClicked(i) {
    //when item.clicked -> Note input value = item.clicked title and Note text area value = item.clicked content
  }

  return (
    <div className='viewport'>
      <ul className='notesContainer'>
        <img src={deleteIcon} className='icons' onClick={() => deleteItem()} />
        {notes.map((item, i) => (
          <Thumbnail
            key={`${item}${i}`}
            title={item.title}
            content={item.content}
            onClick={() => handleChangeandDisplay(i)}
            clicked={item.clicked}
          />
        ))}
      </ul>

      <Note
        onEnter={note => {
          setNotes([...notes, note]);
        }}
      ></Note>
    </div>
  );
}

export default App;
