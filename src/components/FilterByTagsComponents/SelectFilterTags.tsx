import * as React from 'react';
import {Theme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {createTheme} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function SelectFilterTags(props:{filterTagsList:string[],onSelectTags:(tags:string[]) => void}) {
    const theme = createTheme({
        palette: {
            primary: { main: '#2D6A4F' },
            secondary: { main: '#2D6A4F' },
        },
    });
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

    const handleTagChange = (event: SelectChangeEvent<string[]>) => {
        const selectedTags = event.target.value as string[];
        setSelectedTags(selectedTags);
        props.onSelectTags(selectedTags);
    };

    return (
        <div>
            <FormControl sx={{
                m: 0,
                minWidth: 260,
                '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    '& fieldset': { borderColor: '#E2EBE4' },
                    '&:hover fieldset': { borderColor: '#40916C' },
                    '&.Mui-focused fieldset': { borderColor: '#2D6A4F' },
                },
                '& .MuiInputLabel-root': { color: '#6B7280' },
                '& .MuiInputLabel-root.Mui-focused': { color: '#2D6A4F' },
            }}>
                <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedTags}
                    onChange={handleTagChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Tags"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {props.filterTagsList.map((tag,idx) => (
                        <MenuItem
                            key={idx}
                            value={tag}
                            style={getStyles(tag, selectedTags, theme)}
                        >
                            {tag}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}