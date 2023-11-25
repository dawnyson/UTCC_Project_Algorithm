import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dictionary } from "../utils/algorithm";
import initVocabulary from "../constant/vocabulary.json";

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

export function DataProvider({ children }) {
    const [dictionary, setDictionary] = useState(new Dictionary());

    //การตรวจสอบข้อมูลเริ่มต้น
    useEffect(() => {
        const initDictionary = new Dictionary();
        const localVocabulary = localStorage.getItem('dictionary');

        // ตรวจสอบข้อมูลใน localstorage
        if (localVocabulary) {  // ถ้ามีให้ดึงมาจาก localstorage ในกรณี update delete add จะเก็บค่าไว้
            console.log('use local storage');
            // เรียงลำดับตัวอักษร
            const sortedVocabulary = JSON.parse(localVocabulary).sort((a, b) => a.vocabulary.localeCompare(b.vocabulary));

            sortedVocabulary.forEach((word) => {
                initDictionary.add(word.vocabulary, word.category, word.translation);
            });

            setDictionary(initDictionary);
        } else {    // ถ้าไม่มีให้ใช้ file JSON
            console.log('use JSON');
            // เรียงลำดับตัวอักษร
            const sortedVocabulary = initVocabulary.sort((a, b) => a.vocabulary.localeCompare(b.vocabulary));

            sortedVocabulary.forEach((word) => {
                initDictionary.add(word.vocabulary, word.category, word.translation);
            });

            setDictionary(initDictionary);
        }

    }, []);

    // สำหรับการ CRUD ถ้ามีการกระทำดังกล่าวให้ update ข้อมูลเข้า data storage ด้วย
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
