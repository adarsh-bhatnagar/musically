
const TextInput = ({ label, placeholder, className, value, setValue, labelClass }) => {

    return (
        <div className={`textInputDiv flex flex-col space-y-2 w-full ${className}`}>
            <label
                for={label}
                className={`font-semibold ${labelClass}`}>
                {label}
            </label>
            <input
                placeholder={placeholder}
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 placeholder-gray-500"
                id={label}
                value={value}
                onChange={(e) => 
                        setValue(e.target.value)
                }
            />
        </div>
    )
};

export default TextInput