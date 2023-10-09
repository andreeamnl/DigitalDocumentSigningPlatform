import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Hidden,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { SectionIdEnum } from '../../../types';
import { Close, Menu } from '@mui/icons-material';
import { logoImg } from 'assets';

export type NavigationProps = {
  isSmall: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const navigationItems = [
  {
    text: 'About',
    to: SectionIdEnum.about,
  },
  {
    text: 'FAQ',
    to: SectionIdEnum.FAQ,
  },
  {
    text: 'Pricing',
    to: SectionIdEnum.pricing,
  },
];

const Transition = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) => {
    return <Slide direction="right" ref={ref} {...props} />;
  }
);

export const Navigation: React.FC<NavigationProps> = ({
  isSmall,
  isMenuOpen,
  toggleMenu,
}) => {
  const mappedItems = navigationItems.map(({ to, text }) => {
    return (
      <AnchorLink
        key={to}
        href={`#${to}`}
        offset={isSmall ? '56px' : '64px'}
        className="all_unset"
      >
        <Button
          color="inherit"
          size="large"
          fullWidth={isSmall}
          onClick={() => {
            if (isSmall) {
              toggleMenu();
            }
          }}
          sx={{
            borderRadius: '2rem',
            '&:hover': {
              backgroundColor: '#7C81AD',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          {text}
        </Button>
      </AnchorLink>
    );
  });

  return (
    <>
      <Hidden smUp>
        {isMenuOpen && (
          <Dialog
            open={isMenuOpen}
            fullScreen
            fullWidth
            TransitionComponent={Transition}
            hideBackdrop
            PaperProps={{
              sx: {
                boxShadow: 'none',
                backgroundColor: '#213555',
                color: '#F0F0F0',
              },
            }}
          >
            <AppBar
              position="static"
              sx={{
                background: '#3C548C',
                color: '#F0F0F0',
                borderBottomLeftRadius: '20px',
                borderBottomRightRadius: '20px',
              }}
            >
              <Toolbar>
                <AnchorLink
                  href={`#${SectionIdEnum.about}`}
                  offset={isSmall ? '56px' : '64px'}
                  className="all_unset"
                  onClick={toggleMenu} 
                >
                  <img src={logoImg} alt="logo" style={{ width: '100px', height: 'auto' }} />
                </AnchorLink>
                <div style={{ flexGrow: 1 }} />
                <IconButton color="inherit" onClick={toggleMenu}>
                  <Close />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              py={3}
              width="100%"
            >
              {mappedItems}
            </Box>
          </Dialog>
        )}
      </Hidden>
      <Hidden smDown>
        <Toolbar sx={{ justifyContent: 'flex-end' }}>{mappedItems}</Toolbar>
      </Hidden>
    </>
  );
};
