import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/Searchbar';
import UserProfile from './components/UserProfile/UserProfile';
import { celebrities } from './celebrities';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [profilesVisible, setProfilesVisible] = useState(false);
  const [hiddenProfiles, setHiddenProfiles] = useState<number[]>([]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setProfilesVisible(true); 
    if (query === "") {
      setProfilesVisible(false);
    }
  };

  const handleHideProfile = (id: number) => {
    setHiddenProfiles([...hiddenProfiles, id]);
  };

  const filteredCelebrities = celebrities.filter((celebrity) =>
    `${celebrity.first} ${celebrity.last}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <SearchBar onSearchChange={handleSearchChange} />
      {profilesVisible && filteredCelebrities.length === 0 && (
        <p>No profiles found.</p>
      )}
      {profilesVisible && filteredCelebrities.map((celebrity) => (
        !hiddenProfiles.includes(celebrity.id) && (
          <UserProfile
            key={celebrity.id}
            name={`${celebrity.first} ${celebrity.last}`}
            age={new Date().getFullYear() - new Date(celebrity.dob).getFullYear()} 
            gender={celebrity.gender}
            country={celebrity.country}
            description={celebrity.description}
            icon={<img src={celebrity.picture} alt={`${celebrity.first} ${celebrity.last}`} />}
            onHide={() => handleHideProfile(celebrity.id)}
          />
        )
      ))}
    </div>
  );
}

export default App;
