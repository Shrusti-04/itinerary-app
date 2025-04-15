import React, { useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PackingList = ({ tripId, readOnly }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackingList = async () => {
      try {
        const response = await axios.get(`/api/packing/${tripId}`);
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching packing list:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tripId) {
      fetchPackingList();
    }
  }, [tripId]);

  const handleAddItem = async () => {
    if (newItem.trim()) {
      try {
        const response = await axios.post(`/api/packing/${tripId}`, {
          text: newItem,
        });
        setItems([...items, response.data]);
        setNewItem("");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  const handleToggleItem = async (itemId) => {
    try {
      const item = items.find((i) => i._id === itemId);
      await axios.put(`/api/packing/${tripId}/${itemId}`, {
        text: item.text,
        checked: !item.checked,
      });
      setItems(
        items.map((item) =>
          item._id === itemId ? { ...item, checked: !item.checked } : item
        )
      );
    } catch (error) {
      console.error("Error toggling item:", error);
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Packing List
      </Typography>
      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
        />
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddItem}
          variant="contained"
          sx={{ ml: 1 }}
        >
          Add
        </Button>
      </Box>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            dense
            button
            onClick={() => handleToggleItem(item.id)}
          >
            <ListItemIcon>
              <Checkbox edge="start" checked={item.checked} />
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{ textDecoration: item.checked ? "line-through" : "none" }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default PackingList;
