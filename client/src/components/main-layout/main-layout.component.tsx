import React, { useState, useRef } from 'react';
import {
	AppBar,
	Toolbar,
	Box,
	IconButton,
	useMediaQuery,
	useTheme,
	Button,
} from '@mui/material';
import { logoImg } from 'assets';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { SectionIdEnum } from '../../types';
import { Navigation } from './navigation/navigation.component';
import { Close, Menu } from '@mui/icons-material';
// import { Link } from 'react-router-dom';

export type MainLayoutProps = {
	children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const theme = useTheme();
	const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleLogoClick = () => {
		if (isSmall) {
			toggleMenu(); 
		}
	};

	return (
		<Box height="100vh">
			<AppBar
				position="fixed"
				sx={{
					background: '#3C548C',
					borderBottomLeftRadius: '20px',
					borderBottomRightRadius: '20px',
				}}
			>
				<Toolbar
					sx={{
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					{isSmall ? (
						<IconButton color="inherit" onClick={toggleMenu}>
							{isMenuOpen ? <Close /> : <Menu />}
						</IconButton>
					) : (
						<Box flexGrow={1}>
							<AnchorLink
								href={`#${SectionIdEnum.about}`}
								offset={isSmall ? '56px' : '64px'}
								className="all_unset"
							>
								<Box 
									display="flex"
									alignItems="center"
									gap={0.5}
									sx={{ cursor: 'pointer' }}
									onClick={handleLogoClick} 
								>
									<img width="100px" height="37px" src={logoImg} alt="logo" />
								</Box>
							</AnchorLink>
						</Box>
					)}
					<Navigation isSmall={isSmall} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
					
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
					>Login
					</Button>
				</Toolbar>
			</AppBar>
			<Box>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};
