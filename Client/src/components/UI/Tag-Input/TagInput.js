import tagStyles from './TagInput.module.css';
import { useState } from 'react';
import React from 'react';

const TagInput = (props) => {
    const [tagList, setTagList] = useState(props.tags);
    
    const handleKeyDown = (event) =>{
        if(event.key !== "Enter") return;
        const value = event.target.value;
        if(!value.trim()) return;
        setTagList([...tagList, value]);
        props.selectedTags([...tagList, value])
        event.target.value = ""

    }

    const removeTag = (index) => {
        console.log(index);
        setTagList([...tagList.filter(( _, i ) => i !== index)]);
    }
    return (
        <React.Fragment>
            <ul className={`${tagStyles.listContainer} ${props.className}`}>
                {tagList.map((tag, index) => {
                    return <li key={index}>
                        <p className={tagStyles.tagName}>{tag}</p>
                        <span onClick={() => removeTag(index)} id={index} className="material-symbols-outlined g-icon">close</span>
                    </li>
                })}
                <input onKeyDown={handleKeyDown} className={tagStyles.tagInput} placeholder='Press Enter after typing' />
            </ul>
        </React.Fragment>
    )
}

export default TagInput;