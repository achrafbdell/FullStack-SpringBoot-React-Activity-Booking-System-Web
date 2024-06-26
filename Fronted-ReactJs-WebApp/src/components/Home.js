import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logoImage from "../images/img_register.webp";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Input, 
} from "@material-tailwind/react";

const Home = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http:/http://localhost:8080/activities");
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="" style={{ display: "flex", justifyContent: "center", height: "100vh" }}>
      <Card className="w-96 p-5" style={{ width: "80%" }}>
        <List>
          <ListItem className="p-5">
            <ListItemPrefix>
              <Avatar
                alt="candice"
                src={logoImage}
                style={{
                  borderRadius: "5%",
                  width: "300px", 
                  height: "180px", 
                }}
              />
            </ListItemPrefix>

            <div className=" pl-5">
                <Typography variant="h6" color="blue-gray">
                  Title
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal pt-2"
                >
                  Ville - Duree
                </Typography>

                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal pt-2"
                >
                  Description 
                </Typography>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      Price: 200
                    </Typography>
                  </div>
                  <div>
                    <Link to="/register" className="text-white px-4 py-2 ml-42 rounded-xl border-2 border-blue-700 bg-blue-700 hover:bg-transparent hover:border-blue-600 hover:border-2 mr-4 text-sm">
                      Reserver
                    </Link>
                  </div>
                </div>
              </div>
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default Home;
