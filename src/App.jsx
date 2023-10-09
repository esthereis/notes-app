// import { useState } from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Note from './components/Note';
import Thumbnail from './components/Thumbnail';

function App() {
  const initialValue = JSON.parse(window.localStorage.getItem('notes')) ?? [];

  const [notes, setNotes] = useState(() => initialValue ?? []);

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className='viewport'>
      <ul className='notesContainer'>
        {notes.map((item, i) => (
          <Thumbnail
            key={`${item}${i}`}
            title={item.title}
            content={item.content}
          />
        ))}
      </ul>

      <div className='contentContainer'>
        <Note
          onEnter={note => {
            setNotes([...notes, note]);
          }}
        ></Note>
      </div>
    </div>
  );
}

export default App;
