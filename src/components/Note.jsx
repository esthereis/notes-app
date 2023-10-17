import '../App.css';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function Note(props) {
  const [note, setNote] = useState({
    title: '',
    content: '',
    id: crypto.randomUUID()
  });

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
        console.log('run');
        setNote({ title: '', content: '', id: crypto.randomUUID() });
      }
    }

    window.addEventListener('click', clickOutside);
    return () => {
      window.removeEventListener('click', clickOutside);
    };
  }, [note, props]);

  useEffect(() => {
    setNote(previous => {
      return {
        title: props.inputTitle,
        content: props.textAreaContent,
        id: props.noteId ?? previous.id
      };
    });
  }, [props.inputTitle, props.textAreaContent, props.noteId]);

  return (
    <div ref={containerRef} className='contentContainer'>
      <input
        className='titleElement'
        type='text'
        placeholder='Add a title'
        onChange={e =>
          setNote({ title: e.target.value, content: note.content, id: note.id })
        }
        value={note.title}
      />

      <textarea
        name='contentField'
        id='contentElement'
        cols='30'
        rows='10'
        onChange={e =>
          setNote({ content: e.target.value, title: note.title, id: note.id })
        }
        value={note.content}
      ></textarea>
    </div>
  );
}

Note.propTypes = {
  onEnter: PropTypes.func.isRequired,
  inputTitle: PropTypes.string,
  textAreaContent: PropTypes.string,
  noteId: PropTypes.string
};

export default Note;
