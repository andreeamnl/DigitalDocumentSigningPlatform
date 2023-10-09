import { Box, Typography } from '@mui/material';

export const AboutSection: React.FC = () => {
  return (
    <Box py={4}>
      <Typography variant="h2" mb={1} fontWeight={500} color="#F0F0F0"> 
        DiSign
      </Typography>
      <Typography variant="h5" mb={3} color="#F0F0F0"> 
        Traditional paper-based document signing processes are often time-consuming, costly, and environmentally unsustainable. Moreover, the rise of remote work and the need for contactless transactions have accelerated the demand for reliable digital signature solutions. Existing digital signing platforms may lack robust security measures or fail to provide a pleasant user experience. Moreover, all of them require a paid account in order to sign documents digitally.
      </Typography>
    </Box>
  );
};
