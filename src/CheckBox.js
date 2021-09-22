import { useState } from "react";

export const CheckBox = ({ name,updateCheck,id}) => {
    const [isCheck, setIsChecked] = useState(false);

    const handleCheck = () => {
        setIsChecked(!isCheck);
        updateCheck(name,id);
    };

    return (
        <label className="labelCheckBox">
            <input className="CheckBox"
                name={name}
                value={name}
                id={id}
                type="checkbox"
                checked={isCheck}
                onChange={handleCheck}
            />
            {name}
        </label>
    );
};
