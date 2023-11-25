import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dictionary } from "../utils/algorithm";
import initVocabulary from "../constant/vocabulary.json";

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export function DataProvider({ children }) {
    const [dictionary, setDictionary] = useState(new Dictionary());

    useEffect(() => {
        const initDictionary = new Dictionary();
        const localVocabulary = localStorage.getItem('dictionary');

        if (localVocabulary) {
            console.log('use local storage');
            // เรียงลำดับตัวอักษร
            const sortedVocabulary = JSON.parse(localVocabulary).sort((a, b) => a.vocabulary.localeCompare(b.vocabulary));

            sortedVocabulary.forEach((word) => {
                initDictionary.add(word.vocabulary, word.category, word.translation);
            });

            setDictionary(initDictionary);
        } else {
            console.log('use JSON');
            // เรียงลำดับตัวอักษร
            const sortedVocabulary = initVocabulary.sort((a, b) => a.vocabulary.localeCompare(b.vocabulary));

            sortedVocabulary.forEach((word) => {
                initDictionary.add(word.vocabulary, word.category, word.translation);
            });

            setDictionary(initDictionary);
        }

    }, []);

    const setStorage = (data) => {
        localStorage.setItem('dictionary', JSON.stringify(data));
    }

    const value = { dictionary, setStorage };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider >
    );
}
