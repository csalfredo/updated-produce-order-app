import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export default function InventoryDeleteDialog({
  open,
  itemName,
  onCancel,
  onConfirm,
  loading = false,
}) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
      <DialogTitle>Delete inventory item?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {itemName ? (
            <>
              Remove <strong>{itemName}</strong> from inventory? This cannot be undone.
            </>
          ) : (
            'Remove this item from inventory? This cannot be undone.'
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={loading}>
          {loading ? 'Deleting…' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
