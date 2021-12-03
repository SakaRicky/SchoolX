import React from 'react';
import styles from 'styles/searchField.module.scss';
import CloseIcon from '@material-ui/icons/Close';

interface SearchFieldProps {
    handleSearchCancel: () => void,
    setSearchText: (text: string) => void,
    searchText: string

}

export const SearchField = ({handleSearchCancel, setSearchText, searchText}: SearchFieldProps) => {
    return (
        <div>
            <div className={styles.filter}>
                <input
                    type="text"
                    placeholder="Type to search from list"
                    className={styles.textField}
                    value={searchText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                />
                <span onClick={handleSearchCancel}><CloseIcon /></span>
            </div>
        </div>
    )
};
