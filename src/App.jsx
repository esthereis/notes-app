// import { useState } from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Note from './components/Note';
import Thumbnail from './components/Thumbnail';
import deleteIcon from './icons/bin.png';
import addIcon from './icons/add.svg';

//TODO: At the moment you click outside the container, create a default thumbnail
//REMOVE multiple states, bring only 1 state
//Use the onChangeMethod to control the content of the cards

function App() {
  const initialValue = JSON.parse(window.localStorage.getItem('notes')) ?? [];

  const [notes, setNotes] = useState(() => initialValue ?? []);
  const [selectedNote, setSelectedNote] = useState({
    title: '',
    content: '',
    id: undefined
  });

  useEffect(() => {
    window.localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function deleteItem() {
    const cleanedNotes = notes.filter(item => item != selectedNote);
    setNotes(cleanedNotes);
  }

  return (
    <div className='viewport'>
      <ul className='notesContainer'>
        <div className='iconsContainer'>
          <img
            src={deleteIcon}
            className='icons'
            onClick={() => deleteItem()}
          />
          <img
            src={addIcon}
            className='icons'
            onClick={() =>
              setNotes([
                {
                  title: 'New Note',
                  content: 'Add Content',
                  id: crypto.randomUUID()
                }
              ])
            }
          />
        </div>
        {notes.map((item, i) => {
          return (
            <Thumbnail
              key={`${item}${i}`}
              title={item.title}
              content={item?.content}
              onClick={() => {
                setSelectedNote(item);
              }}
              clicked={selectedNote === item}
            />
          );
        })}
      </ul>

      <Note
        onEnter={note => {
          //note.id existis inside notes and the content and title are the same, dont add
          if (notes.some(item => item.id === note.id) === false) {
            setNotes([...notes, note]);
          }
        }}
        inputTitle={selectedNote?.title}
        textAreaContent={selectedNote?.content}
        noteId={selectedNote?.id}
        // onClickInput={() => {
        //   return setNotes([
        //     {
        //       title: 'New Note',
        //       content: 'Add Content',
        //       id: crypto.randomUUID()
        //     }
        //   ]);
        // }}

        // onClickTextArea={() => {
        //   console.log(notes);
        //   return setNotes([
        //     {
        //       title: 'New Note',
        //       content: 'Add Content',
        //       id: crypto.randomUUID()
        //     }
        //   ]);
        // }}
      ></Note>
    </div>
  );
}

export default App;
