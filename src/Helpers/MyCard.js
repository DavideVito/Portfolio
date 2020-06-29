import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Parallax, Background } from "react-parallax";

import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function MyCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div style={{ height: "20px" }}></div>
      <Card className={classes.root} style={{ width: "100%" }}>
        <CardHeader
          avatar={
            <>
              {props.editMode ? (
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  src={props.logo}
                >
                  {props.logo}
                </Avatar>
              ) : (
                <Avatar
                  aria-label="recipe"
                  className={classes.avatar}
                  src={props.logo}
                />
              )}
            </>
          }
          title={props.titolo}
          subheader={props.sottotilolo}
        />
        {props.fotoCard ? (
          <>
            {props.editMode ? (
              <CardMedia title={props.titoloFotoCard}>
                <div style={{ marginTop: "25px" }}></div>
                {props.fotoCard}
              </CardMedia>
            ) : (
              <Parallax
                bgImage={props.fotoCard}
                strength={200}
                renderLayer={(percentage) => (
                  <CardMedia
                    className={classes.media}
                    image={props.fotoCard}
                    title={props.titoloFotoCard}
                  />
                )}
              ></Parallax>
            )}
          </>
        ) : (
          <></>
        )}

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.body}
          </Typography>
        </CardContent>
        {props.children ? (
          <>
            <Divider />
            <CardActions disableSpacing>
              {" "}
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </>
        ) : (
          <></>
        )}

        {props.children ? (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>{props.children}</CardContent>
          </Collapse>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
}
