/* Comments for this part
  the line +parseFloat(resultW).toFixed(6) displays a number with 6 decimals at most
  (the + converts the string output of toFixed back to a float)
*/

import PropTypes from 'prop-types';

import './styles.css';

function Results({ resultNW, resultW }) {
  return (
    <>
      <p>La moyenne non pondérée est : <span id="resultNonWeighted">{
        resultNW === 'NC' ? 'NC' : +parseFloat(resultNW).toFixed(6)
      }</span>
      </p>
      <p>La moyenne pondérée est : <span id="resultWeighted">{
        resultW === 'NC' ? 'NC' : +parseFloat(resultW).toFixed(6)
      }</span>
      </p>
    </>
  );
}

Results.propTypes = {
  resultNW: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['NC']),
  ]).isRequired,
  resultW: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['NC']),
  ]).isRequired,
};

export default Results;
