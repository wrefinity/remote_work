export const handleInput = (e, setHook) => {
    const { name, value } = e.target;
    setHook((prev) => ({
        ...prev,
        [name]: value,
    }));
};
