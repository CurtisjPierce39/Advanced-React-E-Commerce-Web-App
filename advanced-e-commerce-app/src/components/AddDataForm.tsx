import React, { useState } from 'react';
import { db } from '../types/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

interface User {
    id?: string;
    name: string;
    email: string;
    address: string;
    age: number;
}

const AddDataForm = () => {
    const [data, setData] = useState<User>({ name: '', email: '', age: 0, address: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: name === 'age' ? parseInt(value) : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'users'), data);
            alert('Data added!');
            setData({ name: '', email: '', age: 0, address: '' }); // reset form
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add New User</h1>
            <input name="name" value={data.name} onChange={handleChange} placeholder="Name" /><br></br>
            <input name="email" value={data.email} onChange={handleChange} placeholder="Email" /><br></br>
            <input name="address" value={data.address} onChange={handleChange} placeholder="Address" /><br></br>
            <input name="age" type="number" value={data.age} onChange={handleChange} placeholder="Age" />
            <button type="submit">Add User</button>
        </form>
    );
};

export default AddDataForm;