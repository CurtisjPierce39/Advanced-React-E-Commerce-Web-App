import React, { useEffect, useState } from 'react';
import { userService } from '../store/userService';
import { auth } from '../types/firebaseConfig';

export const UserProfile: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            if (auth.currentUser) {
                const userData = await userService.getUserProfile(auth.currentUser.uid);
                setProfile(userData);
                setName(userData?.name || '');
                setAddress(userData?.address || '');
            }
        };
        loadProfile();
    }, []);

    const handleUpdateProfile = async () => {
        if (auth.currentUser) {
            await userService.updateUserProfile(auth.currentUser.uid, { name, address });
            setProfile({ ...profile, name, address });
            setIsEditing(false);
        }
    };

    return (
        <div className='border p-4 rounded'>
            <h2>User Profile</h2>
            {!isEditing ? (
                <div>
                    <p>Name: {profile?.name}</p>
                    <p>Email: {profile?.email}</p>
                    <p>Address: {profile?.address}</p>
                    <p>Display Name: {profile?.displayName}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                    />
                    <button onClick={handleUpdateProfile}>Save Changes</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};