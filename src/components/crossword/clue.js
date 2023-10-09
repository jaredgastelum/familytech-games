import { useState } from "react";
import { Modal } from "@mui/material";
import Person from "@/components/person";
import { useUser } from "@/contexts/UserContext";

function Clue(props) {
  const { number, word, clue } = props;
  const [displayClue, setDisplayClue] = useState(true);
  const [showPersonInfo, setShowPersonInfo] = useState(false);
  const [currentPerson, setCurrentPerson] = useState(null);
  const { userFSData } = useUser();

  // Switches between clue and answer
  function handleContextMenu(event) {
    event.preventDefault();
    setDisplayClue(!displayClue);
  }

  /// MY WORKKKKKK

  // Highlights the row or column in the crossword when the corresponding clue is clicked
  function handleClueClick(inputId) {
    console.log("clue " + number + " clicked");
    const inputElement = document.getElementById(number);
    if (inputElement) {
      inputElement.focus();
      inputElement.select();
    }
  }

  // Shows the person Modal when their name is clicked (little convoluted, maybe fix later)
  function handleNameClick() {
    if (!displayClue) {
      const transformedMap = new Map(
        [...userFSData.entries()].map(([key, value]) => [
          value.name.compressedName,
          { key },
        ])
      );
      const foundPerson = transformedMap.get(word);
      const realFoundPerson = userFSData.get(Object.values(foundPerson)[0]);
      if (foundPerson) {
        setCurrentPerson(realFoundPerson);
        setShowPersonInfo(true);
      }
    }
  }

  // useEffect(() => {
  //   setDisplayClue(false);
  // }, []);

  const clueStyle = {
    cursor: "pointer", // Set the cursor style to pointer
  };

  return (
    <>
      <div
        style={clueStyle} // Cursor becomes a pointer when hovering over the clue
        onContextMenu={handleContextMenu}
        onClick={displayClue ? null : handleNameClick}
        onDoubleClick={handleClueClick}
      >
        {number + ". " + (displayClue ? clue : word)}
      </div>
      <Modal open={showPersonInfo} onClose={() => setShowPersonInfo(false)}>
        <Person personData={currentPerson} />
      </Modal>
    </>
  );
}

export default Clue;
