import { useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import { FormControl, InputGroup } from "react-bootstrap";

export const NumberInput = ({ initialValue = 0, min = 0, max = 1, onChange }: { initialValue: number, min: number, max: number, onChange: Function }) => {
    const [value, setValue] = useState(initialValue);

    const increase = () => {
        const newVal = value + 0.5;
        const val = newVal <= max ? newVal : max;
        setValue(val);
        onChange(val)
    }

    const decrease = () => {
        const newVal = value - 0.5;
        const val = newVal >= min ? newVal : min;
        setValue(val);
        onChange(val)
    }

    return (
        <Fragment>
            <InputGroup>
                <InputGroup.Text className="btn btn-warning" role="button" onClick={() => decrease()}>-</InputGroup.Text>
                <FormControl value={value} />
                <InputGroup.Text className="btn btn-warning" role="button" onClick={() => increase()}>+</InputGroup.Text>
            </InputGroup>
        </Fragment>
    );
}