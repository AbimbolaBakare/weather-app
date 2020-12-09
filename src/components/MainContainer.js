import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardHeader, CardMedia, Divider, Typography, Grid } from "@material-ui/core";
import Forecast from "./Forecast";
import WeatherCardBody from "./WeatherCard";

const useStyles = makeStyles(theme => ({
    atmospheric: {
        fontSize: "28px",
        padding: "5px"
    },
    buttons: {
        color: "black"
    },
    card: {
        margin: 'auto',
        maxWidth: 1000,
        minHeight: 600,
        backgroundColor: '#F3F4F3',
        boxShadow: "15px 15px 55px black",
        [theme.breakpoints.down("sm")]: {
            minWidth: 'auto'
        },
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    error: {
        color: "red",
        padding: "10px"
    },
    fullList: {
        width: "auto"
    },
    layout: {
        marginTop: "20px",
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    recommendation: {
        fontFamily: "Montserrat, sans-serif",
        padding: "20px 0px 10px 0px",
        fontSize: "16px",
        textAlign: "center"
    },
    root: {
        flexiGrow: 1,
        color: "black",
    },
    search: {
        marginTop: "100px"
    },
    wi: {
        color: "#673ab7"
    },
    wi2: {
        fontSize: "128px",
        float: "right"
    }
}));

export default function MainContainer(props) {
    const classes = useStyles();
    const { currentWeather, forecast, icon, recommendation, click } = props;

    return (
        <div className={classes.layout}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WeatherCard
                        click={click}
                        currentWeather={currentWeather}
                        forecast={forecast}
                        icon={icon}
                        recommendation={recommendation}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

const WeatherCard = props => {
    const classes = useStyles();
    const humidity = "wi wi-humidity";
    const strongWind = "wi wi-strong-wind";
    const { currentWeather, forecast, icon, recommendation, click } = props;

    return (
        <Card className={classes.card}>
            <div style={{ textAlign: 'right' }}>
                <button className='show-chart' onClick={click}>Show Forecast Chart</button>
            </div>

            <CardHeader
                title={currentWeather.city + ", " + currentWeather.country}
                subheader={<WeatherCardBody currentWeather={currentWeather} />}
            />
            <CardContent>
                <CardMedia
                    className={`${icon} ${classes.wi} ${classes.wi2}`}
                    src={icon}
                />
                <Typography
                    variant="h2"
                    className="big-temp"
                    color="textPrimary"
                    component="h2"
                    style={{ fontFamily: "Montserrat", paddingTop: "30px" }}
                >
                    {currentWeather.temperature}&deg;C
        </Typography>
                <Typography
                    variant="subtitle2"
                    className="atmospheric-conditions"
                    color="textSecondary"
                    gutterBottom
                    style={{ paddingTop: "40px" }}
                >
                    <span
                        className={`${strongWind} ${classes.wi} ${classes.atmospheric}`}
                    ></span>
                    {currentWeather.wind_speed} km/h Winds{" "}
                    <span
                        className={`${humidity} ${classes.wi} ${classes.atmospheric}`}
                    ></span>
                    {currentWeather.humidity}% Humidity
        </Typography>
                <Typography
                    className={`${classes.recommendation} recommendation`}
                    color="textPrimary"
                    gutterBottom
                >
                    {recommendation}
                </Typography>
                <Divider variant="middle" />
                <Forecast forecast={forecast} />
            </CardContent>
        </Card>
    );
};
