import React, { useState } from 'react'
import { addNewFlashCard } from '../services/flashcardService';


const CreateFlashcard = () => {

    const card_attributes = ['question', 'answer', 'category', 'level']
    const sample_card_data = {}
    for (const attribute of card_attributes) {
        sample_card_data[attribute] = ''
    }

    const [formData, setFormData] = useState(sample_card_data)


    // useEffect(() => {
    //     // This runs once after the component is mounted
    //     setFormData();
    //   }, []); // <- empty dependency array means "run once"
    
    console.log(formData)
    
    const handleChange = (e) => {
        const { name, value } = e.target;
      
        setFormData((prev) => ({
          ...prev,
          [name]: value
        }));
      };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        addNewFlashCard({
            "new_flashcard" : formData
        })
        // setFormData(sample_card_data)
    }

    const convert_first_letter_upper = (word) => {
        const new_word = word[0].toUpperCase() + word.slice(1)
        console.log(new_word)
        return new_word
    }
 

  return (
    <>
        <h2>
            Create a new Flashcard
        </h2>
        <form onSubmit={handleSubmit}>

            {
            card_attributes.map((form_item) => (
                <div key = {form_item}>
                    <label> {convert_first_letter_upper(form_item)}: </label>
                    <input 
                        type = 'text'
                        name = {form_item}
                        value={formData[form_item]}
                        onChange={handleChange}
                    />

                </div>
            ))
            }
        <button type='submit'>
            <h3>
                Submit
            </h3>
        </button>
        </form>
    </>
  )
}

export default CreateFlashcard
