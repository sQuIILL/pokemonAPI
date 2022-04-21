import { Grid, Stack, Paper, CircularProgress, Popper, Popover, Zoom } from "@mui/material"
import { useQuery } from "react-query";
import { useState } from "react";
import { pokeball } from "../API/fetcher"

export const PokemonStack = ({ name, url }: { name: any, url: any }) => {
    const { isLoading, data } = useQuery(`pokemon${name}`, () => pokeball(url));

    const [anchorEl, setAnchorEl] = useState(null);
    let pokemonType = new Array();

    const handleClick = (event: any) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    const id = open ? 'simple-popper' : undefined;

    name = name.charAt(0).toUpperCase() + name.slice(1);

    if (isLoading) {
        return (
            <Grid container
                justifyContent="center"
                alignItems="center">
                <Grid item xs={12}>
                    <CircularProgress color="success" />
                </Grid>
            </Grid>
        );
    }

    const { sprites: { front_default } } = data;

    for (let i in data.types as Array<string>) {
        pokemonType.unshift(data.types[i].type["name"])
    }

    return (
        <Stack style={{ margin: "4px" }}>
            <Zoom in={!isLoading} style={{ transitionDelay: !isLoading ? '500ms' : '0ms' }}>
                <Paper elevation={6}>
                    <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        style={{ textAlign: "center" }}
                        onClick={handleClick}
                    >
                        <Grid item xs={3}>
                            <img src={front_default} alt={name} style={{ display: "block", margin: "0 auto" }} />
                        </Grid>
                        <Grid item xs={4} >
                            {name}
                        </Grid>
                        <Grid item xs={1}>
                            Type:
                        </Grid>
                        <Grid item xs={2}>
                            {pokemonType.map(e => <Stack key={e}>{e}</Stack>)}
                        </Grid>
                    </Grid>
                    <Popper id={id} open={open} anchorEl={anchorEl} style={{ marginBottom: "30px" }}>
                        <Paper elevation={15} style={{backgroundColor:"#F6CB60",border:"solid 2px #D4BC53"}}>
                            <Grid container style={{ height: "70px", width: "300px", textAlign: "center", padding: "10px" }}>
                                <Grid item xs={12} style={{ margin: "auto 0" }}>
                                    {name}'s info:
                                </Grid>
                                <Grid item xs={6} style={{ margin: "auto 0" }}>
                                    height: {data.height}
                                </Grid>
                                <Grid item xs={6} style={{ margin: "auto 0" }}>
                                    weight: {data.weight}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Popper>
                </Paper>
            </Zoom>
        </Stack>
    );
};