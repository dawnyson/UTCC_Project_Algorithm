import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dictionary } from "../../utils/algorithm";
import initVocabulary from "../../constant/vocabulary.json"
import { useData } from "../../context/DataContext";
import { Button, Card, Grid, Input, Row, Select, Space, Typography } from "antd";
import { CaretLeftOutlined, CaretRightOutlined, ZoomInOutlined } from "@ant-design/icons";
const { useBreakpoint } = Grid;

function DictionaryApp() {

    const navigate = useNavigate();
    const screens = useBreakpoint();
    //context
    const { dictionary } = useData();

    //state add word
    const [vocabulary, setVocabulary] = useState("");
    const [category, setCategory] = useState("");
    const [translation, setTranslation] = useState("");

    //state algorithm
    const [searchTerm, setSearchTerm] = useState(""); //ค้นหาคำ
    const [searchResult, setSearchResult] = useState(null); //ผลลัพธ์การค้นหา

    // เพิ่มข้อมูล
    const handleAddVocabulary = () => {
        const newVocabulary = {
            vocabulary,
            category,
            translation,
        };
        setVocabulary("");
        setCategory("");
        setTranslation("");

        // เพิ่มข้อมูลคำศัพท์ลงใน Dictionary instance
        dictionary.add(newVocabulary.vocabulary, newVocabulary.category, newVocabulary.translation);
    };

    // ไปยังข้อมูลก่อนหน้า
    const handlePrevious = () => {
        if (!dictionary.head || !dictionary.current) {
            return;
        }

        if (dictionary.current.prev) {
            dictionary.moveToPrevious();
        } else {
            // ถ้าคุณอยู่ที่เริ่มต้นแล้ว ให้เลื่อนไปที่ส่วนท้ายของรายการ
            dictionary.current = dictionary.tail;
        }
        setSearchResult(dictionary.current);

        console.log(dictionary.getAll());
    };

    // ไปยังข้อมูลถัดไป
    const handleNext = () => {
        if (!dictionary.head || !dictionary.current) {
            return;
        }

        if (dictionary.current.next) {
            dictionary.moveToNext();
        } else {
            // ถ้าอยู่ส่วนท้ายให้ไปดึงข้อมูลรายการแรก
            dictionary.current = dictionary.head;
        }
        setSearchResult(dictionary.current);
    };


    // เมื่อมีการเปลี่ยนแปลงในช่องกรอกข้อมูล
    const handleInputChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        // ทำการค้นหาโดยอัตโนมัติเมื่อมีการเปลี่ยนแปลงในช่องกรอกข้อมูล
        const result = dictionary.searchByEnglish(newSearchTerm)
        setSearchResult(result);
        console.log(dictionary)
    };

    return (

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%'
        }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            >
                <img
                    src="/contentbg.jpg"
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        opacity: .05,
                        display: 'block'
                    }}
                    alt="Background"
                />
            </div>
            <Space direction="vertical" size={"large"} style={{ width: screens.md ? '600px' : '100%', padding: 10 }}>

                <Typography.Title level={2} style={{ margin: 0 }}>Nerdtionary</Typography.Title>

                <Space
                    direction="vertical"
                    size={"large"}
                    style={{
                        padding: 30,
                        width: '100%',
                        borderRadius: '10px',
                        border: '3px dashed'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography.Text strong><ZoomInOutlined /> ค้นหา</Typography.Text>
                        <Button type="text" onClick={() => navigate('/admin')}>
                            ดูคำศัพท์ทั้งหมด
                        </Button>
                    </div>

                    <Input placeholder="ค้นหาคำศัพท์ภาษาอังกฤษ" value={searchTerm} onChange={handleInputChange} />

                    <Card hoverable>
                        {searchResult ? (
                            <Space direction="vertical" align="center" style={{ width: '100%' }}>
                                <Typography.Title level={screens.md ? 1 : 4}>{searchResult.vocabulary} ({searchResult.category})</Typography.Title>
                                <Typography.Title level={5}>{searchResult.translation}</Typography.Title>
                            </Space>
                        ) : (
                            <Space direction="vertical" align="center" style={{ width: '100%' }}>
                                <Typography>ยังไม่เจอคำศัพท์ ลองพิมพ์หาดูสิ</Typography>
                            </Space>
                        )}
                    </Card>

                    <Space style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            type="text"
                            onClick={handlePrevious}
                            disabled={!searchResult}
                        >
                            <CaretLeftOutlined />{screens.md ? 'ดูคำศัพท์ก่อนหน้า' : 'Previous'}
                        </Button>
                        <Button
                            type="text"
                            onClick={handleNext}
                            disabled={!searchResult}
                        >
                            {screens.md ? 'ดูคำศัพท์ถัดไป' : 'Next'} <CaretRightOutlined />
                        </Button>

                    </Space>

                </Space>

            </Space>
        </div>
    );
}

export default DictionaryApp;
