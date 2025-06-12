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
            primary: {
                main: '#1500d6'
            },
            secondary: {
                main: '#00d69a'
            }
        }
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
                m: 1,
                width: 300,
                backgroundColor: theme.palette.secondary.main,
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent', // Supprime la bordure bleue
                    },
                },
                '& .MuiInputBase-input:focus': {
                    outline: 'none', // Supprime l'outline
                },
                '& .MuiInputLabel-root': {
                    color: 'black', // Couleur du label par défaut
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'black', // Garde la couleur blanche même en focus
                }
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