import React from 'react';
import { useState } from 'react';

const Players = ({initialName, symbol, isActive, onChange}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName)

    const handleEditClick = () =>{
        setIsEditing((editing)=> !editing);
        if(isEditing){
            onChange(symbol, playerName);
        }
    }
    const handleChange = (e) =>{
        setPlayerName(e.target.value);
    }
    let editablePlayerName = <span className="player-name">{playerName}</span>;
    let btnCaption = "Edit";
    if(isEditing){
        editablePlayerName = <input type='text' required value={playerName} onChange={handleChange}/>
        btnCaption = "Save";
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
        </li>
    )
}

export default Players
