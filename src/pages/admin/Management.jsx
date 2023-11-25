import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Table, Typography, App, Modal, Form, Input, Select, Space } from 'antd';
import { useData } from "../../context/DataContext";
import { CiOutlined, PlusOutlined } from "@ant-design/icons";



const Management = () => {

    const [edit, setEdit] = useState([]);
    const [editModal, setEditModal] = useState(false);

    const [addModal, setAddModal] = useState(false);

    const [data, setData] = useState([]);

    //context
    const { dictionary, setStorage } = useData();

    useEffect(() => {
        setData(dictionary.getAll());
    }, [dictionary]);

    const handleDelete = (vocabulary) => {
        dictionary.delete(vocabulary);

        const updatedData = dictionary.getAll();
        setData(updatedData);
    };

    const handleEdit = (record) => {
        setEdit(record);
        setEditModal(true)
    };

    const columns = [
        {
            title: 'คำศัพท์',
            dataIndex: 'vocabulary',
            sorter: (a, b) => a.vocabulary.localeCompare(b.vocabulary),
        },
        {
            title: 'ประเภท',
            dataIndex: 'category',
            filters: [
                {
                    text: 'verb',
                    value: 'verb',
                },
                {
                    text: 'adjective',
                    value: 'adjective',
                },
                {
                    text: 'noun',
                    value: 'noun',
                },
            ],
            filterSearch: true,
            onFilter: (value, record) => record.category.includes(value),
        },
        {
            title: 'คำแปล',
            dataIndex: 'translation',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <React.Fragment>
                    <Button onClick={() => handleEdit(record)} type="link">แก้ไข</Button>
                    <Popconfirm title={`คุณตั้งใจจะลบคำ ${record.vocabulary} จริงๆ ใช่ไหม`} onConfirm={() => handleDelete(record.vocabulary)} okText="ใช่ ลบเลย" cancelText="ไม่ต้องการ">
                        <Button type="link" danger>ลบ</Button>
                    </Popconfirm>
                </React.Fragment>
            ),
        }
    ];

    return (
        <React.Fragment>
            <div style={{
                display: 'block',
                margin: 'auto',
                height: '100%',
                width: '100%',
                padding: '25px'
            }}
            >
                <Space direction="vertical" size={"large"} style={{ width: '100%' }}>
                    <Space>
                        <Typography.Title level={4} style={{ margin: 0 }}>ระบบจัดการคำ</Typography.Title>
                        <Button icon={<PlusOutlined />} onClick={() => setAddModal(true)}>
                            เพิ่มคำใหม่
                        </Button>
                    </Space>
                    <Table
                        columns={columns}
                        rowKey={'vocabulary'}
                        dataSource={data}
                        scroll={{
                            x: 'auto'
                        }}
                    />
                </Space>
            </div>
            <EditModal editModal={editModal} setEditModal={setEditModal} editData={edit} dictionary={dictionary} setData={setData} />
            <AddModal addModal={addModal} setAddModal={setAddModal} dictionary={dictionary} setData={setData} />
        </React.Fragment>
    )
}
export default Management;

//Modal Edit
const EditModal = ({ editModal, setEditModal, editData, dictionary, setData }) => {

    const [vocabulary, setVocabulary] = useState('');
    const [category, setCategory] = useState('');
    const [translation, setTranslation] = useState('');

    useEffect(() => {
        if (editData) {
            setVocabulary(editData.vocabulary || '');
            setCategory(editData.category || '');
            setTranslation(editData.translation || '');
        }
    }, [editData]);

    const handleVocabularyChange = (e) => {
        setVocabulary(e.target.value);
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    const handleTranslationChange = (e) => {
        setTranslation(e.target.value);
    };

    const handleOk = () => {
        dictionary.update(vocabulary, category, translation);
        setData(dictionary.getAll());
        setEditModal(false);
    };

    const handleCancel = () => {
        setEditModal(false);
    };

    return (
        <Modal
            centered
            title={"แก้ไขคำ " + (editData?.vocabulary || '')}
            open={editModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={'ยืนยัน'}
            cancelText={'ยกเลิก'}
        >
            <Form layout="vertical">
                <Form.Item label="คำศัพท์">
                    <Input
                        value={vocabulary}
                        onChange={handleVocabularyChange}
                    />
                </Form.Item>
                <Form.Item label="ประเภท">
                    <Select
                        value={category}
                        onChange={handleCategoryChange}
                        options={[
                            {
                                value: 'Noun',
                                label: 'Noun',
                            },
                            {
                                value: 'Pronoun',
                                label: 'Pronoun',
                            },
                            {
                                value: 'Verb',
                                label: 'Verb',
                            },
                            {
                                value: 'Adjective',
                                label: 'Adjective',
                            },
                            {
                                value: 'Adverb',
                                label: 'Adverb',
                            },
                            {
                                value: 'Preposition',
                                label: 'Preposition',
                            },
                            {
                                value: 'Conjunction',
                                label: 'Conjunction',
                            },
                            {
                                value: 'Interjection',
                                label: 'Interjection',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="คำแปล">
                    <Input
                        value={translation}
                        onChange={handleTranslationChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

//Modal Add
const AddModal = ({ addModal, setAddModal, dictionary, setData }) => {
    //context
    const { setStorage } = useData();
    const { message } = App.useApp();

    const [vocabulary, setVocabulary] = useState('');
    const [category, setCategory] = useState('');
    const [translation, setTranslation] = useState('');

    const showMessageError = () => {
        message.warning('โปรดตรวจสอบข้อมูลให้ถูกต้อง');
    };


    const showMessageSuccess = (vocabulary) => {
        message.success(`คำว่า ${vocabulary} ได้ถูกเพิ่มแล้ว`);
    };

    const handleVocabularyChange = (e) => {
        setVocabulary(e.target.value);
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
    };

    const handleTranslationChange = (e) => {
        setTranslation(e.target.value);
    };

    const handleOk = () => {

        if (vocabulary === '' || category === '' || translation === '') {
            showMessageError();
        } else {
            dictionary.add(vocabulary, category, translation);
            setData(dictionary.getAll());
            setAddModal(false);

            setVocabulary("");
            setCategory("");
            setTranslation("");
            showMessageSuccess(vocabulary);

            setStorage(dictionary.getAll());
            console.log(dictionary.getAll())
        }
    };

    const handleCancel = () => {
        setAddModal(false);
    };

    return (
        <Modal
            centered
            title={"เพิ่มคำใหม่"}
            open={addModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={'ยืนยัน'}
            cancelText={'ยกเลิก'}
        >
            <Form layout="vertical">
                <Form.Item label="คำศัพท์">
                    <Input
                        value={vocabulary}
                        onChange={handleVocabularyChange}
                    />
                </Form.Item>
                <Form.Item label="ประเภท">
                    <Select
                        value={category}
                        onChange={handleCategoryChange}
                        options={[
                            {
                                value: 'Noun',
                                label: 'Noun',
                            },
                            {
                                value: 'Pronoun',
                                label: 'Pronoun',
                            },
                            {
                                value: 'Verb',
                                label: 'Verb',
                            },
                            {
                                value: 'Adjective',
                                label: 'Adjective',
                            },
                            {
                                value: 'Adverb',
                                label: 'Adverb',
                            },
                            {
                                value: 'Preposition',
                                label: 'Preposition',
                            },
                            {
                                value: 'Conjunction',
                                label: 'Conjunction',
                            },
                            {
                                value: 'Interjection',
                                label: 'Interjection',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="คำแปล">
                    <Input
                        value={translation}
                        onChange={handleTranslationChange}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};