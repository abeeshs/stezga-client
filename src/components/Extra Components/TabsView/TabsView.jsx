import * as React from 'react';
import PropTypes from 'prop-types';
import './TabsView.css';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TabsView({ title, description, participands }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      className="tab-font"
      sx={{
        bgcolor: 'background.paper',
        width: '100%',
        height: '100%',
        border: '1px solid rgba(196, 190, 190, 0.3)',
      }}
    >
      <Box
        position="static"
        sx={{
          backgroundColor: 'white',
          '& .MuiTabs-flexContainer': {
            backgroundColor: 'white',
            color: 'black',
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="full width tabs example"
        >
          <Tab label="Meeting Name" {...a11yProps(0)} />
          <Tab label="Meeting Notes" {...a11yProps(1)} />
          <Tab label="Participands" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel
        value={value}
        sx={{
          backgroundColor: 'gery !important',
          '& .MuiBox-root css-19kzrtu': { border: '1px solid grey' },
        }}
        index={0}
        dir={theme.direction}
      >
        {title}
      </TabPanel>
      <TabPanel
        sx={{ height: '100%' }}
        value={value}
        index={1}
        dir={theme.direction}
      >
        <Box className="tabstyle"
          sx={{
            height: '5rem',
            overflow: 'auto',
            width: '1000px',
            wordWrap: 'break-word',
            padding: '0.5rem',
          }}
        >
          <p>{parse(description)}</p>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Box sx={{ width: '100%', height: '50px', display: 'flex' }}>
          {participands?.map((item) => (
            <Box
              key={item?.memberId?._id}
              sx={{
                borderRight: '1px solid grey',
                width: '25%',
                height: '100%',
              }}
            >
              <Box className="participant">
                <Box>
                  <label>
                    Name & Email <span style={{ color: 'red' }}>*</span>
                  </label>
                </Box>

                <span>{item?.member}</span>
                <span>{item?.memberId?.email}</span>
              </Box>
            </Box>
          ))}
        </Box>
      </TabPanel>
    </Box>
  );
}
