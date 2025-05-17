import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLanguage } from '../../services/Slice/Language/languageSlice ';

const LanguageSwitcher = () => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.language.language);

    const handleToggle = () => {
        dispatch(toggleLanguage());
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-globe text-dark"
            viewBox="0 0 16 16"
            style={{ cursor: 'pointer' }}
            onClick={handleToggle}
        >
            <path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8zm8-7a7 7 0 0 1 6.468 4.421C13.5 5.226 12.03 5 10.5 5c-1.45 0-2.798.214-3.963.573A6.97 6.97 0 0 1 1.51 8c0 1.042.248 2.027.686 2.909C3.266 10.176 5.771 9 8.5 9c1.707 0 3.31.475 4.66 1.25A6.971 6.971 0 0 1 8 15a7 7 0 0 1 0-14z" />
        </svg>
    );
};

export default LanguageSwitcher;