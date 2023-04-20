import { useState } from "react";

export const useForm = (inputValues: any) => {
    const [form, setForm] = useState(inputValues);

    const onChange = (event: any) => {
        const { value, name } = event.target;
        setForm({ ...form, [name]: value });
    };
    return { form, setForm, onChange};
};