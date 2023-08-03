import React from "react";

function QuestionItem({ question, onQuestionDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));


// build the delete request. When an delete button is clicked, that button should be deleted from the list and the server
function handleDeleteClick(){
  fetch(`http://localhost:4000/questions/${question.id}`, {
    method: "DELETE",
  })
  .then((r) => r.json())
  .then(() => onQuestionDelete(question))

}

//build a patch request. when the select dropdown is changed, the change should be reflected on the server. 
  function updateCorrectAnswer(event){
    const newCorrectIndex = parseInt(event.target.value);
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify ({
        "correctIndex": newCorrectIndex,
      }),
    })
    .then((r) => r.json())
    .then((updatedQuestion) => console.log(updatedQuestion))
  }



  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={updateCorrectAnswer}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
