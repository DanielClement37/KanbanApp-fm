interface AddEditListItemProps {
    index: number;
    value: string;
    placeholder: string;
    onChange: (index: number, value: string) => void;
    onRemove: (index: number) => void;
    onBlur: () => void;
    error: string;
}

const AddEditListItem = ({ index, value, placeholder, onChange, onRemove, onBlur, error }: AddEditListItemProps) => (
    <div className="list-input-item">
        <div className="input-field-container">
            <input
                type="text"
                id={`item-${index}`}
                className={`input-field text-L ${error ? 'input-field--error' : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
                onBlur={onBlur}
            />
            {error && (
                <span className="input-error-message text-M">{error}</span>
            )}
        </div>
        <svg
            className="icon icon-list-delete"
            width="15"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => onRemove(index)}
        >
            <g fillRule="evenodd">
                <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/>
                <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/>
            </g>
        </svg>
    </div>
);

export default AddEditListItem;
