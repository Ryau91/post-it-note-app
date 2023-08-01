import {useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  // reminder: this is where we initialize our list of notes. Initial value is set in useState. It is an array of objects (the objects are the notes)
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "My first note",
      date: "21/07/21"
    },
    {
      id: nanoid(),
      text: "My second note",
      date: "21/07/21"
    },
    {
      id: nanoid(),
      text: "My third note",
      date: "21/07/21"
    }
  ]);

  const [searchText, setSearchText] =useState('');
  const [darkMode, setDarkMode] = useState(false);

  // load notes. We leave the dependency array empty because we wish to only run this function once
  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );
    
    // if savedNotes exists, then setNotes to savedNotes. i.e. load savedNotes to 'notes'
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // save notes
  useEffect(() => {
    console.log(notes)
    let data = JSON.stringify(notes)
    console.log(data)

    localStorage.setItem(
      'react-notes-app-data',
      JSON.stringify(notes)
    )
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }

    const newNotes = [...notes, newNote];
    
    setNotes(newNotes);
  }

  const deleteNote = (id) => {
    // create new note list that only contains the notes where the id doesn't match the id of the note containing the delete icon that was clicked
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return(
    // if darkMode is true, then add the dark-mode class
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode}/>
        <Search handleSearchNote={setSearchText}/>
        <NotesList
        // take current list of notes, filter by notes that include the search text
          notes={notes.filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()))}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}/>
      </div>
    </div>
  );
};

export default App;