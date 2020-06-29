import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";

import Link from "@material-ui/core/Link";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function CustomizedTimeline() {
  const classes = useStyles();

  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body" color="textSecondary">
            2012
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot>
            <FastfoodIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Link href="https://www.iccastiglioni.edu.it">
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Istituto Ccomprensivo Città Di Castiglion Fiorentino
              </Typography>
              <Typography>Scuola secondaria di primo grado</Typography>
              <div style={{ height: "10px" }}></div>
              <Divider />
              <Typography>Valutazione: 7/10</Typography>
            </Paper>
          </Link>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent>
          <Typography variant="body" color="textSecondary">
            2015
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Link href="http://itis.arezzo.it">
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                Istituto Tecnico Industriale Statale G.Galiei
              </Typography>

              <div style={{ height: "10px" }}></div>

              <Typography variant="body2" component="h1">
                Via Dino Menci 1, Arezzo
              </Typography>
              <div style={{ height: "10px" }}></div>

              <Typography variant="body2" component="h1">
                Scuola secondaria di secondo grado
              </Typography>
              <Divider />
              <div style={{ height: "10px" }}></div>

              <Typography variant="body2" component="h1">
                Valutazione: 92/100
              </Typography>
            </Paper>
          </Link>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
