const CardSingleSelect = () => {
    return (
      <div class="card">
          <div class="innerCard">
              <div class="Question-heading">Question:</div>
              <div class="Question-text">
                  <textarea></textarea>
              </div>
              <div class="Single-select-table">              
                  <table>
                      <tr>
                          <input></input> 
                          <button id="add-scale-button">UP</button>
                          <button id="add-scale-button">DOWN</button>
                          <button id="add-scale-button">Delete</button>
                      </tr>
                      <tr>
                          <input></input> 
                          <button id="add-scale-button">UP</button>
                          <button id="add-scale-button">DOWN</button>
                          <button id="add-scale-button">Delete</button>            
                      </tr>
                  </table>
              </div>
          </div>
      </div>
    );
  }
  
  export default CardSingleSelect;