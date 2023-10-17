/* General comments for this component :
- First line (just below the titles of the table) doesn't show '+' in the first column
- Default value for each new weight is 1
*/

import PropTypes from 'prop-types';
import './styles.css';
import { useEffect, useState } from 'react';

function Addition({ setResultNonWeighted, setResultWeighted }) {
  // State for numbers and their weight
  const [contentForAverage, setContentForAverage] = useState([]);
  // State for messages
  const [message, setMessage] = useState(null);

  /**
   * Deletes one line (when the minus sign is clicked) from the state 'contentForAverage' and cleans the message (if exists)
   * @param {number} lineId
   */
  const handleSuppression = (lineId) => {
    setMessage('');
    const newContent = contentForAverage.filter((x) => x.numberId !== lineId);
    setContentForAverage(newContent);
  };

  /**
   * Add one line (when the plus sign is clicked) in the state 'contentForAverage', and sets/cleans message if necessary
   */
  const handleAddLine = () => {
    const newNumber = parseFloat(document.getElementById('newNumber').value);
    let newWeight = parseFloat(document.getElementById('newWeight').value);
    // If the new weight is not set up, use "1" by default
    if (isNaN(newWeight)) {
      newWeight = 1;
    }
    // Cleans the message, calculates the new id and update the state 'contentForAverage'
    if (!isNaN(newNumber) && newNumber !== '' && newWeight !== '') {
      setMessage('');
      let newId = 0;
      if (contentForAverage.length > 0) {
        newId = contentForAverage[contentForAverage.length - 1].numberId + 1;
      }
      setContentForAverage([
        ...contentForAverage,
        {
          numberId: newId,
          numberValue: newNumber,
          numberWeight: newWeight,
        },
      ]);
      // cleans the input values after a successful operation
      document.getElementById('newNumber').value = '';
      document.getElementById('newWeight').value = '';
    }
    else {
      // error message
      setMessage('Nombre incorrect');
    }
  };

  /**
   * For each modification of the table (datas stored in 'contentForAverage'), calculates all averages
   */
  useEffect(
    () => {
      if (contentForAverage.length !== 0) {
        // sum non weighted
        let sumNW = 0;
        // sum weighted
        let sumW = 0;
        // sum of the weights, what else ?
        let sumOfTheWeights = 0;
        contentForAverage.forEach((line) => {
          sumNW += line.numberValue;
          sumW += (line.numberValue * line.numberWeight);
          sumOfTheWeights += line.numberWeight;
        });
        setResultNonWeighted(sumNW / contentForAverage.length);
        if (sumOfTheWeights !== 0) {
          setResultWeighted(sumW / sumOfTheWeights);
        }
        else {
          setResultWeighted('Somme des poids nulle');
        }
      }
      else {
        setResultNonWeighted('NC');
        setResultWeighted('NC');
      }
    },
    // calculates new averages for each update of 'contentForAverage'
    [contentForAverage],
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th></th>
            <th className="numberTitle">Nombres</th>
            <th className="weightTitle">Poids</th>
            <th className="plusMinus">+/-</th>
          </tr>
        </thead>
        <tbody id="tbody">
          {
            contentForAverage.map((lineValues, i) => (
              <tr key={lineValues.numberId}>
                <td className="plusMinus">{(i !== 0) && '+'}</td>
                <td className="number">{lineValues.numberValue}</td>
                <td className="weight">{lineValues.numberWeight}</td>
                <td className="plusMinus">
                  <button
                    type="button"
                    className="minus"
                    onClick={() => {
                      handleSuppression(lineValues.numberId);
                    }}
                  >-
                  </button>
                </td>
              </tr>
            ))
          }
          <tr id="inputLine">
            <td className="plusMinus">+</td>
            <td className="cellInputNumber"><input type="number" name="newNumber" id="newNumber" /></td>
            <td className="cellInputWeight"><input type="number" name="newWeight" id="newWeight" placeholder="1" /></td>
            <td className="plusMinus">
              <button
                type="button"
                className="plus"
                onClick={handleAddLine}
              >+
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p id="everyMessages">
        {message}
      </p>
    </>
  );
}

Addition.propTypes = {
  setResultNonWeighted: PropTypes.func.isRequired,
  setResultWeighted: PropTypes.func.isRequired,
};

export default Addition;
