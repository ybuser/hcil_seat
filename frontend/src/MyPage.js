import React, { useState } from 'react';
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
  background-color: #2f5597;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 10%;  // Rounded corners for the button
  &:hover {
    background-color: #002060;
  }
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
  button {
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
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
  background-color: #afabab;
  &:nth-child(11) { top: 20px; left: 30px; }
  &:nth-child(12) { top: 120px; left: 30px; }
  &:nth-child(13) { top: 260px; left: 30px; }
  &:nth-child(14) { top: 360px; left: 30px; }
`;


const HorizontalTable = styled.div`
  position: absolute;
  width: 120px;
  height: 80px;
  background-color: #f8cbad;
  //on hover #ed7241
  
  cursor: pointer;
  &:hover {
    background-color: #ed7241;
  }
  &:nth-child(1) { top: 130px; left: 170px; }
  &:nth-child(2) { top: 130px; left: 305px; }
  &:nth-child(3) { top: 130px; left: 440px; }
  &:nth-child(4) { top: 130px; left: 575px; }
  &:nth-child(5) { top: 130px; left: 710px; }
  &:nth-child(6) { top: 225px; left: 170px; }
  &:nth-child(7) { top: 225px; left: 305px; }
  &:nth-child(8) { top: 225px; left: 440px; }
  &:nth-child(9) { top: 225px; left: 575px; }
  &:nth-child(10) { top: 225px; left: 710px; }  // Example for the last table in 2nd row
`;

const Page = () => {
  const [mode, setMode] = useState('viewer');
  const [showModal, setShowModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState('page1');
  const [showTables, setShowTables] = useState(false);
  const [tableSelected, setTableSelected] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

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

  return (
    <PageWrapper>
      <Sidebar>
        <SquareButton isSelected={selectedPage === 'page1'} onClick={() => {setSelectedPage('page1'); setShowTables(true);}}>Page 1</SquareButton>
        <SquareButton isSelected={selectedPage === 'page2'} onClick={() => {setSelectedPage('page2'); setShowTables(false);}}>Page 2</SquareButton>
      </Sidebar>
      <MainContent>
        <TopBar>
            <ButtonGroup>
                <button onClick={() => handleModeChange('viewer')}>Viewer</button>
                <button onClick={() => handleModeChange('editor')}>Editor</button>
            </ButtonGroup>
            {tableSelected && ( // Display only if a table is selected
            <RightBarSection>
                {[...Array(7)].map((_, i) => (
                <SquareButton2 key={i}></SquareButton2>
                ))}
            </RightBarSection>
            )}
        </TopBar>
        {showTables ? (
            <TableGroup>
                {[...Array(10)].map((_, i) => (
                <HorizontalTable key={i} onClick={() => {
                    if (selectedTable === i) {
                        setSelectedTable(null);
                        setTableSelected(false);
                    } else {
                        alert(`Horizontal table ${i + 1} clicked`)
                        setSelectedTable(i);
                        setTableSelected(true);
                    }
                }} />
                ))}
                {[...Array(4)].map((_, i) => (
                <VerticalTable key={i} />
                ))}
            </TableGroup>
                ) : (
            <div>Other content for Page 2</div>
        )}
      </MainContent>
      {showModal && (
        <Modal>
          <h3>Enter Password</h3>
          <input type="password" id="password" />
          <button onClick={() => handlePasswordSubmit(document.getElementById('password').value)}>Submit</button>
        </Modal>
      )}
    </PageWrapper>
  );
};

export default Page;
