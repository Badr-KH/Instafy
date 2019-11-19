import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Following from "../components/Following";
import { makeStyles } from "@material-ui/core";
// import photo1 from '../../assets/a0ebf9987c35f57f8bb9c8639b3a67fbd40ddaef.png'
import "./Profile.css";
import { type } from "os";

const useStyles = makeStyles(theme => ({
  button: {
    // margin: theme.spacing(1),
  },
  activeButton: {
    // margin: theme.spacing(1),
    background: "#1976d2",
    color: "#fff",
    border: "none"
  },
  profile: {
    maxWidth: "900px",
    margin: "auto"
  }
}));

const Profile = () => {
  const classes = useStyles();
  const [toggleButton1, setToggleButton1] = useState(true);
  const [toggleButton2, setToggleButton2] = useState(true);
  const [userPosts, setUserPosts] = useState(null);

  // Take 4
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("credentials")).username;
    fetch(
      // `/posts/{JSON.parse(sessionStorage.getItem("credentials")).username}` // this broke :(
      "posts/" + user
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log(res.error);
        } else {
          setUserPosts(res);
        }
      });
  }, []);

  return (
    <>
      <div className={classes.profile}>
        <div className="profile-header">
          <div className="headshot-container">
            <img
              src="/assets/a0ebf9987c35f57f8bb9c8639b3a67fbd40ddaef.png"
              alt="Logo"
            />
          </div>
          <div className="name-container">
            <h3>
              {JSON.parse(sessionStorage.getItem("credentials")).username}
            </h3>
            {userPosts && <h6>{userPosts["0"]["description"]}</h6>}

            <div>
              <span>130K Followers</span>
              <span>340 Following</span>
            </div>
          </div>
          <div className="follow-container">
            <Button
              onClick={event => setToggleButton1(!toggleButton1)}
              className={toggleButton1 ? classes.button : classes.activeButton}
            >
              Follow
            </Button>
            <Button
              onClick={event => setToggleButton2(!toggleButton2)}
              className={toggleButton2 ? classes.button : classes.activeButton}
            >
              Message
            </Button>
          </div>
        </div>
        <Following />
      </div>
    </>
  );
};
export default Profile;
