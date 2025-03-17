import React, { useState } from 'react';
import { db } from '../types/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

interface User {
    id?: string;
    name: string;
    email: string;
    address: string;
    displayName: string;
}

const AddDataForm = () => {
    const [data, setData] = useState<User>({ name: '', email: '', address: '', displayName: ''});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: name === 'age' ? parseInt(value) : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'users'), data);
            alert('New User added!');
            setData({ name: '', email: '', address: '', displayName: ''}); // reset form
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
            <input name="displayName" value={data.displayName} onChange={handleChange} placeholder="Display Name" /><br></br>
            <button type="submit">Add User</button>
        </form>
    );
};

export default AddDataForm;