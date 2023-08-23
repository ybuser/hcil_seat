import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 7vw;
  height: 100%;
  background-color: #843c0c;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SquareButton = styled.button`
  width: 60px;
  height: 60px; /* Makes the button square */
  margin: 20% 0 20% 0;
  background-color: ${props => (props.isSelected ? "#002060" : "#2f5597")};
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 10%;  // Rounded corners for the button
  &:hover {
    background-color: #002060;
  }
`;

const SquareButton2 = styled.button`
  width: 60px;
  height: 60px; /* Makes the button square */
  margin: 1%;
  background-color: ${props => (props.children ? '#385723' : '#2f5597')};
  color: white;
  cursor: ${props => (props.isEditorMode ? 'pointer' : 'default')};
  border: none;
  border-radius: 10%;  // Rounded corners for the button
  &:hover {
    background-color: ${props => (props.isEditorMode ? "#002060" : (props.children ? '#385723' : '#2f5597'))}; 
  }
`;

const TableWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MiniSquareRow = styled.div`
  display: flex;
  justify-content: center; // Horizontally align the mini squares
  margin: 5px 0;
  position: relative;
`;

const MiniSquare = styled.div`
  width: 18px;
  height: 18px; 
  margin: 1%;
  background-color: ${props => props.color ? '#FFA500' : '#2f5597'};
  border-radius: 10%;
`;

const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.div`
  height: 7vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4b6a87;
`;

const RightBarSection = styled.div`
  display: flex;
  height: 100%;
  width: 75%;
  background-color: #945b35;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; // take the full height of TopBar
  
  button {
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 20px;
    color: white;
    font-size: 16px;
    background-color: #767171;
    border: none;
    transition: background-color 0.3s; // Smooth transition for background color change
    
    &:hover {
      opacity: 0.9; // Slight fade on hover
    }
  }
`;

const selectedButtonStyle = {
  backgroundColor: '#548235',
  border: '2px solid #c2ddb3'
};

const unselectedButtonStyle = {
  backgroundColor: '#767171',
  border: 'none'
};

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f2e8df; // A neutral, light beige that complements your current colors
  padding: 0 20px 20px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Adding a slight shadow for depth
`;

const PasswordInput = styled.input`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
`;

const SubmitButton = styled.button`
  padding: 8px 15px;
  border: none;
  background-color: #4b6a87; // Using a color from your top bar for consistency
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #38505c; // A slightly darker shade for hover
  }
`;

const TableGroup = styled.div`
  position: relative;  // Ensuring absolute children are relative to this container
  height: calc(100% - 100px);  // Assuming 60px is the height of your top bar
  padding: 20px;
  background-color: #3b3838 ;
`;

const VerticalTable = styled.div`
  position: absolute;
  width: 60px;
  height: 90px;
  background-color: ${props => (props.isSelected ? "#FFA500" : "#afabab")};
  cursor: ${props => (props.isEditorMode ? "pointer" : "default")};
  &:hover {
    background-color: ${props => (props.isEditorMode ? "#e89c5c" : (props.isSelected ? "#FFA500" : "#afabab"))}; 
  }
  &:nth-child(11) { top: 20px; left: 30px; }
  &:nth-child(12) { top: 120px; left: 30px; }
  &:nth-child(13) { top: 260px; left: 30px; }
  &:nth-child(14) { top: 360px; left: 30px; }
`;

const HorizontalTable = styled.div`
  position: absolute;
  width: 120px;
  height: 80px;
  background-color: ${props => (props.isSelected ? "#ed7241" : "#f8cbad")};
  
  cursor: pointer;
  &:hover {
    background-color: #ed7241;
  }
  /* &:nth-child(1) { top: 0px; left: 0px; }
  &:nth-child(2) { top: 0px; left: 135px; }
  &:nth-child(3) { top: 0px; left: 270px; }
  &:nth-child(4) { top: 0px; left: 405px; }
  &:nth-child(5) { top: 0px; left: 540px; }
  &:nth-child(6) { top: 95px; left: 0px; }
  &:nth-child(7) { top: 95px; left: 135px; }
  &:nth-child(8) { top: 95px; left: 270px; }
  &:nth-child(9) { top: 95px; left: 405px; }
  &:nth-child(10) { top: 95px; left: 540px; } */
`;

const Page = () => {
  const [mode, setMode] = useState('viewer');
  const [showModal, setShowModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState('page1');
  const [showTables, setShowTables] = useState(false);
  const [tableSelected, setTableSelected] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedVerticalTables, setSelectedVerticalTables] = useState([]);
  // Default to empty names for each square for each of the tables
  const defaultNames = Array.from({ length: 10 }, () => Array(7).fill(''));
  const [buttonNames, setButtonNames] = useState(defaultNames);

  const [seats, setSeats] = useState([]);
  const [editorMode, setEditorMode] = useState(false);

  useEffect(() => {
    fetch("/seats")
      .then(res => res.json())
      .then(data => {
        // Update your state with fetched seats
        setSeats(data);
        
        // Transform the data to match your buttonNames format
        const namesFromData = data.map(seat => seat.names);
        setButtonNames(namesFromData);
      });
  }, []);

  const updateSeat = (seatId, updatedData) => {
    fetch(`/seat/${seatId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
    .then(res => res.json())
    .then(data => {
      // Update your state with the updated seat
      setSeats(prevSeats => prevSeats.map(seat => seat._id === data._id ? data : seat));
    });
  };
  
  const checkPassword = (inputPassword) => {
    fetch('/check-password', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: inputPassword }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.valid) {
        // Switch to editor mode
        setEditorMode(true);
      } else {
        // Show error or prompt user again
        alert("Incorrect password");
      }
    });
  };

  const handleModeChange = (newMode) => {
    if (newMode === 'editor') {
      setShowModal(true);
    } else {
      setMode(newMode);
    }
  };

  const handlePasswordSubmit = (password) => {
    // Validate password
    if (password === '1234') {
      setMode('editor');
    }
    setShowModal(false);
  };

  const handleVerticalTableClick = (index) => {
    if (selectedVerticalTables.includes(index)) {
      // If the index is already in the array, remove it
      setSelectedVerticalTables(prev => prev.filter(i => i !== index));
    } else {
      // If the index is not in the array, add it
      setSelectedVerticalTables(prev => [...prev, index]);
    }
  };


  return (
    <PageWrapper>
      <Sidebar>
        <SquareButton isSelected={selectedPage === 'page1'} onClick={() => {setSelectedPage('page1'); setShowTables(true);}}>삼성</SquareButton>
        <SquareButton isSelected={selectedPage === 'page2'} onClick={() => {setSelectedPage('page2'); setShowTables(false);}}>제2공</SquareButton>
      </Sidebar>
      <MainContent>
        <TopBar>
            <ButtonGroup style={{width:'25%'}}>
              <button 
                style={mode === 'viewer' ? selectedButtonStyle : unselectedButtonStyle}
                onClick={() => handleModeChange('viewer')}
              >
                Viewer
              </button>
              <button 
                style={mode === 'editor' ? selectedButtonStyle : unselectedButtonStyle}
                onClick={() => handleModeChange('editor')}
              >
                Editor
              </button>
            </ButtonGroup>
            {tableSelected && ( // Display only if a table is selected
            <RightBarSection>
              {selectedTable !== null && buttonNames[selectedTable].map((name, i) => (
                <SquareButton2 
                  key={i}
                  isEditorMode={mode === 'editor'}
                  onClick={() => {
                    if (mode !== 'editor') return; // Do nothing if not in editor mode
                
                    if (name) {
                      const confirmErase = window.confirm('Do you want to erase the name?');
                      if (confirmErase) {
                        const updatedNames = [...buttonNames];
                        updatedNames[selectedTable][i] = ''; // Clear the name for the selected table's square
                        setButtonNames(updatedNames);
                        updateSeat(selectedTable, { names: updatedNames[selectedTable] });
                      }
                    } else {
                      const newName = prompt('Enter name:');
                      if (newName) {
                        const updatedNames = [...buttonNames];
                        updatedNames[selectedTable][i] = newName;
                        setButtonNames(updatedNames);
                        updateSeat(selectedTable, { names: updatedNames[selectedTable] });
                      }
                    }
                  }}
                >
                  {name}
                </SquareButton2>
              ))}
            </RightBarSection>
            )}
        </TopBar>
        {showTables ? (
            <TableGroup>
                {[...Array(10)].map((_, i) => (
                  <TableWrapper 
                    key={i} 
                    style={{ 
                      top: i < 5 ? '130px' : '225px', 
                      left: `${170 + 135 * (i % 5)}px` 
                    }}
                  >
                    {/* Render mini squares above the table for the first row */}
                    {i < 5 && (
                      <MiniSquareRow style={{ top: '-35px' }}>
                        {buttonNames[i] && buttonNames[i].map((name, idx) => (
                          <MiniSquare color={name} key={idx} />
                        ))}
                      </MiniSquareRow>
                    )}
                    <HorizontalTable 
                      isSelected={i === selectedTable} 
                      onClick={() => {
                        if (selectedTable === i) {
                          setSelectedTable(null);
                          setTableSelected(false);
                        } else {
                          setSelectedTable(i);
                          setTableSelected(true);
                        }
                      }} 
                    />
                    {/* Render mini squares below the table for the second row */}
                    {i >= 5 && (
                      <MiniSquareRow style={{ top: '82px' }}>
                        {buttonNames[i] && buttonNames[i].map((name, idx) => (
                          <MiniSquare color={name} key={idx} />
                        ))}
                      </MiniSquareRow>
                    )}
                  </TableWrapper>
                ))}
                {[...Array(4)].map((_, i) => (
                  <VerticalTable 
                    key={i} 
                    isSelected={selectedVerticalTables.includes(i)} // Check if current table is in the selected array
                    isEditorMode={mode === 'editor'}
                    onClick={() => {
                      if (mode === 'editor') handleVerticalTableClick(i);
                    }} 
                  />
                ))}
            </TableGroup>
                ) : (
            <div>제2공학관 연구실은 아직 페이지 공사 중입니다.</div>
        )}
      </MainContent>
      {showModal && (
        <Modal>
          <h3>Enter Password</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handlePasswordSubmit(e.target.password.value);
          }}>
            <PasswordInput type="password" id="password" name="password" />
            <SubmitButton type="submit">Submit</SubmitButton>
          </form>
        </Modal>
      )}
    </PageWrapper>
  );
};

export default Page;
