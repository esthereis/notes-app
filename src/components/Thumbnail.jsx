import '../App.css';
import PropTypes from 'prop-types';

function Thumbnail(props) {
  return (
    <li
      className={`thumbnailElement ${props.clicked ? 'clicked' : ''}`}
      onClick={() => {
        props.onClick();
      }}
    >
      <span>{props.title}</span>

      <p>
        <time dateTime='08:30'></time>
      </p>

      <span>{props.content}</span>
    </li>
  );
}

Thumbnail.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  clicked: PropTypes.bool
};

export default Thumbnail;
