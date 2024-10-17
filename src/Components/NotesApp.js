import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const NotesApp = () => {
  const [notes, setNotes] = useState(() => {
    
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [noteText, setNoteText] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = noteText;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, noteText]);
    }
    setNoteText('');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNoteText(notes[index]);
  };

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter(note =>
    note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <TextField
          label="Add Note"
          variant="outlined"
          fullWidth
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ backgroundColor: '#4caf50', color: 'white', '&:hover': { backgroundColor: '#45a049' } }}
                >
                  {editIndex !== null ? 'Update' : 'Submit'}
                </Button>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Search Notes"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mt: 2 }} 
        />
      </form>

      <List>
        {filteredNotes.map((note, index) => (
          <ListItem key={index}>
            <Card sx={{ width: '100%', mb: 1 }}> 
              <CardContent>
                <ListItemText primary={note} />
                <IconButton onClick={() => handleEdit(index)} edge="end" aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton 
                  onClick={() => handleDelete(index)} 
                  edge="end" 
                  aria-label="delete" 
                  sx={{ color: '#f44336', '&:hover': { color: '#d32f2f' } }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default NotesApp;
