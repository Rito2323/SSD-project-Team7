const Card = () => {
    return (
        <div class="card">
            <div class="innerCard">
                <div class="Question-heading">Question:</div>
                <div class="Question-text"><textarea id="textQuestion"></textarea></div>
                <div class="buttons">
                    <button class="saveButton" onClick={() =>
                      console.log(document.getElementById('textQuestion').value)}>
                        Save
                    </button>
                    <button class="discardButton" onClick={() =>
                      document.getElementById('textQuestion').value=""}>
                        Discard
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;