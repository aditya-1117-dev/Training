import React, {type ChangeEvent} from 'react';
import {Box, TextField, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent} from '@mui/material';

interface IFilterOption {
    value: string;
    label: string;
}

interface IFilterConfig {
    key: string;
    label: string;
    value: string;
    onChange: (e: SelectChangeEvent) => void;
    options: IFilterOption[];
}

interface IRenderFiltersProps {
    search: {
        value: string;
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
        label?: string;
    };
    filters: IFilterConfig[];
}

export const RenderFilters: React.FC<IRenderFiltersProps> = ({search, filters}) => {
    return (
        <Box sx={{display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap'}}>
            <TextField
                size={'small'}
                label={search.label || 'Search'}
                variant="outlined"
                value={search.value}
                onChange={search.onChange}
                sx={{flex: '1 1 auto'}}
            />
            {filters.map((filter) => (
                <FormControl key={filter.key} size="small" sx={{flex: '1 1 auto'}}>
                    <InputLabel id={`${filter.key}-label`}>{filter.label}</InputLabel>
                    <Select
                        labelId={`${filter.key}-label`}
                        value={filter.value}
                        onChange={filter.onChange}
                        label={filter.label}
                        variant={"outlined"}
                    >
                        <MenuItem value="all">All {filter.label}</MenuItem>
                        {Array.from(
                                new Map(filter.options.map(opt => [opt.value, opt])).values()
                            ).map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            ))}
        </Box>
    );
};