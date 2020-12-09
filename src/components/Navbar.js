import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import logo from "../logo.svg";

const useStyles = makeStyles(theme => ({
    root: {
        flexiGrow: 1,
        color: "black"
    },
    appBar: {
        background: "transparent",
        boxShadow: "none",
        position: "sticky"
    },
    appLogo: {
        width: "160px"
    }
}));

export default function NavBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar variant="dense">
                    <div style={{ flex: "1 1 auto" }}></div>
                        <a
                            href="https://github.com/AbimbolaBakare/weather-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-github" style={{ fontSize: '50px', color:'yellow' }}></i>
                        </a>
                </Toolbar>
            </AppBar>
            <hr/>
        </div>
    );
}
