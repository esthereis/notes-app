import '../App.css';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function Note(props) {
  const [note, setNote] = useState({ title: '', content: '' });
  const containerRef = useRef(null);

  useEffect(() => {
    function clickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        note.title !== '' &&
        note.content !== ''
      ) {
        props.onEnter(note);
        setNote({ title: '', content: '' });
      }
    }

    window.addEventListener('click', clickOutside);
    return () => {
      window.removeEventListener('click', clickOutside);
    };
  }, [note, props]);

  return (
    <div ref={containerRef} className='contentContainer'>
      <input
        className='titleElement'
        type='text'
        placeholder='Add a title'
        onChange={e =>
          setNote({ title: e.target.value, content: note.content })
        }
        value={note.title}
      />
      <textarea
        name='contentField'
        id='contentElement'
        cols='30'
        rows='10'
        onChange={e => setNote({ content: e.target.value, title: note.title })}
        value={note.content}
      ></textarea>
    </div>
  );
}

Note.propTypes = {
  onEnter: PropTypes.func.isRequired
};

export default Note;
