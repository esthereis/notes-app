// import { useState } from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Note from './components/Note';
import Thumbnail from './components/Thumbnail';
import deleteIcon from './icons/bin.png';

//TODO: create am id for each note you create. Implement library;
//Update the list to only add an element after verifying this one already exists

function App() {
  const initialValue = JSON.parse(window.localStorage.getItem('notes')) ?? [];

  const [notes, setNotes] = useState(() => initialValue ?? []);
  const [selectedNote, setSelectedNote] = useState({ title: '', content: '' });

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function deleteItem() {
    // const cleanedNotes = notes.filter(item => item.clicked !== true);
    // setNotes(cleanedNotes);
    //o elemento que vc deseja apagar já está dentro do selectedNote
    const cleanedNotes = notes.filter(item => item != selectedNote);
    setNotes(cleanedNotes);
  }

  return (
    <div className='viewport'>
      <ul className='notesContainer'>
        <img src={deleteIcon} className='icons' onClick={() => deleteItem()} />
        {notes.map((item, i) => (
          <Thumbnail
            key={`${item}${i}`}
            title={item.title}
            content={item?.content}
            onClick={() => {
              setSelectedNote(item);
            }}
            clicked={selectedNote === item}
          />
        ))}
      </ul>

      <Note
        onEnter={note => {
          setNotes([...notes, note]);
        }}
        inputTitle={selectedNote?.title}
        textAreaContent={selectedNote?.content}
      ></Note>
    </div>
  );
}

export default App;
