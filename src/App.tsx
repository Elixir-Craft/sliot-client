import React, { useState,useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { Home, Info, ContactMail, Dashboard } from '@mui/icons-material';

import VehicleCountLineGraph from './Chart';


import axios from 'axios';

import './index.scss'; // Ensure this is pointing to your SCSS file

interface HistoricalVehicleCountData {
  N: number[];
  S: number[];
  E: number[];
  W: number[];
}


function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // const cardData = [
  //   {id:'N', title: 'North', number: 100 },
  //   {id:'S', title: 'South', number: 200 },
  //   {id:'E', title: 'East', number: 300 },
  //   {id:'W', title: 'West', number: 400 }


  // ];

  const [cardData, setCardData] = useState([
    {id:'N', title: 'North', number: 100 },
    {id:'S', title: 'South', number: 200 },
    {id:'E', title: 'East', number: 300 },
    {id:'W', title: 'West', number: 400 }
  ]);

  const [historicalData, setHistoricalData] = useState<HistoricalVehicleCountData>({
    N: [],
    S: [],
    E: [],
    W: []
  });
  

  // fetch data every 2 seconds and update cardData numbers 
  // response  counts: { N: 10, S: 20, E: 30, W: 40 } 

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:8080/get/j001')
      .then((response) => {
        console.log(response.data);
        // cardData.map((card, index) => {
        //   card.number = response.data[card.id];
        // });
        setCardData([
          {id:'N', title: 'North', number: response.data.N },
          {id:'S', title: 'South', number: response.data.S },
          {id:'E', title: 'East', number: response.data.E },
          {id:'W', title: 'West', number: response.data.W }
        ]);
        setHistoricalData(prevData => ({
          N: [...prevData.N, response.data.N],
          S: [...prevData.S, response.data.S],
          E: [...prevData.E, response.data.E],
          W: [...prevData.W, response.data.W],
        }));

      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  




  return (
    <Box className="app-container">
      <Drawer
        variant="permanent"
        open={isOpen}
        onClose={toggleDrawer}
        className="drawer"
      >
        <List>
          {['Home', 'Dashboard', 'Info', 'Contact'].map((text, index) => (
            <ListItem button key={text} className="drawer-item">
              <ListItemIcon>
                {index === 0 ? <Home /> : index === 1 ? <Dashboard /> : index === 2 ? <Info /> : <ContactMail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" className="main-content">
        <Typography variant="h4" gutterBottom className="dashboard-title">
          ABC Junction
        </Typography>
        <Typography variant="h6" gutterBottom className="dashboard-subtitle">
         Junction code: j001
        </Typography>
        <Typography paragraph className="dashboard-description">
          Real-time vehicle count at each lane of the junction
        </Typography>
        <Grid container spacing={3}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card variant="outlined" className="dashboard-card">

{/* flex direction row , mobile direction column */}
                <CardContent>
                  <Grid container flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}  justifyItems={{ xs: 'center', sm: 'center', md: 'space-between' }}>
                <Grid item xs={5} sm={5} md={5} >

                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>

                  </Grid>
                  <Grid item xs={6} sm={6} md={6} >
                  <Typography variant="h3" component="div">
                    {card.number}
                  </Typography>
                    </Grid>
                    </Grid>

                </CardContent>
              </Card>
              </Grid>
                


          ))}

        </Grid >
        {/* max width 80%  , center align */}
        <Box style={{ maxWidth: '80%', margin: '0 auto' }}>
          <VehicleCountLineGraph data={historicalData} />
          </Box>
      </Box>
    </Box>
  );
}

export default App;
