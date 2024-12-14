import React, { useState } from 'react';
import { Box, Button, Modal, Typography, TextField } from '@mui/material';

interface EditModalProps {
  open: boolean;
  title: string;
  initialValue: string;
  onClose: () => void;
  onSave: (value: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  title,
  initialValue,
  onClose,
  onSave,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id='modal-title' variant='h6' component='h2' mb={2}>
          {title}
        </Typography>
        <TextField
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          label='Nytt namn'
          variant='outlined'
          autoFocus
        />
        <Box mt={2} display='flex' justifyContent='space-between'>
          <Button variant='contained' color='primary' onClick={handleSave}>
            Spara
          </Button>
          <Button variant='outlined' color='secondary' onClick={onClose}>
            Avbryt
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
