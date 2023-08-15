import React from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DehazeIcon from '@mui/icons-material/Dehaze';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { Link } from "react-router-dom";

type TerrainProps = {
  id: number | string;
  name: string;
}

interface GroupBarProps extends BoxProps {
  terrains?: TerrainProps[]
}

const GroupBarStyled = styled(Box)<BoxProps>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  padding: theme.spacing(2),
}));

const MenuStyled = styled(Box)<BoxProps>(({ theme }) => ({
  width: 250
}));

export function GroupBar({
  terrains, ...other
}: GroupBarProps) {

  const navigate = useNavigate();

  const [drawerState, setDrawerState] = React.useState(false);
  const [openPlanetList, setOpenPlanetList] = React.useState(false);

  const toggleDrawer = () => setDrawerState(!drawerState);

  const togglePlanetList = () => setOpenPlanetList(!openPlanetList);

  const handleNextNavMenu = async (id: string | number) => {
    // to dev
    const url = `/systems/0/terrains/${id}` || null; // user systems terrains
    if (url) {
      navigate(url, { replace: true });
      navigate(0)
    }
  };

  return (
    <GroupBarStyled {...other}>
      <IconButton
        color="primary"
        aria-label="Settings"
        component="span"
        onClick={toggleDrawer}
      >
        <DehazeIcon sx={{ color: 'white' }} />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerState}
        onClose={toggleDrawer}
      >
        <MenuStyled>
          <List>

            <ListItemButton onClick={togglePlanetList} sx={{ pl: 4 }}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
              {openPlanetList ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openPlanetList} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Brightness1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Item" />
                </ListItemButton>
              </List>
            </Collapse>

            {terrains && terrains.map((item) => (
              <ListItemButton
                sx={{ pl: 4 }}
                key={item.id}
                onClick={() => handleNextNavMenu(item.id)}
              >
                <ListItemIcon>
                  <TravelExploreIcon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}

          </List>
        </MenuStyled>
      </Drawer>
    </GroupBarStyled>
  );
}
