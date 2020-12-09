import React from "react";
import { IconButton, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import * as weatherIcons from "../icons";

const useStyles = makeStyles(theme => ({
  wi: {
    color: "#33cc33",
    fontSize:'24px'
  },
  list: {
    flex: "1 1 0%",
    textAlign: "left"
  },
  sec: {
    flex: "1 1 0%",
    textAlign: "right"
  }
}));

export default function Forecast(props) {
  const classes = useStyles();
  const prefix = "wi wi-";
  const { forecast } = props;
  const result = forecast.map((item, index) => {
    const icon = prefix + weatherIcons.default[item.icon_id].icon;
    return (
      <ListItem key={index} className="forecastItem">
        <ListItemText
          className={`${classes.list} ${'weekday'}`}
          primary={dayjs(item.dt_txt).format("dddd")}></ListItemText>
        <IconButton disabled={true} aria-label="forecast icon">
          <span
            className={`${classes.wi} ${icon}`}
          ></span>
        </IconButton>
        <span className={`${classes.sec} ${'temp'}`}>
          <Typography variant="body2" component="span" color="textPrimary">
            {Math.round(item.min)}&deg; /{" "}
          </Typography>
          <Typography variant="body2" component="span" color="textSecondary">
            {Math.round(item.max)}&deg;
          </Typography>
        </span>
      </ListItem>
    );
  });

  return <List aria-label="forecast data">{result}</List>;
}
