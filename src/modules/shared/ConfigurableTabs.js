import {AppBar, Box, Tab, Tabs} from "@material-ui/core";
import React from "react";
import * as PropTypes from "prop-types";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const ConfigurableTabs = ({ tabs, variant, onChange = () => {}}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant={variant? variant:"scrollable"}
          scrollButtons="auto"
          aria-label="configurable tabs"
        >
          {tabs.map(tab => <Tab key={tab.key} label={tab.label} {...a11yProps(tab.key)} />)}
        </Tabs>
      </AppBar>
      {tabs.map(tab => <TabPanel className={tab.className? tab.className:""} key={tab.key} value={value} index={tab.key}>
        {tab.component}
      </TabPanel>)}
    </>
  )
};

export default ConfigurableTabs;