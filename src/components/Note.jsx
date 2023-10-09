import '../App.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

function Note(props) {
  const [note, setNote] = useState({ title: '', content: '' });
  return (
    <>
      <input
        className='titleElement'
        type='text'
        placeholder='Add a title'
        onChange={e =>
          setNote({ title: e.target.value, content: note.content })
        }
        value={note.title}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            props.onEnter(note);
          }
        }}
      />
      <textarea
        name='contentField'
        id='contentElement'
        cols='30'
        rows='10'
        onChange={e => setNote({ content: e.target.value, title: note.title })}
        value={note.content}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            props.onEnter(note);
          }
        }}
      ></textarea>
    </>
  );
}

Note.propTypes = {
  onEnter: PropTypes.func.isRequired
};

export default Note;
