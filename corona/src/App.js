import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './Test';
import { Tab, Tabs, Badge } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Help from './Help';
import Review from './Review';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import Top from './Top';




function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [badge, setBadge] = React.useState(false);

  const [helpList, setHelpList] = useState([
    { name: "Mary", location: " Basel,Johannas 12", order: "bread", quant: "1 kg" },
    { name: "Uri", location: " Schaffhausen,Main street 552", order: "orange", quant: "2 kg" },
    { name: "Aliz", location: " Olten,Kleine strasse 5", order: "Mushroom", quant: "1 kg" },

  ]);

  function setPrice(price, id) {
    var newHelpList = helpList.slice();
    newHelpList[id].price = price;
    setHelpList(newHelpList);
  }


  const addToShopping = (answers) => {
    var newHelpList = helpList.slice();
    newHelpList.push({ name: answers[0], location: "Zurich, Langstrasse 5", order: answers[2], quant: answers[3], filter: true });
    setHelpList(newHelpList);
    setBadge(1);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  var badgeDisplay = "";
  if (badge) {
    badgeDisplay = (
      <div className={classes.root}>
        <Badge badgeContent={1} color="error">
          <NotificationImportantIcon />
        </Badge>
      </div>
    )
  }


  return (
    <div className="App">
      <header>

        <AppBar position="static">

          {badgeDisplay}

          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Order" {...a11yProps(0)} />
            <Tab label="Help" {...a11yProps(1)} />
            <Tab label="Payment" {...a11yProps(2)} />
            <Tab label="TOP" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Test addToShopping={addToShopping} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Help helpList={helpList} setPrice={setPrice} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Review helpList={helpList} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Top />
        </TabPanel>


      </header>
    </div>
  );
}

export default App;
