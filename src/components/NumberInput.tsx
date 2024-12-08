import { createSignal } from "solid-js";
import { FormControl, InputGroup } from "solid-bootstrap";

export const NumberInput = ({ initialValue = 0, min = 0, max = 1, onChange }: { initialValue: number, min: number, max: number, onChange: Function }) => {
    const [value, setValue] = createSignal(initialValue);

    const increase = () => {
        const newVal = value() + 0.5;
        const val = newVal <= max ? newVal : max;
        setValue(val);
        onChange(val)
    }

    const decrease = () => {
        const newVal = value() - 0.5;
        const val = newVal >= min ? newVal : min;
        setValue(val);
        onChange(val)
    }

    return (
            <InputGroup>
                <InputGroup.Text class="btn btn-warning" role="button" onClick={() => decrease()}>-</InputGroup.Text>
                <FormControl value={value()} />
                <InputGroup.Text class="btn btn-warning" role="button" onClick={() => increase()}>+</InputGroup.Text>
            </InputGroup>
    );
}