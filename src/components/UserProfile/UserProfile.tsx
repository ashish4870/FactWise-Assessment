import React, { useState } from 'react';
import './UserProfile.css';
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { RiDeleteBinLine } from "react-icons/ri";
import { SlPencil } from "react-icons/sl";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaRegTimesCircle } from "react-icons/fa";

interface UserProfileProps {
    name: string;
    age: number;
    gender: string;
    country: string;
    description: string;
    icon: React.ReactNode; 
    onHide: () => void;  
}

const UserProfile: React.FC<UserProfileProps> = ({
    name: initialName,
    age: initialAge,
    gender: initialGender,
    country: initialCountry,
    description: initialDescription,
    icon,
    onHide
}) => {
    const [hide, setHide] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [name, setName] = useState(initialName);
    const [age, setAge] = useState(initialAge);
    const [gender, setGender] = useState(initialGender);
    const [country, setCountry] = useState(initialCountry);
    const [description, setDescription] = useState(initialDescription);

    const [tempName, setTempName] = useState(initialName);
    const [tempAge, setTempAge] = useState(initialAge);
    const [tempGender, setTempGender] = useState(initialGender);
    const [tempCountry, setTempCountry] = useState(initialCountry);
    const [tempDescription, setTempDescription] = useState(initialDescription);

    const handleClick = () => {
        setHide(!hide);
    }

    const handleEditClick = () => {
        setEditMode(true);
    }

    const handleSaveClick = () => {
        setName(tempName);
        setAge(tempAge);
        setGender(tempGender);
        setCountry(tempCountry);
        setDescription(tempDescription);
        setEditMode(false);
    }

    const handleCancelClick = () => {
        setTempName(name);
        setTempAge(age);
        setTempGender(gender);
        setTempCountry(country);
        setTempDescription(description);
        setEditMode(false);
    }

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    }

    const confirmHide = () => {
        onHide();
        setShowDeleteModal(false);
    }

    const cancelHide = () => {
        setShowDeleteModal(false);
    }

    return (
        <div className={`user-profile ${editMode ? 'edit-mode' : ''}`}>
            <div className="user-profile-header">
                <div className='user-profile-picture'>{icon}</div>
                <input
                    type="text"
                    className={`user-profile-name ${editMode ? 'editable' : ''}`}
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    disabled={!editMode}
                />
                <span onClick={handleClick} className="user-profile-icon">
                    {hide ? <SlArrowDown /> : <SlArrowUp />}
                </span>
            </div>
            {!hide && (
                <>
                    <div className="user-profile-details">
                        <div className="user-profile-detail">
                            <span className="user-profile-label">Age</span>
                            <input
                                type="number"
                                className={`user-profile-info ${editMode ? 'editable' : ''}`}
                                value={tempAge}
                                onChange={(e) => setTempAge(Number(e.target.value))}
                                disabled={!editMode}
                            />
                        </div>
                        <div className="user-profile-detail">
                            <span className="user-profile-label">Gender</span>
                            {editMode ? (
                                <select
                                    className={`user-profile-info ${editMode ? 'editable' : ''}`}
                                    value={tempGender}
                                    onChange={(e) => setTempGender(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Rather not say">Rather not say</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    className={`user-profile-info ${editMode ? 'editable' : ''}`}
                                    value={tempGender}
                                    disabled={!editMode}
                                />
                            )}
                        </div>
                        <div className="user-profile-detail">
                            <span className="user-profile-label">Country</span>
                            <input
                                type="text"
                                className={`user-profile-info ${editMode ? 'editable' : ''}`}
                                value={tempCountry}
                                onChange={(e) => setTempCountry(e.target.value)}
                                disabled={!editMode}
                            />
                        </div>
                    </div>
                    <div className="user-profile-description">
                        <span className="user-profile-description-label">Description</span>
                        <textarea
                            className={`user-profile-description-info ${editMode ? 'editable' : ''}`}
                            value={tempDescription}
                            onChange={(e) => setTempDescription(e.target.value)}
                            disabled={!editMode}
                        />
                    </div>
                    <div className="user-profile-actions">
                        {!editMode ? (
                            <>
                                <RiDeleteBinLine onClick={handleDeleteClick} className="user-profile-action-icon" />
                                <SlPencil onClick={handleEditClick} className="user-profile-action-iconC" />
                            </>
                        ) : (
                            <>
                                <FaRegTimesCircle onClick={handleCancelClick} className="user-profile-action-iconCross" />
                                <IoIosCheckmarkCircleOutline onClick={handleSaveClick} className="user-profile-action-iconCheck" />
                            </>
                        )}
                    </div>
                </>
            )}
            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to delete this profile?</p>
                        <div className="modal-actions">
                            <button className="modal-actions-cancel" onClick={cancelHide}>Cancel</button>
                            <button className="modal-actions-delete" onClick={confirmHide}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
